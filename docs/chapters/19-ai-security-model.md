# 19. AI Security Model

## 19.1 Security Is an Architecture Property

AI security is not a single control applied to an LLM. It is the protection of users, identities, data, models, tools, applications, infrastructure, and decision workflows across their trust boundaries.

For an AI-IDSS, the security question is:

> **Can an untrusted actor cause the system to disclose, alter, misuse, or act on information beyond the authority granted to that actor?**

NIST Zero Trust Architecture explicitly rejects implicit trust based only on network location and treats authentication and authorization as distinct functions. NIST's cloud-native extension also emphasizes application and service identities for granular access control. [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final) · [NIST SP 800-207A](https://csrc.nist.gov/pubs/sp/800/207/a/final)

## 19.2 The AI Security Boundary

A useful security model is:

```text
User / Client
     ↓
Identity + Session
     ↓
AI Application / API
     ↓
Orchestration / Policy
     ↓
RAG / Data Services ─── External Sources
     ↓
Model / Model Provider
     ↓
Tools / Enterprise Systems
     ↓
Actions / Outputs
```

Each boundary needs explicit trust assumptions, authentication, authorization, validation, monitoring, and failure handling.

> **Do not treat the LLM as the security boundary.**

## 19.3 Authentication Is Not Authorization

Authentication answers:

> Who or what is making this request?

Authorization answers:

> What is this identity allowed to access or do in this specific context?

An authenticated investment analyst may be allowed to view Company A but not Company B. A service identity may be allowed to retrieve portfolio data but not execute a transaction.

NIST's zero-trust model places authorization enforcement between the subject and protected resource rather than relying on network location or implicit trust. [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final)

## 19.4 Identity-Centric Architecture

AI systems have multiple identities:

- human users;
- applications;
- services;
- agents;
- model-serving workloads;
- data pipelines;
- external providers.

Each should have an explicit authority boundary.

```text
Human identity
      ↓
Application identity
      ↓
Service / agent identity
      ↓
Resource authorization
```

A user being authorized to use an AI application does not automatically authorize every downstream tool that the application can reach.

## 19.5 Least Privilege

Least privilege means granting only the access required for an identity to perform its authorized function.

For AI agents this becomes particularly important because tool access can turn a model response into an external action.

Prefer:

```text
Agent → read portfolio data
Agent → create draft report
Agent → request approval
Human → authorize material action
```

over:

```text
Agent → unrestricted database + email + payment + production access
```

The exact privilege boundary is a design decision based on business risk.

## 19.6 The Model Is Not an Authorization Engine

A system prompt such as:

```text
“You are only allowed to show Company A data.”
```

is not a substitute for application-layer authorization.

