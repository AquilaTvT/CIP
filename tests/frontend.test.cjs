const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root,'app.js'),'utf8').replace(/\ninit\(\);\s*$/, '\n');
function app() {
  const stored = new Map();
  const document = {getElementById:()=>null,addEventListener(){},querySelectorAll:()=>[],activeElement:null};
  const context = vm.createContext({console,URL,URLSearchParams,structuredClone,Map,Set,Date,Math,Number,JSON,Intl,Promise,Blob,setTimeout,clearTimeout,setInterval,clearInterval,crypto:require('node:crypto').webcrypto,document,location:{hash:'#/dashboard',protocol:'http:',hostname:'localhost',href:'http://localhost/'},localStorage:{getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v),removeItem:k=>stored.delete(k)},sessionStorage:{getItem:()=>null,setItem(){}},window:{CI_PROBLEMS:[{label:'ABC001A',url:'https://atcoder.jp/contests/abc001/tasks/abc001_1',problemId:'abc001_1'},{label:'ABC002A'},{label:'ABC003A'}],CI_METADATA:{ABC001A:{point:100}},addEventListener(){}},navigator:{},confirm:()=>true});
  vm.runInContext(source,context);
  vm.runInContext('problems=window.CI_PROBLEMS;problemMap=new Map(problems.map(p=>[p.label,p]));render=()=>{};toast=()=>{};startMockTimer=()=>{};',context);
  return {run:code=>vm.runInContext(code,context),stored,context};
}
test('backup validation preserves code but ignores executable URLs and unknown labels',()=>{
 const a=app();a.run(`state=normalizeState({attempts:[],codes:{ABC001A:'print(1)',UNKNOWN:'bad'},metadataCache:{ABC001A:{point:100,url:"javascript:alert(1)",submitUrl:"';alert(1);//"}},testCases:{ABC001A:[{id:"');alert(1);//",input:'x',expected:'',hasExpected:true}]}})`);
 assert.equal(a.run('state.codes.ABC001A'),'print(1)');assert.equal(a.run('state.codes.UNKNOWN'),undefined);
 assert.equal(a.run('state.metadataCache.ABC001A.url'),undefined);
 assert.equal(a.run('state.testCases.ABC001A[0].hasExpected'),true);
 assert.match(a.run('state.testCases.ABC001A[0].id'),/^[A-Za-z0-9_-]+$/);
 assert.equal(a.run('urlOf(problems[0])'),'https://atcoder.jp/contests/abc001/tasks/abc001_1');
});
test('invalid state containers are rejected without crashing on valid legacy cases',()=>{
 const a=app();for(const value of ['[]','null','{attempts:{}}','{attempts:[],codes:[]}'])assert.throws(()=>a.run(`normalizeState(${value})`));
 assert.equal(a.run(`normalizeState({attempts:[],testCases:{ABC001A:[{expected:'answer'}]}}).testCases.ABC001A[0].hasExpected`),true);
 assert.equal(a.run(`normalizeState({attempts:[],testCases:{ABC001A:[{expected:''}]}}).testCases.ABC001A[0].hasExpected`),false);
});
test('prototype properties and malformed selections do not enter application state',()=>{
 const a=app();a.run(`state=normalizeState(JSON.parse('{"attempts":[],"uiLang":"bad","dailyGoal":0,"codes":{"__proto__":{"polluted":true}}}'))`);
 assert.equal(a.run('state.uiLang'),'zh');assert.equal(a.run('state.dailyGoal'),1);assert.equal(a.run('({}).polluted'),undefined);
});
test('metadata uses bundled values offline',()=>{const a=app();assert.equal(a.run('pointOf(problems[0])'),100)});
test('mock penalties count wrongs before first AC, exclude CE/IE and unsolved tasks',()=>{
 const a=app();a.run(`state.mock={startedAt:1000,durationMs:10000,labels:['ABC001A','ABC002A','ABC003A'],scoreMode:'ci300',attempts:[{problemKey:'ABC001A',result:'WA',time:2000},{problemKey:'ABC001A',result:'CE',time:3000},{problemKey:'ABC001A',result:'IE',time:4000},{problemKey:'ABC001A',result:'AC',time:5000},{problemKey:'ABC001A',result:'WA',time:6000},{problemKey:'ABC002A',result:'WA',time:7000}]}`);
 assert.equal(a.run('mockScore(state.mock)'),100);assert.equal(a.run('mockPenalty(state.mock).wrongs'),1);assert.equal(a.run('mockPenalty(state.mock).penaltyMs'),304000);
});
test('official mock point snapshots survive metadata changes',()=>{
 const a=app();a.run(`state.mock={startedAt:1000,durationMs:10000,labels:['ABC001A','ABC002A','ABC003A'],scoreMode:'official',points:{ABC001A:100,ABC002A:200,ABC003A:300},attempts:[{problemKey:'ABC001A',result:'AC',time:2000}]};state.metadataCache.ABC001A={point:10000}`);
 assert.equal(a.run('mockScore(state.mock)'),100);assert.equal(a.run('mockMax(state.mock)'),600);
});
test('late and early submissions cannot earn a mock score',()=>{
 const a=app();a.run(`state.mock={startedAt:1000,durationMs:10000,labels:['ABC001A','ABC002A','ABC003A'],scoreMode:'ci300',attempts:[{problemKey:'ABC001A',result:'AC',time:500},{problemKey:'ABC002A',result:'AC',time:11001}],finished:true,finishedAt:8000}`);
 assert.equal(a.run('mockScore(state.mock)'),0);
});
test('manual attempt after deadline is rejected and ends session',()=>{
 const a=app();a.run(`state.mock={id:'m',startedAt:Date.now()-20000,durationMs:10000,labels:['ABC001A','ABC002A','ABC003A'],scoreMode:'ci300',attempts:[],finished:false};mockAttempt('ABC001A','AC')`);
 assert.equal(a.run('state.mock.attempts.length'),0);assert.equal(a.run('state.mock.finished'),true);
});
test('late API arrival can populate finished mock if submission occurred in its window',()=>{
 const a=app();a.run(`state.atcoderUser='test';state.mock={id:'m',atcoderUser:'test',startedAt:1000,durationMs:10000,finished:true,finishedAt:11000,labels:['ABC001A','ABC002A','ABC003A'],scoreMode:'ci300',attempts:[]};state.attempts=[{id:'s',problemKey:'ABC001A',result:'AC',source:'atcoder',time:5000}];hydrateMockFromAtCoder();hydrateMockFromAtCoder()`);
 assert.equal(a.run('state.mock.attempts.length'),1);assert.equal(a.run('mockScore(state.mock)'),100);
});
test('local output comparison preserves meaningful spaces and permits empty expected output',()=>{
 const a=app();assert.equal(a.run(`normalizeOutput('1 2 \\r\\n')`),'1 2');assert.notEqual(a.run(`normalizeOutput(' 1 2')`),a.run(`normalizeOutput('1 2')`));
 assert.equal(a.run(`normalizeOutput('\\n')`),'');
});
test('sample loading and statement rendering have no runtime translation or network task dependency',()=>{
 assert.doesNotMatch(source,/Translator|__task|__samples|__statement_cache|translateOfficial/);
 for(const name of ['renderStatement','renderSettings','renderDashboard'])assert.equal((source.match(new RegExp(`function ${name}\\(`,'g'))||[]).length,1);
 assert.doesNotMatch(source,/verdict\.textContent=ok\?'AC':'WA'/);
});
test('a timed-out Python worker terminates and a later run can succeed',async()=>{
 const a=app();const run=a.run(`ensureRunner=async()=>{runnerWorker={postMessage(){},terminate(){window.workerTerminated=true}}};executePython('while True: pass','',5)`);
 await assert.rejects(run,e=>e.code==='TLE');assert.equal(a.run('window.workerTerminated'),true);assert.equal(a.run('runnerPending.size'),0);
 a.run(`ensureRunner=async()=>{runnerWorker={postMessage(){queueMicrotask(()=>{const p=runnerPending.get(runnerSeq);clearTimeout(p.timer);runnerPending.delete(runnerSeq);p.resolve({status:'OK',stdout:'42\\n'})})},terminate(){}}}`);
 // Use a host callback because only browser contexts provide queueMicrotask by default.
 a.context.queueMicrotask=queueMicrotask;
 const result=await a.run(`executePython('print(42)','',1000)`);assert.equal(result.stdout,'42\n');
});
test('a backup that exceeds storage quota leaves the current state intact',async()=>{
 const a=app();a.context.console={...console,warn(){}};a.run(`state.codes.ABC001A='original';localStorage.setItem=()=>{throw new Error('quota')}`);
 a.context.testFile={size:100,text:async()=>JSON.stringify({app:'CI Practice',schema:3,state:{attempts:[],codes:{ABC001A:'replacement'}}})};
 await a.run('importData(testFile)');assert.equal(a.run('state.codes.ABC001A'),'original');
});

