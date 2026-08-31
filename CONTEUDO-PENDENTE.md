# Conteúdo pendente — Juliana Maia

Esta é a lista do que precisa vir da Juliana (ou ser decidido com ela) antes do lançamento público do site.

Cada item tem **por que importa** e **onde no código** é inserido.

> **Documento-companheiro:** veja `BRIEFING-JULIANA.md` para a lista formatada para levar direto a ela.

---

## 🔴 Bloqueadores para go-live

### 1. ~~Domínio definitivo~~ ✅ DECIDIDO
- **Domínio:** `julianamaianutriaplv.com.br` (apex) — este site **substitui** o
  WordPress que estava na Hostinger
- **Registro:** Registro.br · **DNS:** Cloudflare
- **Hospedagem:** Cloudflare Workers (build estático)
- **E-mail:** Hostinger, `suporte@julianamaianutriaplv.com.br` (os MX ficam
  onde estão — o plano da Hostinger continua ativo só pelo e-mail)
- **`.com`:** estava em `clientHold` na Squarespace, nunca entrou no ar. Depois
  de destravado, passa a redirecionar 301 para o `.com.br`
- **Deploy:** passo a passo em `DEPLOY.md`
- **Canibalização de SEO:** não se aplica — não há dois sites. As URLs antigas
  do WordPress com equivalente estão mapeadas em `public/_redirects`

> Correção (31/08/2026): a decisão registrada aqui antes — `.com` na Vercel com
> DNS Squarespace e Google Workspace — nunca chegou a existir. O `.com` estava
> suspenso e não resolvia nada, e o e-mail sempre foi Hostinger no `.com.br`.

### 2. Valores das consultas
- **O que:** valores do Pacote Completo e Pacote Básico
- **Por que:** páginas `/consultas` e cards de pacote hoje dizem "consultar valores via WhatsApp" — replicação literal do site atual. Opcional deixar assim ou listar valores.
- **Onde:** `app/consultas/page.tsx`
- **Decisão pendente:** manter via WhatsApp (modelo atual) ou publicar no site

### 3. Link de agendamento
- **O que:** link direto de agendamento (Calendly, Cal.com, Doctoralia, Google Agenda público, ou outro)
- **Por que:** hoje todo CTA "agendar" aponta para WhatsApp; integração direta reduz fricção
- **Onde:** `.env.local` → `NEXT_PUBLIC_BOOKING_URL`; `lib/site.ts` → `booking.url`

### 4. ~~Fotos profissionais~~ ✅ ENTREGUE

Fotos reais em `public/` desde o commit `9a16260`.

<details><summary>briefing original</summary>

- **O que:** fotos em alta resolução da Juliana para uso web (Home, Sobre, social cards)
- **Requisitos:**
  - Direitos autorais liberados (fotógrafa ou selfie de qualidade)
  - 3 a 5 poses variadas (retrato, ambiente de trabalho, lifestyle)
  - 1 foto apta a virar OG image 1200x630
- **Onde:**
  - Coloque os arquivos em `/public/` (ex: `/public/juliana-hero.jpg`, `/public/juliana-sobre.jpg`)
  - Configure no `.env.local`:
    - `NEXT_PUBLIC_HERO_IMAGE=/juliana-hero.jpg`
    - `NEXT_PUBLIC_PROFILE_IMAGE=/juliana-sobre.jpg`
  - Os componentes `HeroVisual` e `ProfilePhoto` detectam automaticamente e substituem os placeholders decorativos pelas fotos reais.
- **Enquanto não chega:** o site renderiza placeholders visuais bonitos, sem quebrar o layout.

</details>

### 5. ~~Logo / identidade visual~~ ✅ ENTREGUE

Logo real em `public/logo.jpg`; favicon, ícones 192/512, apple-touch-icon e OG image gerados a partir dele.

<details><summary>briefing original</summary>

- **O que:** logo em SVG (ou PNG em alta) para usar no header, footer e favicon
- **Onde:**
  - Coloque em `/public/logo.svg` e favicon em `/public/favicon.ico`
  - Substituir o componente `components/brand-mark.tsx` pelo uso de `<Image src="/logo.svg" ... />`
  - **Enquanto não chega:** o `BrandMark` atual renderiza um monograma SVG gerado programaticamente, bonito e coerente com a paleta. Não quebra layout.

</details>

### 6. ~~E-mail oficial~~ ✅ DEFINIDO

`suporte@julianamaianutriaplv.com.br` — a caixa que a Juliana já usa.

<details><summary>briefing original</summary>

- **O que:** e-mail profissional para contato LGPD e geral
- **Por que:** usado na política de privacidade, termos, footer
- **Onde:** `lib/site.ts` → `contact.email`

</details>

