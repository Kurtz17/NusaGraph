import { KnowledgeGraphWorkspace } from '@/components/graph/KnowledgeGraphWorkspace';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/Badge';
import { searchEntities } from '@/lib/api';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Knowledge Graph | NusaGraph',
  description:
    'Explore semantic relationships between Indonesian geographic entities in NusaGraph.',
};

export default async function KnowledgeGraphPage() {
  const entities = await searchEntities('', {});

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <section className="border-b border-slate-200 bg-white px-6 py-10">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition hover:text-teal-800"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to homepage
            </Link>
            <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Badge tone="teal">Knowledge Graph</Badge>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  Semantic relationship workspace
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                  A research-oriented graph view for inspecting entity
                  relations, feature codes, administrative context, and RDF-like
                  semantic structure.
                </p>
              </div>
              <div className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Controls preview
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-5 flex flex-wrap gap-2">
              <Badge tone="slate">Show labels</Badge>
              <Badge tone="slate">Entity relations</Badge>
              <Badge tone="slate">Feature codes</Badge>
              <Badge tone="amber">Fuseki-backed graph</Badge>
            </div>
            <KnowledgeGraphWorkspace entities={entities} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
