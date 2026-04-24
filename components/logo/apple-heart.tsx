import { cn } from "@/lib/utils";

interface AppleHeartPathsProps {
  coral?: string;
  sage?: string;
  stroke?: number;
}

/**
 * Paths da maçã-coração inclinada (sem <svg> wrapper).
 *
 * Fiel ao original da Juliana:
 * - Coração ASSIMÉTRICO, levemente inclinado à esquerda
 * - Duas linhas curvas sage (como folhas de movimento/vento) no canto superior esquerdo
 * - Semente em forma de gota no canto superior direito, inclinada
 * - Cantos arredondados, traço uniforme
 *
 * Refinamentos vs original:
 * - Traço com ponta rounded
 * - Curvas Bézier mais suaves
 * - Proporções ajustadas para legibilidade em tamanhos pequenos
 *
 * ViewBox interno: 100x100.
 */
export function AppleHeartPaths({
  coral = "#D46E6E",
  sage = "#89B89A",
  stroke = 4.5,
}: AppleHeartPathsProps) {
  return (
    <g>
      {/* Duas linhas curvas sage — movimento/folhas no canto superior esquerdo */}
      <path
        d="M 8 22 C 18 12, 30 10, 38 18"
        stroke={sage}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 14 28 C 22 20, 32 18, 40 24"
        stroke={sage}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
      />

      {/*
        Coração-maçã inclinado.
        Começa no topo (ligeiramente deslocado à direita do centro, onde a semente está),
        faz o lobo direito, desce para a ponta (deslocada à esquerda),
        sobe pelo lobo esquerdo e retorna.
      */}
      <path
        d="M 48 30
           C 52 22, 64 20, 72 26
           C 82 34, 80 52, 70 64
           C 62 74, 52 82, 42 88
           C 34 80, 24 68, 22 54
           C 20 40, 28 28, 38 28
           C 44 28, 47 30, 48 30 Z"
        stroke={coral}
        strokeWidth={stroke}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />

      {/*
        Semente em forma de gota, inclinada ~20° para a direita,
        posicionada no lobo superior direito do coração.
      */}
      <path
        d="M 54 34
           C 50 36, 49 42, 52 46
           C 56 48, 61 46, 62 40
           C 63 36, 59 32, 54 34 Z"
        stroke={coral}
        strokeWidth={stroke}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

/**
 * Versão standalone com wrapper <svg>.
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
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
    >
      <AppleHeartPaths coral={coral} sage={sage} stroke={stroke} />
    </svg>
  );
}
