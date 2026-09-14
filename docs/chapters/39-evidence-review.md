# Evidence Review — Chapter 39: AI Architecture Review

## Review Objective

Chapter 39 defines an independent AI architecture review method. The review must distinguish established engineering/risk-management guidance from advisor heuristics and recommendations.

---

## 1. Architecture Review as Systems Engineering

**Classification:** Fact / established engineering basis.

NIST SP 800-160 Vol. 1 Rev. 1 provides a systems-security-engineering basis covering requirements analysis, architecture, design, risk assessment, security architecture, resilience, verification, validation, and life-cycle activities. It explicitly includes review and validation among systems-engineering concerns.

**Primary evidence:**
- NIST SP 800-160 Vol. 1 Rev. 1: https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final

**Conclusion:** The chapter's treatment of architecture review as an engineering activity is grounded in established systems-security-engineering practice.

---

## 2. AI Risk Management Is Iterative

**Classification:** Fact / framework evidence.

NIST AI RMF describes risk management across AI design, development, deployment, use, and evaluation. The AI RMF Core is organized around Govern, Map, Measure, and Manage, and NIST states that these functions should be applied iteratively according to organizational context.

The Playbook is voluntary and explicitly not a one-size-fits-all checklist or mandatory ordered process.

**Primary evidence:**
- NIST AI RMF: https://www.nist.gov/itl/ai-risk-management-framework
- NIST AI RMF Core: https://airc.nist.gov/airmf-resources/airmf/5-sec-core/
- NIST AI RMF Playbook: https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook
- NIST Playbook FAQ: https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook-faqs

**Conclusion:** Chapter 39 may use iterative architecture review as an advisor process, but should not present it as an official NIST-required sequence.

---

## 3. Requirements Should Drive Architecture

**Classification:** Established engineering principle / inference.

Systems engineering treats stakeholder needs, concerns, requirements, constraints, and architectural/design decisions as related engineering artifacts. NIST SP 800-160 emphasizes requirements analysis and the relationship between architecture and security requirements.

The chapter therefore begins with the decision and requirements rather than the selected technology.

**Primary evidence:**
- NIST SP 800-160 Vol. 1 Rev. 1: https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final

**Conclusion:** “Requirements before components” is a defensible engineering principle. The exact traceability table used in the chapter is an advisor method, not a mandated NIST artifact.

---

## 4. Architecture Views Are Purpose-Dependent

**Classification:** Architecture practice / recommendation.

The chapter recommends context, logical, data-flow, trust-boundary, deployment, and failure/dependency views where relevant.

No single authoritative source establishes this exact list as mandatory for all AI systems. The recommendation is derived from the need to make different architectural concerns visible to reviewers.

**Conclusion:** Keep the language proportional: these are useful views for review, not a universal documentation standard.

---

## 5. Security Is a System Property

**Classification:** Fact / systems-security-engineering basis.

NIST SP 800-160 Rev. 1 frames security engineering as part of systems engineering and addresses security requirements, security architecture, system elements, interfaces, risk treatment, verification, validation, and resilience.

**Primary evidence:**
- NIST SP 800-160 Rev. 1: https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final

**Conclusion:** The chapter's rejection of a product-only security review is well grounded. Specific control choices remain architecture-dependent.

---

## 6. Trust Boundaries and Interfaces Matter

**Classification:** Technical evidence / engineering basis.

NIST SP 800-160 includes architectural activities relating security-relevant system elements to architecture and defining security interfaces, interconnections, and interactions with external entities.

**Primary evidence:**
- NIST SP 800-160 Vol. 1 material: https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-160.pdf

**Conclusion:** Chapter 39's emphasis on system boundaries, trust boundaries, interfaces, and external dependencies is supported.

---

## 7. AI RMF Supports Multidisciplinary Review

**Classification:** Fact / framework evidence.

NIST AI RMF Core states that AI RMF functions should reflect diverse and multidisciplinary perspectives and that this can help surface assumptions and problems associated with the technology being designed, developed, deployed, or evaluated.

**Primary evidence:**
- NIST AI RMF Core: https://airc.nist.gov/airmf-resources/airmf/5-sec-core/

**Conclusion:** Independent and multidisciplinary challenge is consistent with the framework's approach, although Chapter 39's specific advisor-review role is organizationally defined rather than prescribed by NIST.

