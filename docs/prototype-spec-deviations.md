# Deviations from Citizens_Gate_Frontend_Prototype_Dashboard and Reporting_Flow.docx

These are intentional departures from the spec doc, decided during implementation.

1. **Header sign-in entry point (spec §3).** Not added. The header nav stays as-is (Services / Quick Access / Team / About / Resources / Contact) with no dedicated "Sign in" link. The only entry point into sign-in/sign-up is "Track my complaint".

2. **Confirmation page CTA (spec §5).** Kept as "Track my complaint" (primary) / "Return to Citizens Gate" (secondary) instead of switching the primary CTA to "Create an account". Judged as the better call to action.

3. **Complaint reference number format (spec §8, §10).** Kept as the existing `TKGY-53912` style (`TK` + 2 random letters + 5 digits) instead of switching to `CG-2026-004821`.

4. **Status stages (spec §8).** Kept at 4 stages — Received → Assigned → In review → Resolved — instead of the spec's 6-stage Submitted / Received / Under review / Assigned / In progress / Resolved.

5. **Track My Complaints entry point (spec §7), implemented.** Clicking "Track my complaint" from the homepage now shows a real **Sign in** screen by default (email + password, "Sign in" CTA), with a "Don't have an account? Sign up" toggle to the full signup form (name + email + password). If the visitor just submitted a complaint in this browser (their email is already known), the form defaults to the signup view instead, keeping the existing "We've matched your account to the complaint you just submitted" messaging. Both modes accept any input per the prototype's no-real-auth rule.