OWASP identifies sensitive information disclosure as a major LLM application risk and notes that prompt-level restrictions can be bypassed. [OWASP GenAI Security Project](https://genai.owasp.org/llmrisk/llm-top-10/)

Authorization should therefore be enforced before protected data reaches the model whenever practical, and again at tool/resource boundaries.

> **Policy should be enforced by systems that can deterministically enforce policy—not merely requested from a probabilistic model.**

## 19.7 Data Classification

AI architecture should distinguish data according to its protection requirements.

A practical classification may include:

| Class | Example | Architectural implication |
|---|---|---|
| Public | Published annual report | Broadly accessible |
| Internal | Internal operating metrics | Authenticated access |
| Confidential | Investment memo | Restricted access |
| Highly sensitive | Credentials, regulated or strategic data | Strong isolation and explicit controls |

This is an example classification, not a universal organizational taxonomy.

The organization must define its own classifications and handling rules.

## 19.8 Data Protection in the AI Pipeline

Sensitive data can appear in:

- source systems;
- ingestion pipelines;
- temporary processing;
- document stores;
- vector indexes;
- prompts;
- model context;
- model-provider interfaces;
- caches;
- logs;
- evaluation datasets;
- backups.

Security review must therefore follow the data, not only the database.

OWASP identifies sensitive information disclosure as a specific LLM application risk. [OWASP LLM02:2025](https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/)

## 19.9 Encryption

Encryption should be considered for data in transit and at rest according to the organization's threat model and requirements.

Important questions include:

- Who controls the keys?
- Where are keys stored?
- Who can use them?
- Can access be audited?
- How are keys rotated or revoked?
- Does encryption apply to backups and replicas?
- Does the model-provider path require additional controls?

Encryption does not replace authorization. A decrypted application with excessive privileges can still disclose data.

## 19.10 Secrets Management

Secrets include:

- API keys;
- database credentials;
- service credentials;
- signing keys;
- certificates;
- tokens.

They should not be embedded in prompts, source code, model weights, documents, or ordinary logs.

OWASP specifically warns that system prompts should not be treated as secrets or as security controls and that credentials should not be placed in them. [OWASP LLM07:2025](https://genai.owasp.org/llmrisk/llm072025-system-prompt-leakage/)

## 19.11 Prompt Injection

Prompt injection occurs when untrusted content influences an LLM's behavior in unintended ways.

The untrusted content may originate from:

- a user;
- an uploaded document;
- a web page;
- retrieved enterprise content;
- an email;
- tool output.

OWASP currently identifies Prompt Injection as LLM01 in its GenAI security guidance. [OWASP GenAI Security Project](https://genai.owasp.org/llmrisk/llm-top-10/)

A key architectural implication is:

```text
Untrusted content
      ↓
LLM context
      ↓
Potential instruction influence
      ↓
Tool / data access risk
```

Therefore prompt injection cannot be treated solely as a prompt-writing problem.

## 19.12 RAG Security

RAG creates an additional security boundary because retrieved content enters model context.

A secure retrieval path should consider:

```text
User identity
      ↓
Authorization policy
      ↓
Permitted corpus
      ↓
Retrieval
      ↓
Context construction
      ↓
Model
```

The vector index should not become a bypass around source-system authorization.

If Company A and Company B data share an index, retrieval filtering must prevent an authorized user for A from receiving B's information.

## 19.13 Retrieval-Time Authorization

Authorization should be evaluated at the point where access is granted.

For consequential systems, do not rely on:

```text
Retrieve everything
      ↓
Ask LLM to hide unauthorized information
```

Prefer:

```text
Identity
  ↓
Policy
  ↓
Authorized retrieval
  ↓
Context
  ↓
LLM
```

This is an architectural recommendation derived from zero-trust principles and the need to enforce authorization at protected resources.

## 19.14 Agent and Tool Security

Agents create a special risk because they can transform model decisions into actions.

```text
Model reasoning
      ↓
Tool selection
      ↓
Tool invocation
      ↓
External effect
```

Each tool should have:

- explicit identity;
- narrow permission scope;
- input validation;
- output validation;
- timeout;
- rate limit where appropriate;
- audit trail;
- approval requirement for high-impact actions.

OWASP's GenAI security work identifies excessive agency as a material risk category in LLM applications. [OWASP GenAI Security Project](https://genai.owasp.org/llm-top-10/)

## 19.15 Tool Output Is Untrusted Input

A tool response should not automatically be treated as trusted instruction.

For example:

```text
ERP / Web / Email / Document
            ↓
       Tool response
            ↓
          Agent
```

The returned content may contain malicious, malformed, stale, or misleading data.

Validate data according to the tool contract before using it for subsequent actions.

## 19.16 Output Security

LLM output can become dangerous when passed directly to another interpreter or system.

Examples include:

- SQL;
- shell commands;
- HTML;
- code;
- API parameters;
- workflow actions.

Treat generated output as data until it has passed the validation and authorization required by the receiving system.

> **Never make a downstream security boundary depend on the model's promise to generate safe output.**

## 19.17 Excessive Agency

The safest default for a consequential AI-IDSS is not maximum autonomy.

A useful progression is:

```text
Read
 ↓
Analyze
 ↓
Recommend
 ↓
Draft
 ↓
Request approval
 ↓
Execute
```

Move right only when the additional authority is justified by evidence, controls, and acceptable risk.

For capital-allocation decisions, the initial boundary should generally preserve human authorization for consequential actions.

## 19.18 Model and Provider Boundary

A third-party model creates a boundary between enterprise-controlled systems and provider-controlled infrastructure.

The security assessment should ask:

- What data crosses the boundary?
- How is it protected in transit?
- What retention applies?
- What processing is performed?
- Who can access it?
- What contractual controls exist?
- What regions are involved?
- What happens during provider compromise or outage?
- Can the architecture switch providers?

“Third-party” is not synonymous with “insecure,” and “self-hosted” is not synonymous with “secure.” Security depends on the complete architecture and controls.

## 19.19 Supply Chain Security

AI systems depend on:

- model artifacts;
- packages;
- containers;
- datasets;
- embeddings;
- plugins/connectors;
- infrastructure providers;
- model-serving software.

Security review should establish provenance, integrity, versioning, vulnerability management, and change control appropriate to the component.

OWASP includes supply-chain risk in its current GenAI security guidance. [OWASP GenAI Security Project](https://genai.owasp.org/llm-top-10/)

## 19.20 Logging and Audit

Security logging should support investigation without becoming a secondary data-leak channel.

Potential audit attributes include:

- identity;
- authorization decision;
- resource accessed;
- model/version;
- tool invoked;
- material configuration;
- timestamp;
- result status;
- approval decision.

Do not assume that storing complete prompts and outputs indefinitely is automatically the best audit strategy. Retention should follow legal, security, operational, and investigative requirements.

## 19.21 Security Monitoring

Useful signals may include:

- abnormal access patterns;
- repeated authorization failures;
- unusual retrieval volume;
- unexpected tool calls;
- prompt-injection indicators;
- sensitive-data detection;
- anomalous model/provider traffic;
- credential misuse;
- unusual cost or resource consumption.

Detection rules should be tied to defined threats rather than collecting every possible metric without an operating purpose.

## 19.22 Threat Modeling AI-IDSS

A useful threat-modeling sequence is:

```text
Assets
  ↓
Trust boundaries
  ↓
Actors
  ↓
Threats
  ↓
Attack paths
  ↓
Controls
  ↓
Residual risk
```

For AI-IDSS, explicitly include:

- confidential portfolio data;
- investment recommendations;
- user identities;
- model/provider credentials;
- retrieval indexes;
- agent tools;
- decision evidence;
- audit records.

## 19.23 Example Attack Path

Consider:

```text
Attacker-controlled document
        ↓
RAG ingestion
        ↓
Malicious instruction
        ↓
LLM context
        ↓
Agent interprets instruction
        ↓
Tool invocation
        ↓
Unauthorized data access
```

The architectural response should not be “improve the system prompt” alone.

Controls may need to exist at ingestion, retrieval authorization, tool authorization, input validation, output validation, and human approval boundaries.

## 19.24 AI-IDSS Security Architecture

```text
                         AI-IDSS
                            │
                    Identity / Session
                            │
                     Policy Enforcement
                            │
                 ┌──────────┴──────────┐
                 ↓                     ↓
             Data / RAG            AI Models
                 │                     │
                 └──────────┬──────────┘
                            ↓
                    Agent / Orchestrator
                            │
                     Tool Authorization
                            │
              ┌─────────────┼─────────────┐
              ↓             ↓             ↓
            ERP          Market Data   Other Systems

Cross-cutting:
Identity · Encryption · Secrets · Audit · Monitoring · Evaluation
```

The security architecture should protect every boundary, not simply the model endpoint.

## 19.25 Security Control Hierarchy

For consequential AI systems, prefer controls that reduce reliance on model behavior.

```text
Strongest boundary

Network / infrastructure controls
        ↓
Identity controls
        ↓
Authorization / policy enforcement
        ↓
Data filtering
        ↓
Tool validation
        ↓
Output validation
        ↓
Model instructions / prompts

Weakest as sole enforcement mechanism
```

This is an architectural ordering, not a universal security ranking. Multiple layers should be combined according to the threat model.

## 19.26 Common Security Anti-Patterns

### “The model knows what it is allowed to see.”
Authorization belongs outside the model.

### “The vector database is private, so RAG is secure.”
Retrieval authorization and tenant isolation still matter.

### “System prompts are secrets.”
Sensitive credentials should not be stored there, and prompt secrecy is not authorization.

### “The agent only follows instructions.”
Agents operate on untrusted inputs and require explicit tool controls.

### “Self-hosting solves security.”
It changes the responsibility boundary; it does not eliminate security work.

### “Encryption solves the problem.”
Encryption protects certain paths and storage states; it does not authorize legitimate application access.

### “Log everything for audit.”
Logs can become a sensitive secondary data store.

### “Human approval means secure.”
Approval is only effective if the human sees sufficient trustworthy evidence and the system enforces the approval boundary.

## 19.27 Technical Challenge Questions

1. What are the protected assets?
2. Where are the trust boundaries?
3. Which identities exist?
4. Who is authorized to access each data domain?
5. Where is authorization actually enforced?
6. Can RAG bypass source-system authorization?
7. What happens if retrieved content contains malicious instructions?
8. Which tools can the agent invoke?
9. What is the maximum authority of each tool?
10. Which outputs enter another interpreter or system?
11. Where are secrets stored?
12. What data crosses the model-provider boundary?
13. What provider retention and processing controls apply?
14. Can a compromised model cause unauthorized external action?
15. What happens when a security control fails?
16. Can security events be reconstructed from the audit trail?
17. Are logs themselves protected against sensitive-data leakage?
18. Which controls remain effective if the model is fully compromised?
19. What evidence demonstrates that the authorization boundary works?
20. What evidence would cause us to reject the proposed security architecture?

## 19.28 Architecture Review Checklist

### Identity
- [ ] Human identities defined
- [ ] Service identities defined
- [ ] Agent/tool identities defined
- [ ] Authentication separated from authorization

### Authorization
- [ ] Resource-level authorization enforced
- [ ] Least privilege applied
- [ ] Tenant/company isolation tested
- [ ] Retrieval authorization enforced
- [ ] Tool authorization enforced

### Data
- [ ] Data classification defined
- [ ] Sensitive data flows mapped
- [ ] Encryption requirements defined
- [ ] Key management defined
- [ ] Retention defined

### AI / RAG
- [ ] Prompt injection threat modeled
- [ ] Retrieved content treated as untrusted
- [ ] Model-provider boundary assessed
- [ ] Output validation defined
- [ ] Model and configuration versions traceable

### Agents
- [ ] Tool permissions minimized
- [ ] High-impact actions require appropriate approval
- [ ] Tool inputs validated
- [ ] Tool outputs validated
- [ ] Agent loops and fan-out bounded

### Operations
- [ ] Secrets managed securely
- [ ] Security logging defined
- [ ] Monitoring and detection defined
- [ ] Incident response defined
- [ ] Recovery tested

### AI-IDSS
- [ ] Consequential actions have explicit authority boundaries
- [ ] Decision evidence protected
- [ ] Human decision boundary preserved
- [ ] Security failures can trigger safe degradation or refusal

## 19.29 Evidence Discipline

| Statement | Classification |
|---|---|
| NIST Zero Trust principles | **Fact / Technical Evidence** |
| Authentication and authorization are distinct | **Fact / Technical Evidence** |
| Prompt injection is an LLM application security risk | **Technical Evidence** |
| Sensitive information disclosure is an LLM application risk | **Technical Evidence** |
| Authorization should not rely solely on an LLM | **Architecture recommendation grounded in security principles** |
| Retrieval-time authorization | **Architecture recommendation** |
| Model-provider boundary assessment | **Architecture requirement / risk analysis** |
| Human approval for consequential actions | **Recommendation; context-dependent** |
| Specific security control effectiveness | **Requires testing and threat-model evidence** |

Do not present a security architecture as secure merely because it contains a list of security products or controls. The relevant question is whether the controls address the actual attack paths and trust boundaries.

## 19.30 What Would Change Our Mind?

Change the architecture if evidence shows that:

- application-layer authorization cannot reliably enforce resource boundaries;
- retrieved data can cross portfolio-company or tenant boundaries;
- an agent can invoke tools beyond its intended authority;
- provider controls do not satisfy the organization's data requirements;
- sensitive information appears in logs or evaluation datasets unexpectedly;
- prompt injection can produce unauthorized effects despite the proposed control layers;
- security controls materially impair required functionality without an acceptable compensating control;
- the threat model changes because a new capability, data source, model, or tool is introduced.

The advisor should update the architecture when evidence changes—not defend the original security design.

## 19.31 Field Rule

> **Do not ask whether the AI is secure. Ask where trust exists, where authority is enforced, what an attacker can cause each component to do, and which controls remain effective if the model behaves maliciously.**

For AI-IDSS:

> **The model may reason, but identity, authorization, data protection, and consequential authority must remain under explicit system control.**
