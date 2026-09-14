# 44. Third-Party LLM vs Proprietary Model Cases

> **Purpose:** Examine real enterprise choices between third-party foundation models, enterprise-managed model platforms, open-weight models, and proprietary model development. The objective is not to declare a universal winner, but to improve the advisor's ability to distinguish architectural necessity from organizational preference.

## 44.1 The Question Is Usually Framed Too Narrowly

A common executive question is:

> **“Should we build our own LLM or use a third-party model?”**

This is usually the wrong first question.

The architecture decision should instead ask:

- What capability does the system require?
- What data must the model access?
- What must remain under organizational control?
- Which capabilities can safely be obtained from a provider?
- Which capabilities create strategic differentiation?
- What operational responsibility can the organization realistically carry?
- What level of provider dependency is acceptable?
- What would make the decision reversible?

The model is only one layer of the system.

**FOUNDATION**

> **The strategic question is not “whose model?” It is “which capabilities should we own, which should we consume, and where should the architectural boundary be?”**

## 44.2 Four Different Things Are Often Called “Our Own AI”

The phrase “proprietary AI” can refer to materially different architectures:

| Architecture | What the organization owns | What it still depends on |
|---|---|---|
| Application over third-party API | Application, data, workflow, controls | Model provider |
| Enterprise model platform | Orchestration, access, data boundary, evaluation, routing | One or more model providers |
| Self-hosted open-weight model | Serving environment and model weights | Model publisher, hardware, engineering ecosystem |
| Proprietary foundation model | Model training and weights | Hardware, data, talent, software ecosystem |

These should not be evaluated as equivalent alternatives.

A company can own the **AI application and decision architecture** while consuming third-party foundation-model capability.

That distinction is central to enterprise architecture.

## 44.3 Case: Morgan Stanley — Third-Party Frontier Model Behind a Firm-Specific Architecture

Morgan Stanley provides one of the clearest financial-services examples of a third-party model being integrated into a proprietary enterprise workflow.

The firm announced a strategic relationship with OpenAI in 2023 to build an internal capability using OpenAI technology and Morgan Stanley's intellectual capital. The service was designed around Morgan Stanley's own content, with answers linked to source documents and appropriate controls. citeturn3search3

Morgan Stanley subsequently deployed AI @ Morgan Stanley Assistant and Debrief. Its published material describes evaluation against real-world use cases, expert review, retrieval refinement, regression testing, and human review before generated outputs are finalized. citeturn3search2turn3search5

**What this demonstrates:**

- a regulated financial institution can place a third-party frontier model behind a firm-specific application boundary;
- proprietary organizational knowledge can remain an important differentiator even when the base model is externally supplied;
- evaluation and retrieval architecture can be more important to production adoption than owning the foundation model;
- human review can remain part of the workflow.

**What it does not demonstrate:**

- that a third-party model is always appropriate;
- that Morgan Stanley's contractual/security conditions are transferable;
- that the same architecture is optimal for every use case.

**ADVISOR LENS**

The interesting architecture is:

**Firm knowledge + permissions + retrieval + evaluation + workflow + third-party model**

not simply:

**Morgan Stanley → OpenAI**.

## 44.4 Case: JPMorganChase — Proprietary Platform, Third-Party Models

JPMorganChase provides an especially useful counterexample to the false binary of “buy versus build.”

The bank's LLM Suite is a proprietary enterprise platform. Public reporting describes it as being powered by leading third-party LLMs. JPMorganChase's annual reporting says LLM Suite was launched to more than 200,000 colleagues in 2024 and provides controlled access to generative-AI capabilities while protecting company and customer data. citeturn3search1turn3search33

The architectural distinction is important:

**JPMorganChase owns the enterprise AI access/platform layer without necessarily owning every foundation model underneath it.**

The bank has also described LLM Suite as a vehicle through which employees receive LLM capabilities with guardrails, while its broader AI architecture includes domain-specific applications and data platforms. citeturn3search9

This is a powerful example of a middle architecture:

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

**So what?**

An organization does not have to train a foundation model to obtain strategic control over its AI architecture.

## 44.5 Case: BloombergGPT — When Owning the Model Can Make Strategic Sense

BloombergGPT is a materially different case.

Bloomberg researchers described a 50-billion-parameter model trained using a large mixture of financial and general-purpose data. The paper reported strong performance on financial tasks while maintaining competitive general-purpose performance. The training corpus included a large proprietary financial-data component. citeturn4academia19

This case is important because it demonstrates a legitimate reason to build a domain-specific model:

