/* Problem library: bundled AtCoder tasks, problem packs, statements and output checkers.
 * Pure data handling. Persistence of installed packs is a single localStorage key that the
 * desktop app mirrors to its native snapshot. */
(function (root) {
  'use strict';

  const FORMAT = 'plume-pack';
  const VERSION = 1;
  const STORAGE_KEY = 'plumeProblemPacks.v1';
  const LANGS = ['zh', 'ja', 'en'];
  const MAX_PACK_CHARS = 2500000;
  const MAX_INSTALLED_CHARS = 3000000;
  const PACK_ID = /^[a-z0-9][a-z0-9-]{1,47}$/;
  const PROBLEM_ID = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,39}$/;
  const FILE_NAME = /^[A-Za-z0-9_][A-Za-z0-9_.-]{0,63}$/;

  class PackError extends Error {
    constructor(problems) {
      super(problems.join('\n'));
      this.name = 'PackError';
      this.problems = problems;
    }
  }

  const isRecord = value => !!value && typeof value === 'object' && !Array.isArray(value);
  const text = (value, max) => (typeof value === 'string' ? value.slice(0, max) : '');

  // A localized value is either one string (shown in every language) or {zh, ja, en}.
  function localized(value, max, where, problems, required = false) {
    if (typeof value === 'string') {
      if (!value.trim() && required) problems.push(`${where}: text is empty`);
      return value.trim() ? {any: value.slice(0, max)} : {};
    }
    const out = {};
    if (isRecord(value)) {
      for (const lang of LANGS) if (typeof value[lang] === 'string' && value[lang].trim()) out[lang] = value[lang].slice(0, max);
    }
    if (required && !Object.keys(out).length) problems.push(`${where}: provide a string or at least one of zh, ja, en`);
    return out;
  }

  function pick(value, lang) {
    if (!value) return {text: '', lang: null};
    if (value.any !== undefined) return {text: value.any, lang: null};
    if (value[lang] !== undefined) return {text: value[lang], lang};
    for (const other of LANGS) if (value[other] !== undefined) return {text: value[other], lang: other};
    return {text: '', lang: null};
  }

  function languagesOf(value) {
    if (!value) return [];
    return value.any !== undefined ? LANGS.slice() : LANGS.filter(lang => value[lang] !== undefined);
  }

  function files(value, where, problems) {
    const out = {};
    if (value === undefined) return out;
    if (!isRecord(value)) {
      problems.push(`${where}: files must be an object of file name to text`);
      return out;
    }
    for (const [name, content] of Object.entries(value)) {
      if (!FILE_NAME.test(name)) problems.push(`${where}: invalid file name "${name}"`);
      else if (typeof content !== 'string') problems.push(`${where}: file "${name}" must contain text`);
      else out[name] = content;
    }
    return out;
  }

  function cases(value, where, problems) {
    if (value === undefined) return [];
    if (!Array.isArray(value)) {
      problems.push(`${where} must be an array`);
      return [];
    }
    return value.slice(0, 200).map((item, index) => {
      const at = `${where}[${index}]`;
      if (!isRecord(item)) {
        problems.push(`${at} must be an object`);
        return null;
      }
      const output = item.output ?? item.expected;
      if (typeof item.input !== 'string' && item.input !== undefined) problems.push(`${at}.input must be text`);
      if (typeof output !== 'string') problems.push(`${at}.output must be text`);
      return {input: text(item.input, 4000000), expected: text(output, 4000000), files: files(item.files, at, problems)};
    }).filter(Boolean);
  }

  function checker(value, where, problems) {
    if (value === undefined || value === 'exact') return {type: 'exact'};
    if (value === 'tokens') return {type: 'tokens'};
    const match = typeof value === 'string' && value.match(/^float:(\d+(?:\.\d+)?(?:e-?\d+)?)$/i);
    if (match && Number(match[1]) > 0 && Number(match[1]) < 1) return {type: 'float', tolerance: Number(match[1])};
    problems.push(`${where}: checker must be "exact", "tokens" or "float:<tolerance>"`);
    return {type: 'exact'};
  }

  /** Validate untrusted pack JSON. Returns a normalized pack or throws PackError. */
  function validate(raw) {
    const problems = [];
    if (!isRecord(raw)) throw new PackError(['The file is not a problem pack object.']);
    if (raw.format !== FORMAT) problems.push(`format must be "${FORMAT}"`);
    if (raw.version !== VERSION) problems.push(`version must be ${VERSION}`);
    if (typeof raw.id !== 'string' || !PACK_ID.test(raw.id)) problems.push('id must use 2–48 lowercase letters, digits or hyphens');
    const pack = {
      id: typeof raw.id === 'string' ? raw.id : '',
      title: localized(raw.title, 120, 'title', problems, true),
      description: localized(raw.description, 2000, 'description', problems),
      author: text(raw.author, 120),
      license: text(raw.license, 200),
      sets: [],
      problems: []
    };
    const setIds = new Set();
    if (raw.sets !== undefined && !Array.isArray(raw.sets)) problems.push('sets must be an array');
    (Array.isArray(raw.sets) ? raw.sets : []).slice(0, 100).forEach((set, index) => {
      const at = `sets[${index}]`;
      if (!isRecord(set) || typeof set.id !== 'string' || !PROBLEM_ID.test(set.id)) {
        problems.push(`${at}: id is missing or invalid`);
        return;
      }
      if (setIds.has(set.id)) problems.push(`${at}: duplicate set id "${set.id}"`);
      setIds.add(set.id);
      pack.sets.push({
        id: set.id,
        title: localized(set.title, 120, `${at}.title`, problems, true),
        preamble: localized(set.preamble, 60000, `${at}.preamble`, problems),
        files: files(set.files, at, problems),
        minutes: Number.isInteger(set.minutes) && set.minutes >= 10 && set.minutes <= 300 ? set.minutes : 150
      });
    });
    if (!Array.isArray(raw.problems) || !raw.problems.length) problems.push('problems must be a non-empty array');
    const ids = new Set();
    (Array.isArray(raw.problems) ? raw.problems : []).slice(0, 500).forEach((item, index) => {
      const at = `problems[${index}]`;
      if (!isRecord(item)) {
        problems.push(`${at} must be an object`);
        return;
      }
      if (typeof item.id !== 'string' || !PROBLEM_ID.test(item.id)) problems.push(`${at}: id must be 1–40 letters, digits, "_", "." or "-"`);
      else if (ids.has(item.id)) problems.push(`${at}: duplicate problem id "${item.id}"`);
      ids.add(item.id);
      if (item.set !== undefined && !setIds.has(item.set)) problems.push(`${at}: unknown set "${item.set}"`);
      const format = item.format === 'html' ? 'html' : 'markdown';
      const level = Number.isInteger(item.level) && item.level >= 0 && item.level <= 5 ? item.level : 2;
      const limit = Number(item.timeLimit);
      const problem = {
        id: typeof item.id === 'string' ? item.id : '',
        set: typeof item.set === 'string' ? item.set : '',
        title: localized(item.title, 160, `${at}.title`, problems, true),
        level,
        points: Number.isInteger(item.points) && item.points > 0 && item.points <= 10000 ? item.points : 100,
        format,
        statement: localized(item.statement, 200000, `${at}.statement`, problems, true),
        samples: cases(item.samples, `${at}.samples`, problems),
        tests: cases(item.tests, `${at}.tests`, problems),
        files: files(item.files, at, problems),
        checker: checker(item.checker, at, problems),
        timeLimitMs: Number.isFinite(limit) && limit >= 1 && limit <= 20 ? Math.round(limit * 1000) : 6000,
        url: '',
        solution: null
      };
      if (typeof item.url === 'string' && item.url) {
        try {
          const url = new URL(item.url);
          if (url.protocol === 'https:') problem.url = url.href;
          else problems.push(`${at}.url must use https`);
        } catch {
          problems.push(`${at}.url is not a valid URL`);
        }
      }
      if (isRecord(item.solution) && typeof item.solution.code === 'string' && item.solution.code.trim()) {
        problem.solution = {code: item.solution.code.slice(0, 200000), explanation: localized(item.solution.explanation, 60000, `${at}.solution.explanation`, problems)};
      }
      if (!problem.samples.length && !problem.tests.length) problems.push(`${at}: add at least one sample or test`);
      pack.problems.push(problem);
    });
    if (problems.length) throw new PackError(problems.slice(0, 40));
    return pack;
  }

  function parse(textValue) {
    if (typeof textValue !== 'string' || textValue.length > MAX_PACK_CHARS) {
      throw new PackError([`A pack must be a JSON file smaller than ${Math.round(MAX_PACK_CHARS / 1e6 * 10) / 10} MB.`]);
    }
    let raw;
    try {
      raw = JSON.parse(textValue);
    } catch (error) {
      throw new PackError([`The file is not valid JSON: ${error.message}`]);
    }
    return validate(raw);
  }

  // ---------------------------------------------------------------- storage

  function readInstalled(storage = root.localStorage) {
    try {
      const stored = JSON.parse(storage?.getItem(STORAGE_KEY) || 'null');
      if (!isRecord(stored) || !Array.isArray(stored.packs)) return [];
      const valid = [];
      for (const raw of stored.packs) {
        try {
          valid.push(validate(raw));
        } catch (error) {
          console.warn('Ignoring an invalid stored problem pack', error);
        }
      }
      return valid;
    } catch {
      return [];
    }
  }

  let cache = null;
  function bundled() {
    const list = [];
    for (const raw of root.PLUME_BUNDLED_PACKS || []) {
      try {
        list.push({...validate(raw), bundled: true});
      } catch (error) {
        console.warn('Bundled problem pack failed validation', error);
      }
    }
    return list;
  }
  function packs() {
    if (!cache) cache = {bundled: bundled(), installed: readInstalled()};
    return [...cache.bundled, ...cache.installed];
  }
  function reload() {
    cache = null;
    problemCache = null;
    return packs();
  }

  // Serialize the original-format record so exports re-import unchanged.
  function serialize(pack) {
    const loc = value => (value && value.any !== undefined ? value.any : value && Object.keys(value).length ? {...value} : undefined);
    const caseOut = list => list.map(item => ({input: item.input, output: item.expected, ...(Object.keys(item.files).length ? {files: item.files} : {})}));
    return {
      format: FORMAT,
      version: VERSION,
      id: pack.id,
      title: loc(pack.title),
      ...(loc(pack.description) ? {description: loc(pack.description)} : {}),
      ...(pack.author ? {author: pack.author} : {}),
      ...(pack.license ? {license: pack.license} : {}),
      ...(pack.sets.length
        ? {sets: pack.sets.map(set => ({id: set.id, title: loc(set.title), ...(loc(set.preamble) ? {preamble: loc(set.preamble)} : {}), ...(Object.keys(set.files).length ? {files: set.files} : {}), minutes: set.minutes}))}
        : {}),
      problems: pack.problems.map(problem => ({
        id: problem.id,
        ...(problem.set ? {set: problem.set} : {}),
        title: loc(problem.title),
        level: problem.level,
        points: problem.points,
        ...(problem.format === 'html' ? {format: 'html'} : {}),
        statement: loc(problem.statement),
        samples: caseOut(problem.samples),
        ...(problem.tests.length ? {tests: caseOut(problem.tests)} : {}),
        ...(Object.keys(problem.files).length ? {files: problem.files} : {}),
        ...(problem.checker.type !== 'exact' ? {checker: problem.checker.type === 'float' ? `float:${problem.checker.tolerance}` : problem.checker.type} : {}),
        timeLimit: problem.timeLimitMs / 1000,
        ...(problem.url ? {url: problem.url} : {}),
        ...(problem.solution ? {solution: {code: problem.solution.code, ...(loc(problem.solution.explanation) ? {explanation: loc(problem.solution.explanation)} : {})}} : {})
      }))
    };
  }

  /** Install or replace a user pack. Labels must stay unique across the whole library. */
  function install(pack, {builtinLabels = new Set(), storage = root.localStorage} = {}) {
    const current = readInstalled(storage);
    const shipped = cache?.bundled || bundled();
    const others = [...shipped, ...current.filter(item => item.id !== pack.id)];
    if (shipped.some(item => item.id === pack.id)) throw new PackError([`"${pack.id}" is the id of a bundled pack. Choose another id.`]);
    const taken = new Map();
    for (const label of builtinLabels) taken.set(label, 'AtCoder');
    for (const other of others) for (const problem of other.problems) taken.set(problem.id, other.id);
    const conflicts = pack.problems.filter(problem => taken.has(problem.id)).map(problem => `Problem id "${problem.id}" is already used by ${taken.get(problem.id)}.`);
    if (conflicts.length) throw new PackError(conflicts.slice(0, 20));
    const replaced = current.some(item => item.id === pack.id);
    const next = [...current.filter(item => item.id !== pack.id), pack];
    const serialized = JSON.stringify({version: 1, packs: next.map(serialize)});
    if (serialized.length > MAX_INSTALLED_CHARS) throw new PackError(['Installed packs would exceed the local storage budget (3 MB). Remove a pack or split large test data.']);
    storage.setItem(STORAGE_KEY, serialized);
    reload();
    return {pack, replaced};
  }

  function remove(id, storage = root.localStorage) {
    const current = readInstalled(storage);
    const next = current.filter(item => item.id !== id);
    if (next.length === current.length) return false;
    if (next.length) storage.setItem(STORAGE_KEY, JSON.stringify({version: 1, packs: next.map(serialize)}));
    else storage.removeItem(STORAGE_KEY);
    reload();
    return true;
  }

  function replaceAll(list, storage = root.localStorage) {
    const valid = [];
    for (const raw of Array.isArray(list) ? list : []) valid.push(validate(raw));
    if (valid.length) storage.setItem(STORAGE_KEY, JSON.stringify({version: 1, packs: valid.map(serialize)}));
    else storage.removeItem(STORAGE_KEY);
    reload();
  }

  function exportInstalled() {
    return readInstalled().map(serialize);
  }

  // ---------------------------------------------------------------- problems

  let problemCache = null;
  /** Flattened problem records in the same shape app.js uses for AtCoder tasks. */
  function problems() {
    if (problemCache) return problemCache;
    const list = [];
    packs().forEach((pack, packIndex) => {
      const sets = new Map(pack.sets.map((set, index) => [set.id, {...set, index}]));
      const partCounter = new Map();
      pack.problems.forEach((problem, index) => {
        const set = problem.set ? sets.get(problem.set) : null;
        const part = set ? (partCounter.get(set.id) || 0) + 1 : 0;
        if (set) partCounter.set(set.id, part);
        list.push({
          label: problem.id,
          source: 'pack',
          packId: pack.id,
          packTitle: pack.title,
          bundled: !!pack.bundled,
          set: set ? {id: set.id, title: set.title, preamble: set.preamble, minutes: set.minutes, index: set.index} : null,
          part,
          level: problem.level,
          order: 100000 + packIndex * 1000 + index,
          title: problem.title,
          statement: problem.statement,
          format: problem.format,
          samples: problem.samples,
          tests: problem.tests,
          files: {...(set ? set.files : {}), ...problem.files},
          checker: problem.checker,
          timeLimitMs: problem.timeLimitMs,
          points: problem.points,
          url: problem.url,
          solution: problem.solution
        });
      });
    });
    problemCache = list;
    return list;
  }

  // ---------------------------------------------------------------- markdown

  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[c]);

  function inline(source) {
    const slots = [];
    const keep = html => `\u0000${slots.push(html) - 1}\u0000`;
    let out = String(source)
      .replace(/`([^`\n]+)`/g, (_, code) => keep(`<code>${escapeHTML(code)}</code>`))
      .replace(/\$\$([^$]+)\$\$|\$([^$\n]+)\$/g, match => keep(escapeHTML(match)));
    out = escapeHTML(out)
      .replace(/\*\*(?=\S)([^*\n]*?\S)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*\w])\*(?=\S)([^*\n]*?\S)\*(?!\w)/g, '$1<em>$2</em>')
      .replace(/\[([^\]\n]+)\]\((https:\/\/[^\s)]+)\)/g, (_, label, url) => `<a href="${url.replace(/"/g, '%22')}">${label}</a>`);
    return out.replace(/\u0000(\d+)\u0000/g, (_, index) => slots[Number(index)]);
  }

  // Soft line breaks become spaces, except between two CJK characters.
  const CJK = /[\u3000-\u30ff\u3400-\u9fff\uff00-\uffef]/;
  function joinLines(lines) {
    return lines.reduce((out, line) => (!out ? line : CJK.test(out.at(-1)) && CJK.test(line[0]) ? out + line : `${out} ${line}`), '');
  }

  /** A deliberately small Markdown subset; output is sanitized again before display. */
  function markdown(source) {
    const lines = String(source ?? '').replace(/\r\n?/g, '\n').split('\n');
    const html = [];
    let paragraph = [];
    let list = null;
    const flush = () => {
      if (paragraph.length) html.push(`<p>${inline(joinLines(paragraph))}</p>`);
      paragraph = [];
      if (list) html.push(`<${list.type}>${list.items.map(item => `<li>${inline(item)}</li>`).join('')}</${list.type}>`);
      list = null;
    };
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const fence = line.match(/^```/);
      if (fence) {
        flush();
        const body = [];
        while (++i < lines.length && !/^```/.test(lines[i])) body.push(lines[i]);
        html.push(`<pre>${escapeHTML(body.join('\n'))}\n</pre>`);
        continue;
      }
      const heading = line.match(/^(#{1,3})\s+(.+)$/);
      if (heading) {
        flush();
        const level = heading[1].length + 1;
        html.push(`<h${level}>${inline(heading[2])}</h${level}>`);
        continue;
      }
      if (/^\s*(?:---|\*\*\*)\s*$/.test(line)) {
        flush();
        html.push('<hr>');
        continue;
      }
      if (/^\s*\|.*\|\s*$/.test(line) && i + 1 < lines.length && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
        flush();
        const cells = row => row.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim());
        const head = cells(line);
        const body = [];
        i += 1;
        while (i + 1 < lines.length && /^\s*\|.*\|\s*$/.test(lines[i + 1])) body.push(cells(lines[++i]));
        html.push(`<table><thead><tr>${head.map(cell => `<th>${inline(cell)}</th>`).join('')}</tr></thead><tbody>${body.map(row => `<tr>${row.map(cell => `<td>${inline(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
        continue;
      }
      const quote = line.match(/^>\s?(.*)$/);
      if (quote) {
        flush();
        html.push(`<blockquote><p>${inline(quote[1])}</p></blockquote>`);
        continue;
      }
      const item = line.match(/^\s*(?:([-*])|(\d+)\.)\s+(.+)$/);
      if (item) {
        const type = item[1] ? 'ul' : 'ol';
        if (paragraph.length) {
          html.push(`<p>${inline(joinLines(paragraph))}</p>`);
          paragraph = [];
        }
        if (list && list.type !== type) flush();
        if (!list) list = {type, items: []};
        list.items.push(item[3]);
        continue;
      }
      if (!line.trim()) {
        flush();
        continue;
      }
      if (list && /^\s{2,}\S/.test(line)) {
        list.items[list.items.length - 1] += ' ' + line.trim();
        continue;
      }
      if (list) flush();
      paragraph.push(line.trim());
    }
    flush();
    return html.join('\n');
  }

  // ---------------------------------------------------------------- checking

  const normalizeOutput = value => String(value ?? '').replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, '').replace(/\n+$/, '');
  const tokens = value => String(value ?? '').trim().split(/\s+/).filter(Boolean);
  const integers = value => tokens(value).map(Number);

  function floatEqual(actual, expected, tolerance) {
    const a = tokens(actual);
    const b = tokens(expected);
    if (a.length !== b.length) return false;
    return a.every((token, index) => {
      const x = Number(token);
      const y = Number(b[index]);
      if (Number.isFinite(x) && Number.isFinite(y) && /^[-+]?(\d|\.\d)/.test(b[index])) return Math.abs(x - y) <= tolerance * Math.max(1, Math.abs(y));
      return token === b[index];
    });
  }

  // Task-specific judges for AtCoder problems whose valid output is not unique.
  const SPECIAL = {
    abc343a(input, output) {
      const [a, b] = integers(input);
      const out = tokens(output);
      return out.length === 1 && /^\d$/.test(out[0]) && Number(out[0]) !== a + b;
    },
    abc085c(input, output, expected) {
      const [n, y] = integers(input);
      const out = tokens(output);
      if (out.length !== 3 || !out.every(token => /^-?\d+$/.test(token))) return false;
      const [a, b, c] = out.map(Number);
      if (tokens(expected).join(' ') === '-1 -1 -1') return a === -1 && b === -1 && c === -1;
      return a >= 0 && b >= 0 && c >= 0 && a + b + c === n && 10000 * a + 5000 * b + 1000 * c === y;
    },
    abc311c(input, output) {
      const values = integers(input);
      const n = values[0];
      const next = values.slice(1, n + 1);
      const out = tokens(output);
      if (!out.length || !out.every(token => /^\d+$/.test(token))) return false;
      const m = Number(out[0]);
      const cycle = out.slice(1).map(Number);
      if (m < 2 || cycle.length !== m || new Set(cycle).size !== m) return false;
      if (cycle.some(v => v < 1 || v > n)) return false;
      return cycle.every((v, i) => next[v - 1] === cycle[(i + 1) % m]);
    },
    abc109d(input, output, expected) {
      const values = integers(input);
      const [h, w] = values;
      const evens = text => {
        const grid = values.slice(2, 2 + h * w);
        const ops = integers(text);
        const count = ops[0];
        if (!Number.isInteger(count) || count < 0 || count > h * w || ops.length !== 1 + 4 * count) return -1;
        const used = new Set();
        for (let k = 0; k < count; k++) {
          const [y, x, y2, x2] = ops.slice(1 + 4 * k, 5 + 4 * k);
          const inside = (r, c) => Number.isInteger(r) && Number.isInteger(c) && r >= 1 && r <= h && c >= 1 && c <= w;
          if (!inside(y, x) || !inside(y2, x2) || Math.abs(y - y2) + Math.abs(x - x2) !== 1) return -1;
          const from = (y - 1) * w + (x - 1);
          if (used.has(from) || grid[from] < 1) return -1;
          used.add(from);
          grid[from] -= 1;
          grid[(y2 - 1) * w + (x2 - 1)] += 1;
        }
        return grid.filter(v => v % 2 === 0).length;
      };
      const best = evens(expected);
      return best >= 0 && evens(output) === best;
    }
  };
  const BUILTIN_CHECKERS = {
    ABC138B: {type: 'float', tolerance: 1e-5},
    ABC138C: {type: 'float', tolerance: 1e-5},
    ABC183B: {type: 'float', tolerance: 1e-6},
    ABC343A: {type: 'special', name: 'abc343a'},
    ABC085C: {type: 'special', name: 'abc085c'},
    ABC311C: {type: 'special', name: 'abc311c'},
    ABC109D: {type: 'special', name: 'abc109d'}
  };

  function checkerFor(problem) {
    return problem?.checker || BUILTIN_CHECKERS[problem?.label] || {type: 'exact'};
  }

  /** Compare program output with the expected output under the problem's rule. */
  function check(rule, {input = '', actual = '', expected = ''} = {}) {
    const kind = rule?.type || 'exact';
    if (kind === 'tokens') return tokens(actual).join(' ') === tokens(expected).join(' ');
    if (kind === 'float') return floatEqual(actual, expected, rule.tolerance || 1e-6);
    if (kind === 'special' && SPECIAL[rule.name]) {
      try {
        return SPECIAL[rule.name](input, actual, expected);
      } catch {
        return false;
      }
    }
    return normalizeOutput(actual) === normalizeOutput(expected);
  }

  // ---------------------------------------------------------------- template

  function template() {
    return {
      format: FORMAT,
      version: VERSION,
      id: 'my-practice',
      title: {zh: '我的练习', ja: 'マイ演習', en: 'My Practice'},
      description: 'Problems I collected for exam preparation.',
      author: '',
      sets: [
        {
          id: 'scores',
          title: {zh: '成绩统计', ja: '成績の集計', en: 'Score Report'},
          preamble: {
            en: 'The file `scores.txt` contains one record per line: a student name and a score from 0 to 100, separated by a space.',
            zh: '文件 `scores.txt` 每行一条记录：学生姓名和 0 到 100 的分数，以空格分隔。',
            ja: 'ファイル `scores.txt` の各行には、学生名と 0 以上 100 以下の点数が空白区切りで書かれている。'
          },
          files: {'scores.txt': 'alice 82\nbob 67\ncarol 91\n'},
          minutes: 60
        }
      ],
      problems: [
        {
          id: 'MY-1',
          set: 'scores',
          title: {zh: '平均分', ja: '平均点', en: 'Average Score'},
          level: 1,
          points: 40,
          statement: {
            en: 'Print the average score, rounded down to an integer.',
            zh: '输出平均分，向下取整为整数。',
            ja: '平均点を、小数点以下を切り捨てた整数で出力せよ。'
          },
          samples: [{input: '', output: '80\n'}],
          tests: [{input: '', output: '50\n', files: {'scores.txt': 'dan 0\nerin 100\n'}}],
          solution: {code: "scores = [int(line.split()[1]) for line in open('scores.txt', encoding='utf-8')]\nprint(sum(scores) // len(scores))\n"}
        }
      ]
    };
  }

  root.PlumeLibrary = Object.freeze({
    FORMAT,
    VERSION,
    STORAGE_KEY,
    PackError,
    validate,
    parse,
    packs,
    reload,
    install,
    remove,
    replaceAll,
    exportInstalled,
    serialize,
    problems,
    pick,
    languagesOf,
    markdown,
    escapeHTML,
    check,
    checkerFor,
    normalizeOutput,
    template
  });
})(typeof window !== 'undefined' ? window : globalThis);
