import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { ProjectScopeSection } from "@/components/about/ProjectScopeSection";
import { TeamSection } from "@/components/about/TeamSection";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "About NusaGraph",
  description:
    "Meet the team behind the Indonesian Semantic Geographic Knowledge Graph prototype.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <AboutHero />
        <TeamSection />
        <ProjectScopeSection />
      </main>
      <Footer />
    </div>
  );
}
