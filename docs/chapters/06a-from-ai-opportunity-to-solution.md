# From AI Opportunity to AI Solution

> **FOUNDATION**

AI suitability answers one question:

> **Should AI be involved?**

The next question is:

> **If AI is justified, what kind of solution should we pursue?**

This section bridges executive reasoning and detailed technical architecture. It deliberately stays at decision level. Technical mechanisms are linked to the deeper chapters rather than repeated here.

## 1. The Decision Bridge

```text
AI Opportunity
      ↓
Business Outcome
      ↓
AI Role
      ↓
Requirements & Constraints
      ↓
Solution Options
      ↓
Evidence & Validation
      ↓
Risk / Economics / Governance
      ↓
Technical Position
      ↓
Recommendation
```

The advisor should not jump directly from “AI is useful” to “use this model.” There are several decisions between those statements.

## 2. Define the AI Role

The first architectural question is not the model. It is the **role AI should play in the business process**.

Possible roles include:

- information extraction;
- classification or routing;
- prediction or estimation;
- summarization or synthesis;
- content generation;
- recommendation;
- decision support; or
- bounded execution.

The role determines what quality, risk, control, and architecture requirements follow.

Technical depth: see [Chapter 8 — AI Architecture Fundamentals](./08-ai-architecture-fundamentals), [Chapter 26 — AI-IDSS Reference Architecture](./26-ai-idss-reference-architecture), and [Chapter 29 — Human Decision Boundary](./29-human-decision-boundary).

## 3. Convert the Opportunity Into Requirements

Translate the opportunity into requirements before evaluating products.

At minimum identify:

| Requirement | Question |
|---|---|
| Outcome | What measurable result must improve? |
| Quality | How good must the output be? |
| Latency | How quickly must the result be available? |
| Scale | How much workload must be supported? |
| Availability | When must the capability be available? |
| Data | What information is required? |
| Security | What must be protected? |
| Accountability | Who owns the consequential decision? |
| Cost | What economic boundary is acceptable? |
| Change | How likely are requirements, models, or vendors to change? |

This prevents architecture from being shaped by whichever technology happens to be proposed first.

Technical depth: see [Chapter 6 — How to Evaluate a Technology Proposal](./06-evaluating-proposals) and [Chapter 7 — Architecture Decision Framework](./07-architecture-decisions).

## 4. Identify the Simplest Credible Solution

The advisor should compare solution classes before comparing products.

```text
Conventional software
        ↕
Rules / workflow
        ↕
Analytics / conventional ML
        ↕
Generative AI
        ↕
Agentic architecture
```

The objective is not to select the most capable class. It is to select the **least complex solution that can credibly achieve the required outcome**.

An AI solution may still include substantial deterministic components. AI does not need to own the entire process.

## 5. Separate AI Capability From System Responsibility

A model may generate an answer, but the system remains responsible for:

- identity;
- authorization;
- data access;
- workflow state;
- validation;
- business rules;
- auditability;
- error handling;
- observability; and
- human escalation.

Therefore:

> **Do not treat the model as the architecture. Treat the model as one component inside a governed system.**

Technical depth: see Chapters 8–11 and 19–25.

## 6. Define What Must Be Proven

Every material requirement should lead to evidence.

```text
Requirement
    ↓
Claim
    ↓
Evidence Required
    ↓
Test / Validation
    ↓
Result
    ↓
Decision
```

Examples:

| Claim | Evidence to seek |
|---|---|
| “The model is accurate enough.” | Representative evaluation and failure analysis |
| “RAG solves the knowledge problem.” | Retrieval and end-to-end evaluation on representative data |
| “The system can scale.” | Load/scaling evidence and operational assumptions |
| “The solution is cheaper.” | Lifecycle cost model and credible workload assumptions |
| “The architecture is portable.” | Dependency analysis and realistic exit path |
| “Human oversight controls the risk.” | Actual intervention mechanism, authority, workload, and effectiveness evidence |

Technical depth: see [Chapter 31 — Model Evaluation](./31-model-evaluation), [Chapter 34 — AI Total Cost of Ownership](./34-ai-tco), [Chapter 36 — Vendor Dependency & Exit Strategy](./36-vendor-dependency-exit-strategy), and [Chapter 40 — Production Readiness](./40-production-readiness).

## 7. Compare Alternatives, Not Just the Proposal

A technical recommendation becomes stronger when the advisor can state what was considered and rejected.

For each credible option ask:

- What requirement does it satisfy?
- What requirement does it weaken?
- What assumptions does it introduce?
- What can fail?
- What does it cost over its lifecycle?
- What operational capability does it require?
- What dependencies does it create?
- How reversible is the decision?

The comparison should remain proportional to the decision. Not every decision requires a large scoring exercise.

## 8. Decide the Appropriate Boundary of Automation

A solution may use AI without allowing AI to execute consequential actions.

```text
AI observes
   ↓
AI summarizes
   ↓
AI recommends
   ↓
Human decides
   ↓
System executes
```

Or, for lower-risk activities, a bounded automated path may be appropriate.

The boundary should be explicit rather than implied by interface design.

Technical depth: see [Chapter 29 — Human Decision Boundary](./29-human-decision-boundary) and [Chapter 37 — AI Risk Framework](./37-ai-risk-framework).

## 9. Economic and Operational Reality Check

Before recommending implementation, ask whether the organization can sustain the solution.

Consider:

- recurring model or infrastructure cost;
- data preparation and maintenance;
- evaluation and regression testing;
- monitoring and incident response;
- security controls;
- human review workload;
- integration and operational complexity;
- vendor dependency; and
- future migration or exit cost.

A technically feasible AI solution is not automatically a viable enterprise solution.

Technical depth: see Chapters 34–36 and 40.

## 10. Executive Recommendation Format

The final recommendation should be short enough for executive use but traceable to the analysis.

> **Recommendation:** Proceed with [solution class] for [business objective], subject to [material conditions].
>
> **Why:** It provides the required capability with the strongest overall balance of value, risk, cost, and reversibility among the evaluated options.
>
> **Key risks:** [material risks].
>
> **Evidence still required:** [material unknowns].
>
> **Decision boundary:** [what AI may and may not do].
>
> **Reversal trigger:** [what evidence or change would cause the recommendation to be revisited].

This connects directly to the existing Architecture Decision Framework.

## Field Rule

> **Once AI is justified, do not ask “Which model should we buy?” Ask “What solution class, architecture, controls, and evidence are required to achieve the business outcome?”**
