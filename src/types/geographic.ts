export type GeographicEntity = {
  id: string;
  geonameId: string;
  uri: string;
  name: string;
  alternateNames: string[];
  latitude: number;
  longitude: number;
  countryCode: "ID";
  timezone: string;
  featureClass: string;
  featureCode: string;
  featureType: string;
  province?: string;
  population?: number;
  parentFeature?: string;
  description?: string;
};

export type SearchFilters = {
  province?: string;
  featureType?: string;
  featureClass?: string;
  featureCode?: string;
  minPopulation?: number;
};

export type GraphStats = {
  totalEntities: number;
  totalTriples: number;
  totalProvinces: number;
  totalNaturalFeatures: number;
  totalAdministrativeRegions: number;
  totalSemanticRelations: number;
};

export type SparqlTemplate = {
  id: string;
  name: string;
  description: string;
  query: string;
};
