# Chapters 42–44 — Advisor Case Evidence Review

## Review Objective

Chapters 42–44 form the empirical layer of the handbook. Together they answer three complementary questions:

```text
42 — What worked?
        ↓
43 — What failed?
        ↓
44 — Where should ownership sit?
```

The objective is not to turn cases into recipes. It is to use cases to test architectural assumptions, boundary conditions, transferability, economics, and dependency.

## 1. Evidence Must Remain Conditional

A successful deployment establishes that an architecture worked under particular conditions.

A failed program establishes that a particular combination of assumptions, mechanisms, controls, and circumstances produced an undesirable outcome.

Neither automatically determines the architecture for another organization.

The canonical reasoning chain is:

```text
Case
 ↓
Evidence Class
 ↓
Observed Mechanism / Outcome
 ↓
Context
 ↓
Transferability
 ↓
Our Constraints
 ↓
Validation
 ↓
Technical Position
```

## 2. Chapters 42 and 43 Must Be Read Together

A success-only evidence base creates confirmation bias.

A failure-only evidence base creates excessive pessimism.

The advisor should deliberately pair them:

| Success evidence | Failure evidence | Advisor question |
|---|---|---|
| Deployment at scale | Failed scaling | What operational conditions matter? |
| Reported productivity | Economic failure | What is the complete cost boundary? |
| Strong model result | Data/model failure | What assumptions surround the model? |
| Enterprise adoption | User rejection | What workflow conditions determine value? |
| External provider success | Dependency/concentration risk | What dependency is acceptable? |

## 3. Chapter 44 Adds the Ownership Dimension

The third question is not simply whether AI works. It is:

> **Which layer should the organization own?**

The cases support a layered interpretation:

```text
Own application / workflow / data / controls
             │
             ├── Consume external model capability
             │
             └── Own model capability only when justified
```

This avoids the false binary of “buy AI” versus “build an LLM.”

## 4. Case Transferability Test

For every reference case, score or qualitatively assess:

1. problem similarity;
2. data similarity;
3. workload similarity;
4. risk similarity;
5. decision-authority similarity;
6. integration similarity;
7. operating-capability similarity;
8. economic similarity;
9. regulatory similarity;
10. reversibility similarity.

A case with low contextual similarity may still be useful for identifying mechanisms, but it should carry less weight in the final recommendation.

## 5. Evidence Quality Rule

Keep these statements distinct:

> “The organization reports that it deployed X.”

> “The organization reports outcome Y.”

> “Independent evidence corroborates Y.”

> “Architecture X is appropriate for us.”

Each statement requires a different evidentiary burden.

## 6. Red-Team Questions

When a reference architecture is presented, ask:

- What was hidden by the case-study narrative?
- What human work remained?
- What costs were excluded?
- What failed before production?
- What controls were required?
- What assumptions were customer-specific?
- What happens if the model changes?
- What happens if the provider disappears?
- What would make the architecture non-transferable?

When a failure case is presented, ask:

- Is the failure mechanism actually known?
- Is it independently corroborated?
- Does our architecture share the mechanism?
- Have controls changed since the case occurred?
- Are the consequences comparable?

## 7. Technical Position Template

A defensible conclusion should contain four elements:

```text
Evidence
  +
Contextual similarity
  +
Known differences / uncertainty
  +
Validation requirement
  ↓
Technical Position
```

Example:

> The reference cases establish that comparable organizations have deployed retrieval-based decision-support workflows using externally supplied model capability. They do not establish equivalent security, economics, or reliability in our environment. The architecture is therefore a credible candidate, subject to representative evaluation, dependency controls, and a bounded production-readiness gate.

## 8. What Would Change Our Mind?

The recommendation should move when:

- independent cases corroborate comparable outcomes;
- failure evidence reveals the same mechanism in our design;
- representative testing contradicts industry claims;
- provider dependency becomes materially less reversible;
- TCO changes materially;
- proprietary model capability demonstrates durable domain advantage;
- mandatory controls cannot be satisfied by the proposed ownership model.

## Final Verdict

Chapters 42–44 now provide the empirical counterpart to the technical and assurance chapters. Their highest value is not the list of organizations or products. It is the reasoning discipline they impose:

> **Study what worked. Study what failed. Identify what was actually owned. Then determine what, if anything, transfers to our architecture.**

This preserves the book's central principle: **evidence informs technical judgment; it does not replace it.**
