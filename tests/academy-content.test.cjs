const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {spawnSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const context = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(root, 'data/academy.js'), 'utf8'), context);
vm.runInNewContext(fs.readFileSync(path.join(root, 'data/problems.js'), 'utf8'), context);
vm.runInNewContext(fs.readFileSync(path.join(root, 'data/packs/ci-original.js'), 'utf8'), context);
const academy = JSON.parse(JSON.stringify(context.window.PLUME_ACADEMY));
const lessons = academy.lessons;
const byId = new Map(lessons.map(lesson => [lesson.id, lesson]));
const packLabels = context.window.PLUME_BUNDLED_PACKS.flatMap(pack => pack.problems.map(problem => problem.id));
const problemLabels = new Set([...context.window.CI_PROBLEMS.map(problem => problem.label), ...packLabels]);
const STAGES = ['start', 'python', 'methods', 'sequences', 'graphs', 'synthesis', 'exam'];
const python = process.env.CI_PYTHON || 'python3';

// Each case runs in a fresh working directory holding its data files, as in the app.
const HARNESS = `
import contextlib, io, json, os, sys, tempfile

def execute(source, name, stdin, files):
    home, output, old_stdin = os.getcwd(), io.StringIO(), sys.stdin
    with tempfile.TemporaryDirectory() as directory:
        for file_name, content in files.items():
            with open(os.path.join(directory, file_name), 'w', encoding='utf-8', newline='') as handle:
                handle.write(content)
        os.chdir(directory)
        try:
            sys.stdin = io.StringIO(stdin)
            with contextlib.redirect_stdout(output):
                exec(compile(source, name, 'exec'), {'__name__': '__main__'})
        finally:
            sys.stdin = old_stdin
            os.chdir(home)
    return output.getvalue()
`;

function runCases(lesson, cases) {
  const result = spawnSync(python, ['-c', HARNESS + `
payload = json.load(sys.stdin)
json.dump([execute(payload['source'], '<academy-reference>', case['input'], case.get('files', {})) for case in payload['cases']], sys.stdout)
`], {input: JSON.stringify({source: lesson.solution, cases}), encoding: 'utf8', timeout: 20000});
  assert.ifError(result.error);
  assert.equal(result.status, 0, `${lesson.id}: ${result.stderr}`);
  const outputs = JSON.parse(result.stdout);
  assert.equal(outputs.length, cases.length);
  cases.forEach((item, index) => assert.equal(outputs[index], item.expected, `${lesson.id}, input ${JSON.stringify(item.input)}`));
}

test('academy has 28 ordered lessons with valid acyclic prerequisites and existing practice links', () => {
  assert.equal(academy.version, 2);
  assert.equal(lessons.length, 28);
  assert.equal(byId.size, lessons.length);
  const visited = new Set();
  lessons.forEach((lesson, index) => {
    assert.match(lesson.id, /^[a-z][a-z0-9-]+$/);
    assert.equal(lesson.order, index + 1);
    assert.equal(lesson.stage, STAGES[Math.floor(index / 4)]);
    assert.ok(Number.isInteger(lesson.minutes) && lesson.minutes >= 10 && lesson.minutes <= 60);
    assert.equal(lesson.prerequisiteIds.length, index === 0 ? 0 : 1);
    for (const prerequisite of lesson.prerequisiteIds) assert.ok(visited.has(prerequisite), `${lesson.id}: ${prerequisite}`);
    assert.ok(lesson.relatedProblems.length > 0);
    assert.equal(new Set(lesson.relatedProblems).size, lesson.relatedProblems.length);
    for (const label of lesson.relatedProblems) assert.ok(problemLabels.has(label), `Unknown practice link: ${label}`);
    visited.add(lesson.id);
  });
});

