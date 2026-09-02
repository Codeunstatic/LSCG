"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  }

  if (subscribed) {
    return (
      <p className="flex items-center gap-2 text-small text-lagos-green">
        <CheckCircle2 size={16} />
        You&apos;re subscribed to the monthly e-Magazine.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="min-w-0 flex-1 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-small text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-lagos-blue/50"
      />
      <button
        type="submit"
        className="shrink-0 rounded-md bg-lagos-blue px-4 py-2 text-small font-semibold text-white transition-colors hover:bg-lagos-blue-dark"
      >
        Subscribe
      </button>
    </form>
  );
}
