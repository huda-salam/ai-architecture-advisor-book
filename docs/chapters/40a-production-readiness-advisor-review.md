# Chapter 40A — Production Readiness Advisor Review

> **ADVISOR LENS**
>
> Production readiness is an evidence-based authorization decision: can this system operate within its intended risk boundary with sufficient control, observability, resilience, ownership, and recovery capability?

## 1. Replace “Ready” With Explicit Gates

Avoid a single subjective readiness label.

Review evidence across:

```text
Functional quality
      ↓
Security
      ↓
Data
      ↓
Integration
      ↓
Performance
      ↓
Reliability
      ↓
Operations
      ↓
Cost
      ↓
Monitoring / Incident Response
      ↓
Production Decision
```

A material gap in one domain can block production even when other domains are strong.

## 2. Verify the Real Workload

Production evidence should reflect the intended workload, not only a demonstration path.

Ask for:

- representative traffic;
- realistic data characteristics;
- expected concurrency;
- peak and degraded conditions;
- dependency latency;
- model response variability;
- failure scenarios;
- expected cost under realistic utilization.

Benchmarks from unrelated workloads should be treated as supporting context, not direct production evidence.

## 3. Test Failure, Not Only Success

A production-ready system should have evidence for relevant failure modes.

```text
Provider unavailable
        ↓
Fallback / degraded mode
        ↓
User-visible behavior
        ↓
Recovery
```

Also test:

- stale or unavailable data;
- retrieval failure;
- model timeout;
- rate-limit conditions;
- authorization failure;
- downstream system failure;
- malformed output;
- unexpected cost growth;
- operator error.

The exact test set should be proportional to system risk.

## 4. Verify Operational Ownership

Ask who owns:

- deployment;
- model/configuration changes;
- incident response;
- security response;
- data quality;
- evaluation;
- cost monitoring;
- vendor escalation;
- rollback;
- recovery;
- retirement.

A system without operational ownership is not production-ready merely because its software is deployable.

## 5. Verify Change Control

AI systems can change behavior without a traditional application release.

Review controls for:

- model version changes;
- prompt/configuration changes;
- retrieval/index changes;
- data-source changes;
- policy changes;
- tool/connector changes;
- provider changes.

Material changes should trigger appropriate evaluation and approval rather than silently entering production.

## 6. Verify Observability and Response

Ask whether operators can detect:

- availability failures;
- latency degradation;
- quality degradation;
- data freshness problems;
- authorization anomalies;
- abnormal usage;
- cost anomalies;
- provider/model changes.

Then ask the harder question:

> **What action is taken when the signal crosses the operational threshold?**

Monitoring without response ownership is incomplete control.

## 7. Verify Recovery

For each critical failure:

```text
Detect
  ↓
Contain
  ↓
Degrade / Fail over
  ↓
Recover
  ↓
Validate
  ↓
Resume
```

Where relevant, require evidence from actual recovery exercises rather than documentation alone.

## 8. Production Decision

The advisor should classify the conclusion clearly:

- **Ready** — evidence satisfies the defined gate.
- **Ready with conditions** — bounded gaps have explicit owners, deadlines, and risk acceptance.
- **Not ready** — material evidence or controls are missing.

These labels are handbook decision categories, not universal certification levels.

## 9. Advisor Challenge Questions

- What exactly is being authorized for production?
- Which requirements have representative evidence?
- Which failure scenarios have actually been tested?
- Can the system operate in degraded mode?
- Who owns incidents and recovery?
- What changes require re-evaluation?
- What evidence supports the capacity and cost assumptions?
- Can the system be rolled back or safely disabled?
- Which residual risks are explicitly accepted?

## 10. Technical Position

> **Production-readiness position:** The system has [sufficient / conditionally sufficient / insufficient] evidence for the intended production scope. The principal readiness gap is [X]. Production should [proceed / proceed only under conditions / remain gated] until [specific control, evidence, or decision] is completed.

## 11. What Would Change the Advisor's Mind?

- representative workload testing fails a required threshold;
- recovery testing demonstrates unacceptable recovery behavior;
- an operational owner cannot be identified;
- model/provider changes cannot be detected or controlled;
- a critical security or authorization control is not enforceable;
- actual cost materially exceeds the approved operating envelope.

> **Field rule:** Production readiness is not confidence that the system will work. It is evidence that the system can be operated, observed, controlled, and recovered within an explicitly authorized boundary.