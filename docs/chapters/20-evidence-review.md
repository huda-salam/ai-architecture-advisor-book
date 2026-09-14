# Evidence Review — Chapter 20: Identity & Access Control

## 1. Review Objective

This review tests Chapter 20 against authoritative identity, authorization, Zero Trust, and protocol sources. The objective is to distinguish established technical facts from architecture recommendations and scenario-specific inference.

The review also applies the Chapter 19 hardening standard: a security principle is not treated as a guarantee, and a recommended architecture is not presented as if it were a universal requirement.

## 2. Primary Sources

- [NIST SP 800-207 — Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
- [NIST SP 800-207A — Zero Trust Architecture Model for Access Control in Cloud-Native Applications in Multi-Cloud Environments](https://csrc.nist.gov/pubs/sp/800/207/a/final)
- [NIST SP 800-162 — Guide to Attribute Based Access Control](https://csrc.nist.gov/pubs/sp/800/162/upd2/final)
- [NIST SP 800-63-4 — Digital Identity Guidelines](https://csrc.nist.gov/pubs/sp/800/63/4/final)
- [NIST SP 800-63A-4 — Identity Proofing and Enrollment](https://csrc.nist.gov/pubs/sp/800/63/a/4/final)
- [NIST SP 800-63B-4 — Authentication and Authenticator Management](https://csrc.nist.gov/pubs/sp/800/63/b/4/final)
- [NIST SP 800-63C-4 — Federation and Assertions](https://csrc.nist.gov/pubs/sp/800/63/c/4/final)
- [NIST RBAC glossary / RBAC material](https://csrc.nist.gov/glossary/term/role_based_access_control)
- [NIST Zero Trust Architecture project glossary](https://pages.nist.gov/zero-trust-architecture/glossary.html)
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

### RBAC

**Claim:** RBAC controls access through organizational roles associated with permissions.

**Status:** Fact.

**Basis:** NIST's RBAC glossary and RBAC publications. RBAC is an established access-control model; it is not merely a convenient enterprise convention.

### ABAC

**Claim:** ABAC evaluates attributes associated with subjects, objects, requested operations, and potentially environmental conditions against policy.

**Status:** Fact.

**Basis:** NIST SP 800-162.

### Policy Decision and Enforcement

**Claim:** A policy decision component and a policy enforcement component can be separated, with the enforcement point enforcing an access decision against a protected resource.

**Status:** Fact / established access-control architecture terminology.

**Basis:** NIST SP 800-162 and NIST Zero Trust Architecture materials define PDP/PEP concepts. The exact deployment topology may be centralized, distributed, or hybrid.

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

This does **not** mean an LLM can never participate in an authorization workflow. It means that a model-generated statement such as “the user is allowed to see this” should not itself be treated as the authoritative enforcement event for a consequential access boundary.

### Retrieval-Time Authorization

**Claim:** RAG authorization should be applied before protected information is supplied to the model.

**Status:** Architecture recommendation / inference.

**Reasoning:** If retrieval can access data that the user is not authorized to receive, filtering only after model context construction creates an unnecessary exposure path. The recommendation applies ordinary resource authorization principles to the retrieval pipeline.

The exact implementation may vary: resource-level filtering, policy-aware retrieval, authorization-aware indexes, downstream authorization, or combinations may be appropriate.

### Agent Authority

**Claim:** An agent should have bounded authority and should not automatically receive unrestricted permissions from its hosting service.

**Status:** Architecture recommendation.

**Reasoning:** This follows least-privilege and resource-authorization principles. The exact delegation mechanism is implementation-dependent.

### Privilege Propagation

**Claim:** Replacing a narrow user context with a broad service identity can create privilege amplification.

**Status:** Architectural inference.

**Reasoning:** If the downstream resource authorizes based only on the broad service identity, the user's narrower entitlement may no longer constrain the operation. This is a logical consequence of authorization context, not a claim that every service identity is unsafe.

### Multiple Enforcement Layers

**Claim:** Material portfolio or tenant boundaries may justify enforcement at more than one layer.

**Status:** Architecture recommendation.

**Reasoning:** Defense in depth can reduce the consequence of a failure in one enforcement layer, but duplicating policy also creates consistency and operational risks. Therefore the chapter should not imply that “more controls” automatically means “more secure.” The appropriate number of layers depends on threat, impact, architecture, and operational capability.

## 5. Adversarial Review

The architecture was challenged under the assumption that the model or agent can behave maliciously or incorrectly.

### Scenario A — Compromised Model

Assume the model attempts to retrieve Company B data after the user is authorized only for Company A.

**Required property:** the model's instruction or output cannot itself cross the authorization boundary.

### Scenario B — Privilege Amplification

Assume the user has narrow access but the downstream integration service has broad portfolio-wide access.

**Required property:** the downstream authorization path must not silently replace the user's narrower authority with a materially broader one.

### Scenario C — Prompt Injection

Assume retrieved content contains instructions telling the agent to ignore its authorization policy.

**Required property:** authorization remains enforced by trusted components rather than by the model's interpretation of retrieved text.

### Scenario D — Agent Tool Abuse

Assume the agent attempts an ERP write operation when its intended role is read-only research.

**Required property:** tool/API authorization denies the operation regardless of the model's reasoning or claimed user intent.

### Scenario E — Stale Authorization

Assume a user's portfolio assignment is revoked while an AI session remains active.

**Required property:** the architecture defines how authorization context expires, is refreshed, or is re-evaluated. A login event alone is not evidence that authorization remains valid indefinitely.

### Scenario F — Replay or Delegation Abuse

Assume a delegated token or assertion is captured and replayed outside its intended audience or lifetime.

**Required property:** the chosen identity/delegation mechanism includes appropriate audience, lifetime, replay, revocation, and transport protections for the threat model.

These scenarios are review tests, not claims that every implementation will experience each failure mode.

## 6. Important Non-Claims

The chapter deliberately does **not** claim that:

- RBAC is always better than ABAC;
- ABAC is always more secure than RBAC;
- relationship-based authorization is universally required;
- one authorization model fits every enterprise;
- every microservice needs a separate identity regardless of context;
- Zero Trust requires a particular vendor product;
- private networking provides sufficient authorization;
- OAuth is mandatory for every architecture;
- human approval alone guarantees safe AI action;
- retrieval-time authorization has one universally correct implementation;
- a centralized policy engine is always superior to distributed authorization;
- short-lived tokens eliminate all identity risk;
- workload identity by itself guarantees least privilege;
- multiple authorization layers automatically improve security;
- a service identity is inherently unsafe merely because it is non-human;
- an agent must always have a distinct technical identity from its hosting workload.

## 7. AI-IDSS-Specific Reasoning

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

## 8. Evidence Quality

| Topic | Evidence quality | Reason |
|---|---|---|
| Zero Trust identity/resource principles | High | NIST SP 800-207 |
| Service/application identity | High | NIST SP 800-207A |
| RBAC definition | High | NIST RBAC material |
| ABAC definition | High | NIST SP 800-162 |
| PDP/PEP concepts | High | NIST SP 800-162 / Zero Trust materials |
| Digital identity lifecycle | High | NIST SP 800-63-4 series |
| OAuth security practices | High | IETF RFC 9700 |
| Model outside authorization enforcement | High conceptual basis, architecture recommendation | Derived from applying resource authorization principles |
| Retrieval-time authorization | Moderate-to-high architectural basis | Application of resource authorization to RAG |
| Agent delegated authority | Moderate-to-high architectural basis | Least privilege + delegated authorization reasoning |
| Universal choice of RBAC/ABAC | Low | Context dependent; no universal winner |

## 9. Advisor Review Checklist

Before approving an AI architecture, verify:

- Is the authoritative identity source known?
- Is authentication separated from authorization?
- Are human and workload identities distinguishable where required?
- Is agent authority explicit?
- Can privilege expand as a request moves downstream?
- Are portfolio and tenant boundaries enforced by trusted systems?
- Does retrieval enforce access eligibility before model inference where the data is protected?
- Do downstream APIs perform their own required authorization?
- Are credentials scoped, time-bounded, and revocable as appropriate to the threat model?
- Can consequential operations be attributed to a principal and actor?
- Can an agent operate outside its intended tool scope?
- Can authorization become stale during a long-running session?
- Can a captured credential or assertion be replayed outside its intended scope?
- Can an administrator bypass normal controls, and is that path governed and audited?
- Is there any policy enforcement point that can be bypassed by calling the protected resource through another path?

## 10. Falsifiability

The chapter's recommendations should be revised if credible evidence demonstrates that an alternative design provides equivalent or stronger authorization assurance with materially lower complexity and operational risk.

Examples:

- A simpler RBAC model demonstrably satisfies the actual access boundary.
- A downstream enterprise system already provides strong resource-level authorization that makes a duplicate policy layer unnecessary.
- A standards-based delegation mechanism provides stronger authority confinement than the proposed custom mechanism.
- Testing reveals that the proposed identity propagation creates unacceptable failure or availability risks.
- A simpler enforcement topology provides the same security property with fewer policy synchronization points.

## 11. Editorial Corrections Required by This Review

1. Treat RBAC as an established access-control model, not merely an example.
2. Treat PDP/PEP/PIP/PAP terminology as established access-control architecture concepts while making clear that the topology is not universally prescribed.
3. Avoid wording that implies every workload or agent must have a separate identity in every implementation.
4. Avoid treating retrieval-time authorization as a formal universal standard; it is an architecture recommendation derived from resource authorization.
5. Avoid treating human approval, short-lived credentials, private networking, or workload identity as standalone guarantees.
6. Make stale authorization and policy-bypass paths explicit review concerns.
7. Preserve the distinction between the **principal** whose authority is being exercised and the **technical actor** performing the operation.

## 12. Bottom Line

Identity architecture for AI systems is not primarily about selecting an IAM product. It is about preserving bounded authority across a chain of human users, services, agents, tools, and resources.

The advisor should therefore ask:

> **Who is acting, on whose authority, against which resource, for which operation, and where is that authority enforced?**

That question is the practical security boundary for AI-IDSS.