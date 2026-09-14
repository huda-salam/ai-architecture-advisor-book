# Chapter 13 — Iteration 3 Deep Hardening: Data Integration Architecture

## Review objective

Harden Chapter 13 against the Chapter 8–12 evidence standard and maintain consistency with Chapters 19–25, 30–31, 34–36, and 44.

## Evidence baseline

- NIST SP 1500-6r2 — Big Data Reference Architecture.
- NIST SP 1500-9r1 — Reference Architecture Interfaces.
- NIST SP 1500-7r1 — Standards Roadmap, including data-integration concepts.
- NIST SP 800-228-upd1 (13 March 2026) — API protection across API lifecycle stages.
- NIST SP 800-207 / SP 800-207A — identity-centered access control and zero-trust principles.
- ISO 8000-110:2021 — syntax, semantic encoding, and conformance for relevant master-data exchange.
- ISO 8000-120 — provenance representation and exchange for relevant master data.

## Findings

### 1. Integration correctness must be separated from transport correctness

A message can arrive successfully and still be wrong for the business purpose. Chapter 13 should explicitly distinguish:

**Transport correctness → structural correctness → semantic correctness → authorization correctness → business correctness.**

Successful delivery therefore cannot be treated as proof that the integration is correct.

### 2. Delivery semantics must be treated as an explicit contract

The existing discussion of at-most-once, at-least-once, duplicates, ordering, replay, and exactly-once is sound. Harden it with the following rule:

> Never claim an end-to-end exactly-once property merely because one messaging component provides an exactly-once processing mode.

The guarantee may stop at the framework boundary; downstream applications, databases, APIs, or external systems can reintroduce duplication or ambiguity. NIST's Big Data Reference Architecture explicitly distinguishes delivery guarantees and notes that framework-level guarantees do not automatically extend outside the processing topology.

### 3. Add an explicit failure matrix

For every consequential integration, require at least:

| Failure | Required design question |
|---|---|
| Duplicate | Is processing idempotent? |
| Missing | How is absence detected? |
| Out of order | Which sequence/version wins? |
| Late | Is stale information allowed? |
| Partial | How is reconciliation performed? |
| Schema drift | Does the consumer reject, adapt, or quarantine? |
| Authorization failure | Is the request denied without fallback privilege escalation? |
| Producer outage | What is the degraded state? |
| Consumer outage | What is retained and replayed? |
| Transformation error | Can the affected output be identified and corrected? |

This connects Chapter 13 directly to Chapter 18 Reliability.

### 4. Strengthen semantic correctness

The existing EBITDA example is useful. Add a stronger principle:

> **An integration is not semantically correct merely because source and target schemas are compatible.**

Semantic compatibility should include definition, units, currency, time basis, entity identity, inclusion/exclusion rules, aggregation rules, and version.

This connects Chapter 13 to Chapter 12's semantic-model and data-quality discussion.

### 5. Authorization must survive the boundary

The current service-identity discussion should be retained and strengthened:

> A service account proves technical authority to invoke a resource; it does not by itself prove that the requesting user or workflow is authorized for the business action.

For delegated access, the architecture should preserve sufficient subject/workflow context for downstream policy decisions and audit. This aligns with NIST SP 800-207 and SP 800-207A, which emphasize identity-centered access controls rather than implicit trust based on network location.

### 6. API security reference is current

The chapter should reference **NIST SP 800-228-upd1**, dated 13 March 2026, rather than the withdrawn June 2025 edition. The 2026 update adds API-risk categories and recommended controls by API lifecycle stage.

The current REST-specific SP 800-228A document is an initial public draft as of May 2026; therefore it should not be presented as a final standard.

### 7. Freshness must connect to evaluation

Integration freshness is not only an operational property. For AI-IDSS it can change model/system performance.

Use the chain:

**freshness requirement → tolerated staleness → evaluation condition → production monitoring → decision boundary.**

A model evaluated on fresh data cannot automatically be assumed fit when production data is materially older, delayed, or incomplete.

### 8. Reconciliation is a first-class control

For critical financial and investment data, reconciliation should not be treated as an optional operational detail. Where multiple systems carry the same business fact, define how discrepancies are detected, attributed, and resolved.

Recommended field rule:

> **Replication without reconciliation creates copies; integration architecture requires confidence about what those copies mean.**

### 9. Integration observability must respect the data boundary

Logs, traces, dead-letter queues, and diagnostic payloads can themselves become sensitive-data stores. Observability therefore belongs inside the security/data-protection boundary rather than being treated as harmless infrastructure telemetry.

### 10. Integration architecture must preserve reversibility

For integration platforms, middleware, event brokers, connectors, and proprietary transformation engines, document:

- exportability of contracts and mappings;
- portability of message/data formats;
- replacement options;
- migration sequencing;
- operational dependencies;
- cost and effort to exit.

This aligns with Chapter 36 Vendor Dependency & Exit Strategy.

## Revised field model

For every critical integration, evaluate seven dimensions:

1. **Meaning** — Is the data still what the source intended?
2. **Authority** — Is the authoritative source still identifiable?
3. **Identity** — Is the entity mapping correct?
4. **Authorization** — Is access still permitted after crossing the boundary?
5. **Freshness** — Is the information timely enough for the decision?
6. **Integrity** — Are duplication, loss, ordering, and partial failure controlled?
7. **Traceability** — Can the organization reconstruct what happened?

## Cross-chapter consistency test

The architecture should now read as:

**Chapter 12:** authoritative data + semantics + quality

→ **Chapter 13:** controlled movement while preserving meaning, authority, identity, authorization, freshness, integrity, and traceability

→ **Chapters 19–22:** security, identity, data protection, AI-specific threats

→ **Chapters 30–31:** model selection and evaluation under the actual data/system conditions

→ **Chapter 34–35:** economic and performance optimization

→ **Chapter 36:** reversibility and vendor dependency

## Adversarial questions

1. The message arrived successfully. How do we know its business meaning is correct?
2. The replica is newer than the designated source of record. Which one wins?
3. The same event arrives twice. What prevents duplicate business action?
4. Events arrive out of order. Which state is authoritative?
5. A consumer was offline for six hours. What can be replayed and what must be reconciled?
6. A service identity can access all portfolio companies. What prevents a user from crossing an intended data boundary?
7. The integration logs full payloads. Have we created a second sensitive-data repository?
8. The source changes its schema. Does the consumer fail safely or silently reinterpret data?
9. The integration is fast, but data is stale. Is the AI-IDSS actually more useful?
10. The integration platform is replaced. Can mappings, contracts, and historical provenance be migrated?

## Advisor field rule

> **Integration is correct only when the right information reaches the right consumer, with the right meaning, authority, freshness, integrity, and traceability—and the architecture can demonstrate those properties rather than merely assume them.**

## Evidence classification

- NIST architecture/interface/delivery semantics: **technical evidence**.
- NIST API lifecycle guidance: **technical evidence**.
- ISO exchange/provenance specifications: **technical evidence**.
- The seven-dimension field model: **advisor framework / inference**, not an external standard.
- “Least complex pattern that satisfies requirements”: **advisor recommendation**, not a universal industry rule.
