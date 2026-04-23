import { cn } from "@/lib/utils";

/**
 * Brand mark em SVG, gerado programaticamente.
 * Fica bonito enquanto o logo oficial da Juliana não chega.
 * Quando o logo real for entregue, substituir esse componente
 * por <Image src="/logo.svg" ... /> ou equivalente.
 */
interface BrandMarkProps {
  variant?: "full" | "short" | "icon";
  className?: string;
  tone?: "primary" | "white";
}

export function BrandMark({
  variant = "full",
  className,
  tone = "primary",
}: BrandMarkProps) {
  const textColor = tone === "white" ? "text-white" : "text-primary";
  const subColor = tone === "white" ? "text-white/70" : "text-foreground/60";

  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <Monogram tone={tone} />
      {variant === "icon" ? null : (
        <div className="flex flex-col leading-none">
          <span className={cn("font-serif text-lg", textColor)}>
            Juliana Maia
          </span>
          {variant === "full" ? (
            <span className={cn("text-xs uppercase tracking-wider", subColor)}>
              Nutri APLV
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}

function Monogram({ tone }: { tone: "primary" | "white" }) {
  // Duas cores inspiradas na paleta C
  const fill = tone === "white" ? "#FFFFFF" : "#4A3B7C";
  const accent = tone === "white" ? "#C8D4C1" : "#C06C86";

  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="10" fill={fill} />
      <path
        d="M22 10V20.5C22 22.9853 19.9853 25 17.5 25C15.0147 25 13 22.9853 13 20.5"
        stroke={accent}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="17.5" cy="13" r="1.6" fill={accent} />
    </svg>
  );
}
