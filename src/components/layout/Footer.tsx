import Link from "next/link";

const tags = ["RDF", "SPARQL", "GeoNames Ontology", "Knowledge Graph"];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <Link href="/" className="text-lg font-bold text-white">
            NusaGraph
          </Link>
          <p className="mt-1 text-sm text-slate-300">
            Semantic Geography Explorer
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-slate-300">
          Copyright 2026 NusaGraph. Academic prototype.
        </p>
      </div>
    </footer>
  );
}
