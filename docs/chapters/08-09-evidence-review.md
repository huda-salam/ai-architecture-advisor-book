# Evidence Review — Chapters 8–9

## Purpose

This review establishes the evidence discipline for Chapters 8 and 9.

The book must distinguish **fact** from **inference**, **assumption**, and **recommendation**. Technical claims presented as facts must be traceable to authoritative evidence. Where evidence is incomplete, the text must say so rather than filling the gap with plausible-sounding language.

This review is therefore part of the architecture method, not merely a bibliography.

---

## 1. Evidence Standard

### Fact

A factual statement should be supported by an authoritative source appropriate to the claim—for example:

- a standards body or government publication;
- a primary technical specification or official product documentation;
- peer-reviewed research where the claim is scientific;
- an official contractual or regulatory source where the claim is legal or contractual; or
- directly verified project evidence.

### Theory

A conceptual statement derived from an established theory or academic framework.

### Industry Evidence

A claim supported by documented real-world implementation. An industry case is evidence of what happened in that context; it is **not automatically proof that the same architecture is optimal elsewhere**.

### Technical Evidence

A claim supported by technical standards, specifications, benchmarks, test results, or primary technical documentation.

### Inference

A conclusion derived from evidence. Inference must be labelled when a reasonable reader could otherwise mistake it for an established fact.

### Assumption

A deliberately introduced proposition used to test reasoning when required evidence is unavailable. Assumptions must be explicitly labelled.

### Recommendation

Advisor judgment based on evidence, constraints, assumptions, and trade-offs.

### Uncertainty

A material question for which evidence is insufficient or conflicting.

### Confidence

A judgment about the strength of the conclusion—not a substitute for evidence.

> **Rule: Confidence does not upgrade an unsupported claim into a fact.**

---

## 2. Enterprise AI Is More Than the Model

**Claim:** An enterprise AI capability should be evaluated as a system rather than as a model alone.

**Evidence:** NIST's Generative AI Profile treats risk across the AI lifecycle and discusses risks at model, application/implementation, and ecosystem levels. NIST describes the profile as a companion resource to AI RMF 1.0 for incorporating trustworthiness considerations into the design, development, use, and evaluation of AI systems. [NIST AI RMF: Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence-profile)

**Inference:** For architecture review, the model should therefore be considered one component within a larger system of data, software, infrastructure, controls, users, and operational processes.

**Confidence:** High for the system-level framing.

**Important distinction:** The six-layer architecture used in Chapter 8 is an **advisor's logical architecture model**, not a NIST-defined canonical architecture. It is a reasoning tool created for this handbook.

---

## 3. RAG Is an Architecture Pattern, Not a Guarantee

**Claim:** Retrieval-Augmented Generation can connect a model to external knowledge, but the existence of a vector database or retrieval component does not by itself establish answer correctness, authorization correctness, or freshness.

**Evidence:** OWASP's GenAI security work identifies vector and embedding weaknesses as security concerns in its 2025 guidance, and the current 2026 release continues to address security risks across LLM applications. [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/)

**Inference:** A RAG system should therefore be evaluated end-to-end: ingestion → indexing → authorization → retrieval → ranking → context construction → generation → evidence presentation.

**Confidence:** High for the architectural review principle.

**Assumption used in Chapter 8:** The handbook assumes that enterprise knowledge is sufficiently structured and accessible to support an explicit retrieval architecture. This assumption must be validated for each implementation.

---

## 4. Deterministic Controls vs LLM Judgment

**Claim:** Authorization, accounting calculations, policy gates, and other controls with deterministic semantics should normally not be delegated solely to unconstrained language-model judgment.

**Evidence:** OWASP's current GenAI security guidance identifies risks including prompt injection, sensitive information disclosure, excessive agency, supply-chain risk, and improper output handling. The 2026 OWASP release is the current Top 10 release as of this edition of the handbook. [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/)

**Inference:** Where a system can separate model reasoning from authorization and execution, explicit policy and authorization controls provide a stronger architectural boundary than treating the model's output as authority.

**Recommendation:** For consequential enterprise actions, use explicit permission boundaries and, where required by the use case, human approval.

**Confidence:** High for the separation-of-concerns principle; exact implementation is context-dependent.

---

## 5. Numerical Probabilities Need Defined Semantics

**Claim:** “Probability of material deterioration = 68%” should not be treated as a calibrated probability merely because an LLM generated the number.

**Basis:** A probability claim has a defined statistical meaning only when the event, reference population or prediction target, estimation procedure, and interpretation are defined. Calibration is a statistical property that must be evaluated; linguistic plausibility is not equivalent to calibration.

