import { cn } from "@/lib/utils";

/**
 * Logo — Versão 2: "Editorial"
 *
 * Conceito: coração redesenhado como forma geométrica (duas elipses
 * sobrepostas formando o coração), folha como pincelada simples.
 * Wordmark em serif (Fraunces) com "Nutri APLV" em caps tracking wide.
 * Registro de clínica boutique premium.
 */
interface LogoV2Props {
  className?: string;
  variant?: "full" | "icon";
  onDark?: boolean;
}

export function LogoV2({ className, variant = "full", onDark = false }: LogoV2Props) {
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
        <path
          d="M10 14 Q 20 8, 22 16"
          stroke={sage}
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="17" cy="26" r="8.5" fill={coral} opacity="0.92" />
        <circle cx="31" cy="26" r="8.5" fill={coral} opacity="0.92" />
        <path
          d="M10 30 L 24 42 L 38 30"
          stroke={coral}
          strokeWidth="2"
          strokeLinejoin="round"
          fill={coral}
          opacity="0.92"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 300 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-label="Juliana Maia Nutri APLV"
    >
      {/* Folha */}
      <path
        d="M18 22 Q 34 12, 38 26"
        stroke={sage}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Coração geométrico */}
      <circle cx="26" cy="42" r="12" fill={coral} />
      <circle cx="46" cy="42" r="12" fill={coral} />
      <path
        d="M14 48 L 36 70 L 58 48 Z"
        fill={coral}
      />
      {/* Wordmark serif */}
      <text
        x="84"
        y="46"
        fill={ink}
        fontFamily="Fraunces, Georgia, serif"
        fontSize="32"
        fontWeight="500"
        letterSpacing="-0.8"
      >
        Juliana Maia
      </text>
      {/* Linha divisória fina */}
      <line
        x1="84"
        y1="56"
        x2="220"
        y2="56"
        stroke={sage}
        strokeWidth="0.8"
      />
      <text
        x="84"
        y="72"
        fill={inkMuted}
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="10"
        fontWeight="500"
        letterSpacing="4"
      >
        N U T R I C I O N I S T A · A P L V
      </text>
    </svg>
  );
}
