# 5. Advisory Communication & Influence

Technical correctness alone is insufficient. A technically excellent recommendation can fail if it is poorly structured, overly confrontational, insufficiently evidenced, or unclear about the actual decision.

The advisor therefore needs two capabilities:

> **Technical judgment** — knowing what is technically correct or defensible.

> **Advisory communication** — communicating that judgment so the right decision can be made.

The objective is not to win an argument.

> **The objective is to improve decision quality.**

## 5.1 Core Communication Model

The default model is:

> **Context → Observation → Question → Evidence → Implication → Recommendation**

Example:

> **Context:** We want AI-IDSS to analyze sensitive portfolio-company information.
>
> **Observation:** The current proposal assumes that this requires a proprietary LLM.
>
> **Question:** Is model ownership actually required by the underlying security requirement?
>
> **Evidence:** The stated requirement appears to concern data residency, access control and retention rather than ownership of the foundation model.
>
> **Implication:** Building and operating our own model may introduce infrastructure and operational complexity without directly addressing the core requirement.
>
> **Recommendation:** Evaluate an enterprise LLM with controlled data processing and private connectivity before committing to self-hosting.

## 5.2 Executive Compression

For the RD, compress the analysis into:

> **Bottom Line → Why → Risk → Recommendation**

Example:

> **Bottom line:** I don't recommend building our own foundation model at this stage.
>
> **Why:** The primary requirement appears to be data control, which can potentially be satisfied without owning the model.
>
> **Risk:** Self-hosting creates significant infrastructure, MLOps and operational complexity.
>
> **Recommendation:** Use a controlled enterprise model initially, while preserving the option to self-host if defined technical or economic thresholds are reached.

## 5.3 Technical Discussion Model

With CTOs, architects and engineering leaders:

> **Requirement → Constraint → Architecture → Alternatives → Trade-offs → Decision**

The advisor should move between executive compression and technical depth depending on the audience.

## 5.4 Challenge the Assumption

Use:

> **Assumption → Validation Question → Evidence → Consequence**

Example:

> “We need real-time data.”

Ask:

> “What decision requires the data to be real-time?”

Then determine the actual freshness requirement. “Real-time” may turn out to mean “less than 15 minutes old,” which can materially change architecture and cost.

## 5.5 Challenge the Requirement Before the Solution

Ask:

> **“What requirement makes this technology necessary?”**

Examples:

- “We need Kubernetes.” → Which workload characteristic requires it?
- “We need an agent.” → What task cannot be implemented reliably as a deterministic workflow?
- “We need fine-tuning.” → What problem cannot be solved through prompting or retrieval?
- “We need our own LLM.” → Which requirement cannot be satisfied by an existing model under appropriate controls?

## 5.6 Second-Opinion Model

Use:

> **Existing Position → Independent Assessment → Agreement/Difference → Reason → Recommendation**

A strong second opinion may agree with most of a proposal and challenge only the material part.

> **“I agree with the objective and most of the architecture. My main difference is the model deployment strategy.”**

## 5.7 Dissenting-Opinion Model

For material disagreement:

> **Position → Evidence → Reasoning → Impact → Alternative → Confidence**

Example:

> **Position:** I do not support the proposed architecture in its current form.
>
> **Evidence:** The architecture introduces dedicated GPU infrastructure, but current workload assumptions do not demonstrate sufficient utilization to justify it.
>
> **Reasoning:** The infrastructure decision appears to be driven by model ownership rather than demonstrated workload requirements.
>
> **Impact:** This increases fixed cost and operational complexity.
>
> **Alternative:** Start with managed inference and establish explicit thresholds for migration to self-hosting.
>
> **Confidence:** Medium-high. The remaining uncertainty is expected inference volume, which should be validated through benchmarking.

## 5.8 The “I Don't Know Yet” Model

Use:

> **Known → Unknown → Impact → Validation**

Example:

> “We know that the model performs well on the vendor benchmark. We don't yet know whether it performs adequately on our portfolio documents. That uncertainty affects whether I can recommend production deployment. I recommend testing it against a representative internal evaluation set.”

## 5.9 Evidence Ladder

Important claims should identify the type and strength of evidence:

```text
Direct measurement
Independent evaluation
Documented production evidence
Industry evidence
Vendor documentation
Expert judgment
Assumption
```

