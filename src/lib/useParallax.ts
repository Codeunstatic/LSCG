"use client";

import { useEffect, useRef, useState } from "react";

const MAX_OFFSET_PX = 80;

/**
 * Tracks how far an element's center is from the viewport's center as the
 * page scrolls, and returns a small clamped vertical offset to apply to a
 * background layer inside it for a subtle parallax effect. The offset is
 * capped (rather than scaled to element height) so the caller can safely
 * overscan the background layer by a fixed amount and never reveal an edge.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.25) {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    function measure() {
      const el = ref.current;
      ticking = false;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const distanceFromCenter =
        rect.top + rect.height / 2 - window.innerHeight / 2;
      const raw = distanceFromCenter * speed;
      setOffset(Math.max(-MAX_OFFSET_PX, Math.min(MAX_OFFSET_PX, raw)));
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return { ref, offset };
}

export const PARALLAX_OVERSCAN_PX = MAX_OFFSET_PX + 8;
