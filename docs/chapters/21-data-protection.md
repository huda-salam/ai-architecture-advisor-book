# Chapter 21 — Data Protection

## 21.1 Why Data Protection Is an Architecture Problem

Data protection is not a single control such as encryption or a DLP product. It is the set of architectural decisions that determine how sensitive information is collected, transformed, transmitted, stored, processed, exposed, retained, and destroyed.

For AI-IDSS, the protection question is especially important because the same information may cross many boundaries:

**Source system → integration → processing → storage → retrieval → model → agent → output → audit**

The advisor's question is therefore:

> **Where can sensitive data exist, what can happen to it there, who can access it, and what control remains effective if another layer fails?**

NIST's Privacy Framework treats privacy risk as arising from data processing across a lifecycle, while cybersecurity controls address protection of information and systems more broadly. The distinction matters: not every confidentiality problem is a privacy problem, and privacy risk is not reducible to breach prevention. [NIST Privacy Framework](https://www.nist.gov/privacy-framework) [NIST Privacy Framework FAQ](https://www.nist.gov/privacy-framework/frequently-asked-questions)

## 21.2 Data Classification Before Protection

Protection requirements should begin with understanding the data.

A practical classification scheme might distinguish:

| Class | Example | Typical architectural concern |
|---|---|---|
| Public | Published market information | Integrity and availability |
| Internal | Internal operating information | Access control |
| Confidential | Investment memos, portfolio financials | Restricted access, encryption, audit |
| Highly sensitive | Credentials, material non-public information, sensitive personal data | Strong access control, minimization, restricted processing, enhanced monitoring |

The exact labels are organization-specific. The important principle is that **protection should be proportional to the sensitivity and consequence of exposure**.

Do not confuse classification with a security control. A label saying `CONFIDENTIAL` does not itself prevent disclosure.

## 21.3 Data Minimization

A secure architecture should avoid moving or retaining data that is not necessary for the stated purpose.

