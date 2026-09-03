import { cn } from "@/lib/utils";

export type ComplaintStatus =
  | "submitted"
  | "received"
  | "in_review"
  | "in_progress"
  | "resolved";

/** Canonical citizen-facing stage order, used by every progress display. */
export const COMPLAINT_STAGES: { id: ComplaintStatus; label: string }[] = [
  { id: "submitted", label: "Submitted" },
  { id: "received", label: "Received" },
  { id: "in_review", label: "In review" },
  { id: "in_progress", label: "In progress" },
  { id: "resolved", label: "Resolved" },
];

export const statusLabels: Record<ComplaintStatus, string> = {
  submitted: "Submitted",
  received: "Received",
  in_review: "In review",
  in_progress: "In progress",
  resolved: "Resolved",
};

export function StatusBadge({
  status,
  className,
}: {
  status: ComplaintStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-small font-medium",
        status === "resolved"
          ? "bg-lagos-green/10 text-lagos-green-dark"
          : "bg-lagos-blue/10 text-lagos-blue",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusLabels[status]}
    </span>
  );
}
