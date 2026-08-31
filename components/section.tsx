import { cn } from "@/lib/utils";

interface SectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
  as?: "section" | "article" | "div";
  /**
   * Nível do título. O primeiro Section de cada página precisa ser "h1" —
   * o padrão "h2" existe para as seções seguintes.
   */
  titleAs?: "h1" | "h2";
  centered?: boolean;
}

export function Section({
  eyebrow,
  title,
  description,
  className,
  containerClassName,
  children,
  as: Tag = "section",
  titleAs: Titulo = "h2",
  centered = false,
}: SectionProps) {
  return (
    <Tag className={cn("py-16 md:py-24", className)}>
      <div className={cn("container", containerClassName)}>
        {(eyebrow || title || description) && (
          <header
            className={cn(
              "mb-10 md:mb-14",
              centered ? "text-center max-w-2xl mx-auto" : "max-w-3xl",
            )}
          >
            {eyebrow ? (
              <p className={cn("olho mb-4", centered && "olho-centro")}>
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <Titulo className="text-[clamp(2.1rem,4.5vw,3rem)]">
                {title}
              </Titulo>
            ) : null}
            {description ? (
              <p className="mt-4 text-lg text-foreground/75 text-pretty">
                {description}
              </p>
            ) : null}
          </header>
        )}
        {children}
      </div>
    </Tag>
  );
}