test('every lesson has complete distinct Chinese, English, and Japanese instructional content', () => {
  const fields = ['title', 'summary', 'exerciseTitle', 'task', 'input', 'output', 'hint', 'explanation'];
  for (const lesson of lessons) {
    assert.deepEqual(Object.keys(lesson.content).sort(), ['en', 'ja', 'zh']);
    for (const lang of ['zh', 'en', 'ja']) {
      const content = lesson.content[lang];
      for (const field of fields) assert.ok(typeof content[field] === 'string' && content[field].trim().length > 0, `${lesson.id}/${lang}/${field}`);
      assert.ok(content.sections.length >= 6);
      for (const section of content.sections) {
        assert.ok(section.title.length > 0 && section.body.length >= 30, `${lesson.id}/${lang}: empty section`);
        assert.doesNotMatch(section.body, /<\/?(?:script|iframe|div|p)\b/i);
      }
      assert.ok(content.sections.some(section => typeof section.code === 'string' && section.code.length > 0));
      assert.ok(content.objectives.length >= 3 && content.objectives.every(item=>typeof item==='string'&&item.length>5));
      assert.ok(content.checkpoints.length >= 2 && content.checkpoints.every(item=>item.question.length>5&&item.answer.length>20));
      const prose = [content.title, content.task, ...content.sections.map(section => section.body)].join('\n');
      if (lang === 'en') assert.doesNotMatch(prose, /[\u3040-\u30ff\u3400-\u9fff]/, `${lesson.id}: English fallback`);
      if (lang === 'zh') assert.match(prose, /[\u3400-\u9fff]/, `${lesson.id}: missing Chinese`);
      if (lang === 'ja') assert.match(prose, /[\u3040-\u30ff]/, `${lesson.id}: missing Japanese`);
    }
    for (const field of fields) assert.equal(new Set(['zh', 'en', 'ja'].map(lang => lesson.content[lang][field])).size, 3, `${lesson.id}/${field}: reused translation`);
    assert.equal(lesson.content.zh.sections.length, lesson.content.en.sections.length);
    assert.equal(lesson.content.ja.sections.length, lesson.content.en.sections.length);
  }
});

test('exercise fixtures have distinct-per-lesson inputs and executable Python sources', () => {
  assert.ok(lessons.reduce((sum, lesson) => sum + lesson.tests.length, 0) >= 93);
  const sources = [];
  for (const lesson of lessons) {
    assert.ok(lesson.starter.trim().length > 0 && lesson.solution.trim().length > 0);
    assert.ok(lesson.tests.length >= (lesson.id === 'first-program' ? 1 : 4));
    assert.equal(new Set(lesson.tests.map(item => JSON.stringify([item.input, item.files || {}]))).size, lesson.tests.length, `${lesson.id}: repeated fixtures`);
    for (const item of lesson.tests) {
      assert.equal(typeof item.input, 'string');
      assert.equal(typeof item.expected, 'string');
      assert.ok(item.expected.endsWith('\n'));
      for (const [name, content] of Object.entries(item.files || {})) assert.ok(/^[A-Za-z0-9_][A-Za-z0-9_.-]*$/.test(name) && typeof content === 'string', `${lesson.id}: data file ${name}`);
    }
    sources.push(lesson.starter, lesson.solution, ...lesson.content.en.sections.filter(section => section.code).map(section => section.code));
  }
  const result = spawnSync(python, ['-c', 'import json, sys\nfor source in json.load(sys.stdin):\n    compile(source, "<academy>", "exec")'], {input: JSON.stringify(sources), encoding: 'utf8', timeout: 10000});
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
});

test('every published example produces the exact displayed output in each language',()=>{
  const examples=[];
  for(const lesson of lessons)for(const lang of ['zh','en','ja'])for(const [i,section] of lesson.content[lang].sections.entries()){
    if(!section.code)continue;
    assert.equal(typeof section.output,'string',`${lesson.id}/${lang}/${i}: example needs a visible output`);
    examples.push({id:`${lesson.id}/${lang}/${i}`,source:section.code,input:section.exampleInput||'',files:section.exampleFiles||{},expected:section.output});
  }
  const result=spawnSync(python,['-c',HARNESS+`
examples=json.load(sys.stdin)
for example in examples:
    actual=execute(example['source'], example['id'], example['input'], example['files'])
    assert actual==example['expected'], (example['id'],repr(actual),repr(example['expected']))
print(len(examples))
`],{input:JSON.stringify(examples),encoding:'utf8',timeout:30000});
  assert.ifError(result.error);assert.equal(result.status,0,result.stderr);
  assert.ok(examples.length>=72,'Each lesson includes actual runnable examples');
});

