# 18. Reliability

## 18.1 Why Reliability Is an Architecture Property

Reliability is not simply uptime. A reliable workload should perform its intended function correctly and consistently when expected, and it should be operated and tested throughout its lifecycle. AWS uses this definition in its Well-Architected Reliability pillar. [AWS Well-Architected — Reliability](https://docs.aws.amazon.com/wellarchitected/2025-02-25/framework/reliability.html)

NIST's cyber-resiliency guidance extends the engineering question: trustworthy systems should be able to anticipate, withstand, recover from, and adapt to adverse conditions. [NIST SP 800-160 Vol. 2 Rev. 1](https://csrc.nist.gov/pubs/sp/800/160/v2/r1/final)

For an AI-IDSS, this creates a stronger advisor question:

> **Can the system continue to provide a trustworthy decision-support function when components, dependencies, data, models, or operating conditions fail?**

## 18.2 Reliability, Availability, Resilience

These concepts should not be treated as synonyms.

- **Availability:** whether the service is accessible when required.
- **Reliability:** whether the workload performs its intended function correctly and consistently when expected.
- **Resilience:** the ability to withstand disruption and recover or adapt while preserving required outcomes.

A system can be highly available yet unreliable if it returns incorrect or stale results. It can also be reliable under normal conditions but poorly resilient if a dependency failure causes prolonged interruption.

**Field rule:**

> **For AI-IDSS, availability is necessary but not sufficient for reliability.**

## 18.3 Start With the Required Function

Reliability requirements should follow the business function.

| Function | Reliability question |
|---|---|
| Risk alert | Can the alert be generated correctly within the required window? |
| Portfolio refresh | Can the required data be processed completely and consistently? |
| Evidence retrieval | Can authorized evidence be retrieved without silently omitting critical sources? |
| RD dashboard | Can the interface distinguish current, stale, failed, and unavailable information? |
| Recommendation | Can the system identify when evidence is insufficient for a trustworthy recommendation? |

Do not begin with a generic availability target and assume the problem is solved.

## 18.4 Failure Is a Design Input

Distributed systems contain many possible failure modes: infrastructure failure, network latency, dependency outage, capacity exhaustion, software defects, bad configuration, corrupted data, expired credentials, model failure, and operational error.

AWS explicitly treats failure management, fault isolation, recovery, and reliability testing as core reliability practices. [AWS Reliability Pillar — Failure Management](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/failure-management.html)

The advisor should therefore ask:

> “What happens when this component fails?”

before asking:

> “How do we make this component highly available?”

## 18.5 Dependency Mapping

Map the dependency chain before designing redundancy.

```text
AI-IDSS
   ↓
Gateway
   ↓
Orchestrator
   ├── Identity service
   ├── Data platform
   ├── Search / RAG
   ├── Risk model
   ├── LLM provider
   ├── Portfolio systems
   └── Audit store
```

For each dependency record:

- criticality;
- failure modes;
- timeout behavior;
- retry behavior;
- service objective;
- fallback;
- data implications;
- recovery method;
- ownership;
- contractual dependency where relevant.

A system's reliability cannot be assessed from one component in isolation.

## 18.6 Single Points of Failure

A single point of failure (SPOF) is a component whose failure can cause unacceptable system impact because there is no adequate alternative path.

Examples may include:

- one database instance;
- one identity dependency;
- one model provider;
- one integration gateway;
- one region;
- one undocumented operational procedure.

But redundancy is not automatically justified.

**Advisor question:**

> “What failure are we paying to tolerate, and what business consequence does that failure have?”

## 18.7 Fault Isolation

Fault isolation limits the impact of a failure to a defined boundary. AWS recommends fault-isolation boundaries and bulkhead architectures to prevent one failure from affecting unrelated components. [AWS — Fault Isolation](https://docs.aws.amazon.com/wellarchitected/2025-02-25/framework/rel-10.html)

```text
                 AI-IDSS
                    │
        ┌───────────┼───────────┐
        ↓           ↓           ↓
     RAG pool    Risk pool    Tools pool
        │           │           │
      failure     failure     failure
        ↓           ↓           ↓
    contained    contained    contained
```

For AI-IDSS, isolation can also be organizational or data-related. Failure in one portfolio company's processing should not silently corrupt or contaminate another company's decision-support context.

## 18.8 Graceful Degradation

When a non-critical component fails, the system may continue with reduced capability rather than failing completely.

Examples:

```text
Primary LLM unavailable
        ↓
Alternative approved model
        ↓
Reduced capability
        ↓
Explicitly marked output
```

Or:

```text
Live market feed unavailable
        ↓
Last known data
        ↓
Clearly marked stale
        ↓
Restricted decision use
```

Graceful degradation is only safe when the degraded behavior has defined semantics.

> **Never silently substitute a materially different source, model, or data freshness level and present the result as equivalent.**

## 18.9 Fail Fast, Timeouts, and Backpressure

A dependency that waits indefinitely can consume resources and propagate failure through the system.

Useful controls include:

- bounded timeouts;
- queue limits;
- request throttling;
- concurrency limits;
- cancellation;
- backpressure;
- controlled retries.

AWS recommends timeouts, throttling, retry control, bounded queues, and graceful degradation when designing distributed interactions. [AWS — Distributed-System Failure Mitigation](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/design-interactions-in-a-distributed-system-to-mitigate-or-withstand-failures.html)

## 18.10 Retry Is Not Reliability by Itself

Retries can recover transient failures, but uncontrolled retries can amplify an incident.

```text
Request
   ↓
Dependency fails
   ↓
Retry
   ↓
Dependency remains overloaded
   ↓
More retries
   ↓
Failure amplification
```

Use retries only where appropriate and define:

- retryable errors;
- maximum attempts;
- backoff;
- jitter where appropriate;
- total deadline;
- idempotency requirements.

**Challenge question:**

> “What happens if every caller retries simultaneously?”

## 18.11 Circuit Breakers and Dependency Protection

A circuit breaker can prevent repeated calls to a failing dependency after defined failure conditions.

Conceptually:

```text
Healthy → Open-on-failure → Reject / fallback
              ↓
          recovery test
              ↓
           Healthy
```

The mechanism is useful only when failure semantics and fallback behavior are understood.

Do not add circuit breakers as a generic pattern without knowing what should happen when the circuit opens.

## 18.12 Redundancy and Failover

Redundancy provides alternative resources or paths. Failover moves work to an available alternative after a failure.

AWS recommends failing over to healthy resources and explicitly testing failover designs. [AWS — Fail Over to Healthy Resources](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_withstand_component_failures_failover2good.html)

Possible patterns include:

- active/passive;
- active/active;
- warm standby;
- backup and restore;
- multi-zone;
- multi-region.

No pattern is universally superior. Cost, recovery time, data consistency, operational complexity, and failure scope must be considered.

## 18.13 Backup Is Not Recovery

A backup exists only if it can be restored successfully within the required recovery objectives.

For important data, test:

```text
Backup
  ↓
Restore
  ↓
Validate
  ↓
Reconstruct service
  ↓
Verify correctness
```

AWS specifically recommends periodic recovery of data to verify backup integrity and recovery processes. [AWS Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/2025-02-25/framework/rel-10.html)

**Advisor question:**

> “Show me the last successful restore test, not merely the backup dashboard.”

## 18.14 RTO and RPO

Two common recovery objectives are:

- **RTO — Recovery Time Objective:** the target time within which service should be restored after disruption.
- **RPO — Recovery Point Objective:** the acceptable amount of data loss measured in time or recovery point terms.

Example:

| Workload | RTO | RPO |
|---|---:|---:|
| Interactive AI-IDSS | 30 min | 15 min |
| Portfolio batch scoring | 4 h | 1 h |
| Historical analytics | 24 h | 24 h |

These values are illustrative only. Actual objectives must come from business requirements and risk decisions.

## 18.15 Disaster Recovery Strategy

A DR strategy should be selected against recovery objectives, not by copying another organization's architecture.

Possible strategies include:

```text
Backup / Restore
      ↓
Standby
      ↓
Warm Standby
      ↓
Active / Active
```

AWS recommends defined recovery strategies that correspond to workload recovery objectives. [AWS — Recovery Strategies](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_planning_for_recovery_disaster_recovery.html)

**Advisor question:**

> “What RTO/RPO requirement justifies this DR architecture?”

## 18.16 Data Reliability

AI-IDSS reliability depends on data reliability.

Potential data failures include:

- missing records;
- duplicate records;
- stale feeds;
- schema changes;
- incorrect mappings;
- corrupted files;
- incomplete ingestion;
- unauthorized data access;
- inconsistent snapshots.

A technically healthy application can still produce an unreliable recommendation if its evidence is incomplete or stale.

## 18.17 Model and LLM Reliability

Model availability and model correctness are different dimensions.

Possible failures include:

- model endpoint unavailable;
- timeout;
- malformed output;
- unsupported tool call;
- context truncation;
- retrieval failure;
- model-version behavior change;
- safety/policy rejection;
- degraded provider service.

The architecture should distinguish:

```text
Model unavailable
      ≠
Model available but unreliable output
```

The second case requires evaluation and output controls, not merely infrastructure failover.

## 18.18 Semantic Reliability

This is particularly important for AI-IDSS.

A system may be technically operational while the meaning of its output is compromised.

```text
Infrastructure healthy
        ↓
API healthy
        ↓
LLM responds
        ↓
RAG returns documents
        ↓
BUT evidence is stale / incomplete
        ↓
Decision-support reliability fails
```

Therefore define conditions under which the system must say:

> **“Insufficient evidence — do not issue this recommendation.”**

This is an architectural requirement, not merely a prompt instruction.

## 18.19 Agent Reliability

Agents introduce additional failure paths because one request can produce multiple model and tool calls.

```text
User request
   ↓
Planner
   ├── Tool A
   ├── Tool B
   ├── Retrieval
   └── Model call
         ↓
      synthesis
```

Reliability controls should include:

- maximum steps;
- execution deadlines;
- tool-specific timeouts;
- authorization boundaries;
- retry limits;
- duplicate-action protection;
- human approval for consequential actions;
- state recovery.

A failed tool call must not automatically be interpreted as successful completion.

## 18.20 Observability and Reliability

Monitor the components required to detect and diagnose failures.

Useful signals include:

- availability;
- latency distributions;
- error rates;
- dependency failures;
- queue depth;
- saturation;
- fallback rate;
- stale-data rate;
- model/version distribution;
- failed retrievals;
- recovery time;
- decision-output rejection rate.

Observability should support the question:

> “Can we determine whether the AI-IDSS is trustworthy right now?”

## 18.21 Recovery Automation

Automated recovery can reduce recovery time and operational error, but automation itself must be designed and tested.

AWS recommends tested, observable, reproducible recovery automation and warns against recovery procedures that depend on failed components or uncontrolled automation. [AWS — Automate Recovery](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_planning_for_recovery_auto_recovery.html)

For AI-IDSS, recovery automation should have:

- explicit trigger conditions;
- bounded scope;
- observable actions;
- rollback/abort capability;
- post-recovery validation.

## 18.22 Reliability Testing

Reliability claims require evidence.

Useful tests include:

| Test | Question |
|---|---|
| Component failure | Does the service recover? |
| Dependency outage | Does failure remain contained? |
| Load saturation | What happens at capacity? |
| Network degradation | Are timeouts and retries safe? |
| Data restore | Can data actually be recovered? |
| Failover | Does the alternative path work? |
| Recovery | Can the system return to normal state? |
| Model outage | Does the AI-IDSS degrade safely? |
| Stale data | Does the system prevent misleading output? |
| Agent/tool failure | Does the workflow stop or recover correctly? |

> **Untested recovery is an assumption, not demonstrated reliability.**

## 18.23 Reliability vs Cost

Reliability has economic trade-offs.

```text
More redundancy
      ↓
Higher cost
      ↓
Potentially lower failure impact
```

But redundancy should be targeted at meaningful risks.

For example, making a low-criticality batch process active/active across regions may be unjustified if its business RTO already permits recovery from backup.

**Recommendation:** Spend reliability budget where failure consequence justifies it.

## 18.24 AI-IDSS Reliability Architecture

```text
                         AI-IDSS
                            │
                     Decision Gateway
                            │
              ┌─────────────┴─────────────┐
              ↓                           ↓
       Interactive path              Async path
              │                           │
              ↓                           ↓
        Orchestrator                 Queue / Workers
              │                           │
      ┌───────┼────────┐                  │
      ↓       ↓        ↓                  ↓
     RAG    Risk     LLM/Tools       Batch analysis
      │       │        │                  │
      └───────┼────────┘                  │
              ↓                           ↓
       Evidence / Audit / State Store
                    │
                    ↓
             Reliability Controls
       Timeout · Retry · Isolation · Failover
       Monitoring · Recovery · Validation
```

Critical principle:

> **The reliability layer must be able to distinguish “no result,” “degraded result,” and “trustworthy result.”**

## 18.25 Common Reliability Anti-Patterns

### “99.9% uptime means reliable.”
Availability does not prove correctness or evidence quality.

### “We have backups, so DR is solved.”
Restore capability must be tested.

### “Just retry.”
Retries can amplify failure.

### “Use active/active everywhere.”
Redundancy must correspond to recovery requirements.

### “The LLM is available, so AI is available.”
RAG, identity, data, tools, and orchestration can still fail.

### “Fallback is invisible.”
Fallback can materially change output meaning.

### “Human operators can recover it.”
A recovery procedure that has never been exercised is not demonstrated capability.

### “The system is healthy because all dashboards are green.”
Infrastructure health does not prove semantic reliability.

## 18.26 Technical Challenge Questions

1. What exact function must remain reliable?
2. What constitutes an unacceptable failure?
3. What are the critical dependencies?
4. Which components are SPOFs?
5. What are the fault-isolation boundaries?
6. What happens when the primary LLM is unavailable?
7. What happens when RAG retrieval fails?
8. What happens when data is stale or incomplete?
9. What happens when a tool call fails halfway through an agent workflow?
10. What are the timeout and retry policies?
11. Can retries amplify the incident?
12. What is the fallback semantics?
13. What are the RTO and RPO requirements?
14. What recovery strategy satisfies those requirements?
15. When was the last restore test?
16. When was failover last tested?
17. How is semantic reliability detected?
18. What conditions cause the AI-IDSS to refuse a recommendation?
19. Can recovery automation be aborted safely?
20. What evidence would make us reject the reliability architecture?

## 18.27 Architecture Review Checklist

### Reliability requirements
- [ ] Required function defined
- [ ] Failure consequences defined
- [ ] Availability objective defined where applicable
- [ ] RTO/RPO defined where applicable

### Dependencies
- [ ] Critical dependencies mapped
- [ ] SPOFs identified
- [ ] Failure domains identified
- [ ] Dependency limits understood

### Failure handling
- [ ] Timeouts defined
- [ ] Retry policy defined
- [ ] Backpressure/queue limits defined
- [ ] Circuit/failure isolation considered
- [ ] Graceful degradation defined

### Recovery
- [ ] Backup tested
- [ ] Restore tested
- [ ] Failover tested
- [ ] Recovery automation observable
- [ ] Recovery validation defined

### AI reliability
- [ ] Model failure modes identified
- [ ] RAG failure modes identified
- [ ] Tool/agent failure modes identified
- [ ] Model version traceable
- [ ] Stale/incomplete evidence detected
- [ ] Refusal/degraded-output semantics defined

### AI-IDSS
- [ ] No-result vs degraded-result vs trustworthy-result distinguished
- [ ] Material outputs have evidence path
- [ ] Human decision boundary preserved
- [ ] Reliability incidents can be audited

## 18.28 Evidence Discipline

| Statement | Classification |
|---|---|
| Reliability includes performing the intended function correctly and consistently | **Technical evidence** |
| NIST cyber-resiliency includes anticipating, withstanding, recovering, and adapting | **Technical evidence** |
| Fault isolation limits failure impact | **Technical evidence / architectural principle** |
| Retries can amplify overload | **Distributed-systems reasoning; validate for workload** |
| Active/active is preferable | **Not a universal fact; recommendation only when requirements justify it** |
| Specific RTO/RPO | **Requirement / assumption; must be organization-specific** |
| Semantic reliability | **Advisor architectural construct derived from system function and evidence requirements** |
| Refusal under insufficient evidence | **Recommendation for consequential AI-IDSS use cases** |

The book should not present a particular cloud provider, database, orchestration platform, or model provider as inherently reliable. Reliability is a property of the architecture, workload, controls, operations, and evidence.

## 18.29 What Would Change Our Mind?

Change the reliability architecture if evidence shows that:

- the actual business RTO/RPO is materially different;
- a dependency is more critical than originally assumed;
- failover causes unacceptable data inconsistency;
- redundancy cost is disproportionate to failure consequence;
- recovery tests fail to meet objectives;
- fallback materially changes decision quality;
- stale data can produce unacceptable recommendations;
- model/provider behavior changes the required failure boundary;
- automated recovery creates greater risk than controlled manual intervention.

## 18.30 Field Rule

> **Design for failure, test recovery, and make degraded states explicit.**

For AI-IDSS:

> **A reliable decision-support system must know not only how to produce an answer, but when it should not produce one.**
