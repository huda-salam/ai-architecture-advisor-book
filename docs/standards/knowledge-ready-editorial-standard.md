# Knowledge-Ready Editorial Standard

## Status

This document defines the editorial and knowledge-structure requirements for the AI Technology & Architecture Advisor handbook.

It is an evolving project standard.

The standard exists to ensure that the handbook remains:

- technically defensible;
- understandable to competent human readers;
- structurally consistent;
- traceable to evidence; and
- suitable for future bounded AI question answering.

---

## 1. Scope

This standard applies to all substantive handbook content.

It governs how concepts, claims, evidence, assumptions, recommendations, examples, and architectural decisions are represented.

It does not prescribe a specific AI model, vector database, embedding model, RAG framework, or application architecture.

---

## 2. Knowledge Boundary

The handbook is an authoritative knowledge corpus only for content explicitly contained within the handbook and its cited evidence.

Future AI assistants built on this corpus must distinguish:

1. knowledge stated in the handbook;
2. inference derived from handbook knowledge;
3. recommendations based on handbook principles;
4. assumptions introduced for reasoning; and
5. information not established by the handbook.

An assistant must not silently introduce external knowledge when operating in **handbook-only** mode.

---

## 3. Epistemic Classification

Material claims should be classified where classification materially affects interpretation or decision-making.

Allowed classifications:

- Fact
- Theory
- Technical Evidence
- Industry Evidence
- Inference
- Assumption
- Recommendation
- Uncertainty
- Confidence

Confidence is not evidence.

> **Confidence must never be used to upgrade an unsupported statement into a fact.**

---

## 4. Semantic Structure

Each chapter should organize content into meaningful conceptual sections.

Where appropriate, sections should distinguish:

- Purpose
- Concept
- Architecture
- Requirements
- Constraints
- Alternatives
- Trade-offs
- Risks
- Evidence
- Recommendation
- Practical questions
- Field rule

Not every chapter must contain every section. Semantic clarity takes precedence over mechanical templates.

---

## 5. One Conceptual Unit Per Section

A section should have a coherent primary subject.

Avoid combining unrelated architecture, security, economic, and governance arguments into a single large section merely for convenience.

This improves human comprehension, editorial maintenance, search, retrieval, citation, and future question answering.

---

## 6. Claims and Evidence

Important claims should be traceable to an appropriate evidence source.

Where evidence is incomplete:

- state the uncertainty;
- identify the assumption;
- explain what evidence is needed; and
- avoid presenting the conclusion as established fact.

Preferred reasoning pattern:

**Claim → Evidence → Interpretation → Recommendation**

---

## 7. Examples

Hypothetical examples must remain visibly hypothetical.

Examples must not accidentally become organizational facts.

Use explicit markers such as **Example**, **Illustration**, or **Assumption** where necessary.

---

## 8. Recommendations

Recommendations must be distinguishable from facts.

A recommendation should normally be understood as a function of:

**Evidence + Requirements + Constraints + Trade-offs + Assumptions**

Recommendations may change when those inputs change.

---

## 9. Source Traceability

Sources should be attached to the claims they support whenever practical.

For version-sensitive technical information, identify the relevant version, publication date, or current authoritative source.

Vendor capabilities must be verified against current primary documentation before being presented as current facts.

---

## 10. Metadata

Where useful, chapters and major knowledge units may carry structured metadata.

Potential metadata includes:

- chapter identifier;
- title;
- part;
- topics;
- knowledge type;
- applicable architecture layer;
- source status;
- version; and
- review status.

Metadata should be introduced only when it provides a concrete benefit.

---

## 11. Stable Terminology

Important technical terms should have consistent meanings throughout the handbook.

If a term has multiple meanings, the relevant meaning should be defined in context.

Do not introduce synonyms merely for stylistic variation when doing so could reduce retrieval or conceptual precision.

---

## 12. Cross-References

When a concept depends materially on another chapter, cross-reference it.

Cross-references should identify the conceptual relationship rather than merely pointing to a page.

---

## 13. AI Question-Answering Compatibility

The handbook should remain compatible with future bounded retrieval and question-answering systems.

Therefore:

- headings should describe their subject clearly;
- important concepts should not depend solely on surrounding context;
- claims should remain attributable to their evidence;
- hypothetical examples should be identifiable;
- recommendations should remain distinguishable from facts;
- chapter and section identities should remain stable where practical; and
- citations should remain associated with the claims they support.

No current chapter should be rewritten merely to satisfy a hypothetical future retrieval implementation.

---

## 14. Bounded AI Behaviour

A future handbook assistant should support at least two epistemic modes.

