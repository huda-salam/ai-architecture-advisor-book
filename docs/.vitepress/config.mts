import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI Technology & Architecture Advisor',
  description: 'A technical advisory field manual for AI, architecture, data, cloud, security and enterprise technology decisions.',
  lang: 'en-US',
  base: '/ai-architecture-advisor-book/',
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Chapters', link: '/chapters/00-reasoning-evidence' }
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
          { text: '8. AI Architecture Fundamentals', link: '/chapters/08-ai-architecture-fundamentals' }
        ]
      }
    ],
    search: {
      provider: 'local'
    },
    footer: {
      message: 'Technical advisory field manual — living document.',
      copyright: 'Maintained as an evolving architecture reference.'
    },
    editLink: {
      pattern: 'https://github.com/huda-salam/ai-architecture-advisor-book/edit/main/docs/:path'
    }
  }
})
