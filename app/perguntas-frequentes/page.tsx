import Script from "next/script";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { faqCategories, faqItems, type FaqCategory } from "@/content/faq";
import { buildMetadata, faqPageJsonLd } from "@/lib/seo";
import { siteConfig, whatsappLink } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Perguntas frequentes sobre APLV",
  description:
    "Respostas às dúvidas mais comuns sobre alergia à proteína do leite de vaca: diagnóstico, alimentação, fórmulas, escada do leite, vida prática.",
  path: "/perguntas-frequentes",
  keywords: [
    "APLV FAQ",
    "alergia leite dúvidas",
    "escada do leite",
    "fórmula APLV",
    "dieta materna",
  ],
});

export default function FaqPage() {
  const jsonLd = faqPageJsonLd(
    faqItems.map((f) => ({ question: f.question, answer: f.answer })),
  );

  const categoriesOrder: FaqCategory[] = [
    "diagnostico",
    "alimentacao-crianca",
    "alimentacao-mae",
    "formulas",
    "reintroducao",
    "vida-pratica",
  ];

  return (
    <>
      <Section
        eyebrow="Perguntas frequentes"
        title="Dúvidas comuns sobre APLV, respondidas com clareza"
        description="As respostas aqui são educativas, baseadas em diretrizes oficiais (ASBAI/SBP, Consenso Brasileiro, PCDT CONITEC). Não substituem consulta individualizada."
      />

      <section className="container pb-20">
        <nav className="mb-12 flex flex-wrap gap-2" aria-label="Categorias de perguntas">
          {categoriesOrder.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:border-primary hover:text-primary transition-colors"
            >
              {faqCategories[key].label}
            </a>
          ))}
        </nav>

        <div className="space-y-16">
          {categoriesOrder.map((key) => {
            const items = faqItems.filter((i) => i.category === key);
            if (items.length === 0) return null;
            const meta = faqCategories[key];

            return (
              <div key={key} id={key} className="scroll-mt-24">
                <header className="mb-6 max-w-3xl">
                  <h2 className="font-serif text-3xl text-primary">
                    {meta.label}
                  </h2>
                  <p className="mt-2 text-foreground/75">{meta.description}</p>
                </header>

                <Accordion type="multiple" className="max-w-3xl">
                  {items.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-2xl bg-primary-soft p-8 md:p-10 max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl text-primary mb-3">
            Não encontrou sua pergunta?
          </h2>
          <p className="text-foreground/80 mb-6">
            A complexidade da APLV exige avaliação individual. Para o caso da
            sua criança, uma consulta organiza o plano por inteiro.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <a
                href={whatsappLink(
                  siteConfig.contact.whatsappSupport,
                  "Olá! Tenho dúvidas sobre APLV e gostaria de saber sobre as consultas.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com a equipe
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/consultas">Ver as consultas</Link>
            </Button>
          </div>
        </div>
      </section>

      <Script
        id="ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
