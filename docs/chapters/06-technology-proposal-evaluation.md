# 6. How to Evaluate a Technology Proposal

A technology proposal should not be evaluated by asking whether a technology is good in isolation.

The advisor's question is:

> **Is this technology and architecture appropriate for this specific problem, under these constraints, at this point in time?**

A technically excellent technology can still be the wrong choice when it introduces unnecessary cost, complexity, risk, dependency, or irreversibility.

## 6.1 The Evaluation Chain

The default analysis sequence is:

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
Option Evaluation
        ↓
Trade-offs
        ↓
Failure Modes & Risks
        ↓
Economics
        ↓
Recommendation
```

The critical discipline is to avoid jumping directly from **objective → product**.

## 6.2 Understand the Objective

First establish what the organization is actually trying to accomplish.

For example:

> “Build an AI investment assistant.”

is too vague.

A more useful formulation might be:

> “Allow the investment team to obtain evidence-backed analysis of portfolio-company performance.”

Then determine:

- Who uses it?
- What decision does it support?
- What information is required?
- What output is expected?
- How frequently is it used?
- What happens if the output is wrong?

The consequence of error matters because architecture requirements depend on the risk of failure.

## 6.3 Functional Requirements

Functional requirements describe what the system must do.

For an AI-IDSS, examples may include:

| Requirement | Example |
|---|---|
| Retrieve portfolio data | Financial statements, ERP data |
| Retrieve market information | Market-data feeds |
| Analyze documents | Investment memos, reports |
| Detect anomalies | Margin deterioration |
| Generate analysis | Risk explanation |
| Provide evidence | Source citations |
| Recommend action | Portfolio review |
| Support users | Investment team |
| Enforce authorization | Company/user access boundaries |

The proposal should be evaluated against these requirements rather than against product marketing claims.

## 6.4 Non-Functional Requirements

Non-functional requirements frequently determine the architecture more strongly than functional requirements.

Consider:

### Security

- authentication;
- authorization;
- encryption;
- tenant isolation;
- data residency;
- secrets management.

### Performance

- latency;
- throughput;
- concurrency;
- data freshness.

### Reliability

- availability;
- recovery;
- failover;
- graceful degradation.

### Scalability

- users;
- data volume;
- transactions;
- model requests.

### Governance

- auditability;
- lineage;
- traceability;
- retention.

### Economics

- infrastructure;
- model inference;
- storage;
- engineering;
- operations;
- licensing.

A system that satisfies its functional requirements but violates a critical non-functional requirement is not an acceptable architecture.

## 6.5 Identify Constraints

Constraints limit the solution space.

Examples include:

- sensitive data;
- regulatory requirements;
- existing infrastructure;
- contractual obligations;
- legacy systems;
- available engineering capability;
- budget;
- latency requirements;
- geographic restrictions;
- existing vendor commitments.

The advisor should distinguish a genuine technical constraint from an organizational preference.

For example:

> “We must use Vendor X.”

may be a commercial decision rather than a technical requirement.

That distinction should be made explicit.

## 6.6 Expose Assumptions

Ask:

> **What must be true for this architecture to work?**

Typical assumptions include:

- expected workload;
- model accuracy;
- data quality;
- network latency;
- API availability;
- vendor SLA;
- GPU utilization;
- retrieval quality;
- user behavior;
- security controls.

An assumption register is useful:

| Assumption | Evidence | Confidence | Impact if wrong |
|---|---|---|---|
| 10k AI requests/day | Estimate | Medium | Cost |
| Documents are sufficiently structured | Sample review | Medium | RAG quality |
| Vendor does not retain prompts | Contract | High | Security |
| Model accuracy exceeds target | Benchmark | Low | Decision quality |

An architecture can appear sound simply because its assumptions remain invisible.

---

# 6.7 Architectural Considerations

**Architectural considerations are the dimensions against which architecture choices should be evaluated.**

They answer:

> **“What do we need to think about before choosing?”**

The considerations should be derived from the requirements, constraints, risk profile, and operating context—not treated as a universal checklist that has equal weight in every situation.

Common considerations include:

| Consideration | Core question |
|---|---|
| Security | Can the system protect the assets and boundaries involved? |
| Privacy | Is sensitive information handled appropriately? |
| Data sovereignty | Where may data reside and be processed? |
| Identity & access | Who can access which capability or information? |
| Performance | Can the system meet latency and throughput requirements? |
| Scalability | What happens as usage and data grow? |
| Availability | How much downtime is acceptable? |
| Reliability | Does the system behave predictably under expected conditions? |
| Maintainability | Can the organization operate and change it effectively? |
| Interoperability | Can it integrate with other systems? |
| Observability | Can operators understand system behavior? |
| Auditability | Can important actions and outputs be reconstructed? |
| Cost / TCO | What is the lifecycle cost at the required quality and scale? |
| Vendor dependency | How dependent are we on a particular provider? |
| Portability | Can important components or data be moved? |
| Reversibility | How difficult is it to change the decision later? |
| Operational complexity | What expertise and processes are required to run it? |
| Compliance | Does the architecture satisfy applicable obligations? |
| Disaster recovery | What happens after major component or site failure? |
| Human oversight | Where must humans review, approve, or intervene? |

The advisor should distinguish between **must-have considerations** and **secondary considerations**.

A highly available architecture may be justified for a critical production system but excessive for a low-risk internal prototype.

Therefore:

> **The importance of an architectural consideration is itself a function of the use case and risk profile.**

## 6.8 Architectural Options

**Architectural options are the alternative ways the system could be designed.**

They answer:

> **“What choices are actually available?”**

Options can exist at multiple layers.

### Model architecture

- managed LLM API;
- enterprise/private model endpoint;
- self-hosted open model;
- on-premise model;
- hybrid model architecture;
- multi-model architecture.

### Knowledge architecture

- prompting only;
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

The advisor should not assume that one option must be selected for the entire system. A sound architecture often combines different approaches at different layers.

## 6.9 Considerations vs Options

These two concepts must remain distinct.

> **Considerations tell us what to evaluate.**

> **Options tell us what we can choose.**

For example:

**Requirement:** Analyze sensitive portfolio-company information.

**Considerations:**

- confidentiality;
- access isolation;
- latency;
- model capability;
- scalability;
- cost;
- vendor dependency;
- auditability.

**Options:**

- managed enterprise LLM;
- private model endpoint;
- self-hosted open model;
- hybrid model architecture.

Only after both are explicit should the advisor compare the options.

## 6.10 Evaluate Options Against Considerations

A simple decision matrix can make trade-offs visible:

| Consideration | Managed Enterprise | Private Endpoint | Self-Hosted | Hybrid |
|---|---:|---:|---:|---:|
| Data control | Medium–High | High | Very High | High |
| Operational complexity | Low | Low–Medium | High | Medium–High |
| Scalability | High | High | Depends | High |
| Time to deploy | Fast | Fast–Medium | Slow | Medium |
| Model flexibility | Medium | Medium | High | High |
| Vendor dependency | High | High | Low | Medium |

The values above are illustrative rather than universal scores. Actual evaluation must use the organization's requirements, workload, contractual terms, and technical evidence.

For material decisions, qualitative scores should be supported by measurable criteria wherever practical.

## 6.11 Trade-offs

There is rarely a perfect architecture.

Typical trade-offs include:

- security vs convenience;
- flexibility vs simplicity;
- performance vs cost;
- portability vs optimization;
- control vs operational burden;
- availability vs infrastructure cost;
- speed-to-market vs architectural maturity;
- centralization vs autonomy.

The advisor should explicitly state what the organization gains and gives up with each option.

> **A recommendation without an explicit trade-off analysis is incomplete.**

## 6.12 Failure Modes

Ask:

> **How does this architecture fail?**

For AI-IDSS, consider:

### Model failure

The model produces an incorrect conclusion.

### Retrieval failure

The correct information exists but is not retrieved.

### Data failure

The underlying data is stale, incomplete, or incorrect.

### Authorization failure

The system retrieves information the user should not see.

### Integration failure

A source system or API becomes unavailable.

### Provider failure

An external model provider becomes unavailable.

### Agent failure

An agent selects the wrong tool or performs an unauthorized action.

### Human failure

A user gives inappropriate weight to an AI recommendation.

The architecture should define appropriate prevention, detection, fallback, recovery, or human escalation mechanisms.

## 6.13 Security and Architecture Review

Security should be evaluated as part of architecture rather than as a final approval step.

Ask:

- Where is the security boundary?
- Where is authentication enforced?
- Where is authorization enforced?
- Can retrieval cross company or user boundaries?
- Where is sensitive data stored?
- Where is it processed?
- What is retained?
- How are keys and secrets managed?
- What happens when a component is compromised?

For AI systems, also consider prompt injection, indirect prompt injection, tool abuse, data exfiltration, model abuse, and supply-chain risk.

## 6.14 Integration

Architecture should account for how the proposed system interacts with existing systems.

For each important integration, establish:

```text
Authentication
      ↓
