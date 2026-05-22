import { Compass, DatabaseZap, MapPinned, Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

const features = [
  {
    title: "Semantic Search",
    description:
      "Search places using names, alternative names, feature types, and administrative relations.",
    icon: Search,
  },
  {
    title: "GeoNames Ontology",
    description:
      "Built around GeoNames concepts such as features, coordinates, feature classes, and geographic identifiers.",
    icon: Compass,
  },
  {
    title: "SPARQL Exploration",
    description:
      "Preview and run semantic query templates designed for RDF-based geographic data.",
    icon: DatabaseZap,
  },
  {
    title: "Interactive Map",
    description:
      "Visualize search results and entity details using coordinate-based map markers.",
    icon: MapPinned,
  },
];

export function FeaturesSection() {
  return (
    <section className="border-b border-slate-200 bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Core capabilities"
          title="Designed for semantic geographic exploration"
          description="NusaGraph focuses on place discovery, RDF-friendly metadata, and simple spatial context without becoming a full GIS platform."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="p-6" interactive>
                <span className="mb-5 inline-flex rounded-2xl bg-slate-50 p-3 text-slate-900 ring-1 ring-slate-200">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-slate-950">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
