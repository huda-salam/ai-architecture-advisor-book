# 6. How to Evaluate a Technology Proposal

A technology proposal should not be evaluated by asking whether a technology is good in isolation.

The advisor's question is:

> **Is this technology and architecture appropriate for this specific problem, under these constraints, at this point in time?**

A technically excellent technology can still be the wrong choice when it introduces unnecessary cost, complexity, risk, dependency, or irreversibility.

The advisor must be technically capable enough to understand the proposal at the mechanism level, while remaining independent enough to assess it as a decision rather than as an implementation preference.

## 6.1 The Evaluation Chain

```text
Business Objective
        ↓
Functional Requirements
        ↓
Non-Functional Requirements
        ↓
Constraints
        ↓
Assumptions
        ↓
Architectural Considerations
        ↓
Architectural Options
        ↓
Technical Investigation / Evidence
        ↓
Option Evaluation
        ↓
Trade-offs
        ↓
Failure Modes & Risks
        ↓
Economics
        ↓
Technical Position
        ↓
Recommendation
```

The critical discipline is to avoid jumping directly from **objective → product**.

## 6.2 Understand the Objective

Establish what the organization is actually trying to accomplish, who uses the system, what decision it supports, what information is required, what output is expected, and what happens if the output is wrong.

> **The consequence of failure affects the architecture.**

## 6.3 Functional Requirements

Define what the system must do. For AI-IDSS this may include retrieving portfolio data, retrieving market information, analyzing documents, detecting anomalies, generating evidence-backed analysis, providing citations, recommending actions, supporting multiple users, and enforcing company/user access boundaries.

Evaluate the proposal against these requirements rather than product marketing claims.

## 6.4 Non-Functional Requirements

Architecture is often determined by non-functional requirements such as:

- security and privacy;
- performance and latency;
- scalability;
- availability and reliability;
- governance and auditability;
- data freshness;
- maintainability;
- operational requirements;
- cost.

A system that satisfies functional requirements but violates a critical non-functional requirement is not an acceptable architecture.

## 6.5 Identify Constraints

Constraints may include sensitive data, regulation, existing infrastructure, contractual obligations, legacy systems, available engineering capability, budget, latency requirements, geographic restrictions, and existing vendor commitments.

Distinguish genuine technical constraints from organizational preferences. “We must use Vendor X” may be a commercial decision rather than a technical requirement.

## 6.6 Expose Assumptions

Ask:

> **What must be true for this architecture to work?**

Typical assumptions include workload, data quality, model performance, network latency, API availability, vendor SLA, utilization, retrieval quality, user behavior, and security controls.

Record material assumptions with evidence, confidence, and impact if wrong.

## 6.7 Technical Understanding Before Evaluation

Before judging a proposal, establish enough technical understanding to reconstruct its major mechanisms.

The advisor should be able to explain:

- the main components;
- data flows;
- control flows;
- trust boundaries;
- dependencies;
- scaling mechanism;
- failure behavior;
- security enforcement points;
- operational model;
- principal cost drivers.

If the advisor cannot explain how the architecture works, a strong dissent may be premature.

The correct response may instead be:

> **“I do not yet have sufficient technical understanding to support or challenge this conclusion. I need the following information before forming an independent assessment.”**

## 6.8 Architectural Considerations

**Architectural considerations are the dimensions against which architecture choices should be evaluated.**

They answer:

> **“What do we need to think about before choosing?”**

Common considerations include:

| Consideration | Core question |
|---|---|
| Security | Can the system protect the assets and boundaries involved? |
| Privacy | Is sensitive information handled appropriately? |
| Data sovereignty | Where may data reside and be processed? |
| Identity & access | Who can access which capability or information? |
| Performance | Can latency and throughput requirements be met? |
| Scalability | What happens as usage and data grow? |
| Availability | How much downtime is acceptable? |
| Reliability | Does the system behave predictably? |
| Maintainability | Can the organization operate and change it? |
| Interoperability | Can it integrate with other systems? |
| Observability | Can operators understand system behavior? |
| Auditability | Can important actions and outputs be reconstructed? |
| Cost / TCO | What is the lifecycle cost? |
| Vendor dependency | How dependent are we on a provider? |
| Portability | Can important components or data be moved? |
| Reversibility | How difficult is it to change later? |
| Operational complexity | What expertise is required to run it? |
| Compliance | Does it satisfy applicable obligations? |
| Disaster recovery | What happens after major failure? |
| Human oversight | Where must humans review, approve, or intervene? |

These considerations are **not equally important in every situation**. Their weight should follow the use case, requirements, constraints, and risk profile.

> **The importance of an architectural consideration is itself a function of the use case and risk profile.**

## 6.9 Architectural Options

**Architectural options are alternative ways the system could be designed.**

They answer:

> **“What choices are actually available?”**

Options may exist at several layers.

### Model architecture

- managed LLM API;
- enterprise/private model endpoint;
- self-hosted open model;
- on-premise model;
- hybrid model architecture;
- multi-model architecture.

### Knowledge architecture

- prompting;
- RAG;
- fine-tuning;
- RAG + fine-tuning;
- deterministic knowledge services;
- combinations.

### Data architecture

- centralized;
- federated;
- hybrid;
- source-system query;
- replicated analytical store.

### Processing architecture

- batch;
- asynchronous;
- near-real-time;
- streaming;
- synchronous request/response.

### Integration architecture

- REST APIs;
- event-driven integration;
- message brokers;
- direct connectors;
- integration platforms.

### Agent architecture

- deterministic workflow;
- single agent;
- multi-agent;
- human-in-the-loop workflow;
- agent + deterministic services.

### Infrastructure architecture

- public cloud;
- private cloud;
- hybrid cloud;
- on-premise;
- multi-cloud.

