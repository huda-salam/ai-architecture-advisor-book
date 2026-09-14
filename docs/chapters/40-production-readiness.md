# Chapter 40 — Production Readiness

> **Advisor question:** Is the AI system genuinely ready to operate in its intended production environment, or have we merely demonstrated that it can work?

## FOUNDATION

Production readiness is the transition from **technical possibility** to **controlled operational capability**.

A system can pass a proof-of-concept, architecture review, model evaluation, and security assessment and still not be ready for production. Production introduces real users, real permissions, real data changes, real dependency failures, real workload variability, real operators, real incidents, real cost, and real consequences.

NIST SP 800-160 Rev. 1 places verification, transition, validation, operation, maintenance, and disposal within the system life cycle. NIST AI RMF calls for post-deployment monitoring, incident response, recovery, change management, and safe decommissioning. [NIST SP 800-160 Rev. 1](https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final) [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)

> **Production readiness is not a deployment button. It is a decision that sufficient evidence exists to operate the system within a defined risk boundary.**

---

## 40.1 Production Readiness Is a Decision Gate

The question is not “Is the system finished?” Most production systems are never finished.

The better question is:

> **Is the system sufficiently prepared, controlled, observable, recoverable, and understood for the production use we are authorizing?**

A useful distinction is:

| State | Meaning |
|---|---|
| Prototype | Demonstrates a concept |
| PoC | Demonstrates feasibility |
| Pilot | Tests bounded real use |
| Production-ready | Meets defined operational and risk requirements |
| Production | Authorized for intended operational use |
| Mature production | Operating with established monitoring, recovery, and improvement |

These are advisor terms, not a universal standard.

---

## 40.2 Production Readiness Is Not One Test

Readiness integrates evidence from multiple domains:

```text
Requirements
    ↓
Architecture
    ↓
Security
    ↓
Data
    ↓
AI Evaluation
    ↓
Integration
    ↓
Performance
    ↓
Reliability
    ↓
Operations
    ↓
Cost
    ↓
Monitoring / Response
    ↓
Production Decision
```

A strong model does not compensate for weak authorization. Strong security does not compensate for untested recovery. Good architecture does not compensate for undefined operational ownership.

**Architecture warning:** Review the system, not the strongest component.

---

## 40.3 Define the Authorized Production Boundary

Before approval, define:

- intended users;
- business processes;
- data sources and classes;
- environments and regions;
- model/version;
- tools and actions;
- expected workload;
- permitted consequences;
- excluded use cases.

A useful authorization statement is:

> **This version of the system is authorized for these users, these data classes, these workflows, these operating conditions, and these actions.**

Anything outside that boundary is a change in use, not an implicit extension of approval.

---

## 40.4 Requirements Must Have Evidence

Every material production requirement should have an evidence item.

| Requirement | Evidence | Result | Residual uncertainty |
|---|---|---|---|
| p95 latency below target | representative load test | Pass | peak beyond tested load |
| authorized data only | access-control test | Pass | policy-change propagation |
| model quality above threshold | held-out evaluation | Pass | production drift |
| provider outage handled safely | failure test | Pass | prolonged outage |
| recovery within target | restore/failover test | Partial | full-region failure |

Be suspicious of requirements marked “met” without evidence.

> **A requirement without evidence is an assertion, not a readiness result.**

---

## 40.5 Configuration Is Part of the System

Production readiness is not demonstrated by testing a materially different configuration.

Behavior can change because of:

- model version;
- system prompt;
- retrieval configuration;
- index contents;
- access policies;
- tool permissions;
- network routes;
- secrets;
- feature flags;
- rate limits;
- model parameters;
- infrastructure sizing;
- external provider settings.

The production candidate should therefore be identifiable and reproducible to a degree appropriate to its risk.

NIST SP 800-160 treats implementation, integration, verification, transition, validation, operation, and maintenance as life-cycle engineering concerns.

---

## 40.6 Environment Separation

A practical environment progression is:

```text
Development
    ↓
Test / Evaluation
    ↓
Staging / Pre-Production
    ↓
Production
```

