# Evidence Review — Chapter 40: Production Readiness

## Review Objective

Chapter 40 defines production readiness as an evidence-based operational decision rather than a claim that development is complete. It distinguishes authoritative lifecycle guidance from advisor heuristics.

---

## 1. Production Is Part of the System Life Cycle

**Classification:** Fact / engineering evidence.

NIST SP 800-160 Vol. 1 Rev. 1 describes a systems-engineering basis applicable across system life-cycle stages and includes implementation, integration, verification, transition, validation, operation, maintenance, and disposal.

**Primary evidence:**
- NIST SP 800-160 Rev. 1: https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final

**Conclusion:** The chapter's treatment of production as a life-cycle engineering stage is well grounded.

---

## 2. Post-Deployment Monitoring Is Explicitly Addressed by NIST AI RMF

**Classification:** Fact / framework evidence.

NIST AI RMF Core includes ongoing monitoring and periodic review. Manage 4.1 calls for post-deployment monitoring plans covering user input, appeal and override, decommissioning, incident response, recovery, and change management. Manage 4.3 addresses incident and error communication, response, and recovery.

**Primary evidence:**
- NIST AI RMF Core: https://airc.nist.gov/airmf-resources/airmf/5-sec-core/
- NIST AI RMF Manage: https://airc.nist.gov/airmf-resources/playbook/manage/

**Conclusion:** The chapter's requirement for post-production monitoring and response is directly supported.

---

## 3. Production Monitoring Methods Are Still Evolving

**Classification:** Current fact.

NIST AI 800-4, published in March 2026, states that post-deployment monitoring is important for validating real-world behavior and identifying unexpected outputs and consequences, while noting that monitoring methods, validated methodologies, and common terminology remain nascent and fragmented.

**Primary evidence:**
- NIST AI 800-4: https://www.nist.gov/publications/challenges-monitoring-deployed-ai-systems-center-ai-standards-and-innovation

**Conclusion:** The chapter deliberately avoids prescribing one universal monitoring metric or cadence.

---

## 4. Production Readiness Is Broader Than Model Quality

**Classification:** Inference grounded in systems engineering and AI risk management.

Production behavior depends on architecture, configuration, data, integrations, identity, security, operations, dependencies, and human use—not only model quality.

NIST SP 800-160's systems perspective and NIST AI RMF's lifecycle/risk perspective support this broader system boundary.

**Conclusion:** “Production readiness applies to the system, not just the model” is an architecture conclusion, not a direct quotation.

---

## 5. Requirements Should Be Linked to Evidence

**Classification:** Engineering recommendation.

The chapter requires material production requirements to have corresponding evidence. This follows from verification and validation principles in systems engineering and from NIST AI RMF's emphasis on measurement and evaluation.

The exact readiness matrix is an advisor artifact, not a formal NIST template.

---

## 6. Configuration Can Affect Readiness

**Classification:** Engineering inference.

Changes to model versions, retrieval configuration, permissions, data, infrastructure, prompts, or provider settings can change system behavior. Therefore, readiness evidence should be interpreted in relation to the configuration under authorization.

NIST SP 800-160 explicitly includes configuration/implementation/integration/verification/transition/validation/operation/maintenance within its engineering life-cycle framing.

**Primary evidence:**
- NIST SP 800-160 Rev. 1: https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final

---

## 7. AI Monitoring Should Be Compared With Pre-Deployment Evidence

**Classification:** Fact / framework evidence.

NIST AI RMF Measure 2.4 states that functionality and behavior should be monitored in production and suggests comparing production metrics with those collected during pre-deployment testing.

**Primary evidence:**
- NIST AI RMF Measure: https://airc.nist.gov/airmf-resources/playbook/measure/

**Conclusion:** Chapter 40's recommendation to connect production observations to evaluation baselines is directly supported.

---

## 8. Third-Party AI Resources Require Ongoing Attention

**Classification:** Fact / framework evidence.

NIST AI RMF Manage 3 addresses risks and benefits from third-party entities and states that pretrained models used in development should be monitored as part of regular monitoring and maintenance.

**Primary evidence:**
- NIST AI RMF Core: https://airc.nist.gov/airmf-resources/airmf/5-sec-core/

**Conclusion:** The chapter's treatment of provider/model changes as production-readiness concerns is supported.

---

## 9. Recovery, Override, Change, and Decommissioning Are Part of Post-Deployment Risk Management

**Classification:** Fact / framework evidence.

NIST AI RMF Manage 4.1 explicitly includes appeal and override, decommissioning, incident response, recovery, and change management within post-deployment monitoring plans. The Playbook also discusses bypass/deactivation, recovery, root-cause analysis, and safe decommissioning.

**Primary evidence:**
- NIST AI RMF Core: https://airc.nist.gov/airmf-resources/airmf/5-sec-core/
- NIST AI RMF Manage: https://airc.nist.gov/airmf-resources/playbook/manage/

**Conclusion:** The chapter's readiness checklist appropriately includes recovery and disable/decommission capabilities.

