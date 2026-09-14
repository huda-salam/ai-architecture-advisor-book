# Chapter 39 — AI Architecture Review

> **Advisor question:** Does the proposed AI architecture satisfy the decision's requirements, constraints, risks, evidence requirements, and operating model — and is there a materially better architecture we should choose instead?

## FOUNDATION

An AI architecture review is an independent technical examination of a proposed system before a material architectural commitment is made.

It is not:

- a design presentation;
- a product demonstration;
- a security review performed in isolation;
- a code review;
- an approval ceremony;
- a search for reasons to reject the proposal.

The review asks whether the architecture is **fit for its intended purpose** and whether the evidence is sufficient to justify the decision.

NIST SP 800-160 Rev. 1 treats systems engineering as a disciplined activity spanning requirements, architecture, design, risk, security, resilience, verification, validation, and the system life cycle. NIST AI RMF similarly treats AI risk management as an iterative activity across design, development, deployment, use, and evaluation. These are useful foundations for an architecture review, although neither document prescribes this exact review process.  
Sources:  
- NIST SP 800-160 Rev. 1: https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final  
- NIST AI RMF: https://www.nist.gov/itl/ai-risk-management-framework

---

## 39.1 The Purpose of an Architecture Review

The review should reduce the probability of committing to an architecture that is:

- technically infeasible;
- unnecessarily complex;
- insecure;
- unreliable;
- uneconomic;
- difficult to operate;
- difficult to evaluate;
- excessively dependent on one provider;
- inconsistent with the organization's data or identity boundaries;
- unable to produce sufficiently trustworthy evidence for its intended decisions.

The advisor is not trying to prove that the proposed architecture is perfect.

The objective is to determine whether the architecture is sufficiently justified for the decision being made.

**Field rule:**

> Review the architecture against the decision, not against architectural fashion.

---

## 39.2 Architecture Review vs Technical Due Diligence

Chapter 38 asks whether a technology proposition is credible enough to justify commitment.

Chapter 39 asks whether the **architecture assembled from those technologies** is coherent and fit for purpose.

The distinction is useful:

| Activity | Primary question |
|---|---|
| Technical due diligence | Can we trust the technology proposition sufficiently to proceed? |
| Architecture review | Does the proposed system design correctly use those technologies? |
| Security review | Are security requirements and controls adequately addressed? |
| Model evaluation | Does the model/system perform sufficiently for the intended task? |
| Production readiness review | Can the system be operated safely and reliably? |

These reviews can overlap, but they should not be treated as interchangeable.

---

## 39.3 Start With the Decision and Scope

Before reviewing diagrams, define:

1. What decision is being requested?
2. What system or change is in scope?
3. What is explicitly out of scope?
4. What is the consequence of an architectural error?
5. What commitments become difficult to reverse after approval?

Examples:

- approve an AI-IDSS reference architecture;
- select an LLM serving pattern;
- approve access to portfolio-company data;
- introduce an agent that can call enterprise systems;
- migrate from one model provider to another;
- move an AI workload into production.

The review depth should be proportional to consequence, uncertainty, and reversibility.

This is an **advisor recommendation**, not a universal governance requirement.

---

## 39.4 Review the Requirements Before the Components

A common failure is to start with the proposed technology:

> “We selected this model, therefore how should we deploy it?”

The advisor should reverse the sequence:

```text
Decision / Use Case
        ↓
Requirements
        ↓
Constraints
        ↓
Quality & Risk Objectives
        ↓
Architecture Options
        ↓
Chosen Architecture
        ↓
Evidence / Verification
```

Requirements should include, where relevant:

- functional behavior;
- data requirements;
- security requirements;
- identity and authorization;
- latency;
- throughput;
- availability;
- recovery;
- model quality;
- explainability/evidence;
- auditability;
- cost;
- scalability;
- interoperability;
- portability;
- regulatory or contractual constraints.

An architecture cannot be judged rigorously when the requirements are undefined.

