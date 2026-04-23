import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Foto de perfil da Juliana.
 *
 * Se NEXT_PUBLIC_PROFILE_IMAGE estiver definido (ex: "/juliana-maia.jpg"),
 * renderiza a foto real otimizada via next/image.
 *
 * Caso contrário, renderiza um "plate" decorativo (monograma + gradiente),
 * bonito o suficiente para deixar a página apresentável enquanto
 * a foto profissional não chega.
 */
interface ProfilePhotoProps {
  src?: string | null;
  alt?: string;
  shape?: "portrait" | "square" | "round";
  className?: string;
}

export function ProfilePhoto({
  src,
  alt = "Juliana Maia — nutricionista especialista em APLV",
  shape = "portrait",
  className,
}: ProfilePhotoProps) {
  const dims = {
    portrait: { w: 600, h: 750, aspect: "aspect-[4/5]" },
    square: { w: 600, h: 600, aspect: "aspect-square" },
    round: { w: 400, h: 400, aspect: "aspect-square" },
  }[shape];

  const wrapperClass = cn(
    "relative overflow-hidden bg-primary-soft",
    shape === "round" ? "rounded-full" : "rounded-2xl",
    dims.aspect,
    className,
  );

  if (src) {
    return (
      <div className={wrapperClass}>
        <Image
          src={src}
          alt={alt}
          width={dims.w}
          height={dims.h}
          className="h-full w-full object-cover"
          priority
        />
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <Placeholder />
    </div>
  );
}

function Placeholder() {
  // Composição SVG decorativa que insinua um retrato (silhueta + elementos)
  // Não representa uma pessoa específica — fica claro que é ilustrativo.
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1000px 600px at 20% 10%, rgba(192,108,134,0.25), transparent 55%), radial-gradient(800px 500px at 80% 90%, rgba(200,212,193,0.35), transparent 55%), linear-gradient(180deg, #EFEBF5 0%, #F6E8EC 100%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 200 250"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pp-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4A3B7C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#4A3B7C" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* Cabeça */}
        <circle cx="100" cy="100" r="34" fill="url(#pp-grad)" />
        {/* Ombros */}
        <path
          d="M30 250 C 30 180, 70 150, 100 150 C 130 150, 170 180, 170 250 Z"
          fill="url(#pp-grad)"
        />
      </svg>

      <div className="absolute bottom-4 left-4 right-4 rounded-md bg-card/80 backdrop-blur-sm border border-border p-3 text-xs text-foreground/75">
        <span className="font-medium">Foto profissional em breve.</span>{" "}
        <span className="text-foreground/60">
          Este espaço será substituído pela foto oficial da Juliana.
        </span>
      </div>
    </div>
  );
}
