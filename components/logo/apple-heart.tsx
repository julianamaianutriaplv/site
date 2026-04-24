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
 * - Coração OUTLINE inclinado ~8° no sentido horário
 *   (topo leva para a DIREITA, base leva para a ESQUERDA)
 * - Duas linhas curvas sage no canto superior esquerdo
 *   (permanecem ancoradas, não giram junto)
 * - Semente-gota OUTLINE no lobo superior direito, inclinada
 *   na mesma direção do coração
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
      {/* 2 curvas sage — ancoradas no canto superior esquerdo,
          sem girar junto com o coração (igual ao original) */}
      <path
        d="M 10 24 C 22 14, 34 12, 42 18"
        stroke={sage}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 14 32 C 24 24, 34 22, 44 26"
        stroke={sage}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
      />

      {/* Coração + semente inclinados ~8° no sentido horário.
          Rotação aplicada em torno de (52, 58) que é o centro visual
          aproximado da maçã. */}
      <g transform="rotate(8 52 58)">
        {/* Coração-maçã outline */}
        <path
          d="M 52 32
             C 56 24, 68 22, 76 28
             C 85 36, 82 56, 72 66
             C 64 74, 56 82, 46 86
             C 38 78, 28 66, 26 54
             C 24 40, 32 28, 42 28
             C 48 28, 51 30, 52 32 Z"
          stroke={coral}
          strokeWidth={stroke}
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />

        {/* Semente em forma de gota, outline, no lobo superior direito */}
        <path
          d="M 60 36
             C 56 38, 54 44, 57 48
             C 61 50, 66 47, 66 41
             C 66 37, 63 34, 60 36 Z"
          stroke={coral}
          strokeWidth={stroke}
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        />
      </g>
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
