import argparse
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
TEMPLATES = ROOT / "templates"
TRACKING_TEMPLATES = TEMPLATES / "tracking"

FILES = {
    "project-brief.md": "project-brief.md",
    "spec.md": "spec.md",
    "plan.md": "plan.md",
    "debug-log.md": "debug-log.md",
    "handoff.md": "handoff.md",
}


def safe_slug(text: str) -> str:
    cleaned = "".join(ch.lower() if ch.isalnum() else "-" for ch in text.strip())
    while "--" in cleaned:
        cleaned = cleaned.replace("--", "-")
    return cleaned.strip("-") or "project"


def write_readme(target: Path, title: str) -> None:
    readme = target / "README.md"
    if readme.exists():
        print(f"Skipping existing file: {readme}")
        return

    body = "\n".join(
        [
            f"# {title}",
            "",
            "This working folder was created by `tools/new_project.py`.",
            "",
            "## Start Here",
            "",
            "1. Fill out `project-brief.md`.",
            "2. Turn that into `spec.md`.",
            "3. Slice the work in `plan.md`.",
            "4. Keep `docs/tracking/board.md` current as the live execution view.",
            "5. Use `debug-log.md` and `handoff.md` as needed.",
            "",
            "## Suggested Rhythm",
            "",
            "Brief -> Spec -> Plan -> Slice -> Test -> Evaluate -> Debug or Refactor -> Tighten -> Handoff or Ship",
            "",
        ]
    )
    readme.write_text(body, encoding="utf-8")
    print(f"Created {readme}")


def create_project(base_dir: Path, title: str) -> None:
    slug = safe_slug(title)
    target = (base_dir / slug).resolve()
    target.mkdir(parents=True, exist_ok=True)
    print(f"Project directory: {target}")

    for source_name, destination_name in FILES.items():
        source = TEMPLATES / source_name
        destination = target / destination_name
        if destination.exists():
            print(f"Skipping existing file: {destination}")
            continue
        shutil.copyfile(source, destination)
        print(f"Created {destination}")

    tracking_target = target / "docs" / "tracking"
    tracking_target.mkdir(parents=True, exist_ok=True)
    for source in TRACKING_TEMPLATES.glob("*.md"):
        destination = tracking_target / source.name
        if destination.exists():
            print(f"Skipping existing file: {destination}")
            continue
        shutil.copyfile(source, destination)
        print(f"Created {destination}")

    write_readme(target, title)


def main() -> None:
    parser = argparse.ArgumentParser(description="Create a new working project folder from the project-about-projects templates")
    parser.add_argument("title", help="human-readable project title")
    parser.add_argument(
        "--base-dir",
        default=".",
        help="parent directory where the new project folder should be created (default: current directory)",
    )
    args = parser.parse_args()
    create_project((Path.cwd() / args.base_dir).resolve(), args.title)


if __name__ == "__main__":
    main()
