# Architecture Decision Record Template

> Use this template when an architecture or technology choice needs a durable, reviewable decision record.

## Decision

**Decision statement:**  
[State the architectural decision in one or two sentences.]

**Decision owner:**  
[Role / authority]

**Decision date:**  
[YYYY-MM-DD]

**Review date:**  
[Optional]

## Context

### Business objective

[What outcome is the architecture intended to support?]

### Requirements

- [Requirement]

### Constraints

- [Constraint]

### Assumptions

- [Assumption]

Mark assumptions that materially carry the decision.

## Options Considered

### Option A — [Name]

**Mechanism:** [How it works]

**Benefits:** [...]

**Failure modes:** [...]

**Trade-offs:** [...]

**Dependencies:** [...]

### Option B — [Name]

Repeat the same structure.

## Evidence

| Claim | Evidence | Applicability | Limitation |
|---|---|---|---|
| [Claim] | [Source / test] | [Why it applies] | [Known limitation] |

## Evaluation

**Criteria:** Capability · Quality · Security · Reliability · Performance · Scalability · Operability · Cost / TCO · Interoperability · Reversibility

**Evaluation method:**  
[How alternatives were tested or compared]

**Result:**  
[Observed result]

## Failure Modes and Risks

| Failure mode | Consequence | Control | Residual uncertainty |
|---|---|---|---|
| [Failure] | [Impact] | [Control] | [Unknown] |

## Reversibility

- What can be changed independently?
- What data must be migrated?
- What interfaces are proprietary?
- What operational knowledge is provider-specific?
- What would exit cost?
- How long would exit take?

## Validation Gate

- [ ] [Validation]
- [ ] [Validation]
- [ ] [Validation]

## Technical Position

> [State the advisor's technical judgment, including important conditions and uncertainty.]

## Recommendation

> [State the recommended technical course, subject to the decision owner's authority.]

## Revisit Conditions

Reconsider the position if:

- [Material assumption changes]
- [Evidence changes]
- [Requirement changes]
- [Technology / dependency changes]
