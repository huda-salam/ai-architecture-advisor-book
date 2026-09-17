# AI Technology & Architecture Advisor

## Advisor Case & Question Navigator

> **Read linearly if you want to learn. Navigate by case when you need to act.**

This is the handbook's fast-access layer for real advisory situations. It reduces search time without replacing technical reasoning.

For every case, follow:

**Situation → Immediate Questions → Evidence → Technical Depth → Failure / Trade-offs → Technical Position → Recommendation**

> **The shortcut must reduce search time, not reduce thinking.**

---

## How to Use the Navigator

Start from the situation that most closely resembles the decision in front of you. Do not assume that the case's linked chapter contains the answer; use it to identify the investigation path.

### Decision Stage

The same technology can require different questions at different stages. Use the lightest stage label that describes the current decision:

- **Exploring** — deciding whether the problem merits investigation.
- **Selecting** — comparing solution or technology options.
- **Architecture approval** — deciding whether the proposed architecture is acceptable.
- **Piloting** — testing assumptions before broader commitment.
- **Production approval** — deciding whether the system is ready for operational use.
- **Operating** — assessing a system already in service.
- **Incident** — investigating an observed failure or material deviation.
- **Replacement / Exit** — assessing migration, substitution, or dependency reduction.

The stage is a routing aid, not a decision rule.

### Entry Families

For rapid retrieval, cases can be grouped into seven families:

| Family | Typical question |
|---|---|
| Suitability | Should we use AI? |
| Architecture | How should the system be shaped? |
| Technology | Which technical approach is appropriate? |
| Evidence | Can we trust this claim or result? |
| Assurance | Is it secure, reliable, auditable, and production-ready? |
| Economics / Dependency | What will it cost, and how reversible is it? |
| Incident / Change | Something changed or failed. What do we investigate? |

---

## 1. AI Is Proposed for a Business Problem

**Stage:** Exploring / Selecting

**Ask:** What problem are we solving? Why AI? What is the credible non-AI alternative? What incremental value does AI provide? What autonomy is actually required?

**Evidence:** business objective, baseline, alternatives, measurable value, failure consequences, human boundary, cost assumptions.

**Go to:** [5A — AI Suitability & Opportunity](./chapters/05a-ai-suitability-opportunity) · [6A — From AI Opportunity to AI Solution](./chapters/06a-from-ai-opportunity-to-ai-solution) · [7 — Architecture Decision Framework](./chapters/07-architecture-decisions)

**Red flag:** “AI is obviously needed.” → Compared with what?

---

## 2. “We Need an LLM”

**Stage:** Exploring / Selecting

**Ask:** Why an LLM rather than conventional software, rules, analytics, or another AI approach? What task requires generative capability? What must remain deterministic?

**Evidence:** task definition, baseline, capability requirements, knowledge sources, quality targets, latency/throughput, security, governance, cost.

**Go to:** [8 — AI Architecture Fundamentals](./chapters/08-ai-architecture-fundamentals) · [9 — Enterprise LLM Architecture](./chapters/09-enterprise-llm-architecture) · [30 — Model Selection](./chapters/30-model-selection) · [31 — Model Evaluation](./chapters/31-model-evaluation)

**Red flag:** Model capability does not establish that the system should delegate the task to the model.

---

## 3. RAG Is Proposed

**Stage:** Selecting / Architecture approval / Piloting

**Ask:** What knowledge problem does RAG solve? What is authoritative? How is retrieval evaluated? How is authorization enforced? What happens when retrieval is incomplete, stale, or wrong?

**Evidence:** source authority, freshness, indexing design, retrieval evaluation, authorization, evidence/citation design, stale-data behaviour, cache/log controls.

**Go to:** [10 — RAG Architecture](./chapters/10-rag-architecture) · [14 — Data Governance & Lineage](./chapters/14-data-governance-lineage) · [28 — Explainability & Evidence](./chapters/28-explainability-evidence) · [46 — AI Evaluation & Testing Architecture](./chapters/46-ai-evaluation-testing-architecture)

**Red flags:** “RAG eliminates hallucination.” · “Retrievable means authorized.” · “A citation proves correctness.”

---

## 4. An AI Agent Is Proposed

**Stage:** Selecting / Architecture approval / Piloting

**Ask:** Why an agent instead of a deterministic workflow? What actions and tools can it invoke? What state/memory does it retain? Who authorizes actions? Can actions be stopped, reversed, replayed, and audited?

**Evidence:** action inventory, tool permissions, identity, authorization enforcement, approval gates, memory/state, retries, rollback/compensation, audit trail, adversarial testing.

