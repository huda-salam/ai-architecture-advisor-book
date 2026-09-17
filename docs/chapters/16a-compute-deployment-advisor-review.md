# 16A. Compute & Deployment — Advisor Hardening Review

**Marker:** ADVISOR LENS

This review is a companion to Chapter 16. It turns compute, serving, capacity, performance, and deployment analysis into an explicit decision framework without duplicating the chapter's technical depth.

## 16A.1 Decision Bridge

```text
Workload
   ↓
SLO / Quality Requirement
   ↓
Serving Architecture
   ↓
Capacity Model
   ↓
Measured Performance
   ↓
Cost per Useful Result
   ↓
Failure / Rollback Behavior
   ↓
Technical Position
   ↓
Recommendation
```

The key discipline is to connect infrastructure decisions to the workload and service objective. A GPU, model server, autoscaler, or deployment platform is not a recommendation in itself.

## 16A.2 What the Advisor Must Establish

Before accepting a compute or deployment proposal, establish:

- the actual workload class and request distribution;
- target latency and throughput requirements, including p95/p99 where relevant;
- expected and peak concurrency;
- context/input-size distribution for inference workloads;
- the measured bottleneck rather than an assumed bottleneck;
- capacity at the required service objective;
- behavior under burst and partial failure;
- scaling and startup characteristics;
- rollback and model-version traceability;
- infrastructure cost under representative utilization;
- whether the selected accelerator or serving architecture has evidence-based justification.

## 16A.3 Benchmark Discipline

A benchmark is useful only when its workload and success criteria resemble the decision being made.

Ask:

1. What exact model and runtime were tested?
2. What input/context distribution was used?
3. What concurrency was applied?
4. Were cold starts, batching, cache behavior, and retrieval included where relevant?
5. What are p50, p95, and p99 latency values?
6. What throughput was achieved at the target service objective?
7. What failure behavior was observed?
8. What was excluded from the benchmark?
9. Which results are measured and which are extrapolated?

A benchmark that omits a material production component should not be presented as end-to-end production evidence.

## 16A.4 Capacity Is More Than Peak RPS

Capacity planning should connect:

```text
Expected Workload
+ Peak Workload
+ Concurrency
+ Service-Level Objective
+ Growth Assumption
+ Failure Margin
→ Required Capacity
```

For AI systems, capacity may also depend materially on context length, token generation, batching, model routing, retrieval, tool calls, and downstream dependencies. Parameter count alone is not a sufficient infrastructure-sizing method.

## 16A.5 Cost Must Follow Useful Output

Infrastructure cost should be interpreted against delivered service and accepted useful outcomes, not merely utilization metrics.

A useful planning concept is:

```text
Cost per Useful Result
≈ Total Deployment Cost / Accepted Useful Outputs
```

This is a decision metric, not an accounting standard. Its value depends on how “useful output” is defined and measured.

## 16A.6 Failure and Rollback Questions

Ask:

- What happens when capacity is exhausted?
- What happens when the model-serving layer fails?
- What happens when a dependency is unavailable?
- Does fallback preserve the semantic meaning of the result?
- Can a model version be identified for every consequential output?
- Can a bad model release be rolled back quickly?
- What happens if the evaluation result and production behavior diverge?

A fallback that silently changes the meaning or confidence of a consequential output is not a neutral resilience mechanism.

## 16A.7 Technical Position Format

> **Finding:** The proposed serving architecture meets the stated workload objective under the tested conditions.
>
> **Evidence boundary:** Testing covered the primary inference path but did not include the expected peak concurrency and dependency failure conditions.
>
> **Implication:** Capacity and resilience remain partially unproven for the target production envelope.
>
> **Recommendation:** Treat the architecture as conditionally validated and require targeted load and failure testing before production approval.

Again, the position must follow the actual evidence.

## 16A.8 Field Rule

> **Do not approve compute from benchmark speed alone. Approve the capacity, performance, cost, and failure behavior required by the workload and service objective.**

**Cross-reference:** Chapter 16 provides the technical deployment mechanisms; Chapters 17–18 cover scalability and reliability; Chapters 31 and 46 cover evaluation; Chapters 34–35 cover TCO and optimization; Chapter 40 covers production readiness.