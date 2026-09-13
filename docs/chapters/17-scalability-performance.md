# 17. Scalability & Performance

## 17.1 Why Scalability Is an Architecture Property

Scalability is not simply the ability to add servers. It is the ability of a system to continue meeting defined performance objectives as workload changes.

For an AI-IDSS, workload can change through:

- more portfolio companies;
- more documents and historical data;
- more users;
- more concurrent requests;
- larger prompts or retrieved context;
- more agents and tool calls;
- more frequent risk-scoring runs;
- more demanding models.

**Advisor question:**

> **What changes when demand increases, where does the system saturate, and what evidence shows that the architecture can continue meeting its objectives?**

Scalability therefore belongs to architecture, capacity planning, performance engineering, and operations—not only infrastructure procurement.

## 17.2 Define the Performance Objective First

Do not begin with “How many users can the system support?” Begin with measurable objectives.

| Dimension | Example requirement |
|---|---|
| Throughput | 500 scoring jobs/hour |
| Interactive latency | p95 ≤ 5 seconds |
| Batch completion | portfolio refresh ≤ 30 minutes |
| Concurrency | 100 simultaneous analyst requests |
| Availability | 99.9% for interactive service |
| Freshness | risk inputs refreshed within defined window |
| Error rate | below defined threshold |
| Cost | below approved cost/result |

These are examples, not universal targets. The organization must define the actual service requirements.

**Rule:** A scalability claim is incomplete unless the performance objective and workload are defined.

## 17.3 Scalability vs Performance vs Capacity

These concepts are related but not interchangeable.

- **Performance:** how quickly and efficiently a workload executes under specified conditions.
- **Capacity:** the amount of workload a configuration can handle while meeting defined objectives.
- **Scalability:** how capacity changes as resources or workload change.

A system can have excellent latency at low load and poor capacity at higher concurrency. A system can also scale technically while failing the required latency target during scale-up.

Google's Well-Architected guidance treats performance optimization as a continuous cycle of defining requirements, designing, monitoring, and optimizing. AWS similarly recommends data-driven architectural decisions and benchmarking rather than selecting resources from specifications alone. [Google Cloud Well-Architected — Performance Optimization](https://docs.cloud.google.com/architecture/framework/performance-optimization) · [AWS Well-Architected — Performance Efficiency](https://docs.aws.amazon.com/wellarchitected/latest/performance-efficiency-pillar/definition.html)

## 17.4 Workload Model

Capacity planning should start with a workload model.

```text
Users
  ↓
Requests / Jobs
  ↓
Concurrency
  ↓
Work per request
  ↓
Resource demand
  ↓
Queueing / processing
  ↓
Latency + throughput
```

For AI systems, “one request” may hide substantial variation.

For example:

```text
Simple question
    ≠
RAG question
    ≠
Multi-step agent task
    ≠
Portfolio-wide analysis
```

A useful workload model therefore captures request classes, not only request counts.

## 17.5 AI Workload Decomposition

For an AI-IDSS, decompose the workload before estimating scale:

```text
User request
    ↓
Authentication / authorization
    ↓
Data retrieval
    ↓
RAG / search
    ↓
Reranking
    ↓
Prompt / context construction
    ↓
LLM inference
    ↓
Tool calls / agent steps
    ↓
Post-processing
    ↓
Evidence / audit persistence
    ↓
Response
```

Each stage may have a different bottleneck and scaling behavior.

**Advisor challenge:**

> “Which stage limits end-to-end capacity under the target workload?”

## 17.6 Throughput and Concurrency

Throughput and concurrency should not be treated as the same variable.

A useful conceptual relationship is:

```text
Concurrency ≈ Throughput × Average processing time
```

This relationship is a planning approximation, not a substitute for measurement.

As processing time increases, the same throughput can require more concurrent work. Conversely, reducing processing time can reduce the concurrency required to sustain a given throughput.

This is particularly important for LLM workloads where inference duration can vary with model, context size, output length, batching, and system load.

## 17.7 Queueing Is Part of the Architecture

When demand temporarily exceeds processing capacity, work may queue rather than immediately fail.

