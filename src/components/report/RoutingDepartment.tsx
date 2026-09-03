"use client";

import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import { Select } from "@/components/ui/Field";
import { useReport, type IssueCategory } from "@/components/report/ReportContext";

type Mda = {
  name: string;
  /** Sub-departments/units under this MDA. Empty when the MDA is itself the endpoint. */
  departments: string[];
};

type Destination = { mda: string; department: string | null };

const MDAS: Mda[] = [
  {
    name: "Ministry of Works and Infrastructure",
    departments: ["Road Maintenance", "Bridge Maintenance"],
  },
  {
    name: "Ministry of Environment & Water Resources",
    departments: ["Drainage Services", "Waste & Sanitation Compliance"],
  },
  { name: "Lagos Waste Management Authority (LAWMA)", departments: [] },
  { name: "Lagos State Building Control Agency (LASBCA)", departments: [] },
  {
    name: "Lagos State Ministry of Health",
    departments: ["Primary Healthcare Services", "Public Health & Disease Control"],
  },
  {
    name: "Ministry of Energy & Mineral Resources",
    departments: ["Public Utilities"],
  },
  { name: "Office of the Public Advocate", departments: [] },
  {
    name: "Ministry of Transportation",
    departments: ["Traffic Management"],
  },
];

function findMda(name: string) {
  return MDAS.find((m) => m.name === name);
}

const CATEGORY_ROUTING: Record<IssueCategory, Destination> = {
  roads: { mda: "Ministry of Works and Infrastructure", department: "Road Maintenance" },
  traffic: { mda: "Ministry of Transportation", department: "Traffic Management" },
  water: {
    mda: "Ministry of Environment & Water Resources",
    department: "Drainage Services",
  },
  waste: { mda: "Lagos Waste Management Authority (LAWMA)", department: null },
  buildings: { mda: "Lagos State Building Control Agency (LASBCA)", department: null },
  health: {
    mda: "Lagos State Ministry of Health",
    department: "Primary Healthcare Services",
  },
  electricity: {
    mda: "Ministry of Energy & Mineral Resources",
    department: "Public Utilities",
  },
  other: { mda: "Office of the Public Advocate", department: null },
};

const ROUTING_DELAY_MS = 700;

function destinationKey(dest: Destination) {
  return `${dest.mda}|||${dest.department ?? ""}`;
}

/**
 * Mock routing "logic" for the prototype: routes purely on the category
 * chosen in step one, so the result is deterministic regardless of what
 * the tester types in the description field.
 */
function resolveDestination(category: IssueCategory | null): Destination {
  return CATEGORY_ROUTING[category ?? "other"];
}

export function RoutingDepartment() {
  const { data, update } = useReport();
  const { category, description } = data;
  const hasDescription = description.trim().length > 0;
  const isUncertain = category === "other" || category === null;
  const intendedDestination = resolveDestination(category);
  const intendedKey = destinationKey(intendedDestination);

  const [autoResult, setAutoResult] = useState<{
    key: string;
    destination: Destination;
  } | null>(null);
  const [manualDestination, setManualDestination] = useState<Destination | null>(null);
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    if (manualDestination || !hasDescription) return;

    const timer = window.setTimeout(() => {
      setAutoResult({ key: intendedKey, destination: intendedDestination });
    }, ROUTING_DELAY_MS);

    return () => window.clearTimeout(timer);
    // Re-running this on every `description` change is what makes routing
    // resolve only once the tester pauses typing, instead of firing on the
    // very first keystroke.
  }, [description, hasDescription, intendedKey, intendedDestination, manualDestination]);

  let phase: "idle" | "loading" | "resolved";
  let destination: Destination | null;

  if (manualDestination) {
    phase = "resolved";
    destination = manualDestination;
  } else if (!hasDescription) {
    phase = "idle";
    destination = null;
  } else if (autoResult && autoResult.key === intendedKey) {
    phase = "resolved";
    destination = autoResult.destination;
  } else {
    phase = "loading";
    destination = null;
  }

  useEffect(() => {
    if (!destination) return;
    if (data.routedMda === destination.mda && data.routedDepartment === destination.department) {
      return;
    }
    update({ routedMda: destination.mda, routedDepartment: destination.department });
  }, [destination, data.routedMda, data.routedDepartment, update]);

  const selectedMda = destination ? findMda(destination.mda) : undefined;

  function handleMdaChange(name: string) {
    const mda = findMda(name);
    if (!mda) return;
    setManualDestination({ mda: name, department: mda.departments[0] ?? null });
  }

  function handleDepartmentChange(department: string) {
    if (!destination) return;
    setManualDestination({ mda: destination.mda, department });
  }

  return (
    <div className="rounded-lg border border-border bg-background p-5">
      <p className="text-caption font-semibold uppercase tracking-wide text-text-secondary">
        Responsible department
      </p>

      {phase === "idle" && (
        <p className="mt-2 text-small text-text-secondary">
          Your report will be routed to the appropriate government department.
        </p>
      )}

      {phase === "loading" && (
        <div className="mt-3 space-y-2">
          <div className="h-4 w-2/3 animate-pulse rounded-sm bg-border" />
          <p className="text-small text-text-secondary">
            Automatically identifying the right department for your
            issue&hellip;
          </p>
        </div>
      )}

      {phase === "resolved" && destination && (
        <div className="mt-2">
          <p className="text-small text-text-secondary">
            {manualDestination ? (
              <>You&apos;ve manually selected this department.</>
            ) : isUncertain ? (
              <>
                We couldn&apos;t tell exactly which department this belongs
                to, so we&apos;ve provisionally assigned it below.
              </>
            ) : (
              <>
                Based on the category you selected, we&apos;ve automatically
                assigned this to:
              </>
            )}
          </p>

          <div className="mt-3 flex items-start gap-3 rounded-md border border-border bg-white p-3">
            <Building2 size={18} className="mt-0.5 shrink-0 text-lagos-blue" />
            <div>
              <p className="text-body font-semibold text-deep-navy">
                {destination.mda}
              </p>
              {destination.department && (
                <p className="mt-0.5 text-small text-text-secondary">
                  <span className="font-medium text-text-primary">
                    Sub-department:
                  </span>{" "}
                  {destination.department}
                </p>
              )}
            </div>
          </div>

          {showSelector ? (
            <div className="mt-3 space-y-3">
              <Select value={destination.mda} onChange={(e) => handleMdaChange(e.target.value)}>
                {MDAS.map((mda) => (
                  <option key={mda.name} value={mda.name}>
                    {mda.name}
                  </option>
                ))}
              </Select>

              {selectedMda && selectedMda.departments.length > 0 && (
                <Select
                  value={destination.department ?? ""}
                  onChange={(e) => handleDepartmentChange(e.target.value)}
                >
                  {selectedMda.departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </Select>
              )}
            </div>
          ) : (
            <p className="mt-3 text-small text-text-secondary">
              Not the right department?{" "}
              <button
                type="button"
                onClick={() => setShowSelector(true)}
                className="font-semibold text-lagos-blue underline-offset-2 hover:text-lagos-blue-dark hover:underline"
              >
                Change it
              </button>
              .
            </p>
          )}
        </div>
      )}
    </div>
  );
}
