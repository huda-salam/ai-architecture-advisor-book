# Chapter 22 — AI-Specific Threats

## 22.1 Why AI Changes the Threat Model

AI systems inherit ordinary application and infrastructure risks, but they also introduce failure and attack modes that arise from model behavior, training data, retrieved context, probabilistic generation, and tool use.

NIST's adversarial-machine-learning taxonomy organizes AI attacks by lifecycle stage, attacker capability, and attacker objective, and identifies attacks affecting availability, integrity, privacy, and misuse. NIST's 2025 taxonomy is intended to provide a common vocabulary for assessing and managing these risks. [NIST AI 100-2 E2025](https://csrc.nist.gov/pubs/ai/100/2/e2025/final)

For the advisor, the key question is not:

> Is the model secure?

It is:

> **What can an attacker influence, what authority does the affected component have, and what consequential outcome can the attack produce?**

## 22.2 AI Threats Are System Threats

A model is only one component of an AI system.

```text
User
  ↓
Application / API
  ↓
Identity + Policy
  ↓
Orchestrator
  ├── RAG / Data
  ├── Model
  └── Tools / External Systems
          ↓
      Enterprise Actions
```

A model-level weakness can become a business-level vulnerability only when the surrounding architecture gives it a path to cause an unacceptable outcome.

Conversely, a strong model does not compensate for excessive permissions, insecure APIs, poisoned source data, or uncontrolled tools.

**Architecture implication:** threat modeling must follow the complete data, control, and authority path.

## 22.3 Threat Categories

A practical AI threat model should consider at least:

| Category | Examples | Potential consequence |
|---|---|---|
| Input manipulation | Prompt injection, adversarial inputs | Wrong reasoning or policy bypass |
| Data manipulation | Data poisoning, malicious documents | Corrupted evidence |
| Model extraction | Prompt/model extraction, probing | Information or IP disclosure |
| Privacy attacks | Data extraction, membership inference | Sensitive-data exposure |
| Output manipulation | Instruction following, unsafe generation | Misleading or harmful output |
| Tool abuse | Excessive agency, malicious tool arguments | Unauthorized actions |
| Availability | Resource exhaustion, abusive queries | Service degradation |
| Supply chain | Malicious model, package, dataset, dependency | Compromise or backdoor |
| Misconfiguration | Excessive permissions, unsafe defaults | Expanded blast radius |
| Human/social manipulation | Misleading confidence, automation bias | Poor decisions |

These categories overlap. A single attack can move through several categories.

## 22.4 Prompt Injection

Prompt injection occurs when an input attempts to influence the model to disregard or conflict with intended instructions or constraints.

The security significance depends on what the model can access or control.

For example:

```text
Untrusted Document
       ↓
RAG Retrieval
       ↓
Model Context
       ↓
Injected Instruction
       ↓
Agent Decision
       ↓
Tool Call
```

The architectural lesson is not simply "filter bad prompts." It is:

> **Do not give untrusted model-controlled text more authority than the architecture can safely tolerate.**

Prompt filtering may be useful, but it should not be treated as a complete security boundary.

## 22.5 Indirect Prompt Injection

An attacker does not necessarily need to communicate directly with the model.

Malicious instructions may be embedded in:

- web pages;
- documents;
- emails;
- PDFs;
- issue tickets;
- database fields;
- retrieved knowledge-base content;
- tool responses.

When the AI system retrieves such content, the model may interpret the embedded instructions as relevant context.

NIST's adversarial-ML taxonomy explicitly includes indirect prompt injection among attacks against generative AI systems. [NIST AI 100-2 E2023](https://csrc.nist.gov/pubs/ai/100/2/e2023/final)

For RAG systems, this means **retrieved content must be treated as data, not automatically as trusted instructions**.

## 22.6 Data Poisoning

Data poisoning is the manipulation of data so that model behavior or system conclusions are affected.

Possible targets include:

- training datasets;
- fine-tuning data;
- evaluation data;
- RAG documents;
- metadata;
- knowledge-base records;
- feature data.

For an AI-IDSS, poisoning is particularly important because the attacker may not need to compromise the model itself. Altering an authoritative-looking input can be enough to change the recommendation.

The advisor should therefore ask:

> **How do we know the evidence entering the model has not been maliciously or accidentally altered?**

## 22.7 RAG Poisoning

RAG creates a distinct attack surface because retrieved information can influence generation without changing model weights.

```text
Source
  ↓
Ingestion
  ↓
Parsing
  ↓
Index
  ↓
Retrieval
  ↓
Context
  ↓
LLM
```

Controls should include, as appropriate:

- source authority;
- ingestion authentication;
- provenance;
- integrity checks;
- document validation;
- access control;
- content classification;
- retrieval monitoring;
- evaluation against poisoned content.

A vector database being technically intact does not establish that the underlying evidence is trustworthy.

## 22.8 Confabulation and Unsupported Claims

NIST's Generative AI Profile uses the term **confabulation** for generated content that is erroneous, false, internally inconsistent, or divergent from the input while being presented as if it were valid. [NIST AI RMF GenAI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)

For AI-IDSS, the important distinction is between:

- a model producing fluent language;
- a model producing an analytically supported conclusion;
- a system producing a conclusion whose evidence can be independently checked.

Therefore the architecture should not treat fluency as evidence.

For consequential outputs, the system should define what constitutes sufficient evidence, how evidence is retrieved, and when the system must abstain.

## 22.9 Prompt Leakage and Hidden Instructions

System prompts, tool descriptions, policy text, and other hidden instructions can contain sensitive design information.

However, secrecy of prompts should not be treated as the primary security boundary.

If disclosure of a prompt allows an attacker to bypass authorization, the architecture has placed too much authority in hidden text.

**Field rule:** secrets and authorization decisions belong in enforceable system controls, not in prompt secrecy.

## 22.10 Sensitive Information Disclosure

AI systems can expose sensitive information through:

- direct responses;
- generated summaries;
- retrieval results;
- logs;
- error messages;
- tool outputs;
- model probing;
- evaluation interfaces.

NIST's adversarial-ML taxonomy includes privacy attacks such as data extraction, membership inference, and unauthorized disclosure. [NIST AI 100-2 E2023](https://csrc.nist.gov/pubs/ai/100/2/e2023/final)

The advisor should distinguish:

**Can the model know something?**

from:

**Can the requesting identity obtain it?**

The second question is an authorization problem.

## 22.11 Model Extraction and Probing

An attacker may issue repeated queries to learn about a model, its behavior, or potentially its underlying information.

Risk depends on:

- model type;
- interface exposure;
- query limits;
- output detail;
- access controls;
- monitoring;
- commercial sensitivity;
- whether the model itself is proprietary.

Not every model endpoint requires the same controls. The correct architecture depends on the value and exposure of the model and interface.

## 22.12 Adversarial Inputs and Evasion

Predictive models can be affected by deliberately manipulated inputs designed to cause an incorrect classification or decision.

Examples may include manipulated:

- financial ratios;
- transaction records;
- documents;
- images;
- text;
- feature values.

NIST's adversarial-ML taxonomy identifies evasion attacks as a major category for predictive AI. [NIST AI 100-2 E2025](https://csrc.nist.gov/pubs/ai/100/2/e2025/final)

For investment decision support, input validation and reconciliation remain important even when the final synthesis is performed by an LLM.

## 22.13 Excessive Agency

An AI system becomes substantially more dangerous when it can execute actions rather than merely provide information.

Consider the difference:

```text
AI → recommendation → human decision
```

versus:

```text
AI → tool → enterprise system → state change
```

The second architecture creates a larger consequence surface.

Agent permissions should therefore be scoped according to:

- required operation;
- resource;
- identity;
- transaction value;
- reversibility;
- approval requirement;
- environmental boundary.

For AI-IDSS, high-consequence actions should initially remain behind explicit human authorization unless there is strong evidence that automation is justified and adequately controlled.

## 22.14 Tool Abuse and Tool-Output Injection

Tools can become both attack surfaces and attack amplifiers.

An attacker may attempt to manipulate:

- tool arguments;
- tool selection;
- tool output;
- API responses;
- error messages;
- data returned from external systems.

A model should not automatically treat tool output as trusted instructions.

A useful pattern is:

```text
Model Decision
     ↓
Policy Check
     ↓
Tool Authorization
     ↓
Validated Arguments
     ↓
Tool
     ↓
Untrusted Result
     ↓
Validation / Interpretation
     ↓
Next Step
```

This preserves the distinction between **model reasoning** and **system authority**.

## 22.15 Supply-Chain Threats

AI supply chains can include:

- foundation models;
- open-weight model files;
- datasets;
- embedding models;
- packages;
- libraries;
- containers;
- serving frameworks;
- plugins/connectors;
- external APIs;
- evaluation tools.

NIST's adversarial-ML work treats attacks across the AI lifecycle rather than limiting security analysis to inference. [NIST AI 100-2 E2025](https://csrc.nist.gov/pubs/ai/100/2/e2025/final)

The advisor should ask for provenance, versioning, integrity verification, dependency inventory, vulnerability management, and rollback capability appropriate to the component.

## 22.16 Model and Dataset Integrity

Important artifacts should have a controlled lifecycle.

For example:

```text
Acquire
  ↓
Verify Source / Integrity
  ↓
Scan / Evaluate
  ↓
Approve
  ↓
Version
  ↓
Deploy
  ↓
Monitor
  ↓
Rollback / Retire
```

Do not assume that a model downloaded from a public repository is safe merely because it is popular or widely used.

Likewise, do not assume that an internal dataset is trustworthy merely because it originated inside the organization.

## 22.17 Availability and Resource Exhaustion

AI workloads can be computationally expensive.

Threats may include:

- excessive requests;
- very long inputs;
- repeated expensive retrieval;
- recursive agent behavior;
- tool-call loops;
- oversized outputs;
- deliberate concurrency spikes.

Controls may include:

- authentication;
- rate limiting;
- quotas;
- input-size limits;
- concurrency limits;
- timeouts;
- circuit breakers;
- budget controls;
- agent step limits;
- workload isolation.

These are ordinary reliability and security controls applied to AI-specific workloads.

## 22.18 Cross-Tenant and Cross-Portfolio Leakage

AI-IDSS may process information belonging to multiple portfolio companies.

A critical threat is accidental or malicious cross-boundary retrieval:

```text
Portfolio A
   ↓
Shared AI System
   ↓
Retrieval
   ↓
Portfolio B Data
   ↓
Portfolio A User
```

The architecture must enforce authorization before information enters model context.

Prompt instructions such as "do not reveal Portfolio B data" are not sufficient substitutes for resource-level authorization.

## 22.19 Evaluation and Security Testing

AI security cannot be established solely by reviewing architecture diagrams.

Testing should include, as appropriate:

- prompt-injection testing;
- indirect-injection testing;
- authorization tests;
- retrieval-isolation tests;
- data-exfiltration tests;
- tool-abuse tests;
- malformed-input tests;
- resource-exhaustion tests;
- poisoned-document tests;
- model/provider failure tests;
- regression testing after model or prompt changes.

NIST's AI RMF emphasizes measurement, testing, evaluation, verification, and validation as part of AI risk management. [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)

## 22.20 Threat Modeling AI-IDSS

A useful threat-modeling sequence is:

1. identify assets;
2. identify trust boundaries;
3. identify identities and authorities;
4. identify untrusted inputs;
5. identify model and data dependencies;
6. identify tools and external systems;
7. enumerate attack paths;
8. identify consequences;
9. define preventive and detective controls;
10. test the controls;
11. define residual risk;
12. establish monitoring and reassessment.

The advisor should model the attack path, not merely list vulnerabilities.

## 22.21 Example Attack Path

Consider a portfolio risk-monitoring system.

**Attack:**

1. attacker influences a document entering the RAG repository;
2. document contains malicious instructions;
3. ingestion accepts it without sufficient validation;
4. retrieval selects the document;
5. model interprets the instruction as relevant context;
6. agent selects a tool;
7. tool receives excessive authority;
8. sensitive data is retrieved;
9. output or logs expose information.

The important lesson is that no individual component necessarily had to be completely compromised.

The attack succeeded because several trust assumptions composed into a harmful path.

## 22.22 AI-IDSS Security Architecture

```text
                         AI-IDSS
                            │
                    Identity / Session
                            │
                     Policy Enforcement
                            │
                 ┌──────────┴──────────┐
                 ↓                     ↓
          Trusted Data Path       AI Model Path
                 │                     │
       Source / RAG / Index      LLM / ML Models
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
Identity · Authorization · Data Protection · Threat Detection
Evaluation · Audit · Observability · Rate Limits · Recovery
```

The architectural objective is to contain failure so that a compromised or manipulated model cannot automatically become a compromised enterprise identity.

## 22.23 Security Control Hierarchy

A practical control order is:

1. reduce unnecessary exposure;
2. enforce identity and authorization;
3. constrain model and tool authority;
4. validate important inputs and outputs;
5. isolate trust boundaries;
6. monitor and audit;
7. detect attacks;
8. contain and recover.

This is an architectural heuristic, not a formal standard ranking.

The strongest control is often the one that prevents an entire attack path from becoming consequential.

## 22.24 Common Anti-Patterns

### 1. "The prompt says not to do it"

Prompt instructions are not equivalent to enforceable authorization.

### 2. "RAG is read-only, therefore safe"

Retrieved content can be malicious, sensitive, stale, or unauthorized.

### 3. "The model has no direct database access"

An agent may still reach the database through tools or services.

### 4. "We have a prompt-injection filter"

Filtering is one layer and may not cover novel or indirect attacks.

### 5. "Human approval makes it safe"

Human approval reduces some risks but can fail through automation bias, poor evidence presentation, or inadequate review.

### 6. "The model is internal, therefore trusted"

Internal deployment does not eliminate malicious input, compromised dependencies, or model errors.

### 7. "The model is highly accurate"

Average accuracy does not establish security against adversarial inputs or unauthorized behavior.

### 8. "Security testing is a one-time exercise"

AI behavior and dependencies change; testing must be repeated after material changes.

### 9. "A popular model is safe"

Popularity is not evidence of suitability for the organization's threat model.

### 10. "One security control should stop everything"

AI systems require layered prevention, detection, containment, and recovery.

## 22.25 Technical Challenge Questions

1. What are the highest-consequence AI-specific attack paths?
2. Which inputs are untrusted?
3. Can retrieved documents contain instructions that influence model behavior?
4. What prevents prompt injection from becoming unauthorized action?
5. Can RAG content be poisoned?
6. How is source integrity established?
7. What prevents cross-portfolio retrieval?
8. What permissions does each agent actually possess?
9. Can tool output influence subsequent tool calls?
10. What happens if a model is manipulated into making a malicious tool call?
11. What prevents resource-exhaustion attacks?
12. How are model, dataset, package, and connector dependencies verified?
13. How are sensitive-information disclosure paths tested?
14. What security tests run after a model or prompt changes?
15. What is the maximum consequence if the model behaves maliciously?
16. Which controls remain effective if the model is fully compromised?
17. Where does the system fail safely?
18. What evidence demonstrates that the proposed mitigations work?

## 22.26 Architecture Review Checklist

### Threat Model

- [ ] Assets and consequences are defined.
- [ ] Trust boundaries are explicit.
- [ ] Untrusted inputs are identified.
- [ ] Model, data, tool, and provider dependencies are mapped.

### Prompt / RAG Security

- [ ] Direct prompt injection has been tested.
- [ ] Indirect prompt injection has been tested.
- [ ] Retrieved content is treated as untrusted data unless explicitly trusted.
- [ ] RAG source integrity and authorization are enforced.

### Agent / Tool Security

- [ ] Agent permissions are least-privilege.
- [ ] Tool arguments are validated.
- [ ] Tool outputs are not implicitly trusted as instructions.
- [ ] High-consequence actions have appropriate approval controls.
- [ ] Agent loops and resource consumption are bounded.

### Supply Chain

- [ ] Models and datasets have provenance.
- [ ] Dependencies are versioned.
- [ ] Integrity and vulnerability controls are defined.
- [ ] Rollback is possible.

### Testing

- [ ] Attack scenarios are tested before production.
- [ ] Authorization boundaries are tested.
- [ ] Data-exfiltration paths are tested.
- [ ] Material model/prompt changes trigger regression testing.

### AI-IDSS

- [ ] Cross-portfolio isolation is tested.
- [ ] Consequential recommendations have defined evidence requirements.
- [ ] Human decision boundaries are explicit.
- [ ] Residual risk is documented.

## 22.27 Evidence Discipline

### Fact

NIST identifies adversarial attacks against AI systems across lifecycle stages and attacker objectives, including evasion, poisoning, privacy, and misuse. [NIST AI 100-2 E2025](https://csrc.nist.gov/pubs/ai/100/2/e2025/final)

NIST's Generative AI Profile identifies confabulation and other risks associated with generative AI. [NIST AI RMF GenAI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)

OWASP's 2026 LLM Top 10 is a current community-driven application-security reference for LLM risks and maps its risks to other security frameworks. [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/)

### Architecture Recommendation

Examples:

- Treat retrieved documents as potentially untrusted input.
- Keep authorization outside the model.
- Constrain tool authority.
- Test attack paths rather than only model quality.

### Inference

> A model vulnerability becomes a major enterprise vulnerability when surrounding architecture gives the model a path to cause consequential effects.

This is a systems-security inference, not a quoted standard requirement.

### Uncertainty

No single control can be assumed to prevent all AI attacks. Effectiveness depends on the attack, architecture, implementation, and threat model.

## 22.28 What Would Change Our Mind?

The advisor should revise a threat-control recommendation if credible evidence shows that:

- a proposed attack is not feasible under the actual deployment architecture;
- a control is demonstrably ineffective against the defined threat;
- a simpler control provides equivalent containment;
- the system's authority boundary is materially narrower than initially assumed;
- testing reveals a new attack path or unexpected failure mode;
- a dependency or provider changes its security properties;
- the business consequence of the attack changes materially.

## 22.29 Field Rule

> **Do not ask whether the AI can be attacked. Assume that important AI components can be manipulated, and design the surrounding architecture so that manipulation cannot automatically become unacceptable business impact.**

For AI-IDSS, the critical security boundary is therefore not the model alone. It is the combination of:

**Identity + authorization + data boundaries + model boundaries + tool authority + monitoring + human decision boundaries.**
