# Chapter 20 — Identity & Access Control

## 20.1 Why Identity Becomes More Important in AI Systems

In a conventional application, identity and access control determine who may access a resource. In an AI system, the same question becomes more complex because a single request may traverse an application, orchestrator, retrieval service, model provider, agent, and enterprise tools.

The architecture question is therefore not simply:

> “Who is the user?”

It is:

> **“Who is acting, on whose authority, against which resource, for which operation, under which policy, and where is that authority actually enforced?”**

This distinction matters directly to AI-IDSS. A system may correctly authenticate an investment professional and still be insecure if an agent subsequently exercises a broader service authority than the user was entitled to use.

NIST Zero Trust Architecture distinguishes authentication from authorization and rejects implicit trust based solely on network location. NIST's cloud-native Zero Trust guidance also addresses application and service identities. [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final) · [NIST SP 800-207A](https://csrc.nist.gov/pubs/sp/800/207/a/final)

## 20.2 Identity, Authentication, Authorization, Delegation, and Audit

These concepts should not be collapsed into a generic term such as “IAM.”

| Concept | Question | Example |
|---|---|---|
| Identity | Who or what is this? | RD user, service, agent |
| Authentication | How was the identity established? | Enterprise authenticator, federation, workload credential |
| Authorization | What may this actor do? | Read Company A financials |
| Delegation | Whose authority is being exercised? | Agent acts for RD within a defined scope |
| Audit | What happened? | Principal X, actor Y, accessed resource Z |

