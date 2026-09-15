# AI Architecture Patterns & Anti-Patterns

> **ADVISOR LENS**

## Purpose

AI architecture proposals often arrive as collections of products and components. An advisor needs a faster way to recognize the underlying architectural pattern, determine whether it fits the problem, and identify predictable failure modes.

This chapter is a pattern-recognition and challenge reference. It does not prescribe a single architecture.

## 1. Pattern Recognition Before Product Selection

Start by identifying the system shape:

```text
Business Need
    ↓
AI Role
    ↓
System Pattern
    ↓
Required Controls
    ↓
Technology Choices
```

The same model can participate in very different architectures. A model choice therefore does not define the architecture by itself.

Technical depth: see [Chapter 8 — AI Architecture Fundamentals](./08-ai-architecture-fundamentals).

## 2. Direct Generation Pattern

```text
User / Application
        ↓
       LLM
        ↓
     Response
```

### Appropriate when

- the task is primarily generation or transformation;
- external enterprise knowledge is not essential to correctness;
- the risk of unsupported output is acceptable and controlled.

### Advisor questions

- Why is external grounding unnecessary?
- How is output quality evaluated?
- What happens when the model produces an incorrect answer?
- Is the model being used for a task that actually requires a more deterministic mechanism?

Technical depth: see [Chapter 9 — Enterprise LLM Architecture](./09-enterprise-llm-architecture) and [Chapter 31 — Model Evaluation](./31-model-evaluation).

## 3. Retrieval-Augmented Generation Pattern

```text
User Request
     ↓
Retrieval
     ↓
Relevant Context
     ↓
LLM
     ↓
Grounded Response
```

### Appropriate when

- information is organization-specific;
- information changes independently of model training;
- traceable source material is important.

### Advisor questions

- How do we know retrieval found the right evidence?
- What happens when the corpus is incomplete or stale?
- Are access controls preserved during retrieval?
- Does the application distinguish source evidence from generated synthesis?

Technical depth: see [Chapter 10 — RAG Architecture](./10-rag-architecture) and [Chapter 32 — Fine-Tuning vs RAG vs Prompting](./32-fine-tuning-vs-rag-vs-prompting).

## 4. Tool-Calling / AI-Assisted Workflow Pattern

```text
User
 ↓
AI Reasoning / Interpretation
 ↓
Approved Tool
 ↓
Enterprise System
 ↓
Result
 ↓
AI / Application
```

### Appropriate when

AI needs controlled access to deterministic enterprise capabilities.

### Advisor questions

- What tools may be invoked?
- Who authorizes each invocation?
- Can the model supply unsafe parameters?
- Are tool permissions narrower than user permissions where necessary?
- How are failed or partial actions handled?

Technical depth: see Chapters 11, 20, 22, 23 and 24.

## 5. AI-Assisted Decision Support Pattern

```text
Authoritative Data
       ↓
Evidence / Analysis
       ↓
AI Synthesis
       ↓
Recommendation
       ↓
Human Decision
```

This is the principal pattern for consequential decision-support systems such as AI-IDSS.

### Advisor questions

- What is authoritative?
- What is inferred?
- What evidence supports the recommendation?
- What authority does the AI actually have?
- Can the decision-maker inspect and challenge the reasoning?

Technical depth: see Chapters 26–29.

## 6. Workflow vs Agent Pattern

A critical architectural choice is whether a task needs a deterministic workflow or a more autonomous agentic loop.

### Prefer workflow when

- steps are known in advance;
- transitions can be expressed deterministically;
- permissions and outcomes are predictable;
- repeatability is important.

### Consider an agent when

- the task requires dynamic selection of tools or steps;
- the environment is variable;
- the value of flexible planning justifies additional uncertainty and control complexity.

The burden of justification rises with autonomy.

> **If a deterministic workflow can achieve the required outcome, an agent should justify its additional complexity.**

Technical depth: see [Chapter 11 — Agentic Architecture](./11-agentic-architecture).

## 7. Model Gateway Pattern

```text
Applications
     ↓
 Model Gateway
  ↙    ↓    ↘
Model A Model B Model C
```

A gateway may centralize routing, policy, telemetry, cost controls, and provider abstraction.

### Advisor questions

