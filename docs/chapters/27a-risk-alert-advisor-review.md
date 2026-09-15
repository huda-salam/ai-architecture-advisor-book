# 27A. Investment Risk Alert — Advisor Review

::: tip FOUNDATION
An investment risk alert is a **decision-support signal**, not a decision. The advisor evaluates whether the alert is technically meaningful, evidentially defensible, operationally usable, and appropriately bounded.
:::

## Purpose

Chapter 27 defines the Investment Risk Alert use case. This companion section defines how the advisor should challenge the technical design behind such an alert without confusing a plausible demonstration with a reliable decision-support capability.

The central question is:

> **What would have to be true for this risk alert to be sufficiently reliable and useful for its intended decision?**

## 27A.1 Start With the Claim

Consider:

> **Portfolio Company A — probability of material deterioration: 68%.**

The advisor should decompose the claim before discussing the model.

| Question | Why it matters |
|---|---|
| What is the target event? | Defines what “deterioration” means. |
| What is the prediction horizon? | A probability without a time horizon is ambiguous. |
| What data supports the prediction? | Establishes the evidence base. |
| Which model produces the probability? | Determines the computational semantics. |
| Is the probability calibrated? | Numerical precision requires appropriate interpretation. |
| What is the baseline? | Determines whether the model adds useful signal. |
| What happens when data is missing or stale? | Defines operational reliability. |
| What action follows? | Connects analytical output to decision value. |

::: tip ADVISOR LENS
Do not begin by asking whether the model is “accurate.” First ask **accurate for what event, over what horizon, against what baseline, under what operating conditions, and with what consequence if wrong?**
:::

## 27A.2 Separate Signal From Evidence

An alert may contain several different artifacts:

```text
Source Data
    ↓
Validated Metrics
    ↓
Risk Signal
    ↓
Supporting Evidence
    ↓
AI Synthesis
    ↓
Risk Alert
    ↓
Human Review
```

These artifacts should not be treated as equivalent.

A risk score is not source evidence. An LLM explanation is not automatically an independent validation of the underlying score. A recommendation is not proof that the predicted event will occur.

The advisor should ask whether the interface makes these distinctions visible.

## 27A.3 Challenge the Model Semantics

A technically credible risk alert needs explicit model semantics.

Ask:

- What is the prediction target?
- How was the training label defined?
- What population does the model represent?
- Which variables are used?
- What leakage controls were applied?
- How was the data split for validation?
- How does performance change across relevant portfolio segments?
- How is calibration measured?
- How is drift detected?
- What is the consequence of false positives and false negatives?

A benchmark result is not sufficient. The evaluation must reflect the actual decision task.

## 27A.4 Challenge the Data Chain

The advisor should inspect the chain before attributing failures to AI.

```text
Source
  ↓
Ingestion
  ↓
Transformation
  ↓
Validation
  ↓
Feature / Metric Calculation
  ↓
Model Input
  ↓
Risk Output
```

Potential failure modes include:

- incorrect source data;
- delayed statements;
- duplicate records;
- currency or unit errors;
- missing periods;
- inconsistent definitions across portfolio companies;
- stale derived features;
- accidental data leakage;
- unauthorized cross-company data exposure.

A stronger model cannot compensate for a materially defective evidence chain.

## 27A.5 LLM Role

The LLM may be valuable for:

- synthesizing evidence;
- explaining risk drivers;
- comparing documents;
- producing a concise executive narrative;
- identifying information gaps;
- answering questions over authorized evidence.

The advisor should challenge any proposal in which the LLM is implicitly treated as the source of the probability, the authorization mechanism, or the final investment authority without an explicit technical basis.

## 27A.6 Alert Thresholds and Decision Policy

A model output becomes operationally meaningful only when connected to a defined policy.

```text
Risk Signal
    ↓
Threshold / Policy
    ↓
Alert Classification
    ↓
Required Evidence
    ↓
Human Review
    ↓
Disposition
```

Ask:

- Who defines the threshold?
- Is the threshold based on model performance, business policy, or both?
- What happens near the threshold?
- Can a user override the classification?
- Who is authorized to override it?
- Is the override recorded?
- Does an alert create an obligation to investigate?

The advisor should distinguish **model output** from **policy decision**.

## 27A.7 Failure Containment

Risk alerts can create harm through both missed alerts and excessive alerts.

| Failure | Potential consequence | Control to investigate |
|---|---|---|
| False negative | Deterioration is missed | Monitoring, review thresholds |
| False positive | Unnecessary investigation | Cost-aware thresholding |
| Stale data | Misleading current assessment | Freshness controls |
| Missing evidence | Unsupported conclusion | Suppression / incomplete state |
| Model drift | Degraded detection | Ongoing evaluation |
| Retrieval failure | Weak explanation | Evidence completeness check |
| Cross-company leakage | Confidentiality breach | Authorization and isolation |
| Over-trust | Human accepts alert without review | Explicit decision boundary |

::: tip ARCHITECTURE WARNING
A system that always produces an alert may appear highly available while being operationally unsafe. The architecture must be able to represent **insufficient evidence**, **stale evidence**, and **unable to determine** as legitimate states.
:::

## 27A.8 Advisor Review Position

A defensible technical position should answer four questions:

1. **Capability:** Can the system perform the intended analytical task?
2. **Evidence:** Can important conclusions be traced to appropriate evidence?
3. **Control:** Are authority, access, thresholds, and human review explicit?
4. **Operation:** Can the system detect, contain, and recover from material failure?

The recommendation should then state conditions, not merely enthusiasm or rejection.

Example:

> **Technical position:** The proposed risk-alert architecture is technically viable for decision support provided that probability semantics, data freshness, model calibration, evidence completeness, portfolio isolation, and human review controls are validated before consequential use.

## 27A.9 What Would Change Our Mind?

The advisor should predefine evidence that could change the position, such as:

- validation shows materially weaker performance on the target portfolio;
- probability calibration is inadequate for the intended use;
- data freshness is insufficient for the decision horizon;
- retrieval cannot reliably preserve access boundaries;
- alert thresholds produce unacceptable false-positive or false-negative rates;
- operational cost is disproportionate to decision value;
- human reviewers systematically over-trust or ignore the alerts.

## Field Rule

> **A risk alert is credible only when its claim, evidence, analytical method, policy threshold, failure behavior, and human decision boundary are all explicit.**
