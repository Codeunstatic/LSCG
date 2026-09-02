"use client";

import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const stories = [
  {
    quote:
      "We have since enjoyed a very peaceful and secure environment. The Governor, through the service of Citizens Gate, intervened to restore order in our community 3 months ago.",
    name: "Sara Goodman",
    area: "Agege",
  },
  {
    quote:
      "We have enjoyed a very peaceful and secure environment since the Governor, through the service of Citizens Gate, intervened to restore order in our community 3 months ago.",
    name: "Sara Taiwo",
    area: "Isolo",
  },
  {
    quote: "We now have a better way of reaching the government.",
    name: "Eze Gregory",
    area: "VI",
  },
  {
    quote:
      "We were able to have the government adopt our community priorities over other projects done in our community through making a suggestion as feedback.",
    name: "Mattew Attah",
    area: "Ojodu",
  },
  {
    quote:
      "This is a new way to go with good governance, and holding the government more accountable.",
    name: "Chinwe Ada",
    area: "Ogudu",
  },
  {
    quote:
      "From the comfort of my home, I am able to interact with government services and get real-time updates as they get treated. This is laudable.",
    name: "Kerry Amy",
    area: "Ogudu",
  },
];

const PAGE_SIZE = 3;
const AUTO_ADVANCE_MS = 5000;

const pages = Array.from({ length: Math.ceil(stories.length / PAGE_SIZE) }, (_, i) =>
  stories.slice(i * PAGE_SIZE, i * PAGE_SIZE + PAGE_SIZE),
);

export function CitizenStories() {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => {
      setPage((p) => (p + 1) % pages.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [page, paused]);

  return (
    <section className="bg-background py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Citizen stories"
          title="Lagos residents are already using Citizens Gate"
          align="center"
        />

        <Reveal>
          <div
            className="mt-10 overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {pages.map((group, pi) => (
                <div
                  key={pi}
                  className="grid w-full shrink-0 grid-cols-1 gap-5 sm:grid-cols-3"
                >
                  {group.map((story) => (
                    <div
                      key={story.name}
                      className="flex h-full flex-col rounded-lg border border-border/50 bg-surface p-6"
                    >
                      <Quote size={20} className="text-lagos-blue/30" />
                      <p className="mt-4 flex-1 text-body text-text-secondary">
                        &ldquo;{story.quote}&rdquo;
                      </p>
                      <div className="mt-5 border-t border-border pt-4">
                        <p className="text-small font-medium text-deep-navy">
                          {story.name}, {story.area}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-8 flex justify-center gap-2">
          {pages.map((_, pi) => (
            <button
              key={pi}
              type="button"
              onClick={() => setPage(pi)}
              aria-label={`Go to testimonial page ${pi + 1}`}
              className={cn(
                "h-1.5 w-6 transition-colors",
                pi === page ? "bg-lagos-blue" : "bg-border",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
