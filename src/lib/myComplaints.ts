"use client";

import { useSyncExternalStore } from "react";
import type { Complaint } from "./complaints";

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
export function useMyComplaints(email: string): Complaint[] {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const normalized = email.trim().toLowerCase();
  if (!normalized) return [];
  return stored
    .filter((entry) => entry.email.trim().toLowerCase() === normalized)
    .map((entry) => entry.complaint);
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
