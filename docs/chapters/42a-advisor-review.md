# 42A — Successful Architecture Advisor Review

> **Advisor question:** What can a successful enterprise case actually prove, what assumptions make it transferable, and what evidence is still missing before we use it to support an architecture decision?

## FOUNDATION

A successful case is evidence of an implementation under particular conditions. It is not a reference architecture to copy.

The advisor should separate three claims:

1. **Existence:** the organization actually implemented the system.
2. **Outcome:** the organization reports a measured result.
3. **Transferability:** the same architectural pattern is likely to work in our environment.

The third claim requires the most reasoning.

## 42A.1 Start With the Case, Not the Vendor

Extract the architecture before evaluating the products.

```text
Business Problem
      ↓
Workflow
      ↓
Data / Evidence
      ↓
AI Capability
      ↓
Controls
      ↓
Human Role
      ↓
Operational Outcome
```

Ask what mechanism actually produced the reported result.

**ADVISOR LENS**

> Do not ask “Who uses this technology?” Ask “What architectural pattern produced the relevant outcome?”

## 42A.2 Separate Reported Outcome From Causal Evidence

A reported improvement is not automatically a causal estimate.

Ask:

- What was the baseline?
- What changed?
- What population was measured?
- For how long?
- Were exceptions excluded?
- What human work remained?
- What costs were included?
- Was the metric independently validated?

A strong conclusion may therefore be:

> The customer reports a material improvement in the stated metric; the public evidence is insufficient to establish how much of the improvement was caused by the AI component.

## 42A.3 Test Transferability

Compare the reference environment with ours:

| Dimension | Reference case | Our environment | Transferability question |
|---|---|---|---|
| Data | | | Is data quality comparable? |
| Workflow | | | Is the process materially similar? |
| Users | | | Are users trained and authorized similarly? |
| Volume | | | Is workload comparable? |
| Latency | | | Are service objectives comparable? |
| Risk | | | Are consequences of error comparable? |
| Integration | | | Do required systems/interfaces exist? |
| Regulation | | | Are constraints equivalent? |
| Economics | | | Are cost drivers comparable? |
| Operating capability | | | Can we sustain the architecture? |

The greater the contextual difference, the weaker the direct transfer inference.

## 42A.4 Look for the Hidden System

A case described as “an LLM application” may actually depend on:

- curated source data;
- retrieval and indexing;
- enterprise identity;
- workflow integration;
- deterministic calculations;
- evaluation datasets;
- human review;
- monitoring;
- operational teams;
- contractual controls.

**ARCHITECTURE WARNING**

> A case study can make the model visible while hiding the architecture that made the model useful.

## 42A.5 Challenge Success With Failure Evidence

For every attractive case, ask what similar systems failed and why.

Useful questions:

1. What comparable deployments were abandoned?
2. Which assumptions distinguished successful and unsuccessful cases?
3. What was the cost of failure?
4. Which controls detected failure?
5. How early was it detected?
6. What changed after failure?

This is the connection between Chapters 42 and 43.

## 42A.6 Build a Case Evidence Record

Record at least:

```text
Case
Use case
Architecture pattern
Reported outcome
Evidence class
Primary source
Independent corroboration
Known limitations
Context differences
Failure evidence
Transferability assessment
Confidence
Decision implication
```

Do not record only the vendor URL and headline metric.

## 42A.7 Technical Position

A defensible position should look like:

> The reference case provides credible evidence that this architectural pattern has been deployed for a comparable workflow. Its reported outcome is useful but not independently validated. Our environment differs in data, risk, and operating constraints, so the pattern should be treated as a candidate architecture and validated through a bounded pilot rather than adopted by analogy.

That is materially stronger than:

> Similar organizations use it, therefore we should use it.

## 42A.8 What Would Change Our Mind?

Increase confidence when:

- multiple independent cases show comparable outcomes;
- architecture and constraints are genuinely comparable;
- operational evidence is longitudinal;
- costs and human work are visible;
- negative evidence does not reveal a relevant boundary condition.

Decrease confidence when:

- the case depends on exceptional scale or talent;
- the metric is poorly defined;
- material architecture details are undisclosed;
- the environment differs substantially;
- the case has no credible failure evidence.

## Field Rule

> **Use successful cases to generate hypotheses about architecture, not to outsource architectural judgment.**