Authorization
      ↓
Data ingestion / request
      ↓
Transformation
      ↓
Storage / retrieval
      ↓
Processing
      ↓
Output
      ↓
Audit / monitoring
```

A technically excellent AI component can still be a poor enterprise architecture if integration is fragile or creates an unacceptable operational dependency.

## 6.15 Technical Economics

Evaluate the lifecycle cost rather than merely the software price.

```text
Software
+ Model inference
+ Compute / GPU
+ Storage
+ Network
+ Data
+ Engineering
+ Security
+ Observability
+ Operations
+ Support
+ Licensing
+ Integration
+ Migration / exit cost
```

The relevant question is:

> **What is the total cost of operating this capability at the required quality and scale?**

## 6.16 Vendor Dependency and Reversibility

Ask:

> **How difficult would it be to change our mind?**

Evaluate:

- data portability;
- API portability;
- model portability;
- infrastructure portability;
- proprietary formats;
- contractual exit terms;
- personnel dependency;
- migration effort.

Not every component needs to be portable.

Portability itself has a cost.

The principle is:

> **Make strategic lock-in deliberate rather than accidental.**

## 6.17 Evidence and Confidence

Important architecture claims should be traceable to an evidence type:

- direct measurement;
- independent evaluation;
- documented production evidence;
- industry evidence;
- technical documentation;
- expert judgment;
- assumption.

The advisor should state confidence when uncertainty is material.

For example:

> “I recommend managed inference with medium-high confidence. The remaining uncertainty is expected production workload, which should be validated through benchmarking.”

## 6.18 Recommendation

The final output should be concise and decision-oriented.

### Recommendation

State the preferred option.

### Rationale

Give the material reasons.

### Key Risks

Identify the risks that could affect the decision.

### Conditions

State what must be true before proceeding.

### Alternatives Rejected

Explain why the principal alternatives were not selected.

### Confidence

State confidence where useful.

### What Would Change My Mind?

Specify evidence, thresholds, or changed requirements that could invalidate the recommendation.

## 6.19 The Technology Proposal Review Template

```text
TECHNOLOGY PROPOSAL REVIEW

