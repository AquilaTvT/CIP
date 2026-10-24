# Architecture

Plume is a static web application with no framework and no build step for its own code. The same files run in a browser, served by `start.py`, and inside the macOS app, served by its native shell. Everything a learner needs — statements, lessons, the editor, MathJax and a complete Python runtime — ships with the repository.

## Files

```text
index.html                    Shell markup; loads data bundles, then the scripts below
app.js                        Routing, views, workspace, judge, mock exams, sync, persistence
library.js                    Problem packs: validation, storage, Markdown, output checkers
academy.js                    Course pages and the lesson exercise controller
settings.js                   Settings and the in-app guide (pure rendering and validation)
pyworker.js                   Pyodide inside a Web Worker; the per-case harness
styles.css                    Design tokens, components and views; light and dark
data/                         Generated bundles (statements, metadata, course, packs) and media
packs/ci-original/            Sources of the original problem sets
scripts/                      Bundle builders, editor build, app build and release packaging
packaging/                    macOS shell (Swift) and its storage bridge
vendor/                       Pyodide 0.27.8, MathJax, the CodeMirror bundle
tests/                        Node and Python test suites, and an in-app runtime check
```

`app.js`, `academy.js` and `settings.js` render HTML strings. Every interpolated value passes through an escaping function; navigation and actions are wired through `data-go`, `data-action` and `data-command` attributes and one delegated listener, so no markup contains inline handlers.

## Content pipelines

| Content | Source | Builder | Output |
| --- | --- | --- | --- |
| AtCoder statements | `data/source/` (official pages), `data/translations/` | `scripts/assemble_library.py` | `data/statements.{json,js}`, `data/problems.{json,js}` |
| Course | `data/academy-parts/*.json` | `scripts/assemble_academy.py` | `data/academy.js` |
| Original sets | `packs/ci-original/*.py` | `scripts/build_packs.py` | `data/packs/ci-original.{json,js}` |
| Editor | `scripts/editor-entry.js` | `npm run build:editor` | `vendor/editor.js` |

Each builder has a `--check` mode or a test that fails when a committed output no longer matches its sources. Statements are stored separately per language; nothing is translated at run time and no language silently falls back to another.

`build_packs.py` runs every reference solution on its samples, compares the output with the expected output written in the source, generates hidden tests from a fixed seed, and compares an independent brute-force program with the reference solution on every test.

## Running Python

User code never runs on the host. `pyworker.js` loads Pyodide (CPython 3.12 compiled to WebAssembly) in a dedicated Web Worker.

- **Sessions.** Pressing Run or Judge takes one worker and runs all of its cases there, then discards the worker. While a problem or lesson is open, one spare worker is kept initialized, so the next run starts without waiting for the interpreter to load.
- **Isolation per case.** Before each case the harness replaces `__main__`, `sys.argv`, the standard streams and the working directory `/work`, then writes the case's data files into it. Tracebacks are trimmed to frames from the user's program (`/work/main.py`).
- **Limits.** A case that exceeds its time limit has its worker terminated; the next case starts in a fresh worker. Output beyond 16 MiB stops the program with OLE.
- **Crashes.** Recursion that passes through C code, such as a function wrapped in `functools.cache`, can exhaust the browser's stack before Python raises `RecursionError`. The worker catches that condition, reports a runtime error with an explanation immediately, and the slot is replaced.

The local judge compares outputs with the problem's checker: exact (after normalizing line endings and trailing spaces), whitespace-separated tokens, or floating point with a relative tolerance. Seven AtCoder tasks whose correct output is not unique, or which accept a tolerance, use task-specific checkers. A local result is always labelled as local; only AtCoder synchronization marks a problem as officially accepted.

## Persistence

| Key | Storage | Content |
| --- | --- | --- |
| `ciPracticeHubState.v2` | `localStorage` | Progress, code, notes, test cases, settings, mock history, course progress |
| `plumeProblemPacks.v1` | `localStorage` | Installed problem packs |
| `ciPracticeNavigation.v1` | `sessionStorage` | Back and forward history |

The state is normalized whenever it is loaded or imported: unknown problem IDs, malformed values and prototype keys are dropped, and limits are clamped. Saves are synchronous. A second tab adopts changes through the `storage` event unless the user is typing in it. The app asks the browser for persistent storage, and Settings shows whether it was granted.

In the macOS app, `packaging/storage-bridge.js` intercepts writes to these keys and sends a snapshot through a synchronous channel to the native shell, which writes `~/Library/Application Support/org.cipractice.desktop/state.json` atomically (temporary file, `fsync`, rename) before the write returns. A failed native write rolls the page's copy back and is reported as a failed save. If the file cannot be read at launch, the page refuses all writes, so it can never overwrite records it did not load.

Backups (`Settings → Data & Backup`) contain the state and installed packs. Import validates everything first, then replaces the workspace in one step; a storage failure leaves the previous workspace untouched.

## AtCoder synchronization

Synchronization reads the public submissions of one AtCoder handle through the AtCoder Problems API; no password or token is involved. Requests for the same account are coalesced and spaced at least 1.1 seconds apart. Submissions are upserted by their official ID, so a corrected verdict replaces an earlier one. Each request captures the account and a state generation when it starts; changing the account, importing a backup or resetting invalidates older requests before they can write. Official verdicts are also reconciled into the current and archived mock exams whose time windows contain them, for the account that owned the mock.

## Mock exams

A mock fixes its problems, time, scoring mode and account when it starts. Three modes exist: a flat 100 points per problem, the original AtCoder points, or the points of each part of an original set. In the first two, every wrong attempt before the first accepted one on a solved problem adds five minutes of penalty; CE and IE are not penalized. Attempts outside the time window never score. Finished mocks are kept in a history with their snapshot scores.

## Local servers

`start.py` serves the repository for development and for browsers. It binds to the loopback interface only, rejects requests whose `Host` is not a loopback address, serves an explicit list of public files and directories, and forwards only allowlisted AtCoder Problems URLs. TLS certificates are always verified; when Python has no CA bundle, it falls back to the system `curl`, still with verification.

The macOS shell (`packaging/CIPractice.swift`) embeds the same site in a `WKWebView`, serves it from the app bundle on `127.0.0.1:18765`, applies the same proxy allowlist, handles file save and open dialogs, and owns the durable storage file. It keeps the bundle identifier `org.cipractice.desktop`, so upgrades keep existing records.

## Statement HTML

Statements are inserted only after `sanitizeStatementHTML` has rebuilt them through `DOMParser` with an element allowlist. It removes scripts, styles, frames and forms, drops every attribute except a small set, keeps only the class names Plume itself uses, rewrites links to open externally and restricts images to bundled media or base64 image data. Problem-pack Markdown is converted by a small renderer that escapes all text before adding its own tags, and its output goes through the same sanitizer.
