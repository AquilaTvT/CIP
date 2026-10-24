/* Controller integration tests. Reference solutions execute with an isolated local CPython. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const os=require('node:os');
const {spawnSync}=require('node:child_process');
const root=path.join(__dirname,'..');
const plain=value=>JSON.parse(JSON.stringify(value));
const tick=async()=>{await Promise.resolve();await Promise.resolve();};
function element(){
  const node={value:'',hidden:false,disabled:false,className:'',textContent:'',dataset:{},children:[],listeners:{},parent:null,
    addEventListener(name,fn){(this.listeners[name]??=[]).push(fn)},
    dispatch(name,event={}){for(const fn of this.listeners[name]||[])fn(event)},
    appendChild(child){child.parent=this;this.children.push(child)},
    prepend(child){child.parent=this;this.children.unshift(child)},
    remove(){if(this.parent)this.parent.children=this.parent.children.filter(c=>c!==this)},
    querySelector(selector){return this.children.find(c=>selector==='.'+c.className)||null}};
  let html='';Object.defineProperty(node,'innerHTML',{get(){return html},set(value){html=value;this.children=[]}});return node;
}
function course(){
  const elements={lessonEditor:element(),lessonResults:element(),lessonNext:element()},runButton=element(),stopButton=element(),restoreButton=element(),heading=element();
  const doc={getElementById:id=>elements[id]||null,querySelectorAll:()=>[],createElement:()=>element(),querySelector:selector=>({
    '[data-course-action="run"]':runButton,'[data-course-action="stop"]':stopButton,'[data-course-action="restore"]':restoreButton,'.lesson-heading':heading
  }[selector]||heading.querySelector(selector)||elements.lessonResults.querySelector(selector))};
  const scope={window:{},document:doc,Intl,console,Date,confirm:()=>true};vm.createContext(scope);
  for(const file of ['data/academy.js','academy.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),scope);
  const api=scope.window.PlumeAcademy,lessons=scope.window.PLUME_ACADEMY.lessons,progress=api.normalize();
  let busy=false,saves=0,releases=0,stops=0,editorOptions;
  scope.window.CIEditor={mount(textarea,options){editorOptions=options;return{value:()=>textarea.value,destroy(){}}}};
  const context={uiLang:'en',progress,editorOptions:{},save(){saves++},navigate(){},rerender(){},toast(message){context.lastToast=message},
    acquireRun(){if(busy)return false;busy=true;return true},releaseRun(){busy=false;releases++},stopRun(){stops++},
    executePython:async()=>({status:'OK',stdout:'',stderr:''})};
  function bind(lesson=lessons[0],code=lesson.solution){elements.lessonEditor.value=code;context.id=lesson.id;api.bind(context);return lesson}
  function change(code){elements.lessonEditor.value=code;editorOptions.onChange(code)}
  return{api,lessons,progress,context,bind,change,elements,runButton,stopButton,restoreButton,heading,scope,get busy(){return busy},get saves(){return saves},get releases(){return releases},get stops(){return stops},setBusy(value){busy=value}};
}
// Like the browser runtime: data files are written to a fresh working directory before each run.
function python(code,input,timeout,files={}){
  const cwd=fs.mkdtempSync(path.join(os.tmpdir(),'plume-lesson-'));
  try{
    for(const [name,content] of Object.entries(files))fs.writeFileSync(path.join(cwd,name),content);
    const result=spawnSync(process.env.CI_PYTHON||'python3',['-I','-c',code],{input,cwd,encoding:'utf8',timeout:4000,maxBuffer:1024*1024});
    if(result.error)throw result.error;
    return {status:result.status===0?'OK':'ERR',stdout:result.stdout,stderr:result.stderr};
  }finally{fs.rmSync(cwd,{recursive:true,force:true})}
}

test('every bundled reference solution passes the real controller and isolated CPython tests',async()=>{
  const c=course();c.context.executePython=async(...args)=>python(...args);
  for(const lesson of c.lessons){
    c.api.destroy();c.bind(lesson);await c.api.run();
    assert.ok(c.progress.completed[lesson.id]>0,`${lesson.id}: ${c.elements.lessonResults.innerHTML}`);
    assert.equal(c.progress.attempts[lesson.id],1);
    assert.ok(c.elements.lessonResults.innerHTML.includes('All tests passed'));
    assert.equal(c.busy,false);
  }
  assert.equal(c.api.progressCount(c.progress),c.lessons.length);
});

test('an incorrect solution and a Python exception cannot mark a lesson complete',async()=>{
  const c=course(),lesson=c.bind(undefined,'print("incorrect")');c.context.executePython=async(...args)=>python(...args);
  await c.api.run();assert.equal(c.progress.completed[lesson.id],undefined);assert.match(c.elements.lessonResults.innerHTML,/Some tests did not pass/);
  c.change('print(undefined_variable)');await c.api.run();assert.equal(c.progress.completed[lesson.id],undefined);
  assert.match(c.elements.lessonResults.innerHTML,/NameError/);assert.match(c.elements.lessonResults.innerHTML,/Assign a variable before using it/);
  assert.equal(c.progress.attempts[lesson.id],2);
});

test('runtime acquisition prevents a lesson from interfering with another active test',async()=>{
  const c=course(),lesson=c.bind();c.setBusy(true);let calls=0;c.context.executePython=async()=>{calls++;return{status:'OK'}};
  await c.api.run();assert.equal(calls,0);assert.equal(c.progress.attempts[lesson.id],undefined);assert.match(c.context.lastToast,/Another run is still in progress/);assert.equal(c.busy,true);
});

test('double Run clicks start a single batch and one attempt',async()=>{
  const c=course(),lesson=c.bind(),requests=[];c.context.executePython=()=>new Promise(resolve=>requests.push(resolve));
  const running=c.api.run();await c.api.run();assert.equal(requests.length,1);assert.equal(c.progress.attempts[lesson.id],1);
  c.api.cancel();requests[0]({status:'OK',stdout:lesson.tests[0].expected});await running;
  assert.equal(c.busy,false);assert.equal(c.releases,1);assert.equal(c.stops,1);assert.equal(c.progress.completed[lesson.id],undefined);
});

test('a cancelled run cannot complete a lesson or release a newer run',async()=>{
  const c=course(),lesson=c.bind(),requests=[];c.context.executePython=(code,input)=>new Promise(resolve=>requests.push({code,input,resolve}));
  const old=c.api.run();c.api.cancel();const current=c.api.run();assert.equal(requests.length,2);
  requests[0].resolve({status:'OK',stdout:lesson.tests[0].expected});await old;
  assert.equal(c.busy,true);assert.equal(c.runButton.disabled,true);assert.equal(c.releases,1);
  for(let i=0;i<lesson.tests.length;i++){assert.ok(requests[i+1]);requests[i+1].resolve({status:'OK',stdout:lesson.tests[i].expected});await tick()}
  await current;assert.equal(c.releases,2);assert.equal(c.busy,false);assert.ok(c.progress.completed[lesson.id]);
});

test('destroying a lesson rejects stale results before another lesson is mounted',async()=>{
  const c=course(),first=c.bind(),requests=[];c.context.executePython=()=>new Promise(resolve=>requests.push(resolve));
  const running=c.api.run();c.api.destroy();c.bind(c.lessons[1]);const before=c.elements.lessonResults.innerHTML;
  requests[0]({status:'OK',stdout:first.tests[0].expected});await running;
  assert.equal(c.progress.completed[first.id],undefined);assert.equal(c.elements.lessonResults.innerHTML,before);assert.equal(c.progress.lastLessonId,c.lessons[1].id);
});

test('editing during checks preserves the new draft and labels results as stale',async()=>{
  const c=course(),lesson=c.bind(),requests=[];c.context.executePython=(code,input)=>new Promise(resolve=>requests.push({code,input,resolve}));
  const running=c.api.run();c.change('print("new draft")');
  for(let i=0;i<lesson.tests.length;i++){assert.equal(requests[i].code,lesson.solution);requests[i].resolve({status:'OK',stdout:lesson.tests[i].expected});await tick()}
  await running;assert.equal(c.progress.codes[lesson.id],'print("new draft")');
  assert.ok(c.elements.lessonResults.querySelector('.lesson-code-changed'));
  assert.ok(c.progress.completed[lesson.id],'the checked solution still establishes historical completion');
});

test('changing back to the checked code removes an obsolete stale-code message',async()=>{
  const c=course(),lesson=c.bind();let index=0;c.context.executePython=async()=>({status:'OK',stdout:lesson.tests[index++].expected});
  await c.api.run();c.change('print("edited")');assert.ok(c.elements.lessonResults.querySelector('.lesson-code-changed'));
  c.change(lesson.solution);assert.equal(c.elements.lessonResults.querySelector('.lesson-code-changed'),null);
});

test('restoring starter code cancels a pending run without late completion',async()=>{
  const c=course(),lesson=c.bind(),requests=[];c.context.executePython=()=>new Promise(resolve=>requests.push(resolve));
  let rendered=0;c.context.rerender=()=>{rendered++};const pending=c.api.run();c.restoreButton.dispatch('click');
  assert.equal(c.progress.codes[lesson.id],lesson.starter);assert.equal(rendered,1);assert.equal(c.busy,false);
  requests[0]({status:'OK',stdout:lesson.tests[0].expected});await pending;assert.equal(c.progress.completed[lesson.id],undefined);
});

test('normalizing imported course progress excludes unknown lessons and malformed values',()=>{
  const c=course(),id=c.lessons[0].id;
  const result=c.api.normalize({codes:{[id]:'print(1)',unknown:'bad'},completed:{[id]:-1},attempts:{[id]:Infinity},hints:{[id]:'true'},solutions:{[id]:true},lastLessonId:'unknown'});
  assert.deepEqual(plain(result),{codes:{[id]:'print(1)'},completed:{},attempts:{},hints:{},solutions:{[id]:true},lastLessonId:''});
});

test('a failed completion save cannot award a new persistent course completion',async()=>{
  const c=course(),lesson=c.bind();c.elements.lessonNext.hidden=true;
  c.context.save=()=>false;let index=0;c.context.executePython=async()=>({status:'OK',stdout:lesson.tests[index++].expected});
  await c.api.run();
  assert.equal(c.progress.completed[lesson.id],undefined);
  assert.equal(c.heading.querySelector('.course-complete-badge'),null);
  assert.equal(c.elements.lessonNext.hidden,true);
  assert.match(c.elements.lessonResults.innerHTML,/All tests passed/,'valid test evidence should remain visible');
  assert.equal(c.busy,false);
  c.context.save=()=>true;index=0;await c.api.run();assert.ok(c.progress.completed[lesson.id]);assert.equal(c.elements.lessonNext.hidden,false);
});

test('timeout errors provide an actionable hint and release the runner',async()=>{
  const c=course(),lesson=c.bind();c.context.executePython=async()=>{const error=new Error('Time limit');error.code='TLE';throw error};
  await c.api.run();assert.equal(c.progress.completed[lesson.id],undefined);assert.equal(c.busy,false);
  assert.match(c.elements.lessonResults.innerHTML,/TLE/);assert.match(c.elements.lessonResults.innerHTML,/Check that every loop ends/);
});
