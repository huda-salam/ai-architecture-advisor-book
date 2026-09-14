# 8. AI Architecture Fundamentals

## Purpose

An enterprise AI system is not a model. It is a socio-technical system that combines models with data, knowledge, software, infrastructure, security controls, workflows, evaluation, and human decision boundaries.

For the technical advisor, this distinction is foundational. Weak proposals often begin with a model choice—“Which LLM should we use?”—before defining the system the model is expected to serve.

The correct question is:

> **What architecture can produce the required outcome reliably, securely, economically, and with an appropriate decision boundary?**

The model is one component of that architecture.

This chapter establishes the mental model used throughout the manual. It is a **logical architecture**, not a mandatory product topology or a formal standard.

---

## 8.1 The Core Misconception: LLM = AI System

A large language model is a computational component capable of generating or transforming information from an input context. An enterprise AI system has a much larger responsibility.

A production system may need to:

- acquire authoritative data;
- determine which information a user, service, or agent is authorized to access;
- retrieve relevant knowledge;
- transform and validate data;
- invoke one or more models;
- execute deterministic business rules;
- call enterprise APIs and tools;
- preserve evidence and provenance;
- evaluate output quality;
- enforce approval boundaries;
- record an audit trail;
- handle failures and degraded conditions; and
- operate within cost, latency, security, and regulatory constraints.

Therefore:

> **LLM capability ≠ AI system capability.**

A useful logical decomposition is:

```text
                    Enterprise AI System

┌─────────────────────────────────────────────────────────┐
│ Application / User Experience                           │
├─────────────────────────────────────────────────────────┤
│ Orchestration / Workflow / Agent Runtime                │
├─────────────────────────────────────────────────────────┤
│ AI / ML / LLM Models                                    │
├─────────────────────────────────────────────────────────┤
│ Knowledge / Retrieval / RAG                              │
├─────────────────────────────────────────────────────────┤
│ Data / Integration / Processing                          │
├─────────────────────────────────────────────────────────┤
│ Infrastructure / Cloud / Network / Compute / Storage     │
└─────────────────────────────────────────────────────────┘

Cross-cutting:
Security · Identity · Governance · Evaluation · Audit
Observability · Reliability · Cost · Interoperability
```

A commercial platform may combine several layers; an internal platform may split one layer across many services. The value of this model is that it makes responsibilities and dependencies visible.

---

## 8.2 From Business Question to Architecture

Architecture should begin with the decision or task, not with an AI technology.

```text
Business Objective
        ↓
Decision / Task
        ↓
Required Evidence
        ↓
Data + Knowledge
        ↓
Processing / Analysis
        ↓
Model(s)
        ↓
Orchestration / Workflow
        ↓
Application / Decision Interface
        ↓
Human / Business Action
```

For an investment-risk use case:

> Business objective: protect portfolio value.
>
> Decision task: identify portfolio companies requiring attention.
>
> Evidence: financial performance, liquidity, leverage, market conditions, operational indicators, and investment documents.
>
> Analysis: calculate indicators, detect deterioration, compare thresholds and historical patterns, and retrieve relevant qualitative evidence.
>
> AI: predict, classify, summarize, explain, or synthesize depending on the defined subtask.
>
> Decision interface: present findings, evidence, uncertainty, and recommended next action to the decision maker.

Different parts of this problem may require different technologies. An LLM does not automatically replace statistical analysis, data engineering, search, workflow management, authorization, or enterprise applications.

---

## 8.3 Architecture Is a Responsibility Model

Each architectural layer should have a clear responsibility.

| Layer | Main responsibility | Typical question |
|---|---|---|
| Application | Present capability and collect user intent | What does the user see and do? |
| Orchestration | Coordinate execution | What happens, and in what order? |
| Model | Produce computational output | What does the model calculate or generate? |
| Knowledge | Supply relevant contextual evidence | What information should the model see? |
| Data | Provide authoritative information | Where does the authoritative information come from? |
| Infrastructure | Provide execution environment | Where and under what operational conditions does it run? |

Cross-cutting controls answer another set of questions:

