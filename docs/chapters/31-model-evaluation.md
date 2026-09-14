# Chapter 31 — Model Evaluation

> **Advisor question:** What evidence demonstrates that this model and system are good enough for the intended use — under the conditions in which the organization will actually rely on it?

## FOUNDATION

Model evaluation is not a leaderboard exercise. It is an evidence-generation process for a technology decision.

The evaluation target may be:

- a foundation model;
- a model configuration;
- a RAG pipeline;
- an agent workflow;
- a complete AI application;
- or a human-AI decision process.

These are different objects and must not be evaluated as though they were interchangeable.

NIST AI RMF treats measurement as an ongoing activity: AI systems should be evaluated before deployment and monitored and re-evaluated as conditions change. urlNIST AI RMF — Measurehttps://airc.nist.gov/airmf-resources/airmf/5-sec-core/

**FIELD RULE**

> **Never approve an AI system because a benchmark score is high. Approve it only when the evaluation evidence demonstrates that the system satisfies the requirements, constraints, risks, and economics of its intended use.**

---

## 31.1 Evaluation Has a Shorter Half-Life Than Architecture Principles

The evaluation methodology can remain useful while a particular model comparison becomes stale.

This distinction is essential in 2026 because frontier-model capabilities and benchmark composition are changing rapidly. Stanford's 2026 AI Index reports rapid benchmark saturation, convergence among leading models, and continuing concern about benchmark reliability and gaming. urlStanford AI Index 2026 — Technical Performancehttps://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance

Therefore distinguish:

**Durable evaluation principle**

> Evaluate the system against the intended task and consequences.

from:

**Time-sensitive evaluation result**

> Model A scored X against Model B on benchmark Y on date Z.

The second statement must carry its date, model versions, methodology, and conditions.

---

## 31.2 Evaluate the System, Not Only the Model

An enterprise AI result is often produced by:

```text
Data
  ↓
Retrieval / Context
  ↓
Prompt / Configuration
  ↓
Model
  ↓
Tools / Agents
  ↓
Orchestration
  ↓
Validation / Policy
  ↓
Human Workflow
  ↓
Decision
```

A strong model can produce an unacceptable system because:

- data is stale;
- retrieval misses authoritative evidence;
- authorization is wrong;
- context is truncated;
- tools fail;
- orchestration is unreliable;
- output validation is weak;
- latency is excessive;
- human workflow is poorly designed.

Evaluate the model, configuration, components, and end-to-end system separately and together.

---

## 31.3 Start With the Decision Requirement

Define success before selecting metrics.

For AI-IDSS, ask:

1. What decision or analytical task is being supported?
2. What constitutes a useful result?
3. What errors are unacceptable?
4. Which errors are tolerable?
5. What evidence must accompany the result?
6. What latency and availability are required?
7. What security or privacy failures are unacceptable?
8. What economic outcome justifies deployment?

A generic “accuracy” number is insufficient when the real task requires evidence-grounded investment analysis.

---

## 31.4 Define the Evaluation Object and Comparison Unit

Before comparing two systems, ensure the comparison is meaningful.

Possible comparison units include:

- model vs model;
- model version vs model version;
- endpoint vs endpoint;
- provider endpoint vs self-hosted deployment;
- complete application vs complete application;
- current production system vs candidate replacement.

A model and an endpoint are not necessarily the same evaluation object. Provider infrastructure, quantization, inference settings, context handling, tool support, and serving configuration can affect observed performance.

Artificial Analysis explicitly distinguishes model creators, endpoints, providers, and systems and benchmarks customer-experienced inference performance rather than theoretical hardware maximums. urlArtificial Analysis — Benchmarking Methodologyhttps://artificialanalysis.ai/methodology

---

## 31.5 Benchmark Freshness and Version Control

Every external comparison should record:

- model/version;
- provider/endpoint;
- benchmark name/version;
- evaluation date;
- benchmark publication/update date;
- inference configuration where available;
- tool configuration;
- context conditions;
- metric definition;
- test-set status;
- source methodology.

Do not publish an undated leaderboard in an architecture decision record.

A benchmark that was useful for a 2025 model decision may still be useful as historical evidence, but should not automatically be treated as current evidence for a 2026 procurement decision.

