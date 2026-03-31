window.PROJECT_OS = {
  "title": "Project About Projects",
  "subtitle": "A practical operating system for building projects",
  "principle": "Reduce uncertainty in small, testable steps and always leave a clean seam for the next move.",
  "rhythm": [
    "Brief",
    "Spec",
    "Plan",
    "Slice",
    "Test",
    "Evaluate",
    "Debug or Refactor",
    "Tighten",
    "Handoff or Ship"
  ],
  "global_heuristics": [
    "Prefer narrower slices over broader promises.",
    "Make every phase produce an artifact another person can inspect.",
    "Name stopping points before deep work starts.",
    "When stuck, reduce scope or increase visibility before increasing force.",
    "Refactor when structure is slowing safe progress, not when novelty is tempting.",
    "Compaction is maintenance, not decoration."
  ],
  "decision_rules": [
    {
      "name": "Keep going",
      "trigger": "The current slice is still small, the verification path is clear, and new uncertainty is low.",
      "action": "Continue execution and verify immediately."
    },
    {
      "name": "Stop and clarify",
      "trigger": "The next change depends on assumptions that are still implicit.",
      "action": "Return to the brief, spec, or plan and sharpen the decision before coding further."
    },
    {
      "name": "Refactor now",
      "trigger": "The same friction or confusion has appeared at least twice and the current structure is slowing safe change.",
      "action": "Do a bounded refactor with explicit behavior-preservation checks."
    },
    {
      "name": "Hand off",
      "trigger": "A seam has been reached and another person or later session could continue productively.",
      "action": "Write current state, next step, risks, and verification record."
    },
    {
      "name": "Compact",
      "trigger": "Notes, tasks, or branches have accumulated enough noise to hide the live path.",
      "action": "Condense the active plan, delete stale context, and preserve only what still matters."
    }
  ],
  "stages": [
    {
      "slug": "scope",
      "title": "Scope",
      "purpose": "Define the real problem and cut away work that does not belong.",
      "questions": [
        "What is wrong, missing, or too expensive right now?",
        "Who is affected?",
        "What is in bounds?",
        "What is explicitly out of bounds?",
        "Why is this worth doing now?"
      ],
      "outputs": [
        "Project brief",
        "In-scope list",
        "Out-of-scope list",
        "Initial risks and unknowns"
      ],
      "stop_points": [
        "The problem is specific enough to reject extra work.",
        "The first slice is named.",
        "At least one clear non-goal exists."
      ],
      "seams": [
        "Brief complete and reviewable",
        "Scope freeze for first implementation pass"
      ],
      "anti_patterns": [
        "Starting with tools instead of the problem",
        "Treating every interesting idea as mandatory"
      ],
      "signals": {
        "healthy": [
          "People can restate the problem in one sentence with similar wording.",
          "Requests for new work are easy to accept or reject using the scope."
        ],
        "warning": [
          "The brief keeps growing every time a new idea appears.",
          "There is no explicit out-of-scope list."
        ]
      },
      "moves": [
        "Convert broad ambition into one user-visible outcome.",
        "List non-goals early so tradeoffs are visible.",
        "Name the smallest useful first slice."
      ],
      "deliverables": [
        "Problem statement",
        "User/operator description",
        "Boundaries",
        "First slice statement"
      ],
      "review_prompts": [
        "What work would this brief help us reject?",
        "What sentence here would fail under questioning?"
      ]
    },
    {
      "slug": "spec",
      "title": "Spec",
      "purpose": "Turn intent into a testable decision document.",
      "questions": [
        "What behavior should exist when the work is done?",
        "What are the constraints?",
        "What should happen when things fail?",
        "How will we know it is done?"
      ],
      "outputs": [
        "Requirements",
        "Acceptance criteria",
        "Failure cases",
        "Test strategy"
      ],
      "stop_points": [
        "A reasonable reviewer can tell whether the work meets the spec.",
        "Known unknowns are called out instead of hidden."
      ],
      "seams": [
        "Spec approved",
        "Open questions isolated from committed decisions"
      ],
      "anti_patterns": [
        "Wish-list specs with no decision force",
        "Acceptance criteria that rely on vibes"
      ],
      "signals": {
        "healthy": [
          "Acceptance criteria can be turned into direct checks.",
          "Failure handling is described, not assumed."
        ],
        "warning": [
          "The spec mostly lists hopes.",
          "No one can say what would count as done."
        ]
      },
      "moves": [
        "Separate goals from non-goals.",
        "Express requirements in observable terms.",
        "Name failure cases before implementation."
      ],
      "deliverables": [
        "Requirements list",
        "Acceptance criteria",
        "Failure cases",
        "Test strategy outline"
      ],
      "review_prompts": [
        "Could two different implementers build meaningfully different things from this?",
        "What exact condition would fail this spec?"
      ]
    },
    {
      "slug": "planning",
      "title": "Planning",
      "purpose": "Break the work into slices with visible stopping points and verification.",
      "questions": [
        "What is the smallest end-to-end slice worth building first?",
        "Where can we stop safely after each slice?",
        "How will each slice be verified?",
        "What dependency could block movement?"
      ],
      "outputs": [
        "Ordered slices",
        "Decision gates",
        "Verification notes",
        "Refactor triggers"
      ],
      "stop_points": [
        "Each slice has a seam and a verification method.",
        "The plan is short enough to update as reality changes."
      ],
      "seams": [
        "Vertical slice boundaries",
        "Feature flags or isolated modules"
      ],
      "anti_patterns": [
        "Massive phase plans that hide feedback",
        "Plans with no explicit stop condition"
      ],
      "signals": {
        "healthy": [
          "Each slice ends with something demonstrable.",
          "Verification is paired to the slice before work starts."
        ],
        "warning": [
          "The plan reads like a backlog dump.",
          "There is no obvious place to stop after a day of work."
        ]
      },
      "moves": [
        "Start with a thin vertical slice.",
        "Put uncertainty-heavy work earlier if it changes the design.",
        "Define refactor triggers before friction appears."
      ],
      "deliverables": [
        "Ordered slices",
        "Seams",
        "Verification steps",
        "Decision gates"
      ],
      "review_prompts": [
        "Which slice is too broad to verify in one sitting?",
        "Where would the next person safely stop?"
      ]
    },
    {
      "slug": "execution",
      "title": "Execution",
      "purpose": "Advance the project in small reversible steps that alternate between building and proving.",
      "questions": [
        "What is the next concrete slice?",
        "What is the smallest change that moves it forward?",
        "What will I verify immediately after the change?"
      ],
      "outputs": [
        "Working slice",
        "Updated notes",
        "Known remaining unknowns"
      ],
      "stop_points": [
        "The slice works and is verified.",
        "The next step is obvious.",
        "The work can pause without leaving hidden intent."
      ],
      "seams": [
        "Committed tested slice",
        "Flagged or isolated functionality"
      ],
      "anti_patterns": [
        "Large unverified bursts of change",
        "Changing direction without rewriting the plan"
      ],
      "signals": {
        "healthy": [
          "You can say what changed and how it was checked.",
          "The working set stays small."
        ],
        "warning": [
          "Multiple concerns are changing at once.",
          "Progress is described in effort, not observable outcome."
        ]
      },
      "moves": [
        "Restate the slice before editing.",
        "Verify after every meaningful change.",
        "Update notes when reality diverges from the plan."
      ],
      "deliverables": [
        "Working increment",
        "Verification note",
        "Current state update"
      ],
      "review_prompts": [
        "What exactly was proven by the last check?",
        "Would the next person know the current live edge?"
      ]
    },
    {
      "slug": "testing",
      "title": "Testing",
      "purpose": "Prove expected behavior, failure handling, and regressions across multiple layers.",
      "questions": [
        "What is the happy path?",
        "What important failures must be covered?",
        "What old bug needs a regression guard?",
        "What still needs human judgment?"
      ],
      "outputs": [
        "Checks and tests",
        "Regression coverage",
        "Manual evaluation notes"
      ],
      "stop_points": [
        "Acceptance criteria have direct checks.",
        "Known edge cases are named even if not fully automated."
      ],
      "seams": [
        "Stable fixtures",
        "Reusable assertions"
      ],
      "anti_patterns": [
        "Testing only the golden path",
        "Confusing implementation coverage with behavioral confidence"
      ],
      "signals": {
        "healthy": [
          "A bug can become a regression test.",
          "Human evaluation targets are explicit."
        ],
        "warning": [
          "Only happy-path checks exist.",
          "Tests mirror code structure more than user behavior."
        ]
      },
      "moves": [
        "Stack fast checks with behavior checks.",
        "Name manual review criteria alongside automated tests.",
        "Retest after fixes and refactors."
      ],
      "deliverables": [
        "Test plan",
        "Automated checks",
        "Manual evaluation notes"
      ],
      "review_prompts": [
        "What real failure would still surprise us?",
        "Which acceptance criterion has no direct check?"
      ]
    },
    {
      "slug": "evaluation",
      "title": "Evaluation",
      "purpose": "Judge whether the project solves the intended problem and is worth its operational cost.",
      "questions": [
        "Does this solve the right problem?",
        "Is it understandable to users and operators?",
        "What rough edges appeared in real use?",
        "What new risks surfaced after testing?"
      ],
      "outputs": [
        "Fit assessment",
        "Quality notes",
        "Second-pass test targets"
      ],
      "stop_points": [
        "There is a clear keep, revise, or stop decision.",
        "The next adjustments are ranked by impact."
      ],
      "seams": [
        "Post-test review",
        "Pilot feedback boundary"
      ],
      "anti_patterns": [
        "Assuming passing tests means the product is useful",
        "Ignoring operator burden"
      ],
      "signals": {
        "healthy": [
          "There is explicit feedback on fit, not just correctness.",
          "Operator cost is part of the decision."
        ],
        "warning": [
          "The review only discusses implementation quality.",
          "No one revisits whether the target problem was right."
        ]
      },
      "moves": [
        "Compare the outcome to the original problem statement.",
        "Rank follow-up work by impact, not annoyance.",
        "Trigger second-pass tests when real use reveals new risks."
      ],
      "deliverables": [
        "Fit review",
        "Risk update",
        "Revision decision"
      ],
      "review_prompts": [
        "If this shipped today, what burden would remain?",
        "What did testing miss that real use exposed?"
      ]
    },
    {
      "slug": "debugging",
      "title": "Debugging",
      "purpose": "Resolve defects by preserving evidence and testing one live hypothesis at a time.",
      "questions": [
        "Can the issue be reproduced reliably?",
        "What condition narrows it?",
        "What is the smallest current hypothesis?",
        "What guard should prevent recurrence?"
      ],
      "outputs": [
        "Reproduction steps",
        "Root cause note",
        "Fix",
        "Regression guard"
      ],
      "stop_points": [
        "The issue is isolated even if not fixed yet.",
        "A root cause is written down.",
        "A guard exists against repetition."
      ],
      "seams": [
        "Repro isolated",
        "Fix validated independently of the initial hunch"
      ],
      "anti_patterns": [
        "Stacking speculative fixes",
        "Calling it fixed without a repro disappearing"
      ],
      "signals": {
        "healthy": [
          "Each attempted fix corresponds to a live hypothesis.",
          "Evidence is preserved between steps."
        ],
        "warning": [
          "Multiple changes landed before retesting.",
          "The team cannot reproduce the original issue anymore."
        ]
      },
      "moves": [
        "Capture the repro before changing code.",
        "Instrument the narrowest useful boundary.",
        "Add a regression guard immediately after root cause is confirmed."
      ],
      "deliverables": [
        "Repro record",
        "Root cause note",
        "Guard against recurrence"
      ],
      "review_prompts": [
        "What evidence would disprove the current hypothesis?",
        "Did we fix the cause or hide the symptom?"
      ]
    },
    {
      "slug": "refactoring",
      "title": "Refactoring",
      "purpose": "Improve structure when the current form slows safe progress.",
      "questions": [
        "What friction is recurring?",
        "Will this change preserve intended behavior?",
        "Does it improve seams, naming, or testability?"
      ],
      "outputs": [
        "Simpler structure",
        "Clearer names",
        "Better changeability"
      ],
      "stop_points": [
        "Behavior is preserved and re-verified.",
        "The code is easier to reason about than before."
      ],
      "seams": [
        "Module boundaries",
        "Interface simplification"
      ],
      "anti_patterns": [
        "Redesign drift disguised as cleanup",
        "Refactoring with no before-and-after criterion"
      ],
      "signals": {
        "healthy": [
          "The same behavior is now easier to test or change.",
          "The refactor has a bounded intent."
        ],
        "warning": [
          "New features are smuggled into cleanup work.",
          "No one can say what got easier afterward."
        ]
      },
      "moves": [
        "Choose one structural problem at a time.",
        "Preserve behavior with checks before and after.",
        "Prefer clearer seams over more abstraction."
      ],
      "deliverables": [
        "Before/after rationale",
        "Preserved behavior checks",
        "Simplified structure"
      ],
      "review_prompts": [
        "What specific future change is easier now?",
        "Is this cleanup or redesign?"
      ]
    },
    {
      "slug": "handoffs",
      "title": "Handoffs",
      "purpose": "Transfer the work with minimal startup cost for the next person.",
      "questions": [
        "What is done?",
        "What is blocked?",
        "What is the exact next recommended step?",
        "What context would otherwise be lost?"
      ],
      "outputs": [
        "Current-state note",
        "Risks and blockers",
        "Verification record",
        "Next action"
      ],
      "stop_points": [
        "A new owner can continue without reconstructing intent.",
        "Commands, files, and open questions are explicit."
      ],
      "seams": [
        "End-of-session status",
        "Milestone transfer package"
      ],
      "anti_patterns": [
        "Narrative handoffs with no exact next step",
        "Hidden assumptions trapped in chat history"
      ],
      "signals": {
        "healthy": [
          "The next person can act without reverse-engineering state.",
          "Verification and untested areas are both listed."
        ],
        "warning": [
          "The handoff says 'pick up where I left off'.",
          "Important context exists only in memory or chat."
        ]
      },
      "moves": [
        "Write the exact next action, not just the next area.",
        "Name what is untested as clearly as what is tested.",
        "Point to the files and commands that matter."
      ],
      "deliverables": [
        "Current state",
        "Risks and blockers",
        "Next action",
        "Verification record"
      ],
      "review_prompts": [
        "Could someone continue this cold tomorrow morning?",
        "What knowledge would disappear if the current person vanished?"
      ]
    },
    {
      "slug": "compaction",
      "title": "Compaction",
      "purpose": "Deliberately reduce project state so the current narrative is small, accurate, and actionable.",
      "questions": [
        "What context is stale?",
        "What notes are redundant?",
        "What active plan should survive?",
        "What can be deleted without loss?"
      ],
      "outputs": [
        "Smaller current plan",
        "Condensed status",
        "Sharpened open questions"
      ],
      "stop_points": [
        "The project can be summarized cleanly in one paragraph.",
        "Only live branches of work remain."
      ],
      "seams": [
        "Context reset",
        "Milestone archive"
      ],
      "anti_patterns": [
        "Keeping every note forever",
        "Letting obsolete tasks compete with current work"
      ],
      "signals": {
        "healthy": [
          "The live path is visible without scrolling through history.",
          "Open questions are sharper after compaction than before."
        ],
        "warning": [
          "Old context keeps steering current decisions.",
          "The active plan is buried in stale notes."
        ]
      },
      "moves": [
        "Delete or archive obsolete branches of thought.",
        "Rewrite the current state in one paragraph.",
        "Preserve durable decisions and discard transient chatter."
      ],
      "deliverables": [
        "Compacted status note",
        "Live plan",
        "Archived context"
      ],
      "review_prompts": [
        "What would still matter if we resumed in two weeks?",
        "Which notes are only historical noise now?"
      ]
    },
    {
      "slug": "tightening",
      "title": "Tightening",
      "purpose": "Convert a mostly-working project into a dependable one before shipping, pausing, or handing off.",
      "questions": [
        "What is still misleading, loose, or duplicated?",
        "Have critical paths been rerun after cleanup?",
        "Can the project stop here without confusion?"
      ],
      "outputs": [
        "Cleaner names and docs",
        "Removed dead weight",
        "Release-ready or pause-ready state"
      ],
      "stop_points": [
        "Critical paths are rerun after cleanup.",
        "The next seam is clear if work continues."
      ],
      "seams": [
        "Release candidate",
        "Pause-ready checkpoint"
      ],
      "anti_patterns": [
        "Shipping with known ambiguity in status or ownership",
        "Cleanup that is never re-verified"
      ],
      "signals": {
        "healthy": [
          "The project can pause or ship without explanation debt.",
          "Cleanup leaves the system clearer and still verified."
        ],
        "warning": [
          "Dead code and stale notes remain because no one wants to touch them.",
          "Critical paths were not rerun after last-minute cleanup."
        ]
      },
      "moves": [
        "Remove dead weight before final status writing.",
        "Recheck the critical path after cleanup.",
        "Make naming and ownership unambiguous."
      ],
      "deliverables": [
        "Cleanup pass",
        "Rerun verification record",
        "Final state note"
      ],
      "review_prompts": [
        "What would confuse a careful reviewer here?",
        "What cleanup changed behavior risk and therefore needs rechecking?"
      ]
    }
  ],
  "editors": {
    "brief": {
      "title": "Project Brief",
      "description": "Use this to define the problem, boundaries, and first slice before the work expands.",
      "fields": [
        {
          "id": "problem",
          "label": "Problem",
          "type": "textarea",
          "placeholder": "What is wrong, missing, or expensive right now?",
          "stage": "scope",
          "hint": "Describe the present pain, not the imagined solution."
        },
        {
          "id": "users",
          "label": "Users / Operators",
          "type": "textarea",
          "placeholder": "Who feels this problem and who will operate the solution?",
          "stage": "scope",
          "hint": "Separate users, operators, and maintainers when useful."
        },
        {
          "id": "outcome",
          "label": "Outcome",
          "type": "textarea",
          "placeholder": "What useful change should exist when this is done?",
          "stage": "scope",
          "hint": "Write one observable outcome."
        },
        {
          "id": "in_scope",
          "label": "In Scope",
          "type": "list",
          "placeholder": "One in-scope item per line",
          "stage": "scope",
          "hint": "These are commitments."
        },
        {
          "id": "out_of_scope",
          "label": "Out Of Scope",
          "type": "list",
          "placeholder": "One non-goal per line",
          "stage": "scope",
          "hint": "If this list is empty, your scope is probably still loose."
        },
        {
          "id": "constraints",
          "label": "Constraints",
          "type": "list",
          "placeholder": "Time, budget, technical, organizational",
          "stage": "scope",
          "hint": "Constraints shape design. Surface them early."
        },
        {
          "id": "risks",
          "label": "Risks / Unknowns",
          "type": "list",
          "placeholder": "What could block, distort, or invalidate the plan?",
          "stage": "scope",
          "hint": "Unknowns belong in the document, not in your head."
        },
        {
          "id": "success_signals",
          "label": "Success Signals",
          "type": "list",
          "placeholder": "What would tell you this effort worked?",
          "stage": "scope",
          "hint": "Prefer observable signals over vague hopes."
        },
        {
          "id": "first_slice",
          "label": "First Slice",
          "type": "textarea",
          "placeholder": "What is the smallest end-to-end version worth building first?",
          "stage": "planning",
          "hint": "Make it demonstrable and verifiable."
        }
      ]
    },
    "spec": {
      "title": "Specification",
      "description": "Convert the brief into a testable decision document.",
      "fields": [
        {
          "id": "summary",
          "label": "Summary",
          "type": "textarea",
          "placeholder": "One paragraph describing the target behavior and why it matters.",
          "stage": "spec",
          "hint": "If this summary is fuzzy, the rest will drift."
        },
        {
          "id": "problem_statement",
          "label": "Problem Statement",
          "type": "textarea",
          "placeholder": "What exact problem is being solved?",
          "stage": "spec",
          "hint": "Carry forward the scoped problem, but sharpen it."
        },
        {
          "id": "goals",
          "label": "Goals",
          "type": "list",
          "placeholder": "Observable goals, one per line",
          "stage": "spec",
          "hint": "Goals should imply a design direction."
        },
        {
          "id": "non_goals",
          "label": "Non-Goals",
          "type": "list",
          "placeholder": "Explicitly excluded work",
          "stage": "spec",
          "hint": "This is how the spec resists scope creep."
        },
        {
          "id": "requirements",
          "label": "Requirements",
          "type": "list",
          "placeholder": "Functional and non-functional requirements",
          "stage": "spec",
          "hint": "Phrase requirements in observable terms."
        },
        {
          "id": "inputs_outputs",
          "label": "Inputs / Outputs / Interfaces",
          "type": "textarea",
          "placeholder": "Inputs, outputs, interfaces, and operational boundaries",
          "stage": "spec",
          "hint": "Define the shape of the system."
        },
        {
          "id": "acceptance_criteria",
          "label": "Acceptance Criteria",
          "type": "list",
          "placeholder": "What exact conditions mean done?",
          "stage": "testing",
          "hint": "Each one should support a direct check."
        },
        {
          "id": "failure_cases",
          "label": "Failure Cases",
          "type": "list",
          "placeholder": "What should happen when things go wrong?",
          "stage": "spec",
          "hint": "Failure handling is part of the product."
        },
        {
          "id": "test_strategy",
          "label": "Test Strategy",
          "type": "list",
          "placeholder": "Fast checks, behavior tests, regression checks, human evaluation",
          "stage": "testing",
          "hint": "Cover multiple layers."
        },
        {
          "id": "open_questions",
          "label": "Open Questions",
          "type": "list",
          "placeholder": "What is unresolved but known?",
          "stage": "spec",
          "hint": "Separate live uncertainty from settled decisions."
        }
      ]
    },
    "plan": {
      "title": "Implementation Plan",
      "description": "Turn the spec into slices, seams, and decision gates.",
      "fields": [
        {
          "id": "objective",
          "label": "Objective",
          "type": "textarea",
          "placeholder": "What this plan is trying to complete.",
          "stage": "planning",
          "hint": "One plan should support one clear objective."
        },
        {
          "id": "current_state",
          "label": "Current State",
          "type": "textarea",
          "placeholder": "What already exists?",
          "stage": "planning",
          "hint": "Planning should start from reality, not from zero."
        },
        {
          "id": "slices",
          "label": "Slices",
          "type": "table",
          "columns": [
            "Slice",
            "Outcome",
            "Seam / Stopping Point",
            "Verification"
          ],
          "stage": "planning",
          "hint": "Prefer narrow end-to-end slices over broad phases."
        },
        {
          "id": "dependencies",
          "label": "Dependencies",
          "type": "list",
          "placeholder": "What could block this plan externally or structurally?",
          "stage": "planning",
          "hint": "Expose blockers before they stall execution."
        },
        {
          "id": "decision_gates",
          "label": "Decision Gates",
          "type": "list",
          "placeholder": "When must the plan pause for a decision?",
          "stage": "planning",
          "hint": "Good gates prevent waste."
        },
        {
          "id": "refactor_triggers",
          "label": "Refactor Triggers",
          "type": "list",
          "placeholder": "What signs mean cleanup should happen before more feature work?",
          "stage": "refactoring",
          "hint": "Call these before the project gets sticky."
        },
        {
          "id": "handoff_condition",
          "label": "Handoff Condition",
          "type": "textarea",
          "placeholder": "What must be true before this can be transferred cleanly?",
          "stage": "handoffs",
          "hint": "A handoff should start where a seam exists."
        },
        {
          "id": "tightening_pass",
          "label": "Tightening Pass",
          "type": "list",
          "placeholder": "What needs tightening before ship or pause?",
          "stage": "tightening",
          "hint": "This is your pre-ship or pre-pause cleanup pass."
        }
      ]
    }
  }
};
