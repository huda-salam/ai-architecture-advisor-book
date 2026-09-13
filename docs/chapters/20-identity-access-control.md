# Chapter 20 — Identity & Access Control

## 20.1 Why Identity Becomes More Important in AI Systems

In a conventional application, identity and access control determine who may access a resource. In an AI system, the same question becomes more complex because a single user request may traverse an application, orchestrator, retrieval service, model provider, agent, and enterprise tools.

The architecture question is therefore not simply:

> “Who is the user?”

It is:

> “Who is acting, on whose authority, against which resource, for which operation, under which policy, and how is that authority preserved or reduced as the request crosses system boundaries?”

This distinction matters directly to AI-IDSS. A system may correctly authenticate an RD or investment professional and still be insecure if an agent subsequently uses a broader service identity than the user was entitled to use.

NIST's Zero Trust Architecture treats authentication and authorization as distinct functions and shifts the security focus toward protecting resources rather than trusting network location. NIST's cloud-native Zero Trust guidance further emphasizes application and service identities alongside user identities. [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final) · [NIST SP 800-207A](https://csrc.nist.gov/pubs/sp/800/207/a/final)

## 20.2 Identity, Authentication, Authorization, and Accounting

These concepts must not be collapsed into one generic term such as “IAM.”

| Concept | Question | Example |
|---|---|---|
| Identity | Who or what is this? | RD user, AI service, agent instance |
| Authentication | How was the identity established? | Federated authentication, authenticator, workload credential |
| Authorization | What may this identity do? | Read Company A financials but not Company B |
| Delegation | Whose authority is being exercised? | Agent acts for RD within approved scope |
| Accounting / audit | What happened? | Identity X accessed record Y and invoked tool Z |

NIST SP 800-63-4 addresses identity proofing, authentication, federation, authenticators, and related assertions for digital identities. It supersedes SP 800-63-3. [NIST SP 800-63-4](https://csrc.nist.gov/pubs/sp/800/63/4/final)

For enterprise architecture, the practical lesson is simple: **successful authentication does not imply permission to perform the requested operation.**

## 20.3 Human Identity

Human users normally enter AI-IDSS through an enterprise identity system. The architecture should establish:

- a unique user identity;
- appropriate authentication assurance;
- organizational role and attributes;
- employment or engagement status;
- tenant, portfolio, or business-unit scope where relevant;
- session context;
- authorization policy;
- lifecycle state, including suspension and termination.

The identity layer should preferably be integrated with the organization's authoritative identity source rather than creating a parallel identity universe inside the AI application.

NIST SP 800-63-4 separates identity proofing, authentication, and federation, which is useful when assessing whether an architecture has confused these responsibilities. [NIST SP 800-63-4](https://csrc.nist.gov/pubs/sp/800/63/4/final)

## 20.4 Authentication Is Not Authorization

A common architectural error is:

> “The user has logged in, therefore the AI may access the data.”

The correct chain is closer to:

**Identity → Authentication → Context → Authorization Policy → Resource Decision → Action**

For example, an authenticated investment professional might be permitted to read Company A's financial information but not Company B's confidential information. The model should never be the component that decides this boundary merely because a prompt says which company is allowed.

This is consistent with Zero Trust's explicit distinction between authentication and authorization. [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final)

## 20.5 RBAC, ABAC, and Relationship-Based Decisions

### RBAC

Role-Based Access Control grants permissions through roles.

Example:

`InvestmentAnalyst → read_portfolio_financials`

RBAC is understandable and operationally useful, but coarse roles can become difficult when access depends on company, fund, geography, transaction stage, data classification, or time.

### ABAC

Attribute-Based Access Control evaluates attributes of the subject, object, requested operation, and potentially environmental conditions against policy. NIST SP 800-162 defines ABAC in these terms. [NIST SP 800-162](https://csrc.nist.gov/pubs/sp/800/162/upd2/final)

Example:

`subject.role = analyst`

`subject.fund = Fund-A`

`resource.company = Company-A`

`resource.classification = confidential`

`operation = read`

`environment.approval = true`

The policy engine can then determine whether the operation is permitted.

### Relationship-Based Access

Some systems require decisions based on relationships, such as:

- user is assigned to Company A;
- user is member of Investment Team X;
- agent belongs to session Y;
- service is permitted to act for user Z.

The architecture should choose the least complicated authorization model that expresses the real business security boundary. **RBAC is not automatically inferior to ABAC, and ABAC is not automatically more secure.** Complexity itself becomes an operational risk.

## 20.6 Resource-Level Authorization

Authorization should be enforced close to the protected resource or through a trusted policy enforcement path.

For AI-IDSS, authorization may need to distinguish:

- portfolio company;
- fund;
- document;
- database row;
- API operation;
- tool function;
- investment workflow;
- data classification;
- action severity.

A single “AI user” identity with broad access is therefore a major architectural warning sign.

## 20.7 Service Identity

An enterprise AI platform contains many non-human actors:

- API gateway;
- orchestration service;
- retrieval service;
- embedding service;
- model-serving service;
- agent runtime;
- audit service;
- integration service.

Each security-relevant workload should have a distinguishable identity where practical. NIST SP 800-207A explicitly discusses application and service identities in cloud-native environments. [NIST SP 800-207A](https://csrc.nist.gov/pubs/sp/800/207/a/final)

This enables policies such as:

> Retrieval service may read approved knowledge indexes but may not write to ERP.

rather than:

> The AI platform can access everything because it is inside the trusted network.

## 20.8 Workload Identity

A workload identity represents a running service or workload rather than a human employee.

The architecture should avoid embedding long-lived administrator credentials in application configuration, source code, prompts, notebooks, or agent definitions.

The advisor should ask:

1. How does the workload prove its identity?
2. Where are credentials issued?
3. How long do they remain valid?
4. How are they rotated or revoked?
5. What resources can that identity access?
6. Can one compromised workload impersonate another?

The objective is not merely to remove passwords. It is to establish **bounded, attributable authority**.

## 20.9 Agent Identity

An AI agent should not automatically inherit unrestricted authority from the service that runs it.

A useful model is:

**Human identity → approved session → agent identity → constrained tool authorization**

The agent can reason about what it wants to do, but the authorization system decides whether it may do it.

For example:

`RD → AI-IDSS → Research Agent → market-data.read`

may be permitted, while:

`RD → AI-IDSS → Research Agent → portfolio-company.erp.write`

is denied.

This distinction becomes critical when an agent can invoke tools that change external state.

## 20.10 Delegated Authorization

Delegation answers a difficult question:

> When an agent acts for a user, is the downstream system seeing the user's authority, the agent's authority, or an uncontrolled combination of both?

The architecture should make delegation explicit.

A useful conceptual model is:

`Principal = user`

`Actor = agent`

`Resource = enterprise system`

`Operation = requested action`

`Delegation scope = explicitly constrained permissions`

The agent should not be able to manufacture a stronger identity merely by claiming that the user authorized it.

OAuth 2.0 remains a common protocol family for delegated authorization, and RFC 9700 documents current OAuth 2.0 security best practices, including stronger protections against known attack patterns. [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700)

## 20.11 Privilege Propagation

One of the most important AI architecture questions is:

> Does privilege become broader as the request moves downstream?

Consider:

`RD → AI application → agent → integration service → ERP`

If the RD can read only Company A but the integration service can read every portfolio company, the final operation may be authorized according to the service identity rather than the user's actual scope.

This is **privilege amplification through architecture**.

A sound design should preserve or intentionally constrain authorization context across boundaries rather than silently replacing a narrow user context with a broad machine identity.

## 20.12 Tenant and Portfolio Isolation

Investment organizations may require isolation between:

- portfolio companies;
- funds;
- regional teams;
- investment vehicles;
- external clients;
- internal confidential projects.

Isolation may exist at several layers:

1. identity and authorization;
2. database or storage partitioning;
3. retrieval indexes and metadata filters;
4. API authorization;
5. encryption/key boundaries;
6. network segmentation where appropriate;
7. logging and administrative access.

The advisor should reject architectures that depend on only one layer when the consequence of cross-tenant leakage is material.

## 20.13 Retrieval-Time Authorization

RAG systems introduce a subtle identity problem. A document can be technically present in a vector index while still being unauthorized for a particular user.

Therefore authorization should participate in retrieval, not merely in the final application response.

Conceptually:

`User identity → authorization context → eligible corpus → retrieval → context assembly → model`

The model should not receive documents that the user was never authorized to access merely because the retrieval engine found them.

This is an architectural application of resource authorization to the RAG pipeline, not a claim that a particular retrieval technology is universally required.

## 20.14 Identity Context Across APIs

When a request crosses an API boundary, the receiving service needs enough trusted context to make its own authorization decision.

The architecture should define:

- subject identity;
- service identity;
- delegated authority, if any;
- audience/resource;
- requested operation;
- relevant tenant or scope;
- token or assertion lifetime;
- correlation identifier;
- policy context where appropriate.

Do not assume that a downstream service can safely infer authorization from an arbitrary header supplied by the caller.

## 20.15 Token and Credential Lifecycle

Access tokens and workload credentials should have controlled lifecycles.

The advisor should examine:

- issuance;
- audience restriction;
- scope restriction;
- expiration;
- rotation;
- revocation;
- storage;
- leakage detection;
- replay resistance where required;
- administrative emergency response.

RFC 9700 is a useful current baseline when OAuth 2.0 is part of the architecture. [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700)

## 20.16 Policy Enforcement Points

A policy decision is not useful if no trusted component enforces it.

A practical architecture separates:

- **Policy Decision Point (PDP):** determines whether an operation is allowed.
- **Policy Enforcement Point (PEP):** blocks or permits the operation.
- **Policy Information Point (PIP):** supplies attributes/context where needed.
- **Policy Administration Point (PAP):** manages policy.

The exact terminology can vary by architecture, but the separation is useful for reasoning.

For AI systems, the model is not a substitute for the enforcement point.

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
2. Establish the user's portfolio/fund scope.
3. Determine whether Company A is within that scope.
4. Authorize retrieval against Company A's eligible data.
5. Retrieve only authorized records.
6. Pass evidence to the model.
7. Produce a response with provenance.
8. Record the security-relevant access event.

Now suppose the AI agent decides to call an ERP API. The same authorization question must be evaluated again for that operation.

The fact that the initial user request was authorized does not automatically authorize every tool the agent may discover.

## 20.19 Example: Privilege Escalation Failure

**Bad design:**

`User → AI application → generic_service_account → all ERP data`

The application may filter the response afterward.

**Why this is weak:**

The generic service account has already crossed the data boundary with excessive authority. A prompt-level filter or post-processing rule is not equivalent to resource-level authorization.

**Preferred direction:**

`User → constrained authorization context → agent → narrowly scoped tool/API → authorized resource`

The exact implementation can vary, but the architectural objective is least privilege and attributable authority.

## 20.20 Common Identity Anti-Patterns

### 1. One shared superuser

All AI components use one powerful credential.

### 2. Model-controlled authorization

The LLM decides whether a user is allowed to access a resource.

### 3. Prompt-only access control

The application says “never reveal Company B data” but the underlying retrieval service can retrieve it.

### 4. Implicit privilege inheritance

An agent automatically receives every permission of its hosting service.

### 5. Static long-lived credentials

Secrets are embedded in configuration and rarely rotated.

### 6. Network location as trust

A workload is trusted because it is inside a private network.

### 7. Authorization only at the UI

The user interface hides a button, but the underlying API accepts the operation.

### 8. Unbounded delegation

An agent receives a token with broad permissions for convenience.

### 9. Unclear tenant boundary

Portfolio-company separation exists only as a prompt or naming convention.

### 10. Unattributable actions

Logs show that “AI” performed an operation but not which user, agent, service, policy, and resource were involved.

## 20.21 Technical Challenge Questions

When reviewing an AI architecture, ask:

1. What is the authoritative identity source?
2. How is the human user authenticated?
3. How are service identities established?
4. How are agent identities distinguished from service identities?
5. Where is authorization actually enforced?
6. Can the model bypass authorization?
7. Can an agent obtain broader permissions than the user?
8. How is delegated authority represented?
9. How is portfolio-company isolation enforced?
10. Does retrieval enforce authorization before context reaches the model?
11. Does every downstream API make an appropriate authorization decision?
12. What is the maximum privilege of each service identity?
13. How are credentials rotated and revoked?
14. What happens when an employee leaves?
15. What happens when an agent is compromised?
16. Can one tenant's token be replayed against another tenant?
17. Can the AI application call an API directly without the intended policy layer?
18. Can an administrator bypass normal controls, and is that access audited?
19. Can the organization reconstruct who caused a consequential action?
20. What evidence would demonstrate that privilege cannot silently expand across the request chain?

## 20.22 Architecture Review Checklist

### Identity

- [ ] Human identities have an authoritative source.
- [ ] Authentication and authorization are separate concerns.
- [ ] Service/workload identities are distinguishable.
- [ ] Agent identity is explicit where needed.

### Authorization

- [ ] Permissions are defined at the required resource/action granularity.
- [ ] Least privilege is demonstrable.
- [ ] Tenant and portfolio boundaries are enforced by trusted controls.
- [ ] Downstream services do not silently broaden authority.

### Delegation

- [ ] Delegated authority is explicit.
- [ ] Agent actions are constrained by scope.
- [ ] Tokens/credentials have controlled lifetime and audience.
- [ ] Revocation and emergency response are defined.

### Enforcement

- [ ] Authorization is enforced outside the model.
- [ ] APIs enforce authorization rather than relying on UI behavior.
- [ ] Retrieval authorization occurs before protected data reaches the model.
- [ ] Tool invocation is subject to policy enforcement.

### Auditability

- [ ] User, service, agent, resource, operation, and outcome can be correlated.
- [ ] Consequential operations are attributable.
- [ ] Administrative and exceptional access is logged appropriately.

## 20.23 Evidence Discipline

### Fact

NIST SP 800-207 states that Zero Trust does not grant implicit trust based solely on network location and treats authentication and authorization as distinct functions. [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final)

### Fact

NIST SP 800-207A discusses application and service identities as part of cloud-native access control. [NIST SP 800-207A](https://csrc.nist.gov/pubs/sp/800/207/a/final)

### Fact

NIST SP 800-162 defines ABAC as authorization based on attributes associated with subjects, objects, requested operations, and potentially environmental conditions. [NIST SP 800-162](https://csrc.nist.gov/pubs/sp/800/162/upd2/final)

### Fact

NIST SP 800-63-4, published in 2025, covers identity proofing, authentication, and federation and supersedes SP 800-63-3. [NIST SP 800-63-4](https://csrc.nist.gov/pubs/sp/800/63/4/final)

### Technical Evidence

RFC 9700 is an IETF Best Current Practice for OAuth 2.0 security. [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700)

### Recommendation

For AI-IDSS, keep authorization enforcement outside the model and require explicit, bounded authority for agents and tools.

This is an architectural recommendation derived from the security properties above; it is not a claim that NIST mandates one universal AI authorization architecture.

### Uncertainty

No single access-control model is universally optimal. RBAC, ABAC, relationship-based approaches, and combinations can all be appropriate depending on organizational complexity, resource granularity, policy volatility, and operational capability.

## 20.24 What Would Change Our Mind?

The advisor should be willing to revise an identity architecture when evidence shows that:

- a simpler authorization model satisfies the real security boundary;
- the proposed identity propagation creates unnecessary complexity without reducing risk;
- a downstream system can enforce stronger resource-level controls than the proposed central policy layer;
- measured operational failures make the chosen policy model unreliable;
- a standards-based federation or delegation mechanism provides materially stronger assurance;
- new threat evidence demonstrates an unaddressed privilege-escalation path.

The test is not whether the architecture uses a fashionable IAM technology. The test is whether authority is explicit, bounded, enforceable, attributable, and maintainable.

## 20.25 Field Rule

> **Never ask only “Who is logged in?” Ask “Who is acting, on whose authority, against which resource, for which operation, and where is that authority enforced?”**

For AI-IDSS, identity is not a login feature. It is the mechanism that connects human accountability to machine action without allowing authority to expand invisibly as the request moves through the architecture.
