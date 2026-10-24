/* Can run in the native app (--runtime-test) or a browser automation harness. */
(async () => {
  const checks = [];
  let worker;
  let sequence = 0;
  async function start() {
    worker = new Worker('./pyworker.js');
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(Error('init timeout')), 45000);
      worker.onmessage = event => {
        clearTimeout(timer);
        event.data.type === 'ready' ? resolve() : reject(Error(JSON.stringify(event.data)));
      };
      worker.onerror = reject;
      worker.postMessage({type:'init'});
    });
  }
  async function run(code, input = '') {
    const id = ++sequence;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(Error('run timeout')), 5000);
      worker.onmessage = event => { if (event.data.id === id) { clearTimeout(timer); resolve(event.data); } };
      worker.onerror = reject;
      worker.postMessage({type:'run',id,code,input});
    });
  }
  function assert(condition, name) { if (!condition) throw Error(name); checks.push(name); }
  try {
    await start();
    let result = await run('a,b=map(int,input().split());print(a+b)', '10 32\n');
    assert(result.status === 'OK' && result.stdout === '42\n', 'input/print');
    result = await run('import sys\na,b=map(int,sys.stdin.buffer.read().split())\nsys.stdout.buffer.write(str(a+b).encode())', '20 22\n');
    assert(result.status === 'OK' && result.stdout === '42', 'binary stdin/stdout');
    result = await run('import sys\nprint("中文 日本語 English")\nprint("diagnostic",file=sys.stderr)');
    assert(result.stdout === '中文 日本語 English\n' && result.stderr === 'diagnostic\n', 'Unicode/stderr');
    result = await run('import heapq,itertools,collections,math,bisect\nprint(math.gcd(84,126))');
    assert(result.status === 'OK' && result.stdout === '42\n', 'standard library');
    result = await run('import sys, __main__\nanswer=42\nprint(__main__.answer, sys.argv[0], __file__)');
    assert(result.status === 'OK' && result.stdout === '42 /solution.py /solution.py\n', 'normal script main module and argv');
    result = await run('from dataclasses import dataclass\n@dataclass\nclass Answer:\n    value: int\nprint(Answer(42).value)');
    assert(result.status === 'OK' && result.stdout === '42\n', 'dataclass module lookup');
    result = await run('import sys\nprint(42)\nsys.stdout.close()\nprint("diagnostic",file=sys.stderr)\nsys.stderr.close()');
    assert(result.status === 'OK' && result.stdout === '42\n' && result.stderr === 'diagnostic\n', 'closing streams preserves output');
    result = await run('print(1/0)');
    assert(result.status === 'RE' && result.stderr.includes('ZeroDivisionError'), 'runtime exception');
    result = await run('if:');
    assert(result.status === 'RE' && result.stderr.includes('SyntaxError'), 'syntax error');
    result = await run('import sys\nsys.exit(0)');
    assert(result.status === 'OK', 'normal exit');
    result = await run('print("x"*17000000)');
    assert(result.status === 'OLE' && result.stdout.length <= 16777216, 'bounded output');
    worker.postMessage({type:'run',id:++sequence,code:'while True: pass',input:''});
    await new Promise(resolve => setTimeout(resolve, 300));
    worker.terminate();
    await start();
    result = await run('print(42)');
    assert(result.status === 'OK' && result.stdout === '42\n', 'terminate infinite loop and restart');
    worker.terminate();
    await executePython('import builtins, math\nbuiltins.ci_test_marker=1\nmath.ci_test_marker=1\nopen("/tmp/ci-test-marker", "w").write("private")', '');
    result = await executePython('import builtins, math, os\nprint(hasattr(builtins,"ci_test_marker"),hasattr(math,"ci_test_marker"),os.path.exists("/tmp/ci-test-marker"))', '');
    assert(result.status === 'OK' && result.stdout === 'False False False\n', 'fresh interpreter isolates modules and files');
    resetRunner();
    const health = await (await fetch('/__health')).json();
    assert(health.ok && health.app === 'CI Practice', 'native localhost service');
    assert((await fetch('/data/%00invalid')).status === 404, 'invalid native asset path');
    assert((await fetch('/__proxy?url=' + encodeURIComponent('https://kenkoooo.com:bad/atcoder/resources/problems.json'))).status === 403, 'invalid proxy URL rejected');
    if (globalThis.__ciNetworkTest) {
      const response = await fetch('/__proxy?url=' + encodeURIComponent('https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=tourist&from_second=9999999999'));
      const submissions = await response.json();
      assert(response.ok && Array.isArray(submissions), 'native online AtCoder metadata proxy');
    }
    const editorFixture = document.createElement('div');
    const editorTextarea = document.createElement('textarea');
    editorTextarea.value = 'print(42)';
    editorFixture.appendChild(editorTextarea);
    document.body.appendChild(editorFixture);
    let editorInstance;
    try {
      editorInstance = window.CIEditor.mount(editorTextarea, {onChange() {}, onRun() {}});
      assert(!!editorFixture.querySelector('.cm-editor .cm-gutters'), 'local CodeMirror editor and gutters mount');
      assert(editorInstance.value() === 'print(42)', 'local CodeMirror preserves initial code');
    } finally {
      editorInstance?.destroy();
      editorFixture.remove();
    }
    const fixture = document.createElement('div');
    fixture.innerHTML = sanitizeStatementHTML('<p><var>\\frac{x^2}{2}</var></p><pre>$5  6\n</pre>');
    document.body.appendChild(fixture);
    await ensureMathJax();
    await MathJax.startup.promise;
    await MathJax.typesetPromise([fixture]);
    assert(!!fixture.querySelector('mjx-container'), 'local MathJax renders formulas');
    assert(fixture.querySelector('pre').textContent === '$5  6\n' && !fixture.querySelector('pre mjx-container'), 'sample output remains verbatim');
    MathJax.typesetClear([fixture]); fixture.remove();
    globalThis.__runtimeTestResults = {ok:true,checks};
  } catch (error) {
    worker?.terminate();
    globalThis.__runtimeTestResults = {ok:false,checks,error:String(error)};
  }
  globalThis.webkit?.messageHandlers?.runtimeTest?.postMessage(JSON.stringify(globalThis.__runtimeTestResults));
})();
