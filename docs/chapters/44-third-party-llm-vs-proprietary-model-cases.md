# 44. Third-Party LLM vs Proprietary Model Cases

> **Purpose:** Examine documented enterprise choices between third-party foundation models, enterprise AI platforms, self-hosted open-weight models, and proprietary model development. The objective is not to declare a universal winner, but to determine which architectural layer an organization actually needs to control.

## 44.1 The Question Is Usually Framed Too Narrowly

A common executive question is:

> **“Should we build our own LLM or use a third-party model?”**

This is usually too narrow.

The architecture decision should first ask:

- What capability does the system require?
- What data must it access?
- What must remain under organizational control?
- Which controls are mandatory: residency, retention, training exclusion, isolation, auditability, or operational independence?
- Which capabilities create strategic differentiation?
- What operational responsibility can the organization realistically sustain?
- What dependency is acceptable?
- How reversible must the decision be?

The model is only one layer of the system.

**FOUNDATION**

> **The strategic question is not “whose model?” It is “which capabilities should we own, which should we consume, and where should the architectural boundary be?”**

## 44.2 Four Different Architectures Are Often Called “Our Own AI”

| Architecture | Organization owns | Important dependencies |
|---|---|---|
| Application over third-party API | Application, workflow, data controls | Model provider |
| Enterprise model platform | Identity, policy, orchestration, data boundary, evaluation, routing | One or more model providers |
| Self-hosted open-weight model | Serving environment, deployment, model weights | Model publisher, hardware, runtime, engineering ecosystem |
| Proprietary foundation model | Training pipeline, model weights, model lifecycle | Hardware, data, talent, software ecosystem |

These are materially different investments.

An organization can own its **AI application, data, decision workflow, controls, evaluation, and integration architecture** while consuming foundation-model capability from external providers.

That distinction is central to enterprise architecture.

## 44.3 Case: Morgan Stanley — Third-Party Model Behind a Firm-Specific Architecture

Morgan Stanley is a useful financial-services example of a third-party frontier model being embedded inside a firm-specific workflow.

Morgan Stanley announced its relationship with OpenAI in 2023 and subsequently described AI @ Morgan Stanley Assistant and Debrief as internal capabilities built around its proprietary knowledge and workflows. Morgan Stanley's current public case material emphasizes use-case evaluation, expert review, retrieval refinement, regression testing, and human review. OpenAI reports that more than 98% of advisor teams actively use the Assistant. urlOpenAI — Morgan Stanley AI casehttps://openai.com/index/morgan-stanley/

**What this demonstrates:**

- a major financial institution can place externally supplied model capability behind a firm-specific application boundary;
- proprietary knowledge, retrieval, evaluation, workflow integration, and controls can remain part of the enterprise architecture;
- model ownership is not a prerequisite for enterprise AI adoption.

**What it does not demonstrate:**

- that the same provider, contract, security arrangement, or model is optimal for another institution;
- that third-party models are appropriate for every workload;
- that the public description exposes the complete technical architecture.

**ADVISOR LENS**

The architectural pattern is:

**Firm knowledge + permissions + retrieval + evaluation + workflow + external model capability**

not simply:

**Financial institution → model vendor**.

## 44.4 Case: JPMorganChase — Proprietary Enterprise Platform, External Models

JPMorganChase illustrates a middle architecture between “buy everything” and “build the foundation model.”

Its LLM Suite is an internally developed enterprise AI platform. Public company reporting and industry material describe the platform as providing controlled access to generative-AI capabilities while protecting company and customer data, with leading third-party models used underneath the platform.

The important architectural distinction is:

> **An organization can own the enterprise AI access, policy, workflow, data, and governance layers without owning every foundation model underneath them.**

The pattern can be represented as:

```text
Enterprise Identity
        ↓
Enterprise AI Platform
        ↓
Policy / Guardrails / Audit
        ↓
Model Routing
   ┌────┼────┐
   ↓    ↓    ↓
Model A Model B Model C
        ↓
Enterprise Data / Tools
        ↓
Business Workflow
```

This creates an important strategic option: **model substitution can occur behind an enterprise-controlled boundary** when interfaces, evaluations, data contracts, and workflow semantics are sufficiently stable.

That last condition is an architectural requirement, not a guaranteed property of multi-model platforms.

## 44.5 Case: BloombergGPT — When Owning Model Capability Can Make Sense

BloombergGPT is a materially different case. The published research describes a 50-billion-parameter language model trained on a large mixture of financial and general-purpose data, including a substantial proprietary financial-data component. The authors evaluated the model on general benchmarks, financial benchmarks, and internal evaluations and reported strong financial-task performance. urlBloombergGPT research paperhttps://arxiv.org/abs/2303.17564

