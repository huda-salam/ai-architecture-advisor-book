# Evidence Review — Chapters 8–9

## Purpose

This review records the evidence basis, confidence level, and caveats behind important architecture claims in Chapters 8 and 9. It distinguishes established guidance, technical inference, and advisor judgment.

## 1. Enterprise AI Is More Than the Model

**Claim:** An enterprise AI capability should be evaluated as a system comprising models, data, retrieval/knowledge, orchestration, applications, infrastructure, security, governance, evaluation, and operational controls.

**Evidence:** NIST's Generative AI Profile treats risk management across the AI lifecycle and addresses risks involving models, applications, cloud services, acquisition, and organizational processes. [NIST AI RMF: Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence-profile)

**Basis:** Consistent with socio-technical systems thinking: outcomes depend on interactions among technical components, people, processes, and controls.

**Confidence:** High.

**Advisor implication:** A proposal specifying only a model while ignoring data authority, authorization, retrieval, workflow, evaluation, reliability, or operations is incomplete.

## 2. RAG Is an Architecture Pattern, Not a Guarantee

**Claim:** RAG can connect a model to external enterprise knowledge, but a vector database or retrieval layer does not by itself establish answer quality or authorization correctness.

**Evidence:** OWASP's GenAI/LLM guidance treats vector and embedding components as security-relevant attack surfaces. [OWASP GenAI Security Project](https://genai.owasp.org/llm-top-10/)

**Inference:** Evaluate RAG end-to-end: ingestion → indexing → authorization → retrieval → ranking → context construction → generation → evidence presentation.

**Confidence:** High.

## 3. Deterministic Controls vs LLM Judgment

**Claim:** Authorization, accounting calculations, policy gates, API contracts, and other deterministic controls should normally remain deterministic rather than being delegated to unconstrained LLM judgment.

**Evidence:** OWASP identifies prompt injection, sensitive information disclosure, improper output handling, and excessive agency as GenAI risks. [OWASP GenAI LLM Top 10](https://genai.owasp.org/llm-top-10/)

**Architectural pattern:**

```text
Model proposes
      ↓
Policy / Authorization
      ↓
Optional Human Approval
      ↓
Tool / API execution
      ↓
Audit
```

**Confidence:** High for the principle; implementation remains context-dependent.

## 4. Numerical Probabilities Need Defined Semantics

**Claim:** “Probability of material deterioration = 68%” should not be treated as a calibrated probability merely because an LLM generated the number.

**Basis:** A probability estimate requires a defined event, reference population, estimation procedure, and interpretation. Calibration is distinct from language fluency.

**Architecture implication:** Identify whether the number comes from a statistical model, supervised classifier, calibrated predictive model, ensemble, deterministic score, or explicitly qualitative/LLM assessment. If it is presented as a genuine probability, define validation, calibration, monitoring, and interpretation.

**Confidence:** High.

**Red flag:** A numerical probability with no documented model, target definition, validation/calibration method, monitoring approach, or interpretation rule is an evaluation gap.

## 5. “Data Cannot Leave” Does Not Imply “Build Our Own LLM”

**Claim:** A confidentiality, residency, or contractual restriction does not by itself determine model deployment architecture.

**Reasoning:** First establish what data is restricted; whether processing, storage, or both are restricted; geography; contractual requirements; encryption; retention; identity/network controls; third-party processing restrictions; and whether minimized or transformed data can be processed outside the controlled boundary.

**Confidence:** High as a decision-framework principle.

**Caveat:** Technical controls do not prove legal or contractual compliance. Those requirements must be verified with the appropriate legal, compliance, security, and contractual authorities.

## 6. “Enterprise” or “Private” Does Not Automatically Mean Secure

**Claim:** Deployment labels are not security properties.

**Evidence:** NIST AI RMF and its GenAI Profile emphasize explicit trustworthiness characteristics, controls, measurement, and lifecycle practices. OWASP identifies application-level vulnerabilities independent of a simple hosting label. [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) · [OWASP](https://genai.owasp.org/)

**Advisor test:** Review identity, authorization, network boundaries, encryption, secrets, data handling, retention, logging, monitoring, isolation, incident response, and supply-chain dependencies.

**Confidence:** High.

## 7. Self-Hosting Trades Managed-Service Burden for Responsibility

**Claim:** Self-hosting can increase infrastructure and serving control, but transfers responsibilities such as capacity, availability, patching, serving software, observability, hardening, upgrades, incident response, and licensing compliance to the organization.

**Confidence:** High.

**Economic caveat:** Self-hosting is not inherently cheaper. TCO depends on utilization, model size, infrastructure pricing, engineering, reliability requirements, support, and lifecycle costs.

## 8. Security Baseline

Use the **current OWASP GenAI/LLM Top 10** for threat-oriented review rather than relying on old 2023 terminology. The project has evolved through 2025 and 2026 releases. Version-sensitive claims should point to the current project. [OWASP current project](https://genai.owasp.org/initiatives/top-10-for-llm-and-genai/)

NIST AI RMF remains a complementary risk-management framework. Its GenAI Profile was published in 2024 and is intended to help organizations govern, map, measure, and manage GenAI risks across the lifecycle. [NIST](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence-profile)

## 9. Evidence Classification

| Label | Meaning |
|---|---|
| **Fact** | Directly supported by authoritative evidence or verified technical documentation |
| **Theory** | Supported by an established conceptual or academic framework |
| **Industry Evidence** | Supported by documented real-world implementation |
| **Technical Evidence** | Supported by standards, specifications, or primary technical documentation |
| **Inference** | Reasoned conclusion from evidence |
| **Assumption** | Temporarily accepted because evidence is incomplete |
| **Recommendation** | Advisor judgment based on evidence and constraints |
| **Uncertainty** | Material information that remains unresolved |

A recommendation must not be presented as fact merely because it is technically plausible.

## 10. What Would Change the Advisor's Mind?

For material architecture decisions, define reversal conditions. Examples include:

- a regulatory interpretation changes the permissible processing boundary;
- vendor contractual controls differ materially from assumptions;
- workload measurements change TCO;
- evaluation shows the model misses the required quality threshold;
- measured latency or availability invalidates the design;
- sustained utilization changes the economics of self-hosting;
- a new interoperability constraint appears; or
- security assessment identifies unacceptable residual risk.

## 11. Chapter 8–9 Review Checklist

### System
- What business decision or task is supported?
- What is the authoritative source for each important fact?
- Which components are deterministic and which are probabilistic?

### Model
- What claim does each model make?
- Is the method appropriate for that claim?
- How is quality evaluated?

### Knowledge / RAG
- How is evidence retrieved?
- How is authorization enforced during retrieval?
- How is freshness measured?
- How are contradictory sources handled?

### Security
- What data crosses each trust boundary?
- Who can access it?
- What happens to prompts, outputs, and logs?
- Which AI-specific threats are tested?

### Operations
- What happens when the model/provider fails?
- What are latency, throughput, and availability requirements?
- How are costs measured?
- What is the exit path?

### Decision integrity
- Where does AI stop and human authority begin?
- Can the organization reconstruct why an important recommendation was produced?
- What evidence would cause the recommendation to be reversed?

## Field Rule

> **Do not recommend an architecture merely because it is possible. Recommend it because the evidence, constraints, economics, risk posture, and decision requirements justify it—and record what evidence would cause the recommendation to change.**
