# Project Sidebar Extension Spec Draft

## Summary

The Project Sidebar is a VS Code / Cursor extension that exposes the current project state inside the IDE through a live sidebar, command palette actions, template snippets, and lightweight health indicators.

## Feature Set

### 1. Sidebar View

The extension contributes a dedicated sidebar view, for example:

- Activity Bar icon: `Project OS`
- View title: `Live Edge`

The view should parse repo artifacts and show:

- active slice
- current seam
- next recommended step
- blocked items
- risks
- health indicators

Primary sources:

- `docs/tracking/board.md`
- `plan.md`

Secondary sources:

- `spec.md`
- `project-brief.md`
- `docs/tracking/decisions.md`

## Sidebar Data Model

```json
{
  "active_slice": "Read-only lifecycle health summary",
  "current_seam": "Dashboard renders without persistence changes",
  "next_step": "Verify empty-state rendering in the app",
  "blocked": [
    "Need explicit health signal rules before persistence work"
  ],
  "risks": [
    "Dashboard may duplicate tracking information"
  ],
  "health": {
    "scope": "healthy",
    "spec": "warning",
    "plan": "healthy",
    "handoff": "missing"
  }
}
```

## 2. Command Palette Commands

Suggested commands:

- `Project OS: Overview`
- `Project OS: Show Active Slice`
- `Project OS: Open Tracking Board`
- `Project OS: Open Plan`
- `Project OS: Scaffold New Project`
- `Project OS: Scaffold New Slice`
- `Project OS: Generate Handoff`
- `Project OS: Refresh Health`

Implementation notes:

- commands should call existing Python tools where possible
- if Python or repo tools are unavailable, show actionable errors
- keep command names short and predictable

## 3. Template Snippets

Markdown snippets should inject template content from the repo's `templates/` and `templates/tracking/` directories.

Suggested snippet triggers:

- `/brief`
- `/spec`
- `/plan`
- `/debug`
- `/handoff`
- `/board`
- `/weekly`
- `/milestone`

Behavior:

- insert template text into current markdown file
- optionally create a new file from the template
- prefer repo templates over hardcoded copies

## 4. Health Sync

The extension computes small health indicators from available artifacts.

Possible statuses:

- `healthy`
- `warning`
- `missing`

Examples:

- `Scope: Healthy`
- `Spec: Warning`
- `Plan: Healthy`
- `Handoff: Missing`

Status bar behavior:

- compact summary only
- click opens the sidebar

## Health Heuristics For V1

### Scope

- `healthy`
  - `project-brief.md` exists
  - has non-empty in-scope and out-of-scope sections
- `warning`
  - brief exists but appears thin or incomplete
- `missing`
  - no brief found

### Spec

- `healthy`
  - `spec.md` exists and includes goals, non-goals, and acceptance criteria
- `warning`
  - spec exists but key sections are empty
- `missing`
  - no spec found

### Plan

- `healthy`
  - `plan.md` exists and contains slices with verification/seam structure
- `warning`
  - plan exists but slice structure is weak
- `missing`
  - no plan found

### Handoff

- `healthy`
  - recent handoff exists or current seam is explicit in tracking
- `warning`
  - handoff exists but verification/next step is weak
- `missing`
  - no handoff artifact or clear seam found

## Extension Surface

Likely implementation pieces:

- `TreeDataProvider` for sidebar state
- command registrations
- markdown snippet contribution
- status bar item
- file watchers for relevant project artifacts

## Error Handling

The extension should fail clearly when:

- the repo does not use this project structure
- Python is unavailable for tool-backed commands
- expected files are missing
- parsing fails

Fallback behavior:

- sidebar shows "missing" rather than crashing
- commands show guidance instead of stack traces

## V1 Boundaries

In scope:

- one sidebar view
- basic artifact parsing
- command palette wrappers
- markdown snippets
- status bar health summary

Out of scope:

- deep semantic parsing of arbitrary markdown
- editing and saving all planning docs through custom forms
- remote sync
- issue tracker integrations
- automatic project governance enforcement
