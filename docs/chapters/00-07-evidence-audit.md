# Evidence Audit — Chapters 0–7

## Purpose

This audit applies the handbook's evidence standard to Chapters 0–7. It is an editorial control document, not a substitute for source material in later technical chapters.

The review distinguishes:

- **Fact** — supported by authoritative or directly verifiable evidence.
- **Theory** — established academic or conceptual basis.
- **Industry evidence** — documented implementation or outcome; not proof of universal optimality.
- **Technical evidence** — standards, specifications, primary documentation, benchmarks, or direct measurements.
- **Inference** — conclusion derived from evidence.
- **Assumption** — proposition used for scenario reasoning but not established as fact.
- **Recommendation** — advisor judgment.
- **Uncertainty** — material issue not yet resolved.

## Audit conclusion

Chapters 0–7 are predominantly a **professional advisory framework**, rather than a catalogue of empirical technical facts. Most statements are therefore recommendations, decision heuristics, role definitions, or proposed operating methods. They should not be rewritten as universal laws.

The audit found no need to remove the core framework. However, several statements require explicit evidence classification so that a future reader does not mistake advisor doctrine for established fact.

### Required editorial rule

> **Do not silently convert an advisory principle, illustrative example, or scenario assumption into a factual claim.**

Where a chapter uses an example such as a GPU cluster, managed inference, RAG, fine-tuning, vendor lock-in, or human approval, the example is illustrative unless accompanied by evidence applicable to the actual workload.

## Chapter-by-chapter findings

| Chapter | Main content type | Evidence status | Editorial action |
|---|---|---|---|
| 0. Reasoning & Evidence | Methodology | Recommendation / operating standard | Keep. Treat the confidence scale as an internal advisory convention, not a scientific probability scale. |
| 1. Role Charter | Role definition | Mandate / recommendation | Keep. Role boundaries are organizational design, not external facts. The technical examples must remain conditional. |
| 2. Relationship with RD | Advisory method | Recommendation / inference | Keep. Do not present the advisor/RD boundary as a universal governance model; it is the operating model for this role. |
| 3. CTO, Head of AI & Vendors | Challenge / dissent method | Recommendation | Keep. Vendor claims should be verified against current primary evidence before being repeated as facts. |
| 4. Operating Principles | Architecture doctrine | Recommendation + standards-aligned principles | Keep. Security/risk principles are consistent with NIST risk-management guidance; the chapter's preferred patterns remain recommendations. |
| 5. Advisory Communication | Communication method | Recommendation / illustrative examples | Keep. The C-A-E-I-R and other formulas are handbook methods, not established scientific laws. |
| 6. Proposal Evaluation | Architecture evaluation framework | Recommendation / technical reasoning | Keep. Illustrative scoring must never be reused as factual benchmark data. |
| 7. Architecture Decisions | ADR / decision method | Recommendation + established practice | Keep. ADR practice is supported by documented software-architecture practice; the handbook's specific ADR fields remain a tailored template. |

## Claims that require careful classification

### 1. Security by design

The handbook recommends treating security as an architectural concern rather than only a final approval gate. This is best presented as a **security engineering principle / recommendation**, not as an empirical claim that every organization must implement it identically.

NIST CSF 2.0 provides a risk-management framework for understanding, assessing, prioritizing, and communicating cybersecurity risk, while NIST AI RMF applies trustworthiness considerations to the design, development, use, and evaluation of AI systems. These support the handbook's emphasis on integrating risk considerations into architecture, but they do not prescribe one universal architecture. 

### 2. AI systems and socio-technical risk

Where the handbook discusses AI systems as more than model capability, the strongest authoritative basis is NIST AI RMF. NIST explicitly describes trustworthy AI characteristics and treats them as socio-technical system attributes. This supports framing architecture as involving technology, controls, processes, and human responsibilities rather than only model selection.

### 3. Architecture decision records

Chapter 7's ADR approach is consistent with documented architecture practice. Michael Nygard's original ADR article describes keeping concise records for architecturally significant decisions and preserving context, decision, and consequences. This is **documented engineering practice**, not a standards-mandated universal format.

### 4. Technical debt

Chapter 7 uses technical debt as a decision concept. Peer-reviewed software-engineering research supports the broad idea that shortcuts or non-optimal solutions can create future maintenance or other costs. The chapter's statement that technical debt can be deliberate does not mean every shortcut is rational; it remains an advisory judgment requiring explicit trade-off analysis.

