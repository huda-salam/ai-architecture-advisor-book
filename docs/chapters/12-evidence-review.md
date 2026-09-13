# Evidence Review — Chapter 12

## Purpose

This review hardens Chapter 12, **Enterprise Data Architecture**, against the book's evidence standard. It separates established technical evidence from architectural inference and advisor recommendation.

## 1. Core Claims

### Claim A — Enterprise data architecture is broader than storage technology

**Classification:** Technical evidence + inference.

NIST's enterprise-architecture terminology treats architecture as an organized description of information, systems, interfaces, technology, security posture, and transition toward a target architecture. NIST's data-governance work also explicitly includes governance/stewardship, lifecycle management, integration, storage, access, metadata, provenance, lineage, analytics/AI, and disposition.

**Implication:** A data architecture review should not be reduced to selecting a database, warehouse, lake, or lakehouse.

**Confidence:** High.

**Source:** NIST CSRC Enterprise Architecture glossary; NIST Data Governance and Management Profile work. 

## 2. Source Systems and Derived Data

### Claim B — AI-derived artifacts should not silently replace authoritative source data

**Classification:** Architectural principle / recommendation.

This is primarily an architecture-control recommendation rather than a universal technical law. A derived dataset, feature, embedding, extraction, summary, or recommendation can be operationally useful without becoming the authoritative record of the underlying business fact.

**Advisor test:** For every important value, identify the system or process that is authoritative for the underlying fact and distinguish it from downstream representations.

**Confidence:** High as an architectural control principle.

**What could change the recommendation?** A documented governance decision may deliberately designate a derived system as the authoritative source for a particular business object. In that case, the authority and lifecycle must be explicitly defined rather than assumed.

## 3. Data Quality Is Fitness-for-Use

### Claim C — Data quality cannot be represented adequately by a single universal score

**Classification:** Technical evidence + inference.

ISO 8000-1 establishes principles and concepts for information and data quality. ISO 8000-8 addresses concepts and measurement of information and data quality. ISO 8000-82:2022 addresses creation of data rules and notes that data profiling can contribute to effective rules.

ISO 8000-140 also makes an important qualification: requirements for completeness depend on factors such as the type of data, industry, use, and needs of the parties. Therefore, quality requirements must be related to intended use rather than treated as universally identical.

**Confidence:** High.

**Sources:** ISO 8000-1:2022; ISO 8000-8:2015; ISO/TS 8000-82:2022; ISO 8000-140:2016.

## 4. Provenance and Lineage

### Claim D — Provenance materially improves the ability to understand where data came from and how it changed

**Classification:** Technical evidence.

NIST defines provenance in terms of chronology concerning origin, development, ownership, location, and changes associated with systems and data. ISO 8000-120 specifies requirements for representing and exchanging provenance information for relevant master-data scenarios.

**Architectural implication:** Important AI-IDSS outputs should retain enough provenance information to reconstruct the relevant data path and identify the source and transformations involved.

**Important limitation:** Provenance does not by itself prove that the underlying data is accurate. It establishes origin/history information; accuracy and other quality characteristics require additional controls.

**Confidence:** High.

## 5. Data Rules and Quality Gates

### Claim E — Data quality rules can be represented as machine-processable controls

**Classification:** Technical evidence.

ISO/TS 8000-82:2022 describes data rules and their application to common data types and notes the role of data profiling in formulating effective rules.

**Architectural inference:** For consequential AI workflows, some quality failures should be capable of changing downstream behavior—for example, quarantine, rejection, or human review—rather than merely generating an informational log entry.

**Confidence:** High for the existence/usefulness of data rules; medium for the specific blocking pattern because the appropriate threshold is workload-specific.

## 6. Semantic Consistency

### Claim F — More data does not necessarily produce better decision support

**Classification:** Inference.

This conclusion follows from the dependency chain:

> decision → required meaning → data definition → data transformation → analytical/AI processing.

If identical terms represent materially different concepts across systems, aggregation can introduce semantic error even when the underlying records are syntactically valid.

**Confidence:** High as a reasoning principle; the magnitude of impact is use-case dependent.

**Advisor test:** Before requesting additional data, ask whether the organization has resolved the meaning of the data it already possesses.

## 7. Freshness

### Claim G — “Real-time” is not automatically an architectural requirement

**Classification:** Inference / recommendation.

The required freshness of a dataset should be derived from the decision or operational consequence of delay. A lower-latency architecture may be justified when stale information materially changes the decision or risk; otherwise, additional latency engineering may provide little business value.

**Assumption to expose:** the organization can identify a measurable consequence of stale information.

**What would change our mind?** Evidence that delayed information causes material decision error, loss, regulatory exposure, or unacceptable operational risk.

