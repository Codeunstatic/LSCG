import { Button } from "@/components/ui/Button";

export function StepFooter({
  onBack,
  onContinue,
  continueDisabled,
  continueLabel = "Continue",
}: {
  onBack: () => void;
  onContinue: () => void;
  continueDisabled?: boolean;
  continueLabel?: string;
}) {
  return (
    <div className="mt-10 flex items-center justify-between">
      <Button type="button" variant="ghost" onClick={onBack}>
        Back
      </Button>
      <Button type="button" onClick={onContinue} disabled={continueDisabled}>
        {continueLabel}
      </Button>
    </div>
  );
}
