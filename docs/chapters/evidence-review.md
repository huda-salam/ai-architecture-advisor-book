# Evidence Review

The handbook uses evidence review as a formal part of its architecture method. The purpose is not to create a bibliography, but to make the reasoning behind important technical claims auditable.

## Evidence Audits

### Chapters 0–7

Covers the reasoning standard, role charter, advisory method, operating principles, communication, proposal evaluation, and architecture decision framework.

[Open Evidence Audit — Chapters 0–7](./00-07-evidence-audit)

### Chapters 8–9

Covers AI architecture fundamentals and enterprise LLM architecture, including RAG, security boundaries, model deployment choices, self-hosting, vendor claims, and numerical probability semantics.

[Open Evidence Review — Chapters 8–9](./08-09-evidence-review)

## How to Read the Reviews

Each review distinguishes among:

- **Fact** — supported by an authoritative source.
- **Theory** — grounded in an established conceptual or academic framework.
- **Industry Evidence** — documented implementation evidence.
- **Technical Evidence** — standards, specifications, benchmarks, or primary technical documentation.
- **Inference** — a conclusion derived from evidence.
- **Assumption** — an explicitly stated proposition used for reasoning.
- **Recommendation** — advisor judgment based on evidence, constraints, and trade-offs.
- **Uncertainty** — a material question where evidence is insufficient or conflicting.
- **Confidence** — the strength of the conclusion; it is not a substitute for evidence.

> **Field rule:** Never silently turn an assumption into a fact. When evidence is incomplete, expose the uncertainty and use it to improve the architecture question.

## Living Evidence Standard

Because technology, security guidance, model capabilities, vendor terms, and platform APIs change, version-sensitive claims should be re-checked against current authoritative sources before being used in a consequential architecture decision.
