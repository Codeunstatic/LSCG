"use client";

import { useRouter } from "next/navigation";
import { useReport } from "@/components/report/ReportContext";
import { Textarea } from "@/components/ui/Field";
import { FileUpload } from "@/components/ui/FileUpload";
import { StepFooter } from "@/components/report/StepFooter";
import { RoutingDepartment } from "@/components/report/RoutingDepartment";

export default function DescribeIssuePage() {
  const { data, update } = useReport();
  const router = useRouter();

  return (
    <div>
      <h1 className="text-h1 text-deep-navy">Tell us what happened</h1>
      <p className="mt-2 text-body-lg text-text-secondary">
        Describe the problem in your own words. The more detail, the
        faster we can direct it to the right team.
      </p>

      <div className="mt-8">
        <Textarea
          value={data.description}
          onChange={(e) => update({ description: e.target.value })}
          placeholder="Describe the problem in your own words."
          rows={6}
        />
      </div>

      <div className="mt-6">
        <RoutingDepartment />
      </div>

      <div className="mt-6">
        <FileUpload
          fileNames={data.attachmentNames}
          onChange={(names) => update({ attachmentNames: names })}
        />
      </div>

      <StepFooter
        onBack={() => router.push("/report")}
        onContinue={() => router.push("/report/location")}
        continueDisabled={data.description.trim().length === 0}
      />
    </div>
  );
}
