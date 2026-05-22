import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { GeographicEntity } from "@/types/geographic";

type GraphNodeType = "country" | "province" | "entity" | "featureType" | "featureCode";

type GraphNode = {
  id: string;
  label: string;
  type: GraphNodeType;
  x: number;
  y: number;
  entity?: GeographicEntity;
};

type GraphEdge = {
  from: string;
  to: string;
  label: string;
};

type KnowledgeGraphWorkspaceProps = {
  entities: GeographicEntity[];
  compact?: boolean;
};

const nodeStyles: Record<GraphNodeType, string> = {
  country: "bg-slate-950",
  province: "bg-teal-700",
  entity: "bg-emerald-600",
  featureType: "bg-amber-600",
  featureCode: "bg-slate-500",
};

const legend: Array<[string, GraphNodeType]> = [
  ["Country", "country"],
  ["Province", "province"],
  ["Entity", "entity"],
  ["Feature type", "featureType"],
  ["Feature class / code", "featureCode"],
];

function distribute(index: number, total: number, start: number, end: number) {
  if (total <= 1) {
    return (start + end) / 2;
  }

  return start + (index * (end - start)) / (total - 1);
}

function buildGraph(entities: GeographicEntity[], compact: boolean) {
  const visibleEntities = entities.slice(0, compact ? 5 : 9);
  const provinceNames = Array.from(
    new Set(
      visibleEntities
        .map((entity) => entity.province)
        .filter((province): province is string => Boolean(province)),
    ),
  ).slice(0, compact ? 4 : 6);
  const featureTypes = Array.from(
    new Set(visibleEntities.map((entity) => entity.featureType)),
  ).slice(0, compact ? 3 : 5);

  const nodes: GraphNode[] = [
    {
      id: "country:ID",
      label: "Indonesia",
      type: "country",
      x: 50,
      y: 12,
    },
    ...provinceNames.map((province, index) => ({
      id: `province:${province}`,
      label: province,
      type: "province" as const,
      x: distribute(index, provinceNames.length, 18, 82),
      y: 34,
    })),
    ...visibleEntities.map((entity, index) => ({
      id: `entity:${entity.id}`,
      label: entity.name,
      type: "entity" as const,
      x: distribute(index, visibleEntities.length, 12, 88),
      y: 61,
      entity,
    })),
    ...featureTypes.map((type, index) => ({
      id: `featureType:${type}`,
      label: type,
      type: "featureType" as const,
      x: distribute(index, featureTypes.length, 20, 80),
      y: 84,
    })),
    ...visibleEntities.slice(0, compact ? 2 : 4).map((entity, index) => ({
      id: `featureCode:${entity.featureClass}.${entity.featureCode}`,
      label: `${entity.featureClass}.${entity.featureCode}`,
      type: "featureCode" as const,
      x: distribute(index, Math.min(visibleEntities.length, compact ? 2 : 4), 32, 68),
      y: 94,
    })),
  ];

  const nodeIds = new Set(nodes.map((node) => node.id));
  const edges: GraphEdge[] = [
    ...provinceNames.map((province) => ({
      from: `province:${province}`,
      to: "country:ID",
      label: "isPartOf",
    })),
    ...visibleEntities.flatMap((entity) => {
      const entityId = `entity:${entity.id}`;
      const nextEdges: GraphEdge[] = [];

      if (entity.province && nodeIds.has(`province:${entity.province}`)) {
        nextEdges.push({
          from: entityId,
          to: `province:${entity.province}`,
          label: "locatedIn",
        });
      }

      if (nodeIds.has(`featureType:${entity.featureType}`)) {
        nextEdges.push({
          from: entityId,
          to: `featureType:${entity.featureType}`,
          label: "featureType",
        });
      }

      const featureCodeId = `featureCode:${entity.featureClass}.${entity.featureCode}`;
      if (nodeIds.has(featureCodeId)) {
        nextEdges.push({
          from: entityId,
          to: featureCodeId,
          label: "featureCode",
        });
      }

      return nextEdges;
    }),
  ];

  return { nodes, edges, visibleEntities };
}

function nodeById(nodes: GraphNode[], id: string) {
  return nodes.find((node) => node.id === id);
}

export function KnowledgeGraphWorkspace({
  entities,
  compact = false,
}: KnowledgeGraphWorkspaceProps) {
  const { nodes, edges, visibleEntities } = buildGraph(entities, compact);
  const selectedEntity = visibleEntities[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <Card className="p-5">
        <div className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-950">
              Knowledge graph canvas
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Showing {visibleEntities.length} of {entities.length} entities from
              the current data source
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="teal">Data-driven</Badge>
            <Badge tone="slate">RDF-ready shape</Badge>
          </div>
        </div>

        <div
          className={
            compact
              ? "relative h-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white"
              : "relative h-[560px] overflow-hidden rounded-2xl border border-slate-200 bg-white"
          }
        >
          <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
            {edges.map((edge) => {
              const source = nodeById(nodes, edge.from);
              const target = nodeById(nodes, edge.to);

              if (!source || !target) {
                return null;
              }

              return (
                <g key={`${edge.from}-${edge.to}-${edge.label}`}>
                  <line
                    x1={`${source.x}%`}
                    y1={`${source.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke="#cbd5e1"
                    strokeWidth="1.4"
                  />
                  {!compact ? (
                    <text
                      x={`${(source.x + target.x) / 2}%`}
                      y={`${(source.y + target.y) / 2}%`}
                      fill="#64748b"
                      fontSize="10"
                      textAnchor="middle"
                    >
                      {edge.label}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </svg>

          {nodes.map((node) => (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div className="flex flex-col items-center gap-2">
                <span
                  className={`h-4 w-4 rounded-full ${nodeStyles[node.type]} ring-4 ring-white shadow-sm`}
                />
                <span className="max-w-32 truncate rounded-full border border-slate-200 bg-white px-3 py-1 text-center text-xs font-semibold text-slate-800 shadow-sm">
                  {node.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-4">
        <Card className="p-5">
          <h3 className="text-base font-semibold text-slate-950">
            Data source detail
          </h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-slate-500">Primary entity</dt>
              <dd className="mt-1 font-semibold text-slate-950">
                {selectedEntity?.name ?? "No entity"}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Feature type</dt>
              <dd className="mt-1 text-slate-800">
                {selectedEntity?.featureType ?? "-"}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Feature code</dt>
              <dd className="mt-1 text-slate-800">
                {selectedEntity
                  ? `${selectedEntity.featureClass}.${selectedEntity.featureCode}`
                  : "-"}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Parent feature</dt>
              <dd className="mt-1 text-slate-800">
                {selectedEntity?.parentFeature ?? selectedEntity?.province ?? "-"}
              </dd>
            </div>
          </dl>
        </Card>

        <Card className="p-5">
          <h3 className="text-base font-semibold text-slate-950">Legend</h3>
          <div className="mt-4 space-y-3">
            {legend.map(([label, type]) => (
              <div key={label} className="flex items-center gap-3 text-sm">
                <span className={`h-3 w-3 rounded-full ${nodeStyles[type]}`} />
                <span className="text-slate-600">{label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
