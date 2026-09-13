# Evidence Review — Chapter 13

## Purpose

This review hardens **Chapter 13 — Data Integration Architecture** against the book's evidence standard. It separates technical evidence from architectural inference, recommendation, and assumptions.

## 1. Integration as an Architectural Function

**Classification:** Technical evidence + inference.

NIST's Big Data Reference Architecture is a vendor-neutral conceptual reference architecture that addresses interoperability and integration roles and functions without prescribing one product topology. The chapter therefore treats integration as an architectural concern rather than a specific middleware product.

**Confidence:** High.

**Primary source:** [NIST SP 1500-6r2](https://www.nist.gov/publications/nist-big-data-interoperability-framework-volume-6-reference-architecture)

## 2. Semantic Compatibility

**Classification:** Technical evidence.

ISO 8000-110:2021 specifies requirements for exchange of relevant master data including formal syntax, semantic encoding, and conformance to data specifications. This supports the distinction between syntactic compatibility and semantic compatibility.

**Advisor implication:** An integration that successfully transfers fields can still be semantically wrong.

**Confidence:** High.

**Primary source:** [ISO 8000-110:2021](https://www.iso.org/standard/78501.html)

## 3. Provenance

**Classification:** Technical evidence.

ISO 8000-120:2016 specifies requirements for representation and exchange of provenance information for relevant master data. This supports retaining provenance information where the integration's auditability or data-quality requirements require it.

**Limitation:** provenance does not establish that the underlying value is accurate. ISO 8000-130 separately addresses representation and exchange of information about accuracy.

**Confidence:** High.

**Primary sources:** [ISO 8000-120:2016](https://www.iso.org/standard/62393.html); [ISO 8000-130:2016](https://www.iso.org/standard/62394.html)

## 4. Data Rules and Validation

**Classification:** Technical evidence + architectural inference.

ISO/TS 8000-82:2022 describes data rules that can be processed by databases and other information systems and addresses data profiling as an input to effective rules.

**Architectural inference:** Integration pipelines can therefore implement explicit validation rules rather than relying only on downstream discovery of bad data. The exact rules and thresholds remain workload-specific.

**Confidence:** High for data rules; medium for any specific blocking threshold.

**Primary source:** [ISO/TS 8000-82:2022](https://www.iso.org/standard/78707.html)

## 5. API Security

**Classification:** Technical evidence.

NIST SP 800-228, updated March 13, 2026, addresses API risks and controls across pre-runtime and runtime stages and recommends a risk-based approach to API protection.

**Advisor implication:** API security should not be reduced to putting an API gateway in front of an endpoint. Controls must be selected according to the API's risks and lifecycle.

**Confidence:** High.

**Primary source:** [NIST SP 800-228](https://csrc.nist.gov/pubs/sp/800/228/upd1/final)

## 6. Freshness Is Workload-Dependent

**Classification:** Inference / recommendation.

The chapter does not claim that batch, CDC, or streaming is universally superior. Required freshness should be derived from the decision or operational consequence of delay.

**Assumption:** The organization can identify the maximum acceptable age of information for the relevant decision.

**What would change our mind?** Evidence that delayed information causes material decision error, loss, regulatory exposure, or unacceptable operational risk.

## 7. Point-to-Point Complexity

**Classification:** Architectural inference.

The chapter intentionally avoids a universal formula claiming that point-to-point integration is always wrong. The concern is dependency growth, duplicated transformations, security duplication, and change coordination as the number of independently managed connections increases.

**What would change our mind?** A small and stable system landscape where direct integration demonstrably minimizes complexity and operational cost.

## 8. Canonical Data Models

**Classification:** Recommendation, not fact.

A canonical model can reduce repeated semantic mappings in some architectures, but it can also introduce governance and evolution costs. The chapter therefore does not claim that every enterprise should adopt one.

**What would change our mind?** Evidence that the additional central semantic model creates more coordination cost than interoperability value.

## 9. Delivery Semantics

**Classification:** Technical concept + architecture requirement.

The chapter deliberately avoids treating “exactly once” as a universal property or requirement. Delivery semantics must be understood in the context of the actual messaging or integration architecture and the consumer's duplicate/replay behavior.

**Advisor test:** Ask what happens if the same message or command is received twice, received late, or replayed.

## 10. Idempotency

**Classification:** Architectural recommendation.

Idempotency is especially important for state-changing operations when retries or ambiguous timeouts can result in repeated requests. The chapter treats idempotency as a control requirement for relevant operations, not as a universal implementation mechanism.

**Confidence:** High as a design principle; exact implementation depends on the target system.

## 11. Identity and Authorization

**Classification:** Security architecture principle.

Authentication identifies the requesting actor or system; authorization determines whether that actor is permitted to access or perform an operation. The integration layer must not silently broaden authority simply because it uses a privileged service identity.

For APIs, NIST SP 800-228 provides lifecycle-oriented security guidance. For data exchange, authorization remains a system-specific control requirement.

**Confidence:** High.

## 12. Audit, Lineage, and Retention

**Classification:** Recommendation grounded in provenance and security evidence.

Important integration events should be attributable and reconstructable to the degree required by auditability, security, operational recovery, regulatory, privacy, and reproducibility requirements.

The chapter intentionally does **not** claim that every payload must be retained indefinitely. Retention is a separate governance decision.

## 13. Claims That Must Not Be Overstated

The chapter should not imply:

- point-to-point integration is inherently bad;
- hub-and-spoke is always better;
- APIs are always better than files;
- event streaming is always required;
- CDC is always preferable to batch;
- canonical data models are universally beneficial;
- exactly-once delivery is always necessary;
- a shared service identity is inherently safer than delegated identity;
- an API gateway by itself provides API security;
- schema compatibility guarantees semantic compatibility;
- provenance guarantees accuracy;
- an integration platform automatically owns business semantics.

## 14. Evidence Classification

| Statement | Classification |
|---|---|
| NIST reference architecture addresses interoperability/integration concepts | **Fact / technical evidence** |
| ISO 8000-110 addresses syntax, semantic encoding, and conformance | **Fact / technical evidence** |
| ISO 8000-120 addresses provenance representation/exchange | **Fact / technical evidence** |
| ISO/TS 8000-82 addresses data rules | **Fact / technical evidence** |
| NIST SP 800-228 addresses API security across lifecycle stages | **Fact / technical evidence** |
| Batch vs streaming should be chosen from workload requirements | **Recommendation / inference** |
| Canonical model should be used where value exceeds governance cost | **Recommendation** |
| Integration should preserve authorization and traceability | **Architecture recommendation** |
| Specific latency, retry, retention, or quality threshold | **Assumption / requirement until validated** |

## 15. Advisor Review Checklist

1. What business capability or decision requires the integration?
2. What exactly crosses the boundary?
3. Who owns the source fact?
4. Who owns the target definition?
5. Are the semantics equivalent?
6. How are identities mapped?
7. What freshness is actually required?
8. What are the delivery semantics?
9. How are duplicates handled?
10. How are schema changes managed?
11. Where is authorization enforced?
12. Does a service identity broaden access?
13. How are failures detected and recovered?
14. Can important transformations be reproduced?
15. Can important events be attributed?
16. What is retained, and why?
17. What is the blast radius of failure?
18. What is the exit strategy?
19. What evidence supports the chosen pattern?
20. What would make us reject the design?

## Bottom Line

> **A successful integration is not one that merely moves data. It is one that preserves the properties the receiving decision or system depends upon.**

Those properties should be explicit: meaning, authority, identity, authorization, freshness, integrity, failure behavior, and traceability.