# Chapter 19 — Iteration 1: AI Security Model Hardening

> **Status:** Hardening artifact, not a replacement for the main chapter.
>
> **Purpose:** Evidence, architecture, and adversarial hardening of Chapter 19 before any full-file overwrite.

## 1. Executive assessment

Chapter 19 has the correct architectural direction: security is treated as a system property across identities, data, models, applications, tools, infrastructure, and decision workflows rather than as a property of the LLM itself.

The chapter is broadly consistent with Chapters 19–25 and with the architecture spine used elsewhere in the book. The strongest ideas to preserve are:

- authorization must be enforced by deterministic system components rather than by model instructions alone;
- RAG introduces a retrieval authorization boundary;
- agents increase the consequence of model failure because tools can create external effects;
- model-provider boundaries must be assessed as architecture boundaries;
- logging and observability can themselves become sensitive-data boundaries;
- self-hosting changes responsibility rather than eliminating security risk;
- consequential actions should initially preserve an explicit human authorization boundary.

The chapter nevertheless needs hardening in several places before being treated as final. The principal issue is not that the architecture is wrong, but that several statements should distinguish more clearly between **established security principles, current threat guidance, architectural recommendations, and examples**.

## 2. Evidence baseline

### 2.1 NIST Cybersecurity Framework 2.0

NIST CSF 2.0 is a high-level cybersecurity risk-management framework. It provides outcomes and does not prescribe a single implementation architecture. Therefore the chapter should use CSF 2.0 as a governance and risk-management reference, not as evidence that any particular AI control is universally required.

Source: https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20

### 2.2 NIST Zero Trust Architecture

NIST SP 800-207 provides the zero-trust architecture basis for rejecting implicit trust based solely on network location and for separating authentication from authorization. This directly supports the chapter's identity-centric model.

Source: https://csrc.nist.gov/pubs/sp/800/207/final

NIST SP 800-207A extends zero-trust concepts to cloud-native applications and emphasizes application/service identities and policy enforcement. This supports the chapter's treatment of downstream service and agent identities.

Source: https://csrc.nist.gov/pubs/sp/800/207/a/final

### 2.3 NIST AI RMF Generative AI Profile

NIST AI 600-1 is a companion profile to AI RMF 1.0 for generative AI. It identifies generative-AI-specific risks including confabulation and supports the broader principle that security, reliability, and trustworthiness must be considered across the AI lifecycle rather than reduced to model output quality.

Source: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence

The profile should not be presented as a mandatory security standard.

### 2.4 NIST secure software development

NIST SP 800-218A is a finalized community profile adding AI-specific secure-development practices to SSDF 1.1. It is directly relevant to AI system acquisition and development, model/system lifecycle controls, and supply-chain considerations.

Source: https://csrc.nist.gov/pubs/sp/800/218/a/final

NIST SP 800-218 Rev. 1 / SSDF 1.2 remained an Initial Public Draft as of this review. The book should therefore cite the finalized 800-218A profile and final 800-218 where a finalized source is required, and label the 1.2 draft explicitly if mentioned.

Source: https://csrc.nist.gov/pubs/sp/800/218/r1/ipd

### 2.5 NIST security and privacy controls

NIST SP 800-53 Rev. 5 provides a broad catalog covering access control, identification and authentication, audit and accountability, system and communications protection, system and information integrity, incident response, supply-chain risk management, and related control families. It is useful as a control reference, but the chapter should not imply that every control applies identically to every AI system.

Source: https://csrc.nist.gov/pubs/sp/800/53/r5/final

### 2.6 Incident response

NIST SP 800-61 Rev. 3 is the current finalized NIST incident-response guidance and supersedes Rev. 2. The chapter should use Rev. 3 when discussing AI-security incident preparation, detection, response, and recovery.

Source: https://csrc.nist.gov/pubs/sp/800/61/r3/final

### 2.7 OWASP GenAI security guidance

OWASP's GenAI Security Project provides current threat-oriented guidance for LLM and agentic applications. The 2026 LLM Top 10 is explicitly positioned as community-driven guidance grounded in current security research and incident experience; it should be used as threat guidance rather than treated as a normative standard.

Sources:
- https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/
- https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/
- https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/

The current OWASP material is particularly important for prompt injection, sensitive information disclosure, supply-chain risks, excessive agency, and agent/tool security.

## 3. Claim hardening

### 3.1 Security is an architecture property

**Assessment:** Keep.

