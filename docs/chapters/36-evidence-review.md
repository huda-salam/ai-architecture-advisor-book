# Evidence Review — Chapter 36: Vendor Dependency & Exit Strategy

## Review Objective

This review hardens Chapter 36 against three recurring errors:

1. treating vendor dependency as inherently bad;
2. confusing portability, interoperability, and actual exit capability;
3. presenting architectural recommendations as universal facts.

The chapter should remain vendor-neutral and evidence-led.

---

## 1. Core Claim: Vendor Dependency Is Not Automatically a Failure

**Classification:** Recommendation / inference.

Enterprise systems necessarily depend on external technology, data, infrastructure, and service providers in many architectures. The relevant question is whether the dependency is understood, proportionate, and controllable.

NIST AI RMF explicitly recognizes third-party AI software, data, hardware, and services as part of AI risk management and recommends processes for managing third-party risks and high-risk failures.

**Primary evidence:**
- NIST AI RMF Core, Govern 6 and Manage 3: https://airc.nist.gov/airmf-resources/airmf/5-sec-core/
- NIST AI RMF Playbook, Govern: https://airc.nist.gov/airmf-resources/playbook/govern/
- NIST AI RMF Playbook, Manage: https://airc.nist.gov/airmf-resources/playbook/manage/

**Conclusion:** The chapter correctly frames vendor dependency as a risk-management and architecture question rather than an anti-vendor doctrine.

---

## 2. Portability and Interoperability Are Distinct Concerns

**Classification:** Fact / technical evidence.

NIST's cloud standards work identifies portability and interoperability as distinct concerns. Portability concerns movement of data/workloads; interoperability concerns the ability of different systems to work together.

NIST also notes practical barriers created by provider-specific interfaces, formats, and resource definitions.

**Primary evidence:**
- NIST Cloud Computing Standards Roadmap: https://www.nist.gov/publications/nist-cloud-computing-standards-roadmap
- NIST Cloud Federation Reference Architecture, SP 500-332: https://www.nist.gov/publications/nist-cloud-federation-reference-architecture

**Conclusion:** The chapter's distinction between portability and broader optionality is defensible. Optionality itself is an architectural inference, not a formal NIST metric.

---

## 3. Data Portability Requires More Than Raw Records

**Classification:** Technical evidence + architectural inference.

NIST's cloud standards roadmap discusses the importance of documented and tested formats and notes that metadata is relevant to practical portability. This supports the chapter's emphasis on data, metadata, schemas, and related context rather than raw records alone.

The chapter's broader list—access-control information, lineage, provenance, embeddings, configuration, and retention state—is architecture guidance. Not every migration requires every artifact.

**Conclusion:** Keep the wording conditional. Portability requirements must be derived from the actual recovery, migration, audit, and reconstruction objectives.

---

## 4. Provider-Specific AI Behavior Is a Real Substitution Concern

**Classification:** Architectural inference grounded in model evaluation practice.

An API-compatible replacement is not necessarily behaviorally equivalent. Different models can differ in instruction following, structured output, tool use, latency, safety behavior, and task quality.

This conclusion should connect directly to Chapter 31's evaluation framework rather than being presented as a universal numerical claim.

**Evidence basis:**
- NIST AI RMF 1.0: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10
- NIST AI RMF Measure resources: https://airc.nist.gov/airmf-resources/playbook/measure/

**Conclusion:** Treat provider substitution as both an integration and evaluation problem.

---

## 5. Abstraction Is Not Universally Beneficial

**Classification:** Architectural recommendation.

The chapter recommends selective abstraction rather than abstracting every provider capability.

This is not a standards claim. It is an architecture trade-off based on the fact that abstraction can introduce complexity, hide useful capabilities, and create another dependency.

**What would strengthen the recommendation:** measured evidence from the actual system showing that a common interface reduces switching cost without materially degrading quality, performance, security, or operational simplicity.

---

## 6. Multi-Provider Architecture Is Not Automatically Safer

**Classification:** Inference / recommendation.

NIST's federation reference architecture describes federation and interoperability patterns but does not establish that multi-provider architecture is universally superior.

