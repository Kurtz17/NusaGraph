import { Card } from "@/components/ui/Card";
import type { GeographicEntity } from "@/types/geographic";

type RdfPreviewProps = {
  entity: GeographicEntity;
};

export function RdfPreview({ entity }: RdfPreviewProps) {
  const rdf = `<${entity.uri}> a gn:Feature ;
  gn:name "${entity.name}" ;
  gn:countryCode "${entity.countryCode}" ;
  gn:featureClass "${entity.featureClass}" ;
  gn:featureCode "${entity.featureCode}" ;
  gn:timezone "${entity.timezone}" ;
  geo:lat "${entity.latitude}" ;
  geo:long "${entity.longitude}" .`;

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-slate-950">RDF-like preview</h2>
      <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-sm leading-7 text-slate-100">
        <code>{rdf}</code>
      </pre>
    </Card>
  );
}
