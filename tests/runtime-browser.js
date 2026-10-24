/* Can run in the native app (--runtime-test) or a browser automation harness. */
(async () => {
  const checks = [];
  const startedAt = Date.now();
  function progress(stage, detail = {}) {
    const payload = {stage, elapsedMs: Date.now() - startedAt, checks: checks.length, ...detail};
    globalThis.__runtimeTestProgress = payload;
    globalThis.webkit?.messageHandlers?.runtimeProgress?.postMessage(JSON.stringify(payload));
  }
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
  function assert(condition, name, detail = '') { if (!condition) throw Error(name + (detail ? ': ' + detail : '')); checks.push(name); progress(name); }
  try {
    progress('harness started');
    if(globalThis.__ciNetworkTest){
      const response=await fetch('/__proxy?url='+encodeURIComponent('https://kenkoooo.com/atcoder/resources/contests.json'));
      const submissions=await response.json();
      assert(response.ok&&Array.isArray(submissions)&&submissions.some(item=>typeof item.id==='string'),'native online AtCoder metadata proxy',JSON.stringify({status:response.status,body:submissions}));
      const submissionResponse = await fetch('/__proxy?url=' + encodeURIComponent('https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=tourist&from_second=1800000000'));
      const submissionRecords = await submissionResponse.json();
      assert(submissionResponse.ok && Array.isArray(submissionRecords), 'native online AtCoder submissions proxy', String(submissionResponse.status));
      globalThis.__runtimeTestResults={ok:true,checks};
      globalThis.webkit?.messageHandlers?.runtimeTest?.postMessage(JSON.stringify(globalThis.__runtimeTestResults));
      return;
    }
    progress('initial Python worker loading');
    await start();
    progress('initial Python worker ready');
    let result = await run('a,b=map(int,input().split());print(a+b)', '10 32\n');
    assert(result.status === 'OK' && result.stdout === '42\n', 'input/print');
    result = await run('import sys\na,b=map(int,sys.stdin.buffer.read().split())\nsys.stdout.buffer.write(str(a+b).encode())', '20 22\n');
    assert(result.status === 'OK' && result.stdout === '42', 'binary stdin/stdout');
    result = await run('import sys\nprint("中文 日本語 English")\nprint("diagnostic",file=sys.stderr)');
    assert(result.stdout === '中文 日本語 English\n' && result.stderr === 'diagnostic\n', 'Unicode/stderr');
    result = await run('import heapq,itertools,collections,math,bisect\nprint(math.gcd(84,126))');
    assert(result.status === 'OK' && result.stdout === '42\n', 'standard library');
    result = await run('import sys, __main__\nanswer=42\nprint(__main__.answer, sys.argv[0], __file__)');
    assert(result.status === 'OK' && result.stdout === '42 main.py /work/main.py\n', 'normal script main module and argv');
    result = await new Promise((resolve, reject) => {
      const id = ++sequence;
      const timer = setTimeout(() => reject(Error('run timeout')), 5000);
      worker.onmessage = event => { if (event.data.id === id) { clearTimeout(timer); resolve(event.data); } };
      worker.postMessage({type: 'run', id, code: 'import os\nprint(open("data.txt", encoding="utf-8").read().split(), os.getcwd(), sorted(os.listdir()))', input: '', files: {'data.txt': '4 2\n', '../escape.txt': 'no'}});
    });
    assert(result.status === 'OK' && result.stdout === "['4', '2'] /work ['data.txt']\n", 'data files in a clean working directory', result.stdout + result.stderr);
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
    progress('infinite loop dispatched; waiting to terminate');
    await new Promise(resolve => setTimeout(resolve, 300));
    worker.terminate();
    progress('infinite-loop worker terminated; loading replacement');
    await start();
    result = await run('print(42)');
    assert(result.status === 'OK' && result.stdout === '42\n', 'terminate infinite loop and restart');
    worker.terminate();
    await executePython('import builtins, math\nbuiltins.ci_test_marker=1\nmath.ci_test_marker=1\nopen("/tmp/ci-test-marker", "w").write("private")', '');
    result = await executePython('import builtins, math, os\nprint(hasattr(builtins,"ci_test_marker"),hasattr(math,"ci_test_marker"),os.path.exists("/tmp/ci-test-marker"))', '');
    assert(result.status === 'OK' && result.stdout === 'False False False\n', 'fresh interpreter isolates modules and files');
    stopPythonRuns();
    result = await executePython('import sys\nfrom functools import cache\nsys.setrecursionlimit(100000)\n@cache\ndef f(n):\n    return 0 if n == 0 else f(n - 1) + 1\nprint(f(20000))', '', 15000);
    assert(result.status === 'RE' && /RecursionError/.test(result.stderr), 'deep recursion through C code is reported, not timed out', JSON.stringify(result).slice(0, 300));
    result = await executePython('print(42)', '', 6000);
    assert(result.status === 'OK' && result.stdout === '42\n', 'the runner recovers after a crashed interpreter');
    const health = await (await fetch('/__health')).json();
    assert(health.ok && health.app === (globalThis.__ciNativeApp?.name || 'Plume') && health.version === '1.2.0', 'native localhost service');
    for (const asset of ['library.js', 'settings.js', 'academy.js', 'data/academy.js', 'data/packs/ci-original.js']) {
      const response = await fetch('/' + asset);
      assert(response.ok && (await response.text()).trim().length > 0, 'bundled local ' + asset);
    }
    // Exercise the same fresh-worker path as the lesson UI, not system Python.
    // Every fixture retains its exact input and output (including trailing LF).
    const lessons = globalThis.PLUME_ACADEMY?.lessons;
    assert(Array.isArray(lessons) && lessons.length === 28 && new Set(lessons.map(lesson => lesson.id)).size === 28,
      '28 bundled academy lessons loaded');
    const totalCourseCases=lessons.reduce((total,lesson)=>total+lesson.tests.length,0);
    assert(totalCourseCases>=93,'complete bundled academy exercise cases loaded');
    const cleanInterpreter = [
      'import builtins as __plume_builtins, math as __plume_math, os as __plume_os',
      'assert not hasattr(__plume_builtins, "__plume_course_marker"), "leaked builtins state"',
      'assert not hasattr(__plume_math, "__plume_course_marker"), "leaked module state"',
      'assert not __plume_os.path.exists("/tmp/plume-course-marker"), "leaked course file"',
      ''
    ].join('\n');
    const taintInterpreter = [
      '',
      '__plume_builtins.__plume_course_marker = True',
      '__plume_math.__plume_course_marker = True',
      'with open("/tmp/plume-course-marker", "w") as __plume_marker_file:',
      '    __plume_marker_file.write("this worker only")',
      ''
    ].join('\n');
    let courseCases = 0;
    for (const lesson of lessons) {
      for (const [index, test] of lesson.tests.entries()) {
        progress('academy case starting', {lesson: lesson.id, case: index + 1, completed: courseCases, total: totalCourseCases});
        result = await executePython(cleanInterpreter + lesson.solution + taintInterpreter, test.input, 6000, test.files || {});
        assert(result.status === 'OK' && result.stdout === test.expected && result.stderr === '',
          'academy ' + lesson.id + ' case ' + (index + 1),
          JSON.stringify({status: result.status, expected: test.expected, actual: result.stdout, stderr: result.stderr}));
        courseCases++;
      }
    }
    assert(courseCases === totalCourseCases, 'all academy reference cases pass in WebKit Pyodide');
    result = await executePython(cleanInterpreter + 'print(42)', '', 6000);
    assert(result.status === 'OK' && result.stdout === '42\n' && result.stderr === '',
      'academy cases leave no interpreter or filesystem state');
    // The bundled original sets: every reference solution passes its samples and hidden tests.
    const packProblems = window.PlumeLibrary?.problems().filter(problem => problem.bundled) || [];
    assert(packProblems.length === 24, '24 bundled original problems loaded');
    for (const problem of packProblems) {
      progress('pack problem starting', {problem: problem.label});
      const session = createPythonSession();
      try {
        for (const [index, test] of [...problem.samples, ...problem.tests].entries()) {
          result = await session.run(problem.solution.code, test.input, problem.timeLimitMs, {...problem.files, ...test.files});
          assert(result.status === 'OK' && window.PlumeLibrary.check(problem.checker, {input: test.input, actual: result.stdout, expected: test.expected}),
            'pack ' + problem.label + ' case ' + (index + 1), JSON.stringify({status: result.status, stderr: result.stderr.slice(-300)}));
        }
      } finally {
        session.close();
      }
    }
    stopPythonRuns();
    assert((await fetch('/data/%00invalid')).status === 404, 'invalid native asset path');
    assert((await fetch('/__proxy?url=' + encodeURIComponent('https://kenkoooo.com:bad/atcoder/resources/problems.json'))).status === 403, 'invalid proxy URL rejected');
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
    globalThis.__runtimeTestResults = {ok:true,checks,elapsedMs:Date.now()-startedAt};
  } catch (error) {
    worker?.terminate();
    if (typeof stopPythonRuns === 'function') stopPythonRuns();
    globalThis.__runtimeTestResults = {ok:false,checks,error:String(error),progress:globalThis.__runtimeTestProgress};
  }
  globalThis.webkit?.messageHandlers?.runtimeTest?.postMessage(JSON.stringify(globalThis.__runtimeTestResults));
})();
