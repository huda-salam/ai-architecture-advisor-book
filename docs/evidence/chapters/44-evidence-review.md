# Evidence Review — Chapter 44: Third-Party LLM vs Proprietary Model Cases

## Review Objective

This review evaluates the chapter's central question: where should an enterprise place architectural ownership when choosing between third-party foundation models, enterprise model platforms, self-hosted open-weight models, and proprietary foundation-model development?

The review deliberately separates **industry evidence**, **supervisory evidence**, **research evidence**, **inference**, and **advisor recommendation**. No case is treated as proof of universal optimality.

## 1. Core Architectural Claim

**Claim:** Model ownership and system ownership are different decisions.

**Evidence:** Documented financial-services implementations show organizations using externally supplied model capability while retaining substantial control over enterprise data, workflow, evaluation, access, and governance. Other documented work demonstrates that proprietary/domain-specific model development is technically possible and can be strategically justified under particular conditions.

**Classification:** Industry evidence + architectural inference.

**Important limitation:** Public case studies rarely disclose complete contracts, security controls, staffing, TCO, or migration experience.

## 2. Morgan Stanley

Morgan Stanley publicly describes its collaboration with OpenAI and the evolution of AI @ Morgan Stanley Assistant and Debrief. Current OpenAI case material reports evaluation against real-world use cases, expert feedback, retrieval refinement, regression testing, and human review. It reports more than 98% adoption among advisor teams. urlOpenAI — Morgan Stanley AI casehttps://openai.com/index/morgan-stanley/

**Classification:** Industry evidence.

**What it supports:** A major financial institution can place third-party frontier-model capability inside a firm-specific architecture.

**What it does not prove:** That the same provider, contract, security model, economics, or architecture is optimal elsewhere.

## 3. JPMorganChase

JPMorganChase's LLM Suite is an internally developed enterprise AI platform. Public reporting describes it as providing controlled access to generative-AI capabilities and using leading external models underneath the platform.

**Classification:** Industry evidence.

**What it supports:** The build-versus-buy boundary can be placed above the foundation model. Enterprise ownership can focus on identity, controls, data, workflows, evaluation, and model access.

**Limitation:** The bank's scale, engineering resources, procurement leverage, and organizational maturity are not representative of every enterprise.

## 4. BloombergGPT

The BloombergGPT research paper describes a 50-billion-parameter model trained on a mixture of financial and general-purpose data, including a substantial proprietary financial-data component. It reports evaluation across general, financial, and internal benchmarks. urlBloombergGPT research paperhttps://arxiv.org/abs/2303.17564

**Classification:** Research evidence + industry evidence.

**What it supports:** Proprietary/domain-specific model development can be technically justified when distinctive data, domain requirements, and model-development capability converge.

**Limitation:** Bloomberg's conditions are unusually demanding and therefore have limited direct transferability to a typical enterprise.

## 5. Current Financial-Services AI Offerings

OpenAI's September 2026 financial-services offering combines frontier-model reasoning with financial data providers and granular citations and reports design partnerships with Morgan Stanley and Evercore. urlOpenAI — ChatGPT for Financial Serviceshttps://openai.com/index/introducing-chatgpt-financial-services/

Google Cloud's 2026 financial-services offering similarly emphasizes governed AI platforms, enterprise connectors, provenance, multiple agents, and an ecosystem intended to support multiple model/agent choices. urlGoogle Cloud — Gemini Enterprise for Financial Serviceshttps://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-for-financial-services

**Classification:** Vendor-reported industry evidence.

**Interpretation:** These offerings are evidence of current market direction toward combining model capability with data, workflow, connectors, provenance, and governance.

**Caution:** Vendor product claims are not independent proof of superior security, economics, or architecture.

## 6. Third-Party Dependency and Concentration

BIS FSI Insight 73 states that third-party dependencies can amplify AI data-related risks, including privacy, quality, security, provenance, and compliance challenges. It also highlights concentration among major providers. urlBIS FSI Insight 73https://www.bis.org/publications/fsi-insight-73-data-we-trust-emerging-policy-and-supervisory-approaches-ai-data-use-financial-services

BIS also notes that AI systems often depend on specialized hardware, cloud services, external data providers, and pretrained models concentrated among a relatively small number of providers. urlBIS — Financial stability implications of AIhttps://www.bis.org/publications/fsi-summary-financial-stability-implications-artificial-intelligence-executive-summary

**Classification:** Supervisory evidence.

**Interpretation:** Third-party dependency is a real architectural risk in financial services. The evidence does not imply that self-hosting is automatically safer or more resilient.

## 7. Self-Hosting Does Not Eliminate Dependency

**Claim:** Self-hosting changes the dependency graph rather than eliminating dependency.

**Basis:** A self-hosted model still depends on model weights/publishers, runtimes, hardware or cloud infrastructure, networking, security tooling, specialist talent, updates, and supporting software.

**Classification:** Architectural inference.

**Required caution:** The relative concentration and controllability of these dependencies must be measured for the specific architecture.

## 8. Proprietary Does Not Mean More Secure

**Claim:** Proprietary model ownership is not a security property by itself.

