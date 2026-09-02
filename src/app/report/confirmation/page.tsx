"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useReport, categoryLabels, generateTicketId } from "@/components/report/ReportContext";
import { saveMyComplaint } from "@/lib/myComplaints";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

function truncate(text: string, max: number) {
  const trimmed = text.trim();
  return trimmed.length > max ? `${trimmed.slice(0, max).trim()}…` : trimmed;
}

export default function ConfirmationPage() {
  const { data, reset } = useReport();
  const hasReset = useRef(false);
  const [submittedEmail] = useState(() => data.email);
  const [ticketId, setTicketId] = useState<string | null>(null);

  useEffect(() => {
    if (!hasReset.current) {
      hasReset.current = true;

      const newTicketId = generateTicketId();
      const today = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      saveMyComplaint(
        {
          id: newTicketId,
          title: data.category
            ? truncate(data.description, 60) || categoryLabels[data.category]
            : truncate(data.description, 60) || "Complaint",
          category: data.category ? categoryLabels[data.category] : "Other",
          status: "received",
          lastUpdated: today,
          location: [data.address, data.lga].filter(Boolean).join(", "),
          description: data.description,
          attachments: data.attachmentNames.length,
          routedMda: data.routedMda,
          routedDepartment: data.routedDepartment,
          timeline: [
            { label: "Submitted", date: today },
            { label: "Received", date: today },
            { label: "Assigned", date: null },
            { label: "In review", date: null },
            { label: "Resolved", date: null },
          ],
        },
        data.email,
      );

      setTicketId(newTicketId);
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center py-8 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-lagos-green/10 text-lagos-green">
        <CheckCircle2 size={34} />
      </span>

      <h1 className="mt-6 text-h1 text-deep-navy">
        Your complaint has been submitted
      </h1>

      <p className="mt-3 min-h-[2rem] text-h3 font-semibold text-lagos-blue">
        {ticketId ? `Complaint #${ticketId}` : ""}
      </p>

      <div className="mt-3">
        <StatusBadge status="received" />
      </div>

      <p className="mt-5 max-w-md text-body text-text-secondary">
        We&apos;ve received your complaint and sent it to the appropriate
        government team. We&apos;ll email updates to{" "}
        <span className="font-medium text-deep-navy">{submittedEmail}</span>.
      </p>

      <Alert variant="success" className="mt-6 max-w-md text-left">
        Sign in with <span className="font-semibold">{submittedEmail}</span>{" "}
        to see this complaint on your dashboard and follow its progress.
      </Alert>

      <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
        <Button href="/track" size="lg">
          Track my complaint
          <ArrowRight size={18} />
        </Button>
        <Button href="/" variant="ghost" size="lg">
          Return to Citizens Gate
        </Button>
      </div>
    </div>
  );
}
