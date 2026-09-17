# Chapters 0–46 — Advisor Case Navigator Stress Test

## Purpose

This review stress-tests the Advisor Case & Question Navigator against representative real-world advisory situations. The objective is not to judge whether every case has a perfect answer. It is to determine whether a reader can enter from a practical question, identify the right investigation path, reach the required technical depth, and continue toward a defensible technical position.

## Review Principle

The navigator is successful when it reduces search time without reducing reasoning quality.

The test therefore measures:

- case recognition;
- question quality;
- evidence direction;
- technical chapter coverage;
- failure/trade-off visibility;
- ability to reach a technical position;
- absence of misleading shortcuts.

---

## Test Set

| # | Advisory situation | Entry point | Required reasoning path | Coverage |
|---|---|---|---|---|
| 1 | Business unit proposes AI because competitors use it | AI proposal | suitability → alternative → value → evidence | Covered by Case 1 |
| 2 | Team requests a general-purpose LLM without a defined task | LLM proposal | problem → task → capability → system responsibility | Covered by Case 2 |
| 3 | Team proposes RAG for an internal knowledge system | RAG proposal | authority → retrieval → authorization → evaluation | Covered by Case 3 |
| 4 | Team proposes an autonomous agent for back-office work | Agent proposal | workflow alternative → tools → authorization → failure containment | Covered by Case 4 |
| 5 | Vendor presents a 95% benchmark | Vendor claim | metric → dataset → baseline → error → transferability | Covered by Case 5 |
| 6 | Architecture review finds unclear trust boundaries | Architecture review | requirements → boundaries → controls → failure → dependency | Covered by Case 6 |
| 7 | Security team asks whether the AI system is secure | Security review | threat → control → responsibility → evidence | Covered by Case 7 |
| 8 | Product team claims the system can handle peak traffic | Performance claim | workload → SLO → capacity → measurement → cost | Covered by Case 8 |
| 9 | CTO debates cloud versus self-hosting | Deployment choice | controls → responsibility → threat model → TCO | Covered by Case 9 |
| 10 | Finance asks why AI cost is higher than expected | Economics | workload → TCO → unit economics → optimization | Covered by Case 10 |
| 11 | Project asks for production approval | Production gate | evaluation → risk → architecture → readiness → audit | Covered by Case 11 |
| 12 | Procurement asks whether a vendor can be replaced later | Dependency | dependency → portability → exit → economics | Covered by Case 12 |
| 13 | AI recommends an action affecting an important business decision | Decision boundary | authority → evidence → human boundary → audit | Covered by Case 13 |
| 14 | Advisor receives a proposal with insufficient evidence | Evidence gap | unknown → assumption → test → evidence → position | Covered by Case 14 |
| 15 | Vendor says API compatibility guarantees multi-vendor portability | Red flag | interface compatibility → hidden dependencies → migration test | Red-Flag Index |
| 16 | Team says fine-tuning is necessary because prompts are not enough | Technology choice | task failure → data → RAG/prompting/fine-tuning alternatives → evaluation | Covered by Case 15 |
| 17 | Model quality is good but production latency is unacceptable | Cross-domain failure | quality → workload → serving → capacity → cost → business impact | Partial; use Chapters 16, 17, 31, 35 |
| 18 | AI output is plausible but source evidence is weak | Evidence failure | provenance → retrieval → evidence → uncertainty → human boundary | Covered across 10, 28, 29, 41 |
| 19 | AI system works in pilot but fails after organizational scale-up | Scale transition | workload change → data → operations → reliability → governance → TCO | Partial; use Chapters 16–18, 33–41 |
| 20 | Executive asks “Should we build our own foundation model?” | Strategic technology choice | business need → control boundary → alternatives → economics → dependency → evidence | Covered across 5A, 6A, 30, 34, 36, 44 |
| 21 | AI system is already in production and a material failure is reported | Incident | containment → failure classification → evidence reconstruction → control gap → remediation → revalidation | Covered by Case 16 |

---

## Findings

### Finding 1 — Core advisory entry cases are covered

