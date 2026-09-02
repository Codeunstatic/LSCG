"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin, FileText, Paperclip, Building2 } from "lucide-react";
import { useMockAuth } from "@/lib/useMockAuth";
import { complaints as demoComplaints, statusMeaning, statusHeadline } from "@/lib/complaints";
import { useMyComplaints } from "@/lib/myComplaints";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Card } from "@/components/ui/Card";
import { Timeline } from "@/components/ui/Timeline";

export default function ComplaintDetailPage(props: PageProps<"/track/[id]">) {
  const { id } = use(props.params);
  const router = useRouter();
  const { authed, email } = useMockAuth();
  const myComplaints = useMyComplaints(email);

  useEffect(() => {
    if (authed === false) router.replace("/track");
  }, [authed, router]);

  if (!authed) return null;

  const allComplaints = [...myComplaints, ...demoComplaints];
  const complaint = allComplaints.find(
    (c) => c.id.toLowerCase() === decodeURIComponent(id).toLowerCase(),
  );

  if (!complaint) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
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

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/track/dashboard"
        className="inline-flex items-center gap-1 text-small font-semibold text-lagos-blue hover:text-lagos-blue-dark"
      >
        <ChevronLeft size={16} />
        Back to my complaints
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-h1 text-deep-navy">{complaint.title}</h1>
          <p className="mt-1 text-small text-text-secondary">#{complaint.id}</p>
        </div>
      </div>

      <Card className="mt-8 p-6">
        <p className="text-caption font-semibold uppercase tracking-wide text-text-secondary">
          Current status
        </p>
        <div className="mt-2 flex items-center gap-3">
          <p className="text-h3 text-deep-navy">
            {statusHeadline[complaint.status]}
          </p>
          <StatusBadge status={complaint.status} />
        </div>
        <p className="mt-2 text-body text-text-secondary">
          {statusMeaning[complaint.status]}
        </p>
      </Card>

      <Card className="mt-6 p-6">
        <p className="mb-6 text-caption font-semibold uppercase tracking-wide text-text-secondary">
          Status timeline
        </p>
        <Timeline steps={complaint.timeline} />
      </Card>

      <Card className="mt-6 p-6">
        <p className="mb-4 text-caption font-semibold uppercase tracking-wide text-text-secondary">
          Complaint details
        </p>
        <dl className="space-y-6">
          <div>
            <dt className="text-small font-medium text-text-secondary">Category</dt>
            <dd className="mt-0.5 text-body text-deep-navy">{complaint.category}</dd>
          </div>
          {complaint.routedMda && (
            <div>
              <dt className="flex items-center gap-1.5 text-small font-medium text-text-secondary">
                <Building2 size={14} />
                Responsible department
              </dt>
              <dd className="mt-0.5 text-body text-deep-navy">
                {complaint.routedMda}
                {complaint.routedDepartment && (
                  <span className="block text-small text-text-secondary">
                    {complaint.routedDepartment}
                  </span>
                )}
              </dd>
            </div>
          )}
          <div>
            <dt className="flex items-center gap-1.5 text-small font-medium text-text-secondary">
              <MapPin size={14} />
              Location
            </dt>
            <dd className="mt-0.5 text-body text-deep-navy">{complaint.location}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-small font-medium text-text-secondary">
              <FileText size={14} />
              Description
            </dt>
            <dd className="mt-0.5 text-body text-deep-navy">{complaint.description}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-small font-medium text-text-secondary">
              <Paperclip size={14} />
              Attachments
            </dt>
            <dd className="mt-0.5 text-body text-deep-navy">
              {complaint.attachments} photo{complaint.attachments === 1 ? "" : "s"}
            </dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
