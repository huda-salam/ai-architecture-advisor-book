# Evidence Review — Chapter 30: Model Selection

## Review purpose

This review hardens the factual claims in Chapter 30 and separates authoritative evidence from architecture recommendations, assumptions, and uncertainty.

## Primary evidence

### 1. NIST AI RMF 1.0
Source: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10

Supports:
- AI trustworthiness is multidimensional.
- Validity and reliability are foundational characteristics.
- Tradeoffs between trustworthiness characteristics can occur.
- Model/algorithm selection and human oversight affect trustworthiness.

Editorial classification: **Fact / framework position**.

Important limitation: AI RMF is voluntary and use-case agnostic; it does not prescribe one model-selection algorithm.

### 2. NIST AI RMF Core
Source: https://airc.nist.gov/airmf-resources/airmf/5-sec-core/

Supports:
- AI systems should be demonstrated to be valid and reliable.
- Generalizability limitations should be documented.
- AI systems should be evaluated for safety and security risks.
- Model explanation/documentation and contextual interpretation are part of the framework's measurement outcomes.

Editorial classification: **Fact / framework position**.

### 3. NIST AI RMF trustworthiness characteristics
Source: https://airc.nist.gov/airmf-resources/airmf/3-sec-characteristics/

Supports:
- Accuracy measurements should use clearly defined and realistic test sets representative of expected use.
- Test methodology should be documented.
- Robustness/generalizability matters beyond training conditions.

Editorial classification: **Fact / framework position**.

### 4. NIST AI 800-3 (2026)
Source: https://www.nist.gov/publications/expanding-ai-evaluation-toolbox-statistical-models

Supports:
- Benchmark accuracy and generalized accuracy answer different evaluation questions.
- Benchmark evaluation may rely on assumptions about representativeness.
- Uncertainty should be quantified appropriately.
- Evaluation methodology affects the interpretation of benchmark results.

Editorial classification: **Technical evidence**.

Important caution: The report does not say public benchmarks are useless. It argues for explicit estimands, assumptions, and statistically principled interpretation.

### 5. Stanford CRFM HELM
Source: https://crfm.stanford.edu/helm/latest/

Supports:
- Holistic model evaluation can use multiple scenarios and metrics.
- A single aggregate metric can hide different strengths and weaknesses.

Editorial classification: **Research evidence**.

### 6. Liang et al., Holistic Evaluation of Language Models
Source: https://arxiv.org/abs/2211.09110

Supports:
- Multi-metric evaluation across scenarios is useful for comparing language models.
- Accuracy alone is not the only relevant evaluation dimension.

Editorial classification: **Peer-reviewed/research evidence**.

## Claim calibration

### Claim: “Model selection is an architecture decision.”
Classification: **Recommendation / advisor framing**.

Rationale: The statement synthesizes the fact that model choice affects deployment, security, data, cost, reliability, and system behavior. It is not a quotation from NIST.

### Claim: “The highest benchmark model can still be the wrong enterprise choice.”
Classification: **Inference supported by technical evidence**.

Rationale: Benchmark results answer a defined evaluation question; NIST explicitly distinguishes benchmark accuracy from generalized accuracy and emphasizes realistic test sets. Enterprise choice also includes non-capability constraints. The exact conclusion remains an architecture inference.

### Claim: “Choose technology class before model.”
Classification: **Recommendation**.

Rationale: This is a decision discipline designed to prevent unnecessary complexity. It is not a universal standard requirement.

### Claim: “A self-hosted model is not automatically safer or cheaper.”
Classification: **Recommendation / inference**.

Rationale: Self-hosting changes control and operational responsibilities. Safety and cost depend on the resulting architecture and controls. No universal superiority is asserted.

### Claim: “Public benchmark ≠ production performance.”
Classification: **Architecture warning / inference**.

Rationale: A benchmark is evidence under specified conditions; it does not by itself establish external validity for another workload. NIST's evaluation guidance supports this caution.

### Claim: “Cost per useful outcome is better than token price alone.”
Classification: **Recommendation**.

Rationale: The proposed metric incorporates system-level costs and accepted results. It is a useful economic framing, not a mandated accounting standard.

### Claim: “A fallback model must not silently change decision meaning.”
Classification: **Architecture recommendation**.

Rationale: Different models can have materially different capabilities and failure modes. The recommendation follows from preserving semantic integrity in consequential workflows.

## Explicit assumptions

The chapter assumes that:

1. the organization can define representative workloads;
2. sufficient evaluation data or expert labeling can be obtained;
3. model candidates can be tested under sufficiently comparable conditions;
4. business impact can be translated into technical acceptance criteria;
5. the organization is able to retain evaluation and configuration records.

These are assumptions, not facts about every organization.

## Important nonclaims

The chapter deliberately does **not** claim that:

- one model family is universally best;
- larger models are always better;
- smaller models are always more economical;
- open-weight models are always safer or cheaper;
- closed APIs are always more secure;
- public benchmarks are irrelevant;
- one model should serve all workloads;
- multi-model routing is always beneficial;
- human review is always required;
- self-hosting eliminates vendor dependency;
- a larger context window guarantees better long-context performance.

## Falsifiability

The chapter's recommendations should be revised when:

- target-workload evaluation shows a different model materially outperforming the selected model;
- new evidence changes the risk or data-boundary assessment;
- provider terms or deployment options change materially;
- total cost at production scale changes the economic conclusion;
- reliability or failure severity exceeds approved thresholds;
- model version changes invalidate prior evaluation evidence.

## Review result

**Status: EVIDENCE-HARDENED**

The chapter's central position is supported by NIST's multi-dimensional trustworthiness and evaluation guidance and by research demonstrating multi-metric, scenario-based model evaluation. Architecture-specific recommendations are explicitly labeled as recommendations or inferences rather than presented as standards or universal facts.

## Freshness note

NIST AI RMF 1.0 is being revised as of 2026. Current NIST pages should therefore be consulted when the chapter is re-reviewed. NIST's AI measurement work is evolving, including newer guidance on benchmark evaluation and TEVV.
