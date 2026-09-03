"use client";

import { useMockAuth } from "@/lib/useMockAuth";
import { ConfirmationStep } from "@/components/report/steps/ConfirmationStep";

export default function DashboardConfirmationPage() {
  const { email } = useMockAuth();

  return (
    <ConfirmationStep
      primaryHref="/track/dashboard"
      primaryLabel="Back to my complaints"
      secondaryHref="/track/dashboard/report"
      secondaryLabel="Report another issue"
      accountEmail={email}
      showAccountPrompt={false}
    />
  );
}
