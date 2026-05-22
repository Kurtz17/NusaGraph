import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MethodologySection } from "@/components/sections/MethodologySection";

export const metadata: Metadata = {
  title: "Methodology | NusaGraph",
  description: "NusaGraph methodology from GeoNames data to semantic web interface.",
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <MethodologySection />
      </main>
      <Footer />
    </div>
  );
}
