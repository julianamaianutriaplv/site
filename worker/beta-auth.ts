/**
 * Portão de acesso da lista beta (/receitas/beta*).
 *
 * Por que no Worker e não na página: a lista traz as 47 receitas completas
 * dos e-books vendidos. Um "login" em JavaScript na página não protege nada —
 * o HTML inteiro já veio. Aqui a Cloudflare chama o Worker ANTES de servir o
 * asset (run_worker_first no wrangler.jsonc), e o arquivo só sai com cookie
 * assinado válido.
 *
 * O que o Worker guarda: nada sobre quem entra. O perfil da criança continua
 * no celular da mãe (localStorage), como no app. Aqui só existe uma lista de
 * e-mails autorizados (var) e o hash de UMA senha (secret). Quando virar aba
 * paga com muitas contas, isto deve ser trocado por um provedor de
 * autenticação de verdade — não estender.
 *
 * Segredos (wrangler secret put): BETA_PEPPER, BETA_SENHA_HASH, BETA_COOKIE_SECRET.
 * A senha é definida por `npm run beta:senha`, na máquina do Leo — não passa
 * pelo chat, não passa por mim.
 */

export interface BetaEnv {
  ASSETS: Fetcher;
  BETA_EMAILS?: string;
  BETA_PEPPER?: string;
  BETA_SENHA_HASH?: string;
  BETA_COOKIE_SECRET?: string;
}

const PREFIXO = "/receitas/beta";
const ENTRAR = `${PREFIXO}/entrar`;
const SAIR = `${PREFIXO}/sair`;
const COOKIE = "beta_sessao";
// Path=/receitas e não /receitas/beta: senão /receitas/beta.html (que o
// navegador pode ter salvo) fica fora do escopo do cookie e cai no login.
const DIAS_SESSAO = 30;

const enc = new TextEncoder();

// -------------------------------------------------------------- utilidades

