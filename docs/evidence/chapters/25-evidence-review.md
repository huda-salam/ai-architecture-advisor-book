# Evidence Review — Chapter 25: AI Connectors

## Review status

**Pass 1 — substance:** completed.

**Pass 2 — evidence hardening:** completed.

**Pass 3 — adversarial architecture/editorial review:** completed for the current scope.

The chapter treats “AI connector” as an architecture concept rather than a universal standards term. Vendor-specific mechanisms are examples, not architectural requirements.

## Primary sources checked

### 1. NIST SP 800-207 — Zero Trust Architecture

NIST defines Zero Trust Architecture around protecting resources rather than trusting network segments. This supports the chapter's distinction between connectivity and authorization and its emphasis on explicit resource access controls.

Source: NIST, *SP 800-207 Zero Trust Architecture*.

https://csrc.nist.gov/pubs/sp/800/207/final

**Classification:** Authoritative technical guidance / fact.

### 2. NIST SP 800-207A — Zero Trust Architecture Model for Cloud-Native Applications

NIST SP 800-207A describes application and service identities, identity-tier policies, API gateways, sidecar proxies, and application identity infrastructure as mechanisms for enforcing granular access policies in cloud-native environments.

Source: NIST, *SP 800-207A*.

https://csrc.nist.gov/pubs/sp/800/207/a/final

**Classification:** Authoritative technical guidance / fact.

### 3. NIST SP 800-228 Update 1 — API Protection

The current NIST SP 800-228 page records an update dated March 13, 2026. The publication addresses API risks across development/runtime lifecycle stages and recommended security controls.

Source: NIST, *SP 800-228, Guidelines for API Protection for Cloud-Native Systems — Update 1*.

https://csrc.nist.gov/pubs/sp/800/228/upd1/final

**Classification:** Authoritative technical guidance / fact.

### 4. OWASP LLM06:2025 — Excessive Agency

OWASP describes excessive agency as a vulnerability associated with excessive functionality, permissions, or autonomy. It specifically discusses tool/extension access and the consequences of manipulated or unexpected model outputs.

Source: OWASP GenAI Security Project, *LLM06:2025 Excessive Agency*.

https://genai.owasp.org/llmrisk/llm062025-excessive-agency/

**Classification:** Industry security guidance / evidence, not a formal standard.

### 5. Model Context Protocol — 2026-07-28 Specification

The official MCP project announced the July 28, 2026 specification release. The release describes a stateless protocol core, tool discovery/calls, authorization hardening, extensions, and lifecycle/deprecation changes.

Source: Model Context Protocol, *The 2026-07-28 Specification*.

https://blog.modelcontextprotocol.io/posts/2026-07-28/

**Classification:** Technical primary-source evidence for MCP capabilities/version; not evidence that MCP is universally appropriate or secure.

## Claim classification

| Claim | Classification | Evidence basis |
|---|---|---|
| Zero Trust focuses protection on resources rather than network location | Fact | NIST SP 800-207 |
| Application/service identities can support granular cloud-native access control | Fact | NIST SP 800-207A |
| API security should address lifecycle/runtime risks | Fact | NIST SP 800-228 Update 1 |
| Excessive functionality, permissions, and autonomy contribute to excessive agency | Industry evidence | OWASP LLM06:2025 |
| MCP 2026-07-28 includes stateless core and authorization hardening | Technical fact | Official MCP release documentation |
| A connector is a controlled AI-side integration boundary | Architecture definition | This book's architectural definition; not a formal standard |
| Connector should expose minimum useful capability | Recommendation | Least-privilege / Zero Trust reasoning applied to AI architecture |
| Authorization should not depend solely on model output | Architecture recommendation | Derived from explicit authorization/resource protection principles |
| Connector output should be validated before becoming AI evidence | Architecture recommendation | Data/integration integrity reasoning; not a universal standard requirement |
| Read-only and state-changing connectors should be reviewed differently | Architecture recommendation | Consequence/risk analysis |
| Broader connector authority increases potential blast radius | Inference | Security architecture reasoning; exact risk depends on downstream controls |
| AI connector marketplace membership does not establish security | Inference/recommendation | Supply-chain and authorization reasoning; no claim that every marketplace connector is unsafe |

