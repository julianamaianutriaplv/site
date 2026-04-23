import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Composição visual da Home Hero — usa a foto oficial em /public/juliana-hero.jpg
 * por default, com shapes decorativos atrás e badge de credibilidade na frente.
 */
interface HeroVisualProps {
  src?: string | null;
  className?: string;
}

export function HeroVisual({
  src = "/juliana-hero.jpg",
  className,
}: HeroVisualProps) {
  return (
    <div className={cn("relative aspect-[4/5] max-w-md w-full", className)}>
      {/* Shapes decorativos de fundo — alinham com paleta do logo */}
      <div
        className="absolute -top-6 -left-6 h-40 w-40 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(137,184,154,0.45) 0%, rgba(137,184,154,0) 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-8 -right-4 h-48 w-48 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,110,110,0.35) 0%, rgba(212,110,110,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative h-full w-full overflow-hidden rounded-3xl bg-primary-soft border border-border shadow-card">
        {src ? (
          <Image
            src={src}
            alt="Juliana Maia — nutricionista clínica especialista em APLV"
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover object-top"
            priority
          />
        ) : (
          <Placeholder />
        )}
      </div>

      {/* Badge de credibilidade — fica bonito com qualquer foto */}
      <div className="absolute -bottom-4 -right-4 md:-right-6 rounded-2xl bg-card border border-border shadow-soft px-5 py-4">
        <div className="text-xs uppercase tracking-wider text-secondary font-medium mb-1">
          20 anos
        </div>
        <div className="font-serif text-sm text-primary leading-tight">
          de nutrição clínica dedicada
          <br />
          a famílias APLV
        </div>
      </div>
    </div>
  );
}

// Fallback caso o src seja removido por algum motivo (raramente usado agora).
function Placeholder() {
  return (
    <div
      className="h-full w-full"
      style={{
        background:
          "linear-gradient(135deg, #FBEEEE 0%, #EEF2EB 100%)",
      }}
    />
  );
}