The primary navigator cases cover the most common decision entry points: AI necessity, LLM selection, RAG, agents, vendor claims, architecture, security, performance, deployment, economics, production, dependency, consequential decisions, evidence gaps, intervention selection, and production incidents.

**Status: PASS**

### Finding 2 — Cross-domain cases require explicit chaining

Some of the hardest advisory questions do not belong to one chapter. Examples include good model quality combined with unacceptable latency, pilot success followed by operational failure, or weak evidence combined with consequential use.

The navigator should therefore permit a case to branch across multiple domains rather than forcing a single chapter answer.

**Status: PASS WITH HARDENING**

### Finding 3 — Technology-method selection now has an explicit entry point

Fine-tuning vs RAG vs prompting is covered deeply in Chapter 32 and is now directly reachable from Case 15. The navigator frames the decision as an intervention problem rather than assuming that the requested technology is the answer.

Required path:

```text
Observed task failure
      ↓
Failure classification
      ↓
Prompt / workflow / retrieval / data / model limitation
      ↓
Candidate intervention
      ↓
Evaluation
      ↓
Lifecycle / cost / dependency
```

**Status: PASS**

### Finding 4 — Production failures now have a post-incident entry point

Case 16 distinguishes incident investigation from production approval. The advisor moves from observed symptom to containment, failure classification, evidence reconstruction, control gap, remediation, and revalidation.

Suggested path:

```text
Observed incident
      ↓
Containment
      ↓
Failure classification
      ↓
Evidence reconstruction
      ↓
Control / design gap
      ↓
Remediation
      ↓
Revalidation
```

**Status: PASS**

### Finding 5 — Decision stage is explicit but intentionally lightweight

The navigator now uses a small set of stage labels:

- Exploring
- Selecting
- Architecture approval
- Piloting
- Production approval
- Operating
- Incident
- Replacement / Exit

The stage is a routing aid. It is not a scoring mechanism and does not determine the recommendation.

**Status: PASS**

### Finding 6 — Navigator must not become a second book

The stress test confirms that the navigator should remain concise. Technical mechanisms, evidence analysis, trade-offs, and detailed reasoning belong in canonical chapters.

The navigator should contain enough information to answer:

> **“Where do I go next, and what should I ask when I get there?”**

It should not attempt to answer every technical question itself.

**Status: PASS**

---

## Coverage Model

The stress test indicates that practical advisory entry points can be grouped into seven reusable families:

```text
1. Suitability
   “Should we use AI?”

2. Architecture
   “How should the system be shaped?”

3. Technology
   “Which technical approach is appropriate?”

4. Evidence
   “Can we trust this claim or result?”

5. Assurance
   “Is it secure, reliable, auditable, and production-ready?”

6. Economics / Dependency
   “Is the lifecycle cost and dependency acceptable?”

7. Incident / Change
   “Something changed or failed. What do we investigate?”
```

All seven families now have explicit representation in the navigator. Cross-domain cases remain intentionally supported through multi-chapter branching rather than case proliferation.

## Acceptance Criteria

The Navigator is considered fit for the current release when:

- a reader can enter from a practical advisory situation;
- the first questions expose the key decision assumptions;
- the navigator identifies the evidence that matters;
- the linked chapters contain the required technical depth;
- red flags point toward meaningful investigation rather than slogans;
- cross-domain cases can branch to more than one chapter;
- decision stage can be identified without adding a complex taxonomy;
- the navigator does not replace technical reasoning;
- canonical knowledge remains in the chapters;
- links resolve successfully in the documentation build.

## Future Hardening Queue

The major gaps identified by this stress test are now addressed. Remaining maintenance items are intentionally lightweight:

1. consider an evidence-strength tag for urgent cases;
2. add direct section-level anchors only where they materially reduce search time;
3. periodically retest the navigator against new advisory cases;
4. review stage labels when the advisory operating model evolves.

These are maintenance items, not evidence of a fundamental design gap.

## Field Rule

> **A good case navigator should tell the advisor where to investigate next without pretending that navigation itself is judgment.**
