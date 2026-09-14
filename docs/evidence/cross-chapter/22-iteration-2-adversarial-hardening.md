# Chapter 22 — Iteration 2 Adversarial Hardening

## Objective

Harden the AI-Specific Threats chapter after the Chapter 19–21 security-block review.

## Findings

1. Threat existence, exposure, likelihood, impact, and mitigation effectiveness must remain separate claims.
2. NIST AI 100-2 E2025 is the primary taxonomy; its published errata should be acknowledged without treating proposed corrections as official revisions.
3. OWASP Agentic Applications 2026 is directly relevant to agent/tool/identity threats but remains industry/community evidence rather than a formal NIST or ISO standard.
4. OWASP incident reports demonstrate observed incidents, not attack prevalence for a specific organization.
5. Agent risk should be analyzed as the composition of autonomy, authority, sensitive data access, external connectivity, and consequence—not autonomy alone.
6. Chapter 22 must consume, not redefine, the identity and authorization boundary of Chapter 20 and the data-protection boundary of Chapter 21.
7. Security controls must be evaluated by attack path and consequence, not by the presence of a named security product or control.

## Cross-Chapter Result

- Chapter 19: establishes the security/trust boundary.
- Chapter 20: establishes identity, authorization, delegation, and privilege boundaries.
- Chapter 21: establishes sensitive-data protection across the lifecycle.
- Chapter 22: analyzes how AI-specific threats can attempt to cross those boundaries and what consequence follows.

## Decision

**Status: Hardened for evidence scope and adversarial reasoning; not yet declared permanently final.**

The chapter should remain subject to later review when the threat taxonomy, agentic security guidance, or the AI-IDSS architecture changes materially.