---

## 39.5 Requirements-to-Architecture Traceability

For material decisions, maintain a simple traceability table.

| Requirement | Architectural response | Evidence | Status |
|---|---|---|---|
| sensitive data must remain within approved boundary | controlled data plane + private integration | architecture + configuration test | Verified |
| RD needs evidence for alerts | source citations + provenance path | evaluation test | Partial |
| consequential actions require authorization | policy enforcement point | authorization test | Verified |
| provider failure must not silently change decision semantics | explicit fallback policy | failure test | Open |
| cost must remain within approved envelope | workload-based TCO model | cost model | Open |

This changes the review from:

> “Does this architecture look good?”

to:

> “Can each important requirement be traced to an architectural mechanism and supporting evidence?”

The traceability table is an advisor method, not a formal standard artifact.

---

## 39.6 Architecture Views

One diagram is rarely enough.

At minimum, the advisor should seek views that make the relevant risks visible:

### Context view

Who uses the system and which external systems interact with it?

### Logical component view

What are the major capabilities and responsibilities?

### Data-flow view

Where does data originate, move, transform, persist, and leave?

### Trust-boundary view

Where do identity, authority, data sensitivity, or operational control change?

### Deployment view

Where do components actually run and what infrastructure supports them?

### Failure/dependency view

Which components and external dependencies can cause failure or degraded behavior?

The exact set of views should be proportional to the decision.

**Advisor rule:** A diagram is evidence only for what it actually represents. A high-level box diagram should not be treated as proof of detailed security, authorization, resilience, or data behavior.

---

## 39.7 The System Boundary

Ask:

> Where does the system begin and end?

For an AI-IDSS this might be:

```text
Enterprise Data Sources
        ↓
Data / Integration Layer
        ↓
AI Processing
        ↓
Models / RAG / Agents
        ↓
Evidence & Decision Support
        ↓
RD Interface
```

But the true boundary may also include:

- cloud control planes;
- model providers;
- identity providers;
- observability platforms;
- external data providers;
- support personnel;
- managed databases;
- software supply chains.

A narrow system boundary can make architecture risk appear smaller than it really is.

---

## 39.8 Data-Flow Review

Trace important data end to end.

For each flow determine:

- source;
- authority;
- classification/sensitivity;
- transformation;
- storage;
- access control;
- retention;
- external transfer;
- deletion;
- audit evidence.

For AI-IDSS, also trace:

```text
Source Data
   ↓
Validated Data
   ↓
Analytical / Model Inputs
   ↓
Retrieved Evidence
   ↓
Model Context
   ↓
Generated Conclusion
   ↓
Evidence / Explanation
   ↓
RD Decision Support
```

If the architecture cannot explain where a material conclusion came from, the review should record an evidence-chain gap.

---

## 39.9 Trust Boundaries and Security Architecture

Security should be reviewed as a system property rather than as a list of security products.

NIST SP 800-160 Rev. 1 explicitly treats security architecture, security requirements, interfaces, risk assessment, verification, validation, and resilience as engineering concerns. NIST's AI RMF provides a complementary risk-management perspective for AI systems.  
Sources:  
- NIST SP 800-160 Rev. 1: https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final  
- NIST AI RMF Playbook: https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook

Ask:

- Where is identity established?
- Where is authorization enforced?
- Where are secrets held?
- Where does untrusted input enter?
- Where can prompt injection affect behavior?
- Where can data cross organizational boundaries?
- Which component can execute consequential actions?
- What remains protected if the model behaves unexpectedly?

**Core rule:**

> The LLM may participate in reasoning, but it should not silently become the system's authorization boundary.

This is an architectural recommendation derived from applying explicit identity and authorization controls to AI systems, not a direct quotation from NIST.

---

## 39.10 Identity and Authorization Review

Trace authority through the complete execution chain:

```text
Human
  ↓
Application
  ↓
Orchestrator / Agent
  ↓
Tool
  ↓
Enterprise System
```

