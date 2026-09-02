"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMockAuth } from "@/lib/useMockAuth";
import { complaints as demoComplaints } from "@/lib/complaints";
import { useMyComplaints } from "@/lib/myComplaints";
import { ComplaintCard } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type Filter = "all" | "active" | "resolved";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "resolved", label: "Resolved" },
];

export default function DashboardPage() {
  const router = useRouter();
  const { authed, name, email } = useMockAuth();
  const myComplaints = useMyComplaints(email);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    if (authed === false) router.replace("/track");
  }, [authed, router]);

  if (!authed) return null;

  const allComplaints = [...myComplaints, ...demoComplaints];

  const visible = allComplaints.filter((c) => {
    if (filter === "all") return true;
    if (filter === "resolved") return c.status === "resolved";
    return c.status !== "resolved";
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-h1 text-deep-navy">My complaints</h1>
      <p className="mt-2 text-body-lg text-text-secondary">
        {name ? `Welcome back, ${name}. ` : ""}Track the progress of issues
        you&apos;ve reported.
      </p>

      <div className="mt-8 flex gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full px-4 py-2 text-small font-semibold transition-colors",
              filter === f.id
                ? "bg-lagos-blue text-white"
                : "bg-white text-text-secondary border border-border hover:border-lagos-blue/40",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {visible.map((c) => (
          <ComplaintCard
            key={c.id}
            title={c.title}
            category={c.category}
            ticketId={c.id}
            status={c.status}
            lastUpdated={c.lastUpdated}
            href={`/track/${c.id}`}
          />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-body text-text-secondary">
          No complaints in this category yet.
        </p>
      )}
    </div>
  );
}
