# Chapters 30–44 — Cross-Chapter Consistency & Evidence Review

> **Review purpose:** Verify that Chapters 30–44 use consistent architecture concepts, evidence categories, terminology, and decision logic, and that time-sensitive claims are treated as dated evidence rather than permanent facts.

**Review date:** 2026-09-14  
**Scope:** Chapters 30–44 and their evidence-review materials  
**Status:** Cross-chapter review completed; material evidence/citation correction identified in Chapter 44.

---

## 1. Executive Finding

Chapters 30–44 are **architecturally coherent overall**. The central decision logic is consistent:

```text
Task / Decision Requirement
        ↓
Representative Evaluation
        ↓
System-Level Evidence
        ↓
Economics / Risk / Reliability
        ↓
Dependency & Reversibility
        ↓
Architecture Decision
        ↓
Revalidation Trigger
```

The strongest recurring principles are also aligned:

- a model is not the whole AI system;
- benchmark capability is not production fitness;
- the source system remains authoritative;
- an LLM is not an authorization boundary;
- human decision authority remains explicit for consequential AI-IDSS decisions;
- cost should be measured at workload/use-case level rather than only token or infrastructure level;
- vendor dependency is acceptable when justified and controllable;
- self-hosting changes the dependency graph rather than eliminating dependency;
- portability is a means to optionality, not an objective in itself;
- industry cases demonstrate implementation under particular conditions, not universal optimality;
- evidence must be dated and revalidated when the technology or operating conditions change.

No fundamental architectural contradiction was found between Chapters 30–44.

However, one **material evidence hygiene defect** was found in Chapter 44: Section 44.10 contains internal web-tool citation markers (`turn0search6` and `turn0search8`) inside the book. These are not stable book citations and must be replaced with the corresponding BIS source links already used elsewhere in the chapter.

---

## 2. Terminology Consistency

### 2.1 Model capability → task performance → system performance → business/decision value

This hierarchy is now the preferred terminology for Chapters 30–44:

```text
Model Capability
       ↓
Task Performance
       ↓
System Performance
       ↓
Business / Decision Value
```

**Chapter 30** uses this as the model-selection hierarchy.  
**Chapter 31** should use it as the evaluation hierarchy.  
**Chapters 34–35** connect the final level to cost and optimization.  
**Chapters 36 and 44** add dependency and reversibility.

**Editorial rule:** Do not use “model quality” as an unqualified synonym for any of these four levels.

---

### 2.2 Cost terminology

Use the following hierarchy consistently:

| Term | Meaning |
|---|---|
| Cost per token | Provider/inference unit price or measured token cost |
| Cost per task | Cost of executing a defined evaluation/workload task |
| Cost per useful result | Total system cost divided by accepted/useful results under a defined acceptance rule |
| Business value | Economic or decision outcome attributable to the use case |
| TCO | Broader lifecycle cost including technical, operational, security, evaluation, and transition costs where material |

**Important:** “Cost per useful result” is not a universal accounting metric. It is a decision metric whose denominator must be explicitly defined and measured.

This is consistent with FinOps guidance, which recommends moving from technical unit metrics such as tokens toward use-case economics such as cost per assist, action, case, or other defined business outcome.

Source: https://www.finops.org/framework/capabilities/unit-economics/  
Source: https://www.finops.org/wg/finops-for-ai-tools-services-considerations/

---

### 2.3 Deployment terminology

The following four categories remain distinct:

1. application over third-party API;
2. enterprise-managed AI/model platform;
3. self-hosted open-weight model;
4. proprietary foundation-model development.

Do not collapse “enterprise-controlled AI” into “self-hosted.” Chapters 36 and 44 correctly distinguish organizational control of the enterprise boundary from ownership of model weights.

**Editorial refinement:** In future references, prefer **provider-owned proprietary foundation model** when the word “proprietary” could otherwise be interpreted as an internally owned model.

---

### 2.4 Ownership vs control

The preferred distinction is:

> **Ownership is not the same as control, and control is not binary.**

An organization can control identity, authorization, data, workflow, evaluation, audit, and decision policy while consuming externally supplied model capability.

