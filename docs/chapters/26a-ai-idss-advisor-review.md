# 26A. AI-IDSS Advisor Review — From Architecture to Technical Position

::: tip ADVISOR LENS
Chapter 26 defines the AI-IDSS reference architecture. This companion chapter defines how the advisor should interrogate that architecture before forming a technical position.
:::

The advisor should not treat an architecture diagram as evidence that the system is viable. The diagram describes intended responsibilities. The review must determine whether those responsibilities are technically credible, appropriately controlled, and supported by evidence.

## 26A.1 The Advisor Review Chain

Use the following sequence:

```text
Architecture Element
        ↓
Mechanism
        ↓
Assumption
        ↓
Requirement / Constraint
        ↓
Evidence
        ↓
Failure Mode / Trade-off
        ↓
Validation
        ↓
Technical Position
        ↓
Recommendation
```

For example, “use RAG for investment research” is not yet an architectural conclusion. The advisor should ask what knowledge is required, why retrieval is necessary, what sources are authoritative, how access is enforced, how retrieval quality is measured, what happens when evidence is missing or stale, and what evidence would justify the design.

## 26A.2 Responsibility Before Technology

For every significant component, identify:

| Question | Advisor test |
|---|---|
| Responsibility | What does this component actually own? |
| Mechanism | How does it perform that responsibility? |
| Authority | What is it allowed to decide or change? |
| Evidence | How do we know it performs adequately? |
| Failure | What happens when it is wrong or unavailable? |
| Dependency | What other component must it trust? |
| Reversibility | How difficult is it to replace? |
| Economics | What does the complete capability cost? |

A component without a clear responsibility is often architectural decoration rather than architecture.

## 26A.3 Challenge the Semantic Strength of Outputs

The stronger the claim, the stronger the required evidence.

```text
Narrative summary
      ↓
Analytical finding
      ↓
Prediction / classification
      ↓
Probability
      ↓
Recommended action
      ↓
Authorized decision
```

These are not interchangeable. A generated explanation does not establish a calibrated probability. A probability does not by itself establish that an action is appropriate. A recommendation does not become an authorized decision merely because the interface presents it confidently.

::: warning ARCHITECTURE WARNING
Precision in presentation can create false confidence. Whenever an architecture presents percentages, rankings, scores, recommendations, or confidence statements, identify the computational basis, validation method, uncertainty, and decision authority behind the claim.
:::

## 26A.4 Review the Evidence Chain

For a consequential AI-IDSS output, the advisor should be able to reconstruct the relevant chain:

```text
Authoritative Source
      ↓
Validated Data
      ↓
Analytical Processing
      ↓
Model Output
      ↓
Retrieved Supporting Evidence
      ↓
AI Synthesis
      ↓
Recommendation
      ↓
Human Decision
```

The objective is not to expose hidden model reasoning. The objective is to preserve sufficient observable evidence, versions, inputs, outputs, and decisions to understand how the result was produced and whether it should be trusted for its intended purpose.

## 26A.5 Failure Localization

When an output is wrong, ask where the failure entered the chain.

| Failure | First question |
|---|---|
| Source | Was the authoritative source itself correct? |
| Data | Was data transformed or reconciled correctly? |
| Retrieval | Was the relevant authorized evidence retrieved? |
| Model | Did the analytical method perform within its validated conditions? |
| LLM | Did synthesis introduce unsupported claims? |
| Orchestration | Was the correct workflow, model, or tool invoked? |
| Security | Was authority enforced at every boundary? |
| Application | Did presentation distort the meaning of the result? |
| Human process | Was the output interpreted or acted upon incorrectly? |

This prevents indiscriminate remedies such as replacing the LLM when the actual defect is stale data, weak retrieval, incorrect authorization, or faulty orchestration.

## 26A.6 Minimum Evidence Before a Technical Position

For a material architecture decision, seek evidence proportionate to the consequence of failure. Depending on the decision, this may include:

- task-specific evaluation results;
- representative workload tests;
- retrieval-quality measurements;
- security and authorization tests;
- failure and degradation tests;
- latency and concurrency measurements;
- cost-model assumptions and observed usage;
- model/version traceability;
- data-quality and freshness measurements;
- integration and interoperability tests;
- operational ownership and support arrangements;
- migration or exit analysis.

Do not demand every test for every decision. Demand enough evidence to resolve the uncertainty that could materially change the recommendation.

## 26A.7 Technical Position Format

The advisor's position should be concise but defensible:

```text
Technical Position:
    <support / support with conditions / second opinion / dissent>

Reason:
    <key technical finding>

Evidence:
    <strongest supporting evidence>

Material Risk:
    <failure mode and consequence>

Condition:
    <control, validation, or architectural change required>

Uncertainty:
    <what remains unknown>

What Would Change Our Mind:
    <specific evidence or observed result>
```

## 26A.8 The Advisor's Core Questions

Before endorsing an AI-IDSS architecture, the advisor should be able to answer:

1. What decision is this system actually supporting?
2. Which components are authoritative, analytical, generative, or decision-supporting?
3. What mechanism produces each material claim?
4. Which assumptions are carrying the architecture?
5. What evidence validates those assumptions?
6. Where can an incorrect result enter the system?
7. What is the maximum credible consequence of failure?
8. Which control contains that consequence?
9. What must remain deterministic?
10. Where does authority begin and end?
11. What remains uncertain?
12. What evidence would change the technical position?

## 26A.9 Field Rule

> **Do not approve an architecture because its components are familiar or its diagram is complete. Approve, reject, or condition it based on whether its mechanisms, assumptions, evidence, failure controls, authority boundaries, economics, and reversibility are adequate for the decision it is intended to support.**
