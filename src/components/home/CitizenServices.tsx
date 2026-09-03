import Link from "next/link";
import Image from "next/image";
import {
  MessageSquareWarning,
  HelpCircle,
  Lightbulb,
  Award,
  Eye,
  ShieldCheck,
  Users,
  ArrowRight,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const secondaryServices = [
  {
    icon: HelpCircle,
    title: "Ask a Question (Enquiry)",
    description: "Get information about a government service, policy, or process.",
    href: "#",
  },
  {
    icon: Lightbulb,
    title: "Share a Suggestion",
    description: "Share your ideas to help improve public services in Lagos State.",
    href: "#",
  },
  {
    icon: Award,
    title: "Give Commendation",
    description: "Recognize and appreciate government officials or agencies for good service.",
    href: "#",
  },
  {
    icon: Eye,
    title: "i-Report",
    description: "Report issues happening in your community for awareness and action.",
    href: "#",
  },
  {
    icon: ShieldCheck,
    title: "Whistleblower",
    description: "Report unethical behavior, fraud, or misconduct anonymously.",
    href: "#",
  },
  {
    icon: Users,
    title: "Report Missing Persons",
    description: "Report or provide information to help locate a missing person.",
    href: "#",
  },
];

export function CitizenServices() {
  return (
    <section id="services" className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What do you need help with?"
          title="Choose what you need to do"
          subtitle="Tell us what you need help with and we'll guide you to the right service."
          align="center"
          className="max-w-none"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-1">
            <Link
              href="/report"
              className="group relative flex h-full flex-col overflow-hidden rounded-lg bg-lagos-blue p-8 text-white transition-transform hover:-translate-y-0.5"
            >
              <div className="absolute inset-x-0 bottom-0 h-1/2">
                <Image
                  src="/images/services/complaint-card-bg.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="object-cover object-bottom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lagos-blue/60 via-transparent to-transparent" />
              </div>
              <div className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-white/15">
                  <MessageSquareWarning size={24} />
                </span>
                <p className="mt-5 text-h3 text-white">Report a Complaint</p>
                <p className="mt-2 text-body text-white/80">
                  Report issues that need government attention:
                  potholes, blocked drains, waste, streetlights, and more.
                </p>
              </div>
              <span className="relative mt-8 inline-flex w-fit items-center gap-1.5 rounded-md bg-white px-5 py-2.5 text-body font-semibold text-lagos-blue">
                Report now
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2">
            {secondaryServices.map((service, i) => (
              <Reveal key={service.title} delay={i * 50}>
                <Link
                  href={service.href}
                  className="group flex h-full min-h-[176px] flex-col rounded-lg border border-border/50 bg-background p-7 transition-all hover:border-lagos-blue/40 hover:shadow-card"
                >
                  <service.icon size={24} className="shrink-0 text-deep-navy" strokeWidth={1.5} />
                  <p className="mt-5 text-body font-semibold text-deep-navy transition-colors group-hover:text-lagos-blue">
                    {service.title}
                  </p>
                  <p className="mt-2 text-[0.9375rem] text-text-secondary">
                    {service.description}
                  </p>
                  <span className="mt-auto flex items-center gap-1.5 pt-5 text-small font-semibold text-lagos-blue sm:hidden">
                    Get started
                    <ArrowRight size={15} strokeWidth={2.25} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
