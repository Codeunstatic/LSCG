import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const themes = [
  {
    title: "Health services",
    description:
      "Find hospitals, health programmes, and support from LASHMA and other health agencies.",
    image: "/images/about/health-services-2.png",
  },
  {
    title: "Government services",
    description:
      "Explore ministries, departments and the agencies that keep Lagos running.",
    image: "/images/about/government-services.png",
  },
  {
    title: "Roads & traffic",
    description:
      "Report road issues and connect directly with LASTMA for fast resolution.",
    image: "/images/about/roads-traffic.png",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="bg-background py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="Connecting you to the right government services, faster."
          subtitle="Your feedback helps us build a smarter, more responsive Lagos, from healthcare and public services to the roads you drive on every day."
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {themes.map((theme, i) => (
            <Reveal key={theme.title} delay={i * 60}>
              <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white">
                <div className="relative aspect-[4/3] w-full bg-background">
                  {theme.image && (
                    <Image
                      src={theme.image}
                      alt={theme.title}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col items-center px-8 py-8 text-center">
                  <p className="text-[1.125rem] font-semibold text-deep-navy">
                    {theme.title}
                  </p>
                  <p className="mt-2 text-balance text-[0.9375rem] text-text-secondary">
                    {theme.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
