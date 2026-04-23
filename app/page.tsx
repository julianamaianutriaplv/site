import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck2,
  GraduationCap,
  HeartHandshake,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/hero-visual";
import { Section } from "@/components/section";
import { getAllPosts } from "@/lib/blog";
import { siteConfig, whatsappLink } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-soft/40 via-background to-background" />
        <div className="container relative py-16 md:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm mb-6">
                <Sparkles className="h-3.5 w-3.5 text-secondary" />
                Nutricionista clínica · {siteConfig.professional.crn}
              </div>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-balance text-primary">
                {siteConfig.tagline}
              </h1>

              <p className="mt-6 text-xl text-foreground/80 text-pretty max-w-2xl">
                Referência em alergia à proteína do leite de vaca (APLV)
                infantil. Acompanho famílias a estabilizar (parar) sintomas
                com saúde, boa nutrição e leveza na maternidade.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg">
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Agendar consulta
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/aplv">O que é APLV</Link>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-8 text-sm text-foreground/70">
                <div>
                  <div className="font-serif text-3xl text-primary">20</div>
                  <div>anos em nutrição clínica</div>
                </div>
                <div>
                  <div className="font-serif text-3xl text-primary">10</div>
                  <div>anos especialista em alergia alimentar</div>
                </div>
                <div>
                  <div className="font-serif text-3xl text-primary">+7.000</div>
                  <div>famílias orientadas</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <HeroVisual src={process.env.NEXT_PUBLIC_HERO_IMAGE} />
            </div>
          </div>
        </div>
      </section>

      {/* O QUE FAZEMOS AQUI */}
      <Section
        eyebrow="Como podemos te ajudar"
        title="Um lugar para quem vive a APLV"
        description="Conteúdo clínico, acolhimento informado e acompanhamento individualizado, com base em diretrizes oficiais brasileiras (ASBAI/SBP)."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <PillarCard
            icon={<BookOpen className="h-6 w-6" />}
            title="Conteúdo clínico sério"
            description="Artigos e perguntas frequentes com base em diretrizes reconhecidas. Sem promessa de cura, sem receita milagrosa."
            href="/blog"
            linkLabel="Ler o blog"
          />
          <PillarCard
            icon={<Stethoscope className="h-6 w-6" />}
            title="Consultas 100% online"
            description="Atendimento por videochamada (Google Meet) em pacotes estruturados, com suporte pós-consulta e lista de marcas seguras."
            href="/consultas"
            linkLabel="Ver as consultas"
          />
          <PillarCard
            icon={<HeartHandshake className="h-6 w-6" />}
            title="Experiência que virou método"
            description="Juliana é mãe do João Artur, diagnosticado com APLV aos 12 dias. Essa vivência orienta a forma de conduzir cada família."
            href="/sobre"
            linkLabel="Conhecer a Juliana"
          />
        </div>
      </Section>

      {/* DIFERENCIAIS / ABORDAGEM */}
      <Section
        eyebrow="Abordagem"
        title="Clínica, nutricional, acolhedora"
        description="APLV não é frescura, nem sentença. Com plano certo, criança estabiliza e, na maioria dos casos, supera. O papel do acompanhamento é guiar esse caminho com segurança."
        className="bg-muted/30"
      >
        <div className="grid gap-8 md:grid-cols-2">
          <ApproachItem
            title="Baseada em diretrizes"
            description="Consenso Brasileiro (ASBAI/SBP), PCDT APLV (CONITEC), literatura atualizada. Cada orientação tem origem verificável."
          />
          <ApproachItem
            title="Individualizada"
            description="O plano leva em conta idade, tipo de APLV (IgE, não-IgE, mista), alergias associadas, contexto familiar e rotina real."
          />
          <ApproachItem
            title="Educativa"
            description="O objetivo é autonomia da família para ler rótulo, planejar refeição, enfrentar creche, festa, viagem — sem pânico."
          />
          <ApproachItem
            title="Integrada"
            description="Trabalha junto ao pediatra e ao alergista. Nutrição não substitui médico; ela ocupa o papel nutricional com profundidade."
          />
        </div>
      </Section>

      {/* BLOG EM DESTAQUE */}
      <Section
        eyebrow="Do blog"
        title="Leitura curta, impacto real"
        description="Artigos escritos para mães e pais em jornada APLV. Sem enrolação, sem tecniquês vazio."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/blog">
              Ver todos os artigos <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* FAQ TEASER */}
      <Section
        eyebrow="Perguntas frequentes"
        title="25+ dúvidas, respondidas com base em evidência"
        description="Diagnóstico, alimentação, fórmulas, escada do leite, creche, viagem. Um ponto de partida para quando o pediatra não teve tempo de explicar tudo."
        className="bg-muted/30"
      >
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[
            "Diagnóstico",
            "Alimentação da criança",
            "Mãe que amamenta",
            "Fórmulas infantis",
            "Reintrodução e prognóstico",
            "Vida prática",
          ].map((cat) => (
            <div
              key={cat}
              className="rounded-xl bg-card border border-border p-5 flex items-center gap-3"
            >
              <GraduationCap className="h-5 w-5 text-secondary" />
              <span className="font-medium">{cat}</span>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button asChild>
            <Link href="/perguntas-frequentes">
              Ir para as perguntas frequentes <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-contrast p-10 md:p-16">
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white to-transparent" />
          <div className="relative max-w-2xl">
            <CalendarCheck2 className="h-10 w-10 mb-5 opacity-90" />
            <h2 className="font-serif text-4xl md:text-5xl text-balance mb-4">
              Pronta para montar um plano para o seu filho?
            </h2>
            <p className="text-lg opacity-90 max-w-xl mb-8">
              Consultas 100% online em pacotes estruturados, com suporte
              pós-consulta e lista de marcas seguras. Agende pelo WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="secondary" size="lg">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar pelo WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Link href="/consultas">Ver detalhes das consultas</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function PillarCard({
  icon,
  title,
  description,
  href,
  linkLabel,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="rounded-2xl bg-card border border-border p-7 flex flex-col hover:shadow-card hover:border-primary/40 transition-all">
      <div className="h-12 w-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="font-serif text-2xl text-foreground mb-2">{title}</h3>
      <p className="text-foreground/75 flex-1">{description}</p>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        {linkLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function ApproachItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border-l-2 border-secondary/50 pl-6">
      <h3 className="font-serif text-2xl text-primary mb-2">{title}</h3>
      <p className="text-foreground/75">{description}</p>
    </div>
  );
}
