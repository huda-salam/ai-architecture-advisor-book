# 28A. Explainability & Evidence — Advisor Review

::: tip FOUNDATION
Explainability is not the same as producing a persuasive narrative. For consequential AI systems, the advisor should distinguish **source evidence, analytical output, model interpretation, recommendation, and human decision**.
:::

## Purpose

The purpose of this companion section is to provide a review method for evidence and explainability claims made by AI systems.

The central question is:

> **Can the organization establish why an important conclusion was produced, what evidence supports it, what remains uncertain, and who is accountable for acting on it?**

## 28A.1 Explainability Has Multiple Meanings

A proposal may use “explainability” to mean very different things:

- feature importance;
- model rationale;
- retrieved source documents;
- generated natural-language explanation;
- decision trace;
- policy explanation;
- reproducibility of inputs and versions.

These should not be conflated.

An LLM-generated explanation can describe an answer without proving that the described reasoning accurately represents the computation that produced it.

::: tip ADVISOR LENS
Ask **“Explainable to whom, for what purpose, and based on which evidence?”** An explanation for an analyst debugging a model is different from evidence required by an executive reviewing a consequential recommendation.
:::

## 28A.2 Evidence Chain

A useful conceptual chain is:

```text
Authoritative Source
       ↓
Validated Data
       ↓
Analytical Processing
       ↓
Model Output
       ↓
Retrieved Supporting Evidence
       ↓
AI Synthesis
       ↓
Recommendation
       ↓
Human Decision
```

The advisor should determine which links are directly observable and which are inferred.

## 28A.3 Provenance

For material outputs, provenance may need to establish:

- source system;
- source version or observation time;
- transformation or processing version;
- model/version identifier;
- retrieval context;
- policy version;
- relevant prompt or configuration where appropriate;
- output timestamp;
- reviewer or decision disposition.

Not every raw payload must be retained indefinitely. Retention should be proportionate to legal, privacy, security, operational, and decision-reconstruction requirements.

## 28A.4 RAG Evidence Is Not Automatically Ground Truth

A retrieved document can be authoritative in one context and irrelevant or outdated in another.

The advisor should challenge:

- source authority;
- freshness;
- document version;
- retrieval precision;
- access filtering;
- ranking;
- conflicting sources;
- incomplete evidence;
- citation correctness.

A citation attached to an answer is useful only if the cited material actually supports the claim being made.

## 28A.5 Generated Explanation vs Computational Explanation

Consider:

> “The company was flagged because liquidity deteriorated and refinancing risk increased.”

This may be a useful explanation, but the advisor should ask:

1. Which metrics established liquidity deterioration?
2. Which model or rule identified refinancing risk?
3. Were those inputs current?
4. Did the LLM infer the explanation from evidence, or invent a plausible rationale?
5. Can the organization reproduce the underlying calculation?

The objective is not to expose hidden chain-of-thought. The objective is to preserve sufficient **observable evidence and computational provenance** to support verification.

## 28A.6 Conflicting Evidence

A mature system should be able to represent disagreement.

```text
Source A ──┐
           ├──> Conflict Detection ──> Human Review
Source B ──┘
```

The advisor should reject architectures that silently select one conflicting source merely because it appeared first in retrieval.

Possible policies include:

- source authority ranking;
- freshness rules;
- reconciliation;
- explicit conflict state;
- human escalation.

## 28A.7 Evidence Completeness

A recommendation should be suppressible or qualified when required evidence is missing.

Possible states:

| State | Meaning |
|---|---|
| Supported | Required evidence is available and acceptable. |
| Partially supported | Some required evidence is missing. |
| Conflicting | Material sources disagree. |
| Stale | Evidence exists but is outside the required freshness window. |
| Unsupported | The conclusion lacks adequate evidence. |
| Unable to determine | The system cannot responsibly reach the conclusion. |

::: tip ARCHITECTURE WARNING
Do not design the interface so that every system state becomes a confident-looking answer. **Uncertainty and inability to determine are valid system outputs.**
:::

## 28A.8 Advisor Challenge Questions

- What exactly is the claim?
- Which evidence directly supports it?
- Which evidence is merely contextual?
- Can the source be independently verified?
- How fresh is it?
- What happens when sources conflict?
- Can retrieval expose unauthorized information?
- Can a reviewer reproduce the important analytical result?
- Which parts are deterministic and which are generated?
- Is the explanation evidence-based or merely plausible?
- What must be retained to reconstruct the decision later?

## 28A.9 Technical Position

A defensible position might be:

> **Technical position:** The evidence architecture is acceptable for decision support if provenance, source authority, retrieval authorization, evidence completeness, model/version traceability, and conflict handling are demonstrably implemented. Natural-language explanation should not be treated as independent proof of the underlying computation.

## Field Rule

> **Explainability is valuable when it improves verification, challenge, accountability, or decision quality—not merely when the output sounds understandable.**
