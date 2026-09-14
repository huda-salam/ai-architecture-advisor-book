# Chapter 27 — Iteration 4: Final Evidence & Adversarial Review

## Status

**PASS — final review for current scope.**

This pass re-checks Chapter 27 against the architecture spine through Chapter 26 and current NIST evidence, with special attention to probability semantics, post-deployment monitoring, and decision authority.

## 1. Probability semantics remain the primary invariant

The chapter must never allow an illustrative value such as **68%** to acquire empirical authority merely because it appears in a dashboard or executive interface.

A probability claim requires a defined event, horizon, population, information set, estimation method, evaluation procedure, and relevant calibration evidence. If those are absent, the output should be described as a score, signal, or assessment rather than silently called a probability.

## 2. Prediction and decision policy remain separate

The chapter correctly separates:

**Observation → Analytical signal → Prediction → Interpretation → Recommendation → Human decision**

An alert threshold is a decision policy. It is not automatically a model property. Threshold selection therefore belongs to the decision/governance layer and should reflect consequences, capacity, urgency, reversibility, and risk appetite rather than an arbitrary percentage.

The 60% threshold used in examples remains explicitly illustrative.

## 3. Calibration is not replaced by discrimination

A strong ranking metric does not, by itself, establish that numerical probabilities are calibrated. Chapter 27 therefore retains separate treatment of discrimination, calibration, stability, and decision utility.

No single metric is presented as universally sufficient.

## 4. LLM confidence is not silently promoted to probability

The chapter deliberately avoids the overclaim that LLM-generated probabilities are impossible. The defensible rule is narrower:

> An LLM-generated confidence-like value must not be represented as a calibrated event probability unless the specific mechanism has been evaluated for that purpose on a representative task and population.

This remains consistent with Chapter 26's requirement that consequential analytical semantics come from identifiable analytical components rather than being invented by the synthesis layer.

## 5. Leakage and information-time boundaries

Temporal leakage is treated as a model-validity issue, not merely a data-engineering defect. Historical evaluation must respect what information was actually available at prediction time.

This is particularly important for financial statements, restatements, analyst judgments, document versions, market information, and post-event restructuring data.

## 6. Evidence chain remains explicit

The chapter preserves the Chapter 26 evidence chain:

**Source → Integration → Validation/Reconciliation → Features/Signals → Analytical Model → Calibration → Policy → Alert → LLM Synthesis → Human Decision**

The LLM explanation is not treated as primary evidence merely because it is fluent.

## 7. Post-deployment monitoring is now explicitly version-aware

NIST AI 800-4 (March 2026) describes post-deployment AI monitoring as important for validating real-world operation, identifying unforeseen outputs, and detecting unexpected consequences, while also noting that monitoring methods and terminology remain comparatively nascent and fragmented. citeturn0search0turn0search1

Accordingly, Chapter 27 should not imply that monitoring has a universally settled methodology. The recommended monitoring dimensions—data drift, calibration drift, coverage, alert rate, missingness, outcome performance, and operational health—are architecture recommendations selected for the AI-IDSS use case.

## 8. NIST framework status

NIST AI RMF 1.0 remains a versioned authoritative framework reference, but NIST states that AI RMF 1.0 is being revised. The chapter therefore avoids presenting AI RMF 1.0 as immutable or mandatory. citeturn0search3turn0search9

The Generative AI Profile remains a companion profile for AI RMF 1.0 and is voluntary. citeturn0search2

## 9. Insufficient-evidence state is architecturally important

The chapter correctly permits an output such as:

> **Insufficient evidence to estimate a calibrated probability. Risk indicators are elevated; human review recommended.**

This is not a failure of the AI-IDSS. It is an explicit system state that prevents unsupported numerical precision from being mistaken for knowledge.

## 10. Cross-chapter consistency

### Chapter 19 — Security
The risk alert must not bypass security or trust boundaries.

### Chapter 20 — Identity
The alert must be generated from data the requesting workflow is authorized to access.

### Chapter 21 — Data Protection
Sensitive evidence must remain subject to classification, protection, retention, and disclosure controls.

### Chapter 22 — AI Threats
Prompt injection, poisoning, tool misuse, and other attacks can corrupt the evidence or control path; a plausible-looking alert is not proof of integrity.

### Chapter 23 — Integration
Data meaning, authority, freshness, and failure semantics must survive system boundaries.

### Chapter 24 — API
APIs and downstream interfaces must enforce their own authorization and operational contracts.

### Chapter 25 — Connectors
Connector calls must preserve identity, authority, semantic integrity, and traceability.

### Chapter 26 — AI-IDSS Reference Architecture
Chapter 27 is a concrete instantiation of the reference architecture, not a competing architecture.

## 11. Adversarial objections

**Objection:** “The executive needs one number.”

**Resolution:** A number may be useful, but the architecture must preserve its semantics and uncertainty. Executive simplicity must not be achieved by deleting the conditions that make the number meaningful.

**Objection:** “We have too little historical data, so use the LLM to estimate the probability.”

**Resolution:** Lack of evidence is not solved by linguistic confidence. Use a clearly labeled signal/rule/scenario or explicitly report insufficient evidence.

**Objection:** “The model has 95% AUC, therefore 68% is trustworthy.”

**Resolution:** Discrimination and probability calibration answer different questions.

**Objection:** “Human approval makes the alert safe.”

**Resolution:** Human authority is a decision boundary, not a substitute for valid evidence, authorization, data protection, model evaluation, or auditability.

**Objection:** “Monitoring will catch degradation.”

**Resolution:** Monitoring improves visibility but does not guarantee detection of every failure. NIST's 2026 monitoring report explicitly identifies unresolved gaps and open questions.

## 12. Final non-claims

Chapter 27 does **not** claim that:

- 68% is a real investment probability;
- 60% is a recommended threshold;
- AUC is sufficient for risk-model approval;
- Brier score is sufficient for calibration approval;
- every investment-risk problem requires ML;
- every risk model requires an LLM;
- every LLM probability is invalid;
- human review guarantees safe decisions;
- post-deployment monitoring guarantees model validity;
- one calibration method is universally superior;
- one model family is universally appropriate.

## Conclusion

**Chapter 27 passes the final evidence/adversarial review for the current scope.**

Its architectural contribution is the disciplined separation of **risk signal, statistical probability, evidence, recommendation, policy threshold, and human investment decision**. That separation is essential to prevent a polished AI-IDSS interface from granting unsupported numerical outputs more authority than the underlying evidence warrants.
