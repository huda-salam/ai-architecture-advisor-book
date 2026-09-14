# Chapter 36 — Vendor Dependency & Exit Strategy

> **Advisor question:** Which dependencies on external technology providers are acceptable, which are strategically material, and what would it take to replace them if the risk, economics, or architecture changes?

## FOUNDATION

Vendor dependency is not inherently a problem. Enterprise systems routinely depend on external providers for cloud infrastructure, software, data, models, security services, and specialized capabilities.

The architectural problem begins when the organization cannot change, constrain, or exit a dependency at a reasonable cost when circumstances require it.

NIST identifies portability and interoperability as important cloud concerns and notes that moving workloads between providers can be difficult when interfaces, formats, and resource definitions are provider-specific. urlNIST Cloud Computing Standards Roadmaphttps://www.nist.gov/publications/nist-cloud-computing-standards-roadmap

NIST's AI Risk Management Framework also explicitly treats third-party AI software, data, hardware, and services as part of the AI risk-management problem and calls for contingency processes for high-risk third-party failures. urlNIST AI RMF — Govern 6 / Manage 3https://airc.nist.gov/airmf-resources/airmf/5-sec-core/

The advisor therefore should not ask:

> **How do we eliminate vendor lock-in?**

The better question is:

> **What level of dependency is justified by the capability, economics, risk profile, and strategic importance of the system?**

---

## 36.1 Vendor Dependency Is an Architecture Risk

A dependency becomes architecturally significant when changing it could materially affect:

- system availability;
- security controls;
- data access;
- model behavior;
- application functionality;
- operating cost;
- regulatory or contractual obligations;
- delivery timelines;
- technical skills;
- ability to recover from provider failure.

This is broader than a contract or licensing issue.

For AI systems, dependency can exist simultaneously at several layers:

```text
Application
    ↓
AI Orchestration
    ↓
Model / Model API
    ↓
RAG / Search
    ↓
Data Platform
    ↓
Cloud Infrastructure
    ↓
Identity / Security / Observability
```

Replacing one vendor may therefore require changes across several layers.

**Advisor rule:** Map the dependency before discussing whether it is acceptable.

---

## 36.2 Lock-In Has Multiple Dimensions

Do not reduce lock-in to “our data is stored with Vendor X.”

Potential dimensions include:

| Dimension | Example dependency |
|---|---|
| Data | proprietary storage format or inaccessible metadata |
| API | provider-specific interfaces |
| Model | behavior tied to one model family |
| Prompting | provider-specific features or semantics |
| Tooling | proprietary orchestration/runtime |
| Identity | provider-specific authorization integration |
| Networking | provider-specific network architecture |
| Observability | proprietary telemetry formats |
| Skills | team expertise concentrated on one platform |
| Commercial | minimum commitments, pricing structure, contract terms |
| Operational | deployment/recovery procedures specific to provider |
| Compliance | controls or certifications tied to a provider |

A system can therefore be highly portable at the data layer while remaining highly dependent at the model or application layer.

---

## 36.3 Technical Lock-In vs Commercial Lock-In

Separate two concepts.

### Technical lock-in

Changing provider requires significant engineering work because the architecture depends on proprietary interfaces, formats, services, or behavior.

### Commercial lock-in

Changing provider is technically feasible but economically or contractually difficult because of:

- termination costs;
- minimum commitments;
- discounts tied to volume;
- migration costs;
- training investments;
- support arrangements;
- contractual restrictions;
- transition time.

They can reinforce each other.

A technically portable architecture may still be commercially difficult to migrate. A commercially flexible contract may not help if the application is deeply coupled to proprietary services.

**Advisor rule:** Assess both engineering switching cost and commercial switching cost.

---

## 36.4 Portability Is Not the Same as Optionality

Portability asks whether a workload or data can technically move.

Optionality asks whether the organization can make a different choice when circumstances change.

A technically portable system may still have poor optionality if migration takes eighteen months and requires rebuilding critical components.

Conversely, an architecture may deliberately accept some technical dependency because the provider's managed capability creates substantial value and the dependency is recoverable enough for the system's risk level.

Therefore:

> **Portability is one mechanism for creating optionality, not the definition of optionality.**

---

## 36.5 Reversibility as an Architecture Property

A useful decision dimension is reversibility.

Ask:

> If this decision proves wrong, how difficult is it to reverse?

A dependency can be classified conceptually as:

| Reversibility | Meaning |
|---|---|
| High | provider can be replaced with limited change |
| Medium | replacement requires planned engineering effort |
| Low | replacement requires major redesign or migration |
| Very low | replacement is technically or economically impractical within the required horizon |