For each transition ask:

- whose authority is being used;
- how it is represented;
- where it is checked;
- what resource is being accessed;
- what operation is permitted;
- whether privilege is narrowed or expanded;
- whether the event is auditable.

A statement such as “the agent uses the user's permissions” is incomplete until the enforcement mechanism is identified.

---

## 39.11 AI / Model Architecture Review

Do not review the model in isolation.

Review the complete path:

```text
Task
 ↓
Prompt / Context Construction
 ↓
Retrieval / Tools
 ↓
Model
 ↓
Validation
 ↓
Output
 ↓
Human / System Action
```

Ask:

- Is the model actually required?
- Is the selected model appropriate for the task?
- Is the context sufficient?
- Are deterministic rules preferable for part of the workflow?
- What happens when the model is uncertain?
- How are outputs validated?
- How is model change controlled?
- What evidence supports model suitability?

An architecture review should challenge unnecessary model complexity just as aggressively as insufficient model capability.

---

## 39.12 RAG Architecture Review

If RAG is used, review:

1. source authority;
2. ingestion;
3. parsing;
4. chunking;
5. metadata;
6. retrieval;
7. authorization filtering;
8. reranking where applicable;
9. context construction;
10. generation;
11. citations/provenance;
12. freshness;
13. deletion/change propagation;
14. evaluation.

The critical question is:

> Can the architecture reliably provide the model with authorized and decision-relevant evidence under the intended operating conditions?

A vector database is an implementation component, not proof that the RAG architecture is correct.

---

## 39.13 Agentic Architecture Review

For an agent, enumerate authority in concrete operations.

Do not stop at:

> “The agent can access the ERP.”

Instead ask:

- Can it read?
- Can it search?
- Can it create?
- Can it modify?
- Can it approve?
- Can it send?
- Can it execute?
- Can it chain actions?
- Can it act without human confirmation?

Then review:

- tool authorization;
- input validation;
- output validation;
- loop limits;
- retry behavior;
- state and memory;
- human approval;
- audit logging;
- failure containment.

For consequential workflows, the review should explicitly identify where human authority begins and ends.

---

## 39.14 Integration Architecture Review

Review every major system boundary:

- APIs;
- events;
- files;
- CDC;
- queues;
- connectors;
- data pipelines.

Ask:

- Which system is authoritative?
- What consistency is required?
- What happens when delivery fails?
- Are retries safe?
- Can duplicate events cause harmful effects?
- How is identity mapped?
- How are schema and semantic changes managed?
- Can the integration be observed and reconciled?

The advisor should distinguish technical connectivity from semantic correctness.

> Two systems exchanging bytes does not establish that they agree on the meaning of those bytes.

---

## 39.15 Reliability and Failure Review

Review the architecture in failure mode, not only normal operation.

For each critical dependency ask:

```text
Dependency fails
      ↓
What fails next?
      ↓
What degrades?
      ↓
What remains available?
      ↓
What does the user see?
      ↓
Can the decision meaning change?
```

Important scenarios include:

- model provider outage;
- retrieval outage;
- stale data;
- enterprise API failure;
- rate limiting;
- credential expiration;
- network partition;
- corrupted data;
- model version change;
- observability failure;
- partial deployment.

A fallback is not automatically safe.

For example, replacing a current-data risk analysis with a weaker cached answer may preserve availability while silently changing the meaning of the decision support.

**Advisor rule:**

> Graceful degradation must preserve the semantics that matter, or clearly declare that they cannot be preserved.

---

## 39.16 Performance and Scalability Review

Do not ask only:

> “Can it scale?”

Ask:

- What workload?
- What concurrency?
- What latency objective?
- What throughput?
- What peak behavior?
- What quality threshold?
- Which dependency becomes the bottleneck first?
- What happens under partial failure?
- What is the cost of additional capacity?

Review the end-to-end path rather than model inference alone.

