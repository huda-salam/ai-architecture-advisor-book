# Chapter 25 — Iteration 1 Evidence Hardening

## Review scope

This pass hardens Chapter 25 against the book's evidence discipline and dependency chain:

**Chapter 19 Security → Chapter 20 Identity & Access Control → Chapter 21 Data Protection → Chapter 22 AI-Specific Threats → Chapter 23 Integration → Chapter 24 API Architecture → Chapter 25 AI Connectors**

The chapter's central architectural proposition is sound: a connector is not merely connectivity; it is a controlled boundary through which an AI system reaches external data or capabilities.

## 1. Evidence classification

The following distinctions must remain explicit:

- **Technical fact:** a protocol or standard defines a capability.
- **Security evidence:** a framework or taxonomy identifies a risk class.
- **Architecture recommendation:** the advisor recommends a control pattern for a stated context.
- **Inference:** a conclusion derived by applying earlier architecture principles.
- **Assumption:** a scenario proposition used for reasoning, not an established fact.

In particular, the term **connector** is an architectural term used by this book. It should not be presented as a universal industry standard with one canonical implementation.

## 2. Connector boundary

The chapter's strongest architectural point should remain:

> Connectivity does not equal authority.

A connector may translate identity, policy, schemas, errors, and operational behavior, but the connector itself does not automatically become the sole authorization authority.

This is consistent with NIST SP 800-228, which treats API protection as a lifecycle and risk-based control problem and discusses multiple implementation options rather than prescribing one topology. The current final publication includes updates through March 13, 2026. citeturn0search0

## 3. Identity and authorization

Chapter 25 correctly inherits Chapter 20's distinction between authentication, authorization, delegation, and service identity.

The following should remain an architecture recommendation rather than a claimed universal standard:

> Authorization should be enforced by deterministic system components appropriate to the protected resource and operation rather than delegated to an LLM's interpretation of instructions.

The connector can participate in enforcement, but the precise enforcement topology is implementation-dependent.

## 4. Data minimization and semantic preservation

The chapter appropriately connects connector behavior to Chapter 21 data protection and Chapter 13 integration semantics.

Important distinction:

> A technically successful connector call does not establish semantic correctness, freshness, provenance, authorization, or analytical suitability.

This is an architectural inference from the book's data and integration model, not a universal empirical law.

The financial examples should remain explicitly illustrative rather than claims about all accounting systems.

## 5. Tool descriptions are not authorization

Tool metadata can help an orchestrator or model understand available operations, but descriptive text should not be treated as a security boundary.

This follows the same principle established in Chapters 19, 20, 22, and 24: model influence and descriptive metadata must not silently become authority.

## 6. MCP evidence correction

The chapter's MCP section is current in substance but should be date-sensitive.

The official Model Context Protocol maintainers published the **2026-07-28 specification** on July 28, 2026. The release introduced a stateless protocol core, removed the prior session handshake model, added `server/discover`, strengthened authorization, and introduced an extensions framework. citeturn0search1

Therefore the chapter should not describe MCP merely as an earlier-generation tool protocol. It should say that MCP is an open protocol option for connecting AI applications to external tools/resources and that its current 2026-07-28 specification includes substantial protocol and authorization changes.

The current TypeScript SDK documentation identifies v2 as the stable SDK line implementing the 2026-07-28 specification. This is implementation evidence, not proof that every enterprise should adopt MCP. citeturn0search15

## 7. MCP is not a security guarantee

The chapter should retain:

> MCP should be treated as a protocol option, not as synonymous with connector or security.

The existence of protocol-level authorization features does not eliminate the need to examine downstream identity, authorization, data scope, tool authority, secret handling, logging, and enterprise-system controls.

This is an architecture conclusion, not a claim that MCP itself is insecure.

## 8. Third-party connectors

The marketplace/third-party connector discussion should remain framed as due diligence guidance.

Do not claim that marketplace connectors are inherently insecure or that a catalog provides no meaningful assurance. The defensible claim is narrower:

