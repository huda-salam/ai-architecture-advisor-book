# Evidence Review — Chapter 21: Data Protection

## 1. Review Objective

This review tests Chapter 21 against authoritative data-protection, encryption, and privacy sources. It distinguishes established facts from architecture recommendations and inference.

## 2. Primary Sources

- [NIST Privacy Framework](https://www.nist.gov/privacy-framework)
- [NIST Privacy Framework — Getting Started](https://www.nist.gov/privacy-framework/getting-started-0)
- [NIST Privacy Framework Version 1.0](https://www.nist.gov/publications/nist-privacy-framework-tool-improving-privacy-through-enterprise-risk-management)
- [NIST minimization glossary](https://csrc.nist.gov/glossary/term/minimization)
- [NIST SP 800-111 — Guide to Storage Encryption Technologies for End User Devices](https://csrc.nist.gov/pubs/sp/800/111/final)
- [NIST SP 800-207 — Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
- [NIST SP 800-207A — Cloud-Native Zero Trust](https://csrc.nist.gov/pubs/sp/800/207/a/final)

## 3. Claim Classification

### Data Processing Lifecycle

**Claim:** NIST Privacy Framework treats data processing as a lifecycle containing many data actions, including collection, retention, logging, transformation, use, transmission, and disposal.

**Status:** Fact.

**Basis:** NIST Privacy Framework.

### Privacy Risk

**Claim:** Privacy risk can arise from data processing even without a conventional cybersecurity breach.

**Status:** Fact.

**Basis:** NIST Privacy Framework materials explicitly distinguish privacy risks from cybersecurity risks.

### Minimization

**Claim:** Data minimization limits data processing to what is relevant and necessary for the authorized purpose and appropriate retention period.

**Status:** Fact.

**Basis:** NIST glossary and privacy guidance.

### Storage Encryption

**Claim:** Encryption can restrict unauthorized access to stored information, but the appropriate solution depends on storage type, environment, information, and threat.

**Status:** Fact.

**Basis:** NIST SP 800-111.

## 4. Architecture Recommendations

### Minimize Before Inference

**Claim:** Sensitive information should be minimized before model inference where feasible.

**Status:** Architecture recommendation.

**Reasoning:** Applying data-minimization principles to an AI processing boundary reduces the amount of sensitive material exposed to downstream processing. The exact technique depends on analytical requirements.

### Treat Derived Artifacts as Part of the Data Boundary

**Claim:** Embeddings, indexes, logs, traces, and other derived artifacts should be included in data-protection analysis when they contain or can expose information derived from sensitive sources.

**Status:** Architecture recommendation.

**Reasoning:** Transformation does not by itself establish that an artifact is harmless. Sensitivity should be assessed based on the resulting artifact and threat model.

### Key Management as a Security Boundary

**Claim:** Encryption architecture cannot be assessed without understanding key control and key lifecycle.

**Status:** Architecture recommendation grounded in security engineering.

**Reasoning:** Encryption provides protection through cryptographic keys; therefore control over key use materially affects the protection boundary.

### Retrieval and Agent Data Movement

**Claim:** RAG and agent architectures should enforce data-protection constraints at retrieval and tool boundaries rather than relying only on final-output filtering.

**Status:** Architecture recommendation / inference.

**Reasoning:** Once protected information has crossed a boundary, filtering the final response does not necessarily undo the exposure. This follows from applying least-privilege and data-minimization principles to AI pipelines.

## 5. Important Non-Claims

The chapter deliberately does not claim that:

- encryption alone makes data secure;
- private networking is sufficient data protection;
- every embedding is equally sensitive to its source;
- masking always provides anonymization;
- tokenization is always superior to encryption;
- DLP can prevent all AI data leakage;
- one data-classification scheme fits every organization;
- all sensitive data must be removed before every model call;
- a particular cloud or AI provider is inherently safe;
- a particular geographic region automatically satisfies every residency or sovereignty requirement;
- immediate physical deletion is always possible for every backup architecture;
- more security controls are always better.

## 6. AI-IDSS-Specific Reasoning

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
- exports and integrations.

The architectural objective is traceability of sensitive-data movement and bounded exposure.

## 7. Evidence Quality

| Topic | Evidence quality | Reason |
|---|---|---|
| Data-processing lifecycle | High | NIST Privacy Framework |
| Privacy risk beyond breach risk | High | NIST Privacy Framework |
| Data minimization | High | NIST glossary / Privacy Framework |
| Storage encryption | High | NIST SP 800-111 |
| Key management as an architectural boundary | High conceptual basis | Security engineering reasoning |
| Derived artifact treatment | Moderate-to-high | Architecture recommendation based on data-flow reasoning |
| Retrieval-time protection | Moderate-to-high | Application of authorization/minimization principles |
| Universal retention/deletion implementation | Low | Depends on architecture, law, contract, and operational constraints |

## 8. Advisor Review Checklist

Before approving a data-protection architecture, verify:

- Is the sensitive data inventory known?
- Are authoritative sources identified?
- Is unnecessary data removed before processing where feasible?
- Are all important derived artifacts included in the data-flow map?
- Are encryption and key-management responsibilities explicit?
- Are logs and observability systems included in the protection boundary?
- Are external model-provider terms verified from current primary documentation and contract?
- Are residency and processing-location requirements explicit rather than assumed?
- Can deletion requirements propagate through relevant derived stores?
- Can agents move sensitive data between tools without the intended control?
- What evidence demonstrates that the stated protection boundary actually exists?

## 9. Falsifiability

The recommendations should be revised if credible testing demonstrates that a simpler architecture provides equivalent protection against the defined threat model with lower cost and operational complexity, or if authoritative contractual, technical, or regulatory evidence changes the required controls.

## 10. Bottom Line

Data protection is a lifecycle and architecture problem, not merely an encryption problem.

For AI-IDSS, the practical advisor question is:

> **Can we trace sensitive data from its authoritative source through every transformation, processing boundary, derived artifact, and output—and demonstrate why each exposure is necessary and controlled?**
