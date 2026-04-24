import Image from "next/image";

import { LogoV1 } from "@/components/logo/logo-v1";
import { LogoV2 } from "@/components/logo/logo-v2";
import { LogoV3 } from "@/components/logo/logo-v3";
import { Section } from "@/components/section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Logo Preview — interno",
  description: "Avaliação de versões de logo para Juliana Maia Nutri APLV",
  path: "/logo-preview",
  noIndex: true,
});

const variants = [
  {
    id: "current",
    label: "Logo Atual",
    description:
      "A versão em uso hoje no site — arquivo JPG fornecido pela cliente.",
    accent: "Referência",
    render: () => (
      <div className="relative w-full max-w-[480px] h-36">
        <Image
          src="/logo.jpg"
          alt="Logo atual"
          fill
          className="object-contain"
        />
      </div>
    ),
    iconRender: () => (
      <div className="relative w-16 h-16">
        <Image src="/logo.jpg" alt="Logo atual ícone" fill className="object-contain" />
      </div>
    ),
  },
  {
    id: "v1",
    label: "Versão 1 — Refinado",
    description:
      "Evolução mais direta do logo atual. Mesmo DNA (coração + folha) com traços mais finos, proporções premium e wordmark sans-serif contemporâneo (Inter). Mais limpo, sem perder reconhecimento.",
    accent: "Evolução segura",
    render: () => <LogoV1 className="w-full max-w-[480px] h-auto" />,
    iconRender: () => <LogoV1 variant="icon" className="w-16 h-16" />,
  },
  {
    id: "v2",
    label: "Versão 2 — Editorial",
    description:
      "Coração redesenhado geometricamente (duas curvas sólidas em vez de outline). Wordmark em serif editorial (Fraunces) com subtítulo em tracking wide. Registro de clínica boutique premium.",
    accent: "Mais sofisticada",
    render: () => <LogoV2 className="w-full max-w-[560px] h-auto" />,
    iconRender: () => <LogoV2 variant="icon" className="w-16 h-16" />,
  },
  {
    id: "v3",
    label: "Versão 3 — Monograma",
    description:
      "Abandona o coração literal em favor de um monograma 'jm' em ligadura, com uma folhinha sage como ponto do 'j'. Mais abstrato, memorável, escalável. Excelente para favicon e uso em ícones pequenos.",
    accent: "Mais ousada",
    render: () => <LogoV3 className="w-full max-w-[560px] h-auto" />,
    iconRender: () => <LogoV3 variant="icon" className="w-16 h-16" />,
  },
];

export default function LogoPreviewPage() {
  return (
    <>
      <Section
        eyebrow="Interno · não indexado"
        title="3 propostas de evolução do logo"
        description="Cada versão testada em 3 contextos: tamanho grande sobre fundo claro, tamanho pequeno (uso em nav/favicon), e versão sobre fundo escuro. Abaixo, a logo atual como referência."
      />

      <section className="container pb-24">
        <div className="space-y-16">
          {variants.map((v) => (
            <article
              key={v.id}
              className="rounded-3xl border border-border bg-card overflow-hidden"
            >
              <header className="p-8 md:p-10 border-b border-border">
                <div className="flex flex-wrap items-baseline gap-4 mb-3">
                  <h2 className="font-serif text-3xl text-primary">
                    {v.label}
                  </h2>
                  <span className="text-xs uppercase tracking-wider font-medium text-secondary rounded-full border border-secondary/40 px-3 py-1">
                    {v.accent}
                  </span>
                </div>
                <p className="text-foreground/75 max-w-2xl text-pretty">
                  {v.description}
                </p>
              </header>

              <div className="grid md:grid-cols-3">
                {/* Grande em fundo claro */}
                <div className="p-8 md:p-10 flex flex-col items-center justify-center bg-background min-h-[240px]">
                  <div className="text-xs uppercase tracking-wider text-foreground/60 mb-5">
                    Tamanho grande
                  </div>
                  <div className="flex-1 flex items-center justify-center w-full">
                    {v.render()}
                  </div>
                </div>

                {/* Pequeno em fundo claro */}
                <div className="p-8 md:p-10 flex flex-col items-center justify-center bg-muted/30 min-h-[240px] border-y md:border-y-0 md:border-x border-border">
                  <div className="text-xs uppercase tracking-wider text-foreground/60 mb-5">
                    Tamanho pequeno (ícone/favicon)
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    {v.iconRender()}
                  </div>
                </div>

                {/* Em fundo escuro */}
                <div
                  className="p-8 md:p-10 flex flex-col items-center justify-center min-h-[240px]"
                  style={{ backgroundColor: "#1F1F25" }}
                >
                  <div className="text-xs uppercase tracking-wider text-white/50 mb-5">
                    Em fundo escuro
                  </div>
                  <div className="flex-1 flex items-center justify-center w-full">
                    {v.id === "current" ? (
                      <div className="relative w-full max-w-[480px] h-36 bg-white/95 rounded-lg flex items-center justify-center p-4">
                        <Image
                          src="/logo.jpg"
                          alt="Logo atual em fundo escuro"
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                    ) : v.id === "v1" ? (
                      <LogoV1 className="w-full max-w-[480px] h-auto" onDark />
                    ) : v.id === "v2" ? (
                      <LogoV2 className="w-full max-w-[560px] h-auto" onDark />
                    ) : (
                      <LogoV3 className="w-full max-w-[560px] h-auto" onDark />
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-primary-soft p-8 md:p-10 max-w-3xl">
          <h2 className="font-serif text-2xl text-primary mb-3">
            Como escolher
          </h2>
          <ul className="space-y-3 text-foreground/85 text-sm">
            <li>
              <strong>Versão 1 (Refinado)</strong> — se você gosta do atual mas
              quer uma versão um pouco mais premium, sem mudar o reconhecimento.
            </li>
            <li>
              <strong>Versão 2 (Editorial)</strong> — se quer subir o tom para
              um registro mais sofisticado / autoridade clínica.
            </li>
            <li>
              <strong>Versão 3 (Monograma)</strong> — se topa uma mudança mais
              ousada em troca de um símbolo mais memorável, atemporal e que
              funciona melhor em tamanhos pequenos (favicon, redes sociais).
            </li>
          </ul>
          <p className="mt-5 text-sm text-foreground/70">
            Depois que você escolher, converto a SVG em arquivos finais
            (favicon, PNG, versão branca) e substituo no site. Se quiser ajustes
            em qualquer uma das 3, também é simples — cor, peso do traço,
            tipografia, proporções.
          </p>
        </div>
      </section>
    </>
  );
}
