import { NextRequest } from 'next/server';

const API_BASE = process.env.CHATBOT_API_URL ?? 'http://localhost:8000';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const upstream = await fetch(`${API_BASE}/api/chatbot/chat/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
