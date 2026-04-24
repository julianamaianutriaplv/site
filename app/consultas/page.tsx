import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Clock,
  FileCheck2,
  MessageCircle,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

type PackageItem = {
  text: string;
  /** false = renderizar como "não incluso" (X vermelho + texto riscado) */
  included?: boolean;
  /** true = destacar em negrito (usado para diferenciar retornos entre pacotes) */
  highlight?: boolean;
};

export const metadata = buildMetadata({
  title: "Consultas — Acompanhamento nutricional APLV",
  description:
    "Consultas 100% online por Google Meet com Juliana Maia. Pacotes Completo e Básico, com prescrição nutricional, suplementação e lista de marcas seguras.",
  path: "/consultas",
});

const packages: Array<{
  name: string;
  featured?: boolean;
  description: string;
  items: PackageItem[];
}> = [
  {
    name: "Pacote Completo",
    featured: true,
    description:
      "Acompanhamento mais próximo, indicado para famílias em início de diagnóstico ou casos complexos.",
    items: [
      { text: "1 consulta inicial (videochamada Google Meet)" },
      { text: "2 consultas de retorno (a cada 20 dias)", highlight: true },
      { text: "Acompanhamento por WhatsApp por 2 meses em dias úteis" },
      { text: "Prescrição nutricional individualizada" },
      { text: "Indicação de suplementação quando aplicável" },
      { text: "Lista atualizada de marcas seguras" },
      { text: "Nota fiscal para reembolso em planos de saúde" },
      { text: "Declaração para Imposto de Renda" },
    ],
  },
  {
    name: "Pacote Básico",
    description:
      "Indicado para famílias com plano já em andamento que precisam de ajustes pontuais.",
    items: [
      { text: "1 consulta inicial (videochamada Google Meet)" },
      { text: "1 consulta de retorno após 20 dias", highlight: true },
      {
        text: "Acompanhamento por WhatsApp por 2 meses em dias úteis",
        included: false,
      },
      { text: "Prescrição nutricional individualizada" },
      { text: "Indicação de suplementação quando aplicável" },
      { text: "Lista atualizada de marcas seguras" },
      { text: "Nota fiscal para reembolso em planos de saúde" },
      { text: "Declaração para Imposto de Renda" },
    ],
  },
];

