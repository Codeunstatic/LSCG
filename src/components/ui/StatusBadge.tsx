import { cn } from "@/lib/utils";

export type ComplaintStatus = "received" | "assigned" | "in_review" | "resolved";

const statusConfig: Record<ComplaintStatus, { label: string; className: string }> = {
  received: {
    label: "Received",
    className: "bg-lagos-blue/10 text-lagos-blue",
  },
  assigned: {
    label: "Assigned",
    className: "bg-lagos-blue/10 text-lagos-blue",
  },
  in_review: {
    label: "In review",
    className: "bg-warm-yellow/20 text-[#8a6d1a]",
  },
  resolved: {
    label: "Resolved",
    className: "bg-lagos-green/10 text-lagos-green-dark",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: ComplaintStatus;
  className?: string;
}) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-small font-semibold",
        config.className,
        className,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {config.label}
    </span>
  );
}
