import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimelineStep } from "@/lib/complaints";

export function Timeline({ steps }: { steps: TimelineStep[] }) {
  const lastCompletedIndex = steps.reduce(
    (acc, step, i) => (step.date ? i : acc),
    -1,
  );

  return (
    <ol>
      {steps.map((step, i) => {
        const done = i <= lastCompletedIndex && step.date;
        const isCurrent = i === lastCompletedIndex;
        return (
          <li key={step.label} className="relative flex gap-4 pb-8 last:pb-0">
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "absolute left-[11px] top-6 h-full w-0.5",
                  done ? "bg-lagos-green" : "bg-border",
                )}
              />
            )}
            <span
              className={cn(
                "z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                done
                  ? "bg-lagos-green text-white"
                  : "border-2 border-border bg-white text-transparent",
              )}
            >
              <Check size={12} />
            </span>
            <div>
              <p
                className={cn(
                  "text-body font-semibold",
                  done ? "text-deep-navy" : "text-text-secondary",
                  isCurrent && "text-lagos-blue",
                )}
              >
                {step.label}
              </p>
              <p className="text-small text-text-secondary">
                {step.date ?? "Pending"}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