This is a defensible architectural framing rather than a claim that security is a single measurable property. It should remain clear that the security objective is to protect assets and enforce intended authority across trust boundaries.

### 3.2 “The LLM is not the security boundary”

**Assessment:** Keep and strengthen.

The statement is architecturally sound. A model can interpret instructions but should not be relied upon as the sole enforcement mechanism for authorization, access control, or high-impact policy. The stronger formulation is:

> **The model may participate in policy interpretation, but security-critical authorization must be enforced by components whose behavior is explicitly controlled, testable, and auditable.**

This avoids implying that models can never participate in policy decisions while preserving the deterministic-enforcement principle.

### 3.3 “Authorization should occur before data reaches the model”

**Assessment:** Refine.

The chapter currently uses “whenever practical.” Preserve that qualification, but make the architecture more precise:

> Retrieval and resource authorization should be enforced at the protected-resource boundary or by an authorization mechanism that is demonstrably equivalent to that boundary. The model should not be the component that decides whether protected data may be disclosed.

This aligns with the Chapter 13 and Chapter 14 principle that transport or metadata does not itself establish authorization.

### 3.4 Data classification

**Assessment:** Keep as an example, not a standard taxonomy.

The existing chapter already labels the four-level example as non-universal. Preserve that wording. The field manual should avoid inventing a canonical classification scheme when organizational classification policy has not been supplied.

### 3.5 Encryption

**Assessment:** Keep, but avoid implying encryption is sufficient.

The existing wording correctly states that encryption does not replace authorization. Add the architecture distinction:

- encryption protects data in defined states and paths;
- key management determines who can cause decryption or use protected material;
- authorization determines whether the requester is allowed to use the resource;
- application-layer controls determine what the application can disclose or execute.

### 3.6 Secrets in prompts

**Assessment:** Keep and strengthen.

System prompts are not an appropriate secrets-management mechanism. Credentials should instead be handled through dedicated secrets-management and identity mechanisms appropriate to the environment.

The chapter should avoid making “never in prompts” sound like the only security issue: secrets can also leak through logs, tool outputs, telemetry, traces, test fixtures, documents, caches, and generated artifacts.

### 3.7 Prompt injection

**Assessment:** Major architectural point; keep.

The chapter should explicitly distinguish:

> **Prompt injection is an instruction-confusion problem at the model/context layer; the security consequence arises when that influence crosses an authorization or action boundary.**

This distinction prevents the chapter from implying that prompt injection is itself equivalent to unauthorized access. The attack becomes materially dangerous when the architecture allows untrusted content to influence privileged data access or actions.

### 3.8 RAG security

**Assessment:** Keep and strengthen with source authority.

A vector index is a derived representation, not automatically a new authority domain. The architecture should preserve the source system's authority model or explicitly define a controlled equivalent authority model.

Important failure cases:

- stale authorization state;
- deleted source content remaining in indexes or caches;
- cross-tenant retrieval;
- incorrect document-to-identity mapping;
- access inherited incorrectly during chunking;
- unauthorized metadata leakage even when document text is filtered.

This directly aligns with Chapters 12–14.

### 3.9 Agent and tool security

**Assessment:** Strengthen substantially.

The chapter correctly identifies tool invocation as the point where model behavior can become external effect. The security model should explicitly separate:

```text
Model capability
    ↓
Agent authority
    ↓
Tool permission
    ↓
Resource authorization
    ↓
Action validation
    ↓
External effect
```

A tool being available to an agent does not imply that every invocation is authorized. Authorization may depend on user identity, resource, action, transaction value, workflow state, and approval state.

### 3.10 Tool output as untrusted input

**Assessment:** Keep.

This should be linked explicitly to the same principle used for retrieved documents and external content: **data crossing into an instruction-following model should not automatically acquire trusted-instruction status**.

For high-impact operations, tool responses should be validated against a defined schema and business/security constraints before they influence subsequent actions.

### 3.11 Output security

**Assessment:** Keep and sharpen.

The core principle is:

> **Generated output must remain data until the receiving system validates its syntax, semantics, authorization, and safety requirements.**

This is particularly important for SQL, shell commands, code, API parameters, and workflow actions. The chapter should not imply that output filtering alone is sufficient; receiving systems must retain their own security boundary.

### 3.12 Excessive agency

**Assessment:** Keep; align with Chapters 11, 18, 29, and 30–31.

The progression Read → Analyze → Recommend → Draft → Request approval → Execute is a useful architectural decision ladder, but it is an advisor recommendation, not a universal standard. Label it as such.

