const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const scope = {window:{}, Intl};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../settings.js'),'utf8'),scope);
const settings = scope.window.PlumeSettings;
const plain = value => JSON.parse(JSON.stringify(value));

test('defaults are independently normalized without mutating the caller', () => {
  const input = {profile:{displayName:'Ada'},preferences:{editorFontSize:18},attempts:[{result:'AC'}]};
  const before = JSON.stringify(input);
  const normalized = settings.normalize(input);
  assert.equal(normalized.profile.displayName,'Ada');
  assert.equal(normalized.preferences.editorFontSize,18);
  assert.equal(normalized.preferences.tabSize,4);
  assert.equal(JSON.stringify(input),before);
  assert.equal(normalized.attempts,undefined);
  normalized.preferences.tabSize = 2;
  assert.equal(settings.defaults.preferences.tabSize,4);
});

test('missing and non-record inputs use safe defaults', () => {
  for (const input of [undefined,null,[],false,3,'invalid']) {
    assert.deepEqual(plain(settings.normalize(input)),plain(settings.defaults));
  }
});

test('settings normalize malformed backup values and clamp actual limits', () => {
  const value = settings.normalize({uiLang:'xx',statementLang:'de',theme:'sepia',dailyGoal:1000,
    preferences:{homePage:'/malicious',editorFontSize:100,tabSize:8,lineWrapping:'false',statementFontSize:-3,reduceMotion:'true'}});
  assert.equal(value.uiLang,'zh');
  assert.equal(value.theme,'system');
  assert.equal(value.dailyGoal,50);
  assert.deepEqual(plain(value.preferences),{homePage:'dashboard',editorFontSize:22,tabSize:4,lineWrapping:false,statementFontSize:14,reduceMotion:false});
  for (const bad of ['',null,true,[],{},'NaN',Infinity]) assert.equal(settings.normalize({dailyGoal:bad}).dailyGoal,5);
});

test('all supported preference values survive normalization', () => {
  for(const lang of ['zh','ja','en']) for(const theme of ['system','light','dark']) {
    const n = settings.normalize({uiLang:lang,statementLang:lang,theme,preferences:{homePage:'learn',editorFontSize:'18',tabSize:'2',lineWrapping:true,statementFontSize:'19',reduceMotion:true}});
    assert.equal(n.uiLang,lang); assert.equal(n.statementLang,lang); assert.equal(n.theme,theme);
    assert.equal(n.preferences.tabSize,2); assert.equal(n.preferences.editorFontSize,18);
    assert.equal(n.preferences.homePage,'learn'); assert.equal(n.preferences.reduceMotion,true);
  }
});

test('profile strips controls and bidi overrides and limits Unicode names', () => {
  assert.equal(settings.normalize({profile:{displayName:'  A\u0000q\u202euila  '}}).profile.displayName,'Aquila');
  assert.equal(Array.from(settings.normalize({profile:{displayName:'🦅'.repeat(60)}}).profile.displayName).length,40);
  assert.equal(settings.normalize({profile:{displayName:'   '}}).profile.displayName,'');
});

test('only valid public AtCoder handles are retained', () => {
  assert.equal(settings.normalize({atcoderUser:' user_123 '}).atcoderUser,'user_123');
  for (const value of ['user@example.com','hello world','<script>','a'.repeat(41),{},null]) {
    assert.equal(settings.normalize({atcoderUser:value}).atcoderUser,'');
  }
});

test('profile and product strings cannot inject HTML or event handlers', () => {
  const attack = '"><img src=x onerror=alert(1)>';
  const profile = settings.render({section:'account',uiLang:'en',state:{profile:{displayName:attack}}});
  assert.ok(!profile.includes('<img'));
  assert.ok(profile.includes('&lt;img'));
  const product = settings.render({section:'about',productName:attack,uiLang:'en'});
  assert.ok(!product.includes('<img src=x'));
  assert.ok(product.includes('&lt;img'));
  assert.ok(!product.includes('value=""><'));
});

