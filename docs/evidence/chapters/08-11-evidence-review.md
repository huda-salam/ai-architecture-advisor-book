# Evidence Review — Chapters 8–11

## Review Status

**Iteration:** 1 — Foundation audit

**Scope:** Chapters 8–11, with cross-checks against Chapters 12, 19–22, 28–31, 34–36, and 44.

**Objective:** Identify factual, architectural, terminology, citation, and freshness issues before targeted chapter revisions.

**Standard:** No plausible technical statement is treated as established fact without an appropriate evidence basis. Recommendations and architectural conventions are explicitly distinguished from standards and empirical findings.

## Executive Finding

Chapters 8–11 have a strong architectural spine and are broadly consistent with the later chapters. The core principles remain defensible: AI is a system, not merely a model; authoritative enterprise data remains authoritative outside the AI layer; model reasoning should be separated from authority and deterministic control; RAG is an evidence-access architecture rather than a correctness guarantee; agent autonomy must be bounded by identity, authorization, policy, validation, and execution controls; and human authority remains explicit for consequential AI-IDSS decisions.

The foundation nevertheless requires targeted revision before final acceptance. The principal issues are:

1. legacy inline citation markers remain in Chapter 10;
2. terminology should be tightened to match Chapters 30–31;
3. architectural recommendations should be explicitly distinguished from standards;
4. Chapter 9 should use the ownership/dependency vocabulary now established in Chapters 36 and 44;
5. Chapter 10 should distinguish retrieval authorization from the broader authorization model more precisely;
6. Chapter 11 should distinguish architectural conventions from formal authorization standards;
7. Chapters 8–11 should explicitly use the hierarchy **model capability → task performance → system performance → business/decision value**;
8. current standards status must remain version-aware because NIST AI RMF 1.0 is being revised and OWASP's 2026 GenAI LLM Top 10 is current.

## Evidence Baseline

NIST currently states that AI RMF 1.0 is being revised. The published AI RMF 1.0 remains useful as a current framework, but future revisions must not be silently represented as already final. NIST's Generative AI Profile (AI 600-1) remains a published companion resource. [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) · [NIST Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)

NIST describes the AI RMF Core through **Govern, Map, Measure, and Manage**, with governance as cross-cutting across the lifecycle. This supports the handbook's lifecycle and cross-cutting-control framing, but does not prescribe the handbook's six-layer logical architecture. [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)

OWASP's current project page states that the **GenAI LLM Top 10 2026** was published on August 4, 2026 and is the current release. OWASP also maintains dedicated agentic-security guidance. [OWASP GenAI LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) · [OWASP Agentic AI Security](https://genai.owasp.org/2025/12/09/owasp-genai-security-project-releases-top-10-risks-and-mitigations-for-agentic-ai-security/)

NIST's 2026 AI Agent Standards Initiative identifies security, identity, and interoperability as active areas of standards development. This is evidence that the agentic architecture space is still evolving; it is not evidence that a single agent architecture is already standardized. [NIST AI Agent Standards Initiative](https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure)

## Chapter 8 — Findings

### Strengths

The chapter establishes a durable system-level mental model and correctly separates application, orchestration/workflow, models, knowledge/retrieval, data/integration, infrastructure, and cross-cutting security, identity, governance, evaluation, audit, observability, reliability, cost, and interoperability.

The strongest conceptual contribution is the evidence chain:

> authoritative evidence → analytical processing → model output → reasoning/synthesis → recommendation → human decision

This should remain the book's core AI-IDSS mental model.

### Required refinements

**1. Architecture model vs standard.** Make the distinction explicit near the first architecture diagram and in the Evidence Standard section. The six-layer architecture is an advisor logical model, not a formal NIST or industry canonical architecture.

**2. Add evaluation hierarchy.** Introduce:

> **Model capability → Task performance → System performance → Business / decision value**

This creates a direct bridge to Chapters 30–31.

**3. Tighten correctness language.** Correctness should always be relative to a defined task, evaluation method, and acceptance criterion. Avoid implying that correctness is a universal scalar property of an AI system.

**4. Preserve deterministic/probabilistic separation.** Keep this as a strong architectural recommendation rather than an absolute law. Probabilistic components can legitimately participate in decisions when their semantics, controls, and evaluation are explicitly defined.

**5. Make failure containment first-class.** A reliable decision-support system must have defined behavior when evidence is insufficient, dependencies fail, or output quality falls below the required threshold. The architecture should be able to suppress or escalate an answer rather than merely produce something.

