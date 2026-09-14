# Evidence Review — Chapter 19: AI Security Model

## 1. Purpose

This review separates established security guidance from architecture recommendations, scenario assumptions, and implementation evidence in Chapter 19.

The chapter is deliberately **architecture-oriented**. It does not claim that a model, security product, cloud deployment model, or named framework makes an AI system secure by itself.

## 2. Primary Evidence

### NIST SP 800-207 — Zero Trust Architecture

NIST's Zero Trust Architecture focuses protection on resources rather than implicit trust based on network location. It treats authentication and authorization as discrete functions and emphasizes protecting resources, services, workflows, and accounts. [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final)

**Classification:** Technical evidence.

### NIST SP 800-207A — Cloud-Native Zero Trust

NIST extends zero-trust principles to cloud-native and multi-cloud environments, emphasizing application and service identities and granular application-level access policies. [NIST SP 800-207A](https://csrc.nist.gov/pubs/sp/800/207/a/final)

**Classification:** Technical evidence.

### NIST SP 1800-35 — Implementing a Zero Trust Architecture

This NIST Cybersecurity Practice Guide provides example implementations of zero-trust architecture and demonstrates how identity, access authorization, monitoring, and related technologies can be combined in real environments. It is useful implementation evidence, but the examples are not a universal reference architecture for every organization. [NIST SP 1800-35](https://csrc.nist.gov/pubs/sp/1800/35/final)

**Classification:** Technical / implementation evidence.

### NIST AI RMF 1.0 and Generative AI Profile

NIST AI RMF 1.0 provides a voluntary framework for managing AI risks. NIST AI 600-1 is its Generative AI Profile and addresses risks including information security, prompt injection, data poisoning, and other GenAI-specific concerns. NIST currently notes that AI RMF 1.0 is being revised; therefore version-specific claims must distinguish the current final framework from work in progress. [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) · [NIST AI 600-1](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)

**Classification:** Technical/governance evidence.

### NIST AI Security and Resilience Research

NIST identifies secure and resilient as a core AI trustworthiness characteristic and notes that AI security challenges continue to evolve. Its current research includes adversarial machine learning, secure software development for AI, and control overlays for different AI system types. [NIST AI Security and Resilience](https://www.nist.gov/artificial-intelligence/ai-research-security-and-resilience)

**Classification:** Technical research / current evidence.

### NIST 2026 Continuous Security Finding

In June 2026, NIST reported research showing that a fixed finite set of guardrails is not universally robust against adaptive adversarial prompts and recommended continuous red teaming, continuous hardening, and operational resilience. This supports the chapter's rejection of a "one-and-done" security model. It does **not** mean that AI systems cannot be secured to useful levels or that guardrails are useless. [NIST, June 2026](https://www.nist.gov/news-events/news/2026/06/nist-mathematical-proof-supports-transition-continuous-monitor-and-update)

**Classification:** Current research evidence.

### OWASP GenAI Security Project — 2026 LLM Top 10

OWASP's 2026 LLM Top 10 is the current community-driven threat guidance for LLM applications. It updates the threat landscape and provides attack scenarios and mitigations. [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/)

**Classification:** Industry security guidance.

### OWASP Top 10 for Agentic Applications 2026

OWASP's Agentic Applications 2026 guidance specifically addresses risks in autonomous and agentic systems, including risks around tool use, identity and privilege, supply chain, memory/context, and cascading behavior. [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)

**Classification:** Industry security guidance.

## 3. Claims Requiring Careful Wording

### “The model is not the authorization engine.”

This is an **architecture recommendation**, grounded in resource-level authorization and zero-trust principles. It should not be presented as a quotation or direct requirement from NIST.

### “Prompt restrictions can be bypassed.”

OWASP documents risks associated with relying on model behavior and prompt-level controls for security. NIST's 2026 research further supports treating model guardrails as a control layer that requires continual testing rather than as an absolute security boundary.

### “Retrieval-time authorization.”

This is an **architecture recommendation** derived from applying resource-level authorization to RAG. Neither NIST nor OWASP prescribes one universal RAG implementation. The design must be tested against the organization's data domains, identity model, source-of-record controls, caching, indexing, and revocation requirements.

### “Human approval for consequential actions.”

This is a **recommendation for the AI-IDSS context**, not a universal security standard. Human approval is only a meaningful control if the approval is bound to a defined action/resource/scope and the human receives sufficiently trustworthy evidence.

### “Security control hierarchy.”

The ordering in the chapter is an **architectural heuristic**, not a formal NIST or OWASP ranking. A lower-layer control is not automatically stronger in every threat scenario; effectiveness depends on what the control actually enforces and what failure modes it covers.

### “Security telemetry failure.”

The chapter treats telemetry failure as an architectural failure state, not as a universal instruction to stop all AI operation. Whether the system blocks, degrades, or continues depends on the affected function, threat model, and required assurance level.

## 4. Adversarial Architecture Tests

The hardening review applies explicit failure assumptions rather than assuming cooperative model behavior.

### Fully compromised model

**Test assumption:** the model may follow attacker-controlled instructions whenever possible.

The architecture should still prevent unauthorized retrieval, unauthorized tool invocation, privilege escalation, cross-domain disclosure, and uncontrolled external effects. This is an architectural test of whether model trust has been coupled too tightly to security authority.

### Confused deputy

Test whether a broad service identity can be used on behalf of a requester with narrower authority. The downstream resource should have enough identity/delegation context to enforce the intended authority boundary rather than trusting the model to preserve it.

### Retrieval poisoning and stale authorization

Test whether malicious retrieved content can acquire authority, and whether revoked access remains effective when data already exists in indexes, caches, summaries, memory, or other derived artifacts.

### Approval bypass

For consequential actions, test whether approval is bound to the intended action, resource, scope, parameters, and validity period, and whether the agent can alter or replay the approved operation.

### Provider compromise or loss of trust

Test what data crossed the provider boundary, what credentials or trust relationships are affected, whether access can be revoked, whether fallback changes decision semantics, and whether auditability remains intact.

### Security telemetry outage

Test which operations require current security telemetry or audit evidence and which can continue under a defined restricted mode. Do not assume that every function has the same fail-closed requirement.

## 5. Important Non-Claims

The chapter deliberately does **not** claim that:

- zero trust makes a system secure by itself;
- private networks eliminate AI security risk;
- self-hosting makes a model secure;
- a vector database is inherently secure or insecure;
- prompt injection can be solved completely by prompt filtering;
- encryption replaces authorization;
- human approval eliminates risk;
- one security architecture fits every organization;
- OWASP's risk lists constitute a complete threat model;
- a model provider's enterprise controls are sufficient without reviewing the actual service, configuration, and contract;
- a security product automatically proves that an architecture is secure;
- continuous red teaming guarantees that all future attacks will be found;
- NIST or OWASP guidance is itself proof that a proposed implementation is secure.

## 6. Threat-Model Discipline

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
Control / enforcement point
  ↓
Test
  ↓
Residual risk
```

A control without an identified attack path should not automatically be treated as valuable. Conversely, an identified attack path without an effective enforcement point is an architecture gap.

## 7. Evidence Hierarchy

For an actual enterprise security review, prefer:

1. Applicable law/regulation and binding organizational requirements
2. Formal security standards and authoritative government guidance
3. Primary provider/service security documentation and contractual commitments
4. Architecture and implementation evidence from the proposed system
5. Security testing, penetration testing, red-team results, and operational evidence
6. Reputable industry guidance such as OWASP
7. Vendor marketing claims only as claims requiring verification

This hierarchy is an **advisor working rule**, not a formal universal ranking of evidence.

## 8. Security Falsifiability

The architecture review should define evidence that could disprove the proposed security design.

Examples:

- cross-tenant retrieval observed in testing;
- unauthorized tool invocation demonstrated;
- service identity has materially broader privileges than required;
- sensitive information discovered in logs or evaluation datasets;
- provider processing or retention differs from the approved data boundary;
- prompt-injection testing produces unauthorized external effects;
- revoked authorization remains effective only in the source system but not in indexes/caches/derived artifacts;
- approval can be replayed or expanded beyond its approved scope;
- security telemetry failure causes the system to operate outside its defined assurance boundary;
- recovery or incident-response controls fail their test objectives.

## 9. Cross-Chapter Boundary

Chapter 19 owns the **security architecture and control philosophy**.

- Chapter 20: identity, authentication, authorization, delegation, and privilege mechanics.
- Chapter 21: deeper data-protection mechanisms such as encryption, key management, masking, tokenization, DLP, and retention.
- Chapter 22: deeper AI-specific threat taxonomy and attack mechanics.
- Chapter 18: reliability, failure modes, degradation, recovery, and resilience.
- Chapter 31: evaluation evidence and evaluation gates.
- Chapter 36: vendor dependency and exit strategy.

Chapter 19 should establish the security boundary and challenge questions without duplicating the full treatment of those chapters.

## 10. Advisor Review Checklist

Before recommending an AI security architecture, ask:

- What are the protected assets?
- What are the trust boundaries?
- Which identities exist?
- Who has authority over each resource?
- Where is authorization actually enforced?
- Can a confused-deputy path amplify privileges?
- Can RAG bypass source-system authorization?
- What happens if retrieved content is malicious?
- What happens if the model is fully compromised?
- Which tools can the agent invoke and with what maximum authority?
- Are consequential approvals bound to the intended action and scope?
- What data crosses the model-provider boundary?
- What happens if provider trust is lost or the provider is unavailable?
- Can security telemetry fail without creating an undefined operating state?
- Can important security events be reconstructed?
- Which controls remain effective if model behavior is malicious?
- What evidence demonstrates that the proposed controls work?
- What assumptions remain unverified?
- What evidence would cause the advisor to reject or redesign the architecture?

## 11. Confidence and Uncertainty

**Overall confidence:** High for the chapter's core architectural principle that model behavior should not be the sole enforcement point for identity, authorization, or consequential authority.

**Moderate confidence:** In the specific control patterns for RAG authorization, agent approval, telemetry failure, and provider containment because implementation effectiveness depends on system architecture, data semantics, identity propagation, and operational testing.

**Low confidence / must be verified per implementation:** provider-specific retention, isolation, data-use terms, model behavior, attack resistance, performance, and recovery characteristics.

Confidence describes the strength of the conclusion; it does not replace implementation evidence.

## 12. Bottom Line

> **AI security should be evaluated as a system of explicit trust boundaries and enforcement points, not as a property of the model alone.**

For AI-IDSS, the most important architectural question is not simply whether the model can be made safer. It is whether a compromised, manipulated, mistaken, or unavailable model can cross an authority boundary and produce an unauthorized consequence—and whether the system can detect, contain, and recover from that failure.
