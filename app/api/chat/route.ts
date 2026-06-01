import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }

    // Mock AI Response - Gemini API integration to be configured here later
    const reply = `Mascot response: "Hi! You asked about '${message}'. I'll tell you more once my Gemini API brain is fully wired up!"`;

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
