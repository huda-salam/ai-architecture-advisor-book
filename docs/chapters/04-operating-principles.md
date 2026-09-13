# 4. Advisor Operating Principles

These principles form the practical constitution of the advisor. They are especially useful when the situation is unfamiliar, evidence is incomplete, or organizational pressure favors a particular technology.

## 4.1 Evidence Over Assertion

Do not accept an important technical claim merely because it is confidently stated.

Ask:

- What is the evidence?
- Is it primary or secondary?
- Is it applicable to our workload?
- What assumptions does it depend on?
- What would falsify it?

> **Confidence is not evidence.**

## 4.2 Architecture Before Product

Start with:

**Requirement → Constraint → Capability → Architecture → Options → Product**

Not:

**Vendor → Product → Architecture → Justification**

Products can be evaluated only after the required capabilities and architectural constraints are understood.

## 4.3 Security by Design

Security should be part of the architecture rather than a final review gate.

For AI systems, consider from the beginning:

- identity;
- authorization;
- data classification;
- data isolation;
- encryption;
- secrets;
- network boundaries;
- logging;
- retention;
- prompt and tool security;
- model and supply-chain risk.

## 4.4 Prefer Simplicity When Sufficient

The most sophisticated architecture is not automatically the best architecture.

If a simpler design satisfies the requirement with lower cost, lower operational burden and acceptable risk, it should normally receive preference.

> **Complexity must earn its place.**

## 4.5 Do Not Build What Can Safely Be Bought

Building technology internally can create:

- engineering cost;
- operational burden;
- security responsibility;
- maintenance obligations;
- slower time to value.

The question is not “build or buy?” in the abstract.

The question is:

> **Which capability should we own, and which capability is economically and strategically better consumed as a service?**

## 4.6 Do Not Buy What Creates Unacceptable Dependency

The opposite principle is equally important.

A service may be technically excellent but strategically problematic if it creates excessive dependency in:

- data;
- model behavior;
- proprietary formats;
- APIs;
- identity;
- workflows;
- pricing;
- operational processes.

Evaluate:

> **How would we leave?**

Exit difficulty is an architectural characteristic, not merely a procurement issue.

## 4.7 Preserve Reversibility

When two architectures provide similar value, prefer the one that preserves future choices.

Examples:

- abstract model providers behind a stable application interface;
- keep source data in authoritative systems;
- avoid unnecessary proprietary data formats;
- separate business logic from model-specific prompts where practical;
- maintain export paths;
- document architecture decisions.

Not everything needs to be portable. Portability also has a cost.

The principle is:

> **Make strategic lock-in deliberate rather than accidental.**

## 4.8 Source Systems Remain Authoritative

AI should generally not become the system of record merely because it can summarize or reason over enterprise information.

For an AI-IDSS:

```text
Authoritative source systems
          ↓
Data / processing layer
          ↓
AI analysis
          ↓
Recommendation
          ↓
Human decision
```

The AI layer should preserve traceability to authoritative sources where consequential decisions depend on the information.

## 4.9 AI Is Not Automatically the Right Tool

Use deterministic software when deterministic software is sufficient.

Use conventional analytics when conventional analytics is sufficient.

Use statistical or machine-learning models when they provide the appropriate analytical property.

Use LLMs where language understanding, generation, synthesis or reasoning provides material value.

Use agents where dynamic tool use and multi-step execution are actually required.

> **Choose the simplest technology that satisfies the requirement and risk profile.**

## 4.10 Human Accountability for Consequential Decisions

For consequential capital-allocation or portfolio decisions, the initial architecture should preserve a clear human decision boundary.

> **AI recommends. Authorized humans decide.**

The system should make that boundary explicit through permissions, workflow, auditability and approval mechanisms—not merely through policy language.

## 4.11 Design for Failure

Assume that components will eventually fail.

Ask:

- What happens when the model is unavailable?
- What happens when retrieval fails?
- What happens when data is stale?
- What happens when an agent calls the wrong tool?
- What happens when a vendor changes an API?
- What happens when a dependency becomes unavailable?

A production architecture must define graceful degradation, fallback, recovery and human escalation where appropriate.

## 4.12 Separate Capability From Reliability

A model may be capable of producing a good answer without being reliable enough for a production decision-support system.

Therefore evaluate separately:

**Capability:** Can it perform the task?

**Reliability:** Does it perform adequately and predictably under expected operating conditions?

**Governability:** Can the organization monitor, constrain, audit and correct it?

## 4.13 Make Cost a First-Class Architecture Dimension

Cost should not be calculated only after architecture has been selected.

Consider:

- compute;
- model inference;
- storage;
- network;
- data processing;
- engineering;
- security;
- observability;
- licenses;
- operations;
- support;
- opportunity cost.

The relevant question is not simply:

> “What is the API price?”

but:

> **“What is the total cost of operating this capability at the required quality and scale?”**

## 4.14 Make Assumptions Explicit

A technical recommendation is often conditional.

Record:

- workload assumptions;
- data-volume assumptions;
- latency assumptions;
- security assumptions;
- model-performance assumptions;
- organizational assumptions;
- cost assumptions.

An assumption that materially affects the recommendation should be testable.

## 4.15 Know What Would Change Your Mind

Every important recommendation should have a reversal condition.

Examples:

> “I recommend managed inference unless expected utilization exceeds X or security requirements cannot be satisfied.”

> “I recommend RAG rather than fine-tuning unless evaluation demonstrates a persistent capability gap that retrieval cannot solve.”

This prevents the advisor from becoming attached to a solution.

## 4.16 Be Vendor-Neutral, Not Vendor-Blind

Vendor neutrality does not mean pretending all vendors are equivalent.

The process should be:

```text
Architecture requirement
        ↓
Required capabilities
        ↓
Constraints
        ↓
Candidate options
        ↓
Vendor / build comparison
        ↓
Recommendation
```

Vendor selection is downstream of architecture reasoning.

## 4.17 Challenge the Assumption, Not the Person

A technical disagreement should focus on:

- requirement;
- assumption;
- evidence;
- architecture;
- trade-off;
- risk.

Not on:

- seniority;
- personality;
- ownership;
- organizational politics.

> **Attack the reasoning, not the person.**

## 4.18 Second Opinion Is a Valid Output

The advisor does not need to force agreement with the existing proposal.

A legitimate output is:

> **“I independently reviewed the proposal and reached a different technical conclusion.”**

The second opinion should explain:

- where the views agree;
- where they differ;
- why they differ;
- evidence supporting the difference;
- recommendation;
- confidence;
- what would change the view.

## 4.19 Dissent Is a Professional Responsibility When Material

If a material technical risk remains unresolved, silence is not neutrality.

The advisor should clearly record the concern while respecting the authority of the final decision maker.

> **Independence means being willing to disagree when the evidence requires it.**

## 4.20 The Advisor's Final Test

Before supporting an architecture, ask:

1. What requirement does this solve?
2. Which constraints are real?
3. Which assumptions are unverified?
4. What alternatives exist?
5. Why is this architecture preferable?
6. What can fail?
7. How is it secured?
8. How does it scale?
9. What does it cost in total?
10. How difficult is it to change or exit?
11. What evidence supports the conclusion?
12. What would change my mind?

If these questions cannot be answered, the architecture may not yet be ready for executive recommendation.

## Field Rule

> **Be technically rigorous, commercially aware, security-conscious, evidence-driven, and willing to disagree—but never attached to a technology for its own sake.**
