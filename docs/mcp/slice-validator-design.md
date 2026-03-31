# Slice Validator MCP

## Purpose

`slice-validator` prevents agents from drifting beyond the currently intended slice of work.

It acts as a governance gate between planning and implementation by checking whether a proposed change matches the active slice, respects the spec, and avoids violating explicit non-goals.

## Core Problem

In execution, agents often expand scope while believing they are still working on the current task.

This usually happens in familiar ways:

- the current slice is interpreted too broadly
- implementation convenience becomes product scope
- adjacent cleanup turns into opportunistic refactoring
- a useful idea appears and gets bundled into the same change
- non-goals exist in the spec but are ignored during coding

The result is broad, poorly verified work that no longer matches the planned seam.

`slice-validator` exists to stop that before code changes spread.

## Primary Use Cases

1. An agent proposes a code change and needs to know whether it fits the active slice.
2. A repo has `spec.md` and `plan.md`, but execution keeps broadening.
3. A user wants agents to remain inside narrow vertical slices.
4. A team wants an explicit gate before implementation or before large diffs continue.

## Non-Goals

- replacing human judgment
- preventing all exploratory coding
- validating code quality or correctness
- replacing tests
- performing architectural review

This MCP is about scope conformance during execution, not overall quality.

## What It Checks

`slice-validator` should compare:

- the active slice from `plan.md`
- goals and non-goals from `spec.md`
- optional project brief context
- the proposed change description
- optional target files or diff preview

It should answer:

- does this belong to the active slice?
- does it violate an explicit non-goal?
- does it appear to expand the slice boundary?
- is the proposed verification aligned with the slice?

## Validation Standard

A proposed change is valid only if all are true:

1. It directly supports the active slice outcome.
2. It does not violate explicit non-goals.
3. It does not widen scope beyond the slice seam.
4. It names a verification path appropriate to the slice.

If one or more fail, the MCP should warn or block.

## Inputs

The MCP should consume some combination of:

- `project-brief.md`
- `spec.md`
- `plan.md`
- optional `docs/tracking/board.md`
- a proposed change summary
- optional target file list
- optional diff preview
- optional proposed verification steps

## Outputs

The MCP should return:

- validation status
- a concise rationale
- mismatches against slice or spec
- suggested narrowing if invalid
- whether execution is safe to proceed

## Status Meaning

- `valid`
  The proposed change fits the active slice and respects current boundaries.
- `warn`
  The change is probably related but appears broader than necessary or weakly verified.
- `block`
  The change does not fit the active slice or violates explicit boundaries.

## High-Value Signals

Strong reasons to block:

- the change targets work outside the current slice outcome
- the proposal conflicts with a listed non-goal
- the proposal implies a new feature or broader refactor not named in the slice
- no verification path is given

Strong reasons to warn:

- the change touches files outside the expected slice area
- the proposal bundles implementation and opportunistic cleanup
- the slice wording is ambiguous enough that multiple interpretations are plausible
- verification is generic instead of slice-specific

## False Positive Controls

This MCP will fail if it becomes rigid or pedantic.

Controls:

- support `warn` as a middle state
- tolerate small supporting changes that are clearly required by the slice
- do not block on minor file spread if the purpose is still narrow
- allow execution if the user explicitly accepts controlled exploration
- prefer blocking only when mismatch is strong

## Integration Patterns

Best places to use it:

- before code-writing tools run
- before a large diff expands further
- at the start of an execution slice
- after a spec or plan update
- on explicit command such as "validate this slice"

It pairs naturally with:

- `uncertainty-sifter`
- `durable-decision`
- `seam-guard`

## Open Risks

- plan files may be too vague to support reliable validation
- active slice detection may be ambiguous
- users may see it as friction if it warns too often
- the MCP may overfit to wording instead of real intent

## Success Criteria

This MCP is successful if:

- scope creep is caught before it becomes a large diff
- agents stay closer to planned seams
- non-goals materially influence implementation behavior
- warnings feel helpful rather than bureaucratic
