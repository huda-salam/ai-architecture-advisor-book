# 3. Relationship With CTO, Head of AI & Vendors

## 3.1 The Advisor as an Independent Technical Counterweight

The advisor should maintain constructive relationships with CTO / technology leadership, Head of AI, engineering teams, platform teams, vendors, system integrators and consultants.

The objective is not to compete for ownership.

> **Ensure that the RD receives an independent and technically defensible view before making an important technology decision.**

Disagreement is not a failure of collaboration. Unexamined agreement can be the greater failure.

## 3.2 Four Possible Positions

| Position | Meaning |
|---|---|
| **Support** | Proposal is technically sound. |
| **Support with conditions** | Proposal is sound if specified conditions are satisfied. |
| **Second opinion** | Proposal may be valid, but independent assessment reaches a different view. |
| **Dissent** | Material technical concerns remain and should be explicitly recorded. |

A dissent does not necessarily mean the other team is wrong. It can mean:

> **“Based on the available evidence and assumptions, I cannot independently support this conclusion.”**

## 3.3 Second Opinion as a Formal Advisory Output

A second opinion asks:

> **“If I were independently responsible for assessing this technical decision, would I reach the same conclusion?”**

Possible outcomes include:

- same conclusion;
- same objective but different implementation;
- different economic conclusion;
- different risk assessment;
- insufficient evidence to conclude.

## 3.4 Dissenting Opinion Framework

Use:

> **Position → Evidence → Reasoning → Impact → Alternative**

Example:

> **Position:** I do not recommend proceeding with the proposed self-hosted LLM architecture at this stage.
>
> **Evidence:** The current workload does not establish a requirement for dedicated model infrastructure, while the stated data-security requirement may be addressed through controlled data processing and enterprise model deployment.
>
> **Reasoning:** The proposal appears to treat data confidentiality as equivalent to model ownership.
>
> **Impact:** Self-hosting introduces additional GPU, MLOps, security and operational complexity.
>
> **Alternative:** Evaluate an enterprise-managed model with controlled data access as the baseline, while retaining self-hosting as an option if defined thresholds are reached.

## 3.5 Challenge the Assumption, Not the Person

```text
Proposal
 ├── Requirement
 ├── Constraint
 ├── Assumption
 ├── Architecture
 ├── Cost
 └── Risk
```

The advisor should identify which layer is actually wrong rather than attacking the proposer.

## 3.6 Never Argue From Authority

Avoid:

> “I have more architecture experience.”

Prefer:

> “What evidence supports this architecture?”

> “What alternatives were evaluated?”

> “What happens if this assumption is false?”

The advisor's authority should come from the quality of reasoning.

## 3.7 Vendor Claims Require Independent Verification

Claims such as “enterprise-grade security,” “zero data retention,” “fully private,” “highly scalable,” or “no vendor lock-in” must be translated into verifiable technical statements.

For example, “zero data retention” requires asking what is retained, for how long, where, in which logs, whether prompts and outputs are retained, whether backups are included, whether administrators can access them, and whether the control is contractual, technical, or both.

> **Vendor terminology is not architecture evidence.**

## 3.8 Three Layers of Vendor Assessment

### Vendor claim

> “Our platform is secure.”

### Technical evidence

Architecture documentation, controls, certifications, contractual terms, testing and independent assessments.

### Organizational conclusion

> “The controls are sufficient for our particular risk profile.”

These are different statements.

## 3.9 Ask “Compared With What?”

Every proposal should have a meaningful baseline.

- “Highly accurate” — compared with what?
- “Cheaper” — compared with what workload and deployment model?
- “Scalable” — to what throughput, concurrency and data volume?
- “Secure” — against what threat model?

> **“Compared with what?”** is one of the simplest and most powerful technical-review questions.

## 3.10 When to Escalate a Dissent

Escalate when disagreement involves material security exposure, major expenditure, strategic vendor lock-in, irreversible architecture, sensitive data movement, significant reliability risk, major scalability assumptions, consequential AI outputs, or unsupported claims that materially affect the decision.

Frame it factually:

> “There is a material technical disagreement between the proposed architecture and my independent assessment.”

Not politically:

> “The Head of AI and I disagree.”

## 3.11 Document Material Dissent

```text
Decision:
Recommended by:
Independent assessment:
Points of agreement:
Points of disagreement:
Evidence:
Assumptions:
Risks:
Alternative:
Final decision:
Decision owner:
What would change the assessment:
```

This creates institutional memory and protects the organization and the advisor.

## 3.12 Dissent Does Not Mean Veto

The normal sequence is:

```text
Technical proposal
      ↓
Independent review
      ↓
Agreement / Second opinion / Dissent
      ↓
Recommendation
      ↓
Authorized decision maker
      ↓
Decision
```

The advisor can recommend against an architecture without automatically being its final veto authority.

## 3.13 Healthy Friction

An effective technology organization should contain constructive friction between business ambition, technology feasibility, architecture constraints, security requirements and economic reality.

> **Challenge enough to improve the decision, but not so much that architecture review becomes bureaucracy.**

## 3.14 Field Rules

> **Your job is not to win the technical argument. Your job is to make sure the decision maker understands the technical argument.**

> **State disagreement clearly, support it with evidence, explain the consequences, provide an alternative, and allow the authorized decision maker to decide.**
