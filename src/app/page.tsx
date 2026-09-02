import { Hero } from "@/components/home/Hero";
import { CitizenServices } from "@/components/home/CitizenServices";
import { GovernmentServices } from "@/components/home/GovernmentServices";
import { QuickAccess } from "@/components/home/QuickAccess";
import { WhatYouCanReport } from "@/components/home/WhatYouCanReport";
import { PlatformGuide } from "@/components/home/PlatformGuide";
import { CitizenStories } from "@/components/home/CitizenStories";
import { AboutSection } from "@/components/home/AboutSection";
import { Leadership } from "@/components/home/Leadership";
import { ClosingCta } from "@/components/home/ClosingCta";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <CitizenServices />
      <GovernmentServices />
      <QuickAccess />
      <WhatYouCanReport />
      <PlatformGuide />
      <CitizenStories />
      <Leadership />
      <ClosingCta />
    </>
  );
}
