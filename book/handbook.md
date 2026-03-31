# Project About Projects

A practical operating system for building projects

## Principle

Reduce uncertainty in small, testable steps and always leave a clean seam for the next move.

## Rhythm

1. Brief
2. Spec
3. Plan
4. Slice
5. Test
6. Evaluate
7. Debug or Refactor
8. Tighten
9. Handoff or Ship

## Global Heuristics

- Prefer narrower slices over broader promises.
- Make every phase produce an artifact another person can inspect.
- Name stopping points before deep work starts.
- When stuck, reduce scope or increase visibility before increasing force.
- Refactor when structure is slowing safe progress, not when novelty is tempting.
- Compaction is maintenance, not decoration.

## Decision Rules

### Keep going

Trigger: The current slice is still small, the verification path is clear, and new uncertainty is low.

Action: Continue execution and verify immediately.

### Stop and clarify

Trigger: The next change depends on assumptions that are still implicit.

Action: Return to the brief, spec, or plan and sharpen the decision before coding further.

### Refactor now

Trigger: The same friction or confusion has appeared at least twice and the current structure is slowing safe change.

Action: Do a bounded refactor with explicit behavior-preservation checks.

### Hand off

Trigger: A seam has been reached and another person or later session could continue productively.

Action: Write current state, next step, risks, and verification record.

### Compact

Trigger: Notes, tasks, or branches have accumulated enough noise to hide the live path.

Action: Condense the active plan, delete stale context, and preserve only what still matters.

## Tracking Layer

Tracking is the operational memory layer that keeps current state durable across sessions, people, and agents.

### Questions

- What are we doing now?
- What is blocked?
- What decisions are already settled?
- What work is available next?
- What evidence says a task is actually done?

### Core Files

- README.md: Explains the tracking kit and how to use it.
- board.md: Live execution view for now, next, blocked, later, and current risks.
- backlog.md: Deferred and ready work that is not active yet.
- roadmap.md: Milestone-level direction and sequencing.
- decisions.md: Durable decision log for product, architecture, and workflow choices.
- agent-governance.md: Authority boundaries, delegation rules, and verification standards.
- milestone-template.md: Reusable template for milestone briefs.
- weekly-status-template.md: Reusable template for short human-readable status updates.

### Update Order

1. Clarify scope.
2. Update the relevant tracking file if project state changed.
3. Execute the work.
4. Verify the result.
5. Reflect completion or next-state in tracking.

### Tracking Rules

- Keep the live board current or the rest of the system decays.
- One authority should update high-signal tracking by default.
- Do not let planning docs become changelogs.
- Do not mark work complete until the code or doc exists and the claimed validation has been run.
- Prefer editing an existing tracking file over creating a new one unless the new file has a clear purpose.

## Scope

Define the real problem and cut away work that does not belong.

### Questions

- What is wrong, missing, or too expensive right now?
- Who is affected?
- What is in bounds?
- What is explicitly out of bounds?
- Why is this worth doing now?

### Outputs

- Project brief
- In-scope list
- Out-of-scope list
- Initial risks and unknowns

### Stop Points

- The problem is specific enough to reject extra work.
- The first slice is named.
- At least one clear non-goal exists.

### Seams

- Brief complete and reviewable
- Scope freeze for first implementation pass

### Anti-Patterns

- Starting with tools instead of the problem
- Treating every interesting idea as mandatory

### Good Moves

- Convert broad ambition into one user-visible outcome.
- List non-goals early so tradeoffs are visible.
- Name the smallest useful first slice.

### Deliverables

- Problem statement
- User/operator description
- Boundaries
- First slice statement

### Healthy Signals

- People can restate the problem in one sentence with similar wording.
- Requests for new work are easy to accept or reject using the scope.

### Warning Signals

- The brief keeps growing every time a new idea appears.
- There is no explicit out-of-scope list.

### Review Prompts

- What work would this brief help us reject?
- What sentence here would fail under questioning?

## Spec

