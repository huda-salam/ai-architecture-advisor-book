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
          { text: 'Evidence Review — Chapters 8–9', link: '/chapters/08-09-evidence-review' },
          { text: 'Evidence Review — Chapter 12', link: '/chapters/12-evidence-review' },
          { text: 'Evidence Review — Chapter 13', link: '/chapters/13-evidence-review' },
          { text: 'Evidence Review — Chapter 14', link: '/chapters/14-evidence-review' },
          { text: 'Evidence Review — Chapter 15', link: '/chapters/15-evidence-review' },
          { text: 'Evidence Review — Chapter 16', link: '/chapters/16-evidence-review' },
          { text: 'Evidence Review — Chapter 17', link: '/chapters/17-evidence-review' },
          { text: 'Evidence Review — Chapter 18', link: '/chapters/18-evidence-review' },
          { text: 'Evidence Review — Chapter 19', link: '/chapters/19-evidence-review' }
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
