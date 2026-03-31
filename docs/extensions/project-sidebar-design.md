# Project Sidebar Extension

## Purpose

The Project Sidebar is a VS Code / Cursor extension that brings the project operating system into the IDE.

It closes the gap between:

- the planning and governance artifacts in the repo
- the active code execution surface where developers and agents spend their time

Instead of forcing users to keep the browser app, markdown docs, and codebase mentally synchronized, the extension makes the live project state visible where work is actually happening.

## Core Idea

The browser app is good for deliberate planning and drafting.

The IDE is where execution pressure happens.

That is exactly where scope creep, forgotten seams, stale handoffs, and invisible drift tend to appear.

The Project Sidebar exists to keep the "live edge" visible during implementation.

## Primary Features

### 1. Live Edge Sidebar

A dedicated sidebar view that parses:

- `docs/tracking/board.md`
- `plan.md`
- optional `spec.md`

And surfaces:

- current active slice
- next items
- blocked items
- current risks
- current seam / stopping point
- the most relevant next action

This is the extension's core value.

It should answer:

- What are we doing now?
- What should not be forgotten while coding?
- Where can we safely stop?

### 2. Command Palette Integration

Expose Project OS actions in the command palette.

Examples:

- `Project OS: Overview`
- `Project OS: Show Active Slice`
- `Project OS: Scaffold New Slice`
- `Project OS: Create New Project`
- `Project OS: Open Tracking Board`
- `Project OS: Generate Handoff`

These commands should wrap existing repo workflows where possible rather than inventing a parallel system.

### 3. Snippet Integration

Typing snippets in markdown should inject guided templates from the repo.

Examples:

- `/brief`
- `/spec`
- `/plan`
- `/handoff`
- `/debug`
- `/weekly-status`
- `/milestone`

This should make the repo's templates feel native inside the IDE instead of hidden in folders.

### 4. Health Sync

The extension should display lightweight health indicators derived from project artifacts.

Examples:

- `Scope: Healthy`
- `Spec: Warning`
- `Plan: Healthy`
- `Handoff: Missing`

The same signals can appear:

- in the sidebar
- in the status bar
- optionally in hover details

This should be compact, not dashboard spam.

## Why This Matters

This is likely the highest-impact plugin shape because it meets developers where they already are.

Most developers will not keep a separate planning app open all day.
They will stay in the IDE.

So if the system is supposed to affect execution quality, it needs a foothold there.

## Target Users

Primary:

- solo developers using the project operating system in their own repos
- agent-heavy users working with Codex, Cursor, or similar tools

Secondary:

- small teams that use markdown-based planning/tracking in-repo
- maintainers who want visible handoff and slice discipline during execution

## Non-Goals

- replacing the browser app
- becoming a full project management system
- syncing with Jira, Linear, or GitHub Projects in V1
- becoming a rich visual editor for all planning docs
- enforcing hard policy in the IDE in V1

The extension should assist execution, not turn the editor into an enterprise control panel.

## Design Principles

### Stay close to repo truth

Read the markdown and templates that already exist.
Do not invent a second project state model unless necessary.

### Make the live edge visible

The extension should foreground current work, current seam, and current risk.

### Reduce context switching

Users should not need to bounce between:

- markdown docs
- terminal
- browser app
- code files

to understand current project state.

### Prefer compact signals over decorative UI

The sidebar should be useful in motion.
It should not become another pane full of ceremony.

## V1 Product Shape

The first version should include:

1. Sidebar view for board + plan state
2. Command palette wrappers for existing project tools
3. Markdown snippets for templates
4. Simple health indicators from artifacts

That is already a coherent product.

## Open Risks

- Markdown parsing may be fragile across varied user formats.
- The extension could become stale if it assumes one exact tracking structure.
- Status bar health indicators may become noisy if oversimplified.
- Command wrappers may feel shallow if they only mirror terminal commands without context.

## Success Criteria

The extension succeeds if:

- users can see the current live edge without leaving the IDE
- project templates are easier to invoke during real work
- planning artifacts influence execution behavior more often
- handoffs and stopping points become more visible during coding
