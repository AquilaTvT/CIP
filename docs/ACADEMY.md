# Plume · Foundations

An authored introduction to Python and algorithmic problem solving for CI candidates. The six chapters contain **24 lessons**, **72 complete language editions**, **161 teaching sections per language**, and **24 programming exercises with 108 published test cases**. The first exercise has one fixed output; the others include several distinct inputs and boundary cases.

The course starts with execution, values, and input conversion before introducing compact syntax. Later lessons connect representations, invariants, complexity, correctness arguments, and testing. It is an introductory course, not a prediction of entrance-exam marks or a substitute for independently solving past papers.

## Course outline

### Getting started

| Lesson | Topic | Minutes | Follow-up practice |
| ---: | --- | ---: | --- |
| 1 | Your first program | 40 | PracticeA |
| 2 | Input and integers | 50 | APG4bPython EX5, ABC302A |
| 3 | Conditional branches | 45 | ABC086A, APG4bPython EX6 |
| 4 | Loops and accumulation | 50 | ABC281A, ABC083B |

### Data and programs

| Lesson | Topic | Minutes | Follow-up practice |
| ---: | --- | ---: | --- |
| 5 | Strings | 50 | ABC081A, ABC303A, ABC233B |
| 6 | Lists and indices | 50 | APG4bPython EX10, ABC213B |
| 7 | Nested loops and grids | 55 | ABC343B, ABC075B |
| 8 | Functions and decomposition | 55 | APG4bPython EX13, ABC083B |

### Analysis and verification

| Lesson | Topic | Minutes | Follow-up practice |
| ---: | --- | ---: | --- |
| 9 | Debugging with evidence | 50 | APG4bPython EX12, ABC300A |
| 10 | Complexity before implementation | 50 | ABC081B, ABC083B |
| 11 | Exhaustive search without omissions or duplicates | 50 | ABC087B, ABC085C, ABC282B |
| 12 | Sorting to expose adjacent candidates | 50 | ABC088B, ABC201B, ABC212C |

### Sequences and queries

| Lesson | Topic | Minutes | Follow-up practice |
| ---: | --- | ---: | --- |
| 13 | Sets and dictionaries as compact history | 50 | ABC085B, ABC338B, APG4bPython EX20 |
| 14 | Prefix sums and interval boundaries | 50 | ABC172C, ABC233D |
| 15 | Binary search as a boundary search | 50 | ABC312C, ABC248D |
| 16 | Two pointers and a forward-moving window | 50 | ABC172C, ABC229D |

### Graphs and search

| Lesson | Topic | Minutes | Follow-up practice |
| ---: | --- | ---: | --- |
| 17 | Stacks and queues | 40 | ABC340B, ABC216D, ABC335C |
| 18 | Breadth-first search | 50 | ABC325C, ABC304C, ABC272D |
| 19 | Stack traversal and components | 50 | ABC177D, ABC287C, ABC270C |
| 20 | Grid search and flood fill | 45 | ABC325C, ABC075B, ABC341C |

### States, strategies and synthesis

| Lesson | Topic | Minutes | Follow-up practice |
| ---: | --- | ---: | --- |
| 21 | Dynamic programming: states and transitions | 55 | ABC291D, ABC266D, ABC286D |
| 22 | 0/1 knapsack and state compression | 60 | ABC286D, ABC219D, ABC281D |
| 23 | Greedy choices, counterexamples, and exchange | 55 | ABC203C, ABC229C, ABC185D |
| 24 | Integrated practice: from statement to verification | 60 | ABC312C, ABC172C, ABC228C |

The prerequisite chain follows the order above. All lessons remain accessible, so a learner can revisit a concept without changing completion records. Time estimates cover reading and a first attempt; they are not deadlines. Follow-up AtCoder problems may combine additional ideas and can be harder than the course exercise.

## Teaching structure

Each language edition includes learning objectives, six to eight substantial sections, worked execution traces, explanations of common mistakes, and two or more self-check questions. There are 64 code-example placements per language (192 across three languages), each with its actual output and input where needed. The course includes 49 self-check questions per language, with expandable reasoning.

The reading view provides a section index and a direct jump to the exercise. The editor remains alongside the lesson on wide screens and follows it on narrow screens. Exercises show their requirements, input/output formats, and examples before execution. Hints and full reference implementations are available separately. Code, completed lessons, attempts, and opened hints/solutions are saved locally and included in JSON backups.

Published test cases are visible after execution. Passing all cases records course completion; a failed save does not award a new persistent completion. Editing after a check marks those results as belonging to earlier code. A completed lesson remains a historical achievement. Course completion never creates an official AtCoder AC or mock-exam score.

## Local content contract

The editable source consists of three UTF-8 files:

- `data/academy-parts/01-foundations.json`: lessons 1–8.
- `data/academy-parts/02-methods.json`: lessons 9–16.
- `data/academy-parts/03-algorithms.json`: lessons 17–24.

Run `python3 scripts/assemble_academy.py` after editing. It compiles `data/academy.js`, which defines `window.AQUILA_ACADEMY` with schema `version: 2`. The global name and existing exercise IDs remain stable for compatibility.

Each lesson defines its order, stage, prerequisites, estimated reading time, linked problem IDs, starter program, reference program, and input/output test cases. Each `content.zh`, `content.en`, and `content.ja` has a title, summary, objectives, sections, checkpoints, exercise requirements, input/output specification, hint, and solution explanation. A section may include `code`, `output`, and `exampleInput`; code samples must execute and match the displayed output exactly. Text is rendered as escaped content, with inline code spans supported in prose.

No translation service or remote course lookup is used. The exercises are original authored material, separate from the attributed AtCoder statements. The original 14 exercises retain their task contracts, starter/reference programs, and tests, so earlier code and completion records remain usable.

## Verification

```sh
python3 scripts/assemble_academy.py --check
node --test tests/academy-content.test.cjs tests/academy-runtime.test.cjs
```

Content checks validate the chapter order, prerequisites, linked problem IDs, three-language structure, Python syntax, all 108 published cases, and every displayed code example in every language. Seventeen independent oracles add 576 input cases, using direct enumeration, subset search, repeated relaxation, union-find, or other independent formulations to check the reference programs. Together, these run reference solutions against 684 published and additional cases.

Controller tests cover real solution execution, cancellation, stale results, editing during a run, undoing to checked code, timeout recovery, and save failure. The macOS integration harness additionally executes every published reference case using the bundled WebKit/Pyodide runtime in a fresh interpreter, checking that modules, builtins, and filesystem state do not leak between runs.

These tests check the documented cases and behaviors. They do not prove arbitrary submitted programs correct, or establish that every learner has mastered a topic.
