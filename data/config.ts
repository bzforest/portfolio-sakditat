// ──────────────────────────────────────────────────────────────────────────────
// data/config.ts — Static site configuration & personal data
// ──────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name: 'Best',
  fullName: 'Sakditat Thoumsaeng',
  role: 'Junior Full-Stack Developer',
  bio: 'A creative developer who loves turning complex problems into elegant, user-friendly experiences. Passionate about modern web technologies, interactive UIs, and building products that make a real difference.',

  // RPG character flavour
  class: 'Code Adventurer',
  guild: 'Open to Work',
  location: 'Thailand 🇹🇭',
  level: 'Junior',

  // ── Categorised tech-stack skills ──────────────────────────────────────────
  skillCategories: [
    {
      category: 'Frontend',
      emoji: '🖥️',
      skills: [
        'HTML', 'CSS', 'JavaScript', 'TypeScript',
        'React', 'Vue.js', 'Next.js', 'Tailwind CSS',
        'Framer Motion', 'Zustand',
      ],
    },
    {
      category: 'Backend',
      emoji: '⚙️',
      skills: [
        'Node.js', 'Express.js', 'Springboot',
        'REST API', 'WebSocket',
      ],
    },
    {
      category: 'Database & Other',
      emoji: '🗄️',
      skills: [
        'MongoDB', 'PostgreSQL', 'Supabase',
        'Git / Github', 'Vercel', 'Postman',
        'Gemini API', 'Authentication',
      ],
    },
  ],

  contact: {
    email: 'bestsakditat@gmail.com',
    github: 'https://github.com/bzforest',
    linkedin: 'https://www.linkedin.com/in/sakditat-thoumsaeng/',
  },
} as const;

export type SiteConfig = typeof siteConfig;
export type SkillCategory = SiteConfig['skillCategories'][number];
