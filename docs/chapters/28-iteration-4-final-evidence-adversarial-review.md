# Chapter 28 — Iteration 4 Final Evidence & Adversarial Review

## Review status

**PASS — final for current scope.**

Four review passes were completed:

1. Substance and architecture review
2. Evidence and claim-classification review
3. Adversarial review of explanation fidelity, evidence validity, provenance, contradictory evidence, and human oversight
4. Cross-chapter consistency review against Chapters 19–27

## Evidence anchors

### 1. Explainability, interpretability, and transparency are distinct

NIST AI RMF 1.0 distinguishes transparency, explainability, and interpretability. It describes transparency in terms of what happened in an AI system, explainability in terms of mechanisms underlying operation, and interpretability in terms of the meaning of outputs in context. These distinctions support the chapter's separation of system transparency, model/output explanation, and decision meaning. NIST currently states that AI RMF 1.0 is being revised, so this is treated as versioned guidance rather than a permanent specification.

**Classification:** Authoritative technical guidance.

### 2. Explainability can support debugging, monitoring, audit, and governance

NIST AI RMF 1.0 states that explainable and interpretable systems can provide information useful for understanding functionality and trustworthiness and can support debugging, monitoring, documentation, audit, and governance.

**Classification:** Authoritative technical guidance.

### 3. Provenance supports transparency and accountability but does not prove correctness

NIST AI RMF discusses maintaining provenance of training data and attribution as mechanisms supporting transparency and accountability. The chapter intentionally does not infer that provenance establishes factual accuracy.

**Classification:** Authoritative basis + architectural inference.

### 4. Generative AI can produce misleading explanations or citations

NIST's Generative AI Profile identifies risks associated with confabulated logic or citations that purport to justify or explain an answer. The chapter therefore treats free-form LLM explanation as a derived artifact requiring evidence linkage and validation.

**Classification:** Authoritative GAI risk evidence + architecture recommendation.

### 5. Post-deployment monitoring is necessary but the methodology remains immature

NIST AI 800-4 (2026) describes post-deployment monitoring as important for validating real-world behavior, tracking unforeseen outputs, and identifying unexpected consequences. It also states that best practices, validated methodologies, and common terminology remain nascent and fragmented.

**Classification:** Authoritative current technical evidence.

### 6. ISO/IEC 42001 supports transparency, traceability, reliability, and accountability at the management-system level

ISO/IEC 42001:2023 is an international AI management-system standard covering governance and continual improvement. ISO identifies transparency, traceability, and reliability among its benefits. The chapter does not treat ISO/IEC 42001 as prescribing a specific explanation algorithm or AI-IDSS architecture.

**Classification:** International standard / management-system evidence.

## Adversarial findings

### Finding A — Explanation can be mistaken for evidence

**Risk:** A fluent LLM narrative can appear evidentiary even when the underlying source does not support the claim.

**Control:** Separate claim, evidence, provenance, analytical method, validation, and explanation as distinct artifacts.

### Finding B — Citation presence can create false confidence

**Risk:** A citation may exist but fail to support the exact claim, entity, period, or inference.

**Control:** Evaluate citation correctness, source authority, temporal relevance, and claim-source alignment.

### Finding C — Provenance can be overclaimed

**Risk:** A perfectly traceable document may still contain an incorrect forecast or manipulated input.

**Control:** Keep provenance/traceability separate from validation/correctness assessment.

### Finding D — Post-hoc explanation can rationalize an output

**Risk:** The system generates a conclusion first and constructs a plausible reason afterward.

**Control:** Prefer explanations constrained by the evidence and analytical artifacts that materially informed the result; evaluate explanation fidelity rather than judging fluency alone.

### Finding E — Contradictory evidence can disappear

**Risk:** Retrieval and summarization may preferentially surface supporting material.

**Control:** Where feasible, explicitly search for and expose relevant contradictory evidence. Do not assume that contradiction can always be resolved automatically.

### Finding F — Explanation can cross a security boundary

**Risk:** More detailed explanations can disclose sensitive portfolio information, hidden policy, or information belonging to another principal.

**Control:** Apply Chapters 19–22 identity, authorization, data-protection, and threat-model boundaries to explanation generation and display.

### Finding G — Human review can become ceremonial

**Risk:** An Approve/Reject button may satisfy a process requirement without enabling meaningful independent assessment.

**Control:** Provide access to claim semantics, evidence, contradictions, method, limitations, and what would change the conclusion.

## Cross-chapter consistency

The chapter fits the architecture chain:

**19 Security → 20 Identity → 21 Data Protection → 22 Threats → 23 Integration → 24 APIs → 25 Connectors → 26 AI-IDSS Architecture → 27 Risk Alert → 28 Explainability & Evidence**

Specific dependencies:

- Chapter 27 defines probability semantics, calibration, prediction/recommendation separation, and alert policy.
- Chapter 28 explains how those outputs are evidenced and communicated without turning explanation into proof.
- Chapter 19 constrains explanation security and trust boundaries.
- Chapter 20 constrains who may retrieve and view evidence.
- Chapter 21 constrains what sensitive evidence may be exposed.
- Chapter 22 treats explanation manipulation and retrieved-content attacks as part of the threat model.
- Chapter 26 requires a reconstructable path from authorized evidence to analytical conclusion to AI synthesis to human decision.

## Important non-claims

This chapter does **not** claim that:

- every AI model must be intrinsically interpretable;
- post-hoc explanations are always invalid;
- SHAP, LIME, chain-of-thought, or any particular explanation method is universally required;
- citations guarantee factual correctness;
- provenance guarantees truth;
- an LLM can never generate a faithful explanation;
- human review guarantees safe decisions;
- explainability alone establishes model validity;
- one explanation metric is sufficient for all use cases;
- every contradictory source can be automatically identified or reconciled;
- ISO/IEC 42001 mandates a particular AI-IDSS architecture;
- NIST AI RMF 1.0 is the final immutable version of the framework.

## Falsifiability

The chapter's recommendations should be revisited if credible evidence demonstrates that, for the specific AI-IDSS use case:

1. a particular post-hoc explanation method is demonstrably faithful and robust under representative evaluation;
2. automated evidence validation achieves sufficiently reliable claim-source verification for the intended risk level;
3. a simpler evidence/explanation architecture provides equal or better decision utility and auditability;
4. contradictory-evidence detection materially harms decision quality compared with a validated alternative;
5. post-deployment monitoring demonstrates that explanation quality remains stable under the actual operating distribution.

## Editorial conclusion

**PASS — Chapter 28 is substantively, evidentially, and architecturally hardened for the current scope.**

The governing principle is:

> **Do not ask only whether the AI can explain its answer. Ask whether the organization can reconstruct the claim, evidence, method, provenance, limitations, contradictions, and decision boundary well enough to challenge the answer.**

## Primary sources

- NIST, AI Risk Management Framework 1.0, NIST AI 100-1.
- NIST, AI Risk Management Framework — current status and resources.
- NIST, Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile, NIST AI 600-1.
- NIST, Challenges to the Monitoring of Deployed AI Systems, NIST AI 800-4, 2026.
- ISO/IEC 42001:2023, Artificial intelligence — Management system.
