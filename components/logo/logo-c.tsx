import { cn } from "@/lib/utils";

import { AppleHeartPaths } from "./apple-heart";

/**
 * Logo Opção C — "Empilhado centrado"
 *
 * Mesmo símbolo da maçã-coração, mas centralizado no topo.
 * "Juliana Maia" numa linha só, embaixo, serif grande.
 * "NUTRI APLV" em caps espaçado embaixo, com 2 linhas decorativas
 * finas sage nas laterais. Ideal para favicon/Instagram square.
 */
interface LogoCProps {
  className?: string;
  coral?: string;
  sage?: string;
}

export function LogoC({
  className,
  coral = "#D46E6E",
  sage = "#89B89A",
}: LogoCProps) {
  return (
    <svg
      viewBox="0 0 360 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-label="Juliana Maia Nutri APLV"
    >
      {/* Símbolo centralizado no topo */}
      <g transform="translate(140, 8) scale(1.0)">
        <AppleHeartPaths coral={coral} sage={sage} stroke={3.4} />
      </g>

      {/* "Juliana Maia" em serif, uma linha, grande */}
      <text
        x="180"
        y="128"
        textAnchor="middle"
        fill={coral}
        fontFamily="Fraunces, Georgia, serif"
        fontSize="36"
        fontWeight="500"
        letterSpacing="-0.6"
      >
        Juliana Maia
      </text>

      {/* Linhas decorativas laterais */}
      <line
        x1="60"
        y1="156"
        x2="132"
        y2="156"
        stroke={sage}
        strokeWidth="1"
      />
      <line
        x1="228"
        y1="156"
        x2="300"
        y2="156"
        stroke={sage}
        strokeWidth="1"
      />

      {/* Tagline centralizada */}
      <text
        x="180"
        y="160"
        textAnchor="middle"
        fill={sage}
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="11"
        fontWeight="600"
        letterSpacing="5"
      >
        NUTRI APLV
      </text>
    </svg>
  );
}
