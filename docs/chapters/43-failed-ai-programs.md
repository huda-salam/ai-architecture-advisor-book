# 43. Failed AI Programs

> **Purpose:** Study documented AI failures, abandoned deployments, and unsuccessful scaling attempts as evidence for architecture review—not as proof that AI is inherently unreliable.

## 43.1 Why Failure Evidence Matters

Successful implementations answer one question:

> **Can this architecture work somewhere?**

Failure evidence asks a different and often more valuable question:

> **Under what conditions does the architecture stop working, and what controls failed to prevent that?**

For an independent technical advisor, both are necessary.

**FOUNDATION**

> A success case demonstrates feasibility under particular conditions. A failure case reveals a boundary condition, an unrecognized dependency, an inadequate control, or an incorrect assumption.

Failure evidence is especially useful because organizations are generally more willing to publish successful outcomes than unsuccessful projects. The public record is therefore likely to underrepresent failure.

## 43.2 Failure Is Not One Thing

Do not use “AI failure” as a single category.

A project can fail because:

- the model was technically inadequate;
- the data was unsuitable;
- the system could not integrate with operational systems;
- the process was poorly defined;
- the economics did not work;
- users did not adopt it;
- governance or compliance requirements could not be satisfied;
- operational scale exceeded the architecture;
- the model behaved acceptably in testing but poorly in production;
- the business environment changed;
- the project solved a problem that was not important enough to justify its cost.

These are different failure modes and require different architectural responses.

**ARCHITECTURE WARNING**

> “The AI project failed” is not a root cause.

The advisor should keep asking:

**What failed? Why did it fail? Which assumption was wrong? Why was the failure not detected earlier?**

## 43.3 Case: Amazon Experimental Recruiting System