---

## 31.6 Benchmark Accuracy vs Generalization

A benchmark score answers a question about a particular evaluation set under particular conditions. It does not automatically establish performance on the broader population of tasks.

NIST AI 800-3 explicitly distinguishes benchmark accuracy from generalized accuracy and examines the statistical assumptions required to make broader claims. urlNIST AI 800-3 — Expanding the AI Evaluation Toolbox with Statistical Modelshttps://www.nist.gov/publications/expanding-ai-evaluation-toolbox-statistical-models

Ask:

> What population does this benchmark represent?

and:

> What uncertainty surrounds the reported difference?

A one-point benchmark advantage may be irrelevant if it is within measurement uncertainty or disappears on the organization's workload.

---

## 31.7 Build a Representative Test Set

For consequential workloads, create an evaluation set that resembles the operating environment sufficiently for the claim being made.

For AI-IDSS, include where relevant:

- historical investment questions;
- financial statements;
- portfolio-company reports;
- investment memos;
- market information;
- difficult multi-document questions;
- ambiguous questions;
- missing-data cases;
- stale-data cases;
- contradictory evidence;
- adversarial prompts;
- unauthorized-access attempts;
- questions for which the correct answer is “insufficient evidence.”

Record:

- dataset version;
- provenance;
- sampling method;
- inclusion/exclusion criteria;
- labels/reference answers;
- evaluator methodology;
- date.

---

## 31.8 Leakage, Contamination, and Repeated Tuning

Evaluation evidence can become misleading if the system has effectively seen the test material.

Potential leakage includes:

- benchmark examples appearing in development data;
- public answers being available to the system;
- repeated tuning against the same evaluation set;
- retrieval indexes containing evaluation material;
- human evaluators revealing expected answers.

A test set that becomes a development target is no longer a clean independent measure of generalization.

Where independent evaluation is not possible, disclose the limitation rather than implying stronger evidence than exists.

---

## 31.9 Use Multiple Evaluation Dimensions

Possible dimensions include:

- factual correctness;
- relevance;
- completeness;
- groundedness;
- citation correctness;
- instruction adherence;
- structured-output validity;
- consistency;
- refusal behavior;
- safety;
- retrieval quality;
- tool correctness;
- latency;
- reliability;
- cost.

No single metric is universally correct.

Artificial Analysis's current Intelligence Index illustrates the continuing evolution of composite evaluation: its September 2026 v4.3 methodology combines evaluations covering agents, coding, scientific reasoning, and general capability, while also publishing cost-per-task comparisons. urlArtificial Analysis — Intelligence Index v4.3https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v4-3

This is useful evidence of how evaluation practice is evolving. It is not evidence that its composite score should become the organization's deployment metric.

---

## 31.10 Deterministic Metrics

Use deterministic metrics where the task permits them.

Examples:

- exact match;
- precision;
- recall;
- F1;
- ranking metrics;
- calibration measures;
- latency;
- error rate;
- tool-call success rate;
- schema-valid output rate.

For structured extraction, field-level correctness may be more useful than a generic language-quality score.

---

## 31.11 Generative Evaluation

Many LLM outputs cannot be evaluated adequately with exact string matching.

Possible evaluation dimensions include:

- factual correctness;
- groundedness;
- completeness;
- relevance;
- citation correctness;
- instruction adherence;
- consistency;
- safety;
- usefulness.

Human evaluation, automated evaluation, and hybrid approaches can each provide evidence.

A model-generated score is itself an evaluation instrument. It should therefore be validated rather than treated as ground truth merely because it is automated.

---

## 31.12 Human Evaluation

Human evaluation is often necessary when correctness depends on context, judgment, or domain expertise.

Control measurement risks such as:

- inconsistent graders;
- unclear rubrics;
- fatigue;
- anchoring;
- knowledge of which model produced the answer;
- conflicts of interest.

Where practical, use clear rubrics and blinded or independently assessed comparisons for consequential decisions.

Human evaluation should be treated as evidence with known limitations, not as unquestionable ground truth.

---

## 31.13 Statistical Significance Is Not Business Significance

A statistically detectable difference may be operationally irrelevant.

Conversely, a small average difference may matter greatly if it affects a high-consequence failure mode.