test('authored chapter files reproduce the committed offline bundle',()=>{
  const result=spawnSync(python,['scripts/assemble_academy.py','--check'],{cwd:root,encoding:'utf8',timeout:20000});
  assert.ifError(result.error);assert.equal(result.status,0,result.stdout+result.stderr);
});

for (const lesson of lessons) test(`academy reference solution: ${lesson.id}`, () => runCases(lesson, lesson.tests));

// Small, reproducible independent oracles catch mistakes hidden by the published fixtures.
let seed = 20261024;
function random(max) { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed % max; }
function integers(n, range = 11) { return Array.from({length: n}, () => random(range) - Math.floor(range / 2)); }
function listInput(a) { return `${a.length}\n${a.join(' ')}\n`; }

test('pair-count references agree with an independent incremental-frequency oracle', () => {
  const cases = Array.from({length: 12}, () => {
    const a = integers(random(12) + 1), k = random(11) - 5;
    let count = 0;
    const frequencies = new Map();
    for (const x of a) { count += frequencies.get(k - x) || 0; frequencies.set(x, (frequencies.get(x) || 0) + 1); }
    return {input: `${a.length} ${k}\n${a.join(' ')}\n`, expected: `${count}\n`};
  });
  runCases(byId.get('exhaustive-search'), cases);
});

test('dictionary references agree with independent distinct-value counting', () => {
  const cases = Array.from({length: 12}, () => {
    const a = integers(random(15) + 1), distinct = [...new Set(a)];
    return {input: listInput(a), expected: `${distinct.length} ${Math.max(...distinct.map(x => a.filter(y => y === x).length))}\n`};
  });
  runCases(byId.get('sets-and-dictionaries'), cases);
});

test('sorted adjacent gaps agree with exhaustive pair differences', () => {
  const cases = Array.from({length: 12}, () => {
    const a = integers(random(12) + 2, 101);
    let answer = Infinity;
    for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) answer = Math.min(answer, Math.abs(a[i] - a[j]));
    return {input: listInput(a), expected: `${answer}\n`};
  });
  runCases(byId.get('sorting-and-complexity'), cases);
});

test('prefix-sum references agree with direct range sums including negative values', () => {
  const cases = Array.from({length: 12}, () => {
    const a = integers(random(15) + 1), queries = [], answers = [];
    for (let q = 0; q < 8; q++) {
      const l = random(a.length), r = l + random(a.length - l);
      queries.push(`${l + 1} ${r + 1}`);
      answers.push(a.slice(l, r + 1).reduce((sum, value) => sum + value, 0));
    }
    return {input: `${a.length} 8\n${a.join(' ')}\n${queries.join('\n')}\n`, expected: answers.join('\n') + '\n'};
  });
  runCases(byId.get('prefix-sums'), cases);
});

test('binary search agrees with linear search at all boundaries and duplicates', () => {
  const a = [-4, -4, 0, 0, 0, 3, 7];
  const cases = Array.from({length: 15}, (_, index) => index - 6).map(x => {
    const found = a.findIndex(value => value >= x);
    return {input: `${a.length} ${x}\n${a.join(' ')}\n`, expected: `${found < 0 ? a.length + 1 : found + 1}\n`};
  });
  runCases(byId.get('binary-search'), cases);
});

