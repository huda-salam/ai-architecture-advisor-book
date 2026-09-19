# Advisor Toolkit

> **Working tools for turning technical analysis into a defensible advisory position.**

This toolkit is the operational companion to the handbook. It does not replace the chapters. It helps the advisor move from **question → evidence → analysis → technical position → recommendation**.

## Toolkit

- [AI Proposal Review Checklist](./tools/ai-proposal-review-checklist)
- [Architecture Decision Record Template](./tools/adr-template)
- [AI Evaluation Worksheet](./tools/ai-evaluation-worksheet)
- [Architecture Pattern Review Template](./tools/architecture-pattern-review-template)
- [Worked Example — “More Secure Because It Is Proprietary”](./tools/worked-example-proprietary-llm-security)

## The advisory chain

```text
Decision
  ↓
What must be true?
  ↓
Requirements / Constraints
  ↓
Assumptions
  ↓
Evidence
  ↓
Mechanisms
  ↓
Failure Modes / Trade-offs
  ↓
Validation
  ↓
Technical Position
  ↓
Recommendation
```

## Operating rule

> **Do not use a template to create the appearance of rigor. Use it to expose missing reasoning.**

A completed checklist with weak evidence is still a weak assessment.


## Worked Advisory Cases

These cases demonstrate how the toolkit is used against realistic claims and architecture choices:

- [RAG Does Not Automatically Solve Hallucination](./tools/worked-case-rag-not-hallucination)
- [Agent or Deterministic Workflow?](./tools/worked-case-agent-vs-workflow)
- [“Our Benchmark Is 95%”](./tools/worked-case-benchmark-95)
- [Cloud vs Self-Hosted AI](./tools/worked-case-cloud-vs-self-hosted)
- [Fine-Tuning Is Proposed](./tools/worked-case-fine-tuning)
- [“The Model Is Production-Ready”](./tools/worked-case-production-readiness)
- [“The API Is Compatible, So We Can Switch Later”](./tools/worked-case-vendor-exit)
