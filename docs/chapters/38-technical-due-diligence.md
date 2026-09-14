# Chapter 38 — Technical Due Diligence

> **Advisor question:** What evidence do we need to determine whether a proposed AI technology, architecture, vendor, or system is technically credible, sufficiently controlled, and appropriate for the intended use?

## FOUNDATION

Technical due diligence is the structured investigation of a technology proposition before the organization commits material money, architecture, data, operational dependency, or decision authority to it.

It is not a product demonstration, checklist exercise, or security review performed in isolation.

For this advisor role, technical due diligence answers five questions:

1. **What is actually being proposed?**
2. **What evidence supports the vendor's or team's claims?**
3. **What assumptions must be true for the architecture to work?**
4. **What could fail, and what would the consequence be?**
5. **What commitment would the organization be making if it proceeds?**

NIST AI RMF explicitly includes acquisition and third-party AI systems within its risk-management scope. Its Generative AI Profile also points to procurement due diligence, testing, SLAs, and third-party transparency as relevant risk-management mechanisms. urlNIST AI RMF Corehttps://airc.nist.gov/airmf-resources/airmf/5-sec-core/ urlNIST Generative AI Profilehttps://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf

NIST's 2026 Cybersecurity Supply Chain Risk Management Due Diligence Assessment Quick-Start Guide similarly frames supplier due diligence as reasonable research and investigative rigor performed before acquisition decisions are executed. urlNIST C-SCRM Due Diligence Assessment Quick-Start Guidehttps://www.nist.gov/news-events/news/2026/07/nist-releases-finalized-c-scrm-due-diligence-assessment-quick-start-guide

---

## 38.1 Due Diligence Is Not Proof of Perfection

Due diligence cannot prove that a technology will never fail.

Its purpose is to reduce uncertainty sufficiently to support a decision.

The distinction is important:

```text
Claim
  ↓
Evidence
  ↓
Verification
  ↓
Uncertainty
  ↓
Decision
```

A strong due-diligence conclusion may therefore be:

> The architecture is technically feasible and the major risks are understood, but two assumptions remain unverified and should be resolved before production commitment.

That is more useful than an artificial “approved” or “rejected” conclusion based on incomplete evidence.

---

## 38.2 Start With the Decision

Before requesting documents, define the decision that due diligence must support.

Examples:

- select an LLM provider;
- approve a cloud architecture;
- acquire an AI platform;
- approve a production deployment;
- allow a vendor to access sensitive data;
- replace an existing provider;
- adopt an agentic workflow;
- approve an AI-IDSS architecture.

Then define the consequence of being wrong.

A low-criticality internal assistant may require limited investigation.

A system supporting material investment decisions requires substantially stronger evidence.

**Advisor rule:** The depth of due diligence should be proportional to the consequence of the decision and the irreversibility of the commitment.

---

## 38.3 Scope the Technology Boundary

A vendor may describe a product as “an AI platform,” but the actual architecture may contain many separate services.

Map:

```text
User
 ↓
Application
 ↓
Orchestration
 ↓
AI Platform
 ├── Model
 ├── Retrieval
 ├── Tools
 ├── Data
 ├── Guardrails
 └── Observability
 ↓
Enterprise Systems
```

For each component determine:

- who operates it;
- where it runs;
- what data it receives;
- what authority it has;
- what external dependencies it has;
- what is proprietary;
- what is configurable;
- what is replaceable.

Do not evaluate a product label instead of the actual system boundary.

---

## 38.4 Evidence Hierarchy

Not all evidence has the same strength.

A practical hierarchy is:

| Evidence | Typical strength |
|---|---|
| Reproducible test under representative workload | Very high |
| Independent assessment / audit | High |
| Production telemetry from comparable workload | High |
| Technical documentation with verifiable details | Medium–high |
| Customer reference with relevant context | Medium |
| Vendor benchmark | Medium–low unless independently reproducible |
| Demonstration | Low–medium |
| Marketing claim | Low |

This is an advisor heuristic, not a formal universal evidence standard.

Evidence strength depends on the claim being tested.

A vendor's API documentation may be strong evidence for an API capability, while a sales presentation is weak evidence for production reliability.

---

## 38.5 Separate Capability From Performance

A product may support a capability without delivering the required performance.

For example:

> “The platform supports RAG.”

does not answer:

