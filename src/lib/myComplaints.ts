"use client";

import { useSyncExternalStore } from "react";
import { buildTimeline, type Complaint } from "./complaints";
import { COMPLAINT_STAGES } from "@/components/ui/StatusBadge";

type StoredComplaint = {
  complaint: Complaint;
  email: string;
};

const COMPLAINTS_KEY = "cg_my_complaints";
const EMAIL_KEY = "cg_last_email";

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function emit() {
  listeners.forEach((callback) => callback());
}

const EMPTY_COMPLAINTS: StoredComplaint[] = [];

let cachedRaw: string | null = null;
let cachedParsed: StoredComplaint[] = EMPTY_COMPLAINTS;

function getSnapshot(): StoredComplaint[] {
  const raw = localStorage.getItem(COMPLAINTS_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedParsed = raw ? JSON.parse(raw) : EMPTY_COMPLAINTS;
    } catch {
      cachedParsed = EMPTY_COMPLAINTS;
    }
  }
  return cachedParsed;
}

function getServerSnapshot(): StoredComplaint[] {
  return EMPTY_COMPLAINTS;
}

/**
 * Complaints submitted in this browser, filtered to the ones tied to
 * `email` (case-insensitive) — mirrors real-world "sign in with the same
 * email you complained with" access, without a real backend.
 */
/**
 * Complaints saved before the five-stage status model was introduced can be
 * missing newer fields (or carry a retired status), so fill in sensible
 * defaults rather than rendering `undefined`.
 */
function normalizeComplaint(complaint: Complaint): Complaint {
  const validStatus = COMPLAINT_STAGES.some((s) => s.id === complaint.status);
  return {
    ...complaint,
    status: validStatus ? complaint.status : "submitted",
    submittedDate: complaint.submittedDate ?? complaint.lastUpdated ?? "",
    latestUpdate:
      complaint.latestUpdate ??
      "Your complaint has been submitted through Citizens Gate.",
    timeline:
      complaint.timeline?.length === COMPLAINT_STAGES.length
        ? complaint.timeline
        : buildTimeline([complaint.lastUpdated ?? null, null, null, null, null]),
  };
}

export function useMyComplaints(email: string): Complaint[] {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const normalized = email.trim().toLowerCase();
  if (!normalized) return [];
  return stored
    .filter((entry) => (entry.email ?? "").trim().toLowerCase() === normalized)
    .map((entry) => normalizeComplaint(entry.complaint));
}

export function saveMyComplaint(complaint: Complaint, email: string) {
  const existing = getSnapshot();
  const next = [{ complaint, email }, ...existing];
  cachedRaw = JSON.stringify(next);
  cachedParsed = next;
  localStorage.setItem(COMPLAINTS_KEY, cachedRaw);
  if (email) {
    localStorage.setItem(EMAIL_KEY, email);
  }
  emit();
}

function getEmailSnapshot(): string {
  return localStorage.getItem(EMAIL_KEY) ?? "";
}

function getEmailServerSnapshot(): string {
  return "";
}

export function useLastComplaintEmail() {
  return useSyncExternalStore(subscribe, getEmailSnapshot, getEmailServerSnapshot);
}
