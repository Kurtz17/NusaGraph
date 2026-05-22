import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { LandingNavigation } from "@/components/sections/LandingNavigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <HeroSection />
        <LandingNavigation />
      </main>
      <Footer />
    </div>
  );
}
