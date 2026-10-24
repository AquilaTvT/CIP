# Plume independent correctness audit

Scope: application state, official submission synchronization, mock scoring, backups, and the exercise sequence. The original audit was read-only; the confirmed issues below have since been repaired. The independent regression file is `tests/audit.test.cjs`.

## Confirmed regressions

The baseline application failed all six cases below. The regression suite covers the repairs, account-bound mocks, imported-backup invalidation, old duplicate cleanup, and the beginner recommendation order. Run `node --test tests/audit.test.cjs` to check them against the current source.

| Priority | Reproduction | Incorrect result | Required behavior |
|---|---|---|---|
| P1 | Start synchronization for account A; change to B before A's request resolves. | A's submissions and synchronization cursor enter B's state. A's ACs are shown as B's verified progress; B's earlier history can be skipped. | Capture the account and state generation at request start. Ignore obsolete responses; cancel old requests when changing account, importing, or resetting. |
| P1 | Trigger two synchronizations before either response returns. Return the same submission from both. | Two attempts with the same official ID are inserted. Error counts and mock penalties can inflate. | Coalesce same-account requests and upsert against live state by official submission ID. |
| P1 | Start synchronization; clear local data; then resolve the request. | Deleted attempts are recreated after the confirmed reset. | A reset must invalidate all older operations before they can commit. |
| P2 | Store submission 123 as WA. A later full refresh returns the same ID as AC. | The existing ID is skipped and WA remains permanent. | Update verdict and timing fields for existing IDs. Apply the correction to mock records too. |
| P1 | Finish a mock before its official AC appears in the index, then choose New Mock. Synchronize the AC afterward. | The archived mock permanently remains at zero because only the current mock is hydrated. | Reconcile current and archived mock sessions whose submission windows contain the official attempt. Bind a mock to its account to avoid cross-account hydration. |
| P2 | Use the ordinary header or startup synchronization while a mock is active. | The problem becomes officially verified, but its mock score remains unchanged. | Every successful official sync should reconcile mock scores; the special mock button should only be another entry point. |

The first three failures share a missing asynchronous state-lifetime boundary. A mutex alone does not prevent an old account or reset request from committing into a replacement state.

## Exercise sequence

The existing L0 sequence places APG4bPython EX18 (recursive organization-tree/subtree counting) at global position 13 and EX20 (a frequency dictionary over up to 100,000 elements) at position 14, before PracticeA at position 16 and the first elementary ABC exercises. L0 is labeled “Prerequisite/入门”. This is a substantial progression problem for a learner who has not learned Python input, loops, or lists.

Implemented: input/output and arithmetic → conditionals → strings and loops → lists and tables → counting/maps → functions → bitwise operations → recursion. Only L0 `order` fields changed; all problem IDs, levels, statements, and historical global IDs are preserved. PracticeA is first and EX18 is last. Recommendations prioritize the lowest unfinished level, then saved/failed problems within that level. See [CURRICULUM.md](CURRICULUM.md). Contest letters alone do not establish difficulty, and no exam-score prediction follows from completing a fixed number of AtCoder problems.

## Local output comparison limits

The interface accurately says that local results are sample/custom-output comparisons rather than official judging. That distinction must survive the redesign. Literal comparison can reject an alternative valid answer for ABC343A, ABC085C, ABC109D, and ABC311C, and it ignores the published numerical tolerances for ABC138B, ABC183B, and ABC138C. For example, ABC343A sample input `2 5` accepts output `9`, although its displayed sample output is `2`.

If the product adds a local “correct/incorrect” verdict, implement a task-specific checker for those problems. Otherwise retain “output differs” and explicitly identify non-unique/tolerance tasks; never convert this comparison into verified AC or official mock points.

## Checked behavior and boundaries

- Existing mock scoring counts only wrong attempts before the first AC on a solved task; CE/IE and unsolved-task wrongs are excluded. These rules have dedicated existing regressions.
- Event windows use epoch milliseconds, so a time-zone change does not shift a mock deadline. Activity dates/streaks currently use the operating system/browser time zone. AtCoder Problems' own streak metric uses JST; these are different metrics and should not share an unqualified label if directly compared.
- Statement coverage is 221 tasks / 663 local language records. Metadata coverage is a separate measurement; no fallback language request is needed to read a problem.
- A 300-point local mock is a training convention, not a calibrated prediction of University of Tokyo admission-exam marks.

## Reference

[AtCoder Problems API documentation](https://github.com/kenkoooo/AtCoderProblems/blob/master/doc/api.md) documents the 500-submission response limit and requests more than one second between API accesses. Its published streak endpoint is explicitly labeled JST. Synchronization now coalesces concurrent same-account requests, waits at least 1.1 seconds between request starts, upserts official submission IDs, and revisits the most recent hour on incremental refresh. Full refresh remains available for older verdict corrections. Changing account, importing a backup, or resetting invalidates pending responses before they can commit.