## Chapter 9 — Findings

### Strengths

The chapter correctly reframes “LLM choice” as a model-serving architecture decision and distinguishes third-party API, enterprise-managed platform, self-hosted open-weight model, on-premise deployment, hybrid architecture, and multi-model architecture. The “data cannot leave → build our own LLM” challenge is consistent with Chapters 36 and 44.

### Required refinements

**1. Align ownership vocabulary with Chapter 44.** The chapter should explicitly ask which architectural layer the organization should own, consume, and control. Deployment location must not be treated as equivalent to ownership.

**2. Distinguish deployment control from model ownership.** Self-hosting an open-weight model gives greater control over serving and deployment, but does not imply ownership of the model's training process, provenance, or ecosystem.

**3. Strengthen dependency language.** Portability is not merely API compatibility. Model behavior, prompts, tool semantics, evaluation assets, operational procedures, and contractual terms can all create dependency. Chapter 36 remains the deeper treatment.

**4. Align economics with Chapters 34–35.** Use the progression:

> model/API price → task cost → system cost → cost per useful result → business value.

**5. Make the decision method explicit.** Hard constraints are gates; weighted scoring ranks surviving options. A weighted score must never compensate for failure of a hard constraint.

## Chapter 10 — Findings

### Strengths

Chapter 10 correctly treats RAG as an end-to-end evidence-access architecture rather than a vector-database pattern. Particularly strong are source authority, metadata, authorization, freshness, context construction, provenance, layered evaluation, and the distinction between RAG and fine-tuning.

### Critical citation issue — MUST FIX

The chapter still contains legacy inline conversation markers such as `citeturn0search0`, `citeturn0academia25`, and other `turn0...` references. These are conversation-level references and must not remain in permanent VitePress source.

**Required action:** replace every conversation-level citation with stable Markdown links to the authoritative source or the handbook's established evidence-anchor format.

### Evidence precision

The chapter should not present NIST TREC RAG work as a universal RAG standard. It is better described as an evaluation/research program illustrating the useful separation between retrieval, generation, and end-to-end evaluation.

The OWASP 2025 vector/embedding category should remain explicitly versioned. OWASP's 2026 release is now current; the 2025 category should not be represented as a current 2026 category.

### Authorization wording

“Authorization must be part of retrieval” is a useful architecture principle, but should be expressed more precisely:

> **Retrieval must enforce or be downstream of an authorization decision appropriate to the source and resource model.**

Architectures may enforce authorization before retrieval, combine policy filtering with retrieval, or use other controls. The durable requirement is that unauthorized information must not enter model context.

### Provenance wording

The distinction among source provenance, retrieval provenance, and reasoning provenance is useful. However, reasoning provenance must not be interpreted as requiring disclosure of hidden model chain-of-thought. Define it as the observable relationship among inputs, retrieved evidence, model/system outputs, validations, and resulting recommendation.

## Chapter 11 — Findings

### Strengths

The central principle is correct:

> **Reasoning ≠ Authority.**

The architecture separates identity, policy, orchestration, tools, validation, human approval, and audit. This aligns strongly with Chapters 19–22 and 29.

### Required refinements

**1. Keep agent definitions context-dependent.** There is no need to create a false universal definition of “agent.” The important question is which decisions and actions the system can select dynamically.

**2. Harden the authority model.** The equation

> User authority ∩ agent task authority ∩ resource policy = effective authority

is a useful conceptual model, but must remain explicitly labelled as an architecture convention rather than a formal authorization standard. The formal control question remains:

> Who is acting, on whose authority, against which resource, for which operation, and where is authority enforced?

**3. Treat tool outputs as untrusted input.** Retrieved content is correctly treated as data rather than authority. The same treatment should explicitly apply to external API responses and tool outputs unless independently validated and trusted by architecture.

**4. Treat agent memory as governed state.** Connect memory to data governance, retention, provenance, tenant isolation, deletion/correction, and audit requirements from Chapters 12–14 and 21.

**5. Separate observability from private model reasoning.** The audit objective is to reconstruct system actions, authority, evidence, tool calls, validations, and outcomes—not to require unrestricted capture of hidden reasoning traces.

**6. Add explicit evaluation gates.** Align Chapter 11 with Chapter 31: agent deployment should be gated on representative system evaluation covering tool selection, argument correctness, authorization compliance, security robustness, failure recovery, cost, latency, and escalation behavior.

**7. Make failure containment explicit.** The architecture should bound the maximum consequence of an agent failure through step/time/cost limits, constrained permissions, approval gates, transaction boundaries, validation, and escalation. The principle is:

