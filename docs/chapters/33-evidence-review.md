# Evidence Review — Chapter 33: Model Lifecycle

## Review objective

Validate the chapter's lifecycle claims against authoritative AI risk-management and standards sources, while separating established evidence from architecture recommendations.

## 1. Lifecycle coverage is authoritative

NIST AI RMF 1.0 addresses AI risk management across the AI lifecycle and includes ongoing monitoring, AI-system inventory, and safe decommissioning/phasing out. urlNIST AI RMF 1.0https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10

The AI RMF Core specifies:

- ongoing monitoring and periodic review;
- AI-system inventory mechanisms;
- safe decommissioning and phasing out;
- monitoring of third-party resources and pre-trained models;
- post-deployment monitoring;
- appeal and override;
- incident response and recovery;
- change management;
- continual improvement.

These support the chapter's central lifecycle argument. urlNIST AI RMF Corehttps://airc.nist.gov/airmf-resources/airmf/5-sec-core/

## 2. Post-deployment monitoring

NIST AI 800-4, published in March 2026, specifically examines challenges in monitoring deployed AI systems. It states that post-deployment monitoring is important for validating real-world behavior, identifying unforeseen outputs, and detecting unexpected consequences. It also notes that monitoring practices, methodologies, and terminology remain nascent and fragmented. urlNIST AI 800-4https://www.nist.gov/publications/challenges-monitoring-deployed-ai-systems-center-ai-standards-and-innovation

Therefore the chapter deliberately does **not** claim a universal monitoring cadence or universal monitoring methodology.

## 3. Decommissioning

NIST AI RMF and Playbook explicitly address deliberate decommissioning. The Playbook recommends considering downstream dependencies, continuity, regulatory requirements, legal/security investigations, migration, and preservation of relevant artifacts. urlNIST AI RMF Playbook — Governhttps://airc.nist.gov/airmf-resources/playbook/govern/

The chapter's treatment of retirement as an architectural activity is therefore well supported.

## 4. Risk management standard

ISO/IEC 23894:2023 is an International Standard providing guidance for organizations that develop, produce, deploy, or use AI systems to manage AI-specific risk and integrate risk management into AI-related activities and functions. urlISO/IEC 23894:2023https://www.iso.org/standard/77304.html

This supports the lifecycle risk-management framing but does not prescribe the exact operational lifecycle proposed in this chapter.

## 5. Model inventory

NIST AI RMF explicitly includes AI-system inventory mechanisms. The chapter extends this into a practical model inventory containing version, owner, dependencies, evaluation status, and lifecycle status.

**Classification:**
- Inventory requirement: **Fact / Technical Evidence**
- Exact inventory fields: **Recommendation**

## 6. Baseline and revalidation

The chapter recommends establishing an evaluation baseline and revalidating after material changes.

This is consistent with NIST's emphasis on measurement, ongoing monitoring, and change management. However, the exact thresholds for targeted regression, broad regression, or full requalification are not universal standards.

**Classification:** **Architecture Recommendation grounded in NIST lifecycle principles.**

## 7. Provider changes

The chapter treats third-party model changes as lifecycle risks. This is a reasonable architecture inference: an application can remain syntactically compatible with an API while behavior, latency, pricing, safety characteristics, or service terms change.

The chapter intentionally does not claim that every provider changes models in this way or that every change requires full requalification.

**Classification:** **Inference / Recommendation.**

## 8. Drift

The chapter distinguishes model drift from changes in surrounding inputs, retrieval, tools, users, and providers.

This is an architectural decomposition rather than a single standards definition. It avoids presenting “drift” as one universal measurable phenomenon.

**Classification:** **Architecture framing / Recommendation.**

## 9. Incident response and recovery

NIST AI RMF Manage 4.1–4.3 includes post-deployment monitoring, incident response, recovery, change management, and communication of incidents/errors. urlNIST AI RMF Core — Manage 4https://airc.nist.gov/airmf-resources/airmf/5-sec-core/

The chapter's incident sequence is therefore a practical operationalization rather than a claimed mandatory sequence.

## 10. Lifecycle as a system dependency

The statement that a production model is a “living technical dependency” is a conceptual framing, not a formal standards term.

It is justified by the combination of:

- versioning;
- operational monitoring;
- third-party dependencies;
- change management;
- incident response;
- retirement requirements.

**Classification:** **Inference.**

## 11. AI-IDSS implications

For AI-IDSS, the chapter recommends preserving enough lifecycle evidence to establish which model/system configuration generated an important recommendation.

This is an architectural recommendation derived from the book's broader requirements for auditability, evidence, model evaluation, and human decision boundaries.

It should not be interpreted as a universal requirement to retain every prompt, token, intermediate state, or system event indefinitely.

## 12. Deliberate non-claims

The chapter does **not** claim that:

- every AI system requires continuous automated monitoring;
- every model change requires full reapproval;
- every provider guarantees immutable model versions;
- every model requires rollback to a previous version;
- every lifecycle must use the exact stages shown here;
- every production model requires the same retention period;
- decommissioning means immediate destruction of all artifacts;
- drift has one universally accepted detection method;
- NIST AI RMF is a mandatory regulation;
- ISO/IEC 23894 prescribes the chapter's exact operating model.

These boundaries are intentional.

## 13. Current-source caution

NIST states that the AI RMF 1.0 is being revised. The chapter therefore cites the current published AI RMF 1.0 and current AI RMF resources while avoiding claims about a future revision that has not become a final standard. urlNIST AI RMF program pagehttps://www.nist.gov/itl/ai-risk-management-framework

## 14. Advisor conclusion

**Claim:** Enterprise AI lifecycle management should extend beyond initial model selection and deployment.

**Evidence:** NIST AI RMF explicitly addresses inventory, ongoing monitoring, change management, incident response/recovery, and safe decommissioning; NIST AI 800-4 documents current post-deployment monitoring challenges. urlNIST AI RMF Corehttps://airc.nist.gov/airmf-resources/airmf/5-sec-core/ urlNIST AI 800-4https://www.nist.gov/publications/challenges-monitoring-deployed-ai-systems-center-ai-standards-and-innovation

**Recommendation:** Treat model lifecycle as an explicit architecture concern and maintain evidence across introduction, deployment, change, operation, incident response, and retirement.

**Confidence:** High for the lifecycle principle; lower for any specific operational cadence or gate structure because current monitoring practice remains an evolving field.

**What would change our mind?** Evidence that a materially simpler lifecycle provides equivalent risk control for a defined, low-risk workload would justify reducing lifecycle controls. Conversely, severe production incidents caused by unmanaged model changes would justify stronger controls.
