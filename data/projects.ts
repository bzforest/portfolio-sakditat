export type ProjectDetails = {
  slug: string;
  title: string;
  questType: string;
  role: string;
  timeline: string;
  skills: string[];
  lore: string;
  links: { demo: string | null; frontend: string | null; backend: string | null };
  image: string;
};

export const mockProjects: ProjectDetails[] = [
  {
    slug: 'vibecart',
    title: 'VibeCart',
    questType: '✦ MAIN QUEST',
    role: 'Frontend Developer',
    timeline: '2023 - 2024',
    skills: ['Angular', 'TypeScript', 'Tailwind CSS', 'RxJS'],
    lore: 'แอปพลิเคชันช้อปปิ้งออนไลน์ที่สร้างด้วย Angular เพื่อมอบประสบการณ์การเลือกซื้อสินค้าที่น่าสนใจและใช้งานง่าย ระบบถูกออกแบบมาให้รองรับการจัดการ State ที่ซับซ้อน และมีหน้าตา UI ที่เป็นมิตรกับผู้ใช้งาน',
    links: { demo: '#', frontend: '#', backend: null },
    image: '/image/chatbot/mock-poring.png' // using poring as placeholder
  }
];
