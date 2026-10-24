/* Pinned, bundled Pyodide. Python runs in a Web Worker, never on the host OS. */
let pyodide = null;
let loading = null;
let queue = Promise.resolve();

async function ensurePyodide() {
  if (pyodide) return pyodide;
  if (!loading) {
    loading = (async () => {
      const base = new URL('./vendor/pyodide/', self.location.href).href;
      importScripts(base + 'pyodide.js');
      pyodide = await loadPyodide({ indexURL: base });
      return pyodide;
    })().catch(error => { loading = null; throw error; });
  }
  return loading;
}

async function handleMessage(d) {
  if (d.type === 'init') {
    try { await ensurePyodide(); self.postMessage({type: 'ready'}); }
    catch (error) { self.postMessage({type: 'initError', error: String(error)}); }
    return;
  }
  if (d.type !== 'run') return;
  try {
    const py = await ensurePyodide();
    py.globals.set('__ci_code', String(d.code ?? ''));
    py.globals.set('__ci_input', String(d.input ?? ''));
    const result = await py.runPythonAsync(`
import sys as _sys, io as _io, traceback as _traceback, types as _types

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

_in = _io.TextIOWrapper(_io.BytesIO(__ci_input.encode('utf-8')), encoding='utf-8')
_out_bytes, _err_bytes = _LimitedBytes(), _LimitedBytes()
_out = _io.TextIOWrapper(_out_bytes, encoding='utf-8', write_through=True)
_err = _io.TextIOWrapper(_err_bytes, encoding='utf-8', write_through=True)
_old_streams = _sys.stdin, _sys.stdout, _sys.stderr
_old_main, _old_argv = _sys.modules.get('__main__'), _sys.argv
_solution = _types.ModuleType('__main__')
_solution.__file__ = '/solution.py'
_sys.modules['__main__'] = _solution
_sys.argv = ['/solution.py']
_sys.stdin, _sys.stdout, _sys.stderr = _in, _out, _err
_status, _exception_text = 'OK', ''
try:
    exec(compile(__ci_code, '/solution.py', 'exec'), _solution.__dict__)
except _OutputLimit:
    _status, _exception_text = 'OLE', 'Output exceeded 16 MiB.'
except SystemExit as _e:
    if _e.code not in (None, 0):
        _status, _exception_text = 'RE', _traceback.format_exc()
except BaseException:
    _status, _exception_text = 'RE', _traceback.format_exc()
finally:
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
(_status, _stdout, (_stderr + _exception_text)[:16777216])
`);
    const [status, stdout, stderr] = result.toJs();
    result.destroy();
    py.globals.delete('__ci_code');
    py.globals.delete('__ci_input');
    self.postMessage({type: 'result', id: d.id, status, stdout, stderr});
  } catch (error) {
    self.postMessage({type: 'result', id: d.id, status: 'ENGINE_ERROR', stdout: '', stderr: String(error)});
  }
}

self.onmessage = event => {
  queue = queue.then(() => handleMessage(event.data || {}));
};
