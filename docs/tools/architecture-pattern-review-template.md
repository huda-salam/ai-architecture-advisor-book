# Architecture Pattern Review Template

> Review an architecture pattern against a concrete problem rather than treating the pattern as a universal solution.

## Pattern

**Name:** [...]

**Intent:** [...]

**Primary mechanism:** [...]

## Applicability

**Use when:**
- [...]

**Avoid when:**
- [...]

## Requirements Fit

| Requirement | Pattern mechanism | Fit | Evidence |
|---|---|---|---|
| [...] | [...] | [Strong / Partial / Weak] | [...] |

## Assumptions

1. [...]
2. [...]
3. [...]

For each assumption, identify what would invalidate the pattern.

## Architecture

```text
[Component] → [Component] → [Component]
                    ↓
              [Control / Data]
```

## Failure Modes

| Failure mode | Trigger | Consequence | Mitigation |
|---|---|---|---|
| [...] | [...] | [...] | [...] |

## Trade-offs

**Gains**
- [...]

**Costs**
- [...]

**Complexity introduced**
- [...]

**Complexity removed**
- [...]

## Security

- Trust boundaries:
- Identity:
- Authorization:
- Data protection:
- Abuse / adversarial considerations:

## Reliability and Operations

- Availability:
- Degraded mode:
- Recovery:
- Observability:
- Operational ownership:

## Economics

- Fixed cost:
- Variable cost:
- Operational cost:
- Scaling cost:
- Exit / migration cost:

## Reversibility

**Easy to reverse:** [...]

**Difficult to reverse:** [...]

**Provider-specific dependency:** [...]

## Validation

- [ ] [...]
- [ ] [...]
- [ ] [...]

## Advisor Position

> [State whether the pattern is appropriate, conditionally appropriate, or not yet justified, with evidence and conditions.]