```text
Request
 → Gateway
 → Orchestration
 → Retrieval
 → Model
 → Tools
 → Validation
 → Response
```

The architecture should identify the likely bottleneck and explain how it will be measured.

---

## 39.17 Cost and Economic Fitness

An architecture can be technically elegant and economically unjustified.

Review:

- model/API cost;
- compute;
- storage;
- network;
- retrieval;
- observability;
- security controls;
- engineering effort;
- human review;
- support;
- failure cost;
- migration and exit cost.

Use Chapter 34's TCO model and Chapter 35's optimization framework.

The question is not:

> “What is the cheapest architecture?”

It is:

> **Does the architecture deliver the required capability and evidence at an economically justified lifecycle cost?**

---

## 39.18 Vendor Dependency and Reversibility

For material external dependencies, review:

- proprietary APIs;
- proprietary data formats;
- provider-specific model behavior;
- identity dependencies;
- operational tooling;
- contractual constraints;
- export capability;
- migration path;
- replacement testing.

Then classify the decision:

| Dependency | Reversibility | Advisor concern |
|---|---|---|
| Easily replaceable API | High | Low |
| Provider-specific model with portable data | Medium | Moderate |
| Proprietary workflow + model + data | Low | High |
| Critical dependency with no tested exit | Very low | Escalate |

The objective is not zero vendor dependency.

> Dependency is acceptable when it is deliberate, proportionate, understood, and supported by credible contingency options.

---

## 39.19 Observability and Auditability

Ask whether the architecture can explain what happened.

For a consequential AI-IDSS output, the system should be able, where appropriate, to reconstruct:

- request/context;
- relevant data sources;
- retrieved evidence;
- model/version;
- tools invoked;
- important policy decisions;
- validation results;
- final output;
- human action or override.

The exact retention boundary depends on security, privacy, regulatory, operational, and cost requirements.

Observability should also be reviewed as a data-protection issue: logs and traces can themselves contain sensitive prompts, documents, outputs, identifiers, or tool results.

---

## 39.20 Architecture Fitness Review

A useful architecture review separates five questions:

| Dimension | Question |
|---|---|
| Feasibility | Can it work technically? |
| Fitness | Does it satisfy the intended requirements? |
| Trustworthiness | Are material risks controlled and evidence sufficient? |
| Operability | Can the organization operate and recover it? |
| Economics | Is the lifecycle cost justified? |

A proposal should not receive a simple “good architecture” label if one dimension is materially unresolved.

Instead record the specific limitation.

Example:

> Technically feasible; fit for pilot; production authorization remains blocked pending retrieval authorization testing and provider exit validation.

---

## 39.21 Architecture Review Findings

Use consistent finding categories.

### Critical

A material issue that makes the proposed architecture unsafe, infeasible, or unjustifiable for the intended decision.

### High

A significant issue that should be resolved before production commitment.

### Medium

A material weakness that should have an explicit treatment or acceptance decision.

### Low

An improvement opportunity with limited decision impact.

### Observation

A point worth recording but not necessarily a defect.

Severity should be tied to consequence, not technical aesthetics.

---

## 39.22 Review Gates

For a consequential AI system, a staged review can be useful:

```text
Concept
  ↓
Architecture Review
  ↓
Prototype / PoC
  ↓
Evaluation
  ↓
Security / Data Validation
  ↓
Production Architecture Review
  ↓
Production Readiness
  ↓
Operation & Re-review
```

The gates should not become bureaucratic ceremony.

The purpose is to prevent an unresolved architectural assumption from becoming an irreversible production dependency.

NIST AI RMF is explicitly iterative rather than a one-time approval process, and its Playbook is not intended to be a mandatory ordered checklist.  
Source: https://www.nist.gov/itl/ai-risk-management-framework/nist-ai-rmf-playbook

---

## 39.23 Architecture Review Report

A concise executive-facing report can follow this structure:

### 1. Decision Requested

