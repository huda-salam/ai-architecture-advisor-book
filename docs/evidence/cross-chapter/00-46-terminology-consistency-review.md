# 00–46 Cross-Chapter Terminology & Concept Consistency Review

**Review type:** Editorial and technical consistency review  
**Scope:** Chapters 0–46 and advisor reference material  
**Review objective:** Ensure that recurring technical concepts retain a stable meaning across the book and do not silently collapse distinct architectural properties into one another.

## 1. Review Verdict

**STRONG — CORE CONCEPTS ARE CONSISTENT; CONTROLLED NORMALIZATION IS REQUIRED.**

The book has a coherent conceptual vocabulary. The principal risk is not contradiction but **semantic drift**: a term can acquire a broader or stronger meaning when reused in a different technical context.

The editorial rule is therefore:

> **Use the same term for the same architectural property; use different terms when the properties, evidence, or decision consequences differ.**

This review is a consistency layer, not a request to rewrite technically sound chapters merely to standardize wording.

---

## 2. Canonical Distinctions

### 2.1 Capability ≠ Performance ≠ Quality ≠ Business Value

- **Capability:** what a system, model, service, or architecture can technically do.
- **Performance:** how efficiently or quickly it performs under defined workload conditions.
- **Quality:** how well the output satisfies a defined task or acceptance criterion.
- **Business value:** measurable organizational benefit relative to the credible alternative and associated cost/risk.

A capability claim does not establish performance. Performance does not establish quality. Quality does not establish business value.

**Advisor test:**
> What evidence connects the claimed capability to the required business outcome?

### 2.2 Evidence ≠ Truth

Evidence is information supporting or challenging a claim. It has provenance, scope, quality, and uncertainty.

A citation establishes provenance; it does not establish applicability, correctness, sufficiency, or transferability.

**Advisor test:**
> What exactly does this evidence demonstrate, under what conditions, and what does it not demonstrate?

### 2.3 Authority ≠ Intelligence

- **Authority:** which actor, system, policy, or source is permitted to establish or approve a fact, action, or decision.
- **Intelligence:** the system's ability to analyze, infer, generate, classify, retrieve, or otherwise transform information.

An intelligent component must not acquire business authority merely because it produces a plausible result.

This distinction is especially important across Chapters 26–29.

### 2.4 Availability ≠ Reliability ≠ Resilience

- **Availability:** whether a service is accessible when required.
- **Reliability:** ability to perform consistently according to defined requirements over time.
- **Resilience:** ability to withstand, recover from, or adapt to disruption while preserving required service properties.

A high availability target does not by itself demonstrate resilience. Redundancy is a mechanism, not the definition of resilience.

### 2.5 Human Approval ≠ Authorization

A person clicking “approve” is a human decision or control step. **Authorization** is an enforceable determination of whether an actor or process is permitted to perform an action.

Human approval can be part of a policy gate, but it should not be treated as a substitute for identity, authorization, policy enforcement, or audit controls.

### 2.6 API Compatibility ≠ Portability

- **API compatibility:** ability to interact through a compatible interface or contract.
- **Portability:** ability to move or operate the workload with acceptable adaptation effort, operational change, performance impact, security impact, and lifecycle cost.

API compatibility can reduce migration effort without making an architecture genuinely portable.

### 2.7 Production Readiness ≠ Benchmark Success

A benchmark provides evidence about the tested workload and conditions. **Production readiness** is a broader determination covering architecture, reliability, security, operations, observability, governance, recovery, economics, and validated workload behavior.

A strong benchmark can be necessary evidence without being sufficient evidence.

### 2.8 Technical Position ≠ Recommendation

- **Technical position:** the advisor's reasoned technical conclusion based on requirements, constraints, evidence, trade-offs, and uncertainty.
- **Recommendation:** the decision-oriented advice derived from that technical position and the decision context.

The recommendation must not silently introduce business assumptions that were absent from the technical analysis.

### 2.9 Vendor Dependency ≠ Vendor Lock-in

- **Vendor dependency:** reliance on a provider, service, interface, operational process, or ecosystem.
- **Vendor lock-in:** a stronger condition in which changing provider or architecture is materially constrained by switching cost, technical coupling, data constraints, contractual conditions, skills, or operational dependencies.

Dependency is not automatically undesirable. The advisor evaluates whether it is **strategically material, understood, economically justified, and reversible enough for the decision context**.

### 2.10 Reversibility ≠ Theoretical Portability

- **Portability** concerns the ability to move or operate across environments.
- **Reversibility** concerns the practical ability to change or undo a consequential architectural decision within acceptable time, cost, risk, and service impact.

A technically portable workload can still be operationally difficult to reverse.

---

## 3. Additional Terms Requiring Stable Use

### Model vs Model Service vs Model Runtime

Use:
- **Model** for the trained model artifact or logical model.
- **Model service / inference service** for the service exposing inference capability.
- **Runtime** for the software and execution environment that executes the model.

Do not use “model” as shorthand for the entire serving architecture when the distinction affects capacity, security, cost, or dependency analysis.

### Retrieval vs Knowledge

Retrieval is a mechanism for selecting information. A knowledge layer may include authoritative sources, documents, metadata, indexes, policies, and lifecycle controls.

**Retrieval relevance is not authorization and is not authority.**

### Reasoning vs Inference

Use **inference** for the model execution process that produces an output from inputs. Use **reasoning** carefully for task-level behavior or reasoning-like problem solving.

