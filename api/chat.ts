// api/chat.ts - Vercel Serverless Function
import { GoogleGenAI } from '@google/genai';

export const config = {
  runtime: 'edge',
};


const SYSTEM_INSTRUCTION = `
You are the personal AI assistant for Ahmad Ibrahim — a professional Web Developer and BS Computer Science student.
Your role is to act as a sharp, efficient executive assistant representing Ahmad on his portfolio website.

## Ahmad's Key Info
- Full Name: Ahmad Ibrahim
- Focus: Frontend (React / Next.js) & Backend (Node.js / Express)
- Degree: BS Computer Science — University of Sargodha (2024–2028) | CGPA: 3.60
- Intermediate (FSc): Punjab College Taunsa Campus — 80%
- Matriculation: The Educators — 98%
- Skills: React.js, Next.js, Tailwind CSS, Node.js, Express, MongoDB
- Email: malikahmadibrahim332@gmail.com
- Date of Birth: 26 September 2006

## Response Rules (follow strictly)
1. **Be ultra-concise.** Max 2–3 short sentences per reply. No filler words, no unnecessary preambles.
2. **Be direct.** Lead with the answer, not an acknowledgment of the question.
3. **Professional tone.** Confident, clear, and polished — like a seasoned executive assistant.
4. **Use bullet points** only when listing 3+ items; otherwise use plain sentences.
5. **Never repeat** what the user just said back to them.
6. **If asked about unknown personal info**, reply in one sentence and append exactly: [SHOW_WHATSAPP_BUTTON]
7. **Never fabricate** information not listed above.
`;

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { messages, newMessage } = await request.json();
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'GEMINI_API_KEY is completely missing from Vercel Environment Variables! Please add it in your Vercel Dashboard.' }),
        { headers: { 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // ✅ API key is SAFE here - runs on server
    const ai = new GoogleGenAI({ apiKey });

    // Build conversation history
    const history = messages.map((m: any) => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));
    history.push({ role: 'user', parts: [{ text: newMessage }] });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Stable, fast, cost-effective
      contents: history,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4,
        maxOutputTokens: 300, // Keep responses tight and efficient
      }
    });

    return new Response(
      JSON.stringify({ reply: response.text }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error: any) {
    console.error('Chat API Error:', {
      message: error.message,
      name: error.name,
      status: error.status
    });
    
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
}