The maximum consequence of an agent failure should be bounded by architecture rather than by confidence in model behavior.

### 3.13 Third-party model boundary

**Assessment:** Keep and connect to Chapter 9 and Chapter 36.

The chapter should distinguish at least four questions:

1. **Data control:** what data crosses the boundary?
2. **Processing control:** what processing occurs there?
3. **Operational control:** who controls availability, configuration, and incident response?
4. **Strategic control:** how reversible is the dependency?

“Third-party” and “self-hosted” are deployment/ownership characteristics, not security verdicts.

### 3.14 Supply-chain security

**Assessment:** Strengthen with lifecycle controls.

The chapter should cover provenance, integrity, version pinning or equivalent change control, vulnerability management, artifact validation, dependency inventory, and rollback/revocation where applicable.

For AI systems the supply chain includes not only software packages but potentially models, model-serving runtimes, datasets, embedding models, retrieval components, connectors, plugins, containers, and infrastructure services.

NIST SP 800-218A provides finalized AI-specific secure-development guidance for this area.

### 3.15 Logging and audit

**Assessment:** Strong point; expand the distinction between security telemetry and content retention.

The architecture should record enough evidence to reconstruct security-relevant events without automatically storing all prompts, retrieved documents, or model outputs indefinitely.

A useful audit tuple is:

```text
Who
→ attempted what
→ against which resource
→ under which authorization context
→ using which model/configuration/tool
→ with what approval state
→ with what result
→ at what time
```

The exact content retained should be determined by security, legal, privacy, operational, and investigative requirements.

### 3.16 Monitoring

**Assessment:** Keep, but connect monitoring to response.

A security signal has operational value only if there is an understood response path. Monitoring design should therefore answer:

```text
Signal → Detection → Triage → Containment → Recovery → Evidence → Learning
```

This aligns with NIST SP 800-61 Rev. 3.

## 4. Security control hierarchy — correction

The existing hierarchy is useful but must not be interpreted as a universal ordering of security effectiveness.

Replace any implication of a fixed “strongest to weakest” taxonomy with:

```text
Security-critical control
        ↓
Where can it be enforced deterministically?
        ↓
Can the control survive model failure?
        ↓
Can it be tested independently?
        ↓
Can operation be observed and audited?
        ↓
Can failure be contained?
```

This is a more defensible advisor test than ranking network controls, identity controls, data filtering, tool validation, output validation, and prompts on a single universal scale.

## 5. New cross-cutting security principle

Add this principle to the chapter:

> **A security control is materially stronger when the system can enforce it independently of model compliance, test it under adversarial conditions, observe whether it operated, and contain the consequence when it fails.**

This connects Chapters 19–22 with Chapters 18, 30, 31, 40, and 41.

## 6. Failure-state hardening

Chapter 19 should explicitly connect security failure to Chapter 18 reliability semantics.

Examples:

| Condition | Safe architectural response |
|---|---|
| Authorization service unavailable | Do not silently broaden access; fail closed or enter a defined restricted mode |
| Retrieval authorization state stale | Refuse or restrict retrieval according to defined freshness policy |
| Tool authorization unavailable | Do not execute consequential action |
| Model provider compromised/suspect | Isolate provider path and activate defined fallback/containment procedure |
| Security telemetry unavailable | Determine whether the affected function may continue without required evidence |
| Secret exposure suspected | Revoke/rotate affected credentials and contain downstream access |
| Agent loop or unexpected tool fan-out | Stop execution at defined step/time/cost/authority limits |

These are architecture recommendations. The exact fail-open/fail-closed decision is threat- and business-context dependent.

## 7. Adversarial architecture tests

### Test 1 — Compromised model

Assume the model is fully compromised and follows attacker instructions.

Question: can it directly access unauthorized data or execute consequential actions?

A robust design should answer **no**, because authorization and action boundaries remain outside the model.

### Test 2 — Poisoned document

Assume an attacker inserts instructions into a document that is later retrieved by RAG.

Question: can those instructions cause privileged tool invocation?

If yes, the architecture has an instruction-to-authority escalation path.

### Test 3 — Stale authorization

Assume a user's access to a portfolio company is revoked immediately after a document is indexed.

Question: can the user still retrieve the stale representation?

The architecture must define authorization freshness and invalidation semantics.

### Test 4 — Tool response manipulation

Assume an external system returns malicious or malformed content.

