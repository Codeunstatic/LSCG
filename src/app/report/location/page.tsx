"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LocateFixed, CheckCircle2 } from "lucide-react";
import { useReport } from "@/components/report/ReportContext";
import { FieldGroup, Select, TextInput } from "@/components/ui/Field";
import { StepFooter } from "@/components/report/StepFooter";

const lgas = [
  "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa",
  "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye",
  "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland",
  "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere",
];

export default function LocationPage() {
  const { data, update } = useReport();
  const router = useRouter();
  const [locating, setLocating] = useState(false);

  function useCurrentLocation() {
    setLocating(true);
    setTimeout(() => {
      update({ useCurrentLocation: true });
      setLocating(false);
    }, 900);
  }

  return (
    <div>
      <h1 className="text-h1 text-deep-navy">Where is this happening?</h1>
      <p className="mt-2 text-body-lg text-text-secondary">
        This helps us send your complaint to the right local team.
      </p>

      <div className="mt-8 space-y-6">
        <FieldGroup label="Local Government Area" htmlFor="lga" required>
          <Select
            id="lga"
            value={data.lga}
            onChange={(e) => update({ lga: e.target.value })}
          >
            <option value="">Select your LGA</option>
            {lgas.map((lga) => (
              <option key={lga} value={lga}>
                {lga}
              </option>
            ))}
          </Select>
        </FieldGroup>

        <FieldGroup
          label="Address or landmark"
          htmlFor="address"
          required
          hint="E.g. Near Ojota bus stop, opposite First Bank"
        >
          <TextInput
            id="address"
            value={data.address}
            onChange={(e) => update({ address: e.target.value })}
            placeholder="Enter an address or nearby landmark"
          />
        </FieldGroup>

        <button
          type="button"
          onClick={useCurrentLocation}
          disabled={locating || data.useCurrentLocation}
          className="flex items-center gap-2 text-small font-semibold text-lagos-blue disabled:text-lagos-green"
        >
          {data.useCurrentLocation ? (
            <>
              <CheckCircle2 size={16} />
              Current location added
            </>
          ) : (
            <>
              <LocateFixed size={16} />
              {locating ? "Detecting your location…" : "Use my current location"}
            </>
          )}
        </button>
      </div>

      <StepFooter
        onBack={() => router.push("/report/describe")}
        onContinue={() => router.push("/report/review")}
        continueDisabled={!data.lga || data.address.trim().length === 0}
      />
    </div>
  );
}