> **The organization's proprietary data, domain requirements, and product economics can themselves create a sufficiently strong reason to own model capability.**

But this is a very different proposition from:

> “Our data is sensitive, therefore we need our own foundation model.”

Bloomberg had an unusually strong combination of:

- large proprietary financial-data assets;
- long-term data curation capability;
- specialized NLP/ML expertise;
- a broad financial product ecosystem;
- domain-specific model requirements.

Those conditions matter.

**ARCHITECTURE WARNING**

> A successful proprietary-model case is evidence that proprietary models can be strategically justified under some conditions. It is not evidence that every enterprise should build one.

## 44.6 The Three Cases Reveal Three Different Ownership Boundaries

| Organization / case | Owned strongly | Consumed / depended on | Architectural strategy |
|---|---|---|---|
| Morgan Stanley | Application, domain knowledge, retrieval, evaluation, workflow | Frontier model capability | Third-party model behind enterprise controls |
| JPMorganChase | Enterprise AI platform, controls, workflows, data architecture | Leading third-party models | Proprietary platform + model flexibility |
| Bloomberg | Model capability + proprietary financial data | Underlying infrastructure/ecosystem | Domain-specific proprietary model |

The key observation is that **ownership can be placed at different layers**.

That is more useful than a simple build-versus-buy decision.

## 44.7 Proprietary Does Not Mean More Secure by Definition

Security depends on the architecture and controls around the system.

A proprietary model may provide greater control over some dimensions, such as model weights, deployment environment, or training process. It can simultaneously create additional responsibilities for:

- infrastructure security;
- model supply chain;
- patching;
- evaluation;
- model lifecycle management;
- access control;
- monitoring;
- incident response;
- specialist staffing.

Conversely, a third-party model may reduce some operational responsibilities while increasing dependency and concentration risk.

NIST's Generative AI Profile explicitly discusses risks associated with third-party GAI systems and recommends considering controls such as procurement due diligence, SLAs, SBOMs, and attestation mechanisms. citeturn5search29

**FIELD RULE**

> **Do not compare “vendor risk” with “self-hosting risk.” Compare the complete risk transferred to the vendor with the complete risk retained by the organization.**

## 44.8 Data Sensitivity Does Not Determine Model Ownership by Itself

A sensitive-data requirement may be satisfied through multiple architectures:

- controlled enterprise API;
- private endpoint;
- data preprocessing;
- tokenization or masking;
- retrieval inside a controlled environment;
- self-hosted open-weight model;
- fully proprietary model infrastructure.

Therefore:

> **“The data is sensitive” is a constraint. It is not, by itself, an architecture decision.**

The advisor must ask what control is actually required:

- residency?
- retention?
- training exclusion?
- encryption?
- access isolation?
- contractual control?
- auditability?
- latency?
- operational independence?

Only then should model ownership be considered.

## 44.9 Third-Party Dependency Is a Real Architectural Risk

The argument for third-party models should not become naive vendor advocacy.

BIS identifies third-party dependencies and concentration among AI, cloud, data, and infrastructure providers as material risks for financial institutions. Shared dependencies can create operational and systemic concentration risks. citeturn5search0turn5search2turn5search4

Therefore a third-party architecture should explicitly address:

- provider outage;
- model retirement;
- material model behavior change;
- pricing changes;
- rate limits;
- contractual changes;
- data-access changes;
- jurisdictional changes;
- provider concentration;
- exit feasibility.

This connects directly to Chapter 36.

## 44.10 But Self-Hosting Creates a Different Dependency Graph

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

## 44.11 The Economics of Ownership

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

The same reasoning applies to organizational capacity.

A proprietary model may appear cheaper at high inference volume while being uneconomic after accounting for engineering, capacity, model improvement, security, and opportunity costs.

A third-party model may appear expensive per token while being economically superior if it eliminates substantial fixed costs and accelerates useful deployment.

No universal break-even point should be assumed.

## 44.12 Model Capability Is Also an Economic Variable

Frontier model capability changes rapidly.

A proprietary model investment has an implicit technological-obsolescence risk: a capability that required substantial internal investment may become commercially available from a provider later.

Conversely, a third-party dependency creates a strategic-optionality risk: the provider may change pricing, access, capabilities, or terms.

Therefore the advisor should evaluate:

**Build value − build cost − obsolescence risk**

against:

**Buy value − provider dependency cost − transition risk**.

This is a decision framework, not a financial valuation formula.

## 44.13 A Better Decision Matrix