test('section selection is allowlisted and marks one active navigation item', () => {
  const html = settings.render({section:'__proto__',uiLang:'en'});
  assert.ok(html.includes('data-settings-section="general" aria-current="page"'));
  assert.equal((html.match(/aria-current="page"/g)||[]).length,1);
  assert.ok(!html.includes('undefined'));
});

test('all settings sections and all languages render complete documents', () => {
  for(const lang of ['zh','ja','en']) for(const section of settings.sections) {
    const html = settings.render({uiLang:lang,section,state:settings.defaults});
    assert.ok(html.includes('class="settings-content"'),`${lang}/${section}`);
    assert.ok(!/undefined|\[object Object\]|NaN/.test(html),`${lang}/${section}`);
    assert.equal((html.match(/data-settings-section=/g)||[]).length,8);
  }
});

test('editor and practice controls use the exact validated data paths and bounds', () => {
  const editor = settings.render({section:'editor',uiLang:'en'});
  for(const key of ['editorFontSize','tabSize','lineWrapping']) assert.ok(editor.includes(`data-setting="preferences.${key}"`));
  assert.ok(editor.includes('min="12" max="22"'));
  const practice = settings.render({section:'practice',uiLang:'en'});
  assert.ok(practice.includes('data-setting="dailyGoal"'));
  assert.ok(practice.includes('data-setting="preferences.statementFontSize"'));
  assert.ok(practice.includes('min="14" max="20"'));
});

test('preview styles are normalized numbers, never imported arbitrary CSS', () => {
  const html = settings.render({section:'editor',state:{preferences:{editorFontSize:'14px;background:red',tabSize:'4;display:none',lineWrapping:true}}});
  assert.ok(html.includes('font-size:var(--editor-size,14px);tab-size:4;white-space:pre-wrap'));
  assert.ok(!html.includes('background:red'));
});

test('backup controls share a row, expose import input, and keep reset explicit', () => {
  const html = settings.render({section:'data',uiLang:'en',environment:{storageBytes:2048,lastBackupAt:Date.UTC(2026,9,1)}});
  assert.ok(html.includes('id="settingsImportFile" type="file"'));
  assert.ok(html.includes('data-settings-action="import"'));
  assert.ok(html.includes('data-settings-action="export"'));
  assert.ok(html.includes('data-settings-action="reset"'));
  assert.ok(html.includes('id="storagePersistence"'));
  assert.ok(html.includes('2 KB'));
  assert.ok(html.includes('2026'));
  assert.ok(settings.render({section:'data',uiLang:'en',environment:{isNative:true}}).includes('id="storagePersistence"'));
});

test('the library section lists packs, keeps bundled packs, and offers import, template and export', () => {
  const packs = [
    {id:'ci-original',title:'CI Original Sets',bundled:true,problems:24,sets:6,author:'Plume'},
    {id:'my-practice',title:'<b>My</b> practice',bundled:false,problems:3,sets:0}
  ];
  const html = settings.render({section:'library',uiLang:'en',packs,counts:{total:245,statements:663,samples:630,metadata:214}});
  assert.ok(html.includes('data-settings-action="refresh-metadata"'));
  assert.ok(html.includes('214 / 245'));
  assert.ok(html.includes('<strong>663</strong>'));
  assert.ok(html.includes('id="packImportFile" type="file"'));
  assert.ok(html.includes('data-settings-action="import-pack"'));
  assert.ok(html.includes('data-settings-action="pack-template"'));
  assert.equal((html.match(/data-settings-action="export-pack"/g)||[]).length,2);
  assert.equal((html.match(/data-settings-action="remove-pack"/g)||[]).length,1);
  assert.ok(html.includes('data-pack="my-practice"'));
  assert.ok(!html.includes('<b>My</b>'));
  assert.ok(html.includes('&lt;b&gt;My&lt;/b&gt;'));
  const empty = settings.render({section:'library',uiLang:'ja'});
  assert.ok(empty.includes('data-settings-action="import-pack"'));
  assert.ok(!empty.includes('data-settings-action="remove-pack"'));
});