Turn intent into a testable decision document.

### Questions

- What behavior should exist when the work is done?
- What are the constraints?
- What should happen when things fail?
- How will we know it is done?

### Outputs

- Requirements
- Acceptance criteria
- Failure cases
- Test strategy

### Stop Points

- A reasonable reviewer can tell whether the work meets the spec.
- Known unknowns are called out instead of hidden.

### Seams

- Spec approved
- Open questions isolated from committed decisions

### Anti-Patterns

- Wish-list specs with no decision force
- Acceptance criteria that rely on vibes

### Good Moves

- Separate goals from non-goals.
- Express requirements in observable terms.
- Name failure cases before implementation.

### Deliverables

- Requirements list
- Acceptance criteria
- Failure cases
- Test strategy outline

### Healthy Signals

- Acceptance criteria can be turned into direct checks.
- Failure handling is described, not assumed.

### Warning Signals

- The spec mostly lists hopes.
- No one can say what would count as done.

### Review Prompts

- Could two different implementers build meaningfully different things from this?
- What exact condition would fail this spec?

## Planning

Break the work into slices with visible stopping points and verification.

### Questions

- What is the smallest end-to-end slice worth building first?
- Where can we stop safely after each slice?
- How will each slice be verified?
- What dependency could block movement?

### Outputs

- Ordered slices
- Decision gates
- Verification notes
- Refactor triggers

### Stop Points

- Each slice has a seam and a verification method.
- The plan is short enough to update as reality changes.

### Seams

- Vertical slice boundaries
- Feature flags or isolated modules

### Anti-Patterns

- Massive phase plans that hide feedback
- Plans with no explicit stop condition

### Good Moves

- Start with a thin vertical slice.
- Put uncertainty-heavy work earlier if it changes the design.
- Define refactor triggers before friction appears.

### Deliverables

- Ordered slices
- Seams
- Verification steps
- Decision gates

### Healthy Signals

- Each slice ends with something demonstrable.
- Verification is paired to the slice before work starts.

### Warning Signals

- The plan reads like a backlog dump.
- There is no obvious place to stop after a day of work.

### Review Prompts

- Which slice is too broad to verify in one sitting?
- Where would the next person safely stop?

## Execution

Advance the project in small reversible steps that alternate between building and proving.

### Questions

- What is the next concrete slice?
- What is the smallest change that moves it forward?
- What will I verify immediately after the change?

### Outputs

- Working slice
- Updated notes
- Known remaining unknowns

### Stop Points

- The slice works and is verified.
- The next step is obvious.
- The work can pause without leaving hidden intent.

### Seams

- Committed tested slice
- Flagged or isolated functionality

### Anti-Patterns

- Large unverified bursts of change
- Changing direction without rewriting the plan

### Good Moves

- Restate the slice before editing.
- Verify after every meaningful change.
- Update notes when reality diverges from the plan.

### Deliverables

- Working increment
- Verification note
- Current state update

### Healthy Signals

- You can say what changed and how it was checked.
- The working set stays small.

### Warning Signals

- Multiple concerns are changing at once.
- Progress is described in effort, not observable outcome.

### Review Prompts

- What exactly was proven by the last check?
- Would the next person know the current live edge?

## Testing

Prove expected behavior, failure handling, and regressions across multiple layers.

### Questions

- What is the happy path?
- What important failures must be covered?
- What old bug needs a regression guard?
- What still needs human judgment?

### Outputs

- Checks and tests
- Regression coverage
- Manual evaluation notes

### Stop Points

- Acceptance criteria have direct checks.
- Known edge cases are named even if not fully automated.

### Seams

- Stable fixtures
- Reusable assertions

### Anti-Patterns

- Testing only the golden path
- Confusing implementation coverage with behavioral confidence

### Good Moves

- Stack fast checks with behavior checks.
- Name manual review criteria alongside automated tests.
- Retest after fixes and refactors.

### Deliverables

- Test plan
- Automated checks
- Manual evaluation notes

