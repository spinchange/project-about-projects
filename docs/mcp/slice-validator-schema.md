# Slice Validator MCP Interface Draft

## Summary

`slice-validator` checks whether a proposed change fits the active slice in `plan.md`, respects `spec.md`, and stays inside the current execution boundary.

## Request

```json
{
  "repo_root": "C:\\Users\\user\\project-about-projects",
  "artifacts": {
    "brief_path": "project-brief.md",
    "spec_path": "spec.md",
    "plan_path": "plan.md",
    "board_path": "docs/tracking/board.md"
  },
  "active_slice_hint": "Add a read-only dashboard summary of lifecycle health",
  "proposed_change": {
    "summary": "Add dashboard state, derive health across stages, and add local persistence for dismissed warnings.",
    "target_files": [
      "app/app.js",
      "app/index.html",
      "app/styles.css"
    ],
    "diff_preview": "...optional diff or patch preview...",
    "verification": [
      "Run the app locally",
      "Verify dashboard renders with existing data",
      "Check empty-state rendering"
    ]
  },
  "options": {
    "strict_non_goals": true,
    "require_verification": true
  }
}
```

## Field Notes

- `repo_root`
  Absolute repo path.
- `artifacts`
  Paths for planning documents.
- `active_slice_hint`
  Optional explicit slice description if not trivially extractable.
- `proposed_change.summary`
  Short natural-language summary of intended work.
- `target_files`
  Optional file-level scope signal.
- `diff_preview`
  Optional patch summary or draft diff.
- `verification`
  Proposed checks for the slice.
- `options.strict_non_goals`
  Raise severity when explicit non-goals are touched.
- `options.require_verification`
  Elevate missing verification from warning to block.

## Response

```json
{
  "status": "warn",
  "summary": "The proposed change is related to the active slice but appears broader than the current boundary.",
  "safe_to_proceed": false,
  "active_slice": {
    "title": "Read-only lifecycle health summary",
    "outcome": "Display a high-level summary derived from existing lifecycle data.",
    "seam": "Dashboard renders without adding new persistence or editing workflows.",
    "verification": [
      "Dashboard renders correctly with current source data",
      "Empty-state and missing-data states are understandable"
    ]
  },
  "findings": [
    {
      "type": "scope_expansion",
      "severity": "warning",
      "message": "Adding local persistence for dismissed warnings broadens the slice beyond a read-only dashboard summary."
    },
    {
      "type": "verification_gap",
      "severity": "warning",
      "message": "The proposed verification does not explicitly check behavior tied to the new persistence."
    }
  ],
  "narrowing_suggestion": "Implement the read-only dashboard first and defer dismissal persistence to a separate slice.",
  "non_goal_conflicts": [],
  "verification_assessment": "partial"
}
```

## Status Rules

- `valid`
  Proposed change fits the slice and has adequate verification.
- `warn`
  Proposed change is adjacent to the slice but broader, ambiguous, or weakly verified.
- `block`
  Proposed change clearly violates the slice or explicit non-goals.

## Response Fields

- `summary`
  One-line judgment.
- `safe_to_proceed`
  Boolean execution recommendation.
- `active_slice`
  Parsed or inferred slice details.
- `findings`
  Flat list of mismatches or concerns.
- `narrowing_suggestion`
  Suggested smaller valid slice.
- `non_goal_conflicts`
  Explicit conflicts with spec non-goals.
- `verification_assessment`
  One of:
  - `adequate`
  - `partial`
  - `missing`

## First Slice Requirements

The first implementation only needs to support:

- spec and plan text input
- one active slice at a time
- proposed natural-language change summary
- optional target file list
- optional verification list
- `valid` / `warn` / `block` output

It does not need:

- deep semantic code analysis
- perfect plan parsing
- automatic slice inference across many milestones
- AST-level file understanding