export default function ConsultasPage() {
  return (
    <>
      <Section
        eyebrow="Consultas"
        title="Acompanhamento nutricional APLV 100% online"
        description="Atendimento por videochamada (Google Meet), em pacotes estruturados. O plano é individual, baseado em avaliação clínica criteriosa."
      />

      <section className="container pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          {packages.map((pack) => (
            <article
              key={pack.name}
              className={`rounded-2xl p-8 md:p-10 border ${
                pack.featured
                  ? "bg-primary text-primary-contrast border-primary"
                  : "bg-card text-foreground border-border"
              }`}
            >
              {pack.featured ? (
                <div className="inline-block bg-secondary text-white text-xs uppercase tracking-wider font-medium px-3 py-1 rounded-full mb-4">
                  Mais procurado
                </div>
              ) : null}
              <h2 className="font-serif text-3xl mb-2">{pack.name}</h2>
              <p
                className={`mb-6 ${
                  pack.featured ? "text-primary-contrast/85" : "text-foreground/75"
                }`}
              >
                {pack.description}
              </p>
              <ul className="space-y-3 mb-8">
                {pack.items.map((item) => {
                  const notIncluded = item.included === false;
                  return (
                    <li key={item.text} className="flex gap-3 items-start">
                      {notIncluded ? (
                        // Bolinha vermelha com X dentro — indica "não incluso"
                        <span
                          className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-destructive text-white inline-flex items-center justify-center"
                          aria-label="Não incluso"
                          title="Não incluso neste pacote"
                        >
                          <svg
                            className="h-3 w-3"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M4 4l8 8M12 4l-8 8"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      ) : (
                        <CheckCircle2
                          className={cn(
                            "h-5 w-5 shrink-0 mt-0.5",
                            pack.featured ? "text-accent" : "text-secondary",
                          )}
                          aria-label="Incluso"
                        />
                      )}
                      <span
                        className={cn(
                          pack.featured
                            ? "text-primary-contrast/95"
                            : "text-foreground",
                          notIncluded && "line-through opacity-60",
                          item.highlight && !notIncluded && "font-semibold",
                        )}
                      >
                        {item.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <Button
                asChild
                variant={pack.featured ? "secondary" : "primary"}
                size="lg"
                className="w-full sm:w-auto"
              >
                <a
                  href={whatsappLink(
                    siteConfig.contact.whatsappSupport,
                    `Olá! Gostaria de informações sobre valores e agendamento do ${pack.name}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar valores e agendar
                </a>
              </Button>
              <p
                className={`mt-4 text-xs ${
                  pack.featured ? "text-primary-contrast/70" : "text-foreground/60"
                }`}
              >
                Valores passados pela equipe via WhatsApp.
              </p>
            </article>
          ))}
        </div>
      </section>

      <Section
        eyebrow="Como funciona"
        title="Do primeiro contato ao plano em execução"
        className="bg-muted/30"
      >
        <div className="grid gap-6 md:grid-cols-4">
          <StepCard
            step="1"
            icon={<MessageCircle className="h-6 w-6" />}
            title="Contato inicial"
            description="Você fala com a equipe pelo WhatsApp, tira dúvidas e confirma o pacote escolhido."
          />
          <StepCard
            step="2"
            icon={<Calendar className="h-6 w-6" />}
            title="Agendamento"
            description="Reserva de horário da consulta inicial. Você recebe orientações pré-consulta (diário alimentar, exames)."
          />
          <StepCard
            step="3"
            icon={<Video className="h-6 w-6" />}
            title="Consulta online"
            description="Videochamada pelo Google Meet. Avaliação clínica detalhada, montagem do plano nutricional, tira-dúvidas."
          />
          <StepCard
            step="4"
            icon={<FileCheck2 className="h-6 w-6" />}
            title="Plano e retornos"
            description="Você recebe prescrição por escrito, lista de marcas seguras e sequência de retornos."
          />
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] items-start">
          <div>
            <h2 className="font-serif text-3xl text-primary mb-4">
              Perguntas antes de agendar
            </h2>
            <p className="text-foreground/80">
              As dúvidas mais comuns das famílias que chegam por aqui.
            </p>
          </div>
          <div className="space-y-6">
            <QaBlock
              q="Atende presencialmente?"
              a="Não. Atendimento é 100% online via Google Meet, o que permite receber famílias de todo o Brasil e do exterior, em horários flexíveis."
            />
            <QaBlock
              q="Preciso ter diagnóstico antes de marcar?"
              a="Não necessariamente. A consulta também serve para avaliar suspeita de APLV, orientar investigação e encaminhamentos. Se há laudo, trazer ajuda a agilizar."
            />
            <QaBlock
              q="Plano de saúde cobre?"
              a="Consulta particular. Você recebe nota fiscal e declaração para solicitar reembolso ao seu plano, conforme regras do convênio."
            />
            <QaBlock
              q="Posso levar o meu filho na consulta?"
              a="Sim, e é bem-vindo. Nas primeiras consultas a participação da criança é menor (conversa é com os pais), mas ela pode estar presente e é parte do vínculo."
            />
            <QaBlock
              q="E se eu precisar de mais acompanhamento depois?"
              a="Ao final dos retornos do pacote, é possível contratar novos pacotes ou consultas avulsas conforme necessidade. Combinamos na última consulta."
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="rounded-2xl bg-primary-soft p-8 md:p-12 max-w-3xl mx-auto text-center">
          <Clock className="h-10 w-10 mx-auto mb-5 text-primary" />
          <p className="font-serif text-2xl md:text-3xl text-primary mb-3">
            Próximos horários disponíveis
          </p>
          <p className="text-foreground/80 mb-6">
            Agenda atualizada é checada pela equipe. Valores e horários são
            passados por WhatsApp.
          </p>
          <Button asChild size="lg">
            <a
              href={whatsappLink(
                siteConfig.contact.whatsappSupport,
                "Olá! Gostaria de saber os próximos horários disponíveis para consulta.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar com a equipe no WhatsApp
            </a>
          </Button>
        </div>
      </Section>
    </>
  );
}

function StepCard({
  step,
  icon,
  title,
  description,
}: {
  step: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-card border border-border p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-primary text-primary-contrast flex items-center justify-center font-semibold">
          {step}
        </div>
        <div className="text-secondary">{icon}</div>
      </div>
      <h3 className="font-serif text-lg mb-2">{title}</h3>
      <p className="text-sm text-foreground/75">{description}</p>
    </div>
  );
}

function QaBlock({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-l-2 border-secondary/40 pl-5">
      <h3 className="font-serif text-lg mb-1">{q}</h3>
      <p className="text-foreground/75 text-sm">{a}</p>
    </div>
  );
}