---

## 8. Model Evaluation Must Be Context-Specific

**Classification:** Fact / evaluation guidance.

NIST AI RMF Measure emphasizes evaluation appropriate to the AI system's context, purpose, audience, and intended use. NIST's ongoing TEVV work similarly emphasizes that evaluation approaches vary by AI application and use case.

**Primary evidence:**
- NIST AI RMF Playbook: https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook
- NIST TEVV-Athlon Framework: https://www.nist.gov/artificial-intelligence/ai-research/tevv-athlon-framework-evaluating-ai-systems

**Conclusion:** The chapter's insistence that model evidence be relevant to the intended workload is justified.

---

## 9. RAG Is Not Automatically Grounding

**Classification:** Architectural inference.

A retrieval architecture can fail through poor retrieval, stale information, incorrect source authority, authorization errors, context construction problems, or generation errors.

Therefore, the presence of a vector database or RAG component does not by itself establish trustworthy evidence retrieval.

This is an architectural conclusion rather than a claim that RAG is ineffective.

---

## 10. Authorization Should Be Explicitly Enforced

**Classification:** Architecture recommendation grounded in security architecture.

The chapter states that model reasoning should not silently become the authorization boundary. This follows from the general engineering requirement to establish explicit security functions and boundaries around system elements and interfaces.

The statement should remain labeled as an architecture recommendation rather than a direct NIST quotation.

**Primary evidence:**
- NIST SP 800-160 Rev. 1: https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final
- NIST Zero Trust Architecture, SP 800-207: https://csrc.nist.gov/pubs/sp/800/207/final

---

## 11. Agent Authority Must Be Reviewed as a System Property

**Classification:** Architecture recommendation.

The chapter requires concrete enumeration of agent actions rather than relying on labels such as “autonomous.”

This is an application of established access-control and systems-engineering reasoning to agentic AI. It is not presented as a universal NIST checklist.

The review should identify actual operations, authorization paths, constraints, auditability, and failure containment.

---

## 12. Failure and Degraded-State Review

**Classification:** Established engineering principle / architecture recommendation.

NIST SP 800-160 includes resilience, risk treatment, verification, validation, and trustworthy-system engineering. These support reviewing failure modes rather than evaluating only nominal operation.

The chapter's specific semantic-fallback rule is an advisor recommendation:

> A fallback should not silently change the meaning of a consequential decision-support output.

**Primary evidence:**
- NIST SP 800-160 Rev. 1: https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final

---

## 13. Observability and Auditability

**Classification:** Architecture recommendation.

The chapter recommends reconstructability of important AI-IDSS events, including relevant inputs, evidence, model/version, tools, policy decisions, validation, outputs, and human action where appropriate.

This is not a claim that every system must retain every event indefinitely. Retention should be determined by applicable security, privacy, regulatory, operational, and cost requirements.

NIST AI RMF emphasizes documentation, measurement, monitoring, and risk management, while systems-security engineering emphasizes verification, validation, and life-cycle assurance.

**Primary evidence:**
- NIST AI RMF: https://www.nist.gov/itl/ai-risk-management-framework
- NIST SP 800-160 Rev. 1: https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final

---

## 14. Architecture Fitness Is Not the Same as Technical Feasibility

**Classification:** Inference.

A system can be technically feasible yet unsuitable because it fails requirements, has unacceptable residual risk, is too costly, is operationally unsupported, or creates unacceptable dependency.

The chapter therefore separates feasibility, fitness, trustworthiness, operability, and economics.

This is a reasoning framework rather than a formal NIST or ISO classification.

---

## 15. Findings Severity Is an Advisor Convention

**Classification:** Recommendation.

The chapter uses Critical / High / Medium / Low / Observation categories.

These categories are intentionally presented as a review convention. They are not claimed to be a universal standard.

Severity should be tied to consequence and decision impact rather than aesthetic disagreement with an implementation choice.

---

## 16. Review Gates Are Not Universal Mandatory Stages

**Classification:** Recommendation.

The staged pattern:

```text
Concept → Architecture Review → PoC → Evaluation → Validation → Production Review → Operation
```

is a practical governance pattern for consequential AI systems.

It should not be represented as a mandatory NIST process. NIST AI RMF is iterative and context-dependent, and its Playbook explicitly states that it is not a checklist or ordered implementation sequence.

