# Chapter 25 — Iteration 2 Adversarial Review

## Review question

Can the connector architecture accidentally become an unbounded authority bridge between a probabilistic AI system and enterprise systems?

The answer is **yes**, unless capability, identity, authorization, data scope, execution semantics, and recovery behavior are explicitly controlled.

## 1. Adversarial scenario: model requests an unauthorized resource

**Failure path:**

```text
Prompt / retrieved content
        ↓
Model proposes tool call
        ↓
Connector executes with broad service credential
        ↓
Unauthorized portfolio data returned
```

**Required architectural property:** the connector path must independently enforce resource authorization. Model output is an input to policy evaluation, not the policy decision itself.

## 2. Adversarial scenario: user identity is lost

If the connector replaces user authority with a broad service identity, a request initiated by a user with narrow permissions may execute with broader permissions than the user possesses.

The review question is therefore:

> What authority is actually represented at the downstream system?

A system must be able to distinguish user-delegated authority from service authority where that distinction matters to the security boundary.

## 3. Adversarial scenario: tool description manipulation

A model may receive a description saying that a tool is “safe” or “read-only,” while the underlying implementation has broader behavior.

**Conclusion:** descriptive metadata is not enforcement. The implementation and policy layer must determine actual capability and authority.

## 4. Adversarial scenario: arbitrary HTTP connector

A connector that allows the model to specify arbitrary URLs effectively turns natural-language reasoning into network authority.

Potential consequences include:

- access to unintended internal services;
- exfiltration paths;
- SSRF-like behavior;
- uncontrolled third-party API calls;
- bypass of intended API contracts.

**Recommendation:** use explicit destination and capability allowlists where arbitrary network access is not a stated requirement.

This is an architecture recommendation, not a claim that every HTTP connector must use a static allowlist.

## 5. Adversarial scenario: arbitrary SQL connector

An arbitrary SQL connector can collapse several architecture boundaries:

```text
AI intent
   ↓
SQL generation
   ↓
Database authority
   ↓
Enterprise data
```

The resulting risks include excessive data access, expensive queries, semantic ambiguity, and weak resource-level authorization.

A governed query service or capability-specific data API may provide a more constrained boundary where the use case permits it.

## 6. Adversarial scenario: state-changing retry

```text
Agent
 ↓
create/update operation
 ↓
timeout
 ↓
retry
 ↓
duplicate state change
```

The connector must know whether the operation is safe to retry. A generic retry policy is not sufficient for consequential operations.

## 7. Adversarial scenario: connector output poisoning

A downstream system can be internally authenticated yet still return stale, malformed, incomplete, or semantically unsuitable data.

The connector should preserve source metadata and validate expected structure and scope where required.

This does **not** imply that enterprise systems are untrustworthy. It means transport authentication is not equivalent to analytical validity.

## 8. Adversarial scenario: hidden data expansion

A connector initially returns a small payload, but later adds fields without evaluating downstream consequences.

For AI systems this can silently expand:

- model context;
- embeddings;
- logs;
- cached data;
- exposure to downstream tools.

Therefore connector schema evolution should be treated as a data-contract and security concern, not only a compatibility concern.

## 9. Adversarial scenario: connector compromise

A compromised connector implementation may possess legitimate downstream credentials.

The architecture should therefore consider:

- narrow credentials;
- runtime isolation where warranted;
- independent authorization;
- secret rotation/revocation;
- software supply-chain controls;
- auditability;
- rapid disablement.

The connector should not be treated as trusted merely because it runs inside the enterprise environment.

## 10. MCP-specific adversarial review

The official MCP 2026-07-28 specification introduces substantial protocol changes and authorization hardening. citeturn0search1

That does not change the core architecture rule:

> A protocol can transport capability and authorization information; it does not automatically establish that the downstream enterprise action is appropriate.

MCP should therefore be reviewed at three layers:

```text
Protocol semantics
        ↓
MCP implementation / server
        ↓
Enterprise resource authorization
```

A security review that stops at protocol conformance is incomplete.

## 11. Connector registry as a hidden control plane

A connector registry is not merely documentation if it determines which tools are discoverable or executable.

If registry metadata controls availability, it becomes part of the authority/control plane and should have:

- ownership;
- change control;
- authorization;
- audit;
- versioning;
- disablement capability.

## 12. Cross-chapter consistency

The connector architecture must preserve the following chain:

```text
Ch.19 Security
      ↓
Ch.20 Identity / Authorization
      ↓
Ch.21 Data Protection
      ↓
Ch.22 AI Threats
      ↓
Ch.23 Integration
      ↓
Ch.24 API
      ↓
Ch.25 Connector
```

The connector does not replace any of those layers. It composes them.

## 13. Final adversarial verdict

The chapter's central recommendation survives adversarial review:

> **Expose capability deliberately, carry authority explicitly, enforce authorization outside the model, preserve data meaning across the boundary, and make consequential connector actions observable and recoverable.**

The principal remaining work is editorial consistency with the final chapter text and evidence references.

**Status:** Adversarial review passed with the above constraints.