This provides evidence for a legitimate proprietary-model rationale:

> **Distinctive proprietary data, domain requirements, and model capability can sometimes create enough strategic value to justify owning model capability.**

But it does **not** support the proposition:

> “Our data is sensitive, therefore we need our own foundation model.”

The Bloomberg case involved unusually strong conditions, including large proprietary financial-data assets and substantial model-development capability. Those conditions materially affect transferability.

**ARCHITECTURE WARNING**

> A successful proprietary-model case demonstrates that proprietary development can be justified under particular conditions. It does not establish that proprietary development is the default enterprise architecture.

## 44.6 Current Financial-Services Landscape: The Boundary Is Moving Up the Stack

Current industry offerings reinforce an important architectural trend: enterprises can consume frontier model capability while demanding stronger control over data, connectors, workflow, provenance, and governance.

For example, OpenAI's September 2026 financial-services offering combines frontier-model reasoning with financial data providers and granular citations, and describes the product as shaped through design partnerships with Morgan Stanley and Evercore. This is **vendor-reported industry evidence**, not independent proof that the product is optimal. urlOpenAI — ChatGPT for Financial Serviceshttps://openai.com/index/introducing-chatgpt-financial-services/

Google Cloud's 2026 financial-services offering similarly emphasizes a governed platform, multiple agents, enterprise connectors, data provenance, and an ecosystem intended to avoid dependence on a single model or agent. Again, this is vendor-reported evidence and should be treated accordingly. urlGoogle Cloud — Gemini Enterprise for Financial Serviceshttps://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise-for-financial-services

The architectural lesson is not “buy these products.” It is:

> **The competitive boundary is increasingly shifting from raw model access toward the controlled combination of models, data, workflow, evaluation, provenance, identity, and governance.**

This is an inference from the documented architecture patterns, not a universal market law.

## 44.7 Three Cases Reveal Three Ownership Boundaries

| Case | Strongly owned | Primarily consumed / depended on | Pattern |
|---|---|---|---|
| Morgan Stanley | Knowledge, retrieval, evaluation, workflow | Frontier model capability | Third-party model behind enterprise controls |
| JPMorganChase | Enterprise AI platform, controls, data architecture | Leading external models | Proprietary platform + model flexibility |
| Bloomberg | Model capability + proprietary financial data | Infrastructure/ecosystem | Domain-specific proprietary model |

The important observation is that **ownership can be placed at different layers**.

That is more useful than a binary build-versus-buy question.

## 44.8 Proprietary Does Not Mean More Secure by Definition

A proprietary model may increase control over some dimensions, such as model weights, deployment location, or training process. It also creates responsibilities for:

- infrastructure security;
- model supply chain;
- patching;
- evaluation;
- lifecycle management;
- access control;
- monitoring;
- incident response;
- specialist staffing.

Third-party models can reduce some operational responsibilities while increasing provider, contractual, and concentration dependencies.

NIST's Generative AI Profile treats third-party GAI as a procurement and risk-management issue and discusses due diligence, contractual controls, SLAs, software/component transparency, and attestation. urlNIST AI RMF Generative AI Profilehttps://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence

**FIELD RULE**

> **Do not compare “vendor risk” with “self-hosting risk.” Compare the complete risk transferred to the vendor with the complete risk retained by the organization.**

## 44.9 Data Sensitivity Does Not Determine Model Ownership by Itself

Sensitive-data requirements can potentially be addressed through multiple architectures:

- controlled enterprise API;
- private connectivity or endpoint controls;
- preprocessing, masking, or tokenization;
- retrieval inside a controlled environment;
- contractual training/retention restrictions;
- self-hosted open-weight models;
- proprietary model infrastructure.

Therefore:

> **“The data is sensitive” is a constraint. It is not, by itself, an architecture decision.**

The advisor should first identify the actual control requirement:

- residency;
- retention;
- training exclusion;
- encryption;
- isolation;
- authorization;
- auditability;
- latency;
- operational independence;
- exit capability.

Only then should model ownership be considered.

## 44.10 Third-Party Dependency Is a Real Architectural Risk

The argument for third-party models must not become naive vendor advocacy.

BIS identifies third-party dependencies, concentration, data quality, privacy, security, and operational resilience as important AI risks for financial institutions. Its 2026 analysis specifically notes that dependence on third parties can amplify AI data-related risks and that concentration among major AI, cloud, and data providers complicates dependency management. citeturn0search6turn0search8

BIS also notes that AI systems often depend on specialized hardware, cloud services, external data providers, and pretrained models concentrated among a relatively small number of providers. citeturn0search8

Therefore a third-party architecture should explicitly address:

