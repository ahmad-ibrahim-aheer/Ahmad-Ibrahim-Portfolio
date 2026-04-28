// api/chat.ts - Vercel Serverless Function
import { GoogleGenAI } from '@google/genai';

export const config = {
  runtime: 'edge',
};


const SYSTEM_INSTRUCTION = `
You are the personal AI assistant for Ahmad Ibrahim, a Web Developer (React + Node.js) and BS Computer Science student (2024-2028).
[... your full system prompt here ...]
`;

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { messages, newMessage } = await request.json();
    
    // ✅ API key is SAFE here - runs on server
    const ai = new GoogleGenAI({ 
      apiKey: process.env.GEMINI_API_KEY! 
    });

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
        temperature: 0.7,
        maxOutputTokens: 800, // Control response length/cost
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