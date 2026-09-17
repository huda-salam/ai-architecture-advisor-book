# Advisor Case & Question Navigator

> **Read linearly if you want to learn. Navigate by case when you need to act.**

This navigator is the handbook's fast-access layer for real advisory situations. It is designed for moments when a technical question arrives before there is time to read an entire chapter.

The navigator does not replace the underlying chapters. It reduces search time by directing the advisor toward the right questions, evidence, technical depth, and decision logic.

## How to Use This Navigator

Start with the situation that most closely resembles the problem in front of you.

For each case:

1. clarify the immediate question;
2. identify the evidence that should be requested;
3. look for the relevant red flags or hidden assumptions;
4. open the linked technical chapters;
5. form a technical position only after the evidence is assessed.

> **The shortcut must reduce search time, not reduce thinking.**

---

## 1. Someone Proposes AI for a Business Problem

### Immediate questions

- What business problem are we actually solving?
- What happens if we use conventional software, rules, analytics, or workflow instead?
- What capability does AI add?
- Is the incremental value measurable?
- What level of AI autonomy is actually required?
- What risks are introduced by using AI?

### Evidence to seek

- business objective and success measures;
- current process and baseline;
- credible non-AI alternative;
- expected incremental value;
- failure consequences;
- proposed human decision boundary;
- initial cost and operational assumptions.

### Investigation path

→ [5A. AI Suitability & Opportunity](./chapters/05a-ai-suitability-opportunity)  
→ [6A. From AI Opportunity to AI Solution](./chapters/06a-from-ai-opportunity-to-ai-solution)  
→ [7. Architecture Decision Framework](./chapters/07-architecture-decisions)

### Position test

Do not recommend a technology until the case for AI itself has been established.

---

## 2. Someone Says “We Need an LLM”

### Immediate questions

- Why an LLM rather than another AI or software approach?
- What task requires generative capability?
- What must the model know, and where will that knowledge come from?
- What must never be delegated to the model?
- Which system components remain deterministic?

### Evidence to seek

- task definition;
- baseline solution;
- model capability requirements;
- data and knowledge sources;
- accuracy and quality requirements;
- latency and throughput requirements;
- security and governance requirements;
- cost assumptions.

### Investigation path

→ [8. AI Architecture Fundamentals](./chapters/08-ai-architecture-fundamentals)  
→ [9. Enterprise LLM Architecture](./chapters/09-enterprise-llm-architecture)  
→ [30. Model Selection](./chapters/30-model-selection)  
→ [31. Model Evaluation](./chapters/31-model-evaluation)

### Red flag

> “The model is capable of doing it” is not evidence that the system should delegate it to the model.

---

## 3. Someone Proposes RAG

### Immediate questions

- What knowledge problem is RAG solving?
- What is the authoritative source?
- How is retrieval evaluated?
- How is authorization enforced?
- What happens when retrieval is incomplete or wrong?
- What evidence reaches the final answer?

### Evidence to seek

- source authority and ownership;
- document/data freshness;
- chunking and indexing design;
- retrieval evaluation;
- authorization model;
- citation/evidence design;
- stale-data and missing-data behaviour;
- cache and logging controls.

### Investigation path

→ [10. RAG Architecture](./chapters/10-rag-architecture)  
→ [13. Data Governance](./chapters/13-data-governance)  
→ [28. Explainability & Evidence](./chapters/28-explainability-evidence)  
→ [46. AI Evaluation & Testing Architecture](./chapters/46-ai-evaluation-testing-architecture)

### Red flags

- “RAG eliminates hallucination.”
- “If the user can retrieve it, the output is authorized.”
- “The citation proves the answer is correct.”

---

## 4. Someone Proposes an AI Agent

### Immediate questions

- Why is an agent required instead of a deterministic workflow?
- What actions can it take?
- Which tools can it invoke?
- What state or memory does it retain?
- Who authorizes actions?
- What happens after a tool failure or unexpected model output?
- Can actions be replayed, stopped, reversed, and audited?

### Evidence to seek