Do not imply that “reasoning” is a single, universally measurable architectural property.

### Security vs Control

Security is a broad property supported by controls. A control is a mechanism, process, or safeguard intended to enforce or reduce a particular risk.

Avoid saying that a technology is “secure” without identifying the relevant threat model, controls, assumptions, and operating conditions.

### Risk vs Failure Mode

- **Failure mode:** a specific way a component, control, process, or assumption can fail.
- **Risk:** the possibility and consequence of an undesirable outcome under uncertainty.

Failure modes can contribute to risk analysis but are not interchangeable with risk.

### SLO vs SLA

- **SLO:** an internal or operational objective defining a target service level.
- **SLA:** a contractual or formally committed service-level agreement.

Do not use the terms interchangeably when contractual implications matter.

### Scalability vs Capacity

- **Capacity:** the workload a system can sustain under defined conditions.
- **Scalability:** how system capacity or performance changes as workload or resources change.

A system can have high capacity at one scale without demonstrating desirable scalability behavior.

### Latency vs Throughput

- **Latency:** elapsed time associated with processing a request or operation.
- **Throughput:** amount of work completed per unit of time.

Both must be tied to workload, concurrency, and measurement conditions.

### Cost vs TCO vs Unit Economics

- **Cost:** a particular expense or cost component.
- **TCO:** broader lifecycle cost across relevant direct and indirect components.
- **Unit economics:** cost associated with a meaningful unit of business or technical output, such as a useful result.

A lower infrastructure bill does not necessarily mean lower TCO or better unit economics.

---

## 4. Cross-Chapter Concept Chains

The following chains should remain stable throughout the book.

### AI Decision Chain

```text
Business Problem
      ↓
AI Suitability
      ↓
AI Opportunity
      ↓
AI Role
      ↓
Requirements & Constraints
      ↓
Solution / Architecture Options
      ↓
Evidence & Validation
      ↓
Risk / Economics / Governance
      ↓
Technical Position
      ↓
Recommendation
```

### Advisor Capability Chain

```text
Understand
   ↓
Challenge
   ↓
Ask for Evidence
   ↓
Identify Failure / Trade-off
   ↓
Compare Alternatives
   ↓
Form Technical Position
   ↓
Recommend
```

### AI-IDSS Chain

```text
Authority
  ↓
Data
  ↓
Evidence
  ↓
Analysis
  ↓
AI Synthesis
  ↓
Recommendation
  ↓
Human Decision
```

### Assurance Chain

```text
Risk
 ↓
Due Diligence
 ↓
Architecture Review
 ↓
Production Readiness
 ↓
Auditability
```

### Technology Decision Chain

```text
Select
  ↓
Evaluate
  ↓
Adapt
  ↓
Operate
  ↓
Optimize
  ↓
Assess Dependency
  ↓
Maintain Exit / Reversal Options
```

---

## 5. Normalization Guidance by Chapter Group

| Chapter group | Primary terminology concern | Editorial action |
|---|---|---|
| 0–7 | evidence, judgment, recommendation | Preserve canonical advisor vocabulary |
| 8–11 | capability, inference, architecture, agent | Distinguish mechanism from outcome |
| 12–14 | authority, data, governance, lineage | Preserve source authority distinction |
| 15–18 | capacity, performance, reliability, cost | Tie claims to workload and SLO |
| 19–22 | security, identity, authorization, threat | Avoid security-as-label language |
| 23–25 | API, integration, connector, portability | Preserve contract/boundary distinction |
| 26–29 | authority, evidence, AI synthesis, human decision | Preserve AI-IDSS chain |
| 30–36 | selection, evaluation, TCO, dependency | Keep decision vs evidence distinction |
| 37–41 | risk, readiness, auditability | Preserve assurance chain |
| 42–44 | evidence, case, transferability | Separate observed case from general conclusion |
| 45–46 | pattern, anti-pattern, evaluation | Treat patterns as conditional architectural choices |

---

## 6. Editorial Rules for Future Chapters

1. Do not use a stronger term merely because it sounds more executive.
2. Define a term when ambiguity could change an architectural decision.
3. When a chapter introduces a specialized meaning, explicitly relate it to the book's canonical meaning.
4. Do not use “best” where “appropriate under stated criteria” is technically more accurate.
5. Do not use “secure,” “scalable,” “portable,” “reliable,” or “production-ready” as unqualified labels.
6. Tie performance claims to workload, measurement conditions, and percentile where relevant.
7. Tie evidence claims to scope, provenance, and limitations.
8. Keep authority outside the model unless the architecture explicitly and legitimately delegates authority through enforceable controls.
9. Keep human involvement distinct from technical enforcement.
10. Keep recommendation distinct from evidence and technical position.

---

## 7. Acceptance Criteria

The terminology pass is considered complete when:

- recurring architectural concepts have one canonical meaning;
- technically distinct concepts are not collapsed into synonyms;
- performance claims identify workload and measurement context;
- evidence claims identify what the evidence actually establishes;
- human approval is not described as authorization by itself;
- API compatibility is not described as full portability;
- benchmark results are not described as production readiness by themselves;
- vendor dependency is not automatically described as lock-in;
- technical position and recommendation remain distinct;
- AI-IDSS authority remains distinct from AI intelligence;
- future chapter edits follow this vocabulary.

## Field Rule

> **Precision in terminology is not editorial cosmetics. In architecture advisory work, ambiguous language can hide an assumption, weaken evidence, or change the apparent strength of a technical conclusion.**
