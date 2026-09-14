# Chapter 30 — Iteration 4 Final Evidence & Adversarial Review

## Review status

**PASS — final for current scope**

Review passes:

1. Model-selection substance and architecture review
2. Evidence / claim-classification review
3. Adversarial review of benchmark validity, workload fit, economics, deployment boundary, model change, routing, and fallback semantics
4. Cross-chapter consistency review against Chapters 16–18, 19–26, 27–29

## Evidence hardening

### 1. Model selection is not a universal ranking problem

**Classification:** Architecture recommendation.

Model choice is evaluated against the intended workload, trustworthiness requirements, deployment conditions, operational constraints, economics, and decision consequences. NIST AI RMF supports documenting intended use, evaluation conditions, validity/reliability, generalizability limits, and comparison against appropriate benchmarks; it does not prescribe a universal model-selection algorithm.

### 2. Benchmark results are conditional evidence

**Classification:** Technical evidence + inference.

A benchmark result describes performance under a defined test methodology. It should not be silently generalized to a different production workload. NIST AI RMF Measure calls for evaluation under conditions similar to deployment and documentation of generalizability limitations. NIST AI 800-3 further emphasizes the distinction between benchmark accuracy and generalized accuracy.

### 3. Whole-system evaluation is required for enterprise architecture decisions

**Classification:** Architecture recommendation.

The relevant unit may be the complete system: model, prompt/context, retrieval, tools, orchestration, validation, policy, and human workflow. This is especially important for AI-IDSS because the final decision-support behavior is not determined by the base model alone.

### 4. Model selection must include non-capability constraints

**Classification:** Architecture inference.

Security/data boundary, identity integration, reliability, latency, cost, operational responsibility, auditability, and dependency risk can eliminate an otherwise capable candidate. These constraints should not be hidden inside an undifferentiated weighted score.

### 5. Cost per useful result is an advisory metric

**Classification:** Recommendation.

The proposed metric is a decision aid, not an accounting standard. It is intended to expose system-level cost, including retries, retrieval, infrastructure, evaluation, operations, and human review where material.

### 6. Model routing is a trade-off, not a default optimization

**Classification:** Architecture recommendation.

Multiple models can improve task fit or economics, but routing introduces classifier, policy, evaluation, consistency, and operational complexity. Diversity should be justified by measured benefit.

### 7. Fallback models can change semantics

**Classification:** Architecture recommendation.

A fallback should not silently produce an output whose meaning or reliability differs materially from the primary path. Consequential workflows should define acceptable degradation states explicitly.

### 8. Model identifiers do not guarantee behavioral immutability

**Classification:** Architecture warning.

Provider-managed services may evolve behind a stable interface. Reproducibility therefore requires recording the effective model identifier/version and relevant configuration, while recognizing that provider-controlled behavior can change.

## Current technical evidence incorporated

- NIST AI RMF 1.0 and current AIRC material: valid/reliable AI, representative evaluation, deployment-similar testing, documented generalizability limitations, and ongoing monitoring. NIST currently states that AI RMF 1.0 is being revised.
- NIST AI 800-3 (2026): benchmark accuracy and generalized accuracy are distinct evaluation questions and benchmark interpretation depends on estimands and assumptions.
- NIST AI 800-4 (2026): post-deployment monitoring is important because controlled pre-deployment evaluation cannot capture all real-world dynamics; monitoring methods remain an evolving field.
- MLCommons MLPerf: standardized inference benchmarks provide reproducible workload-specific performance evidence, with explicit scenarios, metrics, datasets, and quality targets. Recent MLPerf work also demonstrates that end-to-end RAG and agentic workloads require evaluation beyond a single-model throughput number.

## Adversarial questions

### Benchmark adversaries

- Is the benchmark actually representative of the production task?
- Is the test set contaminated, exposed, or otherwise unsuitable for the intended comparison?
- Are inference settings materially different?
- Does the benchmark measure capability while the business problem depends on reliability or evidence quality?
- Has the benchmark saturated enough that small ranking differences have little decision value?

### Workload adversaries

- Does the model perform acceptably on difficult, ambiguous, contradictory, and insufficient-evidence cases?
- Does long context improve useful performance or merely increase token capacity and cost?
- Does tool use change the model's effective failure surface?
- Does RAG quality dominate model quality for this workload?
- Does human review capacity constrain the useful system throughput?

### Architecture adversaries

- Does a model candidate violate a hard security or data-boundary requirement?
- Does routing add more failure modes than it removes?
- Can a fallback model silently alter the semantics of a consequential output?
- Can a provider change behavior without a corresponding evaluation trigger?
- Does self-hosting merely transfer operational and security responsibility rather than remove it?

### Economic adversaries

- Is token price being mistaken for total system cost?
- Are failed calls, retries, evaluation, observability, infrastructure, and human review included?
- Does a cheaper model generate enough additional correction/review work to become more expensive per useful result?
- Are contractual minimums or capacity commitments materially changing the economics?

## Cross-chapter consistency

### Chapters 16–18

Model selection feeds compute/deployment, scalability, and reliability. The selected model must therefore be evaluated with the serving workload, latency distribution, capacity requirements, degradation behavior, and recovery strategy rather than as an isolated benchmark object.

### Chapters 19–22

Security, identity, data protection, and AI-specific threats remain architectural constraints. A model's apparent capability does not override authorization, data-boundary, threat-model, or recovery requirements.

### Chapters 23–26

Integration, APIs, connectors, and AI-IDSS architecture determine the actual system boundary in which the model operates. Model evaluation must therefore include those components where they materially affect behavior.

### Chapters 27–29

Chapter 27 establishes probability semantics and decision-policy separation. Chapter 28 separates explanation from evidence. Chapter 29 separates recommendation from human decision and authorization. Model selection must preserve all three distinctions.

## Decision rule

The advisor should not recommend a model merely because it wins a public leaderboard.

The recommendation should be expressible as:

> **For workload W, under evaluation conditions E and data/security boundary D, candidate M satisfies the hard constraints and provides the best demonstrated trade-off among task quality, reliability, latency, cost, operational responsibility, and dependency risk. The conclusion remains valid only within the stated evidence and evaluation window.**

## Important nonclaims

This review does not establish that:

- any specific model is currently best;
- larger models are superior for all enterprise tasks;
- open-weight models are safer or cheaper;
- managed APIs are safer or more expensive;
- self-hosting is preferable;
- multi-model routing is always beneficial;
- public benchmarks are sufficient for procurement;
- one evaluation metric can summarize model quality;
- model behavior remains unchanged behind a stable API;
- human review is universally required.

## Falsifiability

The current recommendation should change if target-workload evidence demonstrates materially different task utility, reliability, security/data-boundary suitability, economics, or operational behavior; or if provider/model changes invalidate the evidence on which the recommendation was based.

## Final editorial conclusion

**PASS — HARDENED / FINAL FOR CURRENT SCOPE.**

Chapter 30 now treats model selection as a dated, workload-specific architecture decision supported by evidence rather than as a universal leaderboard ranking. It preserves the book's central discipline: hard constraints first, measurable workload evaluation second, trade-offs third, and explicit uncertainty throughout.