test('grid BFS agrees with repeated edge relaxation on small mazes', () => {
  const cases = Array.from({length: 16}, () => {
    const h = random(4) + 1, w = random(4) + 1;
    const grid = Array.from({length: h}, () => Array.from({length: w}, () => random(4) === 0 ? '#' : '.'));
    grid[0][0] = grid[h - 1][w - 1] = '.';
    const distances = Array(h * w).fill(Infinity); distances[0] = 0;
    for (let pass = 0; pass < h * w; pass++) {
      for (let r = 0; r < h; r++) for (let c = 0; c < w; c++) if (grid[r][c] === '.') {
        for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < h && nc >= 0 && nc < w && grid[nr][nc] === '.') distances[nr * w + nc] = Math.min(distances[nr * w + nc], distances[r * w + c] + 1);
        }
      }
    }
    const answer = distances[h * w - 1];
    return {input: `${h} ${w}\n${grid.map(row => row.join('')).join('\n')}\n`, expected: `${Number.isFinite(answer) ? answer : -1}\n`};
  });
  runCases(byId.get('breadth-first-search'), cases);
});

test('dynamic-programming references agree with direct enumeration of step sequences', () => {
  function enumerate(remaining) {
    if (remaining === 0) return 1;
    if (remaining < 0) return 0;
    return enumerate(remaining - 1) + enumerate(remaining - 2);
  }
  const cases = Array.from({length: 17}, (_, n) => ({input: `${n}\n`, expected: `${enumerate(n)}\n`}));
  runCases(byId.get('dynamic-programming'), cases);
});

test('two pointers agrees with every contiguous segment on positive arrays', () => {
  const cases = Array.from({length: 32}, () => {
    const a = Array.from({length: random(15) + 1}, () => random(9) + 1), k = random(35);
    let answer = 0;
    for (let i = 0; i < a.length; i++) for (let j = i + 1; j <= a.length; j++) {
      if (a.slice(i, j).reduce((sum, value) => sum + value, 0) <= k) answer = Math.max(answer, j - i);
    }
    return {input: `${a.length} ${k}\n${a.join(' ')}\n`, expected: `${answer}\n`};
  });
  runCases(byId.get('two-pointers'), cases);
});

test('debugging exercise keeps the first maximum, including all-negative arrays', () => {
  const cases = Array.from({length: 16}, () => {
    const a = integers(random(20) + 1), maximum = Math.max(...a);
    return {input: listInput(a), expected: `${a.indexOf(maximum) + 1} ${maximum}\n`};
  });
  runCases(byId.get('debugging'), cases);
});

test('complexity counts remain exact through 10 to the eighteenth power', () => {
  const values = [1n, 2n, 3n, 7n, 8n, 9n, 2n ** 53n - 1n, 2n ** 53n, 2n ** 53n + 1n, 10n ** 18n];
  runCases(byId.get('complexity'), values.map(n => ({input: `${n}\n`, expected: `${n} ${n * (n - 1n) / 2n} ${n.toString(2).length}\n`})));
});

test('parenthesis validation agrees with repeated pair elimination', () => {
  const cases = [];
  for (let length = 1; length <= 7; length++) for (let mask = 0; mask < 2 ** length; mask++) {
    const value = Array.from({length}, (_, i) => mask & (1 << i) ? '(' : ')').join('');
    let rest = value;
    while (rest.includes('()')) rest = rest.replaceAll('()', '');
    cases.push({input: value + '\n', expected: (rest ? 'No' : 'Yes') + '\n'});
  }
  runCases(byId.get('stacks-and-queues'), cases);
});

function componentCount(vertices, edges) {
  const parent = Array.from({length: vertices}, (_, i) => i);
  function find(v) { while (parent[v] !== v) v = parent[v]; return v; }
  for (const [u, v] of edges) parent[find(u)] = find(v);
  return new Set(parent.map((_, v) => find(v))).size;
}

