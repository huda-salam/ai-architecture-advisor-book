# Evidence Review — Chapter 22: AI-Specific Threats

## 1. Review Objective

This review tests Chapter 22 against primary AI-security and risk-management sources. It separates established threat terminology from architecture recommendations, systems-security inference, and current industry evidence.

The chapter is deliberately **consequence-oriented**: the existence of an AI attack does not by itself establish its likelihood, impact, or mitigation effectiveness in a particular deployment.

## 2. Primary Sources

- [NIST AI 100-2 E2025 — Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations](https://csrc.nist.gov/pubs/ai/100/2/e2025/final)
- [NIST AI 100-2 E2025 errata / potential updates](https://csrc.nist.gov/files/pubs/ai/100/2/e2025/final/docs/nist.ai.100-2e2025_potential_updates.pdf)
- [NIST AI 100-2 E2023 — Adversarial Machine Learning](https://csrc.nist.gov/pubs/ai/100/2/e2023/final)
- [NIST AI RMF 1.0](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10)
- [NIST AI RMF Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)
- [NIST AI RMF Resources](https://www.nist.gov/itl/ai-risk-management-framework/ai-risk-management-framework-resources)
- [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/)
- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [OWASP GenAI Exploit Round-up Q1 2026](https://genai.owasp.org/2026/04/14/owasp-genai-exploit-round-up-report-q1-2026/)

## 3. Source-Scope and Version Discipline

### NIST AI 100-2 E2025

**Status:** Final report, published March 24, 2025.

NIST describes AI 100-2 E2025 as a taxonomy and terminology report for adversarial machine learning and states that it is intended to evolve as new developments emerge. NIST has also published a document listing potential corrections; those proposed corrections are not themselves official changes to the final report. Therefore the book should cite the final report as the authoritative taxonomy while avoiding unnecessary dependence on individual index identifiers that may be affected by errata.

### OWASP Agentic Applications 2026

**Status:** Industry/community security reference, not a formal NIST or ISO standard.

OWASP describes its 2026 Agentic Applications Top 10 as a globally peer-reviewed framework developed with industry experts. It is useful evidence for agent-specific threat categories such as behavior hijacking, tool misuse, and identity/privilege abuse, but should not be presented as a universal regulatory or standards requirement.

### OWASP Exploit Round-up

**Status:** Industry incident evidence, not prevalence statistics.

The Q1 2026 report describes selected major AI-related incidents and exploit disclosures. It explicitly is not intended to be exhaustive. Therefore incidents can demonstrate that a class of failure or attack has occurred; they do not establish its probability in the user's architecture.

## 4. Claim Classification

### AI Attack Taxonomy

**Claim:** NIST's adversarial-ML taxonomy classifies attacks in relation to AI system type, lifecycle stage, attacker goals/objectives, attacker capabilities, and knowledge, covering attacks such as evasion, poisoning, privacy, and misuse across predictive and generative AI.

**Status:** Fact.

**Basis:** NIST AI 100-2 E2025.

### Prompt Injection

**Claim:** Prompt injection and indirect prompt injection are recognized attack patterns for generative AI systems.

**Status:** Fact.

**Basis:** NIST AI 100-2 taxonomy.

### Data Poisoning

**Claim:** Data poisoning is an adversarial technique that can target AI data and learning processes.

**Status:** Fact.

**Basis:** NIST adversarial-ML taxonomy.

### Confabulation

**Claim:** NIST's Generative AI Profile identifies confabulation as generated content that can be erroneous, false, internally inconsistent, or divergent from input while appearing credible.

**Status:** Fact.

**Basis:** NIST AI RMF Generative AI Profile.

### Security as Lifecycle Risk

**Claim:** AI security must be considered across development, deployment, use, and evaluation rather than only at inference time.

**Status:** Fact / framework principle.

**Basis:** NIST AI RMF and NIST AI 100-2.

## 5. Threat Existence, Likelihood, Impact, and Control Effectiveness

These are separate propositions:

1. **Threat existence:** Has the attack class been demonstrated or recognized?
2. **Exposure:** Is the relevant attack surface present in this architecture?
3. **Likelihood:** How plausible is successful exploitation under the defined threat model?
4. **Impact:** What business consequence follows if exploitation succeeds?
5. **Control effectiveness:** Does the proposed control actually reduce likelihood, impact, or both?

Evidence for one proposition must not silently be used as evidence for another.

For example, an industry incident can demonstrate that agent privilege abuse has occurred. It does not establish that the same attack has a high probability against a particular AI-IDSS deployment.

## 6. Architecture Recommendations

### Model Is Not the Security Boundary

**Claim:** Authorization and consequential authority should be enforced by system controls rather than relying only on model instructions.

**Status:** Architecture recommendation.

**Reasoning:** A probabilistic model can interpret instructions but should not be the sole enforcement mechanism for resource authority. This extends the identity and access-control principles established in Chapters 19–20.

### Treat Retrieved Content as Potentially Untrusted

**Claim:** RAG content should be treated according to its established authority and integrity; content that has not earned trust should not automatically become trusted instructions.

**Status:** Architecture recommendation / security inference.

**Reasoning:** Retrieved content can contain instructions or manipulated information, and indirect prompt injection is recognized in adversarial-ML taxonomy work.

### Constrain Agent Authority

**Claim:** Agent permissions should be limited to the authority required for the task, with stronger controls for consequential, destructive, financial, or difficult-to-reverse actions.

**Status:** Architecture recommendation.

**Reasoning:** Model manipulation has greater consequence when model-controlled actions can change enterprise state. OWASP's 2026 agentic security work explicitly addresses tool misuse and identity/privilege abuse. This does not establish one universal approval mechanism; the appropriate control depends on consequence and threat model.

### Test Attack Paths

**Claim:** Security evaluation should test end-to-end attack paths rather than relying only on model-quality benchmarks.

**Status:** Architecture recommendation grounded in NIST AI RMF's measurement/evaluation orientation.

### Separate Preventive Controls From Recovery

**Claim:** AI security architecture should consider prevention, detection, containment, and recovery rather than assuming prevention will always succeed.

**Status:** Architecture recommendation.

**Reasoning:** NIST's adversarial-ML work discusses both attacks and mitigations and recognizes limitations of existing mitigations. The exact control layers depend on the threat model.

## 7. AI-IDSS Attack-Path Model

For AI-IDSS, threat analysis should follow:

**Untrusted Input → Retrieval/Processing → Model Influence → Orchestration → Authorization → Tool → Enterprise System → Output → Human Decision**

The advisor should identify at each boundary:

- what can be influenced;
- what is trusted;
- which identity is acting;
- what authority is available;
- what validation occurs;
- what consequence follows from failure;
- which control prevents, detects, contains, or recovers from the failure.

This deliberately connects Chapter 22 to Chapters 19–21 without redefining their subjects.

## 8. Agentic Threat Boundary

OWASP's Agentic Applications 2026 work provides useful industry vocabulary for risks involving autonomous or semi-autonomous agents, including tool misuse and identity/privilege abuse. The chapter therefore treats agent security as an architectural extension of the identity, authorization, data-protection, and tool boundaries established earlier.

The key distinction is:

> **An agent is not dangerous merely because it is autonomous; risk increases when autonomy is combined with authority, sensitive data, external connectivity, and consequential actions.**

This is an architectural inference, not a universal quantitative law.

## 9. Important Non-Claims

The chapter deliberately does not claim that:

- prompt injection can be completely prevented by a single filter;
- RAG is inherently insecure;
- every retrieved document is malicious;
- every embedding or vector store is equally sensitive;
- human approval guarantees safety;
- a highly accurate model is secure against adversarial manipulation;
- an internal model is inherently trustworthy;
- a particular vendor, model, framework, or security product eliminates AI risk;
- one threat taxonomy is exhaustive for every deployment;
- an observed incident establishes attack probability for this organization;
- an OWASP ranking establishes regulatory priority;
- AI-specific threats replace ordinary application, infrastructure, identity, and supply-chain threats;
- every agent action requires the same approval workflow;
- every AI system needs an agent-specific security architecture.

## 10. AI-IDSS-Specific Reasoning

For AI-IDSS, threat analysis should prioritize consequences such as:

- cross-portfolio information disclosure;
- manipulated investment evidence;
- unsupported or materially misleading risk alerts;
- unauthorized tool access;
- incorrect or premature recommendations;
- denial of service during critical decision windows;
- compromise of model or data supply chains.

The advisor should distinguish **model error**, **data compromise**, **authorization failure**, and **agent/tool compromise** even when they produce similar final symptoms.

## 11. Evidence Quality

| Topic | Evidence quality | Basis |
|---|---|---|
| Adversarial ML taxonomy | High | NIST AI 100-2 E2025 |
| Prompt / indirect prompt injection | High | NIST AI 100-2 |
| Data poisoning | High | NIST AI 100-2 |
| Confabulation | High | NIST AI RMF GenAI Profile |
| Lifecycle security | High | NIST AI RMF / AI 100-2 |
| Agentic threat categories | High for industry reference | OWASP Agentic Applications 2026 |
| Recent exploit evidence | High as incident evidence | OWASP Q1 2026 report; not prevalence evidence |
| Model-not-authorization-engine recommendation | High conceptual basis | Architecture synthesis from Chapters 19–20 and security principles |
| RAG trust-boundary recommendation | Moderate-to-high | Threat taxonomy + architecture reasoning |
| Agent authority recommendation | Moderate-to-high | Least-privilege/security architecture reasoning + agentic threat evidence |
| Specific mitigation effectiveness | Context-dependent | Must be established by architecture-specific testing |

## 12. Cross-Chapter Consistency Review

### Chapter 19 — AI Security Model

Chapter 19 establishes that the model is not the security boundary and that security controls remain under explicit system control. Chapter 22 applies that principle to attack paths and consequences.

### Chapter 20 — Identity & Access Control

Chapter 20 owns identity, authentication, authorization, delegation, and privilege boundaries. Chapter 22 must not redefine those controls; it asks how AI-specific attacks may attempt to cross them.

### Chapter 21 — Data Protection

Chapter 21 owns protection of sensitive data throughout its lifecycle. Chapter 22 identifies attacks that may cause disclosure or manipulation and points back to Chapter 21 for the data-protection controls.

### Chapter 14 — Data Governance & Lineage

Chapter 22 may require provenance or source integrity when analyzing poisoning, but it should not redefine governance, ownership, or lineage models.

## 13. Advisor Review Checklist

Before approving an AI security architecture, verify:

- Are assets and business consequences explicit?
- Are untrusted inputs identified?
- Is the relevant attack surface actually present?
- Are likelihood and impact assessed separately from threat existence?
- Are RAG and external content treated according to their trust level?
- Is authorization independent of model instructions?
- Are agent permissions bounded by task and consequence?
- Are tool outputs validated before becoming new control inputs?
- Are cross-tenant and cross-portfolio paths tested?
- Are model, dataset, dependency, and connector supply chains covered?
- Are resource-exhaustion paths bounded?
- Are attack scenarios tested after material model/prompt/agent changes?
- Can the system contain a malicious or compromised model without granting it enterprise authority?
- Is there a recovery path when preventive controls fail?
- Is residual risk documented?

## 14. Falsifiability

The recommendations should be revised when controlled testing demonstrates that:

- an assumed attack path is infeasible;
- a mitigation is ineffective or creates unacceptable new risk;
- a simpler control provides equivalent containment;
- a different control placement materially reduces blast radius;
- a change in system authority changes the consequence of compromise;
- new evidence materially changes the threat model.

## 15. Bottom Line

AI-specific security is not a separate security universe. It is the intersection of ordinary enterprise security with attack surfaces created by learned behavior, probabilistic generation, retrieved context, model dependencies, and tool-mediated authority.

For AI-IDSS, the decisive question is:

> **If the model, retrieved context, or an AI dependency were manipulated, could that manipulation cross an authorization boundary and create unacceptable business impact?**

If the answer is yes, the architecture needs stronger containment—not merely a better prompt.