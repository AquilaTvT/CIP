/* The problem-pack format: validation, storage, rendering and output checking. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {spawnSync} = require('node:child_process');
const root = path.join(__dirname, '..');

function memoryStorage() {
  const values = new Map();
  return {getItem: key => (values.has(key) ? values.get(key) : null), setItem: (key, value) => values.set(key, String(value)), removeItem: key => values.delete(key), values};
}
function load({withBundled = true} = {}) {
  const storage = memoryStorage();
  const scope = {window: {}, console: {...console, warn() {}}, URL, JSON};
  scope.window.localStorage = storage;
  vm.createContext(scope);
  if (withBundled) vm.runInContext(fs.readFileSync(path.join(root, 'data/packs/ci-original.js'), 'utf8'), scope);
  vm.runInContext(fs.readFileSync(path.join(root, 'library.js'), 'utf8'), scope);
  return {library: scope.window.PlumeLibrary, storage, scope};
}
const plain = value => JSON.parse(JSON.stringify(value));
const errorsOf = fn => {
  try {
    fn();
  } catch (error) {
    assert.equal(error.name, 'PackError');
    return error.problems.join('\n');
  }
  assert.fail('expected a PackError');
};

test('the bundled original sets load as six four-part sets worth 100 points each', () => {
  const {library} = load();
  const problems = library.problems();
  assert.equal(problems.length, 24);
  const sets = new Map();
  for (const problem of problems) {
    assert.equal(problem.source, 'pack');
    assert.equal(problem.bundled, true);
    assert.ok(problem.samples.length >= 1 && problem.tests.length >= 6, problem.label);
    assert.ok(problem.solution?.code, problem.label);
    for (const lang of ['zh', 'ja', 'en']) {
      assert.ok(library.pick(problem.statement, lang).lang === lang, `${problem.label} ${lang}`);
      assert.ok(library.pick(problem.set.preamble, lang).text.length > 100);
    }
    const entry = sets.get(problem.set.id) || [];
    entry.push(problem);
    sets.set(problem.set.id, entry);
  }
  assert.equal(sets.size, 6);
  for (const parts of sets.values()) {
    assert.deepEqual(parts.map(p => p.part), [1, 2, 3, 4]);
    assert.equal(parts.reduce((sum, p) => sum + p.points, 0), 100);
  }
  // Set files reach every part; a part may add its own sample program.
  const vm2 = problems.find(p => p.label === 'CI-VM-2');
  assert.ok(vm2.files['program.txt'].includes('loop:'));
  assert.ok(problems.find(p => p.label === 'CI-LOG-3').files['access.log'].startsWith('08:59:58 alice'));
  assert.ok(vm2.samples[1].files['program.txt'].includes('gcd'));
});

test('the committed pack JSON and script carry the same data and pass the build check', () => {
  const {scope} = load();
  const json = JSON.parse(fs.readFileSync(path.join(root, 'data/packs/ci-original.json'), 'utf8'));
  assert.deepEqual(plain(scope.window.PLUME_BUNDLED_PACKS[0]), json);
  if (process.env.CI_SKIP_PACK_BUILD) return;
  const result = spawnSync(process.env.CI_PYTHON || 'python3', ['scripts/build_packs.py', '--check'], {cwd: root, encoding: 'utf8', timeout: 300000});
  assert.equal(result.status, 0, result.stdout + result.stderr);
});

test('the template is a valid pack and survives an export and re-import unchanged', () => {
  const {library} = load({withBundled: false});
  const pack = library.validate(library.template());
  assert.equal(pack.problems[0].timeLimitMs, 6000);
  const again = library.validate(JSON.parse(JSON.stringify(library.serialize(pack))));
  assert.deepEqual(plain(again), plain(pack));
  const bundled = JSON.parse(fs.readFileSync(path.join(root, 'data/packs/ci-original.json'), 'utf8'));
  assert.deepEqual(plain(library.validate(library.serialize(library.validate(bundled)))), plain(library.validate(bundled)));
});

test('invalid packs are rejected with every problem listed', () => {
  const {library} = load({withBundled: false});
  const base = library.template();
  const broken = {
    ...base,
    format: 'zip',
    version: 2,
    id: 'Bad ID',
    sets: [{id: 'a', title: 'A', files: {'../escape.txt': 'x', 'ok.txt': 3}}, {id: 'a', title: 'Again'}],
    problems: [
      {id: 'P1', set: 'missing', title: 'One', statement: 'Text', samples: [{input: '', output: '1\n'}], url: 'http://example.com', checker: 'float:2'},
      {id: 'P1', title: '', statement: '', samples: []},
      'not an object'
    ]
  };
  const text = errorsOf(() => library.validate(broken));
  for (const fragment of ['format must be', 'version must be', 'id must use', 'invalid file name "../escape.txt"', 'file "ok.txt" must contain text', 'duplicate set id', 'unknown set "missing"', 'must use https', 'checker must be', 'duplicate problem id "P1"', 'add at least one sample or test', 'problems[2] must be an object']) {
    assert.ok(text.includes(fragment), `missing: ${fragment}\n${text}`);
  }
  assert.match(errorsOf(() => library.parse('{oops')), /not valid JSON/);
  assert.match(errorsOf(() => library.parse('x'.repeat(2600000))), /smaller than/);
  assert.match(errorsOf(() => library.validate([])), /not a problem pack/);
});

test('installing keeps labels unique across AtCoder tasks, bundled sets and other packs', () => {
  const {library, storage} = load();
  const mine = library.validate(library.template());
  assert.equal(library.install(mine, {builtinLabels: new Set(['ABC001A']), storage}).replaced, false);
  assert.equal(library.packs().length, 2);
  assert.equal(library.install(mine, {storage}).replaced, true, 'the same id replaces the earlier version');
  const clash = library.validate({...library.template(), id: 'another', problems: [{...library.template().problems[0], id: 'ABC001A'}]});
  assert.match(errorsOf(() => library.install(clash, {builtinLabels: new Set(['ABC001A']), storage})), /already used by AtCoder/);
  const shadow = library.validate({...library.template(), id: 'shadow', problems: [{...library.template().problems[0], id: 'CI-LOG-1'}]});
  assert.match(errorsOf(() => library.install(shadow, {storage})), /already used by ci-original/);
  const sameId = library.validate({...library.template(), id: 'ci-original', problems: [{...library.template().problems[0], id: 'NEW-1'}]});
  assert.match(errorsOf(() => library.install(sameId, {storage})), /bundled pack/);
  const other = library.validate({...library.template(), id: 'other', problems: [{...library.template().problems[0], id: 'MY-1'}]});
  assert.match(errorsOf(() => library.install(other, {storage})), /already used by my-practice/);
  assert.equal(library.exportInstalled().length, 1);
  assert.equal(library.remove('my-practice', storage), true);
  assert.equal(library.remove('my-practice', storage), false);
  assert.equal(storage.getItem(library.STORAGE_KEY), null);
  assert.equal(library.packs().length, 1);
});

test('installed packs stay within the storage budget and damaged storage is ignored', () => {
  const {library, storage} = load({withBundled: false});
  const big = library.validate({...library.template(), id: 'big', problems: [{...library.template().problems[0], tests: [{input: '', output: 'x'.repeat(1500000)}, {input: '', output: 'y'.repeat(1600000)}]}]});
  assert.match(errorsOf(() => library.install(big, {storage})), /storage budget/);
  assert.equal(storage.getItem(library.STORAGE_KEY), null);
  storage.setItem(library.STORAGE_KEY, '{"version":1,"packs":[{"format":"plume-pack"}, 7]}');
  assert.equal(library.reload().length, 0);
  storage.setItem(library.STORAGE_KEY, 'not json');
  assert.equal(library.reload().length, 0);
  library.replaceAll([library.template()], storage);
  assert.equal(library.packs().length, 1);
  library.replaceAll([], storage);
  assert.equal(storage.getItem(library.STORAGE_KEY), null);
});

test('markdown keeps to a safe subset: no raw HTML, no script links, real tables and code', () => {
  const {library} = load({withBundled: false});
  const html = library.markdown([
    '### Input',
    '',
    'Text with `code <b>`, **bold**, *em*, $x < y$ and [a link](https://example.com/a?b=1) <img src=x onerror=alert(1)>.',
    '[bad](javascript:alert(1))',
    '',
    '| a | b |',
    '| --- | --- |',
    '| `1` | <i>2</i> |',
    '',
    '```',
    'print("<tag>")',
    '```',
    '',
    '- one',
    '- two',
    '',
    '1. first',
    '2. second',
    '',
    '中文第一行',
    '第二行'
  ].join('\n'));
  assert.ok(html.includes('<h4>Input</h4>'));
  assert.ok(html.includes('<code>code &lt;b&gt;</code>'));
  assert.ok(html.includes('<strong>bold</strong>') && html.includes('<em>em</em>'));
  assert.ok(html.includes('$x &lt; y$'));
  assert.ok(html.includes('<a href="https://example.com/a?b=1">a link</a>'));
  assert.ok(!/<img|<i>|href="javascript/i.test(html));
  assert.ok(html.includes('<table><thead><tr><th>a</th><th>b</th></tr></thead><tbody><tr><td><code>1</code></td><td>&lt;i&gt;2&lt;/i&gt;</td></tr></tbody></table>'));
  assert.ok(html.includes('<pre>print(&quot;&lt;tag&gt;&quot;)\n</pre>'));
  assert.ok(html.includes('<ul><li>one</li><li>two</li></ul>') && html.includes('<ol><li>first</li><li>second</li></ol>'));
  assert.ok(html.includes('<p>中文第一行第二行</p>'), 'CJK lines join without a space');
});

test('output checkers: exact, tokens, float tolerance and task-specific judges', () => {
  const {library} = load({withBundled: false});
  const check = (rule, actual, expected, input = '') => library.check(rule, {input, actual, expected});
  assert.equal(check({type: 'exact'}, '1 2  \r\n3\n\n', '1 2\n3'), true);
  assert.equal(check({type: 'exact'}, ' 1 2', '1 2'), false, 'leading spaces matter');
  assert.equal(check({type: 'tokens'}, '1\n2   3', '1 2 3\n'), true);
  assert.equal(check({type: 'float', tolerance: 1e-6}, '0.3333333', '0.333333333'), true);
  assert.equal(check({type: 'float', tolerance: 1e-6}, '0.3334', '0.333333333'), false);
  assert.equal(check({type: 'float', tolerance: 1e-6}, '1000000.5', '1000000.0'), true, 'relative error for large values');
  assert.equal(check({type: 'float', tolerance: 1e-6}, 'Yes 1.0', 'Yes 1.0000001'), true);
  assert.equal(check({type: 'float', tolerance: 1e-6}, 'No 1.0', 'Yes 1.0'), false);
  assert.deepEqual(plain(library.checkerFor({label: 'ABC138B'})), {type: 'float', tolerance: 1e-5});
  assert.deepEqual(plain(library.checkerFor({label: 'ABC001A'})), {type: 'exact'});
  assert.deepEqual(plain(library.checkerFor({label: 'P', checker: {type: 'tokens'}})), {type: 'tokens'});
  const otoshidama = library.checkerFor({label: 'ABC085C'});
  assert.equal(check(otoshidama, '0 9 0', '4 0 5', '9 45000'), true, 'another valid combination');
  assert.equal(check(otoshidama, '4 0 4', '4 0 5', '9 45000'), false);
  assert.equal(check(otoshidama, '-1 -1 -1', '-1 -1 -1', '20 196000'), true);
  const cycle = library.checkerFor({label: 'ABC311C'});
  assert.equal(check(cycle, '3\n1 6 4', '4\n7 5 3 2', '7\n6 7 2 1 3 4 5'), true, 'a different valid cycle');
  assert.equal(check(cycle, '3\n7 5 3', '4\n7 5 3 2', '7\n6 7 2 1 3 4 5'), false, '3 does not lead back to 7');
  assert.equal(check(cycle, '2\n7 5', '4\n7 5 3 2', '7\n6 7 2 1 3 4 5'), false);
});
