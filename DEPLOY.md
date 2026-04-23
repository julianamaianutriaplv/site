# Deploy — Vercel + Squarespace DNS + Google Workspace

Guia passo a passo para publicar o site em `julianamaianutriaplv.com`.

**Stack envolvida:**
- Código: repositório Git (GitHub recomendado)
- Host: Vercel
- Registro/DNS: Squarespace (era GoDaddy, foi migrado)
- E-mail: Google Workspace no mesmo domínio (precisa preservar MX records)

**Pontos críticos antes de começar:**
- O site atual `.com.br` continua no ar em paralelo (domínio diferente — `.com` vs `.com.br`)
- **NÃO mexer nos MX records do Workspace** — se quebrar, o e-mail da Juliana para de funcionar
- TTL baixo (300s) durante a transição para poder reverter se der problema

---

## Passo 1 — Subir o projeto no GitHub

No terminal, dentro da pasta do projeto:

```bash
cd "/Users/leonardotabari/Documents/Claude/Projects/Pagina Juliana"

# 1. Inicializa git
git init
git add .
git commit -m "Initial commit: site Juliana Maia Nutri APLV"

# 2. Cria o repo no GitHub (via navegador OU via CLI gh)
#    Se tiver gh CLI:
gh repo create juliana-maia-nutri-aplv --private --source=. --push

#    Se não, criar em github.com/new, depois:
git remote add origin git@github.com:SEU-USUARIO/juliana-maia-nutri-aplv.git
git branch -M main
git push -u origin main
```

**Recomendado: repositório privado.** O código pode ser público no futuro, mas no primeiro push é melhor manter privado enquanto você revisa.

---

## Passo 2 — Importar o repo na Vercel

