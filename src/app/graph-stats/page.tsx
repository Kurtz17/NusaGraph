import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StatsSection } from "@/components/sections/StatsSection";
import { getGraphStats } from "@/lib/api";

export const metadata: Metadata = {
  title: "Graph Stats | NusaGraph",
  description: "Knowledge graph statistics for the NusaGraph prototype.",
};

export default async function GraphStatsPage() {
  const stats = await getGraphStats();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <StatsSection stats={stats} />
      </main>
      <Footer />
    </div>
  );
}
