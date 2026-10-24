/* Plume course: lesson pages, the exercise editor and its checks. No account or network required. */
(() => {
  'use strict';
  const copy = {
    zh: {
      title: '从第一行 Python 开始', intro: '读懂一个概念，写一段程序，再把它用到真实的题目里。28 课从零基础讲到上机考试需要的算法。',
      eyebrow: '课程 · Python 与算法', lessons: '第 {n} 课', progress: '课程进度', completed: '已完成', minutes: '{n} 分钟',
      start: '开始学习', resume: '继续学习', outline: '课程目录', back: '课程目录', previous: '上一课', next: '下一课',
      practice: '练习', input: '输入', output: '输出', file: '文件 {name}', editor: 'Python 编辑器', run: '运行检查', stop: '停止',
      restore: '恢复起始代码', restoreConfirm: '恢复本课的起始代码？当前代码会被替换。', hint: '提示', solution: '参考实现', explanation: '解题说明',
      related: '接着练习', checkNote: '全部测试通过后，本课记为完成。课程检查与 AtCoder 的正式判题分开记录。', ready: '写好代码后，运行检查。',
      running: '正在检查', passed: '全部测试通过', failed: '仍有测试未通过', cancelled: '检查已停止', case: '测试 {n}', expected: '期望输出', actual: '实际输出',
      error: '运行错误', changed: '代码已修改，请重新检查。', runtimeBusy: '另一项运行尚未结束。', copy: '复制', copied: '已复制', copyFailed: '无法复制，请手动选择代码。',
      codeSaved: '自动保存', syntaxHelp: '检查报错行附近的冒号、括号和引号是否配对。', indentHelp: '同一代码块的缩进要一致，默认每级 4 个空格。',
      nameHelp: '变量要先赋值再使用，名称区分大小写。', valueHelp: '检查输入格式，以及字符串转整数的位置。', timeHelp: '检查循环能否结束，以及算法的运算次数。',
      fileHelp: '检查文件名的拼写；文件与程序位于同一目录，直接用 open("文件名") 打开。', recursionHelp: '递归太深或没有终止条件。检查基准情形，或改用循环与显式的栈。',
      notFound: '找不到这节课', how: '学习方式', steps: ['阅读概念与代码示例，先预测输出', '完成本课的短练习', '运行全部测试，查看差异', '去做关联的题目'],
      courseComplete: '基础课程已经全部完成。接下来可以在题库中从 L1 开始练习，并用模拟考试检验速度。', openLibrary: '进入题库',
      objectives: '学完这一课，你将能够', contents: '本课内容', checkUnderstanding: '检查理解', checkUnderstandingNote: '先给出自己的判断，再展开查看推理过程。',
      readTask: '查看练习要求', samples: '输入与输出示例', unavailable: '课程未能载入', unavailableBody: '请重新打开应用，或检查课程文件是否完整。',
      stages: {start: '开始编程', python: '组织数据与程序', methods: '分析与验证', sequences: '序列与查询', graphs: '图与搜索', synthesis: '状态、策略与综合', exam: '上机专题'}
    },
    ja: {
      title: 'Python の一行目から', intro: '概念を理解し、短いプログラムを書き、実際の問題に応用します。28 のレッスンで、初歩から試験に必要なアルゴリズムまで進みます。',
      eyebrow: 'コース · Python とアルゴリズム', lessons: 'レッスン {n}', progress: 'コースの進捗', completed: '完了', minutes: '{n} 分',
      start: '学習を始める', resume: '学習を再開', outline: 'コースの目次', back: '目次', previous: '前のレッスン', next: '次のレッスン',
      practice: '演習', input: '入力', output: '出力', file: 'ファイル {name}', editor: 'Python エディタ', run: '確認する', stop: '停止',
      restore: '初期コードに戻す', restoreConfirm: 'このレッスンの初期コードに戻しますか？現在のコードは置き換えられます。', hint: 'ヒント', solution: '解答例', explanation: '解説',
      related: '続けて解く問題', checkNote: 'すべてのテストに通るとレッスン完了になります。コースの確認結果と AtCoder の正式な判定は別々に記録されます。', ready: 'コードを書いたら確認しましょう。',
      running: '確認中', passed: 'すべてのテストに通過', failed: '通過していないテストがあります', cancelled: '確認を停止しました', case: 'テスト {n}', expected: '期待される出力', actual: '実際の出力',
      error: '実行時エラー', changed: 'コードが変更されました。もう一度確認してください。', runtimeBusy: '別の実行が終わるまでお待ちください。', copy: 'コピー', copied: 'コピーしました', copyFailed: 'コピーできませんでした。コードを選択してコピーしてください。',
      codeSaved: '自動保存', syntaxHelp: 'エラーの行の付近で、コロン、括弧、引用符の対応を確認してください。', indentHelp: '同じブロックのインデントをそろえます。既定は 1 段につき空白 4 つです。',
      nameHelp: '変数は値を代入してから使います。大文字と小文字は区別されます。', valueHelp: '入力形式と、文字列を整数に変換している箇所を確認してください。', timeHelp: 'ループが終わるか、処理の回数が多すぎないかを確認してください。',
      fileHelp: 'ファイル名のつづりを確認してください。ファイルはプログラムと同じフォルダにあるので、open("ファイル名") で開けます。', recursionHelp: '再帰が深すぎるか、終了条件がありません。基底の場合を確認するか、ループと明示的なスタックに書き換えましょう。',
      notFound: 'レッスンが見つかりません', how: '学び方', steps: ['概念とコード例を読み、出力を予想する', '短い演習を解く', 'すべてのテストを実行し、差分を確認する', '関連する問題に進む'],
      courseComplete: 'コースをすべて修了しました。問題一覧の L1 から練習を続け、模擬試験でスピードも確かめましょう。', openLibrary: '問題一覧を開く',
      objectives: 'このレッスンの到達目標', contents: 'このレッスンの内容', checkUnderstanding: '理解を確かめる', checkUnderstandingNote: 'まず自分で考えてから、説明を開いてください。',
      readTask: '演習の要件を見る', samples: '入出力の例', unavailable: 'コースを読み込めませんでした', unavailableBody: 'アプリを開き直すか、コースのファイルを確認してください。',
      stages: {start: 'プログラミングを始める', python: 'データとプログラムの整理', methods: '分析と検証', sequences: '列とクエリ', graphs: 'グラフと探索', synthesis: '状態・戦略・総合演習', exam: '試験に向けて'}
    },
    en: {
      title: 'Start with One Line of Python', intro: 'Understand a concept, write a program, then use it on a real problem. Twenty-eight lessons take you from the first line to the algorithms the exam relies on.',
      eyebrow: 'Course · Python and algorithms', lessons: 'Lesson {n}', progress: 'Course Progress', completed: 'Completed', minutes: '{n} min',
      start: 'Start Learning', resume: 'Continue Learning', outline: 'Course outline', back: 'All Lessons', previous: 'Previous Lesson', next: 'Next Lesson',
      practice: 'Exercise', input: 'Input', output: 'Output', file: 'File {name}', editor: 'Python editor', run: 'Check', stop: 'Stop',
      restore: 'Restore Starter Code', restoreConfirm: 'Restore the starter code for this lesson? Your current code will be replaced.', hint: 'Hint', solution: 'Reference Solution', explanation: 'Explanation',
      related: 'Practice Next', checkNote: 'Pass every test to complete the lesson. Course checks are recorded separately from official AtCoder verdicts.', ready: 'When your code is ready, run the check.',
      running: 'Checking', passed: 'All tests passed', failed: 'Some tests did not pass', cancelled: 'Check stopped', case: 'Test {n}', expected: 'Expected output', actual: 'Your output',
      error: 'Runtime error', changed: 'The code has changed. Run the check again.', runtimeBusy: 'Another run is still in progress.', copy: 'Copy', copied: 'Copied', copyFailed: 'Could not copy. Select the code and copy it manually.',
      codeSaved: 'Saved automatically', syntaxHelp: 'Check that colons, brackets and quotes near the reported line are balanced.', indentHelp: 'Keep indentation consistent within a block; the default is four spaces per level.',
      nameHelp: 'Assign a variable before using it. Names are case-sensitive.', valueHelp: 'Check the input format and where text is converted to integers.', timeHelp: 'Check that every loop ends and how many steps the algorithm takes.',
      fileHelp: 'Check the spelling of the file name. Files sit next to your program, so open("name") finds them.', recursionHelp: 'The recursion is too deep or never stops. Check the base case, or rewrite it with a loop and an explicit stack.',
      notFound: 'Lesson not found', how: 'How the course works', steps: ['Read the concept and examples; predict each output', 'Complete the short exercise', 'Run every test and inspect differences', 'Continue with the linked problems'],
      courseComplete: 'You have finished the course. Continue in the library from L1 and use mock exams to check your pace.', openLibrary: 'Open Problems',
      objectives: 'By the end of this lesson you can', contents: 'In this lesson', checkUnderstanding: 'Check Your Understanding', checkUnderstandingNote: 'Decide on your answer before opening the reasoning.',
      readTask: 'Read the exercise', samples: 'Example input and output', unavailable: 'Course unavailable', unavailableBody: 'Reopen the app, or check that the course files are present.',
      stages: {start: 'Getting Started', python: 'Data and Programs', methods: 'Analysis and Verification', sequences: 'Sequences and Queries', graphs: 'Graphs and Search', synthesis: 'States, Strategies and Synthesis', exam: 'Exam Skills'}
    }
  };
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[c]);
  const lessons = () => (window.PLUME_ACADEMY?.lessons || []).slice().sort((a, b) => a.order - b.order);
  const byId = id => lessons().find(item => item.id === id);
  const words = lang => copy[lang] || copy.en;
  const fill = (template, vars) => String(template).replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));
  const text = (lesson, lang) => lesson.content[lang];
  const route = id => '/learn/' + encodeURIComponent(id);
  const blank = () => ({codes: {}, completed: {}, attempts: {}, hints: {}, solutions: {}, lastLessonId: ''});
  const pad = n => String(n).padStart(2, '0');

  function normalize(raw) {
    const result = blank();
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return result;
    for (const lesson of lessons()) {
      const id = lesson.id;
      if (typeof raw.codes?.[id] === 'string') result.codes[id] = raw.codes[id].slice(0, 200000);
      if (Number.isFinite(raw.completed?.[id]) && raw.completed[id] > 0) result.completed[id] = raw.completed[id];
      if (Number.isSafeInteger(raw.attempts?.[id]) && raw.attempts[id] >= 0) result.attempts[id] = Math.min(raw.attempts[id], 100000);
      if (raw.hints?.[id] === true) result.hints[id] = true;
      if (raw.solutions?.[id] === true) result.solutions[id] = true;
    }
    if (byId(raw.lastLessonId)) result.lastLessonId = raw.lastLessonId;
    return result;
  }
  function nextLesson(progress) {
    return lessons().find(item => !progress.completed[item.id]) || lessons()[0];
  }
  function progressCount(progress) {
    return lessons().filter(item => !!progress.completed[item.id]).length;
  }
  function button(label, path, cls = 'btn') {
    return `<button class="${cls}" data-academy-route="${escape(path)}">${escape(label)}</button>`;
  }
  const paragraphs = value =>
    String(value || '')
      .split(/\n\s*\n/)
      .map(p => `<p>${escape(p).replace(/`([^`\n]+)`/g, '<code>$1</code>').replace(/\n/g, '<br>')}</p>`)
      .join('');
  const codeBlock = code => `<pre class="lesson-code"><code>${escape(code)}</code></pre>`;
  const io = (label, value) => `<div class="lesson-io"><span>${escape(label)}</span><pre>${escape(value) || '<span class="placeholder">∅</span>'}</pre></div>`;
  const files = (w, record) => Object.entries(record || {}).map(([name, content]) => io(fill(w.file, {name}), content)).join('');

  function renderIndex({uiLang = 'zh', progress = blank()}) {
    const w = words(uiLang);
    const items = lessons();
    if (!items.length) return `<div class="empty-state page-empty"><h1>${escape(w.unavailable)}</h1><p>${escape(w.unavailableBody)}</p></div>`;
    const done = progressCount(progress);
    const last = byId(progress.lastLessonId);
    const next = last && !progress.completed[last.id] ? last : nextLesson(progress);
    const stages = [...new Set(items.map(item => item.stage))];
    const outline = stages
      .map(
        (stage, index) =>
          `<section class="course-stage"><div class="course-stage-heading"><span>${pad(index + 1)}</span><h2>${escape(w.stages[stage] || stage)}</h2></div><div class="list grouped">${items
            .filter(item => item.stage === stage)
            .map(
              item =>
                `<button class="lesson-row${progress.completed[item.id] ? ' completed' : ''}" data-academy-route="${route(item.id)}"><span class="lesson-number">${progress.completed[item.id] ? '✓' : pad(item.order)}</span><span class="lesson-row-copy"><strong>${escape(text(item, uiLang).title)}</strong><span>${escape(text(item, uiLang).summary)}</span></span><span class="lesson-duration">${escape(fill(w.minutes, {n: item.minutes}))}</span><span class="row-chevron" aria-hidden="true">›</span></button>`
            )
            .join('')}</div></section>`
      )
      .join('');
    const progressCard =
      done === items.length
        ? `<p>${escape(w.courseComplete)}</p>${button(w.openLibrary, '/problems?level=1', 'btn primary')}`
        : `<p class="course-next">${escape(text(next, uiLang).title)}</p>${button(done || progress.lastLessonId ? w.resume : w.start, route(next.id), 'btn primary')}`;
    return `<header class="page-header"><p class="page-eyebrow">${escape(w.eyebrow)}</p><h1>${escape(w.title)}</h1><p>${escape(w.intro)}</p></header><div class="academy-index"><section class="course-outline" aria-label="${escape(w.outline)}">${outline}</section><aside class="course-aside"><section class="panel course-progress"><span class="course-progress-label">${escape(w.progress)}</span><div class="course-progress-count">${done}<small> / ${items.length}</small></div><div class="meter"><i style="width:${(done / items.length) * 100}%"></i></div>${progressCard}</section><section class="course-how"><h2>${escape(w.how)}</h2><ol>${w.steps.map(step => `<li>${escape(step)}</li>`).join('')}</ol></section></aside></div>`;
  }

  function renderLesson({id, uiLang = 'zh', progress = blank()}) {
    const lesson = byId(id);
    const w = words(uiLang);
    if (!lesson) return `<div class="empty-state page-empty"><h1>${escape(w.notFound)}</h1>${button(w.back, '/learn')}</div>`;
    const c = text(lesson, uiLang);
    const items = lessons();
    const index = items.findIndex(item => item.id === id);
    const prev = items[index - 1];
    const next = items[index + 1];
    const example = (section, i) =>
      section.code
        ? `<div class="lesson-example"><div class="lesson-example-label"><span>Python</span><button class="text-button" data-copy-example="${i}">${escape(w.copy)}</button></div>${codeBlock(section.code)}${files(w, section.exampleFiles)}${typeof section.exampleInput === 'string' ? io(w.input, section.exampleInput) : ''}${typeof section.output === 'string' ? io(w.output, section.output) : ''}</div>`
        : '';
    const samples = lesson.tests
      .slice(0, 2)
      .map((sample, i) => `<div class="lesson-sample"><span class="lesson-sample-number">${pad(i + 1)}</span>${files(w, sample.files)}${io(w.input, sample.input)}${io(w.output, sample.expected)}</div>`)
      .join('');
    return `<nav class="lesson-breadcrumb">${button('‹ ' + w.back, '/learn', 'text-button')}<span>${pad(index + 1)} / ${items.length}</span><div>${prev ? button('‹ ' + w.previous, route(prev.id), 'text-button') : ''}${next ? button(w.next + ' ›', route(next.id), 'text-button') : ''}</div></nav>
      <header class="lesson-heading"><p class="page-eyebrow">${escape(fill(w.lessons, {n: pad(index + 1)}))} · ${escape(w.stages[lesson.stage] || '')} · ${escape(fill(w.minutes, {n: lesson.minutes}))}</p><h1>${escape(c.title)}</h1><p>${escape(c.summary)}</p>${progress.completed[id] ? `<span class="course-complete-badge">✓ ${escape(w.completed)}</span>` : ''}</header>
      ${c.objectives?.length ? `<section class="lesson-objectives"><h2>${escape(w.objectives)}</h2><ul>${c.objectives.map(item => `<li>${escape(item)}</li>`).join('')}</ul></section>` : ''}
      <div class="lesson-layout"><article class="lesson-reading">
        <nav class="lesson-toc" aria-label="${escape(w.contents)}"><h2>${escape(w.contents)}</h2>${c.sections.map((section, i) => `<button data-course-jump="lesson-section-${i}"><span>${pad(i + 1)}</span>${escape(section.title)}</button>`).join('')}<button data-course-jump="lesson-task"><span>→</span>${escape(w.practice)}</button></nav>
        ${c.sections.map((section, i) => `<section class="lesson-section" id="lesson-section-${i}" tabindex="-1"><h2><span class="lesson-section-number">${pad(i + 1)}</span>${escape(section.title)}</h2>${paragraphs(section.body)}${example(section, i)}</section>`).join('')}
        ${c.checkpoints?.length ? `<section class="lesson-checkpoints"><h2>${escape(w.checkUnderstanding)}</h2><p class="lesson-self-check-note">${escape(w.checkUnderstandingNote)}</p>${c.checkpoints.map((item, i) => `<details class="lesson-disclosure"><summary><span>${i + 1}.</span> ${escape(item.question)}</summary>${paragraphs(item.answer)}</details>`).join('')}</section>` : ''}
        <section class="lesson-task" id="lesson-task" tabindex="-1"><p class="page-eyebrow accent">${escape(w.practice)}</p><h2>${escape(c.exerciseTitle)}</h2>${paragraphs(c.task)}<dl><dt>${escape(w.input)}</dt><dd>${paragraphs(c.input)}</dd><dt>${escape(w.output)}</dt><dd>${paragraphs(c.output)}</dd></dl><div class="lesson-exercise-samples"><h3>${escape(w.samples)}</h3>${samples}</div></section>
        <details class="lesson-disclosure" data-course-disclosure="hints"${progress.hints[id] ? ' open' : ''}><summary>${escape(w.hint)}</summary>${paragraphs(c.hint)}</details>
        <details class="lesson-disclosure" data-course-disclosure="solutions"${progress.solutions[id] ? ' open' : ''}><summary>${escape(w.solution)}</summary>${codeBlock(lesson.solution)}<h3>${escape(w.explanation)}</h3>${paragraphs(c.explanation)}</details>
        <section class="lesson-related"><h2>${escape(w.related)}</h2><div>${lesson.relatedProblems.map(label => button(label, '/problem/' + encodeURIComponent(label), 'btn compact')).join('')}</div></section>
      </article><aside class="lesson-workspace"><div class="lesson-workspace-heading"><span>${escape(c.exerciseTitle)}</span><button class="text-button" data-course-jump="lesson-task">${escape(w.readTask)} ↓</button></div><section class="lesson-editor-card"><div class="lesson-editor-title"><strong>Python</strong><span>${escape(w.codeSaved)}</span></div><div class="lesson-editor"><textarea id="lessonEditor" spellcheck="false" aria-label="${escape(w.editor)}">${escape(progress.codes[id] ?? lesson.starter)}</textarea></div><div class="lesson-editor-actions"><button class="btn compact plain" data-course-action="restore">${escape(w.restore)}</button><span></span><button class="btn compact" data-course-action="stop" hidden>${escape(w.stop)}</button><button class="btn compact primary" data-course-action="run">${escape(w.run)}<kbd>${/Mac|iPhone|iPad/.test(globalThis.navigator?.platform || '') ? '⌘↵' : 'Ctrl ↵'}</kbd></button></div></section><div id="lessonResults" class="lesson-results" aria-live="polite"><div class="lesson-result-intro">${escape(w.ready)}</div></div><p class="lesson-check-note">${escape(w.checkNote)}</p><div id="lessonNext" class="lesson-next"${progress.completed[id] ? '' : ' hidden'}>${next ? button(w.next + ' →', route(next.id), 'btn primary') : button(w.openLibrary, '/problems?level=1', 'btn primary')}</div></aside></div>`;
  }

  let mounted = null;
  let epoch = 0;
  function cancel() {
    const current = mounted;
    epoch++;
    if (current?.running) {
      current.running = false;
      current.context.stopRun();
      current.context.releaseRun();
      showButtons(current, false);
      const target = document.getElementById('lessonResults');
      if (target) target.innerHTML = `<p>${escape(words(current.context.uiLang).cancelled)}</p>`;
    }
  }
  function destroy() {
    cancel();
    mounted?.editor?.destroy();
    mounted = null;
  }
  function showButtons(current, running) {
    const run = document.querySelector('[data-course-action="run"]');
    const stop = document.querySelector('[data-course-action="stop"]');
    if (run) run.disabled = running;
    if (stop) stop.hidden = !running;
  }
  function errorHint(message, lang) {
    const w = words(lang);
    if (/IndentationError|TabError/.test(message)) return w.indentHelp;
    if (/SyntaxError/.test(message)) return w.syntaxHelp;
    if (/FileNotFoundError/.test(message)) return w.fileHelp;
    if (/RecursionError/.test(message)) return w.recursionHelp;
    if (/NameError/.test(message)) return w.nameHelp;
    if (/ValueError|EOFError/.test(message)) return w.valueHelp;
    if (/TLE/.test(message)) return w.timeHelp;
    return '';
  }
  function paintResults(current, results, finished = false) {
    if (mounted !== current) return;
    const w = words(current.context.uiLang);
    const pass = results.filter(result => result.passed).length;
    const all = finished && pass === current.lesson.tests.length;
    const title = finished ? (all ? w.passed : w.failed) : w.running;
    const target = document.getElementById('lessonResults');
    if (!target) return;
    target.innerHTML = `<div class="lesson-result-heading ${finished ? (all ? 'success' : 'failure') : ''}"><strong>${escape(title)}</strong><span>${finished ? pass : results.length} / ${current.lesson.tests.length}</span></div>${results
      .map((result, index) => {
        const hint = result.error && errorHint(result.error, current.context.uiLang);
        return `<details class="lesson-result-case"${result.passed ? '' : ' open'}><summary><span>${escape(fill(w.case, {n: index + 1}))}</span><span class="${result.passed ? 'good-text' : 'bad-text'}">${result.passed ? '✓' : '×'}</span></summary><div class="lesson-test-data"><label>${escape(w.input)}</label><pre>${escape(result.input) || '∅'}</pre><label>${escape(w.expected)}</label><pre>${escape(result.expected) || '∅'}</pre><label>${escape(result.error ? w.error : w.actual)}</label><pre class="${result.error ? 'bad-text' : ''}">${escape(result.error || result.actual) || '∅'}</pre>${hint ? `<p>${escape(hint)}</p>` : ''}</div></details>`;
      })
      .join('')}`;
  }
  const normalizeOutput = value => String(value ?? '').replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, '').replace(/\n+$/, '');
  async function run() {
    const current = mounted;
    if (!current || current.running) return;
    if (!current.context.acquireRun()) {
      current.context.toast(words(current.context.uiLang).runtimeBusy);
      return;
    }
    current.running = true;
    const token = ++epoch;
    const code = current.editor?.value() ?? current.textarea.value;
    const results = [];
    const tests = current.lesson.tests.map(item => ({...item}));
    const progress = current.context.progress;
    const id = current.lesson.id;
    progress.codes[id] = code;
    progress.attempts[id] = (progress.attempts[id] || 0) + 1;
    current.context.save();
    showButtons(current, true);
    paintResults(current, results);
    // One fresh interpreter per check; each test still starts with a new __main__ and working folder.
    const session = current.context.createSession?.() || null;
    const execute = test => (session ? session.run(code, test.input, 6000, test.files || {}) : current.context.executePython(code, test.input, 6000, test.files || {}));
    try {
      for (const test of tests) {
        if (token !== epoch || mounted !== current) break;
        let result;
        try {
          result = await execute(test);
        } catch (error) {
          result = {status: 'ERR', stderr: error.code === 'TLE' ? 'TLE' : String(error.message || error), stdout: ''};
        }
        if (token !== epoch || mounted !== current) break;
        const error = result.status === 'OK' ? '' : result.stderr || result.status;
        results.push({input: test.input, expected: test.expected, actual: result.stdout || '', error, passed: !error && normalizeOutput(result.stdout) === normalizeOutput(test.expected)});
        paintResults(current, results, results.length === tests.length);
      }
      if (token === epoch && mounted === current && results.length === tests.length) {
        current.lastCheckedCode = code;
        if (results.every(result => result.passed)) {
          const previousCompletion = progress.completed[id];
          progress.completed[id] = previousCompletion || Date.now();
          if (current.context.save() === false) {
            if (!previousCompletion) delete progress.completed[id];
          } else {
            const next = document.getElementById('lessonNext');
            if (next) next.hidden = false;
            if (!document.querySelector('.course-complete-badge')) {
              const badge = document.createElement('span');
              badge.className = 'course-complete-badge';
              badge.textContent = '✓ ' + words(current.context.uiLang).completed;
              document.querySelector('.lesson-heading')?.appendChild(badge);
            }
          }
        }
        if ((current.editor?.value() ?? current.textarea.value) !== code) markChanged(current);
      }
    } finally {
      session?.close();
      if (token === epoch && mounted === current) {
        current.running = false;
        current.context.releaseRun();
        showButtons(current, false);
      }
    }
  }
  function markChanged(current) {
    const target = document.getElementById('lessonResults');
    if (target && !target.querySelector('.lesson-code-changed')) {
      const p = document.createElement('p');
      p.className = 'lesson-code-changed';
      p.textContent = words(current.context.uiLang).changed;
      target.prepend(p);
    }
  }
  function bind(context) {
    document.querySelectorAll('[data-academy-route]').forEach(el => el.addEventListener('click', () => context.navigate(el.dataset.academyRoute)));
    document.querySelectorAll('[data-course-jump]').forEach(el =>
      el.addEventListener('click', () => {
        const section = document.getElementById(el.dataset.courseJump);
        section?.scrollIntoView({block: 'start', behavior: 'auto'});
        section?.focus({preventScroll: true});
      })
    );
    document.querySelectorAll('[data-copy-example]').forEach(el =>
      el.addEventListener('click', async () => {
        const code = byId(context.id)?.content[context.uiLang]?.sections[Number(el.dataset.copyExample)]?.code;
        if (!code) return;
        try {
          await navigator.clipboard.writeText(code);
          context.toast(words(context.uiLang).copied);
        } catch {
          context.toast(words(context.uiLang).copyFailed);
        }
      })
    );
    const lesson = byId(context.id);
    const textarea = document.getElementById('lessonEditor');
    if (!lesson || !textarea) return;
    context.progress.lastLessonId = lesson.id;
    context.save();
    const current = {context, lesson, textarea, editor: null, running: false, lastCheckedCode: null};
    mounted = current;
    const changed = value => {
      context.progress.codes[lesson.id] = value;
      context.save();
      if (current.lastCheckedCode !== null) {
        if (value !== current.lastCheckedCode) markChanged(current);
        else document.querySelector('.lesson-code-changed')?.remove();
      }
    };
    if (window.CIEditor) current.editor = window.CIEditor.mount(textarea, {...context.editorOptions, problemKey: 'lesson:' + lesson.id, onChange: changed, onRun: run});
    else {
      textarea.addEventListener('input', () => changed(textarea.value));
      textarea.addEventListener('keydown', event => {
        if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
          event.preventDefault();
          run();
        }
      });
    }
    document.querySelector('[data-course-action="run"]')?.addEventListener('click', run);
    document.querySelector('[data-course-action="stop"]')?.addEventListener('click', cancel);
    document.querySelector('[data-course-action="restore"]')?.addEventListener('click', () => {
      if (!confirm(words(context.uiLang).restoreConfirm)) return;
      cancel();
      context.progress.codes[lesson.id] = lesson.starter;
      context.save();
      context.rerender();
    });
    document.querySelectorAll('[data-course-disclosure]').forEach(details =>
      details.addEventListener('toggle', () => {
        context.progress[details.dataset.courseDisclosure][lesson.id] = details.open;
        context.save();
      })
    );
  }
  window.PlumeAcademy = {normalize, nextLesson, progressCount, renderIndex, renderLesson, bind, destroy, cancel, run, normalizeOutput, errorHint};
})();
