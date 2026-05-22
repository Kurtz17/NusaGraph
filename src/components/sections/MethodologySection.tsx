import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  "GeoNames Data Acquisition",
  "Data Cleaning & Filtering",
  "Ontology Modeling",
  "RDF Conversion",
  "SPARQL Endpoint",
  "Web Interface",
];

export function MethodologySection() {
  return (
    <section id="methodology" className="border-b border-slate-200 bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Methodology"
          title="From raw geographic records to queryable semantic relations"
          description="From raw GeoNames data to RDF triples, NusaGraph provides an interface for exploring Indonesian geographic knowledge through semantic technologies."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white shadow-sm">
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold text-slate-950">{step}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {index === 0
                  ? "Collect source records and place identifiers for Indonesian geographic entities."
                  : index === 1
                    ? "Normalize names, coordinates, feature classes, and administrative references."
                    : index === 2
                      ? "Map entities into GeoNames ontology concepts and semantic predicates."
                      : index === 3
                        ? "Convert cleaned geographic records into RDF triples for graph storage."
                        : index === 4
                          ? "Expose semantic query capabilities through a SPARQL-ready service layer."
                          : "Provide search, detail, map, and query explorer interfaces for users."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
