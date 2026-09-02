"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useParallax, PARALLAX_OVERSCAN_PX } from "@/lib/useParallax";

export function ClosingCta() {
  const { ref, offset } = useParallax<HTMLElement>();

  return (
    <section ref={ref} className="relative overflow-hidden bg-lagos-blue py-32 text-white">
      <div
        className="absolute inset-x-0"
        style={{
          top: -PARALLAX_OVERSCAN_PX,
          bottom: -PARALLAX_OVERSCAN_PX,
          transform: `translateY(${offset}px)`,
        }}
      >
        <Image
          src="/images/cta/lagos-skyline.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-70"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-lagos-blue via-lagos-blue/30 to-transparent" />
      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="text-h2 text-balance text-white">
          Every report helps make Lagos work better.
        </h2>
        <p className="mt-4 text-body-lg text-white/80">
          It takes a few minutes to report an issue, and you can
          follow it from submission to resolution.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            href="/report"
            size="lg"
            className="bg-white text-lagos-blue hover:bg-white/90"
          >
            Report an issue
            <ArrowRight size={18} />
          </Button>
          <Button
            href="/track"
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/10"
          >
            Track a complaint
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
}
