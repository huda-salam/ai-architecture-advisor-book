# 8. AI Architecture Fundamentals

## Purpose

An enterprise AI system is not a model. It is a socio-technical system that combines models with data, knowledge, software, infrastructure, security controls, workflows, evaluation, and human decision boundaries.

For the technical advisor, this distinction is foundational. Many weak technology proposals begin with a model choice—“Which LLM should we use?”—before defining the system that the model is expected to serve.

The correct question is:

> **What architecture can produce the required outcome reliably, securely, economically, and with an appropriate decision boundary?**

The model is one component of that architecture.

This chapter establishes the technical mental model used throughout the rest of this manual. Later chapters will go deeper into LLM architecture, RAG, agents, data, cloud, security, integration, deployment, and AI-IDSS.

---

## 8.1 The Core Misconception: LLM = AI System

A large language model is a computational component capable of generating or transforming information from an input context. An enterprise AI system has a much larger responsibility.

A production system may need to:

- acquire authoritative data;
- determine which information a user or agent is allowed to access;
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

**LLM capability ≠ AI system capability.**

A useful abstraction is:

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

This is a **logical architecture**, not necessarily a physical deployment. A commercial platform may combine several layers; an internal platform may split one layer across many services.

The purpose of the model is to make responsibilities and dependencies visible.

---

## 8.2 From Business Question to Architecture

The architecture should begin with the decision or task, not with an AI technology.

A useful decomposition is:

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

For example:

> Business objective: protect portfolio value.
>
> Decision task: identify portfolio companies requiring attention.
>
> Evidence: financial performance, liquidity, leverage, market conditions, operational indicators, investment documents.
>
> Analysis: calculate indicators, detect deterioration, compare against thresholds and historical patterns, retrieve relevant qualitative evidence.
>
> AI: predict, classify, summarize, explain, or synthesize depending on the specific subtask.
>
> Decision interface: present an alert, evidence, uncertainty, and recommended next action to the RD.

This decomposition is important because different parts of the problem may require different technologies.

A single LLM does not automatically replace statistical analysis, data engineering, search, workflow management, authorization, or enterprise applications.

---

## 8.3 Architecture Is a Responsibility Model

Each architectural layer should have a clear responsibility.

| Layer | Main responsibility | Typical question |
|---|---|---|
| Application | Present capability and collect user intent | What does the user see and do? |
| Orchestration | Coordinate execution | What happens, and in what order? |
| Model | Produce computational output | What does the model calculate/generate? |
| Knowledge | Supply relevant contextual evidence | What information should the model see? |
| Data | Provide authoritative information | Where does the truth come from? |
| Infrastructure | Provide execution environment | Where and under what operational conditions does it run? |

Cross-cutting controls answer another set of questions:

| Concern | Core question |
|---|---|
| Security | What can be attacked, accessed, or exposed? |
| Identity | Who is acting? |
| Authorization | What is that identity allowed to see/do? |
| Governance | What policies constrain the system? |
| Evaluation | How do we know it works? |
| Audit | Can we reconstruct what happened? |
| Observability | Can we see system behavior in production? |
| Reliability | What happens when something fails? |
| Cost | What does the complete system cost? |
| Interoperability | Can it work with the surrounding enterprise? |

This responsibility model is useful during architecture review because it exposes **missing responsibilities**. If nobody owns data freshness, retrieval authorization, model evaluation, or failure behavior, the architecture is incomplete even if the diagram looks sophisticated.

---

## 8.4 Layer 1 — Application and User Experience

The application is where users consume the system's capabilities.

Examples include:

- an executive dashboard;
- an investment-risk alert interface;
- an analyst workspace;
- a document-review application;
- an API consumed by another enterprise system; or
- a workflow embedded in an existing enterprise application.

The advisor should ask:

1. Who is the user?
2. What decision or task is being supported?
3. What information must be visible?
4. What action can the user take?
5. What action must the system prohibit?
6. What evidence must accompany an AI conclusion?
7. How is uncertainty communicated?
8. Can the user distinguish source data, analytical output, and AI-generated synthesis?

