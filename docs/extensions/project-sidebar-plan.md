# Project Sidebar Extension Implementation Plan

## Objective

Build the first usable version of the Project Sidebar extension for VS Code / Cursor so that the current project state is visible inside the IDE during execution.

## Why This First

The IDE is where execution drift happens.

If the project operating system is supposed to influence actual implementation behavior, it needs a visible foothold there.

## First Slice

Deliver a minimal extension that:

1. adds a `Project OS` sidebar
2. reads `docs/tracking/board.md` and `plan.md`
3. shows the current live edge
4. provides a few command palette actions
5. contributes markdown snippets
6. shows a compact health summary in the status bar

## Scope

### In Scope

- extension scaffold
- sidebar view
- file watchers for tracked markdown artifacts
- basic markdown parsing heuristics
- command palette actions
- markdown snippets
- status bar health summary

### Out Of Scope

- full browser-app parity
- rich custom forms for all templates
- deep semantic validation
- remote integrations
- hard policy enforcement

## Architecture

### Core Pieces

1. Artifact loader
- locate and read:
  - `docs/tracking/board.md`
  - `plan.md`
  - optional `spec.md`
  - optional `project-brief.md`

2. Parser layer
- extract:
  - now/next/blocked
  - active slice
  - seam
  - health signals

3. Sidebar provider
- render parsed state in a tree or grouped view

4. Command adapter
- map IDE commands to Python/tool calls

5. Snippet contribution
- contribute markdown snippets using repo template content

6. Status bar item
- show compact health summary

## V1 Parsing Strategy

Do not overengineer parsing first.

Use stable, explicit heuristics for common headings:

- `## Now`
- `## Next`
- `## Blocked`
- `## Risks`
- plan slice rows or explicit objective/current state sections

If parsing fails:

- degrade gracefully
- show "missing" or "unparsed"
- never block the rest of the extension

## Command Set For V1

Implement these first:

- `Project OS: Overview`
- `Project OS: Open Tracking Board`
- `Project OS: Open Plan`
- `Project OS: Generate Handoff`
- `Project OS: Refresh Health`

Defer:

- `Scaffold New Slice`
- `Scaffold New Project`

until command execution and repo assumptions are proven reliable.

## Snippet Strategy

V1 options:

1. ship generated snippets from repo templates
2. read template files dynamically from repo and insert them

Preferred V1:

- start with generated snippets for reliability
- add dynamic repo-template loading in a later slice

## Health Strategy

V1 health should be simple and explainable.

Do not compute abstract scores.

Use small rules:

- artifact exists?
- key sections present?
- likely active seam visible?
- handoff/tracking state available?

## Validation Strategy

Test V1 against:

- this repo
- a repo missing some artifacts
- a repo with partial tracking data

The extension is good enough if:

- sidebar loads without crashing
- current live edge is visible in this repo
- snippets insert usable template text
- status bar reflects obvious missing/healthy states

## Risks

- command wrappers may fail across environments
- parsing assumptions may be too specific
- snippet maintenance may drift from template source
- status bar indicators may oversimplify project state

## Refactor Triggers

Refactor after V1 if:

- parsing logic is duplicated across sidebar and health logic
- health rules become scattered and inconsistent
- command execution handling becomes tightly coupled to UI code

## Second Slice

After V1 proves useful:

- improve active slice extraction
- add richer handoff awareness
- support dynamic template loading
- add click-through health details in sidebar

## Third Slice

Only after trust is established:

- integrate MCP-backed health/slice validation
- correlate code file context with live slice
- surface decision candidates from `durable-decision`
- show slice validation warnings before edits expand

## Stop Condition

Stop V1 when:

- the extension makes the live edge visible inside the IDE
- users can access templates and key commands without leaving the editor
- the health summary is useful enough to glance at during execution
