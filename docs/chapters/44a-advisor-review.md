# 44A — Model Ownership Advisor Review

> **Advisor question:** Which AI capabilities should the organization own, which should it consume, where should the control boundary sit, and what evidence justifies that allocation?

## FOUNDATION

“Build versus buy” is too coarse for modern AI architecture.

The relevant decision is the allocation of ownership across layers:

```text
Application
Workflow
Data
Identity / Policy
Evaluation
Model Access
Model Weights
Infrastructure
```

The organization may own some layers and consume others.

## 44A.1 Start With the Control Boundary

Identify what must remain under organizational control:

- sensitive data;
- identity and authorization;
- workflow authority;
- evaluation;
- auditability;
- policy enforcement;
- model routing;
- operational recovery;
- contractual controls.

Only then ask whether model ownership is necessary.

**ADVISOR LENS**

> Sensitive data is a constraint to satisfy, not an automatic instruction to build a foundation model.

## 44A.2 Locate the Strategic Moat

Ask:

> **If the underlying model were replaced tomorrow, what would still create value?**

Possible answers:

- proprietary data;
- domain workflow;
- decision logic;
- evaluation assets;
- distribution;
- integrations;
- organizational expertise;
- model capability itself.

If most value remains above the model layer, owning foundation-model weights may not be the primary strategic investment.

## 44A.3 Compare Complete Dependency Graphs

Third-party architecture:

```text
Enterprise Boundary
      ↓
External Model Provider
      ↓
Provider Infrastructure / Model Lifecycle
```

Self-hosted architecture:

```text
Enterprise Boundary
      ↓
Model Weights
      ↓
Runtime
      ↓
Accelerator / Infrastructure
      ↓
Specialist Operations
      ↓
Model / Software Lifecycle
```

Neither is dependency-free.

**ARCHITECTURE WARNING**

> Self-hosting changes the dependency graph; it does not eliminate dependency.

## 44A.4 Evaluate the Four Ownership Options

| Option | Primary enterprise responsibility | Main dependency |
|---|---|---|
| Third-party API | Application, data, workflow, controls | Model provider |
| Enterprise AI platform | Boundary, policy, routing, evaluation | Model providers |
| Self-hosted open-weight | Serving, infrastructure, lifecycle | Model/runtime/hardware ecosystem |
| Proprietary foundation model | Full model lifecycle | Infrastructure, talent, data, software ecosystem |

The comparison must use the actual workload and constraints.

## 44A.5 Test Economics Properly

Do not compare API price with GPU price.

Compare complete lifecycle economics:

```text
Inference
+ Infrastructure
+ Engineering
+ Security
+ Operations
+ Evaluation
+ Reliability
+ Compliance
+ Lifecycle
+ Vendor Management
+ Exit / Migration
+ Opportunity Cost
```

A fixed internal investment may be justified at high utilization and strong differentiation, while remaining uneconomic at lower utilization or rapid technology turnover.

## 44A.6 Test Reversibility

For a third-party model ask:

- Can another provider be introduced?
- Are prompts/workflows portable?
- Are evaluation datasets owned internally?
- Can retrieval remain provider-independent?
- Can contracts support exit?
- How long would migration take?

For self-hosting ask:

- Can the runtime be changed?
- Can hardware capacity be replaced?
- Can another model be deployed?
- Are operations documented?
- Can specialist knowledge be transferred?

Portability should be demonstrated, not assumed from API compatibility.

## 44A.7 When Proprietary Model Development Becomes More Defensible

Look for convergence of:

1. distinctive proprietary data;
2. measurable domain advantage;
3. sufficient utilization;
4. requirements external providers cannot satisfy;
5. strategic differentiation at the model layer;
6. internal lifecycle capability;
7. sustainable investment;
8. durable advantage despite frontier improvement.

The more conditions that remain assumptions, the weaker the case for model ownership.

## 44A.8 When Third-Party Models Become More Defensible

They become more attractive when:

- frontier capability changes rapidly;
- time-to-value matters;
- the model itself is not the moat;
- enterprise controls can satisfy requirements;
- internal model operations would be disproportionate;
- representative evaluations show sufficient performance;
- credible exit alternatives exist.

These are decision criteria, not universal rules.

## 44A.9 Technical Position

A defensible recommendation should identify the ownership boundary:

> The organization should own identity, policy, data, retrieval, evaluation, workflow, audit, and model-routing controls while consuming foundation-model capability externally. This is appropriate because the strategic differentiation resides above the model layer, external models meet the representative workload requirements, and credible migration mechanisms can be established.

Or:

> Proprietary model development is justified because the required capability is materially differentiated by proprietary data, external alternatives remain insufficient on representative workloads, utilization supports the economics, and the organization can sustain the model lifecycle.

## 44A.10 What Would Change Our Mind?

Reconsider third-party dependence if:

- mandatory controls cannot be contractually or technically satisfied;
- provider concentration becomes unacceptable;
- exit cannot be demonstrated;
- external capability creates a durable material performance gap;
- economics become inferior after complete TCO.

Reconsider proprietary development if:

- external models close the capability gap;
- internal lifecycle cost becomes disproportionate;
- model ownership creates little strategic differentiation;
- technology turnover makes the investment obsolete too quickly.

## Field Rule

> **Own the layer that creates strategic differentiation and control; consume the capability that does not justify the cost and responsibility of ownership.**