**Primary evidence:**
- NIST AI RMF Playbook FAQ: https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook-faqs

---

## 17. AI Management Systems Provide Organizational Context

**Classification:** Fact.

ISO/IEC 42001:2023 specifies requirements for establishing, implementing, maintaining, and continually improving an AI management system for organizations that develop, provide, or use AI systems.

It provides governance and management-system context, but it does not prescribe the exact technical architecture-review checklist in Chapter 39.

**Primary evidence:**
- ISO/IEC 42001:2023: https://www.iso.org/standard/42001

---

## 18. Current Status of NIST AI RMF

**Classification:** Current fact.

NIST states that AI RMF 1.0 is being revised. The published AI RMF 1.0 and its Playbook remain useful references, but the book should not describe AI RMF 1.0 as an immutable latest framework.

**Primary evidence:**
- NIST AI RMF page: https://www.nist.gov/itl/ai-risk-management-framework
- NIST AI RMF Playbook: https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook

**Editorial requirement:** Preserve the revision-status qualifier whenever the chapter describes current NIST AI RMF status.

---

## 19. Deliberate Non-Claims

Chapter 39 should not imply that:

- every AI system requires the same architecture-review depth;
- every architecture needs every diagram listed;
- NIST AI RMF mandates an architecture review;
- an architecture review guarantees security;
- a diagram proves an implementation is correct;
- RAG guarantees factuality;
- agents must always require human approval;
- multi-provider architecture is always superior;
- portability is always worth its cost;
- every architecture should maximize observability;
- every event should be retained indefinitely;
- a successful PoC proves production readiness;
- architecture quality can be determined by technology brand or component count.

---

## 20. AI-IDSS Evidence Standard

For an AI-IDSS architecture, the strongest review chain is:

```text
Requirement
 ↓
Architectural Mechanism
 ↓
Verification / Test
 ↓
Observed Result
 ↓
Residual Risk / Uncertainty
 ↓
Decision Boundary
```

Example:

| Requirement | Architecture | Evidence | Remaining question |
|---|---|---|---|
| authorized evidence only | retrieval-time authorization | access-control test | behavior under policy change |
| defensible risk alert | evidence chain + evaluation | representative test set | calibration under drift |
| provider outage tolerance | explicit degraded mode | failure test | semantic impact of fallback |
| acceptable lifecycle cost | workload-based TCO | cost model | peak-demand sensitivity |
| provider replaceability | portable data + substitution interface | migration test | quality parity after migration |

This is an advisor framework, not a compliance standard.

---

## 21. Adversarial Review

### Challenge A — “Why not approve if the architecture is technically feasible?”

Because feasibility does not establish fitness, trustworthiness, operational readiness, or economic justification.

### Challenge B — “Why review the same architecture more than once?”

Because requirements, implementation evidence, dependencies, model behavior, and operational conditions can change across the lifecycle. NIST AI RMF itself describes iterative risk management.

### Challenge C — “Why challenge the architecture when the components are all reputable?”

Because system-level behavior depends on composition, configuration, interfaces, authority, data flows, and failure interactions. Good components do not automatically produce a good system.

### Challenge D — “Why document what would change our mind?”

Because an architecture recommendation is stronger when it is tied to observable evidence rather than protected as a fixed position.

---

## 22. Advisor Decision Rule

Before endorsing a material architecture, the advisor should be able to state:

> **What requirement each major architectural decision addresses, what evidence supports it, what remains uncertain, what can fail, what happens when it fails, and why the selected architecture is preferable to credible alternatives.**

If that cannot be stated, the architecture review is incomplete for the decision at hand.

---

## 23. What Would Change Our Mind?

The recommendation should change when credible evidence materially changes:

- requirements;
- workload assumptions;
- security findings;
- evaluation results;
- reliability behavior;
- cost assumptions;
- provider terms;
- portability evidence;
- operational capability;
- regulatory or contractual constraints.

The purpose of review is to improve the architecture and decision, not to defend the initial proposal.

---

## Bottom Line

> **An AI architecture review is a disciplined test of whether requirements, architecture decisions, trust boundaries, evidence, failure behavior, operational reality, economics, and residual uncertainty are sufficiently understood to justify the proposed commitment.**
