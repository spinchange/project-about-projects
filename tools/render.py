import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "source" / "project-os.json"
HANDBOOK = ROOT / "book" / "handbook.md"
APP_DATA = ROOT / "app" / "data.js"


def load_source() -> dict:
    return json.loads(SOURCE.read_text(encoding="utf-8"))


def render_handbook(data: dict) -> str:
    lines = [
        f"# {data['title']}",
        "",
        data["subtitle"],
        "",
        "## Principle",
        "",
        data["principle"],
        "",
        "## Rhythm",
        "",
    ]
    lines.extend([f"{index}. {item}" for index, item in enumerate(data["rhythm"], start=1)])
    lines.extend(["", "## Global Heuristics", ""])
    lines.extend([f"- {item}" for item in data.get("global_heuristics", [])])
    lines.extend(["", "## Decision Rules", ""])
    for rule in data.get("decision_rules", []):
        lines.extend(
            [
                f"### {rule['name']}",
                "",
                f"Trigger: {rule['trigger']}",
                "",
                f"Action: {rule['action']}",
                "",
            ]
        )

    for stage in data["stages"]:
        lines.extend(
            [
                "",
                f"## {stage['title']}",
                "",
                stage["purpose"],
                "",
                "### Questions",
                "",
            ]
        )
        lines.extend([f"- {item}" for item in stage["questions"]])
        lines.extend(["", "### Outputs", ""])
        lines.extend([f"- {item}" for item in stage["outputs"]])
        lines.extend(["", "### Stop Points", ""])
        lines.extend([f"- {item}" for item in stage["stop_points"]])
        lines.extend(["", "### Seams", ""])
        lines.extend([f"- {item}" for item in stage["seams"]])
        lines.extend(["", "### Anti-Patterns", ""])
        lines.extend([f"- {item}" for item in stage["anti_patterns"]])
        if stage.get("moves"):
            lines.extend(["", "### Good Moves", ""])
            lines.extend([f"- {item}" for item in stage["moves"]])
        if stage.get("deliverables"):
            lines.extend(["", "### Deliverables", ""])
            lines.extend([f"- {item}" for item in stage["deliverables"]])
        if stage.get("signals"):
            lines.extend(["", "### Healthy Signals", ""])
            lines.extend([f"- {item}" for item in stage["signals"].get("healthy", [])])
            lines.extend(["", "### Warning Signals", ""])
            lines.extend([f"- {item}" for item in stage["signals"].get("warning", [])])
        if stage.get("review_prompts"):
            lines.extend(["", "### Review Prompts", ""])
            lines.extend([f"- {item}" for item in stage["review_prompts"]])

    lines.extend(["", "## Editors", ""])
    for editor in data.get("editors", {}).values():
        lines.extend([f"### {editor['title']}", "", editor["description"], "", "Fields", ""])
        for field in editor.get("fields", []):
            lines.append(f"- {field['label']} ({field['type']})")

    lines.append("")
    return "\n".join(lines)


def render_app_data(data: dict) -> str:
    payload = json.dumps(data, indent=2)
    return f"window.PROJECT_OS = {payload};\n"


def main() -> None:
    data = load_source()
    HANDBOOK.write_text(render_handbook(data), encoding="utf-8")
    APP_DATA.write_text(render_app_data(data), encoding="utf-8")
    print(f"Wrote {HANDBOOK}")
    print(f"Wrote {APP_DATA}")


if __name__ == "__main__":
    main()
