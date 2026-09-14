# Chapter 16 — Iteration 6: Compute & Model Deployment Hardening Review

## Purpose

This review hardens Chapter 16 against hardware-first reasoning, benchmark overclaim, deployment ambiguity, silent fallback semantics, and inconsistency with Chapters 15, 17–18, 30–31, and 34–36.

## 1. Core architecture position

Preserve the central principle:

> **Do not select compute before defining the serving workload and the service objective.**

Compute is an implementation choice inside a larger system. CPU/GPU/accelerator selection, model serving technology, autoscaling, batching, and deployment topology should be evaluated against workload behavior, quality, latency, reliability, security, and total economics.

A hardware benchmark is evidence about a benchmark workload. It is not automatically evidence about production usefulness.

## 2. Deployment object: what exactly is being deployed?

The chapter should distinguish at least:

- model weights/version;
- inference runtime;
- serving layer;
- application/orchestration;
- retrieval/data dependencies;
- configuration and prompts where material;
- evaluation evidence;
- infrastructure;
- observability and control plane.

For an AI-IDSS, changing any material component can change system behavior. Therefore “same model” does not necessarily mean “same system.”

## 3. Workload classification before compute selection

Classify the workload before choosing infrastructure:

| Workload | Typical architectural concern |
|---|---|
| Interactive inference | Latency, concurrency, availability |
| Batch inference | Throughput, utilization, scheduling |
| Scheduled analysis | Cost, predictable capacity, freshness |
| Event-triggered inference | Burst handling, queues, backpressure |
| Agentic workflow | Variable step count, tool latency, failure containment |
| Model training/fine-tuning | Accelerator utilization, duration, storage, data pipeline |
| Evaluation | Reproducibility, isolation, cost |

These are architectural categories, not mandatory implementations.

## 4. Latency must be defined at system level

Avoid treating model inference latency as the whole user-visible latency.

For AI-IDSS, end-to-end latency may include:

```text
User request
   ↓
Authentication / authorization
   ↓
Retrieval
   ↓
Data processing
   ↓
Model inference
   ↓
Post-processing / validation
   ↓
Evidence assembly
   ↓
User response
```

A faster model endpoint can therefore fail to improve the actual decision workflow if another component dominates latency.

Measure appropriate distributions such as p50, p95, and p99 where tail behavior matters. The exact target should come from the service requirement.

## 5. Throughput and concurrency

Throughput, concurrency, and capacity are related but different.

The advisor should ask:

- How many requests arrive?
- How bursty are they?
- How many requests execute concurrently?
- How much work does each request require?
- What queueing delay is acceptable?
- What latency objective must be maintained under load?

A system that handles average demand but collapses under predictable bursts is not adequately capacity-designed.

## 6. CPU, GPU, and accelerators

Do not frame accelerator selection as “GPU = AI” or “CPU = cheap.”

Evaluate the actual workload:

- model architecture;
- model size;
- context length;
- precision;
- batch size;
- concurrency;
- memory requirements;
- latency objective;
- throughput objective;
- utilization;
- software/runtime compatibility;
- availability;
- cost.

The correct architecture may use different compute classes for different workloads.

## 7. Memory is a first-class deployment constraint

Model deployment may be constrained by:

- model weights;
- runtime memory;
- key/value cache where applicable;
- context length;
- batch/concurrency requirements;
- retrieval context;
- application overhead.

Do not size infrastructure from parameter count alone.

The relevant question is:

> **What memory and compute footprint does the complete serving workload require under the target operating conditions?**

## 8. Quantization and compression

Quantization or other compression techniques may reduce resource requirements, but the advisor should not assume that lower memory automatically means better architecture.

Evaluate:

- task performance;
- numerical behavior where relevant;
- latency;
- throughput;
- memory;
- cost;
- workload-specific quality;
- compatibility with the serving stack.

This connects directly to Chapter 31. A deployment optimization is acceptable only when the resulting system remains within the required evaluation boundary.

## 9. Batching and asynchronous execution

Batching can improve resource utilization for suitable workloads, but it can also increase waiting time or complicate failure semantics.

Asynchronous execution can be useful for non-interactive workloads, but it changes user experience and operational semantics.

Advisor question:

> “What decision requirement allows us to trade immediacy for utilization?”

Do not introduce asynchronous architecture merely to improve infrastructure metrics if the business workflow requires immediate results.

## 10. Model serving architecture

A serving architecture may include:

```text
Client / AI-IDSS
      ↓
API / gateway
      ↓
Routing / policy
      ↓
Model serving layer
      ↓
Runtime / accelerator
      ↓
Model
```

Cross-cutting:

```text
Identity · Authorization · Rate limits · Validation
Evaluation · Observability · Cost · Security
```

