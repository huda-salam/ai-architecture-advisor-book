# Evidence Review — Chapter 26: AI-IDSS Reference Architecture

## Review status

**Pass 1 — architecture/substance:** completed.

**Pass 2 — evidence hardening:** completed.

**Pass 3 — adversarial architecture and editorial consistency:** completed.

The chapter is intentionally a reference architecture, not a prescriptive technology stack. Recommendations are separated from authoritative framework facts.

## Primary sources checked

### NIST AI RMF 1.0

NIST AI RMF 1.0 is a voluntary, use-case-agnostic framework intended to help organizations manage AI risks. It identifies trustworthiness characteristics including validity/reliability, safety, security/resilience, accountability/transparency, explainability/interpretability, privacy, and fairness with harmful bias managed.

Source: NIST, *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*, NIST AI 100-1, January 2023.

https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10

**Classification:** Authoritative framework / fact.

### NIST AI RMF current status

NIST's current AI RMF page states that AI RMF 1.0 is being revised. The book therefore treats AI RMF 1.0 as a versioned framework rather than an immutable final reference.

Source: NIST, *AI Risk Management Framework*.

https://www.nist.gov/itl/ai-risk-management-framework

**Classification:** Current authoritative status / fact.

### NIST AI RMF Core

The NIST AI RMF Core describes Govern, Map, Measure, and Manage functions. Current resources include expectations around documented human oversight, mapping risks in third-party components, pre-deployment and ongoing evaluation, independent review where appropriate, and production monitoring.

Source: NIST AI RMF Core.

https://airc.nist.gov/airmf-resources/airmf/5-sec-core/

**Classification:** Authoritative framework guidance / fact.

### NIST Generative AI Profile

NIST AI 600-1 is a cross-sectoral profile for generative AI. It notes that generative AI contexts may require different human-AI configurations and may warrant additional human review, tracking, documentation, and management oversight depending on context and risk.

Source: NIST, *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile*, AI 600-1, July 2024; page updated April 2026.

https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence

**Classification:** Authoritative framework profile / fact.

### NIST 2026 post-deployment monitoring report

NIST's March 2026 report discusses challenges in monitoring deployed AI systems and notes that post-deployment monitoring is important while practices, methodologies, and terminology remain comparatively nascent and fragmented.

Source: NIST, *Challenges to the monitoring of deployed AI systems: Center for AI Standards and Innovation*, NIST AI 800-4, March 2026.

https://www.nist.gov/publications/challenges-monitoring-deployed-ai-systems-center-ai-standards-and-innovation

**Classification:** Current technical evidence / fact.

## Claim classification

| Claim | Classification | Evidence basis |
|---|---|---|
| AI systems should be considered socio-technical systems | Framework principle | NIST AI RMF 1.0 |
| AI trustworthiness includes validity/reliability, security/resilience, accountability/transparency, explainability/interpretability, privacy and fairness dimensions | Fact | NIST AI RMF 1.0 |
| AI RMF uses Govern, Map, Measure, Manage | Fact | NIST AI RMF Core |
| Human oversight should be defined according to context and risk | Framework guidance | NIST AI RMF / GenAI Profile |
| Third-party components should be included in AI risk mapping | Fact | NIST AI RMF Core |
| AI systems should be tested before deployment and monitored during operation | Fact | NIST AI RMF Core |
| Post-deployment monitoring remains an evolving practice area | Current technical evidence | NIST AI 800-4 (2026) |
| AI-IDSS should preserve an explicit source-to-decision evidence chain | Architecture recommendation | Application of data/integration/model/governance principles |
| AI should not silently become the system of record | Architecture recommendation | Authority/data architecture reasoning |
| Deterministic calculations and authorization should be implemented outside free-form model generation where practical | Architecture recommendation | Security/integration/system-design reasoning |
| Human approval should initially remain at consequential investment decisions | Context-specific recommendation | AI-IDSS risk and accountability reasoning; not a universal standard requirement |
| A single “giant agent” is undesirable for the reference architecture | Architecture recommendation | Least privilege, testability, failure-boundary and governance reasoning |
| More data automatically produces better investment decisions | **Not claimed** | Deliberately rejected universal assumption |
| RAG is always required | **Not claimed** | Use-case dependent |
| Agents are always required | **Not claimed** | Use-case dependent |
| Cloud is always required | **Not claimed** | Deployment constraint dependent |
| A specific vendor or model is required | **Not claimed** | Vendor-neutral architecture |