Conversely, self-hosting model weights does not eliminate dependencies on hardware, runtimes, software ecosystems, engineering skills, or upstream model development.

This is consistent across Chapters 36 and 44.

---

## 3. Architecture Consistency

### 3.1 Source-of-record principle

The chapters consistently preserve the principle:

> **AI should not silently become the system of record.**

AI-generated conclusions, summaries, scores, and recommendations should remain distinguishable from authoritative source data and should retain sufficient provenance to support validation.

This remains compatible with Chapters 30–31: model evaluation measures the behavior of the AI system; it does not replace source-system authority.

---

### 3.2 Deterministic controls vs model judgment

The cross-chapter boundary is consistent:

```text
Policy / Authorization / Thresholds / Audit
                ↓
       Deterministic Controls
                ↓
        AI / Model Judgment
                ↓
     Validation / Human Decision
```

The model may interpret evidence or generate recommendations, but it should not become the sole enforcement point for identity, authorization, policy, or decision authority.

This aligns Chapters 20, 22, 28–31, 36, and 44.

---

### 3.3 Human decision boundary

The chapters remain consistent with the AI-IDSS principle:

> **AI recommends; authorized humans remain responsible for consequential decisions unless a separately justified automation boundary has been approved.**

Model-selection and evaluation chapters therefore correctly treat human review as part of system performance rather than as an afterthought.

---

### 3.4 Own-the-boundary pattern

The “own the boundary” pattern in Chapter 44 is compatible with Chapter 36’s vendor-neutral core:

```text
Enterprise-Controlled Boundary
--------------------------------
Identity
Authorization
Data authority
Business semantics
Evaluation
Audit
Workflow
Decision policy

Provider / Model Edge
--------------------------------
Inference capability
Managed model services
Specialized provider services
```

This should remain a **pattern to test**, not a universal reference architecture.

---

## 4. Model Selection ↔ Evaluation Consistency

Chapters 30 and 31 should be read together:

### Chapter 30 asks

> Which candidate is sufficiently capable and economically/operationally justified for this workload now?

### Chapter 31 asks

> What evidence is sufficient to establish that the candidate is fit for the intended purpose now?

Therefore:

> **Model selection is the decision; evaluation is the evidence-production mechanism supporting that decision.**

This avoids a common contradiction in technical writing where Chapter 30 appears to select a model from public rankings while Chapter 31 later says production evaluation is required.

Public benchmarks should remain candidate-screening evidence unless their task and conditions are demonstrably representative of the intended workload.

Artificial Analysis explicitly versions its composite Intelligence Index and notes that evaluation composition and methodology can change. Its current v4.3 release, dated September 7, 2026, also demonstrates why model rankings and cost comparisons must be treated as dated snapshots rather than permanent facts.

Sources:
- https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v4-3
- https://artificialanalysis.ai/data-api/docs
- https://artificialanalysis.ai/methodology

---

## 5. Benchmark Freshness

The book's preferred rule is:

> **A benchmark result without a clear model identifier, evaluation conditions, date, methodology, and interpretation context is weak evidence for a rapidly changing model market.**

Do not introduce a fixed “benchmark expiry” period. Instead classify evidence as:

- Current
- Aging
- Historical

Revalidation should be triggered by material changes such as:

- model/version change;
- benchmark methodology change;
- provider endpoint change;
- prompt/scaffolding change;
- retrieval or tool change;
- material workload change;
- material price change;
- security/contractual change;
- observed production degradation.

This is consistent with Chapters 30, 31, 34, 35, and 44.

---

## 6. Benchmark vs Production Evidence

The cross-chapter evidence ladder should be interpreted as:

```text
Public Benchmark
      ↓
Task-Specific Evaluation
      ↓
System Evaluation
      ↓
Production Observation
      ↓
Business / Decision Outcome
```

Higher levels do not make lower levels useless. They answer different questions.

A public benchmark can identify promising candidates. It cannot, by itself, establish that a complete AI-IDSS produces reliable investment recommendations.

NIST continues to emphasize that AI evaluation depends on the measurement target, assumptions, and representativeness of the evaluation data. NIST's AI RMF also remains a living framework and is currently being revised.

