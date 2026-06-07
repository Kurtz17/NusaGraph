import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { KnowledgeGraphWorkspace } from "@/components/graph/KnowledgeGraphWorkspace";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { searchEntities } from "@/lib/api";

export async function KnowledgeGraphSection() {
  const { data: entities } = await searchEntities("", {}, 9, 0);

  return (
    <section id="knowledge-graph" className="border-b border-slate-200 bg-slate-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Knowledge Graph"
            title="Inspect semantic relationships as structured data"
            description="Review how entities connect to administrative areas, feature types, feature codes, and RDF-friendly identifiers."
          />
          <Link
            href="/knowledge-graph"
            className="inline-flex h-10 w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            Open graph workspace
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <KnowledgeGraphWorkspace entities={entities} compact />
      </div>
    </section>
  );
}