- provider outage;
- model retirement;
- behavior changes;
- pricing changes;
- rate limits;
- contractual changes;
- data-access changes;
- jurisdictional changes;
- provider concentration;
- migration and exit feasibility.

## 44.11 Self-Hosting Creates a Different Dependency Graph

Self-hosting does not eliminate dependency.

A self-hosted architecture can depend on:

```text
Open-weight model
       ↓
Model runtime
       ↓
GPU / accelerator ecosystem
       ↓
Cloud / datacenter
       ↓
Networking
       ↓
Security tooling
       ↓
Specialist engineers
       ↓
Model updates / patches
```

The dependency graph changes; it does not disappear.

**ARCHITECTURE WARNING**

> **“Self-hosted” should never be treated as synonymous with “independent.”**

The advisor should therefore compare **dependency concentration**, not simply whether an API call exists.

## 44.12 The Economics of Ownership

The relevant comparison is not:

**API price vs GPU price.**

It is closer to:

```text
Total Cost of Ownership
=
Model / inference cost
+ infrastructure
+ engineering
+ security
+ operations
+ evaluation
+ lifecycle management
+ reliability engineering
+ compliance
+ vendor management
+ transition / exit cost
```

A proprietary model can be attractive at high utilization yet uneconomic after accounting for engineering, capacity, model improvement, security, and opportunity cost.

A third-party model can have a high visible unit price yet be economically superior if it avoids large fixed costs and accelerates useful deployment.

Chapter 34 provides the TCO framework. The important principle here is:

> **Model ownership is an economic investment, not merely a security posture.**

## 44.13 Model Capability Is an Economic Variable

Frontier-model capability and price-performance change rapidly. A proprietary model investment therefore has technological-obsolescence risk: a capability that required substantial internal investment may later become commercially available.

The opposite risk also exists. A third-party dependency can create strategic-optionality risk if a provider changes pricing, access, capabilities, or terms.

A useful decision framing is:

```text
Build value
− build cost
− operating cost
− obsolescence risk
− transition risk

versus

Buy value
− provider dependency cost
− contractual risk
− migration risk
```

This is a decision framework, not a financial valuation formula.

The evidence must be refreshed because the frontier can move faster than the architecture lifecycle.

## 44.14 A Better Decision Matrix

| Dimension | Third-party model | Enterprise platform + multiple models | Self-hosted open-weight | Proprietary foundation model |
|---|---|---|---|---|
| Frontier capability access | Often strong | Often strong | Variable | Depends on investment |
| Control over weights | Low | Low/variable | High | High |
| Operational burden | Lower | Medium | High | Very high |
| Provider dependency | High | Potentially lower | Model/ecosystem dependency | Lower at model-provider layer, but other dependencies remain |
| Infrastructure responsibility | Lower | Medium | High | Very high |
| Model differentiation | Usually limited | Medium through data/workflow/routing | Potentially medium | Potentially high |
| Data control | Architecture-dependent | Architecture-dependent | High deployment control | High deployment control |
| Time to deploy | Usually faster | Medium | Medium/high | Slow |
| Specialized talent | Lower | Medium/high | High | Very high |
| Exit complexity | Contract/model migration | Potentially lower if interfaces are portable | Model/runtime migration | Internal transition complexity |

These are qualitative tendencies, not universal measurements.

## 44.15 A More Defensible Enterprise Pattern: Own the Boundary

For many enterprise AI systems, a useful architecture to test first is:

```text
                    Enterprise AI Boundary
┌──────────────────────────────────────────────────┐
│ Identity                                         │
│ Policy                                           │
│ Data / RAG                                       │
│ Evaluation                                       │
│ Audit                                            │
│ Workflow                                         │
│ Tool authorization                               │
│ Model routing                                    │
│ Cost controls                                    │
│ Portability / exit mechanisms                    │
└──────────────────────────────────────────────────┘
                 ↓              ↓
             Model A        Model B
             Provider       Provider
```

The organization owns the **decision-support boundary** while treating foundation models as replaceable capabilities where practical.

This pattern becomes less attractive when the model capability itself is the strategic differentiator or when external providers cannot satisfy mandatory constraints.

## 44.16 When Proprietary Model Development Becomes More Justifiable

A proprietary model becomes more defensible when several conditions converge, such as:

1. **Distinctive proprietary data** provides measurable model advantage.
2. **Domain-specific capability** materially exceeds credible external alternatives on representative workloads.
3. **Inference volume and utilization** can justify the fixed investment.
4. **Deployment or model-behavior requirements** cannot reasonably be satisfied by available providers.
5. **Strategic differentiation** depends directly on model capability.
6. **Internal technical capability** is strong enough to operate the lifecycle.
7. **Continuous investment** can be sustained rather than treating model development as a one-time project.
8. **Evidence remains durable** after accounting for the expected pace of external model improvement.

