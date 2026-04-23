import { cn } from "@/lib/utils";

interface SectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  as?: "section" | "article" | "div";
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
              <div className="text-sm font-medium uppercase tracking-wider text-secondary mb-3">
                {eyebrow}
              </div>
            ) : null}
            {title ? (
              <h2 className="font-serif text-4xl md:text-5xl text-balance text-primary">
                {title}
              </h2>
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
