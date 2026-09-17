# Evidence Review — Chapter 37: AI Risk Framework

## Review Objective

Chapter 37 establishes a practical AI risk framework for the technical advisor. The review focuses on keeping three distinctions explicit:

1. risk framework guidance vs mandatory compliance;
2. risk scoring vs defensible evidence;
3. technical risk assessment vs organizational risk acceptance.

---

## 1. NIST AI RMF 1.0

**Classification:** Primary framework evidence.

NIST AI RMF 1.0 defines four functions:

- Govern
- Map
- Measure
- Manage

NIST describes these as a flexible structure for managing AI risks, not as a rigid ordered checklist. Governance is cross-cutting, while Map, Measure, and Manage can be applied in system-specific contexts. NIST also states that risk management should continue throughout the AI lifecycle.

**Primary sources:**
- NIST AI RMF 1.0: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10
- NIST AI RMF Core: https://airc.nist.gov/airmf-resources/airmf/5-sec-core/

**Current-status note:** NIST states that AI RMF 1.0 is being revised. The chapter therefore refers specifically to **AI RMF 1.0** rather than implying that it is the latest unrevised framework indefinitely.

---

## 2. Risk Definition

**Classification:** Framework evidence.

NIST AI RMF frames risk as a composite of likelihood and magnitude of consequences. The chapter's conceptual formula reflects this framing but deliberately avoids claiming that all AI risks can be reduced to a simple numerical multiplication.

This distinction is important because qualitative, quantitative, and mixed-method assessment may all be appropriate.

---

## 3. Risk Context and Intended Use

**Classification:** Primary framework evidence.

NIST MAP 1.1 calls for intended purposes, users, context, potential impacts, assumptions, limitations, and relevant metrics to be documented. MAP 3.3 also calls for targeted application scope to be specified based on capability and context.

This directly supports the chapter's recommendation to begin risk analysis with intended use and consequence rather than model identity.

---

## 4. Risk Measurement

**Classification:** Primary framework evidence.

NIST MEASURE supports quantitative, qualitative, or mixed methods and calls for appropriate metrics, regular assessment, documentation of uncertainty, and testing. NIST also states that AI systems should be tested before deployment and regularly during operation.

The chapter therefore avoids prescribing a universal numerical risk scale.

---

## 5. Independent Review

**Classification:** Primary framework evidence.

NIST states that independent review can improve testing effectiveness and mitigate internal bias and conflicts of interest.

This is especially relevant to the advisor role because the advisor is intended to provide independent technical challenge rather than own the AI implementation.

**Important limitation:** NIST does not say that every AI system requires a separate independent architecture reviewer. The chapter therefore presents independent challenge as an appropriate governance mechanism where warranted, not as a universal mandatory control.

---

## 6. Risk Tolerance

**Classification:** Primary framework evidence + organizational governance inference.

NIST GOVERN 1.3 states that processes should determine the needed level of risk management based on organizational risk tolerance. MANAGE 1.2 calls for treatment to be prioritized based on impact, likelihood, and available resources or methods.

This supports the chapter's distinction:

> The technical advisor can assess whether architecture can satisfy a stated risk tolerance; the organization determines or authorizes the tolerance.

The second statement is an organizational-governance inference, not a direct NIST quotation.

---

## 7. Residual Risk

**Classification:** Risk-management concept / recommendation.

The distinction between inherent risk and residual risk is established in risk-management practice, but the chapter intentionally does not attribute the exact wording to NIST AI RMF as if NIST had mandated a single universal risk-register structure.

The chapter uses the distinction because architecture controls should be evaluated for their effect on the remaining risk, not merely for their existence.

---

## 8. Risk Controls

**Classification:** Architecture recommendation.

The preventive/detective/corrective/compensating/recovery classification is used as a practical architectural taxonomy. It should not be presented as an exclusive or universally standardized AI control taxonomy.

The key evidence-supported principle is that NIST Manage calls for responses to prioritized AI risks and for ongoing monitoring and improvement.

---

## 9. Defense in Depth

**Classification:** Security architecture principle / recommendation.

The chapter recommends multiple layers for high-consequence risks where practical. This is consistent with established security architecture reasoning but is not presented as an AI-specific mandatory NIST control set.

The actual controls must be derived from the threat and failure mechanism.

---

## 10. AI RMF Playbook Status

**Classification:** Primary-source status clarification.

The NIST AI RMF Playbook is explicitly described as voluntary guidance, not a one-size-fits-all checklist or ordered implementation procedure. NIST also states that the Playbook will be updated after AI RMF 1.0 is revised.

Therefore Chapter 37 must not say or imply:

- “NIST requires every organization to implement this exact checklist”; or
- “following the Playbook proves compliance/safety.”

---

## 11. Generative AI Risk

**Classification:** Primary framework evidence.

NIST AI 600-1, the Generative AI Profile, is a companion resource to AI RMF 1.0 that identifies and proposes actions for risks specific to generative AI. NIST published it in July 2024 and updated its publication page in April 2026.