These are decision criteria, not necessary-and-sufficient conditions.

## 44.17 When Third-Party Models Become More Justifiable

Third-party models become more attractive when:

- frontier capability matters;
- model technology is changing rapidly;
- the use case does not require proprietary model weights;
- enterprise controls can satisfy the actual data requirements;
- time-to-value matters;
- internal model engineering capacity is limited;
- model capability is not itself the competitive moat;
- credible providers can be evaluated through representative tests;
- multiple providers or open-weight alternatives provide credible exit options;
- the organization can establish contractual and technical exit mechanisms.

These are architectural decision criteria rather than universal rules.

## 44.18 The Most Important Question: Where Is the Moat?

Ask:

> **“If we replaced the model tomorrow, what part of the system would still create value?”**

If the answer is:

- proprietary data;
- workflow integration;
- decision logic;
- domain knowledge;
- permissions;
- evaluation datasets;
- distribution;
- human expertise;

then owning the foundation model may not be the primary source of strategic differentiation.

If the answer is:

> **“The model itself performs a capability that competitors cannot obtain elsewhere.”**

then model ownership deserves deeper consideration.

**ADVISOR LENS**

> **Own the layer that creates strategic differentiation; consume layers where differentiation is weak and the market can supply them efficiently—subject to security, resilience, economics, and exit constraints.**

## 44.19 What Would Change Our Mind?

For a recommendation favoring third-party models, evidence that could change the decision includes:

- repeated provider outages affecting critical operations;
- materially unfavorable contractual changes;
- inability to satisfy required data controls;
- persistent model-performance gaps on proprietary tasks;
- unacceptable concentration risk;
- inability to establish a credible exit path;
- credible evidence that self-hosting materially improves required economics or control.

For a recommendation favoring proprietary development, evidence that could change the decision includes:

- frontier providers closing the relevant capability gap;
- materially lower third-party cost at equivalent quality;
- improved enterprise controls from providers;
- insufficient internal engineering capacity;
- faster external model improvement than internal development;
- evidence that model ownership does not produce meaningful differentiation;
- inability to sustain the model lifecycle economically.

## 44.20 Advisor Decision Template

When evaluating “build our own LLM,” the advisor should produce:

| Question | Finding |
|---|---|
| Required capability | What must the model actually do? |
| Data constraint | What data must be protected and how? |
| Control requirement | Which controls are mandatory? |
| Model gap | What required capability is unavailable externally? |
| Architecture alternatives | Which credible options exist? |
| Industry evidence | Who has implemented each pattern? |
| Technical evidence | What supports feasibility? |
| Economics | What is the complete lifecycle cost? |
| Dependency | What dependency does each option create? |
| Exit | How can the organization change course? |
| Evaluation | How will alternatives be compared on representative workloads? |
| Recommendation | Which option is justified and why? |
| Confidence | How strong is the evidence? |
| Revalidation trigger | What changes require the decision to be revisited? |
| What would change our mind? | Which measurable conditions would reverse the recommendation? |

## 44.21 Evidence Discipline

### Fact

Documented industry cases show that major financial institutions can deploy enterprise AI using externally supplied model capability, while proprietary/domain-specific model development is also technically possible.

### Industry Evidence

Morgan Stanley, JPMorganChase, Bloomberg, and current financial-services AI offerings provide examples of different ownership boundaries. These cases demonstrate implementation patterns, not universal optimality.

### Supervisory Evidence

BIS identifies third-party dependency, concentration, data, cyber, and operational-resilience considerations relevant to financial-sector AI architectures. urlBIS FSI Insight 73 — AI data use in financial serviceshttps://www.bis.org/publications/fsi-insight-73-data-we-trust-emerging-policy-and-supervisory-approaches-ai-data-use-financial-services

### Recommendation

For many enterprise AI use cases, test an architecture in which the organization owns the enterprise decision-support boundary while keeping foundation models replaceable where practical.

This is an advisor recommendation, not an industry standard.

### Assumption

Model interfaces, evaluation methods, data contracts, and workflow semantics can be designed sufficiently well to permit model substitution. If that assumption is false, apparent portability may be largely illusory.

### Uncertainty

Public evidence is weak on detailed contracts, complete security architectures, long-term migration costs, and comparative TCO under identical enterprise workloads. Do not infer their absence from public silence.

## 44.22 Field Rule

> **Do not build a foundation model merely because you can. Do not buy one merely because it is available. Decide which architectural layer the organization must control, which layer the market can efficiently provide, and how the boundary remains secure, economically justified, evaluated, and reversible.**