### 7. Revisão jurídica de Privacidade e Termos
- **O que:** advogado(a) revisar `app/privacidade/page.tsx` e `app/termos/page.tsx`
- **Por que:** LGPD exige política formal; Termos delimitam responsabilidade; templates foram redigidos com boas práticas mas precisam de aval profissional

---

## 🟡 Importantes (podem ir para a v2)

### 8. ~~Depoimentos~~ — REMOVIDO do escopo
- Em conformidade com a **Resolução CFN nº 599/2018**, que veda uso de depoimentos de pacientes como técnica de persuasão em publicidade de serviços nutricionais.
- Página `/depoimentos`, links no menu, footer e sitemap foram removidos.
- Disclaimer em `/termos` atualizado para referenciar a resolução.

### 9. Ebooks / materiais gratuitos
- **O que:** os PDFs efetivos dos dois materiais prometidos
  - Guia de leitura de rótulos APLV
  - 10 receitas sem leite aprovadas pelas crianças
- **Onde:** `/public/materiais/guia-rotulos.pdf` e `/public/materiais/receitas-criancas.pdf`
- **Entrega automática:** se `LEAD_PROVIDER=resend`, o PDF é enviado ao lead por e-mail automaticamente

### 10. Integração de e-mail marketing ✅ (infra pronta)
- **O que:** formulário de captura + API + provider plugável JÁ IMPLEMENTADO
- **Providers suportados (troca por env):**
  - `console` (dev, só loga)
  - `brevo` (Brevo/SendinBlue)
  - `mailchimp` (com double opt-in)
  - `resend` (envio transacional direto do PDF)
  - `none` (desliga)
- **Onde configurar:** `.env.local` → `LEAD_PROVIDER` + chaves específicas
- **Falta:** decidir qual provider usar e fornecer credenciais

### 11. Google Analytics 4
- **O que:** conta do GA4 (criar ou fornecer ID existente)
- **Por que:** mensurar tráfego e conversões
- **Onde:** `.env.local` → `NEXT_PUBLIC_GA_ID`

### 12. Google Search Console
- **O que:** verificação de propriedade do domínio
- **Por que:** indexação e monitoramento de SERP
- **Onde:** adicionar meta tag em `app/layout.tsx` ou arquivo de verificação em `/public/`

### 13. Instituição da pós-graduação (se desejado)
- **O que:** nome da instituição e ano da pós em nutrição clínica
- **Por que:** hoje aparece genérico ("pós em nutrição clínica") — é o que está público no site atual. Detalhamento é opcional, fortalece autoridade.
- **Onde:** `lib/site.ts` → `professional` + página `/sobre`

---

## 🟢 Nice to have (roadmap de conteúdo)

### 14. Mais artigos de blog
Temos **13 artigos** publicados. Para chegar em 20+ com melhor coverage de SEO, próximas pautas sugeridas:
- Alergias múltiplas em crianças (APLV + ovo + trigo)
- Retomar a amamentação após diagnóstico de APLV
- Mitos sobre cálcio e ossos
- Suplementação em bebês APLV: o que realmente precisa
- APLV em crianças mais velhas / adolescentes
- Receitas sem leite para jantar de família
- Convivendo com criança APLV e criança sem APLV em casa

### 15. Área do paciente (v3+)
Portal logado para famílias em acompanhamento com:
- Prescrição em formato digital
- Lista de marcas seguras atualizada
- Histórico de consultas
- Material exclusivo

### 16. Podcast / YouTube embed
Seção dedicada integrando vídeos do canal dela, com transcrição para SEO.

### 17. Comunidade
Grupo de Telegram ou Discord linkado com regras claras de comunidade.

---

## Como atualizar este documento

À medida que itens forem preenchidos, mover o bullet para `~~riscado~~` ou deletar. Manter este arquivo até o go-live público.

---

## 📊 Status atual (resumo)

**Implementado nesta sessão:**
- ✅ Sistema de captura de e-mail LGPD-compliant + API route + 4 providers plugáveis
- ✅ Rate limiting anti-abuso na API
- ✅ Componente BrandMark (logo SVG programático)
- ✅ Componentes HeroVisual e ProfilePhoto com placeholder decorativo
- ✅ 5 novos artigos (13 total): FPIES, introdução alimentar, dermatite atópica, probióticos, quando encaminhar
- ✅ `BRIEFING-JULIANA.md` com checklist formatado para conversa com a Juliana

**Próximas pendências reais (dependem da Juliana):**
- ✅ Fotos, logo oficial, e-mail oficial
- 🔴 Valores das consultas · link de agendamento · revisão jurídica
- 🟡 Decisão de provider de e-mail (a infra está pronta)
- 🟡 PDFs dos ebooks
- 🟡 ID do Google Analytics

Última revisão: 2026-04-23