**Basis:** Security depends on deployment architecture, identity, authorization, data controls, supply chain, monitoring, patching, evaluation, and operational processes.

**Classification:** Technical/architectural principle.

NIST AI 600-1 addresses risks associated with third-party GAI systems and discusses procurement due diligence, contractual controls, SLAs, software/component transparency, and attestation. urlNIST AI RMF Generative AI Profilehttps://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence

## 9. Data Sensitivity Does Not Determine Model Ownership

**Claim:** Sensitive data alone does not logically imply that an organization must build its own foundation model.

**Classification:** Architectural inference.

**Rationale:** Data requirements can potentially be addressed through multiple control patterns, including enterprise-managed APIs, private connectivity, preprocessing, access control, contractual restrictions, controlled retrieval, self-hosted models, or proprietary infrastructure.

**Required evidence for a real decision:** Actual residency, retention, training-use, authorization, encryption, audit, jurisdiction, and contractual requirements.

## 10. Economics

The chapter does not claim that third-party models or proprietary models are universally cheaper.

The comparison must include:

- model/inference cost;
- infrastructure;
- engineering;
- security;
- operations;
- evaluation;
- reliability;
- compliance;
- vendor management;
- transition and exit;
- opportunity cost;
- expected technology obsolescence.

**Classification:** Architecture/TCO framework.

Chapter 34 provides the detailed TCO treatment.

## 11. Model Capability and Obsolescence

**Claim:** Proprietary model investments carry technological-obsolescence risk, while third-party dependence carries provider-optionality risk.

**Classification:** Inference.

**Reasoning:** External model capabilities and economics can improve after an internal investment is made; conversely, external providers can change prices, terms, access, or capabilities.

**Required evidence:** Current representative workload evaluations, current commercial terms, internal operating cost, and realistic migration assumptions.

## 12. Evidence Classification Summary

| Claim | Evidence class | Strength | Limitation |
|---|---|---|---|
| Financial institutions can deploy third-party model capability inside firm-specific architectures | Industry evidence | Strong | Public technical details incomplete |
| An enterprise can own an AI platform while consuming external models | Industry evidence | Strong | Examples are large institutions |
| Proprietary/domain-specific models can be justified | Research + industry evidence | Strong | Conditions are unusually demanding |
| Third-party dependency and concentration are material financial-sector risks | Supervisory evidence | Strong | Magnitude is context-dependent |
| Self-hosting eliminates dependency | Unsupported / rejected | — | It creates a different dependency graph |
| Proprietary model means more secure | Unsupported / rejected | — | Security depends on architecture and controls |
| Third-party model means less secure | Unsupported / rejected | — | Security and contracts are context-dependent |
| Third-party models are always cheaper | Unsupported / rejected | — | TCO is workload- and lifecycle-dependent |
| Proprietary models are always more differentiated | Unsupported / rejected | — | Differentiation can reside in data, workflow, or distribution |

## 13. Transferability to AI-IDSS

### Morgan Stanley pattern

**Transferability:** High at the architectural-pattern level.

Useful lesson: combine proprietary knowledge, permissions, retrieval, evaluation, workflow, and human oversight with externally supplied model capability where appropriate.

### JPMorganChase pattern

**Transferability:** High at the architecture-pattern level.

Useful lesson: an enterprise model-access/platform layer can provide control and optionality without requiring ownership of every foundation model.

### BloombergGPT pattern

**Transferability:** Lower for the specific decision to train a proprietary foundation model.

Useful lesson: proprietary model development becomes more defensible when model capability itself is strategically differentiated by proprietary data, domain requirements, economics, and internal capability.

## 14. Evidence Gaps

Public evidence remains weak on:

1. complete security architectures;
2. contractual terms;
3. detailed TCO;
4. long-term provider migration;
5. failed model migrations;
6. comparative performance under identical enterprise workloads;
7. internal operating staffing costs;
8. long-term economics of proprietary model investment;
9. actual concentration exposure across multiple vendors.

These gaps matter. The advisor should not infer absence of a control or failure merely because it is not publicly disclosed.

## 15. What Would Change Our Mind?

A recommendation favoring a third-party model boundary should be weakened if:

- required controls cannot be obtained;
- provider concentration becomes materially unacceptable;
- migration cannot be made credible;
- external models show a durable and material performance gap on the organization's representative workload;
- self-hosted alternatives demonstrate a durable advantage in required economics or control.

A recommendation favoring proprietary foundation-model development should be weakened if:

- external models close the relevant capability gap;
- internal operating cost becomes disproportionate;
- external model improvement materially outpaces internal development;
- model ownership fails to create meaningful strategic differentiation;
- the lifecycle cannot be sustainably funded.

## Bottom Line

The evidence does not support a simple “third-party versus proprietary” answer.

It supports a more useful architectural proposition:

> **Organizations can own the enterprise AI boundary while consuming external model capability, and they can selectively own model capability where the model itself creates strategic value.**

The advisor should therefore locate the **control boundary**, **strategic moat**, **dependency concentration**, **economic break-even**, and **exit path** before deciding where model ownership belongs.