This supports the chapter's use of generative-AI-specific examples such as hallucination, prompt injection, and data-related risks, while the detailed controls remain architecture-dependent.

---

## 12. ISO/IEC 23894:2023

**Classification:** International Standard.

ISO/IEC 23894:2023 provides guidance for organizations that develop, produce, deploy, or use AI products, systems, and services. ISO states that the guidance can be customized to organizational context.

This is useful corroborating evidence that AI risk management should be integrated into AI-related organizational activities rather than treated solely as a model-level exercise.

It does not establish the chapter's specific risk-register fields or numerical scoring system.

---

## 13. AI-IDSS Application

**Classification:** Architecture recommendation / scenario reasoning.

The chapter applies general AI risk-management principles to an AI-IDSS because the intended system may support consequential investment decisions.

The following are therefore recommendations rather than externally mandated facts:

- explicit risk ownership;
- explicit residual-risk acceptance;
- risk analysis across the source-to-decision chain;
- stronger controls for higher-consequence actions;
- linkage between risk register and architecture decisions;
- explicit reassessment when decision authority or system scope changes.

These recommendations are consistent with the NIST functions but are tailored to this field manual's advisory context.

---

## 14. Deliberate Non-Claims

Chapter 37 should **not** imply that:

- NIST AI RMF is mandatory law;
- AI RMF 1.0 is the final version forever;
- every AI system needs the same risk matrix;
- every AI risk can be quantified accurately;
- a numerical risk score makes an assessment rigorous;
- residual risk can always be reduced to one number;
- following AI RMF proves that a system is safe;
- human approval is universally required for all AI outputs;
- a risk register itself is a control;
- model accuracy is equivalent to system risk;
- a vendor's security certification eliminates AI risk;
- prompt filtering alone solves prompt injection;
- RAG alone solves hallucination;
- one risk taxonomy is sufficient for every organization.

---

## 15. Evidence Matrix

| Claim | Evidence class | Confidence | Limitation |
|---|---|---|---|
| AI risk management should be lifecycle-oriented | NIST framework | High | Framework is voluntary |
| Risk depends on likelihood and consequence | NIST framework | High | Quantification may be uncertain |
| Intended use/context should be documented | NIST framework | High | Specific documentation depends on context |
| AI should be tested before and during operation | NIST framework | High | Test methods are use-case dependent |
| Risk can be measured qualitatively or quantitatively | NIST framework | High | Measurement quality varies |
| Third-party AI components belong in risk analysis | NIST AI RMF | High | Treatment is context-specific |
| Independent review can improve evaluation | NIST AI RMF | High | Not universal mandatory separation |
| Risk tolerance should influence treatment | NIST AI RMF | High | Organizational tolerance is context-specific |
| Risk register should connect risks to controls | Recommendation | High | Specific format is not standardized |
| AI-IDSS needs explicit residual-risk decisions | Recommendation | Medium/High | Depends on organizational governance |

---

## 16. Adversarial Review

### Challenge A — “Why not just use the NIST risk matrix?”

Because NIST AI RMF does not prescribe one universal numerical risk matrix. The framework is deliberately flexible and context-dependent.

### Challenge B — “If the model is accurate, isn't risk low?”

No. System risk can arise from stale data, unauthorized retrieval, integration failure, misuse, provider dependency, or incorrect decision interpretation even when model evaluation is strong.

### Challenge C — “Can the architecture team accept residual risk?”

Not by default. The advisor can recommend whether technical controls appear adequate against a stated tolerance. Risk acceptance authority should be explicitly assigned by organizational governance.

### Challenge D — “Why keep a risk register if risks change continuously?”

Because a register is an accountability and traceability mechanism. It must be maintained rather than treated as a one-time document.

### Challenge E — “Does NIST AI RMF make the system compliant?”

No. NIST describes AI RMF 1.0 as voluntary and use-case agnostic. Legal or regulatory compliance must be assessed against applicable requirements.

---

## 17. What Would Change Our Mind?

Risk treatment should be revised if:

- new evidence changes likelihood or consequence estimates;
- a control fails testing;
- the system gains new capabilities or permissions;
- model or provider behavior changes;
- data quality or freshness changes materially;
- the decision context changes;
- monitoring reveals previously unknown failure modes;
- organizational risk tolerance changes.

This follows the lifecycle orientation of NIST AI RMF and the chapter's broader principle that architecture decisions should remain revisable when evidence changes.

---

## Bottom Line

The evidence supports a disciplined but non-prescriptive approach:

> **Govern the risk process, map the actual context and failure paths, measure what can be measured with explicit uncertainty, manage prioritized risks through concrete controls, and make residual-risk decisions explicit.**

For this field manual, the additional architectural standard is:

> **A risk claim is not defensible merely because it has a score. It is defensible when the scenario, evidence, control, residual risk, ownership, and decision authority are visible.**
