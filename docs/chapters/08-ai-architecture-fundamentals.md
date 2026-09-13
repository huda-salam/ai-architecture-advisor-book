# 8. AI Architecture Fundamentals

## Purpose

An enterprise AI system is not a model. It is a socio-technical system that combines models with data, knowledge, software, infrastructure, security controls, workflows, evaluation, and human decision boundaries.

For the technical advisor, this distinction is foundational. Many weak technology proposals begin with a model choice—“Which LLM should we use?”—before defining the system that the model is expected to serve.

The correct question is:

> **What architecture can produce the required outcome reliably, securely, economically, and with an appropriate decision boundary?**

The model is one component of that architecture.

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

A more useful abstraction is:

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

This is a conceptual model rather than a mandatory physical deployment. Some products combine several layers; some architectures split one layer across many services.

---

## 8.2 Layer 1 — Application and User Experience

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

The user interface is therefore not merely presentation. It is part of the **decision boundary**.

For an AI-IDSS, the interface should make it difficult to confuse an AI recommendation with an authorized business decision.

---

## 8.3 Layer 2 — Orchestration, Workflow, and Agents

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

| Component | Primary responsibility |
|---|---|
| Workflow | Executes a known sequence of steps |
| Orchestrator | Coordinates components and decisions |
| Agent | Selects actions dynamically within defined permissions |
| Tool/API | Performs an external operation |
| Model | Produces predictions, classifications, generations, or other model outputs |

The distinction matters because an agent should not automatically receive the permissions of the underlying enterprise system.

For consequential workflows, permissions should be explicitly scoped and approval points should be architecturally enforced.

---

## 8.4 Layer 3 — AI, ML, and LLM Models

The model layer may contain several types of computational intelligence.

Examples:

- statistical models;
- rules and deterministic logic;
- classical machine-learning models;
- deep-learning models;
- embedding models;
- reranking models;
- large language models;
- multimodal models; and
- ensembles of several models.

A common architectural mistake is to make the LLM responsible for a task that is better handled by a deterministic or specialized model.

For example:

> “Probability of material deterioration = 68%”

should not be treated as a credible probability merely because an LLM generated the number.

The architecture must identify the source of that probability. It might be:

- a calibrated statistical model;
- a supervised ML classifier;
- a validated risk model;
- an ensemble;
- a rule-based score mapped to a probability-like scale; or
- an LLM assessment, in which case its interpretation and uncertainty must be treated very differently.

The advisor's responsibility is not to prefer ML over LLMs categorically. It is to ensure that **the computational method matches the claim being made**.

---

## 8.5 Layer 4 — Knowledge and Retrieval

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
Normalization + Metadata
       ↓
Indexing / Retrieval
       ↓
Relevant Context
       ↓
Model
       ↓
Answer + Evidence
```

The critical architectural issue is not simply whether a vector database exists. It is whether the retrieval path reliably supplies **the right authorized evidence**.

---

## 8.6 Layer 5 — Data, Integration, and Processing

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

---

## 8.7 Layer 6 — Infrastructure

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

---

## 8.8 Cross-Cutting Architecture Concerns

Security, governance, evaluation, observability, reliability, and economics cut across every layer.

### Security

Security boundaries should be designed across identity, data, APIs, models, tools, networks, and user interfaces.

### Identity and authorization

A system must know not only **who the user is**, but **what that identity is permitted to access and do**.

### Governance

Policies should be enforceable through architecture where practical, rather than existing only as documentation.

### Evaluation

AI output quality must be measured against explicit evaluation criteria. A system cannot be considered production-ready merely because individual demonstrations look impressive.

### Observability

Production systems need visibility into latency, failures, model usage, retrieval behavior, tool calls, cost, and relevant quality indicators.

### Reliability

The architecture should define behavior when models, APIs, data sources, networks, or downstream systems fail.

### Economics

The relevant measure is not model price alone. The advisor should evaluate the cost of the complete system: infrastructure, model usage, data, storage, networking, engineering, security, operations, support, and failure handling.

---

## 8.9 A Better Mental Model for Enterprise AI

Instead of asking:

> “Which LLM should we use?”

ask:

> “What system must exist for this capability to work correctly?”

Then decompose the problem:

```text
Business Objective
       ↓
Decision / Task
       ↓
Required Evidence
       ↓
Data + Knowledge
       ↓
Processing
       ↓
Model(s)
       ↓