**Go to:** [11 — Agentic Architecture](./chapters/11-agentic-architecture) · [19 — AI Security Model](./chapters/19-ai-security-model) · [20 — Identity & Access Control](./chapters/20-identity-access-control) · [29 — Human Decision Boundary](./chapters/29-human-decision-boundary) · [40 — Production Readiness](./chapters/40-production-readiness) · [46 — AI Evaluation & Testing Architecture](./chapters/46-ai-evaluation-testing-architecture)

**Red flag:** Human approval is not itself an authorization mechanism.

---

## 5. A Vendor Says “Our Benchmark Is 95%”

**Stage:** Selecting / Due diligence / Production approval

**Ask:** What was measured? On which dataset? Against which baseline? Is it representative? Which errors remain? Was it independently validated? What does the result mean operationally?

**Evidence:** dataset, methodology, task definition, baseline, uncertainty, error analysis, representativeness, independent validation, production evidence.

**Go to:** [31 — Model Evaluation](./chapters/31-model-evaluation) · [37 — AI Risk Framework](./chapters/37-ai-risk-framework) · [38 — Technical Due Diligence](./chapters/38-technical-due-diligence) · [46 — AI Evaluation & Testing Architecture](./chapters/46-ai-evaluation-testing-architecture)

**Red flag:** A benchmark is evidence about a defined evaluation, not automatically evidence of production readiness.

---

## 6. An Architecture Is Being Reviewed

**Stage:** Architecture approval

**Ask:** What requirements and constraints drive it? Where are trust boundaries? What fails first? Which responsibilities are deterministic versus probabilistic? Where are identity, authorization, data, evidence, audit, and recovery controls enforced? Which dependencies are difficult to reverse?

**Evidence:** architecture diagram, request flows, requirements/NFRs, trust boundaries, failure modes, SLOs, security controls, dependency inventory, cost, recovery/rollback.

**Go to:** [7 — Architecture Decision Framework](./chapters/07-architecture-decisions) · [8 — AI Architecture Fundamentals](./chapters/08-ai-architecture-fundamentals) · [15 — Cloud Architecture](./chapters/15-cloud-architecture) · [16 — Compute & Model Deployment](./chapters/16-compute-model-deployment) · [39 — AI Architecture Review](./chapters/39-ai-architecture-review)

---

## 7. Security Is Being Questioned

**Stage:** Architecture approval / Production approval / Operating

**Ask:** What exactly is protected? Against which threats? Where is the trust boundary? Who can access data, models, tools, prompts, outputs, and logs? Is authorization enforced independently of the model?

**Evidence:** threat model, identity/access controls, data flows, secrets handling, tool/prompt boundaries, retrieval authorization, monitoring, incident response, security testing.

**Go to:** [19 — AI Security Model](./chapters/19-ai-security-model) · [20 — Identity & Access Control](./chapters/20-identity-access-control) · [21 — Data Protection](./chapters/21-data-protection) · [22 — AI-Specific Threats](./chapters/22-ai-specific-threats) · [37 — AI Risk Framework](./chapters/37-ai-risk-framework)

**Red flags:** “Cloud is inherently secure.” · “Private means secure.” · “Self-hosting eliminates security risk.”

---

## 8. Performance or Scalability Is Claimed

**Stage:** Selecting / Piloting / Production approval / Operating

**Ask:** What workload? What concurrency, latency, throughput, availability, and quality requirements? What is the bottleneck? What happens at peak load and when capacity is exhausted?

**Evidence:** representative workload, concurrency profile, latency distribution, throughput, capacity model, utilization, scaling behaviour, failure margins, measured cost.

**Go to:** [16 — Compute & Model Deployment](./chapters/16-compute-model-deployment) · [17 — Scalability & Performance](./chapters/17-scalability-performance) · [18 — Reliability](./chapters/18-reliability) · [35 — Cost & Performance Optimization](./chapters/35-cost-performance-optimization)

**Red flag:** Parameter count alone is not a capacity model.

---

## 9. Cloud vs Self-Hosted Is Being Debated

**Stage:** Selecting / Architecture approval

**Ask:** Which controls are required? Which party operates each control? What threat model justifies the choice? What evidence supports the security and operational claims?

**Evidence:** control requirements, responsibility boundary, residency, identity, encryption, network, availability, recovery, TCO, portability.

**Go to:** [15 — Cloud Architecture](./chapters/15-cloud-architecture) · [19 — AI Security Model](./chapters/19-ai-security-model) · [20 — Identity & Access Control](./chapters/20-identity-access-control) · [38 — Technical Due Diligence](./chapters/38-technical-due-diligence)

---

## 10. A Solution Is Presented as “Cheap”

