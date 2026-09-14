# 7. Architecture Decision Framework

Chapter 6 defines how to evaluate a technology proposal. This chapter defines how to turn that analysis into a **defensible architecture decision**.

The advisor's job is not simply to identify a technically possible solution. It is to make the decision structure explicit: what is being decided, why, what alternatives exist, what trade-offs are accepted, what evidence supports the conclusion, and under what conditions the decision should be revisited.

> **A good architecture decision is not the claim that one option is universally best. It is a documented judgment that one option is preferable under stated requirements, constraints, assumptions, evidence, and risk.**

## 7.1 What Is an Architecture Decision?

An architecture decision selects or constrains a significant technical approach.

Examples:

- managed LLM versus self-hosted model;
- centralized versus federated data architecture;
- synchronous versus event-driven integration;
- RAG versus fine-tuning;
- single-model versus multi-model strategy;
- public cloud versus hybrid deployment;
- centralized identity versus application-specific authorization.

Not every engineering choice requires a formal architecture decision record. Focus on decisions with meaningful consequences for security, cost, reliability, scalability, interoperability, operations, or future flexibility.

## 7.2 Decision Hierarchy

Keep these levels separate:

```text
Business objective
        ↓
Requirements / constraints
        ↓
Architecture decision
        ↓
Technology / product selection
        ↓
Implementation decision
```

A product should not silently determine the architecture.

Likewise, an architecture decision should not silently determine the business objective.

## 7.3 Architecture Principles

Architecture principles are reusable rules that guide decisions across multiple systems.

Examples for this role include:

1. Protect sensitive data by design.
2. Preserve authoritative source systems.
3. Prefer the simplest architecture that satisfies requirements and risk.
4. Avoid unnecessary coupling to a single vendor or model.
5. Make consequential AI outputs traceable to evidence.
6. Preserve human accountability for consequential decisions.
7. Measure material assumptions before committing to irreversible infrastructure.
8. Treat operational capability as part of architecture.
9. Preserve meaningful alternatives when the cost of being wrong is high.

Principles are decision criteria, not absolute laws. A principle may be overridden when a documented requirement justifies the trade-off.

## 7.4 Architecture Decision as a Technical Position

The advisor should distinguish between three statements:

### Technical finding

> “The proposed architecture requires dedicated GPU capacity.”

### Technical judgment

> “Current workload assumptions do not justify that capacity.”

### Recommendation

> “Use managed inference initially and establish explicit thresholds for migration to self-hosting.”

This distinction prevents opinions from being presented as facts and makes dissent easier to defend.

## 7.5 Architecture Decision Record (ADR)

A lightweight ADR should normally contain:

```text
Title
Status
Date
Decision owner
Advisor / reviewers

Context
What problem are we solving?

Decision
What are we choosing?

Requirements
What must the solution satisfy?

Constraints
What limits the solution space?

Assumptions
What must be true?

Technical mechanism
How does the proposed architecture actually work?

Options considered
What alternatives were evaluated?

Evaluation criteria
What considerations matter and why?

Evidence
What supports the assessment?

Trade-offs
What are we gaining and giving up?

Risks
What risks are accepted or mitigated?

Recommendation
Why is this option preferred?

Confidence
How strong is the conclusion?

Reversal conditions
What would cause us to revisit the decision?
```

The ADR is not bureaucracy for its own sake. Its purpose is to preserve the reasoning behind an important decision.

## 7.6 Decision Criteria Must Come From the Problem

Avoid arbitrary criteria.

For example, a model decision might use:

- capability;
- security;
- data control;
- latency;
- reliability;
- cost;
- scalability;
- portability;
- operational complexity.

But their importance depends on the use case.

For a low-risk internal assistant, latency may dominate. For AI supporting sensitive portfolio decisions, authorization, evidence traceability, reliability, and auditability may carry greater weight.

> **Do not score everything equally merely because a spreadsheet makes it easy.**

## 7.7 Hard Constraints vs Preferences

This distinction is essential.

### Hard constraint

An option that violates it is unacceptable.

Example:

> “Data classified as X may not be processed outside the approved environment.”

### Preference

An option is favored, but another option may still be acceptable.

Example:

> “Prefer managed services to reduce operational burden.”

Do not allow a preference to masquerade as a hard technical constraint.

A decision matrix should therefore identify **disqualifying constraints before scoring options**.

## 7.8 Weighted Decision Matrix

When several options remain viable, a weighted matrix can make reasoning explicit.

Example:

| Criterion | Weight | Option A | Option B | Option C |
|---|---:|---:|---:|---:|
| Security | 25% | 3 | 5 | 5 |
| Cost | 20% | 5 | 4 | 2 |
| Operational simplicity | 20% | 5 | 4 | 2 |
| Capability | 20% | 4 | 5 | 4 |
| Reversibility | 15% | 3 | 4 | 5 |

The numerical score is only a decision aid.

It does **not** turn judgment into objective truth.

The advisor should be able to explain:

- why each criterion matters;
- why each weight was chosen;
- what evidence supports each score;
- how sensitive the result is to reasonable changes in weights.

## 7.9 Risk Matrix

For material decisions, identify risk using at least:

- likelihood;
- impact;
- existing controls;
- residual risk;
- owner.

