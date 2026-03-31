# Project Lifecycle Operating Guide

This guide treats project work as a series of controlled reductions in uncertainty.

## 1. Scope

Start by shrinking ambiguity, not by expanding ambition.

Answer these:

- What problem exists right now?
- Who feels it?
- What is in bounds?
- What is explicitly out of bounds?
- What would make this worth doing?

Good scope is specific enough to exclude work. If everything matters, nothing is scoped.

## 2. Spec

A spec is a decision document, not a wish list.

It should define:

- The user or operator need
- The target behavior
- Inputs, outputs, and constraints
- Risks and unknowns
- Acceptance criteria
- Failure cases

If a spec cannot tell you whether work is done, it is not yet a usable spec.

## 3. Plan

The plan turns intent into ordered slices.

Each slice should have:

- A clear outcome
- A visible seam
- A stopping point
- A way to verify correctness

Prefer vertical slices over broad phases. "End-to-end but narrow" beats "all backend, then all frontend" in most projects because it preserves feedback.

## 4. Seams And Stopping Points

A seam is a clean boundary where work can pause, swap owners, or be reworked without tearing through the whole system.

Useful seams include:

- Interface boundaries
- Milestone outputs
- Feature flags
- Stable test fixtures
- Documented assumptions

Useful stopping points include:

- A tested slice merged behind a flag
- A spec clarified and unknowns enumerated
- A failing test reproduced and isolated
- A handoff note written with exact next steps

Never stop mid-thought if you can stop at a seam instead.

## 5. Execution

Execution should alternate between building and proving.

Loop:

1. Restate the next slice.
2. Make the smallest change that advances it.
3. Verify locally.
4. Record what changed and what remains uncertain.
5. Decide whether to continue, compact, refactor, or hand off.

If you cannot explain the current step in one or two sentences, the slice is probably too large.

## 6. Testing

Testing is not one phase at the end. It is a stacked system of checks.

Use layers:

- Fast checks for syntax and invariants
- Behavioral tests for expected outcomes
- Negative tests for failure handling
- Regression tests for past bugs
- Human evaluation for fit, clarity, and rough edges

Testing should answer:

- Does it work?
- Does it fail safely?
- Is it understandable?
- Did we break something adjacent?

## 7. Debugging

Debugging is hypothesis management.

Use this sequence:

1. Reproduce the issue.
2. Narrow the conditions.
3. Form the smallest live hypothesis.
4. Instrument or inspect.
5. Change one thing.
6. Re-test.
7. Record root cause and guardrail.

Do not stack speculative fixes. That destroys evidence.

## 8. Evaluation

Evaluation asks whether the project is solving the intended problem, not just whether it compiles or passes.

Evaluate on:

- Outcome quality
- Speed and cost
- Reliability
- Maintainability
- Operator burden
- User clarity

Projects often need a second testing pass after evaluation because real use exposes different failure modes than preplanned tests.

## 9. Refactoring

Refactor when the current structure slows safe progress.

Good refactors:

- Reduce duplication with stable abstractions
- Clarify naming
- Simplify dependency flow
- Make testing easier
- Improve seams for future work

Avoid "refactoring" that is really redesign drift. Refactoring should preserve intended behavior while improving changeability.

## 10. Handoffs

A handoff should reduce startup time for the next person to near zero.

Capture:

- Current state
- What is working
- What is blocked
- Known risks
- Next recommended step
- Exact files, commands, and tests if relevant

The receiving person should not have to reverse-engineer intent from scattered artifacts.

## 11. Compaction

Compaction is deliberate state reduction.

Do it when the project has accumulated:

- Too much transient context
- Redundant notes
- Dead branches of thought
- Obsolete TODOs
- Diffuse ownership

Compaction should leave behind:

- A smaller current plan
- A sharper list of open questions
- A clearer project narrative

## 12. Tightening-Up

Before release, pause, or handoff, tighten the work:

- Remove misleading names
- Delete dead code and stale notes
- Collapse repeated logic
- Re-run critical tests
- Re-check acceptance criteria
- Update status docs
- Confirm the next seam

Tightening is where "mostly works" becomes dependable.

## 13. When To Stop

Stop when one of these is true:

- The acceptance criteria are met
- The next step depends on an unresolved external decision
- The current design no longer earns more investment
- Further work should be a new project or phase

Do not continue only because you are already in motion.

## 14. Minimal Rhythm

For almost any project, this cadence works:

1. Brief
2. Spec
3. Plan
4. Slice
5. Test
6. Evaluate
7. Debug or refactor
8. Tighten
9. Handoff or ship

That is the whole loop.