What approval or decision is needed?

### 2. Architecture Summary

What is being proposed?

### 3. Key Requirements

What must the system achieve?

### 4. Major Architectural Decisions

What choices materially affect risk, cost, or reversibility?

### 5. Findings

What is strong, weak, or unresolved?

### 6. Evidence Gaps

Which claims remain insufficiently supported?

### 7. Risks and Conditions

What must be controlled before proceeding?

### 8. Alternatives Considered

What credible alternatives were rejected and why?

### 9. Recommendation

Proceed, proceed with conditions, pilot only, reject, or escalate.

### 10. What Would Change the Recommendation?

What new evidence would cause the advisor to revise the conclusion?

---

## 39.24 AI-IDSS Architecture Review Example

Suppose the proposed architecture is:

```text
Portfolio Data
   ↓
Central Data Platform
   ↓
RAG + LLM
   ↓
Agent
   ↓
Investment Risk Alert
   ↓
RD
```

The advisor should not approve it merely because the components are individually plausible.

Review the complete reasoning chain:

```text
Authoritative Sources
      ↓
Data Validation
      ↓
Risk / Analytical Model
      ↓
Evidence Retrieval
      ↓
LLM Synthesis
      ↓
Validation / Confidence Semantics
      ↓
Risk Alert
      ↓
Human Decision
```

For a statement such as:

> “Portfolio Company A has a 68% probability of material deterioration.”

the architecture review should ask:

1. What component generated the probability?
2. What does “68%” mean statistically?
3. Was the probability calibrated?
4. Which data produced it?
5. Which evidence supports the conclusion?
6. How recent is the evidence?
7. What happens when evidence conflicts?
8. Can the system distinguish missing evidence from negative evidence?
9. How is the conclusion validated?
10. Where is human accountability preserved?

If the architecture cannot answer these questions, the issue is not merely model quality. It is an architecture and evidence-chain problem.

---

## 39.25 Common Architecture Review Anti-Patterns

### Anti-pattern 1 — Reviewing the diagram instead of the requirements

A visually impressive architecture can still fail its requirements.

### Anti-pattern 2 — Reviewing components independently

Good components can form a bad system.

### Anti-pattern 3 — Treating security as a product checkbox

Security depends on architecture, configuration, identity, data flow, and operational behavior.

### Anti-pattern 4 — Treating RAG as grounding by definition

Retrieval quality, authorization, freshness, source authority, and evaluation still matter.

### Anti-pattern 5 — Treating an agent as a user

Agent authority must be explicitly modeled and constrained.

### Anti-pattern 6 — Accepting benchmark evidence without workload context

Benchmark performance does not automatically establish production fitness.

### Anti-pattern 7 — Ignoring failure paths

Normal operation is only one operating state.

### Anti-pattern 8 — Treating fallback as automatically safe

Fallback can change the meaning of an output.

### Anti-pattern 9 — Optimizing cost before defining the objective

Low infrastructure cost can produce a higher total cost if quality, reliability, or human review deteriorates.

### Anti-pattern 10 — Making portability an ideology

Abstraction and multi-provider architecture can create their own complexity and cost.

---

## 39.26 Technical Challenge Questions

Before endorsing an architecture, ask:

### Requirements

- What exact requirement does this component satisfy?
- Which requirement would fail if we removed it?
- Which requirements remain unverified?

### Data

- Which system is authoritative?
- Where does sensitive data cross a trust boundary?
- How is freshness established?

### Security

- Where is authorization enforced?
- What remains secure if the model is manipulated?
- Which trust boundaries are external?

### AI

- Why is an LLM required here?
- What should be deterministic instead?
- How is model uncertainty handled?

### RAG

- Can retrieval return only authorized evidence?
- What happens when authoritative evidence is absent?

### Agents

- What actions can the agent actually cause?
- What stops an unsafe action?

### Reliability

- What happens when the primary dependency fails?
- Does fallback preserve decision semantics?

