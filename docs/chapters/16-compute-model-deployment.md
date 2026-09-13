# 16. Compute & Model Deployment

## 16.1 Why Compute Architecture Matters

A model is not production AI merely because it works in a notebook or API test. Production adds requirements for capacity, serving, concurrency, latency, availability, scaling, security, observability, cost, versioning, and rollback.

**Advisor question:**

> **What deployment architecture can deliver the required model capability with acceptable latency, reliability, security, operational burden, and cost?**

NIST defines cloud computing around on-demand access to configurable resources and includes rapid elasticity among its essential characteristics. Compute should therefore be evaluated against workload behavior, not as a static server-selection exercise. [NIST SP 800-145](https://csrc.nist.gov/pubs/sp/800/145/final)

## 16.2 Model Deployment Is a System

```text
AI-IDSS / Application
        ↓
API / Gateway
        ↓
Orchestrator / Router
        ↓
Model Serving
        ↓
Model Runtime
        ↓
CPU / GPU / Accelerator
        ↓
Infrastructure
```

Cross-cutting concerns:

**Identity · Security · Evaluation · Observability · Cost · Governance**

> **Do not select compute before defining the serving workload.**

## 16.3 Classify the Workload First

| Workload | Primary concern |
|---|---|
| Embedding generation | Throughput, batching, cost |
| Reranking | Latency, concurrency |
| LLM inference | Memory, accelerator capacity, latency |
| Classical ML scoring | CPU efficiency, predictable latency |
| Batch analytics | Throughput, scheduling |
| Fine-tuning | Accelerator capacity, duration, storage |
| Document processing | CPU, memory, I/O, parallelism |
| Agent tools | API latency, concurrency, isolation |

This is a planning taxonomy, not a universal hardware mapping. Actual requirements must be measured.

## 16.4 CPU, GPU, and Accelerators

Do not ask only “Which GPU?” Ask:

- What operation is accelerated?
- Is the workload compute- or memory-bound?
- What precision is required?
- What batch size is practical?
- What memory is required?
- What concurrency is expected?
- What latency is acceptable?
- What is the total cost per required service level?

A CPU can be appropriate for preprocessing, orchestration, lightweight models, or some low-concurrency workloads. Accelerators may be appropriate when workload computation benefits from parallel hardware.

**Recommendation:** Compare **cost and performance under the target workload**, not hardware specifications in isolation.

## 16.5 Model Memory

For self-hosted models, model weights are only one part of memory consumption.

```text
Required memory
≈ model weights
 + runtime overhead
 + inference state / cache
 + concurrency overhead
 + safety margin
```

This is a planning model, not an exact equation. Actual consumption depends on architecture, precision, sequence length, batching, serving engine, and implementation.

**Challenge question:**

> “Show me measured memory consumption under the target workload, not only parameter count.”

## 16.6 Quantization

Quantization uses lower numerical precision than the original representation. It can reduce memory requirements and potentially improve efficiency, but may affect quality or compatibility.

**Recommendation:** Treat quantization as a deployment decision requiring evaluation. For consequential AI-IDSS workloads, compare quality, latency, and cost before and after quantization.

## 16.7 Model Serving

A serving layer may provide request handling, batching, concurrency control, model loading, health checks, metrics, version selection, routing, resource management, and graceful shutdown.

The serving technology is an implementation choice.

> **Separate the model artifact from the serving contract where practical.**

This reduces unnecessary coupling between the AI-IDSS application and a particular runtime.

## 16.8 Synchronous vs Asynchronous Inference

### Synchronous

```text
Request → inference → response
```

Useful for interactive use when the latency target permits it.

### Asynchronous

```text
Request → queue → inference → result/event
```

Useful for long-running or bulk workloads such as document extraction, portfolio-wide analysis, embeddings, periodic scoring, and other jobs that do not need to block the user's request.

Choose based on user experience, workload duration, reliability, and throughput requirements.

## 16.9 Batching and Concurrency

Batching can improve resource utilization but may increase individual-request latency and memory use.

Capacity planning must account for concurrent requests, not merely average request volume:

```text
Requests → Concurrency → Queueing → Utilization → Latency
```

**Advisor question:**

> “Are we optimizing for throughput, time to first response, total completion time, or cost per item?”

Test representative concurrency and burst conditions.

## 16.10 Latency Decomposition

Model latency is only one component of end-to-end latency:

```text
Request
 ↓
Authentication
 ↓
Data / RAG retrieval
 ↓
Reranking
 ↓
Context construction
 ↓
Model inference
 ↓
Post-processing
 ↓
Response
```

> **Optimize the end-to-end bottleneck, not the component with the most impressive benchmark.**

## 16.11 Autoscaling

Autoscaling changes capacity in response to observed workload signals. Kubernetes HorizontalPodAutoscaler, for example, adjusts workload replica counts using observed resource or custom metrics. [Kubernetes HPA](https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/)

```text
Demand / metric
      ↓
Scaling policy
      ↓
Capacity adjustment
      ↓
More / fewer serving instances
```

Autoscaling does not eliminate capacity planning. Review scale-up time, minimum/maximum capacity, queue limits, cold starts, accelerator availability, cost, and behavior during bursts.

## 16.12 Scale-Up vs Scale-Out

**Scale-up:** increase resources available to an instance.

**Scale-out:** run additional instances.

Scale-out can improve aggregate concurrency when the workload supports replication. Scale-up may be necessary when one model instance requires resources that cannot easily be divided.

Neither is universally superior.

## 16.13 Model Routing

An AI-IDSS may use different models for different tasks. A router can consider:

- task type
- required capability
- sensitivity
- latency
- cost
- availability
- context requirements
- evaluation results

```text
Request → Router → model A
                 → model B
                 → specialized model
                 → enterprise model service
```

**Recommendation:** Introduce routing only when its measurable benefit justifies the additional evaluation, observability, fallback, and governance complexity.

## 16.14 Model Versioning

Material outputs should be traceable to the model/version that produced them.

```text
Recommendation ID
      ↓
Model + version
      ↓
Configuration
      ↓
Prompt / policy version where material
      ↓
Knowledge / retrieval version where material
      ↓
Timestamp
```

Model changes should therefore be treated as controlled production changes, not merely library upgrades.

## 16.15 Canary, Evaluation, and Rollback

A model can change behavior while retaining API compatibility.

```text
Current model ───────────→ production
Candidate model → evaluation → controlled rollout
                              ↓
                         promote / rollback
```

For AI-IDSS, “the API still works” is insufficient evidence. Evaluate decision-quality behavior as well as technical compatibility.

## 16.16 Availability and Failure Modes

Possible failures include hardware failure, capacity exhaustion, model loading failure, dependency outage, network failure, queue overload, malformed input, software regression, and corrupted model artifacts.

Possible responses include retry where safe, queueing, fallback, degraded functionality, cached results where appropriate, and human escalation.

> **Fallback must not silently change the meaning of a consequential output.**

If a lower-capability model is used during an outage, its output should not automatically be represented as equivalent to the primary model's output.

## 16.17 Reliability vs Model Quality

A highly accurate model that is unavailable at the decision time may be less useful than a slightly less capable model that reliably meets the required service level. Conversely, high availability does not compensate for unacceptable analytical quality.

**Recommendation:** Define minimum acceptable quality and service availability together.

## 16.18 Observability

Useful production signals may include:

- request rate
- queue depth
- latency distributions
- error and timeout rates
- resource utilization
- model version
- compute/token usage where applicable
- fallback rate
- saturation

Logs must be designed with data classification and privacy requirements in mind.

> **Observability must not become an uncontrolled secondary data-exfiltration path.**

## 16.19 Cost per Useful Result

A useful conceptual metric is:

```text
Cost per useful result
≈ total deployment cost / accepted useful outputs
```

This is intentionally broader than API-call price. For AI-IDSS, an output may be considered useful only if it meets defined quality and evidence criteria.

Potential costs include compute, accelerator time, storage, networking, serving, observability, engineering, model charges, evaluation, and security controls.

## 16.20 Capacity Planning

```text
Expected workload
+ peak workload
+ concurrency
+ service-level objective
+ growth assumption
+ failure margin
→ required capacity
```

Expose the assumptions:

| Variable | Evidence |
|---|---|
| Average requests/minute | Measurement or scenario |
| Peak requests/minute | Measurement or scenario |
| Context size | Measurement / estimate |
| Target latency | Requirement |
| Model | Candidate |
| Accelerator | Candidate |
| Scale-up time | Measurement |
| Availability target | Requirement |

> **Never present a capacity estimate without exposing the assumptions behind it.**

## 16.21 AI-IDSS Deployment Pattern

```text
                       AI-IDSS
                          │
                    API / Gateway
                          │
                  Orchestration Layer
                          │
              ┌───────────┼───────────┐
              ↓           ↓           ↓
          Risk Model    RAG/LLM    Tool Services
              │           │           │
              └───────────┼───────────┘
                          ↓
                  Model Serving Layer
                          ↓
             CPU / GPU / Accelerator Pool
                          ↓
                  Cloud Infrastructure
```

Cross-cutting controls:

**Identity · Security · Evaluation · Observability · Cost · Versioning · Audit**

The separation between AI-IDSS application and model serving allows model deployment to evolve without automatically redesigning the application.

## 16.22 Common Deployment Anti-Patterns

### “Buy the biggest GPU.”
Hardware should follow measured workload requirements.

### “Parameter count determines infrastructure.”
Parameter count alone does not determine memory, latency, or cost.

### “Benchmark latency is production latency.”
Retrieval, orchestration, queueing, and network time may dominate.

### “Autoscaling solves capacity.”
Scaling has reaction time, limits, cost, and dependency constraints.

### “One model for everything.”
A single model may be appropriate, but it should be a decision.

### “Model upgrade is just a patch.”
Behavior can change even when APIs remain compatible.

### “Fallback is invisible.”
A degraded model may have different decision properties.

### “Log everything.”
Inference logs can contain sensitive information and create a secondary exposure path.

## 16.23 Technical Challenge Questions

1. What exact workload are we sizing?
2. What is the latency target and how is it measured?
3. What concurrency and peak load are expected?
4. What memory does the model actually consume?
5. Why is an accelerator required?
6. What is measured throughput per instance?
7. What happens when capacity is exhausted?
8. How does autoscaling behave during bursts?
9. What happens during model-loading or hardware failure?
10. Can the model be rolled back quickly?
11. Which model version produced each material result?
12. How are quality regressions detected?
13. What is the fallback behavior?
14. What is the cost per useful result?
15. Can observability logs expose sensitive data?
16. Which assumptions drive the capacity estimate?
17. Which choices create vendor or hardware dependency?
18. What evidence would make us reject this deployment architecture?

## 16.24 Architecture Review Checklist

### Workload
- [ ] Workload class defined
- [ ] Volume and concurrency estimated
- [ ] Peak behavior considered
- [ ] Latency/service objectives defined

### Compute
- [ ] CPU/GPU/accelerator choice justified
- [ ] Memory requirement measured or defensibly estimated
- [ ] Utilization measured
- [ ] Capacity margin defined

### Serving
- [ ] Serving contract defined
- [ ] Sync/async choice justified
- [ ] Batching evaluated
- [ ] Concurrency tested

### Scaling
- [ ] Scale-up/scale-out decision justified
- [ ] Scaling metrics defined
- [ ] Scale-up time understood
- [ ] Maximum capacity defined

### Reliability
- [ ] Failure modes identified
- [ ] Fallback behavior defined
- [ ] Rollback tested
- [ ] Model version traceable

### Security
- [ ] Identity and authorization defined
- [ ] Sensitive inference data protected
- [ ] Logs reviewed for leakage

### Economics
- [ ] Full deployment cost estimated
- [ ] Cost per useful result understood
- [ ] Accelerator utilization monitored

### AI-IDSS
- [ ] Model-output semantics defined
- [ ] Material outputs traceable to model/version
- [ ] Evaluation integrated into deployment
- [ ] Human decision boundary preserved

## 16.25 Evidence Discipline

| Statement | Classification |
|---|---|
| NIST cloud definition | **Fact / Technical Evidence** |
| Kubernetes HPA behavior | **Technical Evidence** |
| CPU/GPU suitability for a workload | **Technical analysis; requires workload evidence** |
| Quantization trade-offs | **Technical principle; exact impact requires evaluation** |
| Specific accelerator choice | **Recommendation after benchmarking** |
| Capacity estimate | **Assumption + measured evidence** |
| Cost per useful result | **Recommendation / analytical metric** |

Vendor benchmark claims are evidence about the tested conditions, not proof that a configuration is optimal for the AI-IDSS workload.

## 16.26 What Would Change Our Mind?

Change the deployment architecture if evidence shows that:

- CPU meets requirements without unacceptable quality loss;
- quantization causes unacceptable degradation;
- a managed service materially improves total cost or operational risk;
- self-hosting materially improves required control or economics;
- autoscaling creates unacceptable burst latency;
- fallback changes decision quality beyond the accepted threshold;
- actual workload differs materially from capacity assumptions.

The advisor should not defend GPU, cloud, self-hosting, Kubernetes, or any specific technology. The objective is evidence-backed delivery of the required capability.

## 16.27 Field Rule

> **Deploy the smallest, simplest compute architecture that can demonstrably satisfy the required model quality, latency, reliability, security, scalability, and cost objectives — and make the assumptions measurable.**

For AI-IDSS:

> **Model capability is only one part of production capability. Deployment architecture determines whether that capability can be delivered reliably and economically when the organization actually depends on it.**
