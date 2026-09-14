# Advisor Lens Editorial Standard

## Purpose

This standard defines how technical content should serve the role of the **AI Technology & Architecture Advisor**.

The book is not an implementation manual. However, it must provide enough technical depth for the advisor to challenge the people responsible for implementation.

## Core Test

A technical section is valuable when it improves the advisor's ability to:

1. understand a mechanism;
2. identify an assumption;
3. ask a technically meaningful challenge question;
4. determine what evidence is required;
5. identify failure modes and consequences;
6. compare alternatives;
7. form a technical position; and
8. communicate a defensible recommendation.

## Required Reasoning Chain

Where applicable, technical chapters should connect:

```text
Mechanism
   ↓
Assumption
   ↓
Requirement / Constraint
   ↓
Evidence
   ↓
Failure Mode / Trade-off
   ↓
Validation
   ↓
Technical Position
   ↓
Recommendation
```

## Controlled Learning Markers

Use these markers consistently when they add value:

### FOUNDATION
Define the concept, mechanism, boundary, or durable principle.

### TECHNICAL DEEP DIVE
Explain the mechanism deeply enough that a technically capable advisor can challenge implementation assumptions.

### ADVISOR LENS
Translate technical detail into decision questions, evidence requirements, trade-offs, risk implications, and recommendation logic.

### ARCHITECTURE WARNING
Identify a common architectural misconception or failure mode whose consequences are material.

Do not introduce additional recurring marker categories without an editorial reason.

## Technical Depth Standard

The advisor should not be expected to implement every mechanism personally. The advisor should, however, understand enough to challenge claims such as:

- “the model handles authorization”;
- “the benchmark proves production readiness”;
- “RAG solves hallucination”;
- “self-hosting removes vendor dependency”;
- “private infrastructure is inherently more secure”;
- “human-in-the-loop means the system is controlled”;
- “the cheaper model has lower TCO”;
- “the architecture is portable because the API is compatible.”

A chapter should expose the mechanism behind such claims rather than merely declaring them wrong.

## Advisor Question Pattern

Prefer questions that force architecture into the open:

- What exactly is being claimed?
- Which component is responsible for producing that result?
- Which component has authority to enforce the rule?
- What assumption makes this architecture appropriate?
- What evidence would demonstrate that assumption?
- What happens when the component is wrong, unavailable, stale, or manipulated?
- What is the maximum consequence of failure?
- Compared with what alternative?
- What dependency does this choice create?
- What would cause us to change the decision?

## Technical Position vs Business Decision

The advisor may state a technical position:

> The proposed architecture is technically viable subject to defined validation conditions.

or:

> The proposal should not proceed in its current form because a material control responsibility is assigned to a component that cannot enforce it reliably.

The advisor does not make the executive/business decision. The decision-maker retains that authority.

## Evidence Discipline

Do not turn technical explanations into universal claims when the evidence is conditional.

Distinguish:

- fact;
- assumption;
- inference;
- technical judgment;
- recommendation;
- unknown.

For rapidly changing AI technology, prefer dated and workload-specific evidence over permanent rankings or product claims.

## Redundancy Rule

Once a concept has a primary chapter, later chapters should normally **apply** it rather than redefine it from scratch.

Examples:

- advisor role → Chapters 1–7;
- architecture mental model → Chapter 8;
- RAG → Chapter 10;
- agent architecture → Chapter 11;
- model selection → Chapter 30;
- model evaluation → Chapter 31;
- TCO → Chapter 34;
- vendor dependency → Chapter 36;
- architecture review → Chapter 39.

## Final Editorial Test

Before accepting a technical section, ask:

> **If an experienced architect proposed this design to the advisor, would the advisor now know enough to ask a better question than before reading the section?**

If not, the section needs either more technical depth, a stronger advisor lens, or both.
