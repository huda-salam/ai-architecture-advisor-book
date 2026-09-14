# Evidence Review — Chapter 28: Explainability & Evidence

## Review status

**Three-pass review completed.**

1. Substance / architecture completeness
2. Evidence hardening / claim classification
3. Adversarial review: explanation fidelity, evidence boundaries, security, and cross-chapter consistency

## Primary sources checked

| Source | Use | Status |
|---|---|---|
| NIST AI RMF 1.0 | Trustworthiness, explainability, interpretability | Primary framework; version-aware |
| NIST AI RMF Core | Measure 2.9; model explanation, validation, documentation, contextual interpretation | Primary framework |
| NIST AI RMF Playbook | Explanation fidelity, consistency, robustness, interpretability; documentation and testing | Primary guidance |
| NIST AI RMF Generative AI Profile, AI 600-1 | Confabulated logic/citations and risks of misleading explanations | Primary guidance |

## Claim audit

### Strongly supported framework claims

- NIST distinguishes transparency, explainability, and interpretability.
- NIST recommends that AI models be explained, validated, and documented and that outputs be interpreted in context.
- NIST recommends testing explanations for properties such as fidelity, consistency, robustness, and interpretability.
- NIST's Generative AI Profile warns that generative systems can produce confabulated logic or citations that appear to justify an answer.

### Architecture recommendations

The following are recommendations of this book rather than direct NIST requirements:

- evidence should be linked to material claims;
- explanations should be downstream of analytical results and evidence where practical;
- contradictory evidence should be surfaced for consequential decisions;
- source authority should be represented separately from retrieval ranking;
- explanation access must obey the same identity and data-protection boundaries as underlying evidence;
- a human reviewer should be able to inspect evidence rather than merely approve a generated recommendation.

### Claims deliberately rejected

- “Every AI system must use an inherently interpretable model.”
- “Post-hoc explanations are always faithful.”
- “A citation proves a claim.”
- “Provenance proves source accuracy.”
- “Feature importance is sufficient explanation.”
- “An LLM explanation is evidence.”
- “Human approval alone guarantees meaningful oversight.”

## Important conceptual distinctions

- transparency ≠ explainability ≠ interpretability;
- explanation ≠ evidence;
- provenance ≠ correctness;
- lineage ≠ explanation;
- citation presence ≠ citation validity;
- plausible narrative ≠ faithful explanation;
- model performance ≠ explanation quality.

## Cross-chapter consistency checks

- Chapter 12: lineage/provenance remain distinct from accuracy and explainability.
- Chapter 14: governance and lineage remain distinct from model interpretation.
- Chapter 19: LLM is not a security boundary; explanation services cannot override authorization.
- Chapter 20: evidence and explanation access remain subject to identity and authorization.
- Chapter 21: explanations may expose sensitive or derived data and therefore require data-protection controls.
- Chapter 22: prompt injection and poisoned documents can manipulate explanations as well as answers.
- Chapter 25: connectors must preserve authority and semantic integrity when supplying evidence.
- Chapter 26: AI-IDSS remains a socio-technical decision-support system with a human decision boundary.
- Chapter 27: probability semantics, model calibration, evidence lineage, and alert policy remain separate layers.

## Final reviewer conclusion

The chapter is acceptable for the current review scope. It intentionally treats explainability as an architectural and evidence problem rather than a prompt-writing feature. Future review is required when NIST AI RMF revisions, relevant standards, model-evaluation research, or the organization's decision context materially change.
