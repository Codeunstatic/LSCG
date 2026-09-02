"use client";

import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Issue", path: "/report" },
  { label: "Describe", path: "/report/describe" },
  { label: "Location", path: "/report/location" },
  { label: "Review", path: "/report/review" },
];

export function ReportStepper() {
  const pathname = usePathname();
  if (pathname.startsWith("/report/confirmation")) return null;

  const activeIndex = steps.findIndex((s) => s.path === pathname);

  return (
    <div className="border-b border-border bg-white">
      <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6">
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
