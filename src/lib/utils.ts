import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Our custom type-scale utilities (defined in globals.css via @theme) aren't
// part of Tailwind's stock font-size scale, so twMerge doesn't recognize them
// as font-size classes by default — it was silently dropping them whenever
// they appeared alongside a text-color utility (e.g. "text-small text-lagos-blue"
// merged down to just "text-lagos-blue"). Registering them here fixes that.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-caption",
        "text-small",
        "text-body",
        "text-body-lg",
        "text-h3",
        "text-h2",
        "text-h1",
        "text-display",
        "text-btn",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
