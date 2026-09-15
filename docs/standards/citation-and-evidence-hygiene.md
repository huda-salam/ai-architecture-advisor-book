# Citation & Evidence Hygiene Standard

## Purpose

The book separates **evidence management** from the narrative chapter text. Primary chapters must remain readable, stable, and independent of transient research-tool identifiers.

## Citation rules

1. **Never publish internal research-tool citation identifiers** such as `turn0search...` in the book.
2. Primary chapters may cite stable external sources directly when the source materially supports a factual claim.
3. Chapter evidence reviews are the canonical record for:
   - source identity;
   - source URL or DOI;
   - claim classification;
   - evidence strength/confidence;
   - version/date awareness;
   - important evidence boundaries and non-claims.
4. A primary chapter must not imply that an architecture recommendation is an external standard merely because an external framework is cited nearby.
5. Distinguish explicitly between:
   - **Fact** — directly supported by an authoritative or appropriate source;
   - **Framework guidance** — recommendation or expectation from a recognized framework;
   - **Technical evidence** — empirical or peer-reviewed evidence;
   - **Inference** — conclusion derived from evidence and stated assumptions;
   - **Architecture recommendation** — the book's technical judgment;
   - **Assumption** — condition accepted for the current architecture or case;
   - **Unknown** — unresolved issue requiring further evidence.
6. Current frameworks must be cited by version where relevant. Do not describe a versioned framework as immutable when the issuing body is revising it.
7. A citation establishes source provenance; it does **not** by itself establish that the source is correct, applicable, complete, or sufficient for the architecture decision.

## Preferred primary-chapter pattern

Use concise source attribution in prose:

> NIST AI RMF 1.0 describes four risk-management functions: Govern, Map, Measure, and Manage.

When navigation to the source is useful, use a stable official URL or DOI. Do not expose transient research identifiers.

## Evidence-review pattern

Evidence reviews should carry the fuller record:

```text
Claim
→ Classification
→ Source
→ Version / date
→ Evidence boundary
→ Confidence
→ Cross-chapter implication
```

## Chapter 26–29 migration record

The current evidence reviews for Chapters 26–29 already contain stable source identities and URLs. They should remain the canonical source records while transient citation markers are removed from the primary chapters.

### Chapter 26

Primary framework sources include NIST AI RMF 1.0, the current NIST AI RMF resource page, the AI RMF Core, the NIST Generative AI Profile, and current NIST monitoring research. The chapter's AI-IDSS decomposition and decision-boundary recommendations are the book's architecture judgments rather than NIST requirements.

Canonical evidence review: `../evidence/chapters/26-evidence-review.md`

### Chapter 27

Primary sources include NIST AI RMF 1.0/Core and peer-reviewed calibration and prediction-evaluation research. The 68% probability and 60% threshold are illustrative examples, not empirical claims or universal recommendations.

Canonical evidence review: `../evidence/chapters/27-evidence-review.md`

### Chapter 28

Primary framework sources include NIST AI RMF 1.0, AI RMF Core, AI RMF Playbook, and NIST AI 600-1. The chapter's distinction between explanation, evidence, provenance, and correctness is an architectural/evidence judgment and should not be presented as a direct NIST requirement.

Canonical evidence review: `../evidence/chapters/28-evidence-review.md`

### Chapter 29

Primary sources include NIST AI RMF 1.0/Core/Playbook and NIST AI 600-1, supplemented by peer-reviewed research on responsibility allocation, automation bias, and human-in-the-loop systems. The explicit human decision boundary for consequential investment decisions is a context-specific architecture recommendation, not a universal HITL requirement.

Canonical evidence review: `../evidence/chapters/29-evidence-review.md`

## Migration acceptance criteria

The citation-hygiene migration is complete when:

- no primary chapter contains transient `turn0search`, `turn1search`, or equivalent internal research identifiers;
- every material externally sourced factual claim has a stable source identity in the relevant evidence review;
- current or versioned frameworks are identified by version/date;
- architecture recommendations remain clearly distinguished from external requirements;
- no citation is used as a substitute for applicability analysis or technical judgment;
- VitePress builds without citation-related rendering artifacts.
