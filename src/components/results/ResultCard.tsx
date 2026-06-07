import Link from "next/link";
import { ArrowUpRight, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatCoordinate, formatNumber } from "@/lib/utils";
import type { GeographicEntity } from "@/types/geographic";

type ResultCardProps = {
  entity: GeographicEntity;
  selected?: boolean;
  onSelect?: (entity: GeographicEntity) => void;
};

export function ResultCard({ entity, selected, onSelect }: ResultCardProps) {
  return (
    <Card
      interactive
      className={selected ? "border-teal-300 ring-4 ring-teal-100" : ""}
    >
      <button
        type="button"
        onClick={() => onSelect?.(entity)}
        className="block w-full p-5 text-left"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-slate-950">
                {entity.name}
              </h3>
              <Badge tone="teal">{entity.featureClass}</Badge>
              <Badge tone="emerald">{entity.featureCode}</Badge>
            </div>
            <p className="mt-2 text-sm text-slate-600">{entity.featureType}</p>
          </div>
          <Link
            href={`/entities/${entity.id}`}
            className="inline-flex items-center gap-1 rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700"
            onClick={(event) => event.stopPropagation()}
          >
            View Detail
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-teal-600" aria-hidden="true" />
            {entity.province ?? "Unknown province"}
          </span>
          <span>
            {formatCoordinate(entity.latitude)},{" "}
            {formatCoordinate(entity.longitude)}
          </span>
          <span className="inline-flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            {formatNumber(entity.population)}
          </span>
        </div>
      </button>
    </Card>
  );
}