A simple model:

| Risk | Likelihood | Impact | Residual risk | Treatment |
|---|---|---|---|---|
| Data leakage | Medium | Very High | Medium | Retrieval ACL + testing |
| Provider outage | Medium | High | Low–Medium | Fallback / graceful degradation |
| Cost escalation | Medium | Medium | Medium | Usage limits + monitoring |
| Model degradation | Medium | High | Medium | Evaluation + version control |

The purpose is not to eliminate every risk.

> **The decision should make clear which risks are being accepted.**

## 7.10 Technical Debt

Technical debt is not automatically bad.

A deliberate shortcut may be rational when the requirement is uncertain, the solution is experimental, time-to-value matters, the decision is reversible, and the cost of postponing complexity is acceptable.

It becomes dangerous when debt is invisible, accumulating, difficult to quantify, blocking future changes, or creating security or reliability exposure.

For significant debt, record:

> **Why was it accepted? What does it cost? When should it be revisited?**

## 7.11 Reversibility

Architecture decisions differ in how difficult they are to undo.

A useful classification:

```text
Easy to reverse
      ↓
Moderately reversible
      ↓
Expensive to reverse
      ↓
Strategically difficult to reverse
```

The more difficult a decision is to reverse, the stronger the evidence should generally be before committing.

## 7.12 Decision Confidence

Confidence should reflect evidence quality and uncertainty, not the seniority of the person making the recommendation.

**High** — strong evidence, validated assumptions, limited material uncertainty.

**Medium** — credible evidence exists, but one or more material assumptions remain.

**Low** — important conclusions depend heavily on unvalidated assumptions or limited evidence.

Low confidence does not necessarily mean “do not proceed.” It may mean:

> **Proceed with a validation step before making an irreversible commitment.**

## 7.13 Decision Gates

Not every architecture decision needs to be made immediately.

Use gates when uncertainty is material:

```text
Concept
  ↓
Architecture hypothesis
  ↓
Prototype / benchmark
  ↓
Security validation
  ↓
Pilot
  ↓
Production decision
```

This allows the organization to buy information before buying infrastructure.

## 7.14 Second Opinion and Dissent Record

For significant disagreements, add an independent assessment to the decision record.

```text
Existing proposal:

Independent assessment:

Points of agreement:

Material disagreement:

Evidence supporting disagreement:

Alternative recommendation:

Confidence:

What would change the assessment:
```

The advisor's dissent should be technically specific, evidence-based, and proportional to the stakes.

## 7.15 Decision Review

An architecture decision should not necessarily be permanent.

Define review triggers such as:

- workload exceeds the original assumption;
- model capability changes materially;
- vendor pricing changes materially;
- security requirements change;
- regulatory requirements change;
- reliability targets change;
- a major new alternative becomes viable;
- migration cost becomes lower than expected.

This creates a feedback loop:

```text
Decision
   ↓
Implementation
   ↓
Observed outcome
   ↓
Compare with assumptions
   ↓
Learn
   ↓
Confirm / Modify / Reverse decision
```

## 7.16 The Advisor's Decision Method

For practical use:

> **Frame → Understand → Constrain → Identify → Compare → Test → Position → Recommend → Record → Review**

**Frame** — Define the actual problem and decision.

**Understand** — Understand the technical mechanism well enough to assess it credibly.

**Constrain** — Identify hard requirements and constraints.

**Identify** — Expose assumptions, considerations, and viable options.

**Compare** — Evaluate options and trade-offs.

**Test** — Validate material uncertainty.

**Position** — Form an independent technical judgment.

**Recommend** — State the preferred option and conditions.

**Record** — Preserve the reasoning and dissent where relevant.

**Review** — Revisit when assumptions or conditions change.

## 7.17 Executive Decision Record

The full ADR may be technical. The RD often needs a compressed version:

```text
DECISION
What are we deciding?

RECOMMENDATION
What do I recommend?

WHY
Three material reasons.

OPTIONS
What alternatives were considered?

KEY TECHNICAL FINDING
What did the technical assessment establish?

KEY RISK
What is the most important risk?

COST / IMPACT
What materially changes financially or operationally?

CONDITIONS
What must be true before proceeding?

CONFIDENCE
High / Medium / Low.

DISSENT
Is there a material independent disagreement?

REVIEW TRIGGER
What would cause us to revisit the decision?
```

## 7.18 Architecture Decision Quality

A good decision should be evaluated on more than whether the eventual outcome was good.

Ask:

1. Was the problem correctly framed?
2. Was the technical mechanism understood?
3. Were the important constraints identified?
4. Were material alternatives considered?
5. Were assumptions explicit?
6. Was evidence appropriate?
7. Were trade-offs understood?
8. Were risks consciously accepted?
9. Was the decision proportionate to the stakes?
10. Was reversibility considered?
11. Can the reasoning be reconstructed later?

A good process can occasionally produce a bad outcome because uncertainty is real. Likewise, a lucky outcome does not prove that the decision process was sound.

## Field Rule

> **Make important architecture decisions explicit, technically understood, evidence-based, proportionate to the stakes, and reversible where practical. Document not only what was chosen, but why—and what would cause us to change it.**
