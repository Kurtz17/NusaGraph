import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const results = [
  ["Gunung Merapi", "Volcano", "T.VLC"],
  ["Yogyakarta", "Administrative seat", "P.PPLA"],
  ["Pulau Jawa", "Island", "T.ISL"],
];

const relations = [
  ["Gunung Merapi", "hasFeatureCode", "T.VLC"],
  ["Yogyakarta", "isPartOf", "Indonesia"],
  ["Pulau Jawa", "rdf:type", "gn:Feature"],
];

const metrics = ["38 Provinces", "RDF + SPARQL", "GeoNames Ontology"];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(to_bottom,#f8fafc,#ffffff)] px-6 py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(520px,1fr)]">
        <div>
          <Badge tone="teal">Semantic Geography Explorer</Badge>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 md:text-6xl">
            Explore Indonesia Through Semantic Knowledge Graphs
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            NusaGraph helps users search, inspect, and understand Indonesian
            geographic entities through RDF, GeoNames Ontology, SPARQL queries,
            and interactive semantic relationships.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/search"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-teal-700 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
            >
              Start Exploring
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/knowledge-graph"
              className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              View Knowledge Graph
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {metrics.map((metric) => (
              <span
                key={metric}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600"
              >
                <CheckCircle2 className="h-4 w-4 text-teal-700" aria-hidden="true" />
                {metric}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
          <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-950">
                Live semantic workspace
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Search results mapped to RDF entities and relations
              </p>
            </div>
            <Badge tone="amber">SPARQL-ready</Badge>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.92fr_1fr]">
            <div className="space-y-3">
              {results.map(([name, type, code]) => (
                <div
                  key={name}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-950">{name}</p>
                      <p className="mt-1 text-sm text-slate-500">{type}</p>
                    </div>
                    <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700">
                      {code}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="mb-4 text-xs font-semibold uppercase text-slate-500">
                Relationship panel
              </p>
              <div className="space-y-4">
                {relations.map(([source, predicate, target]) => (
                  <div key={`${source}-${predicate}`} className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-full bg-slate-950 px-2.5 py-1 font-medium text-white">
                        {source}
                      </span>
                      <span className="text-slate-400">-&gt;</span>
                      <span className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 font-medium text-teal-800">
                        {predicate}
                      </span>
                      <span className="text-slate-400">-&gt;</span>
                      <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 font-medium text-amber-700">
                        {target}
                      </span>
                    </div>
                    <div className="h-px bg-slate-100" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-200 pt-4 text-xs font-medium text-slate-500">
            <span>Query response</span>
            <span aria-hidden="true">·</span>
            <span>RDF triples</span>
            <span aria-hidden="true">·</span>
            <span>Entity relations</span>
          </div>
        </div>
      </div>
    </section>
  );
}
