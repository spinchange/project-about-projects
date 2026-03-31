# Durable Decision MCP Implementation Plan

## Objective

Build the first usable slice of `durable-decision`: detect high-confidence durable decision candidates from repo changes and return structured draft entries for `docs/tracking/decisions.md`.

## Why This First

The biggest risk is noise.

So the first version should be selective, narrow, and useful before it tries to be comprehensive.

## First Slice

Deliver a read-only analyzer that:

1. accepts repo change inputs
2. inspects changed files and diffs
3. detects only high-confidence durable decisions
4. returns structured candidates and draft decision entries
5. never writes to the repo automatically

## Scope

### In Scope

- changed file analysis
- dependency manifest change detection
- workflow/governance file change detection
- doc-driven scope/constraint change detection in obvious cases
- `none` / `candidate` / `required` output
- compact draft decision entry generation

### Out Of Scope

- auto-appending to `decisions.md`
- deep architecture inference
- language-specific AST support
- branch/session memory across calls
- broad low-confidence heuristics

## Inputs For V1

- repo root
- changed file list
- unified diff text
- optional contents of key files
- optional artifact paths

## Detection Heuristics For V1

Implement only these strong heuristics:

1. Dependency change
- Added or removed dependency in common manifest files.

2. Workflow/governance change
- New or modified files under:
  - `.github/`
  - `docs/tracking/`
  - workflow scripts
  - branch/process docs

3. Scope/constraint doc change
- Explicit changes in:
  - `README.md`
  - `spec.md`
  - `plan.md`
  - `docs/tracking/decisions.md`

4. Persistence/storage model selection
- Detect obvious patterns like:
  - localStorage/sessionStorage introduction
  - local file persistence strategy
  - backend/store library introduction

## Output Shape

Return:

- overall status
- one-line summary
- zero or more candidates
- each candidate with:
  - title
  - category
  - confidence
  - why it matters
  - evidence
  - should_log
  - draft entry

## Validation Strategy

Use repo fixtures or recorded diffs that represent:

- a dependency addition
- a new workflow/process doc
- a README promise change
- a trivial bug fix that should not trigger
- a formatting-only diff that should not trigger

The analyzer is good enough for V1 if:

- obvious decisions are caught
- trivial changes are mostly ignored
- draft entries are concise and usable

## Risks

- false positives erode trust quickly
- rationale text becomes too speculative
- too many categories too early make results inconsistent
- users expect auto-logging before trust is established

## Refactor Triggers

Refactor after V1 if:

- candidate generation logic sprawls across too many ad hoc rules
- category assignment becomes inconsistent
- dedupe logic needs a separate pass

## Second Slice

After V1 proves useful:

- compare candidates against existing `decisions.md`
- add duplicate suppression
- improve doc-to-code correlation
- add explicit "why this should be logged" guidance

## Third Slice

Only after trust is established:

- optional append mode
- session memory
- deeper semantic analysis
- stronger integration before commit or handoff

## Stop Condition

Stop V1 when:

- it catches high-confidence decisions reliably
- it avoids triggering on trivial edits most of the time
- the output is useful enough that a human would actually paste the draft entry into `decisions.md`
