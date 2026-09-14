# Evidence Review — Chapter 16

## Purpose

Tests Chapter 16 for unsupported factual claims, hardware/vendor bias, and recommendations presented as universal rules.

## Primary Evidence

- NIST SP 800-145 defines cloud computing, including rapid elasticity and SaaS/PaaS/IaaS: https://csrc.nist.gov/pubs/sp/800/145/final
- NIST SP 500-322 provides a methodology for evaluating cloud services against SP 800-145: https://www.nist.gov/publications/evaluation-cloud-computing-services-based-nist-sp-800-145
- Kubernetes documents HorizontalPodAutoscaler behavior: https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/

## Claim Review

| Claim | Classification | Review |
|---|---|---|
| Production deployment requires more than model capability | Architecture principle | Appropriate framing; no empirical failure-rate claim. |
| CPU/GPU choice depends on workload | Technical reasoning | Correctly workload-dependent. |
| Model weights are only part of memory consumption | Technical principle | Exact consumption remains implementation-dependent. |
| Quantization can affect memory and quality | Technical principle | Exact impact requires evaluation. |
| HPA adjusts replicas using observed metrics | Technical Evidence | Supported by Kubernetes documentation. |
| Model version should be traceable for material outputs | Recommendation | Architecture recommendation for AI-IDSS assurance. |
| Fallback may change decision properties | Inference / risk | Requires workload-specific evaluation. |
| Cost per useful result is useful | Recommendation / analytical construct | Not presented as a standard accounting definition. |

## Iteration 1 — Evidence Hardening

The chapter deliberately avoids vendor-specific hardware recommendations. It does not claim that GPUs, Kubernetes, self-hosting, or any particular serving framework is universally required.

## Iteration 2 — Semantic Review

Key distinctions were checked:

- model capability vs production capability;
- model artifact vs serving layer;
- scale-up vs scale-out;
- throughput vs latency;
- availability vs analytical quality;
- benchmark performance vs workload performance;
- model version vs application version;
- fallback availability vs output equivalence.

## Iteration 3 — AI-IDSS Architecture Review

The chapter was checked against:

```text
AI-IDSS
  ↓
API / orchestration
  ↓
Model / analytical services
  ↓
Serving
  ↓
Compute
  ↓
Infrastructure
```

Cross-cutting controls remain identity, security, evaluation, observability, cost, versioning, and audit. Model deployment does not authorize investment decisions; the human decision boundary remains intact.

## Deliberate Non-Claims

The chapter does not claim that:

- GPUs are always better than CPUs;
- a particular GPU vendor is required;
- Kubernetes is required;
- autoscaling is always beneficial;
- one model is always preferable to multiple models;
- parameter count alone determines infrastructure;
- cloud is always cheaper;
- self-hosting is always cheaper or safer;
- benchmark latency equals production latency;
- quantization has a universal quality impact;
- one serving framework is mandatory.

## Advisor Review Checklist

Before accepting a deployment proposal, require workload definition, representative benchmarks, concurrency and peak assumptions, measured memory behavior, latency decomposition, failure/fallback behavior, version traceability, rollback evidence, security review of inference logs, cost model, explicit assumptions, and evidence that the deployment meets the actual AI-IDSS service objective.

## Confidence

**High confidence:** NIST and Kubernetes terminology and behavior described above.

**Moderate confidence:** Recommendations around measurement, version traceability, fallback transparency, and cost-per-useful-result. These are recommendations, not universal standards.

**Uncertainty:** Hardware performance, model quality, serving efficiency, and cloud pricing vary by model, workload, implementation, region, and time. Current vendor-specific decisions require fresh workload-specific testing.

## Bottom Line

The advisor should replace “Which GPU/server should we buy?” with:

> **What measured deployment configuration satisfies the required quality, latency, reliability, security, scalability, and economic objectives under the actual workload?**
