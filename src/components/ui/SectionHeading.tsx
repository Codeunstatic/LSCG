import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[23rem] sm:max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-lagos-green-dark">
          {eyebrow}
        </p>
      )}
      <h2 className="text-[1.75rem] font-bold sm:font-semibold sm:text-h2 text-balance text-deep-navy">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-body sm:text-body-lg text-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}
