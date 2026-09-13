# Evidence Review — Chapter 20: Identity & Access Control

## 1. Review Objective

This review tests Chapter 20 against authoritative identity, authorization, Zero Trust, and protocol sources. The objective is to distinguish established technical facts from architecture recommendations and scenario-specific inference.

## 2. Primary Sources

- [NIST SP 800-207 — Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
- [NIST SP 800-207A — Zero Trust Architecture Model for Access Control in Cloud-Native Applications in Multi-Cloud Environments](https://csrc.nist.gov/pubs/sp/800/207/a/final)
- [NIST SP 800-162 — Guide to Attribute Based Access Control](https://csrc.nist.gov/pubs/sp/800/162/upd2/final)
- [NIST SP 800-63-4 — Digital Identity Guidelines](https://csrc.nist.gov/pubs/sp/800/63/4/final)
- [NIST SP 800-63A-4 — Identity Proofing and Enrollment](https://csrc.nist.gov/pubs/sp/800/63/a/4/final)
- [NIST SP 800-63B-4 — Authentication and Authenticator Management](https://csrc.nist.gov/pubs/sp/800/63/b/4/final)
- [NIST SP 800-63C-4 — Federation and Assertions](https://csrc.nist.gov/pubs/sp/800/63/c/4/final)
- [RFC 9700 — Best Current Practice for OAuth 2.0 Security](https://www.rfc-editor.org/rfc/rfc9700)

## 3. Claim Classification

### Identity, Authentication, Authorization

**Claim:** Authentication and authorization are distinct functions in Zero Trust.

**Status:** Fact.

**Basis:** NIST SP 800-207 explicitly distinguishes authentication and authorization and rejects implicit trust based solely on network location.

### Service and Application Identity

**Claim:** Cloud-native Zero Trust architectures can use application and service identities in addition to user identities.

**Status:** Fact.

**Basis:** NIST SP 800-207A.

### ABAC

**Claim:** ABAC evaluates attributes associated with subjects, objects, requested operations, and potentially environmental conditions against policy.

**Status:** Fact.

**Basis:** NIST SP 800-162.

### Digital Identity

**Claim:** NIST SP 800-63-4 covers identity proofing, authentication, federation, authenticators, and related assertions.

**Status:** Fact.

**Basis:** NIST SP 800-63-4 and its 2025 companion documents.

### OAuth Security

**Claim:** RFC 9700 is an IETF Best Current Practice for OAuth 2.0 security.

**Status:** Fact.

**Basis:** RFC 9700.

## 4. Architecture Recommendations

### Model Is Not an Authorization Engine

**Claim:** The LLM should not be the primary enforcement mechanism for access control.

**Status:** Architecture recommendation.

**Reasoning:** Authorization decisions should be enforced by components capable of reliably applying explicit policy. NIST Zero Trust establishes resource-oriented authentication and authorization; applying this principle to an LLM system leads to keeping consequential authorization outside probabilistic model behavior.

### Retrieval-Time Authorization

**Claim:** RAG authorization should be applied before protected information is supplied to the model.

**Status:** Architecture recommendation / inference.

**Reasoning:** If retrieval can access data that the user is not authorized to receive, filtering only after model context construction creates an unnecessary exposure path. The recommendation applies ordinary resource authorization principles to the retrieval pipeline.

### Agent Authority

**Claim:** An agent should have bounded authority and should not automatically receive unrestricted permissions from its hosting service.

**Status:** Architecture recommendation.

**Reasoning:** This follows least-privilege and resource-authorization principles. The exact delegation mechanism is implementation-dependent.

### Privilege Propagation

**Claim:** Replacing a narrow user context with a broad service identity can create privilege amplification.

**Status:** Architectural inference.

**Reasoning:** If the downstream resource authorizes based only on the broad service identity, the user's narrower entitlement may no longer constrain the operation. This is a logical consequence of authorization context, not a claim that every service identity is unsafe.

## 5. Important Non-Claims

The chapter deliberately does **not** claim that:

- RBAC is always better than ABAC;
- ABAC is always more secure than RBAC;
- one authorization model fits every enterprise;
- every microservice needs a separate identity regardless of context;
- Zero Trust requires a particular vendor product;
- private networking provides sufficient authorization;
- OAuth is mandatory for every architecture;
- human approval alone guarantees safe AI action;
- retrieval-time authorization has one universally correct implementation;
- a centralized policy engine is always superior to distributed authorization;
- short-lived tokens eliminate all identity risk;
- workload identity by itself guarantees least privilege.

## 6. AI-IDSS-Specific Reasoning

The AI-IDSS architecture introduces an important chain:

`Human → AI application → Agent → Tool/API → Enterprise resource`

Each transition creates a potential authority boundary.

The key review question is therefore:

> Can the advisor reconstruct the authorization basis for every consequential operation?

A defensible architecture should make it possible to determine at least:

- the human principal, where applicable;
- the service or agent acting;
- the resource accessed;
- the operation requested;
- the authorization scope;
- the enforcement point;
- the outcome;
- the audit correlation.

This is a design objective rather than a claim that all organizations must expose identical audit fields.

## 7. Evidence Quality

| Topic | Evidence quality | Reason |
|---|---|---|
| Zero Trust identity/resource principles | High | NIST SP 800-207 |
| Service/application identity | High | NIST SP 800-207A |
| ABAC definition | High | NIST SP 800-162 |
| Digital identity lifecycle | High | NIST SP 800-63-4 series |
| OAuth security practices | High | IETF RFC 9700 |
| Model outside authorization enforcement | High conceptual basis, architecture recommendation | Derived from applying resource authorization principles |
| Retrieval-time authorization | Moderate-to-high architectural basis | Application of resource authorization to RAG |
| Agent delegated authority | Moderate-to-high architectural basis | Least privilege + delegated authorization reasoning |
| Universal choice of RBAC/ABAC | Low | Context dependent; no universal winner |

## 8. Advisor Review Checklist

Before approving an AI architecture, verify:

- Is the authoritative identity source known?
- Is authentication separated from authorization?
- Are human and workload identities distinguishable?
- Is agent authority explicit?
- Can privilege expand as a request moves downstream?
- Are portfolio and tenant boundaries enforced by trusted systems?
- Does retrieval enforce access eligibility before model inference?
- Do downstream APIs perform their own required authorization?
- Are credentials scoped, time-bounded, and revocable?
- Can consequential operations be attributed to a principal and actor?
- Can an agent operate outside its intended tool scope?
- Can an administrator bypass controls, and is that path governed and audited?

## 9. Falsifiability

The chapter's recommendations should be revised if credible evidence demonstrates that an alternative design provides equivalent or stronger authorization assurance with materially lower complexity and operational risk.

Examples:

- A simpler RBAC model demonstrably satisfies the actual access boundary.
- A downstream enterprise system already provides strong resource-level authorization that makes a duplicate policy layer unnecessary.
- A standards-based delegation mechanism provides stronger authority confinement than the proposed custom mechanism.
- Testing reveals that the proposed identity propagation creates unacceptable failure or availability risks.

## 10. Bottom Line

Identity architecture for AI systems is not primarily about selecting an IAM product. It is about preserving bounded authority across a chain of human users, services, agents, tools, and resources.

The advisor should therefore ask:

> **Who is acting, on whose authority, against which resource, for which operation, and where is that authority enforced?**

That question is the practical security boundary for AI-IDSS.