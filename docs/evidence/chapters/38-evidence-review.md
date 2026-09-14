# Evidence Review — Chapter 38: Technical Due Diligence

## Review Objective

Chapter 38 translates established AI risk-management, evaluation, and supplier-risk principles into a practical technical due-diligence method. The chapter must distinguish formal guidance from advisor heuristics.

---

## 1. AI Acquisition Is Within AI Risk Management

**Classification:** Fact / framework evidence.

NIST AI RMF states that its Govern function covers organizations designing, developing, deploying, evaluating, or acquiring AI systems. Govern 6 specifically addresses AI risks and benefits arising from third-party software, data, and other supply-chain issues.

NIST also identifies procurement as an AI actor task and third-party entities as providers of models, algorithms, data, systems, and related services.

**Primary evidence:**
- NIST AI RMF Core: https://airc.nist.gov/airmf-resources/airmf/5-sec-core/
- NIST AI Actor Tasks: https://airc.nist.gov/airmf-resources/airmf/appendices/app-a-descriptions-of-ai-actor-tasks/

**Conclusion:** Technical due diligence before material AI acquisition is consistent with the framework's intended scope.

---

## 2. NIST GenAI Profile Supports Procurement Due Diligence

**Classification:** Fact / technical guidance.

The NIST Generative AI Profile discusses third-party GAI considerations and identifies possible controls including acquisition/procurement due diligence, software bills of materials, SLAs, and relevant attestation reports. It also recommends iterative pre-deployment testing and documentation.

**Primary evidence:**
- NIST AI 600-1, Generative AI Profile: https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf

**Conclusion:** The chapter's inclusion of procurement, technical transparency, testing, and contractual evidence is directly grounded in NIST guidance.

---

## 3. Supplier Due Diligence Is an Established Supply-Chain Practice

**Classification:** Fact / industry-government guidance.

NIST's finalized July 2026 C-SCRM Due Diligence Assessment Quick-Start Guide describes supplier due diligence as reasonable research and investigative rigor before procurement decisions are executed. It is based on NIST SP 800-161r1 content.

**Primary evidence:**
- NIST, July 8, 2026: https://www.nist.gov/news-events/news/2026/07/nist-releases-finalized-c-scrm-due-diligence-assessment-quick-start-guide

**Conclusion:** The chapter's claim that supplier due diligence is more than collecting a questionnaire is well supported.

---

## 4. Evaluation Must Be Context-Specific

**Classification:** Fact / framework evidence.

NIST AI RMF Measure states that the purpose, audience, and evaluation needs influence which AI risks and trustworthiness characteristics should be measured. It also calls for testing procedures and metrics that demonstrate whether the system is fit for purpose and functioning as claimed.

Current NIST TEVV work similarly describes evaluation methods as varying across AI applications and use cases.

**Primary evidence:**
- NIST AI RMF Measure: https://airc.nist.gov/airmf-resources/playbook/measure/
- NIST TEVV-Athlon Framework: https://www.nist.gov/artificial-intelligence/ai-research/tevv-athlon-framework-evaluating-ai-systems

**Conclusion:** The chapter's insistence on representative workloads rather than generic benchmarks is justified.

---

## 5. Benchmark Results Are Not Sufficient Evidence of Suitability

**Classification:** Inference grounded in evaluation principles.

A benchmark measures a defined task under defined conditions. Suitability for a particular production workload requires evidence that is relevant to that workload.

The chapter therefore asks about test data, metrics, representativeness, leakage/contamination, production differences, and reproducibility.

This is a reasoned architecture conclusion, not a claim that benchmarks are useless.

---

## 6. Security Evidence Must Match the Actual Boundary

**Classification:** Architecture recommendation.

Security reports and certifications can provide useful evidence, but their scope must be mapped to the actual architecture being acquired or deployed.

NIST AI RMF encourages organizations to address third-party AI risks and to consider documentation, testing, security audits, and third-party transparency.

**Primary evidence:**
- NIST AI RMF Core: https://airc.nist.gov/airmf-resources/airmf/5-sec-core/
- NIST AI RMF Measure: https://airc.nist.gov/airmf-resources/playbook/measure/

**Conclusion:** The chapter correctly avoids treating a certification as proof that the complete proposed architecture is secure.

---

## 7. Third-Party AI Requires Explicit Transparency Questions

**Classification:** Fact / guidance.

NIST AI RMF Playbook Govern suggests policies addressing transparency into third-party system functions, testing of third-party AI systems, and requirements for clear usage instructions and limitations.

**Primary evidence:**
- NIST AI RMF Playbook — Govern: https://airc.nist.gov/airmf-resources/playbook/govern/

**Conclusion:** Questions about model limitations, training/inference characteristics, assumptions, and documentation are evidence-oriented rather than arbitrary procurement demands.

---

## 8. AI Management Systems Include Third-Party AI Use

**Classification:** Fact.

ISO/IEC 42001:2023 specifies requirements for an AI management system and ISO's current explanatory material states that the standard applies to organizations that manage AI systems provided by third parties.

**Primary evidence:**
- ISO/IEC 42001:2023: https://www.iso.org/standard/42001
- ISO/IEC 42001 explained: https://www.iso.org/home/insights-news/resources/iso-42001-explained-what-it-is.html

**Conclusion:** This supports the chapter's framing of vendor-provided AI as part of the organization's governance responsibility. It does not dictate a particular technical due-diligence checklist.

---

