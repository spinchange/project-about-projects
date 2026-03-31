# Project About Projects

Live demo of browser app: https://spinchange.github.io/project-about-projects/

This repository is a practical system for creating projects well.

It treats project-making itself as the product, then ships that product in three active layers from one shared source:

- A handbook
- A CLI workflow kit
- A browser app with guided fillers and markdown export

The system now also includes a native tracking layer for real repos: a reusable `docs/tracking/` kit that acts as the project's durable memory during execution, handoffs, and multi-agent work.

Around that core, the repo also contains design work for a broader ecosystem:

- Skills that improve agent judgment during scope, handoff, and execution
- MCP concepts that govern slice validation, durable decisions, and selective scaffolding
- A VS Code / Cursor extension concept that brings the "live edge" into the IDE

## Structure

- [source/project-os.json](source/project-os.json): canonical lifecycle model
- [tools/render.py](tools/render.py): generates derived artifacts
- [tools/project_os.py](tools/project_os.py): CLI workflow tool
- [tools/new_project.py](tools/new_project.py): creates a fresh working project folder
- [book/handbook.md](book/handbook.md): generated manual
- [app/index.html](app/index.html): browser app
- [docs/01-lifecycle.md](docs/01-lifecycle.md): original operating guide
- [docs/02-making-of.md](docs/02-making-of.md): candid note on how the project itself drifted and tightened
- [docs/idea-branch-workflow.md](docs/idea-branch-workflow.md): lightweight workflow for speculative agent ideas
- [docs/mcp](docs/mcp): MCP design docs for `durable-decision`, `slice-validator`, and scaffolding orchestration
- [docs/extensions](docs/extensions): IDE extension and scaffolding design docs
- [templates/project-brief.md](templates/project-brief.md): scope template
- [templates/spec.md](templates/spec.md): spec template
- [templates/plan.md](templates/plan.md): plan template
- [templates/debug-log.md](templates/debug-log.md): debugging template
- [templates/handoff.md](templates/handoff.md): handoff template
- [templates/tracking](templates/tracking): integrated tracking kit for `docs/tracking/`

## What This Repo Is

At this point, the repo is four things at once:

1. A handbook about disciplined project execution
2. A working toolkit of templates, scripts, and tracking artifacts
3. A browser app for drafting brief/spec/plan documents from the shared lifecycle model
4. A design lab for adjacent Skills, MCPs, and IDE integrations

## Use

Generate derived files:

```powershell
python .\tools\render.py
```

Show the lifecycle overview:

```powershell
python .\tools\project_os.py overview
```

Inspect one stage:

```powershell
python .\tools\project_os.py stage execution
```

Scaffold a new working folder from the templates:

```powershell
python .\tools\project_os.py scaffold .\examples\demo-project
```

That scaffold now includes `docs/tracking/` with a board, backlog, roadmap, decisions log, governance rules, and milestone/status templates.

Create a new named project folder with starter files:

```powershell
python .\tools\new_project.py "Project Atlas" --base-dir .\examples
```

Create an isolated `idea/*` branch and worktree for speculative agent work:

```powershell
.\tools\start_idea_branch.ps1 -Name "Project Health Dashboard"
```

Run the app locally:

```powershell
cd .\app
python -m http.server 8000
```

Then open `http://localhost:8000`.

In the app, pick `Project Brief`, `Specification`, or `Implementation Plan`, fill the guided fields, and copy the generated markdown into a working folder.

## Related Design Work

MCP specs:

- [durable-decision-design.md](docs/mcp/durable-decision-design.md)
- [durable-decision-schema.md](docs/mcp/durable-decision-schema.md)
- [durable-decision-plan.md](docs/mcp/durable-decision-plan.md)
- [slice-validator-design.md](docs/mcp/slice-validator-design.md)
- [slice-validator-schema.md](docs/mcp/slice-validator-schema.md)
- [slice-validator-plan.md](docs/mcp/slice-validator-plan.md)
- [scaffold-orchestrator-spec.md](docs/mcp/scaffold-orchestrator-spec.md)

IDE extension specs:

- [project-sidebar-design.md](docs/extensions/project-sidebar-design.md)
- [project-sidebar-spec.md](docs/extensions/project-sidebar-spec.md)
- [project-sidebar-plan.md](docs/extensions/project-sidebar-plan.md)
- [project-sidebar-scaffold.md](docs/extensions/project-sidebar-scaffold.md)

Scaffolding architecture:

- [scaffolding-architecture.md](docs/extensions/scaffolding-architecture.md)
- [project-scaffolder-skill-spec.md](docs/extensions/project-scaffolder-skill-spec.md)
- [sidebar-scaffold-commands-spec.md](docs/extensions/sidebar-scaffold-commands-spec.md)

## Core Principle

Every project should keep these questions current:

1. What problem are we solving?
2. What does success look like?
3. What is the next verifiable step?
4. Where can we safely stop?
5. What would the next person need to continue?
