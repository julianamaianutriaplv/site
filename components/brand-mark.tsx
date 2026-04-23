import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Brand mark — usa o logo oficial fornecido pela Juliana (public/logo.jpg).
 * Variantes:
 *  - full  → logo inteiro (coração + wordmark "Juliana Maia" + "NUTRI APLV")
 *  - short → só o coração (ícone compacto para mobile ou favicons)
 *  - icon  → igual ao short
 */
interface BrandMarkProps {
  variant?: "full" | "short" | "icon";
  className?: string;
}

export function BrandMark({ variant = "full", className }: BrandMarkProps) {
  // O logo fornecido inclui wordmark — então "full" mostra o logo completo,
  // e "short"/"icon" crop visualmente via container + object-fit.
  const heights = {
    full: "h-10 md:h-11",
    short: "h-9",
    icon: "h-9",
  };

  const widths = {
    full: "w-auto",
    short: "w-10",
    icon: "w-10",
  };

  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/logo.jpg"
        alt="Juliana Maia Nutri APLV"
        width={540}
        height={280}
        priority
        className={cn(
          "block object-contain",
          heights[variant],
          widths[variant],
        )}
      />
    </span>
  );
}