**Stage:** Selecting / Architecture approval / Operating

**Ask:** Cheap relative to what? Under which workload? Are engineering, operations, data, network, observability, support, migration, and exit costs included? What happens as volume grows?

**Evidence:** unit economics, workload assumptions, infrastructure costs, engineering effort, operations, utilization, migration/exit cost, sensitivity analysis.

**Go to:** [34 — AI TCO](./chapters/34-ai-tco) · [35 — Cost & Performance Optimization](./chapters/35-cost-performance-optimization) · [36 — Vendor Dependency & Exit Strategy](./chapters/36-vendor-dependency-exit-strategy)

**Red flag:** “Cheaper” without a defined unit of comparison.

---

## 11. Production Approval Is Requested

**Stage:** Production approval

**Ask:** What evidence says the system is ready? What has not been tested? What failure modes remain? Are degraded modes, rollback, security, monitoring, audit, support, and incident response operational?

**Evidence:** evaluation results, risk assessment, architecture review, operational readiness, rollback, monitoring, auditability, ownership, incident procedures.

**Go to:** [31 — Model Evaluation](./chapters/31-model-evaluation) · [37 — AI Risk Framework](./chapters/37-ai-risk-framework) · [39 — AI Architecture Review](./chapters/39-ai-architecture-review) · [40 — Production Readiness](./chapters/40-production-readiness) · [41 — Auditability](./chapters/41-auditability)

**Decision rule:** Production readiness is a system property, not a model benchmark.

---

## 12. Vendor Dependency or Lock-In Is Discussed

**Stage:** Selecting / Operating / Replacement / Exit

**Ask:** Which architectural layer creates the dependency? Is it deliberate? What is portable in practice? What would exit require? Which data, prompts, evaluations, workflows, or operational knowledge are difficult to migrate?

**Evidence:** dependency inventory, proprietary interfaces, export capability, alternatives, migration effort, performance impact, contractual constraints, exit cost/timeline.

**Go to:** [30 — Model Selection](./chapters/30-model-selection) · [34 — AI TCO](./chapters/34-ai-tco) · [36 — Vendor Dependency & Exit Strategy](./chapters/36-vendor-dependency-exit-strategy) · [38 — Technical Due Diligence](./chapters/38-technical-due-diligence)

**Red flag:** API compatibility is not architectural portability.

---

## 13. AI Output Will Influence a Consequential Decision

**Stage:** Architecture approval / Production approval / Operating

**Ask:** What authority remains human? Is AI recommending, prioritizing, predicting, or executing? What evidence supports the output? Can the recommendation be challenged and reconstructed? What happens when it is wrong?

**Evidence:** authority model, decision boundary, evidence chain, uncertainty, human review design, audit trail, failure handling.

**Go to:** [26 — AI-IDSS Reference Architecture](./chapters/26-ai-idss-reference-architecture) · [28 — Explainability & Evidence](./chapters/28-explainability-evidence) · [29 — Human Decision Boundary](./chapters/29-human-decision-boundary) · [41 — Auditability](./chapters/41-auditability)

**Core boundary:** AI may provide analysis or recommendation; organizational authority must remain explicit.

---

## 14. Evidence Is Insufficient

**Stage:** Any stage

**Ask:** What exactly is unknown? Which assumption carries the decision? What evidence would reduce uncertainty? Can it be tested before commitment? What would change the technical position?

**Evidence path:** [0 — Reasoning & Evidence Standard](./chapters/00-reasoning-evidence) · [6 — Evaluating Technology Proposals](./chapters/06-evaluating-proposals) · [7 — Architecture Decision Framework](./chapters/07-architecture-decisions) · [46 — AI Evaluation & Testing Architecture](./chapters/46-ai-evaluation-testing-architecture)

**Field rule:** If we do not know yet, determine how to know.

---

## 15. The Team Wants to Fine-Tune the Model

**Stage:** Selecting / Piloting

**Ask:** What task is failing, and how is it failing? Is the problem prompting, workflow, retrieval, data quality, model capability, or domain adaptation? What would fine-tuning change? What would remain unchanged? What alternatives are credible?

**Evidence:** representative failure set, task definition, training data quality and rights, baseline prompt/workflow, RAG alternative, fine-tuning objective, evaluation design, maintenance burden, latency/cost impact, rollback path.

**Go to:** [31 — Model Evaluation](./chapters/31-model-evaluation) · [32 — Fine-Tuning vs RAG vs Prompting](./chapters/32-fine-tuning-vs-rag-vs-prompting) · [33 — Model Lifecycle](./chapters/33-model-lifecycle) · [34 — AI TCO](./chapters/34-ai-tco) · [46 — AI Evaluation & Testing Architecture](./chapters/46-ai-evaluation-testing-architecture)

