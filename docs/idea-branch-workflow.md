# Idea Branch Workflow

Use this workflow when an agent or human wants to explore an idea that should not touch `main` yet.

## When To Use It

Use an idea branch for:

- speculative UI or product concepts
- alternate implementations
- "show me what you mean" prototypes
- partial or risky refactors
- agent-generated work you want to inspect before trusting

Do not use `main` for these.

## Naming

Use this branch pattern:

- `idea/<slug>`

Examples:

- `idea/project-health-dashboard`
- `idea/editor-download-export`
- `idea/tracking-overview-pane`

If the work becomes serious and reviewable, it can later graduate to:

- `draft/<slug>`

Or directly to a PR from the `idea/*` branch.

## Default Pattern

1. Create an `idea/*` branch.
2. Give that branch its own worktree.
3. Let the agent work only there.
4. Review the result.
5. Merge, cherry-pick, or discard.

This keeps speculative work real but isolated.

## Commands

Create a new idea branch and worktree:

```powershell
.\tools\start_idea_branch.ps1 -Name "Project Health Dashboard"
```

Create only the branch in the current working tree:

```powershell
.\tools\start_idea_branch.ps1 -Name "Project Health Dashboard" -NoWorktree
```

Remove an idea worktree and optionally its branch:

```powershell
.\tools\remove_idea_branch.ps1 -Name "Project Health Dashboard" -DeleteBranch
```

## Review Choices

- Keep as branch: if it is promising but not ready.
- Open a PR: if you want review comments and a merge decision.
- Cherry-pick pieces: if only part of the experiment is worth keeping.
- Delete it: if it answered the question and should disappear.

## Rule Of Thumb

`main` is for trusted integrated work.

`idea/*` is for experiments with uncertain value.
