"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, FileText, Clock, CheckCircle2 } from "lucide-react";
import { useMockAuth } from "@/lib/useMockAuth";
import { complaints as demoComplaints } from "@/lib/complaints";
import { useMyComplaints } from "@/lib/myComplaints";
import {
  COMPLAINT_STAGES,
  statusLabels,
  type ComplaintStatus,
} from "@/components/ui/StatusBadge";
import { Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 8;

/**
 * Compact five-stage progress for a table row. Replaces a separate status
 * badge: completed stages get a subtle fill, the current stage is emphasized,
 * and upcoming stages stay neutral.
 */
function ProgressIndicator({ status }: { status: ComplaintStatus }) {
  const currentIndex = COMPLAINT_STAGES.findIndex((s) => s.id === status);
  const isResolved = status === "resolved";

  return (
    <div className="min-w-[140px]">
      <div className="flex items-center gap-1">
        {COMPLAINT_STAGES.map((stage, i) => (
          <span
            key={stage.id}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              // Only the current stage gets full strength, so it stays
              // unambiguous which stage the label underneath refers to.
              // Resolved complaints switch to green to mark the closed state.
              i < currentIndex &&
                (isResolved ? "bg-lagos-green/55" : "bg-lagos-blue/55"),
              i === currentIndex &&
                (isResolved ? "bg-lagos-green" : "bg-lagos-blue"),
              i > currentIndex && "bg-border",
            )}
          />
        ))}
      </div>
      <p
        className={cn(
          "mt-2 text-caption font-medium",
          isResolved ? "text-lagos-green-dark" : "text-deep-navy",
        )}
      >
        {statusLabels[status]}
      </p>
    </div>
  );
}

export default function DashboardPage() {
  const { name, email } = useMockAuth();
  const firstName = name.trim().split(/\s+/)[0] ?? "";
  const myComplaints = useMyComplaints(email);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const allComplaints = [...myComplaints, ...demoComplaints];
  const categories = Array.from(new Set(allComplaints.map((c) => c.category))).sort();

  const metrics = [
    {
      label: "Total complaints",
      count: allComplaints.length,
      icon: FileText,
    },
    {
      label: "Active complaints",
      count: allComplaints.filter((c) => c.status !== "resolved").length,
      icon: Clock,
    },
    {
      label: "Resolved",
      count: allComplaints.filter((c) => c.status === "resolved").length,
      icon: CheckCircle2,
    },
  ];

  const visible = allComplaints
    .filter((c) => c.title.toLowerCase().includes(search.trim().toLowerCase()))
    .filter((c) => status === "all" || c.status === status)
    .filter((c) => category === "all" || c.category === category);

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageItems = visible.slice(pageStart, pageStart + PAGE_SIZE);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[2rem] font-semibold leading-tight text-deep-navy">
            My complaints
          </h1>
          <p className="mt-2 text-body text-text-secondary">
            {firstName ? `Welcome back, ${firstName}. ` : ""}Track the progress of
            issues you&apos;ve reported.
          </p>
        </div>
        <Button href="/track/dashboard/report" size="md">
          Report an issue
          <ArrowRight size={16} />
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border border-border bg-white p-5"
          >
            <div className="flex items-center gap-2 text-text-secondary">
              <metric.icon size={16} />
              <p className="text-small font-medium">{metric.label}</p>
            </div>
            <p className="mt-3 text-h2 text-deep-navy">{metric.count}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-border bg-white">
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <div className="relative min-w-[200px] flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search complaints"
              className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-small text-text-primary placeholder:text-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-lagos-blue/40"
            />
          </div>

          <div className="w-full sm:w-44">
            <Select
              aria-label="Filter by status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="bg-background py-2 text-small"
            >
              <option value="all">All statuses</option>
              {COMPLAINT_STAGES.map((stage) => (
                <option key={stage.id} value={stage.id}>
                  {stage.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="w-full sm:w-52">
            <Select
              aria-label="Filter by category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="bg-background py-2 text-small"
            >
              <option value="all">All categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {visible.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-border bg-background">
                <tr>
                  <th className="whitespace-nowrap px-5 py-3 text-caption font-semibold uppercase tracking-wide text-text-secondary">
                    Complaint
                  </th>
                  <th className="whitespace-nowrap px-5 py-3 text-caption font-semibold uppercase tracking-wide text-text-secondary">
                    Ticket ID
                  </th>
                  <th className="whitespace-nowrap px-5 py-3 text-caption font-semibold uppercase tracking-wide text-text-secondary">
                    Progress
                  </th>
                  <th className="whitespace-nowrap px-5 py-3 text-caption font-semibold uppercase tracking-wide text-text-secondary">
                    Last updated
                  </th>
                  <th className="whitespace-nowrap px-5 py-3 text-caption font-semibold uppercase tracking-wide text-text-secondary">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-4">
                      <p className="text-body font-semibold text-deep-navy">{c.title}</p>
                      <p className="mt-0.5 text-small text-text-secondary">{c.category}</p>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-small text-text-secondary">
                      #{c.id}
                    </td>
                    <td className="px-5 py-4">
                      <ProgressIndicator status={c.status} />
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-small text-text-secondary">
                      {c.lastUpdated}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <Link
                        href={`/track/dashboard/complaints/${c.id}`}
                        className="inline-flex items-center gap-1 text-small font-semibold text-lagos-blue hover:text-lagos-blue-dark"
                      >
                        View details
                        <ArrowRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-5 py-10 text-center text-body text-text-secondary">
            No complaints match these filters.
          </p>
        )}

        {visible.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3">
            <p className="text-small text-text-secondary">
              Showing {pageStart + 1}&ndash;{Math.min(pageStart + PAGE_SIZE, visible.length)} of{" "}
              {visible.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="cursor-pointer rounded-sm px-2.5 py-1.5 text-small font-medium text-text-secondary transition-colors hover:bg-background hover:text-deep-navy disabled:pointer-events-none disabled:opacity-40"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={cn(
                    "flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm text-small font-medium transition-colors",
                    n === currentPage
                      ? "bg-lagos-blue text-white"
                      : "text-text-secondary hover:bg-background hover:text-deep-navy",
                  )}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="cursor-pointer rounded-sm px-2.5 py-1.5 text-small font-medium text-text-secondary transition-colors hover:bg-background hover:text-deep-navy disabled:pointer-events-none disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
