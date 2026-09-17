# 15A. Cloud Architecture — Advisor Hardening Review

**Marker:** ADVISOR LENS

This review is a companion to Chapter 15. It does not replace the technical cloud architecture material. Its purpose is to make the decision bridge explicit: how the advisor converts cloud architecture analysis into a defensible technical position.

## 15A.1 Decision Bridge

Use the following chain when reviewing a cloud proposal:

```text
Workload & Requirements
        ↓
Control / Residency / Identity Constraints
        ↓
Service & Deployment Options
        ↓
Responsibility Boundary
        ↓
Failure / Recovery Model
        ↓
TCO & Strategic Dependency
        ↓
Evidence
        ↓
Technical Position
        ↓
Recommendation
```

The sequence matters. A provider or service should not be selected before the requirements and control boundary are understood.

## 15A.2 What the Advisor Must Establish

A technically credible cloud recommendation should make explicit:

- which workload characteristics drive the architecture;
- which requirements are hard constraints and which are preferences;
- which security, identity, residency, and operational controls must remain under organizational control;
- which responsibilities are transferred to the provider and which remain with the organization;
- which failure domains the architecture actually tolerates;
- which recovery objectives have been tested rather than assumed;
- which cost assumptions are measured, estimated, or unknown;
- which provider services create strategically material dependency;
- what exit or substitution path exists for those dependencies.

## 15A.3 Advisor Challenge Questions

When reviewing a proposal, ask:

1. What requirement makes this cloud capability necessary?
2. Which requirement would make us choose a different deployment model?
3. What control must remain with us regardless of service model?
4. What workload characteristic makes the proposed service appropriate?
5. Which responsibilities have actually moved to the provider?
6. What failure domain does this architecture tolerate, and what does it not tolerate?
7. Which cost assumptions have been measured under representative workload conditions?
8. Which dependency would be hardest to exit?
9. What evidence would cause us to reject this provider or service?

## 15A.4 Evidence Discipline

Classify the basis of the decision:

| Evidence | Example | Advisor treatment |
|---|---|---|
| Requirement | Residency or RTO requirement | Establish as a constraint |
| Provider fact | Service capability or documented limit | Verify against current provider documentation |
| Measurement | Observed latency, throughput, recovery time | Prefer over generic claims |
| Estimate | Forecast cost at projected workload | State assumptions and uncertainty |
| Architecture judgment | Dependency is strategically material | Explain the reasoning |
| Unknown | Exit effort not yet tested | Convert into a validation action |

A cloud architecture review should never present an estimate as a measured fact.

## 15A.5 Technical Position Format

A concise position can use:

> **Finding:** The proposed architecture satisfies the identified workload and control requirements, subject to the stated assumptions.
>
> **Material uncertainty:** Recovery performance and long-term exit effort have not yet been demonstrated.
>
> **Implication:** The architecture may be technically viable, but the decision should not treat resilience and reversibility as proven properties.
>
> **Recommendation:** Proceed only after the defined recovery and dependency validation gates are completed.

The exact conclusion must follow the evidence; this template is not a predetermined answer.

## 15A.6 Field Rule

> **Choose cloud architecture from control requirements, workload characteristics, failure consequences, operating responsibility, cost behavior, and strategic dependency—not from provider popularity or the label “cloud-first.”**

**Cross-reference:** Chapter 15 provides the technical mechanisms; Chapters 34–36 provide deeper economic and dependency analysis; Chapters 37–41 provide assurance and readiness methods.