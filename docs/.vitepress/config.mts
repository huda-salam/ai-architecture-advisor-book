import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'AI Technology & Architecture Advisor',
  description: 'A technical advisory field manual for AI, architecture, data, cloud, security and enterprise technology decisions.',
  lang: 'en-US',
  base: '/ai-architecture-advisor-book/',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Chapters', link: '/chapters/00-reasoning-evidence' },
      { text: 'Evidence Review', link: '/chapters/evidence-review' },
      { text: 'Editorial Standard', link: '/standards/knowledge-ready-editorial-standard' }
    ],
    sidebar: [
      {
        text: 'Part I — The Mandate',
        items: [
          { text: '0. Reasoning & Evidence Standard', link: '/chapters/00-reasoning-evidence' },
          { text: '1. Role Charter', link: '/chapters/01-role-charter' },
          { text: '2. Relationship With the Regional Director', link: '/chapters/02-relationship-with-rd' },
          { text: '3. Relationship With CTO, Head of AI & Vendors', link: '/chapters/03-relationships' },
          { text: '4. Advisor Operating Principles', link: '/chapters/04-operating-principles' },
          { text: '5. Advisory Communication & Influence', link: '/chapters/05-advisory-communication' },
          { text: 'Evidence Audit — Chapters 0–7', link: '/chapters/00-07-evidence-audit' }
        ]
      },
      {
        text: 'Part II — Technical Thinking',
        collapsed: true,
        items: [
          { text: '6. How to Evaluate a Technology Proposal', link: '/chapters/06-evaluating-proposals' },
          { text: '7. Architecture Decision Framework', link: '/chapters/07-architecture-decisions' }
        ]
      },
      {
        text: 'Part III — Enterprise AI Architecture',
        collapsed: true,
        items: [
          { text: '8. AI Architecture Fundamentals', link: '/chapters/08-ai-architecture-fundamentals' },
          { text: '9. Enterprise LLM Architecture', link: '/chapters/09-enterprise-llm-architecture' },
          { text: '10. RAG Architecture', link: '/chapters/10-rag-architecture' },
          { text: '11. Agentic Architecture', link: '/chapters/11-agentic-architecture' },
          { text: '12. Enterprise Data Architecture', link: '/chapters/12-enterprise-data-architecture' },
          { text: '13. Data Integration Architecture', link: '/chapters/13-data-integration' },
          { text: '14. Data Governance & Lineage', link: '/chapters/14-data-governance-lineage' },
          { text: '15. Cloud Architecture', link: '/chapters/15-cloud-architecture' },
          { text: '16. Compute & Model Deployment', link: '/chapters/16-compute-model-deployment' },
          { text: '17. Scalability & Performance', link: '/chapters/17-scalability-performance' },
          { text: '18. Reliability', link: '/chapters/18-reliability' },
          { text: '19. AI Security Model', link: '/chapters/19-ai-security-model' },
          { text: '20. Identity & Access Control', link: '/chapters/20-identity-access-control' },
          { text: '21. Data Protection', link: '/chapters/21-data-protection' },
          { text: '22. AI-Specific Threats', link: '/chapters/22-ai-specific-threats' },
          { text: '23. Enterprise Integration Architecture', link: '/chapters/23-enterprise-integration-architecture' },
          { text: '24. API Architecture', link: '/chapters/24-api-architecture' },
          { text: '25. AI Connectors', link: '/chapters/25-ai-connectors' },
          { text: '26. AI-IDSS Reference Architecture', link: '/chapters/26-ai-idss-reference-architecture' },
          { text: '27. Investment Risk Alert', link: '/chapters/27-investment-risk-alert' },
          { text: '28. Explainability & Evidence', link: '/chapters/28-explainability-evidence' },
          { text: '29. Human Decision Boundary', link: '/chapters/29-human-decision-boundary' },
          { text: '30. Model Selection', link: '/chapters/30-model-selection' },
          { text: '31. Model Evaluation', link: '/chapters/31-model-evaluation' },
          { text: '32. Fine-Tuning vs RAG vs Prompting', link: '/chapters/32-fine-tuning-vs-rag-vs-prompting' },
          { text: 'Evidence Review — Chapters 8–9', link: '/chapters/08-09-evidence-review' },
          { text: 'Evidence Review — Chapter 12', link: '/chapters/12-evidence-review' },
          { text: 'Evidence Review — Chapter 13', link: '/chapters/13-evidence-review' },
          { text: 'Evidence Review — Chapter 14', link: '/chapters/14-evidence-review' },
          { text: 'Evidence Review — Chapter 15', link: '/chapters/15-evidence-review' },
          { text: 'Evidence Review — Chapter 16', link: '/chapters/16-evidence-review' },
          { text: 'Evidence Review — Chapter 17', link: '/chapters/17-evidence-review' },
          { text: 'Evidence Review — Chapter 18', link: '/chapters/18-evidence-review' },
          { text: 'Evidence Review — Chapter 19', link: '/chapters/19-evidence-review' },
          { text: 'Evidence Review — Chapter 20', link: '/chapters/20-evidence-review' },
          { text: 'Evidence Review — Chapter 21', link: '/chapters/21-evidence-review' },
          { text: 'Evidence Review — Chapter 22', link: '/chapters/22-evidence-review' },
          { text: 'Evidence Review — Chapter 23', link: '/chapters/23-evidence-review' },
          { text: 'Evidence Review — Chapter 24', link: '/chapters/24-evidence-review' },
          { text: 'Evidence Review — Chapter 25', link: '/chapters/25-evidence-review' },
          { text: 'Evidence Review — Chapter 26', link: '/chapters/26-evidence-review' },
          { text: 'Evidence Review — Chapter 27', link: '/chapters/27-evidence-review' },
          { text: 'Evidence Review — Chapter 28', link: '/chapters/28-evidence-review' },
          { text: 'Evidence Review — Chapter 29', link: '/chapters/29-evidence-review' },
          { text: 'Evidence Review — Chapter 30', link: '/chapters/30-evidence-review' },
          { text: 'Evidence Review — Chapter 31', link: '/chapters/31-evidence-review' },
          { text: 'Evidence Review — Chapter 32', link: '/chapters/32-evidence-review' }
        ]
      }
    ],
    search: { provider: 'local' },
    footer: {
      message: 'Technical advisory field manual — living document.',
      copyright: 'Maintained as an evolving architecture reference.'
    },
    editLink: {
      pattern: 'https://github.com/huda-salam/ai-architecture-advisor-book/edit/main/docs/:path'
    }
  }
}))