FinOps also presents managed, partially managed, and self-managed AI infrastructure as choices with different trade-offs, including vendor dependency and operational complexity.

**Primary evidence:**
- NIST SP 500-332: https://www.nist.gov/publications/nist-cloud-federation-reference-architecture
- FinOps, Choosing an AI Approach and Infrastructure Strategy: https://www.finops.org/wg/choosing-an-ai-approach-and-infrastructure-strategy/

**Conclusion:** Multi-provider architecture should be justified by a concrete requirement such as resilience, regulatory separation, capacity, negotiation leverage, or strategic optionality.

---

## 7. Third-Party Risk Includes Failure and Contingency Planning

**Classification:** Fact.

NIST AI RMF Govern 6.2 and Manage 3.2 address contingency processes for high-risk third-party AI failures and ongoing management of third-party AI resources.

The chapter's exit-trigger and contingency sections are therefore grounded in an established risk-management framework.

**Primary evidence:**
- NIST AI RMF Core: https://airc.nist.gov/airmf-resources/airmf/5-sec-core/
- NIST AI RMF Playbook — Govern: https://airc.nist.gov/airmf-resources/playbook/govern/
- NIST AI RMF Playbook — Manage: https://airc.nist.gov/airmf-resources/playbook/manage/

---

## 8. Procurement and Contracts Are Part of Technical Exit Strategy

**Classification:** Cross-functional recommendation.

Technical architecture cannot itself create contractual rights such as data export, termination assistance, incident notification, or deprecation notice.

NIST AI RMF resources explicitly connect third-party AI risk with procurement, contracts, incident response, testing, and documentation.

The advisor should therefore identify technical requirements for procurement/legal teams without presenting them as legal advice.

**Primary evidence:**
- NIST AI RMF Playbook — Govern: https://airc.nist.gov/airmf-resources/playbook/govern/
- NIST AI RMF Traffic Sign Recognition use case, Govern 6.2 example: https://airc.nist.gov/docs/Traffic_Sign_Recognition_Use_Case_Profile-NIST_AI_RMF.pdf

---

## 9. Exit Capability Should Be Tested

**Classification:** Recommendation grounded in portability testing practice.

NIST's cloud work uses use cases and testing to examine portability, interoperability, and security. This supports treating exit capability as something that can be tested rather than merely documented.

The exact depth of testing should depend on system criticality and recovery requirements.

**Primary evidence:**
- NIST SAJACC / cloud case-use work: https://www.nist.gov/itl/case-uses-introduction
- NIST Cloud Computing Standards Roadmap: https://www.nist.gov/publications/nist-cloud-computing-standards-roadmap

**Conclusion:** A tested migration path is stronger evidence than a contractual or architectural assertion alone.

---

## 10. AI Management Systems Recognize Third-Party AI Use

**Classification:** Technical/governance evidence.

ISO/IEC 42001:2023 specifies requirements for an AI management system and applies to organizations developing, providing, or using AI systems. ISO's current explanatory material explicitly includes organizations managing AI systems provided by third parties.

**Primary evidence:**
- ISO/IEC 42001:2023: https://www.iso.org/standard/42001
- ISO/IEC 42001 explained: https://www.iso.org/home/insights-news/resources/iso-42001-explained-what-it-is.html

**Conclusion:** This supports treating third-party AI as part of organizational AI governance. It does not establish a universal technical exit architecture.

---

## 11. Current Industry Evidence: FinOps and AI Infrastructure Choice

**Classification:** Industry evidence.

FinOps presents fully managed, partially managed, and self-managed AI infrastructure as different operating choices, noting trade-offs involving operational overhead, flexibility, and vendor lock-in.

This is useful evidence that infrastructure strategy involves explicit trade-offs. It is not evidence that one operating model is universally optimal.

**Source:**
https://www.finops.org/wg/choosing-an-ai-approach-and-infrastructure-strategy/

---

## 12. Deliberate Non-Claims

Chapter 36 should **not** imply that:

