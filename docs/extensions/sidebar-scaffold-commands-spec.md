# Sidebar Scaffold Commands Spec

## Purpose

The Project Sidebar extension should expose scaffold actions directly in the IDE so users can create and insert project artifacts without leaving the editor.

## Scope

These commands are not responsible for deciding the full scaffold strategy.

They are responsible for:

- fast artifact creation
- template insertion
- standard file placement
- reducing context switching during execution

## V1 Commands

- `Project OS: Create Brief`
- `Project OS: Create Spec`
- `Project OS: Create Plan`
- `Project OS: Create Handoff`
- `Project OS: Create Debug Log`
- `Project OS: Insert Tracking Kit`
- `Project OS: Create Weekly Status`
- `Project OS: Create Milestone Brief`

## V1 Behavior

Each command should:

1. detect whether the target artifact already exists
2. if missing, create it from the corresponding template
3. if present, offer:
   - open existing file
   - insert content into current file when appropriate
   - cancel

## Template Sources

Use templates from:

- `templates/`
- `templates/tracking/`

Do not hardcode template text in multiple places if avoidable.

## Non-Goals

- deciding full scaffold mode
- complex project analysis
- deep editing of planning docs
- replacing the browser app

## Success Criteria

These commands succeed if:

- they create the expected artifact in the expected place
- they avoid duplicating existing files
- users can scaffold common project artifacts from inside the IDE with low friction