## Important non-claims

The chapter deliberately does **not** claim that:

- a connector is a formally standardized component across the industry;
- MCP is the required connector protocol;
- MCP automatically provides enterprise authorization for every deployment;
- an API gateway is sufficient to secure an AI connector;
- service identities are always superior to user delegation;
- user delegation is always superior to service identity;
- database connectors are inherently unsafe;
- arbitrary SQL is always unacceptable in every environment;
- every connector must be implemented as a separate microservice;
- every AI action requires human approval;
- read-only operations are risk-free;
- a trusted internal system produces automatically trustworthy AI evidence;
- data minimization means returning the smallest payload in every situation;
- one connector framework or vendor solves the entire AI integration problem.

## Adversarial review

### Security architect objection

**Objection:** “The connector itself is not the authorization system.”

**Resolution:** The chapter explicitly separates connector capability from authorization and places deterministic policy enforcement in the architecture. The connector may enforce or participate in policy but does not receive automatic authority merely by existing.

### Platform architect objection

**Objection:** “Not every integration needs a dedicated connector abstraction.”

**Resolution:** Correct. “Connector” is an architectural concept. A simple application may combine adapter and application logic; a larger AI platform may separate registry, runtime, policy, and adapters. The chapter avoids prescribing one implementation shape.

### Vendor objection

**Objection:** “Our connector already handles security.”

**Resolution:** The advisor should ask which security properties are actually implemented: authentication, authorization, secret storage, data filtering, audit, rate limiting, isolation, lifecycle, and downstream permissions. “Secure” is not accepted as an unqualified architectural claim.

### AI architect objection

**Objection:** “Giving the model more tools improves agent flexibility.”

**Resolution:** Flexibility can be valuable, but the architecture must evaluate the additional functionality, permissions, autonomy, failure modes, and business impact. OWASP's excessive-agency guidance supports this risk framing.

### Data architect objection

**Objection:** “The connector returned the correct schema, so the integration is correct.”

**Resolution:** Schema correctness is insufficient when financial definitions, units, periods, identities, currency, effective dates, or provenance can be wrong. Semantic correctness remains an architecture concern.

## AI-IDSS-specific reasoning

The most important connector risk for this book is not merely API failure. It is the possibility that the connector changes the evidence or authority chain behind an investment decision.

For the AI-IDSS use case, review at least four dimensions separately:

1. **Evidence access** — Can the AI obtain the information it is authorized to use?
2. **Evidence integrity** — Did meaning, freshness, provenance, and scope survive the integration?
3. **Action authority** — What can the AI cause downstream systems to do?
4. **Decision traceability** — Can the organization reconstruct which connector calls and evidence contributed to an important recommendation?

A connector can succeed technically while failing one of these dimensions.

## Falsifiability

The connector architecture recommendation should change if empirical testing shows that a broader capability boundary provides materially better decision quality while preserving authorization, semantic integrity, auditability, reliability, and acceptable risk.

Conversely, a proposed connector should be rejected or redesigned if penetration testing, authorization testing, semantic reconciliation, failure testing, or operational evidence demonstrates unacceptable disclosure, authority escalation, incorrect evidence, uncontrolled resource use, or inability to disable/revoke the integration.

## Review conclusion

**Conclusion: PASS.**

The chapter is suitable for the current book scope after three review passes. Its central contribution is to make connector architecture a first-class authority and evidence boundary between AI systems and enterprise capabilities, while avoiding the unsupported claim that any particular connector technology is inherently secure or universally optimal.

The chapter should be revisited when major connector/tool protocols, identity standards, or AI-agent security guidance materially change.
