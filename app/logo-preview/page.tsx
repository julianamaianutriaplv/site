import Image from "next/image";

import { LogoA } from "@/components/logo/logo-a";
import { LogoB } from "@/components/logo/logo-b";
import { LogoC } from "@/components/logo/logo-c";
import { AppleHeart } from "@/components/logo/apple-heart";
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
    label: "Logo Atual (referência)",
    accent: "Original",
    description:
      "A versão em uso hoje no site. Todas as opções abaixo mantêm o símbolo (maçã-coração com folha sage) e apenas variam tipografia e layout.",
    render: () => (
      <div className="relative w-full max-w-[440px] h-36">
        <Image src="/logo.jpg" alt="Logo atual" fill className="object-contain" />
      </div>
    ),
    iconRender: () => (
      <div className="relative w-16 h-16">
        <Image src="/logo.jpg" alt="Logo atual ícone" fill className="object-contain" />
      </div>
    ),
    darkRender: () => (
      <div className="relative w-full max-w-[440px] h-36 bg-white/95 rounded-lg p-2">
        <Image src="/logo.jpg" alt="Logo atual escuro" fill className="object-contain p-4" />
      </div>
    ),
  },
  {
    id: "a",
    label: "Opção A — Clássica horizontal",
    accent: "Mais próxima do original",
    description:
      "Mesmo layout do atual: símbolo à esquerda, 'Juliana' e 'Maia' em duas linhas, tagline embaixo. Wordmark em sans-serif (Inter) bold — ar mais limpo e moderno, mantendo o peso e a presença do original.",
    render: () => <LogoA className="w-full max-w-[440px] h-auto" />,
    iconRender: () => <AppleHeart className="w-16 h-16" />,
    darkRender: () => (
      <LogoA className="w-full max-w-[440px] h-auto" coral="#F2A5A5" sage="#B5D4C1" />
    ),
  },
  {
    id: "b",
    label: "Opção B — Serif elegante",
    accent: "Mais sofisticada",
    description:
      "Mesma maçã-coração, mesmo layout em 2 linhas. Wordmark troca para serif contemporânea (Fraunces) com peso médio, e a tagline vira 'nutri · aplv' em itálico fino. Registro clínica boutique sem perder leveza.",
    render: () => <LogoB className="w-full max-w-[440px] h-auto" />,
    iconRender: () => <AppleHeart className="w-16 h-16" />,
    darkRender: () => (
      <LogoB className="w-full max-w-[440px] h-auto" coral="#F2A5A5" sage="#B5D4C1" />
    ),
  },
  {
    id: "c",
    label: "Opção C — Empilhado centrado",
    accent: "Mais versátil",
    description:
      "Símbolo centralizado no topo, 'Juliana Maia' em uma linha embaixo, tagline com filetes decorativos laterais. Ótima para usos onde largura é limitada: favicon, avatar de rede social, capas quadradas, stories.",
    render: () => <LogoC className="w-full max-w-[360px] h-auto" />,
    iconRender: () => <AppleHeart className="w-16 h-16" />,
    darkRender: () => (
      <LogoC className="w-full max-w-[360px] h-auto" coral="#F2A5A5" sage="#B5D4C1" />
    ),
  },
];

export default function LogoPreviewPage() {
  return (
    <>
      <Section
        eyebrow="Interno · não indexado"
        title="3 variações mantendo o padrão da logo original"
        description="Todas as opções mantêm o símbolo da maçã-coração inclinada com as duas curvinhas sage no topo. As diferenças estão em tipografia e layout."
      />

      {/* Comparação lado a lado do SÍMBOLO (original vs refinado) */}
      <section className="container pb-12">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-10 max-w-4xl">
          <h2 className="font-serif text-2xl text-primary mb-2">
            Primeiro: o símbolo refinado vs o original
          </h2>
          <p className="text-foreground/75 mb-8 text-sm max-w-2xl">
            Só o ícone, isolado, em tamanho grande. Confira se o desenho
            refinado está fiel ao original antes de olhar as 3 composições
            completas abaixo.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center gap-3 p-6 bg-background rounded-xl">
              <div className="text-xs uppercase tracking-wider text-foreground/60">
                Original
              </div>
              <div className="relative w-48 h-48">
                <Image
                  src="/logo.jpg"
                  alt="Logo original"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 bg-background rounded-xl">
              <div className="text-xs uppercase tracking-wider text-foreground/60">
                Refinado (SVG)
              </div>
              <AppleHeart className="w-40 h-40" />
            </div>
          </div>
        </div>
      </section>

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
                <div className="p-8 md:p-10 flex flex-col items-center justify-center bg-background min-h-[240px]">
                  <div className="text-xs uppercase tracking-wider text-foreground/60 mb-5">
                    Tamanho grande
                  </div>
                  <div className="flex-1 flex items-center justify-center w-full">
                    {v.render()}
                  </div>
                </div>

                <div className="p-8 md:p-10 flex flex-col items-center justify-center bg-muted/30 min-h-[240px] border-y md:border-y-0 md:border-x border-border">
                  <div className="text-xs uppercase tracking-wider text-foreground/60 mb-5">
                    Tamanho pequeno (favicon)
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    {v.iconRender()}
                  </div>
                </div>

                <div
                  className="p-8 md:p-10 flex flex-col items-center justify-center min-h-[240px]"
                  style={{ backgroundColor: "#1F1F25" }}
                >
                  <div className="text-xs uppercase tracking-wider text-white/50 mb-5">
                    Em fundo escuro
                  </div>
                  <div className="flex-1 flex items-center justify-center w-full">
                    {v.darkRender()}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-primary-soft p-8 md:p-10 max-w-3xl">
          <h2 className="font-serif text-2xl text-primary mb-3">
            Critério rápido para escolher
          </h2>
          <ul className="space-y-3 text-foreground/85 text-sm">
            <li>
              <strong>Opção A (sans-serif)</strong> — quase idêntica ao original,
              só mais clean. Escolha segura.
            </li>
            <li>
              <strong>Opção B (serif)</strong> — se quer subir um degrau de
              sofisticação mantendo o layout familiar.
            </li>
            <li>
              <strong>Opção C (centrado)</strong> — muito melhor para avatar de
              Instagram, favicon e usos quadrados. Pode coexistir com A ou B como
              "variante compacta" da mesma marca.
            </li>
          </ul>
          <p className="mt-5 text-sm text-foreground/70">
            Todas são SVG puras, escalam sem perda e usam os tokens da paleta.
            Depois que você escolher, gero favicon, PNG de alta resolução e
            versão branca para uso em capas/stories.
          </p>
        </div>
      </section>
    </>
  );
}