The interface is therefore not merely presentation. It is part of the **decision boundary**.

For an AI-IDSS, the interface should make it difficult to confuse an AI recommendation with an authorized business decision.

A useful interface separation is:

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

These should not be collapsed into one visually authoritative sentence if doing so could cause users to mistake generated text for verified fact.

---

## 8.5 Layer 2 — Orchestration, Workflow, and Agents

Between the application and models sits the control layer that determines how work is performed.

This layer may contain:

- workflow engines;
- prompt and context construction;
- model routing;
- tool invocation;
- agent loops;
- state management;
- retries and timeouts;
- human approval steps;
- policy enforcement; and
- failure handling.

A useful distinction is:

| Component | Primary responsibility | Typical behavior |
|---|---|---|
| Workflow | Executes a known sequence | Deterministic sequence |
| Orchestrator | Coordinates components | Controls execution across services |
| Agent | Selects actions dynamically within permissions | Adaptive execution |
| Tool/API | Performs an external operation | Read/write/query/execute |
| Model | Produces predictions, classifications, generations, or other outputs | Probabilistic computation |

### Why this separation matters

Suppose an AI assistant can retrieve portfolio information and also send an email.

The LLM may decide that sending an email is useful, but the LLM should not by itself define whether the action is authorized.

The architecture should instead resemble:

```text
LLM proposes action
       ↓
Policy / Authorization Check
       ↓
Optional Human Approval
       ↓
Tool/API Execution
       ↓
Audit Record
```

This creates a separation between **reasoning** and **authority**.

For consequential workflows, permissions should be explicitly scoped and approval points should be architecturally enforced.

---

## 8.6 Layer 3 — AI, ML, and LLM Models

The model layer may contain several types of computational intelligence.

Examples:

- statistical models;
- deterministic rules;
- classical machine-learning models;
- deep-learning models;
- embedding models;
- reranking models;
- large language models;
- multimodal models; and
- ensembles of several models.

The architecture should assign each model a defined responsibility.

### 8.6.1 Match the method to the claim

A critical advisor question is:

> **What exactly does the model claim to know?**

Consider:

> “Portfolio Company A — probability of material deterioration: 68%.”

The number 68% implies a quantitative statement about uncertainty. The architecture must identify its source.

Possible sources include:

- a statistical model;
- a supervised ML classifier;
- a calibrated predictive model;
- an ensemble;
- a validated risk model;
- a deterministic score mapped to a risk category; or
- an LLM-generated assessment.

These are not equivalent.

An LLM can produce a statement that sounds probabilistic without that statement having the statistical interpretation of a calibrated probability. Therefore, the advisor should not accept a probability merely because it appears in an AI-generated response.

The principle is:

> **The computational method must match the semantic strength of the claim.**

If the system presents a numerical probability, the architecture should define how that probability is generated, validated, calibrated where appropriate, monitored, and interpreted.

### 8.6.2 Different models can solve different subtasks

A realistic AI-IDSS may use:

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

This can be preferable to asking an LLM to perform every computational task.

The advisor is not required to favor ML over LLMs categorically. The objective is **fit-for-purpose computation**.

---

## 8.7 Deterministic Logic vs Probabilistic Intelligence

Enterprise AI architectures often combine deterministic and probabilistic components.

### Deterministic components

Examples:

- arithmetic;
- accounting rules;
- authorization;
- threshold checks;
- data validation;
- workflow transitions;
- policy enforcement;
- API contracts.

### Probabilistic components

Examples:

- classification;
- prediction;
- language generation;
- semantic similarity;
- ranking;
- anomaly detection;
- document interpretation.

A strong architecture does not ask a probabilistic model to replace deterministic controls without justification.

For example:

```text
Is user allowed to access Company A?
            ↓
      Authorization
       (deterministic)

Is Company A showing signs of deterioration?
            ↓
      ML / statistical analysis
       (probabilistic)

What evidence explains the signal?
            ↓
        Retrieval
       + LLM synthesis

Should the company be placed under review?
            ↓
      Human decision
```

