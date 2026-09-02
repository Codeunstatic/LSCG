import { ReportProvider } from "@/components/report/ReportContext";
import { ReportStepper } from "@/components/report/ReportStepper";

export default function ReportLayout({ children }: LayoutProps<"/report">) {
  return (
    <ReportProvider>
      <div className="bg-background min-h-full">
        <ReportStepper />
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">{children}</div>
      </div>
    </ReportProvider>
  );
}
