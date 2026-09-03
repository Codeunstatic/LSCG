import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimelineStep } from "@/lib/complaints";

type Step = TimelineStep & {
  /** Plain-language explanation shown under the stage label. */
  description?: string;
};

export function Timeline({ steps }: { steps: Step[] }) {
  const currentIndex = steps.reduce(
    (acc, step, i) => (step.date ? i : acc),
    -1,
  );

  return (
    <ol>
      {steps.map((step, i) => {
        // Reaching the final stage means the complaint is done, so show it as
        // completed rather than as an in-flight current stage.
        const isFinished = currentIndex === steps.length - 1;
        const isCurrent = i === currentIndex && !isFinished;
        const isComplete = i < currentIndex || (i === currentIndex && isFinished);
        const isPending = i > currentIndex;

        return (
          <li key={step.label} className="relative flex gap-4 pb-10 last:pb-0">
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "absolute left-[13px] top-7 h-full w-0.5",
                  isComplete ? "bg-lagos-blue/40" : "bg-border",
                )}
              />
            )}
            <span
              className={cn(
                "z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2",
                isComplete && "border-lagos-blue bg-lagos-blue text-white",
                isCurrent && "border-lagos-blue bg-lagos-blue text-white",
                isPending && "border-border bg-white text-transparent",
              )}
            >
              {isCurrent ? (
                <span className="h-2 w-2 rounded-full bg-current" />
              ) : (
                <Check size={13} />
              )}
            </span>

            <div className="pt-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <p
                  className={cn(
                    "text-body",
                    isCurrent && "font-semibold text-deep-navy",
                    isComplete && "font-medium text-deep-navy",
                    isPending && "text-text-secondary",
                  )}
                >
                  {step.label}
                </p>
                {isCurrent && (
                  <span className="rounded-full bg-lagos-blue/10 px-2 py-0.5 text-caption font-medium text-lagos-blue">
                    Current stage
                  </span>
                )}
              </div>

              <p className="mt-0.5 text-small text-text-secondary">
                {step.date ?? "Pending"}
              </p>

              {step.description && (
                <p className="mt-1.5 max-w-prose text-small text-text-secondary">
                  {step.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