This separation improves auditability and reduces ambiguity about what the AI is actually responsible for.

---

## 8.8 Layer 4 — Knowledge and Retrieval

Models do not automatically possess the organization's current authoritative knowledge.

Enterprise AI commonly requires a knowledge layer containing mechanisms such as:

- document repositories;
- structured enterprise data;
- metadata;
- embeddings;
- vector indexes;
- keyword or lexical indexes;
- hybrid retrieval;
- reranking;
- access-aware retrieval; and
- evidence references.

Retrieval-Augmented Generation (RAG) is one architectural pattern for connecting a model to external knowledge without requiring that knowledge to be encoded into model parameters.

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

The critical architectural issue is not simply whether a vector database exists. It is whether retrieval reliably supplies **the right authorized evidence**.

### Retrieval quality is a system property

Poor answers may originate from:

- incomplete ingestion;
- bad parsing;
- poor chunking;
- weak metadata;
- inappropriate embedding/search strategy;
- incorrect filters;
- stale indexes;
- failed authorization filtering;
- ranking errors; or
- model interpretation errors.

Therefore, “the LLM hallucinated” may be an incomplete diagnosis.

The architecture review should determine **which stage introduced the failure**.

---

## 8.9 Layer 5 — Data, Integration, and Processing

Enterprise AI depends on data architecture more than many AI proposals acknowledge.

Potential sources include:

- ERP systems;
- financial statements;
- market-data platforms;
- CRM systems;
- internal documents;
- investment memoranda;
- selected communications;
- research databases; and
- external intelligence.

The data layer must address:

- source authority;
- schema and semantics;
- data quality;
- freshness;
- lineage;
- access control;
- transformation;
- deduplication;
- retention; and
- synchronization.

For the advisor, an important principle is:

> **The AI system should consume authoritative enterprise data; it should not silently become the authoritative source of that data.**

This is especially important for financial and investment use cases.

### 8.9.1 Source authority

For each important data element, the architecture should identify the authoritative source.

For example:

| Information | Possible authoritative source |
|---|---|
| General ledger balance | ERP / accounting system |
| Market price | Approved market-data provider |
| Investment thesis | Approved investment repository |
| Legal agreement | Controlled document repository |
| AI-generated summary | AI system output — not source of record |

If multiple sources disagree, the system should not silently choose one merely because it was retrieved first.

### 8.9.2 Data freshness

A recommendation is only as useful as the temporal validity of its evidence.

The architecture should therefore distinguish:

- event time;
- source update time;
- ingestion time;
- processing time; and
- recommendation time.

This becomes particularly important when AI combines financial statements, market data, and documents with different update frequencies.

---

## 8.10 Layer 6 — Infrastructure

Infrastructure provides the execution environment for all upper layers.

It may include:

- public or private cloud;
- compute;
- GPU infrastructure;
- CPU infrastructure;
- storage;
- databases;
- networks;
- private connectivity;
- secrets and key management;
- observability platforms; and
- backup and disaster-recovery mechanisms.

Infrastructure decisions should follow system requirements rather than precede them.

For example, “we need GPUs” is not an architecture. The advisor should establish:

- which workloads require GPU acceleration;
- whether inference is hosted internally or externally;
- expected concurrency;
- latency requirements;
- model size;
- availability requirements;
- utilization assumptions;
- scaling characteristics; and
- total cost of ownership.

The same principle applies to cloud topology. “Private cloud” or “on-premise” is not automatically more secure or more appropriate; security depends on the complete architecture and operational controls.

---

## 8.11 Cross-Cutting Architecture Concerns

The following concerns cut across every layer.

### Security

Security boundaries should be designed across identity, data, APIs, models, tools, networks, and user interfaces.

### Identity and authorization

A system must know not only **who the user is**, but **what that identity is permitted to access and do**.

The same principle applies to service identities and AI agents.

### Governance

Policies should be enforceable through architecture where practical, rather than existing only as documentation.

### Evaluation

