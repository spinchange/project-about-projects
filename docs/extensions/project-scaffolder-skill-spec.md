# Project Scaffolder Skill Spec

## Name

`project-scaffolder`

## Purpose

`project-scaffolder` decides what initial structure a project should receive.

It interprets project intent, repo context, and workflow maturity, then chooses and applies the right scaffold depth without overbuilding.

## Core Job

This skill answers:

- what artifacts should exist now?
- what artifacts should wait?
- what scaffold mode fits this project?
- what is the smallest credible first structure?

## Scaffold Modes

### `minimal`

Create:

- `project-brief.md`
- `spec.md`
- `plan.md`

Use when:

- the project is still taking shape
- the user needs core planning artifacts first
- tracking/governance would be premature

### `tracked`

Create:

- minimal mode artifacts
- `docs/tracking/` kit

Use when:

- the project is multi-session
- multiple agents or people will touch it
- execution state needs durability

### `execution-ready`

Create:

- tracked mode artifacts
- `handoff.md`
- `debug-log.md`
- optional branch/worktree guidance

Use when:

- implementation is active now
- handoffs are likely
- debugging and stopping points should be first-class

## Inputs

- user request
- repo shape
- existing artifacts
- current project maturity
- known constraints

## Outputs

- scaffold mode decision
- rationale
- created artifacts
- omitted artifacts and why
- recommended first slice

## Decision Rules

Prefer:

- the smallest scaffold that supports the next real work
- explicit omission of premature artifacts
- using existing artifacts instead of recreating them

Avoid:

- full-system scaffolding for a vague project
- duplicate brief/spec/plan files
- creating tracking just because the pattern exists

## Success Criteria

This skill succeeds if:

- the resulting scaffold matches project maturity
- the user can begin real work immediately
- the repo does not gain decorative or redundant structure
