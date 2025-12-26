import { FadeIn } from "@/components/ui/motion";

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const alignmentClasses = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`max-w-2xl mb-12 md:mb-16 ${alignmentClasses}`}>
      {label && (
        <FadeIn delay={0}>
          <span className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
            {label}
          </span>
        </FadeIn>
      )}
      <FadeIn delay={0.1}>
        <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
          {title}
        </h2>
      </FadeIn>
      {description && (
        <FadeIn delay={0.2}>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