> Listing or distribution through a marketplace does not, by itself, answer all questions about permissions, data handling, dependencies, update paths, operational ownership, or revocation.

## 9. State-changing operations

The chapter appropriately distinguishes read-only from state-changing connector capabilities.

The stronger controls recommended for payments, ERP mutation, access changes, and similar operations are **AI-IDSS architecture recommendations**, not universal requirements for every enterprise.

Likewise, human approval should be treated as a control option whose necessity depends on consequence, authorization model, organizational policy, and system design—not as an absolute requirement for every tool invocation.

## 10. Retry and idempotency

The chapter correctly avoids saying that every connector must use idempotency keys.

The architectural requirement is:

> Consequential operations require explicit duplicate, retry, transaction, and recovery semantics.

Possible mechanisms include idempotency keys, request identifiers, state-transition constraints, deduplication, transactions, or compensating actions.

## 11. Observability and privacy

The chapter's warning that connector telemetry can become a secondary data-exfiltration path is an architecture inference consistent with Chapter 21.

It should not be presented as evidence that logging is inherently dangerous. The appropriate recommendation is to design telemetry according to audit, security, privacy, retention, and operational requirements.

## 12. Cross-chapter consistency

### Chapter 19
Security properties must remain enforced at explicit trust and authority boundaries.

### Chapter 20
Connector identity must preserve the distinction between principal, actor, delegation, authentication, and authorization.

### Chapter 21
Connector payloads, credentials, logs, and cached results fall within data-protection considerations according to their classification and purpose.

### Chapter 22
Connectors are part of the attack path for prompt injection, excessive agency, tool misuse, privilege abuse, and data exposure. The threat model therefore follows the complete path rather than treating the connector package in isolation.

### Chapter 23
Connectors are one implementation component within the broader enterprise integration architecture.

### Chapter 24
Connector invocation should ultimately cross controlled API/service boundaries where those exist; API authorization and connector authorization must not be conflated.

## 13. Important non-claims

Chapter 25 should not imply that:

- connectors are a universally standardized architectural component;
- MCP is required for agentic AI;
- MCP makes tool use secure by itself;
- every connector requires a separate identity;
- every connector requires human approval;
- service identities are inherently unsafe;
- user delegation is always superior;
- database connectors are inherently unsafe;
- APIs are inherently trusted because they are authenticated;
- successful connector responses are automatically authoritative evidence;
- data minimization means returning the smallest possible payload regardless of purpose;
- marketplace distribution establishes security or suitability;
- one connector topology is universally optimal;
- every connector requires the same level of isolation.

## 14. Evidence quality

| Topic | Classification | Confidence |
|---|---|---|
| API protection as lifecycle/risk problem | NIST technical guidance | High |
| Authentication/authorization distinction | Security architecture principle | High |
| Connector as architectural boundary | Book architecture definition | High |
| Minimum capability exposure | Architecture recommendation | High, context dependent |
| Semantic preservation across connector | Architecture inference | High |
| MCP 2026-07-28 specification | Current protocol fact | High, time-sensitive |
| MCP as protocol option rather than security guarantee | Architecture recommendation | High |
| Stronger controls for consequential connector actions | AI-IDSS recommendation | Medium–High |
| Marketplace connector due diligence | Architecture/security recommendation | High |

## 15. What would change our mind?

Revisit this chapter if:

- authoritative protocol specifications materially change connector/tool authorization semantics;
- enterprise integration standards establish a different common abstraction;
- evidence demonstrates that a connector pattern cannot satisfy the required security, semantic, reliability, latency, or cost objectives;
- AI-IDSS moves from decision support toward autonomous execution of consequential enterprise actions.

## Iteration 1 conclusion

Chapter 25 is substantively aligned with the book's security and integration spine. The principal evidence-hardening requirement is to keep MCP claims date-sensitive and to maintain strict separation between protocol capabilities, security evidence, and the advisor's architectural recommendations.

**Status:** Evidence-hardened for Iteration 1; adversarial review still required before finalization.
