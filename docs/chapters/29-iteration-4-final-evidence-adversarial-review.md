# Chapter 29 — Iteration 4 Final Evidence & Adversarial Review

## Review status

**PASS — final for current scope**

This iteration re-tested the chapter against current NIST evidence and the architecture spine established in Chapters 19–28.

## Evidence hardening

### 1. Human oversight is a configuration, not a checkbox

NIST AI RMF recognizes a spectrum from fully manual to fully autonomous human-AI configurations and calls for human roles and responsibilities to be clearly defined and differentiated. Therefore the chapter does not claim that every AI system requires human-in-the-loop operation.

### 2. Human presence does not establish meaningful control

The chapter's distinction between information, competence, authority, timing, intervention, evidence, and accountability is an architectural framework derived from NIST oversight guidance and human-AI interaction evidence. It is not presented as a formal NIST checklist.

### 3. Oversight must be evaluated

NIST AI RMF Map 3.5 calls for human-oversight processes to be defined, assessed, and documented. NIST Measure guidance also identifies measurement of oversight and downstream overrides as useful evidence. The chapter therefore treats oversight effectiveness as something to test rather than assume.

### 4. Human decision authority is distinct from technical operation

This is an organizational/architecture distinction, not a claim that one universal organizational structure is required. The system should not infer business decision authority merely from technical access privileges.

### 5. Human review is not a substitute for authorization

The chapter preserves the cross-chapter rule that authorization must remain an explicit system control. Human approval and authorization are separate concepts: a person may make a decision, while a policy-enforcement system determines whether the corresponding action is permitted.

### 6. Automation bias is contextual

Automation bias and over-reliance are treated as documented research concerns, not as deterministic effects. Their magnitude can vary with task, interface, user, model performance, and operating context.

### 7. Moral crumple zone is conceptual evidence

Elish's concept is used to reason about responsibility/control mismatch. It is not presented as an engineering standard, regulatory rule, or quantitative risk model.

### 8. Investment decision boundary is context-specific

The recommendation that the reference AI-IDSS place consequential investment decisions after human review is explicitly a reference-architecture recommendation. It is not presented as a universal requirement for all AI systems or all investment workflows.

## Adversarial tests

### Test A — ceremonial approval

**Question:** Could the system technically contain a human approval step while remaining effectively autonomous?

**Result:** Yes. The chapter explicitly tests default execution, reviewer authority, intervention ability, evidence access, and response-time behavior.

### Test B — human without authority

**Question:** Could the designated reviewer be unable to reject or modify the recommendation?

**Result:** Yes; this is identified as an anti-pattern rather than meaningful oversight.

### Test C — human overload

**Question:** Could alert volume exceed review capacity?

**Result:** Explicitly addressed. Human oversight is treated as a capacity/reliability dependency and connected to Chapters 17–18.

### Test D — silent fail-open behavior

**Question:** Could reviewer absence or authorization-service failure cause consequential action to proceed automatically?

**Result:** Explicit challenge. Consequential workflows require documented behavior for unavailable reviewers and degraded authorization/monitoring services.

### Test E — authority confusion

**Question:** Could model ownership, system operation, and investment decision authority be silently conflated?

**Result:** Explicitly separated.

### Test F — AI self-authorization

**Question:** Could the LLM or agent decide that its own recommendation is authorized?

**Result:** Rejected as inconsistent with Chapters 19–25.

### Test G — human as responsibility sink

**Question:** Could an organization assign accountability to a human who lacks practical control?

**Result:** Addressed using the moral-crumple-zone concept and the chapter's authority/control alignment principle.

### Test H — automation expansion without evidence

**Question:** Could the organization move from human decision to autonomous execution merely because model performance appears strong?

**Result:** Rejected. The chapter requires evidence across performance, calibration, robustness, coverage, monitoring, recovery, authorization, human factors, capacity, and auditability.

## Cross-chapter invariant

The architecture now preserves the following chain:

**Evidence → Analysis → Prediction/Assessment → AI Recommendation → Human Decision → Authorization → Execution**

This is consistent with:

- Chapter 19: security/policy boundary outside the model;
- Chapter 20: identity and authorization;
- Chapter 24: API authority boundaries;
- Chapter 25: bounded connector capabilities;
- Chapter 26: AI-IDSS reference architecture;
- Chapter 27: prediction separated from decision policy;
- Chapter 28: evidence separated from explanation;
- Chapter 29: human decision separated from AI recommendation and technical authorization.

## Important non-claims

The chapter does **not** claim:

- every AI system needs human-in-the-loop;
- human approval guarantees safety;
- humans are inherently better decision makers than AI;
- automation bias always occurs or has a fixed magnitude;
- a particular human-AI configuration is universally optimal;
- human review can compensate for weak security or authorization;
- a UI approval button constitutes effective oversight;
- autonomous operation is inherently unsafe;
- the reference AI-IDSS boundary is a regulatory requirement.

## Falsifiability

The recommendation should change if credible evidence demonstrates that a different human-AI configuration achieves equal or better decision outcomes within the defined risk tolerance while preserving authorization, monitoring, recovery, accountability, and auditability.

## Source status

NIST AI RMF 1.0 remains the current released framework baseline while NIST states that a revised version is in progress. The chapter therefore uses version-aware wording and does not treat AI RMF 1.0 as immutable.

## Final assessment

**PASS.** No further substantive iteration is justified unless new authoritative evidence, a change in the AI-IDSS operating model, or a cross-chapter architecture change introduces a new issue.