- retrieval recall under the organization's documents;
- authorization behavior;
- latency;
- freshness;
- citation quality;
- scale;
- cost;
- failure handling.

Similarly:

> “The model supports tool calling.”

does not establish that the agent can safely execute the organization's tools.

**Advisor rule:** Capability claims establish possibility; workload evidence establishes suitability.

---

## 38.6 Challenge the Architecture, Not the Vendor

Technical due diligence should not become an adversarial exercise against a supplier.

The advisor should challenge claims, assumptions, and architecture boundaries—not personalities.

Useful language:

> “What evidence supports this requirement?”

> “Under what workload was this benchmark measured?”

> “Which part of this behavior is guaranteed, and which part is expected?”

> “What happens when the dependency is unavailable?”

> “Which controls remain effective if the model behaves unexpectedly?”

This maintains professional independence while improving evidence quality.

---

## 38.7 Architecture Questions

Ask the vendor or internal team to provide an architecture that answers:

- What are the major components?
- What are the trust boundaries?
- Where does data enter and leave?
- Which systems are authoritative?
- Which components are stateful?
- Where is authorization enforced?
- How are secrets managed?
- How are failures isolated?
- How is the system monitored?
- How are versions controlled?
- How is rollback performed?
- What happens if the model/provider is unavailable?

A diagram without data flows and trust boundaries is insufficient for high-consequence due diligence.

---

## 38.8 Data Due Diligence

For each data category determine:

- source;
- owner;
- sensitivity;
- location;
- retention;
- access mechanism;
- transformation;
- processing purpose;
- authorization boundary;
- deletion mechanism;
- export capability.

For AI systems additionally ask:

- Is customer or organizational data used for model training?
- What data is retained?
- What telemetry is generated?
- Where are prompts and outputs stored?
- What happens to deleted data?
- Are third-party subprocessors involved?

These questions should be answered from contractual and technical evidence where possible, not verbal assurances alone.

---

## 38.9 Security Due Diligence

Review security at the architecture level.

Minimum areas may include:

- identity and authentication;
- authorization;
- encryption;
- key management;
- secrets;
- network isolation;
- tenant isolation;
- logging;
- incident response;
- vulnerability management;
- supply-chain controls;
- secure development;
- data protection;
- AI-specific threats.

NIST AI RMF recommends governance and risk controls for third-party AI systems and explicitly identifies third-party software, data, and supply-chain issues. urlNIST AI RMF Core — Govern 6https://airc.nist.gov/airmf-resources/airmf/5-sec-core/

Security evidence should be matched to the actual service boundary. A certificate or audit report covering one service does not automatically prove that every surrounding component is covered.

---

## 38.10 Identity and Authorization Due Diligence

Ask:

> Who can do what, against which resource, on whose authority?

For AI agents, trace the complete chain:

```text
Human
 ↓
Application
 ↓
Agent
 ↓
Tool
 ↓
Enterprise System
```

Determine whether authority is:

- inherited;
- delegated;
- separately assigned;
- constrained by policy;
- audited.

Never accept “the AI follows the user's permissions” without understanding how that permission boundary is technically enforced.

---

## 38.11 Model Due Diligence

For an LLM or AI model, ask:

### Capability

- What tasks was it designed or evaluated for?
- Which modalities are supported?
- What context limits apply?
- What structured-output/tool behavior is supported?

### Evaluation

- Which benchmarks were used?
- Are the benchmarks representative of our workload?
- Is test data contamination addressed?
- Are uncertainty and confidence reported appropriately?
- What failure modes are known?

### Change

- How are model versions released?
- Can behavior change without application code changes?
- What notice is provided?
- Can previous versions remain available?

### Governance

- What documentation is available?
- What limitations are disclosed?
- What third-party dependencies exist?

NIST's current evaluation work emphasizes that AI evaluation methods must be tailored to application context and that TEVV is a structured part of trustworthy AI practice. urlNIST TEVV-Athlon Frameworkhttps://www.nist.gov/artificial-intelligence/ai-research/tevv-athlon-framework-evaluating-ai-systems

---

## 38.12 Benchmark Due Diligence

A benchmark result is not automatically relevant evidence.

Ask:

1. What task was measured?
2. What data was used?
3. Was the test set representative?
4. Was there contamination or leakage risk?
5. What metric was used?
6. What uncertainty exists?
7. What production conditions differ?
8. Can we reproduce the result?