NIST defines minimization specifically in relation to personal information: limiting collection, use, processing, storage, maintenance, dissemination, or disclosure to what is relevant and necessary for an authorized purpose, and retaining it only as long as necessary for that purpose. This is not a universal rule that less data is always better; minimization is purpose- and risk-dependent. [NIST minimization glossary](https://csrc.nist.gov/glossary/term/minimization)

For AI systems this leads to a useful architecture question:

> Does the model actually need the raw data, or does it need a narrower representation of the relevant information?

Possible techniques include:

- field selection;
- filtering;
- aggregation;
- masking;
- tokenization;
- pseudonymization;
- redaction;
- retrieval of only relevant records;
- derived features instead of raw attributes.

These techniques are not interchangeable and do not provide identical guarantees. Their suitability depends on the use case, threat model, reversibility requirements, and analytical utility. NIST also notes that privacy-enhancing and data-minimizing techniques can involve trade-offs with accuracy in some conditions. [NIST AI trustworthiness characteristics](https://airc.nist.gov/airmf-resources/airmf/3-sec-characteristics/)

## 21.4 Data Flow Mapping

Before selecting controls, map the actual data flow.

For each important data element, document:

1. source;
2. classification;
3. owner or authority;
4. processing purpose;
5. transformation;
6. destination;
7. access boundary;
8. retention period;
9. deletion mechanism;
10. external processor or provider, if any;
11. audit requirements.

For AI-IDSS, a useful data-flow diagram is:

```text
Authoritative Sources
        │
        ↓
Classification / Policy
        │
        ↓
Pre-processing / Minimization
        │
        ↓
Integration / Ingestion
        │
        ↓
Validation / Transformation
        │
        ├──────────────→ Governed Storage
        │                      │
        ↓                      ↓
   Retrieval Layer ←──── Access Control
        │
        ↓
Context Construction
        │
        ↓
Model / AI Service
        │
        ├────────→ Logs / Audit
        │
        ↓
Response / Recommendation
        │
        ↓
Human Decision
        │
        ↓
Retention / Deletion
```

The purpose is not documentation for its own sake. The map reveals where data crosses trust, jurisdiction, provider, and authorization boundaries, and where transformed or duplicated artifacts are created.

## 21.5 Encryption: What It Solves and What It Does Not

Encryption protects information against particular forms of unauthorized access, but its effectiveness depends on where and when encryption is applied and who controls the keys.

Consider separately:

- encryption in transit;
- encryption at rest;
- encryption during processing, where applicable;
- application-level encryption;
- field-level encryption;
- database/storage encryption.

Encryption at rest is not equivalent to access control. A service that legitimately holds the decryption capability can still expose plaintext through an application flaw or excessive privilege.

NIST's storage-encryption guidance describes encryption as a mechanism for restricting unauthorized access to stored information and emphasizes that the appropriate approach depends on storage type, information, environment, and threats. [NIST SP 800-111](https://csrc.nist.gov/pubs/sp/800/111/final)

A useful control hierarchy for this chapter is therefore:

**Classification → authorization → minimization → controlled processing → encryption/key management → monitoring/audit**

This is an architectural heuristic, not a formal NIST ranking. The ordering emphasizes that encryption should complement, rather than substitute for, decisions about what data may be processed and who may access it.

## 21.6 Key Management Is Part of the Security Boundary

Saying "the data is encrypted" is incomplete.

The advisor should ask:

- Who generates the keys?
- Where are keys stored?
- Who can use them?
- Can the application retrieve plaintext keys?
- How are keys rotated?
- What happens when access is revoked?
- How is key usage audited?
- What happens if the key-management service is unavailable?
- Can one environment or tenant use another environment's keys?

A key-management architecture can materially change the security properties of otherwise identical encrypted storage.

The architecture should also distinguish **key ownership/control** from the simple presence of encryption. A provider-managed encryption mechanism and customer-controlled key architecture may have different governance and separation properties.

## 21.7 Secrets Are Not Ordinary Data

Passwords, API keys, signing keys, tokens, certificates, and other credentials deserve a separate control path.

They should not be placed in:

- prompts;
- source code;
- Git repositories;
- model context;
- ordinary application logs;
- notebooks;
- configuration files distributed without appropriate protection.

Chapter 20 established the identity and credential lifecycle problem. Chapter 21 adds the data-protection perspective: **a credential is both sensitive data and authority**.

Therefore leakage can produce two consequences simultaneously:

**data disclosure + privilege escalation**

## 21.8 Data in Transit

Data crossing system boundaries should be protected according to the threat model and protocol used.

The advisor should identify:

- client-to-application traffic;
- application-to-database traffic;
- service-to-service traffic;
- application-to-model-provider traffic;
- integration-to-portfolio-company traffic;
- administrative traffic.

Do not treat "inside the cloud" or "inside the private network" as synonymous with trusted communication.

The relevant question is whether the communication path has appropriate authentication, authorization, confidentiality, integrity, and monitoring for its risk.

## 21.9 Data at Rest

Data at rest can exist in many places:

- relational databases;
- object storage;
- data warehouses;
- lake/lakehouse storage;
- vector indexes;
- search indexes;
- caches;
- backups;
- snapshots;
- temporary files;
- model-serving infrastructure;
- observability systems.

A common architectural mistake is to encrypt the primary database while overlooking secondary copies.

For AI systems, the advisor should specifically ask:

> **Where else does this data exist after it enters the AI pipeline?**

The answer may include embeddings, extracted text, indexes, caches, logs, traces, evaluation datasets, and backups.

## 21.10 Embeddings Are Still Data

An embedding is a transformed representation, not automatically a non-sensitive representation.

Whether an embedding can reveal useful information depends on the model, data, attack capabilities, surrounding controls, and application design. Therefore the safe architectural assumption is:

> **If an embedding was derived from sensitive information, treat it according to the sensitivity assessment of the resulting artifact rather than assuming transformation makes it harmless.**

This is an architecture precaution, not a universal claim that every embedding has the same confidentiality risk as its source.

The advisor should therefore include vector stores and embedding pipelines in data-flow and access-control reviews.

## 21.11 Data Masking, Tokenization, and Pseudonymization

These techniques solve different problems.

### Masking

Hide selected values from a consumer or display.

Example:

`123456789 → ******789`

### Tokenization

Replace a sensitive value with a token whose relationship to the original value is controlled by a separate mechanism.

### Pseudonymization

Process data so it cannot be attributed to a specific person without additional information.

None should automatically be described as "anonymization." Whether data is truly anonymous depends on the ability to re-identify it given reasonably available information.

For an AI system, these techniques can reduce exposure, but they may also remove information needed by the model. The correct choice is therefore a trade-off between analytical utility, security, privacy, and operational complexity.

## 21.12 Redaction Before Model Inference

One practical architecture is to remove unnecessary sensitive fields before data reaches the model.

Example:

```text
Raw Document
     ↓
Sensitive-Data Detection
     ↓
Policy Decision
     ↓
Redaction / Masking
     ↓
Approved Context
     ↓
LLM
```

This can reduce the amount of sensitive data exposed to the model or provider.

However, redaction should not be treated as infallible. Detection can miss information, over-redact useful evidence, or fail on new document formats. The advisor should therefore assess detection coverage and failure behavior rather than treating a redaction component as a perfect boundary.

## 21.13 Data Residency and Data Sovereignty

"Where is the data?" can mean several different things:

- where primary storage is located;
- where backups are located;
- where processing occurs;
- where logs are stored;
- where support personnel may access systems;
- where subprocessors operate;
- where encryption keys are controlled.

Therefore a requirement such as:

> "Data must remain in Indonesia."

must be translated into an explicit architectural and contractual requirement.

The advisor should not infer that selecting an Indonesia-based storage region automatically satisfies every residency, sovereignty, or regulatory requirement.

## 21.14 Third-Party Model Providers

When sensitive data is sent to an external AI provider, evaluate the complete processing boundary.

NIST's Generative AI Profile specifically identifies third-party GAI integrations as a source of potential intellectual-property, data-privacy, and information-security risk and recommends risk management and due diligence for third-party models, tools, data, and providers. [NIST AI RMF Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)

Questions include:

1. What data leaves the organization's controlled environment?
2. Is it retained?
3. For how long?
4. Is it used for provider model improvement or other purposes?
5. Where is processing performed?
6. What subprocessors are involved?
7. What contractual controls apply?
8. Can the customer configure retention or regional processing?
9. What logging exists on the provider side?
10. What happens when the contract ends?

These are provider-specific facts and must be verified against current contractual and technical documentation rather than assumed from the phrase "enterprise AI."

## 21.15 Data Leakage Through Logs and Observability

Logs can become a secondary data-exfiltration path.

Potentially sensitive material can appear in:

- prompts;
- retrieved documents;
- tool arguments;
- model outputs;
- stack traces;
- HTTP payloads;
- error messages;
- debug traces;
- evaluation datasets.

The advisor should establish explicit logging rules:

**What must be logged? What must never be logged? What must be redacted? Who can access logs? How long are they retained?**

More logging is not automatically better. The objective is sufficient observability and auditability without creating an uncontrolled duplicate repository of sensitive information.

## 21.16 Retention and Deletion

Data protection includes what happens after the business purpose ends.

For every significant data store, define:

- retention requirement;
- legal or contractual constraint where applicable;
- operational need;
- archival requirement;
- deletion trigger;
- deletion mechanism;
- backup implications;
- verification method.

Deletion must be considered separately for each artifact class:

| Artifact | Example deletion question |
|---|---|
| Source data | Has the authoritative record been deleted or deactivated? |
| Extracted text | Has extracted content been removed? |
| Embeddings/indexes | Has the derived representation been removed or invalidated? |
| Cache | Can cached copies expire or be purged? |
| Prompts/outputs | Are conversational or inference records retained? |
| Logs/traces | Do observability systems contain sensitive payloads? |
| Backups/snapshots | What is the backup retention and deletion behavior? |
| Audit records | Which records must be preserved despite deletion elsewhere? |

Deleting the source record does not by itself demonstrate that every derivative has disappeared. Conversely, not every audit record should necessarily be deleted when source data is removed; retention obligations may differ by artifact and purpose.

Therefore the advisor should ask:

> **Can the organization actually demonstrate where the data goes when a deletion requirement is triggered?**

Do not promise immediate physical destruction if the architecture only supports logical deletion or delayed deletion from backup systems.

## 21.17 Data Lifecycle and AI Artifacts

AI systems create additional artifacts:

- prompts;
- responses;
- embeddings;
- extracted text;
- evaluation sets;
- fine-tuning datasets;
- feature stores;
- model inputs and outputs;
- tool-call records;
- traces;
- safety-test datasets.

Each artifact should have a defined purpose, owner, retention rule, and protection requirement.

A useful lifecycle is:

**Collect → Classify → Minimize → Transform → Store → Process → Share → Monitor → Retain → Dispose**

Not every artifact requires identical retention. The correct retention period depends on business, audit, security, privacy, legal, and operational requirements.

## 21.18 Data Protection for RAG

RAG creates several data-protection boundaries:

```text
Source Documents
      ↓
Ingestion
      ↓
Parsing / Extraction
      ↓
Chunking
      ↓
Embeddings / Index
      ↓
Retrieval
      ↓
Context Assembly
      ↓
Model Provider
      ↓
Response
```

Controls should be considered at each stage.

For example:

- source access control;
- secure ingestion;
- classification metadata;
- protected intermediate storage;
- index access control;
- retrieval authorization;
- context minimization;
- provider boundary control;
- output filtering;
- audit.

A secure source repository does not automatically make the resulting vector index secure.

## 21.19 Data Protection for Agents

Agents introduce a second problem: data can move dynamically based on model-selected actions.

An agent might:

1. retrieve a financial statement;
2. call a market-data service;
3. query an ERP;
4. send information to another service;
5. create an output.

The data-protection architecture must therefore constrain not only storage but **data movement caused by tools**.

The advisor should ask:

- What data may this agent read?
- Which tools may receive it?
- Can one tool's output become another tool's input?
- Can the agent send data to an external endpoint?
- Are cross-tenant transfers prevented?
- Are tool arguments logged safely?
- Can a compromised agent exfiltrate data through a legitimate tool?

## 21.20 Data Protection and AI-IDSS

For the investment decision-support system, the preferred pattern is:

```text
Authoritative Data
       ↓
Classification / Governance
       ↓
Minimization / Transformation
       ↓
Authorized Data Services
       ↓
Evidence Retrieval
       ↓
Controlled Model Boundary
       ↓
Evidence-Based Synthesis
       ↓
RD / Investment Team
```

The AI-IDSS should not become a second uncontrolled enterprise data warehouse.

Source systems remain authoritative. AI-derived summaries and recommendations should be treated as derived artifacts whose provenance can be traced back to source evidence where the use case requires it.

## 21.21 Defense in Depth

Data protection should not rely on a single control.

For sensitive information, controls may exist at several layers:

1. data minimization;
2. identity and authorization;
3. network and transport protection;
4. encryption;
5. key management;
6. application policy;
7. storage access control;
8. monitoring and audit;
9. DLP or content controls where appropriate;
10. incident response and recovery.

The objective is not maximum controls everywhere. Excessive controls can create complexity, cost, latency, and operational failure.

The advisor should seek the **smallest defensible control set that addresses the actual threat and consequence**.

## 21.22 Common Data-Protection Anti-Patterns

### 1. "Everything is encrypted, therefore it is secure"

Encryption does not replace authorization, key management, or application security.

### 2. "Private network means safe"

Network location is not a substitute for identity and resource authorization.

### 3. "The vector database contains only embeddings"

Transformed data still requires a sensitivity assessment.

### 4. "The model provider is enterprise, so data is protected"

Provider-specific retention, processing, access, and contractual properties must be verified.

### 5. "Logs are harmless"

Logs can contain the same sensitive content as application payloads.

### 6. "We can delete it later"

Deletion becomes difficult when data has propagated into indexes, caches, backups, and derived artifacts.

### 7. "Masking equals anonymization"

Masking can hide values without eliminating re-identification or disclosure risk.

### 8. "Send all source data to the model"

Model access should be minimized to what the task requires.

### 9. "DLP will solve data leakage"

DLP is one control, not a substitute for architecture, authorization, minimization, and provider governance.

### 10. "One policy covers every data class"

Different data types can have materially different security, privacy, retention, and processing requirements.

## 21.23 Technical Challenge Questions

1. What data classifications exist?
2. Which systems are authoritative for each important data element?
3. What sensitive data actually needs to reach the AI system?
4. What can be removed before inference?
5. Where does plaintext exist?
6. Where are encrypted copies stored?
7. Who controls the encryption keys?
8. Where do embeddings and indexes reside?
9. Where do backups and snapshots reside?
10. What data enters logs and traces?
11. What happens to data sent to an external model provider?
12. What are the provider's retention and processing terms?
13. Where does processing physically occur when residency matters?
14. What happens when a record must be deleted?
15. Can deletion propagate to derived AI artifacts?
16. Can an agent move sensitive data between tools?
17. Can a model provider or external connector receive more data than necessary?
18. Which controls remain effective if DLP fails?
19. Which controls remain effective if an application is compromised?
20. What evidence demonstrates that the stated data-protection boundary actually exists?

## 21.24 Architecture Review Checklist

### Classification

- [ ] Important data classes are defined.
- [ ] Sensitivity is tied to consequences and required controls.
- [ ] Derived AI artifacts have been considered.

### Minimization

- [ ] Unnecessary fields are removed or transformed where practical.
- [ ] Model context is limited to what the task requires.
- [ ] Sensitive data is not copied merely for convenience.

### Encryption and Keys

- [ ] Data in transit has appropriate protection.
- [ ] Sensitive data at rest is appropriately protected.
- [ ] Key-management responsibilities are explicit.
- [ ] Key usage and administrative access are auditable.

### AI Pipeline

- [ ] RAG indexes are included in the protection boundary.
- [ ] Embeddings have a defined sensitivity treatment.
- [ ] Prompts, outputs, and tool arguments have logging rules.
- [ ] Agent data movement is constrained.

### External Providers

- [ ] Provider processing terms are verified.
- [ ] Retention is understood.
- [ ] Processing location is understood where relevant.
- [ ] Subprocessor and contractual dependencies are understood.

### Lifecycle

- [ ] Retention is defined per relevant artifact class.
- [ ] Deletion triggers are defined.
- [ ] Derived copies are included in lifecycle analysis.
- [ ] Backup behavior is understood.
- [ ] Audit-retention requirements are distinguished from deletion requirements.

## 21.25 Evidence Discipline

### Fact

Examples:

- NIST's Privacy Framework addresses privacy risk arising from data processing and is centered on protecting individuals' privacy.
- NIST explicitly distinguishes protection of business information from the primary scope of its Privacy Framework and points to cybersecurity safeguards for business information.
- NIST defines minimization in terms of relevance, necessity, authorized purpose, and retention.
- NIST provides guidance on storage encryption technologies.
- NIST's Generative AI Profile identifies third-party GAI integrations as potential sources of data-privacy and information-security risk and calls for due diligence and risk controls.

### Architecture Recommendation

Examples:

- Minimize sensitive data before model inference where feasible.
- Include vector indexes and logs in the data-protection boundary.
- Treat credentials as both sensitive data and authority.
- Map deletion separately across source and derived artifact classes.

### Inference

Example:

> A system with many derived copies generally creates a more complex deletion and governance problem.

This is an architectural inference, not a universal empirical law.

### Provider-Specific Fact

Retention, training use, regional processing, contractual controls, subprocessors, and deletion behavior must be verified against the current provider's documentation and contract.

### Assumption

When a design review does not yet have provider or contractual evidence, statements about retention, regional processing, or training use must be marked as assumptions or unknowns—not treated as facts.

### Uncertainty

Where the architecture cannot establish where data exists, the correct advisor response is not to assume safety. It is to identify the missing evidence and require it before approving the design.

## 21.26 What Would Change Our Mind?

The advisor should revise a data-protection recommendation if credible evidence shows that:

- a less complex control provides equivalent protection against the defined threat;
- a provider offers stronger contractual and technical guarantees than initially assumed;
- a data transformation demonstrably reduces exposure without harming required analytical utility;
- retention or deletion requirements are materially different from the assumed lifecycle;
- testing demonstrates that the proposed control causes unacceptable availability, latency, or operational risk;
- regulatory or contractual requirements change the acceptable architecture;
- a derived artifact is demonstrated to have materially different sensitivity from the precaution initially assumed.

## 21.27 Field Rule

> **Protect the data according to what it is, where it goes, what can happen to it, and what the consequences are—not according to the name of the technology that happens to store or process it.**

For AI-IDSS, the advisor should be able to trace a sensitive data element from source to final decision support and answer four questions at every boundary:

**What is it? Who may access it? What may happen to it? What control prevents unacceptable use or disclosure?**
