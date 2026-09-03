"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type DropdownItem = {
  label: string;
  href: string;
  image?: string;
};

type NavLink = {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
};

const navLinks: NavLink[] = [
  {
    label: "Services",
    href: "/#services",
    dropdown: [
      { label: "Ask a Question (Enquiry)", href: "/#services" },
      { label: "Share a Suggestion", href: "/#services" },
      { label: "Give Commendation", href: "/#services" },
      { label: "i-Report", href: "/#services" },
      { label: "Whistleblower", href: "/#services" },
      { label: "Report Missing Persons", href: "/#services" },
    ],
  },
  {
    label: "Quick Access",
    href: "/#quick-access",
    dropdown: [
      {
        label: "Become a Community Champion",
        href: "#",
        image: "/images/quick-access/community-champion-card-v4.png",
      },
      {
        label: "Call LASTMA (3367)",
        href: "tel:3367",
        image: "/images/quick-access/lastma-card-v5.png",
      },
      {
        label: "The Open Consultation Forum",
        href: "#",
        image: "/images/quick-access/consultation-forum-card-v4.png",
      },
      {
        label: "Join the Conversation",
        href: "#",
        image: "/images/quick-access/join-conversation-card-v2.png",
      },
      {
        label: "Lagos State Single Social Register",
        href: "#",
        image: "/images/quick-access/social-register-card-v2.png",
      },
    ],
  },
  { label: "Team", href: "/#team" },
  { label: "About", href: "/#about" },
  {
    label: "Resources",
    href: "#",
    dropdown: [{ label: "OPL&C Strategic Plan", href: "#" }],
  },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggleExpanded(href: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(href)) {
        next.delete(href);
      } else {
        next.add(href);
      }
      return next;
    });
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="relative h-9 w-[108px] shrink-0 overflow-hidden">
          <Image
            src="/images/brand/citizens-gate-logo.png"
            alt="Citizens Gate"
            fill
            sizes="108px"
            className="object-cover object-top"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-small font-medium text-text-secondary transition-colors hover:text-lagos-blue"
                >
                  {link.label}
                  <ChevronDown size={14} />
                </Link>
                <div className="invisible absolute left-0 top-full z-50 min-w-[260px] translate-y-1 overflow-hidden rounded-md border border-border bg-white opacity-0 shadow-card transition-all group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href + item.label}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 text-small text-text-secondary hover:bg-background hover:text-deep-navy"
                    >
                      {item.image && (
                        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-sm bg-background">
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </span>
                      )}
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-small font-medium text-text-secondary transition-colors hover:text-lagos-blue"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher className="text-text-secondary hover:text-lagos-blue" />

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-deep-navy lg:hidden"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden">
          <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-4 sm:px-6">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="relative h-9 w-[108px] shrink-0 overflow-hidden"
            >
              <Image
                src="/images/brand/citizens-gate-logo.png"
                alt="Citizens Gate"
                fill
                sizes="108px"
                className="object-cover object-top"
              />
            </Link>
            <div className="flex items-center gap-4">
              <LanguageSwitcher className="text-text-secondary hover:text-lagos-blue" />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-deep-navy"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-4">
            {navLinks.map((link) => {
              const isExpanded = expanded.has(link.href);
              return (
                <div key={link.href}>
                  <div className="flex items-center justify-between rounded-sm hover:bg-background">
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex-1 px-3 py-2.5 text-body font-medium text-deep-navy"
                    >
                      {link.label}
                    </Link>
                    {link.dropdown && (
                      <button
                        type="button"
                        onClick={() => toggleExpanded(link.href)}
                        aria-label={
                          isExpanded ? `Collapse ${link.label}` : `Expand ${link.label}`
                        }
                        aria-expanded={isExpanded}
                        className="flex h-10 w-10 shrink-0 items-center justify-center text-text-secondary"
                      >
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-transform",
                            isExpanded && "rotate-180",
                          )}
                        />
                      </button>
                    )}
                  </div>
                  {link.dropdown && isExpanded && (
                    <div className="ml-3 flex flex-col gap-0.5 border-l border-border pl-3">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href + item.label}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="rounded-sm px-3 py-2 text-small text-text-secondary hover:bg-background hover:text-deep-navy"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex flex-col gap-3 border-t border-border p-4">
            <Button
              href="/report"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Report an issue
            </Button>
            <Button
              href="/track"
              variant="secondary"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Track a complaint
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
