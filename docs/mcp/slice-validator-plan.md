# Slice Validator MCP Implementation Plan

## Objective

Build the first usable slice of `slice-validator`: determine whether a proposed change fits the active execution slice and respects explicit non-goals before implementation expands.

## Why This First

Execution drift is one of the most common ways good plans decay.

A small validator that catches obvious scope expansion before code changes spread is valuable even if it is not perfect.

## First Slice

Deliver a read-only validator that:

1. reads `spec.md` and `plan.md`
2. identifies or accepts the active slice
3. compares a proposed change summary against that slice
4. checks for explicit non-goal conflicts
5. checks whether verification is present and slice-specific
6. returns `valid`, `warn`, or `block`

## Scope

### In Scope

- text-based parsing of active slice information
- natural-language proposed change validation
- explicit non-goal matching
- simple file-scope hints
- verification presence/quality checks
- narrowing suggestion output

### Out Of Scope

- AST analysis
- automatic writing to repo files
- perfect milestone/slice extraction from arbitrary plans
- semantic proof that code will match the slice
- enforcement hooks in editors or shells

## Inputs For V1

- `spec.md`
- `plan.md`
- optional `project-brief.md`
- proposed change summary
- optional target files
- optional verification list

## Detection Rules For V1

Implement only these strong heuristics:

1. Active slice extraction
- Parse the current slice from an explicit hint or the first unfinished slice row in `plan.md`.

2. Non-goal conflict detection
- Compare proposal summary and target files against the `Non-Goals` section in `spec.md`.

3. Scope expansion detection
- Flag when the proposal introduces clearly additional concerns beyond the slice outcome.

4. Verification gap detection
- Warn or block if no verification is provided.
- Warn if verification is generic and not clearly tied to the slice.

## Output Shape

Return:

- status
- safe_to_proceed
- active slice summary
- findings
- narrowing suggestion
- non-goal conflicts
- verification assessment

## Validation Strategy

Use fixtures or examples that represent:

- a clean narrow slice proposal that should validate
- a proposal that adds an extra feature and should warn
- a proposal that violates a non-goal and should block
- a proposal with no verification and should warn or block

The validator is good enough for V1 if:

- obvious scope expansion is caught
- explicit non-goal conflicts are surfaced
- useful narrowing suggestions are produced

## Risks

- many plans are too vague to parse reliably
- wording mismatch may create false warnings
- users may blame the MCP for weak planning artifacts
- the validator may be right in principle but annoying in practice

## Refactor Triggers

Refactor after V1 if:

- active slice extraction logic becomes brittle
- non-goal matching sprawls into many ad hoc rules
- validation findings become repetitive or inconsistent

## Second Slice

After V1 proves useful:

- improve slice extraction from common plan formats
- incorporate board/brief context
- use target file patterns more intelligently
- improve distinction between necessary support changes and real scope expansion

## Third Slice

Only after trust is established:

- integrate before code-writing actions
- support diff preview validation
- correlate acceptance criteria to proposed verification
- persist validation history per slice

## Stop Condition

Stop V1 when:

- the MCP can reliably catch clear slice violations
- it can distinguish most narrow supporting changes from real scope expansion
- it provides a useful warning or block before implementation drift spreads