## Architecture consistency review

### Chapters 8–11

The reference architecture preserves the separation between:

- application/interface;
- orchestration;
- agents/workflows;
- models;
- RAG/knowledge;
- data;
- infrastructure.

It also keeps the LLM from becoming the whole architecture.

### Chapters 12–14

The architecture preserves:

- systems of record;
- data quality;
- integration boundaries;
- provenance/lineage;
- semantic integrity;
- data contracts.

### Chapters 15–18

Cloud, compute, scalability, and reliability are treated as platform capabilities rather than the business architecture itself.

### Chapters 19–22

Security, identity, data protection, and AI-specific threats are cross-cutting controls. The model is not treated as the authorization boundary.

### Chapters 23–25

Enterprise integration, APIs, and connectors are preserved as explicit capability boundaries rather than collapsed into the AI orchestration layer.

## Adversarial review

### CTO objection: “This architecture is too complicated.”

**Response:** The diagram is a reference decomposition, not a requirement to deploy every component separately. Components can be combined when the workload, risk, scale, and operating model justify doing so.

### Head of AI objection: “The LLM can do most of this.”

**Response:** Some tasks can be performed by LLMs, but authorization, deterministic calculations, source authority, transaction semantics, and other control properties require explicit system boundaries. The architecture does not deny model capability; it limits where probabilistic behavior should carry authority.

### Vendor objection: “Our platform already provides the entire stack.”

**Response:** A platform may provide implementations for many capabilities, but the advisor must still evaluate source authority, identity, security, data movement, model semantics, reliability, evidence, cost, and exit options independently.

### Security objection: “Human approval solves the risk.”

**Response:** Human review is a control boundary, not a substitute for secure data, authorization, model evaluation, evidence integrity, or auditability.

### Data architect objection: “The warehouse is the source of truth.”

**Response:** A warehouse may be authoritative for specific analytical products, but source authority is domain/use-case specific. The architecture explicitly requires authority to be defined rather than assumed.

### AI/ML objection: “The 68% probability can simply be generated by the LLM.”

**Response:** The chapter deliberately rejects this as an unexplained architecture. A consequential numerical probability needs defined semantics and an appropriate analytical basis. The LLM may synthesize or explain an analytical result, but it should not invent statistical meaning.

## Important non-claims

The chapter does not claim that:

- NIST AI RMF is a mandatory regulation;
- NIST AI RMF 1.0 is the only valid AI governance framework;
- the four AI RMF functions are a literal runtime pipeline;
- every AI-IDSS needs an agent;
- every AI-IDSS needs an LLM;
- every AI-IDSS needs RAG;
- every organization needs a lakehouse, vector database, API gateway, event bus, or microservices;
- human-in-the-loop guarantees safety;
- auditability proves correctness;
- provenance proves source accuracy;
- explainability proves a model is valid;
- production monitoring can detect every AI failure;
- a reference architecture guarantees trustworthy AI.

## Falsifiability

The architecture should be reconsidered if evidence demonstrates that another decomposition provides better decision quality, security, reliability, cost, interoperability, or reversibility for the target use case.

Specific tests should include:

- end-to-end evidence reconstruction;
- cross-portfolio authorization testing;
- stale/missing data scenarios;
- model/provider outage;
- connector failure;
- prompt-injection and tool-abuse scenarios;
- model evaluation under representative workload;
- recovery testing;
- cost and latency measurement;
- replacement of a major model/provider;
- human decision usability and error analysis.

## Review conclusion

**PASS — 3 review passes completed.**

No material blocking issue was identified for the current scope. The chapter should remain version-aware because NIST AI RMF 1.0 is currently being revised and AI monitoring practices continue to evolve.