**Red flag:** “Prompting is not enough, therefore fine-tuning is necessary.” → What specific failure requires model adaptation?

---

## 16. The AI System Is Already in Production and Something Went Wrong

**Stage:** Incident / Operating

**Ask:** What was observed, what changed, and what must be contained first? Is the failure in data, retrieval, model behaviour, orchestration, tool execution, infrastructure, security, or the human decision boundary? Can the consequential path be reconstructed?

**Evidence:** incident timeline, inputs, model/version, prompts/configuration, retrieved evidence, tool calls, authorization decisions, outputs, human actions, logs, metrics, traces, deployment changes, rollback state.

**Go to:** [18 — Reliability](./chapters/18-reliability) · [22 — AI-Specific Threats](./chapters/22-ai-specific-threats) · [28 — Explainability & Evidence](./chapters/28-explainability-evidence) · [29 — Human Decision Boundary](./chapters/29-human-decision-boundary) · [33 — Model Lifecycle](./chapters/33-model-lifecycle) · [40 — Production Readiness](./chapters/40-production-readiness) · [41 — Auditability](./chapters/41-auditability) · [46 — AI Evaluation & Testing Architecture](./chapters/46-ai-evaluation-testing-architecture)

**Investigation path:**

```text
Observed incident
      ↓
Containment
      ↓
Failure classification
      ↓
Evidence reconstruction
      ↓
Control / design gap
      ↓
Remediation
      ↓
Revalidation
```

**Red flag:** Treating every AI incident as a “model problem” before checking data, retrieval, orchestration, controls, infrastructure, and human decision boundaries.

---

# Red-Flag Claim Index

| Claim | Immediate challenge | Go deeper |
|---|---|---|
| “AI is obviously needed.” | Compared with what alternative? | [5A](./chapters/05a-ai-suitability-opportunity), [6A](./chapters/06a-from-ai-opportunity-to-ai-solution) |
| “The LLM can handle authorization.” | Where is authorization enforced? | [9](./chapters/09-enterprise-llm-architecture), [20](./chapters/20-identity-access-control) |
| “RAG solves hallucination.” | What failure modes remain? | [10](./chapters/10-rag-architecture), [46](./chapters/46-ai-evaluation-testing-architecture) |
| “Our benchmark is 95%.” | Task, dataset, baseline, population? | [31](./chapters/31-model-evaluation), [46](./chapters/46-ai-evaluation-testing-architecture) |
| “Human approval makes it safe.” | What control is actually enforced? | [20](./chapters/20-identity-access-control), [29](./chapters/29-human-decision-boundary) |
| “API-compatible means portable.” | What must actually migrate? | [36](./chapters/36-vendor-dependency-exit-strategy) |
| “Self-hosted is more secure.” | Against which threat and with what controls? | [15](./chapters/15-cloud-architecture), [19](./chapters/19-ai-security-model) |
| “The cloud is secure.” | Which responsibilities remain ours? | [15](./chapters/15-cloud-architecture) |
| “This model is cheaper.” | Cheaper per what useful outcome? | [34](./chapters/34-ai-tco), [35](./chapters/35-cost-performance-optimization) |
| “The model is production-ready.” | What system-level evidence supports that? | [40](./chapters/40-production-readiness), [46](./chapters/46-ai-evaluation-testing-architecture) |
| “The agent only acts with approval.” | Who enforces the action boundary? | [11](./chapters/11-agentic-architecture), [20](./chapters/20-identity-access-control) |

---

# Universal Advisor Questions

When the case is unclear:

1. **What problem are we solving?**
2. **Why does it require AI?**
3. **What measurable value does AI add?**
4. **What assumptions are carrying the proposal?**
5. **What evidence supports them?**
6. **What can fail?**
7. **What controls contain those failures?**
8. **What authority remains human?**
9. **What are the credible alternatives?**
10. **What does it cost over the lifecycle?**
11. **What dependencies are difficult to reverse?**
12. **What evidence is required before production?**
13. **What would make us change our technical position?**

---

# Answer-Path Principle

The navigator intentionally does not give a one-line answer to complex technical decisions.

```text
Question / Case
      ↓
Immediate Questions
      ↓
Evidence to Seek
      ↓
Technical Chapters
      ↓
Failure Modes / Trade-offs
      ↓
Technical Position
      ↓
Recommendation
```

> **The navigator tells you where to look. The chapters provide the knowledge. The evidence supports the claim. The advisor makes the judgment.**

## Field Rule

> **Learn by case. Reason by evidence. Decide by judgment.**
