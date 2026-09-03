import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const leaders = [
  {
    name: "Babajide Sanwo-Olu",
    role: "Governor, Lagos State",
    image: "/images/team/governor.jpeg",
  },
  {
    name: "Kadri Obafemi Hamzat",
    role: "Deputy Governor, Lagos State",
    image: "/images/team/deputy-governor.jpeg",
  },
];

export function Leadership() {
  return (
    <section id="team" className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Leadership"
          title="Serving Lagos State"
          align="center"
        />
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
          {leaders.map((leader, i) => (
            <Reveal key={leader.name} delay={i * 100}>
              <div className="overflow-hidden rounded-lg border border-border/50 bg-background">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    sizes="(min-width: 640px) 368px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5 text-center">
                  <p className="text-body font-semibold text-deep-navy">
                    {leader.name}
                  </p>
                  <p className="mt-1 text-small text-text-secondary">
                    {leader.role}
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
