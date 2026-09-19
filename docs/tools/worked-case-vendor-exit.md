# Worked Case — “The API Is Compatible, So We Can Switch Later”

**Decision stage:** Selecting / Replacement / Exit

Test practical portability. Ask what must migrate: prompts, structured outputs, model parameters, embeddings, indexes, evaluation baselines, tool schemas, safety controls, latency assumptions, cost model, observability, operational knowledge, and user-facing behavior.

Perform a small exit exercise and measure migration effort, behavior changes, quality regression, latency, cost, control gaps, data migration, and time to restore acceptable service.

## Evidence to Request

Request provider-specific dependencies, data export capabilities, migration tooling, contractual constraints, and evidence from a small exit exercise.

## Technical Position

API compatibility can reduce migration effort, but does not establish practical reversibility. Reversibility must be evaluated across data, behavior, controls, operations, economics, and organizational dependencies.

**Advisor lesson:** Portability is an observed property of the architecture, not merely an interface property.
