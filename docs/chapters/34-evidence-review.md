# Evidence Review — Chapter 34: AI Total Cost of Ownership

## Review Objective

This review checks the economic and architectural claims in Chapter 34 against authoritative FinOps material and distinguishes definitions, evidence, inference, assumptions, and recommendations.

## 1. TCO Definition

**Claim:** TCO is broader than a provider invoice or infrastructure bill.

**Evidence:** The FinOps terminology defines Total Cost of Ownership as a comprehensive assessment of IT and other costs across enterprise boundaries over time, including acquisition, management/support, communications, end-user expenses, labor, downtime opportunity cost, training, and productivity losses.

**Classification:** Fact.

**Source:** FinOps Foundation terminology.

## 2. AI Has Cross-Cutting Cost Complexity

**Claim:** AI spending can span cloud, data center, SaaS, AI vendors, and other technology categories and can be difficult to forecast.

**Evidence:** FinOps for AI identifies cross-category spending, granular consumption, heterogeneous pricing, token-based billing, forecasting uncertainty, and rapidly evolving tools as distinctive AI FinOps considerations.

**Classification:** Industry evidence.

**Source:** FinOps for AI.

## 3. Unit Economics

**Claim:** Technology cost should be related to measurable workload or business outcomes rather than considered only as aggregate spend.

**Evidence:** The FinOps Unit Economics capability explicitly connects technology spending to value and defines resource-efficiency and business-unit metrics, including cost per request, workload, token, transaction, or case.

**Classification:** Industry framework / recommendation.

**Source:** FinOps Framework — Unit Economics.

## 4. Cost per Useful Outcome

**Claim:** Cost per useful outcome can be more decision-relevant than raw token cost.

**Evidence:** FinOps for AI explicitly recommends use-case economics and examples such as cost per customer query resolved or document summarized. The concept is therefore supported as a management approach.

**Classification:** Industry evidence + recommendation.

**Caution:** “More decision-relevant” depends on the decision context. Token cost remains useful for resource efficiency.

## 5. Self-Hosted vs Managed

**Claim:** Neither managed AI services nor self-hosting is universally cheaper.

**Basis:** This is an inference from cost structure. Managed services transfer portions of infrastructure and operational responsibility into service pricing; self-hosting introduces infrastructure, serving, operations, security, capacity, and lifecycle costs.

**Classification:** Inference / architectural recommendation.

**Required evidence for a concrete decision:** workload volume, utilization, pricing/contract terms, staffing, reliability requirements, security requirements, and migration assumptions.

## 6. Human Review

**Claim:** Human review is a cost component of AI systems.

**Basis:** Review consumes labor and operational capacity.

**Classification:** Fact at the economic level; the exact cost is an organization-specific estimate.

**Important:** The chapter does not recommend eliminating human review to reduce cost. For consequential AI-IDSS use, risk and decision quality may justify human oversight.

## 7. Failure Cost

**Claim:** Failed outputs, retries, incidents, and remediation can contribute to lifecycle cost.

**Classification:** Architectural/economic inference grounded in ordinary cost accounting and operational reality.

**Recommendation:** Estimate failure-related cost where material; do not represent the estimate as a universal percentage.

## 8. Sensitivity Analysis

**Claim:** TCO decisions should expose assumptions whose variation could change the recommendation.

**Classification:** Decision-analysis recommendation.

**Rationale:** A forecast based on uncertain volume, utilization, pricing, staffing, or quality assumptions should not be presented as a deterministic result.

## 9. No Universal Cost Formula

The chapter deliberately does **not** claim that one TCO formula is universally required. The formulas are analytical constructs intended to make assumptions visible. Financial accounting treatment should follow the organization's applicable accounting policies.

## 10. AI-IDSS Economic Boundary

The AI-IDSS cost chain includes data integration, storage, RAG/analytics, model inference, orchestration, validation, human review, security, evaluation, and observability.

**Classification:** Architectural model / recommendation.

It is not presented as a mandatory universal cost taxonomy.

## 11. Research Evidence

Recent research has also treated AI infrastructure economics as a lifecycle problem, including capital, operating, hardware-refresh, power/cooling, networking, and workload dynamics. Such research can inform architecture analysis but should not be generalized into universal cost savings because results depend on the studied infrastructure and assumptions.

Example: Stojkovic et al. (2025) present a TCO-driven framework for AI datacenter lifecycle management. Their reported savings are results for their evaluated framework, not a universal expectation for enterprise AI deployments.

**Classification:** Research evidence, context-specific.

## 12. Claims Intentionally Avoided

The chapter does not claim:

- cloud is always cheaper;
- self-hosting is always cheaper;
- managed APIs are always cheaper;
- GPUs are always the dominant cost;
- tokens are the best unit of economics;
- TCO can be forecast precisely;
- human review should be minimized;
- higher AI spend is inherently bad;
- lower unit cost automatically means better architecture;
- one accounting treatment applies to every organization;
- a particular vendor has the lowest lifecycle cost without current workload evidence.

## 13. Advisor Evidence Checklist

Before approving an AI architecture on economic grounds, request:

- workload assumptions;
- current measured usage where available;
- vendor pricing/contract evidence;
- infrastructure estimates;
- staffing assumptions;
- shared-cost allocation method;
- human-review assumptions;
- failure assumptions;
- security/governance costs;
- migration and exit costs;
- scenario analysis;
- sensitivity analysis;
- cost-per-useful-outcome definition;
- uncertainty and excluded costs.

## Bottom Line

The strongest defensible conclusion is not that one deployment model is cheapest. It is that AI architecture decisions should evaluate lifecycle cost using a clearly defined boundary, explicit assumptions, measured usage where possible, unit economics tied to meaningful outcomes, and sensitivity to uncertainty.

**Advisor principle:** Optimize for economically sustainable useful outcomes, not for the lowest visible technology invoice.