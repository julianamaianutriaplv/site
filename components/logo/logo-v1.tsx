import { cn } from "@/lib/utils";

/**
 * Logo — Versão 1: "Refinado"
 *
 * Conceito: mantém o DNA da marca atual (coração + folha), mas redesenhado
 * com traços mais finos, proporções mais premium e wordmark sans-serif
 * contemporâneo. É a evolução mais direta e segura do logo atual.
 */
interface LogoV1Props {
  className?: string;
  variant?: "full" | "icon";
  onDark?: boolean;
}

export function LogoV1({ className, variant = "full", onDark = false }: LogoV1Props) {
  const coral = onDark ? "#F2A5A5" : "#D46E6E";
  const sage = onDark ? "#B5D4C1" : "#89B89A";
  const ink = onDark ? "#FFFFFF" : "#23232B";
  const inkMuted = onDark ? "rgba(255,255,255,0.72)" : "#55555E";

  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)}
        aria-label="Juliana Maia Nutri APLV"
      >
        {/* Folha */}
        <path
          d="M8 14 C 12 8, 18 8, 20 12"
          stroke={sage}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 11 C 14 9, 17 9, 18 11"
          stroke={sage}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Coração minimalista */}
        <path
          d="M24 40 C 14 32, 10 24, 14 19 C 17 15, 21 16, 24 20 C 27 16, 31 15, 34 19 C 38 24, 34 32, 24 40 Z"
          stroke={coral}
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 260 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-label="Juliana Maia Nutri APLV"
    >
      {/* Folha */}
      <path
        d="M12 24 C 18 14, 28 14, 32 20"
        stroke={sage}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M18 20 C 22 17, 27 17, 29 19"
        stroke={sage}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Coração */}
      <path
        d="M38 64 C 22 52, 16 40, 22 32 C 27 26, 34 28, 38 34 C 42 28, 49 26, 54 32 C 60 40, 54 52, 38 64 Z"
        stroke={coral}
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Wordmark */}
      <text
        x="80"
        y="38"
        fill={ink}
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="24"
        fontWeight="600"
        letterSpacing="-0.5"
      >
        Juliana Maia
      </text>
      <text
        x="80"
        y="58"
        fill={inkMuted}
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="10"
        fontWeight="500"
        letterSpacing="3"
      >
        NUTRI · APLV
      </text>
    </svg>
  );
}