For AI-IDSS, internal evaluation should normally be based on representative decision-support tasks rather than only general-purpose model benchmarks.

---

## 38.13 RAG Due Diligence

If the proposal uses RAG, test the complete retrieval path.

Ask:

- How are documents ingested?
- How are permissions preserved?
- How are documents updated or deleted?
- How are chunks created?
- Is search vector, lexical, hybrid, or another method?
- Is reranking used?
- How is stale content handled?
- How are citations produced?
- How is retrieval quality measured?
- What happens when no authoritative evidence is found?

The key question is not:

> “Does the platform have a vector database?”

It is:

> **Can the system reliably retrieve authorized, relevant, sufficiently current evidence for the intended decision?**

---

## 38.14 Agentic Architecture Due Diligence

For agentic systems inspect:

- available tools;
- tool permissions;
- planning behavior;
- memory;
- state management;
- loop termination;
- retries;
- failure handling;
- human approval;
- action logging;
- output validation.

Ask for an explicit list of actions the agent can cause.

A vendor may describe an agent as “autonomous” without clearly defining the authority boundary.

**Advisor rule:** Due diligence must enumerate agent authority in concrete operations, not marketing terminology.

---

## 38.15 Reliability Due Diligence

Determine:

- service availability objectives;
- failure domains;
- dependency failures;
- rate limits;
- quotas;
- retry behavior;
- timeout behavior;
- disaster recovery;
- RTO/RPO where relevant;
- backup and restore;
- incident response;
- status communication.

Ask for evidence from production or formal testing where possible.

Do not infer reliability from company size, brand reputation, or a polished user interface.

---

## 38.16 Performance and Capacity Due Diligence

Require workload-specific evidence.

Define:

```text
Workload
→ concurrency
→ input/output size
→ target latency
→ throughput
→ peak behavior
→ quality threshold
→ cost constraint
```

Then test the proposed architecture.

Ask vendors to clarify whether reported performance includes:

- network latency;
- queueing;
- retrieval;
- tool calls;
- model generation;
- validation;
- cold starts;
- throttling.

A model's reported token generation speed is not the same as end-to-end application latency.

---

## 38.17 Cost Due Diligence

Do not accept a single “price per token” or subscription figure as the complete economics.

Model:

```text
Total Cost
=
Platform
+ Model
+ Data
+ Compute
+ Network
+ Security
+ Observability
+ Engineering
+ Human Review
+ Migration / Exit
```

Also ask about:

- minimum commitments;
- overage pricing;
- reserved capacity;
- support tiers;
- storage charges;
- data transfer;
- ancillary services;
- price-change mechanisms;
- migration cost.

The TCO boundary should align with Chapter 34.

---

## 38.18 Vendor Dependency Due Diligence

Use Chapter 36's dependency framework.

Ask:

- Which interfaces are proprietary?
- Which data formats are proprietary?
- Which workflows depend on the platform?
- Which model behaviors are provider-specific?
- What happens if the service is discontinued?
- What notice is provided?
- What can be exported?
- How long would migration take?
- What alternative provider has been evaluated?

For critical dependencies, require an explicit exit or contingency strategy.

---

## 38.19 Operational Due Diligence

A technically sound architecture can still fail operationally.

Review:

- deployment process;
- environment separation;
- configuration management;
- monitoring;
- alerting;
- incident management;
- change management;
- rollback;
- on-call ownership;
- skills availability;
- documentation;
- support model.

Ask who will operate the system at 2 a.m. during an incident.

If the answer is unclear, operational risk is not yet understood.

---

## 38.20 Evidence Request Package

A reusable due-diligence request can include:

### Architecture

- current architecture diagram;
- data-flow diagram;
- trust boundaries;
- dependency list;
- deployment model.

### Security

- security architecture;
- relevant certifications/attestations;
- penetration-test summary where available;
- vulnerability-management process;
- incident process.

### AI

- model documentation;
- evaluation methodology;
- known limitations;
- versioning policy;
- safety controls;
- change/deprecation policy.

### Data

- data-flow details;
- retention;
- deletion;
- training-use policy;
- subprocessors;
- residency.

### Operations

- availability targets;
- DR approach;
- support model;
- incident history where contractually available;
- capacity limits.

### Commercial / Exit

- pricing model;
- commitments;
- export capabilities;
- termination/transition terms;
- relevant SLA provisions.

The request should be tailored to the actual decision rather than becoming an indiscriminate document collection exercise.

