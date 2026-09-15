# AI Suitability & Opportunity

> **FOUNDATION**

## Purpose

Before selecting a model, designing a RAG pipeline, or proposing an AI platform, the advisor should first determine whether AI belongs in the solution at all.

The executive question is not:

> **“Can AI do this?”**

It is:

> **“Would using AI materially improve this business outcome, and is the additional risk, cost, and complexity justified?”**

This distinction prevents technology decisions from starting with a technology.

## 1. Start With the Business Problem

Describe the problem without naming an AI technology.

Ask:

- What outcome are we trying to improve?
- Who experiences the problem?
- What is the current process or baseline?
- What does failure cost?
- What happens if we do nothing?
- How would we recognize meaningful improvement?

A useful discipline is to write the problem in operational terms before discussing AI.

```text
Business Objective
      ↓
Business Problem
      ↓
Current Baseline
      ↓
Desired Outcome
```

Technical depth: see [Chapter 6 — How to Evaluate a Technology Proposal](./06-evaluating-proposals).

## 2. Determine Whether the Problem Is AI-Suitable

Not every difficult or inefficient process needs AI.

A problem is more likely to justify AI when it involves characteristics such as:

- prediction or estimation under uncertainty;
- classification of complex or variable inputs;
- interpretation of unstructured information;
- language understanding or generation;
- pattern detection that is difficult to encode deterministically;
- recommendation or prioritization where multiple signals must be considered; or
- synthesis of large amounts of information for human decision support.

A problem is less likely to require AI when it is already well described by:

- deterministic calculations;
- explicit business rules;
- stable workflows;
- conventional database queries;
- straightforward automation; or
- well-understood software logic.

The point is not that AI cannot perform these tasks. The point is that **technical capability alone is insufficient justification**.

## 3. The AI Suitability Test

Use the following sequence before allowing the discussion to move into model or architecture selection.

```text
                    BUSINESS PROBLEM
                           ↓
              Can conventional methods
                 solve it adequately?
                    ↙           ↘
                  YES            NO / UNCERTAIN
                   ↓                    ↓
            Prefer simpler       Identify the AI
                solution         capability required
                                         ↓
                              Does AI create material
                                 incremental value?
                                  ↙           ↘
                                NO             YES
                                 ↓              ↓
                           Do not use AI   Assess risk,
                                          evidence & economics
                                                  ↓
                                           AI may be justified
```

This is a screening framework, not an automatic approval mechanism.

## 4. AI Opportunity Is Not the Same as AI Adoption

An activity may be technically suitable for AI while still being a poor investment.

Evaluate four dimensions:

| Dimension | Executive question |
|---|---|
| **Suitability** | Is AI appropriate for the characteristics of the problem? |
| **Value** | Does AI materially improve the desired outcome? |
| **Viability** | Can the capability operate at acceptable quality, speed, cost, and reliability? |
| **Governability** | Can the organization control, monitor, explain, and remain accountable for its use? |

A positive answer in one dimension does not compensate for a failure in another.

## 5. Where AI Can Add Value

Think in terms of **capability**, not product names.

| Business need | Possible AI role | Initial advisor posture |
|---|---|---|
| Extract information from variable documents | AI-assisted extraction | Potentially suitable |
| Classify or route complex cases | Classification | Potentially suitable |
| Forecast or estimate uncertain outcomes | Predictive model | Potentially suitable |
| Summarize large information sets | Generative AI | Often suitable, subject to quality controls |
| Generate drafts or alternatives | Generative AI | Often suitable with human review |
| Recommend priorities or actions | AI-assisted recommendation | Context-dependent |
| Execute deterministic business rules | Conventional software | Prefer non-AI unless AI adds material value |
| Perform fixed calculations | Conventional software | Prefer non-AI |
| Make consequential decisions autonomously | AI + governance/human boundary | High scrutiny |

These are starting hypotheses. The actual suitability depends on the requirements, data, risk, evidence, and economics.

Technical depth: see Chapters 8–11, 26, 29–32.

