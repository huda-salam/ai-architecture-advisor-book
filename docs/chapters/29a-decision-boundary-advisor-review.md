# 29A. Human Decision Boundary — Advisor Review

::: tip FOUNDATION
A human-in-the-loop statement is not, by itself, an effective control. The advisor must determine **where authority resides, what the system can do, what the human must decide, and how those boundaries are technically enforced**.
:::

## Purpose

Chapter 29 establishes the human decision boundary for AI-IDSS. This companion section provides a method for challenging whether that boundary is real, appropriate, and enforceable.

The central question is:

> **Who has authority to make the consequential decision, and what prevents the AI system from exercising more authority than intended?**

## 29A.1 Reasoning Is Not Authority

An AI system may:

- identify a risk;
- estimate a probability;
- summarize evidence;
- recommend an action;
- prioritize cases;
- propose a workflow step.

These capabilities do not automatically grant authority to:

- approve capital allocation;
- change financial records;
- disclose confidential information;
- execute transactions;
- change policy;
- make an accountable organizational decision.

The architecture should separate:

```text
AI Analysis
    ↓
Recommendation
    ↓
Human Decision Authority
    ↓
Authorized Action
```

::: tip ADVISOR LENS
Never accept “there is a human in the loop” as sufficient evidence. Ask **what the human can see, what the human must approve, what the system can do without approval, and whether the technical controls enforce those boundaries.**
:::

## 29A.2 Define the Decision Boundary Explicitly

For each consequential workflow, document:

| Boundary | Required question |
|---|---|
| Analysis | What may AI determine? |
| Recommendation | What may AI suggest? |
| Approval | What requires an authorized human? |
| Execution | Which actions can the system perform? |
| Override | Who can override a recommendation? |
| Accountability | Who owns the final decision? |
| Audit | What records prove what happened? |

A boundary that exists only in policy documentation is weaker than one enforced through identity, authorization, workflow, and API controls.

## 29A.3 Authority Levels

A useful conceptual model is:

```text
Level 0 — Observe
    Read and summarize.

Level 1 — Recommend
    Generate findings and proposed actions.

Level 2 — Prepare
    Create drafts or staged transactions requiring approval.

Level 3 — Execute bounded actions
    Perform explicitly authorized low-risk actions.

Level 4 — Consequential autonomous action
    Act without case-by-case human approval.
```

The correct level depends on risk, reversibility, control maturity, and evidence. Higher autonomy should require stronger justification rather than being treated as the default destination.

## 29A.4 Technical Enforcement

Suppose an agent recommends sending a communication or initiating a workflow.

```text
Agent proposes action
       ↓
Policy evaluation
       ↓
Identity / authorization
       ↓
Risk classification
       ↓
Human approval if required
       ↓
API execution
       ↓
Audit event
```

The model should not be the component that decides whether it is authorized to execute the action.

## 29A.5 Human Review Quality

Human involvement can fail even when approval exists.

Potential failure modes include:

- automation bias;
- alert fatigue;
- insufficient evidence visibility;
- unclear uncertainty;
- excessive workload;
- rubber-stamp approval;
- inability to reconstruct the AI output;
- unclear accountability;
- approval after rather than before the consequential action.

The advisor should therefore evaluate the **human operating model**, not only the software control.

## 29A.6 Reversibility Matters

The more difficult an action is to reverse, the stronger the required control should generally be.

```text
Informational output
      ↓
Reversible recommendation
      ↓
Staged action
      ↓
Irreversible / high-impact action
```

This is not a universal risk formula, but it is a useful architecture heuristic.

## 29A.7 Agent Permissions

For agentic systems, inspect permissions at the tool boundary.

Ask:

- What identity does the agent use?
- Is the identity shared or user-delegated?
- What resources can each tool access?
- Can the tool mutate state?
- What is the minimum required permission?
- Are permissions time-limited?
- Are high-risk operations separately authorized?
- Can prompt injection influence tool selection?
- Are tool calls auditable?

::: tip ARCHITECTURE WARNING
“Read-only agent” is meaningful only if the underlying credentials and APIs actually enforce read-only authority. A prompt instruction saying “do not modify data” is not an access-control mechanism.
:::

## 29A.8 Human Decision Interface

The interface should allow the decision maker to distinguish:

```text
Source evidence
     ≠
Analytical finding
     ≠
AI interpretation
     ≠
Recommendation
     ≠
Human decision
```

For consequential decisions, the interface should expose enough context to challenge the recommendation rather than merely accept it.

Useful elements may include:

- evidence references;
- key drivers;
- uncertainty;
- data freshness;
- model/version information where useful;
- conflicting evidence;
- missing evidence;
- recommended next action;
- approval status.

## 29A.9 Advisor Challenge Questions

- Who is accountable for the final decision?
- What can AI do without approval?
- What requires explicit approval?
- Can the system technically enforce that distinction?
- Can an agent call a write-capable tool?
- Which credentials does it use?
- What happens if the model proposes an unauthorized action?
- What happens if the human approves an action based on stale evidence?
- Can the decision be reconstructed later?
- What happens when the approval service is unavailable?
- What evidence would justify increasing or reducing autonomy?

## 29A.10 Technical Position

A defensible position might be:

> **Technical position:** The proposed AI-IDSS should remain recommendation-oriented for consequential investment decisions until evidence demonstrates that higher levels of autonomy can operate within explicit identity, authorization, policy, observability, recovery, and accountability controls.

This is not an argument against autonomy. It is an argument that autonomy should be **earned through evidence and control maturity**.

## 29A.11 What Would Change Our Mind?

The advisor should identify evidence that could justify a different boundary:

- demonstrated reliability at the target workload;
- bounded and independently enforced permissions;
- robust policy enforcement;
- tested failure and recovery behavior;
- measurable reduction in human error or operational burden;
- strong auditability;
- acceptable consequences under adverse scenarios;
- clear accountability and governance.

## Field Rule

> **Human-in-the-loop is not a checkbox. A credible decision boundary is an enforceable separation between what AI may infer, what it may recommend, what it may execute, and what an accountable human must decide.**