NIST SP 800-63-4 addresses digital identity, authentication, federation, authenticators, and related assertions. It supersedes SP 800-63-3. [NIST SP 800-63-4](https://csrc.nist.gov/pubs/sp/800/63/4/final)

The practical consequence is straightforward:

> **Successful authentication does not imply permission to perform the requested operation.**

## 20.3 Human Identity

Human users should normally enter AI-IDSS through an authoritative enterprise identity system rather than a parallel identity universe created by the AI application.

The architecture should establish, as appropriate:

- a unique user identity;
- authentication assurance appropriate to the use case;
- organizational role and relevant attributes;
- employment or engagement status;
- portfolio, fund, tenant, or business-unit scope where relevant;
- session context;
- authorization state;
- lifecycle state, including suspension and termination.

The exact identity attributes should be driven by the authorization requirements rather than collected simply because the IAM platform can store them.

## 20.4 Authentication Is Not Authorization

A common architectural error is:

> “The user has logged in, therefore the AI may access the data.”

A more accurate chain is:

**Identity → Authentication → Authorization Context → Policy Decision → Enforcement → Resource Action**

An authenticated investment professional may be permitted to read Company A but not Company B. The model should not become the authority for that boundary merely because a prompt states which company is allowed.

This follows the authentication/authorization distinction in Zero Trust architecture. [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final)

## 20.5 RBAC, ABAC, and Relationship-Based Decisions

### RBAC

Role-Based Access Control associates permissions with organizational roles rather than individual users. NIST documents RBAC as an established access-control model. [NIST RBAC glossary](https://csrc.nist.gov/glossary/term/role_based_access_control)

Example:

`InvestmentAnalyst → read_portfolio_financials`

RBAC can be effective when organizational roles correspond reasonably well to the actual access boundary.

### ABAC

Attribute-Based Access Control evaluates attributes associated with subjects, objects, requested operations, and potentially environmental conditions against policy. [NIST SP 800-162](https://csrc.nist.gov/pubs/sp/800/162/upd2/final)

Example:

```text
subject.role = analyst
subject.fund = Fund-A
resource.company = Company-A
resource.classification = confidential
operation = read
environment.approval = true
```

### Relationship-Based Decisions

Some access decisions depend on relationships, for example:

- user is assigned to Company A;
- user belongs to Investment Team X;
- agent belongs to session Y;
- service is permitted to act for user Z.

The architecture should choose the least complicated authorization model that expresses the real security boundary.

**RBAC is not automatically weaker than ABAC, and ABAC is not automatically more secure than RBAC.** A poorly governed complex policy model can create its own operational risk.

## 20.6 Resource-Level Authorization

Authorization should be enforced by a trusted path that protects the resource or the operation leading to the resource.

For AI-IDSS, the relevant boundary may exist at several levels:

- portfolio company;
- fund;
- document;
- database row;
- API operation;
- tool function;
- investment workflow;
- data classification;
- action severity.

A single broad “AI user” identity may therefore be inappropriate when materially different resource boundaries exist.

This is an architecture recommendation, not a claim that every system must implement authorization at every listed level.

## 20.7 Service and Workload Identity

Enterprise AI platforms contain non-human actors such as:

- API gateways;
- orchestration services;
- retrieval services;
- embedding services;
- model-serving services;
- agent runtimes;
- integration services.

NIST SP 800-207A addresses application and service identities in cloud-native environments. [NIST SP 800-207A](https://csrc.nist.gov/pubs/sp/800/207/a/final)

The architecture should give security-relevant actors sufficiently distinguishable and appropriately scoped identities **where that distinction contributes to the required security boundary**.

Do not turn “one identity per component” into an unconditional rule. Identity proliferation can itself increase administrative and policy complexity.

A useful policy might be:

> Retrieval service may read approved knowledge resources but may not write to ERP.

This is preferable to trusting a workload merely because it resides inside a private network.

## 20.8 Workload Credential Lifecycle

A workload identity is useful only if its credentials and authority are properly managed.

The advisor should ask:

1. How does the workload prove its identity?
2. Where are credentials issued?
3. What is their intended lifetime?
4. How are they rotated or revoked?
5. What resources can the identity access?
6. Can one compromised workload impersonate another?
7. Can the credential be used outside its intended audience?

Avoid embedding long-lived privileged credentials in application configuration, source code, prompts, notebooks, or agent definitions.

The objective is not merely “passwordless.” It is **bounded and attributable authority**.

## 20.9 Agent Identity

An AI agent should not automatically inherit unrestricted authority from the service that hosts it.

A useful conceptual model is:

**Human principal → approved session → agent/actor context → constrained tool authorization**

The agent can reason about what it wants to do. A trusted authorization mechanism decides whether the operation is permitted.

For example:

`RD → AI-IDSS → Research Agent → market-data.read`

may be permitted while:

`RD → AI-IDSS → Research Agent → portfolio-company.erp.write`

is denied.

The chapter does **not** require every implementation to create a technically separate identity for every agent. The required distinction depends on the security boundary and the capabilities of the underlying platform.

## 20.10 Delegated Authorization

Delegation answers:

> When an agent acts for a user, is the downstream system seeing the user's authority, the agent's authority, or an uncontrolled combination of both?

A useful conceptual model is:

```text
Principal = user
Actor = agent/service
Resource = enterprise system
Operation = requested action
Delegation scope = explicitly constrained permissions
```

The actor should not be able to manufacture stronger authority merely by claiming that the user authorized it.

OAuth 2.0 is one established protocol family for delegated authorization, and RFC 9700 documents current OAuth 2.0 security best practices. [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700)

OAuth is not mandatory for every architecture; the protocol should follow the actual federation and delegation requirements.

## 20.11 Privilege Propagation

One of the most important AI architecture questions is:

> **Does privilege become broader as the request moves downstream?**

Consider:

`RD → AI application → agent → integration service → ERP`

If the RD can read only Company A while the integration service can read every portfolio company, the final operation may be authorized according to the service identity rather than the user's actual scope.

This is an architectural privilege-amplification risk.

The advisor should therefore determine how authorization context is preserved, translated, or intentionally constrained at each trust boundary.

## 20.12 Tenant and Portfolio Isolation

Investment organizations may require isolation between:

- portfolio companies;
- funds;
- regional teams;
- investment vehicles;
- external clients;
- internal confidential projects.

Isolation may involve several mechanisms:

1. identity and authorization;
2. storage/database boundaries;
3. retrieval eligibility and metadata constraints;
4. API authorization;
5. encryption or key boundaries;
6. network segmentation where appropriate;
7. logging and administrative controls.

The advisor should not assume that one layer is sufficient for a material cross-tenant threat. Conversely, duplicating controls does not automatically improve security; inconsistent policy can create new failure modes.

## 20.13 Retrieval-Time Authorization

RAG introduces a specific identity problem: a document may exist in an index while still being unauthorized for a particular user.

Therefore the architecture should determine document eligibility **before protected information becomes model context**, where the resource and threat model require that boundary.

Conceptually:

`User identity → authorization context → eligible corpus → retrieval → context assembly → model`

The model should not receive a protected document merely because retrieval found it.

Possible implementations include metadata constraints, policy-aware retrieval, separate indexes, resource-level authorization, or combinations. No single retrieval mechanism is universally required.

Retrieval authorization is also not the entire security boundary. Cached responses, conversation history, logs, embeddings, exports, tool outputs, and administrative paths require separate analysis.

## 20.14 Identity Context Across APIs

When a request crosses an API boundary, the receiving system needs trusted information sufficient to make its authorization decision.

Relevant context may include:

- subject/principal identity;
- actor/service identity;
- delegated authority, if any;
- audience/resource;
- requested operation;
- tenant or scope;
- credential/assertion lifetime;
- correlation identifier;
- relevant policy attributes.

Do not assume that an arbitrary caller-supplied header is trustworthy authorization evidence.

The receiving system should establish the provenance and trustworthiness of the security context it uses for its own decision.

## 20.15 Credential and Token Lifecycle

The advisor should examine:

- issuance;
- audience restriction;
- scope restriction;
- expiration;
- rotation;
- revocation;
- secure storage;
- leakage detection;
- replay protections appropriate to the protocol and threat model;
- emergency response.

RFC 9700 is a useful baseline when OAuth 2.0 is used. [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700)

A short-lived credential can reduce exposure, but it does not by itself eliminate replay, authorization, endpoint, or credential-theft risks.

## 20.16 Policy Decision and Enforcement

Access-control architectures commonly distinguish policy decision from policy enforcement.

- **Policy Decision Point (PDP):** evaluates applicable policy and produces an access decision.
- **Policy Enforcement Point (PEP):** enforces that decision against a protected resource or operation.
- **Policy Information Point (PIP):** supplies attributes or context used in the decision.
- **Policy Administration Point (PAP):** manages policy.

NIST materials define PDP/PEP concepts in access-control architecture. [NIST SP 800-162](https://csrc.nist.gov/pubs/sp/800/162/upd2/final) · [NIST Zero Trust Architecture glossary](https://pages.nist.gov/zero-trust-architecture/glossary.html)

These functions do not imply four separate products. They may be centralized, distributed, embedded, or combined depending on architecture.

The important invariant for AI-IDSS is:

> **The authorization decision must have a trusted enforcement path that the model cannot simply bypass.**

## 20.17 Identity in the AI-IDSS Reference Architecture

```text
                         Regional Director / User
                                   │
                         Enterprise Identity
                                   │
                         Authentication / Session
                                   │
                         Authorization Context
                                   │
                              AI-IDSS
                                   │
                         Policy Enforcement
                                   │
                 ┌─────────────────┴─────────────────┐
                 ↓                                   ↓
              RAG/Data                         AI Models
                 │                                   │
                 └─────────────────┬─────────────────┘
                                   ↓
                             Agent Runtime
                                   │
                         Delegated Authorization
                                   │
                         Tool / API Gateway
                                   │
                    Resource-Level Authorization
                                   │
                    ┌──────────────┼──────────────┐
                    ↓              ↓              ↓
                  ERP        Market Data     Other Systems

Cross-cutting:
Identity · Policy · Credential Lifecycle · Audit · Monitoring
```

The critical property is not the number of identity products. It is the ability to explain **which principal is authorized to perform each consequential operation and where that authorization is enforced**.

## 20.18 Example: Portfolio Company Access

Suppose an investment professional asks:

> “Summarize the latest financial condition of Company A.”

A defensible path is:

1. Authenticate the user.
2. Establish the user's relevant portfolio/fund scope.
3. Determine whether Company A is within that scope.
4. Authorize retrieval against eligible Company A data.
5. Retrieve only authorized records.
6. Pass evidence to the model.
7. Produce a response with provenance where required.
8. Record the security-relevant access event.

If the agent subsequently calls an ERP API, authorization must be evaluated for that operation as well.

The fact that the initial request was authorized does not automatically authorize every tool the agent may discover.

## 20.19 Example: Privilege Escalation Failure

**Bad design:**

`User → AI application → generic_service_account → all ERP data`

The application may attempt to filter the response afterward.

**Why this is weak:**

The generic service identity has already crossed a data boundary with excessive authority. A prompt-level filter or post-processing rule is not equivalent to resource-level authorization.

**Preferred direction:**

`User → constrained authorization context → agent → narrowly scoped tool/API → authorized resource`

The exact implementation can vary; the architectural objective is bounded and attributable authority.

## 20.20 Adversarial Identity Scenarios

### Compromised model

Assume the model produces arbitrary instructions. Can it cause an unauthorized resource operation without the authorization layer permitting it?

### Prompt injection

Assume retrieved content instructs the agent to ignore its policy. Does the protected resource remain independently guarded?

### Stale authorization

Assume a user's portfolio assignment is revoked while a session remains active. How and when is authorization re-evaluated?

### Tool-path bypass

Assume the intended path is `Agent → PEP → ERP`, but another integration API can reach ERP without the PEP. Is that alternative path protected?

### Delegation replay

Assume a delegated credential is captured. Are audience, scope, lifetime, revocation, and replay protections appropriate to the threat model?

### Administrator bypass

Assume a privileged administrator can bypass ordinary controls. Is the exceptional path appropriately constrained, justified, and audited?

These are review tests, not claims that every architecture will experience every scenario.

## 20.21 Common Identity Anti-Patterns

### 1. One shared superuser

All AI components use one broad credential.

### 2. Model-controlled authorization

The LLM decides whether a user is allowed to access a resource.

### 3. Prompt-only access control

The application says “never reveal Company B data” while the retrieval layer can retrieve it.

### 4. Implicit privilege inheritance

An agent automatically receives every permission of its hosting service.

### 5. Static long-lived credentials

Privileged secrets are embedded in configuration and rarely rotated.

### 6. Network location as trust

A workload is trusted because it is inside a private network.

### 7. UI-only authorization

The interface hides an operation while the underlying API accepts it.

### 8. Unbounded delegation

An agent receives broad permissions for convenience.

### 9. Unclear tenant boundary

Portfolio-company separation exists only as a prompt or naming convention.

### 10. Unattributable actions

Logs show that “AI” performed an operation without identifying the relevant principal, actor, resource, operation, and outcome.

### 11. Bypassable enforcement point

The documented authorization path exists, but another reachable technical path reaches the same protected resource without equivalent enforcement.

### 12. Authorization staleness

A session retains permissions after the underlying business authorization has materially changed without a defined re-evaluation mechanism.

## 20.22 Technical Challenge Questions

When reviewing an AI architecture, ask:

1. What is the authoritative identity source?
2. How is the human user authenticated?
3. How are service identities established?
4. Which actors require distinguishable identities, and why?
5. Where is authorization actually enforced?
6. Can the model bypass authorization?
7. Can an agent obtain broader permissions than the principal delegated?
8. How is delegated authority represented?
9. How is portfolio-company isolation enforced?
10. Does protected retrieval respect authorization before context reaches the model?
11. Does every consequential downstream API enforce the required authorization?
12. What is the maximum privilege of each security-relevant service identity?
13. How are credentials rotated and revoked?
14. What happens when an employee leaves or changes portfolio assignment?
15. What happens when an agent is compromised?
16. Can a captured credential be replayed outside its intended scope?
17. Can the AI application reach a protected resource through an alternate path that bypasses policy enforcement?
18. Can an administrator bypass normal controls, and is that path governed and audited?
19. Can the organization reconstruct who caused a consequential action?
20. What evidence demonstrates that authority cannot silently expand across the request chain?

## 20.23 Architecture Review Checklist

### Identity

- [ ] Human identities have an authoritative source.
- [ ] Authentication and authorization are separate concerns.
- [ ] Security-relevant workload identities are distinguishable where needed.
- [ ] Agent authority is explicit where the risk requires it.

### Authorization

- [ ] Permissions are defined at the required resource/action granularity.
- [ ] Least privilege is demonstrable rather than asserted.
- [ ] Tenant and portfolio boundaries are enforced by trusted controls.
- [ ] Downstream services do not silently broaden authority.

### Delegation

- [ ] Delegated authority is explicit.
- [ ] Agent actions are constrained by scope.
- [ ] Tokens/credentials have appropriate lifetime and audience restrictions.
- [ ] Revocation and emergency response are defined where required.

### Enforcement

- [ ] Authorization is enforced outside the model.
- [ ] APIs enforce authorization rather than relying on UI behavior.
- [ ] Protected retrieval respects authorization before model context assembly.
- [ ] Tool invocation is subject to appropriate policy enforcement.
- [ ] Alternate paths to consequential resources have been reviewed.

### Lifecycle

- [ ] Material authorization changes can become effective during active sessions.
- [ ] Credential rotation/revocation is operationally tested.
- [ ] Privileged and break-glass access is governed.

### Auditability

- [ ] Principal, actor, resource, operation, and outcome can be correlated where required.
- [ ] Consequential operations are attributable.
- [ ] Administrative and exceptional access is logged appropriately.

## 20.24 Evidence Discipline

### Fact

NIST Zero Trust Architecture distinguishes authentication from authorization and rejects implicit trust based solely on network location. [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final)

### Fact

NIST SP 800-207A addresses application and service identities in cloud-native access-control architectures. [NIST SP 800-207A](https://csrc.nist.gov/pubs/sp/800/207/a/final)

### Fact

NIST documents RBAC as an established access-control model. [NIST RBAC glossary](https://csrc.nist.gov/glossary/term/role_based_access_control)

### Fact

NIST SP 800-162 defines ABAC and includes PDP/PEP concepts in its access-control architecture. [NIST SP 800-162](https://csrc.nist.gov/pubs/sp/800/162/upd2/final)

### Fact

NIST SP 800-63-4, published in 2025, covers digital identity, authentication, and federation and supersedes SP 800-63-3. [NIST SP 800-63-4](https://csrc.nist.gov/pubs/sp/800/63/4/final)

### Technical Evidence

RFC 9700 is an IETF Best Current Practice for OAuth 2.0 security. [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700)

### Recommendation

For AI-IDSS, keep consequential authorization enforcement outside probabilistic model behavior and require bounded, attributable authority for agents and tools.

This is an architectural recommendation derived from established access-control principles; it is not a claim that NIST mandates one universal AI authorization architecture.

### Inference

A broad downstream service identity can amplify privilege when it replaces a narrower authorization context without an equivalent constraint.

### Uncertainty

No single access-control model is universally optimal. RBAC, ABAC, relationship-based approaches, and combinations can be appropriate depending on organizational complexity, resource granularity, policy volatility, threat model, and operational capability.

## 20.25 What Would Change Our Mind?

The advisor should revise an identity architecture when evidence shows that:

- a simpler authorization model satisfies the real security boundary;
- the proposed identity propagation creates unnecessary complexity without reducing material risk;
- a downstream system already provides stronger resource-level authorization than the proposed duplicate layer;
- measured operational failures make the chosen policy model unreliable;
- a standards-based delegation mechanism provides materially stronger assurance;
- new threat evidence demonstrates an unaddressed privilege-escalation path;
- an alternative topology provides equivalent security properties with fewer synchronization or bypass risks.

The test is not whether the architecture uses a fashionable IAM technology. The test is whether authority is **explicit, bounded, enforceable, attributable, and maintainable**.

## 20.26 Field Rule

> **Never ask only “Who is logged in?” Ask “Who is acting, on whose authority, against which resource, for which operation, and where is that authority enforced?”**

For AI-IDSS, identity is not merely a login feature. It is the mechanism that connects human accountability to machine action without allowing authority to expand invisibly as the request moves through the architecture.