---

## 38.21 Evidence Gap Register

When evidence is missing, record the gap explicitly.

| ID | Claim | Evidence Needed | Current Evidence | Gap | Decision Impact |
|---|---|---|---|---|---|
| E-01 | provider does not train on customer prompts | contractual + technical evidence | contract draft | unresolved | High |
| E-02 | p95 latency under target workload | representative benchmark | vendor benchmark only | unresolved | Medium |
| E-03 | model replacement is feasible | substitution test | conceptual design | unresolved | High |

This prevents missing evidence from silently becoming an assumption.

---

## 38.22 Assumption Register

Maintain a separate assumption register.

Example:

| Assumption | Why Needed | How to Validate | Impact if False |
|---|---|---|---|
| workload remains below stated peak | capacity model | production telemetry | High |
| provider retains no prompts beyond agreed policy | data-risk model | contract + technical verification | High |
| replacement model meets quality threshold | exit strategy | evaluation | High |

The distinction is critical:

> **An assumption is not evidence.**

---

## 38.23 Proof-of-Concept vs Production Evidence

A proof-of-concept answers:

> Can we make this work?

Production due diligence must answer more:

> Can we operate this safely, reliably, economically, and repeatably under the intended workload?

A successful demo may therefore be necessary but insufficient.

For high-consequence AI systems, testing should progress toward representative workloads, security controls, operational conditions, and evaluation gates.

NIST AI RMF and current NIST TEVV work support context-specific testing and evaluation rather than relying on generic demonstrations. urlNIST AI RMF FAQshttps://www.nist.gov/itl/ai-risk-management-framework/ai-risk-management-framework-faqs

---

## 38.24 Reference Architecture Due Diligence

For an AI-IDSS proposal, the advisor should be able to trace:

```text
Data Sources
    ↓
Integration
    ↓
Data / Cloud Layer
    ↓
Validation / Processing
    ↓
RAG / Analytics
    ↓
Model Layer
    ↓
Agent / Workflow
    ↓
Validation / Evidence
    ↓
AI-IDSS
    ↓
RD Interface
```

Cross-cutting:

**Identity · Security · Governance · Audit · Evaluation · Observability · Cost · Reliability · Vendor Management**

For each arrow ask:

> What can fail here, what evidence proves the interface works, and who owns the consequence?

---

## 38.25 Due-Diligence Decision Classes

A useful output classification is:

### Proceed

Evidence is sufficient and material risks are controlled or accepted.

### Proceed With Conditions

Architecture is viable but specified evidence, controls, or contractual protections must be completed before a defined gate.

### Pilot Only

The proposition is promising but production evidence is insufficient.

### Reject

A hard constraint cannot be satisfied or the residual risk is unacceptable.

### Escalate

The decision depends on organizational risk tolerance, legal interpretation, commercial terms, or another authority outside the advisor's mandate.

This is more informative than a binary technical “yes/no.”

---

## 38.26 Technical Recommendation Format

A concise executive recommendation should contain:

> **Recommendation:** Proceed with conditions.
>
> **Why:** The architecture satisfies the required security and integration constraints, and representative evaluation shows acceptable task performance.
>
> **Material unresolved items:** provider exit testing and final contractual data-retention terms.
>
> **Risk if unresolved:** high.
>
> **Required action:** complete evidence and contract review before production approval.

The advisor should make the decision boundary explicit rather than burying it in technical detail.

---

## 38.27 Common Due-Diligence Anti-Patterns

### Anti-pattern 1 — Demo-Driven Approval

A successful demo is treated as production evidence.

**Correction:** Test representative workloads.

### Anti-pattern 2 — Certification as Architecture Proof

A certification is treated as evidence that the proposed architecture is secure.

**Correction:** Map the certification's scope to the actual service boundary.

### Anti-pattern 3 — Benchmark Worship

A high benchmark score becomes the primary selection criterion.

**Correction:** Evaluate task-specific quality and system behavior.

### Anti-pattern 4 — Document Collection Without Analysis

Hundreds of documents are collected but no decision-relevant evidence gaps are identified.

**Correction:** Start from claims and required evidence.

### Anti-pattern 5 — Vendor Questionnaire as Due Diligence

A completed questionnaire is treated as independent verification.

**Correction:** Verify material claims through testing, contracts, technical documentation, or independent evidence.

### Anti-pattern 6 — Security Review in Isolation