| Concern | Core question |
|---|---|
| Security | What can be attacked, accessed, or exposed? |
| Identity | Who is acting? |
| Authorization | What is that identity allowed to see or do? |
| Governance | What policies constrain the system? |
| Evaluation | How do we know it works for its intended purpose? |
| Audit | Can important events be reconstructed? |
| Observability | Can production behavior be understood? |
| Reliability | What happens when something fails? |
| Cost | What does the complete system cost? |
| Interoperability | Can it work with surrounding enterprise systems? |

If nobody owns data freshness, retrieval authorization, model evaluation, or failure behavior, the architecture is incomplete even if the diagram looks sophisticated.

---

## 8.4 Application and Decision Boundary

The application is where users consume the system's capabilities. Examples include an executive dashboard, investment-risk alert interface, analyst workspace, document-review application, enterprise API, or workflow embedded in an existing application.

The advisor should ask:

1. Who is the user?
2. What decision or task is being supported?
3. What information must be visible?
4. What action can the user take?
5. What action must the system prohibit?
6. What evidence must accompany an AI conclusion?
7. How is uncertainty communicated?
8. Can the user distinguish source data, analytical output, and AI-generated synthesis?

The interface is therefore part of the **decision boundary**.

A useful separation is:

```text
Evidence
  ↓
Analysis / Findings
  ↓
AI Interpretation
  ↓
Recommendation
  ↓
Human Decision
```

These should not be collapsed into one authoritative-looking statement if that could cause generated content to be mistaken for verified fact or an authorized decision.

---

## 8.5 Orchestration, Workflow, and Agents

Between the application and models sits the control layer that determines how work is performed. It may contain workflow engines, context construction, model routing, tool invocation, agent loops, state management, retries, timeouts, approval steps, policy enforcement, and failure handling.

| Component | Primary responsibility | Typical behavior |
|---|---|---|
| Workflow | Execute a known sequence | Predetermined sequence |
| Orchestrator | Coordinate components | Controls execution across services |
| Agent | Select actions dynamically within granted authority | Adaptive execution |
| Tool/API | Perform an external operation | Read / write / query / execute |
| Model | Produce predictions, classifications, generations, or other outputs | Probabilistic computation |

This distinction is architectural guidance, not a claim that every system must use separate products for each function.

Suppose an AI assistant can retrieve portfolio information and send an email. The LLM may propose sending the email, but the LLM should not by itself define whether that action is authorized.

```text
LLM proposes action
       ↓
Identity / Policy / Authorization Check
       ↓
Optional Human Approval
       ↓
Tool/API Execution
       ↓
Audit Record
```

This creates a separation between **reasoning** and **authority**. For consequential workflows, permissions should be explicitly scoped and approval points should be architecturally enforced.

NIST's 2026 AI Agent Standards Initiative explicitly identifies agent security, identity, authorization, and interoperability as active standards and research areas. This is evidence that these concerns are still an evolving field, not a settled universal architecture. See: [NIST AI Agent Standards Initiative](https://www.nist.gov/artificial-intelligence/ai-agent-standards-initiative).

---

## 8.6 AI, ML, and LLM Models

The model layer may contain statistical models, deterministic rules, classical ML, deep learning, embedding models, rerankers, LLMs, multimodal models, or ensembles.

The architecture should assign each computational method a defined responsibility.

### Match the method to the claim

Ask:

> **What exactly does the system claim to know?**

Consider:

> “Portfolio Company A — probability of material deterioration: 68%.”

A number presented as a probability has a stronger semantic meaning than an ordinary generated sentence. The architecture must identify its source and intended interpretation.

Possible sources include a statistical model, supervised classifier, calibrated predictive model, ensemble, validated risk model, deterministic score mapped to a category, or an LLM-generated assessment. These are not equivalent.

An LLM can produce language that sounds probabilistic without establishing a calibrated probability. Therefore:

> **The computational method must match the semantic strength of the claim.**

If a numerical probability is presented, the architecture should define how it is generated, validated, calibrated where appropriate, monitored, and interpreted.

