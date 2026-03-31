# Durable Decision MCP Interface Draft

## Summary

`durable-decision` evaluates repo changes and returns whether a durable project decision was likely made, why it matters, and a draft decision-log entry when appropriate.

## Request

```json
{
  "repo_root": "C:\\Users\\user\\project-about-projects",
  "mode": "working_tree",
  "changed_files": [
    "app/app.js",
    "README.md"
  ],
  "diff_text": "...optional unified diff...",
  "file_contents": {
    "README.md": "...optional current content..."
  },
  "artifacts": {
    "brief_path": "project-brief.md",
    "spec_path": "spec.md",
    "plan_path": "plan.md",
    "decisions_path": "docs/tracking/decisions.md"
  },
  "recent_actions": [
    "added localStorage persistence",
    "updated README to document persistence"
  ],
  "options": {
    "dedupe_against_decisions_log": true,
    "include_draft_entries": true,
    "strict_required_threshold": true
  }
}
```

## Field Notes

- `repo_root`
  Absolute repo path.
- `mode`
  One of:
  - `working_tree`
  - `staged`
  - `commit`
  - `explicit_check`
- `changed_files`
  Relative changed file paths.
- `diff_text`
  Optional unified diff. Helpful for first implementation.
- `file_contents`
  Optional current content for high-signal docs/manifests.
- `artifacts`
  Known project-planning artifact paths.
- `recent_actions`
  Optional short action trace.
- `options`
  Controls strictness and output detail.

## Response

```json
{
  "status": "candidate",
  "summary": "A durable workflow decision was likely made around browser-side persistence.",
  "candidates": [
    {
      "title": "Use client-side localStorage for editor persistence",
      "category": "architecture",
      "confidence": 0.88,
      "why_it_matters": "Persistence behavior affects product expectations and future sync decisions.",
      "evidence": [
        "app/app.js changed to store editor state in localStorage",
        "README.md documents persistence behavior"
      ],
      "should_log": true,
      "draft_entry": {
        "title": "Use client-side localStorage for editor persistence",
        "decision": "Use client-side localStorage for editor persistence in the browser app.",
        "why": "The app is static-hosted and needs lightweight persistence without backend infrastructure.",
        "tradeoff": "State is local to one browser and does not sync across devices or users.",
        "follow_up": "Revisit if shared drafts or multi-device continuity become core requirements."
      }
    }
  ],
  "suppressed": [
    {
      "reason": "Formatting-only changes in styles.css"
    }
  ]
}
```

## Status Rules

- `none`
  No durable decision detected.
- `candidate`
  A meaningful decision may have been made; review suggested.
- `required`
  A strong decision signal was detected and should be logged before closure, commit, or handoff.

## Candidate Object

- `title`
  Short human-readable decision label.
- `category`
  One of:
  - `dependency`
  - `architecture`
  - `workflow`
  - `scope`
  - `interface`
  - `constraint`
- `confidence`
  Float from `0.0` to `1.0`.
- `why_it_matters`
  One short explanation.
- `evidence`
  Flat list of concrete reasons or file-level signals.
- `should_log`
  Boolean recommendation.
- `draft_entry`
  Draft for `docs/tracking/decisions.md`.

## Dedupe Behavior

When `dedupe_against_decisions_log` is enabled:

- suppress candidates that closely match recent entries in `decisions.md`
- lower confidence if the same pattern has already been logged
- retain `candidate` output only if the new change materially extends the existing decision

## First Slice Requirements

The first implementation only needs to support:

- diff input
- changed file list
- dependency manifest detection
- workflow/doc change detection
- output of `none`, `candidate`, or `required`
- draft decision entry generation

It does not need:

- full AST analysis
- deep semantic architecture inference
- automatic file writing
- branch/session memory beyond one call