test('official statement points take priority over stale or imported metadata',()=>{const a=app();a.run("problems[0].officialPoint=150;state.metadataCache.ABC001A={point:200}");assert.equal(a.run('pointOf(problems[0])'),150)});

test('Run all snapshots code and input for the entire batch',async()=>{
 const a=app();a.run(`state.codes.ABC001A='initial code';state.testCases.ABC001A=[{id:'one',input:'first',expected:'',hasExpected:false},{id:'two',input:'second',expected:'',hasExpected:false}];window.executions=[];executePython=async(code,input)=>{window.executions.push({code,input});state.codes.ABC001A='changed code';state.testCases.ABC001A[1].input='changed input';return {status:'OK',stdout:''}}`);
 await a.run("runAllCases('ABC001A')");assert.equal(a.run('window.executions[1].code'),'initial code');assert.equal(a.run('window.executions[1].input'),'second');
});

test('official title markup is removed in metadata and fallback display',()=>{
 const a=app();a.run("state.metadataCache.ABC001A={name:'202<s>3</s>'}");
 assert.equal(a.run('titleOf(problems[0])'),'2023');
 assert.doesNotMatch(a.run('problemRow(problems[0])'),/&lt;\/?s&gt;/);
 a.run("delete state.metadataCache.ABC001A;problems[0].title='202<s>3</s>'");
 assert.equal(a.run('titleOf(problems[0])'),'2023');
 a.run("problems[0].title='A < B'");assert.equal(a.run('titleOf(problems[0])'),'A < B');
});