```text
Demand → Queue → Workers → Results
          ↑
       backlog
```

A queue can absorb bursts, but it does not create infinite capacity.

The advisor should ask:

- What is the maximum acceptable queue depth?
- How long may a job wait?
- What happens when the queue is full?
- Can jobs expire?
- Can jobs be prioritized?
- Can duplicate jobs occur?
- How is backlog recovered after an outage?

For AI-IDSS, queueing can be appropriate for portfolio-wide analysis and periodic scoring while interactive decision support may require bounded latency.

## 17.8 Scale-Up vs Scale-Out

**Scale-up** increases the resources of an instance.

**Scale-out** adds instances or workers.

```text
Scale-up
[ Worker ] → [ Larger Worker ]

Scale-out
[ Worker ] → [ Worker ][ Worker ][ Worker ]
```

Scale-out can be effective when work can be distributed independently. Scale-up may be necessary when a workload has a large shared-memory or accelerator requirement.

Neither is universally superior. The correct choice depends on workload partitionability, state, synchronization, resource limits, and cost.

Azure's architecture guidance notes that scalability is constrained by bottlenecks and synchronization points, and recommends designing for horizontal scaling when the workload supports it. [Azure — Design to scale out](https://learn.microsoft.com/en-us/azure/architecture/guide/design-principles/scale-out)

## 17.9 Identify the Bottleneck

Adding resources does not necessarily increase useful capacity.

```text
          ┌─ CPU
          ├─ GPU / accelerator
Request → ├─ Memory
          ├─ Database
          ├─ Network
          ├─ RAG retrieval
          ├─ External API
          └─ Queue / synchronization
```

A system may appear compute-bound while the real constraint is a database connection pool, external API rate limit, network path, serialized operation, or model-loading time.

**Field rule:**

> **Do not scale the component that is easiest to scale. Scale the constraint that limits the required outcome.**

## 17.10 Amdahl's Law and the Serial Fraction

When part of a workload cannot be parallelized, increasing parallel resources eventually produces diminishing returns.

A simplified form of Amdahl's Law is:

```text
Speedup(N) = 1 / (S + (1 − S) / N)
```

where:

- `S` is the fraction that remains serial;
- `N` is the number of parallel resources.

This is a theoretical model, not a production capacity formula.

Its architectural lesson is important:

> **If a material portion of the workflow remains serial, adding more workers cannot produce proportional end-to-end speedup.**

Therefore identify synchronization, shared-state, serialized tool calls, database contention, and other serial sections before assuming horizontal scaling will solve the problem.

## 17.11 Statelessness and Shared State

Scale-out is easier when service instances can process requests independently.

```text
                 ┌─ Worker A
Request → Router ├─ Worker B
                 └─ Worker C
                       │
                       ↓
                Shared services
```

State may still be required, but it should have an explicit architecture.

Examples include:

- databases;
- object storage;
- caches;
- queues;
- workflow state;
- conversation state;
- model/session state.

Hidden local state can prevent effective scale-out and make failover unpredictable.

**Challenge question:**

> “What state prevents an instance from being replaced by another instance?”

## 17.12 Partitioning and Sharding

Partitioning divides workload or data so that independent resources can process different portions.

Possible partitioning dimensions include:

- portfolio company;
- geography;
- time period;
- document collection;
- tenant;
- workload type;
- request class.

Partitioning can improve scalability but introduces its own risks:

- uneven partitions;
- hotspots;
- cross-partition queries;
- consistency complexity;
- operational complexity;
- rebalancing requirements.

Do not treat partitioning as automatically beneficial. The partition key should reflect actual access and workload patterns.

## 17.13 Caching

Caching can reduce repeated work and improve response time, but cached information has a freshness and correctness cost.

Potential AI-IDSS caches include:

- frequently retrieved documents;
- embeddings;
- search results;
- deterministic intermediate computations;
- model metadata;
- authorization-safe derived data.

For consequential outputs, the advisor must ask:

> “What makes this cached result valid, and when does it become invalid?”

A cache must not bypass authorization or allow stale information to masquerade as current evidence.

