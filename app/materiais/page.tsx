import { BookOpen, ChefHat, ShieldCheck } from "lucide-react";

import { LeadForm } from "@/components/lead-form";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Materiais gratuitos — APLV",
  description:
    "Ebooks e guias gratuitos sobre APLV: leitura de rótulos, receitas sem leite aprovadas pelas crianças e mais. Baixe com consentimento LGPD.",
  path: "/materiais",
});

const materials = [
  {
    id: "guia-rotulos",
    icon: <BookOpen className="h-6 w-6" />,
    title: "Guia prático de leitura de rótulos APLV",
    description:
      "PDF com passo a passo para identificar leite 'escondido' em rótulos, glossário de termos (caseína, soro, whey etc.) e lista de produtos que merecem atenção redobrada.",
    bullets: [
      "12 páginas em PDF",
      "Glossário com 30+ termos que significam leite",
      "Checklist de 10 itens para usar no mercado",
    ],
  },
  {
    id: "receitas-criancas",
    icon: <ChefHat className="h-6 w-6" />,
    title: "10 receitas sem leite aprovadas pelas crianças",
    description:
      "PDF com receitas testadas em famílias APLV reais. Bolo, biscoito, pão de queijo sem queijo, patês, lanches para a escola.",
    bullets: [
      "10 receitas passo a passo",
      "Foto colorida em cada receita",
      "Lista de ingredientes substitutos",
    ],
  },
];

export default function MateriaisPage() {
  return (
    <>
      <Section
        eyebrow="Materiais gratuitos"
        title="Aprender mais, sem custo"
        description="Guias em PDF para você baixar. Ao se cadastrar, você concorda com o tratamento do seu e-mail conforme a nossa política de privacidade (LGPD)."
      />

      <section className="container pb-20">
        <div className="grid gap-8 md:gap-10 md:grid-cols-2 max-w-5xl">
          {materials.map((m) => (
            <article
              key={m.id}
              className="rounded-2xl bg-card border border-border p-7 md:p-8 flex flex-col"
            >
              <div className="h-12 w-12 rounded-xl bg-secondary-soft text-secondary flex items-center justify-center mb-5">
                {m.icon}
              </div>
              <h2 className="font-serif text-2xl mb-2">{m.title}</h2>
              <p className="text-foreground/75 mb-5">{m.description}</p>

              <ul className="space-y-2 mb-6 text-sm text-foreground/80">
                {m.bullets.map((b) => (
                  <li key={b} className="flex gap-2 items-start">
                    <span className="text-secondary mt-1">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <LeadForm
                  source={m.id}
                  cta="Receber o material"
                  successMessage="Pronto! Em instantes o material chega no seu e-mail."
                />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-[1fr_auto] items-center rounded-2xl bg-primary-soft p-8 md:p-10 max-w-5xl">
          <div>
            <div className="flex items-center gap-2 text-secondary font-medium text-sm mb-2">
              <ShieldCheck className="h-4 w-4" />
              Sobre seus dados
            </div>
            <h2 className="font-serif text-2xl text-primary mb-3">
              Cuidamos do seu e-mail com responsabilidade
            </h2>
            <ul className="space-y-2 text-foreground/85 text-sm">
              <li>O e-mail é usado apenas para enviar o material pedido e, com seu aceite, novos conteúdos educativos ocasionais.</li>
              <li>Você pode descadastrar a qualquer momento com um clique.</li>
              <li>Seus dados não são vendidos nem compartilhados com terceiros.</li>
              <li>Em conformidade com a LGPD (Lei 13.709/2018).</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 max-w-5xl">
          <p className="text-sm text-foreground/70">
            Quer um plano individual agora?{" "}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary"
            >
              Fale com a equipe para agendar consulta →
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