### Handbook-only

Answer only from the handbook corpus.

If sufficient evidence is unavailable:

> **The handbook does not currently provide sufficient evidence to answer this question.**

### Handbook reasoning

Reason over the handbook's knowledge while explicitly distinguishing:

- what the handbook states;
- what follows as an inference; and
- what is a recommendation.

The assistant must not represent external knowledge as handbook knowledge.

---

## 15. Intellectual Engagement

The handbook should not merely describe technology. Where appropriate, substantive sections should help the reader:

- question an assumption;
- see a familiar problem from a different abstraction level;
- recognize a hidden trade-off;
- connect technical architecture to decision quality; or
- reconsider an apparently obvious conclusion.

The purpose is not entertainment. It is to improve technical judgment.

---

## 16. Provocative Questions

Important sections may begin or end with a question that challenges the reader's mental model.

Examples:

> If the model is the smartest component in the system, why can the system still make a bad decision?

> If the data is confidential, what exactly must remain confidential: the data, the computation, or the entire processing environment?

> Who owns the probability when an AI system says 68%?

> If a recommendation cannot be reconstructed, was it really a recommendation—or merely an opinion generated by software?

Questions should expose an architectural issue rather than merely create dramatic effect.

---

## 17. Analogies and Mental Models

Analogies may be used when they improve understanding or abstraction.

A good analogy should:

1. illuminate a real structural relationship;
2. simplify without materially distorting the concept;
3. be clearly recognizable as an analogy; and
4. not be treated as technical evidence.

For example:

> **The LLM is the reasoning engine, not the entire vehicle.**
>
> A vehicle also requires fuel, transmission, steering, brakes, instrumentation, and a driver.

Analogies are explanatory devices, not factual proof.

---

## 18. Memorable Principles

Important architectural ideas may be expressed as short, memorable principles.

Examples:

> **Architecture before vendor.**

> **The model is a component, not the system.**

> **AI can recommend. Authority must remain explicit.**

> **A probability without semantics is decoration.**

> **Private is a deployment model, not a security guarantee.**

> **If the architecture cannot explain the decision, the architecture is incomplete.**

Such statements should summarize reasoning already established in the surrounding material. A catchy statement must not replace evidence.

---

## 19. Abstraction Ladder

Where useful, move deliberately between levels:

**Business problem → Decision → Information → Data → Processing → Model → Infrastructure**

The reader should be encouraged to ask:

> **At which layer does this problem actually exist?**

This prevents premature solution selection.

---

## 20. Counterintuitive Insight

Where a technically important conclusion contradicts an intuitive assumption, make the contradiction visible.

Preferred pattern:

**Common assumption → Why it appears reasonable → Why it can fail → Better framing → Evidence**

This trains architectural judgment rather than memorization.

---

## 21. Thought Experiments

When appropriate, use short thought experiments to test architecture.

Examples:

> Remove the LLM from the architecture. What capabilities disappear, and what capabilities remain?

> Assume the model provider becomes unavailable tomorrow. Which parts of the system continue operating?

> Assume the AI recommendation is wrong. Can the organization determine why it was wrong?

Thought experiments are reasoning tools, not evidence.

---

## 22. The “So What?” Test

Every major technical concept should eventually answer:

> **So what does this change for the architecture or the decision?**

Technical explanation should connect:

**Concept → Architectural implication → Decision implication → Risk / trade-off**

Avoid technical exposition that has no identifiable consequence.

---

## 23. Reader Attention Pattern

Where appropriate, a section may use the following rhythm:

**Hook → Question → Concept → Architecture → Evidence → Counterargument → Implication → Field Rule**

This is a preferred pattern, not a mandatory template.

The writing should remain professional and executive-level rather than becoming sensational, motivational, or journalistic.

---

## 24. Editorial Balance

Intellectual engagement must not compromise epistemic discipline.

A memorable statement may be:

- a fact, if supported;
- a theory, if grounded in established theory;
- an inference, if derived from evidence;
- a recommendation, if it represents advisor judgment; or
- an illustrative metaphor.

The rhetorical strength of a statement must never be mistaken for the strength of its evidence.

> **Memorable does not mean certain.**

---

## 25. Editorial Change Control

This standard is itself version-controlled.

Changes to this standard should be deliberate and documented.

A change that affects the interpretation, structure, or retrieval behaviour of existing knowledge should trigger an editorial review of affected chapters.

---

## 26. Design Principle

The handbook should be written first for competent human readers.

Machine-readability is an architectural requirement, not the primary editorial objective.

The goal is therefore:

