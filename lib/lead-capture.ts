/**
 * Sistema plugável de captura de e-mails.
 *
 * Troca de provedor sem mexer no código do formulário — basta ajustar LEAD_PROVIDER.
 *
 * Runtime: Cloudflare Workers. As variáveis não vêm de `process.env` — chegam
 * pelo objeto `env` do Worker e são injetadas explicitamente (ver worker/index.ts).
 *
 * Providers suportados:
 * - console   → loga no servidor (desenvolvimento / teste antes de decidir)
 * - brevo     → Brevo (antigo SendinBlue)
 * - mailchimp → Mailchimp
 * - resend    → Resend (para envio transacional direto do PDF)
 * - none      → captura desligada
 */

/**
 * Variáveis de ambiente consumidas pela captura.
 * No Worker vêm de `env`; em scripts Node, de `process.env`.
 */
export interface LeadEnv {
  LEAD_PROVIDER?: string;
  BREVO_API_KEY?: string;
  BREVO_LIST_ID?: string;
  MAILCHIMP_API_KEY?: string;
  MAILCHIMP_LIST_ID?: string;
  MAILCHIMP_DC?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM?: string;
  NEXT_PUBLIC_SITE_URL?: string;
}

export type LeadProvider =
  | "none"
  | "console"
  | "brevo"
  | "mailchimp"
  | "resend";

export interface LeadInput {
  name: string;
  email: string;
  /** Tag/fonte do lead. Ex: "guia-rotulos", "receitas", "newsletter" */
  source: string;
  /** Aceite explícito LGPD */
  consent: boolean;
  /** IP e user-agent (anonimizável) — auditoria LGPD */
  meta?: {
    ip?: string;
    userAgent?: string;
    at?: string;
  };
}

export interface LeadResult {
  ok: boolean;
  message?: string;
  /** em alguns providers, pode haver URL de download do material */
  downloadUrl?: string;
}

function getProvider(env: LeadEnv): LeadProvider {
  return (env.LEAD_PROVIDER as LeadProvider) || "none";
}

/**
 * API pública. Chama o provider correto conforme env.
 */
export async function captureLead(
  input: LeadInput,
  env: LeadEnv,
): Promise<LeadResult> {
  if (!input.consent) {
    return {
      ok: false,
      message: "Consentimento LGPD é obrigatório.",
    };
  }
  if (!isValidEmail(input.email)) {
    return { ok: false, message: "E-mail inválido." };
  }

  const provider = getProvider(env);

  switch (provider) {
    case "none":
      return {
        ok: false,
        message:
          "Captura de leads ainda não configurada. Em breve!",
      };
    case "console":
      return captureConsole(input);
    case "brevo":
      return captureBrevo(input, env);
    case "mailchimp":
      return captureMailchimp(input, env);
    case "resend":
      return captureResend(input, env);
    default:
      return { ok: false, message: "Provider inválido." };
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Provider 1 — Console.
 * Só loga no servidor. Útil para QA antes de ligar integração real.
 */
async function captureConsole(input: LeadInput): Promise<LeadResult> {
  // Aparece em `wrangler tail` / Workers Logs. Stub para QA antes de ligar
  // a integração real.
  console.log("[lead:console]", {
    ...input,
    // nunca logar senha ou dado sensível real
  });
  return {
    ok: true,
    message: "Tudo certo! Seu cadastro foi registrado (modo teste).",
  };
}

/**
 * Provider 2 — Brevo (antigo SendinBlue).
 * Doc: https://developers.brevo.com/reference/createcontact
 */
async function captureBrevo(
  input: LeadInput,
  env: LeadEnv,
): Promise<LeadResult> {
  const apiKey = env.BREVO_API_KEY;
  const listId = env.BREVO_LIST_ID;

  if (!apiKey) {
    return {
      ok: false,
      message: "Configuração incompleta do provedor.",
    };
  }

  const body: Record<string, unknown> = {
    email: input.email,
    attributes: {
      FIRSTNAME: input.name,
      SOURCE: input.source,
      CONSENT_AT: input.meta?.at ?? new Date().toISOString(),
    },
    updateEnabled: true,
  };
  if (listId) body.listIds = [Number(listId)];

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(body),
    });

    if (res.status === 201 || res.status === 204) {
      return { ok: true, message: "Cadastro feito. Verifique seu e-mail." };
    }

    const data = (await res.json().catch(() => ({}))) as {
      code?: string;
      message?: string;
    };

    if (data.code === "duplicate_parameter") {
      // Brevo retorna isso mesmo com updateEnabled=true em alguns casos antigos
      return { ok: true, message: "Você já está na nossa lista. Em breve!" };
    }

    return {
      ok: false,
      message:
        data.message ?? "Não conseguimos registrar agora. Tente novamente.",
    };
  } catch (err) {
    return {
      ok: false,
      message: "Erro de rede ao registrar. Tente novamente.",
    };
  }
}