The classification is context-specific.

A low-reversibility dependency may still be acceptable when:

- the capability is strategically important;
- alternatives are materially inferior;
- switching cost is understood;
- failure contingencies exist;
- contractual protections are adequate;
- the expected value justifies the dependency.

**Recommendation:** Treat reversibility as an explicit architecture decision attribute rather than an accidental consequence.

---

## 36.6 Build the Dependency Map

For important systems, document:

```text
Capability
   ↓
Provider
   ↓
Service / Product
   ↓
Interfaces Used
   ↓
Data Controlled by Provider
   ↓
Provider-Specific Features
   ↓
Operational Dependencies
   ↓
Contractual Dependencies
   ↓
Replacement Options
```

For an AI-IDSS, the map may look like:

```text
AI-IDSS
  ├── Cloud provider
  │     ├── Compute
  │     ├── Network
  │     └── Storage
  │
  ├── LLM provider
  │     ├── Model API
  │     ├── Embeddings
  │     └── Safety / moderation service
  │
  ├── Data services
  │     ├── Warehouse
  │     └── Search / vector service
  │
  └── Enterprise systems
        ├── ERP
        ├── Market data
        └── Document repositories
```

The objective is not to eliminate every dependency. It is to make important dependencies visible.

---

## 36.7 The AI Model Dependency Is Special

An LLM dependency can be deeper than an ordinary API dependency because the application may implicitly depend on model behavior.

Examples:

- output structure;
- tool-calling behavior;
- instruction following;
- context-window characteristics;
- reasoning quality;
- safety behavior;
- latency profile;
- tokenization;
- embedding behavior;
- evaluation characteristics.

An API-compatible replacement does not necessarily produce semantically equivalent results.

Therefore:

> **API compatibility does not imply behavioral compatibility.**

This is why model substitution must be treated as an evaluation and architecture problem, not merely a configuration change.

Chapter 31 established the need for representative evaluation. A provider-exit plan should reuse that evaluation capability.

---

## 36.8 Preserve the Vendor-Neutral Core

A useful architectural principle is:

> **Keep strategic business semantics and authoritative data outside provider-specific layers where practical.**

For example, the following should generally remain under application or enterprise control where appropriate:

- business rules;
- authorization policy;
- source-of-record data;
- evidence identifiers;
- evaluation datasets;
- decision thresholds;
- audit records;
- workflow definitions;
- model-selection policy.

Provider-specific capabilities can still be used at the implementation edge.

This creates a boundary:

```text
Enterprise-Controlled Core
--------------------------------
Business semantics
Data authority
Policy
Evaluation
Audit
Workflow

Provider-Specific Edge
--------------------------------
Model API
Managed inference
Provider tools
Specialized services
```

This is an architectural recommendation, not a requirement that every system implement a universal abstraction layer.

---

## 36.9 Do Not Abstract Everything

A common reaction to lock-in is to build a large abstraction layer over every provider.

That can fail because abstraction itself has a cost.

A generic interface may hide provider capabilities that materially improve quality, performance, security, or cost.

It may also create:

- another platform to maintain;
- lowest-common-denominator functionality;
- additional latency;
- additional failure modes;
- duplicated observability;
- additional engineering cost.

Therefore:

> **Abstract stable strategic boundaries, not every implementation detail.**

Use an abstraction when its benefits exceed its complexity.

---

## 36.10 Single Provider vs Multi-Provider

Multi-provider architecture can reduce dependence on one provider, but it introduces additional complexity.

Potential benefits:

- alternative capacity;
- negotiating leverage;
- provider outage contingency;
- model diversity;
- regional availability;
- workload specialization.

Potential costs:

- multiple integrations;
- duplicated testing;
- inconsistent behavior;
- more operational tooling;
- more security configuration;
- more complex observability;
- more difficult incident response;
- potentially lower volume discounts.

NIST's cloud federation work recognizes portability and interoperability as architectural concerns but does not imply that federation is universally the preferred deployment model. urlNIST Cloud Federation Reference Architecturehttps://www.nist.gov/publications/nist-cloud-federation-reference-architecture

**Recommendation:** Use multiple providers when the resilience, optionality, regulatory, or economic benefit justifies the added complexity.

---

## 36.11 Model Routing as Dependency Management

Model routing can be used not only for cost or performance optimization but also for dependency management.

For example:

```text
AI Request
    ↓
Task Classification
    ↓
Model Policy
 ┌──┼───────────┐
 ↓  ↓           ↓
A  B           C
```

However, routing creates its own dependency on:

- routing logic;
- model compatibility;
- evaluation datasets;
- provider availability;
- policy configuration.

Therefore do not introduce routing merely to claim “multi-model architecture.”

The architecture should demonstrate a real requirement for it.

---

## 36.12 Data Portability

Data portability requires more than exporting raw records.

Consider:

- data;
- metadata;
- schemas;
- identifiers;
- timestamps;
- access-control information;
- lineage;
- provenance;
- embeddings where relevant;
- indexes where economically useful;
- configuration;
- retention/deletion state.

NIST notes that data portability depends on well-documented and tested formats and interfaces, and that metadata is important to understanding and moving data between environments. urlNIST Cloud Computing Standards Roadmaphttps://www.nist.gov/publications/nist-cloud-computing-standards-roadmap

For AI systems, also ask:

> Can we reconstruct the information required to reproduce or validate an important result after changing providers?

The answer may be more important than whether the vector database itself is portable.

---

## 36.13 Model and Configuration Portability

A provider-exit plan should identify which artifacts can move.

Potential artifacts include:

- prompts;
- system instructions;
- tool schemas;
- workflow definitions;
- model configuration;
- evaluation datasets;
- evaluation results;
- safety policies;
- retrieval configuration;
- embedding models;
- fine-tuning datasets;
- model weights, where legally and technically available;
- application code.

Do not assume all artifacts are portable.

A managed model API may provide no transferable model weights. A proprietary orchestration service may store workflow state in provider-specific structures.

The correct question is:

> **Which artifacts must be portable for our exit scenario to remain feasible?**

---

## 36.14 Contractual Protections

Architecture cannot solve every dependency risk.

Commercial and legal terms may materially affect exit capability.

For critical providers, procurement and legal review should consider, as applicable:

- service levels;
- incident notification;
- deprecation notice periods;
- data export rights;
- data deletion obligations;
- security obligations;
- audit rights;
- subcontractor transparency;
- termination assistance;
- transition support;
- pricing and change mechanisms;
- minimum commitments;
- data location requirements;
- intellectual-property terms;
- restrictions on use of customer data.

NIST AI RMF guidance explicitly connects third-party AI risk management with procurement, contracts, incident response, testing, documentation, and contingency planning. urlNIST AI RMF Playbook — Govern / Managehttps://airc.nist.gov/airmf-resources/playbook/govern/

**Advisor boundary:** The technical advisor does not replace legal or procurement review. The advisor identifies technical requirements that those functions need to protect contractually.

---

## 36.15 Exit Triggers

An exit strategy is incomplete without defining what could trigger it.

Possible triggers include:

- sustained service degradation;
- unacceptable security incident;
- material contractual change;
- unacceptable price increase;
- loss of required capability;
- regulatory incompatibility;
- provider discontinuation;
- strategic acquisition or ownership change;
- unacceptable concentration risk;
- inability to meet required geographic or residency constraints.

Not every trigger should cause immediate migration.

The purpose is to define decision thresholds before a crisis occurs.

---

## 36.16 Exit Strategy Tiers

A practical exit plan can use tiers.

### Tier 1 — Data Exit

Ensure authoritative data and required metadata can be retrieved in a usable form.

### Tier 2 — Configuration Exit

Ensure critical prompts, policies, workflows, schemas, and evaluation assets are retained under organizational control.

### Tier 3 — Service Substitution

Identify at least one technically plausible alternative and understand the major migration steps.

### Tier 4 — Tested Migration

Perform a controlled migration test for sufficiently critical systems.

### Tier 5 — Operational Independence

Maintain the capability to operate during provider transition or outage with an approved fallback architecture.

Not every dependency requires Tier 5.

The appropriate tier should reflect business criticality, switching cost, risk, and recovery objectives.

---

## 36.17 Exit Is a Capability, Not a Document

A PDF stating “we can migrate to another provider” is not evidence of portability.

Evidence may include:

- successful data export/import test;
- validated alternative provider;
- migration runbook;
- compatibility test suite;
- benchmark comparison;
- restored environment;
- tested identity integration;
- validated security controls;
- cost estimate;
- measured migration duration.

NIST's cloud standards work emphasizes testing and use cases for portability and interoperability rather than treating them as purely contractual concepts. urlNIST Cloud Computing Standards Roadmap / SAJACChttps://www.nist.gov/itl/case-uses-introduction

**Advisor rule:** Treat exit capability as an engineering property that can be tested.

---

## 36.18 AI-IDSS Provider Substitution Pattern

A defensible AI-IDSS architecture can separate provider-specific inference from the rest of the decision-support system.

