# Evidence Review — Chapter 21: Data Protection

## 1. Review Objective

This review tests Chapter 21 against authoritative privacy, AI-risk, encryption, and security sources. It distinguishes established facts from architecture recommendations, inferences, assumptions, and provider-specific facts.

The main hardening questions are:

1. Does the chapter distinguish privacy risk from general protection of business information?
2. Does it avoid treating minimization as "less data is always better"?
3. Does it avoid presenting encryption as the primary or sufficient control?
4. Does it treat third-party AI providers as evidence-dependent processing boundaries?
5. Does it account for embeddings, indexes, logs, caches, and other derived artifacts?
6. Does it distinguish source deletion from deletion of every derivative and backup?

## 2. Primary Sources

- [NIST Privacy Framework](https://www.nist.gov/privacy-framework)
- [NIST Privacy Framework — Getting Started](https://www.nist.gov/privacy-framework/getting-started-0)
- [NIST Privacy Framework FAQ](https://www.nist.gov/privacy-framework/frequently-asked-questions)
- [NIST Privacy Framework Version 1.0](https://www.nist.gov/publications/nist-privacy-framework-tool-improving-privacy-through-enterprise-risk-management)
- [NIST minimization glossary](https://csrc.nist.gov/glossary/term/minimization)
- [NIST AI RMF 1.0](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10)
- [NIST AI RMF Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)
- [NIST AI trustworthiness characteristics](https://airc.nist.gov/airmf-resources/airmf/3-sec-characteristics/)
- [NIST SP 800-111 — Guide to Storage Encryption Technologies](https://csrc.nist.gov/pubs/sp/800/111/final)
- [NIST SP 800-207 — Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
- [NIST SP 800-207A — Cloud-Native Zero Trust](https://csrc.nist.gov/pubs/sp/800/207/a/final)

## 3. Claim Classification

### Privacy Risk Is Not the Same as Business-Information Security

**Claim:** NIST's Privacy Framework is centered on protecting individuals' privacy. It does not treat protection of business information as its primary scope; NIST points to cybersecurity safeguards for business information.

**Status:** Fact.

**Basis:** NIST Privacy Framework FAQ.

**Implication:** Chapter 21 must not use the Privacy Framework as if it were a complete enterprise information-security framework.

### Data Processing Lifecycle

**Claim:** NIST's Privacy Framework treats privacy risk in relation to data processing across the lifecycle, including activities such as collection, retention, use, transmission, and disposal.

**Status:** Fact.

**Basis:** NIST Privacy Framework.

### Privacy Risk Can Exist Without a Conventional Breach

**Claim:** Privacy risk can arise from data processing even without a conventional cybersecurity breach.

**Status:** Fact.

**Basis:** NIST Privacy Framework's distinction between privacy risk and cybersecurity risk.

### Minimization

**Claim:** NIST defines minimization in terms of limiting personal-information processing to what is relevant and necessary for an authorized purpose and retaining it only as long as necessary.

**Status:** Fact.

**Basis:** NIST minimization glossary.

**Important boundary:** This does not establish the universal proposition that less data is always better. Data reduction can affect analytical utility, and NIST notes that some privacy-enhancing or data-minimizing methods can involve accuracy trade-offs under certain conditions.

### Storage Encryption

**Claim:** Encryption can restrict unauthorized access to stored information, but the appropriate technology depends on the information, storage type, environment, and threat.

**Status:** Fact.

**Basis:** NIST SP 800-111.

### Third-Party GAI Risk

**Claim:** Third-party GAI integrations can introduce intellectual-property, data-privacy, and information-security risks, and organizations should apply appropriate risk controls and due diligence.

**Status:** Fact.

**Basis:** NIST AI RMF Generative AI Profile, Third-Party Considerations.

## 4. Architecture Recommendations

### Minimize Before Inference

**Claim:** Sensitive information should be minimized before model inference where feasible.

**Status:** Architecture recommendation.

**Reasoning:** Applying data-minimization principles to an AI processing boundary reduces unnecessary exposure. The exact technique depends on analytical requirements and threat model.

### Separate Security, Privacy, and Confidentiality

**Claim:** Data-protection review should distinguish at least three questions: protection of information and systems, privacy risks to people, and confidentiality of sensitive information.

**Status:** Architecture recommendation grounded in NIST framework distinctions.

**Reasoning:** NIST's Privacy Framework is centered on individual privacy, while cybersecurity safeguards address broader information and system protection. A capital-investment environment can require both without treating them as identical.

### Treat Derived Artifacts as Part of the Data Boundary

**Claim:** Embeddings, indexes, logs, traces, caches, extracted text, and other derived artifacts should be included in data-protection analysis when they contain or can expose information derived from sensitive sources.

**Status:** Architecture recommendation.

**Reasoning:** Transformation does not by itself establish that an artifact is harmless. Sensitivity should be assessed based on the resulting artifact, use, threat model, and access path.

### Key Management as a Security Boundary

**Claim:** Encryption architecture cannot be assessed without understanding key control and key lifecycle.

**Status:** Architecture recommendation grounded in security engineering.

**Reasoning:** Encryption relies on cryptographic keys; therefore control over key use materially affects the protection boundary.

### Retrieval and Agent Data Movement

**Claim:** RAG and agent architectures should enforce data-protection constraints at retrieval and tool boundaries rather than relying only on final-output filtering.

**Status:** Architecture recommendation / inference.

**Reasoning:** Once protected information has crossed a boundary, filtering the final response does not necessarily undo the exposure. This follows from applying least-privilege and minimization principles to AI pipelines.

### Deletion Must Be Evaluated Per Artifact Class

**Claim:** A deletion design should explicitly account for source data, extracted text, embeddings/indexes, caches, prompts, outputs, logs, backups, and audit records where applicable.

**Status:** Architecture recommendation.

**Reasoning:** Different stores can have different purposes, retention rules, and deletion mechanisms. Source deletion does not itself demonstrate deletion of every derivative.

### Control Hierarchy

**Claim:** Classification → authorization → minimization → controlled processing → encryption/key management → monitoring/audit is a useful ordering for architectural review.

**Status:** Architecture heuristic, not a formal standard hierarchy.

**Reasoning:** The ordering prevents encryption or monitoring from being treated as substitutes for deciding what data may be processed and who may access it.

## 5. Provider-Specific Facts Must Remain Evidence-Dependent

The following must not be asserted as generic facts about "enterprise AI":

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

## 6. Important Non-Claims

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
- human approval alone guarantees data protection.

## 7. AI-IDSS-Specific Reasoning

The AI-IDSS data path can create multiple copies and transformations of investment information. The advisor should therefore review not only the source database but also:

- ingestion buffers;
- transformed datasets;
- indexes;
- embeddings;
- caches;
- prompts and context;
- model outputs;
- logs and traces;
- evaluation datasets;
- backups;
- exports and integrations;
- agent tool arguments and tool outputs.

The architectural objective is traceability of sensitive-data movement and bounded exposure.

## 8. Evidence Quality

| Topic | Evidence quality | Reason |
|---|---|---|
| Privacy Framework scope | High | NIST Privacy Framework + FAQ |
| Data-processing lifecycle | High | NIST Privacy Framework |
| Privacy risk beyond breach risk | High | NIST Privacy Framework |
| Data minimization | High | NIST minimization glossary |
| Minimization/accuracy trade-off | High | NIST AI trustworthiness guidance |
| Third-party GAI risk | High | NIST AI RMF Generative AI Profile |
| Storage encryption | High | NIST SP 800-111 |
| Key management as an architectural boundary | High conceptual basis | Security engineering reasoning |
| Derived artifact treatment | Moderate-to-high | Architecture recommendation based on data-flow reasoning |
| Retrieval-time protection | Moderate-to-high | Application of authorization/minimization principles |
| Per-artifact deletion analysis | Moderate-to-high | Lifecycle architecture reasoning |
| Universal retention/deletion implementation | Low | Depends on architecture, law, contract, and operational constraints |

## 9. Advisor Review Checklist

Before approving a data-protection architecture, verify:

- Is the sensitive data inventory known?
- Is the distinction between privacy risk and business-information security understood?
- Are authoritative sources identified?
- Is unnecessary data removed before processing where feasible?
- Are trade-offs with analytical utility documented where minimization changes the input?
- Are all important derived artifacts included in the data-flow map?
- Are encryption and key-management responsibilities explicit?
- Are logs and observability systems included in the protection boundary?
- Are external model-provider terms verified from current primary documentation and contract?
- Are residency and processing-location requirements explicit rather than assumed?
- Can deletion requirements propagate through relevant derived stores?
- Are backup and audit-retention requirements distinguished from ordinary deletion?
- Can agents move sensitive data between tools without the intended control?
- What evidence demonstrates that the stated protection boundary actually exists?

## 10. Falsifiability

The recommendations should be revised if credible testing demonstrates that:

- a simpler architecture provides equivalent protection against the defined threat model with lower cost and operational complexity;
- a transformation reduces exposure without unacceptable loss of analytical utility;
- provider documentation or contractual evidence establishes stronger or weaker controls than assumed;
- deletion testing demonstrates a materially different lifecycle than modeled;
- regulatory or contractual requirements change the acceptable architecture;
- a derived artifact is demonstrated to have materially different sensitivity from the precaution initially assumed.

## 11. Bottom Line

Data protection is a lifecycle and architecture problem, not merely an encryption problem.

For AI-IDSS, the practical advisor question is:

> **Can we trace sensitive data from its authoritative source through every transformation, processing boundary, derived artifact, and output—and demonstrate why each exposure is necessary and controlled?**
