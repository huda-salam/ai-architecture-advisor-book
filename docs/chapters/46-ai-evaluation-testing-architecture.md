# AI Evaluation & Testing Architecture

> **TECHNICAL DEEP DIVE**

## Purpose

AI evaluation is not a single benchmark score. An advisor needs to determine what has been evaluated, what has not, whether the evaluation represents the intended workload, and whether the evidence is sufficient for the decision being made.

The central question is:

> **What exactly has been evaluated, against what baseline, using which evidence, and what remains untested?**

## 1. Evaluation Is Layered

A production AI system contains multiple components whose behavior can fail independently.

```text
                    AI SYSTEM
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
      Model        Retrieval        Tools
        │              │              │
        └──────────────┼──────────────┘
                       ↓
                 Orchestration
                       ↓
                  AI Response
                       ↓
                Business Outcome
```

Therefore evaluation should distinguish at least:

- model capability;
- prompt or instruction behavior;
- retrieval quality;
- tool behavior;
- orchestration behavior;
- system-level quality;
- safety and security behavior;
- operational performance; and
- business outcome.

Technical references: Chapters 10, 11, 17, 19, 22, 30 and 31.

## 2. Start With the Task Definition

Before selecting a metric, define what the system is supposed to accomplish.

```text
Business Task
     ↓
Expected Behavior
     ↓
Acceptance Criteria
     ↓
Evaluation Dataset
     ↓
Evaluation Method
     ↓
Evidence
```

A metric without a clearly defined task can create false confidence.

Ask:

- What is a successful outcome?
- What errors matter most?
- Which failures are tolerable?
- Which failures are unacceptable?
- Who judges correctness?
- What baseline are we comparing against?

## 3. Model Evaluation

Model evaluation examines capability under defined conditions.

Possible dimensions include:

- task accuracy or quality;
- instruction following;
- structured output reliability;
- reasoning or problem-solving performance where relevant;
- safety behavior;
- latency;
- throughput; and
- cost per workload.

The advisor should not treat a public benchmark as a proxy for enterprise suitability without evidence that the benchmark represents the actual task.

Technical depth: see [Chapter 30 — Model Selection](./30-model-selection) and [Chapter 31 — Model Evaluation](./31-model-evaluation).

## 4. Evaluation Dataset Quality

The evaluation dataset is part of the evidence.

Ask:

- Is it representative of production inputs?
- Does it contain difficult and edge cases?
- Does it reflect the expected language, domain, and document types?
- Is it large enough to support the intended conclusion?
- Is there leakage between development and evaluation data?
- Are important failure classes represented?
- Who created and reviewed the dataset?

A strong score on a weak dataset remains weak evidence.

## 5. Baselines Matter

An AI system should be compared with a credible alternative.

Possible baselines include:

- current manual process;
- existing software;
- deterministic rules;
- conventional search;
- conventional machine learning;
- an existing model; or
- a simpler AI architecture.

The question is not merely:

> “Does the AI work?”

It is:

> **“Does it work sufficiently better than the best credible alternative to justify its cost and complexity?”**

## 6. Retrieval Evaluation

For RAG systems, evaluate retrieval separately from generation.

```text
Knowledge Corpus
      ↓
   Retrieval
      ↓
Retrieved Evidence
      ↓
     LLM
      ↓
Generated Answer
```

Ask:

- Did the system retrieve the relevant source?
- Did it retrieve sufficient context?
- Did it retrieve authoritative information?
- Did access controls prevent unauthorized context exposure?
- Did the generated answer faithfully use the retrieved evidence?

A fluent answer does not prove retrieval correctness.

Technical depth: see [Chapter 10 — RAG Architecture](./10-rag-architecture) and [Chapter 32 — Fine-Tuning vs RAG vs Prompting](./32-fine-tuning-vs-rag-vs-prompting).

## 7. Agent and Tool Evaluation

Agentic systems require evaluation of behavior across multiple steps.

Evaluate:

- tool selection;
- parameter construction;
- authorization boundaries;
- planning behavior;
- loop termination;
- retry behavior;
- recovery from tool failure;
- unintended actions;
- escalation to humans; and
- cost and latency growth across steps.

A successful single interaction does not establish reliable agent behavior across long or adversarial trajectories.

Technical depth: see [Chapter 11 — Agentic Architecture](./11-agentic-architecture), [Chapter 20 — Identity & Access Control](./20-identity-access-control), and [Chapter 22 — AI-Specific Threats](./22-ai-specific-threats).

## 8. System-Level Evaluation

