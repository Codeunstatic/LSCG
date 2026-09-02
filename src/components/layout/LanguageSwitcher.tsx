"use client";

import { useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "yo", label: "Yorùbá" },
  { code: "ig", label: "Igbo" },
  { code: "ha", label: "Hausa" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("en");

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 whitespace-nowrap text-white/70 hover:text-white",
          className,
        )}
      >
        <Globe size={12} />
        {selected.toUpperCase()}
        <ChevronDown
          size={12}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 min-w-[200px] overflow-hidden rounded-md border border-border bg-white shadow-card">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setSelected(lang.code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2.5 text-left text-small transition-colors",
                  selected === lang.code
                    ? "bg-lagos-blue/10 text-lagos-blue"
                    : "text-deep-navy hover:bg-background",
                )}
              >
                {lang.label}
                {selected === lang.code && <Check size={14} />}
              </button>
            ))}
            <p className="border-t border-border px-4 py-3 text-caption text-text-secondary">
              Full translation isn&apos;t available in this prototype.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
