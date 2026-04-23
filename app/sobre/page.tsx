import Link from "next/link";
import {
  BadgeCheck,
  BookOpen,
  HeartHandshake,
  Sprout,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProfilePhoto } from "@/components/profile-photo";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/seo";
import { siteConfig, whatsappLink } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Sobre Juliana Maia",
  description:
    "Juliana Fernandes Maia é nutricionista clínica especialista em alergia alimentar (CRN-9 22006), mãe do João Artur, criança diagnosticada com APLV aos 12 dias de vida.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <Section
        eyebrow="Quem é"
        title="Juliana Maia"
        description={siteConfig.tagline}
      >
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] items-start">
          <div className="space-y-5 text-lg leading-relaxed text-foreground/85">
            <div className="md:hidden mb-6">
              <ProfilePhoto
                src={process.env.NEXT_PUBLIC_PROFILE_IMAGE}
                shape="portrait"
              />
            </div>
            <p>
              Juliana Fernandes Maia é nutricionista clínica ({siteConfig.professional.crn})
              com 20 anos de experiência clínica e 10 anos de especialização
              em alergia alimentar — com foco em APLV (alergia à proteína do
              leite de vaca) na infância.
            </p>
            <p>
              A escolha pela especialidade não veio só do consultório. Veio de
              casa. O filho dela, João Artur, foi diagnosticado com APLV aos{" "}
              <strong>12 dias de vida</strong>, com sangue nas fezes, choro
              intenso e sono fragmentado. A busca pela compreensão do
              tratamento na prática — não apenas da teoria — levou a Juliana a
              aprofundar estudos, escutar outras famílias, testar caminhos e
              consolidar um método que funciona na rotina real.
            </p>
            <p>
              Hoje, o trabalho dela combina clínica, educação e apoio
              emocional. O objetivo é claro: estabilizar os sintomas da
              criança com saúde, boa nutrição e leveza na maternidade — sem
              promessa de milagre, com base em diretrizes oficiais brasileiras
              (ASBAI/SBP e Consenso Brasileiro sobre Alergia Alimentar).
            </p>
          </div>

          <div>
            <div className="hidden md:block mb-8">
              <ProfilePhoto
                src={process.env.NEXT_PUBLIC_PROFILE_IMAGE}
                shape="portrait"
              />
            </div>
            <div className="rounded-2xl bg-card border border-border p-8">
            <h2 className="font-serif text-xl text-primary mb-5">
              Credenciais
            </h2>
            <ul className="space-y-4 text-foreground/85">
              <Cred
                label="Nome completo"
                value={siteConfig.professional.fullName}
              />
              <Cred
                label="Registro profissional"
                value={`${siteConfig.professional.crn} · ${siteConfig.professional.crnState}`}
              />
              <Cred
                label="Experiência"
                value={`${siteConfig.professional.experienceYears} anos em nutrição clínica`}
              />
              <Cred
                label="Especialização"
                value={`${siteConfig.professional.specialty} (${siteConfig.professional.specialtyYears} anos)`}
              />
              <Cred
                label="Pós-graduação"
                value="Nutrição clínica (pós-graduação lato sensu)"
              />
              <Cred
                label="CNPJ"
                value={siteConfig.professional.cnpj}
              />
            </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Método"
        title="Como funciona"
        description="Um plano para cada criança, sem receita de bolo. O método combina quatro pilares que se reforçam."
        className="bg-muted/30"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <PillarBox
            icon={<BadgeCheck className="h-6 w-6" />}
            title="Avaliação clínica precisa"
            description="Levantamento detalhado da história, sintomas, exames (quando pertinentes), tipo provável de APLV (IgE, não-IgE, mista) e comorbidades."
          />
          <PillarBox
            icon={<Sprout className="h-6 w-6" />}
            title="Plano nutricional individualizado"
            description="Dieta de exclusão para criança e mãe (se amamenta), escolha de fórmula se aplicável, suplementação orientada, adequação nutricional completa."
          />
          <PillarBox
            icon={<BookOpen className="h-6 w-6" />}
            title="Educação da família"
            description="Leitura de rótulo, prevenção de contaminação cruzada, como navegar creche, festas, viagens. Autonomia é parte do tratamento."
          />
          <PillarBox
            icon={<HeartHandshake className="h-6 w-6" />}
            title="Acompanhamento próximo"
            description="Retornos programados, suporte por WhatsApp no pacote completo, ajustes de plano conforme evolução. Reintrodução supervisionada quando for o momento."
          />
        </div>
      </Section>

      <Section
        eyebrow="Responsabilidade"
        title="O que você não vai encontrar aqui"
        description="Tão importante quanto o que a gente faz, é o que não faz. Parte do trabalho é desmontar expectativas irrealistas."
      >
        <ul className="grid gap-4 max-w-3xl text-foreground/85">
          <li className="flex gap-3">
            <span className="mt-1 text-secondary">—</span>
            <div>
              <strong>Promessa de cura.</strong> APLV não é "curada" por método nenhum; a criança desenvolve tolerância ao longo do tempo. O acompanhamento guia esse processo com segurança — não o fabrica.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 text-secondary">—</span>
            <div>
              <strong>Testes "IgG alimentos" ou "food intolerance".</strong> A ASBAI é explícita: esses testes não têm validade para APLV e não orientam exclusões alimentares.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 text-secondary">—</span>
            <div>
              <strong>Protocolos genéricos.</strong> Cada criança tem um ritmo, um tipo de APLV e uma rotina. O plano não serve se não for feito para ela.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 text-secondary">—</span>
            <div>
              <strong>Prescrição medicamentosa.</strong> Medicação é papel do médico. A nutrição cuida da parte nutricional, em parceria com o pediatra e/ou alergista.
            </div>
          </li>
        </ul>
      </Section>

      <Section>
        <div className="rounded-2xl bg-primary-soft p-8 md:p-12 max-w-3xl mx-auto text-center">
          <p className="font-serif text-2xl md:text-3xl text-primary mb-3 text-balance">
            Se você chegou até aqui, está no caminho certo.
          </p>
          <p className="text-foreground/80 mb-6 text-pretty">
            O próximo passo é conversar sobre o caso da sua criança.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar consulta
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/consultas">Ver pacotes de consulta</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function Cred({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex flex-col">
      <span className="text-xs uppercase tracking-wider text-foreground/60">
        {label}
      </span>
      <span className="text-base">{value}</span>
    </li>
  );
}

function PillarBox({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-card border border-border p-7">
      <div className="h-11 w-11 rounded-xl bg-secondary-soft text-secondary flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-serif text-xl mb-2">{title}</h3>
      <p className="text-foreground/75">{description}</p>
    </div>
  );
}
