import { notFound } from "next/navigation";
import { EntityDetailPanel } from "@/components/entity/EntityDetailPanel";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import { getEntityById, searchEntities } from "@/lib/api";

type EntityPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  const entities = await searchEntities("", {});

  return entities.map((entity) => ({
    id: entity.id,
  }));
}

export async function generateMetadata({ params }: EntityPageProps) {
  const { id } = await params;
  const entity = await getEntityById(id);

  return {
    title: entity ? `${entity.name} | NusaGraph` : "Entity | NusaGraph",
    description: entity?.description ?? "Geographic entity detail in NusaGraph",
  };
}

export default async function EntityPage({ params }: EntityPageProps) {
  const { id } = await params;
  const entity = await getEntityById(id);

  if (!entity) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1fr)]">
          <EntityDetailPanel entity={entity} />
          <div className="lg:sticky lg:top-24 lg:self-start">
            <InteractiveMap
              entities={[entity]}
              selectedEntity={entity}
              height="620px"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
