"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useParallax, PARALLAX_OVERSCAN_PX } from "@/lib/useParallax";

const slides = [
  {
    image: "/images/together/bus-stop.jpg",
    title: "Everyday Bus Stop",
    description: "You can send us feedback about your transportation experience.",
  },
  {
    image: "/images/together/victoria-island.jpg",
    title: "Lagos Island",
    description: "Report anything happening around you. We care.",
  },
  {
    image: "/images/together/cms.jpg",
    title: "CMS",
    description: "You can send us a message about your area.",
  },
  {
    image: "/images/together/lagos-island.jpg",
    title: "Lagos Island",
    description: "We can address your issues with building or C of O here.",
  },
  {
    image: "/images/together/makoko.jpg",
    title: "Makoko",
    description: "You can tell us how to better serve your community in your local government.",
  },
  {
    image: "/images/together/ojodu-berger.jpg",
    title: "Ojodu Berger",
    description: "If your environment is dirty or unhealthy, you can reach us here.",
  },
];

const AUTO_ADVANCE_MS = 5000;

export function WhatYouCanReport() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = slides[active];
  const { ref, offset } = useParallax<HTMLElement>();

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => {
      setActive((i) => (i + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused]);

  const goPrev = () => setActive((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setActive((i) => (i + 1) % slides.length);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[620px] w-full items-end overflow-hidden bg-deep-navy text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="absolute inset-x-0"
        style={{
          top: -PARALLAX_OVERSCAN_PX,
          bottom: -PARALLAX_OVERSCAN_PX,
          transform: `translateY(${offset}px)`,
        }}
      >
        <Image
          key={current.image}
          src={current.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-40 sm:px-6 lg:px-8">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-white/70">
          Together, we can make Lagos State better
        </p>
        <h2 className="mt-3 max-w-xl text-[48px] font-bold leading-tight text-balance">
          {current.title}
        </h2>
        <p className="mt-4 max-w-md text-body-lg text-white/80">
          {current.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <Link
            href="/report"
            className="flex items-stretch overflow-hidden rounded-md bg-white text-deep-navy"
          >
            <span className="flex items-center px-6 py-3 text-btn font-semibold">
              Report an issue
            </span>
            <span className="flex items-center border-l border-border px-4">
              <ArrowRight size={18} />
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-lagos-blue text-white transition-transform hover:scale-105"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-lagos-blue text-white transition-transform hover:scale-105"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="h-0.5 w-40 max-w-[35vw] overflow-hidden bg-white/30">
            <div
              key={active}
              className="h-full bg-lagos-blue"
              style={{
                animation: `${AUTO_ADVANCE_MS}ms linear forwards fill-bar`,
                animationPlayState: paused ? "paused" : "running",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
