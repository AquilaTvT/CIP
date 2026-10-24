# Plume validation

This document records the verification scope and repeatable commands for the current application. Automated checks cover specified cases; they do not establish the absence of every defect or replace official AtCoder judging.

## Release verification — 2026-10-25 JST

- 138 JavaScript tests passed, with no failures or skips.
- All 18 Python library, server, and native integration tests passed with network checks enabled, in 403.249 seconds.
- The native offline run passed 135 assertions, including all 108 published course cases in separate Pyodide interpreters, in 392.065 seconds.
- Source content checks executed 192 displayed example placements and 684 published or independently generated reference-solution cases.
- Visual review covered the workspace, three-language lessons and settings, developer attribution, and exercise layout. The final sample-panel color adjustment was inspected in the browser and included in the release rebuild.

## Source checks

```sh
npm ci --ignore-scripts
python3 scripts/assemble_library.py
python3 scripts/assemble_academy.py --check
python3 -m unittest discover -s tests -p '*_test.py'
node --test tests/*.test.cjs
npm run check
```

| Area | Coverage |
| --- | --- |
| Statement library | 221 tasks and 663 local statements; language completeness; constraints and input/output sections; official samples; diagrams; canonical IDs; metadata counts; generated JS/JSON agreement. |
| Course content | 24 lessons in six chapters; all published exercise cases and displayed code examples; three-language completeness; prerequisite ordering; linked library problems; reference implementations checked with Python. Additional independent oracles cover core algorithms. |
| Course interaction | Lesson navigation, local drafts, test execution and cancellation, result comparison, completion state, and separation from official problem verdicts. |
| Settings | Preference normalization, supported ranges, three-language rendering, actual guide articles, backup/import persistence, and preservation of existing practice data. |
| Practice and scoring | Output comparison, backup validation, import sanitization, storage failures, official score snapshots, penalty rules, deadlines, mock history, worker cancellation and timeout recovery. |
| AtCoder sync | Concurrent requests, account changes, duplicate/corrected verdicts, delayed results, and invalidation after import/reset. |
| Native storage bridge | Initial migration, synchronous save acknowledgment, immediate reload, deletion tombstones, and failed-write rollback. |
| Local server | Public assets and correct product/version metadata, loopback-only hosts, traversal/malformed paths, proxy URL restrictions and verified TLS fallback. |

The individual test files in `tests/` are the authoritative list. GitHub Actions runs the source checks on every push and builds the macOS package; consult the run associated with the commit being distributed.

## Native application

Build on macOS with Xcode Command Line Tools, then run inside a logged-in desktop session:

```sh
python3 scripts/build_app.py
CI_NATIVE_APP="$PWD/dist/Plume.app" CI_NATIVE_NETWORK=1 python3 -m unittest discover -s tests -p 'runtime_native_test.py' -v
python3 scripts/package_release.py
```

Native tests cover local Python and formula rendering, CodeMirror, bundled learning/settings assets, real metadata and submissions API proxy access, immediate save/restart persistence, repeated launch, and the actual Settings/Help menu actions. They verify that the Settings shortcut is Command-comma, Help opens the local guide in the same WebKit view, and the upgrade bundle identifier remains `org.cipractice.desktop`.

The runtime cases include Unicode, binary streams, standard-library imports, script/module behavior, exceptions, closed streams, bounded output, infinite-loop termination, and isolation between executions. The background test configuration disables inactive-view suspension on macOS 14 and later, following [Apple’s WebKit scheduling documentation](https://developer.apple.com/documentation/webkit/wkpreferences/inactiveschedulingpolicy-swift.property); earlier systems show the test view. This is limited to integration-test mode. Because each of the 108 course cases initializes a fresh WASM interpreter, the native suite permits 900 seconds overall while failing after 75 seconds without progress; individual Python execution and initialization limits remain in force. Each completed case reports progress. Storage tests use a temporary native directory and nonpersistent WebKit storage; they never read or modify personal practice records. Omit `CI_NATIVE_NETWORK=1` to skip the external-network case.

The release packager verifies archive CRCs, all three statement languages, current application assets and icon files, the app signature, and SHA-256 checksums. The icon build reads `assets/plume.svg` and produces the standard 16–1024 pixel macOS representations.

## Visual and interaction review

Before distributing a UI change, review the workspace, problem editor, lesson page and each settings section in Chinese, English and Japanese. Check language switching without draft loss, keyboard navigation, command search, back/forward navigation, light/dark/system appearance, preference previews, guide links, and the About signature interaction. Verify backup export and import in the relevant host, as browser downloads and native dialogs use different paths.

Native save/open dialogs require normal desktop interaction to verify end to end; serialization and import-validation tests do not establish that the operating-system dialogs were clicked. An ad-hoc signature is not Apple notarization. Local test output is not an official accepted submission, and structural language checks alone cannot prove every translation choice correct.

## External service observation

On 2026-10-24, the public AtCoder Problems submissions API initially timed out, then recovered. A final independent probe returned HTTP 200 with a JSON array, and the native app's metadata and submissions proxy check passed. This verifies access at that time, not ongoing service availability. Account synchronization, delayed results, cancellation, and scoring behavior are also covered by deterministic tests. Local statements, lessons, Python execution, and saved progress do not require these services.
