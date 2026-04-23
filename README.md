# Juliana Maia Nutri APLV — Site Next.js

Site institucional e de conteúdo da nutricionista Juliana Fernandes Maia (CRN-9 22006), especialista em alergia à proteína do leite de vaca (APLV).

**Prioridade estratégica:** autoridade de conteúdo. O site é projetado para ranquear organicamente em buscas sobre APLV, combinando blog robusto + FAQ com schema.org + landing educacional dedicada.

---

## Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Estilo:** Tailwind CSS 3 + design tokens próprios (paleta "Clínico-Humano")
- **UI primitives:** Radix UI (Accordion, Slot) via componentes locais em estilo shadcn
- **Conteúdo:** MDX para blog (`next-mdx-remote`), TypeScript para FAQ
- **SEO:** metadata API, sitemap.ts, robots.ts, schema.org (MedicalBusiness + FAQPage + Article + BreadcrumbList)
- **Fontes:** Fraunces (títulos) + Inter (corpo), via `next/font/google`
- **Analytics:** Google Analytics 4 opcional via env

---

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Copiar variáveis de ambiente
cp .env.example .env.local
# Preencher NEXT_PUBLIC_SITE_URL, GA_ID, etc conforme necessidade

# 3. Rodar dev
npm run dev
# Abra http://localhost:3000

# 4. Build de produção
npm run build
npm run start

# 5. Typecheck
npm run typecheck
```

Node.js 18.17+ recomendado.

---

## Variáveis de ambiente

Todas em `.env.local` (ver `.env.example`):

### Públicas (visíveis no client)

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (sem barra final). Decidir no deploy. |
| `NEXT_PUBLIC_GA_ID` | ID do Google Analytics 4 (opcional) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp da Juliana, formato E.164 (só dígitos) |
| `NEXT_PUBLIC_WHATSAPP_SUPPORT` | WhatsApp da equipe |
| `NEXT_PUBLIC_BOOKING_URL` | Link de agendamento (Calendly/Cal.com). Placeholder para o momento |
| `NEXT_PUBLIC_HERO_IMAGE` | Caminho da foto hero da Home (ex: `/juliana-hero.jpg`). Vazio ativa placeholder |
| `NEXT_PUBLIC_PROFILE_IMAGE` | Caminho da foto de perfil em `/sobre`. Vazio ativa placeholder |

### Captura de e-mail (secret — server-side)

| Variável | Descrição |
|---|---|
| `LEAD_PROVIDER` | `none` / `console` / `brevo` / `mailchimp` / `resend` |
| `BREVO_API_KEY` + `BREVO_LIST_ID` | Se LEAD_PROVIDER=brevo |
| `MAILCHIMP_API_KEY` + `MAILCHIMP_LIST_ID` + `MAILCHIMP_DC` | Se LEAD_PROVIDER=mailchimp |
| `RESEND_API_KEY` + `RESEND_FROM` | Se LEAD_PROVIDER=resend |

---

## Estrutura de pastas

```
app/                       → App Router (páginas e rotas)
  ├─ page.tsx              → Home
  ├─ layout.tsx            → Layout raiz (nav, footer, fontes, schema)
  ├─ globals.css           → Tokens CSS
  ├─ sitemap.ts            → sitemap.xml
  ├─ robots.ts             → robots.txt
  ├─ not-found.tsx         → 404
  ├─ sobre/                → /sobre
  ├─ aplv/                 → /aplv (landing educacional)
  ├─ consultas/            → /consultas
  ├─ perguntas-frequentes/ → /perguntas-frequentes (FAQ + schema FAQPage)
  ├─ blog/
  │    ├─ page.tsx         → /blog (listagem)
  │    └─ [slug]/page.tsx  → /blog/{slug} (artigo individual)
  ├─ materiais/            → /materiais
  ├─ contato/              → /contato
  ├─ privacidade/          → /privacidade (LGPD)
  └─ termos/               → /termos