### Healthy Signals

- A bug can become a regression test.
- Human evaluation targets are explicit.

### Warning Signals

- Only happy-path checks exist.
- Tests mirror code structure more than user behavior.

### Review Prompts

- What real failure would still surprise us?
- Which acceptance criterion has no direct check?

## Evaluation

Judge whether the project solves the intended problem and is worth its operational cost.

### Questions

- Does this solve the right problem?
- Is it understandable to users and operators?
- What rough edges appeared in real use?
- What new risks surfaced after testing?

### Outputs

- Fit assessment
- Quality notes
- Second-pass test targets

### Stop Points

- There is a clear keep, revise, or stop decision.
- The next adjustments are ranked by impact.

### Seams

- Post-test review
- Pilot feedback boundary

### Anti-Patterns

- Assuming passing tests means the product is useful
- Ignoring operator burden

### Good Moves

- Compare the outcome to the original problem statement.
- Rank follow-up work by impact, not annoyance.
- Trigger second-pass tests when real use reveals new risks.

### Deliverables

- Fit review
- Risk update
- Revision decision

### Healthy Signals

- There is explicit feedback on fit, not just correctness.
- Operator cost is part of the decision.

### Warning Signals

- The review only discusses implementation quality.
- No one revisits whether the target problem was right.

### Review Prompts

- If this shipped today, what burden would remain?
- What did testing miss that real use exposed?

## Debugging

Resolve defects by preserving evidence and testing one live hypothesis at a time.

### Questions

- Can the issue be reproduced reliably?
- What condition narrows it?
- What is the smallest current hypothesis?
- What guard should prevent recurrence?

### Outputs

- Reproduction steps
- Root cause note
- Fix
- Regression guard

### Stop Points

- The issue is isolated even if not fixed yet.
- A root cause is written down.
- A guard exists against repetition.

### Seams

- Repro isolated
- Fix validated independently of the initial hunch

### Anti-Patterns

- Stacking speculative fixes
- Calling it fixed without a repro disappearing

### Good Moves

- Capture the repro before changing code.
- Instrument the narrowest useful boundary.
- Add a regression guard immediately after root cause is confirmed.

### Deliverables

- Repro record
- Root cause note
- Guard against recurrence

### Healthy Signals

- Each attempted fix corresponds to a live hypothesis.
- Evidence is preserved between steps.

### Warning Signals

- Multiple changes landed before retesting.
- The team cannot reproduce the original issue anymore.

### Review Prompts

- What evidence would disprove the current hypothesis?
- Did we fix the cause or hide the symptom?

## Refactoring

Improve structure when the current form slows safe progress.

### Questions

- What friction is recurring?
- Will this change preserve intended behavior?
- Does it improve seams, naming, or testability?

### Outputs

- Simpler structure
- Clearer names
- Better changeability

### Stop Points

- Behavior is preserved and re-verified.
- The code is easier to reason about than before.

### Seams

- Module boundaries
- Interface simplification

### Anti-Patterns

- Redesign drift disguised as cleanup
- Refactoring with no before-and-after criterion

### Good Moves

- Choose one structural problem at a time.
- Preserve behavior with checks before and after.
- Prefer clearer seams over more abstraction.

### Deliverables

- Before/after rationale
- Preserved behavior checks
- Simplified structure

### Healthy Signals

- The same behavior is now easier to test or change.
- The refactor has a bounded intent.

### Warning Signals

- New features are smuggled into cleanup work.
- No one can say what got easier afterward.

### Review Prompts

- What specific future change is easier now?
- Is this cleanup or redesign?

## Handoffs

Transfer the work with minimal startup cost for the next person.

### Questions

- What is done?
- What is blocked?
- What is the exact next recommended step?
- What context would otherwise be lost?

### Outputs

- Current-state note
- Risks and blockers
- Verification record
- Next action

### Stop Points

- A new owner can continue without reconstructing intent.
- Commands, files, and open questions are explicit.

### Seams

