"use client";

import { useRouter } from "next/navigation";
import { useReport } from "@/components/report/ReportContext";
import { Textarea } from "@/components/ui/Field";
import { FileUpload } from "@/components/ui/FileUpload";
import { StepFooter } from "@/components/report/StepFooter";
import { RoutingDepartment } from "@/components/report/RoutingDepartment";

export function DescribeStep({ basePath }: { basePath: string }) {
  const { data, update } = useReport();
  const router = useRouter();

  return (
    <div>
      <div className="text-center">
        <h1 className="text-[1.5rem] sm:text-[2rem] font-semibold leading-tight text-deep-navy">Tell us what happened</h1>
        <p className="mt-2 text-body text-text-secondary">
          Describe the problem in your own words. The more detail, the
          faster we can direct it to the right team.
        </p>
      </div>

      <div className="mt-10">
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
        onBack={() => router.push(basePath)}
        onContinue={() => router.push(`${basePath}/location`)}
        continueDisabled={data.description.trim().length === 0}
      />
    </div>
  );
}