- explicit action inventory;
- tool permissions;
- identity and authorization enforcement;
- approval gates;
- state/memory design;
- timeout and retry behaviour;
- rollback/compensation mechanisms;
- audit trail;
- adversarial and failure testing.

### Investigation path

→ [11. Agentic Architecture](./chapters/11-agentic-architecture)  
→ [20. AI Security](./chapters/20-ai-security)  
→ [29. Human Decision Boundary](./chapters/29-human-decision-boundary)  
→ [40. Production Readiness](./chapters/40-production-readiness)  
→ [46. AI Evaluation & Testing Architecture](./chapters/46-ai-evaluation-testing-architecture)

### Red flag

> Human approval is not itself an authorization mechanism. Authorization must be enforced by the system.

---

## 5. A Vendor Says “Our Benchmark Is 95%”

### Immediate questions

- What exactly was measured?
- On which dataset?
- Against which baseline?
- Was the dataset representative of our workload?
- Which error types remain?
- Was the evaluation independent?
- What does 95% mean operationally and economically?

### Evidence to seek

- evaluation dataset and methodology;
- task definition;
- baseline;
- confidence intervals or uncertainty where appropriate;
- error analysis;
- workload representativeness;
- independent validation;
- production performance evidence.

### Investigation path

→ [31. Model Evaluation](./chapters/31-model-evaluation)  
→ [37. AI Risk Framework](./chapters/37-ai-risk-framework)  
→ [38. Technical Due Diligence](./chapters/38-technical-due-diligence)  
→ [46. AI Evaluation & Testing Architecture](./chapters/46-ai-evaluation-testing-architecture)

### Red flag

> A benchmark result is evidence about a defined evaluation. It is not automatically evidence of production readiness.

---

## 6. Architecture Is Being Reviewed

### Immediate questions

- What requirements and constraints drive the architecture?
- What are the trust boundaries?
- What happens when components fail?
- Which responsibilities are deterministic and which are probabilistic?
- Where are identity, authorization, data, evidence, and audit controls enforced?
- What dependencies are difficult to reverse?

### Evidence to seek

- architecture diagram and request flows;
- requirements and NFRs;
- trust boundaries;
- failure modes;
- SLOs;
- security controls;
- operational model;
- dependency inventory;
- cost model;
- recovery and rollback design.

### Investigation path

→ [7. Architecture Decision Framework](./chapters/07-architecture-decisions)  
→ [8. AI Architecture Fundamentals](./chapters/08-ai-architecture-fundamentals)  
→ [15. Cloud Architecture](./chapters/15-cloud-architecture)  
→ [16. AI Infrastructure & Deployment](./chapters/16-ai-infrastructure-deployment)  
→ [39. Architecture Review](./chapters/39-architecture-review)

---

## 7. Security Is Being Questioned

### Immediate questions

- What exactly is being protected?
- Against which threats?
- Where does the trust boundary sit?
- Who can access data, models, tools, prompts, outputs, and logs?
- Is authorization enforced independently of the model?
- What happens when the AI is manipulated or behaves unexpectedly?

### Evidence to seek

- threat model;
- identity and access controls;
- data-flow diagram;
- secrets handling;
- prompt/tool boundaries;
- retrieval authorization;
- logging and monitoring;
- incident response;
- security testing.

### Investigation path

→ [19. AI Security & Threat Model](./chapters/19-ai-security)  
→ [20. AI Security Controls](./chapters/20-ai-security-controls)  
→ [21. Privacy & Data Protection](./chapters/21-privacy-data-protection)  
→ [37. AI Risk Framework](./chapters/37-ai-risk-framework)

---

## 8. Performance or Scalability Is Being Claimed

### Immediate questions

- What workload are we sizing?
- What are the concurrency, latency, throughput, and availability requirements?
- What is the actual bottleneck?
- What happens at peak load?
- What happens when capacity is exhausted?
- What does the performance cost per useful result look like?

### Evidence to seek

- representative workload;
- concurrency profile;
- latency distribution, not only averages;
- throughput measurements;
- capacity model;
- utilization assumptions;
- failure margins;
- scaling behaviour;
- measured cost.

