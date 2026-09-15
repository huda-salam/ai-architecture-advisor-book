# Chapter 37 — AI Risk Framework

> **Advisor question:** What can go wrong with this AI system, how serious would the consequences be, how likely are they, which controls reduce the risk, and what evidence shows that the residual risk is acceptable?

## FOUNDATION

AI risk management is not a separate compliance exercise performed after architecture has been designed. It is an architectural discipline for understanding whether an AI system is appropriate for its intended purpose and whether its failure modes are controlled well enough for the context in which it will operate.

NIST AI RMF 1.0 organizes AI risk management around four functions: **Govern, Map, Measure, and Manage**. NIST describes risk management as continuous across the AI lifecycle rather than as a one-time approval activity. The framework is voluntary and use-case agnostic. See the NIST AI RMF references in the Evidence Review.

ISO/IEC 23894:2023 similarly provides guidance for organizations that develop, produce, deploy, or use AI systems and describes integrating AI risk management into organizational activities. See the ISO/IEC 23894 reference in the Evidence Review.

For this advisor role, the important implication is:

> **Do not ask only whether the AI system works. Ask whether its known and plausible failure modes are acceptable for the decision context, and what evidence supports that conclusion.**

---

## 37.1 Risk Is Contextual

NIST defines AI risk in terms of the likelihood of an event and the magnitude of its consequences. See the NIST AI RMF reference in the Evidence Review.

A technically identical model can therefore present different risk in different applications.

For example:

```text
Same model
   │
   ├── Drafting internal notes
   │       → lower consequence if wrong
   │
   └── Investment risk alert
           → potentially material decision consequence
```

This does not mean the first use is automatically safe or the second automatically unacceptable.

It means the architecture and controls must be evaluated against the actual use context.

**Advisor rule:** Risk assessment starts with intended use and consequence, not with the model name.

---

## 37.2 Establish the Risk Context

Before evaluating controls, document:

- intended purpose;
- users;
- affected parties;
- decisions supported;
- decisions automated, if any;
- data used;
- external dependencies;
- operating environment;
- regulatory and contractual constraints;
- expected benefits;
- plausible harms;
- human oversight;
- acceptable failure conditions.

NIST's MAP function explicitly calls for documenting intended purposes, context, users, impacts, assumptions, limitations, and relevant metrics. See the NIST AI RMF references in the Evidence Review.

For AI-IDSS, the context should state whether the output is:

1. informational;
2. analytical;
3. advisory;
4. workflow-triggering;
5. action-authorizing.

The further the system moves toward consequential action, the more important explicit authority boundaries become.

---

## 37.3 Risk Categories

A practical architecture review can group risks into categories without assuming that every category applies equally.

| Category | Example |
|---|---|
| Model | incorrect or unstable output |
| Data | incomplete, stale, corrupted, biased, or unauthorized data |
| Retrieval | missing or irrelevant evidence |
| Security | prompt injection, data disclosure, compromised tool |
| Identity | excessive or incorrect authority |
| Integration | inconsistent or failed downstream interaction |
| Reliability | outage, timeout, degraded dependency |
| Human | over-reliance, misunderstanding, poor escalation |
| Operational | inadequate monitoring or rollback |
| Vendor | provider outage, change, discontinuation, concentration |
| Compliance | legal or policy violation |
| Financial | uncontrolled cost or poor economic value |
| Decision | materially wrong recommendation or missed risk |

This is a working taxonomy, not a universal standard.

The taxonomy should be adapted to the system.

---

## 37.4 Risk Chain: Source to Decision

For an AI-IDSS, analyze the complete chain:

```text
Source Data
   ↓
Ingestion
   ↓
Transformation / Validation
   ↓
Retrieval / Analytics
   ↓
Model
   ↓
Reasoning / Synthesis
   ↓
Validation
   ↓
Human Interpretation
   ↓
Decision
```

A risk introduced early may become invisible later.

For example:

```text
Stale financial data
      ↓
Correct retrieval
      ↓
Correct model reasoning
      ↓
Incorrect investment conclusion
```

The model can therefore be functioning exactly as designed while the system still produces a materially wrong decision-support result.

**Advisor rule:** Risk belongs to the system, not only to the model.

---

## 37.5 Risk Register

Important AI systems should have an explicit risk register.

A useful structure is:

| ID | Risk | Cause | Consequence | Likelihood | Impact | Control | Residual Risk | Owner |
|---|---|---|---|---|---|---|---|---|
| R-01 | stale data | delayed ingestion | wrong alert | M | H | freshness gate | M | Data owner |
| R-02 | unauthorized retrieval | policy failure | disclosure | L | H | retrieval authorization | L | Security |
| R-03 | model degradation | provider/model change | lower alert quality | M | H | evaluation gate | L/M | AI owner |
| R-04 | provider outage | external dependency | unavailable analysis | M | M/H | fallback | M | Architecture |

The ratings above are illustrative.

They are not evidence and should never be copied into a production risk register without actual assessment.

---

## 37.6 Likelihood and Impact

A simple conceptual model is:

```text
Risk
≈
Likelihood × Consequence
```

This is useful for reasoning but should not be treated as a universal quantitative formula for all AI risk.

Some risks are difficult to quantify reliably.

For those risks, qualitative assessment, scenario analysis, testing, expert judgment, and documented uncertainty may be more appropriate.

NIST explicitly supports quantitative, qualitative, and mixed-method measurement approaches. See the NIST AI RMF references in the Evidence Review.

**Important:** A numerical risk score can create false precision if its inputs are not defensible.

---

## 37.7 Inherent Risk vs Residual Risk

Distinguish:

### Inherent risk

Risk before considering controls.

### Residual risk

Risk remaining after controls are applied.

Example:

```text
External LLM dependency
        ↓
Inherent risks:
- provider outage
- data exposure
- model change
- cost change
        ↓
Controls:
- contractual controls
- data minimization
- private connectivity
- evaluation gates
- fallback
        ↓
Residual risk
```

Controls do not prove that risk is eliminated.

The question is whether the residual risk is acceptable under the organization's risk tolerance.

---

## 37.8 Control Types

Controls can be grouped by their function.

| Control | Purpose | Example |
|---|---|---|
| Preventive | reduce likelihood | authorization |
| Detective | identify failure | monitoring |
| Corrective | restore state | rollback |
| Compensating | reduce consequence | human approval |
| Recovery | restore service | disaster recovery |
| Governance | establish accountability | risk approval |

The exact classification depends on the control and context.

The important architectural principle is to avoid relying on a single control for a high-consequence risk.

---

## 37.9 Defense in Depth

High-consequence AI risks should generally be addressed through multiple independent or partially independent controls where practical.

Example: sensitive-data leakage

```text
Data Classification
        ↓
Access Control
        ↓
Data Minimization
        ↓
Preprocessing / Masking
        ↓
Provider Controls
        ↓
Output Inspection
        ↓
Audit / Monitoring
```

If one layer fails, another may still reduce the consequence.

This is an architectural recommendation rather than a claim that every system requires every layer.

---

## 37.10 Risk Controls Must Match Failure Mechanisms

A control should address an actual failure mechanism.

Bad reasoning:

> “We added an LLM firewall, therefore prompt injection risk is solved.”

Better reasoning:

```text
Threat
  ↓
Attack path
  ↓
Potential consequence
  ↓
Control
  ↓
Test
  ↓
Residual risk
```

For each important risk, ask:

- What can fail?
- Why can it fail?
- What can an attacker or ordinary user cause?
- What control prevents it?
- What control detects it?
- What happens if the control fails?
- How was the control tested?

---

## 37.11 Risk Appetite and Risk Tolerance

Architecture cannot determine acceptable risk by itself.

The organization must define or authorize the relevant tolerance.

For example:

- zero tolerance may be appropriate for certain unauthorized disclosure scenarios;
- some latency degradation may be acceptable during provider incidents;
- a low-confidence analytical suggestion may be acceptable if it is clearly labeled and reviewed by an analyst;
- automated execution of a financial transaction may require substantially stronger controls than a recommendation shown to an RD.

NIST AI RMF links the level of risk-management activity to organizational risk tolerance and requires risk treatment to consider impact, likelihood, and available resources. See the NIST AI RMF references in the Evidence Review.

**Advisor boundary:** The technical advisor recommends whether architecture can satisfy a stated tolerance. The organization decides the tolerance.

---

## 37.12 Risk Acceptance Is a Decision

When residual risk remains, someone should explicitly accept it.

Avoid the pattern:

```text
Risk identified
   ↓
No one rejects architecture
   ↓
Architecture proceeds
   ↓
Risk becomes “accepted” implicitly
```

Instead:

```text
Risk
 ↓
Assessment
 ↓
Controls
 ↓
Residual Risk
 ↓
Decision
 ├── Accept
 ├── Mitigate
 ├── Transfer
 └── Avoid
```

The exact treatment options should follow organizational risk practice.

For consequential AI systems, implicit risk acceptance is particularly dangerous because responsibility becomes unclear.

---

## 37.13 AI-Specific Risk: Hallucination

“Hallucination” is often used too broadly.

For architecture review, define the actual failure:

- unsupported statement;
- fabricated citation;
- incorrect extraction;
- incorrect calculation;
- wrong inference;
- contradiction with authoritative data;
- inappropriate confidence.

Then design controls against the mechanism.

Possible controls include:

- retrieval grounding;
- source citations;
- deterministic calculations;
- schema validation;
- cross-checking against source systems;
- model evaluation;
- confidence or uncertainty representation where justified;
- human review.

RAG alone does not establish truth. The retrieved source may itself be wrong, stale, incomplete, or unauthorized.

---

## 37.14 AI-Specific Risk: Prompt Injection

Prompt injection should be treated as a control-boundary problem.

A malicious instruction can attempt to influence model behavior through user input or retrieved content.

The architecture should therefore avoid granting the model authority merely because the model receives an instruction.

Controls may include:

- input handling;
- trust-boundary separation;
- retrieval filtering;
- tool authorization outside the model;
- least privilege;
- output validation;
- human approval for consequential actions.

This builds directly on Chapters 19, 20, and 22.

---

## 37.15 AI-Specific Risk: Data and Model Drift

Risk can change even when the software version does not.

Examples:

```text
Source data distribution changes
        ↓
Model inputs change
        ↓
Performance changes
```

or:

```text
Provider model changes
        ↓
Output behavior changes
        ↓
Decision quality changes
```

Therefore risk monitoring should include relevant changes in:

- data distribution;
- source freshness;
- model version;
- provider behavior;
- retrieval quality;
- user behavior;
- workload;
- business context.

Not every system requires every metric continuously. Monitoring should be proportional to the risk.

---

## 37.16 Risk From Dependencies

AI systems are dependency graphs.

```text
AI-IDSS
 ├── LLM provider
 ├── Cloud
 ├── Search
 ├── ERP
 ├── Market data
 ├── Identity
 └── External tools
```

For each critical dependency, assess:

- availability risk;
- security risk;
- change risk;
- concentration risk;
- data risk;
- contractual risk;
- recovery options.

Chapter 36 established the corresponding vendor-dependency and exit analysis.

---

## 37.17 Risk Propagation

A local failure can become a system-level failure.

Example:

```text
Market-data delay
      ↓
Incomplete risk input
      ↓
Risk model uses stale value
      ↓
LLM produces coherent explanation
      ↓
RD receives plausible but outdated alert
```

The final answer may look high quality while the underlying decision signal is compromised.

This is why AI risk assessment must follow data and decision dependencies rather than evaluating only the final generated text.

---

## 37.18 Risk Scenarios

Scenario analysis is often more useful than a generic list of risks.