components/
  ├─ ui/                   → Primitivos (button, input, accordion)
  ├─ nav.tsx               → Header + menu mobile
  ├─ footer.tsx            → Footer + disclaimer + CRN
  ├─ whatsapp-float.tsx    → Botão flutuante WhatsApp
  ├─ cookie-banner.tsx     → Banner LGPD
  ├─ section.tsx           → Section com eyebrow/title/description
  ├─ blog-card.tsx         → Card do blog
  ├─ mdx-content.tsx       → Renderizador MDX com componentes customizados
  ├─ brand-mark.tsx        → Logo SVG programático (substitui quando chegar logo oficial)
  ├─ hero-visual.tsx       → Visual hero da Home (foto real ou placeholder)
  ├─ profile-photo.tsx     → Foto de perfil em /sobre (foto real ou placeholder)
  └─ lead-form.tsx         → Formulário de captura de e-mail (LGPD)

content/
  ├─ faq.ts                → Banco de perguntas frequentes (25+)
  └─ blog/
       └─ *.mdx            → Artigos do blog

lib/
  ├─ site.ts               → Configuração central (credenciais, contatos, social)
  ├─ seo.ts                → Helpers de metadata e schema.org
  ├─ blog.ts               → Leitura e listagem de posts MDX
  ├─ lead-capture.ts       → Sistema plugável de captura (Brevo/Mailchimp/Resend/console)
  └─ utils.ts              → cn(), formatadores de data

app/api/
  └─ lead/route.ts         → Endpoint POST /api/lead (rate-limited, validado, LGPD)
```

---

## Como adicionar um novo artigo no blog

1. Crie um arquivo em `content/blog/seu-slug.mdx`.
2. Use frontmatter YAML no topo:

```md
---
title: "Título do artigo"
description: "Descrição curta que aparece em cards e SEO."
category: "Diagnóstico" # ou Nutrição, Vida prática, Receitas etc.
author: "Juliana Maia"
publishedAt: "2026-05-01"   # ISO date
updatedAt: "2026-05-10"     # opcional
featured: false              # true = vira o hero do /blog
coverImage: "/blog/imagem.jpg"  # opcional
keywords:
  - keyword 1
  - keyword 2
---

Conteúdo em Markdown padrão + componentes MDX se quiser.
```

3. Conteúdo vai no corpo em Markdown. Você pode usar `##`, `###`, listas, tabelas, links, etc.
4. Salvar o arquivo já adiciona ao listagem e ao sitemap automaticamente.

Boas práticas de SEO para artigos:
- Título entre 50 e 70 caracteres
- Description entre 140 e 160 caracteres
- Usar H2 para seções principais, H3 para subseções
- Incluir keywords relevantes no frontmatter
- Citar fontes (ASBAI, SBP, Consenso Brasileiro, CONITEC) ao final
- Terminar com disclaimer educativo

---

## Como editar o FAQ

Edite `content/faq.ts`. A estrutura é:

```ts
export const faqItems: FaqItem[] = [
  {
    id: "slug-unico",           // usado como âncora
    category: "diagnostico",     // uma das FaqCategory
    question: "A pergunta?",
    answer: "A resposta em parágrafo único (pode ser longo).",
  },
  // ...
];
```

Categorias disponíveis:
- `diagnostico`
- `alimentacao-crianca`
- `alimentacao-mae`
- `formulas`
- `reintroducao`
- `vida-pratica`

Para adicionar uma categoria nova, edite o objeto `faqCategories` no mesmo arquivo.

O schema.org FAQPage é gerado automaticamente a partir desses dados.

---

## Como publicar

**Guia completo passo a passo em `DEPLOY.md`** — cobre GitHub → Vercel → DNS Squarespace → preservação de Google Workspace MX → Search Console → GA4.

