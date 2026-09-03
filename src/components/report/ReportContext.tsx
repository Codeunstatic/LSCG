"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";

export type IssueCategory =
  | "roads"
  | "traffic"
  | "water"
  | "waste"
  | "buildings"
  | "health"
  | "electricity"
  | "other";

export type ReportData = {
  category: IssueCategory | null;
  description: string;
  attachmentNames: string[];
  lga: string;
  address: string;
  useCurrentLocation: boolean;
  email: string;
  phone: string;
  routedMda: string | null;
  routedDepartment: string | null;
};

const emptyReport: ReportData = {
  category: null,
  description: "",
  attachmentNames: [],
  lga: "",
  address: "",
  useCurrentLocation: false,
  email: "",
  phone: "",
  routedMda: null,
  routedDepartment: null,
};

const STORAGE_KEY = "citizens-gate-report-draft";

const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedParsed: ReportData = emptyReport;

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function emit() {
  listeners.forEach((callback) => callback());
}

function getSnapshot(): ReportData {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedParsed = raw ? { ...emptyReport, ...JSON.parse(raw) } : emptyReport;
    } catch {
      cachedParsed = emptyReport;
    }
  }
  return cachedParsed;
}

function getServerSnapshot(): ReportData {
  return emptyReport;
}

function commit(next: ReportData) {
  cachedRaw = JSON.stringify(next);
  cachedParsed = next;
  sessionStorage.setItem(STORAGE_KEY, cachedRaw);
  emit();
}

type ReportContextValue = {
  data: ReportData;
  update: (patch: Partial<ReportData>) => void;
  reset: () => void;
};

const ReportContext = createContext<ReportContextValue | null>(null);

/**
 * Generates a fresh ticket id. Must only be called client-side (e.g. inside
 * an effect) — it uses Math.random(), so calling it during render would
 * produce a different value on the server than on the client and break
 * hydration.
 */
export function generateTicketId() {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const rand = (n: number) =>
    Array.from({ length: n }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
  const digits = Math.floor(10000 + Math.random() * 89999);
  return `TK${rand(2)}-${digits}`;
}

export function ReportProvider({ children }: { children: ReactNode }) {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function update(patch: Partial<ReportData>) {
    commit({ ...getSnapshot(), ...patch });
  }

  function reset() {
    sessionStorage.removeItem(STORAGE_KEY);
    commit(emptyReport);
  }

  return (
    <ReportContext.Provider value={{ data, update, reset }}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReport() {
  const ctx = useContext(ReportContext);
  if (!ctx) throw new Error("useReport must be used within ReportProvider");
  return ctx;
}

export const categoryLabels: Record<IssueCategory, string> = {
  roads: "Roads & bridges",
  traffic: "Traffic & public transport",
  water: "Water & drainage",
  waste: "Waste & environment",
  buildings: "Buildings & housing",
  health: "Public health",
  electricity: "Electricity & utilities",
  other: "I'm not sure",
};