The enterprise system should be tested as a whole.

```text
Input
 ↓
Identity
 ↓
Data Access
 ↓
Retrieval / Processing
 ↓
Model
 ↓
Tools / Workflow
 ↓
Validation
 ↓
Human Boundary
 ↓
Output / Action
```

Evaluate whether the complete chain satisfies the business and technical requirements.

This catches failures that component benchmarks cannot reveal.

## 9. Human Evaluation

Some AI tasks require human judgment because correctness is contextual or difficult to encode completely.

Human evaluation should define:

- evaluator qualifications;
- evaluation criteria;
- scoring procedure;
- disagreement handling;
- sampling method; and
- limitations.

The existence of a human evaluator does not automatically make the evidence rigorous.

## 10. Safety and Adversarial Testing

Testing should include cases deliberately designed to expose failure.

Examples:

- ambiguous inputs;
- conflicting instructions;
- malicious prompts;
- prompt injection;
- unauthorized data requests;
- malformed tool parameters;
- unavailable dependencies;
- stale knowledge;
- unsupported claims;
- extreme workloads; and
- unexpected sequences of actions.

Technical depth: see [Chapter 22 — AI-Specific Threats](./22-ai-specific-threats) and [Chapter 37 — AI Risk Framework](./37-ai-risk-framework).

## 11. Evaluation in Production

Pre-production evaluation is necessary but insufficient.

Production evaluation should monitor for changes in:

- input distribution;
- retrieval quality;
- model behavior;
- output quality;
- latency;
- cost;
- failure rates;
- tool behavior; and
- business outcomes.

The evaluation architecture should therefore support regression testing and ongoing measurement.

Technical depth: see [Chapter 33 — Model Lifecycle](./33-model-lifecycle), [Chapter 40 — Production Readiness](./40-production-readiness), and [Chapter 41 — Auditability](./41-auditability).

## 12. Evaluation Evidence Ladder

Use an evidence hierarchy appropriate to the decision:

```text
Claim
 ↓
Benchmark / Prototype Evidence
 ↓
Representative Evaluation
 ↓
System Evaluation
 ↓
Pilot / Real-World Evidence
 ↓
Production Evidence
```

Higher-level evidence does not make lower-level evidence useless. It answers a different question.

A model benchmark can demonstrate capability. It cannot by itself demonstrate production readiness.

## 13. Avoid False Precision

Do not convert an evaluation score into a business probability without justification.

For example, “92% accuracy” is meaningful only when the advisor understands:

- what was measured;
- what counts as correct;
- which data was used;
- which baseline was used;
- how uncertainty was handled; and
- whether the metric matters to the business outcome.

Likewise, a model's generated confidence should not automatically be interpreted as a calibrated probability.

## 14. Evaluation Matrix

For a material AI system, maintain a simple matrix:

| Evaluation layer | Question | Evidence | Result | Remaining uncertainty |
|---|---|---|---|---|
| Model | Can it perform the task? | Evaluation set | — | — |
| Retrieval | Can it find relevant evidence? | Retrieval test | — | — |
| Generation | Does output meet acceptance criteria? | Human / automated evaluation | — | — |
| Tools | Does it invoke tools correctly and safely? | Scenario tests | — | — |
| System | Does the complete system work? | End-to-end tests | — | — |
| Safety | Does it fail safely? | Adversarial tests | — | — |
| Operations | Does it meet NFRs? | Load / reliability tests | — | — |
| Business | Does it improve the intended outcome? | Pilot / production evidence | — | — |

## 15. Advisor Challenge Questions

When presented with an evaluation result, ask:

1. What exactly was evaluated?
2. What was the unit of evaluation?
3. What dataset was used?
4. Is it representative of production?
5. What baseline was used?
6. Which failure cases were included?
7. Which failure cases were excluded?
8. Was the system evaluated end-to-end?
9. Were security and adversarial conditions tested?
10. How was human evaluation performed?
11. What remains untested?
12. What evidence supports production readiness?
13. How will performance be monitored after deployment?
14. What would invalidate the conclusion?

## 16. The Advisor's Evaluation Position

A useful technical position should be explicit about evidence maturity.

> **The evaluation provides sufficient evidence for X, partial evidence for Y, and no evidence yet for Z. The strongest remaining uncertainty is A. Before the next decision gate, we should validate B using C.**

This prevents “evaluated” from becoming synonymous with “proven.”

## Field Rule

> **Never ask only whether the AI works. Ask what was evaluated, what was not, what the result means, and whether the evidence is sufficient for the decision at hand.**