1. Entre em [vercel.com](https://vercel.com) com a conta da Juliana (ou a sua, se for gerenciar)
2. Clique em **Add New → Project**
3. Selecione o repositório recém-criado
4. Configurações que a Vercel detecta automaticamente:
   - Framework Preset: **Next.js** ✓
   - Build Command: `next build` ✓
   - Output Directory: `.next` ✓
   - Install Command: `npm install` ✓

Não mude nada disso. Apenas confirme.

---

## Passo 3 — Configurar variáveis de ambiente no Vercel

Ainda na tela de criação do projeto, antes de deployar, vá em **Environment Variables** e adicione:

### Variáveis obrigatórias para o primeiro deploy

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://julianamaianutriaplv.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `5531998309435` |
| `NEXT_PUBLIC_WHATSAPP_SUPPORT` | `5531999191083` |

### Variáveis opcionais (pode adicionar agora em branco, ativar depois)

| Name | Value inicial |
|---|---|
| `NEXT_PUBLIC_GA_ID` | (vazio, ou o ID quando tiver) |
| `NEXT_PUBLIC_BOOKING_URL` | (vazio) |
| `NEXT_PUBLIC_HERO_IMAGE` | (vazio — usa placeholder) |
| `NEXT_PUBLIC_PROFILE_IMAGE` | (vazio — usa placeholder) |
| `LEAD_PROVIDER` | `none` (desliga captura até decidir provider) |

Clique em **Deploy**. Em ~2 minutos, o primeiro deploy termina. Vai aparecer uma URL tipo `juliana-maia-nutri-aplv.vercel.app`.

**Acesse essa URL. Valide que o site abre, que as páginas carregam, que não há erro 500.** Se tiver erro, ver na aba *Logs* no painel do projeto.

---

## Passo 4 — Adicionar o domínio custom no Vercel

No painel do projeto:

1. Vá em **Settings → Domains**
2. Digite `julianamaianutriaplv.com` e clique em **Add**
3. A Vercel vai mostrar instruções DNS. **Siga as da Vercel, não as deste guia** se houver qualquer divergência — a Vercel é a fonte da verdade.

Em geral, para domínio apex você verá:

> Set the following record on your DNS provider to continue:
>
> Type: A
> Name: @
> Value: 76.76.21.21

E ela também vai sugerir adicionar `www.julianamaianutriaplv.com` como redirect para o apex. Aceite.

**Mantenha essa tela aberta. Você vai configurar o DNS no Squarespace no próximo passo e voltar aqui para verificar.**

---

## Passo 5 — Configurar DNS no Squarespace

### 5.1. Acessar o painel DNS

1. Entre em [squarespace.com/domains](https://account.squarespace.com/domains)
2. Clique no domínio `julianamaianutriaplv.com`
3. Vá na aba **DNS Settings** (ou "Configurações avançadas")

### 5.2. ⚠️ IMPORTANTE: anotar MX records do Google Workspace ANTES de mexer

Antes de adicionar/remover qualquer coisa, **fotografe ou copie** os MX records existentes. Eles são essenciais para o e-mail do Google Workspace funcionar. Vão estar assim:

```
Type: MX    Host: @    Priority: 1   Value: smtp.google.com
```

(ou, em configurações antigas, múltiplos ASPMX: `aspmx.l.google.com`, `alt1.aspmx.l.google.com` etc.)

**NÃO APAGUE esses MX records em hipótese alguma.** Se apagar, o e-mail @julianamaianutriaplv.com para de funcionar.

### 5.3. Adicionar os records da Vercel

Na mesma tela, adicione (ou edite, se já existir) os seguintes registros:

#### A record para o apex (domínio principal)

| Tipo | Host | Valor | TTL |
|---|---|---|---|
| A | `@` | `76.76.21.21` | 300 |

Se já houver um A record em `@` apontando para outro IP (do Squarespace Sites, por exemplo), **substitua** o valor pelo IP da Vercel. É essa mudança que "transfere" o site.

#### CNAME para o www

| Tipo | Host | Valor | TTL |
|---|---|---|---|
| CNAME | `www` | `cname.vercel-dns.com` | 300 |

Isso faz `www.julianamaianutriaplv.com` resolver para a Vercel, que vai redirecionar automaticamente para o apex.

### 5.4. Verificar que os MX do Workspace continuam intactos

Depois de salvar, role a lista de DNS e confirme que os MX do Google ainda estão lá, sem alteração.

### 5.5. TTL baixo

Use TTL de 300 segundos (5 minutos) durante a transição. Facilita reversão se der problema. Depois de 1–2 semanas estável, pode subir para 3600 (1h) ou até 86400 (24h).

---

## Passo 6 — Aguardar propagação DNS e verificar no Vercel

A propagação DNS para `A` e `CNAME` é geralmente rápida com Squarespace — leva de 5 minutos a 2 horas.

Para testar antes de esperar:

```bash
dig julianamaianutriaplv.com +short
# deve retornar: 76.76.21.21

dig www.julianamaianutriaplv.com +short
# deve retornar: cname.vercel-dns.com.  (e depois o IP da Vercel)
```

Volte ao painel da Vercel em **Settings → Domains**. Quando o DNS estiver correto, aparece um check verde ao lado do domínio. Até lá, fica com um ícone de alerta amarelo. Isso é normal.

Assim que ficar verde:
- A Vercel emite certificado SSL automático (Let's Encrypt). Leva de 10s a 2min.
- A partir daí, `https://julianamaianutriaplv.com` deve abrir o site.

---

## Passo 7 — Validar o deploy

Checklist de verificação pós-deploy:

### Páginas principais abrem
- [ ] `/`
- [ ] `/sobre`
- [ ] `/aplv`
- [ ] `/consultas`
- [ ] `/perguntas-frequentes`
- [ ] `/blog` e pelo menos 3 artigos individuais
- [ ] `/materiais`
- [ ] `/contato`
- [ ] `/privacidade`
- [ ] `/termos`

### Funcional
- [ ] Menu mobile abre e fecha
- [ ] Botão WhatsApp flutuante funciona (abre conversa)
- [ ] Links de "Agendar consulta" levam ao WhatsApp
- [ ] Accordion das FAQs expande/recolhe
- [ ] Cookie banner aparece na primeira visita
- [ ] 404 (`/pagina-que-nao-existe`) renderiza a página de erro

### SEO
- [ ] `https://julianamaianutriaplv.com/sitemap.xml` abre e lista todas as páginas
- [ ] `https://julianamaianutriaplv.com/robots.txt` abre e aponta para sitemap
- [ ] Source de `/` (ver código-fonte do navegador) contém `<script type="application/ld+json">` com `MedicalBusiness`
- [ ] Source de `/perguntas-frequentes` contém JSON-LD com `FAQPage`
- [ ] Source de `/blog/[qualquer]` contém JSON-LD com `Article` e `BreadcrumbList`
- [ ] Redes sociais: testar compartilhamento em [opengraph.xyz](https://www.opengraph.xyz/) com URL do site (OG image ainda vai aparecer com fallback sem foto, é esperado)

### Performance
- [ ] Abrir [pagespeed.web.dev](https://pagespeed.web.dev) e rodar teste na URL
  - Meta: 90+ em Performance, 100 em Accessibility, 100 em Best Practices, 100 em SEO
  - Se algo vier abaixo, mandar aqui para eu ajustar

### E-mail do Workspace continua funcionando
- [ ] Enviar e-mail de teste para o contato do domínio
- [ ] Receber no Workspace

---

## Passo 8 — Google Search Console

Depois de validado tudo acima:

1. Entre em [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → digite `julianamaianutriaplv.com`
3. Método de verificação recomendado: **DNS record (TXT)**
4. A Google vai te dar um TXT record tipo `google-site-verification=abc123...`
5. Adicione no Squarespace como TXT record (sem apagar o que já existe — adicionar novo)
6. Confirme no Search Console
7. Quando verificar, entre em **Sitemaps** e submeta: `https://julianamaianutriaplv.com/sitemap.xml`

A partir daí, o Google começa a indexar. Demora de dias a semanas para os artigos aparecerem em buscas.

---

## Passo 9 — Google Analytics 4 (opcional, mas recomendado)

Se a Juliana quer mensurar tráfego:

1. [analytics.google.com](https://analytics.google.com) → Admin → Create Property
2. Nome: "Juliana Maia Nutri APLV"
3. Seleciona "Web" como stream
4. URL: `https://julianamaianutriaplv.com`
5. Copia o **Measurement ID** (começa com `G-`)
6. No painel da Vercel, **Settings → Environment Variables**, editar `NEXT_PUBLIC_GA_ID` com o valor
7. Trigger um novo deploy (aba Deployments → menu ... → **Redeploy**)
8. Após o redeploy, GA4 começa a coletar

---

## Passo 10 — Ativar captura de e-mail quando decidir provider

Quando a Juliana escolher entre Brevo, Mailchimp ou Resend:

1. Criar conta na ferramenta escolhida
2. Pegar chave de API (e list ID quando aplicável)
3. Na Vercel, **Settings → Environment Variables**, adicionar as chaves correspondentes (ver `.env.example` ou `README.md`)
4. Trocar `LEAD_PROVIDER=none` para o nome do provider
5. Redeploy
6. Testar em `/materiais` com um e-mail real

---

## Resumo dos DNS records finais em `julianamaianutriaplv.com`

Quando tudo estiver pronto, você terá no Squarespace DNS:

| Tipo | Host | Valor | Função |
|---|---|---|---|
| A | @ | 76.76.21.21 | Site na Vercel |
| CNAME | www | cname.vercel-dns.com | www → apex |
| MX | @ | (os originais do Google Workspace) | E-mail |
| TXT | @ | `google-site-verification=...` | Search Console |
| TXT | @ | `v=spf1 include:_spf.google.com ~all` | SPF (Workspace) |
| CNAME ou TXT | google._domainkey ou similar | (DKIM do Workspace) | Autenticação e-mail |

**Os records do Workspace já existem e devem ser preservados.** A única coisa nova que você está adicionando é o A record apontando para a Vercel e o CNAME do www.

---

## Reversão de emergência

Se alguma coisa der errado em produção e você precisar voltar ao estado anterior rapidamente:

### Voltar para Squarespace Sites (caso o domínio antes estivesse lá)
- Mudar o A record de `@` de `76.76.21.21` de volta para o IP original do Squarespace (você anotou, certo?)

### Só tirar do ar (sem voltar pra lugar nenhum)
- No Vercel: **Settings → Domains → julianamaianutriaplv.com → Remove**
- O site volta a acessar pela URL temporária `juliana-maia-nutri-aplv.vercel.app` enquanto você resolve

### Se e-mail parar de funcionar
- Volta imediatamente para os MX records originais do Workspace
- Testa envio/recebimento
- Só depois volta a mexer em qualquer outra coisa

---

## Fluxo resumido para referência

```
GitHub → Vercel (deploy) → Vercel emite certificado SSL
       → DNS Squarespace (A + CNAME apontando para Vercel)
       → Site publicado em julianamaianutriaplv.com
       → Search Console (submissão de sitemap)
       → GA4 (métricas)
       → Captura de e-mail (provider)
```

Última atualização: 2026-04-23
