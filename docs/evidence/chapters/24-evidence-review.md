# Evidence Review — Chapter 24: API Architecture

## Review status

**Iterations completed: 2+**

1. **Substance pass:** API architecture separated from Chapter 13 data integration and Chapter 23 enterprise integration; capability boundaries, authorization, lifecycle, reliability, agent authority, and operational concerns reviewed.
2. **Evidence pass:** current authoritative sources checked for API security lifecycle, OpenAPI, HTTP error semantics, and API security risks. Universal/vendor-specific claims were rejected or classified as recommendations.

---

## 1. Primary authoritative sources

### NIST SP 800-228 — Guidelines for API Protection for Cloud-Native Systems

NIST's updated publication, dated March 13, 2026, supersedes the June 2025 version and adds appendices covering API risks and recommended controls by API lifecycle stage. It describes risk identification across API development/runtime and a risk-based approach to selecting controls. [NIST SP 800-228](https://csrc.nist.gov/pubs/sp/800/228/upd1/final)

**Classification:** Technical evidence / authoritative guidance.

**Important editorial point:** Do not cite the withdrawn/superseded 2025 page as the current version when making current claims. The March 2026 updated publication is the appropriate current NIST reference.

### OpenAPI Specification

The OpenAPI Initiative maintains the OpenAPI Specification as a machine-readable description format for HTTP APIs. The specification supports description of paths, operations, parameters, request bodies, responses, schemas, and security-related requirements. [OpenAPI Specification](https://spec.openapis.org/oas/)

**Classification:** Technical specification.

**Important limitation:** OpenAPI describes API interfaces; it does not by itself define all business semantics, authorization policy, operational guarantees, data governance, or lifecycle governance.

### RFC 9457 — Problem Details for HTTP APIs

RFC 9457 is an IETF Standards Track document defining a machine-readable problem-detail representation for HTTP API errors. It obsoletes RFC 7807. [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html)

**Classification:** Formal Internet standard.

**Important limitation:** RFC 9457 is an available standardized error representation, not a requirement that every enterprise API must use it.

### NIST SP 800-207 — Zero Trust Architecture

NIST Zero Trust Architecture distinguishes authentication and authorization and rejects implicit trust based merely on network location. [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final)

**Classification:** Authoritative security architecture guidance.

**Application to this chapter:** The chapter's API authorization recommendations are an architectural application of Zero Trust principles, not a claim that NIST prescribes a specific API implementation.

### OWASP API Security Top 10 — 2023

OWASP's 2023 API Security Top 10 identifies risks including broken object-level authorization, broken authentication, broken object-property authorization, unrestricted resource consumption, broken function-level authorization, sensitive business-flow abuse, SSRF, security misconfiguration, improper inventory management, and unsafe consumption of APIs. [OWASP API Security Top 10](https://api-security.owasp.org/editions/2023/en/0x11-t10/)

**Classification:** Industry security evidence / awareness taxonomy.

**Important limitation:** OWASP describes common risk classes. It is not a formal international standard and does not establish that each risk has equal probability or impact in a particular enterprise.

---

## 2. Claim classification

| Chapter claim | Classification | Basis |
|---|---|---|
| API protection should consider development and runtime lifecycle | Fact / guidance | NIST SP 800-228 |
| API security should use a risk-based control approach | Fact / guidance | NIST SP 800-228 |
| OpenAPI is a machine-readable description format for HTTP APIs | Fact | OpenAPI Specification |
| RFC 9457 defines problem details for HTTP APIs | Fact | IETF RFC 9457 |
| Authentication and authorization are distinct | Fact / framework principle | NIST SP 800-207 |
| Object-level authorization is a major API security concern | Industry evidence | OWASP API Top 10 2023 |
| API inventory is important for governance/security | Industry evidence / recommendation | OWASP API Top 10 2023 |
| An API should expose a coherent capability boundary | Architecture recommendation | Derived from modular/interface design reasoning; not a universal standard |
| API should not expose database implementation unnecessarily | Architecture recommendation | Coupling/encapsulation reasoning; context dependent |
| Authorization should not be delegated to an LLM | Architecture recommendation | Application of explicit policy enforcement and least-authority principles |
| Agent APIs should be classified by consequence | Architecture recommendation | AI-IDSS risk-control design |
| State-changing APIs should define duplicate/retry behavior | Architecture recommendation | Distributed-systems reliability reasoning |
| Gateway is not automatically the complete security architecture | Architecture recommendation | NIST's multiple-control/lifecycle model + architectural reasoning |
| Third-party API responses should not automatically be trusted | Industry evidence + security inference | OWASP API10 + application to AI/data pipelines |
| No API style is universally optimal | Inference / architecture principle | Context-dependent trade-off |

---

## 3. Important anti-overclaiming decisions

The chapter intentionally does **not** claim:

- REST is always superior to other API styles;
- REST is required for enterprise APIs;
- GraphQL is inherently better or worse;
- gRPC is inherently better or worse;
- an API gateway is mandatory;
- every API needs a service mesh;
- OpenAPI is sufficient to define the entire API contract;
- RFC 9457 is mandatory;
- URI versioning is the best versioning strategy;
- asynchronous APIs are more scalable in every workload;
- synchronous APIs are inherently bad;
- microservices require APIs of one particular form;
- object-level authorization is solved merely by having OAuth/JWT;
- AI agents should never call state-changing APIs;
- human approval is required for every AI API call;
- a private network makes an API secure;
- rate limiting alone prevents abuse;
- logging every payload is necessary for observability;
- third-party APIs are inherently unreliable or untrustworthy;
- OWASP Top 10 proves actual enterprise exploit probability;
- an API contract can be reduced to an OpenAPI document;
- an API being technically available means its data is analytically authoritative.

---

## 4. Security reasoning

The central security distinction is:

```text
Authentication
     ≠
Authorization
     ≠
Business approval
```

An authenticated AI service may still be unauthorized to access a particular portfolio company. An authorized caller may still be prohibited from performing a particular state-changing action without an additional approval process.

The chapter therefore treats these as separate architectural decisions.

For AI-IDSS, the relevant chain is:

```text
AI identity
   ↓
API authentication
   ↓
Resource/function authorization
   ↓
Input validation
   ↓
Business policy
   ↓
Enterprise operation
   ↓
Audit
```

This is an architecture recommendation derived from applying explicit policy enforcement and Zero Trust principles to AI-mediated API access.

---

## 5. Agent-specific reasoning

The chapter distinguishes:

1. read access;
2. analytical operations;
3. workflow initiation;
4. state-changing operations;
5. external communication;
6. financial or otherwise consequential operations.

This is **not** a formal universal risk taxonomy. It is a practical advisor classification intended to expose differences in consequence and required control strength.

The key question is:

> If the model behaves incorrectly, what authority does the API allow that behavior to exercise?

This keeps the security boundary outside the model while still allowing AI systems to use APIs.

---

## 6. Error handling evidence

RFC 9457 provides a standard machine-readable representation for problem details in HTTP responses. It is useful evidence for the chapter's recommendation that error semantics should be explicit and machine-readable. It does **not** imply that every API must use the exact format.

The architecture requirement is:

> Consumers should be able to distinguish meaningful failure classes without parsing arbitrary human-oriented text.

The exact mechanism may vary by protocol and enterprise standards.

---

## 7. API gateway reasoning

A gateway can centralize some controls, but the chapter deliberately avoids saying that all security belongs at the gateway.

The architecture may distribute controls among:

- identity provider;
- gateway;
- service/application;
- authorization policy engine;
- data layer;
- audit/monitoring infrastructure.

NIST SP 800-228 discusses multiple implementation options for API protection and emphasizes risk-based control selection. [NIST SP 800-228](https://csrc.nist.gov/pubs/sp/800/228/upd1/final)

Therefore:

> “We have an API gateway” is not sufficient evidence that the API is secure.

---

## 8. AI-IDSS evidence boundary

For the investment decision-support context, the chapter deliberately separates:

**Technical fact:** an API can expose data or operations.

**Architecture inference:** exposing an unrestricted enterprise API to an LLM/agent increases the potential authority of model behavior.

**Recommendation:** expose narrowly scoped capabilities, validate parameters, enforce authorization outside the model, and apply stronger controls as consequence increases.

The last statement is an advisor recommendation, not a claim that a specific standard mandates this exact AI-IDSS design.

---

## 9. What would change the recommendation?

The API architecture recommendation should be revisited if evidence shows:

- a required consumer cannot work with the selected contract;
- authorization cannot be expressed reliably at the chosen boundary;
- latency/availability objectives cannot be met;
- API coupling creates unacceptable migration cost;
- security testing exposes unresolved material vulnerabilities;
- operational costs exceed the value of the interface;
- a different integration boundary preserves semantics and security more effectively;
- the AI workload changes from read-only analysis to consequential action.

---

## 10. Advisor conclusion

The chapter's strongest architectural conclusion is deliberately simple:

> **An API is a controlled authority boundary, not merely a technical doorway.**

For conventional enterprise integration, that means controlling identity, semantics, lifecycle, reliability, and coupling.

For AI-IDSS, it additionally means controlling how much authority probabilistic software can exercise through that boundary.

That distinction should remain central when reviewing API proposals from vendors, CTOs, Head of AI teams, or implementation partners.