The serving layer is part of the system boundary. It should not be treated as a transparent pipe whose behavior is irrelevant.

## 11. Routing and model portfolios

Multiple models may be used for different workloads.

Possible routing dimensions include:

- task type;
- latency requirement;
- quality requirement;
- data sensitivity;
- cost limit;
- availability;
- model version;
- evaluation status.

Routing must not silently change the meaning or evidence standard of an AI-IDSS output.

If a fallback model is less capable, the system must define what happens when the required quality threshold is no longer met.

## 12. Fallback semantics

A fallback should be evaluated as a change in system behavior, not merely as an availability feature.

Example:

```text
Primary model unavailable
        ↓
Fallback model
        ↓
Different capability / latency / cost
        ↓
Potentially different decision quality
```

For consequential outputs, possible responses include:

- use a pre-evaluated fallback;
- degrade the output explicitly;
- require human review;
- return “insufficient evidence”; or
- stop the workflow.

**Architecture warning:** availability must not be preserved by silently producing a materially different decision output.

## 13. Autoscaling

Autoscaling should be tied to service objectives rather than CPU/GPU utilization alone.

Possible signals include:

- request rate;
- queue depth;
- concurrency;
- latency;
- accelerator utilization;
- workload-specific processing time.

Autoscaling also creates cold-start, provisioning, cost, and capacity-headroom trade-offs.

The advisor should ask whether scaling decisions preserve the required p95/p99 behavior under expected bursts.

## 14. Capacity planning

A defensible capacity estimate should state assumptions:

- request volume;
- request size;
- context size;
- concurrency;
- peak-to-average ratio;
- model/runtime;
- target latency;
- availability target;
- expected utilization;
- growth rate;
- failure reserve.

Without assumptions, a statement such as “we need ten GPUs” is not an architecture decision; it is an unsupported estimate.

## 15. Versioning and reproducibility

Deployment should preserve enough version information to reconstruct material behavior.

Track, as appropriate:

- model/version identifier;
- serving runtime/version;
- prompt/configuration version;
- retrieval/index version;
- relevant data snapshot;
- deployment configuration;
- evaluation evidence;
- deployment timestamp.

This connects directly to Chapters 14, 28, 31, and 41.

## 16. Canary, staged rollout, and rollback

A production model change should have an explicit change strategy.

Possible controls include:

- offline evaluation;
- shadow evaluation;
- limited rollout;
- canary deployment;
- production monitoring;
- rollback criteria.

A rollback plan should identify what is actually rolled back: model, runtime, application, configuration, retrieval index, or the complete deployment.

## 17. Evaluation is part of deployment

Deployment readiness cannot be established from infrastructure readiness alone.

