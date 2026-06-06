import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { formatCoordinate, formatNumber } from '@/lib/utils';
import type { GeographicEntity } from '@/types/geographic';

type EntityMetadataProps = {
  entity: GeographicEntity;
};

const metadataRows = (entity: GeographicEntity) => [
  ['GeoNames ID', entity.geonameId],
  ['Latitude', formatCoordinate(entity.latitude)],
  ['Longitude', formatCoordinate(entity.longitude)],
  ['Country code', entity.countryCode],
  ['Timezone', entity.timezone],
  ['Province / admin area', entity.province ?? 'Unknown'],
  ['Population', formatNumber(entity.population)],
  ['Parent feature', entity.parentFeature ?? 'Unknown'],
  ['Feature code meaning', entity.featureCodeName ?? 'Unknown'],
];

export function EntityMetadata({ entity }: EntityMetadataProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-wrap gap-2">
        <Badge tone="teal">Class {entity.featureClass}</Badge>
        <Badge tone="emerald">Code {entity.featureCode}</Badge>
        <Badge>{entity.featureType}</Badge>
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        {metadataRows(entity).map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              {label}
            </dt>
            <dd className="mt-2 text-sm font-medium text-slate-900">{value}</dd>
          </div>
        ))}
      </dl>

      {entity.featureCodeDescription ? (
        <div className="mt-4 rounded-2xl bg-teal-50 p-4 ring-1 ring-teal-100">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">
            Feature code description
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-800">
            {entity.featureCodeDescription}
          </p>
        </div>
      ) : null}
    </Card>
  );
}