### Investigation path

→ [15. Cloud Architecture](./chapters/15-cloud-architecture)  
→ [16. AI Infrastructure & Deployment](./chapters/16-ai-infrastructure-deployment)  
→ [35. Cost & Performance Optimization](./chapters/35-cost-performance-optimization)

### Red flag

> Parameter count alone is not a capacity model.

---

## 9. Someone Says “The Cloud Is Secure” or “Self-Hosted Is More Secure”

### Immediate questions

- Which security controls are actually required?
- Which party operates each control?
- What is the concrete threat model?
- What data and processing environment require protection?
- What evidence supports the security claim?

### Investigation path

→ [15. Cloud Architecture](./chapters/15-cloud-architecture)  
→ [19. AI Security & Threat Model](./chapters/19-ai-security)  
→ [20. AI Security Controls](./chapters/20-ai-security-controls)  
→ [38. Technical Due Diligence](./chapters/38-technical-due-diligence)

### Red flags

- “Cloud is inherently secure.”
- “Private means secure.”
- “Self-hosting eliminates security risk.”

---

## 10. Cost Is Being Presented as “Cheap”

### Immediate questions

- Cheap relative to what?
- What workload assumptions produced the number?
- Are engineering and operations included?
- What are data, storage, network, observability, support, and migration costs?
- What happens when usage grows?
- What is the cost per useful business result?

### Evidence to seek

- workload assumptions;
- unit economics;
- infrastructure and service costs;
- engineering effort;
- operations/support;
- migration and exit costs;
- expected utilization;
- sensitivity to volume and latency requirements.

### Investigation path

→ [34. AI Total Cost of Ownership](./chapters/34-ai-tco)  
→ [35. Cost & Performance Optimization](./chapters/35-cost-performance-optimization)  
→ [36. Vendor Dependency & Exit Strategy](./chapters/36-vendor-dependency-exit-strategy)

---

## 11. Production Approval Is Requested

### Immediate questions

- What evidence says the system is ready?
- What has been tested and what has not?
- What are the known failure modes?
- Are rollback and degraded modes operational?
- Are security, monitoring, audit, support, and incident processes ready?
- Who owns the system after launch?

### Investigation path

→ [31. Model Evaluation](./chapters/31-model-evaluation)  
→ [37. AI Risk Framework](./chapters/37-ai-risk-framework)  
→ [39. Architecture Review](./chapters/39-architecture-review)  
→ [40. Production Readiness](./chapters/40-production-readiness)  
→ [41. Auditability](./chapters/41-auditability)

### Decision rule

Production readiness is a system property, not a model benchmark.

---

## 12. Vendor Dependency or Lock-In Is Being Discussed

### Immediate questions

- Which layer creates the dependency?
- Is the dependency deliberate and economically justified?
- What is portable in practice, not merely by API syntax?
- What would an exit require?
- What data, prompts, evaluations, workflows, or operational knowledge would be difficult to migrate?

### Evidence to seek

- dependency inventory;
- proprietary interfaces/features;
- data export capability;
- replacement options;
- migration effort;
- performance differences after migration;
- contractual constraints;
- exit cost and timeline.

### Investigation path

→ [30. Model Selection](./chapters/30-model-selection)  
→ [34. AI Total Cost of Ownership](./chapters/34-ai-tco)  
→ [36. Vendor Dependency & Exit Strategy](./chapters/36-vendor-dependency-exit-strategy)  
→ [38. Technical Due Diligence](./chapters/38-technical-due-diligence)

### Red flag

> API compatibility is not the same thing as architectural portability.

---

## 13. AI Output Will Influence a Consequential Decision

### Immediate questions

- What authority remains with the human decision-maker?
- Is the AI recommending, prioritizing, predicting, or executing?
- What evidence supports the output?
- Can the recommendation be challenged and reconstructed?
- What happens when the recommendation is wrong?
- Is human review meaningful or merely ceremonial?

### Investigation path

