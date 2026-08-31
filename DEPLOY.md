# Deploy — Cloudflare Workers + Registro.br/Cloudflare DNS

Guia para publicar o site em `julianamaianutriaplv.com.br`, **substituindo o
WordPress que está hoje na Hostinger**, e apontar `julianamaianutriaplv.com`
para lá.

## Estado atual (verificado em 31/08/2026)

| | `julianamaianutriaplv.com.br` | `julianamaianutriaplv.com` |
|---|---|---|
| Registro | Registro.br — titular Leonardo Tabari, expira 07/02/2029 | Squarespace Domains II, expira 23/04/2027 |
| Nameservers | Cloudflare (`theo`/`zara.ns.cloudflare.com`) | `ns-cloud-e1..e4.googledomains.com` |
| Status | ativo, no ar | **`clientHold`** — fora da zona, não resolve nada |
| Site | WordPress + Elementor na Hostinger, atrás do proxy Cloudflare | nenhum |
| E-mail | Hostinger (`mx1`/`mx2.hostinger.com.br`) | nenhum (sem MX) |

Duas coisas que **não** batem com a documentação antiga do projeto: o DNS não
está na Squarespace (está na Cloudflare) e não há Google Workspace em lugar
nenhum. O e-mail é Hostinger, no `.com.br`.

## Stack de deploy

