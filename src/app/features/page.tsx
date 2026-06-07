import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { FeaturesSection } from "@/components/sections/FeaturesSection";

export const metadata: Metadata = {
  title: "Capabilities | NusaGraph",
  description: "Core front-end capabilities of the NusaGraph prototype.",
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