---

## 10. AI Management Systems Support Continual Improvement

**Classification:** Fact.

ISO/IEC 42001:2023 specifies requirements for establishing, implementing, maintaining, and continually improving an AI management system. ISO describes it as applying to organizations that develop, provide, or use AI systems.

**Primary evidence:**
- ISO/IEC 42001:2023: https://www.iso.org/standard/42001

**Conclusion:** The chapter's framing of production approval as the start of ongoing oversight is consistent with a broader AI management-system lifecycle.

---

## 11. Production Readiness Is Not a Universal Standardized Score

**Classification:** Recommendation / non-claim.

No cited authority establishes the chapter's Green / Amber / Red scorecard or Proceed / Conditional / Pilot / Reject categories as universal standards.

They are intentionally presented as advisor communication conventions.

---

## 12. Monitoring Cadence Must Be Context-Dependent

**Classification:** Current evidence / recommendation.

NIST AI 800-4 identifies the appropriate monitoring cadence as an open question and discusses risk-level and use-case tailoring as areas requiring further work.

**Primary evidence:**
- NIST AI 800-4: https://www.nist.gov/publications/challenges-monitoring-deployed-ai-systems-center-ai-standards-and-innovation

**Conclusion:** The chapter must not invent a universal daily, weekly, or monthly monitoring cadence.

---

## 13. Human Oversight for AI-IDSS Is an Advisor Recommendation

**Classification:** Recommendation.

The field rule “AI recommends. Authorized humans decide.” is a design principle for the book's consequential AI-IDSS scenario. It is not presented as a universal requirement for all AI applications.

The chapter uses it to preserve an explicit decision boundary between analytical support and organizational authority.

---

## 14. Rollback Does Not Necessarily Restore Semantic State

**Classification:** Architectural inference.

Restoring application binaries does not necessarily restore changed source data, indexes, external provider behavior, policies, or already-executed actions. Therefore, AI production recovery should consider system state and decision semantics, not only software artifacts.

This is a reasoned architecture conclusion, not a claim that conventional rollback is ineffective.

---

## 15. Deliberate Non-Claims

Chapter 40 should not imply that:

- every AI system needs the same production-readiness threshold;
- every production deployment requires staging in exactly the same form;
- every AI system requires human approval;
- one monitoring metric captures AI health;
- one monitoring cadence is universally correct;
- a green score proves readiness;
- a security approval proves production readiness;
- a successful pilot guarantees production readiness;
- rollback always restores prior system state;
- every model change requires the same level of re-evaluation;
- ISO/IEC 42001 is mandatory for every organization;
- NIST AI RMF is mandatory for every organization.

---

## 16. AI-IDSS Evidence Standard

For a consequential AI-IDSS, the readiness chain should be:

```text
Authorized Use
 ↓
Requirements
 ↓
Production Configuration
 ↓
Verification / Validation
 ↓
Observed Results
 ↓
Monitoring & Response
 ↓
Residual Uncertainty
 ↓
Explicit Production Decision
```

Example:

| Claim | Stronger evidence |
|---|---|
| authorized data is enforced | production-like authorization test |
| risk alert is sufficiently reliable | representative evaluation + production monitoring |
| provider outage is safe | failure and degraded-state test |
| system can be recovered | demonstrated restore/recovery test |
| cost is acceptable | workload-based production TCO |
| model change is controlled | change trigger + re-evaluation evidence |

This is an advisor framework, not a compliance standard.

---

## 17. Adversarial Review

### Challenge A — “The system passed all tests. Why not approve?”

Ask whether the tests represent production conditions, whether important requirements were covered, and whether operational recovery was demonstrated.

### Challenge B — “Why monitor after approval if evaluation was rigorous?”

Because production conditions can differ from controlled evaluation conditions, and NIST explicitly identifies post-deployment monitoring as necessary to observe real-world behavior.

### Challenge C — “Why not simply rely on rollback?”

Because AI systems can have changing data, indexes, provider behavior, policies, and external actions that are not restored by application rollback alone.

### Challenge D — “Why not use one readiness score?”

Because a single aggregate score can hide a critical blocker. The advisor should preserve domain-level evidence and decision impact.

---

## 18. Advisor Decision Rule

Before recommending production approval, the advisor should be able to state:

> **What is being authorized, what evidence demonstrates readiness, what remains uncertain, how failure will be detected and handled, who is accountable, and what event would invalidate the approval.**

If these cannot be stated, production readiness is incomplete for the intended use.

---

## 19. What Would Change Our Mind?

The readiness recommendation should change when credible evidence materially changes:

- workload;
- data quality;
- model behavior;
- security posture;
- reliability;
- recovery capability;
- cost;
- provider behavior;
- user behavior;
- intended use;
- regulatory or contractual constraints.

---

## Bottom Line

> **Production readiness is an evidence-based authorization to operate within a defined boundary. It is not proof that the AI system is perfect, and it is not the end of engineering.**
