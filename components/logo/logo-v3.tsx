import { cn } from "@/lib/utils";

/**
 * Logo — Versão 3: "Monograma contemporâneo"
 *
 * Conceito: ícone é o monograma "jm" em ligadura orgânica, com uma
 * pequena folha substituindo o ponto do "j". Remove a literalidade
 * do coração em favor de algo mais abstrato, memorável e escalável.
 * Excelente para favicon/ícones pequenos.
 */
interface LogoV3Props {
  className?: string;
  variant?: "full" | "icon";
  onDark?: boolean;
}

export function LogoV3({ className, variant = "full", onDark = false }: LogoV3Props) {
  const coral = onDark ? "#F2A5A5" : "#D46E6E";
  const sage = onDark ? "#B5D4C1" : "#89B89A";
  const ink = onDark ? "#FFFFFF" : "#23232B";
  const inkMuted = onDark ? "rgba(255,255,255,0.72)" : "#55555E";

  // Monograma "jm" como uma ligadura contínua:
  // - "j" desce e curva para esquerda
  // - conecta em "m" com dois arcos
  // - folha sage como ponto do "j"
  const monogram = (size: number, y: number = 0) => (
    <g transform={`translate(0, ${y})`}>
      {/* Folha (ponto do j) */}
      <path
        d={`M ${size * 0.22} ${size * 0.1}
            Q ${size * 0.34} ${size * 0.02}, ${size * 0.42} ${size * 0.12}
            Q ${size * 0.34} ${size * 0.2}, ${size * 0.22} ${size * 0.1} Z`}
        fill={sage}
      />
      {/* Monograma jm */}
      <path
        d={`M ${size * 0.32} ${size * 0.28}
            L ${size * 0.32} ${size * 0.72}
            Q ${size * 0.32} ${size * 0.92}, ${size * 0.18} ${size * 0.92}
            M ${size * 0.48} ${size * 0.92}
            L ${size * 0.48} ${size * 0.4}
            Q ${size * 0.48} ${size * 0.28}, ${size * 0.6} ${size * 0.28}
            Q ${size * 0.72} ${size * 0.28}, ${size * 0.72} ${size * 0.4}
            L ${size * 0.72} ${size * 0.92}
            M ${size * 0.72} ${size * 0.4}
            Q ${size * 0.72} ${size * 0.28}, ${size * 0.84} ${size * 0.28}
            Q ${size * 0.96} ${size * 0.28}, ${size * 0.96} ${size * 0.4}
            L ${size * 0.96} ${size * 0.92}`}
        stroke={coral}
        strokeWidth={size * 0.08}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </g>
  );

  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)}
        aria-label="Juliana Maia Nutri APLV"
      >
        <g transform="translate(0, 0) scale(0.75)">
          {monogram(64, 0)}
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 320 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-label="Juliana Maia Nutri APLV"
    >
      {monogram(76, 7)}
      {/* Wordmark */}
      <text
        x="96"
        y="48"
        fill={ink}
        fontFamily="Fraunces, Georgia, serif"
        fontSize="30"
        fontWeight="400"
        letterSpacing="-0.5"
      >
        Juliana Maia
      </text>
      <text
        x="96"
        y="70"
        fill={inkMuted}
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="11"
        fontWeight="500"
        letterSpacing="3"
      >
        NUTRI APLV
      </text>
    </svg>
  );
}
