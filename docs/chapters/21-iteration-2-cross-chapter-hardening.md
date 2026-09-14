# Chapter 21 — Iteration 2 Cross-Chapter Hardening

## Scope

This pass reviewed Chapter 21 against Chapters 19, 20, 22, and 14 to prevent semantic overlap, contradictory security assumptions, and source overreach.

## Findings

### 1. Source-scope correction

NIST SP 800-111 is authoritative but specifically addresses storage encryption technologies for end-user devices. It is not sufficient evidence for a universal enterprise encryption architecture. The evidence review now states this explicitly.

### 2. Privacy Framework status correction

NIST Privacy Framework 1.1 is still an update project / Initial Public Draft. Chapter 21 must not present PF 1.1 as a final framework. Published PF 1.0 remains the final framework referenced for established claims unless a newer final source supersedes it.

### 3. Chapter boundary: security vs data protection

Chapter 19 owns the security architecture and trust boundary. Chapter 21 owns protection of data across its lifecycle and processing path. Chapter 21 therefore should not redefine the security model.

### 4. Chapter boundary: authorization

Chapter 20 owns identity, authentication, authorization, delegation, and privilege propagation. Chapter 21 consumes those controls when discussing RAG, tool-mediated data movement, logs, indexes, and external providers. It should not introduce a competing authorization model.

### 5. Chapter boundary: threats

Chapter 22 owns the AI-specific threat taxonomy. Chapter 21 may explain how a threat affects data protection, but should not duplicate the complete threat analysis.

### 6. Chapter boundary: governance and lineage

Chapter 14 owns governance, ownership, metadata, lineage, and provenance. Chapter 21 uses these concepts to reason about protection and lifecycle but does not redefine them.

## Adversarial Questions

- If encryption keys are compromised, which other controls remain effective?
- If the model provider is compromised, what data has crossed the provider boundary?
- If an agent is fully compromised, can it move sensitive data through legitimate tools?
- If a source record is deleted, which derived artifacts remain?
- If retrieval authorization fails, can final-output filtering actually undo the exposure?
- If logs contain sensitive prompts or retrieved documents, does observability become a secondary data store?
- If minimization removes evidence needed for an investment decision, where is that trade-off evaluated?
- If a provider changes retention or processing behavior, what architecture assumptions become invalid?

## Result

No evidence was found requiring a new universal security control or provider-specific architecture. The main corrections were epistemic and architectural-boundary corrections: use sources within their actual scope, keep chapter responsibilities distinct, and treat data movement and derived artifacts as first-class protection concerns.

## Remaining Quality Gate

After Chapter 21 content itself is revised, perform a final semantic review across Chapters 19–22 and verify the VitePress build before treating the sequence as stable.
