import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const themes = [
  {
    title: "Health services",
    description:
      "Find hospitals, health programmes, and support from LASHMA and other health agencies.",
  },
  {
    title: "Government services",
    description:
      "Explore ministries, departments and the agencies that keep Lagos running.",
  },
  {
    title: "Roads & traffic",
    description:
      "Report road issues and connect directly with LASTMA for fast resolution.",
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

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {themes.map((theme, i) => (
            <Reveal key={theme.title} delay={i * 60}>
              <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white">
                <div className="aspect-[4/3] w-full bg-background" />
                <div className="flex flex-1 flex-col items-center px-6 py-6 text-center">
                  <p className="text-body font-semibold text-deep-navy">
                    {theme.title}
                  </p>
                  <p className="mt-2 text-small text-text-secondary">
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