Sources:
- https://www.nist.gov/publications/expanding-ai-evaluation-toolbox-statistical-models
- https://www.nist.gov/itl/ai-risk-management-framework

---

## 7. Economics Consistency: Chapters 34–35

The economic logic is consistent:

```text
Provider Price
      ↓
Task Cost
      ↓
System Cost
      ↓
Cost per Useful Result
      ↓
Business / Decision Value
```

Do not let “lower model price” become synonymous with “lower TCO” or “better economics.”

Chapter 34 should remain the broad TCO/economics chapter. Chapter 35 should remain the optimization chapter. Chapter 30 should reference cost per useful result as a selection metric, but should not duplicate the full TCO framework.

FinOps guidance supports this distinction by separating resource-efficiency metrics from business-unit metrics and recommending use-case economics for AI.

Sources:
- https://www.finops.org/framework/capabilities/unit-economics/
- https://www.finops.org/wg/finops-for-ai-tools-services-considerations/
- https://www.finops.org/insights/informing-ai-model-selection/

---

## 8. Cost Optimization vs Reliability / Quality

No contradiction was found between Chapters 31 and 35.

The preferred optimization objective is:

> **Meet the required quality, evidence, security, reliability, and performance objectives at the lowest justified total resource cost.**

Therefore a cheaper model is not automatically an optimization if it increases:

- critical errors;
- human review;
- retries;
- latency;
- retrieval failures;
- security controls;
- operational complexity;
- decision risk.

Likewise, a more expensive model is not automatically safer or more valuable.

---

## 9. Vendor Dependency ↔ Model Selection ↔ Ownership

Chapters 30, 36, and 44 now form a coherent three-part decision chain:

### Chapter 30
Choose the candidate that satisfies the workload and constraints.

### Chapter 36
Determine whether the resulting dependency is acceptable and reversible enough.

### Chapter 44
Determine whether the organization should own the model capability itself or consume it from the market.

This prevents “vendor lock-in” from becoming a reason to build everything internally.

The correct decision is:

> **Accept, constrain, diversify, or replace the dependency according to its strategic and operational significance.**

---

## 10. Third-Party Dependency Evidence

Financial-sector supervisory evidence should remain distinct from vendor claims.

BIS has identified third-party dependencies, concentration, data, privacy, security, and operational-resilience considerations as material issues for AI in financial services.

Relevant sources:
- https://www.bis.org/publications/fsi-insight-73-data-we-trust-emerging-policy-and-supervisory-approaches-ai-data-use-financial-services
- https://www.bis.org/publications/fsi-summary-financial-stability-implications-artificial-intelligence-executive-summary
- https://www.bis.org/publications/fsi-paper-28-when-machines-attack-frontier-ai-cyber-threats-and-policy-responses-financial-sector

**Editorial rule:** Never use a vendor product page as if it were supervisory evidence. Label vendor-reported implementation evidence explicitly.

---

## 11. Chapter 42 ↔ Chapter 43 ↔ Chapter 44

These chapters now form an important evidence triangle:

| Chapter | Evidence purpose |
|---|---|
| 42 Successful Enterprise AI Architectures | What has been implemented and reported as working |
| 43 Failed AI Programs | What failed, under what conditions, and which assumptions broke |
| 44 Third-Party vs Proprietary Cases | Where organizations placed the ownership/control boundary |

The correct synthesis is not:

> Success cases prove the architecture is correct.

Nor:

> Failure cases prove the architecture is wrong.

Instead:

> **Success demonstrates feasibility under particular conditions; failure reveals boundary conditions, unrecognized dependencies, inadequate controls, or incorrect assumptions.**

This is consistent with the book's evidence standard.

---

## 12. Industry Evidence Classification

Use these labels consistently:

### Vendor-reported industry evidence
Claims published by a technology vendor about a customer or product.

Useful for architecture patterns and documented implementations, but subject to vendor-selection and reporting bias.

### Corporate disclosure
Evidence reported directly by the implementing organization, including annual reports, investor materials, official technology publications, or regulatory filings.

### Independent reporting
Evidence reported by independent journalism or research organizations.

### Supervisory / regulatory evidence
Evidence from regulators, supervisors, government agencies, or multilateral institutions.

