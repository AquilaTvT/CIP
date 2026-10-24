/* Independent regressions for public AtCoder synchronization and exam state. */
const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const source=fs.readFileSync(path.join(root,'app.js'),'utf8').replace(/\ninit\(\);\s*$/,'\n');
function app(){
 const stored=new Map(),elements={atcoderUser:{value:'beta'},autoSync:{checked:false},dailyGoalSetting:{value:'5'}};
 const context=vm.createContext({console:{...console,warn(){}},URL,URLSearchParams,structuredClone,Map,Set,Date,Math,Number,JSON,Intl,Promise,Blob,setTimeout,clearTimeout,setInterval,clearInterval,crypto:require('node:crypto').webcrypto,document:{getElementById:k=>elements[k]||null,addEventListener(){},querySelectorAll:()=>[],activeElement:null},location:{hash:'#/dashboard',protocol:'http:',hostname:'localhost',href:'http://localhost/'},localStorage:{getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v),removeItem:k=>stored.delete(k)},sessionStorage:{getItem:()=>null,setItem(){}},window:{CI_PROBLEMS:[{label:'ABC001A',url:'https://atcoder.jp/contests/abc001/tasks/abc001_1',problemId:'abc001_1'},{label:'ABC002A'},{label:'ABC003A'}],CI_METADATA:{ABC001A:{point:100}},addEventListener(){}},navigator:{},confirm:()=>true});
 vm.runInContext(source,context);
 const run=code=>vm.runInContext(code,context);
 run(`problems=window.CI_PROBLEMS;problemMap=new Map(problems.map(p=>[p.label,p]));render=()=>{};toast=()=>{};startMockTimer=()=>{};applyAppearance=()=>{};state.metadataCache={ABC001A:{point:100}};state.atcoderUser='alpha';refreshMetadata=async()=>{};window.requests=[];apiFetch=url=>new Promise(resolve=>window.requests.push({url,resolve}));`);
 const finish=(i,items)=>{context.items=items;run(`window.requests[${i}].resolve({ok:true,json:async()=>items})`)};
 return {context,run,finish,elements};
}
const submission=(result='AC',id=123,time=10)=>({id,problem_id:'abc001_1',result,epoch_second:time,language:'Python',execution_time:1});
test('switching account while a request is pending cannot attach the old account submissions to the new account',async()=>{
 const a=app(),old=a.run('syncAtCoder(false,false)');
 a.run('saveUserAndSync()');
 assert.equal(a.run('state.atcoderUser'),'beta');
 a.finish(0,[submission()]);await old;
 assert.equal(a.run('state.attempts.length'),0,'alpha result was inserted into beta state');
 assert.equal(a.run('state.syncCursor'),0,'alpha cursor can skip beta historical submissions');
});
test('concurrent sync requests deduplicate submissions against current state',async()=>{
 const a=app(),first=a.run('syncAtCoder(false,false)'),second=a.run('syncAtCoder(false,false)');
 // An implementation may either coalesce requests or merge both safely.
 a.finish(0,[submission()]);await first;
 if(a.run('window.requests.length')>1)a.finish(1,[submission()]);
 await second;
 assert.equal(a.run('state.attempts.length'),1);
 assert.equal(a.run('formalAttempts("ABC001A").length'),1);
});
test('a full refresh updates a changed official verdict for an existing submission ID',async()=>{
 const a=app();a.run(`state.attempts=[{id:'123',problemKey:'ABC001A',result:'WA',source:'atcoder',time:10000}];state.syncCursor=11;`);
 const operation=a.run('syncAtCoder(true,false)');a.finish(0,[submission('AC')]);await operation;
 assert.equal(a.run('state.attempts.length'),1);
 assert.equal(a.run('state.attempts[0].result'),'AC','a previously stored WA remains permanent even after a full refresh');
 assert.equal(a.run('statusOf(problems[0]).verified'),true);
});
test('clearing local data while sync is pending cannot restore deleted progress',async()=>{
 const a=app(),operation=a.run('syncAtCoder(false,false)');
 a.run('resetAll()');a.finish(0,[submission()]);await operation;
 assert.equal(a.run('state.atcoderUser'),'');
 assert.equal(a.run('state.attempts.length'),0,'late response restored progress after Reset');
});
test('official verdicts arriving after a new mock starts still update the previous mock history',()=>{
 const a=app();a.run(`state.mock=null;state.mockHistory=[{id:'past',startedAt:1000,durationMs:10000,finished:true,finishedAt:11000,labels:['ABC001A','ABC002A','ABC003A'],scoreMode:'ci300',attempts:[]}];state.attempts=[{id:'123',problemKey:'ABC001A',result:'AC',source:'atcoder',time:5000}];hydrateMockFromAtCoder();`);
 assert.equal(a.run('mockScore(state.mockHistory[0])'),100,'late official verdict never updates an archived mock after New Mock');
});
test('ordinary AtCoder sync updates a current mock without requiring a second special sync',async()=>{
 const a=app();a.run(`state.mock={id:'current',startedAt:1000,durationMs:10000,labels:['ABC001A','ABC002A','ABC003A'],scoreMode:'ci300',attempts:[]};`);
 const operation=a.run('syncAtCoder(false,false,false)');a.finish(0,[submission('AC',123,5)]);await operation;
 assert.equal(a.run('statusOf(problems[0]).verified'),true);
 assert.equal(a.run('mockScore(state.mock)'),100,'same submission is verified in library but absent from active mock');
});

