"use client";

import { useRouter } from "next/navigation";
import {
  Construction,
  Droplets,
  Trash2,
  Building2,
  HeartPulse,
  Zap,
  MoreHorizontal,
} from "lucide-react";
import { CategoryCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useReport, type IssueCategory } from "@/components/report/ReportContext";

const categories: { id: IssueCategory; label: string; icon: typeof Construction }[] = [
  { id: "roads", label: "Roads & transportation", icon: Construction },
  { id: "water", label: "Water & drainage", icon: Droplets },
  { id: "waste", label: "Waste & environment", icon: Trash2 },
  { id: "buildings", label: "Buildings & housing", icon: Building2 },
  { id: "health", label: "Public health", icon: HeartPulse },
  { id: "electricity", label: "Electricity & utilities", icon: Zap },
  { id: "other", label: "Other", icon: MoreHorizontal },
];

export default function IssueCategoryPage() {
  const { data, update } = useReport();
  const router = useRouter();

  function selectAndContinue(id: IssueCategory) {
    update({ category: id });
    router.push("/report/describe");
  }

  return (
    <div>
      <h1 className="text-h1 text-deep-navy">What do you need help with?</h1>
      <p className="mt-2 text-body-lg text-text-secondary">
        Choose the option that best describes the issue you&apos;re reporting.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            icon={cat.icon}
            label={cat.label}
            selected={data.category === cat.id}
            onSelect={() => selectAndContinue(cat.id)}
          />
        ))}
      </div>

      <div className="mt-10 flex justify-end">
        <Button
          onClick={() => data.category && router.push("/report/describe")}
          disabled={!data.category}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