- vendor lock-in is always bad;
- multi-cloud always reduces risk;
- multi-model always improves resilience;
- Kubernetes automatically provides portability;
- abstraction always reduces switching cost;
- open-source models eliminate vendor dependency;
- self-hosting eliminates lock-in;
- an API-compatible model is behaviorally equivalent;
- contractual export rights guarantee usable migration;
- data portability means complete system portability;
- a backup is equivalent to an exit plan;
- every critical system needs a tested multi-provider deployment;
- every provider dependency requires maximal portability.

These distinctions are important to preserve the book's evidence standard.

---

## 13. AI-IDSS-Specific Reasoning

The strongest architecture recommendation in the chapter is not “avoid vendors.”

It is:

> Preserve organizational control over the parts of the decision system that define authority, evidence, policy, evaluation, and audit, while allowing provider-specific technology to serve capabilities where the dependency is justified and understood.

**Classification:** Recommendation.

This follows from the broader architecture established in Chapters 19–35:

- identity and authorization are explicit controls;
- source systems remain authoritative;
- evaluation is a lifecycle control;
- auditability matters for consequential decisions;
- model selection is an architecture decision;
- TCO and performance must be evaluated together.

It should not be presented as a universal compliance requirement.

---

## 14. Evidence Matrix

| Claim | Evidence class | Confidence | Caveat |
|---|---|---|---|
| Third-party AI creates governance/risk considerations | Standard/framework | High | Risk treatment is context-specific |
| Cloud portability can be difficult | Technical evidence | High | Difficulty varies by service and architecture |
| Provider-specific interfaces increase switching effort | Technical evidence / inference | High | Magnitude is workload-specific |
| API compatibility does not prove model equivalence | Architecture inference | High | Equivalence must be defined and tested |
| Multi-provider can reduce some dependencies | Inference | Medium | Adds complexity and may create new dependencies |
| Abstraction can improve substitution | Architecture inference | Medium | Depends on boundary quality and implementation |
| Abstraction can also add complexity | Architecture inference | High | Trade-off is context-specific |
| Exit capability should be tested for critical systems | Recommendation | High | Test depth should follow criticality |
| Contracts should address relevant technical exit requirements | Cross-functional recommendation | High | Legal/procurement teams own contractual decisions |

---

## 15. Adversarial Review

### Challenge A

**“Why not simply choose the largest cloud/AI provider and accept the dependency?”**

Possible answer: because scale does not eliminate concentration, pricing, service, behavioral, or strategic dependency risk. The dependency may still be acceptable, but it should be explicit and governed.

### Challenge B

**“Why not use multiple providers everywhere?”**

Possible answer: because redundancy has a cost. Multiple providers introduce additional integration, security, evaluation, observability, and operational complexity. The benefit must exceed that cost.

### Challenge C

**“Why not build everything ourselves?”**

Possible answer: self-hosting can move dependency from an external provider to internal engineering, infrastructure, skills, and operational responsibility. It does not make dependency disappear.

### Challenge D

**“Why not make everything portable?”**

Possible answer: maximal portability can itself become an expensive architecture constraint. The correct objective is sufficient optionality for the risk being managed.

---

## 16. Advisor Decision Rule

For a material vendor dependency, require five answers:

1. **What value does the dependency create?**
2. **What risk does the dependency create?**
3. **What would switching actually require?**
4. **What evidence supports the estimated switching cost and failure impact?**
5. **What would make us change the decision?**

If these cannot be answered, the dependency has not yet been sufficiently understood for a high-consequence architecture decision.

---

## 17. What Would Change Our Mind?

Evidence that could reverse the chapter's recommendations includes:

- measured migration tests showing negligible switching cost;
- strong interoperability standards adopted by the relevant ecosystem;
- contractual protections that materially reduce practical exit risk;
- empirical evidence that multi-provider architecture creates unacceptable operational risk for the specific workload;
- provider capabilities that cannot be matched without unacceptable quality or security degradation;
- evidence that maintaining optionality costs substantially more than the risk reduction it provides.

The chapter therefore favors **proportionate optionality**, not permanent vendor neutrality.

---

## Bottom Line

The defensible architectural position is:

> **Vendor dependency is acceptable when it is deliberate, understood, proportionate to the value created, and supported by credible failure and exit options. The advisor's responsibility is not to eliminate dependency, but to prevent the organization from becoming dependent without understanding the consequences.**