Therefore evaluate:

**Measured difference → uncertainty → failure distribution → operational consequence → economic consequence.**

Example:

```text
Model A: 84.0% task success
Model B: 85.0% task success
```

The one-point difference alone does not establish that B is preferable.

---

## 31.14 Error Analysis

Aggregate scores hide failure modes.

Classify failures such as:

- factual error;
- reasoning error;
- retrieval error;
- missing evidence;
- citation error;
- instruction failure;
- authorization failure;
- tool failure;
- unsupported claim;
- unsafe refusal or unsafe compliance;
- latency/timeout failure.

The architecture decision should respond to the dominant and most consequential failure modes rather than only the aggregate score.

---

## 31.15 Slice-Based Evaluation

Evaluate important subgroups and operating conditions separately.

Possible slices:

- portfolio company;
- industry;
- document type;
- language;
- question complexity;
- data freshness;
- retrieval depth;
- user role;
- market regime;
- model version;
- workload volume.

A strong average can hide a severe failure in a critical slice.

---

## 31.16 Robustness and Adversarial Evaluation

Normal test cases are insufficient for security-sensitive systems.

Test behavior under:

- malformed input;
- conflicting documents;
- prompt injection;
- misleading evidence;
- missing evidence;
- unusually long context;
- tool errors;
- unavailable data sources;
- unauthorized requests;
- ambiguous instructions.

NIST's evaluation programs treat model testing, red teaming, and field testing as complementary forms of evaluation. urlNIST ARIA Pilothttps://www.nist.gov/publications/assessing-risks-and-impacts-ai-aria-pilot-evaluation-report

---

## 31.17 Calibration and Probabilities

If a system produces probabilities, evaluate whether the probability has a defensible statistical interpretation.

For:

> “Probability of material deterioration = 68%.”

Ask:

- What model generated 68%?
- What is the target event?
- Over what time horizon?
- How was the probability calibrated?
- Against what reference data?
- What does 68% mean operationally?
- How is uncertainty represented?

An LLM's fluent statement of “68%” is not automatically a calibrated probability.

---

## 31.18 RAG Evaluation

For RAG, separate retrieval from generation.

### Retrieval evaluation

Measure where appropriate:

- relevant-evidence recall;
- ranking quality;
- authorization correctness;
- freshness;
- metadata filtering;
- source coverage.

### Generation evaluation

Measure whether the model:

- uses retrieved evidence correctly;
- avoids unsupported claims;
- cites the correct sources;
- distinguishes evidence from inference;
- acknowledges missing evidence.

A high-quality generator cannot reliably compensate for missing authoritative evidence.

---

## 31.19 Agent Evaluation

Agentic systems require evaluation beyond final-answer quality.

Evaluate:

- tool selection;
- tool-call arguments;
- authorization;
- action sequence;
- recovery from tool failures;
- termination behavior;
- excessive actions;
- side effects;
- adherence to approval boundaries.

An agent that eventually produces the right answer after performing unauthorized or unnecessary actions should not receive a passing system-level evaluation.

This is increasingly important as benchmarks themselves move from static question answering toward agentic workflows. Stanford's 2026 AI Index reports major progress on computer-use benchmarks while still observing substantial failure rates. urlStanford AI Index 2026 — Technical Performancehttps://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance

---

## 31.20 Evaluate Provider/Endpoint Behavior, Not Only Model Behavior

For paid services, the model is only one part of what the organization buys.

Evaluate:

- availability;
- rate limits;
- latency under load;
- throughput;
- error behavior;
- timeout behavior;
- model-version transitions;
- deprecation policy;
- data handling;
- logging/telemetry;
- support response;
- contractual service commitments.

This matters when comparing:

- free access;
- paid consumer access;
- developer API;
- enterprise API;
- dedicated/private deployment;
- self-hosted model.

These are not merely different prices for the same technical service.

---

## 31.21 Evaluate Open-Weight / Self-Hosted Systems Fairly

A self-hosted model should be evaluated as a **system**, not simply by its model benchmark.

Measure:

- serving configuration;
- quantization if used;
- hardware;
- utilization;
- concurrency;
- latency;
- memory pressure;
- failure/recovery;
- upgrade effort;
- security controls;
- engineering and operational cost.