/**
 * Provider 3 — Mailchimp.
 * Doc: https://mailchimp.com/developer/marketing/api/list-members/add-member-to-list/
 */
async function captureMailchimp(
  input: LeadInput,
  env: LeadEnv,
): Promise<LeadResult> {
  const apiKey = env.MAILCHIMP_API_KEY;
  const listId = env.MAILCHIMP_LIST_ID;
  const dc = env.MAILCHIMP_DC; // data center, ex: "us21"

  if (!apiKey || !listId || !dc) {
    return {
      ok: false,
      message: "Configuração incompleta do provedor.",
    };
  }

  const [firstName, ...rest] = input.name.trim().split(" ");
  const lastName = rest.join(" ");

  try {
    const res = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Basic ${btoa(`anystring:${apiKey}`)}`,
        },
        body: JSON.stringify({
          email_address: input.email,
          status: "pending", // opt-in com dupla confirmação = padrão LGPD
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
          },
          tags: [input.source],
        }),
      },
    );

    if (res.ok) {
      return {
        ok: true,
        message:
          "Cadastro iniciado. Confirme o opt-in no e-mail que acabamos de enviar.",
      };
    }

    const data = (await res.json().catch(() => ({}))) as {
      title?: string;
      detail?: string;
    };

    if (data.title === "Member Exists") {
      return { ok: true, message: "Você já está na nossa lista." };
    }

    return {
      ok: false,
      message: data.detail ?? "Não conseguimos registrar agora.",
    };
  } catch {
    return { ok: false, message: "Erro de rede. Tente novamente." };
  }
}

/**
 * Provider 4 — Resend.
 * Mais simples: envia o e-mail com o PDF anexado (ou link) diretamente.
 * Não mantém lista centralizada — precisa combinar com outro sistema se
 * quiser CRM. Bom para operação leve.
 */
async function captureResend(
  input: LeadInput,
  env: LeadEnv,
): Promise<LeadResult> {
  const apiKey = env.RESEND_API_KEY;
  const from = env.RESEND_FROM;

  if (!apiKey || !from) {
    return {
      ok: false,
      message: "Configuração incompleta do provedor.",
    };
  }

  // Atalho: monta o e-mail padrão de entrega do material
  const subject = `Seu material chegou: ${input.source}`;
  const html = `
    <p>Olá, ${escapeHtml(input.name)}!</p>
    <p>Obrigada pelo cadastro. Aqui está o material que você pediu:</p>
    <p><a href="${env.NEXT_PUBLIC_SITE_URL ?? ""}/materiais/${encodeURIComponent(input.source)}.pdf">
      Clique aqui para baixar
    </a></p>
    <p>Juliana Maia Nutri APLV</p>
    <hr />
    <p style="font-size:12px;color:#666">Você recebeu este e-mail porque solicitou o material no site. Pode se descadastrar a qualquer momento.</p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: input.email,
        subject,
        html,
      }),
    });

    if (res.ok) {
      return { ok: true, message: "Material enviado para o seu e-mail." };
    }
    return { ok: false, message: "Não conseguimos enviar agora." };
  } catch {
    return { ok: false, message: "Erro de rede." };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