```text
                         AI-IDSS
                            │
                    Decision Workflow
                            │
                    Policy / Evaluation
                            │
              ┌─────────────┴─────────────┐
              ↓                           ↓
        Evidence / RAG              Model Gateway
              │                           │
        Source Systems              ┌──────┼──────┐
                                    ↓      ↓      ↓
                                  LLM-A  LLM-B  Internal
                                    │      │      │
                                    └──────┴──────┘
                                           │
                                    Model Evaluation
```

The Model Gateway should not become a giant abstraction layer. Its purpose is to create a controlled architectural boundary where substitution is genuinely valuable.

Critical controls should remain outside the model provider where appropriate:

- identity;
- authorization;
- evidence policy;
- audit;
- evaluation;
- decision thresholds;
- human approval.

---

## 36.19 Example: Replacing an LLM Provider

Suppose an AI-IDSS currently uses Provider A.

The architecture team proposes Provider B because of cost or capability.

The advisor should not ask only:

> Does Provider B have a compatible API?

Ask:

1. Can the application invoke B without redesigning the decision workflow?
2. Are prompts and tool schemas portable?
3. Does B support the required structured output and tool behavior?
4. Does retrieval remain unchanged?
5. Are authorization controls unchanged?
6. Does output quality remain within the Chapter 31 evaluation thresholds?
7. Does the risk-alert calibration change?
8. Does latency remain acceptable?
9. Does cost remain within the approved TCO model?
10. Can evidence and audit records still be reconstructed?
11. Are there new security or data-governance implications?
12. What provider-specific features must be removed or replaced?

The migration decision is therefore an architecture-and-evaluation decision, not an API compatibility decision.

---

## 36.20 Concentration Risk

Vendor dependency can create concentration risk.

Examples:

```text
One Provider
   ├── Cloud
   ├── LLM
   ├── Search
   ├── Identity
   └── Observability
```

This may simplify operations, but a provider incident could affect multiple control planes simultaneously.

Alternatively:

```text
Provider A → Compute
Provider B → Model
Provider C → Market Data
Internal → Policy / Audit
```

This may reduce concentration but increase integration complexity.

The correct architecture depends on the risk being managed.

**Advisor question:** Which dependencies fail together?

Correlated dependency risk is often more important than the number of vendors.

---

## 36.21 Vendor Dependency Risk Matrix

A useful review matrix is:

| Dependency | Criticality | Switching Cost | Failure Impact | Reversibility | Exit Tier |
|---|---:|---:|---:|---:|---:|
| LLM provider | High | Medium | High | Medium | 3–4 |
| Cloud platform | High | High | High | Low | 3–4 |
| Market data | High | High | High | Low | 2–3 |
| Observability | Medium | Medium | Medium | Medium | 2 |
| Developer tooling | Low | Low | Low | High | 1 |

The values are illustrative, not universal.

For a real architecture review, replace them with evidence and documented assumptions.

---

## 36.22 Common Anti-Patterns

### Anti-pattern 1 — “Never Use Proprietary Services”

This ignores the value of managed capabilities.

**Correction:** Evaluate dependency against value and switching risk.

### Anti-pattern 2 — “Multi-Cloud Eliminates Lock-In”

Multiple clouds can create a different form of complexity and still leave application-level dependencies.

**Correction:** Measure actual optionality.

### Anti-pattern 3 — “Use Kubernetes Everywhere for Portability”

A common runtime does not automatically make data, identity, networking, managed services, or AI behavior portable.

**Correction:** Identify the specific dependency being mitigated.

### Anti-pattern 4 — “Build an Abstraction Layer for Everything”

Abstraction can become another dependency and may discard useful provider capabilities.

**Correction:** Abstract strategic boundaries selectively.

### Anti-pattern 5 — “We Have a Backup, So We Have an Exit Plan”

A backup is not necessarily a migration capability.

**Correction:** Test restoration and provider substitution separately.

### Anti-pattern 6 — “The Contract Says We Can Export the Data”

Export rights do not prove that exported data is operationally useful.

**Correction:** Test export, metadata preservation, reconstruction, and re-ingestion.

### Anti-pattern 7 — “API Compatibility Means Model Compatibility”

Different models can produce materially different outputs under the same interface.

**Correction:** Re-evaluate behavior and decision quality.

---

## 36.23 Technical Challenge Questions

When Head of AI, CTO, or a vendor proposes a critical technology dependency, ask:

### Dependency

- What exactly are we dependent on?
- Which layer contains the dependency?
- Which features are proprietary?

### Switching

- What would have to change to replace the provider?
- How many engineering months are required?
- Which data and configurations must move?
- Which parts cannot move?

