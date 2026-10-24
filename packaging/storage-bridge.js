/* Synchronous, native-confirmed persistence for the desktop app's own keys. */
(() => {
  'use strict';
  const config = window.__ciNativeStorage;
  delete window.__ciNativeStorage;
  if (!config || location.origin !== 'http://127.0.0.1:18765') return;
  const storage = window.localStorage;
  const keys = new Set(config.keys);
  const original = {
    get: Storage.prototype.getItem,
    set: Storage.prototype.setItem,
    remove: Storage.prototype.removeItem,
    clear: Storage.prototype.clear
  };
  const snapshot = () =>
    Object.fromEntries(
      [...keys].flatMap(key => {
        const value = original.get.call(storage, key);
        return value === null ? [] : [[key, value]];
      })
    );
  const restore = values => {
    for (const key of keys) {
      if (Object.prototype.hasOwnProperty.call(values, key)) original.set.call(storage, key, values[key]);
      else original.remove.call(storage, key);
    }
  };
  const request = message => {
    let result;
    try {
      result = JSON.parse(window.prompt('__CI_NATIVE_STORAGE_V1__', JSON.stringify(message)));
    } catch {}
    if (!result?.ok)
      throw new DOMException(
        result?.error || 'Native storage did not confirm the save.',
        'QuotaExceededError'
      );
    return result;
  };
  const commit = values => request({operation: 'write', values});
  // A present empty snapshot is a deletion, never a reason to revive old WebKit data.
  // Read from native on every page load, including reload, so the bootstrap
  // script cannot restore an obsolete snapshot captured at application launch.
  try {
    const values = request({operation: 'read'}).values;
    if (values !== null) restore(values);
    else commit(snapshot()); // One-time migration from the previous WebKit store.
  } catch (error) {
    // Fail closed. The native file is retained and the page cannot overwrite it.
    window.__ciNativeStorageError = String(error);
    for (const name of ['setItem', 'removeItem', 'clear'])
      Storage.prototype[name] = function () {
        throw error;
      };
    throw error;
  }
  let confirmed = JSON.stringify(snapshot());
  const changed = before => {
    const next = snapshot();
    const serialized = JSON.stringify(next);
    if (serialized === confirmed) return;
    try {
      commit(next);
      confirmed = serialized;
    } catch (error) {
      restore(before);
      throw error;
    }
  };
  Storage.prototype.setItem = function (key, value) {
    key = String(key);
    if (this !== storage || !keys.has(key)) return original.set.call(this, key, value);
    const before = snapshot();
    original.set.call(this, key, value);
    changed(before);
  };
  Storage.prototype.removeItem = function (key) {
    key = String(key);
    if (this !== storage || !keys.has(key)) return original.remove.call(this, key);
    const before = snapshot();
    original.remove.call(this, key);
    changed(before);
  };
  Storage.prototype.clear = function () {
    if (this !== storage) return original.clear.call(this);
    const before = snapshot();
    const all = Object.fromEntries(
      Array.from({length: storage.length}, (_, i) => {
        const key = storage.key(i);
        return [key, original.get.call(storage, key)];
      })
    );
    original.clear.call(this);
    try {
      changed(before);
    } catch (error) {
      for (const [key, value] of Object.entries(all)) original.set.call(storage, key, value);
      throw error;
    }
  };
  window.__ciNativeStorageReady = true;
})();
