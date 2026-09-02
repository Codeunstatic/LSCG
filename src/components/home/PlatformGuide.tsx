"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, PlayCircle, Film, Smartphone, MessageCircle, Landmark, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const items = [
  {
    icon: PlayCircle,
    title: "Watch usage tour",
    description:
      "See a walkthrough of how Citizens Gate works, from reporting an issue to tracking it through to resolution.",
    cta: "Watch now",
    href: "#",
    image: "/images/platform-guide/usage-tour-mockup.png",
    video: true,
  },
  {
    icon: Film,
    title: "Video about Lagos",
    description:
      "Watch a short video introducing Lagos State and the services available to every resident.",
    cta: "Watch video",
    href: "#",
    image: "/images/platform-guide/lagos-video-preview.png",
    video: true,
  },
  {
    icon: Smartphone,
    title: "Download Android app",
    description:
      "Get Citizens Gate on the Google Play Store and report issues on the go, wherever you are.",
    cta: "Get the app",
    href: "#",
    image: "/images/platform-guide/android-app-preview.png",
    video: false,
  },
  {
    icon: MessageCircle,
    title: "Chat with us on WhatsApp",
    description:
      "Reach us directly for help using the platform. Our team responds during business hours.",
    cta: "Start chat",
    href: "https://wa.me/2348000024842",
    image: "/images/platform-guide/whatsapp-preview.png",
    video: false,
  },
  {
    icon: Landmark,
    title: "Ministries",
    description:
      "Browse the ministries that make up Lagos State Government and what each one does.",
    cta: "View ministries",
    href: "#",
    image: "/images/platform-guide/ministries-preview.png",
    video: false,
  },
  {
    icon: Building2,
    title: "Departments/Agencies",
    description:
      "Explore the departments and agencies working across Lagos State.",
    cta: "View departments",
    href: "#",
    image: "/images/platform-guide/departments-preview.png",
    video: false,
  },
];

const AUTO_ADVANCE_MS = 3000;

export function PlatformGuide() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const current = items[active];

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => {
      setActive((i) => (i + 1) % items.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused]);

  useEffect(() => {
    const el = buttonRefs.current[active];
    const container = scrollRef.current;
    if (!el) return;
    setIndicator({ left: el.offsetLeft, width: el.offsetWidth });

    if (!container) return;
    const targetLeft =
      el.offsetLeft - container.clientWidth / 2 + el.offsetWidth / 2;
    container.scrollTo({ left: targetLeft, behavior: "smooth" });
  }, [active]);

  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="New here?"
          title="Learn how to navigate this platform"
          subtitle="A few quick ways to get familiar with Citizens Gate before you dive in."
          align="center"
        />

        <Reveal>
          <div
            className="mt-14 flex flex-col items-center"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div ref={scrollRef} className="w-full overflow-x-auto">
              <div className="relative mx-auto flex w-max items-center justify-center gap-x-8 pb-3">
                {items.map((item, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={item.title}
                      ref={(el) => {
                        buttonRefs.current[i] = el;
                      }}
                      type="button"
                      onClick={() => setActive(i)}
                      className="shrink-0 whitespace-nowrap text-body font-medium"
                    >
                      <span className={cn(isActive ? "text-deep-navy" : "text-text-secondary")}>
                        {item.title}
                      </span>
                    </button>
                  );
                })}

                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-border" />
                <div
                  className="absolute bottom-0 h-0.5 overflow-hidden transition-[left,width] duration-300"
                  style={{ left: indicator.left, width: indicator.width }}
                >
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

            <div className="mt-10 grid w-full grid-cols-1 bg-background lg:grid-cols-2 lg:items-stretch">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-deep-navy lg:aspect-auto lg:h-full lg:min-h-[420px]">
                {current.image ? (
                  <>
                    <Image
                      key={current.image}
                      src={current.image}
                      alt={current.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                    {current.video && (
                      <>
                        <div className="absolute inset-0 bg-deep-navy/10" />
                        <span className="absolute inset-0 flex cursor-pointer items-center justify-center">
                          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-card transition-transform hover:scale-105">
                            <Play size={22} strokeWidth={0} className="ml-0.5 fill-lagos-blue" />
                          </span>
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <current.icon size={48} strokeWidth={1.2} className="absolute inset-0 m-auto text-white/30" />
                )}
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <p className="text-h3 text-deep-navy">{current.title}</p>
                <p className="mt-3 max-w-md text-body text-text-secondary">
                  {current.description}
                </p>
                <Button href={current.href} className="mt-6 w-fit">
                  {current.cta}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
