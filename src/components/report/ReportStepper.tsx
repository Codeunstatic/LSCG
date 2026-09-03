"use client";

import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function ReportStepper({
  basePath,
  /**
   * Inner container classes. The dashboard renders this full-bleed inside a
   * padded <main>, so it overrides the default horizontal padding to keep the
   * steps aligned with the rest of the column.
   */
  contentClassName = "mx-auto max-w-3xl px-4 py-5 sm:px-6",
}: {
  basePath: string;
  contentClassName?: string;
}) {
  const pathname = usePathname();
  if (pathname.startsWith(`${basePath}/confirmation`)) return null;

  const steps = [
    { label: "Issue", path: basePath },
    { label: "Describe", path: `${basePath}/describe` },
    { label: "Location", path: `${basePath}/location` },
    { label: "Review", path: `${basePath}/review` },
  ];

  const activeIndex = steps.findIndex((s) => s.path === pathname);

  return (
    <div className="border-b border-border bg-white">
      <div className={contentClassName}>
        <ol className="flex items-center">
          {steps.map((step, i) => {
            const isComplete = i < activeIndex;
            const isActive = i === activeIndex;
            return (
              <li key={step.path} className="flex flex-1 items-center last:flex-none">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-caption font-semibold",
                      isComplete && "bg-lagos-green text-white",
                      isActive && "bg-lagos-blue text-white",
                      !isComplete && !isActive && "bg-background text-text-secondary border border-border",
                    )}
                  >
                    {isComplete ? <Check size={14} /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      "hidden text-small font-medium sm:inline",
                      isActive ? "text-deep-navy" : "text-text-secondary",
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <span
                    className={cn(
                      "mx-3 h-px flex-1",
                      isComplete ? "bg-lagos-green" : "bg-border",
                    )}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
