# Scaffold Orchestrator MCP Spec

## Purpose

`scaffold-orchestrator` is a context-aware scaffolding MCP.

It does not simply copy a full template set.

It looks at the current repo, determines what already exists, identifies what is missing or premature, and recommends or performs only the next appropriate scaffold step.

## Core Problem

Full scaffolding is often too much.

By the time a repo is partially formed, the real need is usually:

- add the missing artifact
- patch the current structure
- avoid duplication
- scaffold only the next layer

That is what this MCP should handle.

## Inputs

- repo file tree
- existing artifacts:
  - `project-brief.md`
  - `spec.md`
  - `plan.md`
  - `handoff.md`
  - `debug-log.md`
  - `docs/tracking/`
- optional user intent
- optional current workflow stage

## Outputs

- scaffold recommendation
- missing artifact list
- duplicate or premature artifact warning
- next scaffold action
- optional file creation plan

## Example Behaviors

### Example 1

Repo has:

- `project-brief.md`
- `spec.md`

Missing:

- `plan.md`

Result:

- recommend scaffolding only `plan.md`

### Example 2

Repo has:

- brief/spec/plan

Missing:

- tracking kit

Project is clearly multi-session.

Result:

- recommend inserting `docs/tracking/`

### Example 3

Repo already has:

- a tracking board
- a handoff doc
- a debug log

Result:

- do not scaffold duplicates
- recommend only missing or weak artifacts

## Decision Standard

Prefer:

- selective scaffolding
- using current repo truth
- smallest next useful artifact

Avoid:

- full reset scaffolds
- duplicate structure
- scaffolding artifacts that the project is not ready to maintain

## V1 Scope

In scope:

- artifact presence detection
- missing artifact recommendations
- duplicate warning
- next-step scaffold output

Out of scope:

- semantic quality evaluation of all artifacts
- auto-writing many files at once
- deep maturity scoring

## Success Criteria

This MCP succeeds if:

- it recommends the next right scaffold action instead of a generic full scaffold
- it avoids duplicate or premature structure
- it makes partial repos easier to complete cleanly
