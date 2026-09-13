# Evidence Review — Chapter 18 Reliability

## Review Objective

This review checks Chapter 18 against the book's evidence standard: authoritative technical sources should be distinguished from architectural inference, recommendations, assumptions, and AI-IDSS-specific constructs.

## 1. Core Reliability Definition

**Claim:** Reliability concerns a workload's ability to perform its intended function correctly and consistently when expected.

**Classification:** Technical evidence.

**Primary basis:** AWS Well-Architected Reliability Pillar.

**Editorial treatment:** Keep the distinction between reliability and simple availability. The chapter's wording is consistent with the source. [AWS Well-Architected — Reliability](https://docs.aws.amazon.com/wellarchitected/2025-02-25/framework/reliability.html)

## 2. Cyber Resilience

**Claim:** NIST cyber-resiliency engineering addresses systems that can anticipate, withstand, recover from, and adapt to adverse conditions.

**Classification:** Technical evidence.

**Primary basis:** NIST SP 800-160 Vol. 2 Rev. 1.

**Editorial treatment:** This is used as the systems-engineering foundation for resilience, not as a claim that every AI system requires every NIST construct. NIST explicitly allows organizations to select and adapt constructs to their technical, operational, and threat environments. [NIST SP 800-160 Vol. 2 Rev. 1](https://csrc.nist.gov/pubs/sp/800/160/v2/r1/final)

## 3. Fault Isolation

**Claim:** Fault isolation limits the impact of a failure to a defined boundary.

**Classification:** Technical evidence / architectural principle.

**Primary basis:** AWS Well-Architected Reliability guidance.

**Editorial treatment:** The chapter correctly avoids claiming that a particular isolation topology is universally optimal. [AWS — Fault Isolation](https://docs.aws.amazon.com/wellarchitected/2025-02-25/framework/rel-10.html)

## 4. Graceful Degradation

**Claim:** Distributed-system designs can use graceful degradation, throttling, bounded retries, queues, and timeouts to reduce failure propagation.

**Classification:** Technical evidence / established distributed-systems practice.

**Primary basis:** AWS Reliability Pillar distributed-interaction guidance.

**Editorial treatment:** Keep these as mechanisms, not guarantees. Whether they improve a particular workload must be evaluated against failure modes and service objectives. [AWS — Distributed-System Failure Mitigation](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/design-interactions-in-a-distributed-system-to-mitigate-or-withstand-failures.html)

## 5. Retry Amplification

**Claim:** Uncontrolled retries can amplify an incident.

**Classification:** Distributed-systems reasoning supported by established reliability practice.

**Editorial treatment:** The chapter intentionally does not give a universal retry count or backoff value. Retryability, idempotency, deadlines, and dependency behavior are workload-specific.

## 6. Failover

**Claim:** A reliable architecture should define how traffic or work moves to healthy resources after failure where the recovery requirement warrants it.

**Classification:** Technical evidence / architecture practice.

**Primary basis:** AWS REL11 guidance.

**Editorial treatment:** Keep the explicit warning that failover must be tested. [AWS — Fail Over to Healthy Resources](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_withstand_component_failures_failover2good.html)

## 7. Backup and Restore

**Claim:** Backup existence does not demonstrate recoverability; restoration should be tested.

**Classification:** Technical evidence / operational reliability practice.

**Primary basis:** AWS reliability guidance recommends periodic recovery to verify backup integrity and recovery processes.

**Editorial treatment:** The chapter's “backup is not recovery” phrasing is an editorial field rule, while the underlying restore-testing practice is evidence-backed. [AWS Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/2025-02-25/framework/rel-10.html)

## 8. RTO and RPO

**Claim:** Recovery architecture should be evaluated against defined recovery objectives such as RTO and RPO.

**Classification:** Technical/operational planning concept.

**Editorial treatment:** The chapter deliberately uses illustrative values only and states that actual objectives must be organization-specific. No universal RTO/RPO values are asserted.

## 9. Disaster Recovery Strategy

**Claim:** Backup/restore, standby, warm standby, and active/active represent different recovery strategies with different trade-offs.

**Classification:** Technical architecture evidence/practice.

**Primary basis:** AWS REL13 recovery guidance.

**Editorial treatment:** The chapter correctly avoids ranking these strategies universally. [AWS — Recovery Strategies](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_planning_for_recovery_disaster_recovery.html)

## 10. Automated Recovery

**Claim:** Automated recovery can reduce recovery time and operational error when it is tested, observable, reproducible, and safely bounded.

**Classification:** Technical evidence / operational recommendation.

**Primary basis:** AWS REL13-BP05.

**Editorial treatment:** The chapter includes abort/validation concepts because recovery automation can itself create risk. [AWS — Automate Recovery](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_planning_for_recovery_auto_recovery.html)

## 11. AI-Specific Reliability

### Model availability

**Classification:** Technical reasoning.

A model endpoint can fail independently from the application, retrieval layer, identity system, or data platform. The chapter therefore treats model availability as one dependency rather than as a synonym for AI availability.

### Semantic reliability

**Classification:** Advisor architectural construct / inference.

The phrase “semantic reliability” is intentionally not presented as a universal standards-defined metric. It describes a specific advisory concern: the system may remain technically operational while producing an output whose evidence, freshness, provenance, or meaning no longer satisfies the required decision function.

This distinction follows from the chapter's reliability definition and the AI-IDSS architecture. It should remain labeled as an architectural construct rather than an established universal term.

### Refusal under insufficient evidence

**Classification:** Recommendation.

The chapter recommends explicit refusal/degraded-result semantics for consequential decision support when required evidence is unavailable or stale. This is not asserted as a universal standard requirement.

## 12. Agent Reliability

**Claim:** Agentic workflows introduce multiple model/tool/retrieval execution paths and therefore additional failure modes.

**Classification:** Architectural inference.

**Evidence discipline:** The chapter does not claim that agents are inherently less reliable. It identifies additional execution paths that should be bounded and tested.

## 13. Reliability vs Cost

**Claim:** Redundancy and recovery capability involve cost and operational complexity.

**Classification:** Architecture/economic reasoning.

**Editorial treatment:** No universal “correct” redundancy level is claimed. The recommendation is to relate reliability investment to failure consequence and recovery requirements.

## 14. Claims Deliberately Avoided

The chapter does **not** assert that:

- multi-region is always required;
- active/active is always superior;
- Kubernetes or a specific platform is required;
- retries always improve reliability;
- automation is always safer than manual recovery;
- cloud infrastructure is inherently reliable;
- a particular LLM provider is more reliable in every workload;
- 99.9% availability is a universal target;
- one RTO/RPO pair applies to all AI-IDSS workloads;
- fallback models are semantically equivalent to primary models;
- uptime proves decision quality.

These exclusions are intentional.

## 15. Evidence Hierarchy for Reliability Reviews

When reviewing a proposed reliability architecture, prefer evidence in this order:

1. measured behavior under representative failure tests;
2. documented service guarantees and architecture documentation;
3. authoritative standards and government guidance;
4. validated operational history;
5. controlled experiments;
6. vendor benchmark claims with transparent conditions;
7. architectural inference;
8. assumptions.

The lower levels should never silently be presented as higher-level evidence.

## 16. Advisor Review Checklist

Before accepting a reliability architecture, ask:

- What exact function must remain reliable?
- What failure conditions have been modeled?
- What dependencies can fail independently?
- Which failure domains are isolated?
- What are the RTO/RPO requirements?
- Has backup restoration actually been tested?
- Has failover actually been tested?
- What happens when the model provider fails?
- What happens when retrieval returns incomplete evidence?
- What happens when data is stale?
- What happens when an agent tool partially succeeds?
- What does fallback mean semantically?
- When does the system refuse to produce a recommendation?
- Can we distinguish unavailable, degraded, and trustworthy output?
- What evidence would make us reject the architecture?

## Bottom Line

Reliability should be evaluated as a property of the **whole decision-support system**, not merely its infrastructure uptime. NIST provides the resilience engineering foundation; AWS provides concrete reliability practices such as fault isolation, failure handling, recovery strategies, and tested recovery. The AI-IDSS-specific concepts in this chapter—especially semantic reliability and explicit degraded/no-result states—are architectural recommendations derived from those foundations, not universal standards claims.
