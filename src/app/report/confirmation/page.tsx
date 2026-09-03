import { ConfirmationStep } from "@/components/report/steps/ConfirmationStep";

export default function ConfirmationPage() {
  return (
    <ConfirmationStep
      primaryHref="/track"
      primaryLabel="Track my complaint"
      secondaryHref="/"
      secondaryLabel="Return to Citizens Gate"
    />
  );
}
