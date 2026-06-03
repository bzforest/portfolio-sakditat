// ──────────────────────────────────────────────────────────────────────────────
// data/config.ts — Static site configuration & personal data
// ──────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name: 'Best',
  fullName: 'Sakditat Thoumsaeng',
  role: 'Junior Full-Stack Developer',
  bio: 'A former Video Editor turned Full-Stack Developer. After over 3 years of telling stories through timelines and visuals, I discovered a deep passion for programming and logical problem-solving. Today, I blend my creative background with modern tech stacks to build seamless, user-friendly web applications, always eager to embrace new challenges in the tech industry.',

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