test('switching accounts cannot reassign an existing mock to the new account',()=>{
 const a=app();a.run(`state.mock={id:'alpha-mock',atcoderUser:'alpha',startedAt:1000,durationMs:10000,labels:['ABC001A','ABC002A','ABC003A'],scoreMode:'ci300',attempts:[]};state.atcoderUser='beta';state.attempts=[{id:'beta-ac',atcoderUser:'beta',problemKey:'ABC001A',result:'AC',source:'atcoder',time:5000}];hydrateMockFromAtCoder();`);
 assert.equal(a.run('state.mock.atcoderUser'),'alpha');
 assert.equal(a.run('mockScore(state.mock)'),0);
});
test('importing a replacement backup invalidates a pending sync',async()=>{
 const a=app(),operation=a.run('syncAtCoder(false,false)');
 await a.run(`importData({size:100,text:async()=>JSON.stringify({app:'CI Practice',state:{atcoderUser:'beta',attempts:[],notes:{ABC001A:'imported'}}})})`);
 a.finish(0,[submission()]);await operation;
 assert.equal(a.run('state.atcoderUser'),'beta');
 assert.equal(a.run('state.notes.ABC001A'),'imported');
 assert.equal(a.run('state.attempts.length'),0);
});
test('a corrected official verdict also replaces the archived mock verdict',()=>{
 const a=app();a.run(`state.mockHistory=[{id:'past',atcoderUser:'alpha',startedAt:1000,durationMs:10000,finished:true,finishedAt:11000,labels:['ABC001A','ABC002A','ABC003A'],scoreMode:'ci300',attempts:[{id:'123',atcoderUser:'alpha',problemKey:'ABC001A',result:'AC',source:'atcoder',time:5000}]}];state.attempts=[{id:'123',atcoderUser:'alpha',problemKey:'ABC001A',result:'WA',source:'atcoder',time:5000}];hydrateMockFromAtCoder();`);
 assert.equal(a.run('state.mockHistory[0].attempts.length'),1);
 assert.equal(a.run('state.mockHistory[0].attempts[0].result'),'WA');
 assert.equal(a.run('mockScore(state.mockHistory[0])'),0);
});
test('old backups deduplicate official IDs and isolate mock ownership',()=>{
 const a=app();a.run(`window.backup={atcoderUser:'alpha',attempts:[{id:'same',problemKey:'ABC001A',result:'WA',source:'atcoder',time:5000},{id:'same',problemKey:'ABC001A',result:'AC',source:'atcoder',time:5000},{id:'wrong',atcoderUser:'beta',problemKey:'ABC001A',result:'AC',source:'atcoder',time:5000}],mock:{id:'m',atcoderUser:'alpha',startedAt:1000,durationMs:60000,labels:['ABC001A','ABC002A','ABC003A'],attempts:[]}};window.backup.mock.attempts=window.backup.attempts;window.normal=normalizeState(window.backup);`);
 assert.equal(a.run('window.normal.attempts.length'),1);
 assert.equal(a.run('window.normal.attempts[0].result'),'AC');
 assert.equal(a.run('window.normal.mock.attempts.length'),1);
 assert.equal(a.run('window.normal.mock.attempts[0].atcoderUser'),'alpha');
});
test('a new mock snapshots the active official account',()=>{
 const a=app();a.run(`problems=problems.map((p,i)=>({...p,level:2+i}));startMock()`);
 assert.equal(a.run('state.mock.atcoderUser'),'alpha');
});
test('fresh study starts with PracticeA and advanced reviews do not jump prerequisites',()=>{
 const data=JSON.parse(fs.readFileSync(path.join(root,'data/problems.json'),'utf8'));
 const a=app();a.context.library=data;
 a.run(`problems=library;state.stars[problems.find(p=>p.level===5).label]=true;`);
 assert.equal(a.run('studyRecommendations()[0].label'),'PracticeA');
 const level0=data.filter(p=>p.level===0).sort((a,b)=>a.order-b.order);
 assert.deepEqual(level0.map(p=>p.order),Array.from({length:level0.length},(_,i)=>i+1));
 assert.equal(level0.at(-1).label,'APG4bPython EX18');
 const js=fs.readFileSync(path.join(root,'data/problems.js'),'utf8');
 const bundled={window:{}};vm.runInNewContext(js,bundled);
 assert.equal(JSON.stringify(bundled.window.CI_PROBLEMS),JSON.stringify(data));
});