- What dependency is actually being abstracted?
- Does the gateway improve portability or merely add another dependency?
- Which model-specific capabilities leak through the abstraction?
- Does it become a reliability or latency bottleneck?
- Can routing decisions be evaluated and audited?

Technical depth: see Chapters 9, 24, 30, 35 and 36.

## 8. Event-Driven AI Pattern

```text
Enterprise Event
       ↓
 Queue / Event Bus
       ↓
 AI Processing
       ↓
 Result / Event
       ↓
 Downstream System
```

Useful when AI processing is asynchronous, decoupled, or workload-variable.

### Advisor questions

- What delivery guarantees are required?
- What happens when AI processing fails?
- Can processing be retried safely?
- How is duplicate processing handled?
- What is the expected end-to-end latency?

Technical depth: see [Chapter 17 — Scalability & Performance](./17-scalability-performance), [Chapter 18 — Reliability](./18-reliability), and [Chapter 23 — Enterprise Integration Architecture](./23-enterprise-integration-architecture).

## 9. Human-Governed Automation Pattern

```text
AI / Automation
      ↓
Policy / Validation
      ↓
Human Approval
      ↓
Controlled Action
      ↓
Audit Evidence
```

The presence of a human does not automatically make the system controlled.

### Advisor questions

- What can the human actually override?
- Is the human given enough evidence and time to intervene?
- Can the system bypass the approval path?
- Is accountability explicit?

Technical depth: see [Chapter 29 — Human Decision Boundary](./29-human-decision-boundary) and [Chapter 41 — Auditability](./41-auditability).

## 10. Common Anti-Patterns

### AI-First Architecture

**Symptom:** The solution begins with an LLM, agent, or AI platform before the problem is defined.

**Challenge:** Why does this problem require AI?

→ [AI Suitability & Opportunity](./05a-ai-suitability-opportunity)

### LLM-as-Architecture

**Symptom:** The model is treated as if it owns security, authorization, workflow, validation, or business rules.

**Challenge:** Which responsibilities remain outside the model?

→ [AI Architecture Fundamentals](./08-ai-architecture-fundamentals)

### Agent-by-Default

**Symptom:** An agent is introduced because the task sounds complex.

**Challenge:** Why is a deterministic workflow insufficient?

→ [Agentic Architecture](./11-agentic-architecture)

### RAG-as-a-Silver-Bullet

**Symptom:** RAG is assumed to eliminate hallucination or guarantee factual correctness.

**Challenge:** How are retrieval quality, corpus quality, source authority, and generation quality evaluated separately?

→ [RAG Architecture](./10-rag-architecture), [Model Evaluation](./31-model-evaluation)

### Benchmark-as-Production-Readiness

**Symptom:** A strong benchmark result is treated as evidence that the enterprise system is ready.

**Challenge:** What system-level evidence is still missing?

→ [Model Evaluation](./31-model-evaluation), [Production Readiness](./40-production-readiness)

### Human-in-the-Loop-as-Control

**Symptom:** A human approval step is assumed to eliminate risk.

**Challenge:** Does the human have meaningful authority, evidence, time, and ability to intervene?

→ [Human Decision Boundary](./29-human-decision-boundary)

### API-Compatible-as-Portable

**Symptom:** Two providers are declared interchangeable because they expose compatible APIs.

**Challenge:** What application behavior, quality, operational dependency, data path, and economics remain provider-specific?

→ [Vendor Dependency & Exit Strategy](./36-vendor-dependency-exit-strategy).

### Self-Hosted-as-Secure

**Symptom:** Hosting the model privately is treated as proof of superior security.

**Challenge:** Which specific threat or control requirement does self-hosting improve, and what new operational risks does it introduce?

→ [AI Security Model](./19-ai-security-model), [Compute & Model Deployment](./16-compute-model-deployment).

## 11. Pattern Selection Questions

Before accepting an architecture pattern, ask:

1. What problem characteristics require this pattern?
2. What simpler pattern was considered?
3. What assumptions does this pattern introduce?
4. What new failure modes does it create?
5. What controls are required because of those failure modes?
6. What evidence demonstrates that the pattern works for this workload?
7. What operational capabilities must the organization maintain?
8. How reversible is the decision?
9. What parts are standard architectural mechanisms and what parts are vendor-specific?
10. What would make us choose a different pattern?

## Field Rule

> **Recognize the pattern before evaluating the product. Challenge the pattern before optimizing its implementation.**
