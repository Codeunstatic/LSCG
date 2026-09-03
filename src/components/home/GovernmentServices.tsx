"use client";

import { useState } from "react";
import {
  MessageSquare,
  HeartHandshake,
  IdCard,
  AlertCircle,
  HeartPulse,
  BarChart3,
  FileCheck2,
  Landmark,
  HandCoins,
  Gavel,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

const services = [
  {
    icon: MessageSquare,
    title: "Send Us a Message",
    description: "We are listening. Submit non-emergency feedback directly to government.",
    href: "/report",
  },
  {
    icon: HeartHandshake,
    title: "Social Abuse",
    description: "Report child abuse, sexual abuse, or domestic violence.",
    href: "#",
  },
  {
    icon: IdCard,
    title: "LASRRA Registration",
    description: "Register for your Lagos State Residents ID, with access to BRT and financial benefits.",
    href: "#",
  },
  {
    icon: AlertCircle,
    title: "Non-Emergencies",
    description: "Report health, domestic, road, drainage, and security issues.",
    href: "#",
  },
  {
    icon: HeartPulse,
    title: "LASHMA",
    description: "Ask questions to the Lagos State Health Management Agency.",
    href: "#",
    cta: "Read More",
  },
  {
    icon: BarChart3,
    title: "LASG PMR",
    description: "Check project status updates on the Lagos State Project Performance Platform.",
    href: "#",
    cta: "View project status",
  },
  {
    icon: Landmark,
    title: "Lands Bureau",
    description: "Access electronic land management solutions.",
    href: "#",
    cta: "Read More",
  },
  {
    icon: HandCoins,
    title: "Financial Assistance",
    description: "Apply for Lagos State Government financial aid.",
    href: "#",
    cta: "Sign up or Login",
  },
];

const moreServices = [
  {
    icon: FileCheck2,
    title: "LASRRA Pre-registration",
    description: "Complete LASRRA pre-registration or verify your registration information.",
    href: "#",
    cta: "Read More",
  },
  {
    icon: Gavel,
    title: "Lagos State House of Assembly",
    description: "Passing laws that promote good governance and the responsible use of state resources.",
    href: "#",
    cta: "Read more",
  },
];

const totalCount = services.length + moreServices.length;

export function GovernmentServices() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="information" className="bg-background py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured services"
          title="Access Lagos State services and information in one place"
          subtitle="From registrations to support programmes, explore essential services and resources provided by Lagos State Government."
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 4) * 60}>
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={service.href}
                cta={service.cta}
              />
            </Reveal>
          ))}
        </div>

        {expanded && (
          <Reveal className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {moreServices.map((service) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={service.href}
                cta={service.cta}
              />
            ))}
          </Reveal>
        )}

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-small font-semibold text-deep-navy transition-colors hover:border-lagos-blue/40"
          >
            {expanded ? "Show fewer services" : `View all ${totalCount} services`}
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>
    </section>
  );
}