A published model benchmark does not establish the performance or economics of a particular self-hosted deployment.

Similarly, a provider model benchmark does not establish the economics of the provider endpoint under the organization's workload.

---

## 31.22 Evaluate Cost Per Useful Result

Connect evaluation to economics.

Conceptually:

```text
Cost per Useful Result
=
Total System Cost
───────────────────
Accepted Useful Results
```

Include material costs for:

- inference;
- retrieval;
- infrastructure;
- tool calls;
- human review;
- corrections;
- failed attempts;
- evaluation;
- operations.

This prevents a technically strong but economically unjustified model from winning by benchmark score alone.

---

## 31.23 Evaluate Business Value Separately

Technical evaluation answers:

> Does the system work sufficiently well?

Business evaluation asks:

> Does it create enough useful value to justify deployment?

Possible measures include:

- analyst time saved;
- cycle-time reduction;
- reduction in manual research;
- reduction in avoidable errors;
- increased evidence coverage;
- improved monitoring coverage;
- higher decision throughput;
- risk-adjusted outcome improvement where measurable.

Do not claim causal business value from model capability alone.

Where the evidence is observational or based on vendor/customer reporting, label it accordingly.

Stanford's 2026 evidence shows that productivity gains are strongest in structured and measurable tasks, while broader effects vary by task and context. urlStanford AI Index 2026 — Economyhttps://hai.stanford.edu/ai-index/2026-ai-index-report/economy

---

## 31.24 Production Evaluation

Pre-production testing does not establish permanent validity.

Monitor for:

- data drift;
- workload changes;
- retrieval changes;
- model/provider changes;
- prompt changes;
- tool availability changes;
- emerging failure modes;
- changing user behavior;
- cost changes.

A production model should have a defined re-evaluation trigger, not merely a vague promise to “monitor it.”

---

## 31.25 Model Version Changes

Treat a new model version as a potentially meaningful system change.

Before promotion, compare the candidate against the current baseline using, where appropriate:

- the same evaluation set;
- the same rubric;
- security tests;
- latency measurements;
- cost measurements;
- regression tests;
- critical failure slices;
- business-value indicators.

Do not replace a model solely because its headline benchmark is higher.

---

## 31.26 Evaluation Gates

A practical deployment gate can be structured as:

```text
Candidate
   ↓
Functional Evaluation
   ↓
Domain / Decision Evaluation
   ↓
Security & Robustness
   ↓
Performance & Cost
   ↓
Critical Failure Review
   ↓
Business-Value Evidence
   ↓
Human / Independent Review
   ↓
Go / Conditional Go / No-Go
```

Thresholds should be defined by the use case and risk tolerance.

There is no universal AI evaluation score that automatically authorizes production deployment.

---

## 31.27 AI-IDSS Evaluation Matrix

| Dimension | Example measure | Gate question |
|---|---|---|
| Factuality | Evidence-supported correctness | Are material claims correct? |
| Grounding | Supported-claim rate | Can important conclusions be traced to evidence? |
| Retrieval | Relevant-evidence recall | Did the system find what it needed? |
| Calibration | Calibration/reliability analysis | Do probabilities mean what they claim? |
| Robustness | Failure rate under adversarial cases | Does behavior remain acceptable under stress? |
| Security | Unauthorized-access success | Can the system cross a policy boundary? |
| Reliability | Successful completion rate | Does it work consistently? |
| Latency | p50/p95/p99 | Is response time acceptable? |
| Cost | Cost per useful result | Is the economics acceptable? |
| Business value | Workflow/outcome measure | Does it improve the intended outcome? |
| Human utility | Expert assessment | Does it improve the intended decision workflow? |

---

## 31.28 Evaluation Evidence Record

For each important comparison, preserve:

| Field | Example |
|---|---|
| Decision | Select production model |
| Evaluation object | Complete AI-IDSS workflow |
| Candidate | Exact model/version/endpoint |
| Baseline | Current production system |
| Date | Evaluation date |
| Workload | Representative financial-analysis set |
| Metrics | Quality, reliability, latency, cost |
| Slices | Company, document type, complexity |
| Security | Authorization/adversarial results |
| Business value | Measured/estimated outcome |
| Evidence source | Internal/independent/provider |
| Uncertainty | Known limitations |
| Expiry trigger | Model/provider/workload change |

