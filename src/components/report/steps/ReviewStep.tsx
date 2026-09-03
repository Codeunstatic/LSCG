"use client";

import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { useReport, categoryLabels } from "@/components/report/ReportContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FieldGroup, TextInput } from "@/components/ui/Field";

function ReviewRow({
  label,
  value,
  editHref,
}: {
  label: string;
  value: string;
  editHref: string;
}) {
  const router = useRouter();
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border py-4 last:border-b-0">
      <div className="min-w-0">
        <p className="text-caption font-semibold uppercase tracking-wide text-text-secondary">
          {label}
        </p>
        <p className="mt-1 whitespace-pre-wrap text-body text-deep-navy">{value}</p>
      </div>
      <button
        type="button"
        onClick={() => router.push(editHref)}
        className="flex shrink-0 items-center gap-1 text-small font-semibold text-lagos-blue hover:text-lagos-blue-dark"
      >
        <Pencil size={13} />
        Edit
      </button>
    </div>
  );
}

export function ReviewStep({
  basePath,
  /**
   * Whether to ask for contact details. Signed-in citizens reporting from the
   * dashboard already have an email on their account, so this is only needed
   * for the public flow.
   */
  collectContact = true,
}: {
  basePath: string;
  collectContact?: boolean;
}) {
  const { data, update } = useReport();
  const router = useRouter();

  function submit() {
    router.push(`${basePath}/confirmation`);
  }

  return (
    <div>
      <div className="text-center">
        <h1 className="text-[1.5rem] sm:text-[2rem] font-semibold leading-tight text-deep-navy">Review your complaint</h1>
        <p className="mt-2 text-body text-text-secondary">
          Make sure everything looks right before you submit.
        </p>
      </div>

      <Card className="mt-10 p-6">
        <ReviewRow
          label="Issue"
          value={data.category ? categoryLabels[data.category] : "Not provided"}
          editHref={basePath}
        />
        <ReviewRow
          label="Description"
          value={data.description || "Not provided"}
          editHref={`${basePath}/describe`}
        />
        <ReviewRow
          label="Responsible department"
          value={
            data.routedMda
              ? [data.routedMda, data.routedDepartment].filter(Boolean).join(" · ")
              : "Not yet determined"
          }
          editHref={`${basePath}/describe`}
        />
        <ReviewRow
          label="Location"
          value={[data.address, data.lga].filter(Boolean).join(", ") || "Not provided"}
          editHref={`${basePath}/location`}
        />
        <ReviewRow
          label="Attachments"
          value={
            data.attachmentNames.length > 0
              ? `${data.attachmentNames.length} file${data.attachmentNames.length > 1 ? "s" : ""}`
              : "No attachments"
          }
          editHref={`${basePath}/describe`}
        />
      </Card>

      {collectContact && (
        <Card className="mt-6 p-6">
          <p className="text-body font-semibold text-deep-navy">
            How should we notify you about updates?
          </p>
          <p className="mt-1 text-small text-text-secondary">
            We&apos;ll use this to send status updates and to save this
            complaint to your account if you choose to track it.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FieldGroup label="Email" htmlFor="email" required>
              <TextInput
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => update({ email: e.target.value })}
                placeholder="you@example.com"
                required
              />
            </FieldGroup>
            <FieldGroup label="Phone number" htmlFor="phone" hint="Optional">
              <TextInput
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => update({ phone: e.target.value })}
                placeholder="080X XXX XXXX"
              />
            </FieldGroup>
          </div>
        </Card>
      )}

      <div className="mt-10 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push(`${basePath}/location`)}
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={submit}
          disabled={collectContact && !data.email.trim()}
        >
          Submit complaint
        </Button>
      </div>
    </div>
  );
}
