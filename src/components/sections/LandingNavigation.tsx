import Link from "next/link";
import { BarChart3, Database, GitBranch, Map, Search, Workflow } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

const pages = [
  {
    title: "Semantic Search",
    description: "Search Indonesian geographic entities with filters and map context.",
    href: "/search",
    icon: Search,
  },
  {
    title: "Knowledge Graph",
    description: "Inspect entity relations generated from the geographic dataset.",
    href: "/knowledge-graph",
    icon: GitBranch,
  },
  {
    title: "Graph Statistics",
    description: "Review summary metrics for entities, triples, and semantic relations.",
    href: "/graph-stats",
    icon: BarChart3,
  },
  {
    title: "SPARQL Explorer",
    description: "Open query templates and preview endpoint-ready result shapes.",
    href: "/sparql",
    icon: Database,
  },
  {
    title: "Methodology",
    description: "See the project flow from GeoNames data to web interface.",
    href: "/methodology",
    icon: Workflow,
  },
  {
    title: "Capabilities",
    description: "Understand the prototype scope and main front-end modules.",
    href: "/features",
    icon: Map,
  },
];

export function LandingNavigation() {
  return (
    <section className="border-b border-slate-200 bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Workspace modules"
          title="Navigate the NusaGraph prototype"
          description="Each core experience lives on its own page so the interface feels focused and easier to integrate with backend services later."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <Link key={page.href} href={page.href}>
                <Card className="h-full p-6" interactive>
                  <span className="mb-5 inline-flex rounded-2xl bg-slate-50 p-3 text-teal-700 ring-1 ring-slate-200">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="text-lg font-semibold text-slate-950">
                    {page.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {page.description}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
