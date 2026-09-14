# Evidence Review — Chapter 44

## Scope

Chapter 44 compares third-party foundation models, enterprise AI platforms, self-hosted open-weight models, and proprietary foundation-model development. The review focuses on documented industry practice and authoritative risk/architecture evidence. It does not attempt to establish a universal build-versus-buy rule.

## Industry Evidence

### Morgan Stanley

Morgan Stanley publicly announced a strategic relationship with OpenAI in 2023 to build an internal capability using OpenAI technology and Morgan Stanley's own intellectual capital. The firm subsequently described AI @ Morgan Stanley Assistant and Debrief as OpenAI-powered tools, with evaluation, retrieval refinement, regression testing, and human review in the workflow. [Industry Evidence]

Sources:
- Morgan Stanley, “Key Milestone in Innovation Journey with OpenAI,” March 14, 2023.
- Morgan Stanley, “AI @ Morgan Stanley Debrief,” June 26, 2024.
- OpenAI, “Morgan Stanley uses AI evals to shape the future of financial services,” current publication.

Interpretation: strong evidence that a major financial institution has used a third-party frontier model inside a firm-specific architecture. It does not prove that the same contractual, security, cost, or model arrangement is optimal for another institution.

### JPMorganChase

JPMorganChase publicly describes LLM Suite as a proprietary enterprise generative-AI platform. Its 2024 annual report states that LLM Suite was launched to more than 200,000 colleagues and provides controlled access to leading generative-AI capabilities while protecting customer and company data. McKinsey's 2025 interview with JPMorganChase's Chief Analytics Officer describes LLM Suite as a proprietary platform powered by leading third-party LLMs. [Industry Evidence]

Sources:
- JPMorganChase 2024 Annual Report.
- McKinsey, “JPMorgan Chase’s Derek Waldron on building an AI-first bank culture,” October 29, 2025.
- JPMorganChase, “LLM Suite named 2025 Innovation of the Year.”

Interpretation: this is especially useful evidence against the false binary of “own model versus external model.” The organization can own the enterprise AI platform, controls, workflows, and data boundary while consuming multiple external models.

### BloombergGPT

Bloomberg's research paper describes BloombergGPT, a 50-billion-parameter model trained on a mixture of large financial and general-purpose datasets. The paper reports evaluation on general, open financial, and internal benchmarks and reports strong financial-task performance relative to similarly sized models. [Industry/Research Evidence]

Source:
- Wu et al., “BloombergGPT: A Large Language Model for Finance,” arXiv:2303.17564, revised December 2023.

Interpretation: strong evidence that a proprietary/domain-specific foundation model can be technically justified when an organization has distinctive domain data, model requirements, and the capability to undertake substantial model development. It is not evidence that sensitivity of data alone justifies proprietary foundation-model development.

## Authoritative Risk Evidence

### NIST Generative AI Profile

NIST AI 600-1 explicitly discusses organizations acquiring, embedding, incorporating, or using open-source or proprietary third-party GAI models and systems. It identifies potential intellectual-property, privacy, and information-security risks and suggests controls such as procurement due diligence, SLAs, SBOMs, and attestation mechanisms. [Technical/Standards Evidence]

The NIST profile therefore supports treating third-party model use as a risk-management and procurement question rather than assuming either safety or danger by default.

### BIS / Financial-Sector Evidence

BIS identifies third-party dependencies, provider concentration, data quality, privacy, security, and operational resilience as important considerations for AI adoption in financial services. BIS also notes that reliance on common AI, cloud, hardware, and data providers can create concentration and operational-resilience risks. [Supervisory Evidence]

Sources:
- BIS FSI Insight 73, “In data we trust? Emerging policy and supervisory approaches to AI data use in financial services,” March 26, 2026.
- BIS Executive Summary, “Financial stability implications of artificial intelligence.”
- BIS FSI Executive Summary, “Sound management of third-party risk,” March 25, 2026.

Interpretation: these sources provide independent sector context for the vendor-dependency analysis. They do not prescribe a specific model architecture.

## Evidence Classification

| Claim | Evidence class | Strength | Limitation |
|---|---|---|---|
| Third-party frontier models can be used in major financial institutions | Industry Evidence | Strong | Public details are incomplete |
| A firm can own an AI platform while consuming third-party models | Industry Evidence | Strong | Based on documented examples |
| Proprietary/domain-specific models can be technically justified | Industry + Research Evidence | Strong | Relevant conditions are unusually demanding |
| Third-party providers introduce dependency/concentration risk | Supervisory Evidence | Strong | Risk magnitude is context-dependent |
| Self-hosting eliminates dependency | Unsupported / rejected | — | Self-hosting creates a different dependency graph |
| Proprietary model = more secure | Unsupported / rejected | — | Security depends on controls and architecture |
| Third-party model = less secure | Unsupported / rejected | — | Security is architecture- and contract-dependent |
| Third-party models are always cheaper | Unsupported / rejected | — | TCO depends on workload and lifecycle |
| Proprietary models are always more differentiated | Unsupported / rejected | — | Differentiation may reside in data, workflow, or distribution |

## Important Evidence Distinction

The chapter deliberately distinguishes **model ownership** from **system ownership**.

An organization may own:

- identity;
- access policy;
- data architecture;
- retrieval;
- evaluation;
- orchestration;
- workflow;
- audit;
- tool authorization;
- model routing;

without owning the foundation model itself.

This distinction is an architectural inference supported by the industry cases above; it is not a universal rule.

## Transferability Analysis

### Morgan Stanley → AI-IDSS

Transferability is conceptually high for the pattern of combining proprietary knowledge, retrieval, evaluation, controls, and a third-party frontier model. Exact provider controls, contracts, workloads, and data classifications must be evaluated independently.

### JPMorganChase → AI-IDSS

Transferability is high for the architectural pattern of an enterprise AI platform decoupled from individual model providers. The scale, engineering resources, and organizational maturity are materially different from many organizations.

### BloombergGPT → AI-IDSS

Transferability is lower for the specific decision to train a proprietary foundation model because Bloomberg's data assets and model-development capabilities are unusually strong. The general lesson—proprietary models become more defensible when model capability itself is strategically differentiated—is more transferable.

## Evidence Gaps

Public evidence remains weak on:

1. complete security architectures;
2. contractual terms;
3. detailed TCO;
4. long-term provider migration;
5. failed model migrations;
6. comparative performance under identical enterprise workloads;
7. internal operational staffing costs;
8. the degree to which proprietary model investments remain economically justified after frontier-model capability improves.

These gaps are important. The advisor should not infer absence of a control or failure merely because it is not publicly disclosed.

## What Would Change Our Mind?

The recommendation toward a third-party model boundary should be weakened if repeated evidence shows that required controls cannot be obtained, provider concentration becomes materially unacceptable, or proprietary/self-hosted alternatives demonstrate a durable advantage in required capabilities and economics.

The recommendation toward proprietary foundation-model development should be weakened if external models close the relevant capability gap, internal operating costs become disproportionate, or model ownership fails to create meaningful strategic differentiation.

## Bottom Line

The strongest industry evidence does not support a simple “third-party versus proprietary” answer. It supports a more nuanced architecture pattern:

> **Organizations can own the enterprise AI boundary while consuming external model capability, and they can selectively own model capability where the model itself creates strategic value.**

The advisor should therefore locate the control boundary and strategic moat before deciding where model ownership belongs.