Security is approved while reliability, data, model behavior, and exit risk remain unknown.

**Correction:** Review the complete architecture.

### Anti-pattern 7 — Assuming Missing Evidence Means “No Risk”

**Correction:** Record the gap explicitly and assess its decision impact.

---

## 38.28 Technical Challenge Questions

When reviewing a proposal, ask:

### Architecture

- What exactly are we buying or building?
- What is proprietary?
- What is the trust boundary?
- Which systems remain authoritative?

### Evidence

- Which claims matter to the decision?
- What evidence supports each claim?
- Can we reproduce the evidence?
- What remains unverified?

### AI

- What has actually been evaluated?
- Under what workload?
- How are model changes controlled?
- What happens when the model is wrong?

### Security

- Where is authorization enforced?
- What data crosses the boundary?
- What happens if a prompt or retrieved document is malicious?

### Operations

- How is failure detected?
- How is rollback performed?
- Who operates the system?

### Economics

- What is the complete TCO?
- What assumptions drive the cost model?
- What happens if usage is 2× or 10× forecast?

### Exit

- What happens if the vendor fails, changes price, or changes capability?
- How long would replacement take?
- What evidence supports the estimate?

---

## 38.29 Architecture Review Checklist

- [ ] Decision and consequence are defined.
- [ ] System boundary is documented.
- [ ] Architecture and data flows are available.
- [ ] Authoritative systems are identified.
- [ ] Trust boundaries are identified.
- [ ] Identity and authorization are understood.
- [ ] Security controls are mapped to actual components.
- [ ] Model capability and limitations are documented.
- [ ] Representative evaluation evidence exists.
- [ ] Performance evidence matches the target workload.
- [ ] Reliability and recovery are understood.
- [ ] Complete TCO is modeled.
- [ ] Vendor dependencies are mapped.
- [ ] Exit/contingency strategy is defined where justified.
- [ ] Evidence gaps are explicitly recorded.
- [ ] Assumptions are explicitly recorded.
- [ ] Unresolved high-impact issues have owners and decision gates.
- [ ] Recommendation is stated with confidence and conditions.

---

## 38.30 Evidence Discipline

Classify the conclusion.

### Fact

NIST AI RMF explicitly addresses organizations that acquire and use AI systems, including third-party software, data, and supply-chain issues. urlNIST AI RMF Corehttps://airc.nist.gov/airmf-resources/airmf/5-sec-core/

### Technical Evidence

NIST's Generative AI Profile identifies procurement due diligence, SLAs, and third-party transparency as possible controls for third-party GAI risk. urlNIST Generative AI Profilehttps://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf

### Industry / Practice Evidence

NIST's 2026 C-SCRM due-diligence guide provides an implementation-oriented approach to supplier research and investigative rigor before acquisition. urlNIST C-SCRM Due Diligence Assessment Quick-Start Guidehttps://www.nist.gov/news-events/news/2026/07/nist-releases-finalized-c-scrm-due-diligence-assessment-quick-start-guide

### Recommendation

Use claim-driven, evidence-based due diligence rather than generic questionnaires.

This is an advisor recommendation, not a universal standard.

### Assumption

A material AI-IDSS investment warrants deeper technical investigation than a low-impact productivity tool.

This should be validated against organizational risk tolerance and decision criticality.

---

## 38.31 What Would Change Our Mind?

The advisor should change the recommendation when new evidence materially changes:

- feasibility;
- security posture;
- model quality;
- reliability;
- cost;
- scalability;
- reversibility;
- regulatory exposure;
- operational readiness.

Examples:

> A previously unresolved data-retention concern is resolved by verifiable technical and contractual evidence.

> A vendor benchmark is contradicted by a representative workload test.

> A planned provider exit is shown to require far more engineering effort than assumed.

> A security control is demonstrated to operate outside the model rather than relying on model behavior.

Due diligence should therefore remain a living evidence process until the relevant decision gate is passed.

---

## 38.32 Field Rule

> **Do not approve a technology because it is impressive, popular, certified, inexpensive, or demonstrated successfully. Approve it only when the evidence is sufficient for the decision being made, the material assumptions are visible, the major failure modes are understood, and the residual technical risk is acceptable for the intended use.**

The advisor's job is not to eliminate uncertainty.

It is to prevent the organization from making an irreversible or high-consequence technology commitment while pretending that uncertainty does not exist.
