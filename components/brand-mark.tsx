import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Brand mark — logo vetorial (public/logo.svg).
 *
 * O arquivo é vetor de verdade: o coração e as folhas foram vetorizados a
 * partir do raster original e o wordmark "Dra. Juliana Maia" é contorno de
 * tipo, sem <text>. Por isso vale mais como SVG que como PNG: fica nítido em
 * qualquer densidade de tela e pesa menos que o JPEG que substituiu.
 *
 * Variantes:
 *  - full  → lockup inteiro (coração + "Dra. Juliana Maia" + "NUTRI APLV")
 *  - short → só o coração (public/logo-icone.svg), para espaços estreitos
 *  - icon  → igual ao short
 */
interface BrandMarkProps {
  variant?: "full" | "short" | "icon";
  className?: string;
}

// Proporção real de cada arquivo — o next/image precisa dela para reservar
// espaço e não deslocar o layout enquanto carrega.
const ARTES = {
  full: { src: "/logo.svg", width: 982, height: 309 },
  short: { src: "/logo-icone.svg", width: 255, height: 300 },
  icon: { src: "/logo-icone.svg", width: 255, height: 300 },
} as const;

export function BrandMark({ variant = "full", className }: BrandMarkProps) {
  const arte = ARTES[variant];

  const heights = {
    full: "h-10 md:h-11",
    short: "h-9",
    icon: "h-9",
  };

  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={arte.src}
        alt="Dra. Juliana Maia Nutri APLV"
        width={arte.width}
        height={arte.height}
        priority
        className={cn("block w-auto object-contain", heights[variant])}
      />
    </span>
  );
}