### Different models can solve different subtasks

```text
Financial Data
      ↓
Statistical / ML Models
      ↓
Risk Signals
      ↓
RAG retrieves supporting documents
      ↓
LLM synthesizes evidence
      ↓
Decision-support interface
```

The advisor is not required to favor ML over LLMs categorically. The objective is **fit-for-purpose computation**.

---

## 8.7 Deterministic Logic vs Probabilistic Intelligence

Enterprise AI architectures often combine deterministic and probabilistic components.

### Deterministic components

Examples include arithmetic, accounting rules, authorization, threshold checks, data validation, workflow transitions, policy enforcement, and API contracts.

### Probabilistic components

Examples include classification, prediction, language generation, semantic similarity, ranking, anomaly detection, and document interpretation.

A strong architecture does not ask a probabilistic model to replace deterministic controls without justification.

```text
Is user allowed to access Company A?
            ↓
      Authorization
       (controlled)

Is Company A showing signs of deterioration?
            ↓
      ML / statistical analysis

What evidence explains the signal?
            ↓
        Retrieval
       + LLM synthesis

Should the company be placed under review?
            ↓
      Human decision
```

The important principle is not “deterministic is always better.” It is that the architecture should make clear **which component has authority to enforce a rule and which component is producing an uncertain analytical result**.

---

## 8.8 Knowledge and Retrieval

Models do not automatically possess an organization's current authoritative knowledge. Enterprise AI may therefore require document repositories, structured data, metadata, embeddings, indexes, hybrid retrieval, reranking, access-aware retrieval, and evidence references.

