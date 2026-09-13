# Evidence Review — Chapter 19: AI Security Model

## 1. Purpose

This review separates established security guidance from architecture recommendations and scenario assumptions in Chapter 19.

## 2. Primary Evidence

### NIST SP 800-207 — Zero Trust Architecture

NIST defines zero trust around resource protection rather than implicit trust based on network location. Authentication and authorization are distinct functions, and access decisions are made for protected resources. [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final)

**Classification:** Technical evidence.

### NIST SP 800-207A — Cloud-Native Zero Trust

NIST extends zero-trust principles to cloud-native and multi-cloud environments, emphasizing application and service identities and granular access policies. [NIST SP 800-207A](https://csrc.nist.gov/pubs/sp/800/207/a/final)

**Classification:** Technical evidence.

### NIST AI RMF Generative AI Profile

NIST's Generative AI Profile is a companion resource to AI RMF 1.0 for incorporating trustworthiness considerations into generative-AI design, development, use, and evaluation. [NIST AI 600-1](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)

**Classification:** Technical/governance evidence.

### OWASP GenAI Security Project

OWASP's current GenAI security work identifies prompt injection, sensitive information disclosure, supply-chain risks, data/model poisoning, and other risks specific to LLM and generative-AI applications. The project currently publishes a 2026 Top 10 release while the chapter uses specific 2025 risk material where useful. [OWASP GenAI Security Project](https://owasp.org/www-project-top-10-for-large-language-model-applications/)

**Classification:** Industry security guidance.

## 3. Claims Requiring Careful Wording

### “The model is not the authorization engine.”

This is an architectural recommendation grounded in zero-trust resource protection and the distinction between authentication and authorization. It should not be presented as a quotation from NIST.

### “Prompt restrictions can be bypassed.”

OWASP explicitly discusses limitations of relying on prompt-level restrictions for sensitive-information protection. This supports treating prompts as one defense layer rather than the authorization boundary.

### “Retrieval-time authorization.”

This is an architecture recommendation derived from applying resource-level authorization to RAG. NIST does not prescribe one universal RAG implementation.

### “Human approval for consequential actions.”

This is a recommendation for the AI-IDSS context, not a universal security standard. The appropriate authority boundary depends on action impact, control effectiveness, and organizational requirements.

### “Security control hierarchy.”

The ordering in the chapter is an architectural heuristic. It is not a formal NIST or OWASP ranking.

## 4. Important Non-Claims

The chapter deliberately does **not** claim that:

- zero trust makes a system secure by itself;
- private networks eliminate AI security risk;
- self-hosting makes a model secure;
- a vector database is inherently secure or insecure;
- prompt injection can be solved completely by prompt filtering;
- encryption replaces authorization;
- human approval eliminates risk;
- one security architecture fits every organization;
- OWASP's risk list is a complete threat model;
- a model provider's enterprise controls are sufficient without reviewing the actual service and contract;
- a security product automatically proves that an architecture is secure.

## 5. Threat-Model Discipline

Security recommendations should follow this sequence:

```text
Asset
  ↓
Trust boundary
  ↓
Actor
  ↓
Threat
  ↓
Attack path
  ↓
Control
  ↓
Test
  ↓
Residual risk
```

A control without an identified attack path should not automatically be treated as valuable. Conversely, an identified attack path without an effective enforcement point is an architecture gap.

## 6. Evidence Hierarchy

For an actual enterprise security review, prefer:

1. Applicable law/regulation and binding organizational requirements
2. Formal security standards and authoritative government guidance
3. Primary provider/service security documentation and contractual commitments
4. Architecture and implementation evidence from the proposed system
5. Security testing, penetration testing, red-team results, and operational evidence
6. Reputable industry guidance such as OWASP
7. Vendor marketing claims only as claims requiring verification

## 7. Security Falsifiability

The architecture review should define evidence that could disprove the proposed security design.

Examples:

- cross-tenant retrieval observed in testing;
- unauthorized tool invocation demonstrated;
- sensitive information discovered in logs;
- provider processing or retention differs from the approved data boundary;
- a prompt-injection test produces unauthorized external effects;
- service identity has broader privileges than required;
- recovery or incident-response controls fail their test objectives.

## 8. Advisor Review Checklist

Before recommending an AI security architecture, ask:

- What are the protected assets?
- What are the trust boundaries?
- Which identities exist?
- Where is authorization enforced?
- Can untrusted content influence tool selection?
- Can RAG cross data-domain boundaries?
- What happens if the model is maliciously manipulated?
- What happens if the model provider is compromised or unavailable?
- What authority remains if an agent is compromised?
- What evidence demonstrates that the controls work?
- What assumptions remain unverified?
- What would cause the advisor to reject the design?

## 9. Bottom Line

> **AI security should be evaluated as a system of explicit trust boundaries and enforcement points, not as a property of the model alone.**

For AI-IDSS, the most important architectural question is not simply whether the model can be made safer. It is whether a compromised, manipulated, or mistaken model can cross an authority boundary and produce an unauthorized consequence.
