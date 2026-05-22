import { mockEntities } from "@/data/mock-entities";
import type {
  GeographicEntity,
  GraphStats,
  SearchFilters,
} from "@/types/geographic";

const delay = (ms = 280) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

function matchesText(entity: GeographicEntity, query: string) {
  const keyword = query.trim().toLowerCase();

  if (!keyword) {
    return true;
  }

  const searchable = [
    entity.name,
    entity.province,
    entity.featureType,
    entity.featureClass,
    entity.featureCode,
    entity.parentFeature,
    entity.description,
    ...entity.alternateNames,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchable.includes(keyword);
}

function matchesFilters(entity: GeographicEntity, filters: SearchFilters) {
  return (
    (!filters.province || entity.province === filters.province) &&
    (!filters.featureType || entity.featureType === filters.featureType) &&
    (!filters.featureClass || entity.featureClass === filters.featureClass) &&
    (!filters.featureCode || entity.featureCode === filters.featureCode) &&
    (!filters.minPopulation ||
      (entity.population ?? 0) >= filters.minPopulation)
  );
}

// TODO: Replace this mock implementation with real backend/SPARQL endpoint integration.
// Example future endpoint:
// GET /api/entities/search?q=...
// GET /api/entities/:id
// GET /api/graph/stats
// POST /api/sparql
export async function searchEntities(
  query: string,
  filters: SearchFilters = {},
): Promise<GeographicEntity[]> {
  await delay();

  return mockEntities.filter(
    (entity) => matchesText(entity, query) && matchesFilters(entity, filters),
  );
}

export async function getEntityById(
  id: string,
): Promise<GeographicEntity | null> {
  await delay(120);

  return mockEntities.find((entity) => entity.id === id) ?? null;
}

export async function getGraphStats(): Promise<GraphStats> {
  await delay(120);

  const totalNaturalFeatures = mockEntities.filter((entity) =>
    ["H", "T"].includes(entity.featureClass),
  ).length;

  return {
    totalEntities: 15428,
    totalTriples: 421760,
    totalProvinces: 38,
    totalNaturalFeatures,
    totalAdministrativeRegions: 7420,
    totalSemanticRelations: 128390,
  };
}

export async function runSparqlQuery(
  query: string,
): Promise<Record<string, string | number>[]> {
  await delay(420);

  const keywordMatch = query.match(/"([^"]+)"/);
  const keyword = keywordMatch?.[1] ?? "";
  const results = await searchEntities(keyword, {});

  return results.slice(0, 8).map((entity) => ({
    name: entity.name,
    uri: entity.uri,
    featureClass: entity.featureClass,
    featureCode: entity.featureCode,
    lat: entity.latitude,
    long: entity.longitude,
    province: entity.province ?? "-",
  }));
}
