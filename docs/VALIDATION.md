# Validation

How Plume is checked, and how to repeat the checks. Automated tests cover the cases they specify; they do not prove the absence of every defect, and a local judge result is never an official AtCoder verdict.

## Source checks

These run on every push in GitHub Actions and take a few minutes locally with Python 3.12 and Node.js 22:

```sh
npm ci --ignore-scripts
python3 scripts/assemble_library.py
python3 scripts/assemble_academy.py --check
python3 scripts/build_packs.py --check
python3 -m unittest discover -s tests -p '*_test.py'
node --test tests/*.test.cjs
npm run check
```

| Area | What is checked | Where |
| --- | --- | --- |
| Statement library | 221 tasks and 663 statements; every language present; constraint, input and output sections; official samples preserved verbatim; local media only; canonical IDs; metadata counts; generated JS and JSON agree. | `tests/library_test.py` |
| Original sets | Every sample matches the expected output written in the source; hidden tests are regenerated from fixed seeds; an independent brute-force program agrees with the reference solution on every test; the committed pack matches its sources. | `scripts/build_packs.py --check`, `tests/library.test.cjs` |
| Problem packs | Validation of every field with all errors reported; unique labels across AtCoder tasks, the bundled pack and installed packs; the storage budget; damaged storage; export and re-import without loss; the Markdown subset and its escaping; the exact, token, floating-point and task-specific checkers. | `tests/library.test.cjs` |
| Course content | Chapter order and prerequisites; linked problems exist; complete Chinese, Japanese and English editions; every displayed example produces its displayed output; every published case passes; independent oracles check the reference solutions on hundreds of further inputs. | `tests/academy-content.test.cjs` |
| Course interaction | Running checks, cancellation, stale results, editing during a run, restoring starter code, timeout recovery, save failure, and import of course progress. | `tests/academy-runtime.test.cjs` |
| Workspace | Runner sessions, time limits and crash recovery; per-sample data files; batch snapshots; cancellation by reset or import; navigation during a run; mock scoring, penalties, deadlines and history; backup validation, quota failure and legacy imports; settings persistence; rendering in all three languages. | `tests/frontend.test.cjs` |
| AtCoder sync | Concurrent requests, account changes, corrected verdicts, delayed results, and invalidation after import or reset; mock reconciliation. | `tests/audit.test.cjs` |
| Settings | Normalization and limits, sanitized profile text, every section in every language, the guide articles, the library and backup controls. | `tests/settings.test.cjs` |
| Editor | Undo history kept across remounts and cleared by import or reset. | `tests/editor-cache.test.cjs` |
| Native storage bridge | Initial migration, synchronous acknowledgement, reload, deletion, and rollback of a failed write. | `tests/runtime-storage.test.cjs` |
| Local server | Public files only, loopback hosts only, path traversal, proxy allowlist, verified TLS and its fallback, version metadata. | `tests/runtime_server_test.py` |

## Runtime check

`tests/runtime-browser.js` exercises the real Pyodide runtime inside the running application. It checks standard input and output, Unicode, binary streams, the standard library, `__main__` and `argv`, data files in a clean working directory, exceptions, bounded output, termination of an infinite loop, isolation between runs, recovery after a crashed interpreter, the course exercises and every sample and hidden test of the original sets, the editor, and MathJax.

To run it in a browser, start `python3 start.py`, open the app, and load the script in the developer console, or drive the page with a browser automation tool; it reports through `globalThis.__runtimeTestResults`. The macOS app runs the same file with `--runtime-test`.

## macOS app

Build on macOS with the Xcode Command Line Tools, then run the native suite in a logged-in desktop session:

```sh
python3 scripts/build_app.py
CI_NATIVE_APP="$PWD/dist/Plume.app" CI_NATIVE_NETWORK=1 python3 -m unittest discover -s tests -p 'runtime_native_test.py' -v
python3 scripts/package_release.py
```

The native tests run the runtime check in WebKit, and cover saving and restarting with the native snapshot, repeated launches, the Settings and Help menu actions, and the AtCoder metadata proxy. They use a temporary storage directory and non-persistent WebKit data, so they never read or change personal records. Omit `CI_NATIVE_NETWORK=1` to skip the online case.

`package_release.py` verifies archive checksums, the statement library, the course, the bundled problem sets, current app assets and icon, and the code signature, and writes SHA-256 sums.

## Visual review

Before distributing an interface change, review Today, the library, a problem from each source, a lesson, Study Path, a mock exam in progress and its result, Review, and every Settings section, in Chinese, Japanese and English, light and dark, at desktop and phone widths. Check keyboard shortcuts, command search, back and forward navigation, and switching languages while a draft is open.

Native save and open dialogs need a real desktop interaction to verify end to end. The app is signed ad hoc for local use; that is not Apple notarization.
