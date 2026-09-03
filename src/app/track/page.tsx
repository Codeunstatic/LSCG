"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useMockAuth } from "@/lib/useMockAuth";
import { useLastComplaintEmail } from "@/lib/myComplaints";
import { FieldGroup, TextInput } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Mode = "signin" | "signup" | "verify";

const CODE_EXPIRY_SECONDS = 300;

function deriveNameFromEmail(email: string) {
  const local = email.split("@")[0] || "Resident";
  return local.charAt(0).toUpperCase() + local.slice(1);
}

function formatCountdown(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const rest = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function VerifyEmailStep({
  email,
  onVerified,
  onBack,
}: {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}) {
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(CODE_EXPIRY_SECONDS);
  const [justResent, setJustResent] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const expired = secondsLeft === 0;

  function handleResend() {
    setSecondsLeft(CODE_EXPIRY_SECONDS);
    setCode("");
    setJustResent(true);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    onVerified();
  }

  return (
    <>
      <h1 className="text-center text-h3 font-semibold text-deep-navy">Verify your email</h1>
      <p className="mt-2 text-center text-body text-text-secondary">
        We&apos;ve sent a 6-digit verification code to{" "}
        <span className="font-medium text-deep-navy">{email}</span>.
      </p>

      <Card className="mt-8 p-6 shadow-none">
        <form onSubmit={handleSubmit} className="space-y-5">
          <FieldGroup label="Verification code" htmlFor="code" required>
            <TextInput
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="000000"
              inputMode="numeric"
              maxLength={6}
              autoFocus
              required
              className="text-center text-h3 tracking-[0.3em]"
            />
          </FieldGroup>

          <p className="text-center text-small text-text-secondary">
            {expired ? (
              <span className="font-medium text-error">
                Your code has expired.
              </span>
            ) : (
              <>Code expires in {formatCountdown(secondsLeft)}</>
            )}
          </p>

          <Button type="submit" className="w-full" disabled={!code.trim()}>
            Verify
          </Button>
        </form>
      </Card>

      <div className="mt-5 text-center text-small text-text-secondary">
        <button
          type="button"
          onClick={handleResend}
          className="cursor-pointer font-semibold text-lagos-blue hover:text-lagos-blue-dark"
        >
          Resend code
        </button>
        {justResent && (
          <p className="mt-2 text-caption text-lagos-green-dark">
            A new code has been sent to {email}.
          </p>
        )}
        <p className="mt-3">
          Wrong email?{" "}
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer font-semibold text-lagos-blue hover:text-lagos-blue-dark"
          >
            Go back
          </button>
        </p>
      </div>
    </>
  );
}

export default function TrackEntryPage() {
  const router = useRouter();
  const { authed, signIn } = useMockAuth();
  const lastEmail = useLastComplaintEmail();
  const [mode, setMode] = useState<Mode>(lastEmail ? "signup" : "signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailValue = email || lastEmail;

  useEffect(() => {
    if (authed) router.replace("/track/dashboard");
  }, [authed, router]);

  function completeSignIn(displayName: string) {
    signIn(displayName, emailValue);
    router.push("/track/dashboard");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (mode === "signup") {
      setMode("verify");
      return;
    }
    completeSignIn(deriveNameFromEmail(emailValue));
  }

  if (authed) return null;

  const isSignup = mode === "signup";

  return (
    <div className="mx-auto flex min-h-full max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      {mode === "verify" ? (
        <VerifyEmailStep
          email={emailValue}
          onVerified={() => completeSignIn(name.trim() || "Resident")}
          onBack={() => setMode("signup")}
        />
      ) : (
        <>
          <h1 className="text-center text-h3 font-semibold text-deep-navy">
            {isSignup ? "Create your account" : "Sign in to track your complaints"}
          </h1>
          <p className="mt-2 text-center text-body text-text-secondary">
            {isSignup
              ? "Create an account to save your complaints and follow their progress in one place."
              : "Sign in to view your complaint history and track the progress of your reports."}
          </p>

          <Card className="mt-8 p-6 shadow-none">
            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignup && (
                <FieldGroup label="Name" htmlFor="name" required>
                  <TextInput
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </FieldGroup>
              )}
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
                  placeholder={isSignup ? "Create a password" : "Enter your password"}
                  required
                />
              </FieldGroup>
              <Button type="submit" className="w-full">
                {isSignup ? "Create account" : "Sign in"}
              </Button>
            </form>
          </Card>

          <p className="mt-5 text-center text-small text-text-secondary">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="cursor-pointer font-semibold text-lagos-blue hover:text-lagos-blue-dark"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="cursor-pointer font-semibold text-lagos-blue hover:text-lagos-blue-dark"
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </>
      )}
    </div>
  );
}
