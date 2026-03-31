# Project Sidebar Extension Scaffold

## Purpose

This document defines the concrete extension scaffold for the first implementation of the Project Sidebar.

It is the bridge between the product spec and an actual VS Code / Cursor extension codebase.

## Proposed Extension Identity

- Extension ID: `project-os-sidebar`
- Display Name: `Project OS Sidebar`
- Publisher: placeholder
- Target Editors:
  - VS Code
  - Cursor

## Top-Level Package Structure

```text
project-os-sidebar/
  package.json
  tsconfig.json
  src/
    extension.ts
    commands/
      overview.ts
      openPlan.ts
      openTrackingBoard.ts
      generateHandoff.ts
      refreshHealth.ts
    core/
      workspace.ts
      artifacts.ts
      parsing/
        boardParser.ts
        planParser.ts
        health.ts
    views/
      liveEdgeProvider.ts
      healthStatus.ts
    snippets/
      markdown.code-snippets
  media/
    icon.svg
```

## package.json Contributions

## Activation Events

```json
[
  "onStartupFinished",
  "onCommand:projectOs.overview",
  "onCommand:projectOs.openPlan",
  "onCommand:projectOs.openTrackingBoard",
  "onCommand:projectOs.generateHandoff",
  "onCommand:projectOs.refreshHealth",
  "workspaceContains:docs/tracking/board.md",
  "workspaceContains:plan.md"
]
```

## Commands

Register these command IDs:

```json
[
  {
    "command": "projectOs.overview",
    "title": "Project OS: Overview"
  },
  {
    "command": "projectOs.openPlan",
    "title": "Project OS: Open Plan"
  },
  {
    "command": "projectOs.openTrackingBoard",
    "title": "Project OS: Open Tracking Board"
  },
  {
    "command": "projectOs.generateHandoff",
    "title": "Project OS: Generate Handoff"
  },
  {
    "command": "projectOs.refreshHealth",
    "title": "Project OS: Refresh Health"
  }
]
```

## View Container

Activity bar container:

```json
{
  "id": "projectOs",
  "title": "Project OS",
  "icon": "media/icon.svg"
}
```

## Sidebar Views

Initial views:

```json
[
  {
    "id": "projectOs.liveEdge",
    "name": "Live Edge"
  },
  {
    "id": "projectOs.health",
    "name": "Health"
  }
]
```

V1 can collapse these into one provider if needed, but the IDs should be reserved now.

## Menus

Suggested view title actions:

```json
[
  {
    "command": "projectOs.refreshHealth",
    "when": "view == projectOs.liveEdge",
    "group": "navigation"
  },
  {
    "command": "projectOs.openTrackingBoard",
    "when": "view == projectOs.liveEdge",
    "group": "navigation"
  }
]
```

## Configuration

Start with a small config surface:

```json
{
  "title": "Project OS Sidebar",
  "properties": {
    "projectOs.pythonPath": {
      "type": "string",
      "default": "",
      "description": "Optional path to Python executable for Project OS commands."
    },
    "projectOs.boardPath": {
      "type": "string",
      "default": "docs/tracking/board.md",
      "description": "Relative path to the tracking board."
    },
    "projectOs.planPath": {
      "type": "string",
      "default": "plan.md",
      "description": "Relative path to the implementation plan."
    },
    "projectOs.specPath": {
      "type": "string",
      "default": "spec.md",
      "description": "Relative path to the specification."
    },
    "projectOs.briefPath": {
      "type": "string",
      "default": "project-brief.md",
      "description": "Relative path to the project brief."
    }
  }
}
```

## Status Bar

Use one compact status bar item:

- ID: `projectOs.healthStatus`
- Alignment: left
- Priority: low-medium

Example text:

- `Project OS: Scope Healthy`
- `Project OS: Spec Warning`
- `Project OS: Handoff Missing`

Click action:

- open `projectOs.liveEdge`

## Snippet Contribution

Language:

- `markdown`

Suggested snippet prefixes:

- `/brief`
- `/spec`
- `/plan`
- `/debug`
- `/handoff`
- `/board`
- `/weekly`
- `/milestone`

Suggested snippet names:

- `Project OS Brief`
- `Project OS Spec`
- `Project OS Plan`
- `Project OS Debug Log`
- `Project OS Handoff`
- `Project OS Board`
- `Project OS Weekly Status`
- `Project OS Milestone`

## Core Runtime Modules

### `workspace.ts`

Responsibilities:

- resolve workspace root
- resolve configured artifact paths
- detect whether the repo matches expected structure

### `artifacts.ts`

Responsibilities:

- read artifact files safely
- return missing/unavailable state without crashing

### `boardParser.ts`

Responsibilities:

- parse headings like:
  - `## Now`
  - `## Next`
  - `## Blocked`
  - `## Risks`

### `planParser.ts`

Responsibilities:

- extract objective
- extract slices or stopping points
- infer active slice conservatively

### `health.ts`

Responsibilities:

- compute health states from:
  - brief existence/completeness
  - spec existence/completeness
  - plan structure
  - handoff or seam visibility

### `liveEdgeProvider.ts`

Responsibilities:

- expose tree items for:
  - active slice
  - current seam
  - next step
  - blocked
  - risks

### `healthStatus.ts`

Responsibilities:

- render status bar text
- update on file changes

## Initial File Watchers

Watch these files if present:

- `docs/tracking/board.md`
- `plan.md`
- `spec.md`
- `project-brief.md`
- `handoff.md`

On change:

- re-parse artifacts
- refresh tree provider
- refresh status bar

## Command Behavior Mapping

### `projectOs.overview`

V1 behavior:

- show a quick pick or information message summarizing current live edge

### `projectOs.openPlan`

V1 behavior:

- open `plan.md`

### `projectOs.openTrackingBoard`

V1 behavior:

- open `docs/tracking/board.md`

### `projectOs.generateHandoff`

V1 behavior:

- initially open `handoff.md` if present
- later integrate with tool-backed generation

### `projectOs.refreshHealth`

V1 behavior:

- force re-read of artifacts and refresh UI state

## Suggested Tech Stack

- TypeScript
- VS Code Extension API
- no webview in V1 unless clearly necessary

Reason:

The V1 feature set is mostly tree views, commands, snippets, and status bar UI. A webview would be heavier than needed.

## V1 Implementation Rule

Do not build a custom planning app inside the IDE.

The extension should surface repo truth and existing workflow artifacts, not replace them.

## Done Criteria

The scaffold is complete enough when:

- package contributions are defined
- command IDs are stable
- view IDs are stable
- snippet prefixes are defined
- parser/runtime modules are named
- a developer can begin implementing without inventing extension structure