## 17.14 Load Balancing

Load balancing distributes requests across available resources.

The architectural objective is not merely equal distribution. It may need to account for:

- resource capability;
- model version;
- tenant isolation;
- locality;
- health;
- request class;
- accelerator type;
- capacity remaining.

A heterogeneous AI environment may therefore require intelligent routing rather than simple round-robin distribution.

## 17.15 Autoscaling

Autoscaling dynamically adjusts resources in response to workload signals.

A typical control loop is:

```text
Metrics
  ↓
Scaling policy
  ↓
Scale decision
  ↓
Resource change
  ↓
New capacity
  ↓
Observed effect
  └──────────────→
```

Autoscaling is not instantaneous. The architecture must account for:

- metric collection delay;
- decision delay;
- provisioning time;
- model-loading time;
- warm-up time;
- accelerator availability;
- scale-in behavior;
- maximum capacity;
- cost.

Azure guidance explicitly warns that autoscaling does not by itself guarantee improved performance and recommends understanding scale-up behavior, limits, and workload design. [Azure Autoscaling Guidance](https://learn.microsoft.com/en-us/azure/architecture/best-practices/auto-scaling)

## 17.16 Scaling AI Models

LLM scaling introduces constraints that ordinary stateless web services may not have.

Consider:

- model memory;
- context length;
- output length;
- concurrent sequences;
- batching;
- accelerator memory;
- model loading time;
- interconnect/network requirements;
- inference scheduling;
- token throughput;
- request priority.

A model that handles ten short requests efficiently may behave differently with ten long-context requests.

Therefore:

> **Capacity must be tested using representative request distributions, not only average token counts.**

## 17.17 RAG Scaling

RAG has at least two different scaling problems:

### Retrieval scaling

```text
Documents → Index → Retrieval → Reranking
```

Questions include:

- index size;
- query volume;
- filtering;
- metadata constraints;
- authorization filtering;
- indexing frequency;
- update rate.

### Generation scaling

```text
Retrieved context → LLM → Response
```

Questions include:

- context size;
- inference time;
- concurrent generation;
- token throughput;
- model capacity.

Scaling retrieval does not automatically scale generation, and vice versa.

## 17.18 Agentic Workload Scaling

Agents can multiply work because one user request may trigger several model calls and tool calls.

```text
1 user request
      ↓
planning
  ↙   ↓   ↘
LLM  tool  retrieval
  ↘   ↓   ↙
   synthesis
      ↓
   response
```

A useful planning variable is therefore:

```text
Work per user request
≈ model calls + tool calls + retrieval operations + downstream work
```

This is an analytical construct, not a universal formula.

The advisor should ask:

- What is the maximum number of steps?
- Can loops terminate safely?
- What tools can become bottlenecks?
- Are tool calls parallelizable?
- What happens when a downstream system is slow?
- Can one user request create uncontrolled fan-out?

## 17.19 Rate Limits and External Dependencies

An enterprise AI system may depend on services outside its direct capacity boundary.

Examples:

- market-data providers;
- ERP APIs;
- email systems;
- research databases;
- model providers;
- identity services.

The AI platform may scale internally while the dependency does not.

```text
AI Platform capacity
        ↓
External dependency limit
        ↓
Effective system capacity
```

**Field rule:**

> **The system's effective capacity is constrained by the critical dependency with the lowest relevant capacity or service guarantee.**

This is an architectural inference that should be validated against the actual dependency contracts and workload.

## 17.20 Performance Testing

Performance should be tested against representative workload conditions.

Useful test types may include:

| Test | Purpose |
|---|---|
| Baseline | Establish normal behavior |
| Load | Measure expected workload |
| Stress | Find failure boundary |
| Spike | Test sudden demand increase |
| Soak | Detect degradation over time |
| Recovery | Test behavior after overload/failure |
| Capacity | Determine maximum useful workload |

Do not report a single benchmark number without its test conditions.

AWS recommends benchmarking and data-driven architectural choices; Google recommends continuous monitoring and optimization rather than one-time performance tuning. citeturn0search13turn0search10

## 17.21 Performance Metrics

Use distributions rather than averages where tail behavior matters.

Typical metrics include:

- p50 latency;
- p95 latency;
- p99 latency;
- throughput;
- queue depth;
- saturation;
- error rate;
- timeout rate;
- resource utilization;
- cache hit rate;
- model token throughput;
- cost per request;
- cost per useful result.

For AI-IDSS, technical metrics should be connected to decision quality.

For example:

```text
Higher throughput
      ≠
More useful decisions
```

A system that processes more requests while producing less reliable evidence is not necessarily an architectural improvement.

## 17.22 Performance vs Reliability vs Cost

Scaling decisions create trade-offs.

```text
              Performance
                 /\
                /  \
               /    \
              /      \
          Cost -------- Reliability
```

The triangle is conceptual, not a mathematical optimization model.

Examples:

- more redundancy may improve reliability but increase cost;
- aggressive autoscaling may reduce overload risk but increase cost and operational variability;
- caching may reduce latency but introduce freshness complexity;
- replication may improve throughput but increase consistency complexity.

Microsoft's Well-Architected guidance explicitly describes trade-offs among performance efficiency, reliability, security, and cost. [Azure Well-Architected — Performance Efficiency Tradeoffs](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/tradeoffs)

## 17.23 Capacity Planning Model

A practical planning model is:

```text
Workload forecast
+ concurrency distribution
+ service objectives
+ resource efficiency
+ scaling behavior
+ failure margin
+ growth scenario
→ capacity requirement
```

Document assumptions:

| Variable | Example evidence |
|---|---|
| Requests/hour | Production measurement or scenario |
| Peak concurrency | Measurement or modeled scenario |
| Request mix | Observed distribution |
| Average processing time | Measurement |
| p95 processing time | Measurement |
| Resource capacity | Benchmark |
| Scale-up time | Test |
| Growth | Explicit assumption |
| Failure margin | Risk decision |

A capacity estimate should be reproducible by another engineer.

## 17.24 Capacity Headroom

Running continuously at theoretical maximum capacity is rarely an adequate production strategy.

Headroom may be needed for:

- traffic bursts;
- resource degradation;
- maintenance;
- failures;
- model changes;
- data growth;
- unexpected request complexity.

The correct amount of headroom is context-dependent.

**Do not invent a universal percentage.** Define the risk being covered and justify the margin with evidence or an explicit assumption.

## 17.25 Scalability Architecture for AI-IDSS

A scalable reference pattern is:

```text
                         AI-IDSS
                            │
                      API / Gateway
                            │
                     Load Balancer
                            │
                  ┌─────────┴─────────┐
                  ↓                   ↓
            Interactive path      Async path
                  │                   │
                  ↓                   ↓
            Orchestrator          Queue
                  │                   │
          ┌───────┼───────┐          ↓
          ↓       ↓       ↓       Worker pool
        RAG     Risk     Tools        │
          │       │       │           ↓
          └───────┼───────┘      Results / audit
                  ↓
             Model services
                  │
            Scalable compute
```

Cross-cutting controls:

**Identity · Authorization · Observability · Evaluation · Governance · Cost · Audit**

The architecture should allow interactive and batch workloads to scale independently where their requirements differ.

## 17.26 Common Scalability Anti-Patterns

### “Just add more servers.”
The bottleneck may be elsewhere.

### “Average latency is fine.”
Tail latency can violate service objectives even when the average looks acceptable.

### “Autoscaling means unlimited scale.”
Every platform and dependency has limits.

### “More concurrency is always better.”
Concurrency can increase contention, queueing, memory use, and tail latency.

### “One benchmark proves scalability.”
Scalability is a behavior across workload and resource changes.

### “Scale the LLM first.”
Retrieval, database, network, or external dependencies may be the actual constraint.

### “Use one capacity number.”
AI workloads often contain materially different request classes.

### “Headroom is always 20%.”
A universal margin is not evidence-based. The margin should reflect the risk being covered.

## 17.27 Technical Challenge Questions

1. What exact workload are we scaling?
2. Which performance objectives must remain satisfied?
3. What is the request mix?
4. What is the peak concurrency?
5. Where is the current bottleneck?
6. What evidence shows that the bottleneck is correctly identified?
7. Does the workload scale horizontally?
8. What state prevents independent workers?
9. What is the scale-up time?
10. What happens during a sudden spike?
11. What happens when maximum capacity is reached?
12. What external dependency limits effective capacity?
13. How does RAG scale independently from generation?
14. How does agent fan-out affect capacity?
15. What performance tests have been run?
16. Are p95/p99 behaviors acceptable?
17. What assumptions drive the capacity model?
18. How much headroom is required and why?
19. What is the cost of additional capacity?
20. What evidence would make us redesign the architecture?

## 17.28 Architecture Review Checklist

### Requirements
- [ ] Performance objectives defined
- [ ] Workload classes defined
- [ ] Peak and burst behavior considered
- [ ] Growth assumptions explicit

### Capacity
- [ ] Capacity model documented
- [ ] Bottleneck identified
- [ ] Headroom rationale documented
- [ ] External dependency limits included

### Scalability
- [ ] Scale-up/scale-out decision justified
- [ ] Statelessness or state architecture understood
- [ ] Partitioning considered where relevant
- [ ] Autoscaling behavior tested

### AI workload
- [ ] Model workload measured
- [ ] RAG retrieval and generation capacity separated
- [ ] Agent fan-out considered
- [ ] Context/request-size distribution measured

### Testing
- [ ] Baseline test completed
- [ ] Load test completed
- [ ] Stress/spike behavior tested where relevant
- [ ] Recovery behavior tested
- [ ] Tail latency reviewed

### Economics
- [ ] Scaling cost understood
- [ ] Cost/performance trade-off documented
- [ ] Cost per useful result considered

### AI-IDSS
- [ ] Performance degradation does not silently change decision semantics
- [ ] Evidence freshness remains within requirement
- [ ] Human decision boundary preserved

## 17.29 Evidence Discipline

| Statement | Classification |
|---|---|
| A workload needs measurable performance objectives | **Technical principle / industry guidance** |
| Horizontal scaling can increase aggregate capacity when work is partitionable | **Technical principle; workload-dependent** |
| Amdahl's Law limits speedup from parallelization when a serial fraction remains | **Theory** |
| Autoscaling has reaction and provisioning delays | **Technical principle; measure for the platform** |
| A specific architecture supports 10,000 requests/minute | **Claim requiring benchmark evidence** |
| A 20% capacity margin is sufficient | **Unsupported unless justified by evidence/assumption** |
| A specific cloud provider is the best scaling platform | **Recommendation requiring comparative evidence** |
| More compute will solve the bottleneck | **Hypothesis requiring measurement** |

Cloud-provider architecture frameworks are useful technical guidance, but they are not proof that a particular configuration is optimal for this organization's workload. Vendor benchmarks should therefore be treated as evidence under stated conditions, not universal performance guarantees.

## 17.30 What Would Change Our Mind?

Change the scalability architecture if evidence shows that:

- the actual bottleneck is different from the assumed bottleneck;
- horizontal scaling produces poor efficiency because of shared state or synchronization;
- scale-up materially reduces cost or complexity;
- autoscaling cannot react quickly enough to required demand changes;
- external dependencies dominate effective capacity;
- RAG or database performance dominates model inference;
- agent fan-out creates unacceptable cost or latency;
- the workload distribution differs materially from the capacity model;
- required performance can be met with a substantially simpler architecture.

The advisor should remain neutral about scale-out, scale-up, autoscaling, caching, queues, cloud providers, and model platforms until workload evidence supports the choice.

## 17.31 Field Rule

> **Scale the system against a defined workload and service objective—not against a server count, user count, or vendor benchmark. Find the bottleneck, measure the behavior, expose the assumptions, and scale only where it improves the required outcome.**

For AI-IDSS:

> **A scalable AI system is not one that can consume more resources. It is one that can absorb changing workload while preserving the quality, latency, reliability, security, evidence, and economics on which the decision system depends.**
