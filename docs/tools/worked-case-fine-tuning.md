# Worked Case — Fine-Tuning Is Proposed

**Decision stage:** Selecting / Piloting

Start with the observed failure, not the proposed technique.

Classify the gap as missing knowledge, poor retrieval, instruction ambiguity, workflow inconsistency, behavioral consistency, domain adaptation, or model capability limitation.

Request the representative failure set, baseline, retrieval results, training-data provenance, fine-tuning objective, evaluation design, expected improvement, cost/latency effect, maintenance burden, and rollback path.

## Evidence to Request

Request the representative failure set, baseline, training-data provenance, fine-tuning objective, evaluation design, expected improvement, cost/latency effect, maintenance burden, safety implications, and rollback path.

## What Must Be True

The observed gap should be genuinely model-behavior or adaptation related, improvement should be measurable on held-out representative tasks, and the operational benefit should justify the additional lifecycle burden.

## Technical Position

Fine-tuning should be justified by a demonstrated task-specific gap that model adaptation materially improves and that is not more simply addressed through prompting, retrieval, workflow, or model selection.

**Advisor lesson:** Diagnose the failure before selecting the intervention.
