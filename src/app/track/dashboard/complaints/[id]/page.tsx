"use client";

import { use } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  MapPin,
  FileText,
  Paperclip,
  Building2,
  Calendar,
  Tag,
} from "lucide-react";
import { useMockAuth } from "@/lib/useMockAuth";
import {
  complaints as demoComplaints,
  stageMeaning,
} from "@/lib/complaints";
import { useMyComplaints } from "@/lib/myComplaints";
import { StatusBadge, COMPLAINT_STAGES } from "@/components/ui/StatusBadge";
import { Card } from "@/components/ui/Card";
import { Timeline } from "@/components/ui/Timeline";

export default function ComplaintDetailPage(
  props: PageProps<"/track/dashboard/complaints/[id]">,
) {
  const { id } = use(props.params);
  const { email } = useMockAuth();
  const myComplaints = useMyComplaints(email);

  const allComplaints = [...myComplaints, ...demoComplaints];
  const complaint = allComplaints.find(
    (c) => c.id.toLowerCase() === decodeURIComponent(id).toLowerCase(),
  );

  if (!complaint) {
    return (
      <div className="py-16 text-center">
        <p className="text-h3 text-deep-navy">Complaint not found</p>
        <Link
          href="/track/dashboard"
          className="mt-4 inline-flex items-center gap-1 text-small font-semibold text-lagos-blue"
        >
          <ChevronLeft size={16} />
          Back to my complaints
        </Link>
      </div>
    );
  }

  // Pair each timeline entry with its plain-language explanation so the
  // progress card doubles as the "what these stages mean" reference.
  const timelineSteps = complaint.timeline.map((step, i) => ({
    ...step,
    description: COMPLAINT_STAGES[i]
      ? stageMeaning[COMPLAINT_STAGES[i].id]
      : undefined,
  }));

  const details = [
    { icon: Tag, label: "Category", value: complaint.category },
    {
      icon: Building2,
      label: "Responsible agency",
      value: complaint.routedMda
        ? [complaint.routedMda, complaint.routedDepartment]
            .filter(Boolean)
            .join(" · ")
        : "Not yet assigned",
    },
    { icon: Calendar, label: "Date submitted", value: complaint.submittedDate },
    { icon: Calendar, label: "Last updated", value: complaint.lastUpdated },
    { icon: MapPin, label: "Location", value: complaint.location },
    {
      icon: Paperclip,
      label: "Attachments",
      value:
        complaint.attachments > 0
          ? `${complaint.attachments} file${complaint.attachments === 1 ? "" : "s"}`
          : "No attachments",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/track/dashboard"
        className="inline-flex items-center gap-1 text-small font-semibold text-lagos-blue hover:text-lagos-blue-dark"
      >
        <ChevronLeft size={16} />
        Back to my complaints
      </Link>

      <div className="mt-5">
        <h1 className="text-[2rem] font-semibold leading-tight text-deep-navy">
          {complaint.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <StatusBadge status={complaint.status} />
          <p className="text-small text-text-secondary">
            Reference{" "}
            <span className="font-medium text-deep-navy">#{complaint.id}</span>
          </p>
        </div>
      </div>

      <Card className="mt-8 p-6">
        <p className="text-caption font-semibold uppercase tracking-wide text-text-secondary">
          Latest update
        </p>
        <p className="mt-2 text-body text-deep-navy">{complaint.latestUpdate}</p>
        <p className="mt-3 text-small text-text-secondary">
          {complaint.lastUpdated}
        </p>
      </Card>

      <Card className="mt-6 p-6">
        <p className="text-caption font-semibold uppercase tracking-wide text-text-secondary">
          Progress
        </p>
        <p className="mt-1.5 mb-8 text-body text-text-secondary">
          Here&apos;s what each stage means and where your complaint is now.
        </p>
        <Timeline steps={timelineSteps} />
      </Card>

      <Card className="mt-6 p-6">
        <p className="text-caption font-semibold uppercase tracking-wide text-text-secondary">
          Complaint details
        </p>
        <dl className="mt-5 grid grid-cols-1 gap-7 sm:grid-cols-2">
          {details.map((detail) => (
            <div key={detail.label}>
              <dt className="flex items-center gap-1.5 text-small font-medium text-text-secondary">
                <detail.icon size={14} />
                {detail.label}
              </dt>
              <dd className="mt-1 text-body text-deep-navy">{detail.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 border-t border-border pt-5">
          <dt className="flex items-center gap-1.5 text-small font-medium text-text-secondary">
            <FileText size={14} />
            Description
          </dt>
          <dd className="mt-1 whitespace-pre-wrap text-body text-deep-navy">
            {complaint.description}
          </dd>
        </div>
      </Card>
    </div>
  );
}
