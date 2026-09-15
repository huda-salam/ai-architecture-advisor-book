# Chapter 37A — Risk Advisor Review

> **ADVISOR LENS**
>
> Risk review is not the act of listing risks. It is the act of determining whether the architecture exposes the organization to material failure modes that are understood, controlled, measurable, and explicitly accepted where necessary.

## 1. Start With the Decision, Not the Risk Register

The advisor should first identify:

- what decision the system supports;
- who is affected by an incorrect result;
- what authority the system has;
- what failure would be unacceptable;
- what commitments become difficult to reverse.

A risk assessment without this context produces generic risk language rather than decision-relevant assurance.

## 2. Trace Risk Through the System

Review the chain:

```text
Source
  ↓
Data Processing
  ↓
Retrieval / Analytics
  ↓
Model
  ↓
Orchestration
  ↓
Validation
  ↓
Human Interpretation
  ↓
Decision / Action
```

For each material risk, ask where it originates, where it can propagate, where it can be detected, and where its consequence can be contained.

A coherent model output does not compensate for incorrect source data, unauthorized retrieval, or an invalid decision policy.

## 3. Challenge the Risk Statement

Weak:

> “Hallucination is a high risk.”

Stronger:

> “The system may generate an unsupported investment rationale when the retrieved evidence is incomplete. This could cause an analyst to accept an incorrect conclusion. The control is evidence coverage validation plus explicit unsupported states. The control must be tested against representative incomplete-evidence cases.”

The advisor should force risks toward a mechanism, consequence, control, and validation test.

## 4. Review Controls Against Mechanisms

For every material risk:

```text
Risk
 ↓
Failure mechanism
 ↓
Control
 ↓
Control test
 ↓
Residual risk
 ↓
Risk decision
```

Do not accept labels such as “AI firewall,” “human-in-the-loop,” or “monitoring” as evidence that a risk is controlled. Ask what the control actually prevents or detects.

## 5. Review Residual Risk

The advisor should distinguish:

- risk before controls;
- control effectiveness;
- residual risk;
- risk tolerance;
- accountable risk acceptance.

Technical assurance can determine whether a control is credible. It does not silently become the organization's risk acceptance authority.

## 6. Required Evidence

For material risks, seek evidence such as:

- representative evaluation results;
- security testing;
- failure-injection results;
- data-quality measurements;
- recovery tests;
- dependency analysis;
- access-control tests;
- operational monitoring evidence;
- contractual or regulatory evidence where applicable.

The evidence must match the claim. A product datasheet is not evidence of production resilience for a particular workload.

## 7. Advisor Challenge Questions

- What is the highest-consequence plausible failure?
- Where in the architecture does it originate?
- What mechanism produces the failure?
- Which control addresses that mechanism?
- Has the control actually been tested?
- What happens when the control itself fails?
- What residual risk remains?
- Who is authorized to accept that residual risk?
- What evidence would cause us to reassess the risk?

## 8. Technical Position

A useful advisor conclusion should state:

> **Risk position:** The material risks are [understood / partially understood / insufficiently understood]. The principal unresolved risk is [X]. The proposed control is [Y], but evidence [does / does not] demonstrate its effectiveness for the intended workload. Production commitment should therefore [proceed / proceed with conditions / remain gated] until [specific evidence or control] is established.

## 9. What Would Change the Advisor's Mind?

Define explicit reversal conditions, such as:

- representative testing reveals a higher failure rate;
- a critical control cannot be independently enforced;
- a new dependency changes the threat model;
- risk tolerance changes;
- evidence shows the system is being used beyond its approved decision boundary.

> **Field rule:** Risk assurance is credible only when the advisor can explain not just what the risks are, but why they occur, how they are controlled, how the controls are tested, and who accepts what remains.