**Inference:** If an AI-IDSS presents a numerical probability, the architecture should identify its computational origin—for example, a statistical model, supervised classifier, calibrated predictive model, ensemble, or another explicitly defined method.

**Recommendation:** Do not label an LLM-generated judgment as a probability unless the system has a documented statistical interpretation and appropriate validation.

**Confidence:** High for the semantic distinction.

**Assumption for testing:** If the intended output is only a qualitative risk assessment, the interface should not use probability-like numbers merely to make the recommendation appear more precise.

---

## 6. “Data Cannot Leave” Does Not Imply “Build Our Own LLM”

**Claim:** A confidentiality, residency, or contractual restriction does not by itself determine the model deployment architecture.

**Reasoning:** The constraint must first be decomposed into questions such as:

- What data is restricted?
- Is processing, storage, or both restricted?
- Where may processing occur?
- Are third-party processors permitted?
- What retention rules apply?
- What network and identity controls are required?
- Can data be minimized, masked, tokenized, or otherwise transformed?
- What contractual commitments are required?

**Inference:** Only after these constraints are established can managed, self-hosted, hybrid, or other options be compared rationally.

**Confidence:** High as a decision-framework principle.

**Important caveat:** A technical capability does not establish legal, regulatory, or contractual compliance. Such requirements must be verified against the applicable authoritative legal, regulatory, security, and contractual sources.

**Assumption for testing:** If the actual requirement is “raw confidential records must never be processed by a third-party service,” then a managed external model may be excluded. That is a test assumption, not a universal rule.

---

## 7. “Enterprise”, “Private”, and “On-Premise” Are Not Security Properties

**Claim:** Deployment labels do not by themselves establish security.

