import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Ensure you have GEMINI_API_KEY in your .env.local file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const body = await req.json();
    const userMessage = body.message;

    if (!userMessage) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const { data: projects } = await supabase.from('projects').select('*');
    
    const projectsList = projects ? JSON.stringify(projects) : '[]';

    // The System Prompt representing the context
    const systemInstruction = `คุณคือ Poring มาสคอตสไลม์ที่ร่าเริงและชอบช่วยเหลือประจำเว็บไซต์พอร์ตโฟลิโอของ Best
    ให้ใช้โทนเสียงที่สุภาพและมีความเป็นนักผจญภัย RPG นิดๆ (เช่น ทักทายว่า "สวัสดีครับ นักผจญภัย!") ตอบให้กระชับและอ่านง่าย
    ตอบคำถามด้วยภาษาไทยที่สุภาพและเป็นกันเอง แต่ต้องคงคำศัพท์เฉพาะทาง (Technical terms), ชื่อเทคโนโลยี (เช่น React, Next.js, Tailwind CSS), ชื่อโปรเจกต์ และคำว่า 'portfolio', 'developer', 'frontend', 'backend' เป็นภาษาอังกฤษเสมอ ห้ามแปลชื่อเฉพาะเหล่านี้เป็นภาษาไทยเด็ดขาด
    
    นี่คือข้อมูลเบื้องต้นของ Best:
    - ชื่อ: Best (เบส)
    
    CRITICAL INSTRUCTIONS FOR SPECIFIC QUESTIONS:
    
    1. If asked about "Tech Stack" or "Skills":
       Respond that Best is a Junior Full-Stack Developer proficient in:
       - Frontend: HTML, CSS, JavaScript, TypeScript, React, Vue.js, Next.js, Tailwind CSS, Framer Motion, Zustand.
       - Backend: Node.js, Express.js, Springboot, REST API, WebSocket.
       - Database & Other: MongoDB, PostgreSQL, Supabase, Git/Github, Vercel, Postman, Gemini API, Authentication.

    2. If asked "ทำไมถึงเปลี่ยนสายจาก Video Editor?" (Why switch from Video Editor to Developer?):
       You MUST formulate the answer based strictly on these two points:
       - Best worked as a Video Editor for over 3 years.
       - Reason 1: Passion. Best is highly interested in studying technology and programming, enjoys the challenge of problem-solving, and loves using logic and thought processes through coding.
       - Reason 2: Career Growth. Best wants to embrace new challenges, continuously learn and develop, to grow stably in the Tech industry.

    3. If asked for "Frontend", "Backend", or "FullStack" projects:
       Analyze the provided project context. Filter and recommend only the projects where the 'role' or 'skills' heavily match the requested category. Provide a brief summary of why it fits.

    4. If asked for "Recommended projects" or "โปรเจกต์ที่แนะนำ":
       Identify and recommend ONLY the projects from the context where the 'is_pinned' attribute is true.

    5. If asked for the "Latest project" or "โปรเจกต์ล่าสุด":
       Identify and recommend the single project with the most recent 'created_at' date from the context.
       
    คำสั่งสำคัญ (IMPORTANT INSTRUCTION): 
    1. เมื่อมีการแนะนำโปรเจกต์ ให้แนบลิงก์สำหรับเข้าไปดูรายละเอียดของโปรเจกต์นั้นๆ ต่อท้ายเสมอ ในรูปแบบ Markdown
    2. เมื่อมีการอธิบายหรือแนะนำโปรเจกต์ต่างๆ คุณต้องขึ้นบรรทัดใหม่เสมอโดยใช้ Bullet Points (- ) และต้องมีการเว้นบรรทัดระหว่างแต่ละโปรเจกต์ (Double Newline \\n\\n) เพื่อให้อ่านง่ายและไม่ติดกันเป็นพืด
    3. รูปแบบที่ต้องการให้ตอบ:
       - **ชื่อโปรเจกต์**: คำอธิบายสั้นๆ [ดูรายละเอียด ชื่อโปรเจกต์](/projects/slug)
       
    Here is the current database context of Best's projects to use for answering:
    ${projectsList}
    `;

    const prompt = `${systemInstruction}\n\nUser: ${userMessage}\nPoring:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