This is not an absolute hierarchy. The point is to know what kind of evidence is actually supporting the claim.

## 5.10 Fact vs Interpretation

Separate observations from conclusions.

Weak:

> “The model is unreliable.”

Better:

> “On our evaluation set, the model produced unsupported conclusions in 7% of cases.”

Then:

> “I therefore don't recommend using it without a grounding mechanism for this use case.”

**Fact:** 7% unsupported conclusions.

**Interpretation:** insufficient reliability for the intended use.

**Recommendation:** add an appropriate grounding mechanism and re-evaluate.

## 5.11 Translate Technical Issues for the RD

| Technical statement | Executive translation |
|---|---|
| No model fallback | Single point of failure |
| No lineage | Cannot reliably establish where an answer came from |
| Hard-coded vendor API | Higher switching cost |
| High GPU utilization | Capacity and cost risk |
| No authorization layer | Users may access information beyond their authority |
| No evaluation framework | We cannot demonstrate whether AI performs adequately |
| RAG without ACL filtering | Potential cross-user/company data leakage |
| No disaster recovery | Potential prolonged service interruption |
| Tight coupling to one model | Model migration becomes expensive |

The advisor must be able to answer:

> **Why should the RD care?**

## 5.12 Communicating Risk

Use:

> **Risk → Mechanism → Impact → Mitigation**

Example:

> “The architecture introduces a potential data-isolation risk because authorization is enforced only at the application layer. I recommend enforcing authorization before retrieval and explicitly testing cross-tenant access.”

## 5.13 When the Proposal Is Good

Independence does not mean permanent skepticism.

The advisor should be willing to say:

> “I independently reviewed the proposal and agree with the architecture. The security boundary is appropriate, the integration pattern is consistent with our requirements, and the projected workload is within the stated capacity assumptions. I have no material technical objection.”

## 5.14 Communication Anti-Patterns

### Authority argument

> “I'm the architect, so this is wrong.”

### Technology tribalism

> “We should always use open source.”

### False certainty

> “This will definitely scale.”

### Unstructured criticism

> “There are many problems with this.”

### Excessive technical detail

Explaining implementation details without connecting them to the decision.

### Refusal to recommend

> “Both options have advantages and disadvantages.”

### Personalization of disagreement

> “The Head of AI doesn't understand architecture.”

All replace reasoning with authority, ideology, noise or organizational conflict.

## 5.15 The C-A-E-I-R Formula

For daily use:

> **C → A → E → I → R**

**Context** — What are we trying to achieve?

**Assumption** — What does the proposal assume?

**Evidence** — What supports or contradicts it?

**Implication** — Why does it matter?

**Recommendation** — What should we do?

Example:

> **Context:** We need secure AI access to portfolio-company data.
>
> **Assumption:** This requires an internally hosted foundation model.
>
> **Evidence:** The security requirement primarily concerns data access, retention and isolation.
>
> **Implication:** Model ownership may not be necessary and could add substantial operational complexity.
>
> **Recommendation:** Evaluate controlled enterprise inference first, with self-hosting retained as an alternative.

## 5.16 Advisory Communication Test

Before communicating a recommendation, ask:

1. Have I separated facts from assumptions?
2. Have I challenged the underlying requirement?
3. Have I considered alternatives?
4. Can I explain why the issue matters?
5. Have I quantified the material impact where possible?
6. Have I stated my recommendation?
7. Have I stated my confidence?
8. Do I know what would change my mind?
9. Am I challenging the architecture rather than the person?
10. Does the decision maker understand what decision is actually required?

## 5.17 Communication Examples as a Recurring Pattern

Each major architecture chapter should later include a small **“How to Communicate This to the RD”** section.

For example:

**Technical:**

> “We need document-level ACL enforcement in the retrieval pipeline.”

**RD version:**

> “Without authorization at retrieval time, the AI could potentially retrieve information that the user is not entitled to see. I therefore consider retrieval-level access control a production requirement.”

## Field Rule

> **Good advisory communication does not eliminate disagreement. It makes disagreement useful.**

The advisor should be able to say:

> **“I agree.”**

> **“I agree, with conditions.”**

> **“I have a different second opinion.”**

> **“I dissent from the proposed technical approach.”**

> **“I don't know yet.”**

And in every case:

> **Evidence → reasoning → implication → recommendation.**