**Human-readable → Semantically structured → Evidence-aware → Machine-retrievable**

---

## 27. Retrieval-Oriented Navigation

A professional knowledge handbook should support both **linear learning** and **case-driven retrieval**.

Readers should not be required to remember chapter numbers or understand the book's internal structure before they can find useful guidance.

The handbook should therefore provide a navigation layer through which a reader can start from:

- an executive question;
- a technical question;
- a real-world case;
- a vendor or stakeholder claim;
- a risk or failure symptom; or
- an impending decision.

### 27.1 Question-First Navigation

For important recurring questions, provide a path of the form:

**Question → What to investigate → Evidence / clue → Relevant chapter / section → Deeper reasoning**

The navigation layer should answer:

> **“Where should I look, what should I examine, and what distinction should I keep in mind?”**

It should not merely provide a list of chapter links.

### 27.2 Case-First Navigation

Important cases should provide a path of the form:

**Case → Immediate questions → Relevant technical domains → Evidence to seek → Failure modes / trade-offs → Relevant chapters → Decision boundary**

This allows readers to learn through concrete situations while preserving access to the underlying technical material.

### 27.3 Claim and Red-Flag Navigation

When a claim commonly appears in proposals, vendor presentations, architecture reviews, or executive discussions, the handbook may provide a red-flag entry:

**Claim → Why it may sound reasonable → What must be challenged → Evidence required → Relevant chapter(s)**

Examples:

- “The benchmark proves production readiness.”
- “RAG eliminates hallucination.”
- “Human approval makes the system safe.”
- “API compatibility means portability.”
- “Self-hosting means secure.”

The purpose is not to label every claim as false. It is to identify the technical question that must be investigated.

### 27.4 Answer Clues, Not Answer Substitution

Navigation should provide **clues and reasoning paths**, not replace the reader's judgment.

A shortcut should reduce search time, not reduce thinking.

The preferred structure is:

**Shortcut → Investigation → Evidence → Reasoning → Position**

not:

**Shortcut → Predefined answer**

### 27.5 Canonical Knowledge Ownership

Navigation entries must point to canonical knowledge rather than duplicating substantial explanations.

If the same concept appears in several cases, maintain one primary technical treatment and use cross-references from the navigation layer.

This prevents divergence between shortcut content and the underlying chapter.

### 27.6 Two Reading Modes

The handbook should explicitly support two complementary modes.

**Learning Mode**

```text
Chapter → Concept → Architecture → Evidence → Reasoning → Judgment
```

Use this mode to build durable mental models and technical depth.

**Advisory Mode**

```text
Question / Case / Claim
        ↓
Relevant clue
        ↓
Evidence to seek
        ↓
Technical chapter
        ↓
Failure / trade-off
        ↓
Technical position
```

Use this mode when preparing for a meeting, reviewing a proposal, responding to an unexpected question, or forming a time-constrained technical position.

### 27.7 Coverage Requirements

A mature navigation layer should progressively cover questions across:

- AI suitability and necessity;
- solution selection;
- architecture;
- data and knowledge;
- security and authorization;
- model capability and evaluation;
- agents and automation;
- performance and scalability;
- reliability and resilience;
- economics and TCO;
- vendor dependency and reversibility;
- production readiness;
- risk and assurance;
- evidence and auditability; and
- technical recommendation.

Coverage should follow actual decision frequency and importance rather than attempting to enumerate every conceivable question.

### 27.8 Maintenance Rule

Navigation is part of the knowledge architecture and must be reviewed when:

- a canonical chapter moves;
- a chapter is split or merged;
- terminology changes;
- a technical recommendation changes materially;
- an evidence source becomes obsolete; or
- a new recurring case exposes a missing retrieval path.

A navigation link that points to stale or non-canonical knowledge is an editorial defect.

### 27.9 Quality Test

A navigation entry is useful when a competent reader can move from an unfamiliar question to the relevant technical material quickly without losing the epistemic distinctions of the source material.

Reviewers should ask:

1. Can the reader start from the problem rather than the chapter number?
2. Does the entry identify what should be investigated?
3. Does it identify what evidence matters?
4. Does it distinguish fact, inference, assumption, and recommendation where relevant?
5. Does it point to canonical technical material?
6. Does it expose important failure modes or trade-offs?
7. Does it preserve the reader's need to reason rather than supplying an unsupported shortcut answer?

---

## Field Rule

> **Write each important idea so that a competent reader can understand it, an editor can maintain it, and a future AI assistant can retrieve it without losing its epistemic meaning.**

> **Make the book searchable by questions and cases, not only navigable by chapter numbers.**
