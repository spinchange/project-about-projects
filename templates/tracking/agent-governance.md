# Agent Governance

## Authority

- Define who owns authoritative updates to `docs/tracking/`.
- Other agents may propose tracking changes, but those changes are not authoritative until verified and applied by the owner.

## Delegation Rules

- Sidecar agents should prefer isolated write scopes.
- No agent should edit the same high-signal planning file in parallel with another agent unless explicitly coordinated.
- Shared planning files require explicit ownership.

## Verification Rules

- "Done" means the code or doc exists, the stated scope was actually changed, and the relevant validation was run when applicable.
- For docs, verify the file path, content, and any linked references.
- For code, verify behavior with the most direct practical checks.