test('iterative DFS components agree with union-find, including loops and repeated edges', () => {
  const cases = Array.from({length: 24}, () => {
    const n = random(15) + 1, edges = Array.from({length: random(35)}, () => [random(n), random(n)]);
    return {input: `${n} ${edges.length}\n` + edges.map(([u, v]) => `${u + 1} ${v + 1}\n`).join(''), expected: `${componentCount(n, edges)}\n`};
  });
  runCases(byId.get('depth-first-search'), cases);
});

test('grid regions agree with union-find without diagonal connections', () => {
  const cases = Array.from({length: 24}, () => {
    const h = random(5) + 1, w = random(5) + 1;
    const grid = Array.from({length: h}, () => Array.from({length: w}, () => random(3) ? '.' : '#'));
    const cells = new Map(), edges = [];
    for (let r = 0; r < h; r++) for (let c = 0; c < w; c++) if (grid[r][c] === '.') cells.set(`${r},${c}`, cells.size);
    for (const [key, id] of cells) {
      const [r, c] = key.split(',').map(Number);
      for (const next of [`${r + 1},${c}`, `${r},${c + 1}`]) if (cells.has(next)) edges.push([id, cells.get(next)]);
    }
    return {input: `${h} ${w}\n${grid.map(row => row.join('')).join('\n')}\n`, expected: `${componentCount(cells.size, edges)}\n`};
  });
  runCases(byId.get('grid-search'), cases);
});

test('0/1 knapsack agrees with exhaustive subset values', () => {
  const cases = Array.from({length: 32}, () => {
    const items = Array.from({length: random(9)}, () => [random(9) + 1, random(21)]), capacity = random(25);
    let answer = 0;
    for (let mask = 0; mask < 2 ** items.length; mask++) {
      let weight = 0, value = 0;
      items.forEach(([w, v], i) => { if (mask & (1 << i)) { weight += w; value += v; } });
      if (weight <= capacity) answer = Math.max(answer, value);
    }
    return {input: `${items.length} ${capacity}\n` + items.map(item => item.join(' ') + '\n').join(''), expected: `${answer}\n`};
  });
  runCases(byId.get('knapsack'), cases);
});

test('interval greedy agrees with the best exhaustive feasible subset', () => {
  const cases = Array.from({length: 32}, () => {
    const intervals = Array.from({length: random(9)}, () => { const start = random(14); return [start, start + random(7) + 1]; });
    let answer = 0;
    for (let mask = 0; mask < 2 ** intervals.length; mask++) {
      const selected = intervals.filter((_, i) => mask & (1 << i)).sort((a, b) => a[0] - b[0]);
      if (selected.every((item, i) => !i || item[0] >= selected[i - 1][1])) answer = Math.max(answer, selected.length);
    }
    return {input: `${intervals.length}\n` + intervals.map(item => item.join(' ') + '\n').join(''), expected: `${answer}\n`};
  });
  runCases(byId.get('greedy'), cases);
});

test('nested-loop counts agree with filtering the flattened rectangular grid', () => {
  const cases = Array.from({length: 24}, () => {
    const h = random(6) + 1, w = random(5) + 1, x = random(11) - 5;
    const grid = Array.from({length: h}, () => integers(w));
    return {input: `${h} ${w} ${x}\n${grid.map(row => row.join(' ')).join('\n')}\n`, expected: `${grid.flat().filter(value => value > x).length}\n`};
  });
  runCases(byId.get('nested-loops'), cases);
});

test('integrated budget queries agree with exhaustive task subsets', () => {
  const cases = Array.from({length: 32}, () => {
    const durations = Array.from({length: random(8) + 1}, () => random(12) + 1), budgets = [0, 1, 15, 60, 10 ** 18];
    const answers = budgets.map(budget => {
      let answer = 0;
      for (let mask = 0; mask < 2 ** durations.length; mask++) {
        const chosen = durations.filter((_, i) => mask & (1 << i));
        if (chosen.reduce((sum, value) => sum + value, 0) <= budget) answer = Math.max(answer, chosen.length);
      }
      return answer;
    });
    return {input: `${durations.length} ${budgets.length}\n${durations.join(' ')}\n${budgets.join('\n')}\n`, expected: answers.join('\n') + '\n'};
  });
  runCases(byId.get('exam-workflow'), cases);
});

