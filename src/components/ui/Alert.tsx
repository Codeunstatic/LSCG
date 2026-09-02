import type { ReactNode } from "react";
import { Info, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "info" | "success" | "warning";

const config: Record<Variant, { icon: typeof Info; className: string }> = {
  info: { icon: Info, className: "bg-lagos-blue/5 border-lagos-blue/20 text-lagos-blue" },
  success: { icon: CheckCircle2, className: "bg-lagos-green/5 border-lagos-green/20 text-lagos-green-dark" },
  warning: { icon: AlertTriangle, className: "bg-warm-yellow/10 border-warm-yellow/40 text-[#8a6d1a]" },
};

export function Alert({
  variant = "info",
  children,
  className,
}: {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  const { icon: Icon, className: variantClass } = config[variant];
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-md border p-4 text-small",
        variantClass,
        className,
      )}
    >
      <Icon size={18} className="mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}
