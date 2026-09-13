# 14. Data Governance & Lineage

## 14.1 What Data Governance Is

Data governance is the organizational and technical system used to establish decision rights, responsibilities, rules, and controls for data. It is not synonymous with a data catalog, a data warehouse, a data-quality tool, or a central data team.

**Technical evidence:** NIST is developing a Data Governance and Management Profile to help organizations address data-governance priorities and connect governance activities with privacy and cybersecurity risk management. The profile remains under development as of 2026. [NIST — Data Governance and Management Profile](https://www.nist.gov/privacy-framework/new-projects/data-governance-and-management-profile)

For the advisor, the key question is not “Do we have data governance?” but:

> **Who is allowed to decide what this data means, who may use it, under what conditions, and how can the organization demonstrate that those rules were followed?**

---

## 14.2 Governance Is a Decision System

Governance becomes useful when it makes decisions explicit.

| Governance question | Example architectural answer |
|---|---|
| Who owns the business definition? | CFO / finance data owner |
| Who maintains the dataset? | Data steward / source-system team |
| Who may access it? | Role and attribute-based policy |
| What may it be used for? | Approved investment-risk analysis |
| What quality is required? | Defined validation rules and thresholds |
| Which source is authoritative? | Portfolio-company ERP |
| How is change controlled? | Versioned schema and approval |
| How is use demonstrated? | Access and processing audit trail |

**Recommendation:** Treat governance decisions as architectural inputs, not as documentation produced after implementation.

---

## 14.3 Data Owner, Steward, Custodian, and Consumer

Roles should not be collapsed into one generic “data owner” concept.

- **Data owner:** accountable for business decisions about the data domain, including permitted use and authoritative meaning.
- **Data steward:** responsible for operational coordination of definitions, quality rules, metadata, and issue resolution.
- **Data custodian:** operates the technical environment in which data is stored, processed, or protected.
- **Data consumer:** uses the data for an approved purpose.

**Technical evidence:** ISO 8000-150:2022 addresses roles and responsibilities for data-quality management and emphasizes documenting implementation. [ISO 8000-150:2022](https://www.iso.org/standard/80753.html)

These roles may be combined in a small organization, but the responsibilities should remain distinguishable.

---

## 14.4 Authority: Which Source Should Be Trusted?

A system can contain valid-looking data without being the authoritative source for a business fact.

For example:

```text
Portfolio ERP ───────┐
                     ├──> Integration ──> Analytical store ──> AI-IDSS
Financial statements ─┘

Authority must be defined per business fact,
not inferred from whichever copy is easiest to query.
```

**Recommendation:** Maintain an explicit authority map for material data domains.

Example:

| Business fact | Authoritative source | Consumer copy | Authority rule |
|---|---|---|---|
| Revenue | ERP / approved financial system | Lakehouse | Source wins |
| Debt balance | Treasury / ERP | Risk mart | Source wins |
| Investment thesis | Approved investment memo | Search index | Memo version controls |
| Risk score | Approved model service | AI-IDSS cache | Model version + timestamp |

A cached or transformed copy can be operationally useful without becoming authoritative.

---

## 14.5 Metadata Is Part of Governance

Metadata describes data so that people and systems can interpret, manage, discover, and control it.

Useful metadata may include:

- business definition
- technical name
- owner and steward
- source system
- classification
- permitted purpose
- sensitivity
- retention requirement
- quality rules
- freshness expectation
- lineage references
- schema version
- status and deprecation date

**Recommendation:** Make metadata sufficient to answer the questions required by the actual decision process. Do not create a catalog merely to maximize the number of cataloged fields.

---

## 14.6 Business Glossary and Semantic Control

A technically valid field can still be semantically ambiguous.

For example, “EBITDA” may require explicit treatment of:

- reporting period
- currency
- consolidation scope
- accounting basis
- adjustments
- actual versus forecast status

**Architecture rule:**

> **Schema compatibility is not semantic compatibility.**

A governed glossary should connect business terms to technical representations and, where necessary, calculation rules.

**Technical evidence:** ISO 8000 addresses information and data quality and includes work on data rules that can express requirements in machine-processable form. [ISO 8000-1:2022](https://www.iso.org/standard/81745.html) · [ISO/TS 8000-82:2022](https://www.iso.org/standard/78707.html)

---

## 14.7 Data Quality Is Fitness for Purpose

Data quality should be evaluated against the use for which the data is required.

Possible dimensions include:

- accuracy
- completeness
- consistency
- timeliness
- validity
- uniqueness
- integrity

There is no universal threshold that makes a dataset “good” for every purpose.

**Technical evidence:** ISO 8000 provides a framework for information and data quality; ISO/TS 8000-82 describes data rules used to sustain data integrity and reliability. [ISO 8000-1:2022](https://www.iso.org/standard/81745.html) · [ISO/TS 8000-82:2022](https://www.iso.org/standard/78707.html)

**Recommendation:** Define quality requirements from the decision consequence backward.

For an investment-risk alert, a stale debt balance may be more consequential than a minor formatting inconsistency in an unrelated descriptive field.

---

## 14.8 Data Quality Rules and Gates

A governance program becomes technically enforceable when important rules can be tested.

Example:

```text
Incoming financial data
        ↓
Schema validation
        ↓
Business-rule validation
        ↓
Reconciliation
        ↓
Quality decision
   ┌────┴────┐
 pass       fail
   ↓          ↓
publish    quarantine / exception
```

Quality gates should identify:

1. the rule,
2. the applicable data,
3. the severity of failure,
4. the responsible party,
5. the permitted action,
6. the evidence retained.

**Recommendation:** Avoid a single aggregate “data quality score” when individual failures have materially different consequences.

---

## 14.9 Lineage: What Happened to the Data?

NIST defines lineage as the history of processing of a data element, which may include point-to-point flows and data actions performed upon it. [NIST — Lineage](https://csrc.nist.gov/glossary/term/lineage)

For an AI-IDSS, lineage can answer:

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

Lineage is therefore different from a simple list of source systems. It describes how information moved and was processed.

**Recommendation:** For material decisions, lineage should be designed around the questions an auditor, reviewer, or successor will need to reconstruct.

---

## 14.10 Provenance: Where Did It Come From?

NIST describes provenance as the chronology of origin, development, ownership, location, and changes associated with data or a system component. [NIST — Provenance](https://csrc.nist.gov/glossary/term/provenance)

A useful distinction is:

| Concept | Primary question |
|---|---|
| Metadata | What is this? |
| Lineage | How was it processed or moved? |
| Provenance | Where did it originate and what happened to it? |
| Quality evidence | Does it satisfy defined requirements? |
| Authority | Which source has decision rights over the fact? |

**Important:** provenance does not prove that a source is correct. It improves traceability of origin and change.

---

## 14.11 Lineage Is Not Explainability

A lineage graph can show that a recommendation used a particular dataset and model version. It does not by itself explain why the model produced a particular conclusion.

A defensible AI-IDSS may require several linked evidence layers:

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

**Advisor rule:** Never use “we have lineage” as a substitute for explaining model behavior or decision logic.

---

## 14.12 Governance for Derived Data

AI and analytics create derived artifacts:

- features
- embeddings
- classifications
- risk scores
- summaries
- extracted entities
- forecasts
- recommendations

These artifacts may be operationally valuable but should not silently become replacements for authoritative source records.

**Recommendation:** Label derived artifacts with their:

- producer
- method/model
- version
- timestamp
- source references
- confidence or uncertainty where meaningful
- validation status
- intended use

For example:

> **Risk score: 68%** — model `risk-v3.2`, evaluated on defined validation data, generated 2026-09-13 10:15 UTC, based on source set X, Y, Z.

The exact metadata requirements depend on the semantics and consequences of the score.

---

## 14.13 Governance for RAG

RAG makes governance operational because retrieval is itself a data-access decision.

The retrieval path should preserve:

- source authority
- access permissions
- document status
- version
- effective date
- retention/deletion state
- provenance
- citation identity

A document should not become retrievable merely because it was successfully indexed.

**Architecture rule:**

> **Authorization must be enforced in the data-access path, not delegated to the LLM's instructions.**

This connects Chapter 14 directly to Chapters 10, 12, and 13.

---

## 14.14 Governance for Agents

Agents introduce an additional governance problem: data use can trigger actions.

A governed agent should have explicit controls for:

- identity
- delegated authority
- allowed tools
- allowed data domains
- purpose
- transaction limits
- approval requirements
- logging
- failure handling

Example:

```text
RD asks for portfolio review
        ↓
AI-IDSS agent
        ↓
Identity + purpose check
        ↓
Retrieve permitted portfolio data
        ↓
Generate analysis
        ↓
Human review
        ↓
Optional authorized action
```

**Recommendation:** Separate “can read” from “can act.” An agent that can retrieve financial information does not automatically need authority to modify a financial system.

---

## 14.15 Retention Is a Design Decision

Keeping everything forever is not automatically good governance.

Retention decisions should consider:

- regulatory requirements
- legal obligations
- auditability
- reproducibility
- privacy
- security exposure
- storage cost
- operational value
- ability to reconstruct material decisions

**Recommendation:** Define retention by data class and decision consequence rather than applying an undifferentiated rule to all data.

---

## 14.16 Governance and Access Control

Governance establishes who should be allowed to use data; access-control architecture enforces that decision.

At minimum, distinguish:

- authentication: who or what is requesting access?
- authorization: is that requester permitted to perform the requested action?
- purpose/context: is the use permitted in this situation?
- audit: can the organization demonstrate what happened?

For cross-portfolio AI-IDSS, authorization should normally be evaluated at the data-access boundary before information is placed into model context.

---

## 14.17 Data Classification

Classification should support actual control decisions.

Example categories may include:

| Class | Example | Typical architectural consequence |
|---|---|---|
| Public | Published market research | Broad access, normal integrity controls |
| Internal | Internal operating reports | Authenticated access |
| Confidential | Portfolio financials | Strong authorization and audit |
| Highly restricted | Material sensitive information | Restricted identity, purpose, monitoring, controlled processing |

These labels are examples, not universal regulatory categories. The organization must map them to its legal, contractual, and internal requirements.

---

## 14.18 Governance Across Portfolio Companies

An investment organization may process data from multiple portfolio companies with different contractual, regulatory, and access requirements.

A common architecture error is to create one shared retrieval or analytical domain and assume that application-level filtering is sufficient.

A stronger design makes tenant or company boundaries explicit:

```text
Portfolio A ──┐
Portfolio B ──┼──> governed data plane ──> permitted analytical context
Portfolio C ──┘
                 ↑
          authorization policy
```

**Recommendation:** Treat portfolio isolation as a data-architecture and identity problem, not merely a prompt-engineering problem.

---

## 14.19 Governance Operating Model

A practical governance operating model can be organized into five loops:

1. **Define** — terms, owners, authority, permitted use.
2. **Control** — access, quality, classification, retention.
3. **Observe** — lineage, provenance, quality metrics, access events.
4. **Correct** — data issues, policy violations, ownership gaps.
5. **Improve** — revise rules as business and technology change.

This is preferable to treating governance as a one-time documentation project.

---

## 14.20 Governance Architecture

A useful enterprise pattern is:

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

Governance should span the data lifecycle rather than sit beside it as a reporting function.

---

## 14.21 Common Governance Anti-Patterns

### Anti-pattern 1 — “The catalog is the governance.”
A catalog can document metadata without enforcing ownership, access, quality, or permitted use.

### Anti-pattern 2 — “The source is correct because it is the source.”
Authority and correctness are different questions.

### Anti-pattern 3 — “Lineage means explainability.”
Lineage describes processing history; it does not fully explain analytical reasoning.

### Anti-pattern 4 — “More metadata is always better.”
Metadata has value when it improves interpretation, control, discovery, or auditability.

### Anti-pattern 5 — “One quality score is enough.”
Different quality failures have different consequences.

### Anti-pattern 6 — “The LLM will respect the policy.”
Policies requiring security enforcement belong in enforceable system controls.

### Anti-pattern 7 — “Keep everything forever.”
Retention increases cost and exposure and must be justified by purpose and requirements.

### Anti-pattern 8 — “Derived AI data is authoritative.”
Derived artifacts need explicit status, provenance, and validation.

---

## 14.22 Technical Challenge Questions

When reviewing a governance proposal, ask:

1. Who owns the meaning of this data?
2. Which system is authoritative for each material business fact?
3. What is the permitted purpose of use?
4. Who may access it, and how is that enforced?
5. What quality requirements are tied to the decision?
6. Which rules are machine-testable?
7. Can we reconstruct the lineage of a material recommendation?
8. Can we identify the origin and changes of the evidence?
9. What happens when quality checks fail?
10. What happens when the source changes its schema or meaning?
11. How are derived AI artifacts labeled and governed?
12. Can the same data be retrieved across portfolio boundaries?
13. What evidence demonstrates that authorization was enforced?
14. What is retained, for how long, and why?
15. Which governance assumptions would become unsafe if the AI-IDSS scaled tenfold?

---

## 14.23 Architecture Review Checklist

### Authority
- [ ] Authoritative source defined for material facts
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
- [ ] Failure handling is defined

### Lineage / Provenance
- [ ] Material transformations are traceable
- [ ] Source origin is recorded where required
- [ ] Model/analytical versions are identifiable

### Security
- [ ] Authentication defined
- [ ] Authorization enforced at the data boundary
- [ ] Portfolio/tenant isolation tested
- [ ] Sensitive data handling defined

### AI / RAG / Agents
- [ ] Retrieval respects authorization
- [ ] Citations point to governed sources
- [ ] Derived artifacts have status and provenance
- [ ] Agent permissions are narrower than necessary where possible
- [ ] Human approval exists for consequential actions where required

### Retention / Audit
- [ ] Retention rationale documented
- [ ] Material decision evidence reconstructable
- [ ] Access and important processing events auditable

---

## 14.24 Evidence Discipline

For this chapter, distinguish carefully:

| Statement type | Treatment |
|---|---|
| NIST/ISO definition | **Fact / Technical Evidence** |
| Published governance framework | **Technical Evidence** |
| “Lineage does not prove correctness” | **Inference from definitions and assurance limits** |
| “Use authority maps” | **Recommendation** |
| Example classification scheme | **Assumption / Example** |
| Specific retention period | **Requirement-dependent** |
| Specific tool or catalog product | **Implementation option, not architecture principle** |

NIST's DGM Profile is still under development; it should therefore not be represented as a finalized universal governance standard. [NIST — DGM Profile](https://www.nist.gov/privacy-framework/new-projects/data-governance-and-management-profile)

---

## 14.25 What Would Change Our Mind?

A sound governance architecture should remain falsifiable.

Examples:

- If a centralized governance model demonstrably increases decision latency without improving control, reconsider its centralization.
- If a quality rule produces frequent false failures without improving decision reliability, revise the rule.
- If full lineage costs materially more than the audit or operational value it provides, reduce scope while preserving material traceability.
- If a derived model consistently outperforms the source metric, do not automatically replace the source; first determine whether the model is measuring a different construct.
- If contractual or regulatory requirements impose stronger controls, the architecture must change accordingly.

The advisor's job is not to defend a governance design. It is to defend the decision quality and control objectives that the design is supposed to achieve.

---

## 14.26 Field Rule

> **Governance is successful when authority, meaning, quality, access, lineage, provenance, and accountability remain explicit as data moves through the organization and becomes evidence for decisions.**

For AI-IDSS, the practical chain is:

> **Source authority → governed data → controlled access → validated transformation → traceable evidence → analytical/model output → AI synthesis → human decision.**

The architecture should make it possible to answer, after the fact:

> **“What did the system know, where did it come from, what happened to it, who was allowed to use it, what analytical process produced the conclusion, and what evidence supported the decision?”**
