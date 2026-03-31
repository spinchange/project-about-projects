import argparse
import json
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "source" / "project-os.json"
TEMPLATES = ROOT / "templates"
TRACKING_TEMPLATES = TEMPLATES / "tracking"


def load_source() -> dict:
    return json.loads(SOURCE.read_text(encoding="utf-8"))


def print_overview(data: dict) -> None:
    print(data["title"])
    print(data["subtitle"])
    print()
    print(f"Principle: {data['principle']}")
    print()
    print("Rhythm:")
    for index, item in enumerate(data["rhythm"], start=1):
        print(f"  {index}. {item}")
    print()
    print("Stages:")
    for stage in data["stages"]:
        print(f"  - {stage['slug']}: {stage['title']}")


def print_stage(data: dict, slug: str) -> None:
    stage = next((item for item in data["stages"] if item["slug"] == slug), None)
    if stage is None:
        available = ", ".join(item["slug"] for item in data["stages"])
        raise SystemExit(f"Unknown stage '{slug}'. Available: {available}")

    print(stage["title"])
    print(stage["purpose"])
    print()
    print("Questions:")
    for item in stage["questions"]:
        print(f"  - {item}")
    print()
    print("Outputs:")
    for item in stage["outputs"]:
        print(f"  - {item}")
    print()
    print("Stop points:")
    for item in stage["stop_points"]:
        print(f"  - {item}")
    print()
    print("Seams:")
    for item in stage["seams"]:
        print(f"  - {item}")
    print()
    print("Anti-patterns:")
    for item in stage["anti_patterns"]:
        print(f"  - {item}")


def scaffold(target: Path) -> None:
    target.mkdir(parents=True, exist_ok=True)
    files = [
        "project-brief.md",
        "spec.md",
        "plan.md",
        "debug-log.md",
        "handoff.md",
    ]
    for name in files:
        destination = target / name
        if destination.exists():
            print(f"Skipping existing file: {destination}")
            continue
        shutil.copyfile(TEMPLATES / name, destination)
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


def main() -> None:
    parser = argparse.ArgumentParser(description="Project lifecycle workflow helper")
    subparsers = parser.add_subparsers(dest="command", required=True)

    subparsers.add_parser("overview", help="show overall lifecycle summary")

    stage_parser = subparsers.add_parser("stage", help="show one lifecycle stage")
    stage_parser.add_argument("slug", help="stage slug, such as scope or execution")

    scaffold_parser = subparsers.add_parser("scaffold", help="copy working templates into a target folder")
    scaffold_parser.add_argument("target", help="target directory")

    args = parser.parse_args()
    data = load_source()

    if args.command == "overview":
        print_overview(data)
    elif args.command == "stage":
        print_stage(data, args.slug)
    elif args.command == "scaffold":
        scaffold((Path.cwd() / args.target).resolve())


if __name__ == "__main__":
    main()
