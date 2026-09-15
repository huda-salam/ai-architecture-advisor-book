# Advisor Quick Reference

> **FOUNDATION**
>
> Use this page when preparing for, conducting, or reviewing an AI technology decision. It is intentionally concise. Follow the links when technical depth is required.

## 1. Before the Meeting

### Business

- What business problem are we solving?
- What outcome must improve?
- What is the current baseline?
- What happens if we do nothing?

→ [AI Suitability & Opportunity](./chapters/05a-ai-suitability-opportunity)

### AI necessity

- Does this problem actually require AI?
- Could conventional software solve it adequately?
- What specific AI capability is required?
- What incremental value does AI provide?

→ [AI Suitability & Opportunity](./chapters/05a-ai-suitability-opportunity)

## 2. Architecture Review

Ask:

- What are the major components?
- Where does probabilistic behavior enter the system?
- What is deterministic?
- Where are the trust boundaries?
- Where does authority reside?
- What happens when a component fails?
- What is the degraded mode?

Technical depth:

→ [AI Architecture Fundamentals](./chapters/08-ai-architecture-fundamentals)  
→ [Enterprise LLM Architecture](./chapters/09-enterprise-llm-architecture)  
→ [Reliability](./chapters/18-reliability)  
→ [AI Architecture Review](./chapters/39-ai-architecture-review)

## 3. AI / Model Review

Ask:

- Why this model?
- What alternatives were evaluated?
- What exactly has been evaluated?
- Is the evaluation representative of the intended workload?
- What are the known failure cases?
- Why prompting, RAG, fine-tuning, or an agent?
- What remains unknown?

Technical depth:

→ [Model Selection](./chapters/30-model-selection)  
→ [Model Evaluation](./chapters/31-model-evaluation)  
→ [Fine-Tuning vs RAG vs Prompting](./chapters/32-fine-tuning-vs-rag-vs-prompting)  
→ [Agentic Architecture](./chapters/11-agentic-architecture)

## 4. Data & Knowledge

Ask:

- What data does the system require?
- Is the data available and usable?
- Who owns it?
- How fresh must it be?
- How is provenance maintained?
- How are access controls enforced?
- What happens when knowledge is incomplete or stale?

Technical depth:

→ [Enterprise Data Architecture](./chapters/12-enterprise-data-architecture)  
→ [Data Integration Architecture](./chapters/13-data-integration)  
→ [Data Governance & Lineage](./chapters/14-data-governance-lineage)  
→ [RAG Architecture](./chapters/10-rag-architecture)

## 5. Security & Control

Ask:

- What data enters the AI system?
- Who can invoke it?
- What can it access?
- What tools or actions can it invoke?
- Can it exceed its intended authority?
- How is sensitive data protected?
- How are AI-specific threats contained?

Technical depth:

→ [AI Security Model](./chapters/19-ai-security-model)  
→ [Identity & Access Control](./chapters/20-identity-access-control)  
→ [Data Protection](./chapters/21-data-protection)  
→ [AI-Specific Threats](./chapters/22-ai-specific-threats)

## 6. Human Decision Boundary

Ask:

- Is AI informing, recommending, deciding, or acting?
- What decisions may AI influence?
- What decisions must remain human?
- Can the human meaningfully challenge the output?
- What happens when the AI is wrong?
- Who remains accountable?

Technical depth:

→ [Human Decision Boundary](./chapters/29-human-decision-boundary)  
→ [AI Risk Framework](./chapters/37-ai-risk-framework)

## 7. Economics

Ask:

- What is the incremental value?
- What is the full lifecycle cost?
- What drives cost at scale?
- What operational capability is required?
- What happens at 10× workload?
- What is the cost of changing or exiting the architecture?

Technical depth:

→ [AI Total Cost of Ownership](./chapters/34-ai-tco)  
→ [Cost / Performance Optimization](./chapters/35-cost-performance-optimization)  
→ [Vendor Dependency & Exit Strategy](./chapters/36-vendor-dependency-exit-strategy)

## 8. Production Readiness

Ask:

- What has actually been tested?
- What are the operational assumptions?
- How is quality monitored?
- How are failures detected?
- What is the incident response path?
- What happens when dependencies are unavailable?
- Can the consequential path be reconstructed?

Technical depth:

→ [Production Readiness](./chapters/40-production-readiness)  
→ [Auditability](./chapters/41-auditability)  
→ [Reliability](./chapters/18-reliability)

## 9. Evidence Challenge

When someone makes a material claim, ask:

> **What evidence would justify believing this claim?**

Then distinguish:

- Fact
- Assumption
- Inference
- Technical judgment
- Recommendation
- Unknown

→ [Reasoning & Evidence Standard](./chapters/00-reasoning-evidence)

## 10. The Six Executive Questions

If time is limited, ask these first:

1. **What problem are we solving?**
2. **Why does it require AI?**
3. **What measurable value does AI add?**
4. **What can go wrong, and who remains accountable?**
5. **What evidence supports the proposal?**
6. **What would make us change our recommendation?**

## 11. Recommendation Test

Before giving a technical position, confirm that you can state:

> **The problem is X. AI is / is not appropriate because Y. The appropriate AI role is Z. We considered these alternatives. The evidence shows A. The material risks are B. Therefore I recommend C, subject to D. I would revisit this recommendation if E changes.**

→ [Architecture Decision Framework](./chapters/07-architecture-decisions)

## Field Rule

> **Use the quick reference to decide what to ask. Use the technical chapters to understand whether the answers are technically credible.**