## 9. Due Diligence Is Not a Guarantee

**Classification:** Recommendation / epistemic principle.

No framework establishes that due diligence proves an AI system will never fail.

The chapter therefore deliberately describes due diligence as reducing decision uncertainty rather than proving perfection.

This distinction is important because NIST AI RMF is intended to help manage risks, not to certify that an AI system is risk-free.

**Primary evidence:**
- NIST AI RMF FAQ: https://www.nist.gov/itl/ai-risk-management-framework/ai-risk-management-framework-faqs
- NIST AI RMF 1.0: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10

---

## 10. Evidence Hierarchy Is an Advisor Heuristic

**Classification:** Recommendation.

The chapter provides a practical hierarchy from representative reproducible tests through independent evidence, production telemetry, documentation, references, benchmarks, demonstrations, and marketing claims.

This is not a formal NIST or ISO hierarchy.

The appropriate strength of evidence depends on the claim. For example, vendor documentation may be strong evidence for a documented API feature, while it is weak evidence for an organization's expected production reliability.

The distinction should remain explicit.

---

## 11. Proof-of-Concept vs Production Evidence

**Classification:** Architectural inference.

A proof-of-concept can establish feasibility. It does not automatically establish production readiness.

The chapter's progression from feasibility toward representative workload testing, security validation, operational testing, cost analysis, and exit planning is consistent with the broader NIST TEVV and AI RMF lifecycle orientation.

**Evidence:**
- NIST AI RMF FAQ: https://www.nist.gov/itl/ai-risk-management-framework/ai-risk-management-framework-faqs
- NIST AI RMF Measure: https://airc.nist.gov/airmf-resources/playbook/measure/
- NIST TEVV-Athlon: https://www.nist.gov/artificial-intelligence/ai-research/tevv-athlon-framework-evaluating-ai-systems

---

## 12. Current Status of NIST AI RMF

**Classification:** Current fact.

NIST states that AI RMF 1.0 is being revised. The existing AI RMF 1.0 remains the published framework, while the Playbook is based on that version and is expected to be updated after the revision.

**Primary evidence:**
- NIST AI RMF page: https://www.nist.gov/itl/ai-risk-management-framework
- NIST AIRC: https://airc.nist.gov/

**Editorial requirement:** Do not describe AI RMF 1.0 as the newest immutable final framework. State its revision status when that status materially affects the discussion.

---

## 13. Deliberate Non-Claims

Chapter 38 should not imply that:

- every AI purchase requires the same due-diligence depth;
- a vendor questionnaire is always useless;
- certifications are useless;
- independent testing is always feasible before purchase;
- every benchmark is misleading;
- every vendor must disclose proprietary model internals;
- NIST AI RMF is mandatory for all organizations;
- due diligence eliminates technical risk;
- a successful proof-of-concept guarantees production readiness;
- a security certification covers the entire proposed architecture;
- every high-criticality AI system requires identical controls.

These exclusions preserve proportionality and evidence discipline.

---

## 14. AI-IDSS-Specific Evidence Standard

For a consequential investment decision-support system, a reasonable evidence package should connect:

```text
Claim
 ↓
Evidence
 ↓
Test / Verification
 ↓
Observed Result
 ↓
Residual Uncertainty
 ↓
Architecture Decision
```

Examples:

| Claim | Stronger evidence |
|---|---|
| model is sufficiently accurate | representative evaluation set |
| data remains controlled | technical data-flow + contract + verification |
| authorization is enforced | architecture + access-control test |
| provider is reliable enough | SLA + incident/reliability evidence + architecture fallback |
| exit is feasible | export/substitution test |
| cost is acceptable | workload-based TCO model |

This is an advisor framework, not a universal compliance standard.

---

## 15. Adversarial Review

### Challenge A — “Why not trust the vendor's SOC report?”

Because the report may be useful evidence for defined controls but does not automatically establish that the organization's complete architecture, configuration, integrations, or intended use are covered.

### Challenge B — “Why not just run a proof-of-concept?”

Because feasibility is not the same as production suitability, security, reliability, economics, or reversibility.

### Challenge C — “Why demand representative tests before selecting the vendor?”

The requirement should be proportional. For high-consequence decisions, representative evidence can materially reduce selection risk. For low-risk tools, lighter evidence may be appropriate.

### Challenge D — “Why not collect every document?”

Because document volume is not evidence quality. The investigation should be driven by claims material to the decision.

---

## 16. Advisor Decision Rule

Before recommending a material AI technology commitment, the advisor should be able to state:

> **What we know, how we know it, what we do not know, why the uncertainty matters, what would resolve it, and what happens if the assumption proves false.**

If that statement cannot be made, the due-diligence process is incomplete for the relevant decision.

---

## 17. What Would Change Our Mind?

The recommendation should change when credible evidence changes the decision-relevant facts, including:

- representative testing results;
- security assessment findings;
- contractual protections;
- production reliability evidence;
- material pricing changes;
- provider architecture changes;
- new regulatory requirements;
- successful or failed migration tests;
- evidence that an assumed failure mode is less or more severe than expected.

The objective is not to defend an initial recommendation. It is to improve the quality of the decision as evidence changes.

---

## Bottom Line

> **Technical due diligence is disciplined uncertainty reduction. The advisor should investigate the claims that matter, demand evidence proportional to consequence, expose assumptions and evidence gaps, and translate the remaining uncertainty into an explicit architecture recommendation and decision boundary.**
