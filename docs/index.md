# AI Technology & Architecture Advisor

## A Technical Advisory Field Manual

> **How can this be done correctly from a technology and architecture perspective?**

This handbook is for an independent technical advisor supporting executive decision-making on AI and enterprise technology.

It is not an AI strategy plan, product manual, or implementation guide. Its purpose is to develop the judgment required to assess proposals, challenge assumptions, compare architectures, communicate second opinions and dissenting views, and provide defensible technical recommendations.

### Executive entry points

- [Executive Summary](./executive-summary)
- [Advisor Quick Reference](./advisor-quick-reference)
- [Advisor Case & Question Navigator](./advisor-case-navigator)

> **Read linearly if you want to learn. Navigate by case when you need to act.**

### The architecture spine

```mermaid
flowchart TD
    A[Data Sources] --> B[Data / Cloud Layer]
    B --> C[Processing & Intelligence Pipeline]
    C --> D[AI / ML / LLM Models]
    D --> E[Agents / Workflows]
    E --> F[AI-IDSS]
    F --> G[Regional Director Interface]
```

Cross-cutting concerns:

**Security · Identity · Governance · Audit · Evaluation · Observability · Cost · Reliability · Interoperability**

### Current chapters

- [0. Reasoning & Evidence Standard](./chapters/00-reasoning-evidence)
- [1. Role Charter](./chapters/01-role-charter)
- [2. Relationship With the Regional Director](./chapters/02-relationship-with-rd)
- [3. Relationship With CTO, Head of AI & Vendors](./chapters/03-relationships)
- [4. Advisor Operating Principles](./chapters/04-operating-principles)
- [5. Advisory Communication & Influence](./chapters/05-advisory-communication)
- [5A. AI Suitability & Opportunity](./chapters/05a-ai-suitability-opportunity)
- [6. How to Evaluate a Technology Proposal](./chapters/06-evaluating-proposals)
- [6A. From AI Opportunity to AI Solution](./chapters/06a-from-ai-opportunity-to-ai-solution)
- [7. Architecture Decision Framework](./chapters/07-architecture-decisions)
- [8. AI Architecture Fundamentals](./chapters/08-ai-architecture-fundamentals)
- [9. Enterprise LLM Architecture](./chapters/09-enterprise-llm-architecture)
- [10. RAG Architecture](./chapters/10-rag-architecture)

### Evidence reviews

- [Evidence Review](./evidence/audits/evidence-review)
- [Evidence Audit — Chapters 0–7](./evidence/chapters/00-07-evidence-audit)
- [Evidence Review — Chapters 8–9](./evidence/chapters/08-09-evidence-review)

### Project standards

- [Knowledge-Ready Editorial Standard](./standards/knowledge-ready-editorial-standard)
