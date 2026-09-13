# Evidence Review — Chapter 14

## Purpose

This review tests Chapter 14 for unsupported factual claims, overgeneralization, semantic ambiguity, and architectural recommendations presented as facts.

## Primary Evidence Base

1. **NIST Data Governance and Management Profile** — NIST describes the DGM Profile as a resource under development intended to help organizations address data-governance priorities and connect governance with privacy and cybersecurity risk management. It is not presented here as a finalized universal standard.
   - https://www.nist.gov/privacy-framework/new-projects/data-governance-and-management-profile

2. **NIST Lineage glossary** — defines lineage as the history of processing of a data element, potentially including point-to-point flows and data actions.
   - https://csrc.nist.gov/glossary/term/lineage

3. **NIST Provenance glossary** — defines provenance in terms of origin, development, ownership, location, and changes associated with data/system components.
   - https://csrc.nist.gov/glossary/term/provenance

4. **ISO 8000-1:2022** — establishes the scope and principles of the ISO 8000 data-quality series.
   - https://www.iso.org/standard/81745.html

5. **ISO/TS 8000-82:2022** — addresses data rules and their use to sustain data integrity and reliability.
   - https://www.iso.org/standard/78707.html

6. **ISO 8000-150:2022** — addresses roles and responsibilities for data-quality management and documentation of implementation.
   - https://www.iso.org/standard/80753.html

## Claim Classification

| Chapter claim | Classification | Review |
|---|---|---|
| Data governance is broader than a catalog/tool | **Inference / architectural framing** | Appropriate; do not imply one universal definition. |
| NIST is developing a DGM Profile | **Fact / Technical Evidence** | Current NIST page supports this. |
| Lineage is processing history | **Fact / Technical Evidence** | Directly supported by NIST glossary. |
| Provenance concerns origin/change history | **Fact / Technical Evidence** | Directly supported by NIST glossary. |
| Provenance does not prove correctness | **Inference** | Appropriate; provenance establishes origin/history, not truth of the underlying fact. |
| Data quality is fitness for purpose | **Theory / architectural interpretation** | Avoid presenting as a single ISO definition. Chapter ties quality requirements to use. |
| Machine-testable data rules are useful | **Technical Evidence + Recommendation** | Supported by ISO/TS 8000-82; exact implementation remains a recommendation. |
| Authorization belongs at data boundary | **Architecture Recommendation** | Strongly consistent with security architecture; not claimed as a universal single standard requirement. |
| Lineage is not explainability | **Inference** | Correct distinction; lineage alone cannot account for model reasoning. |
| Derived AI artifacts should not silently replace source authority | **Recommendation** | Deliberately framed as architecture policy, not universal law. |
| Retain everything forever is not automatically good governance | **Recommendation / inference** | Avoid claiming a universal retention policy. Requirements are explicitly dependency-based. |
| Portfolio isolation should be explicit | **Recommendation** | Context-specific to multi-portfolio AI-IDSS. |

## Iteration 1 — Evidence Hardening

The chapter was written to avoid unsupported empirical claims such as “most organizations fail because...” or “real-time data is always required.” Such statements were either removed or converted to recommendations, examples, or explicit inference.

The NIST DGM Profile is explicitly marked as **under development**, avoiding the common error of presenting work-in-progress guidance as a final standard.

## Iteration 2 — Semantic Review

Potentially conflated concepts were separated:

- metadata vs lineage
- lineage vs provenance
- provenance vs correctness
- authority vs correctness
- lineage vs explainability
- source record vs derived artifact
- authentication vs authorization
- catalog vs governance

This separation is important because AI-IDSS credibility depends on knowing which assurance property has actually been demonstrated.

## Iteration 3 — AI-IDSS Architecture Review

The chapter was checked against the reference chain:

```text
Source authority
      ↓
Governed data
      ↓
Controlled access
      ↓
Validated transformation
      ↓
Traceable evidence
      ↓
Analytical/model output
      ↓
AI synthesis
      ↓
Human decision
```

The main architectural test is whether a reviewer can reconstruct the material evidence behind an AI-IDSS recommendation without treating the LLM itself as the authoritative data source.

## Deliberate Non-Claims

The chapter does **not** claim that:

- there is one universal data-governance operating model;
- every organization requires a chief data officer;
- all data must be cataloged;
- every transformation must have complete lineage;
- provenance establishes truth;
- lineage establishes explainability;
- one data-quality score is sufficient;
- one classification taxonomy is universally correct;
- centralized governance is always superior;
- a particular data catalog, lakehouse, MDM platform, or governance product is required;
- all AI-derived data should be retained indefinitely;
- RAG is safe merely because documents are indexed;
- an LLM can enforce authorization reliably enough to replace system controls.

## Advisor Review Checklist

Before accepting a governance architecture, verify:

- authoritative source is defined per material business fact;
- ownership and stewardship responsibilities are explicit;
- business semantics are defined where ambiguity could affect decisions;
- material quality requirements are measurable;
- failed quality checks have defined outcomes;
- material data flows are traceable;
- source origin and changes can be reconstructed where required;
- authorization is enforced outside model instructions;
- derived artifacts carry sufficient identity and version metadata;
- portfolio boundaries are technically enforced where required;
- retention is justified by purpose and requirements;
- the governance model is proportional to decision consequence.

## Confidence

**High confidence:** terminology and status claims directly supported by NIST and ISO sources listed above.

**Moderate confidence:** architectural recommendations such as authority maps, explicit derived-artifact governance, and consequence-based retention. These are defensible design recommendations, not universal empirical laws.

**Uncertainty:** organizational governance structures and regulatory retention requirements vary by jurisdiction, contract, sector, and use case. Specific implementation decisions therefore require context-specific legal, security, and business review.

## Bottom Line

The advisor should not ask only whether the organization has “data governance.” The stronger question is whether governance is technically enforceable and auditable at the points where data becomes evidence for consequential decisions.