Reuters reported in 2018 that Amazon had developed an experimental machine-learning recruiting system trained on historical resumes. The system learned patterns from a predominantly male applicant pool and reportedly penalized indicators associated with women, including references to women's organizations and graduates of two women's colleges. Amazon attempted to neutralize specific terms, but the team reportedly concluded that this did not provide sufficient assurance against other discriminatory patterns and the project was ultimately abandoned. [Reuters, October 10, 2018](https://www.reuters.com/article/us-amazon-com-jobs-automation-insight-idUSKCN1MK08G)

This is **Industry Evidence**, but the underlying reporting was based substantially on people familiar with the project rather than a public technical postmortem.

### Architectural lesson

The failure was not simply “the algorithm was biased.” The deeper architecture questions are:

- What population generated the training data?
- Did historical outcomes represent the target decision objective?
- What fairness criteria were defined before deployment?
- Could the model discover proxy variables for protected characteristics?
- Was there an independent evaluation set?
- Was monitoring capable of detecting unexpected behavior?
- What decision authority did the model actually have?

**ADVISOR LENS**

> Historical data is evidence about the past. It is not automatically a specification of what the organization should do in the future.

This directly supports the architecture principle that training-data provenance, representativeness, evaluation, and decision boundaries must be considered separately.

## 43.4 Case: Zillow Offers — Prediction Meets Operational Scale

Zillow Group's public SEC filings provide unusually strong evidence of a technology-enabled business failure because the company disclosed both the operational decision and its financial consequences.

In November 2021, Zillow's board decided to wind down Zillow Offers. The company cited home-price unpredictability, capacity constraints, and other operational challenges. Its 2021 annual filing states that the business used data science and proprietary algorithms to help value and price homes, while acknowledging that those assessments could be inaccurate. The filing reported a $407.9 million inventory write-down and additional wind-down and restructuring costs. [Zillow Group 2021 Form 10-K, SEC](https://www.sec.gov/Archives/edgar/data/1617640/000161764022000013/z-20211231.htm)

The program was ultimately completed in 2022 and resulted in approximately a 25% workforce reduction. [Zillow Group 2022 Form 10-K, SEC](https://www.sec.gov/Archives/edgar/data/1617640/000161764023000010/z-20221231.htm)

This is not a pure “AI failure” case. Zillow's own disclosures attribute the outcome to a combination of prediction uncertainty, market conditions, operational capacity, and business-model considerations.

That distinction is precisely why the case is valuable.

### Architectural lesson

A predictive model can be technically sophisticated while the surrounding decision system remains economically fragile.

The complete system included:

**Market data → valuation models → purchasing decisions → inventory → renovation → financing → resale → market conditions**

The model therefore did not merely produce an informational recommendation. Its predictions were connected to capital commitments and physical inventory.

**ARCHITECTURE WARNING**

> Prediction accuracy is not the same thing as business-model robustness.

For an AI-IDSS, the equivalent question is:

> **What happens when an AI prediction is wrong at exactly the point where the organization commits capital?**

## 43.5 Case: IBM Watson Health — Integration and Business-System Complexity

STAT reported in 2022 that IBM sold core data and analytics assets from Watson Health after the business struggled to meet its ambitions. The reporting described difficulties integrating acquired health-information businesses and their data and organizational cultures into a coherent business, alongside missed sales targets. [STAT, January 21, 2022](https://www.statnews.com/2022/01/21/ibm-watson-health-sale-equity/)

This is best classified as **Industry/Independent Evidence**, not as a clean model-failure case.

### Architectural lesson

Large AI programs can fail above the model layer.

A program may possess:

- strong models;
- valuable datasets;
- substantial engineering investment;
- prestigious partnerships;

and still fail if the surrounding organizational, data, product, and integration architecture does not form a viable system.

This reinforces a central principle of this manual:

> **The AI model is a component of the system, not the system itself.**

## 43.6 What These Failures Have in Common

The cases should not be treated as statistically representative. They are selected because the public evidence reveals useful failure mechanisms.

Several cross-case patterns are nevertheless visible:

| Failure pattern | Evidence illustrated by | Architecture question |
|---|---|---|
| Historical data encodes undesirable behavior | Amazon recruiting | Does training data represent the desired decision objective? |
| Prediction uncertainty meets irreversible economics | Zillow Offers | What is the cost of being wrong? |
| Model capability is insufficient without system integration | Watson Health | Can the surrounding data, product, and operating system work together? |
| Technical feasibility is mistaken for production viability | Multiple cases | What evidence is required beyond a successful prototype? |
| Failure is discovered too late | Multiple cases | Where are the evaluation and decision gates? |

These are **inferences from documented cases**, not universal causal laws.

## 43.7 The Failure Chain

A useful advisor model is:

```text
Assumption
    ↓
Requirement
    ↓
Data / Process
    ↓
Model / Algorithm
    ↓
System Integration
    ↓
Operational Use
    ↓
Economic Outcome
    ↓
Organizational Outcome
```

Failure can originate at any layer.

More importantly, failure can propagate across layers.

For example:

```text
Historical bias
      ↓
Training data
      ↓
Model behavior
      ↓
Ranking output
      ↓
Human selection
      ↓
Organizational discrimination risk
```

Or:

```text
Forecast uncertainty
      ↓
Valuation model
      ↓
Purchase decision
      ↓
Inventory exposure
      ↓
Liquidity requirement
      ↓
Business-model loss
```

This is why architecture review must follow the **causal chain**, not only inspect the model.

## 43.8 Failure Detection: Where Should the System Have Stopped?

A powerful postmortem question is:

> **At what earlier gate could the organization have discovered the problem more cheaply?**

Possible gates include:

1. Problem-definition gate
2. Data-readiness gate
3. Model-evaluation gate
4. Security/privacy gate
5. Integration gate
6. Pilot gate
7. Production-readiness gate
8. Economic gate
9. Post-production monitoring gate

The objective is not to eliminate all failure. That is unrealistic.

The objective is to **move failure detection earlier and reduce the cost of being wrong**.

**FOUNDATION**

> Good architecture does not guarantee success. It improves the organization's ability to detect unacceptable failure before failure becomes expensive.

## 43.9 Reversibility Changes the Required Evidence

The required evidence should increase as the consequences of failure become harder to reverse.

Consider:

| Action | Reversibility | Evidence expectation |
|---|---|---|
| Internal experiment | High | Feasibility evidence |
| Analyst recommendation | Moderate | Quality + evidence traceability |
| Automated workflow | Moderate | Quality + reliability + security |
| Customer-facing decision support | Lower | Strong evaluation + monitoring |
| Capital allocation | Potentially low | Strong evidence + explicit human authority |
| Autonomous transaction | Potentially very low | Very strong controls and failure containment |

This is an **advisor framework**, not a universal regulatory scale.

For AI-IDSS, the implication is straightforward:

> The closer the system gets to committing money, changing rights, or creating irreversible operational consequences, the less acceptable it is to rely on untested assumptions.

## 43.10 Failure Evidence Should Include Negative Evidence

The advisor should actively search for:

- abandoned pilots;
- cancelled programs;
- write-downs;
- discontinued products;
- regulatory findings;
- incidents;
- model withdrawals;
- failed benchmarks;
- user-rejection evidence;
- cost overruns;
- latency or reliability problems;
- vendor exits;
- architecture migrations;
- postmortems.

**ARCHITECTURE WARNING**

> A research process that searches only for “successful AI implementation” is structurally biased toward confirming the recommendation.

The search itself must be adversarial.

## 43.11 How to Challenge a Success Story With Failure Evidence

When a vendor presents a successful architecture, ask:

1. What comparable implementations were abandoned?
2. Why were they abandoned?
3. Which assumptions distinguished the successful and failed cases?
4. What was the cost of failure?
5. How early was the failure detected?
6. Which controls detected it?
7. Which controls failed?
8. What architectural change followed?
9. Is the vendor's reference customer representative or exceptional?
10. What evidence would make us conclude that the success case is not transferable?

This changes the conversation from:

> “Who else uses it?”

to:

> **“Under what conditions does it stop working?”**

## 43.12 Failure Analysis for AI-IDSS

For the proposed investment decision-support system, maintain a failure register such as:

| Failure scenario | Consequence | Detection | Containment | Recovery | Evidence required |
|---|---|---|---|---|---|
| Stale portfolio data | Wrong risk signal | Freshness check | Suppress alert | Re-ingest | Data-quality test |
| Retrieval misses key document | Unsupported conclusion | Retrieval evaluation | Mark evidence incomplete | Re-run retrieval | Recall / coverage evidence |
| Model gives unsupported probability | Misleading confidence | Calibration/validation | Block numeric claim | Human review | Calibration evidence |
| Agent accesses unauthorized data | Confidentiality breach | Authorization audit | Deny tool call | Incident response | Access-control test |
| Provider outage | Decision workflow unavailable | Health monitoring | Fallback/degraded mode | Restore/failover | Resilience test |
| Model update changes behavior | Decision inconsistency | Version monitoring | Rollback/revalidation | Re-approve | Regression evaluation |

The register should connect directly to Chapters 18, 19, 20, 31, 33, 39, 40, and 41.

## 43.13 Failure Does Not Mean “Do Not Use AI”

A common reasoning error is:

> “Company X failed with AI; therefore AI is unsuitable.”

The correct reasoning is conditional:

> “Company X failed under conditions C, with failure mechanism F, after assumption A proved false. Does our proposed architecture contain the same condition, mechanism, or assumption?”

This distinction is critical.

Failure evidence should narrow the **decision boundary**, not automatically determine the decision.

## 43.14 Evidence Quality of Failure Cases

Not all failure stories are equally reliable.

| Source | Evidence value |
|---|---|
| Audited filing / official corporate disclosure | Strong for disclosed financial/operational facts |
| Regulatory or supervisory finding | Strong for documented finding |
| Official postmortem | Strong for disclosed failure mechanism, but scope-limited |
| Independent investigative reporting | Potentially strong; verify methodology |
| Academic case study | Useful if methods and evidence are transparent |
| Vendor retrospective | Useful but commercially selective |
| Anonymous anecdote | Weak unless corroborated |
| Social-media claim | Lead for investigation, not evidence by itself |

The advisor should never upgrade a weak failure story into a factual conclusion merely because it supports an existing concern.

## 43.15 What Would Change Our Mind?

A failure case should materially change an architecture recommendation when:

- the failure mechanism is technically demonstrated;
- our proposed architecture shares the relevant condition;
- the consequence is material;
- the proposed controls do not demonstrably mitigate the mechanism;
- the failure is independently corroborated or supported by strong primary evidence.

Conversely, a failure case should carry less weight when:

- the mechanism is unclear;
- the environment differs materially;
- the failure resulted primarily from unrelated business conditions;
- effective controls now exist;
- the evidence is anecdotal or uncorroborated.

## 43.16 Advisor Takeaway

The strongest technical advisor does not collect only successful reference architectures.

They maintain a **failure library**.

For every major architectural decision, ask:

> **Who tried something similar, what happened, why did it work or fail, and what does that evidence imply about our architecture?**

The objective is not pessimism.

It is to make failure **earlier, cheaper, observable, and containable**.

**FIELD RULE**

> **Do not ask only “Can this work?” Ask “How can this fail, how would we know, and what would happen next?”**
