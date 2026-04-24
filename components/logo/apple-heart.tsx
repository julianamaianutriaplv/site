import { cn } from "@/lib/utils";

interface AppleHeartPaths {
  coral?: string;
  sage?: string;
  stroke?: number;
}

/**
 * Paths da maçã-coração (sem <svg> wrapper, para usar dentro de outro SVG).
 * ViewBox interno: 80x80.
 */
export function AppleHeartPaths({
  coral = "#D46E6E",
  sage = "#89B89A",
  stroke = 3.2,
}: AppleHeartPaths) {
  return (
    <g>
      {/* Caule */}
      <path
        d="M 38 18 C 36 14, 32 12, 28 12"
        stroke={sage}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
      />
      {/* Folha */}
      <path
        d="M 22 9 C 18 7, 14 9, 14 14 C 14 18, 19 19, 23 17 C 26 15, 26 11, 22 9 Z"
        stroke={sage}
        strokeWidth={stroke}
        strokeLinejoin="round"
        fill="none"
      />
      {/* Nervura da folha */}
      <path
        d="M 15 14 C 18 13, 21 13, 23 12"
        stroke={sage}
        strokeWidth={stroke * 0.7}
        strokeLinecap="round"
        fill="none"
      />
      {/* Coração-maçã */}
      <path
        d="M 40 70
           C 18 54, 14 38, 22 28
           C 28 21, 35 23, 40 30
           C 45 23, 52 21, 58 28
           C 66 38, 62 54, 40 70 Z"
        stroke={coral}
        strokeWidth={stroke}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      {/* Semente/gota interna */}
      <path
        d="M 40 36
           C 36 36, 34 39, 34 43
           C 34 47, 37 49, 40 49
           C 43 49, 46 47, 46 43
           C 46 39, 44 36, 40 36 Z"
        fill={coral}
      />
    </g>
  );
}

/**
 * Versão standalone (com <svg> wrapper), para uso isolado.
 */
interface AppleHeartProps {
  className?: string;
  coral?: string;
  sage?: string;
  stroke?: number;
}

export function AppleHeart({
  className,
  coral,
  sage,
  stroke,
}: AppleHeartProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
    >
      <AppleHeartPaths coral={coral} sage={sage} stroke={stroke} />
    </svg>
  );
}