AI output quality must be measured against explicit evaluation criteria. A system cannot be considered production-ready merely because individual demonstrations look impressive.

Evaluation should cover both component-level and end-to-end behavior.

### Observability

Production systems need visibility into:

- latency;
- failures;
- model usage;
- retrieval behavior;
- tool calls;
- token or compute consumption;
- cost; and
- relevant quality indicators.

### Auditability

For consequential outputs, the system should preserve enough information to reconstruct what happened, subject to applicable privacy and retention requirements.

A useful conceptual audit chain is:

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

### Reliability

The architecture should define behavior when models, APIs, data sources, networks, or downstream systems fail.

### Economics

The relevant measure is not model price alone. The advisor should evaluate the cost of the complete system: infrastructure, model usage, data, storage, networking, engineering, security, operations, support, and failure handling.

### Interoperability

AI components should integrate with enterprise systems through explicit contracts rather than creating isolated AI islands.

---

## 8.12 AI Request Lifecycle

A complete request should be viewed as a sequence of controlled transformations rather than a single prompt sent to an LLM.

For an AI-IDSS request such as:

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

However, the flow illustrates an important principle:

> **The prompt is only one step in the request lifecycle.**

This is why prompt engineering alone cannot define enterprise AI architecture.

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

The LLM may be responsible for synthesis and explanation while another model produces the probability.

This architecture is stronger than:

```text
Documents → Prompt → LLM → “68% probability”
```

because the latter does not establish what the number means or how it was derived.

The advisor should therefore insist on a distinction between:

1. **Source evidence** — what the organization or external source actually reported.
2. **Analytical output** — what deterministic/statistical/ML processing calculated.
3. **Model interpretation** — what an AI model inferred or synthesized.
4. **Recommendation** — what action the system suggests.
5. **Decision** — what the authorized human ultimately decides.

---

## 8.14 Determining Where a Failure Occurred

When an AI output is wrong, “the AI failed” is not a sufficient root-cause analysis.

The advisor should locate the failure in the chain.

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

This decomposition is important for both technical remediation and accountability.

A model replacement may not fix a retrieval problem. A better prompt may not fix stale data. More GPU capacity may not fix an authorization defect.

---

## 8.15 AI Architecture Quality Attributes

AI architectures should be evaluated against explicit quality attributes.

| Attribute | Architectural question |
|---|---|
| Correctness | Does the system produce the intended result? |
| Accuracy | How often is the output correct under defined evaluation conditions? |
| Security | Can unauthorized access or manipulation occur? |
| Privacy | How is sensitive information controlled? |
| Reliability | Does the system behave acceptably when components fail? |
| Availability | Is the service available at the required level? |
| Latency | Can it respond within the required time? |
| Throughput | Can it handle the expected workload? |
| Scalability | Can capacity grow without disproportionate redesign/cost? |
| Maintainability | Can the system be changed safely? |
| Interoperability | Can it integrate with surrounding systems? |
| Observability | Can operators understand production behavior? |
| Auditability | Can important decisions be reconstructed? |
| Cost efficiency | Is the outcome economically justified? |
| Reversibility | Can major architecture choices be changed later? |
| Governance | Can policy and accountability be enforced? |

These attributes frequently conflict.

For example:

```text
More control
    → potentially more operational complexity

Higher model capability
    → potentially higher cost / latency

More redundancy
    → higher availability but higher infrastructure cost

More self-hosting
    → potentially more control but greater operational burden

More automation
    → potentially higher efficiency but greater control risk
```

The advisor's task is not to maximize every attribute. It is to identify the appropriate balance under explicit constraints.

---

## 8.16 Architecture Trade-offs

There is rarely one universally “best” AI architecture.

The correct question is:

> **Which architecture best satisfies the requirements and constraints of this use case?**

For example, consider two simplified approaches.

### Option A — Managed model service

```text
Enterprise Data
      ↓
Controlled Application / Network
      ↓
Managed LLM Service
      ↓
AI Application
```

Potential advantages:

