# Evidence Review — Chapter 21: Data Protection

## 1. Review Objective

This review tests Chapter 21 against authoritative privacy, AI-risk, encryption, and security sources. It distinguishes established facts from architecture recommendations, inferences, assumptions, and provider-specific facts.

The review also performs a source-scope check: a source may be authoritative without being directly applicable to every architectural claim. In particular, NIST SP 800-111 is authoritative guidance on storage encryption for end-user devices; it should not be presented as a comprehensive enterprise data-protection standard.

The main hardening questions are:

1. Does the chapter distinguish privacy risk from general protection of business information?
2. Does it avoid treating minimization as “less data is always better”?
3. Does it avoid presenting encryption as the primary or sufficient control?
4. Does it use storage-encryption evidence only within the scope actually covered by the source?
5. Does it treat third-party AI providers as evidence-dependent processing boundaries?
6. Does it account for embeddings, indexes, logs, caches, and other derived artifacts?
7. Does it distinguish source deletion from deletion of every derivative and backup?
8. Does it distinguish data at rest, in transit, and in use rather than implying encryption is one universal mechanism?

## 2. Primary Sources

- [NIST Privacy Framework](https://www.nist.gov/privacy-framework)
- [NIST Privacy Framework Version 1.0](https://www.nist.gov/publications/nist-privacy-framework-tool-improving-privacy-through-enterprise-risk-management)
- [NIST Privacy Framework 1.1 project / Initial Public Draft](https://www.nist.gov/privacy-framework/new-projects/privacy-framework-version-11)
- [NIST Privacy Framework FAQ](https://www.nist.gov/privacy-framework/frequently-asked-questions)
- [NIST minimization glossary](https://csrc.nist.gov/glossary/term/minimization)
- [NIST AI RMF 1.0](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10)
- [NIST AI RMF Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)
- [NIST AI trustworthiness characteristics](https://airc.nist.gov/airmf-resources/airmf/3-sec-characteristics/)
- [NIST SP 800-111 — Guide to Storage Encryption Technologies for End User Devices](https://csrc.nist.gov/pubs/sp/800/111/final)
- [NIST Cryptographic Key Management FAQ](https://csrc.nist.gov/projects/key-management/faqs)
- [NIST SP 800-207 — Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
- [NIST SP 800-207A — Cloud-Native Zero Trust](https://csrc.nist.gov/pubs/sp/800/207/a/final)

## 3. Source-Scope Corrections

### NIST Privacy Framework 1.1

**Status:** Initial Public Draft / project status, not final.

NIST's current Privacy Framework page identifies Version 1.0 as the published framework and separately identifies Privacy Framework 1.1 as an update project with an Initial Public Draft. Therefore the chapter may use the current Privacy Framework materials for conceptual evidence, but must not describe PF 1.1 as a final standard.

### NIST SP 800-111

**Status:** Final, but scoped guidance.

SP 800-111 addresses storage encryption technologies for end-user devices and discusses encryption at rest and associated key-management/authentication considerations. It is useful evidence for the narrower proposition that storage encryption can restrict unauthorized access and that selection depends on storage, information, environment, and threats.

It should **not** be used as evidence for a universal enterprise encryption architecture, nor as primary evidence for encryption in transit or general cloud cryptography.

### NIST Key Management Guidance

NIST's key-management material supports the proposition that cryptographic key management spans the lifecycle of keys, including generation, storage, distribution/establishment, use, and destruction. This supports Chapter 21's treatment of key management as part of the protection boundary without implying that one particular key-management architecture is universally required.

## 4. Claim Classification

### Privacy Risk Is Not the Same as Business-Information Security

**Claim:** NIST's Privacy Framework is centered on protecting individuals' privacy. It should not be treated as a complete enterprise information-security framework for business information.

**Status:** Fact.

**Basis:** NIST Privacy Framework and FAQ.

### Data Processing Lifecycle

**Claim:** Privacy risk can arise from how personal information is processed across its lifecycle, not only from a conventional cybersecurity breach.

**Status:** Fact.

**Basis:** NIST Privacy Framework.

### Minimization

**Claim:** NIST defines minimization in terms of limiting personal-information processing to what is relevant and necessary for an authorized purpose and retaining it only as long as necessary.

**Status:** Fact.

**Important boundary:** This does not establish the universal proposition that less data is always better. Data reduction can affect analytical utility and other system objectives.

### Storage Encryption

**Claim:** Storage encryption can restrict unauthorized access to stored information, and the appropriate approach depends on storage type, information, environment, and threats.

**Status:** Fact, within the scope of SP 800-111.

**Basis:** NIST SP 800-111.

### Key Management

**Claim:** Cryptographic key management covers the lifecycle and protection of cryptographic keys and related parameters.

**Status:** Fact.

**Basis:** NIST Cryptographic Key Management FAQ.

### Third-Party GAI Risk

**Claim:** Third-party GAI integrations can introduce intellectual-property, data-privacy, and information-security risks and require appropriate risk controls and due diligence.

**Status:** Fact.

**Basis:** NIST AI RMF Generative AI Profile.

## 5. Architecture Recommendations

### Minimize Before Inference

**Claim:** Sensitive information should be minimized before model inference where feasible.

**Status:** Architecture recommendation.

**Reasoning:** Applying minimization principles to an AI processing boundary can reduce unnecessary exposure. The exact technique depends on analytical requirements, threat model, and required evidence.

### Separate Security, Privacy, and Confidentiality

**Claim:** Data-protection review should distinguish at least three questions: protection of information and systems, privacy risks to people, and confidentiality of sensitive information.

**Status:** Architecture recommendation grounded in NIST framework distinctions.

### Treat Derived Artifacts as Part of the Data Boundary

**Claim:** Embeddings, indexes, logs, traces, caches, extracted text, and other derived artifacts should be included in data-protection analysis when they contain or can expose information derived from sensitive sources.

**Status:** Architecture recommendation.

**Reasoning:** Transformation alone does not establish that an artifact is harmless. Sensitivity should be assessed based on the resulting artifact, use, threat model, and access path.

### Key Management as a Security Boundary

**Claim:** Encryption architecture cannot be assessed without understanding relevant key control and lifecycle responsibilities.

**Status:** Architecture recommendation grounded in cryptographic key-management principles.

### Retrieval and Agent Data Movement

**Claim:** RAG and agent architectures should enforce data-protection constraints at retrieval and tool boundaries rather than relying only on final-output filtering.

**Status:** Architecture recommendation / inference.

**Reasoning:** Once protected information has crossed a boundary, filtering the final response does not necessarily undo the exposure. This follows from applying authorization and minimization principles to AI pipelines.

### Deletion Must Be Evaluated Per Artifact Class

**Claim:** A deletion design should explicitly account for source data, extracted text, embeddings/indexes, caches, prompts, outputs, logs, backups, and audit records where applicable.

**Status:** Architecture recommendation.

**Reasoning:** Different stores can have different purposes, retention rules, and deletion mechanisms. Source deletion does not itself demonstrate deletion of every derivative.

### Control Ordering

**Claim:** Classification → authorization → minimization → controlled processing → encryption/key management → monitoring/audit is a useful ordering for architectural review.

**Status:** Architecture heuristic, not a formal standard hierarchy.

**Important qualification:** The ordering is a reasoning aid, not a required sequence. In an actual architecture, classification, authorization, minimization, cryptographic protection, and monitoring can be designed and enforced at multiple points in the lifecycle.

## 6. Provider-Specific Facts Must Remain Evidence-Dependent

The following must not be asserted as generic facts about “enterprise AI”:

- provider retention period;
- whether prompts are used for training or model improvement;
- geographic processing location;
- subprocessor locations;
- provider-side logging;
- deletion behavior;
- customer-controlled keys;
- regional-processing guarantees;
- contractual data-use restrictions.

These are **provider-specific facts**. The advisor should verify them against current primary documentation and contractual terms before making an architecture recommendation.

## 7. Important Non-Claims

The chapter deliberately does not claim that:

- encryption alone makes data secure;
- privacy controls alone secure business information;
- private networking is sufficient data protection;
- less data is always better for every AI task;
- every embedding is equally sensitive to its source;
- masking always provides anonymization;
- tokenization is always superior to encryption;
- DLP can prevent all AI data leakage;
- one data-classification scheme fits every organization;
- all sensitive data must be removed before every model call;
- a particular cloud or AI provider is inherently safe;
- a particular geographic region automatically satisfies every residency or sovereignty requirement;
- immediate physical deletion is always possible for every backup architecture;
- more security controls are always better;
- source deletion automatically removes every derived artifact;
- human approval alone guarantees data protection;
- SP 800-111 is a complete enterprise encryption standard;
- PF 1.1 is already a final NIST framework.

## 8. Cross-Chapter Consistency Review

### Chapter 19 — AI Security Model

Chapter 19 establishes that the model is not the security boundary and that security controls must remain under explicit system control. Chapter 21 is consistent with this by treating data protection as a system/data-flow property rather than as a property automatically provided by the model provider.

### Chapter 20 — Identity & Access Control

Chapter 20 establishes authorization and bounded delegated authority. Chapter 21 applies that boundary to data movement, retrieval, logs, indexes, and tool-mediated transfers. It must not redefine authorization; it should consume the identity/authorization context defined by Chapter 20.

### Chapter 22 — AI-Specific Threats

Chapter 21 should describe the protection implications of threats such as prompt injection, data poisoning, and excessive agency without duplicating their full threat taxonomy. Chapter 22 remains the dedicated threat-analysis chapter.

### Chapter 14 — Data Governance & Lineage

Chapter 21 uses ownership, provenance, retention, and lifecycle concepts but should not redefine enterprise governance or lineage. Governance establishes rules and accountability; data protection applies relevant controls to the resulting data flows.

## 9. AI-IDSS-Specific Reasoning

The AI-IDSS data path can create multiple copies and transformations of investment information. The advisor should therefore review not only the source database but also:

- ingestion buffers;
- transformed datasets;
- indexes;
- embeddings;
- caches;
- prompts and context;
- model inputs and outputs;
- logs and traces;
- evaluation datasets;
- backups;
- exports and integrations;
- agent tool arguments and tool outputs.

The architectural objective is **traceability of sensitive-data movement and bounded exposure**, not elimination of every copy regardless of purpose.

## 10. Evidence Quality

| Topic | Evidence quality | Reason |
|---|---|---|
| Privacy Framework scope | High | NIST Privacy Framework + FAQ |
| PF 1.1 status | High | NIST identifies it as an update project / Initial Public Draft, not final |
| Data minimization | High | NIST minimization glossary |
| Privacy risk beyond conventional breach risk | High | NIST Privacy Framework |
| Minimization/utility trade-off | Moderate-to-high | NIST AI trustworthiness material; context dependent |
| Third-party GAI risk | High | NIST AI RMF Generative AI Profile |
| Storage encryption | High within scope | NIST SP 800-111; end-user storage encryption |
| Cryptographic key lifecycle | High | NIST Key Management FAQ |
| Derived artifact treatment | Moderate-to-high | Architecture recommendation based on data-flow reasoning |
| Retrieval-time protection | Moderate-to-high | Application of authorization/minimization principles |
| Per-artifact deletion analysis | Moderate-to-high | Lifecycle architecture reasoning |
| Universal retention/deletion implementation | Low | Depends on architecture, law, contract, and operations |

## 11. Advisor Review Checklist

Before approving a data-protection architecture, verify:

- Is the sensitive data inventory known?
- Is the distinction between privacy risk and business-information security understood?
- Are authoritative sources identified?
- Is unnecessary data removed or transformed before processing where feasible?
- Are trade-offs with analytical utility documented where minimization changes the input?
- Are all important derived artifacts included in the data-flow map?
- Are data-at-rest, data-in-transit, and data-in-use protections considered separately where relevant?
- Are encryption and key-management responsibilities explicit?
- Are logs and observability systems included in the protection boundary?
- Are external model-provider terms verified from current primary documentation and contract?
- Are residency and processing-location requirements explicit rather than assumed?
- Can deletion requirements propagate to relevant derived stores?
- Are backup and audit-retention requirements distinguished from ordinary deletion?
- Can agents move sensitive data between tools without the intended control?
- What evidence demonstrates that the stated protection boundary actually exists?

## 12. Falsifiability

The recommendations should be revised if credible testing demonstrates that:

- a simpler architecture provides equivalent protection against the defined threat model with lower cost and operational complexity;
- a transformation reduces exposure without unacceptable loss of analytical utility;
- provider documentation or contractual evidence establishes stronger or weaker controls than assumed;
- deletion testing demonstrates a materially different lifecycle than modeled;
- regulatory or contractual requirements change the acceptable architecture;
- a derived artifact is demonstrated to have materially different sensitivity from the precaution initially assumed;
- a different control placement provides equivalent or stronger protection with less complexity.

## 13. Bottom Line

Data protection is a lifecycle and architecture problem, not merely an encryption problem.

For AI-IDSS, the practical advisor question is:

> **Can we trace sensitive data from its authoritative source through every relevant transformation, processing boundary, derived artifact, and output—and demonstrate why each exposure is necessary and controlled?**
