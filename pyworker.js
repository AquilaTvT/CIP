/* Bundled Pyodide in a dedicated Web Worker. User code never runs on the host OS.
 * The main thread uses one worker per execution, so every run starts from a fresh interpreter. */
let pyodide = null;
let loading = null;
let queue = Promise.resolve();

async function ensurePyodide() {
  if (pyodide) return pyodide;
  if (!loading) {
    loading = (async () => {
      const base = new URL('./vendor/pyodide/', self.location.href).href;
      importScripts(base + 'pyodide.js');
      pyodide = await loadPyodide({indexURL: base});
      return pyodide;
    })().catch(error => {
      loading = null;
      throw error;
    });
  }
  return loading;
}

// Runs inside the interpreter. Data files are written to a clean /work directory,
// which becomes the working directory, so open('data.txt') behaves as in a terminal.
const HARNESS = `
import io as _io, json as _json, os as _os, re as _re, shutil as _shutil, sys as _sys
import time as _time, traceback as _traceback, types as _types

class _OutputLimit(Exception):
    pass

class _LimitedBytes(_io.BytesIO):
    def write(self, data):
        if self.tell() + len(data) > 16777216:
            raise _OutputLimit('Output exceeded 16 MiB.')
        return super().write(data)
    def close(self):
        if not self.closed:
            self._captured = self.getvalue()
        super().close()

def _user_traceback(error):
    tb = error.__traceback__
    while tb is not None and tb.tb_frame.f_code.co_filename != '/work/main.py':
        tb = tb.tb_next
    return ''.join(_traceback.format_exception(type(error), error, tb))

_os.chdir('/')
_shutil.rmtree('/work', ignore_errors=True)
_os.makedirs('/work', exist_ok=True)
for _name, _content in _json.loads(__ci_files).items():
    if not _re.fullmatch(r'[A-Za-z0-9_][A-Za-z0-9_.-]{0,63}', _name):
        continue
    with open('/work/' + _name, 'w', encoding='utf-8', newline='') as _file:
        _file.write(_content)
_os.chdir('/work')

_in = _io.TextIOWrapper(_io.BytesIO(__ci_input.encode('utf-8')), encoding='utf-8')
_out_bytes, _err_bytes = _LimitedBytes(), _LimitedBytes()
_out = _io.TextIOWrapper(_out_bytes, encoding='utf-8', write_through=True)
_err = _io.TextIOWrapper(_err_bytes, encoding='utf-8', write_through=True)
_old_streams = _sys.stdin, _sys.stdout, _sys.stderr
_old_main, _old_argv = _sys.modules.get('__main__'), _sys.argv
_solution = _types.ModuleType('__main__')
_solution.__file__ = '/work/main.py'
_sys.modules['__main__'] = _solution
_sys.argv = ['main.py']
_sys.stdin, _sys.stdout, _sys.stderr = _in, _out, _err
_status, _exception_text = 'OK', ''
_started = _time.perf_counter()
try:
    exec(compile(__ci_code, '/work/main.py', 'exec'), _solution.__dict__)
except _OutputLimit:
    _status, _exception_text = 'OLE', 'Output exceeded 16 MiB.'
except SystemExit as _e:
    if _e.code not in (None, 0):
        _status, _exception_text = 'RE', _user_traceback(_e)
except BaseException as _e:
    _status, _exception_text = 'RE', _user_traceback(_e)
finally:
    _elapsed = (_time.perf_counter() - _started) * 1000
    _sys.stdin, _sys.stdout, _sys.stderr = _old_streams
    _sys.argv = _old_argv
    if _old_main is None:
        _sys.modules.pop('__main__', None)
    else:
        _sys.modules['__main__'] = _old_main
try:
    _stdout = (_out_bytes._captured if _out_bytes.closed else _out_bytes.getvalue()).decode('utf-8', errors='replace')
except ValueError:
    _stdout = ''
try:
    _stderr = (_err_bytes._captured if _err_bytes.closed else _err_bytes.getvalue()).decode('utf-8', errors='replace')
except ValueError:
    _stderr = ''
(_status, _stdout, (_stderr + _exception_text)[:16777216], _elapsed)
`;

// A program that recurses through C code (for example a function wrapped in functools.cache)
// can exhaust the browser's own stack before Python notices. The interpreter cannot continue
// after that, so report the run as a runtime error at once instead of leaving it to time out.
let running = null;
function reportCrash(error) {
  if (running === null) return;
  const id = running;
  running = null;
  const text = String(error?.message || error || '');
  const stderr = /call stack|too much recursion/i.test(text)
    ? 'RecursionError: the program recursed too deeply for the browser stack.\n' +
      'Recursion that passes through functools.cache or other C code is limited to a few hundred levels here.\n' +
      'Use a loop, or a plain function with a dictionary as the memo, for deeper recursion.\n'
    : 'The Python runtime stopped unexpectedly: ' + text + '\n';
  self.postMessage({type: 'result', id, status: 'RE', stdout: '', stderr, fatal: true});
}
self.addEventListener('error', event => {
  if (running === null) return;
  event.preventDefault();
  reportCrash(event.error || event.message);
});
self.addEventListener('unhandledrejection', event => {
  if (running === null) return;
  event.preventDefault();
  reportCrash(event.reason);
});

async function handleMessage(message) {
  if (message.type === 'init') {
    try {
      await ensurePyodide();
      self.postMessage({type: 'ready'});
    } catch (error) {
      self.postMessage({type: 'initError', error: String(error)});
    }
    return;
  }
  if (message.type !== 'run') return;
  running = message.id;
  try {
    const py = await ensurePyodide();
    py.globals.set('__ci_code', String(message.code ?? ''));
    py.globals.set('__ci_input', String(message.input ?? ''));
    py.globals.set('__ci_files', JSON.stringify(message.files && typeof message.files === 'object' ? message.files : {}));
    const result = await py.runPythonAsync(HARNESS);
    const [status, stdout, stderr, elapsed] = result.toJs();
    result.destroy();
    if (running !== message.id) return;
    running = null;
    self.postMessage({type: 'result', id: message.id, status, stdout, stderr, elapsedMs: Math.round(elapsed)});
  } catch (error) {
    if (running !== message.id) return;
    if (/call stack|too much recursion/i.test(String(error?.message || error))) return reportCrash(error);
    running = null;
    self.postMessage({type: 'result', id: message.id, status: 'ENGINE_ERROR', stdout: '', stderr: String(error)});
  }
}

self.onmessage = event => {
  queue = queue.then(() => handleMessage(event.data || {}));
};