test('workspace preferences and recent problems survive validated backups',()=>{const a=app();a.run("state=normalizeState({attempts:[],sidebarCollapsed:true,lastProblem:'ABC002A',recentProblems:['ABC002A','UNKNOWN','ABC002A','ABC001A']})");assert.equal(a.run('state.sidebarCollapsed'),true);assert.equal(a.run('state.lastProblem'),'ABC002A');assert.equal(a.run('state.recentProblems.join()'),'ABC002A,ABC001A')});
test('continuation skips completed recent problems',()=>{const a=app();a.run("state.lastProblem='ABC001A';state.recentProblems=['ABC001A','ABC002A'];state.attempts=[{problemKey:'ABC001A',source:'manual',result:'AC',time:1}]");assert.equal(a.run('continuationProblem().label'),'ABC002A')});
test('command search matches spaced IDs and keeps recently opened order',()=>{const a=app();a.run("state.recentProblems=['ABC003A','ABC001A']");assert.equal(a.run("commandSearch('abc 001 a')[0].label"),'ABC001A');assert.equal(a.run("commandSearch('')[0].label"),'ABC003A');assert.equal(a.run("commandSearch('nothing-matches').length"),0)});
test('random unsolved respects the selected difficulty level',()=>{const a=app();a.run("problems[0].level=0;problems[1].level=1;problems[2].level=1;route={path:'/problems',params:new URLSearchParams('level=1')};state.attempts=[{problemKey:'ABC002A',source:'manual',result:'AC',time:1}];go=path=>{window.selectedPath=path};randomUnsolved()");assert.equal(a.run('window.selectedPath'),'/problem/ABC003A')});
test('each Python execution gets a fresh worker',async()=>{const a=app();a.context.queueMicrotask=queueMicrotask;a.run("window.generations=0;window.terminations=0;ensureRunner=async()=>{window.generations++;runnerWorker={terminate(){window.terminations++},postMessage(){queueMicrotask(()=>{const pending=runnerPending.get(runnerSeq);clearTimeout(pending.timer);runnerPending.delete(runnerSeq);pending.resolve({status:'OK',stdout:''})})}}}");await a.run("executePython('pass','',1000)");await a.run("executePython('pass','',1000)");assert.equal(a.run('window.generations'),2);assert.equal(a.run('window.terminations'),1)});
test('workspace, library, study, review and settings render in all three languages',()=>{
 const a=app();a.context.fullProblems=JSON.parse(fs.readFileSync(path.join(root,'data/problems.json'),'utf8'));
 a.run('problems=fullProblems.slice().sort((a,b)=>a.level-b.level||a.order-b.order);problemMap=new Map(problems.map(p=>[p.label,p]))');
 for(const language of ['zh','ja','en']){
  a.run(`state.uiLang='${language}'`);
  for(const view of ['renderDashboard()','renderProblems()','renderStudy()','renderReview()','renderSettings()']){
   const html=a.run(view);assert.ok(html.length>300);assert.doesNotMatch(html,/\b(?:undefined|NaN)\b/);
  }
  const shell=a.run("shell(renderDashboard(),'dashboard')");assert.match(shell,/<aside id="appSidebar"/);assert.match(shell,/<svg class="ui-icon/);
 }
});

test('reset and import cancel the remaining batch without changing replacement code',async()=>{
 for(const action of ['reset','import']){
  const a=app();a.run("applyAppearance=()=>{};state.codes.ABC001A='old code';state.testCases.ABC001A=[{id:'one',input:'first'},{id:'two',input:'second'}];window.executions=[];executePython=(code,input)=>new Promise(resolve=>{window.executions.push({code,input});window.finishRun=resolve})");
  const batch=a.run("runAllCases('ABC001A')");
  if(action==='reset')a.run('resetAll()');
  else{a.context.backup={size:100,text:async()=>JSON.stringify({attempts:[],codes:{ABC001A:'imported code'}})};await a.run('importData(backup)')}
  assert.equal(a.run('runnerBusy'),false);
  a.run("window.finishRun({status:'OK',stdout:'old output'})");await batch;
  assert.equal(a.run('window.executions.length'),1);
  assert.equal(a.run('state.codes.ABC001A'),action==='import'?'imported code':undefined);
 }
});
test('an obsolete batch cannot clear the busy flag of a new run',async()=>{
 const a=app();a.run("state.testCases.ABC001A=[{id:'one',input:''},{id:'two',input:''}];window.resolvers=[];executePython=()=>new Promise(resolve=>window.resolvers.push(resolve))");
 const oldBatch=a.run("runAllCases('ABC001A')");a.run('cancelPythonRuns()');
 const newRun=a.run("runCase('ABC001A','one')");
 a.run("window.resolvers[0]({status:'OK',stdout:''})");await oldBatch;assert.equal(a.run('runnerBusy'),true);
 a.run("window.resolvers[1]({status:'OK',stdout:''})");await newRun;assert.equal(a.run('runnerBusy'),false);
});
test('a running batch never writes results into another problem after navigation',async()=>{
 const a=app();a.run("route.path='/problem/ABC001A';state.codes.ABC002A='keep';state.testCases.ABC001A=[{id:'one',input:''},{id:'two',input:''}];window.otherVerdict={textContent:'unchanged'};window.otherOutput={textContent:'unchanged'};document.getElementById=id=>route.path==='/problem/ABC002A'?(id.startsWith('verdict-')?window.otherVerdict:id.startsWith('out-')?window.otherOutput:null):null;executePython=async()=>{route.path='/problem/ABC002A';return {status:'OK',stdout:'wrong page'}}");
 await a.run("runAllCases('ABC001A')");assert.equal(a.run('window.otherVerdict.textContent'),'unchanged');assert.equal(a.run('window.otherOutput.textContent'),'unchanged');assert.equal(a.run('state.codes.ABC002A'),'keep');assert.equal(a.run('runnerBusy'),false);
});

test('archived mock routes show snapshot scores and all three practice links without mutating the current session',()=>{
 const a=app();a.run("state.atcoderUser='tester';state.mock={id:'current',startedAt:Date.now(),durationMs:9000000,finished:false,labels:['ABC001A','ABC002A','ABC003A'],attempts:[],scoreMode:'ci300'};state.mockHistory=[{id:'past',startedAt:1000,durationMs:9000000,finishedAt:100000,finished:true,labels:['ABC001A','ABC002A','ABC003A'],scoreMode:'official',points:{ABC001A:150,ABC002A:250,ABC003A:350},attempts:[{problemKey:'ABC002A',result:'AC',time:5000}]}];route={path:'/mock',params:new URLSearchParams('history=past')};window.beforeMock=JSON.stringify(state.mock)");
 for(const language of ['zh','ja','en']){
  a.run(`state.uiLang='${language}'`);const html=a.run('renderMock()');
  assert.match(html,/250/);assert.match(html,/750/);assert.match(html,/mock-result-info/);
  for(const label of ['ABC001A','ABC002A','ABC003A'])assert.ok(html.includes(`/problem/${label}`));
  assert.doesNotMatch(html,/onclick="(?:resetMock|finishMock|startMock|mockAttempt|syncAtCoder)\(/);
  assert.ok(html.includes(a.run("t('returnCurrentMock')")));assert.ok(html.includes(a.run("t('archivedMock')")));assert.doesNotMatch(html,/\b(?:undefined|NaN)\b/);
 }
 assert.equal(a.run('JSON.stringify(state.mock)'),a.run('window.beforeMock'));
});
test('mock history is newest-first, deduplicated, and uses safely encoded navigation IDs',()=>{
 const a=app();a.run(`const baseMock={durationMs:9000000,finished:true,finishedAt:100000,labels:['ABC001A','ABC002A','ABC003A'],scoreMode:'ci300',attempts:[]};state.mockHistory=[{...baseMock,id:'older',startedAt:1000},{...baseMock,id:"quote'&history",startedAt:2000},{...baseMock,id:'older',startedAt:1000}];state.mock={...baseMock,id:'older',startedAt:1000};route={path:'/mock',params:new URLSearchParams('history')}`);
 assert.equal(a.run('mockHistoryEntries().length'),2);assert.equal(a.run('mockHistoryEntries()[0].startedAt'),2000);
 const html=a.run('renderMock()');assert.match(html,/history=quote%27%26history/);assert.equal((html.match(/class="mock-history-row"/g)||[]).length,2);assert.ok(html.includes(a.run("t('mockCompleted',{done:0,total:3})")));
 assert.ok(a.run('renderSettings()').includes("go('/mock?history')"));
 a.run('state.mock.finished=false;route.params=new URLSearchParams()');assert.ok(a.run('renderMock()').includes("go('/mock?history')"));
});
test('missing or empty mock history has an explicit return path and never falls back to a current mutable summary',()=>{
 const a=app();a.run("route={path:'/mock',params:new URLSearchParams('history=missing')}");
 const missing=a.run('renderMock()');assert.ok(missing.includes(a.run("t('mockHistoryMissing')")));assert.ok(missing.includes("go('/mock')"));assert.doesNotMatch(missing,/resetMock\(|finishMock\(/);
 a.run('route.params=new URLSearchParams("history")');const empty=a.run('renderMock()');assert.ok(empty.includes(a.run("t('mockHistoryEmpty')")));assert.ok(empty.includes(a.run("t('returnMockSetup')")));
});
