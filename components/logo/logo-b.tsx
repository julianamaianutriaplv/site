import { cn } from "@/lib/utils";

import { AppleHeartPaths } from "./apple-heart";

/**
 * Logo Opção B — "Serif elegante"
 *
 * Mesmo símbolo da maçã-coração. Wordmark em serif (Fraunces) com
 * peso médio — dá um ar mais sofisticado sem perder a personalidade.
 * "Juliana" e "Maia" em duas linhas (mesmo layout do original),
 * "nutri · aplv" em itálico fino embaixo.
 */
interface LogoBProps {
  className?: string;
  coral?: string;
  sage?: string;
}

export function LogoB({
  className,
  coral = "#D46E6E",
  sage = "#89B89A",
}: LogoBProps) {
  return (
    <svg
      viewBox="0 0 340 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-label="Juliana Maia Nutri APLV"
    >
      <g transform="translate(4, 10) scale(1.1)">
        <AppleHeartPaths coral={coral} sage={sage} stroke={4.5} />
      </g>

      <text
        x="130"
        y="58"
        fill={coral}
        fontFamily="Fraunces, Georgia, serif"
        fontSize="40"
        fontWeight="500"
        letterSpacing="-0.8"
      >
        Juliana
      </text>
      <text
        x="130"
        y="98"
        fill={coral}
        fontFamily="Fraunces, Georgia, serif"
        fontSize="40"
        fontWeight="500"
        letterSpacing="-0.8"
      >
        Maia
      </text>

      <text
        x="131"
        y="120"
        fill={sage}
        fontFamily="Fraunces, Georgia, serif"
        fontSize="13"
        fontWeight="400"
        fontStyle="italic"
        letterSpacing="1"
      >
        nutri · aplv
      </text>
    </svg>
  );
}
