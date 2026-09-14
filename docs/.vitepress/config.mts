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
      { text: 'Evidence & Reviews', link: '/evidence/' },
      { text: 'Editorial Standard', link: '/standards/knowledge-ready-editorial-standard' }
    ],
    sidebar: {
      '/chapters/': [
        {
          text: 'Part I — The Mandate',
          items: [
            { text: '0. Reasoning & Evidence Standard', link: '/chapters/00-reasoning-evidence' },
            { text: '1. Role Charter', link: '/chapters/01-role-charter' },
            { text: '2. Relationship With the Regional Director', link: '/chapters/02-relationship-with-rd' },
            { text: '3. Relationship With CTO, Head of AI & Vendors', link: '/chapters/03-relationships' },
            { text: '4. Advisor Operating Principles', link: '/chapters/04-operating-principles' },
            { text: '5. Advisory Communication & Influence', link: '/chapters/05-advisory-communication' }
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
            { text: '8A. Advisor Gateway — How to Read AI Architecture', link: '/chapters/08a-advisor-gateway' },
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
            { text: '33. Model Lifecycle', link: '/chapters/33-model-lifecycle' },
            { text: '34. AI Total Cost of Ownership', link: '/chapters/34-ai-tco' },
            { text: '35. Cost / Performance Optimization', link: '/chapters/35-cost-performance-optimization' },
            { text: '36. Vendor Dependency & Exit Strategy', link: '/chapters/36-vendor-dependency-exit-strategy' },
            { text: '37. AI Risk Framework', link: '/chapters/37-ai-risk-framework' },
            { text: '38. Technical Due Diligence', link: '/chapters/38-technical-due-diligence' },
            { text: '39. AI Architecture Review', link: '/chapters/39-ai-architecture-review' },
            { text: '40. Production Readiness', link: '/chapters/40-production-readiness' },
            { text: '41. Auditability', link: '/chapters/41-auditability' },
            { text: '42. Successful Enterprise AI Architectures', link: '/chapters/42-successful-enterprise-ai-architectures' },
            { text: '43. Failed AI Programs', link: '/chapters/43-failed-ai-programs' },
            { text: '44. Third-Party LLM vs Proprietary Model Cases', link: '/chapters/44-third-party-llm-vs-proprietary-model-cases' }
          ]
        }
      ],
      '/evidence/': [
        {
          text: 'Evidence & Reviews',
          items: [{ text: 'Overview', link: '/evidence/' }]
        },
        {
          text: 'Chapter Evidence Reviews',
          collapsed: true,
          base: '/evidence/chapters/',
          items: [
            { text: 'Chapters 0–7 Evidence Audit', link: '00-07-evidence-audit' },
            { text: 'Chapters 8–9 Evidence Review', link: '08-09-evidence-review' },
            { text: 'Chapters 8–11 Evidence Review', link: '08-11-evidence-review' },
            { text: 'Chapter 12 Evidence Review', link: '12-evidence-review' },
            { text: 'Chapter 13 Evidence Review', link: '13-evidence-review' },
            { text: 'Chapter 14 Evidence Review', link: '14-evidence-review' },
            { text: 'Chapter 15 Evidence Review', link: '15-evidence-review' },
            { text: 'Chapter 16 Evidence Review', link: '16-evidence-review' },
            { text: 'Chapter 17 Evidence Review', link: '17-evidence-review' },
            { text: 'Chapter 18 Evidence Review', link: '18-evidence-review' },
            { text: 'Chapter 19 Evidence Review', link: '19-evidence-review' },
            { text: 'Chapter 20 Evidence Review', link: '20-evidence-review' },
            { text: 'Chapter 21 Evidence Review', link: '21-evidence-review' },
            { text: 'Chapter 22 Evidence Review', link: '22-evidence-review' },
            { text: 'Chapter 23 Evidence Review', link: '23-evidence-review' },
            { text: 'Chapter 24 Evidence Review', link: '24-evidence-review' },
            { text: 'Chapter 25 Evidence Review', link: '25-evidence-review' },
            { text: 'Chapter 26 Evidence Review', link: '26-evidence-review' },
            { text: 'Chapter 27 Evidence Review', link: '27-evidence-review' },
            { text: 'Chapter 28 Evidence Review', link: '28-evidence-review' },
            { text: 'Chapter 29 Evidence Review', link: '29-evidence-review' },
            { text: 'Chapter 30 Evidence Review', link: '30-evidence-review' },
            { text: 'Chapter 31 Evidence Review', link: '31-evidence-review' },
            { text: 'Chapter 32 Evidence Review', link: '32-evidence-review' },
            { text: 'Chapter 33 Evidence Review', link: '33-evidence-review' },
            { text: 'Chapter 34 Evidence Review', link: '34-evidence-review' },
            { text: 'Chapter 35 Evidence Review', link: '35-evidence-review' },
            { text: 'Chapter 36 Evidence Review', link: '36-evidence-review' },
            { text: 'Chapter 37 Evidence Review', link: '37-evidence-review' },
            { text: 'Chapter 38 Evidence Review', link: '38-evidence-review' },
            { text: 'Chapter 39 Evidence Review', link: '39-evidence-review' },
            { text: 'Chapter 40 Evidence Review', link: '40-evidence-review' },
            { text: 'Chapter 41 Evidence Review', link: '41-evidence-review' },
            { text: 'Chapter 42 Evidence Review', link: '42-evidence-review' },
            { text: 'Chapter 43 Evidence Review', link: '43-evidence-review' },
            { text: 'Chapter 44 Evidence Review', link: '44-evidence-review' }
          ]
        },
        {
          text: 'Cross-Chapter & Adversarial Reviews',
          collapsed: true,
          base: '/evidence/cross-chapter/',
          items: [
            { text: 'Chapters 8–11 Adversarial Review', link: '08-11-iteration-6-adversarial-review' },
            { text: 'Chapters 12–18 Foundation Audit', link: '12-18-iteration-1-foundation-audit' },
            { text: 'Chapter 13 Deep Hardening', link: '13-iteration-3-deep-hardening' },
            { text: 'Chapter 15 Cloud Hardening', link: '15-iteration-5-cloud-hardening' },
            { text: 'Chapter 16 Compute Hardening', link: '16-iteration-6-compute-hardening' },
            { text: 'Chapter 17 Scalability Review', link: '17-iteration-7-scalability-review' },
            { text: 'Chapter 18 Reliability Hardening', link: '18-iteration-8-reliability-hardening' },
            { text: 'Chapter 19 AI Security Hardening', link: '19-iteration-1-ai-security-hardening' },
            { text: 'Chapter 19 Adversarial Security Review', link: '19-iteration-2-adversarial-security-review' },
            { text: 'Chapter 19 Final Review', link: '19-iteration-3-final-review' },
            { text: 'Chapter 20 Identity Hardening', link: '20-iteration-1-identity-hardening' },
            { text: 'Chapter 21 Cross-Chapter Hardening', link: '21-iteration-2-cross-chapter-hardening' },
            { text: 'Chapter 22 Adversarial Hardening', link: '22-iteration-2-adversarial-hardening' },
            { text: 'Chapter 24 Adversarial Hardening', link: '24-iteration-3-adversarial-hardening' },
            { text: 'Chapter 24 Final Review', link: '24-iteration-4-final-review' },
            { text: 'Chapter 25 Evidence Hardening', link: '25-iteration-1-evidence-hardening' },
            { text: 'Chapter 25 Adversarial Review', link: '25-iteration-2-adversarial-review' },
            { text: 'Chapter 25 Cross-Chapter Final Hardening', link: '25-iteration-3-cross-chapter-final-hardening' },
            { text: 'Chapter 26 Final Evidence & Cross-Chapter Review', link: '26-iteration-4-final-evidence-and-cross-chapter-review' },
            { text: 'Chapter 27 Final Evidence Adversarial Review', link: '27-iteration-4-final-evidence-adversarial-review' },
            { text: 'Chapter 28 Final Evidence Adversarial Review', link: '28-iteration-4-final-evidence-adversarial-review' },
            { text: 'Chapter 29 Final Evidence Adversarial Review', link: '29-iteration-4-final-evidence-adversarial-review' },
            { text: 'Chapters 30–44 Cross-Chapter Consistency Review', link: '30-44-cross-chapter-consistency-review' },
            { text: 'Chapter 30 Final Evidence Adversarial Review', link: '30-iteration-4-final-evidence-adversarial-review' }
          ]
        },
        {
          text: 'Audit & Editorial Records',
          collapsed: true,
          base: '/evidence/audits/',
          items: [
            { text: 'Evidence Review Index', link: 'evidence-review' },
            { text: 'Status Log', link: 'status-log' }
          ]
        }
      ],
      '/standards/': [
        {
          text: 'Editorial Standards',
          items: [
            { text: 'Knowledge-Ready Editorial Standard', link: '/standards/knowledge-ready-editorial-standard' }
          ]
        }
      ]
    },
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