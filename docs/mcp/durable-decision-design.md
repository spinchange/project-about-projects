# Durable Decision MCP

## Purpose

`durable-decision` detects project-shaping decisions as they happen and converts them into durable decision-log entries instead of leaving them implicit in diffs, transient reasoning, or chat history.

It exists to preserve high-impact decisions across:

- sessions
- agents
- humans
- context resets
- later second-guessing

## Core Problem

Agents and humans routinely make decisions that are larger than the local edit:

- adding a dependency
- changing a workflow
- adopting or rejecting a pattern
- formalizing a constraint
- altering a public contract
- deciding that a shortcut is acceptable

The code changes survive.
The reasoning often does not.

This MCP closes that gap.

## Primary Use Cases

1. A dependency is added to the repo.
2. A new top-level module or boundary is introduced.
3. A workflow or process rule changes.
4. A spec, plan, or tracking document changes scope or constraints.
5. A public interface changes in a way future maintainers may question.
6. An important tradeoff is chosen and should not be rediscovered later.

## Non-Goals

- logging every implementation detail
- replacing commit messages
- acting as a changelog generator
- capturing obvious low-level bug fixes
- writing essay-length architectural records for minor changes

## When It Should Trigger

The MCP should evaluate changes after meaningful repo modifications and before final session completion or merge.

Best trigger points:

- after tool-driven file edits
- after dependency manifest changes
- before handoff generation
- before commit
- during review of changed files

It should also be callable on demand:

- "check whether I made any durable decisions"

## Inputs

The MCP should consume some combination of:

- `git diff --staged` and/or working diff
- changed file list
- dependency manifest diffs such as:
  - `package.json`
  - `pyproject.toml`
  - `Cargo.toml`
- docs changes such as:
  - `spec.md`
  - `plan.md`
  - `docs/tracking/decisions.md`
  - `docs/tracking/roadmap.md`
  - `docs/tracking/board.md`
- structural file additions/removals
- optional recent tool/action trace
- optional current brief/spec context

## Decision Categories

Use a small stable set:

- `dependency`
- `architecture`
- `workflow`
- `scope`
- `interface`
- `constraint`

## Detection Rules

The MCP should use heuristics, not rigid syntax, but these are the strongest initial rules.

### High-Signal Triggers

- New dependency added or removed
- New top-level package/module/folder introduced
- Existing dependency use becomes foundational
- Public interface shape changes
- New project rule/process/governance artifact added
- `README`, `spec`, or tracking docs change repo behavior or product promise
- Scope boundary changes in docs or code structure
- Explicit tradeoff appears in comments/docs/diffs

### Medium-Signal Triggers

- A persistent implementation pattern is repeated across multiple files
- A temporary prototype is documented as default behavior
- A testing strategy changes meaningfully
- A storage/persistence model is selected
- A branch/workflow convention is introduced

### Low-Signal Changes That Should Usually Not Trigger

- typo fixes
- text cleanup
- isolated bug fixes
- local refactors with no contract or boundary change
- formatting-only changes
- routine test additions

## Decision Standard

A change should be treated as a durable decision if at least one is true:

1. Future contributors could reasonably ask "why is it done this way?"
2. Reverting or changing it later would require broader coordination.
3. It changes repo-wide expectations, product boundaries, or workflow.
4. It encodes a tradeoff that should not live only in chat or intuition.

## False Positive Controls

If this MCP is noisy, users will stop trusting it.

Controls:

- require both a structural signal and a semantic signal where possible
- prefer under-triggering to over-triggering at first
- allow `candidate` without forcing logging
- escalate to `required` only for strong signals
- deduplicate repeated detections of the same decision in the same branch/session
- suppress if `decisions.md` was already updated with matching content recently

## Status Meaning

- `none`
  No durable decision detected.
- `candidate`
  A meaningful decision may have been made; review suggested.
- `required`
  A strong decision signal was detected and should be logged before closure, commit, or handoff.

## Draft Decision Entry Format

Target `docs/tracking/decisions.md` using a compact format:

```md
### YYYY-MM-DD — Title

- Decision: ...
- Why: ...
- Tradeoff: ...
- Follow-up: ...
```

The MCP should draft entries in this shape, not write prose blobs.

## Integration Patterns

Best integrations:

- before commit
- before handoff
- after dependency changes
- after broad doc/code edits
- on explicit "check decisions" command

It pairs especially well with:

- `uncertainty-sifter`
- `seam-guard`
- `docs/tracking/decisions.md`

## Open Risks

- too noisy
- too clever and hallucinatory
- logging implementation detail as architecture
- missing real decisions that are only implicit
- generating bad draft rationales that sound confident but are wrong

## Success Criteria

This MCP is successful if:

- important decisions stop disappearing into chat history
- `decisions.md` becomes more useful without becoming spammy
- agents can explain why a change should be logged
- users feel prompted at the right moments, not harassed constantly