## 6. Ask What Level of AI Involvement Is Necessary

“Use AI” is too broad a conclusion.

The advisor should identify the appropriate role:

```text
No AI
  ↓
AI-assisted information processing
  ↓
AI-assisted recommendation
  ↓
AI-assisted decision support
  ↓
Bounded AI action
  ↓
Higher-autonomy agentic operation
```

As AI involvement increases, the required controls, evaluation, observability, security, and accountability generally become more demanding.

Technical depth: see [Chapter 29 — Human Decision Boundary](./29-human-decision-boundary) and [Chapter 11 — Agentic Architecture](./11-agentic-architecture).

## 7. Business Value Must Be Incremental

Do not ask only:

> “What value can AI create?”

Ask:

> **“What additional value does AI create compared with the best credible alternative?”**

The comparison may be against:

- the current manual process;
- conventional automation;
- rules-based systems;
- conventional analytics or machine learning;
- an existing vendor capability; or
- doing nothing.

This prevents an AI proposal from receiving credit for benefits that could have been achieved more simply.

Technical depth: see [Chapter 34 — AI Total Cost of Ownership](./34-ai-tco) and [Chapter 35 — Cost / Performance Optimization](./35-cost-performance-optimization).

## 8. Risk Can Change the Answer

An AI capability may be useful but inappropriate for a particular decision boundary.

Ask:

- What happens when the system is wrong?
- Can the error be detected before harm occurs?
- Is the output advisory or consequential?
- Who is accountable for the resulting action?
- Can a human meaningfully intervene?
- What data or authority does the system receive?

Technical depth: see [Chapter 19 — AI Security Model](./19-ai-security-model), [Chapter 22 — AI-Specific Threats](./22-ai-specific-threats), [Chapter 29 — Human Decision Boundary](./29-human-decision-boundary), and [Chapter 37 — AI Risk Framework](./37-ai-risk-framework).

## 9. Evidence Before Commitment

At the opportunity stage, the advisor does not need every implementation detail. The advisor does need enough evidence to justify moving forward.

Ask for evidence appropriate to the decision:

- baseline performance;
- expected improvement;
- representative use cases;
- data availability and quality;
- initial feasibility results;
- known failure cases;
- estimated lifecycle cost;
- operational constraints; and
- material regulatory, security, or accountability constraints.

Unknowns should be explicitly recorded rather than silently converted into assumptions.

> **If we do not know yet, determine how to know.**

Technical depth: see [Chapter 0 — Reasoning & Evidence Standard](./00-reasoning-evidence), [Chapter 31 — Model Evaluation](./31-model-evaluation), and [Chapter 40 — Production Readiness](./40-production-readiness).

## 10. Executive Decision Outcomes

The suitability assessment should end with a clear position. Four outcomes are usually sufficient:

| Outcome | Meaning |
|---|---|
| **Proceed without AI** | A simpler approach adequately solves the problem. |
| **Investigate AI** | Potential value exists, but material evidence is missing. |
| **Proceed with bounded AI** | AI is justified with explicit controls and decision boundaries. |
| **Proceed with AI at higher autonomy** | The use case and evidence justify greater automation, subject to appropriate assurance. |

The advisor should avoid treating “AI” as the default outcome.

## 11. Advisor Questions

Before an AI initiative moves into detailed architecture, ask:

1. What business problem are we solving?
2. What is the current baseline?
3. What outcome must improve?
4. Could conventional software or automation solve the problem adequately?
5. What specific AI capability is actually required?
6. What incremental value does AI provide over the best alternative?
7. What evidence supports that expectation?
8. What happens when the AI is wrong?
9. What level of autonomy is appropriate?
10. What must remain under human or deterministic control?
11. What data is required, and do we have it?
12. Is the lifecycle cost justified by the incremental value?
13. What would make us decide not to use AI?

## Field Rule

> **Do not begin with “Which AI technology should we use?” Begin with “What problem are we solving, and does AI materially improve the answer?”**
