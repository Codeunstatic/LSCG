"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { UtilityBar } from "./UtilityBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MinimalHeader } from "./MinimalHeader";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/track/dashboard");
  const isTrackEntry = pathname === "/track";

  if (isDashboard) {
    return <main className="flex-1">{children}</main>;
  }

  if (isTrackEntry) {
    return (
      <>
        <MinimalHeader />
        <main className="flex-1">{children}</main>
      </>
    );
  }

  return (
    <>
      <UtilityBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
