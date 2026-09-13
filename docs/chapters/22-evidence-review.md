# Evidence Review — Chapter 22: AI-Specific Threats

## 1. Review Objective

This review tests Chapter 22 against primary AI-security and risk-management sources. It deliberately separates established threat terminology from architecture recommendations and systems-security inference.

## 2. Primary Sources

- [NIST AI 100-2 E2025 — Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations](https://csrc.nist.gov/pubs/ai/100/2/e2025/final)
- [NIST AI 100-2 E2023 — Adversarial Machine Learning](https://csrc.nist.gov/pubs/ai/100/2/e2023/final)
- [NIST AI RMF 1.0](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10)
- [NIST AI RMF Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)
- [NIST AI RMF Resources](https://www.nist.gov/itl/ai-risk-management-framework/ai-risk-management-framework-resources)
- [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/)

## 3. Claim Classification

### AI Attack Taxonomy

**Claim:** NIST's adversarial-ML taxonomy covers attacks by lifecycle stage, attacker capability, objectives, and consequences, including evasion, poisoning, privacy, and misuse for generative AI.

**Status:** Fact.

**Basis:** NIST AI 100-2 E2025.

### Prompt Injection

**Claim:** Prompt injection and indirect prompt injection are recognized attack classes for generative AI systems.

**Status:** Fact.

**Basis:** NIST AI 100-2 E2023/E2025 taxonomy.

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

## 4. Architecture Recommendations

### Model Is Not the Security Boundary

**Claim:** Authorization and consequential authority should be enforced by deterministic system controls rather than relying only on model instructions.

**Status:** Architecture recommendation.

**Reasoning:** A probabilistic model can interpret instructions but should not be the sole enforcement mechanism for resource authority. This extends the identity and access-control principles established in Chapters 19–20.

### Treat Retrieved Content as Potentially Untrusted

**Claim:** RAG content should be treated as potentially untrusted input unless its authority and integrity are established.

**Status:** Architecture recommendation / security inference.

**Reasoning:** Retrieved content can contain instructions or manipulated information, and NIST's adversarial-ML taxonomy identifies indirect prompt injection as a relevant attack pattern.

### Constrain Agent Authority

**Claim:** Agent permissions should be limited to the minimum authority necessary for the task, with stronger controls for consequential or irreversible actions.

**Status:** Architecture recommendation.

**Reasoning:** The consequence of model manipulation increases when model-controlled actions can change enterprise state.

### Test Attack Paths

**Claim:** Security evaluation should test end-to-end attack paths rather than relying only on model-quality benchmarks.

**Status:** Architecture recommendation grounded in NIST AI RMF's measurement/evaluation orientation.

## 5. Important Non-Claims

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
- AI-specific threats replace ordinary application, infrastructure, identity, and supply-chain threats.

## 6. AI-IDSS-Specific Reasoning

For AI-IDSS, threat analysis should prioritize consequences such as:

- cross-portfolio information disclosure;
- manipulated investment evidence;
- unsupported risk alerts;
- unauthorized tool access;
- incorrect or premature recommendations;
- denial of service during critical decision windows;
- compromise of model or data supply chains.

The advisor should evaluate the complete path:

**Input → Retrieval → Model → Orchestration → Tool → Enterprise System → Output → Human Decision**

The important security question is where an attacker can enter that path and what authority exists after entry.

## 7. Evidence Quality

| Topic | Evidence quality | Basis |
|---|---|---|
| Adversarial ML taxonomy | High | NIST AI 100-2 E2025 |
| Prompt / indirect prompt injection | High | NIST AI 100-2 |
| Data poisoning | High | NIST AI 100-2 |
| Confabulation | High | NIST AI RMF GenAI Profile |
| Lifecycle security | High | NIST AI RMF / AI 100-2 |
| LLM application threat coverage | High | OWASP 2026 community reference |
| Model-not-authorization-engine recommendation | High conceptual basis | Architecture synthesis from Chapters 19–20 and security principles |
| RAG trust-boundary recommendation | Moderate-to-high | Threat taxonomy + architecture reasoning |
| Agent authority recommendation | Moderate-to-high | Least-privilege/security architecture reasoning |

## 8. Version and Source Discipline

AI-security terminology changes quickly. The book should prefer current primary or established sources when discussing current threat rankings or mitigations.

The current OWASP reference used in this chapter is the 2026 LLM Top 10, published August 3, 2026. OWASP describes it as a community-driven guide and maps it to other frameworks. It is useful industry evidence, but it is not a formal NIST or ISO standard.

NIST AI 100-2 E2025 is the current adversarial-ML taxonomy used here. NIST states that the taxonomy is intended to support common terminology and that the work is expected to evolve as the threat landscape changes.

## 9. Advisor Review Checklist

Before approving an AI security architecture, verify:

- Are assets and consequences explicit?
- Are untrusted inputs identified?
- Are RAG and external content treated according to their trust level?
- Is authorization independent of model instructions?
- Are agent permissions bounded?
- Are tool outputs validated before becoming new control inputs?
- Are cross-tenant and cross-portfolio paths tested?
- Are model, dataset, dependency, and connector supply chains covered?
- Are resource-exhaustion paths bounded?
- Are attack scenarios tested after material model/prompt changes?
- Can the system fail safely if the model behaves maliciously?
- Is residual risk documented?

## 10. Falsifiability

The recommendations should be revised when controlled testing demonstrates that an assumed attack path is infeasible, a mitigation is ineffective, a simpler control provides equivalent containment, or a change in system authority materially changes the consequence of compromise.

## 11. Bottom Line

AI-specific security is not a separate security universe. It is the intersection of ordinary enterprise security with new attack surfaces created by learned behavior, probabilistic generation, retrieved context, model dependencies, and tool-mediated authority.

For AI-IDSS, the decisive question is:

> **If the model, retrieved context, or an AI dependency were manipulated, could that manipulation cross an authorization boundary and create unacceptable business impact?**

If the answer is yes, the architecture needs stronger containment—not merely a better prompt.
