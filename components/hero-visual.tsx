/**
 * Composição visual para a Home Hero.
 * Enquanto as fotos profissionais não chegam, renderiza
 * um "card" decorativo que conversa com a paleta e com a marca.
 *
 * Quando chegar a foto da Juliana:
 *   <HeroVisual src="/juliana-hero.jpg" />
 */

import Image from "next/image";

import { cn } from "@/lib/utils";

interface HeroVisualProps {
  src?: string | null;
  className?: string;
}

export function HeroVisual({ src, className }: HeroVisualProps) {
  return (
    <div className={cn("relative aspect-[4/5] max-w-md w-full", className)}>
      {/* Shape decorativo de fundo */}
      <div
        className="absolute -top-6 -left-6 h-40 w-40 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(200,212,193,0.55) 0%, rgba(200,212,193,0) 70%)",
        }}
      />
      <div
        className="absolute -bottom-8 -right-4 h-48 w-48 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(192,108,134,0.35) 0%, rgba(192,108,134,0) 70%)",
        }}
      />

      <div className="relative h-full w-full overflow-hidden rounded-3xl bg-primary-soft border border-border shadow-card">
        {src ? (
          <Image
            src={src}
            alt="Juliana Maia — nutricionista especialista em APLV"
            width={720}
            height={900}
            className="h-full w-full object-cover"
            priority
          />
        ) : (
          <Placeholder />
        )}
      </div>

      {/* Badge sobreposta (continua útil mesmo com foto real) */}
      <div className="absolute -bottom-4 -right-4 md:-right-6 rounded-2xl bg-card border border-border shadow-soft px-5 py-4">
        <div className="text-xs uppercase tracking-wider text-secondary font-medium mb-1">
          +10 anos
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

function Placeholder() {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #EFEBF5 0%, #F6E8EC 55%, #EEF2EB 100%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hv-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4A3B7C" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#4A3B7C" stopOpacity="0.48" />
          </linearGradient>
        </defs>

        <circle cx="200" cy="195" r="70" fill="url(#hv-grad)" />
        <path
          d="M60 500 C 60 370, 130 305, 200 305 C 270 305, 340 370, 340 500 Z"
          fill="url(#hv-grad)"
        />

        {/* "estetoscópio" sutil sugerindo clínica */}
        <path
          d="M250 330 C 270 360, 280 395, 280 420"
          stroke="#C06C86"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
        />
        <circle cx="280" cy="425" r="10" fill="#C06C86" opacity="0.55" />
      </svg>

      <div className="absolute top-4 left-4 right-4 rounded-md bg-card/85 backdrop-blur-sm border border-border p-3 text-xs text-foreground/75">
        <span className="font-medium">Área reservada para foto profissional.</span>{" "}
        <span className="text-foreground/60">
          Será substituída pela foto hero da Juliana.
        </span>
      </div>
    </div>
  );
}
