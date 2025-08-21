// src/app/page.tsx
import { Metadata } from "next";
import Achievements from "./components/home/achievements";
import Brand from "./components/home/brand";
import CreativeMind from "./components/home/creative-mind";
import Faq from "./components/home/faq";
import HeroSection from "./components/home/hero";
import Innovation from "./components/home/innovation";
import OnlinePresence from "./components/home/online-presence";
import Solutions from "./components/home/solution";
import EducationalPillars from "./components/home/web-result";

export const metadata: Metadata = {
    title: "UX/UI Hub - Informational Portal for User Experience and Interface Design",
    description: "Discover the world of UX/UI Design. Case studies, pioneers, tools, and resources to understand user-centered design.",
};

export default function Home() {
  return (
    <main>
      {/* Hero section */}
      <HeroSection />

      {/* Brand/Tools section */}
      <Brand />

      {/* About UX/UI section */}
      <EducationalPillars />

      {/* UX/UI Areas section */}
      <Innovation />

      {/* Case Studies section */}
      <OnlinePresence />

      {/* UX/UI Pioneers section */}
      <CreativeMind />

      {/* FAQ section */}
      <Faq />

      {/* Historical Milestones section */}
      <Achievements />

      {/* CTA section */}
      <Solutions />
    </main>
  )
}