A sound architecture can combine different options at different layers.

## 6.10 Considerations vs Options

These concepts must remain distinct:

> **Considerations tell us what to evaluate.**

> **Options tell us what we can choose.**

Example:

**Requirement:** Analyze sensitive portfolio-company information.

**Considerations:** confidentiality, access isolation, latency, model capability, scalability, cost, vendor dependency, and auditability.

**Options:** managed enterprise LLM, private model endpoint, self-hosted open model, or hybrid model architecture.

Only after both are explicit should the advisor compare the options.

## 6.11 Evaluate Options Against Considerations

A decision matrix makes trade-offs visible:

| Consideration | Managed Enterprise | Private Endpoint | Self-Hosted | Hybrid |
|---|---:|---:|---:|---:|
| Data control | Medium–High | High | Very High | High |
| Operational complexity | Low | Low–Medium | High | Medium–High |
| Scalability | High | High | Depends | High |
| Time to deploy | Fast | Fast–Medium | Slow | Medium |
| Model flexibility | Medium | Medium | High | High |
| Vendor dependency | High | High | Low | Medium |

These are **illustrative dimensions, not universal scores**. Material decisions should use evidence and measurable criteria wherever practical.

## 6.12 Technical Challenge Questions

For any material proposal, the advisor should be able to ask:

### Architecture

- Why this architecture?
- Which requirement drives this component?
- What alternatives were considered?
- Which assumptions are architectural dependencies?

### Data

- Where does data originate?
- Where is it copied?
- Who can access it?
- How is freshness maintained?
- What is the authoritative source?

### AI / model

- What capability requires this model?
- Why this model class?
- Why this deployment model?
- What evidence demonstrates task performance?
- What happens when model behavior changes?

### Operations

- How is it deployed?
- How is it monitored?
- How does it scale?
- How does it fail?
- Who operates it?

### Economics

- What are the main cost drivers?
- What happens at 10× workload?
- What assumptions drive TCO?
- What is the cost of migration or exit?

### Security

- Where is authorization enforced?
- What are the trust boundaries?
- What data leaves which boundary?
- What is retained and logged?
- How are security assumptions tested?

These questions are not a checklist to ask mechanically. They are prompts for technical investigation.

## 6.13 Trade-offs

Typical trade-offs include:

- security vs convenience;
- flexibility vs simplicity;
- performance vs cost;
- portability vs optimization;
- control vs operational burden;
- availability vs infrastructure cost;
- speed-to-market vs architectural maturity;
- centralization vs autonomy.

> **A recommendation without explicit trade-off analysis is incomplete.**

## 6.14 Failure Modes & Risk

Ask:

> **How does this architecture fail?**

For AI-IDSS consider model failure, retrieval failure, stale or incorrect data, authorization failure, integration failure, provider outage, agent/tool failure, and human over-trust.

For each material failure, consider prevention, detection, mitigation, fallback, recovery, and human escalation.

## 6.15 Security and Integration

Security is an architectural concern, not merely a final approval gate.

Ask where authentication, authorization, data isolation, encryption, retention, secrets management, and audit are enforced. For AI systems also consider prompt injection, indirect prompt injection, tool abuse, data exfiltration, model abuse, and supply-chain risk.

For integrations, trace:

```text
Authentication → Authorization → Data Request / Ingestion
→ Transformation → Storage / Retrieval → Processing
→ Output → Audit / Monitoring
```

## 6.16 Technical Economics

Evaluate lifecycle cost:

```text
Software + Model inference + Compute/GPU + Storage + Network
+ Data + Engineering + Security + Observability
+ Operations + Support + Licensing + Integration + Exit/Migration
```

The question is:

> **What is the total cost of operating this capability at the required quality and scale?**

## 6.17 Vendor Dependency and Reversibility

Ask:

> **How difficult would it be to change our mind?**

Evaluate data portability, API portability, model portability, proprietary formats, contractual exit terms, personnel dependency, and migration effort.

> **Make strategic lock-in deliberate rather than accidental.**

## 6.18 Evidence and Confidence

Important claims should identify whether they rely on direct measurement, independent evaluation, documented production evidence, industry evidence, technical documentation, expert judgment, or assumptions.

State confidence when uncertainty is material.

## 6.19 Recommendation

A decision-oriented recommendation should state:

- preferred option;
- material rationale;
- key risks;
- conditions before proceeding;
- principal alternatives rejected;
- confidence;
- what would change the recommendation.

## 6.20 Technology Proposal Review Template

```text
OBJECTIVE
USERS / DECISION
FUNCTIONAL REQUIREMENTS
NON-FUNCTIONAL REQUIREMENTS
CONSTRAINTS
ASSUMPTIONS
ARCHITECTURAL CONSIDERATIONS
ARCHITECTURAL OPTIONS
TECHNICAL MECHANISM / DEPENDENCIES
OPTION EVALUATION
TRADE-OFFS
FAILURE MODES / RISKS
SECURITY
INTEGRATION
ECONOMICS / TCO
VENDOR DEPENDENCY
REVERSIBILITY
EVIDENCE
TECHNICAL POSITION
RECOMMENDATION
CONFIDENCE
WHAT WOULD CHANGE OUR MIND?
```

## 6.21 Communication of the Assessment

Keep analysis and communication distinct.

**Technical thinking:**

> Requirement → Constraint → Assumption → Technical Mechanism → Considerations → Options → Evaluation → Trade-offs → Risk → Cost → Recommendation

**Executive communication:**

> Context → Finding → Evidence → Implication → Recommendation → Conditions

The first determines the quality of analysis. The second determines whether the decision maker can use it effectively.

## Field Rule

> **Understand the mechanism. Challenge the assumption. Compare the alternatives. Test the material uncertainty. State the technical position. Then recommend.**