- End-of-session status
- Milestone transfer package

### Anti-Patterns

- Narrative handoffs with no exact next step
- Hidden assumptions trapped in chat history

### Good Moves

- Write the exact next action, not just the next area.
- Name what is untested as clearly as what is tested.
- Point to the files and commands that matter.

### Deliverables

- Current state
- Risks and blockers
- Next action
- Verification record

### Healthy Signals

- The next person can act without reverse-engineering state.
- Verification and untested areas are both listed.

### Warning Signals

- The handoff says 'pick up where I left off'.
- Important context exists only in memory or chat.

### Review Prompts

- Could someone continue this cold tomorrow morning?
- What knowledge would disappear if the current person vanished?

## Compaction

Deliberately reduce project state so the current narrative is small, accurate, and actionable.

### Questions

- What context is stale?
- What notes are redundant?
- What active plan should survive?
- What can be deleted without loss?

### Outputs

- Smaller current plan
- Condensed status
- Sharpened open questions

### Stop Points

- The project can be summarized cleanly in one paragraph.
- Only live branches of work remain.

### Seams

- Context reset
- Milestone archive

### Anti-Patterns

- Keeping every note forever
- Letting obsolete tasks compete with current work

### Good Moves

- Delete or archive obsolete branches of thought.
- Rewrite the current state in one paragraph.
- Preserve durable decisions and discard transient chatter.

### Deliverables

- Compacted status note
- Live plan
- Archived context

### Healthy Signals

- The live path is visible without scrolling through history.
- Open questions are sharper after compaction than before.

### Warning Signals

- Old context keeps steering current decisions.
- The active plan is buried in stale notes.

### Review Prompts

- What would still matter if we resumed in two weeks?
- Which notes are only historical noise now?

## Tightening

Convert a mostly-working project into a dependable one before shipping, pausing, or handing off.

### Questions

- What is still misleading, loose, or duplicated?
- Have critical paths been rerun after cleanup?
- Can the project stop here without confusion?

### Outputs

- Cleaner names and docs
- Removed dead weight
- Release-ready or pause-ready state

### Stop Points

- Critical paths are rerun after cleanup.
- The next seam is clear if work continues.

### Seams

- Release candidate
- Pause-ready checkpoint

### Anti-Patterns

- Shipping with known ambiguity in status or ownership
- Cleanup that is never re-verified

### Good Moves

- Remove dead weight before final status writing.
- Recheck the critical path after cleanup.
- Make naming and ownership unambiguous.

### Deliverables

- Cleanup pass
- Rerun verification record
- Final state note

### Healthy Signals

- The project can pause or ship without explanation debt.
- Cleanup leaves the system clearer and still verified.

### Warning Signals

- Dead code and stale notes remain because no one wants to touch them.
- Critical paths were not rerun after last-minute cleanup.

### Review Prompts

- What would confuse a careful reviewer here?
- What cleanup changed behavior risk and therefore needs rechecking?

## Editors

### Project Brief

Use this to define the problem, boundaries, and first slice before the work expands.

Fields

- Problem (textarea)
- Users / Operators (textarea)
- Outcome (textarea)
- In Scope (list)
- Out Of Scope (list)
- Constraints (list)
- Risks / Unknowns (list)
- Success Signals (list)
- First Slice (textarea)
### Specification

Convert the brief into a testable decision document.

Fields

- Summary (textarea)
- Problem Statement (textarea)
- Goals (list)
- Non-Goals (list)
- Requirements (list)
- Inputs / Outputs / Interfaces (textarea)
- Acceptance Criteria (list)
- Failure Cases (list)
- Test Strategy (list)
- Open Questions (list)
### Implementation Plan

Turn the spec into slices, seams, and decision gates.

Fields

- Objective (textarea)
- Current State (textarea)
- Slices (table)
- Dependencies (list)
- Decision Gates (list)
- Refactor Triggers (list)
- Handoff Condition (textarea)
- Tightening Pass (list)
