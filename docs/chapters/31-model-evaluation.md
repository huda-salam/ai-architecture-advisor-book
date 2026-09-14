# Chapter 31 — Model Evaluation

## 31.1 Why Model Evaluation Is an Architecture Concern

Model selection without evaluation is procurement by benchmark, intuition, or vendor reputation.

For the technical advisor, the question is not simply:

> “Which model scores highest?”

It is:

> “Which model or model configuration produces sufficiently reliable outcomes for this use case, under the conditions in which the system will actually operate?”

NIST AI RMF treats measurement as an ongoing function: AI systems should be tested before deployment and evaluated regularly in operation, with metrics, uncertainty, documentation, and independent review where appropriate. [NIST AI RMF](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) · [NIST AI RMF Measure](https://airc.nist.gov/airmf-resources/playbook/measure/)

## 31.2 Evaluate the System, Not Only the Model

An enterprise AI result is produced by a chain:

`Data → Retrieval → Prompt/Context → Model → Tools → Orchestration → Output`

Therefore a model can perform well in isolation while the deployed AI system performs poorly because of:

- incomplete or stale data;
- incorrect retrieval;
- authorization errors;
- context truncation;
- tool failures;
- poor orchestration;
- latency or timeout behavior;
- weak output validation.

**Recommendation:** evaluate the model, the configuration, and the end-to-end system separately and then together.

## 31.3 Start With the Decision Requirement

Evaluation metrics should follow the decision the system supports.

For AI-IDSS, define first:

1. What decision or analytical task is being supported?
2. What constitutes a useful result?
3. What errors are unacceptable?
4. Which errors are tolerable?
5. What evidence must accompany the result?
6. What latency and availability are required?
7. What security or privacy failures are unacceptable?

Only then select evaluation metrics.

A generic “accuracy” number is insufficient when the actual task requires evidence-grounded investment analysis.

## 31.4 Define the Evaluation Target

An evaluation must identify what is being measured.

Possible targets include:

- foundation model capability;
- fine-tuned model;
- prompt/model configuration;
- RAG pipeline;
- agent workflow;
- complete AI application;
- human-AI decision process.

These are different evaluation objects and should not be compared as though they were interchangeable.

## 31.5 Benchmark Accuracy vs Generalization

A benchmark score answers a question about the evaluation set. It does not automatically establish performance on the broader population of tasks.

NIST AI 800-3 explicitly distinguishes **benchmark accuracy** from **generalized accuracy** and shows that different statistical assumptions and methods may be required to quantify them and their uncertainty. [NIST AI 800-3](https://www.nist.gov/publications/expanding-ai-evaluation-toolbox-statistical-models)

This distinction is particularly important when a vendor presents a small percentage difference between models as evidence of superiority.

The advisor should ask:

> “What population do you believe this benchmark represents?”

and:

> “What uncertainty surrounds the reported difference?”

## 31.6 Build a Representative Test Set

The evaluation set should resemble the actual operating environment sufficiently for the intended claim.

For AI-IDSS, a useful test set may contain:

- historical investment questions;
- financial statements;
- portfolio-company reports;
- investment memos;
- market information;
- difficult multi-document questions;
- ambiguous questions;
- missing-data cases;
- stale-data cases;
- adversarial prompts;
- unauthorized-access attempts;
- questions for which the correct answer is “insufficient evidence.”

**Inference:** a benchmark that does not represent the deployment task provides limited evidence for deployment suitability.

## 31.7 Holdout Data and Leakage

Evaluation data should be protected from contamination by development activities where possible.

Potential leakage includes:

- test examples appearing in prompts or development data;
- benchmark answers being available to the system;
- repeated tuning against the same evaluation set;
- human evaluators inadvertently revealing expected answers;
- retrieval indexes containing evaluation material when they should not.

NIST's recent evaluation programs emphasize controlled evaluation environments and the importance of avoiding train/test contamination in rigorous testing. [NIST AITE](https://www.nist.gov/news-events/news/2026/07/announcing-nists-artificial-intelligence-technology-evaluation-aite)

## 31.8 Deterministic Metrics

Use deterministic metrics where the task permits them.

Examples include:

- exact match;
- precision;
- recall;
- F1;
- ranking metrics;
- calibration measures;
- latency;
- error rate;
- tool-call success rate.

The appropriate metric depends on the task. No single metric is universally correct.

For structured extraction, for example, field-level correctness may be more useful than a generic language-quality score.

## 31.9 Generative Evaluation

Many LLM outputs cannot be evaluated adequately with exact string matching.

Possible dimensions include:

- factual correctness;
- relevance;
- completeness;
- groundedness;
- citation correctness;
- instruction adherence;
- consistency;
- refusal behavior;
- safety;
- usefulness.

Human evaluation, automated evaluation, and hybrid approaches can each provide evidence. The advisor should understand what each method can and cannot establish.

A model-generated score is itself an evaluation instrument. It should therefore be validated rather than treated as ground truth merely because it is automated.

## 31.10 Reference Answers and Rubrics

For high-value tasks, define evaluation criteria before comparing systems.

A rubric can specify:

| Dimension | Example criterion |
|---|---|
| Factuality | Claims agree with authoritative evidence |
| Grounding | Material claims are supported by retrieved evidence |
| Completeness | Important factors are not omitted |
| Relevance | Response addresses the decision question |
| Citation | Evidence can be traced to source material |
| Safety | Sensitive or unauthorized content is not disclosed |
| Actionability | Output supports the intended workflow |

The rubric should be versioned. Otherwise model comparisons can change simply because the evaluator changed the definition of “good.”

## 31.11 Human Evaluation

Human evaluation is often necessary when correctness depends on context, judgment, or domain expertise.

However, human evaluation introduces its own measurement risks:

- inconsistent graders;
- unclear rubrics;
- fatigue;
- anchoring;
- evaluator knowledge of the model being tested;
- conflicts of interest.

For consequential AI-IDSS evaluations, independent or blinded assessment can reduce some sources of bias. NIST AI RMF explicitly identifies independent assessment as a potentially useful practice. [NIST AI RMF Measure](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)

## 31.12 Statistical Significance Is Not Business Significance

A measured difference may be statistically detectable without being operationally important.

Conversely, an apparently small difference can matter greatly when the cost of an error is high.

Therefore compare:

**Measurement difference → uncertainty → operational consequence → economic consequence.**

Example:

Model A: 84.0% task success

Model B: 85.0% task success

The one-point difference alone does not establish that B is preferable. The advisor should ask about uncertainty, error distribution, task composition, latency, cost, and consequences of failures.

## 31.13 Error Analysis

Aggregate scores hide failure modes.

After measuring performance, classify failures:

- factual error;
- reasoning error;
- retrieval error;
- missing evidence;
- citation error;
- instruction failure;
- authorization failure;
- tool failure;
- hallucination;
- unsafe refusal or unsafe compliance;
- latency/timeout failure.

The architecture decision should respond to the dominant failure modes rather than only the aggregate score.

## 31.14 Slice-Based Evaluation

Evaluate important subgroups or operating conditions separately.

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
- model version.

A strong overall average can hide a severe failure in a critical slice.

## 31.15 Robustness and Adversarial Evaluation

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

NIST's current evaluation work includes model testing, red teaming, and field testing as complementary evaluation approaches. [NIST ARIA Pilot](https://www.nist.gov/publications/assessing-risks-and-impacts-ai-aria-pilot-evaluation-report)

## 31.16 Calibration and Probabilities

If a system produces probabilities, evaluate whether those probabilities have a defensible interpretation.

For example:

> “Probability of material deterioration = 68%.”

The advisor should ask:

- What model generated 68%?
- What is the target event?
- Over what time horizon?
- How was the probability calibrated?
- Against what reference data?
- What does 68% mean operationally?
- How is uncertainty represented?

An LLM's fluent statement of “68%” is not automatically a calibrated probability.

## 31.17 RAG Evaluation

For RAG, separate retrieval from generation.

### Retrieval evaluation

Measure whether the required evidence was retrieved:

- recall of relevant evidence;
- ranking quality;
- authorization correctness;
- freshness;
- metadata filtering;
- source coverage.

### Generation evaluation

Measure whether the model:

- uses the retrieved evidence correctly;
- avoids unsupported claims;
- cites the right sources;
- distinguishes evidence from inference;
- acknowledges missing evidence.

A high-quality generator cannot compensate reliably for missing authoritative evidence.

## 31.18 Agent Evaluation

Agentic systems require evaluation beyond final-answer quality.

Evaluate:

- tool selection;
- tool-call arguments;
- authorization decisions;
- action sequence;
- recovery from tool failures;
- termination behavior;
- excessive actions;
- side effects;
- adherence to approval boundaries.

An agent that eventually produces the right answer after performing unauthorized or unnecessary actions should not receive a passing system-level evaluation.

## 31.19 Evaluation Under Production Conditions

Pre-production testing does not establish permanent validity.

NIST AI RMF calls for regular evaluation and production monitoring because system behavior, risks, data, and operating conditions can change. [NIST AI RMF](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)

Monitor for:

- data drift;
- workload changes;
- retrieval changes;
- model/provider changes;
- prompt changes;
- degraded tool availability;
- emerging failure modes;
- changing user behavior.

## 31.20 Model Version Changes

A new model version should be treated as a potentially meaningful system change.

Before promotion, compare the candidate against the current production baseline using:

- the same evaluation set where appropriate;
- the same rubric;
- security tests;
- latency measurements;
- cost measurements;
- regression tests;
- critical failure slices.

Do not replace a model solely because its headline benchmark is higher.

## 31.21 Evaluation Gates

A practical deployment gate can be structured as:

```text
Candidate Model
      ↓
Functional Evaluation
      ↓
Domain / Decision Evaluation
      ↓
Security & Robustness Evaluation
      ↓
Performance & Cost Evaluation
      ↓
Critical Failure Review
      ↓
Human / Independent Review
      ↓
Go / Conditional Go / No-Go
```

The exact thresholds should be defined by the use case and risk tolerance.

## 31.22 Evaluation Matrix for AI-IDSS

| Dimension | Example measure | Gate question |
|---|---|---|
| Factuality | Evidence-supported correctness | Are material claims correct? |
| Grounding | Supported-claim rate | Can important conclusions be traced to evidence? |
| Retrieval | Relevant-evidence recall | Did the system find what it needed? |
| Calibration | Calibration error / reliability analysis | Do probabilities mean what they claim? |
| Robustness | Failure rate under adversarial cases | Does behavior remain acceptable under stress? |
| Security | Unauthorized-access success | Can the system cross a policy boundary? |
| Reliability | Successful completion rate | Does it work consistently? |
| Latency | p50/p95/p99 | Is response time acceptable? |
| Cost | Cost per useful result | Is the economics acceptable? |
| Human utility | Expert assessment | Does it improve the intended workflow? |

## 31.23 Cost per Useful Result

A model with higher raw quality may still be the wrong architecture if the incremental quality is economically irrelevant.

Evaluate:

`Total evaluation cost + inference cost + retrieval cost + tool cost + human review cost`

against:

`Useful, acceptable decision-support outcomes`.

This connects Chapter 31 to Chapter 34's AI TCO analysis.

## 31.24 Common Evaluation Anti-Patterns

### 1. Benchmark worship

Selecting the model with the highest public benchmark.

### 2. One-number evaluation

Reducing a multidimensional system to one score.

### 3. Test-set overfitting

Repeatedly tuning against the same evaluation set.

### 4. Vendor-controlled evidence only

Accepting supplier benchmarks without examining methodology or assumptions.

### 5. Average-only reporting

Ignoring critical failure slices.

### 6. Model-only evaluation

Ignoring RAG, tools, orchestration, security, and human workflow.

### 7. No uncertainty

Reporting precise scores without explaining statistical or measurement uncertainty.

### 8. No production evaluation

Assuming pre-deployment testing remains valid indefinitely.

### 9. No failure taxonomy

Knowing the score but not knowing why the system fails.

### 10. No decision threshold

Measuring performance without defining what result is sufficient for deployment.

## 31.25 Technical Challenge Questions

1. What exactly is being evaluated: model, configuration, application, or complete system?
2. What decision requirement defines success?
3. Is the evaluation set representative of deployment?
4. How was test-set contamination controlled?
5. Which metrics are primary and why?
6. What uncertainty surrounds each important metric?
7. What are the critical failure modes?
8. Which slices perform materially worse than the average?
9. Are probabilities calibrated?
10. Is retrieval evaluated independently from generation?
11. Are tool use and agent actions evaluated?
12. Are security and authorization failures part of the evaluation?
13. Are adversarial and abnormal conditions tested?
14. Is there an independent or blinded evaluation path?
15. What changes would invalidate the current evaluation?
16. How will the system be evaluated after deployment?
17. What is the regression gate for a model upgrade?
18. What evidence would justify choosing the cheaper model?
19. What evidence would justify choosing the more capable model?
20. What result would make us reject the proposed architecture?

## 31.26 Evidence Discipline

Classify evaluation claims explicitly.

**Fact:** NIST AI RMF calls for documented testing, measurement, uncertainty, regular evaluation, and assessment of validity and reliability. [NIST AI RMF](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)

**Technical evidence:** ISO/IEC 25059 provides a quality model for AI systems, including characteristics such as functional correctness, robustness, transparency, and intervenability. [ISO/IEC 25059](https://www.iso.org/standard/80655.html)

**Industry/technical evidence:** NIST's 2026 AI evaluation work demonstrates the continuing development of statistical and operational evaluation methods, including controlled evaluation and explicit treatment of uncertainty. [NIST AI 800-3](https://www.nist.gov/publications/expanding-ai-evaluation-toolbox-statistical-models)

**Recommendation:** AI-IDSS should use a layered evaluation program rather than a single benchmark.

**Inference:** The closer an evaluation approximates the actual deployment task, data, controls, and operating conditions, the stronger its relevance to a deployment decision—subject to the quality of the evaluation design.

## 31.27 What Would Change Our Mind?

The advisor should revise an evaluation architecture if evidence shows that:

- a simpler metric provides equivalent decision assurance;
- the supposedly representative test set is demonstrably unrepresentative;
- a benchmark difference disappears under uncertainty analysis;
- an alternative model performs materially better on critical production slices;
- a cheaper model meets all decision-critical thresholds;
- a more expensive model produces meaningful improvements in consequential outcomes;
- production monitoring reveals failure modes absent from pre-deployment testing.

## 31.28 Field Rule

> **Never approve an AI model because it has a high benchmark score. Approve it only when the evaluation evidence demonstrates that the model and surrounding system satisfy the requirements, constraints, risks, and economics of the intended use.**

For AI-IDSS, the final question is:

> **Can we demonstrate—not merely assert—that this system produces sufficiently reliable, grounded, secure, and useful outputs under the conditions in which the Regional Director will rely on it?**
