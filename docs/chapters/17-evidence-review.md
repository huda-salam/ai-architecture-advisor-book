# Evidence Review — Chapter 17: Scalability & Performance

## Review purpose

This review separates established technical principles from architectural inference, workload-specific recommendations, and assumptions in Chapter 17. The objective is to prevent scalability guidance from becoming vendor folklore or unsupported capacity claims.

## 1. Core evidence base

### 1.1 Performance requirements must be defined before optimization

**Classification:** Technical guidance / architectural principle

Cloud architecture frameworks from Google Cloud, AWS, and Azure consistently treat performance requirements, workload characteristics, capacity planning, monitoring, and continuous optimization as parts of performance engineering. This supports the chapter's requirement to define measurable objectives before choosing infrastructure.

Primary references:

- [Google Cloud Well-Architected — Performance Optimization](https://docs.cloud.google.com/architecture/framework/performance-optimization)
- [AWS Well-Architected — Performance Efficiency](https://docs.aws.amazon.com/wellarchitected/latest/performance-efficiency-pillar/definition.html)
- [Azure Well-Architected — Performance Efficiency](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/principles)

### 1.2 Capacity planning is distinct from merely adding resources

**Classification:** Technical guidance

Azure's capacity-planning guidance explicitly frames capacity planning as predicting resources required to meet performance targets and distinguishes it from simple resource provisioning. It also describes vertical and horizontal scaling as alternative mechanisms whose usefulness depends on workload characteristics.

Reference: [Azure — Capacity planning](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/capacity-planning)

### 1.3 Horizontal scaling is workload-dependent

**Classification:** Technical principle

Azure's scale-out guidance identifies bottlenecks and synchronization points as limits to scalability and recommends horizontal scaling where workload characteristics support it. This supports the chapter's refusal to present scale-out as universally superior.

Reference: [Azure — Design to scale out](https://learn.microsoft.com/en-us/azure/architecture/guide/design-principles/scale-out)

### 1.4 Autoscaling is not unlimited capacity

**Classification:** Technical evidence / architectural inference

Azure's autoscaling guidance describes monitoring, scaling decision logic, scaling mechanisms, and testing/tuning. It also notes that adding resources does not guarantee improved performance and that workload design must support horizontal scaling. Therefore the chapter's treatment of autoscaling as a control loop with reaction time and limits is justified.

Reference: [Azure — Autoscaling](https://learn.microsoft.com/en-us/azure/architecture/best-practices/auto-scaling)

### 1.5 Performance, reliability, and cost involve trade-offs

**Classification:** Technical guidance

Azure's current Well-Architected performance guidance explicitly documents trade-offs among performance efficiency, reliability, security, and cost. Examples include the reliability risks of aggressive scale-in and the cost risks of uncontrolled autoscaling.

Reference: [Azure — Performance Efficiency Tradeoffs](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/tradeoffs)

### 1.6 Benchmarking should be data-driven

**Classification:** Technical guidance

AWS recommends benchmarking and data-driven architectural choices. This supports the chapter's requirement that vendor benchmark results be treated as evidence under specified conditions rather than universal proof of optimal architecture.

Reference: [AWS — Architecture selection](https://docs.aws.amazon.com/wellarchitected/latest/performance-efficiency-pillar/architecture-selection.html)

## 2. Theory used in the chapter

### 2.1 Amdahl's Law

**Classification:** Established theory

Amdahl's Law describes the upper bound on speedup from parallelization when a fraction of execution remains serial. The chapter uses it only as an explanatory model for why adding workers does not necessarily produce proportional end-to-end speedup.

It is not used as a production capacity formula.

### 2.2 Throughput, concurrency, and processing time

**Classification:** Queueing/performance theory approximation

The relationship `concurrency ≈ throughput × average processing time` is a useful planning approximation related to Little's Law when the variables are defined consistently. It should not be presented as a universal AI capacity formula. Real systems require workload measurement and queueing assumptions.

## 3. AI-specific reasoning

### 3.1 AI requests have heterogeneous cost

**Classification:** Architectural inference

The chapter distinguishes simple requests, RAG requests, multi-step agent tasks, and portfolio-wide analysis. This is a design observation rather than a universal empirical law. The exact workload mix must be measured for the target system.

### 3.2 Agentic workloads can fan out

**Classification:** Architectural inference

An agent request can involve multiple model calls, retrieval operations, and tool calls. The chapter therefore treats “work per user request” as more informative than request count alone. Exact fan-out must be measured from the implemented workflow.

### 3.3 RAG has separate retrieval and generation scaling dimensions

**Classification:** Architectural decomposition

Retrieval infrastructure and model inference have different resource and performance characteristics. Treating them as separate capacity domains is an architectural recommendation, not a claim that every deployment must use separate infrastructure.

### 3.4 AI-IDSS scalability must preserve decision semantics

**Classification:** Advisor recommendation / risk principle

A faster or cheaper path is not automatically an acceptable fallback if it changes the semantics, evidence quality, or confidence interpretation of a consequential recommendation. This is an architectural safeguard derived from the role's decision-support context, not a claim that a specific fallback policy is mandated by an external standard.

## 4. Claims that must remain conditional

The chapter intentionally avoids asserting that:

- GPUs are always better than CPUs;
- scale-out is always better than scale-up;
- autoscaling is always beneficial;
- caching is always beneficial;
- queues are always appropriate;
- one cloud provider has universally superior scalability;
- a fixed capacity-headroom percentage is universally correct;
- average latency is sufficient to characterize production performance;
- a model's parameter count alone determines infrastructure capacity;
- more compute automatically solves performance problems;
- a benchmark from one environment predicts another environment's performance.

These are all workload-dependent propositions.

## 5. Important semantic controls

### Performance objective

Must identify what is being optimized: latency, throughput, completion time, freshness, availability, cost, or another measurable objective.

### Workload

Must identify request classes, size, concurrency, burst behavior, and growth assumptions.

### Capacity

Must state the workload that the capacity figure supports and the conditions under which it was measured.

### Scalability

Must describe how capacity changes as resources or workload change.

### Headroom

Must identify the risk being covered. A percentage without a rationale is not evidence.

## 6. Vendor evidence discipline

Vendor architecture frameworks are valuable primary technical guidance, but they are also written for their own platforms. The advisor should use them for principles and platform-specific mechanisms while maintaining vendor neutrality at the architectural level.

For a real proposal, benchmark evidence should include at minimum:

- workload definition;
- request distribution;
- model/version;
- data/context characteristics;
- concurrency;
- resource configuration;
- test duration;
- latency percentile definitions;
- throughput measurement;
- failure/error behavior;
- cost assumptions.

A statement such as “this GPU supports X requests per second” is incomplete without these conditions.

## 7. Evidence hierarchy for a scalability decision

Prefer evidence in roughly this order:

1. measured production workload;
2. controlled benchmark using representative workload;
3. authoritative platform documentation;
4. established performance theory;
5. vendor benchmark under clearly comparable conditions;
6. engineering estimate;
7. untested assumption.

The hierarchy is an advisor operating principle, not a formal standards hierarchy.

## 8. What would change the architecture?

The advisor should revisit the design if testing shows:

- a different bottleneck than expected;
- materially different request distributions;
- unacceptable tail latency;
- insufficient scale-up reaction time;
- poor horizontal-scaling efficiency;
- external API or database limits dominating capacity;
- agent fan-out exceeding cost or latency limits;
- RAG becoming the dominant bottleneck;
- a simpler architecture meeting the same objectives at lower operational risk.

## 9. Confidence statement

**Overall confidence:** High for the general architectural principles; medium for AI-specific capacity implications until measured against the actual AI-IDSS workload.

Confidence does not convert workload assumptions into facts. Any numerical capacity, latency, or cost claim for the actual AI-IDSS must be supported by measurement or explicitly labeled as an assumption.

## 10. Advisor conclusion

The central conclusion is not “scale horizontally,” “use autoscaling,” or “buy more compute.” It is:

> **Define the workload and service objective, identify the bottleneck, measure the system under representative conditions, and choose the simplest architecture that preserves the required outcome as demand changes.**

That is the standard the advisor should apply when reviewing scalability proposals.