→ [26. AI-IDSS Reference Architecture](./chapters/26-ai-idss-reference-architecture)  
→ [28. Explainability & Evidence](./chapters/28-explainability-evidence)  
→ [29. Human Decision Boundary](./chapters/29-human-decision-boundary)  
→ [41. Auditability](./chapters/41-auditability)

### Core boundary

> AI can provide analysis or recommendation. Organizational authority must remain explicit.

---

## 14. The Evidence Is Not Sufficient

### Immediate questions

- What exactly is unknown?
- Which assumption is carrying the decision?
- What evidence would reduce the uncertainty?
- Can the uncertainty be tested cheaply before commitment?
- What would change the recommendation?

### Evidence path

→ [0. Reasoning & Evidence Standard](./chapters/00-reasoning-evidence)  
→ [6. How to Evaluate a Technology Proposal](./chapters/06-evaluating-proposals)  
→ [7. Architecture Decision Framework](./chapters/07-architecture-decisions)  
→ [46. AI Evaluation & Testing Architecture](./chapters/46-ai-evaluation-testing-architecture)

### Field rule

> **If we do not know yet, determine how to know.**

---

# Red-Flag Claim Index

Use this index when someone makes a confident technical statement and you need to determine what to investigate.

| Claim | Immediate challenge | Go deeper |
|---|---|---|
| “AI is obviously needed.” | Compared with what alternative? | [5A](./chapters/05a-ai-suitability-opportunity), [6A](./chapters/06a-from-ai-opportunity-to-ai-solution) |
| “The LLM can handle authorization.” | Where is authorization actually enforced? | [9](./chapters/09-enterprise-llm-architecture), [20](./chapters/20-ai-security-controls) |
| “RAG solves hallucination.” | What failure modes remain? | [10](./chapters/10-rag-architecture), [46](./chapters/46-ai-evaluation-testing-architecture) |
| “Our benchmark is 95%.” | On what task, dataset, baseline, and population? | [31](./chapters/31-model-evaluation), [46](./chapters/46-ai-evaluation-testing-architecture) |
| “Human approval makes it safe.” | What control is actually enforced? | [20](./chapters/20-ai-security-controls), [29](./chapters/29-human-decision-boundary) |
| “API-compatible means portable.” | What must actually migrate? | [36](./chapters/36-vendor-dependency-exit-strategy) |
| “Self-hosted is more secure.” | Against which threat and with what controls? | [15](./chapters/15-cloud-architecture), [19](./chapters/19-ai-security) |
| “The cloud is secure.” | Which responsibilities remain ours? | [15](./chapters/15-cloud-architecture) |
| “This model is cheaper.” | Cheaper per what useful outcome and workload? | [34](./chapters/34-ai-tco), [35](./chapters/35-cost-performance-optimization) |
| “The model is production-ready.” | What system-level evidence supports that? | [40](./chapters/40-production-readiness), [46](./chapters/46-ai-evaluation-testing-architecture) |
| “The agent only acts with approval.” | Who enforces the action boundary? | [11](./chapters/11-agentic-architecture), [20](./chapters/20-ai-security-controls) |
| “Private means secure.” | What controls and threat model make it secure? | [15](./chapters/15-cloud-architecture), [19](./chapters/19-ai-security) |

---

# The Advisor's Universal Question Set

When the case is unclear, return to these questions:

1. **What problem are we solving?**
2. **Why does it require AI?**
3. **What measurable value does AI add?**
4. **What assumptions are carrying the proposal?**
5. **What evidence supports those assumptions?**
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

The navigator deliberately does not provide a one-line answer to complex technical decisions.

Instead it provides an **answer path**:

```text
Question / Case
      ↓
Immediate Questions
      ↓
Evidence to Seek
      ↓
Relevant Technical Chapters
      ↓
Failure Modes / Trade-offs
      ↓
Technical Position
      ↓
Recommendation
```

This preserves the distinction between **retrieval** and **reasoning**.

> **The navigator tells you where to look. The chapters provide the knowledge. The evidence supports the claim. The advisor makes the judgment.**

---

# Field Rule

> **Learn by case. Reason by evidence. Decide by judgment.**
