# Chapter 38A — Due Diligence Advisor Review

> **ADVISOR LENS**
>
> Technical due diligence is an evidence exercise: determine what is true, what is merely claimed, what remains unknown, and what commitment follows if the organization proceeds.

## 1. Convert Claims Into Testable Propositions

Start with the proposal's important claims:

- performance;
- security;
- data handling;
- availability;
- interoperability;
- scalability;
- model capability;
- pricing;
- deployment options;
- support and lifecycle;
- contractual commitments.

Rewrite each as a proposition that can be verified.

```text
Vendor / Team Claim
        ↓
Precise Proposition
        ↓
Required Evidence
        ↓
Verification Method
        ↓
Finding
        ↓
Decision Consequence
```

## 2. Separate Evidence From Assertion

A vendor statement proves that the vendor makes the statement. It does not independently prove the underlying capability.

Use an evidence hierarchy appropriate to the claim:

1. contractual or regulatory evidence;
2. authoritative standards;
3. primary technical documentation;
4. directly measured representative workload results;
5. independent evaluation;
6. documented production evidence;
7. vendor assertion;
8. assumption.

Applicability matters more than a simplistic ranking. A benchmark on a different workload may be less useful than a smaller but representative test.

## 3. Investigate the Real Technology Boundary

Do not evaluate the marketing label.

Decompose the proposition into:

```text
Product
 ├── Model(s)
 ├── Runtime / Serving
 ├── Data services
 ├── Retrieval
 ├── Orchestration
 ├── Identity
 ├── Security controls
 ├── Integrations
 ├── Observability
 └── External dependencies
```

The organization may be committing to considerably more than the headline AI component.

## 4. Challenge Hidden Assumptions

Ask:

- What workload was used to demonstrate the claim?
- What scale was tested?
- Which version was tested?
- What data conditions were assumed?
- Which features are preview, optional, or contractual?
- Which dependencies are outside the supplier's control?
- What happens when the advertised capability changes?

The most important due-diligence finding is often not a failed capability but an assumption that nobody had previously made explicit.

## 5. Examine Commitment, Not Only Capability

A technically capable technology can still be a poor commitment.

Assess:

- switching cost;
- data portability;
- API dependence;
- proprietary formats;
- operational skill requirements;
- pricing exposure;
- minimum commitments;
- support dependency;
- model/provider changes;
- termination and exit conditions.

This connects due diligence with the vendor-dependency and exit analysis in Chapter 36.

## 6. Minimum Evidence Package

For a material AI technology decision, the advisor should normally seek enough evidence to establish:

- architecture boundary;
- security and data-handling model;
- representative performance;
- relevant model/system evaluation;
- operational dependencies;
- availability and recovery expectations;
- commercial assumptions;
- lifecycle and change policy;
- exit/reversibility conditions.

The exact package should scale with consequence and commitment.

## 7. Advisor Challenge Questions

- What exactly are we buying or adopting?
- Which claims materially affect the decision?
- What evidence supports each claim?
- Is that evidence independently verifiable?
- Does the evidence represent our workload?
- What assumptions are hidden inside the proposal?
- Which capabilities are contractual versus aspirational?
- What changes if the vendor changes the model or API?
- What becomes difficult to reverse after adoption?

## 8. Technical Position

Use a conclusion such as:

> **Due-diligence position:** The core technology proposition is [credible / partially verified / insufficiently verified]. The strongest evidence supports [X]. Material uncertainty remains around [Y]. The organization should [proceed / proceed conditionally / defer] until [specific evidence, contractual commitment, or test] is obtained.

## 9. What Would Change the Advisor's Mind?

Examples:

- representative testing materially changes performance or cost;
- contractual terms differ from technical assumptions;
- security controls cannot be independently verified;
- portability is materially weaker than claimed;
- a critical capability is not supported in the required deployment model.

> **Field rule:** Due diligence does not ask whether a vendor is good. It asks whether the specific technology proposition is sufficiently evidenced for the commitment being considered.