This record should accompany the architecture decision record.

---

## 31.29 Common Evaluation Anti-Patterns

### 1. Benchmark worship
Selecting the model with the highest public score.

### 2. Stale leaderboard
Using old model comparisons as though they describe the current market.

### 3. One-number evaluation
Reducing a multidimensional system to one score.

### 4. Vendor-only evidence
Accepting supplier benchmarks without examining methodology or independent evidence.

### 5. Average-only reporting
Ignoring critical failure slices.

### 6. Model-only evaluation
Ignoring RAG, tools, orchestration, security, and human workflow.

### 7. Free-vs-paid simplification
Treating subscription price as a proxy for model or service suitability.

### 8. Price-only optimization
Choosing the lowest token price without measuring useful outcomes.

### 9. No uncertainty
Reporting precise scores without explaining measurement uncertainty.

### 10. No business-value evidence
Assuming better model capability automatically creates better economics.

### 11. No production evaluation
Assuming pre-deployment testing remains valid indefinitely.

### 12. No failure taxonomy
Knowing the score but not knowing why the system fails.

---

## 31.30 Technical Challenge Questions

1. What exactly is being evaluated?
2. What decision requirement defines success?
3. Is the evaluation current enough for the model landscape?
4. What exact model/version/endpoint was tested?
5. Is the evaluation set representative?
6. How was contamination controlled?
7. Which metrics are primary and why?
8. What uncertainty surrounds each important metric?
9. What are the critical failure modes?
10. Which slices perform materially worse than the average?
11. Are probabilities calibrated?
12. Is retrieval evaluated independently from generation?
13. Are tools and agent actions evaluated?
14. Are security and authorization failures part of the evaluation?
15. Are abnormal and adversarial conditions tested?
16. Has provider/endpoint behavior been evaluated under realistic load?
17. What is the cost per useful result?
18. What evidence demonstrates business value?
19. What changes trigger re-evaluation?
20. What evidence would make us reject the architecture?

---

## 31.31 Evidence Discipline

**Fact:** NIST AI RMF calls for documented measurement, testing, uncertainty consideration, and ongoing evaluation. urlNIST AI RMF — Measurehttps://airc.nist.gov/airmf-resources/airmf/5-sec-core/

**Technical evidence:** NIST AI 800-3 addresses the distinction between benchmark accuracy and generalized accuracy and the statistical assumptions behind broader evaluation claims. urlNIST AI 800-3https://www.nist.gov/publications/expanding-ai-evaluation-toolbox-statistical-models

**Industry / technical evidence:** Current independent benchmark practice increasingly combines capability, agentic performance, price, latency, and cost-per-task rather than relying on one benchmark number. urlArtificial Analysis — Benchmarking Methodologyhttps://artificialanalysis.ai/methodology

**Inference:** The closer an evaluation approximates the actual deployment task, controls, data, operating conditions, and economic consequences, the stronger its relevance to a deployment decision, subject to the quality of the evaluation design.

**Recommendation:** Use public benchmarks for candidate discovery and context; use representative organizational evaluation for consequential decisions; use production monitoring and explicit re-evaluation triggers after deployment.

---

## 31.32 What Would Change Our Mind?

The advisor should revise an evaluation architecture if:

- a newer model materially changes the capability/cost frontier;
- the benchmark becomes saturated or unreliable;
- the supposed benchmark advantage disappears on representative organizational data;
- a cheaper model meets all decision-critical thresholds;
- a more capable model produces meaningful incremental business value;
- production monitoring reveals failure modes absent from pre-deployment testing;
- provider changes alter the service or data boundary;
- an alternative architecture materially improves reliability or reversibility.

---

## 31.33 Field Rule

> **Evaluation is not the search for the highest score. It is the disciplined production of evidence sufficient to decide whether a particular system is fit for a particular purpose at a particular point in time.**

For AI-IDSS:

> **Can we demonstrate — not merely assert — that this system produces sufficiently reliable, grounded, secure, economically justified, and useful outputs under the conditions in which the Regional Director will rely on it?**
