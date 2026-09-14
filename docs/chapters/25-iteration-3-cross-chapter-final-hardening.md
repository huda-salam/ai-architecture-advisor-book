# Chapter 25 — Iteration 3: Cross-Chapter Final Hardening

## Scope

This pass tests Chapter 25 against the architecture spine established in Chapters 19–24 and against current primary evidence.

## Cross-chapter consistency

### 19 → 25: Security boundary

Chapter 19 establishes that security is an architecture property and that the model is not the security boundary. Chapter 25 applies that principle to connectors: connectivity, policy enforcement, and downstream authority remain distinct.

### 20 → 25: Identity and authorization

Chapter 20 establishes authentication, authorization, delegation, workload identity, privilege propagation, and retrieval-time authorization as separate concerns. Chapter 25 therefore does not treat a connector credential as equivalent to user authority and requires the authority path to be explicit.

### 21 → 25: Data protection

Chapter 21 establishes classification, minimization, protection, retention, and controlled data flows. Chapter 25 applies these to connector inputs, outputs, telemetry, secrets, and downstream data scope.

### 22 → 25: AI-specific threats

Chapter 22 treats tool abuse, excessive agency, prompt injection, supply-chain threats, and untrusted tool output as system-level threats. Chapter 25 therefore treats connector/tool descriptions and outputs as potentially influential but not automatically authoritative.

### 23 → 25: Enterprise integration

Chapter 23 addresses system boundaries, integration patterns, consistency, failure handling, and source-of-record relationships. Chapter 25 should not redefine integration architecture; it specializes those concerns for AI-mediated access.

### 24 → 25: API boundary

Chapter 24 establishes the API as a contract and runtime boundary, while separating API exposure from authorization. Chapter 25 consumes APIs as one connector implementation pattern without assuming that an API or gateway solves the entire AI security problem.

## Evidence freshness check

The current NIST SP 800-228 publication is Update 1, with updates through March 13, 2026. It addresses API risks across lifecycle stages and recommends a risk-based approach to controls.

The NIST SP 800-228A document available in 2026 is an Initial Public Draft, not a final standard. It must therefore not be cited as a final normative requirement.

The official MCP project identifies `2026-07-28` as the released MCP specification. Its documented changes include a stateless protocol core and authorization hardening. These are technical facts about the protocol release, not evidence that MCP is universally secure or appropriate.

OWASP excessive-agency guidance remains industry security guidance rather than a formal NIST/ISO standard.

## Adversarial checks

### Claim: connector = security boundary

**Disposition:** Rejected as too broad.

A connector can be a trust/control boundary, but security depends on the complete path: identity, policy enforcement, connector runtime, downstream system, data protection, monitoring, and recovery.

### Claim: connector output = trusted evidence

**Disposition:** Rejected.

Successful retrieval does not establish semantic correctness, freshness, provenance, authorization, or analytical validity.

### Claim: MCP solves connector security

**Disposition:** Rejected.

MCP provides protocol capabilities and security-related mechanisms, but deployment-specific authorization, credential handling, downstream permissions, isolation, monitoring, and application policy remain architecture responsibilities.

### Claim: least capability is always best

**Disposition:** Qualified.

Minimum useful capability is a strong least-privilege design objective, but capability boundaries should be tested against operational requirements. Excessive fragmentation can create unnecessary complexity or bypass paths.

### Claim: every state-changing connector needs human approval

**Disposition:** Rejected as a universal rule.

Approval requirements depend on consequence, authorization, reversibility, controls, and organizational policy. AI-IDSS should apply stronger controls to materially consequential actions.

### Claim: read-only means low risk

**Disposition:** Rejected.

Read operations can create confidentiality, privacy, regulatory, model-manipulation, and decision-integrity risks.

## Final architectural formulation

The chapter's strongest reusable formulation is:

> **A connector should make enterprise capability consumable by AI without allowing connectivity to silently become authority.**

This formulation preserves the distinction among:

- connectivity;
- identity;
- authorization;
- data access;
- semantic integrity;
- tool execution;
- consequential authority;
- auditability.

## Final review status

**PASS — Chapter 25 is cross-chapter consistent and evidence-hardened for the current scope.**

Further changes should be driven by materially new standards/protocol releases, new evidence, or contradictions discovered while reviewing later chapters—not by adding technology names for completeness alone.
