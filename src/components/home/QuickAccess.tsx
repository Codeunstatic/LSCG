"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const cards = [
  {
    image: "/images/quick-access/community-champion-card-v3.png",
    width: 1671,
    height: 941,
    href: "#",
    alt: "Become a Community Champion. Join active citizens making Lagos cleaner, safer and better for everyone. Get Involved.",
  },
  {
    image: "/images/quick-access/lastma-card-v4.png",
    width: 1672,
    height: 941,
    href: "tel:3367",
    alt: "Call LASTMA toll-free on 3367. Get help with traffic incidents and road emergencies anytime, anywhere.",
  },
  {
    image: "/images/quick-access/consultation-forum-card-v3.png",
    width: 1669,
    height: 942,
    href: "#",
    alt: "The Open Consultation Forum. Share ideas, give feedback and help shape a better Lagos. Join the Forum.",
  },
  {
    image: "/images/quick-access/join-conversation-card.png",
    width: 1672,
    height: 941,
    href: "#",
    alt: "Join the conversation now. Your voice matters. Share ideas, report issues and help build a better Lagos for everyone.",
  },
  {
    image: "/images/quick-access/social-register-card.png",
    width: 1672,
    height: 941,
    href: "#",
    alt: "Lagos State Single Social Register. A fairer, smarter way to identify and support Lagos residents who need help.",
  },
];

export function QuickAccess() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const container = scrollRef.current;
    const card = container?.querySelector<HTMLElement>("[data-card]");
    if (!container || !card) return;
    const amount = card.offsetWidth + 24;
    container.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <section id="quick-access" className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Quick access"
          title="More ways to engage with Lagos"
          subtitle="Explore opportunities to connect with government, participate in your community, and access public programmes."
          align="center"
        />

        <div className="relative mt-14">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous"
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-5 -translate-y-1/2 items-center justify-center rounded-md border border-border bg-white shadow-card sm:flex"
          >
            <ChevronLeft size={20} className="text-deep-navy" />
          </button>

          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {cards.map((card, i) => (
              <Reveal key={card.image} delay={i * 60} className="shrink-0">
                <Link
                  data-card
                  href={card.href}
                  className="block w-[85vw] max-w-[900px] shrink-0 snap-start overflow-hidden rounded-[10px] sm:w-[700px] lg:w-[900px]"
                >
                  <Image
                    src={card.image}
                    alt={card.alt}
                    width={card.width}
                    height={card.height}
                    sizes="(min-width: 1024px) 900px, (min-width: 640px) 700px, 85vw"
                    className="h-auto w-full"
                    priority={i === 0}
                  />
                </Link>
              </Reveal>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next"
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 translate-x-5 -translate-y-1/2 items-center justify-center rounded-md border border-border bg-white shadow-card sm:flex"
          >
            <ChevronRight size={20} className="text-deep-navy" />
          </button>
        </div>
      </div>
    </section>
  );
}
