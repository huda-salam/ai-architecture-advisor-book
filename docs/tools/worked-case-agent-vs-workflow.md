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

## Technical Position

Do not introduce autonomy merely because it is possible. Identify the specific uncertainty, quantify its value, and demonstrate that the additional failure and control surface is justified.

**Advisor lesson:** Use autonomy where uncertainty creates measurable value.
