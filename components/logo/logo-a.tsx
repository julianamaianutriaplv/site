import { cn } from "@/lib/utils";

import { AppleHeartPaths } from "./apple-heart";

/**
 * Logo Opção A — "Clássica horizontal"
 *
 * Símbolo (maçã-coração) à esquerda. "Juliana Maia" em bold coral,
 * duas linhas. "NUTRI APLV" sage embaixo, tracking amplo.
 * Mesmo DNA do original, com respiro e peso tipográfico refinados.
 */
interface LogoAProps {
  className?: string;
  coral?: string;
  sage?: string;
}

export function LogoA({
  className,
  coral = "#D46E6E",
  sage = "#89B89A",
}: LogoAProps) {
  return (
    <svg
      viewBox="0 0 340 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-label="Juliana Maia Nutri APLV"
    >
      {/* Símbolo — escala do 80x80 interno para 104x104 posicionado */}
      <g transform="translate(6, 12) scale(1.3)">
        <AppleHeartPaths coral={coral} sage={sage} stroke={3.4} />
      </g>

      {/* Wordmark */}
      <text
        x="130"
        y="58"
        fill={coral}
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="38"
        fontWeight="700"
        letterSpacing="-1.2"
      >
        Juliana
      </text>
      <text
        x="130"
        y="96"
        fill={coral}
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="38"
        fontWeight="700"
        letterSpacing="-1.2"
      >
        Maia
      </text>

      {/* Tagline */}
      <text
        x="131"
        y="118"
        fill={sage}
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="11"
        fontWeight="600"
        letterSpacing="4"
      >
        NUTRI · APLV
      </text>
    </svg>
  );
}
