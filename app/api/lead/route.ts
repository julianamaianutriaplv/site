import { NextResponse } from "next/server";

import { captureLead } from "@/lib/lead-capture";

export const runtime = "nodejs";

/**
 * POST /api/lead
 *
 * Recebe o formulário de captura de e-mail.
 * Body: { name, email, source, consent }
 *
 * Aplica:
 * - Validação básica
 * - Rate limit simples por IP (in-memory; em produção, usar Upstash/Vercel KV)
 * - Chamada ao provider configurado em LEAD_PROVIDER
 */
export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, message: "Muitas tentativas. Tente em alguns minutos." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Payload inválido." },
      { status: 400 },
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const source = typeof body.source === "string" ? body.source.trim() : "";
  const consent = body.consent === true;

  if (!name || name.length < 2) {
    return NextResponse.json(
      { ok: false, message: "Nome muito curto." },
      { status: 400 },
    );
  }
  if (!email) {
    return NextResponse.json(
      { ok: false, message: "E-mail obrigatório." },
      { status: 400 },
    );
  }
  if (!consent) {
    return NextResponse.json(
      { ok: false, message: "É preciso aceitar os termos (LGPD)." },
      { status: 400 },
    );
  }

  const result = await captureLead({
    name,
    email,
    source: source || "unknown",
    consent,
    meta: {
      ip,
      userAgent: req.headers.get("user-agent") ?? undefined,
      at: new Date().toISOString(),
    },
  });

  const status = result.ok ? 200 : 400;
  return NextResponse.json(result, { status });
}

/**
 * Rate limit simples in-memory: 5 requests por IP a cada 10 minutos.
 * Nota: limpa no restart do processo. Em produção usar Redis/Upstash/Vercel KV.
 */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
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