RAG is one architectural pattern for connecting a model to external knowledge without requiring that knowledge to be encoded into model parameters. NIST defines RAG as a pattern that combines a model with a separate information retrieval system or knowledge base. See: [NIST RAG Glossary](https://csrc.nist.gov/glossary/term/rag).

A useful conceptual flow is:

```text
Authoritative Sources
       ↓
Ingestion / Parsing
       ↓
Normalization
       ↓
Metadata / Access Policy
       ↓
Indexing
       ↓
Retrieval
       ↓
Reranking / Filtering
       ↓
Relevant Authorized Context
       ↓
Model
       ↓
Answer + Evidence
```

The critical issue is not whether a vector database exists. It is whether retrieval supplies **the right authorized evidence**.

Poor answers may originate from incomplete ingestion, parsing errors, poor chunking, weak metadata, inappropriate retrieval strategy, incorrect filters, stale indexes, authorization failures, ranking errors, or model interpretation errors.

Therefore, “the LLM hallucinated” may be an incomplete diagnosis. The advisor should locate the stage that introduced the failure.

---

## 8.9 Data, Integration, and Processing

Enterprise AI depends on data architecture. Potential sources include ERP systems, financial statements, market-data platforms, CRM systems, internal documents, investment memoranda, selected communications, research databases, and external intelligence.

The data layer must address source authority, schema and semantics, data quality, freshness, lineage, access control, transformation, deduplication, retention, and synchronization.

A central principle is:

> **The AI system should consume authoritative enterprise data; it should not silently become the authoritative source of that data.**

For each important data element, identify the authoritative source.

| Information | Possible authoritative source |
|---|---|
| General ledger balance | ERP / accounting system |
| Market price | Approved market-data provider |
| Investment thesis | Approved investment repository |
| Legal agreement | Controlled document repository |
| AI-generated summary | AI system output — not source of record |

If sources disagree, the system should not silently choose one merely because it was retrieved first.

### Data freshness

The architecture should distinguish:

- event time;
- source update time;
- ingestion time;
- processing time; and
- recommendation time.

This matters when evidence sources operate at different update frequencies.

---

## 8.10 Infrastructure

Infrastructure provides the execution environment. It may include public or private cloud, compute, GPU/CPU infrastructure, storage, databases, networks, private connectivity, secrets and key management, observability, backup, and disaster recovery.

Infrastructure decisions should follow workload requirements rather than precede them.

“ We need GPUs” is not an architecture. Establish:

- which workloads require acceleration;
- whether inference is internal or external;
- expected concurrency;
- latency requirements;
- model size;
- availability requirements;
- utilization assumptions;
- scaling characteristics; and
- total cost.

Likewise, “private cloud” or “on-premise” is not automatically more secure. Security depends on the complete architecture and operational controls.

---

## 8.11 Cross-Cutting Architecture Concerns

### Security

Security boundaries should be designed across identity, data, APIs, models, tools, networks, and user interfaces.

### Identity and authorization

A system must know not only **who is acting**, but **what that identity is permitted to access and do**. The same principle applies to service identities and AI agents.

NIST's current agent work specifically treats identity and authorization for software and AI agents as an active technical problem; it is therefore inappropriate to assume that an LLM itself is an authorization mechanism. See: [NIST Agent Identity and Authorization Concept Paper](https://csrc.nist.gov/pubs/other/2026/02/05/accelerating-the-adoption-of-software-and-ai-agent/ipd).

### Governance

Policies should be enforceable through architecture where practical, rather than existing only as documentation.

### Evaluation

AI output quality must be measured against explicit evaluation criteria. A successful demonstration is not sufficient evidence of production fitness.

The evaluation hierarchy used throughout this manual is:

```text
Model capability
       ↓
Task performance
       ↓
System performance
       ↓
Business / decision value
```

These are different evidence levels. A high model benchmark score does not by itself establish that an enterprise system solves the intended task, operates reliably, or creates decision value.

### Observability

Production systems need visibility into latency, failures, model usage, retrieval behavior, tool calls, token or compute consumption, cost, and relevant quality indicators.

### Auditability

For consequential outputs, preserve enough information to reconstruct what happened, subject to applicable privacy and retention requirements. This does **not** require exposing or storing hidden model chain-of-thought.

A useful observable audit chain is:

```text
User / Trigger
    ↓
Identity / Permissions
    ↓
Input Data
    ↓
Retrieved Evidence
    ↓
Processing / Model Calls
    ↓
Output
    ↓
Recommendation
    ↓
Approval / Human Action
```

### Reliability and failure containment

The architecture should define behavior when models, APIs, data sources, networks, or downstream systems fail.

A stronger question than “How accurate is the model?” is:

> **What is the maximum consequence of a wrong, stale, unavailable, or manipulated result, and which architectural controls contain that consequence?**

### Economics

The relevant measure is not model price alone. Evaluate complete system cost: infrastructure, model usage, data, storage, networking, engineering, security, operations, support, and failure handling.

### Interoperability and reversibility

AI components should integrate through explicit contracts rather than creating isolated AI islands. Major choices should also be evaluated for replaceability and migration cost.

---

## 8.12 AI Request Lifecycle

A complete request should be viewed as a sequence of controlled transformations rather than a single prompt sent to an LLM.

For:

> “Which portfolio companies require attention this month?”

one possible logical flow is:

```text
RD / Analyst Request
        ↓
Identity & Authorization
        ↓
Intent / Task Interpretation
        ↓
Data Selection
        ↓
Data Retrieval
        ↓
Validation / Reconciliation
        ↓
Analytical Processing
        ↓
Risk / ML / Statistical Models
        ↓
Knowledge Retrieval
        ↓
LLM Reasoning / Synthesis
        ↓
Evidence + Findings + Uncertainty
        ↓
Recommendation
        ↓
Human Review
        ↓
RD Decision
```

Not every request requires every step. The architecture should be **proportionate to the task**.

The important principle is:

> **The prompt is only one step in the request lifecycle.**

Prompt engineering can improve a model interaction, but it cannot by itself establish enterprise authorization, data quality, reliability, auditability, or production readiness.

---

## 8.13 Evidence Chain for AI-IDSS

For material decisions, the system should be able to express an evidence chain.

Consider:

> **Portfolio Company A — probability of material deterioration: 68%.**

A technically meaningful chain could be:

```text
Authoritative Financial Data
        ↓
Validated Financial Metrics
        ↓
Risk Model
        ↓
68% calibrated probability
        ↓
Driver Analysis
        ↓
Relevant Internal / External Evidence
        ↓
LLM Synthesis
        ↓
Investment Risk Alert
        ↓
RD Review
```

The LLM may be responsible for synthesis while another model produces the probability.

This is stronger than:

```text
Documents → Prompt → LLM → “68% probability”
```

because the latter does not establish what the number means or how it was derived.

The advisor should distinguish:

1. **Source evidence** — what the organization or external source reported.
2. **Analytical output** — what deterministic, statistical, or ML processing calculated.
3. **Model interpretation** — what an AI model inferred or synthesized.
4. **Recommendation** — what action the system suggests.
5. **Decision** — what the authorized human ultimately decides.

---

## 8.14 Determining Where a Failure Occurred

When an AI output is wrong, “the AI failed” is not a sufficient root-cause analysis.

| Failure location | Example |
|---|---|
| Source | Financial statement was incorrect or incomplete |
| Ingestion | Document was not ingested |
| Parsing | Table was parsed incorrectly |
| Transformation | Unit or currency conversion was wrong |
| Retrieval | Wrong evidence was selected |
| Authorization | Unauthorized evidence was exposed |
| Analytical model | Risk model produced an incorrect result |
| LLM | Synthesis contradicted evidence |
| Orchestration | Wrong tool/model was invoked |
| Application | UI presented a recommendation misleadingly |
| Human process | User misunderstood or over-trusted the output |

A model replacement may not fix a retrieval problem. A better prompt may not fix stale data. More GPU capacity may not fix an authorization defect.

---

## 8.15 AI Architecture Quality Attributes

Evaluate AI architectures against explicit quality attributes.

| Attribute | Architectural question |
|---|---|
| Correctness | Does the system produce the intended result under defined acceptance criteria? |
| Accuracy | How often is the output correct under defined evaluation conditions? |
| Security | Can unauthorized access or manipulation occur? |
| Privacy | How is sensitive information controlled? |
| Reliability | Does the system behave acceptably when components fail? |
| Availability | Is the service available at the required level? |
| Latency | Can it respond within the required time? |
| Throughput | Can it handle the expected workload? |
| Scalability | Can capacity grow without disproportionate redesign or cost? |
| Maintainability | Can the system be changed safely? |
| Interoperability | Can it integrate with surrounding systems? |
| Observability | Can operators understand production behavior? |
| Auditability | Can important events and outputs be reconstructed? |
| Cost efficiency | Is the outcome economically justified? |
| Reversibility | Can major architecture choices be changed later? |
| Governance | Can policy and accountability be enforced? |

These attributes conflict. The advisor should not maximize every attribute; the objective is an explicit balance under requirements and constraints.

---

## 8.16 Architecture Trade-offs

There is rarely one universally best AI architecture.

> **Which architecture best satisfies the requirements and constraints of this use case?**

For example, a managed model service may reduce model-serving operational burden and provide elastic capacity, while introducing provider dependency and service-availability considerations. A self-hosted model may increase deployment control while increasing infrastructure, operations, capacity, and lifecycle responsibility.

Neither “cloud” nor “self-hosted” is a universal security or architecture property. Compare the complete control and dependency model.

The same reasoning applies to model ownership. **Deployment control, model ownership, data control, and enterprise control are related but distinct concepts.**

---

## 8.17 Architecture Before Vendor

A disciplined sequence is:

```text
Business Objective
        ↓
Task / Decision
        ↓
Requirements
        ↓
Constraints
        ↓
Architecture
        ↓
Capabilities Required
        ↓
Architectural Options
        ↓
Technology Options
        ↓
Vendor / Build Options
        ↓
Technical Evaluation
        ↓
Economic Evaluation
        ↓
Recommendation
```

This prevents vendor products from becoming accidental architecture.

For rapidly changing claims about model capability, pricing, deployment options, API behavior, and vendor controls, evidence should be treated as **time-bounded** and revalidated when relevant conditions change.

---

## 8.18 Architecture Anti-Patterns

### 1. LLM-centric architecture

Everything is routed through an LLM regardless of whether the task is deterministic, statistical, transactional, or retrieval-oriented.

**Challenge:** Why is an LLM required for this step?

### 2. Vendor-first architecture

A vendor or model is selected before requirements and architecture are established.

**Challenge:** Which architectural requirement made this vendor necessary?

### 3. RAG as a solution to bad data

A vector database is expected to solve data-quality or governance problems.

**Challenge:** Is the source data correct, complete, current, and authoritative?

### 4. Prompt as business logic

Critical business rules exist only inside prompts.

**Challenge:** Which rules require deterministic enforcement outside the model?

### 5. Unrestricted agent permissions

An agent receives broad access because it is convenient.

**Challenge:** What is the minimum permission required for each action?

### 6. AI as system of record

AI-generated conclusions overwrite or replace authoritative enterprise information.

**Challenge:** What is the actual system of record?

### 7. Probability without a defined probabilistic basis

The system generates precise percentages without a defined statistical interpretation.

**Challenge:** What exactly does the number mean, and how was it validated?

### 8. GPU-first architecture

Infrastructure is purchased before workload characteristics are understood.

**Challenge:** What workload requires this capacity, and what is expected utilization?

### 9. Demo-driven production readiness

A successful demonstration is treated as evidence that the production architecture is ready.

**Challenge:** Where are the evaluation results, failure tests, security tests, load tests, and operational controls?

### 10. No degradation strategy

The system has no defined behavior when an LLM, API, retrieval service, or data source becomes unavailable.

**Challenge:** What happens when a critical dependency is unavailable?

---

## 8.19 AI-IDSS Reference Architecture

The target conceptual architecture is:

```text
                         Decision Maker
                              │
                       AI-IDSS Interface
                              │
                           AI-IDSS
                              │
                      Agents / Workflows
                              │
                       AI / ML / LLM Layer
                              │
                       RAG / Knowledge Layer
                              │
                  Processing & Intelligence
                              │
                         Data / Cloud
                              │
          ┌──────────────┬────┴────┬──────────────┐
          ▼              ▼         ▼              ▼
      Market Data       ERP   Financial Data   Documents
```

Cross-cutting:

```text
Security · Identity · Governance · Audit
Evaluation · Observability · Reliability
Cost · Interoperability · Data Lineage
```

This is a logical reference architecture. Actual implementation may use different physical components.

The key principle is:

> **The LLM is inside the architecture, not the architecture itself.**

---

## 8.20 Example — Investment Risk Alert

Consider the target output:

> **Portfolio Company A — Probability of material deterioration: 68%**
>
> Primary drivers: margin compression, refinancing risk, weakening demand.
>
> Recommended action: initiate independent portfolio review.

The advisor should ask:

1. Which systems provide the financial evidence?
2. Which data is authoritative?
3. How fresh is the data?
4. How are conflicting figures reconciled?
5. Which analytical method produces the 68% probability?
6. Is that probability evaluated and calibrated appropriately for its intended use?
7. Which method identifies the primary drivers?
8. Is an LLM used for synthesis, classification, explanation, or prediction?
9. How are supporting documents retrieved?
10. Are permissions enforced during retrieval?
11. Can the system cite the evidence behind the conclusion?
12. What happens when required data is missing?
13. What happens when the model or provider fails?
14. What happens when market data is unavailable or delayed?
15. Who can approve the recommended action?
16. What is recorded for audit?
17. Can the recommendation be reproduced or explained after the fact?

Only after these questions are answered should model and platform selection become central.

---

## 8.21 Technical Challenge Questions

### Model

- What exactly does the model do?
- Why is this model type appropriate?
- What evidence supports the claimed capability?
- What is the task-specific evaluation?
- What are the known failure modes?

### Data

- What is the authoritative source?
- How fresh is the data?
- How is data quality checked?
- How are conflicting sources reconciled?
- What happens when data is missing?

### RAG

- How are documents parsed?
- Why was this retrieval strategy selected?
- How is retrieval evaluated?
- How are access permissions enforced?
- Can the answer cite supporting evidence?

### Agents

- What tools can the agent call?
- What identity and permissions does each tool use?
- Can the agent write or execute actions?
- Which actions require human approval?
- What prevents an unintended tool call?

### Security

- Where does sensitive data travel?
- Where is it stored?
- Who can access it?
- How are identities and service credentials managed?
- What happens if retrieved content attempts to manipulate instructions?

### Operations

- What is expected latency and concurrency?
- How does the system scale?
- What happens when a dependency fails?
- How is production behavior observed?
- What is the degradation mode?

### Economics and reversibility

- What is the complete TCO?
- What assumptions drive the cost model?
- What is the cost per useful result?
- What is the operational burden?
- Can the model, data layer, orchestration layer, or provider be replaced?
- Which decisions are difficult to reverse?

---

## 8.22 Architecture Review Checklist

### Problem

- [ ] The business task is explicit.
- [ ] The supported decision is explicit.
- [ ] Required evidence is defined.
- [ ] Human decision authority is explicit.

### System

- [ ] Application boundary is defined.
- [ ] Orchestration/workflow is defined.
- [ ] Model responsibilities are defined.
- [ ] Knowledge/retrieval architecture is defined.
- [ ] Data sources are identified.
- [ ] Infrastructure assumptions are explicit.

### Data

- [ ] Source authority is defined.
- [ ] Data freshness is defined.
- [ ] Data quality controls exist.
- [ ] Lineage is available where required.
- [ ] Conflicting-source behavior is defined.

### Control

- [ ] Identity and authorization are defined.
- [ ] Sensitive-data boundaries are defined.
- [ ] Agent/tool permissions are defined.
- [ ] Human approval boundaries are defined.
- [ ] Auditability is addressed.
- [ ] Failure and degradation behavior is defined.

### Quality

- [ ] Evaluation methodology exists.
- [ ] Model claims match the underlying computational method.
- [ ] Retrieval quality is evaluated.
- [ ] Evidence/provenance can be traced without requiring hidden chain-of-thought.
- [ ] Missing-data behavior is defined.
- [ ] Production monitoring is defined.

### Economics and reversibility

- [ ] Total cost is estimated.
- [ ] Scaling assumptions are explicit.
- [ ] Operational burden is included.
- [ ] Vendor/provider dependency is understood.
- [ ] Exit or migration options are considered.

---

## 8.23 Evidence Standard

This chapter is a logical architecture and advisor framework, not a formal standard.

Relevant authoritative anchors include:

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) — NIST's current page states that AI RMF 1.0 is being revised in 2026. The existing framework remains useful reference material, but it should not be described as the final current version.
- [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) — provides the Govern, Map, Measure, and Manage structure and describes risk management as continuous across the AI lifecycle.
- [NIST Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence) — technology-specific risk-management guidance derived from the AI RMF.
- [NIST AI Agent Standards Initiative](https://www.nist.gov/artificial-intelligence/ai-agent-standards-initiative) — current work on secure, interoperable agents, including identity and authorization.
- [NIST RAG Glossary](https://csrc.nist.gov/glossary/term/rag) — authoritative definition of retrieval-augmented generation.
- [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/) — current community security guidance for LLM applications.

These sources support the risk-management, RAG, agent-security, and evaluation framing. They do **not** prove that any particular architecture is universally optimal.

Rapidly changing claims about model capability, pricing, deployment options, API behavior, and vendor controls must be verified against current primary documentation and treated as time-bounded evidence.

---

## Field Rules

> **Never evaluate an enterprise AI proposal as “a model choice.” Evaluate it as a system.**

> **The computational method must match the semantic strength of the claim.**

> **Use the hierarchy Model capability → Task performance → System performance → Business / decision value. Do not treat a benchmark score as proof of business value.**

> **Every material AI conclusion should have an identifiable chain from authoritative evidence → analytical processing → model output → reasoning/synthesis → recommendation → human decision.**

> **The LLM is not the authorization boundary, the system of record, or the final decision authority merely because it can generate a convincing answer.**

> **Good architecture does not guarantee success. It improves the organization's ability to detect unacceptable failure early, contain its consequences, and recover safely.**
