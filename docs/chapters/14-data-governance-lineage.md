# 14. Data Governance & Lineage

> **Advisor question:** Can the organization define who may use data, what the data means, which source is authoritative, how controls are enforced, and how a material decision can be reconstructed?

Data governance is not a catalog, a platform, or a committee. It is the organizational and technical system through which the organization establishes **decision rights, responsibilities, definitions, permitted use, quality requirements, and enforceable controls** for data.

For AI-enabled decision support, governance must connect policy to architecture. A policy that says *“Portfolio A data must not be exposed to Portfolio B”* is incomplete until the architecture can enforce and demonstrate that boundary.

## 14.1 What Data Governance Is

**Fact / technical evidence.** NIST is developing a Data Governance and Management Profile to help organizations address data-governance priorities and connect governance activities with privacy and cybersecurity risk management. The profile remains under development as of 2026; it should therefore not be presented as a finalized mandatory standard. [NIST — Data Governance and Management Profile](https://www.nist.gov/privacy-framework/new-projects/data-governance-and-management-profile)

For the advisor, the key question is not:

> “Do we have data governance?”

It is:

> **“Who decides what this data means, who may use it, for what purpose, under what conditions, and what technical evidence demonstrates that those decisions were enforced?”**

## 14.2 Governance Is a Decision System

Governance becomes useful when decisions are explicit.

| Governance question | Example architectural answer |
|---|---|
| Who owns the business definition? | Designated finance data owner |
| Who maintains the dataset? | Data steward / source-system team |
| Who may access it? | Role/attribute/purpose-based policy |
| What may it be used for? | Approved investment-risk analysis |
| What quality is required? | Defined validation rules and thresholds |
| Which source is authoritative? | Explicit authority map |
| How is change controlled? | Versioned schema and approval |
| How is use demonstrated? | Access, processing, and audit evidence |

**Recommendation:** Governance decisions should be architectural inputs, not documentation produced after implementation.

## 14.3 Policy, Metadata, Lineage, and Enforcement Are Different

These concepts are related but must not be collapsed:

| Layer | Question | Example |
|---|---|---|
| Policy | What should be allowed? | Portfolio A data may be used only by an authorized team |
| Metadata | What is the data and how is it classified? | `confidential`, owner=`Finance` |
| Lineage/provenance | Where did it come from and what happened to it? | ERP → curated dataset → retrieval index |
| Runtime enforcement | What prevents unauthorized use? | Authorization decision at data-access boundary |
| Audit evidence | What happened? | Identity, resource, decision, timestamp |

**Architecture warning:** metadata does not enforce authorization. A `confidential` tag on a document is not, by itself, an access-control mechanism.

Likewise, lineage does not prove that a source is correct, and policy documentation does not prove that a control was actually enforced.

## 14.4 Data Owner, Steward, Custodian, and Consumer

Roles should not be collapsed into one generic “data owner” concept.

- **Data owner:** accountable for business decisions about the data domain, including permitted use and authoritative meaning.
- **Data steward:** coordinates definitions, quality rules, metadata, and issue resolution.
- **Data custodian:** operates the technical environment in which data is stored, processed, or protected.
- **Data consumer:** uses the data for an approved purpose.

**Technical evidence:** ISO 8000-150:2022 addresses roles and responsibilities associated with data-quality management. [ISO 8000-150:2022](https://www.iso.org/standard/80753.html)

These roles may be combined in a small organization, but the responsibilities should remain distinguishable.

## 14.5 Authority: Which Source Should Be Trusted?

A system can contain valid-looking data without being the authoritative source for a business fact.

```text
Authoritative source
       ↓
Integration / transformation
       ↓
Consumer copy
       ↓
AI / analytics
```

Authority should be defined **per material business fact**, not inferred from whichever copy is easiest to query.

| Business fact | Authoritative source | Consumer copy | Authority rule |
|---|---|---|---|
| Revenue | Approved financial source | Analytical store | Source wins |
| Debt balance | Approved treasury/ERP source | Risk mart | Source wins |
| Investment thesis | Approved memo | Search index | Approved version controls |
| Risk score | Approved model service | AI-IDSS cache | Model version + timestamp |

A cached or transformed copy can be operationally useful without becoming authoritative.

**Advisor challenge:**

> “If the copy and the source disagree, which one wins—and how does the system know?”

## 14.6 Metadata Is Part of Governance, Not Governance Itself

Useful metadata may include:

- business definition;
- owner and steward;
- source system;
- classification;
- permitted purpose;
- retention requirement;
- quality rules;
- freshness expectation;
- lineage references;
- schema version;
- status and deprecation date.

Metadata is valuable when it supports interpretation, control, discovery, or auditability. The objective is not to maximize the number of cataloged fields.

## 14.7 Business Glossary and Semantic Control

A technically valid field can still be semantically ambiguous.

For example, “EBITDA” may require explicit treatment of:

- reporting period;
- currency;
- consolidation scope;
- accounting basis;
- adjustments;
- actual versus forecast status.

> **Schema compatibility is not semantic compatibility.**

A governed glossary should connect business terms to technical representations and, where necessary, calculation rules.

**Technical evidence:** ISO 8000-1:2022 establishes principles and an overview for data quality, while ISO/TS 8000-82:2022 addresses data rules. [ISO 8000-1:2022](https://www.iso.org/standard/81745.html) · [ISO/TS 8000-82:2022](https://www.iso.org/standard/78707.html)

## 14.8 Data Quality Is Fitness for Purpose

Data quality should be evaluated against the intended use rather than reduced to one universal score.

Relevant dimensions can include:

- accuracy;
- completeness;
- consistency;
- timeliness;
- validity;
- uniqueness;
- integrity.

The required threshold is a function of the decision consequence. A stale debt balance may be materially more important to a liquidity alert than a formatting inconsistency in an unrelated descriptive field.

**Advisor principle:**

> **Define data-quality requirements from the decision consequence backward.**

This connects directly to the evaluation hierarchy used elsewhere in this manual:

```text
Data quality
     ↓
Task performance
     ↓
System performance
     ↓
Business / decision value
```

Good data quality is necessary for many workloads, but it does not by itself prove that an AI system is fit for purpose.

## 14.9 Data Quality Rules and Gates

A governance program becomes technically meaningful when important rules can be tested and can influence system behavior.

```text
Incoming data
     ↓
Schema validation
     ↓
Business-rule validation
     ↓
Reconciliation
     ↓
Quality decision
   ┌───┴───┐
  pass    fail
   ↓        ↓
publish  quarantine / exception
```

A critical quality rule should identify:

1. the rule;
2. applicable data;
3. severity;
4. responsible party;
5. permitted downstream action;
6. evidence retained.

**Recommendation:** avoid relying on a single aggregate data-quality score when individual failures have materially different consequences.

## 14.10 Lineage: What Happened to the Data?

**Fact / technical evidence.** NIST defines lineage as the history of processing of a data element, which may include point-to-point flows and actions performed upon it. [NIST — Lineage](https://csrc.nist.gov/glossary/term/lineage)

For AI-IDSS, lineage can connect:

```text
Recommendation
   ↓
Model / analytical component
   ↓
Feature / metric / retrieved evidence
   ↓
Transformation
   ↓
Integrated dataset
   ↓
Source record
```

Lineage should be designed around the reconstruction questions an auditor, reviewer, operator, or successor will actually need to answer.

## 14.11 Provenance: Where Did It Come From?

**Fact / technical evidence.** NIST describes provenance as information concerning the chronology of origin, development, ownership, location, and changes associated with data or a system component. [NIST — Provenance](https://csrc.nist.gov/glossary/term/provenance)

| Concept | Primary question |
|---|---|
| Metadata | What is this? |
| Lineage | How was it processed or moved? |
| Provenance | Where did it originate and what happened to it? |
| Quality evidence | Does it satisfy defined requirements? |
| Authority | Which source has decision rights over the fact? |

**Critical distinction:** provenance improves traceability; it does not prove source accuracy or semantic correctness.

## 14.12 Lineage Is Not Explainability

A lineage graph can show that a recommendation used a particular dataset and model version. It does not by itself explain why an analytical or model component produced a conclusion.

A defensible AI-IDSS may require linked evidence layers:

```text
Source provenance
      ↓
Data lineage
      ↓
Data-quality evidence
      ↓
Feature / analytical transformation
      ↓
Model version + evaluation evidence
      ↓
Retrieved evidence / citations
      ↓
AI synthesis
      ↓
Recommendation
```

Do not claim that an output is “explainable” merely because its data lineage is available.

## 14.13 Governance for Derived Data

AI and analytics create derived artifacts such as:

- features;
- embeddings;
- classifications;
- risk scores;
- summaries;
- extracted entities;
- forecasts;
- recommendations.

These may be operationally valuable without replacing authoritative source records.

Where material, derived artifacts should carry:

- producer;
- method/model;
- version;
- timestamp;
- source references;
- validation status;
- intended use;
- uncertainty information where meaningful.

For example:

> **Risk score: 68%** — model `risk-v3.2`, evaluated against a defined validation set, generated at a recorded time, based on identified source data.

The exact metadata requirements depend on what the score means and what decision consequences follow from it. The number “68%” must not be presented as a statistical probability unless the underlying method actually defines and supports that interpretation.

## 14.14 Governance for RAG

RAG makes governance operational because retrieval is a data-access decision.

The retrieval path should preserve, where material:

- source authority;
- access permissions;
- document status;
- version;
- effective date;
- retention/deletion state;
- provenance;
- citation identity.

A document should not become retrievable merely because it was successfully indexed.

> **Authorization must be enforced in the data-access path, not delegated to the LLM's instructions.**

This connects Chapter 14 directly to Chapters 10, 12, 13, and 19–22.

## 14.15 Governance for Agents

Agents introduce an additional governance problem: data use can trigger actions.

A governed agent should have explicit controls for:

- identity;
- delegated authority;
- allowed tools;
- allowed data domains;
- purpose;
- transaction limits;
- approval requirements;
- logging;
- failure handling.

```text
Request
  ↓
Identity + purpose check
  ↓
Authorized data access
  ↓
Analysis
  ↓
Human review where required
  ↓
Authorized action
```

**Recommendation:** separate “can read” from “can act.” Access to financial information does not automatically imply authority to modify a financial system.

## 14.16 Retention Is a Design Decision

Keeping everything forever is not automatically good governance.

Retention should consider:

- regulatory and legal requirements;
- auditability;
- reproducibility;
- privacy;
- security exposure;
- storage cost;
- operational value;
- ability to reconstruct material decisions.

Retention also needs to account for derived artifacts. Keeping an embedding or generated summary indefinitely can preserve information that has already been deleted or withdrawn at the source unless deletion and re-indexing behavior are designed explicitly.

**Architecture warning:** deletion at the source does not automatically mean deletion from every derived representation.

## 14.17 Governance and Access Control

Governance establishes what should be allowed. Access-control architecture enforces that decision.

At minimum, distinguish:

- **authentication:** who or what is requesting access?
- **authorization:** is that requester permitted to perform the requested action on the resource?
- **purpose/context:** is the use permitted in this situation?
- **audit:** can the organization demonstrate what happened?

For cross-portfolio AI-IDSS, authorization should normally be evaluated at the data-access boundary before information enters model context.

A powerful service identity must not silently broaden the business user's authority.

## 14.18 Data Classification

Classification should support actual control decisions.

| Example class | Example | Typical architectural consequence |
|---|---|---|
| Public | Published information | Broad access with integrity controls |
| Internal | Internal operating reports | Authenticated access |
| Confidential | Portfolio financials | Strong authorization and audit |
| Highly restricted | Material sensitive information | Restricted identities, purpose controls, monitoring, controlled processing |

These are example categories, not universal regulatory classifications. The organization must map them to applicable legal, contractual, and internal requirements.

## 14.19 Governance Across Portfolio Boundaries

When data from multiple portfolio companies is processed together, isolation must be explicit.

```text
Portfolio A ──┐
Portfolio B ──┼──> governed data plane ──> permitted context
Portfolio C ──┘                ↑
                         authorization policy
```

A shared retrieval or analytical domain should not rely solely on prompt instructions such as “do not mix companies.” The data-access layer should enforce the boundary.

**Recommendation:** Treat portfolio isolation as a combined **data architecture + identity + authorization + retrieval** problem.

## 14.20 Governance Operating Model

A practical governance operating model can be organized into five loops:

1. **Define** — terms, owners, authority, permitted use.
2. **Control** — access, quality, classification, retention.
3. **Observe** — lineage, provenance, quality metrics, access events.
4. **Correct** — data issues, policy violations, ownership gaps.
5. **Improve** — revise rules as business and technology change.

Governance is therefore an operating capability, not a one-time documentation exercise.

## 14.21 Governance Architecture

```text
                    GOVERNANCE
 ┌──────────────────────────────────────────────┐
 │ Policy · Ownership · Definitions · Controls │
 │ Quality · Classification · Retention        │
 └──────────────────────────────────────────────┘
          ↓          ↓          ↓
 Sources → Integration → Data Platform → AI/ML/RAG → AI-IDSS
   │           │             │             │            │
   └───────────┴─────────────┴─────────────┴────────────┘
            Lineage / Provenance / Audit
```

Governance should span the lifecycle. It should not sit beside the data architecture as a reporting function.

## 14.22 Governance Failure Modes

### 1. “The catalog is the governance.”
A catalog can document metadata without enforcing ownership, access, quality, or permitted use.

### 2. “The source is correct because it is the source.”
Authority and correctness are different questions.

### 3. “Lineage means explainability.”
Lineage describes processing history; it does not fully explain analytical reasoning.

### 4. “The LLM will respect the policy.”
Security and authorization requirements belong in enforceable controls.

### 5. “The service account has access, so the agent can access it.”
Technical connectivity is not equivalent to authorized business use.

### 6. “Delete it from the source and we are done.”
Derived copies, indexes, caches, and embeddings may require explicit deletion handling.

### 7. “One quality score is enough.”
Different quality failures have different consequences.

### 8. “Derived AI data is authoritative.”
Derived artifacts need explicit status, provenance, validation, and lifecycle.

## 14.23 Technical Challenge Questions

When reviewing a governance proposal, ask:

1. Who owns the meaning of this data?
2. Which system is authoritative for each material business fact?
3. What is the permitted purpose of use?
4. Who may access it, and where is that authorization enforced?
5. Which rules are policy only, and which are technically enforced?
6. What quality requirements are tied to the decision?
7. What happens when a quality gate fails?
8. Can we reconstruct the lineage of a material recommendation?
9. Can we identify the origin and changes of the evidence?
10. Does provenance get mistaken for correctness anywhere in the design?
11. How are derived AI artifacts labeled and governed?
12. What happens to embeddings, indexes, caches, and summaries after source deletion or withdrawal?
13. Can portfolio boundaries be enforced independently of LLM instructions?
14. Does a service identity broaden access beyond the intended user or purpose?
15. What is retained, for how long, and why?
16. Which governance assumptions would become unsafe if the AI-IDSS scaled tenfold?
17. What evidence demonstrates that the controls actually operated as designed?

## 14.24 Architecture Review Checklist

### Authority
- [ ] Authoritative source defined for material facts
- [ ] Conflict-resolution rule defined
- [ ] Derived copies cannot silently override authority

### Ownership
- [ ] Business owner identified
- [ ] Stewardship responsibilities identified
- [ ] Technical custodian identified

### Semantics
- [ ] Business terms defined
- [ ] Units, currency, period, scope, and calculation rules explicit where needed

### Quality
- [ ] Quality dimensions relevant to the use are defined
- [ ] Critical rules are testable
- [ ] Failure behavior is defined
- [ ] Thresholds are explicit requirements or validated assumptions

### Governance enforcement
- [ ] Policy is distinguished from runtime enforcement
- [ ] Authorization is enforced at the data-access boundary
- [ ] Audit evidence is sufficient to demonstrate material decisions

### Lineage / Provenance
- [ ] Material transformations are traceable
- [ ] Source origin is recorded where required
- [ ] Lineage is not presented as explainability

### Derived data
- [ ] Model/method/version recorded where material
- [ ] Source references recorded
- [ ] Lifecycle and deletion behavior defined

### Portfolio isolation
- [ ] Tenant/company boundary explicit
- [ ] Retrieval path enforces authorization
- [ ] Service identities cannot silently broaden scope

### Retention
- [ ] Retention rationale documented
- [ ] Derived representations included in lifecycle design

## 14.25 Evidence Discipline

| Statement | Classification |
|---|---|
| NIST is developing a Data Governance and Management Profile | **Fact / technical evidence** |
| ISO 8000-150 addresses roles and responsibilities associated with data-quality management | **Fact / technical evidence** |
| NIST defines lineage and provenance as distinct concepts | **Fact / technical evidence** |
| Governance should become enforceable through technical controls | **Architecture principle / recommendation** |
| A data catalog alone constitutes governance | **Unsupported** |
| Lineage proves correctness | **Unsupported** |
| One universal data-quality threshold is sufficient | **Unsupported** |
| Prompt instructions are sufficient authorization enforcement | **Unsupported / architecture risk** |

## 14.26 Field Rule

> **Governance is credible only when the organization can connect policy to ownership, semantics, runtime enforcement, evidence, and accountable action.**

A governance document can say what should happen. An architecture must make the important parts happen—and make the result demonstrable.