### AI Model

- What behavior is provider-specific?
- How would we validate a replacement model?
- Which evaluation datasets are retained internally?
- Can the decision workflow remain stable?

### Failure

- What happens if the provider becomes unavailable?
- What happens if the provider changes pricing or terms?
- What happens if a critical capability is deprecated?
- What happens after a provider security incident?

### Commercial

- What commitments have we made?
- What are the termination and transition terms?
- What notice is required for material changes?
- Which technical requirements must appear in the contract?

### Architecture

- Which dependencies are intentionally accepted?
- Which dependencies are accidental?
- Which dependencies are reversible?
- Where is the architectural boundary that enables substitution?

---

## 36.24 Architecture Review Checklist

Before approving a strategically important vendor dependency:

- [ ] Dependency map exists.
- [ ] Critical provider-specific features are documented.
- [ ] Technical and commercial lock-in are assessed separately.
- [ ] Data export and metadata requirements are defined.
- [ ] Critical configuration and evaluation assets are under organizational control.
- [ ] Model behavior dependencies are documented.
- [ ] Reversibility is explicitly rated.
- [ ] Failure and exit triggers are defined.
- [ ] At least one plausible replacement path is identified where justified.
- [ ] Migration assumptions are documented.
- [ ] Security and authorization boundaries remain valid during substitution.
- [ ] Cost of maintaining optionality is known.
- [ ] Contractual requirements are identified for procurement/legal review.
- [ ] Exit capability is tested to a level appropriate to system criticality.
- [ ] No unnecessary abstraction or multi-provider complexity has been introduced.

---

## 36.25 Evidence Discipline

Classify statements carefully.

### Fact

NIST identifies cloud portability and interoperability as important concerns and describes practical barriers created by provider-specific interfaces and formats. urlNIST Cloud Computing Standards Roadmaphttps://www.nist.gov/publications/nist-cloud-computing-standards-roadmap

### Technical Evidence

NIST's Cloud Federation Reference Architecture explicitly discusses portability and interoperability challenges and the role of standardized interfaces and mediation. urlNIST Cloud Federation Reference Architecturehttps://www.nist.gov/publications/nist-cloud-federation-reference-architecture

### Governance Evidence

NIST AI RMF includes third-party AI resources and supply-chain risk within the Govern and Manage functions, including monitoring and contingency processes. urlNIST AI RMF Corehttps://airc.nist.gov/airmf-resources/airmf/5-sec-core/

### Industry Evidence

FinOps describes fully managed, partially managed, and self-managed AI infrastructure as choices with different operational, flexibility, and vendor-dependency characteristics. urlFinOps — Choosing an AI Approach and Infrastructure Strategyhttps://www.finops.org/wg/choosing-an-ai-approach-and-infrastructure-strategy/

### Recommendation

Selective portability and reversibility are usually more practical than attempting maximal portability across every component.

This is an **architectural recommendation**, not a universal fact.

### Assumption

If an AI-IDSS is sufficiently important to influence consequential investment decisions, the organization may rationally assign greater value to provider substitution capability than it would for a low-criticality internal assistant.

This is an assumption for architecture reasoning. It should be validated against the organization's actual decision criticality and risk tolerance.

---

## 36.26 What Would Change Our Mind?

The advisor should remain willing to recommend deeper vendor dependence when evidence supports it.

The recommendation could change if:

- the provider's capability is materially superior;
- the switching cost is demonstrably low;
- contractual protections are strong;
- provider failure has acceptable consequences;
- alternatives cannot meet required quality or security;
- maintaining portability costs more than the risk reduction it provides;
- measured multi-provider complexity degrades reliability or security;
- the dependency is temporary and deliberately bounded.

Conversely, the recommendation should become more conservative if:

- provider-specific functionality becomes central to the decision system;
- switching cost grows materially;
- critical data becomes difficult to export;
- evaluation assets are not portable;
- provider incidents have unacceptable blast radius;
- contractual terms reduce practical exit capability.

The objective is not ideological vendor neutrality.

It is **informed and proportionate dependency**.

---

## 36.27 AI-IDSS Field Rule

For a strategically important AI-IDSS:

> **Use external providers where they create justified value, but keep authoritative data, policy, evaluation, audit, and consequential decision authority under deliberate organizational control wherever practical. Make critical dependencies visible, reversible where justified, and testable before they become difficult to escape.**

The strongest architecture is not the one with the fewest vendors.

It is the one in which the organization understands:

- what it depends on;
- why it depends on it;
- what it would cost to change;
- what happens if it fails;
- and what evidence would justify changing the dependency.
