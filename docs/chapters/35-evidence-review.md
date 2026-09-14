# Evidence Review — Chapter 35: Cost / Performance Optimization

## Review Status

**Three-pass review completed.**

### Pass 1 — Architecture review

The chapter was reviewed as an architecture decision framework rather than a collection of cost-saving tips. It distinguishes:

- workload definition;
- quality constraints;
- latency and throughput;
- infrastructure utilization;
- model and retrieval economics;
- human correction cost;
- security and reliability constraints;
- experimentation and measurement;
- lifecycle optimization.

### Pass 2 — Evidence review

Primary/established industry sources reviewed include:

1. AWS Well-Architected Framework — performance trade-offs and cost-aware architecture decisions.
2. AWS Well-Architected Machine Learning Lens — optimization across the ML lifecycle.
3. FinOps Foundation — AI unit economics and AI infrastructure strategy.

These sources support the general architectural proposition that cost and performance should be evaluated against workload requirements and business outcomes rather than optimized independently.

### Pass 3 — Semantic/adversarial review

The chapter was checked for overclaiming. In particular, it does **not** claim that:

- the cheapest model is always best;
- larger accelerators are always faster or more economical;
- caching is always beneficial;
- batching always reduces cost;
- autoscaling always reduces cost;
- smaller context is always better;
- managed services are always cheaper;
- self-hosting is always cheaper;
- model routing is always beneficial;
- infrastructure cost is equivalent to total AI cost.

Those propositions are workload-dependent and are treated as hypotheses to evaluate.

## Evidence Classification

### Fact / Technical Evidence

AWS Well-Architected guidance recommends factoring cost into architectural decisions and evaluating performance improvements through workload requirements, experimentation, and trade-offs. It explicitly warns against assuming that every performance improvement should be implemented without considering its impact and trade-offs.

### Industry Evidence

AWS's Machine Learning Lens identifies resource optimization, inference optimization, appropriate compute sizing, lifecycle cost optimization, and cost-aware ML architecture as recurring concerns across the ML lifecycle.

FinOps guidance identifies AI unit economics, cost attribution, time to business value, and infrastructure-model selection as important aspects of managing AI economics.

### Recommendation

The chapter's principal recommendation is:

> Optimize the complete AI system for the lowest justified cost of delivering the required quality, evidence, security, reliability, and performance.

This is an **advisor recommendation**, not a universal industry standard.

### Inference

The concept of **cost per useful result** extends conventional infrastructure metrics by incorporating whether an output is actually accepted and useful. This is a reasoning framework intended to prevent infrastructure optimization from hiding downstream correction and failure costs.

### Assumption

The organization can measure or reasonably estimate enough of the downstream workflow to distinguish generated outputs from accepted useful results. Where that cannot be measured reliably, technical unit metrics should be used with explicit uncertainty.

## Important Evidence Boundaries

### 1. Optimization is workload-specific

No single model, accelerator, serving architecture, cache strategy, or scaling strategy is universally optimal.

### 2. Performance is multi-dimensional

Latency, throughput, concurrency, utilization, availability, and quality answer different questions. One metric cannot substitute for the others.

### 3. Cost is broader than inference price

Inference is only one potential component. Retrieval, storage, networking, observability, security, engineering, operations, and human review may materially affect total economics.

### 4. Lower cost can increase total cost

An optimization that lowers infrastructure spending but increases errors, human review, incident exposure, or decision losses may be economically inferior.

### 5. Optimization can change semantics

Caching, context reduction, fallback models, batching, and model routing can change the behavior or freshness of the system. They therefore require evaluation, not merely implementation.

## AI-IDSS Evidence Standard

For AI-IDSS, a proposed optimization should demonstrate:

1. baseline cost;
2. baseline quality;
3. baseline latency/reliability where relevant;
4. explicit optimization hypothesis;
5. representative workload test;
6. cost impact;
7. quality impact;
8. security impact;
9. reliability impact;
10. human-review impact;
11. operational complexity introduced;
12. rollback path.

The optimization should be rejected or redesigned if a hard requirement is violated, regardless of the nominal infrastructure saving.

## What Would Change the Recommendation?

The recommendation should change when production or controlled-evaluation evidence demonstrates that:

- the expected savings do not materialize;
- quality materially deteriorates;
- evidence coverage becomes insufficient;
- security or authorization boundaries weaken;
- reliability falls below the approved threshold;
- human correction effort increases materially;
- the optimization introduces disproportionate complexity;
- workload characteristics materially change.

## Sources

- AWS Well-Architected Framework — Evaluate trade-offs and customer/workload impact: https://docs.aws.amazon.com/wellarchitected/latest/framework/perf_architecture_evaluate_trade_offs.html
- AWS Well-Architected Framework — Factor cost into architectural decisions: https://docs.aws.amazon.com/wellarchitected/latest/framework/perf_architecture_factor_cost_into_architectural_decisions.html
- AWS Machine Learning Lens — Cost Optimization: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/cost-optimization.html
- AWS Machine Learning Lens — Design Principles: https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/design-principles.html
- FinOps Foundation — Unit Economics: https://www.finops.org/framework/capabilities/unit-economics/
- FinOps Foundation — Choosing an AI Approach and Infrastructure Strategy: https://www.finops.org/wg/choosing-an-ai-approach-and-infrastructure-strategy/
