const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const bridge = fs.readFileSync(path.join(__dirname, '../packaging/storage-bridge.js'), 'utf8');
const key = 'ciPracticeHubState.v2';
const legacy = 'ciPracticeHubState.v1';

function fixture({saved = null, existing = {}, fail = false} = {}) {
  class Storage {
    constructor(values = {}) { this.values = new Map(Object.entries(values)); }
    get length() { return this.values.size; }
    key(i) { return [...this.values.keys()][i] ?? null; }
    getItem(k) { return this.values.get(String(k)) ?? null; }
    setItem(k, v) { this.values.set(String(k), String(v)); }
    removeItem(k) { this.values.delete(String(k)); }
    clear() { this.values.clear(); }
  }
  const native = {saved, writes: 0, fail};
  const context = {
    Storage, DOMException, location: {origin: 'http://127.0.0.1:18765'},
    localStorage: new Storage(existing), sessionStorage: new Storage(),
    __ciNativeStorage: {keys: [legacy, key]},
    prompt(protocol, text) {
      assert.equal(protocol, '__CI_NATIVE_STORAGE_V1__');
      const request = JSON.parse(text);
      if (native.fail) return JSON.stringify({ok: false, error: 'Disk is full'});
      if (request.operation === 'read') return JSON.stringify({ok: true, values: native.saved});
      assert.equal(request.operation, 'write');
      native.saved = request.values;
      native.writes++;
      return JSON.stringify({ok: true});
    },
  };
  context.window = context;
  vm.createContext(context);
  return {native, context, load: () => vm.runInContext(bridge, context)};
}

test('native bridge migrates existing WebKit values once', () => {
  const f = fixture({existing: {[key]: '{"code":"print(42)"}', other: 'untouched'}});
  f.load();
  assert.deepEqual(f.native.saved, {[key]: '{"code":"print(42)"}'});
  assert.equal(f.native.writes, 1);
  assert.equal(f.context.__ciNativeStorageReady, true);
});

test('setItem confirms new state synchronously and skips duplicate/unrelated writes', () => {
  const f = fixture({saved: {}}); f.load();
  f.context.localStorage.setItem(key, 'latest');
  assert.equal(f.native.saved[key], 'latest');
  f.context.localStorage.setItem(key, 'latest');
  f.context.localStorage.setItem('other', 'value');
  f.context.sessionStorage.setItem(key, 'session');
  assert.equal(f.native.writes, 1);
});

test('removeItem and clear persist an empty tombstone without reviving old state', () => {
  const f = fixture({saved: {[key]: 'old', [legacy]: 'legacy'}}); f.load();
  f.context.localStorage.removeItem(key);
  assert.deepEqual(f.native.saved, {[legacy]: 'legacy'});
  f.context.localStorage.clear();
  assert.deepEqual(f.native.saved, {});
  const restart = fixture({saved: f.native.saved, existing: {[key]: 'stale', [legacy]: 'stale'}});
  restart.load();
  assert.equal(restart.context.localStorage.getItem(key), null);
  assert.equal(restart.context.localStorage.getItem(legacy), null);
  assert.equal(restart.native.writes, 0);
});

test('reload fetches the latest native snapshot, including imported data', () => {
  const f = fixture({saved: {[key]: 'old'}}); f.load();
  f.context.localStorage.setItem(key, 'imported');
  const reload = fixture({saved: f.native.saved, existing: {[key]: 'stale'}}); reload.load();
  assert.equal(reload.context.localStorage.getItem(key), 'imported');
});

test('failed native writes throw to the page and restore the previous local value', () => {
  const f = fixture({saved: {[key]: 'confirmed'}}); f.load(); f.native.fail = true;
  assert.throws(() => f.context.localStorage.setItem(key, 'lost'), /Disk is full/);
  assert.equal(f.context.localStorage.getItem(key), 'confirmed');
  assert.equal(f.native.saved[key], 'confirmed');
  assert.throws(() => f.context.localStorage.removeItem(key), /Disk is full/);
  assert.equal(f.context.localStorage.getItem(key), 'confirmed');
});

test('failed clear restores unrelated local values as well', () => {
  const f = fixture({saved: {[key]: 'confirmed'}, existing: {other: 'keep'}}); f.load(); f.native.fail = true;
  assert.throws(() => f.context.localStorage.clear(), /Disk is full/);
  assert.equal(f.context.localStorage.getItem(key), 'confirmed');
  assert.equal(f.context.localStorage.getItem('other'), 'keep');
});

test('bootstrap failure blocks subsequent writes and retains previous local data', () => {
  const f = fixture({existing: {[key]: 'old'}, fail: true});
  assert.throws(f.load, /Disk is full/);
  assert.throws(() => f.context.localStorage.setItem(key, 'new'), /Disk is full/);
  assert.equal(f.context.localStorage.getItem(key), 'old');
  assert.equal(f.context.__ciNativeStorageReady, undefined);
});
