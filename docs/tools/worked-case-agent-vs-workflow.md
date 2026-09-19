# Worked Case — Agent or Deterministic Workflow?

**Decision stage:** Selecting / Architecture approval

## Situation

A team proposes an AI agent for a process that currently runs deterministically.

Ask first:

> **Which uncertainty actually requires autonomous reasoning?**

Separate deterministic steps, bounded choices, uncertain interpretation, and external side effects.

| Dimension | Deterministic workflow | Agentic workflow |
|---|---|---|
| Predictability | Generally higher | More variable |
| Flexible interpretation | Limited | Potentially higher |
| Authorization | Explicit workflow controls | Must be independently enforced |
| Testing | More bounded | Broader behavioral testing |
| Failure analysis | More bounded | More complex |

This is not a universal ranking; the appropriate choice depends on the process and evidence.

## What Must Be True

Agentic behavior should be introduced only if meaningful uncertainty requires autonomous reasoning, the resulting value can be measured, side effects can be constrained and authorized, and the additional failure surface can be monitored and recovered.

## Evidence to Request

Request representative task traces, baseline workflow performance, examples the deterministic workflow cannot handle efficiently, agent success/failure rates by task class, tool-use and authorization tests, recovery evidence, and latency/cost impact.

## Technical Position

Do not introduce autonomy merely because it is possible. Identify the specific uncertainty, quantify its value, and demonstrate that the additional failure and control surface is justified.

**Advisor lesson:** Use autonomy where uncertainty creates measurable value.
