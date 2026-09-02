"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { label: "Services", href: "/#services" },
  {
    label: "Quick Access",
    href: "/#quick-access",
    dropdown: [
      { label: "Call LASTMA (3367)", href: "tel:3367" },
      { label: "Become a Community Champion", href: "#" },
      { label: "The Open Consultation Forum", href: "#" },
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

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/brand/citizens-gate-mark.png"
            alt="Citizens Gate"
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
          <span className="text-body font-bold text-deep-navy">
            Citizens Gate
          </span>
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
                <div className="invisible absolute left-0 top-full z-50 min-w-[240px] translate-y-1 overflow-hidden rounded-md border border-border bg-white opacity-0 shadow-card transition-all group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href + item.label}
                      href={item.href}
                      className="block px-4 py-3 text-small text-text-secondary hover:bg-background hover:text-deep-navy"
                    >
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
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-deep-navy lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-sm px-3 py-2.5 text-body font-medium text-deep-navy hover:bg-background"
                >
                  {link.label}
                </Link>
                {link.dropdown && (
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
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
