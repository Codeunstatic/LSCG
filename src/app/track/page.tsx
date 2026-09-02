"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { useMockAuth } from "@/lib/useMockAuth";
import { useLastComplaintEmail } from "@/lib/myComplaints";
import { FieldGroup, TextInput } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function TrackEntryPage() {
  const router = useRouter();
  const { authed, signIn } = useMockAuth();
  const lastEmail = useLastComplaintEmail();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailValue = email || lastEmail;

  useEffect(() => {
    if (authed) router.replace("/track/dashboard");
  }, [authed, router]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    signIn(name.trim() || "Resident", emailValue);
    router.push("/track/dashboard");
  }

  if (authed) return null;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-lagos-blue/10 text-lagos-blue">
        <UserPlus size={24} />
      </span>
      <h1 className="mt-5 text-center text-h2 text-deep-navy">
        Create your account
      </h1>
      <p className="mt-2 text-center text-body text-text-secondary">
        {lastEmail
          ? "We've matched your account to the complaint you just submitted."
          : "Save your complaints and follow their progress from one place."}
      </p>

      <Card className="mt-8 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <FieldGroup label="Name" htmlFor="name" required>
            <TextInput
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </FieldGroup>
          <FieldGroup label="Email" htmlFor="email" required>
            <TextInput
              id="email"
              type="email"
              value={emailValue}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </FieldGroup>
          <FieldGroup label="Password" htmlFor="password" required>
            <TextInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </FieldGroup>
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>
      </Card>
    </div>
  );
}
