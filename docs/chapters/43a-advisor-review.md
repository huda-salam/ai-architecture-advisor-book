# 43A — Failure Evidence Advisor Review

> **Advisor question:** What failed, why did it fail, which assumption was wrong, where should the failure have been detected, and does the same mechanism exist in our proposed architecture?

## FOUNDATION

Failure evidence is valuable because it exposes boundary conditions that success stories often hide.

But “AI failure” is not a sufficient diagnosis. The failure may originate in data, model behavior, integration, workflow, economics, governance, operations, adoption, or the surrounding business model.

## 43A.1 Decompose the Failure

Use this chain:

```text
Observed Outcome
      ↓
Failure Mechanism
      ↓
Causal Conditions
      ↓
Broken Assumption
      ↓
Missing / Failed Control
      ↓
Detection Point
      ↓
Consequence
```

Do not stop at the headline.

## 43A.2 Separate Model Failure From System Failure

Ask:

- Did the model fail?
- Did the data fail?
- Did integration fail?
- Did users misuse the output?
- Did governance fail?
- Did economics fail?
- Did the business process make the model's errors too costly?

**ARCHITECTURE WARNING**

> “The model was inaccurate” may describe a symptom while the actual failure occurred in the decision system around it.

## 43A.3 Find the Earliest Affordable Stop

For each failure, ask:

> **At what earlier gate could the organization have discovered the problem more cheaply?**

Possible gates:

1. Problem definition
2. Data readiness
3. Model evaluation
4. Security/privacy
5. Integration
6. Pilot
7. Production readiness
8. Economic validation
9. Post-production monitoring

A mature architecture does not promise zero failure. It reduces the probability and cost of late failure.

## 43A.4 Test Whether the Failure Transfers

A failure case should change our architecture position only when the relevant mechanism transfers.

Compare:

| Failure condition | Reference case | Our architecture | Same? |
|---|---|---|---|
| Data characteristics | | | |
| Model behavior | | | |
| Decision authority | | | |
| Economic exposure | | | |
| Integration dependency | | | |
| Human control | | | |
| Detection capability | | | |
| Recovery options | | | |

A failure in a materially different environment should inform the review without automatically deciding it.

## 43A.5 Negative Evidence Is Part of Due Diligence

Search deliberately for:

- abandoned pilots;
- discontinued products;
- incidents;
- regulatory findings;
- postmortems;
- cost overruns;
- model withdrawals;
- migrations;
- outages;
- failed scaling;
- user rejection.

This is an adversarial search discipline, not pessimism.

## 43A.6 Failure Register

For material systems maintain:

```text
Scenario
Trigger
Failure mechanism
Affected component
Consequence
Detection
Containment
Recovery
Owner
Evidence
Preventive lesson
```

Connect the register to risk, architecture review, production readiness, and auditability.

## 43A.7 Technical Position

A defensible position should identify the mechanism explicitly:

> The reference failure is relevant because our proposed architecture shares the same dependency and consequence path. Current controls reduce likelihood but have not been demonstrated under representative conditions. We therefore recommend validation at the integration/pilot gate before production commitment.

Or:

> The failure is informative but not directly transferable because the decision authority, workload, and recovery model differ materially. It should remain a monitoring concern rather than a rejection criterion.

## 43A.8 What Would Change Our Mind?

Increase concern when:

- the same failure mechanism exists;
- consequences are comparable;
- controls are untested;
- detection is late;
- recovery is difficult;
- evidence is independently corroborated.

Reduce concern when:

- the causal mechanism is different;
- the environment differs materially;
- effective controls have been demonstrated;
- the consequence is reversible;
- stronger evidence contradicts the failure interpretation.

## Field Rule

> **Do not ask only whether a failed AI program resembles ours. Ask whether its failure mechanism exists in ours.**
