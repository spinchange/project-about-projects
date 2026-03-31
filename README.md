# Project About Projects

Live demo of browser app: https://spinchange.github.io/project-about-projects/

This repository is a practical system for creating projects well.

It treats project-making itself as the product, then ships that product in three layers from one shared source:

- A handbook
- A CLI workflow kit
- A browser app with guided fillers and markdown export

The system now also includes a native tracking layer for real repos: a reusable `docs/tracking/` kit that acts as the project's durable memory during execution, handoffs, and multi-agent work.

## Structure

- [source/project-os.json](C:\Users\user\project-about-projects\source\project-os.json): canonical lifecycle model
- [tools/render.py](C:\Users\user\project-about-projects\tools\render.py): generates derived artifacts
- [tools/project_os.py](C:\Users\user\project-about-projects\tools\project_os.py): CLI workflow tool
- [tools/new_project.py](C:\Users\user\project-about-projects\tools\new_project.py): creates a fresh working project folder
- [book/handbook.md](C:\Users\user\project-about-projects\book\handbook.md): generated manual
- [app/index.html](C:\Users\user\project-about-projects\app\index.html): browser app
- [docs/01-lifecycle.md](C:\Users\user\project-about-projects\docs\01-lifecycle.md): original operating guide
- [templates/project-brief.md](C:\Users\user\project-about-projects\templates\project-brief.md): scope template
- [templates/spec.md](C:\Users\user\project-about-projects\templates\spec.md): spec template
- [templates/plan.md](C:\Users\user\project-about-projects\templates\plan.md): plan template
- [templates/debug-log.md](C:\Users\user\project-about-projects\templates\debug-log.md): debugging template
- [templates/handoff.md](C:\Users\user\project-about-projects\templates\handoff.md): handoff template
- [templates/tracking](C:\Users\user\project-about-projects\templates\tracking): integrated tracking kit for `docs/tracking/`

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

Run the app locally:

```powershell
cd .\app
python -m http.server 8000
```

Then open `http://localhost:8000`.

In the app, pick `Project Brief`, `Specification`, or `Implementation Plan`, fill the guided fields, and copy the generated markdown into a working folder.

## Core Principle

Every project should keep these questions current:

1. What problem are we solving?
2. What does success look like?
3. What is the next verifiable step?
4. Where can we safely stop?
5. What would the next person need to continue?
