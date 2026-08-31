/**
 * Worker do site — Cloudflare Workers Static Assets.
 *
 * O HTML e os assets saem do build estático do Next (`out/`) e são servidos
 * direto pela edge, sem passar por aqui. Este Worker só é invocado para
 * requisições que não casam com nenhum arquivo — na prática, /api/lead
 * e as URLs inexistentes (404).
 */

import { captureLead, type LeadEnv } from "../lib/lead-capture";

export interface Env extends LeadEnv {
  ASSETS: Fetcher;
}

/** 5 envios por IP a cada 10 minutos. */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

/**
 * Rate limit por isolate. Não é global — um atacante distribuído passa por
 * cima. Serve para conter repetição trivial; a proteção real do formulário
 * é a Rate Limiting Rule da Cloudflare no path /api/lead (ver DEPLOY.md).
 */
const hits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_MAX) return false;
  entry.count += 1;
  return true;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

/**
 * POST /api/lead — recebe o formulário de captura de e-mail.
 * Body: { name, email, source, consent }
 */
async function handleLead(req: Request, env: Env): Promise<Response> {
  if (req.method !== "POST") {
    return json({ ok: false, message: "Método não permitido." }, 405);
  }

  const ip = req.headers.get("cf-connecting-ip") ?? "unknown";

  if (!checkRateLimit(ip)) {
    return json(
      { ok: false, message: "Muitas tentativas. Tente em alguns minutos." },
      429,
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, message: "Payload inválido." }, 400);
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const source = typeof body.source === "string" ? body.source.trim() : "";
  const consent = body.consent === true;

  if (!name || name.length < 2) {
    return json({ ok: false, message: "Nome muito curto." }, 400);
  }
  if (!email) {
    return json({ ok: false, message: "E-mail obrigatório." }, 400);
  }
  if (!consent) {
    return json({ ok: false, message: "É preciso aceitar os termos (LGPD)." }, 400);
  }

  const result = await captureLead(
    {
      name,
      email,
      source: source || "unknown",
      consent,
      meta: {
        ip,
        userAgent: req.headers.get("user-agent") ?? undefined,
        at: new Date().toISOString(),
      },
    },
    env,
  );

  return json(result, result.ok ? 200 : 400);
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    if (url.pathname === "/api/lead") {
      return handleLead(req, env);
    }

    // Nada casou com um asset: devolve a página 404 do Next com o status certo.
    const notFound = await env.ASSETS.fetch(
      new Request(new URL("/404.html", url.origin), { headers: req.headers }),
    );
    return new Response(notFound.body, {
      status: 404,
      headers: notFound.headers,
    });
  },
} satisfies ExportedHandler<Env>;
