/* Local lessons, editor state and exercise checks. No account or network required. */
(() => {
  'use strict';
  const copy = {
    zh:{title:'从第一行 Python 开始',intro:'读懂一个概念，写一段程序，再把它用在真实题目里。',eyebrow:'学习 · Python 与算法',lessons:'课程',progress:'课程进度',completed:'已完成',minutes:'分钟',start:'开始学习',resume:'继续学习',outline:'课程目录',back:'课程目录',previous:'上一课',next:'下一课',allDone:'课程已完成',practice:'练习',instruction:'练习要求',input:'输入',output:'输出',editor:'Python 编辑器',run:'运行检查',stop:'停止',restore:'恢复起始代码',restoreConfirm:'恢复本课的起始代码？当前代码会被替换。',hint:'提示',solution:'参考实现',explanation:'解题说明',related:'接着练习',prerequisites:'相关基础',checkNote:'所有测试均通过后，本课会标记为完成。课程检查与 AtCoder 的正式判题分别记录。',ready:'写好代码后，运行检查。',running:'正在检查',passed:'全部测试通过',failed:'仍有测试未通过',cancelled:'检查已停止',case:'测试',expected:'期望输出',actual:'实际输出',error:'运行错误',changed:'代码已修改，请重新检查。',runtimeBusy:'另一项测试正在运行，请稍后再试。',copy:'复制',copied:'已复制',codeSaved:'代码自动保存在本机',syntaxHelp:'检查报错行附近的冒号、括号和引号。',indentHelp:'同一代码块使用一致的缩进；默认每级 4 个空格。',nameHelp:'变量需要先赋值再使用，名称区分大小写。',valueHelp:'检查输入格式以及字符串转整数的位置。',timeHelp:'检查循环是否能够结束，以及算法的运行次数。',notFound:'未找到这节课',how:'学习方式',steps:['阅读概念与代码示例','完成本课的短练习','运行全部测试，查看差异','进入对应的 AtCoder 题目'],courseComplete:'已完成全部基础课程。可以进入题库，从 Level 1 开始继续练习。',openLibrary:'进入题库',stage1:'Python 基础',stage2:'解题方法',stage3:'算法入门'},
    en:{title:'Start with one line of Python',intro:'Understand a concept, write a program, then use it in a real problem.',eyebrow:'Learn · Python & algorithms',lessons:'Lessons',progress:'Course progress',completed:'Completed',minutes:'min',start:'Start learning',resume:'Continue learning',outline:'Course outline',back:'All lessons',previous:'Previous lesson',next:'Next lesson',allDone:'Course complete',practice:'Exercise',instruction:'Your task',input:'Input',output:'Output',editor:'Python editor',run:'Check solution',stop:'Stop',restore:'Restore starter',restoreConfirm:'Restore the starter code for this lesson? Your current code will be replaced.',hint:'Hint',solution:'Reference solution',explanation:'Explanation',related:'Practice next',prerequisites:'Related fundamentals',checkNote:'Pass every test to complete this lesson. Course checks are separate from official AtCoder verdicts.',ready:'When your code is ready, run the checks.',running:'Checking',passed:'All tests passed',failed:'Some tests did not pass',cancelled:'Checks stopped',case:'Test',expected:'Expected output',actual:'Actual output',error:'Runtime error',changed:'Code changed. Run the checks again.',runtimeBusy:'Another test is running. Please wait for it to finish.',copy:'Copy',copied:'Copied',codeSaved:'Code saves locally as you type',syntaxHelp:'Check the colon, brackets and quotes near the reported line.',indentHelp:'Use consistent indentation within each block; the default is four spaces per level.',nameHelp:'Assign a value before using a variable. Names are case-sensitive.',valueHelp:'Check the input format and any string-to-integer conversions.',timeHelp:'Check whether loops terminate and how many operations the algorithm performs.',notFound:'Lesson not found',how:'How the course works',steps:['Read the concept and example','Complete the short exercise','Run every test and inspect differences','Continue with the linked AtCoder problems'],courseComplete:'You have completed the foundation course. Continue in the problem library, starting with Level 1.',openLibrary:'Open problem library',stage1:'Python foundations',stage2:'Problem-solving methods',stage3:'Core algorithms'},
    ja:{title:'Python の一行目から',intro:'概念を理解し、短いプログラムを書き、実際の問題に応用します。',eyebrow:'学ぶ · Python とアルゴリズム',lessons:'レッスン',progress:'コースの進捗',completed:'完了',minutes:'分',start:'学習を始める',resume:'学習を再開',outline:'コース目次',back:'すべてのレッスン',previous:'前のレッスン',next:'次のレッスン',allDone:'コース完了',practice:'演習',instruction:'課題',input:'入力',output:'出力',editor:'Python エディタ',run:'解答を確認',stop:'停止',restore:'初期コードに戻す',restoreConfirm:'このレッスンの初期コードに戻しますか？現在のコードは置き換えられます。',hint:'ヒント',solution:'解答例',explanation:'解説',related:'続けて解く問題',prerequisites:'関連する基礎',checkNote:'すべてのテストに通ると完了になります。コースの確認結果と AtCoder の公式判定は別々に記録します。',ready:'コードを書いたら、テストを実行してください。',running:'確認中',passed:'すべてのテストに成功',failed:'未通過のテストがあります',cancelled:'確認を停止しました',case:'テスト',expected:'期待出力',actual:'実際の出力',error:'実行エラー',changed:'コードが変更されました。もう一度確認してください。',runtimeBusy:'別のテストを実行中です。終了するまでお待ちください。',copy:'コピー',copied:'コピーしました',codeSaved:'コードはこの端末に自動保存されます',syntaxHelp:'報告された行の付近で、コロン・括弧・引用符を確認してください。',indentHelp:'同じブロックではインデントを統一します。既定は1段につき空白4個です。',nameHelp:'変数は値を代入してから使います。大文字と小文字は区別されます。',valueHelp:'入力形式と、文字列を整数に変換する箇所を確認してください。',timeHelp:'ループが終了するか、処理回数が多すぎないかを確認してください。',notFound:'レッスンが見つかりません',how:'学習の流れ',steps:['概念とコード例を読む','短い演習を解く','すべてのテストを実行して差分を確認','関連する AtCoder の問題に進む'],courseComplete:'基礎コースを完了しました。問題一覧の Level 1 から練習を続けられます。',openLibrary:'問題一覧を開く',stage1:'Python の基礎',stage2:'問題の解き方',stage3:'基本アルゴリズム'}
  };
  for(const [lang,extra] of Object.entries({
    zh:{stage1:'开始编程',stage2:'组织数据与程序',stage3:'分析与验证',stage4:'序列与查询',stage5:'图与搜索',stage6:'状态、策略与综合',objectives:'学完这一课，你将能够',contents:'本课内容',checkUnderstanding:'检查理解',checkUnderstandingNote:'先给出自己的判断，再展开查看推理过程。',readTask:'查看练习要求',samples:'输入与输出示例',copyFailed:'复制未完成，请选择代码后复制。'},
    en:{stage1:'Getting started',stage2:'Data and programs',stage3:'Analysis and verification',stage4:'Sequences and queries',stage5:'Graphs and search',stage6:'States, strategies and synthesis',objectives:'By the end of this lesson',contents:'In this lesson',checkUnderstanding:'Check your understanding',checkUnderstandingNote:'Make a prediction before opening the reasoning.',readTask:'Read the exercise',samples:'Example input and output',copyFailed:'Could not copy. Select the code and copy it manually.'},
    ja:{stage1:'プログラミングを始める',stage2:'データとプログラムの整理',stage3:'分析と検証',stage4:'列とクエリ',stage5:'グラフと探索',stage6:'状態・戦略・総合演習',objectives:'このレッスンの到達目標',contents:'このレッスンの内容',checkUnderstanding:'理解を確かめる',checkUnderstandingNote:'まず自分で予測し、その後に説明を開いて確認してください。',readTask:'演習の要件を見る',samples:'入出力例',copyFailed:'コピーできませんでした。コードを選択してコピーしてください。'}
  }))Object.assign(copy[lang],extra);
  const escape = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const lessons = () => (window.AQUILA_ACADEMY?.lessons||[]).slice().sort((a,b)=>a.order-b.order);
  const byId = id => lessons().find(item=>item.id===id);
  const words = lang => copy[lang]||copy.en;
  const text = (lesson,lang) => lesson.content[lang];
  const route = id => '/learn/'+encodeURIComponent(id);
  const blank = () => ({codes:{},completed:{},attempts:{},hints:{},solutions:{},lastLessonId:''});
  function normalize(raw){
    const result=blank();if(!raw||typeof raw!=='object'||Array.isArray(raw))return result;
    for(const lesson of lessons()){
      const id=lesson.id;
      if(typeof raw.codes?.[id]==='string')result.codes[id]=raw.codes[id].slice(0,200000);
      if(Number.isFinite(raw.completed?.[id])&&raw.completed[id]>0)result.completed[id]=raw.completed[id];
      if(Number.isSafeInteger(raw.attempts?.[id])&&raw.attempts[id]>=0)result.attempts[id]=Math.min(raw.attempts[id],100000);
      if(raw.hints?.[id]===true)result.hints[id]=true;
      if(raw.solutions?.[id]===true)result.solutions[id]=true;
    }
    if(byId(raw.lastLessonId))result.lastLessonId=raw.lastLessonId;
    return result;
  }
  function nextLesson(progress){return lessons().find(item=>!progress.completed[item.id])||lessons()[0];}
  function progressCount(progress){return lessons().filter(item=>!!progress.completed[item.id]).length;}
  function button(label,path,cls='btn'){return `<button class="${cls}" data-academy-route="${escape(path)}">${escape(label)}</button>`;}
  const paragraphs = value => String(value||'').split(/\n\s*\n/).map(p=>`<p>${escape(p).replace(/`([^`\n]+)`/g,'<code>$1</code>').replace(/\n/g,'<br>')}</p>`).join('');
  const codeBlock = code => `<pre class="lesson-code"><code>${escape(code)}</code></pre>`;
  function renderIndex({uiLang='zh',progress=blank()}){
    const w=words(uiLang),items=lessons(),done=progressCount(progress),next=byId(progress.lastLessonId)&&!progress.completed[progress.lastLessonId]?byId(progress.lastLessonId):nextLesson(progress);
    if(!items.length)return `<div class="empty-state"><h1>${{zh:'课程未能载入',en:'Course unavailable',ja:'コースを読み込めませんでした'}[uiLang]||'Course unavailable'}</h1><p>${{zh:'请重新打开应用，或检查课程文件是否完整。',en:'Reopen the app, or check that the course files are present.',ja:'アプリを開き直すか、コースファイルを確認してください。'}[uiLang]}</p></div>`;
    const stages=[...new Set(items.map(item=>item.stage))];
    return `<div class="academy-header"><div class="eyebrow">${w.eyebrow}</div><h1>${w.title}</h1><p>${w.intro}</p></div><div class="academy-index"><section class="course-outline" aria-label="${w.outline}">${stages.map((stage,index)=>`<section class="course-stage"><div class="course-stage-heading"><span>${String(index+1).padStart(2,'0')}</span><h2>${w['stage'+(index+1)]||escape(stage)}</h2></div>${items.filter(item=>item.stage===stage).map(item=>`<button class="lesson-row ${progress.completed[item.id]?'completed':''}" data-academy-route="${route(item.id)}"><span class="lesson-number">${progress.completed[item.id]?'✓':String(item.order).padStart(2,'0')}</span><span class="lesson-row-copy"><strong>${escape(text(item,uiLang).title)}</strong><span>${escape(text(item,uiLang).summary)}</span></span><span class="lesson-duration">${item.minutes} ${w.minutes}</span><span aria-hidden="true">›</span></button>`).join('')}</section>`).join('')}</section><aside class="course-aside"><section class="course-progress"><span>${w.progress}</span><div class="course-progress-count">${done}<small> / ${items.length}</small></div><div class="progress"><i style="width:${items.length?done/items.length*100:0}%"></i></div>${done===items.length?`<p>${w.courseComplete}</p>${button(w.openLibrary,'/problems?level=1','btn primary')}`:`<p>${escape(text(next,uiLang).title)}</p>${button(done||progress.lastLessonId?w.resume:w.start,route(next.id),'btn primary')}`}</section><section class="course-how"><h2>${w.how}</h2><ol>${w.steps.map(step=>`<li>${step}</li>`).join('')}</ol></section></aside></div>`;
  }
  function renderLesson({id,uiLang='zh',progress=blank()}){
    const lesson=byId(id),w=words(uiLang);if(!lesson)return `<div class="empty-state"><h1>${w.notFound}</h1>${button(w.back,'/learn')}</div>`;
    const c=text(lesson,uiLang),items=lessons(),index=items.findIndex(item=>item.id===id),prev=items[index-1],next=items[index+1];
    const example=(section,i)=>section.code?`<div class="lesson-example"><div class="lesson-example-label"><span>Python 3</span><button class="text-button" data-copy-example="${i}">${w.copy}</button></div>${codeBlock(section.code)}${typeof section.exampleInput==='string'?`<div class="lesson-example-io"><span>${w.input}</span><pre>${escape(section.exampleInput)||'∅'}</pre></div>`:''}${typeof section.output==='string'?`<div class="lesson-example-io"><span>${w.output}</span><pre>${escape(section.output)||'∅'}</pre></div>`:''}</div>`:'';
    return `<div class="lesson-breadcrumb">${button('‹ '+w.back,'/learn','text-button')}<span>${String(index+1).padStart(2,'0')} / ${items.length}</span><div>${prev?button('‹ '+w.previous,route(prev.id),'text-button'):''}${next?button(w.next+' ›',route(next.id),'text-button'):''}</div></div>
      <div class="lesson-heading"><div class="eyebrow">${w.lessons} ${String(index+1).padStart(2,'0')} · ${lesson.minutes} ${w.minutes}</div><h1>${escape(c.title)}</h1><p>${escape(c.summary)}</p>${progress.completed[id]?`<span class="course-complete-badge">✓ ${w.completed}</span>`:''}</div>
      ${c.objectives?.length?`<section class="lesson-objectives"><h2>${w.objectives}</h2><ul>${c.objectives.map(item=>`<li>${escape(item)}</li>`).join('')}</ul></section>`:''}
      <div class="lesson-layout"><article class="lesson-reading">
        <nav class="lesson-toc" aria-label="${w.contents}"><h2>${w.contents}</h2>${c.sections.map((section,i)=>`<button data-course-jump="lesson-section-${i}"><span>${String(i+1).padStart(2,'0')}</span>${escape(section.title)}</button>`).join('')}<button data-course-jump="lesson-task"><span>→</span>${w.practice}</button></nav>
        ${c.sections.map((section,i)=>`<section class="lesson-section" id="lesson-section-${i}" tabindex="-1"><h2><span class="lesson-section-number">${String(i+1).padStart(2,'0')}</span>${escape(section.title)}</h2>${paragraphs(section.body)}${example(section,i)}</section>`).join('')}
        ${c.checkpoints?.length?`<section class="lesson-checkpoints"><h2>${w.checkUnderstanding}</h2><p class="lesson-self-check-note">${w.checkUnderstandingNote}</p>${c.checkpoints.map((item,i)=>`<details class="lesson-disclosure"><summary><span>${i+1}.</span> ${escape(item.question)}</summary>${paragraphs(item.answer)}</details>`).join('')}</section>`:''}
        <section class="lesson-task" id="lesson-task" tabindex="-1"><div class="eyebrow">${w.practice}</div><h2>${escape(c.exerciseTitle)}</h2>${paragraphs(c.task)}<dl><dt>${w.input}</dt><dd>${paragraphs(c.input)}</dd><dt>${w.output}</dt><dd>${paragraphs(c.output)}</dd></dl><div class="lesson-exercise-samples"><h3>${w.samples}</h3>${lesson.tests.slice(0,2).map((sample,i)=>`<div class="lesson-sample"><span class="lesson-sample-number">${String(i+1).padStart(2,'0')}</span><div class="lesson-example-io"><span>${w.input}</span><pre>${escape(sample.input)||'∅'}</pre></div><div class="lesson-example-io"><span>${w.output}</span><pre>${escape(sample.expected)||'∅'}</pre></div></div>`).join('')}</div></section>
        <details class="lesson-disclosure" data-course-disclosure="hints" ${progress.hints[id]?'open':''}><summary>${w.hint}</summary>${paragraphs(c.hint)}</details>
        <details class="lesson-disclosure" data-course-disclosure="solutions" ${progress.solutions[id]?'open':''}><summary>${w.solution}</summary>${codeBlock(lesson.solution)}<h3>${w.explanation}</h3>${paragraphs(c.explanation)}</details>
        <section class="lesson-related"><h2>${w.related}</h2><div>${lesson.relatedProblems.map(label=>button(label,'/problem/'+encodeURIComponent(label),'btn compact')).join('')}</div></section>
      </article><aside class="lesson-workspace"><div class="lesson-workspace-heading"><span>${escape(c.exerciseTitle)}</span><button class="text-button" data-course-jump="lesson-task">${w.readTask} ↓</button></div><section class="lesson-editor-card"><div class="lesson-editor-title"><strong>Python 3</strong><span>${w.codeSaved}</span></div><div class="lesson-editor"><textarea id="lessonEditor" spellcheck="false" aria-label="${w.editor}">${escape(progress.codes[id]??lesson.starter)}</textarea></div><div class="lesson-editor-actions"><button class="btn compact" data-course-action="restore">${w.restore}</button><span></span><button class="btn compact" data-course-action="stop" hidden>${w.stop}</button><button class="btn primary" data-course-action="run">${w.run}<kbd>⌘↵</kbd></button></div></section><div id="lessonResults" class="lesson-results" aria-live="polite"><div class="lesson-result-intro">${w.ready}</div></div><p class="lesson-check-note">${w.checkNote}</p><div id="lessonNext" class="lesson-next" ${progress.completed[id]?'':'hidden'}>${next?button(w.next+' →',route(next.id),'btn primary'):button(w.openLibrary,'/problems?level=1','btn primary')}</div></aside></div>`;
  }
  let mounted=null,epoch=0;
  function cancel(){
    const current=mounted;epoch++;
    if(current?.running){current.running=false;current.context.stopRun();current.context.releaseRun();showButtons(current,false);const target=document.getElementById('lessonResults');if(target)target.innerHTML=`<p>${words(current.context.uiLang).cancelled}</p>`;}
  }
  function destroy(){cancel();mounted?.editor?.destroy();mounted=null;}
  function showButtons(current,running){
    const run=document.querySelector('[data-course-action="run"]'),stop=document.querySelector('[data-course-action="stop"]');if(run)run.disabled=running;if(stop)stop.hidden=!running;
  }
  function errorHint(message,lang){const w=words(lang);return /IndentationError|TabError/.test(message)?w.indentHelp:/SyntaxError/.test(message)?w.syntaxHelp:/NameError/.test(message)?w.nameHelp:/ValueError|EOFError/.test(message)?w.valueHelp:/TLE/.test(message)?w.timeHelp:'';}
  function paintResults(current,results,finished=false){
    if(mounted!==current)return;
    const w=words(current.context.uiLang),pass=results.filter(result=>result.passed).length,all=finished&&pass===current.lesson.tests.length;
    const title=finished?(all?w.passed:w.failed):w.running;
    const target=document.getElementById('lessonResults');if(!target)return;
    target.innerHTML=`<div class="lesson-result-heading ${finished?(all?'success':'failure'):''}"><strong>${title}</strong><span>${finished?pass:results.length} / ${current.lesson.tests.length}</span></div>${results.map((result,index)=>`<details class="lesson-result-case" ${result.passed?'':'open'}><summary><span>${w.case} ${index+1}</span><span class="${result.passed?'good-text':'bad-text'}">${result.passed?'✓':'×'}</span></summary><div class="lesson-test-data"><label>${w.input}</label><pre>${escape(result.input)||'∅'}</pre><label>${w.expected}</label><pre>${escape(result.expected)||'∅'}</pre><label>${result.error?w.error:w.actual}</label><pre class="${result.error?'bad-text':''}">${escape(result.error||result.actual)||'∅'}</pre>${result.error&&errorHint(result.error,current.context.uiLang)?`<p>${errorHint(result.error,current.context.uiLang)}</p>`:''}</div></details>`).join('')}`;
  }
  const normalizeOutput = value=>String(value??'').replace(/\r\n/g,'\n').replace(/[ \t]+$/gm,'').replace(/\n+$/,'');
  async function run(){
    const current=mounted;if(!current||current.running)return;
    if(!current.context.acquireRun()){current.context.toast(words(current.context.uiLang).runtimeBusy);return;}
    current.running=true;const token=++epoch,code=current.editor?.value()??current.textarea.value;
    const results=[],tests=current.lesson.tests.map(item=>({...item})),progress=current.context.progress,id=current.lesson.id;
    progress.codes[id]=code;progress.attempts[id]=(progress.attempts[id]||0)+1;current.context.save();showButtons(current,true);paintResults(current,results);
    try{
      for(const test of tests){
        if(token!==epoch||mounted!==current)break;
        let result;try{result=await current.context.executePython(code,test.input,6000);}catch(error){result={status:'ERR',stderr:error.code==='TLE'?'TLE':String(error.message||error),stdout:''};}
        if(token!==epoch||mounted!==current)break;
        const error=result.status==='OK'?'':result.stderr||result.status;
        results.push({input:test.input,expected:test.expected,actual:result.stdout||'',error,passed:!error&&normalizeOutput(result.stdout)===normalizeOutput(test.expected)});
        paintResults(current,results,results.length===tests.length);
      }
      if(token===epoch&&mounted===current&&results.length===tests.length){
        current.lastCheckedCode=code;
        if(results.every(result=>result.passed)){
          const previousCompletion=progress.completed[id];
          progress.completed[id]=previousCompletion||Date.now();
          if(current.context.save()===false){if(!previousCompletion)delete progress.completed[id];}
          else{
          const next=document.getElementById('lessonNext');if(next)next.hidden=false;
          if(!document.querySelector('.course-complete-badge')){const badge=document.createElement('span');badge.className='course-complete-badge';badge.textContent='✓ '+words(current.context.uiLang).completed;document.querySelector('.lesson-heading')?.appendChild(badge);}
          }
        }
        if((current.editor?.value()??current.textarea.value)!==code)markChanged(current);
      }
    }finally{if(token===epoch&&mounted===current){current.running=false;current.context.releaseRun();showButtons(current,false);}}
  }
  function markChanged(current){const target=document.getElementById('lessonResults');if(target&&!target.querySelector('.lesson-code-changed')){const p=document.createElement('p');p.className='lesson-code-changed';p.textContent=words(current.context.uiLang).changed;target.prepend(p);}}
  function bind(context){
    document.querySelectorAll('[data-academy-route]').forEach(button=>button.addEventListener('click',()=>context.navigate(button.dataset.academyRoute)));
    document.querySelectorAll('[data-course-jump]').forEach(button=>button.addEventListener('click',()=>{const section=document.getElementById(button.dataset.courseJump);section?.scrollIntoView({block:'start',behavior:'auto'});section?.focus({preventScroll:true})}));
    document.querySelectorAll('[data-copy-example]').forEach(button=>button.addEventListener('click',async()=>{const code=byId(context.id)?.content[context.uiLang]?.sections[Number(button.dataset.copyExample)]?.code;if(!code)return;try{await navigator.clipboard.writeText(code);context.toast(words(context.uiLang).copied)}catch{context.toast(words(context.uiLang).copyFailed)}}));
    const lesson=byId(context.id),textarea=document.getElementById('lessonEditor');if(!lesson||!textarea)return;
    context.progress.lastLessonId=lesson.id;context.save();
    const current={context,lesson,textarea,editor:null,running:false,lastCheckedCode:null};mounted=current;
    const changed=value=>{context.progress.codes[lesson.id]=value;context.save();if(current.lastCheckedCode!==null){if(value!==current.lastCheckedCode)markChanged(current);else document.querySelector('.lesson-code-changed')?.remove();}};
    if(window.CIEditor)current.editor=window.CIEditor.mount(textarea,{...context.editorOptions,problemKey:'lesson:'+lesson.id,onChange:changed,onRun:run});
    else{textarea.addEventListener('input',()=>changed(textarea.value));textarea.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key==='Enter'){event.preventDefault();run();}});}
    document.querySelector('[data-course-action="run"]')?.addEventListener('click',run);
    document.querySelector('[data-course-action="stop"]')?.addEventListener('click',cancel);
    document.querySelector('[data-course-action="restore"]')?.addEventListener('click',()=>{if(!confirm(words(context.uiLang).restoreConfirm))return;cancel();context.progress.codes[lesson.id]=lesson.starter;context.save();context.rerender();});
    document.querySelectorAll('[data-course-disclosure]').forEach(details=>details.addEventListener('toggle',()=>{context.progress[details.dataset.courseDisclosure][lesson.id]=details.open;context.save();}));
  }
  window.PlumeAcademy={normalize,nextLesson,progressCount,renderIndex,renderLesson,bind,destroy,cancel,run,normalizeOutput,errorHint};
})();
