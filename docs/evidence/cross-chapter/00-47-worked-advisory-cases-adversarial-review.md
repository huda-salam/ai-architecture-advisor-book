# Adversarial Review — Worked Advisory Cases

**Scope:** Seven worked advisory cases in docs/tools/

**Review purpose:** Stress-test whether the cases teach defensible technical judgment rather than merely presenting reasonable conclusions.

## Overall Finding

**Verdict: STRONG — TARGETED HARDENING REQUIRED**

The seven cases consistently teach the core advisory chain:

Decision → What must be true? → Evidence → Failure Modes / Trade-offs → Technical Position → Validation

The cases are useful and directionally sound. The main weakness is not incorrectness but uneven depth: some cases state the right technical position without exposing enough of the assumptions, evidence burden, or validation design needed to defend that position under challenge.

## Cross-Case Findings

### 1. RAG — strong, but avoid equating grounding with truth

The case correctly rejects the idea that RAG is a hallucination switch.

The adversarial question should be:

> Does retrieval correctness establish answer correctness?

No. Retrieval can return authoritative material while generation still misinterprets it, omit important context, combine conflicting sources incorrectly, or answer beyond the evidence.

**Hardening required:** preserve the distinction between retrieval quality, answer correctness, and evidentiary sufficiency.

### 2. Agent vs Workflow — strong, but quantify the autonomy boundary

The case correctly asks which uncertainty requires autonomous reasoning.

The missing adversarial pressure is whether the same uncertainty can be handled with bounded decision logic, human escalation, or a narrower AI component.

**Hardening required:** require representative traces, baseline performance, authorization tests, recovery tests, and measurable value before expanding autonomy.

### 3. Benchmark 95% — strong

The case correctly attacks the validity of the measurement instrument rather than the headline number.

A further challenge is benchmark representativeness, evaluation contamination, aggregate masking, and the difference between statistical confidence and practical decision confidence.

**Hardening required:** make workload mapping and failure-slice analysis explicit.

### 4. Cloud vs Self-Hosted — strong

The case correctly refuses to treat deployment category as a security conclusion.

The main hidden assumption is that the organization can operate the selected control set. Self-hosting can transfer responsibilities rather than remove risk; cloud can concentrate dependencies rather than automatically weaken security.

**Hardening required:** add supply-chain, operational capability, and control-by-control validation.

### 5. Fine-Tuning — strong, but strengthen intervention diagnosis

The case correctly begins with the observed failure.

The adversarial question is:

> What evidence shows that model adaptation, rather than retrieval, workflow, prompting, model selection, or data quality, is the causal intervention?

**Hardening required:** require held-out representative evaluation, regression testing, safety testing, lifecycle cost, and rollback.

### 6. Production Readiness — very strong

The case correctly separates model evidence from system readiness.

One terminology refinement is important: business-value evidence is a production go/no-go input, but business value itself is not a technical readiness property.

**Hardening required:** preserve explicit release gates, evidence owners, degraded-mode testing, recovery, auditability, and rollback.

### 7. Vendor Exit — strong and especially valuable

The case correctly distinguishes API compatibility from practical reversibility.

The adversarial extension is that portability also depends on contractual, data-residency, operational, behavioral, and organizational dependencies.

**Hardening required:** make the exit exercise an observed architecture test rather than a documentation claim.

## Capability Coverage

| Capability | Coverage |
|---|---|
| Challenge a technology claim | Strong |
| Ask what must be true | Strong |
| Identify hidden assumptions | Moderate |
| Demand evidence | Strong |
| Identify failure modes | Strong |
| Compare alternatives | Moderate |
| Validate empirically | Moderate |
| Form technical position | Strong |
| Separate position from recommendation | Strong |
| Expose reversibility / exit risk | Strong |
| Challenge vendor claims | Strong |
| Define decision gates | Moderate |

## Principal Editorial Recommendation

Do not add more worked cases yet.

Instead, standardize the seven cases around a compact minimum structure:

1. Situation / Claim
2. What Must Be True
3. Hidden Assumptions
4. Evidence to Request
5. Failure Modes
6. Trade-offs / Alternatives
7. Technical Position
8. Validation
9. Advisor Lesson

This structure should remain a teaching device, not a mandatory formula for every chapter.

## Quality Gate

A worked case is sufficiently hardened when a skeptical implementer can ask:

- What evidence supports this?
- What assumption is carrying the conclusion?
- What alternative explanation has been considered?
- What failure would invalidate the position?
- How would we test that before commitment?
- What remains unknown?

If the case cannot answer these questions, it teaches a conclusion rather than advisory judgment.

**Review conclusion:** The seven cases are suitable as a core worked-case set after targeted hardening. The next editorial step should be consistency hardening, not expansion of the case count.