### Economics

- What assumption dominates TCO?
- What would reverse the economic recommendation?

### Vendor dependency

- What becomes difficult to replace?
- Has the exit path been tested or only described?

### Evidence

- Which claims are facts?
- Which are assumptions?
- Which are recommendations?
- What evidence would change our mind?

---

## 39.27 Architecture Review Checklist

Before final recommendation, verify:

### Scope

- [ ] Decision is explicit
- [ ] System boundary is defined
- [ ] Consequence of failure is understood

### Requirements

- [ ] Functional requirements defined
- [ ] Security requirements defined
- [ ] Performance requirements defined
- [ ] Reliability requirements defined
- [ ] Cost constraints defined
- [ ] Evidence requirements defined

### Architecture

- [ ] Component responsibilities are clear
- [ ] Data flows are understood
- [ ] Trust boundaries are explicit
- [ ] External dependencies are identified
- [ ] Authoritative systems are identified

### AI

- [ ] Model choice is justified
- [ ] RAG design is justified where applicable
- [ ] Agent authority is explicit where applicable
- [ ] Evaluation evidence is relevant
- [ ] Model/version change is controlled

### Security

- [ ] Identity is explicit
- [ ] Authorization is enforced outside model reasoning where required
- [ ] Sensitive data flows are controlled
- [ ] Secrets are managed
- [ ] Audit/security monitoring is adequate

### Operations

- [ ] Failure modes are identified
- [ ] Recovery is designed
- [ ] Observability is adequate
- [ ] Deployment/rollback is understood
- [ ] Operational ownership is clear

### Economics

- [ ] TCO boundary is defined
- [ ] Workload assumptions are explicit
- [ ] Cost drivers are understood
- [ ] Exit/migration costs considered

### Decision

- [ ] Findings are severity-ranked
- [ ] Evidence gaps are explicit
- [ ] Conditions are explicit
- [ ] Alternatives were considered
- [ ] Recommendation is reversible where possible
- [ ] What would change our mind is documented

---

## 39.28 Evidence Discipline

Architecture review should classify statements correctly.

### Fact

Supported by authoritative documentation, standards, specifications, measurements, or other appropriate evidence.

### Theory

An established conceptual basis used to reason about the architecture.

### Technical Evidence

A test, configuration, specification, benchmark, log, or other technical artifact relevant to the claim.

### Industry Evidence

A documented implementation or operational experience. It is evidence, not proof of universal optimality.

### Inference

A reasoned conclusion drawn from available evidence.

### Assumption

A proposition currently required for the architecture or decision but not yet sufficiently verified.

### Recommendation

The advisor's judgment based on the available evidence, constraints, and trade-offs.

### Uncertainty

A material question that remains unresolved.

**Critical rule:**

> Confidence does not upgrade an unsupported architecture claim into a fact.

---

## 39.29 What Would Change Our Mind?

The advisor should document the evidence that could change the recommendation.

Examples:

- representative evaluation results;
- security test findings;
- measured production latency;
- actual workload telemetry;
- successful failure testing;
- a materially different TCO;
- a tested provider-substitution path;
- a new contractual guarantee;
- a change in data requirements;
- a newly discovered architectural dependency.

This makes the review falsifiable rather than rhetorical.

---

## 39.30 Field Rule

The architecture reviewer's job is not to make the architecture look sophisticated.

It is to make the architecture **defensible**.

A defensible architecture has:

```text
Clear Requirements
      ↓
Explicit Constraints
      ↓
Traceable Architecture Decisions
      ↓
Controlled Data / Identity / Security Boundaries
      ↓
Relevant Evaluation Evidence
      ↓
Known Failure Modes
      ↓
Understandable Economics
      ↓
Explicit Residual Uncertainty
      ↓
Clear Decision Boundary
```

> **Approve architecture because its requirements, trade-offs, controls, evidence, and residual risks are understood — not because the diagram is impressive or the technology is fashionable.**
