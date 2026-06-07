import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { SparqlExplorer } from '@/components/sparql/SparqlExplorer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SPARQL Explorer | NusaGraph',
  description: 'Run SPARQL query templates for NusaGraph.',
};

export default function SparqlPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <SparqlExplorer />
      </main>
      <Footer />
    </div>
  );
}