function b64url(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(segredo: string, dados: string): Promise<string> {
  const chave = await crypto.subtle.importKey(
    "raw", enc.encode(segredo), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const assinatura = await crypto.subtle.sign("HMAC", chave, enc.encode(dados));
  return b64url(new Uint8Array(assinatura));
}

/** Comparação em tempo constante — não vaza por quanto tempo demorou. */
function igual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function emailsAutorizados(env: BetaEnv): string[] {
  return (env.BETA_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function configurado(env: BetaEnv): boolean {
  return Boolean(env.BETA_PEPPER && env.BETA_SENHA_HASH && env.BETA_COOKIE_SECRET
    && emailsAutorizados(env).length);
}

// ------------------------------------------------------------------ sessão

async function criaCookie(email: string, env: BetaEnv): Promise<string> {
  const exp = Date.now() + DIAS_SESSAO * 24 * 60 * 60 * 1000;
  const corpo = `${exp}.${b64url(enc.encode(email))}`;
  const sig = await hmac(env.BETA_COOKIE_SECRET!, corpo);
  const valor = `${corpo}.${sig}`;
  return `${COOKIE}=${valor}; Path=/receitas; Max-Age=${DIAS_SESSAO * 86400}; HttpOnly; Secure; SameSite=Lax`;
}

async function sessaoValida(req: Request, env: BetaEnv): Promise<boolean> {
  const cookies = req.headers.get("cookie") ?? "";
  const m = cookies.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  if (!m) return false;
  const partes = m[1].split(".");
  if (partes.length !== 3) return false;
  const [exp, emailB64, sig] = partes;
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const esperado = await hmac(env.BETA_COOKIE_SECRET!, `${exp}.${emailB64}`);
  return igual(sig, esperado);
}

// ----------------------------------------------------------- rate limit
// Por isolate, como no /api/lead: contém repetição trivial, não ataque
// distribuído. A proteção real é a senha forte e o lock lento no e-mail.

const tentativas = new Map<string, { n: number; ate: number }>();
function permiteTentativa(ip: string): boolean {
  const agora = Date.now();
  const t = tentativas.get(ip);
  if (!t || t.ate < agora) { tentativas.set(ip, { n: 1, ate: agora + 10 * 60_000 }); return true; }
  if (t.n >= 8) return false;
  t.n += 1;
  return true;
}

// ---------------------------------------------------------------- páginas

function pagina(titulo: string, miolo: string, status = 200): Response {
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow">
<title>${titulo} — Dra. Juliana Maia</title>
<link rel="icon" href="/favicon.ico">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,400..700,0..100,0..1&family=Ubuntu:wght@400;500;700&family=DM+Mono:wght@400;500&display=swap">
<style>
*{box-sizing:border-box}body{margin:0;background:#FFFEF8;color:#2A302F;font-family:Ubuntu,-apple-system,"Segoe UI",sans-serif;font-size:17px;line-height:1.6;min-height:100vh;display:flex;flex-direction:column}
.topo{border-bottom:1px solid rgba(42,48,47,.13)}.topo .env{max-width:1100px;margin:0 auto;padding:10px 14px;display:flex;align-items:center;gap:12px}.topo img{height:34px;display:block}
.beta{font-family:"DM Mono",monospace;font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:#8A5A12;background:#FAEBD3;border:1px solid #B0741C;border-radius:99px;padding:3px 9px}
.topo a.voltar{margin-left:auto;color:#2F5C29;text-decoration:none;font-size:14px;font-weight:500}.topo a.voltar:hover{text-decoration:underline}
main{flex:1;display:grid;place-items:center;padding:32px 14px}
.cartao{width:100%;max-width:440px;background:#fff;border:1px solid rgba(42,48,47,.13);border-radius:18px;padding:28px 24px;box-shadow:0 2px 4px rgba(42,48,47,.04),0 12px 28px -12px rgba(42,48,47,.18)}
.olho{font-family:"DM Mono",monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#6E7572;display:inline-flex;align-items:center;gap:10px}.olho::before{content:"";width:26px;height:1px;background:#ED6D6B}
h1{font-family:Fraunces,Georgia,serif;font-variation-settings:"SOFT" 40,"WONK" 1;font-weight:600;color:#9D3B2B;font-size:1.9rem;line-height:1.1;margin:10px 0 6px;letter-spacing:-.01em}
p{margin:0 0 18px;color:#5C6360;font-size:15px}
label{display:block;font-weight:500;font-size:14px;margin:14px 0 6px}
input{width:100%;min-height:50px;padding:12px 13px;font:inherit;color:#2A302F;background:#FFFEF8;border:1.5px solid rgba(42,48,47,.22);border-radius:10px}
input:focus{outline:none;border-color:#46823E;box-shadow:0 0 0 3px rgba(70,130,62,.2)}
button{width:100%;min-height:50px;margin-top:20px;border:none;border-radius:99px;background:#46823E;color:#fff;font:inherit;font-weight:500;cursor:pointer}button:hover{background:#2F5C29}
.erro{margin:14px 0 0;padding:10px 12px;border-radius:10px;background:#FBDDDA;border:1px solid #ED6D6B;color:#B53A33;font-size:14px}
.nota{font-size:12.5px;color:#6E7572;margin-top:18px}
</style></head><body>
<div class="topo"><div class="env"><a href="/" aria-label="Início"><img src="/logo.svg" alt="Dra. Juliana Maia Nutri APLV"></a><span class="beta">beta</span><a class="voltar" href="/receitas">← Ebooks e receitas</a></div></div>
<main>${miolo}</main></body></html>`;
  return new Response(html, {
    status,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex" },
  });
}

function telaLogin(erro = "", email = ""): Response {
  const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
  return pagina("Entrar na lista beta", `
<form class="cartao" method="post" action="${ENTRAR}" autocomplete="on">
  <span class="olho">Lista de produtos e receitas</span>
  <h1>Entrar</h1>
  <p>Acesso em teste, por convite. Use o e-mail cadastrado e a senha combinada.</p>
  <label for="email">E-mail</label>
  <input id="email" name="email" type="email" required autocomplete="username" value="${esc(email)}" inputmode="email">
  <label for="senha">Senha</label>
  <input id="senha" name="senha" type="password" required autocomplete="current-password" minlength="8">
  ${erro ? `<div class="erro" role="alert">${esc(erro)}</div>` : ""}
  <button type="submit">Entrar</button>
  <div class="nota">Nada do que você cadastrar no app sai do seu celular. Aqui só conferimos o e-mail e a senha.</div>
</form>`, erro ? 401 : 200);
}

// ---------------------------------------------------------------- rotas

export async function portaoBeta(req: Request, env: BetaEnv): Promise<Response | null> {
  const url = new URL(req.url);
  const p = url.pathname;
  if (!p.startsWith(PREFIXO)) return null;

  if (!configurado(env)) {
    return pagina("Lista beta", `<div class="cartao"><span class="olho">Lista de produtos e receitas</span>
<h1>Ainda não abriu</h1><p>O acesso à lista beta está sendo configurado. Volte em breve.</p></div>`, 503);
  }

  if (p === SAIR) {
    return new Response(null, {
      status: 302,
      headers: { location: "/receitas", "set-cookie": `${COOKIE}=; Path=/receitas; Max-Age=0; HttpOnly; Secure; SameSite=Lax` },
    });
  }

  if (p === ENTRAR) {
    if (req.method === "GET") {
      return (await sessaoValida(req, env))
        ? Response.redirect(`${url.origin}${PREFIXO}`, 302)
        : telaLogin();
    }
    if (req.method !== "POST") return new Response("Método não permitido", { status: 405 });

    const ip = req.headers.get("cf-connecting-ip") ?? "?";
    if (!permiteTentativa(ip)) return telaLogin("Muitas tentativas. Espere alguns minutos.");

    const form = await req.formData().catch(() => null);
    const email = String(form?.get("email") ?? "").trim().toLowerCase();
    const senha = String(form?.get("senha") ?? "");

    const hashEnviado = await hmac(env.BETA_PEPPER!, senha);
    const emailOk = emailsAutorizados(env).includes(email);
    const senhaOk = igual(hashEnviado, env.BETA_SENHA_HASH!);
    // Verifica os dois sempre, e responde a mesma coisa: não dizer qual falhou.
    if (!emailOk || !senhaOk) {
      await new Promise((r) => setTimeout(r, 400));
      return telaLogin("E-mail ou senha não conferem.", email);
    }

    return new Response(null, {
      status: 302,
      headers: { location: `${url.origin}${PREFIXO}`, "set-cookie": await criaCookie(email, env) },
    });
  }

  // Tudo o mais em /receitas/beta*: só com sessão.
  if (!(await sessaoValida(req, env))) {
    return Response.redirect(`${url.origin}${ENTRAR}`, 302);
  }
  // Normaliza /receitas/beta.html e /receitas/beta/ para o asset.
  const alvo = new URL(req.url);
  if (p === `${PREFIXO}.html` || p === `${PREFIXO}/`) alvo.pathname = PREFIXO;
  const asset = await env.ASSETS.fetch(new Request(alvo.toString(), { headers: req.headers }));
  if (asset.status === 404) {
    return pagina("Lista beta", `<div class="cartao"><span class="olho">Lista de produtos e receitas</span>
<h1>Em manutenção</h1><p>A lista está sendo regenerada. Tente de novo em instantes.</p></div>`, 503);
  }
  // Conteúdo protegido: nunca no cache compartilhado.
  const h = new Headers(asset.headers);
  h.set("cache-control", "private, no-store");
  h.set("x-robots-tag", "noindex");
  return new Response(asset.body, { status: asset.status, headers: h });
}