Orchestration / Workflow
       ↓
Application / Decision Interface
       ↓
Human / Business Action
```

This sequence prevents premature model selection.

It also exposes a critical distinction:

**The model answers a computational question. The architecture determines whether that answer can be produced safely and usefully in the enterprise context.**

---

## 8.10 AI Architecture Is a Constraint Problem

Enterprise architecture is rarely about maximizing one metric.

The advisor must balance:

| Dimension | Typical question |
|---|---|
| Capability | Can the system perform the required task? |
| Accuracy | How often is the result correct? |
| Security | What can be accessed, exposed, or abused? |
| Privacy | How is sensitive information controlled? |
| Reliability | What happens when components fail? |
| Latency | Can the system respond within the required time? |
| Scalability | Can it handle future workload? |
| Interoperability | Can it integrate with existing systems? |
| Cost | What is the full lifecycle cost? |
| Reversibility | How difficult is it to change the decision later? |
| Governance | Can the organization control and audit it? |

An architecture that maximizes model capability while violating security or economics is not a successful enterprise architecture.

The objective is an acceptable balance under explicit constraints.

---

## 8.11 Architecture Before Vendor Selection

Vendor evaluation should occur after the architectural requirements and constraints are sufficiently understood.

A disciplined sequence is:

```text
Requirement
    ↓
Constraints
    ↓
Architecture
    ↓
Capabilities required
    ↓
Architectural options
    ↓
Vendor / Build options
    ↓
Technical evaluation
    ↓
Economic evaluation
    ↓
Recommendation
```

This prevents vendor products from becoming accidental architecture.

A vendor may provide an excellent implementation of one architectural option while another option is better suited to the organization's constraints.

The advisor should therefore remain vendor-neutral until the architectural problem has been framed.

---

## 8.12 Example — Investment Risk Alert

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
6. Is that probability calibrated and evaluated?
7. Which model identifies the primary drivers?
8. Is an LLM used for synthesis, classification, explanation, or prediction?
9. How are supporting documents retrieved?
10. Are portfolio-company permissions enforced during retrieval?
11. Can the system cite the evidence behind the conclusion?
12. What happens when required data is missing?
13. What happens when the model fails?
14. Who can approve the recommended action?
15. What is recorded for audit?

Only after these questions are answered should model and platform selection become central.

---

## 8.13 Architecture Review Checklist

When reviewing an enterprise AI proposal, verify:

### Problem
- [ ] The business task is explicit.
- [ ] The supported decision is explicit.
- [ ] The required evidence is defined.

### System
- [ ] Application boundary is defined.
- [ ] Orchestration/workflow is defined.
- [ ] Model responsibilities are defined.
- [ ] Knowledge/retrieval architecture is defined.
- [ ] Data sources are identified.
- [ ] Infrastructure assumptions are explicit.

### Control
- [ ] Identity and authorization are defined.
- [ ] Sensitive-data boundaries are defined.
- [ ] Human approval boundaries are defined.
- [ ] Auditability is addressed.
- [ ] Failure behavior is defined.

### Quality
- [ ] Evaluation methodology exists.
- [ ] Model claims match the underlying computational method.
- [ ] Evidence/provenance can be traced.
- [ ] Missing-data behavior is defined.

### Economics
- [ ] Total cost is estimated.
- [ ] Scaling assumptions are explicit.
- [ ] Vendor dependency is understood.
- [ ] Exit or migration options are considered.

---

## 8.14 Evidence Standard

This chapter contains architectural principles and conceptual distinctions rather than claims about a particular vendor or product.

The reasoning draws on established areas including:

- software and enterprise architecture;
- information systems architecture;
- machine learning system design;
- information retrieval and RAG architectures;
- security architecture;
- data governance and lineage;
- reliability engineering; and
- decision-support system design.

Where a later chapter makes empirical or vendor-specific claims, those claims should be supported by the stronger evidence hierarchy defined in **Chapter 0 — Reasoning & Evidence Standard**.

In particular, rapidly changing claims about model capability, pricing, deployment options, API behavior, and vendor controls should be verified against current primary documentation rather than treated as permanent architectural facts.

---

## Field Rule

> **Never evaluate an enterprise AI proposal as “a model choice.” Evaluate it as a system.**
>
> **Architecture determines how data, knowledge, models, workflows, controls, infrastructure, and humans work together. The LLM is only one component.**