Question: can the response become an instruction that changes agent authority or bypasses validation?

### Test 5 — Provider boundary compromise

Assume the model provider is unavailable or its security posture becomes unacceptable.

Question: what data has crossed the boundary, what credentials can be revoked, and what functions can continue safely?

### Test 6 — Logging compromise

Assume an attacker gains read access to observability storage.

Question: do prompts, retrieved documents, credentials, portfolio information, or sensitive outputs become a second exfiltration path?

### Test 7 — Human approval bypass

Assume an agent displays an approval request containing misleading or incomplete evidence.

Question: does the approval process still constitute meaningful authorization, or has the human become a rubber stamp?

## 8. Cross-chapter consistency matrix

| Chapter | Security dependency |
|---|---|
| 9 Enterprise LLM | Provider boundary, data control, dependency and reversibility |
| 10 RAG | Retrieval authorization, source authority, poisoning |
| 11 Agents | Identity, tool authorization, bounded authority, containment |
| 12 Data | Classification, authority, quality, provenance |
| 13 Integration | Boundary authorization, semantic correctness, service identity |
| 14 Governance | Policy → ownership → runtime enforcement → evidence |
| 15 Cloud | Shared responsibility, location vs security, recovery |
| 16 Compute | Runtime boundary, observability, artifact integrity |
| 17 Performance | Security controls under scale, rate limits, resource exhaustion |
| 18 Reliability | Secure degradation, fail-closed/open decisions, recovery correctness |
| 20 Identity | Authentication, identity lifecycle, authorization |
| 21 Data Protection | Encryption, masking, tokenization, DLP, retention |
| 22 AI Threats | Threat taxonomy and attack-specific controls |
| 23–25 Integration/API/Connectors | Tool and connector trust boundaries |
| 30–31 Model Selection/Evaluation | Security-aware model evaluation and adversarial testing |
| 36 Vendor Dependency | Provider risk and exit strategy |
| 40 Production Readiness | Security readiness gates |
| 41 Auditability | Evidence that controls operated |

## 9. Required wording discipline

The chapter should distinguish these categories explicitly:

- **Standard / framework:** NIST CSF 2.0, NIST SP 800-207, NIST SP 800-218A, NIST SP 800-53, NIST SP 800-61r3.
- **Threat guidance:** OWASP GenAI Top 10 and Agentic Top 10.
- **Architectural principle:** enforce security-critical policy outside the model where deterministic enforcement is required.
- **Advisor recommendation:** preserve human authorization for consequential capital-allocation actions during initial deployment.
- **Example:** four-level data classification and Read → Analyze → Recommend → Draft → Approve → Execute ladder.

Do not collapse these categories into “best practice” without qualification.

## 10. Evidence gaps requiring future verification

The following should remain explicit areas for project-specific evidence rather than universal claims:

- exact provider data retention and training policies;
- geographic processing and support access;
- encryption and key-management capabilities of a selected provider;
- connector-specific authorization semantics;
- actual deletion propagation through indexes, caches, replicas, and backups;
- exact identity propagation semantics across application → agent → tool → resource;
- effectiveness of a particular prompt-injection defense;
- security performance of a specific model or runtime;
- residual risk after red-team testing.

Vendor claims should be verified against current primary documentation, contracts, configuration, and—where material—technical testing.

## 11. Advisor field rule

> **Do not ask whether an AI system is “secure.” Ask which assets it protects, which identities can reach them, where authority is enforced, what happens when the model is compromised or deceived, whether security controls survive model failure, whether those controls have been tested, and whether the resulting evidence is sufficient for the decision being protected.**

## 12. Hardening verdict

**Architecture:** PASS with targeted refinements.

**Evidence discipline:** PASS after version-aware source corrections and clearer distinction between standards, threat guidance, and advisor recommendations.

**Security boundary:** PASS, with stronger emphasis that model compromise must not automatically become authorization compromise.

**RAG alignment:** PASS, with required emphasis on authorization freshness, derived-data lifecycle, and source authority.

**Agent alignment:** PASS, with required emphasis on identity, resource authorization, action validation, and bounded authority.

**Reliability alignment:** PASS after adding security-specific failure states and containment expectations.

**Auditability:** PASS after separating security evidence from indiscriminate content retention.

**Residual work:** A second adversarial pass is recommended before the main chapter is overwritten, focused specifically on attack-path completeness, terminology collisions with Chapters 20–22, and whether any claim still exceeds the cited evidence.