The exact structure varies, but production authority should be separated from development and testing authority where the risk warrants it.

Review separation of:

- credentials;
- data;
- permissions;
- configuration;
- deployment authority;
- monitoring;
- change control.

**Architecture warning:** A test identity with production write access is a production architecture defect, not merely a DevOps inconvenience.

---

## 40.7 Data Readiness

Production data should be understood, not merely connected.

Verify:

- source ownership;
- freshness;
- completeness;
- schema stability;
- semantic consistency;
- reconciliation;
- access control;
- retention;
- deletion behavior;
- failure handling.

For RAG, additionally verify indexing completeness, update/deletion propagation, retrieval authorization, source authority, and citation/provenance behavior.

For AI-IDSS, data readiness is part of the credibility chain. A sophisticated model cannot reliably compensate for an unknown or uncontrolled evidence base.

---

## 40.8 Model and AI Readiness

The production model should be the model that was evaluated, or any difference must be explicitly assessed.

Review:

- model identity/version;
- evaluation results;
- known limitations;
- context limits;
- tool behavior;
- output validation;
- uncertainty handling;
- fallback behavior;
- provider dependencies;
- change/deprecation policy.

NIST AI RMF Measure calls for monitoring AI functionality and behavior in production and comparing production observations with pre-deployment testing. [NIST AI RMF Measure](https://airc.nist.gov/airmf-resources/playbook/measure/)

NIST AI 800-4, published in 2026, notes that post-deployment monitoring is important while monitoring methods and common terminology remain an evolving area. [NIST AI 800-4](https://www.nist.gov/publications/challenges-monitoring-deployed-ai-systems-center-ai-standards-and-innovation)

Therefore, do not invent one universal AI monitoring metric or cadence.

---

## 40.9 Evaluation Gate

Production readiness inherits the evaluation discipline from Chapter 31.

Ask:

- Was the evaluation set representative?
- Was it held out appropriately?
- Were important slices evaluated?
- Were adversarial cases tested where relevant?
- Were retrieval and agent behaviors tested separately?
- Was uncertainty examined?
- Were production-like conditions used?
- Were material failure modes quantified?

The final question is:

> **Is the evidence sufficient for the actual consequence of relying on this system?**

A low-risk assistant and an AI-IDSS supporting material investment decisions should not automatically have identical acceptance thresholds.

---

## 40.10 Security Readiness

Security readiness should verify that controls work in the production configuration.

Review:

- authentication;
- authorization;
- least privilege;
- secrets;
- encryption;
- network boundaries;
- tenant/data isolation;
- logging;
- vulnerability management;
- supply-chain controls;
- prompt-injection defenses;
- tool authorization;
- incident response.

> **Security design is not security evidence.**

An architecture document can state that authorization exists. A readiness test should demonstrate that unauthorized access is actually rejected.

---

## 40.11 Operational Readiness

Someone must be able to operate the system after the project team leaves the room.

Verify:

- named ownership;
- on-call responsibility where required;
- runbooks;
- deployment procedures;
- rollback procedures;
- incident procedures;
- escalation paths;
- dashboards;
- alerts;
- capacity management;
- vendor support contacts;
- documentation;
- required skills.

A system nobody can confidently operate is not production-ready regardless of technical sophistication.

---

## 40.12 Observability Readiness

Monitoring should answer useful questions.

### System
- Is the service available?
- Is latency within target?
- Are dependencies failing?
- Is capacity sufficient?

### Data
- Is expected data arriving?
- Is freshness acceptable?
- Are quality checks failing?

### AI
- Is behavior changing?
- Are evaluation indicators degrading?
- Are grounding failures increasing where measurable?
- Are overrides increasing?

### Security
- Are suspicious access patterns occurring?
- Are tool calls abnormal?
- Are policy violations detected?

NIST identifies functionality and operational monitoring as important post-deployment monitoring areas and notes that real-world conditions can expose issues not visible during controlled testing. [NIST AI 800-4](https://www.nist.gov/publications/challenges-monitoring-deployed-ai-systems-center-ai-standards-and-innovation)

---

## 40.13 Alerting Is Not Monitoring

A dashboard does not make a system observable.

An actionable alert needs:

```text
Signal
 ↓
Condition
 ↓
Owner
 ↓
Action
 ↓
Escalation
 ↓
Recovery / Closure
```

Ask:

> “What happens when this metric turns red at 2 a.m.?”

If the answer is unclear, the monitoring design is incomplete.

---

## 40.14 Failure and Recovery Readiness

Test important failure scenarios where appropriate:

- model-provider outage;
- database failure;
- retrieval failure;
- enterprise API failure;
- network failure;
- expired credentials;
- invalid data;
- queue saturation;
- deployment failure;
- corrupted index;
- unexpected model behavior.

For each scenario determine:

1. detection;
2. containment;
3. degraded state;
4. user communication;
5. recovery;
6. post-recovery validation;
7. incident documentation.

NIST AI RMF explicitly includes response, recovery, incident response, override, change management, and decommissioning in post-deployment risk management. [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) [NIST AI RMF Manage](https://airc.nist.gov/airmf-resources/playbook/manage/)

---

## 40.15 Rollback Is Not Always Enough

Traditional software often assumes:

> bad release → rollback → problem solved.

AI systems complicate this assumption.

Rollback may not restore the previous state if:

- source data has changed;
- indexes have changed;
- external providers have changed;
- prompts or policies have changed;
- a tool has already executed an action.

Therefore ask:

> **Can we restore the previous decision-support state, not merely the previous application binary?**

This is particularly important for AI-IDSS.

---

## 40.16 Change Management

Define what constitutes a material change.

| Change | Possible impact |
|---|---|
| UI text change | Low |
| model version change | Potentially high |
| retrieval algorithm change | Potentially high |
| new data source | Potentially high |
| authorization-policy change | High |
| new agent tool | High |
| infrastructure patch | Context-dependent |
| provider API change | Potentially high |

These categories are not universal. Impact depends on the system.

Require re-evaluation when a change can invalidate prior evidence.

---

## 40.17 Model and Provider Changes

A provider can change system behavior even when application code does not change.

Examples include:

- model upgrade or deprecation;
- altered safety behavior;
- changed context limits;
- changed rate limits;
- changed pricing;
- changed retention behavior;
- changed service region;
- altered API semantics.

NIST AI RMF calls for monitoring third-party AI resources and pretrained models as part of regular monitoring and maintenance. [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)

---

## 40.18 Cost Readiness

Production economics differ from prototype economics.

Use realistic workload assumptions for:

- average and peak demand;
- concurrency;
- storage growth;
- retrieval volume;
- model usage;
- observability;
- human review;
- support;
- failure and retry costs.

The question is:

> **Can the system operate within its approved economic envelope under expected and stressed conditions?**

A technically working system with uncontrolled economics is not economically production-ready.

---

## 40.19 Human Readiness

AI systems can fail operationally because users misunderstand their outputs.

For consequential systems verify:

- intended use is documented;
- limitations are understood;
- uncertainty is communicated appropriately;
- users know when not to rely on the system;
- escalation exists;
- overrides are possible where appropriate;
- responsibility for final decisions is explicit.

For AI-IDSS:

> **AI recommends. Authorized humans decide.**

This is an architecture recommendation for consequential decision support, not a universal rule for all AI applications.

---

## 40.20 AI-IDSS Production Readiness

For the reference AI-IDSS, assess the complete chain:

```text
Authoritative Data
      ↓
Data Quality / Reconciliation
      ↓
Analytical / Risk Models
      ↓
RAG / Evidence Retrieval
      ↓
LLM Synthesis
      ↓
Validation
      ↓
Risk Alert
      ↓
RD Interface
      ↓
Human Decision
```

Verify:

- source authority;
- evidence freshness;
- calculation provenance;
- model semantics;
- probability calibration where probabilities are presented;
- retrieval authorization;
- citation/evidence chain;
- output validation;
- auditability;
- human override;
- failure behavior;
- operating ownership.

If the system produces:

> **“Probability of material deterioration: 68%”**

the production system must preserve the semantics established during evaluation. A precise display must not turn an uncertain analytical estimate into an apparently objective fact.

---

## 40.21 Production Readiness Scorecard

| Domain | Status | Evidence | Blocking issue |
|---|---|---|---|
| Requirements | Green / Amber / Red | requirement matrix | — |
| Architecture | Green / Amber / Red | architecture review | — |
| Data | Green / Amber / Red | data validation | — |
| Security | Green / Amber / Red | control tests | — |
| AI Evaluation | Green / Amber / Red | evaluation report | — |
| Integration | Green / Amber / Red | integration tests | — |
| Reliability | Green / Amber / Red | failure/recovery tests | — |
| Performance | Green / Amber / Red | workload test | — |
| Operations | Green / Amber / Red | runbooks / ownership | — |
| Observability | Green / Amber / Red | monitoring test | — |
| Cost | Green / Amber / Red | TCO model | — |
| Change / Exit | Green / Amber / Red | lifecycle plan | — |

The colors are a communication convention, not an objective measurement.

---

## 40.22 Blocking vs Non-Blocking Findings

Not every open issue should block production.

### Blocking

The issue can materially invalidate the authorized use or create unacceptable risk.

### Conditional

Production may proceed if an explicit compensating control, scope restriction, or monitoring condition is accepted.

### Non-blocking

The issue is an improvement opportunity with limited impact on the authorized use.

The decision should explain why the classification was chosen.

---

## 40.23 Production Approval Outcomes

### Proceed

Evidence is sufficient and material readiness conditions are satisfied.

### Proceed With Conditions

The system may operate only within explicit restrictions or remediation commitments.

### Limited Pilot

Production-like use is allowed within a bounded population, workload, or data scope to collect additional evidence.

### Do Not Proceed

Material readiness gaps remain unresolved.

### Escalate

Technical evidence is insufficient for the advisor's authority, or residual risk requires executive acceptance.

These categories extend the decision structure introduced in Chapter 38 and remain advisor conventions.

---

## 40.24 Post-Production Readiness

Readiness is not permanent.

NIST AI RMF calls for ongoing monitoring, periodic review, incident response, recovery, change management, continual improvement, and safe decommissioning. [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)

NIST AI 800-4 emphasizes that post-deployment monitoring is important while methods and common terminology continue to develop. [NIST AI 800-4](https://www.nist.gov/publications/challenges-monitoring-deployed-ai-systems-center-ai-standards-and-innovation)

> **Production approval should create an operating obligation, not terminate technical oversight.**

The monitoring cadence should be risk- and use-case-dependent rather than invented as a universal number.

---

## 40.25 Common Production-Readiness Anti-Patterns

### “The demo worked.”
Feasibility is not operational readiness.

### “All tests passed.”
Ask which tests, under which conditions, and whether they represent production.

### “Security approved it.”
Security review does not replace operational, data, model, reliability, or economic readiness.

### “The model is production-grade.”
Production readiness applies to the system, not just the model.

### “Rollback is available.”
Rollback may not restore data, indexes, external dependencies, or decision state.

### “Monitoring exists.”
Monitoring without meaningful signals, owners, and response paths is incomplete.

### “Humans are in the loop.”
A human click is not meaningful oversight if the human cannot understand, challenge, or override the output.

### “The pilot is already production.”
A bounded pilot may deliberately operate under a narrower risk boundary.

### “The provider handles it.”
Third-party responsibility does not remove the organization's responsibility for the system it operates.

### “Production means finished.”
Production is the beginning of operational evidence collection, not the end of engineering.

---

## 40.26 Technical Challenge Questions

### Readiness
- What exact production boundary are we approving?
- Which requirements have objective evidence?
- Which assumptions remain unresolved?

### Security
- Have authorization controls been tested in the production configuration?
- What happens if the model behaves maliciously or unexpectedly?

### Data
- Can we detect stale, missing, or malformed source data?
- What happens when an authoritative source becomes unavailable?

### AI
- Is the production model identical to the evaluated model?
- What evidence would trigger re-evaluation?

### Reliability
- What happens when the primary provider fails?
- Can recovery be demonstrated rather than merely documented?

### Operations
- Who owns the system during an incident?
- What action does each critical alert trigger?

### Economics
- What workload assumption dominates cost?
- What happens at peak usage?

### Governance
- Who can approve changes?
- Who can disable the system?
- Who can authorize reactivation?

### AI-IDSS
- Can we reconstruct why an alert was produced?
- Can an authorized human challenge or override it?
- What prevents a precise-looking output from being mistaken for certainty?

---

## 40.27 Production Readiness Checklist

### Decision Boundary
- [ ] Intended users defined
- [ ] Intended use defined
- [ ] Data scope defined
- [ ] Model/version defined
- [ ] Tool/action scope defined
- [ ] Excluded use cases documented

### Requirements
- [ ] Requirements have evidence
- [ ] Acceptance criteria are explicit
- [ ] Residual uncertainty documented

### Architecture
- [ ] Production architecture reviewed
- [ ] Dependencies identified
- [ ] Trust boundaries validated
- [ ] Configuration controlled

### Data
- [ ] Sources authoritative
- [ ] Data quality checks operational
- [ ] Freshness monitored
- [ ] Authorization enforced
- [ ] Retention/deletion understood

### AI
- [ ] Evaluated model matches production model
- [ ] Evaluation is representative
- [ ] Failure modes understood
- [ ] Output validation implemented
- [ ] Model/provider change process defined

### Security
- [ ] Authentication tested
- [ ] Authorization tested
- [ ] Secrets controlled
- [ ] Security monitoring active
- [ ] Incident response defined

### Reliability
- [ ] Critical failure modes tested
- [ ] Recovery tested
- [ ] Rollback/recovery semantics understood
- [ ] Degraded states explicit

### Operations
- [ ] Ownership assigned
- [ ] Runbooks available
- [ ] Monitoring active
- [ ] Alerts have owners/actions
- [ ] Escalation defined

### Economics
- [ ] Production TCO modeled
- [ ] Peak workload considered
- [ ] Cost controls defined

### Governance
- [ ] Change approval defined
- [ ] Re-evaluation triggers defined
- [ ] Disable/decommission process defined

### Decision
- [ ] Blocking findings resolved or explicitly accepted
- [ ] Conditions documented
- [ ] Approval scope documented
- [ ] What would change the decision documented

---

## 40.28 Evidence Discipline

Classify readiness claims carefully.

**Fact** — supported by authoritative requirements, specifications, contracts, measurements, or other appropriate evidence.

**Test Evidence** — observed result from a defined test under stated conditions.

**Production Evidence** — observed behavior in the actual operating environment.

**Inference** — reasoned conclusion from evidence.

**Assumption** — proposition required for readiness but not sufficiently verified.

**Recommendation** — advisor judgment about whether evidence is sufficient for the decision.

**Uncertainty** — material unresolved question.

> **A green dashboard does not prove readiness unless the dashboard measures what the production decision actually depends on.**

---

## 40.29 What Would Change Our Mind?

Revise the readiness recommendation if new evidence materially changes:

- production workload;
- model behavior;
- data quality;
- security findings;
- incident patterns;
- recovery performance;
- provider behavior;
- cost;
- user behavior;
- regulatory or contractual constraints;
- system authority or use case.

A readiness decision should be falsifiable.

---

## 40.30 Field Rule

Production readiness is not the point at which engineering stops.

It is the point at which the organization decides:

```text
We understand the intended use
        ↓
We understand the architecture
        ↓
We have evidence for the important requirements
        ↓
We know the important failure modes
        ↓
We can detect and respond to problems
        ↓
We know who is accountable
        ↓
We understand the economics
        ↓
We know the remaining uncertainty
        ↓
We explicitly accept the production boundary
```

> **Do not approve production because the system works. Approve production because the system is sufficiently understood, controlled, observable, recoverable, and evidenced for the consequences of its intended use.**