### 5. Weighted decision matrices

The handbook correctly treats numerical scoring as a decision aid rather than objective truth. The weights and scores are judgments unless supported by measurable evidence. Sensitivity analysis should therefore be used when the decision is material.

### 6. Reversibility

The handbook treats reversibility as an architecture consideration. This is a **decision heuristic**, not a claim that reversibility is always preferable. Portability and reversibility themselves have cost and may conflict with optimization, performance, security, or other requirements.

### 7. Human decision boundary

“AI recommends; authorized humans decide” is a **recommended control pattern for consequential capital-allocation use cases**, not a universal statement about all AI systems. The actual boundary should be determined by risk, governance, applicable law/regulation, and organizational authority.

## Illustrative examples — do not treat as facts

The following examples in Chapters 0–7 are intentionally hypothetical or illustrative and should remain visibly so:

- “Company data cannot leave our environment.”
- “We need real-time data.”
- “We need Kubernetes.”
- “We need an agent.”
- “We need fine-tuning.”
- “We need our own LLM.”
- dedicated GPU cluster examples;
- illustrative decision-matrix scores;
- illustrative risk likelihood/impact values;
- sample evaluation results such as “7% unsupported conclusions.”

These examples are useful because they teach the reader how to challenge a proposal. They are **not evidence that the stated architecture is actually required or that the numerical value is real**.

## Evidence hierarchy for future revisions

For a material claim, prefer the following evidence appropriate to the claim:

1. Law, regulation, or binding contractual requirement where applicable.
2. Standards and authoritative government guidance.
3. Peer-reviewed research or systematic reviews for empirical/theoretical claims.
4. Primary technical documentation and specifications.
5. Independent evaluations and reproducible measurements.
6. Documented production evidence / case studies.
7. Expert judgment.
8. Assumption, explicitly labelled.

The order is not a universal ranking of truth. Applicability to the specific question matters.

## What should change the advisor's mind?

For any material recommendation, record:

> **Recommendation → Evidence → Assumptions → Uncertainty → Reversal condition**

Examples:

- If a security requirement cannot be satisfied by the proposed managed architecture, reassess self-hosting or alternative deployment models.
- If representative workload testing demonstrates materially different latency, throughput, or cost characteristics, update the architecture comparison.
- If a vendor's contractual or technical controls differ from the assumptions used in the assessment, update the security and dependency analysis.
- If a simpler architecture fails a validated requirement, remove the simplicity preference for that requirement.

## Current authoritative reference anchors

### NIST AI RMF 1.0

NIST AI RMF 1.0 is a voluntary framework for organizations designing, developing, deploying, or using AI systems to manage AI risks and promote trustworthy and responsible AI. NIST describes the framework as flexible and use-case agnostic. The NIST AI RMF is currently being revised, so future editions of this handbook must check the current NIST status before describing AI RMF 1.0 as the latest version.

Source: NIST, *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*, 2023.

### NIST Generative AI Profile

NIST published the *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile* in July 2024 as a companion profile for generative AI. It should be used for GenAI-specific risk discussions, together with current NIST status information.

Source: NIST AI 600-1, 2024.

### NIST Cybersecurity Framework 2.0

NIST CSF 2.0 provides a taxonomy of cybersecurity outcomes for organizations to understand, assess, prioritize, and communicate cybersecurity risk. It does not prescribe a single implementation architecture.

Source: NIST CSWP 29, 2024.

### Architecture Decision Records

Michael Nygard's *Documenting Architecture Decisions* is a primary historical source for the lightweight ADR practice used in Chapter 7. The handbook adopts the practice but tailors the fields to the advisor's role.

### Technical debt

Peer-reviewed IEEE/ACM research provides the evidence base for describing technical debt as shortcuts or non-optimal solutions that can impose future costs. The handbook should avoid treating any single technical-debt metric or taxonomy as universally authoritative.

## Audit limitations

This is a **claim-classification and source-alignment audit**, not a line-by-line empirical validation of every sentence against the entire research literature. Chapters 0–7 contain many normative statements and examples for which external factual verification is neither necessary nor appropriate. When later chapters introduce concrete claims about products, model capabilities, security controls, performance, pricing, regulations, or production outcomes, those claims require separate current-source verification.

## Editorial field rule

> **If a sentence can materially influence an architecture decision, the reader should be able to tell whether it is a fact, theory, evidence, inference, assumption, recommendation, or uncertainty.**