**Evidence:** NIST AI RMF approaches AI trustworthiness and risk through explicit characteristics, controls, measurement, and lifecycle practices rather than through a hosting label. OWASP documents application-level GenAI risks that can arise regardless of a simple public/private distinction. [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) · [OWASP GenAI Security Project](https://genai.owasp.org/)

**Inference:** Architecture review should examine the actual control plane: identity, authorization, network boundaries, encryption, secrets, data handling, retention, logging, monitoring, isolation, incident response, and dependencies.

**Confidence:** High.

---

## 8. Self-Hosting Trades Managed-Service Responsibility for Organizational Responsibility

**Claim:** Self-hosting can increase control over the model-serving environment, but it also places more operational responsibility on the organization.

**Technical reasoning:** A self-hosted deployment requires the organization or its infrastructure operator to address the relevant serving infrastructure, capacity, availability, software maintenance, observability, security hardening, upgrades, incident response, and licensing obligations.

**Confidence:** High as an operational principle.

**Economic caveat:** Self-hosting is not inherently cheaper. Any TCO conclusion must use the actual workload, utilization, infrastructure pricing, engineering effort, reliability requirements, support model, and lifecycle assumptions.

**Assumption for testing:** A workload with high sustained utilization may have different economics from a low-volume or highly variable workload. This should be measured rather than asserted.

---

## 9. Security Baseline Must Be Version-Aware

As of **September 2026**, OWASP identifies its **GenAI LLM Top 10 2026** as the current release. The 2026 publication was released in August 2026 and is the appropriate current reference for version-sensitive statements about the OWASP LLM Top 10. [OWASP 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/) citeturn0search0

NIST's **Generative AI Profile (NIST AI 600-1)** was published July 26, 2024 and remains a companion resource to the AI RMF for generative-AI risk management. NIST's AI RMF site notes that the framework is being revised, so the book should distinguish the current published framework from future revisions. [NIST](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence-profile) citeturn0search1turn0search10

**Rule for this book:** Version-sensitive security claims must name the relevant version or link to the current authoritative source. The book should not silently carry forward obsolete security terminology.

---

## 10. Vendor Claims Require Primary-Source Verification

For claims about a commercial model or platform, the book must not infer capabilities from the vendor's brand position or from secondary commentary.

Examples of claims that require current primary evidence before being presented as facts:

- whether customer data is retained;
- whether data is used for training or service improvement;
- supported data-residency regions;
- encryption behavior;
- private networking options;
- identity and access-control integration;
- service-level commitments;
- model availability;
- context limits;
- pricing;
- rate limits;
- supported APIs;
- deployment options; and
- model lifecycle or deprecation policies.

**Required source order:**

1. current contractual terms where applicable;
2. official security/privacy documentation;
3. official technical documentation;
4. official pricing/service documentation;
5. authoritative standards or regulators where relevant;
6. independent evidence such as peer-reviewed research or reputable testing;
7. secondary commentary only as supporting context.

**Rule:** A vendor claim is evidence of what the vendor states, not independent proof that the capability performs as claimed.

---

## 11. Industry Cases Are Evidence, Not Templates

A documented enterprise implementation can demonstrate that an architecture or operating model was used in a particular context.

It does **not** prove that the same architecture is optimal for this organization.

When the book later presents a case study, record:

> Context → Requirement → Constraints → Architecture → Decision → Outcome → Evidence → Transferable lesson → Non-transferable assumptions

This prevents successful case studies from becoming cargo-cult architecture.

---

## 12. Assumptions Are Allowed—But Must Be Visible

The handbook may use assumptions to help readers reason about an architecture.

For example:

> **Assumption:** The portfolio risk workflow requires current financial data and supporting investment documents, and the organization can identify authoritative sources for both.

This assumption allows the reader to test the architecture:

> If the assumption is false, which part of the architecture changes?

That is useful reasoning. What is not acceptable is silently converting the assumption into a fact.

A useful notation is:

> **Assumption → Consequence → Evidence Needed → Decision if False**

---

## 13. What Would Change the Advisor's Mind?

For material architecture decisions, define reversal conditions.

Examples:

- authoritative legal or regulatory interpretation changes the permissible processing boundary;
- contractual terms differ materially from assumptions;
- measured workload volume changes TCO;
- evaluation shows that the selected model misses the required quality threshold;
- measured latency or availability invalidates the design;
- sustained utilization changes self-hosting economics;
- a new interoperability constraint appears; or
- security assessment identifies unacceptable residual risk.

This turns architecture review into a testable decision process rather than a one-time opinion.

---

## 14. Adversarial Review of Chapters 8–9

Before accepting a material claim, the advisor should attempt to disprove it.

### Challenge 1 — “The LLM can do the analysis.”

Ask:

- Which analysis?
- What accuracy is required?
- Is the task deterministic, statistical, retrieval-based, or generative?
- What evidence demonstrates that the chosen method is fit for the task?

### Challenge 2 — “RAG solves hallucination.”

Ask:

- What evidence is retrieved?
- Is retrieval complete and authorized?
- What happens when evidence is missing or contradictory?
- How is answer faithfulness evaluated?

### Challenge 3 — “Private deployment is safer.”

Ask:

- Safer against which threat?
- Which control improves?
- Which new operational risks are introduced?
- What evidence demonstrates the net reduction in risk?

### Challenge 4 — “Self-hosting is cheaper.”

Ask:

- At what utilization?
- Including engineering and operations?
- Including redundancy and incident response?
- Compared with which managed-service price and contract?

### Challenge 5 — “We need our own LLM because the data is confidential.”

Ask:

- What exactly must remain inside the controlled boundary?
- Can the data be minimized or transformed?
- What managed-service controls are contractually and technically available?
- Is the actual requirement legal, contractual, security, or merely organizational preference?

### Challenge 6 — “The model says 68%.”

Ask:

- What event is being predicted?
- What is the target definition?
- What model produced the number?
- How was it validated?
- Is it calibrated?
- What population does the probability refer to?
- How is drift monitored?

If these questions cannot be answered, the number should not be treated as a statistically meaningful probability.

---

## 15. Chapter 8–9 Review Checklist

### System
- What business decision or task is supported?
- What is the authoritative source for each important fact?
- Which components are deterministic and which are probabilistic?
- Which claims are facts, and which are recommendations or assumptions?

### Model
- What claim does each model make?
- Is the method appropriate for that claim?
- How is quality evaluated?
- Which model/version was actually tested?

### Knowledge / RAG
- How is evidence retrieved?
- How is authorization enforced during retrieval?
- How is freshness measured?
- How are contradictory sources handled?

### Security
- What data crosses each trust boundary?
- Who can access it?
- What happens to prompts, outputs, and logs?
- Which current threat framework is being used?

### Operations
- What happens when the model/provider fails?
- What are latency, throughput, and availability requirements?
- How are costs measured?
- What is the exit path?

### Decision integrity
- Where does AI stop and human authority begin?
- Can the organization reconstruct why an important recommendation was produced?
- What evidence would cause the recommendation to be reversed?

---

## Field Rule

> **Never silently turn an assumption into a fact. Never present a plausible technical statement as established knowledge without an authoritative basis. When evidence is incomplete, say so—and use the uncertainty to improve the architecture question.**
