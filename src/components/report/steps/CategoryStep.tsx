"use client";

import { useRouter } from "next/navigation";
import {
  Construction,
  Bus,
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
  { id: "roads", label: "Roads & bridges", icon: Construction },
  { id: "traffic", label: "Traffic & public transport", icon: Bus },
  { id: "water", label: "Water & drainage", icon: Droplets },
  { id: "waste", label: "Waste & environment", icon: Trash2 },
  { id: "buildings", label: "Buildings & housing", icon: Building2 },
  { id: "health", label: "Public health", icon: HeartPulse },
  { id: "electricity", label: "Electricity & utilities", icon: Zap },
  { id: "other", label: "I'm not sure", icon: MoreHorizontal },
];

export function CategoryStep({ basePath }: { basePath: string }) {
  const { data, update } = useReport();
  const router = useRouter();

  function selectAndContinue(id: IssueCategory) {
    update({ category: id });
    router.push(`${basePath}/describe`);
  }

  return (
    <div>
      <div className="text-center">
        <h1 className="text-[1.5rem] sm:text-[2rem] font-semibold leading-tight text-deep-navy">What do you need help with?</h1>
        <p className="mt-2 text-body text-text-secondary">
          Choose the option that best describes the issue you&apos;re reporting.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          onClick={() => data.category && router.push(`${basePath}/describe`)}
          disabled={!data.category}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