Resumo:
1. Publica o repositório no GitHub
2. Importa na Vercel, configura env vars
3. Adiciona domínio `julianamaianutriaplv.com` em Settings → Domains
4. Configura A record e CNAME www no Squarespace DNS (preservando MX do Workspace)
5. Submete sitemap no Search Console

**Domínio de produção:** `julianamaianutriaplv.com` (apex). O site atual da Juliana em `.com.br` continua independente — não há canibalização de SEO entre os dois.

---

## Design tokens

Paleta **Direção C — "Clínico-Humano"** (aprovada pelo cliente):

| Token | Valor | Uso |
|---|---|---|
| `primary` | `#4A3B7C` | Roxo-ardósia, brand principal |
| `primary-hover` | `#3C3065` | Hover |
| `primary-soft` | `#EFEBF5` | Backgrounds de seção |
| `secondary` | `#C06C86` | Rosa dessaturado, acentos |
| `secondary-soft` | `#F6E8EC` | Tags, destaques leves |
| `accent` | `#C8D4C1` | Verde-pálido, apoio "natural" |
| `background` | `#F6F3EE` | Fundo creme quente |
| `foreground` | `#23232B` | Quase-preto, corpo de texto |
| `muted` | `#EDE8DF` | Seções alternadas |
| `border` | `#E2DDD2` | Bordas |

Tipografia:
- **Títulos:** Fraunces (opsz axis, via Google Fonts)
- **Corpo:** Inter

Escala tipográfica: 1.25 (major third), base 16px.

---

## Schema.org implementado

- **MedicalBusiness** (global, via layout) — raiz do grafo organizacional
- **FAQPage** (em `/perguntas-frequentes`) — auto-gerado a partir de `content/faq.ts`
- **Article** (em `/blog/[slug]`) — auto-gerado a partir do frontmatter do MDX
- **BreadcrumbList** (em posts do blog)

Helpers em `lib/seo.ts`.

---

## Acessibilidade

- HTML semântico (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`)
- Skip link para "pular para o conteúdo"
- Focus ring visível em todos os elementos interativos
- Contraste WCAG AA em todos os tokens da paleta
- `aria-label` e `aria-expanded` em componentes interativos

Revisão formal de acessibilidade recomendada antes do deploy público.

---

## Observações importantes

### Sobre credenciais e promessas

- Apenas credenciais **já públicas** no site atual da Juliana são usadas (CRN-9 22006, CNPJ, "mais de 10 anos", pós em nutrição clínica). Nenhuma instituição ou título foi inventado.
- O disclaimer educativo aparece em todos os artigos e na rodapé, em conformidade com o Código de Ética do Nutricionista.
- Não há promessa de cura — o site segue o CFN.

### Sobre SEO e o site atual

O site atual em Elementor (`julianamaianutriaplv.com.br`) continua em operação. Este projeto foi construído como **independente**. Há risco de canibalização de SEO — o cliente optou por convivência dos dois, com domínio a ser decidido no deploy. Recomendações em `pesquisa-juliana.md`.

### Captura de e-mail: como trocar de provider

O sistema é plugável. Para ativar em produção:

1. Escolha o provider no `.env.local`:
   ```
   LEAD_PROVIDER=brevo   # ou mailchimp / resend
   ```
2. Preencha as chaves específicas (`BREVO_API_KEY`, `BREVO_LIST_ID`, etc.)
3. Reinicie o servidor
4. O formulário em `/materiais` passa a capturar de verdade

Para testar localmente sem integrar nada, use `LEAD_PROVIDER=console` — os leads ficam logados no terminal.

### Pendências

- Ver `CONTEUDO-PENDENTE.md` para a lista geral de itens pendentes
- Ver `BRIEFING-JULIANA.md` para a checklist formatada para conversa direta com a Juliana

---

## Licença

Conteúdo de autoria de Juliana Fernandes Maia. Todos os direitos reservados.
Código: livre para aprendizado e adaptação, mencionando a fonte.
