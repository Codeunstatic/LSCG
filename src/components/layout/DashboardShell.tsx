"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  MessageSquareWarning,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Settings,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { useMockAuth } from "@/lib/useMockAuth";
import { cn } from "@/lib/utils";

const inactiveNavItems = [{ label: "Help & support", icon: HelpCircle }];

export function DashboardShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { authed, name, signOut } = useMockAuth();
  const [collapsed, setCollapsed] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (authed === false) router.replace("/track");
  }, [authed, router]);

  if (!authed) return null;

  const inReportFlow = pathname.startsWith("/track/dashboard/report");
  const inComplaintDetail = pathname.startsWith("/track/dashboard/complaints");

  const pageLabel = inReportFlow
    ? "Report an issue"
    : inComplaintDetail
      ? "Complaint details"
      : "Citizen's dashboard";

  function handleSignOut() {
    signOut();
    router.push("/track");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside
        className={cn(
          "sticky top-0 z-30 hidden h-screen shrink-0 flex-col border-r border-border bg-white transition-[width] duration-200 lg:flex",
          collapsed ? "w-[76px]" : "w-[260px]",
        )}
      >
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute -right-3.5 top-1/2 z-40 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm border border-border bg-white text-text-secondary shadow-card transition-colors hover:text-deep-navy"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <Link
          href="/"
          title="Back to Citizens Gate"
          className={cn(
            "flex items-center px-5 py-5",
            collapsed && "justify-center px-0",
          )}
        >
          {collapsed ? (
            <Image
              src="/images/brand/citizens-gate-mark.png"
              alt="Citizens Gate"
              width={28}
              height={28}
              className="h-7 w-7 shrink-0"
              priority
            />
          ) : (
            <span className="relative h-7 w-[85px] shrink-0 overflow-hidden">
              <Image
                src="/images/brand/citizens-gate-logo.png"
                alt="Citizens Gate"
                fill
                sizes="85px"
                className="object-cover object-top"
                priority
              />
            </span>
          )}
        </Link>

        <nav className="flex flex-1 flex-col gap-1 px-3 pt-8 pb-4">
          <Link
            href="/track/dashboard"
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-small font-semibold transition-colors",
              inReportFlow
                ? "text-text-secondary hover:bg-background hover:text-deep-navy"
                : "bg-lagos-blue/10 text-lagos-blue",
              collapsed && "justify-center px-0",
            )}
          >
            <FileText size={16} className="shrink-0" />
            {!collapsed && "My complaints"}
          </Link>
          <Link
            href="/track/dashboard/report"
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-small font-semibold transition-colors",
              inReportFlow
                ? "bg-lagos-blue/10 text-lagos-blue"
                : "text-text-secondary hover:bg-background hover:text-deep-navy",
              collapsed && "justify-center px-0",
            )}
          >
            <MessageSquareWarning size={16} className="shrink-0" />
            {!collapsed && "Report an issue"}
          </Link>

          <div className="my-2 border-t border-border" />

          {inactiveNavItems.map((item) => (
            <span
              key={item.label}
              className={cn(
                "flex cursor-not-allowed items-center gap-2.5 rounded-md px-3 py-2.5 text-small font-medium text-text-secondary/50",
                collapsed && "justify-center px-0",
              )}
            >
              <item.icon size={16} className="shrink-0" />
              {!collapsed && item.label}
            </span>
          ))}
        </nav>

        <div className="flex flex-col gap-1 border-t border-border px-3 py-4">
          <button
            type="button"
            onClick={handleSignOut}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-small font-medium text-text-secondary transition-colors hover:bg-background hover:text-deep-navy",
              collapsed && "justify-center px-0",
            )}
          >
            <LogOut size={16} className="shrink-0" />
            {!collapsed && "Log out"}
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-white px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileNavOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-deep-navy lg:hidden"
            >
              <Menu size={18} />
            </button>

            <Link
              href="/"
              title="Back to Citizens Gate"
              className="relative h-7 w-[85px] shrink-0 overflow-hidden lg:hidden"
            >
              <Image
                src="/images/brand/citizens-gate-logo.png"
                alt="Citizens Gate"
                fill
                sizes="85px"
                className="object-cover object-top"
                priority
              />
            </Link>

            <p className="hidden text-small font-semibold text-deep-navy lg:block">
              {pageLabel}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-sm text-text-secondary/50">
              <Bell size={18} />
            </span>
            <span className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-sm text-text-secondary/50">
              <Settings size={18} />
            </span>
            <span
              title={name || "Resident"}
              className="ml-1 flex h-9 w-9 shrink-0 cursor-not-allowed items-center justify-center rounded-full bg-lagos-blue text-small font-semibold text-white"
            >
              {(name || "R").charAt(0).toUpperCase()}
            </span>
          </div>
        </header>

        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden">
            <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-4">
              <Link
                href="/"
                onClick={() => setMobileNavOpen(false)}
                className="relative h-7 w-[85px] shrink-0 overflow-hidden"
              >
                <Image
                  src="/images/brand/citizens-gate-logo.png"
                  alt="Citizens Gate"
                  fill
                  sizes="85px"
                  className="object-cover object-top"
                />
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileNavOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-deep-navy"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4">
              <Link
                href="/track/dashboard"
                onClick={() => setMobileNavOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-body font-semibold",
                  inReportFlow
                    ? "text-deep-navy hover:bg-background"
                    : "bg-lagos-blue/10 text-lagos-blue",
                )}
              >
                <FileText size={16} className="shrink-0" />
                My complaints
              </Link>
              <Link
                href="/track/dashboard/report"
                onClick={() => setMobileNavOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-body font-semibold",
                  inReportFlow
                    ? "bg-lagos-blue/10 text-lagos-blue"
                    : "text-deep-navy hover:bg-background",
                )}
              >
                <MessageSquareWarning size={16} className="shrink-0" />
                Report an issue
              </Link>

              <div className="my-2 border-t border-border" />

              {inactiveNavItems.map((item) => (
                <span
                  key={item.label}
                  className="flex cursor-not-allowed items-center gap-2.5 rounded-md px-3 py-2.5 text-body font-medium text-text-secondary/50"
                >
                  <item.icon size={16} className="shrink-0" />
                  {item.label}
                </span>
              ))}
            </nav>

            <div className="border-t border-border p-4">
              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-body font-medium text-text-secondary hover:bg-background"
              >
                <LogOut size={16} className="shrink-0" />
                Log out
              </button>
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1 px-6 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
