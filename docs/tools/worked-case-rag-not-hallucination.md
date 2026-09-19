# Worked Case — RAG Does Not Automatically Solve Hallucination

**Decision stage:** Selecting / Architecture approval

## Situation

A team proposes RAG and claims: “Once we add retrieval, hallucination is solved.”

## Advisor Investigation

Ask what must be true: required knowledge must be authoritative, available, retrievable, fresh, correctly authorized, correctly represented in context, and correctly used by the generation layer.

| Question | Evidence |
|---|---|
| Which sources are authoritative? | Ownership / policy |
| Can relevant material be retrieved? | Retrieval evaluation |
| What happens when retrieval fails? | Failure tests |
| Can unauthorized content be retrieved? | Authorization tests |
| How is freshness handled? | Ingestion / versioning evidence |
| Can answers be traced to evidence? | Grounding evaluation |

## Failure Modes

Wrong retrieval, stale authority, unauthorized retrieval, contradictory evidence, model misinterpretation, noisy context, and unsupported citations can all remain.

## Technical Position

RAG should be evaluated as an end-to-end retrieval-and-generation system, not treated as a hallucination switch.

## Validation

Test answerable, unanswerable, conflicting, stale, permission-boundary, ambiguous, and adversarial retrieval cases.

**Advisor lesson:** Knowledge architecture is only as trustworthy as its authority, retrieval, authorization, and evidence controls.