> **The maximum consequence of an agent failure should be bounded by architecture, not merely by model reliability.**

## Cross-Chapter Consistency

### Chapters 8 ↔ 30–31

Use the common hierarchy:

> Model capability → task performance → system performance → business / decision value.

### Chapter 9 ↔ 34–36 and 44

Use the progression:

> deployment pattern → ownership/control boundary → dependency → TCO → reversibility → exit strategy.

Do not imply that self-hosting equals independence or that enterprise-managed equals secure by definition.

### Chapter 10 ↔ 12–14 and 28–31

Use the RAG chain:

> authoritative source → ingestion → representation → authorization → retrieval → context → generation → evidence → evaluation.

Data governance and lineage remain upstream architectural dependencies.

### Chapter 11 ↔ 19–22 and 29

Use the agent chain:

> identity → authority → planning → policy → tool execution → validation → escalation/human decision → audit.

Security controls must not be replaced by prompt instructions.

### Chapter 11 ↔ 36

Every important agent tool or external dependency should be assessed for owner, permission scope, data boundary, failure mode, replacement option, and evaluation impact.

## Severity Register

| Issue | Chapter | Severity | Action |
|---|---|---|---|
| Legacy conversation citation markers | 10 | **Must fix** | Replace with stable sources |
| Evidence/version terminology | 10–11 | **Must fix** | Version current OWASP/NIST claims |
| Ownership vs deployment vocabulary | 9 | **Should fix** | Align with Ch. 36/44 |
| Model/task/system/business evaluation hierarchy | 8 | **Should fix** | Add explicit terminology |
| RAG authorization wording | 10 | **Should fix** | Make architecture-neutral |
| Provenance vs hidden reasoning | 10 | **Should fix** | Clarify observable provenance |
| Agent authority equation | 11 | **Should fix** | Keep as conceptual convention |
| Agent evaluation gates | 11 | **Should fix** | Align with Ch. 31 |
| Agent memory governance | 11 | **Should fix** | Align with Ch. 12–14/21 |
| Failure containment framing | 8/11 | **Should fix** | Make explicit principle |
| Vendor-specific facts | 9 | **Revalidate when used** | Keep principle-level text durable |

## Revision Sequence

### Iteration 2 — Chapter 8

Harden evidence language; introduce the capability/performance/value hierarchy; clarify logical architecture vs standard; strengthen failure containment; cross-check evaluation concepts.

### Iteration 3 — Chapter 9

Align ownership/dependency vocabulary; refine deployment-vs-control distinction; strengthen TCO/economics terminology; harden reversibility language.

### Iteration 4 — Chapter 10

Remove all legacy conversation citation markers; replace them with stable authoritative sources; refine authorization wording; refine provenance language; version OWASP/NIST references.

### Iteration 5 — Chapter 11

Harden the agent authority model; strengthen untrusted tool-output treatment; align evaluation with Chapter 31; strengthen memory governance; make failure containment explicit; verify current OWASP/NIST agent references.

### Iteration 6 — Cross-chapter adversarial review

Re-read Chapters 8–11 against Chapters 12–14, 19–22, 28–31, 34–36, and 44 and search for contradictory terminology, unsupported universal claims, stale references, duplicated concepts with different meanings, moving security boundaries, inconsistent human-decision boundaries, and hidden assumptions.

Only after Iteration 6 should Chapters 8–11 be considered stable.

## Acceptance Criteria

- [ ] No conversation-level citation marker remains in permanent source files.
- [ ] Every current/version-sensitive security claim identifies its source version or current authoritative source.
- [ ] Advisor recommendations are distinguishable from formal standards.
- [ ] Model capability, task performance, system performance, and business/decision value use consistent terminology.
- [ ] Deployment location is not confused with ownership or security posture.
- [ ] RAG authorization is expressed without prescribing one physical implementation.
- [ ] Provenance does not imply hidden chain-of-thought disclosure.
- [ ] Agent identity and authorization are explicit architecture concerns.
- [ ] Agent memory is treated as governed state.
- [ ] Agent evaluation aligns with Chapter 31.
- [ ] Agent failure containment is explicit.
- [ ] Human decision authority remains clear for consequential AI-IDSS actions.
- [ ] Claims remain durable for a successor while time-sensitive vendor facts remain revalidation items.

## Field Rule

> **The foundation chapters should teach the successor how to reason about AI architecture, not which technology happens to be fashionable when the book is written.**