test('score reports agree with direct aggregation, including comments, CRLF and a missing final newline', () => {
  const names = ['amy', 'bob', 'cat', 'dan', 'eve'], subjects = ['art', 'math', 'music'];
  const cases = Array.from({length: 16}, () => {
    const lines = [], totals = new Map(), counts = new Map();
    const records = random(12) + 1;
    for (let i = 0; i < records; i++) {
      if (random(5) === 0) lines.push(random(2) ? '' : '  # note');
      const name = names[random(names.length)], score = random(101);
      lines.push(`${name} ${subjects[random(subjects.length)]} ${score}`);
      totals.set(name, (totals.get(name) || 0) + score);
      counts.set(name, (counts.get(name) || 0) + 1);
    }
    const eol = random(3) === 0 ? '\r\n' : '\n';
    const text = lines.join(eol) + (random(4) === 0 ? '' : eol);
    const order = [...totals.keys()].sort((a, b) => totals.get(b) - totals.get(a) || (a < b ? -1 : 1));
    return {input: '', files: {'scores.txt': text}, expected: order.map(name => `${name} ${totals.get(name)} ${counts.get(name)}\n`).join('')};
  });
  runCases(byId.get('files-and-parsing'), cases);
});

test('memoized decoding agrees with enumerating every split of the digits', () => {
  function decodings(s) {
    if (!s) return 1;
    let count = 0;
    if (s[0] !== '0') {
      count += decodings(s.slice(1));
      if (s.length >= 2 && Number(s.slice(0, 2)) <= 26) count += decodings(s.slice(2));
    }
    return count;
  }
  const digits = '0112226789';
  const cases = Array.from({length: 40}, () => {
    const s = Array.from({length: random(10) + 1}, () => digits[random(digits.length)]).join('');
    return {input: `${s}\n`, expected: `${decodings(s) % 1000000007}\n`};
  });
  runCases(byId.get('recursion-and-memoization'), cases);
});

test('Dijkstra distances agree with Floyd–Warshall on graphs with parallel edges, loops and zero weights', () => {
  const cases = Array.from({length: 24}, () => {
    const n = random(7) + 1, edges = Array.from({length: random(12)}, () => [random(n), random(n), random(6)]);
    const d = Array.from({length: n}, (_, i) => Array.from({length: n}, (_, j) => (i === j ? 0 : Infinity)));
    for (const [u, v, w] of edges) { d[u][v] = Math.min(d[u][v], w); d[v][u] = Math.min(d[v][u], w); }
    for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) d[i][j] = Math.min(d[i][j], d[i][k] + d[k][j]);
    return {input: `${n} ${edges.length}\n` + edges.map(([u, v, w]) => `${u + 1} ${v + 1} ${w}\n`).join(''), expected: d[0].map(x => (x === Infinity ? -1 : x)).join('\n') + '\n'};
  });
  runCases(byId.get('heaps-and-shortest-paths'), cases);
});

test('teleporter cycle skipping agrees with direct simulation, also for K near 10 to the eighteenth', () => {
  // With at most 8 towns every cycle length divides 840, so a huge K can be replaced by a small equivalent one.
  function walk(a, k) { let town = 1; for (let i = 0; i < k; i++) town = a[town - 1]; return town; }
  const cases = Array.from({length: 40}, (_, index) => {
    const n = random(8) + 1, a = Array.from({length: n}, () => random(n) + 1);
    const k = index % 2 ? 10n ** 18n - BigInt(random(1000)) : BigInt(random(60) + 1);
    const small = k > 8n ? 8n + ((k - 8n) % 840n) : k;
    return {input: `${n} ${k}\n${a.join(' ')}\n`, expected: `${walk(a, Number(small))}\n`};
  });
  runCases(byId.get('simulation-and-parsing'), cases);
});