### Academic / research evidence
Peer-reviewed or research publications with documented methodology.

Do not collapse these into a generic “industry evidence” label when the source type materially affects evidentiary strength.

---

## 13. Material Citation Hygiene Finding — Chapter 44

**Finding:** Section 44.10 of Chapter 44 contains internal web-tool citation markers:

```text
citeturn0search6turn0search8
```

These are not stable book references and should not appear in committed Markdown content.

**Required correction:** Replace them with the stable BIS URLs already used elsewhere in Chapter 44:

- BIS FSI Insight 73 — AI data use in financial services:
  https://www.bis.org/publications/fsi-insight-73-data-we-trust-emerging-policy-and-supervisory-approaches-ai-data-use-financial-services
- BIS financial stability implications of AI:
  https://www.bis.org/publications/fsi-summary-financial-stability-implications-artificial-intelligence-executive-summary

The wording should also preserve the evidence classification as **supervisory evidence**, not independent benchmark evidence.

**Severity:** Material editorial/evidence-hygiene defect; no underlying architectural conclusion needs to change.

---

## 14. Current NIST Status

The book should continue to distinguish final standards/frameworks from drafts and revisions.

As of September 2026:

- NIST AI RMF 1.0 remains the published framework, but NIST states that it is being revised.
- The Generative AI Profile remains an available NIST publication.
- New profiles and evaluation resources should not be described as final standards unless NIST explicitly identifies them as final.

Source: https://www.nist.gov/itl/ai-risk-management-framework

**Editorial rule:** Where a NIST resource is a concept note, initial public draft, or revision in progress, state that status explicitly.

---

## 15. Current Model-Market Evidence

The book should avoid permanent claims such as:

- “Model X is the best.”
- “Open models are now equivalent to closed models.”
- “Provider X is cheapest.”
- “Model Y has the strongest reasoning.”

Instead use dated, conditional language:

> On the specified workload, evaluation date, model version, provider endpoint, and measurement methodology, candidate X produced the measured result described here.

Artificial Analysis' September 7, 2026 v4.3 release demonstrates active methodology and model changes, including new agentic evaluations and private test sets. This is strong evidence for the book's principle that benchmark comparisons must be versioned and time-stamped, not embedded as timeless rankings.

Source: https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v4-3

---

## 16. Cross-Chapter Decision Logic

The following should be treated as the canonical decision chain for Chapters 30–44:

```text
1. Define the decision / workload
          ↓
2. Define hard constraints
          ↓
3. Define measurable quality and reliability requirements
          ↓
4. Identify credible technology/model alternatives
          ↓
5. Evaluate representative tasks
          ↓
6. Evaluate the complete system
          ↓
7. Measure cost and useful-result economics
          ↓
8. Assess security, data boundary and operational responsibility
          ↓
9. Map vendor / ecosystem dependencies
          ↓
10. Assess reversibility and exit capability
          ↓
11. Assess industry and failure evidence
          ↓
12. Recommend the least unjustified architecture
          ↓
13. Define revalidation triggers
```

This is the strongest common architecture-review spine across Chapters 30–44.

---

## 17. What the Advisor Should Challenge

When a proposal reaches the Regional Director, the advisor should be able to ask:

1. **What exact task are we optimizing?**
2. **What evidence says the candidate works on that task?**
3. **Is the evidence benchmark, task-specific, system-level, or production evidence?**
4. **What is the failure distribution, not merely the average score?**
5. **What does one useful accepted result cost?**
6. **What data crosses which trust boundary?**
7. **Who enforces authorization?**
8. **What happens if the provider fails or changes the model?**
9. **How reversible is the architecture?**
10. **What does self-hosting actually remove, and what dependencies does it create?**
11. **What part of the architecture is the strategic moat?**
12. **What evidence would change our recommendation?**
13. **When must the decision be revalidated?**

---

## 18. Final Cross-Chapter Field Rule

> **Do not choose technology from a benchmark, choose architecture from a decision requirement; do not justify architecture from a vendor claim, justify it from converging evidence; and do not treat today's model, price, or provider boundary as permanent.**

The durable advisor capability is not knowing which model wins today. It is knowing **how to determine whether today's architecture remains justified tomorrow**.
