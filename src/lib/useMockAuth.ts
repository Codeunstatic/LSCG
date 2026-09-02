"use client";

import { useSyncExternalStore } from "react";

const KEY = "cg_authed";
const NAME_KEY = "cg_name";
const EMAIL_KEY = "cg_signed_in_email";

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function emit() {
  listeners.forEach((callback) => callback());
}

function getAuthedSnapshot(): boolean {
  return localStorage.getItem(KEY) === "1";
}

function getAuthedServerSnapshot(): null {
  return null;
}

function getNameSnapshot(): string {
  return localStorage.getItem(NAME_KEY) ?? "";
}

function getNameServerSnapshot(): string {
  return "";
}

function getEmailSnapshot(): string {
  return localStorage.getItem(EMAIL_KEY) ?? "";
}

function getEmailServerSnapshot(): string {
  return "";
}

export function useMockAuth() {
  const authed = useSyncExternalStore(
    subscribe,
    getAuthedSnapshot,
    getAuthedServerSnapshot,
  );
  const name = useSyncExternalStore(subscribe, getNameSnapshot, getNameServerSnapshot);
  const email = useSyncExternalStore(subscribe, getEmailSnapshot, getEmailServerSnapshot);

  function signIn(displayName: string, signedInEmail: string) {
    localStorage.setItem(KEY, "1");
    localStorage.setItem(NAME_KEY, displayName);
    localStorage.setItem(EMAIL_KEY, signedInEmail.trim().toLowerCase());
    emit();
  }

  function signOut() {
    localStorage.removeItem(KEY);
    localStorage.removeItem(NAME_KEY);
    localStorage.removeItem(EMAIL_KEY);
    emit();
  }

  return { authed, name, email, signIn, signOut };
}
