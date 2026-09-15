# Chapter 39A — Architecture Review Advisor Review

> **ADVISOR LENS**
>
> Architecture review is the point where the advisor determines whether the proposed components, boundaries, controls, and operating assumptions form a coherent system for the decision being made.

## 1. Reconstruct the Architecture

Do not review only the architecture diagram supplied by the proposal team.

Reconstruct the system as:

```text
Business Decision
      ↓
Requirements / Constraints
      ↓
Responsibilities
      ↓
Components
      ↓
Interfaces / Data Flows
      ↓
Controls
      ↓
Operational Model
```

This exposes missing responsibilities that attractive diagrams often hide.

## 2. Review Boundaries Before Components

Ask:

- Where is authoritative data held?
- Where does inference occur?
- Where is policy enforced?
- Where is identity verified?
- Where can an agent act?
- Where is human authority required?
- Where are failures contained?
- Where can the organization replace a dependency?

Architecture quality often depends more on boundaries than on the choice of individual products.

## 3. Test Requirement-to-Architecture Traceability

For every important requirement:

```text
Requirement
   ↓
Architecture mechanism
   ↓
Evidence
   ↓
Validation
```

If a requirement has no architectural mechanism, it is not actually addressed.

If an architectural mechanism has no requirement, challenge whether it is necessary.

## 4. Challenge Architectural Fashion

Common claims requiring examination include:

- “We need microservices.”
- “We need Kubernetes.”
- “We need an agent.”
- “We need RAG.”
- “We need our own model.”
- “We need a vector database.”
- “We need a multi-cloud architecture.”

The advisor should ask:

> **Which requirement makes this component necessary, and what simpler alternative was rejected?**

## 5. Review Failure Boundaries

For each critical dependency, identify:

- failure mode;
- detection mechanism;
- degraded behavior;
- recovery mechanism;
- user-visible consequence;
- authority boundary during failure.

An architecture is not adequately reviewed if its happy path is detailed but its failure behavior is undefined.

## 6. Review AI-Specific Boundaries

Pay particular attention to:

```text
Probabilistic inference
        ≠
Authorization

Generated explanation
        ≠
Evidence

Model output
        ≠
System of record

Recommendation
        ≠
Decision authority
```

These distinctions should be visible in the architecture, not merely described in policy.

## 7. Compare Alternatives

A review should normally examine at least one credible alternative when the decision is material.

Compare:

- capability;
- security;
- performance;
- reliability;
- operational complexity;
- cost;
- interoperability;
- vendor dependency;
- reversibility;
- evidence quality.

The purpose is not to maximize options. It is to establish that the selected architecture is defensible against a credible alternative.

## 8. Advisor Challenge Questions

- Which requirement drives each major architectural choice?
- Which component owns each responsibility?
- Where are the trust boundaries?
- What happens when each critical dependency fails?
- Which controls are technically enforced rather than documented?
- Which assumptions remain unvalidated?
- What is the simplest architecture that satisfies the requirements?
- What materially better alternative was considered?
- Which decision would be hardest to reverse?

## 9. Technical Position

> **Architecture position:** The proposed architecture is [fit / conditionally fit / not yet justified]. Its strongest architectural property is [X]. The principal weakness is [Y]. The decision should [proceed / proceed with conditions / be redesigned] because [technical evidence and trade-off].

## 10. What Would Change the Advisor's Mind?

- a validated requirement is shown to require additional architectural complexity;
- representative testing invalidates a performance assumption;
- security review identifies an uncontained trust-boundary failure;
- an alternative architecture demonstrates materially better risk-adjusted economics;
- an operational dependency cannot meet the required resilience target.

> **Field rule:** An architecture review is successful when the advisor can explain why the architecture is appropriate, what assumptions make it work, what alternatives were rejected, and what evidence would justify changing the decision.