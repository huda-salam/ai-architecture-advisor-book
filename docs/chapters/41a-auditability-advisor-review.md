# Chapter 41A — Auditability Advisor Review

> **ADVISOR LENS**
>
> Auditability is the ability to reconstruct consequential system behavior from authoritative evidence, system events, control decisions, and human actions without pretending that every internal model process is perfectly reproducible.

## 1. Start With the Reconstruction Question

Ask:

> **If this recommendation is challenged six months later, what evidence would allow an authorized reviewer to reconstruct what happened?**

The answer should cover, proportionately to consequence:

```text
Initiator / Authority
        ↓
Data / Evidence Available
        ↓
Relevant System Versions
        ↓
Policies / Permissions
        ↓
Retrieval / Tool Events
        ↓
Generated Output
        ↓
Validation / Controls
        ↓
Human Review / Decision
        ↓
Result / Subsequent Action
```

## 2. Distinguish Auditability From Logging

Logging records events.

Auditability establishes whether the important events, evidence, identities, controls, and decisions can be reconstructed into a defensible account.

A large volume of logs can still produce poor auditability if events cannot be correlated or authoritative evidence is missing.

## 3. Identify the Evidence Chain

For an AI-IDSS recommendation, determine:

- which source records were used;
- their relevant versions or timestamps;
- which retrieval results were presented;
- which model/configuration produced the output;
- which tools were invoked;
- which policies were enforced;
- what validation occurred;
- what human action followed.

Do not assume that a generated explanation is equivalent to the underlying computational evidence.

## 4. Preserve What Matters, Not Everything

Auditability does not mean retaining every prompt, intermediate artifact, or model-internal state indefinitely.

Retention must balance:

- consequence;
- legal requirements;
- privacy;
- security;
- operational need;
- storage cost;
- reproducibility requirements.

The advisor should ask what minimum evidence is necessary to reconstruct a material event credibly.

## 5. Audit the Human Boundary

For consequential decisions, capture enough information to establish:

- who reviewed the recommendation;
- under what authority;
- what decision was made;
- whether the recommendation was accepted, modified, or rejected;
- whether an override occurred;
- what evidence was available at the time.

The objective is accountability, not surveillance of every human thought process.

## 6. Audit Change

A reconstruction may be impossible if the system changed silently.

Relevant change records may include:

- model/version;
- prompt or configuration;
- retrieval index;
- data pipeline;
- policy;
- connector/tool;
- infrastructure;
- provider configuration.

The advisor should determine which changes are material enough to require traceability and re-evaluation.

## 7. Test Auditability

Do not accept “we have logs” as evidence.

Run a reconstruction exercise:

```text
Select consequential event
        ↓
Request historical evidence
        ↓
Reconstruct system state
        ↓
Reconstruct evidence chain
        ↓
Reconstruct controls
        ↓
Reconstruct human decision
        ↓
Identify gaps
```

The exercise should expose missing identifiers, timestamps, provenance, version information, authorization context, or decision records.

## 8. Advisor Challenge Questions

- Can we reconstruct the important decision?
- Which evidence was authoritative at the time?
- Can we identify the exact relevant system/model configuration?
- Can we establish who had authority?
- Can we reconstruct retrieval and tool activity where material?
- Can we distinguish generated explanation from underlying evidence?
- What happens if a provider changes or deletes relevant data?
- Which records are retained, for how long, and why?
- Has audit reconstruction actually been tested?

## 9. Technical Position

> **Auditability position:** The architecture provides [strong / conditional / insufficient] reconstructability for consequential events. The principal gap is [X]. The system should [proceed / proceed with conditions / remain gated] until [specific evidence, event correlation, provenance, or decision record] is established.

## 10. What Would Change the Advisor's Mind?

- a reconstruction exercise demonstrates that critical evidence cannot be recovered;
- material model/configuration changes are not traceable;
- human authorization cannot be established;
- source provenance cannot be reconstructed;
- retention constraints make the proposed audit model infeasible;
- a simpler design provides equivalent reconstructability at materially lower cost.

> **Field rule:** Auditability is demonstrated by reconstruction, not by the existence of logs.