import { Code, Database, Map, Network, Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

const scopes = [
  {
    title: "Semantic Search Interface",
    description:
      "Search and filter Indonesian geographic entities through an integration-ready UI.",
    icon: Search,
  },
  {
    title: "GeoNames-Based Knowledge Graph",
    description:
      "Represent places, feature classes, coordinates, and identifiers using GeoNames concepts.",
    icon: Network,
  },
  {
    title: "RDF & SPARQL Exploration",
    description:
      "Preview query templates and mock results before connecting the real SPARQL endpoint.",
    icon: Database,
  },
  {
    title: "Interactive Geographic Visualization",
    description:
      "Display search results and entity details on marker-based Indonesia maps.",
    icon: Map,
  },
];

export function ProjectScopeSection() {
  return (
    <section className="bg-slate-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Project scope"
          title="What we build"
          description="The prototype focuses on front-end readiness for semantic geographic search, with mock data shaped for future backend and SPARQL integration."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {scopes.map((scope) => {
            const Icon = scope.icon;
            return (
              <Card key={scope.title} className="p-6" interactive>
                <span className="mb-5 inline-flex rounded-2xl bg-slate-50 p-3 text-teal-700 ring-1 ring-slate-200">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-slate-950">
                  {scope.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {scope.description}
                </p>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <span className="inline-flex w-fit rounded-2xl bg-amber-50 p-3 text-amber-600 ring-1 ring-amber-100">
              <Code className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-slate-950">
                Project context
              </h3>
              <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-600">
                NusaGraph was created for the Semantic Web final project titled
                Pembangunan Knowledge Graph Geografis Indonesia Berbasis
                Ontologi GeoNames untuk Pencarian Semantik dan Eksplorasi
                Relasi Spasial Menggunakan RDF dan SPARQL.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
