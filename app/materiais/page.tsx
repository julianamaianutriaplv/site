import Image from "next/image";
import { ShieldCheck } from "lucide-react";

import { LeadForm } from "@/components/lead-form";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Materiais gratuitos — APLV",
  description:
    "Ebooks de receitas sem leite para crianças APLV: 25 receitas de lanches + 25 receitas doces. Baixe gratuitamente com consentimento LGPD.",
  path: "/materiais",
});

const materials = [
  {
    id: "receitas-lanches",
    title: "25 Receitas de Lanches para APLV",
    description:
      "Ebook com 25 receitas de lanches sem leite e sem glúten — testadas em famílias APLV reais, com foto e passo a passo. Bolos, biscoitos, pão de queijo sem queijo, patês e muito mais para a lancheira da escola e para o dia a dia.",
    cover: "/materiais/capa-lanches.jpg",
    alt: "Capa do ebook 25 Receitas de Lanches para APLV",
    bullets: [
      "25 receitas completas, ingredientes e modo de fazer",
      "Foco em lanche da escola e substitutos do pão/biscoito industrializado",
      "Alérgicos alimentares (ovo e glúten) contemplados",
    ],
  },
  {
    id: "receitas-doces",
    title: "25 Receitas Doces para APLV",
    description:
      "Ebook com 25 receitas doces sem leite — brigadeiro, pudim, bolos de chocolate, sobremesas geladas e opções para festas. Para a criança APLV não ficar de fora de nenhum momento especial.",
    cover: "/materiais/capa-doces.jpg",
    alt: "Capa do ebook 25 Receitas Doces para APLV",
    bullets: [
      "25 receitas doces passo a passo, todas sem leite",
      "Opções para festas, aniversários e sobremesas do dia",
      "Adaptações para ovo e glúten quando aplicável",
    ],
  },
];

export default function MateriaisPage() {
  return (
    <>
      <Section
        eyebrow="Materiais gratuitos"
        title="Ebooks de receitas sem leite"
        description="Desenvolvidos pela Juliana para famílias APLV. Ao se cadastrar, você concorda com o uso do seu e-mail conforme a nossa política de privacidade (LGPD)."
      />

      <section className="container pb-20">
        <div className="grid gap-10 md:grid-cols-2 max-w-5xl">
          {materials.map((m) => (
            <article
              key={m.id}
              className="rounded-2xl bg-card border border-border p-6 md:p-8 flex flex-col"
            >
              <div className="grid gap-6 sm:grid-cols-[180px_1fr] items-start mb-6">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted shadow-soft mx-auto sm:mx-0 w-full max-w-[220px]">
                  <Image
                    src={m.cover}
                    alt={m.alt}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-serif text-2xl mb-3 text-primary text-balance">
                    {m.title}
                  </h2>
                  <ul className="space-y-2 text-sm text-foreground/85">
                    {m.bullets.map((b) => (
                      <li key={b} className="flex gap-2 items-start">
                        <span className="text-secondary mt-1">—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-foreground/75 mb-6 text-pretty">
                {m.description}
              </p>

              <div className="mt-auto">
                <LeadForm
                  source={m.id}
                  cta="Receber o ebook"
                  successMessage="Pronto! Em instantes o ebook chega no seu e-mail."
                />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-[auto_1fr] items-start rounded-2xl bg-primary-soft p-8 md:p-10 max-w-5xl">
          <ShieldCheck className="h-10 w-10 text-primary shrink-0" />
          <div>
            <h2 className="font-serif text-2xl text-primary mb-3">
              Cuidamos do seu e-mail com responsabilidade
            </h2>
            <ul className="space-y-2 text-foreground/85 text-sm">
              <li>
                O e-mail é usado apenas para enviar o ebook pedido e, com seu
                aceite, novos conteúdos educativos ocasionais.
              </li>
              <li>
                Você pode descadastrar a qualquer momento com um clique.
              </li>
              <li>
                Seus dados não são vendidos nem compartilhados com terceiros.
              </li>
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