- lower model-serving operational burden;
- faster implementation;
- access to advanced models;
- elastic capacity.

Potential concerns:

- provider dependency;
- data-processing constraints;
- service availability dependency;
- cost at scale;
- portability.

### Option B — Self-hosted model

```text
Enterprise Data
      ↓
Internal Processing
      ↓
Self-hosted Model
      ↓
AI Application
```

Potential advantages:

- greater control over deployment;
- potentially stronger isolation for selected workloads;
- greater control over model lifecycle.

Potential concerns:

- GPU and infrastructure requirements;
- model-serving operations;
- patching and security;
- capacity planning;
- model upgrades;
- engineering burden;
- potentially weaker capability depending on the selected model.

Neither option is universally superior.

The advisor should compare them against the actual requirements rather than applying a generic “cloud is better” or “on-premise is safer” rule.

---

## 8.17 Architecture Before Vendor

Vendor evaluation should occur after the architectural requirements and constraints are sufficiently understood.

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

A vendor may provide an excellent implementation of one architectural option while another option is better suited to the organization's constraints.

The advisor should therefore remain vendor-neutral until the architectural problem has been framed.

---

## 8.18 Architecture Anti-Patterns

The following patterns should trigger technical scrutiny.

### 1. LLM-centric architecture

Everything is routed through an LLM regardless of whether the task is deterministic, statistical, transactional, or retrieval-oriented.

**Challenge:** Why is an LLM required for this step?

### 2. Vendor-first architecture

A vendor or model is selected before requirements and architecture are established.

**Challenge:** Which architectural requirement made this vendor necessary?

### 3. RAG as a solution to bad data

The organization assumes that adding a vector database will solve data-quality or data-governance problems.

**Challenge:** Is the source data correct, complete, current, and authoritative?

### 4. Prompt as business logic

Critical business rules exist only inside prompts.

**Challenge:** Which rules require deterministic enforcement outside the model?

### 5. Unrestricted agent permissions

An agent receives broad access to enterprise systems because it is convenient.

**Challenge:** What is the minimum permission required for each action?

### 6. AI as system of record

AI-generated conclusions overwrite or replace authoritative enterprise information.

**Challenge:** What is the actual system of record?

### 7. Probability without a probabilistic model

The system generates precise percentages without a defined statistical interpretation.

**Challenge:** What exactly does the number mean and how was it validated?

### 8. GPU-first architecture

Infrastructure is purchased before workload characteristics are understood.

**Challenge:** What workload requires this capacity, and what is the expected utilization?

### 9. Demo-driven production readiness

A successful demonstration is treated as evidence that the production architecture is ready.

**Challenge:** Where are the evaluation results, failure tests, security tests, load tests, and operational controls?

### 10. No degradation strategy

The system has no defined behavior when an LLM, API, retrieval service, or data source becomes unavailable.

**Challenge:** What happens at 99% availability, not just during a successful demo?

---

## 8.19 AI-IDSS Reference Architecture

The target conceptual architecture for the advisor's domain can be represented as:

```text
                         Regional Director
                         / Decision Maker
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
          ┌──────────────┬────────┼────────┬──────────────┐
          ▼              ▼        ▼        ▼              ▼
      Bloomberg         ERP   Financial  Internal      External
                                  Statements Documents  Intelligence
```

Cross-cutting:

```text
Security · Identity · Governance · Audit
Evaluation · Observability · Reliability
Cost · Interoperability · Data Lineage
```

This is a logical reference architecture. Actual implementation may use different physical components.

The key principle is that the LLM is **inside the architecture**, not **the architecture itself**.

---

## 8.20 Example — Investment Risk Alert

Consider the target output:

> **Portfolio Company A — Probability of material deterioration: 68%**
>
> Primary drivers: margin compression, refinancing risk, weakening demand.
>
> Recommended RD action: initiate independent portfolio review.

The architectural questions are deeper than “Which LLM should generate this?”

The advisor should ask:

1. Which systems provide the financial evidence?
2. Which data is authoritative?
3. How fresh is the data?
4. How are conflicting figures reconciled?
5. Which analytical method produces the 68% probability?
6. Is that probability calibrated and evaluated appropriately for its intended use?
7. Which method identifies the primary drivers?
8. Is an LLM used for synthesis, classification, explanation, or prediction?
9. How are supporting documents retrieved?
10. Are portfolio-company permissions enforced during retrieval?
11. Can the system cite the evidence behind the conclusion?
12. What happens when required data is missing?
13. What happens when the model fails?
14. What happens when market data is unavailable or delayed?
15. Who can approve the recommended action?
16. What is recorded for audit?
17. Can the recommendation be reproduced or explained after the fact?

Only after these questions are answered should model and platform selection become central.

---

## 8.21 Technical Challenge Questions

When Head of AI, CTO, engineering teams, or vendors present an AI architecture, the advisor can use the following questions.

### About the model

- What exactly does the model do?
- Why is this model type appropriate?
- What evidence supports the claimed capability?
- What is the evaluation dataset?
- What are the known failure modes?

### About data

- What is the authoritative source?
- How fresh is the data?
- How is data quality checked?
- How are conflicting sources reconciled?
- What happens when data is missing?

### About RAG

- How are documents parsed?
- Why was this chunking strategy selected?
- How is retrieval evaluated?
- How are access permissions enforced?
- Can the answer cite its supporting evidence?

### About agents

- What tools can the agent call?
- What permissions does each tool have?
- Can the agent write or execute actions?
- Which actions require human approval?
- What prevents an unintended tool call?

### About security

- Where does sensitive data travel?
- Where is it stored?
- Who can access it?
- How are identities and service credentials managed?
- What happens if an attacker manipulates retrieved content or instructions?

### About operations

- What is the expected latency?
- What is the expected concurrency?
- How does the system scale?
- What happens when a dependency fails?
- How is production behavior observed?

### About economics

- What is the complete TCO?
- What assumptions drive the cost model?
- How does cost change with usage?
- What is the cost of operating the system internally?
- What is the cost of changing providers later?

### About reversibility

- Can the model be replaced?
- Can the data layer be replaced?
- Can the orchestration layer be replaced?
- Can the organization migrate away from the provider?
- Which architecture decisions are difficult to reverse?

---

## 8.22 Architecture Review Checklist

When reviewing an enterprise AI proposal, verify:

### Problem

- [ ] The business task is explicit.
- [ ] The supported decision is explicit.
- [ ] The required evidence is defined.
- [ ] The human decision boundary is explicit.

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
- [ ] Evidence/provenance can be traced.
- [ ] Missing-data behavior is defined.
- [ ] Production monitoring is defined.

### Economics

- [ ] Total cost is estimated.
- [ ] Scaling assumptions are explicit.
- [ ] Operational burden is included.
- [ ] Vendor dependency is understood.
- [ ] Exit or migration options are considered.

---

## 8.23 Evidence Standard

This chapter establishes conceptual and architectural principles rather than prescribing a particular vendor or product.

The reasoning draws on established areas including:

- software and enterprise architecture;
- information systems architecture;
- machine-learning system design;
- information retrieval and RAG architectures;
- security architecture;
- data governance and lineage;
- reliability engineering; and
- decision-support system design.

The chapter deliberately separates architectural reasoning from vendor-specific claims.

Where later chapters make empirical or vendor-specific claims, those claims should be supported by the stronger evidence hierarchy defined in **Chapter 0 — Reasoning & Evidence Standard**.

In particular, rapidly changing claims about model capability, pricing, deployment options, API behavior, and vendor controls should be verified against current primary documentation rather than treated as permanent architectural facts.

---

## Field Rules

> **Never evaluate an enterprise AI proposal as “a model choice.” Evaluate it as a system.**

> **The computational method must match the semantic strength of the claim.**

> **Every material AI conclusion should have an identifiable chain from authoritative evidence → analytical processing → model output → reasoning/synthesis → recommendation → human decision.**

> **AI should support decision-making without silently becoming the authority for data, policy, or consequential business decisions.**