1. Objective
What are we trying to achieve?

2. Users
Who will use it?

3. Decision
What decision does it support?

4. Functional Requirements
What must it do?

5. Non-Functional Requirements
Security?
Performance?
Reliability?
Scalability?
Governance?

6. Constraints
What limits the solution?

7. Assumptions
What must be true?

8. Architectural Considerations
What dimensions matter for this decision?

9. Architectural Options
What viable alternatives exist?

10. Option Evaluation
How does each option perform against the important considerations?

11. Trade-offs
What are we gaining and giving up?

12. Failure Modes
How can it fail?

13. Security
What is the security boundary?

14. Integration
How does it connect to existing systems?

15. Economics
What is the lifecycle cost?

16. Vendor Dependency
How difficult is exit?

17. Reversibility
How difficult is it to change later?

18. Evidence
What supports the important claims?

19. Recommendation
What should we do?

20. Confidence
How confident are we?

21. What Would Change Our Mind?
What evidence could invalidate the recommendation?
```

## 6.20 Communication of the Assessment

The technical analysis and its communication should remain distinct.

**Technical thinking:**

> Requirement → Constraint → Assumption → Considerations → Options → Evaluation → Trade-offs → Risk → Cost → Recommendation

**Executive communication:**

> Context → Assumption → Evidence → Implication → Recommendation

The first determines the quality of the analysis.

The second determines whether the decision maker can use that analysis effectively.

## Field Rule

> **Considerations tell us what to evaluate. Options tell us what we can choose. Evidence and trade-offs tell us why one option is preferable. The recommendation tells the decision maker what we believe should be done.**