- Código: [github.com/julianamaianutriaplv/site](https://github.com/julianamaianutriaplv/site)
- Build: Next.js em `output: "export"` → HTML estático em `out/`
- Host: **Cloudflare Workers** com Static Assets
- Dinâmico: só `/api/lead`, no `worker/index.ts`
- DNS: Cloudflare (zona já existente)

---

## ⚠️ Três coisas que não podem quebrar

1. **Os MX da Hostinger no `.com.br`.** É o e-mail da Juliana. Nenhum passo
   deste guia toca em MX — se você se pegar editando um, parou.
2. **O plano da Hostinger.** Mesmo depois de o WordPress sair do ar, é a
   Hostinger que entrega o e-mail. Cancelar o plano derruba a caixa.
3. **A ordem.** O domínio de produção só é anexado no Passo 5. Até lá, tudo
   roda em `*.workers.dev` e o WordPress continua servindo normalmente.

---

## Passo 1 — Autenticar na Cloudflare

Precisa ser feito por quem tem acesso à conta Cloudflare onde a zona
`julianamaianutriaplv.com.br` está hospedada.

```bash
npx wrangler login
```

Abre o navegador para autorizar. Confirme que caiu na conta certa:

```bash
npx wrangler whoami
```

Em CI, no lugar do login use um API token com as permissões
`Workers Scripts:Edit`, `Workers Routes:Edit` e `Zone:DNS:Edit`, exportado como
`CLOUDFLARE_API_TOKEN`.

---

## Passo 2 — Build e teste local no runtime real

```bash
npm install
npm run preview
```

`preview` roda `next build` e sobe o `workerd` local em
`http://localhost:8788` — o mesmo runtime da produção, com os assets, os
redirects e o Worker. Vale conferir:

- [ ] as 10 páginas + um artigo do blog abrem em 200
- [ ] `/quem-sou/` devolve **301** para `/sobre`
- [ ] `/listavip/` devolve **404**
- [ ] `/sitemap.xml`, `/robots.txt`, `/favicon.ico`, `/og-default.png` abrem
- [ ] `POST /api/lead` sem `consent` devolve 400

---

## Passo 3 — Variáveis de ambiente

São de duas naturezas diferentes, e confundir as duas é o erro clássico aqui.

### Build-time (`NEXT_PUBLIC_*`) — ficam gravadas no HTML

Precisam estar no ambiente **no momento do `npm run build`**. Local: arquivo
`.env.local`. Em CI: secrets do GitHub Actions.

| Variável | Valor |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://julianamaianutriaplv.com.br` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `5531999191083` |
| `NEXT_PUBLIC_WHATSAPP_SUPPORT` | `5531999191083` |
| `NEXT_PUBLIC_GA_ID` | (o `G-…` quando existir) |
| `NEXT_PUBLIC_BOOKING_URL` | (vazio) |

### Runtime do Worker — só o `/api/lead` usa

Não secretas, em `wrangler.jsonc` no bloco `vars`:

```jsonc
"vars": { "LEAD_PROVIDER": "none" }
```

Secretas, nunca no repositório:

```bash
npx wrangler secret put BREVO_API_KEY
npx wrangler secret put BREVO_LIST_ID
```

Para testar secrets localmente, crie um `.dev.vars` (já está no `.gitignore`)
no formato `CHAVE=valor`.

---

## Passo 4 — Primeiro deploy (ainda sem tocar no domínio)

```bash
npm run deploy
```

Sai uma URL `https://julianamaianutriaplv.<sua-conta>.workers.dev`.
**Rode o checklist do Passo 2 contra ela.** O WordPress continua intacto —
nada em produção mudou ainda.

---

## Passo 5 — A virada: anexar o domínio de produção

É este passo que tira o WordPress do ar. Faça com a Juliana avisada.

1. Cloudflare Dashboard → **Workers & Pages** → projeto `julianamaianutriaplv`
2. **Settings → Domains & Routes → Add → Custom domain**
3. Adicione `julianamaianutriaplv.com.br`
4. Adicione também `www.julianamaianutriaplv.com.br`

A Cloudflare substitui sozinha os registros A do apex e do www que hoje apontam
para a Hostinger. **Os MX não são tocados** — confira na aba DNS depois de
salvar que `mx1.hostinger.com.br` e `mx2.hostinger.com.br` continuam lá.

O certificado sai em segundos, porque a zona já é Cloudflare.

### Validação pós-virada

```bash
dig julianamaianutriaplv.com.br +short
curl -sI https://julianamaianutriaplv.com.br | head -3
curl -sI https://julianamaianutriaplv.com.br/quem-sou/ | grep -i "^location"   # -> /sobre
curl -s https://julianamaianutriaplv.com.br/robots.txt
```

E mande um e-mail de teste para a caixa da Juliana, para confirmar que o
Hostinger continua entregando.

---

## Passo 6 — Destravar o `.com` e redirecionar para o `.com.br`

O `.com` está em `clientHold`: o registry o removeu da zona, e por isso ele não
resolve **nada** hoje. Isso quase sempre é a verificação ICANN do e-mail do
titular que nunca foi concluída (ou uma pendência de cobrança).

1. Entrar em [account.squarespace.com/domains](https://account.squarespace.com/domains)
2. Resolver o que estiver pendente — em geral é reenviar e clicar no e-mail de
   verificação do registrante
3. Confirmar que o `clientHold` saiu:
   ```bash
   whois julianamaianutriaplv.com | grep -i "domain status"
   ```

Com o domínio liberado:

4. Cloudflare → **Add a domain** → `julianamaianutriaplv.com`
5. Na Squarespace, trocar os nameservers de `ns-cloud-e*.googledomains.com`
   para os dois que a Cloudflare indicar
6. Na zona nova, criar um registro **A** `@` → `192.0.2.1` **proxied** (laranja),
   e um **CNAME** `www` → `julianamaianutriaplv.com` **proxied**. O IP é um
   placeholder reservado (RFC 5737) — quem responde é a regra de redirect,
   o IP nunca é acessado.
7. **Rules → Redirect Rules → Create rule**
   - Nome: `.com -> .com.br`
   - Se: `Hostname` `contains` `julianamaianutriaplv.com`
   - Então: **Dynamic redirect**, status **301**, preserve query string
   - Expressão: `concat("https://julianamaianutriaplv.com.br", http.request.uri.path)`

```bash
curl -sI https://julianamaianutriaplv.com/aplv | grep -iE "^(HTTP|location)"
# HTTP/2 301 · location: https://julianamaianutriaplv.com.br/aplv
```

---

## Passo 7 — Search Console

Faça **depois** da virada, não antes.

1. [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → `julianamaianutriaplv.com.br` (tipo **Domain**)
3. Verificação por TXT — adicionar na zona Cloudflare **sem apagar** o TXT de
   SPF que já existe
4. **Sitemaps** → submeter `https://julianamaianutriaplv.com.br/sitemap.xml`
5. **Removals → nada.** Deixe os 404 do funil antigo saírem sozinhos.

Nas semanas seguintes, acompanhar em **Páginas** se os 301 estão sendo
processados e se algum 404 tem tráfego relevante — se tiver, vira uma linha
nova em `public/_redirects`.

---

## Reversão de emergência

O WordPress na Hostinger não é apagado por nenhum passo deste guia; ele só deixa
de receber tráfego. Para voltar:

1. Cloudflare → Workers & Pages → projeto → **Domains & Routes** → remover
   `julianamaianutriaplv.com.br` e `www`
2. Cloudflare → **DNS** → recriar os A do apex e do www apontando para o IP de
   origem da Hostinger (anote esse IP no hPanel **antes** da virada), proxied
3. Propaga em segundos, porque o TTL é gerenciado pela Cloudflare

Se o e-mail parar: confira os MX primeiro. Eles não deviam ter mudado.

---

## Fluxo resumido

```
GitHub → npm run build (out/) → wrangler deploy → *.workers.dev  [validação]
       → anexa julianamaianutriaplv.com.br como Custom Domain     [a virada]
       → destrava .com na Squarespace → zona Cloudflare → 301 p/ .com.br
       → Search Console + sitemap
```

Última atualização: 2026-08-31
