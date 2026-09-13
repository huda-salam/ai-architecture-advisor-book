# Chapter 29 — Evidence Review

## Review status

**Three-pass review completed**

1. Substance / architecture completeness
2. Evidence hardening / claim classification
3. Adversarial human-oversight review + cross-chapter consistency

## Primary sources

### NIST AI RMF 1.0

**Source:** https://doi.org/10.6028/NIST.AI.100-1

Relevant evidence:
- Appendix C discusses human-AI interaction and the need to clearly define and differentiate human roles and responsibilities.
- Human-AI configurations can range from fully manual to fully autonomous.
- Human-AI interaction can produce different outcomes depending on context.
- NIST notes that the degree to which humans are empowered and incentivized to challenge AI output requires further study.
- NIST identifies frequency and rationale of human overrides as potentially useful information for evaluating deployed human-AI configurations.

Classification: **Framework fact / primary source**

### NIST AI RMF Core / AIRC

**Source:** https://airc.nist.gov/airmf-resources/airmf/5-sec-core/

Relevant evidence:
- Govern 3.2 calls for policies and procedures that define and differentiate roles and responsibilities for human-AI configurations and oversight.
- Map 2.2 addresses documentation of system knowledge limits and how outputs may be utilized and overseen by humans.
- Map 3.5 calls for processes for human oversight to be defined, assessed, and documented.
- Measure includes testing, performance assessment, uncertainty, and monitoring in operation.

Classification: **Framework fact / primary source**

### NIST AI RMF Playbook — Map 3.5

**Source:** https://airc.nist.gov/airmf-resources/playbook/map/

Relevant evidence:
- Organizations should identify AI capabilities requiring human oversight in relation to context and risk.
- Oversight practices should be tested and evaluated for validity and reliability.
- Relevant AI actors should participate in testing under conditions similar to deployment.
- High-risk/critical settings warrant evaluation of the effectiveness of oversight procedures before deployment.

Classification: **Guidance / primary source**

### NIST Generative AI Profile

**Source:** https://doi.org/10.6028/NIST.AI.600-1

Relevant evidence:
- Generative AI can require different levels of oversight or different human-AI configurations because performance and risks may be less well understood in some contexts.
- Additional human review, tracking, documentation, and management oversight may be warranted depending on context.

Classification: **Framework/profile evidence / primary source**

### Elish — Moral Crumple Zones

**Source:** https://doi.org/10.17351/ESTS2019.260

Relevant evidence:
- Responsibility can be misattributed to a human actor with limited control when agency is distributed across complex automated systems.

Classification: **Peer-reviewed conceptual research**

Use carefully: the concept is not an engineering standard. It supports the chapter's warning against assigning responsibility without corresponding control.

### Automation bias review

**Source:** https://doi.org/10.1007/s00146-025-02422-7

Relevant evidence:
- Reviews automation bias as over-reliance on automated recommendations in human-AI collaboration, particularly relevant to high-stakes contexts.

Classification: **Peer-reviewed review evidence**

### HITL systematic review (2026)

**Source:** https://doi.org/10.3390/e28040377

Relevant evidence:
- Human-in-the-loop systems involve different placements and granularities of human involvement.
- Practical challenges include scalability of oversight, cognitive load, and trust calibration.
- Human oversight is not inherently effective merely because a human is included.

Classification: **Peer-reviewed systematic review**

## Claim classification

| Claim in chapter | Classification | Evidence strength |
|---|---|---|
| Human-AI configurations span manual to autonomous | Fact | Strong — NIST AI RMF |
| Human roles/responsibilities should be differentiated | Fact / guidance | Strong — NIST AI RMF |
| Human oversight should be defined and evaluated | Guidance | Strong — NIST AI RMF |
| Human oversight is not automatically effective | Evidence-supported inference | Strong, supported by NIST + research |
| Human approval button can be ceremonial | Architecture inference | Strong reasoning; not a universal empirical law |
| Human reviewer needs authority to reject/modify | Architecture recommendation | Derived recommendation |
| Authorization should be enforced outside an LLM | Architecture recommendation | Consistent with Chapters 19–25 security/authorization model |
| Human review should precede consequential investment action | Reference architecture recommendation | Context-specific, not universal |
| 99.9% approval may indicate ineffective review | Illustrative reasoning example | Not an empirical claim |
| Automation should be expanded only after evidence | Architecture recommendation | Derived from risk-management/evaluation principles |
| Human oversight always improves safety | Rejected universal claim | Not supported |
| Every AI system needs HITL | Rejected universal claim | NIST explicitly recognizes configurations without human oversight |

## Important editorial guardrails

### 1. Do not equate “human present” with “human control”

The chapter intentionally distinguishes presence, oversight, authority, competence, intervention, and accountability.

### 2. Do not present HITL as universally mandatory

NIST explicitly recognizes a spectrum of human-AI configurations. The reference AI-IDSS recommendation is context-specific.

### 3. Do not overstate automation bias evidence

Automation bias is a documented research topic and risk, but its magnitude depends on task, interface, user, system performance, and context.

### 4. Do not claim that human review eliminates AI risk

Human reviewers introduce their own limitations and biases. The architecture therefore treats human oversight as another component requiring design and evaluation.

### 5. Keep authority separate from explanation

An explanation can support human judgment; it does not itself confer authority.

### 6. Keep authorization separate from the LLM

This is an architectural recommendation consistent with the book's earlier identity, API, connector, and security chapters. It should not be presented as a direct quotation from NIST.

## Cross-chapter consistency checks

- **Chapter 19:** policy and authorization are outside the model.
- **Chapter 20:** identity and authorization determine who can act.
- **Chapter 24:** APIs are controlled authority boundaries.
- **Chapter 25:** connectors expose bounded capabilities.
- **Chapter 26:** AI-IDSS separates evidence, analysis, recommendation, and human decision.
- **Chapter 27:** threshold policy is distinct from prediction.
- **Chapter 28:** explanation is distinct from evidence.
- **Chapter 29:** human decision is distinct from AI recommendation and system authorization.

## Falsifiability

The reference recommendation should be revisited if credible evidence demonstrates that another human-AI configuration achieves equal or better outcomes within the organization's defined risk tolerance, with adequate monitoring, authorization, recovery, and accountability.

## Current-source note

NIST states that AI RMF 1.0 is being revised. Chapter wording therefore avoids treating AI RMF 1.0 as a permanent or immutable standard.