| Dimension | Third-party model | Enterprise platform + multiple models | Self-hosted open-weight | Proprietary foundation model |
|---|---|---|---|---|
| Frontier capability access | Usually strong | Strong | Variable | Depends on investment |
| Control over weights | Low | Low/variable | High | High |
| Operational burden | Lower | Medium | High | Very high |
| Provider dependency | High | Lower if multi-provider | Model/ecosystem dependency | Lower at model-provider layer |
| Infrastructure responsibility | Lower | Medium | High | Very high |
| Model differentiation | Low | Medium through routing/data/workflow | Medium | Potentially high |
| Data control | Architecture-dependent | Architecture-dependent | High deployment control | High deployment control |
| Time to deploy | Usually faster | Medium | Medium/high | Slow |
| Specialized talent required | Lower | Medium/high | High | Very high |
| Exit complexity | Contract/model migration | Potentially lower | Model/runtime migration | Internal transition complexity |

These are qualitative architectural tendencies, not universal measurements.

## 44.14 A More Defensible Enterprise Pattern: Own the Boundary

For many enterprise AI systems, a useful default architecture is:

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
└──────────────────────────────────────────────────┘
                 ↓              ↓
             Model A        Model B
             Provider       Provider
```

The organization owns the **decision-support boundary** while treating foundation models as replaceable capabilities where practical.

This is not always the correct architecture. It becomes less attractive when a specific model capability itself is a strategic differentiator that cannot reasonably be obtained externally.

## 44.15 When Proprietary Model Development Becomes More Justifiable

A proprietary model becomes more defensible when several conditions converge, such as:

1. **Distinctive proprietary data** provides meaningful model advantage.
2. **Domain-specific capability** materially exceeds what general models can provide.
3. **Inference volume** is sufficiently large to justify infrastructure and engineering investment.
4. **Model behavior or deployment constraints** cannot reasonably be satisfied by available providers.
5. **Strategic differentiation** depends directly on model capability.
6. **Internal technical capability** is strong enough to operate the lifecycle.
7. **The organization can sustain continuous investment**, not merely build a one-time model.

These are decision criteria, not necessary-and-sufficient conditions.

## 44.16 When Third-Party Models Become More Justifiable

Third-party models become more attractive when:

- frontier capability matters;
- model technology is changing rapidly;
- the use case does not require proprietary model weights;
- enterprise security controls can satisfy the actual data requirements;
- time-to-value matters;
- internal model engineering capacity is limited;
- model differentiation is not itself the competitive moat;
- multiple providers can provide credible alternatives;
- the organization can establish a realistic exit strategy.

Again, these are architectural decision criteria rather than universal rules.

## 44.17 The Most Important Question: Where Is the Moat?

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

> “The model itself performs a capability that competitors cannot obtain elsewhere,”

then model ownership deserves deeper consideration.

**ADVISOR LENS**

> **Own the layer that creates strategic differentiation; buy or consume layers where differentiation is weak and the market can supply them efficiently—subject to security, resilience, and exit constraints.**

## 44.18 What Would Change Our Mind?

For a recommendation favoring third-party models, evidence that could change the decision includes:

- repeated provider outages affecting critical operations;
- materially unfavorable contractual changes;
- inability to satisfy required data controls;
- persistent model-performance gaps on proprietary tasks;
- unacceptable concentration risk;
- credible evidence that a self-hosted model materially improves economics or control.

For a recommendation favoring proprietary development, evidence that could change the decision includes:

- frontier providers closing the capability gap;
- materially lower third-party cost;
- improved enterprise controls from providers;
- insufficient internal engineering capacity;
- faster external model improvement than internal development;
- evidence that model ownership does not produce meaningful differentiation.

## 44.19 Advisor Decision Template

When evaluating “build our own LLM,” the advisor should produce:

| Question | Finding |
|---|---|
| Required capability | What must the model actually do? |
| Data constraint | What data must be protected and how? |
| Model requirement | What capability is unavailable externally? |
| Architecture alternatives | Which credible options exist? |
| Industry evidence | Who has used each pattern? |
| Technical evidence | What supports feasibility? |
| Economics | What is the complete lifecycle cost? |
| Dependency | What dependency does each option create? |
| Exit | How can the organization change course? |
| Recommendation | Which option is justified and why? |
| Confidence | How strong is the evidence? |
| What would change our mind? | Which measurable conditions would reverse the recommendation? |

## 44.20 Field Rule

> **Do not build a foundation model merely because you can. Do not buy one merely because it is available. Decide which architectural layer the organization must control, which layer the market can efficiently provide, and how the boundary remains secure, economically justified, and reversible.**