NIST's AI RMF treats measurement and evaluation as part of AI risk management, and NIST's 2026 work on post-deployment monitoring emphasizes that pre-deployment evaluation cannot fully account for real-world dynamics. [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) [NIST AI 800-4](https://www.nist.gov/publications/challenges-monitoring-deployed-ai-systems-center-ai-standards-and-innovation)

Therefore deployment gates should consider:

- task performance;
- system performance;
- robustness;
- security;
- data quality/freshness;
- cost;
- operational reliability;
- business/decision requirements.

## 18. Observability without becoming a data-exfiltration path

Deployment observability may capture:

- request metadata;
- latency;
- errors;
- resource utilization;
- model/version information;
- evaluation signals;
- dependency health;
- cost metrics.

For sensitive AI workloads, logging prompts, retrieved documents, outputs, or intermediate artifacts can itself create a security and privacy boundary.

The advisor should ask:

> “What is logged, who can access it, how long is it retained, and could the observability system become a second data-exfiltration path?”

## 19. Security boundary for compute

Compute isolation does not replace application authorization.

Review:

- workload identity;
- image/runtime integrity;
- secrets;
- network boundaries;
- accelerator isolation where relevant;
- administrative access;
- artifact provenance;
- logging;
- patching;
- supply-chain controls.

For AI infrastructure, NIST's 2026 draft SP 800-239 explicitly examines security considerations for purpose-built AI infrastructure supporting training, inference, and applications. It is an initial public draft and should be treated as draft evidence, not finalized guidance. [NIST SP 800-239 IPD](https://csrc.nist.gov/pubs/sp/800/239/ipd)

## 20. Reliability and graceful degradation

Compute failure must be connected to Chapter 18.

Potential failure modes include:

- accelerator failure;
- serving-process failure;
- runtime incompatibility;
- capacity exhaustion;
- queue saturation;
- provider outage;
- model loading failure;
- dependency failure;
- corrupted or unavailable model artifact.

The system should define whether it:

- retries;
- queues;
- fails over;
- degrades;
- requests human review;
- or stops.

## 21. Cost per useful result

Compute optimization should align with Chapters 34–35.

Do not optimize solely for:

- lowest GPU price;
- highest utilization;
- lowest latency;
- highest throughput.

The stronger objective is:

```text
Resource cost
      ↓
System cost
      ↓
Cost per task
      ↓
Cost per useful result
      ↓
Business / decision value
```

A slower but more accurate model may be economically superior if it reduces downstream review or incorrect decisions. Conversely, an expensive model may be unjustified if a smaller evaluated model provides equivalent task performance.

## 22. AI-IDSS deployment pattern

A useful conceptual pattern is:

```text
AI-IDSS
   ↓
Policy / routing
   ↓
Retrieval + data services
   ↓
Model serving
   ↓
Compute
   ↓
Infrastructure
```

Cross-cutting:

```text
Identity · Security · Evaluation · Observability
Reliability · Cost · Governance · Audit
```

The compute layer should remain replaceable where practical. It should not silently become the authority for business facts or decision policy.

## 23. Common anti-patterns

### Anti-pattern 1 — Hardware-first architecture
“Let's buy GPUs and then determine what to run.”

**Correction:** define workload and service objective first.

### Anti-pattern 2 — Benchmark-driven deployment
“This accelerator is faster in the benchmark, therefore it is better.”

**Correction:** evaluate the complete target workload.

### Anti-pattern 3 — Utilization worship
“Higher utilization is always better.”

**Correction:** utilization must be balanced against latency, resilience, and capacity headroom.

### Anti-pattern 4 — Silent fallback
“The primary model failed, so use a cheaper model without telling anyone.”

**Correction:** fallback semantics must be explicitly evaluated.

### Anti-pattern 5 — Logging everything
“Capture every prompt and output for observability.”

**Correction:** logging is itself a security, privacy, retention, and cost decision.

### Anti-pattern 6 — Autoscaling without workload modeling
“Autoscaling means capacity is solved.”

**Correction:** test burst behavior, provisioning time, queueing, and cost.

### Anti-pattern 7 — Deployment without evaluation evidence
“The endpoint is healthy, therefore the model is production-ready.”

**Correction:** infrastructure health and AI fitness are different questions.

## 24. Technical challenge questions

1. What is the exact serving workload?
2. What are the latency, throughput, concurrency, and availability objectives?
3. Which component actually dominates end-to-end latency?
4. What evidence supports the selected compute architecture?
5. What changes when model precision or quantization changes?
6. What happens when the primary model becomes unavailable?
7. Does the fallback preserve the same decision semantics?
8. What model/runtime/configuration versions are recorded?
9. What evidence gates production deployment?
10. What is the capacity assumption at peak load?
11. What is the failure reserve?
12. What happens when the queue reaches capacity?
13. What sensitive data enters observability systems?
14. Can the deployment be reproduced or reconstructed?
15. What is the cost per useful result?
16. Which dependencies prevent compute portability?
17. What evidence would cause us to choose a different compute architecture?

## 25. Cross-chapter consistency tests

### Test A — Chapter 15
Cloud compute is an option; cloud does not establish the required performance or security properties automatically.

### Test B — Chapter 17
Compute capacity must be derived from workload, concurrency, service objectives, and bottlenecks.

### Test C — Chapter 18
Compute redundancy is not equivalent to reliable decision support; recovery and degraded behavior must be tested.

### Test D — Chapter 30
Model selection and compute selection are related but distinct decisions. A model that is best on a benchmark may not be best under the target deployment workload.

### Test E — Chapter 31
Any material deployment optimization should be evaluated against task and system performance.

### Test F — Chapters 34–35
Infrastructure optimization must preserve quality, reliability, security, and decision value.

### Test G — Chapter 36
Compute architecture should expose strategically material infrastructure and runtime dependencies rather than hiding them behind “managed service” terminology.

## 26. Evidence discipline

| Claim | Classification |
|---|---|
| NIST AI RMF covers AI risk management across design, development, deployment, use, and evaluation | Fact / technical evidence |
| NIST 2026 work identifies post-deployment monitoring as important because controlled pre-deployment evaluation cannot fully represent real-world dynamics | Fact / research/technical evidence |
| NIST SP 800-239 currently exists as an initial public draft for AI data-center security analysis | Fact / draft technical evidence |
| A particular GPU is universally best for enterprise AI | Unsupported universal claim |
| Quantization always preserves task quality | Unsupported universal claim |
| Higher accelerator utilization always improves economics | Unsupported universal claim |
| Cloud-managed inference removes deployment responsibility | Unsupported universal claim |
| Tested deployment evidence is stronger than hardware specification alone | Architecture/evidence principle |

## 27. Field rule

> **Do not ask which hardware is fastest. Ask which deployment architecture delivers the required task and system performance, reliability, security, and evidence at the lowest justified total cost under the actual workload.**