test('guide contains exactly seven complete original articles in every language', () => {
  assert.deepEqual(Object.keys(settings.helpArticles),['start','editor','scoring','sync','backup','academy','packs']);
  for(const [id,article] of Object.entries(settings.helpArticles)) for(const lang of ['zh','ja','en']) {
    const entry = article[lang];
    assert.ok(entry.title.length>4,`${id}/${lang} title`);
    assert.ok(entry.summary.length>8,`${id}/${lang} summary`);
    assert.ok(entry.sections.length>=3,`${id}/${lang} sections`);
    assert.ok(entry.sections.every(s=>s.title && (s.body?.length || s.steps?.length || s.rows?.length)));
    assert.ok(entry.actions.every(([url,key])=>url.startsWith('/') && typeof key==='string'));
    if(lang==='en') assert.ok(!/[\u3040-\u30ff\u4e00-\u9fff]/.test(JSON.stringify(entry)),`${id} English must not fall back to JA/ZH`);
  }
});

test('each guide renders its own article, real steps, related routes and a back action', () => {
  for(const id of Object.keys(settings.helpArticles)) for(const lang of ['zh','ja','en']) {
    const html = settings.render({section:'guide',article:id,uiLang:lang});
    assert.ok(html.includes('<article class="settings-help-article">'));
    assert.ok(html.includes('data-settings-section="guide"'));
    assert.ok(html.includes('data-settings-route="/'));
    assert.ok(html.includes('<ol>'),`${id}/${lang} steps`);
    assert.ok(!html.includes('undefined'));
  }
});

test('unknown and inherited article names return the guide index', () => {
  for(const id of ['missing','constructor','__proto__']) {
    const html = settings.render({section:'guide',article:id,uiLang:'en'});
    assert.ok(html.includes('class="settings-guide-list"'));
    assert.equal((html.match(/data-help-article=/g)||[]).length,7);
    assert.ok(!html.includes('<article'));
  }
});

test('scoring guidance explains a concrete 200-point example and excludes sample scoring', () => {
  const html = settings.render({section:'guide',article:'scoring',uiLang:'en'});
  assert.ok(html.includes('200 out of 300'));
  assert.ok(html.includes('80 + 5 = 85'));
  assert.ok(html.includes('CE and IE add no penalty'));
  assert.ok(html.includes('Ordinary sample tests do not add mock points'));
});

test('product identity is Plume with a discreet independent Aquila signature', () => {
  const html = settings.render({section:'about',uiLang:'en'});
  assert.ok(html.includes('<h2>Plume</h2>'));
  assert.ok(html.includes('data-settings-action="signature">Aquila</button>'));
  assert.ok(html.includes(`Version ${settings.version}`));
  assert.equal(settings.version,'1.2.0');
  assert.ok(html.includes('href="https://github.com/AquilaTvT/CIP"'));
  assert.ok(!html.includes('Aquila profile'));
  assert.ok(settings.render({section:'about',uiLang:'zh'}).includes('<h2>Plume</h2>'));
});

test('storage and timestamps tolerate missing or damaged imported values', () => {
  for(const bytes of [undefined,NaN,-1,Infinity,'invalid']) assert.equal(settings.formatBytes(bytes),'—');
  assert.equal(settings.formatBytes(0),'0 B');
  assert.equal(settings.formatBytes(1024),'1 KB');
  assert.equal(settings.formatBytes(1048576),'1 MB');
  const html = settings.render({section:'account',uiLang:'en',environment:{lastSync:Infinity}});
  assert.ok(html.includes('Not synced yet'));
});

test('developer attribution is distinct from the initially blank personal profile',()=>{
  assert.equal(settings.normalize({}).profile.displayName,'');
  const profile=settings.render({section:'account',uiLang:'en',state:{}});
  assert.match(profile,/id="setting-profile-displayName"[^>]*value=""/);
  for(const [lang,label] of [['zh','开发者'],['en','Developer'],['ja','開発者']]){
    const html=settings.render({section:'about',uiLang:lang});
    assert.ok(html.includes(label+' · <button'));
    assert.ok(html.includes('data-settings-action="signature">Aquila</button>'));
  }
});