## 8. Access Control and Portfolio Isolation

### Claim H — Authorization must be enforced in the data-access path, not delegated solely to an LLM instruction

**Classification:** Security architecture principle.

An LLM instruction such as “do not reveal Company A information” is not equivalent to an authorization control. The architecture should enforce access before protected data is supplied to downstream reasoning components.

**Confidence:** High.

**Advisor test:** Attempt to demonstrate that a request associated with Portfolio Company B cannot retrieve Company A's protected records through alternate query paths, tools, indexes, or cached representations.

## 9. RAG Data Architecture

### Claim I — Retrieval authorization is part of RAG architecture

**Classification:** Architectural inference grounded in access-control principles.

RAG does not remove the authorization requirements of its source documents. The retrieval layer therefore needs to preserve the applicable access policy and provenance of the retrieved evidence.

**Confidence:** High as an architecture requirement; exact implementation depends on the retrieval technology and identity model.

## 10. AI-IDSS Data Chain

### Claim J — A defensible AI-IDSS should be able to trace an important recommendation back toward its evidence

**Classification:** Recommendation.

A practical chain is:

`source → ingestion → validation → transformation → analytical/retrieval input → model/rule/LLM → evidence → conclusion → recommendation`

This is not a claim that every internal intermediate representation must always be retained. Retention should be governed by risk, audit, privacy, cost, and reproducibility requirements.

**Confidence:** High as a design recommendation for consequential decision support.

## 11. Claims That Must Not Be Overstated

The chapter should **not** imply the following as universal facts:

- every organization needs a lakehouse;
- every AI system needs streaming ingestion;
- every dataset needs the same freshness target;
- every data-quality dimension must be maximized simultaneously;
- a central data team should own every business definition;
- vector databases are inherently required for RAG;
- one storage technology is sufficient for all enterprise workloads;
- provenance guarantees accuracy;
- data lineage alone makes an AI recommendation explainable;
- more data necessarily improves an AI system;
- a data lake, warehouse, or lakehouse is inherently more secure than another pattern.

These should remain workload- and control-dependent architectural questions.

## 12. Evidence Classification Used in Chapter 12

| Statement type | Treatment |
|---|---|
| ISO/NIST definition or requirement | **Fact / Technical evidence** |
| Documented architecture pattern | **Technical evidence / Industry evidence** |
| “This architecture should…” | **Recommendation** unless backed by a requirement |
| “This implies…” | **Inference** |
| Workload-specific threshold | **Assumption / Requirement** until validated |
| Vendor product capability | **Current technical evidence**, verified against primary documentation |
| AI-IDSS design choice | **Recommendation**, subject to constraints and evidence |

## 13. Advisor Review Checklist

Before approving a data architecture, ask:

1. What are the authoritative source systems?
2. Which data is copied, transformed, or derived?
3. Can each material transformation be reproduced?
4. What does each important business term mean?
5. Who owns that definition?
6. What is the maximum acceptable data age for each decision?
7. What quality failures block downstream use?
8. How are exceptions quarantined and resolved?
9. Can the organization trace important outputs to source evidence?
10. Are access controls enforced before retrieval or model inference?
11. Can one portfolio company access another's protected data?
12. Which data is retained, and why?
13. Which datasets have formal contracts?
14. What happens when a producer changes its schema?
15. Which architectural choices are reversible?
16. What evidence supports the selected storage pattern?
17. What would make us reject the current design?

## 14. Bottom Line

The central lesson of Chapter 12 is not “build a modern data platform.” It is:

> **Build the minimum data architecture required to produce trustworthy, authorized, timely, reproducible evidence for the decisions the organization actually needs to make.**

That principle keeps the advisor focused on architecture rather than technology fashion.

## Primary References

- NIST, *Enterprise Architecture* glossary: https://csrc.nist.gov/glossary/term/enterprise_architecture
- NIST, *Provenance* glossary: https://csrc.nist.gov/glossary/term/provenance
- NIST, *Data Governance and Management Profile* working material: https://www.nist.gov/news-events/events/2026/05/data-governance-and-management-profile-working-session-2
- ISO 8000-1:2022, *Data quality — Part 1: Overview*: https://www.iso.org/standard/81745.html
- ISO 8000-8:2015, *Information and data quality: Concepts and measuring*: https://www.iso.org/standard/60805.html
- ISO/TS 8000-82:2022, *Data quality assessment: Creating data rules*: https://www.iso.org/standard/78707.html
- ISO 8000-120:2016, *Master data: Provenance*: https://www.iso.org/standard/62393.html
- ISO 8000-140:2016, *Master data: Completeness*: https://www.iso.org/standard/62395.html
