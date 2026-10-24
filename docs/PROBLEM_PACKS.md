# Problem packs

Plume can read additional problems from a *problem pack*: one JSON file that holds statements, data files, samples, hidden tests and, optionally, reference solutions. Imported problems appear in the library, open in the same workspace, are judged locally, and can be used in mock exams.

The bundled **CI Original Sets** are themselves a pack. [`data/packs/ci-original.json`](../data/packs/ci-original.json) is a complete, real example of every feature described here.

## Importing and managing packs

Open **Settings → Problem Library**.

- **Import Pack…** reads a `.json` file. The file is validated first; if anything is wrong, nothing is installed and the first problems found are shown.
- **Template** downloads a minimal valid pack to start from.
- **Export** writes any pack, including the bundled one, back to a file in the same format.
- Importing a pack whose `id` is already installed replaces it. Code and records for problem IDs that still exist are kept.
- **Remove** deletes the pack together with the code, notes and records of its problems, after confirmation.

Installed packs are saved on the device (browser storage, or the native snapshot in the macOS app) and are included in backups made from **Settings → Data & Backup**. A single file may be up to 2.5 MB, and all installed packs together up to 3 MB.

## A minimal pack

```json
{
  "format": "plume-pack",
  "version": 1,
  "id": "my-practice",
  "title": {"zh": "我的练习", "ja": "マイ演習", "en": "My Practice"},
  "sets": [
    {
      "id": "scores",
      "title": "Score Report",
      "preamble": "The file `scores.txt` holds one record per line: a name and a score.",
      "files": {"scores.txt": "alice 82\nbob 67\ncarol 91\n"},
      "minutes": 60
    }
  ],
  "problems": [
    {
      "id": "MY-1",
      "set": "scores",
      "title": "Average Score",
      "level": 1,
      "points": 40,
      "statement": "Print the average score, rounded down.",
      "samples": [{"input": "", "output": "80\n"}],
      "tests": [{"input": "", "output": "50\n", "files": {"scores.txt": "dan 0\nerin 100\n"}}],
      "solution": {"code": "scores = [int(line.split()[1]) for line in open('scores.txt', encoding='utf-8')]\nprint(sum(scores) // len(scores))\n"}
    }
  ]
}
```

## Reference

### Text in several languages

Every human-readable field accepts either a plain string, shown in all languages, or an object with any of `zh`, `ja` and `en`. When the reader's language is missing, another available language is shown with a short notice.

### Pack

| Field | Required | Description |
| --- | --- | --- |
| `format` | yes | Always `"plume-pack"`. |
| `version` | yes | Always `1`. |
| `id` | yes | 2–48 lowercase letters, digits or hyphens, starting with a letter or digit. Must differ from the bundled pack. |
| `title` | yes | Text. |
| `description`, `author`, `license` | no | Shown in Settings. |
| `sets` | no | Groups of related parts sharing a scenario and data files. |
| `problems` | yes | At least one problem. |

### Set

A set models one exam question: a shared scenario, its data files, and several parts in order.

| Field | Required | Description |
| --- | --- | --- |
| `id` | yes | 1–40 letters, digits, `_`, `.` or `-`; unique within the pack. |
| `title` | yes | Text. |
| `preamble` | no | Markdown shown above every part of the set. |
| `files` | no | Data files available to every part, as `{"name": "text"}`. |
| `minutes` | no | Time for a mock exam on this set, 10–300. Default 150. |

Problems list their set with `set`; their order in `problems` gives the part numbers. A pack with sets adds two mock-exam pools: a chosen set, or a random set. Those mocks score each part by its `points`.

### Problem

| Field | Required | Description |
| --- | --- | --- |
| `id` | yes | 1–40 letters, digits, `_`, `.` or `-`. Unique across the entire library: the AtCoder problems, the bundled pack and every installed pack. |
| `title` | yes | Text. |
| `statement` | yes | Markdown text (see below), or HTML when `format` is `"html"`. |
| `samples` | one of these | Shown with the statement and loaded as console cases: `[{"input": "…", "output": "…", "files": {…}}]`. |
| `tests` | one of these | Hidden tests, used only by **Judge**. Same shape as samples. At most 200 of each. |
| `set` | no | The `id` of a set in this pack. |
| `level` | no | 0–5, the difficulty band used by filters and study recommendations. Default 2. |
| `points` | no | 1–10000. Default 100. |
| `files` | no | Data files for this problem, added to the set files. |
| `checker` | no | `"exact"` (default), `"tokens"` or `"float:<tolerance>"`, for example `"float:1e-6"`. |
| `timeLimit` | no | Seconds per case, 1–20. Default 6. |
| `url` | no | An `https` link to the original problem, shown in the workspace. |
| `solution` | no | `{"code": "…", "explanation": text}`. Offered after the problem is solved or when the learner chooses to reveal it. |
| `format` | no | `"markdown"` (default) or `"html"`. |

`output` may also be written `expected`.

## Data files

Before every run, the program starts in a fresh working directory that contains the set files, then the problem files, then the case's own files; a later file with the same name replaces an earlier one. Programs read them exactly as in a terminal: `open('map.txt', encoding='utf-8')`.

File names use letters, digits, `_`, `.` and `-`, at most 64 characters, with no directories. Contents are UTF-8 text. The statement shows a preview of the first 30 lines of each file; programs always see the whole file.

## Judging

**Run** executes the selected console case; **Judge** executes every sample and then every hidden test, records the result in the problem's history, and updates an active mock exam. Every Run or Judge starts a fresh Python 3.12 interpreter in a Web Worker; within it, each case gets a fresh `__main__` module, standard streams and working directory. Verdicts are AC, WA, RE, TLE (time limit per case) and OLE (more than 16 MiB of output).

| Checker | Comparison |
| --- | --- |
| `exact` | Line by line, after normalizing line endings and removing trailing spaces at line ends and trailing empty lines. Leading spaces and blank lines in between still count. |
| `tokens` | The whitespace-separated words must be equal; spacing and line breaks are ignored. |
| `float:t` | Words are compared in order. Numbers pass when the error is at most `t × max(1, |expected|)`; other words must match exactly. |

## Statements

Markdown statements support a deliberately small subset: headings (`#`, `##`, `###`), paragraphs, `**bold**`, `*italic*`, `` `code` ``, fenced code blocks, ordered and unordered lists, tables, block quotes, horizontal rules and `https` links. TeX between `$…$` or `$$…$$` is typeset by the bundled MathJax. Consecutive lines of Chinese or Japanese text join without an inserted space.

HTML statements are cleaned before display: scripts, styles, forms, frames and event attributes are removed; links must be `http` or `https`; images must be PNG, JPEG, WebP or GIF `data:` URLs.

Use `### Input`, `### Output` and similar headings inside a statement; the part number and the set preamble are added automatically.

## Writing good packs

- State every constraint the tests rely on, and include small edge cases among the hidden tests: empty or minimal input, ties, the largest sizes, and a file whose last line has no newline.
- Give each part a sample that can be checked by hand.
- Keep hidden test data compact; a few large cases are enough to separate efficient from inefficient solutions.
- Verify outputs with an independent brute-force program before publishing. [`scripts/build_packs.py`](../scripts/build_packs.py) shows one way to do this: it builds the bundled pack from Python sources in [`packs/ci-original`](../packs/ci-original), checks every sample against the statement, generates hidden tests from a fixed seed and compares the reference solution with a brute-force solution on every test.
