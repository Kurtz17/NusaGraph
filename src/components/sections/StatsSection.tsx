import { BarChart3, GitFork, Landmark, Map, Mountain, Rows3 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatNumber } from "@/lib/utils";
import type { GraphStats } from "@/types/geographic";

type StatsSectionProps = {
  stats: GraphStats;
};

const statMeta = [
  { key: "totalEntities", label: "Total entities", icon: Map },
  { key: "totalTriples", label: "Total RDF triples", icon: Rows3 },
  { key: "totalProvinces", label: "Total provinces", icon: Landmark },
  { key: "totalNaturalFeatures", label: "Natural features", icon: Mountain },
  { key: "totalAdministrativeRegions", label: "Administrative regions", icon: BarChart3 },
  { key: "totalSemanticRelations", label: "Semantic relations", icon: GitFork },
] as const;

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section id="stats" className="border-b border-slate-200 bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Knowledge graph stats"
          title="A compact view of Indonesia's semantic geography layer"
          description="The current prototype uses mock figures shaped like the future backend response, so the UI can be integrated with real RDF and SPARQL services later."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {statMeta.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.key} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-slate-950">
                      {formatNumber(stats[item.key])}
                    </p>
                  </div>
                  <span className="rounded-2xl bg-slate-50 p-3 text-teal-700 ring-1 ring-slate-200">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