For each critical scenario define:

1. trigger;
2. attack or failure path;
3. affected component;
4. consequence;
5. detection;
6. containment;
7. recovery;
8. evidence required;
9. owner.

Example:

### Scenario — Provider Model Change

**Trigger:** provider changes model behavior.

**Path:** model output changes → evaluation metric degrades → risk alerts change.

**Detection:** regression evaluation.

**Containment:** block promotion / route to validated model.

**Recovery:** rollback or alternate provider.

**Evidence:** evaluation comparison against approved baseline.

---

## 37.19 Risk Register vs Architecture Decision Record

These artifacts serve different purposes.

### Risk register

Answers:

> What can go wrong and how are we managing it?

### Architecture Decision Record

Answers:

> What architecture did we choose, why, and what trade-offs did we accept?

They should reference each other.

A significant architecture decision can create new risks, and a risk treatment can constrain architecture.

---

## 37.20 Risk Review Across the Lifecycle

Risk review should evolve with the system.

```text
Concept
  ↓
Risk framing
  ↓
Architecture
  ↓
Evaluation
  ↓
Production approval
  ↓
Monitoring
  ↓
Change
  ↓
Reassessment
  ↓
Retirement
```

NIST AI RMF states that risk management should continue throughout the AI lifecycle, and its Manage function calls for ongoing monitoring and improvement. See the NIST AI RMF references in the Evidence Review.

A risk assessment that is correct at launch can become stale when:

- the model changes;
- data changes;
- the user population changes;
- a new tool is connected;
- the decision scope expands;
- the provider changes;
- regulations or organizational policies change.

---

## 37.21 AI-IDSS Risk Architecture

A useful conceptual structure is:

```text
                         AI-IDSS
                            │
                    Risk Context / Policy
                            │
                ┌───────────┴───────────┐
                ↓                       ↓
          Risk Register            Architecture
                │                       │
                ↓                       ↓
          Risk Controls          Evaluation / TEVV
                │                       │
                └───────────┬───────────┘
                            ↓
                     Residual Risk
                            │
                  Human / Governance Review
                            │
                    Accept / Mitigate /
                    Transfer / Avoid
```

Cross-cutting:

**Identity · Security · Data Governance · Monitoring · Audit · Vendor Management · Incident Response**

The objective is to make risk treatment part of architecture rather than a document attached after implementation.

---

## 37.22 Example: 68% Probability Alert

Suppose AI-IDSS reports:

> **Probability of material deterioration: 68%**

Risk analysis should ask:

### Model risk

What produces 68%?

- calibrated statistical model?
- classifier?
- ensemble?
- expert rule?
- LLM judgment?

### Data risk

Are the inputs:

- complete?
- current?
- reconciled?
- authorized?

### Evaluation risk

Is the probability calibrated on representative data?

### Retrieval risk

Were the relevant evidence and counter-evidence retrieved?

### Communication risk

Does the RD interpret 68% as a statistically meaningful probability?

### Decision risk

What action follows from the alert?

The architecture is not defensible merely because the number looks precise.

**Advisor rule:** Numerical precision must not substitute for defined semantics and evidence.

---

## 37.23 Common Risk Anti-Patterns

### Anti-pattern 1 — Risk Register as a Checklist

Listing risks without connecting them to controls, evidence, and owners creates administrative noise.

### Anti-pattern 2 — Model-Centric Risk Assessment

Evaluating only model accuracy ignores data, identity, integrations, security, humans, and dependencies.

### Anti-pattern 3 — Risk Score Without Evidence

A “7/10” score is not meaningful unless its construction is understood.

### Anti-pattern 4 — One-Time Risk Assessment

AI systems and their environments change.

### Anti-pattern 5 — Control by Prompt

Asking the model not to perform an action is not equivalent to enforcing authorization outside the model.

### Anti-pattern 6 — Risk Acceptance by Silence

If nobody explicitly accepts residual risk, accountability is ambiguous.

