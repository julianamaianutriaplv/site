import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Foto de perfil — usada na página /sobre.
 * Default: /juliana-retrato.jpg (retrato close-up).
 */
interface ProfilePhotoProps {
  src?: string | null;
  alt?: string;
  shape?: "portrait" | "square" | "round";
  className?: string;
}

export function ProfilePhoto({
  src = "/juliana-retrato.jpg",
  alt = "Juliana Maia — nutricionista clínica especialista em APLV",
  shape = "portrait",
  className,
}: ProfilePhotoProps) {
  const aspect = {
    portrait: "aspect-[4/5]",
    square: "aspect-square",
    round: "aspect-square",
  }[shape];

  const wrapperClass = cn(
    "relative overflow-hidden bg-primary-soft",
    shape === "round" ? "rounded-full" : "rounded-2xl",
    aspect,
    className,
  );

  if (!src) {
    return (
      <div className={wrapperClass}>
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(135deg, #FBEEEE 0%, #EEF2EB 100%)",
          }}
        />
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 480px"
        className="object-cover object-top"
      />
    </div>
  );
}
