"use client";

import Image from "next/image";
import { ArrowRight, TrendingUp, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useParallax, PARALLAX_OVERSCAN_PX } from "@/lib/useParallax";

const stats = [
  { icon: TrendingUp, value: "12,400+", label: "Issues resolved" },
  { icon: MapPin, value: "20", label: "Local Government Areas covered" },
  { icon: Clock, value: "48hrs", label: "Average first response" },
  { icon: Users, value: "7", label: "Ways to reach government" },
];

export function Hero() {
  const { ref, offset } = useParallax<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden bg-background">
      <div className="adire-divider absolute inset-x-0 top-0 z-10" />

      <div
        className="absolute inset-x-0 top-0"
        style={{
          marginTop: -PARALLAX_OVERSCAN_PX + 3,
          height: `calc(min(94vh, 980px) + ${PARALLAX_OVERSCAN_PX * 2}px)`,
          transform: `translateY(${offset}px)`,
        }}
      >
        <Image
          src="/images/hero/lagos-bridge-day-13.png"
          alt="Wide view of the Lagos Island skyline and lagoon with the Lekki-Ikoyi Link Bridge carrying traffic and boats passing below"
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover object-[75%_35%] saturate-125"
        />
      </div>

      <div
        className="relative mx-auto flex max-w-7xl flex-col justify-between px-4 py-20 sm:px-6 lg:px-8"
        style={{ minHeight: "min(94vh, 980px)" }}
      >
        <div className="mx-auto my-auto max-w-xl pt-4 text-center sm:pt-0">
          <h1 className="mx-auto max-w-[19rem] text-[2.5rem] leading-snug font-extrabold text-balance text-deep-navy sm:max-w-none sm:font-bold sm:text-display">
            Welcome to Lagos State Citizens Gate.
          </h1>
          <p className="mx-auto mt-6 max-w-[19rem] text-body-lg text-text-secondary sm:max-w-lg">
            Report issues, send feedback and connect with Lagos State
            Government, and follow every step until it&apos;s resolved.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Button href="/report" size="lg" className="w-full px-[2.375rem] sm:w-auto">
              Report an issue
              <ArrowRight size={18} />
            </Button>
            <Button
              href="/track"
              variant="secondary"
              size="lg"
              className="w-full px-[2.375rem] sm:w-auto"
            >
              Track a complaint
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>

        <div className="mt-12 border border-border bg-white/0 p-6 opacity-0 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-lagos-green/10 text-lagos-green-dark">
                  <stat.icon size={20} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-h3 leading-none text-deep-navy">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-caption text-text-secondary">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