### Anti-pattern 7 — Treating Frameworks as Compliance Guarantees

Following a framework does not prove that a particular architecture is safe or appropriate.

NIST describes the AI RMF Playbook as voluntary guidance rather than a one-size-fits-all checklist. See the NIST AI RMF Playbook reference in the Evidence Review.

---

## 37.24 Technical Challenge Questions

### Context

- What decision does this AI system support?
- What happens if it is wrong?
- Who can be affected?

### Risk

- What are the top five failure modes?
- Which have the highest consequence?
- Which risks are difficult to measure?

### Controls

- Which control addresses each high-priority risk?
- Where is the control enforced?
- What happens if the control fails?

### Evidence

- What testing supports the control?
- What production monitoring exists?
- What evidence would demonstrate deterioration?

### Governance

- Who owns the risk?
- Who can accept residual risk?
- Who can stop or roll back the system?

### Change

- What changes trigger reassessment?
- What happens when the model provider changes behavior?
- What happens when the system's decision scope expands?

---

## 37.25 Architecture Review Checklist

- [ ] Intended use and decision context are documented.
- [ ] Material risks are mapped across the complete system.
- [ ] Data, model, security, integration, human, operational, and vendor risks are considered where relevant.
- [ ] High-consequence risks have explicit controls.
- [ ] Controls have identifiable enforcement points.
- [ ] Risk measurements have defined semantics.
- [ ] Important uncertainty is documented.
- [ ] Residual risk is explicitly assessed.
- [ ] Risk ownership is clear.
- [ ] Risk acceptance authority is clear.
- [ ] Production monitoring covers material changing risks.
- [ ] Change triggers for reassessment are defined.
- [ ] Incident and recovery procedures exist for material failure modes.
- [ ] Risk treatment is linked to architecture decisions.
- [ ] Framework use is not presented as proof of safety or compliance.

---

## 37.26 Evidence Discipline

### Fact

NIST AI RMF 1.0 defines the four functions Govern, Map, Measure, and Manage and describes AI risk management as continuous across the lifecycle. See the NIST AI RMF references in the Evidence Review.

### Technical Evidence

NIST calls for testing before deployment and regular testing during operation, including uncertainty, benchmark comparisons, documentation, and—where appropriate—independent review. See the NIST AI RMF references in the Evidence Review.

### Standard Guidance

ISO/IEC 23894:2023 provides guidance for integrating AI risk management into organizations that develop, deploy, or use AI systems. See the ISO/IEC 23894 reference in the Evidence Review.

### Recommendation

The advisor should maintain a risk register linked to architecture, controls, evaluation, and ownership.

This is an **architectural recommendation**, not a universal standard requirement.

### Assumption

An AI-IDSS supporting consequential investment decisions warrants stronger explicit risk treatment than a low-consequence productivity assistant.

This is a scenario assumption and should be validated against organizational risk tolerance.

---

## 37.27 What Would Change Our Mind?

The advisor should revise the risk treatment if evidence shows that:

- a supposedly high risk has negligible consequence in the actual operating context;
- a control is demonstrably ineffective;
- a risk can be measured more reliably than previously assumed;
- a simpler control provides equivalent protection;
- a new failure mode materially changes the risk profile;
- the system's use or decision authority changes;
- residual risk falls below the organization's approved tolerance.

Likewise, risk treatment should become more conservative if:

- consequences become more material;
- human oversight weakens;
- the system gains new tools or authority;
- provider or model behavior changes;
- evidence quality deteriorates;
- monitoring cannot detect important failures.

---

## 37.28 Field Rule

> **Do not ask whether an AI system is “safe.” Identify the decision context, map credible failure paths, measure what matters, enforce controls at the correct architectural boundary, and make residual risk explicit to the person or function authorized to accept it.**

For the AI Technology & Architecture Advisor, the practical standard is:

> **No material AI architecture should be recommended without a defensible explanation of what can fail, how the system limits the failure, how that limitation was tested, and who accepts the remaining risk.**
