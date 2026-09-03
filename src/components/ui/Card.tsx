import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge, type ComplaintStatus } from "./StatusBadge";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border/50 bg-surface",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CategoryCard({
  icon: Icon,
  label,
  selected,
  onSelect,
}: {
  icon: LucideIcon;
  label: string;
  selected?: boolean;
  onSelect?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full flex-col items-start gap-3 rounded-lg border bg-surface p-5 text-left transition-all",
        selected
          ? "border-lagos-blue ring-2 ring-lagos-blue/30 shadow-card"
          : "border-border/50 hover:border-lagos-blue/50 hover:shadow-card",
      )}
    >
      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-sm",
          selected ? "bg-lagos-blue text-white" : "bg-lagos-blue/10 text-lagos-blue",
        )}
      >
        <Icon size={22} />
      </span>
      <span className="text-body font-semibold text-deep-navy">{label}</span>
    </button>
  );
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  cta,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  /** CTA label shown at the bottom of the card. Omit to show no CTA at all. */
  cta?: string;
}) {
  const isInteractive = cta !== undefined || href !== "#";

  const content = (
    <>
      <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-border/50 bg-background">
        <Icon size={20} className="text-deep-navy" strokeWidth={1.5} />
      </span>
      <span
        className={cn(
          "mt-6 text-center text-body font-semibold text-deep-navy",
          isInteractive && "transition-colors group-hover:text-lagos-blue",
        )}
      >
        {title}
      </span>
      <span className="text-[0.9375rem] text-text-secondary text-center">{description}</span>
      {cta && (
        <span className="mt-1 inline-flex items-center gap-1 text-small font-semibold text-lagos-blue">
          {cta}
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      )}
    </>
  );

  if (!isInteractive) {
    return (
      <div className="flex h-full flex-col items-center gap-3 rounded-lg border border-border/50 bg-surface px-6 py-7">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="group flex h-full flex-col items-center gap-3 rounded-lg border border-border/50 bg-surface px-6 py-7"
    >
      {content}
    </Link>
  );
}

export function ComplaintCard({
  title,
  category,
  ticketId,
  status,
  lastUpdated,
  href,
}: {
  title: string;
  category: string;
  ticketId: string;
  status: ComplaintStatus;
  lastUpdated: string;
  href: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-body font-semibold text-deep-navy">{title}</p>
          <p className="mt-1 text-small text-text-secondary">
            {category} &middot; #{ticketId}
          </p>
        </div>
        <StatusBadge status={status} />
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <p className="text-small text-text-secondary">
          Last updated {lastUpdated}
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-small font-semibold text-lagos-blue hover:text-lagos-blue-dark"
        >
          View complaint
          <ArrowRight size={14} />
        </Link>
      </div>
    </Card>
  );
}
