# Contributing

Keep changes focused, and include a reproducible check for every behavior change. [docs/VALIDATION.md](docs/VALIDATION.md) lists the commands; [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) explains how the pieces fit together.

Problem IDs, lesson IDs and local-storage keys are stable identifiers. Preserve them so that upgrades keep existing progress.

Statements are stored locally in Chinese, English and Japanese. Do not substitute another language for a missing translation, and do not add a translation service to the reading path. For each statement change, check the problem definition, all constraints, input and output formats, examples and any diagrams. Preserve spaces and line breaks inside sample data and source code.

Generated files are rebuilt from their sources, never edited by hand:

| Change | Edit | Then run |
| --- | --- | --- |
| Course | `data/academy-parts/*.json` | `python3 scripts/assemble_academy.py` |
| Original sets | `packs/ci-original/*.py` | `python3 scripts/build_packs.py` |
| Editor | `scripts/editor-entry.js` | `npm run build:editor` |

A new original set needs a scenario, four parts worth 100 points, statements and explanations in all three languages, a reference solution, seeded hidden tests and, wherever practical, an independent brute-force solution for the builder to compare against. The format is described in [docs/PROBLEM_PACKS.md](docs/PROBLEM_PACKS.md).

Do not commit personal progress exports, credentials or downloaded submission histories. Third-party problem content and bundled runtimes keep their original ownership and notices.
