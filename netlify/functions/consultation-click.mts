import type { Config } from '@netlify/functions';
import { db } from '../../db/index.js';
import { consultationClicks } from '../../db/schema.js';

export default async (request: Request) => {
  if (request.method !== 'POST') return new Response(null, { status: 405, headers: { Allow: 'POST' } });
  const origin = request.headers.get('origin');
  if (!origin || origin !== new URL(request.url).origin) return new Response(null, { status: 403 });
  if (!request.headers.get('content-type')?.startsWith('application/json')) return new Response(null, { status: 415 });
  const raw = await request.text();
  if (raw.length > 200) return new Response(null, { status: 413 });
  let data: unknown;
  try { data = JSON.parse(raw); } catch { return new Response(null, { status: 400 }); }
  if (!data || typeof data !== 'object' || !('path' in data) || data.path !== '/contact/') return new Response(null, { status: 400 });
  try {
    await db.insert(consultationClicks).values({ path: data.path });
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 503 });
  }
};

export const config: Config = {
  path: '/api/consultation-click',
  rateLimit: { windowLimit: 30, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};
