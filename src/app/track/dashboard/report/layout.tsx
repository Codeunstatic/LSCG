import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ReportProvider } from "@/components/report/ReportContext";
import { ReportStepper } from "@/components/report/ReportStepper";

export default function DashboardReportLayout({
  children,
}: LayoutProps<"/track/dashboard/report">) {
  return (
    <ReportProvider>
      <div className="mx-auto max-w-3xl">
        <Link
          href="/track/dashboard"
          className="inline-flex items-center gap-1 text-small font-semibold text-lagos-blue hover:text-lagos-blue-dark"
        >
          <ChevronLeft size={16} />
          Back to my complaints
        </Link>
      </div>

      <div className="mt-5 -mx-6 lg:-mx-8">
        <ReportStepper
          basePath="/track/dashboard/report"
          contentClassName="mx-auto max-w-3xl px-6 py-5 lg:px-8"
        />
      </div>

      <div className="mx-auto max-w-3xl pt-8">{children}</div>
    </ReportProvider>
  );
}
