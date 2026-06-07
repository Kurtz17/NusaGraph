import { featureClassInfo, getFeatureClassInfo } from '@/data/feature-classes';
import { getFeatureCodeInfo } from '@/data/feature-codes';
import {
  entitySelectClause,
  escapeSparqlString,
  geonamesPrefixes,
  mapGeonamesRow,
} from '@/lib/geonames';
import {
  bindingValue,
  executeSparqlQuery,
  sparqlRowsToObjects,
} from '@/lib/sparql-client';
import type {
  FeatureCodeFacetOption,
  GeographicEntity,
  GraphStats,
  SearchFacets,
  SearchFilters,
} from '@/types/geographic';

const featureClassByType = Object.fromEntries(
  Object.entries(featureClassInfo).map(([code, info]) => [info.name, code]),
);

function filterClauses(query: string, filters: SearchFilters) {
  const clauses: string[] = [];

  if (query.trim()) {
    clauses.push(
      `FILTER(CONTAINS(LCASE(STR(?name)), LCASE("${escapeSparqlString(query.trim())}")))`,
    );
  }

  if (filters.featureClass) {
    clauses.push(
      `FILTER(STRENDS(STR(?featureClass), "#${escapeSparqlString(filters.featureClass)}"))`,
    );
  } else if (filters.featureType && featureClassByType[filters.featureType]) {
    clauses.push(
      `FILTER(STRENDS(STR(?featureClass), "#${featureClassByType[filters.featureType]}"))`,
    );
  }

  if (filters.featureCode) {
    clauses.push(
      `FILTER(STRENDS(STR(?featureCode), ".${escapeSparqlString(filters.featureCode)}") || STRENDS(STR(?featureCode), "#${escapeSparqlString(filters.featureCode)}"))`,
    );
  }

  if (filters.province) {
    const adminCode = filters.province.replace(/^Admin\s+/i, '');

    clauses.push(`FILTER(?adminCode1 = "${escapeSparqlString(adminCode)}")`);
  }

  if (filters.minPopulation !== undefined) {
    clauses.push(
      `FILTER(xsd:integer(?population) >= ${filters.minPopulation})`,
    );
  }

  return clauses.join('\n  ');
}

function clampLimit(limit: number) {
  return Math.min(Math.max(Math.trunc(limit), 1), 100);
}

function buildSearchQuery(
  query: string,
  filters: SearchFilters,
  limit: number,
) {
  const hasKeyword = Boolean(query.trim());
  const orderClause = hasKeyword ? 'ORDER BY LCASE(STR(?name))' : '';

  return `${geonamesPrefixes}
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?place ?geonameId ?name ?countryCode ?timezone ?lat ?long
       ?featureClass ?featureCode ?featureClassCode ?featureCodeCode
       ?population ?adminCode1 ?adminCode2
WHERE {
  ?place rdf:type gn:Feature ;
         gn:name ?name ;
         gn:countryCode "ID" ;
         gn:featureClass ?featureClass ;
         gn:featureCode ?featureCode ;
         geo:lat ?lat ;
         geo:long ?long .

  OPTIONAL { ?place gn:timezone ?timezone . }
  OPTIONAL { ?place gn:population ?population . }
  OPTIONAL { ?place gn:adminCode1 ?adminCode1 . }
  OPTIONAL { ?place gn:adminCode2 ?adminCode2 . }

  ${filterClauses(query, filters)}

  BIND(REPLACE(STR(?place), "^.*/([0-9]+)/?$", "$1") AS ?geonameId)
  BIND(REPLACE(STR(?featureClass), "^.*#", "") AS ?featureClassCode)
  BIND(REPLACE(REPLACE(STR(?featureCode), "^.*#", ""), "^[^.]+\\\\.", "") AS ?featureCodeCode)
}
${orderClause}
LIMIT ${clampLimit(limit)}`;
}

function buildEntityQuery(id: string) {
  const safeId = escapeSparqlString(id);
  const uri = id.startsWith('http')
    ? id
    : `https://sws.geonames.org/${safeId}/`;

  return `${geonamesPrefixes}

${entitySelectClause}
  FILTER(?place = <${uri}> || ?geonameId = "${safeId}")
}
LIMIT 1`;
}

async function count(query: string) {
  const result = await executeSparqlQuery(query);
  const value = bindingValue(result.results.bindings[0] ?? {}, 'count');

  return Number(value ?? 0);
}

export async function searchEntities(
  query: string,
  filters: SearchFilters = {},
  limit = query.trim() ? 50 : 50,
): Promise<GeographicEntity[]> {
  const result = await executeSparqlQuery(
    buildSearchQuery(query, filters, limit),
  );

  return result.results.bindings.map(mapGeonamesRow);
}

export async function getEntityById(
  id: string,
): Promise<GeographicEntity | null> {
  const result = await executeSparqlQuery(buildEntityQuery(id));
  const row = result.results.bindings[0];

  return row ? mapGeonamesRow(row) : null;
}

export async function getGraphStats(): Promise<GraphStats> {
  const [
    totalEntities,
    totalTriples,
    totalProvinces,
    totalNaturalFeatures,
    totalAdministrativeRegions,
    totalSemanticRelations,
  ] = await Promise.all([
    count(`${geonamesPrefixes}
SELECT (COUNT(?place) AS ?count)
WHERE { ?place rdf:type gn:Feature ; gn:countryCode "ID" . }`),
    count(`SELECT (COUNT(*) AS ?count) WHERE { ?s ?p ?o . }`),
    count(`${geonamesPrefixes}
SELECT (COUNT(?place) AS ?count)
WHERE {
  ?place rdf:type gn:Feature ;
         gn:countryCode "ID" ;
         gn:featureCode <https://www.geonames.org/ontology#A.ADM1> .
}`),
    count(`${geonamesPrefixes}
SELECT (COUNT(?place) AS ?count)
WHERE {
  ?place rdf:type gn:Feature ;
         gn:countryCode "ID" ;
         gn:featureClass ?featureClass .
  FILTER(?featureClass IN (
    <https://www.geonames.org/ontology#H>,
    <https://www.geonames.org/ontology#T>
  ))
}`),
    count(`${geonamesPrefixes}
SELECT (COUNT(?place) AS ?count)
WHERE {
  ?place rdf:type gn:Feature ;
         gn:countryCode "ID" ;
         gn:featureClass <https://www.geonames.org/ontology#A> .
}`),
    count(`${geonamesPrefixes}
SELECT (COUNT(*) AS ?count)
WHERE {
  ?place rdf:type gn:Feature ;
         gn:countryCode "ID" ;
         ?relation ?target .
  FILTER(?relation IN (
    gn:adminCode1,
    gn:adminCode2,
    gn:adminCode3,
    gn:adminCode4,
    gn:parentFeature,
    gn:featureClass,
    gn:featureCode
  ))
}`),
  ]);

  return {
    totalEntities,
    totalTriples,
    totalProvinces,
    totalNaturalFeatures,
    totalAdministrativeRegions,
    totalSemanticRelations,
  };
}

export async function getSearchFacets(): Promise<SearchFacets> {
  const [adminResult, classResult] = await Promise.all([
    executeSparqlQuery(`${geonamesPrefixes}
SELECT ?adminCode1 (COUNT(?place) AS ?total)
WHERE {
  ?place rdf:type gn:Feature ;
         gn:countryCode "ID" ;
         gn:adminCode1 ?adminCode1 .
}
GROUP BY ?adminCode1
ORDER BY ?adminCode1`),
    executeSparqlQuery(`${geonamesPrefixes}
SELECT ?featureClassCode (COUNT(?place) AS ?total)
WHERE {
  ?place rdf:type gn:Feature ;
         gn:countryCode "ID" ;
         gn:featureClass ?featureClass .

  BIND(REPLACE(STR(?featureClass), "^.*#", "") AS ?featureClassCode)
}
GROUP BY ?featureClassCode
ORDER BY ?featureClassCode`),
  ]);

  return {
    provinces: adminResult.results.bindings.map((row) => {
      const value = bindingValue(row, 'adminCode1') ?? '';

      return {
        value: `Admin ${value}`,
        label: `Admin ${value}`,
        total: Number(bindingValue(row, 'total') ?? 0),
      };
    }),
    featureClasses: classResult.results.bindings.map((row) => {
      const value = bindingValue(row, 'featureClassCode') ?? '';
      const info = getFeatureClassInfo(value);

      return {
        value,
        label: info ? `${value} - ${info.name}` : value,
        description: info?.description,
        total: Number(bindingValue(row, 'total') ?? 0),
      };
    }),
  };
}

export async function getFeatureCodeFacets(
  featureClass: string,
): Promise<FeatureCodeFacetOption[]> {
  const safeFeatureClass = escapeSparqlString(featureClass);
  const result = await executeSparqlQuery(`${geonamesPrefixes}
SELECT ?featureCodeCode (COUNT(?place) AS ?total)
WHERE {
  ?place rdf:type gn:Feature ;
         gn:countryCode "ID" ;
         gn:featureClass <https://www.geonames.org/ontology#${safeFeatureClass}> ;
         gn:featureCode ?featureCode .

  BIND(REPLACE(REPLACE(STR(?featureCode), "^.*#", ""), "^[^.]+\\\\.", "") AS ?featureCodeCode)
}
GROUP BY ?featureCodeCode
ORDER BY DESC(?total)`);

  return result.results.bindings.map((row) => {
    const value = bindingValue(row, 'featureCodeCode') ?? '';
    const info = getFeatureCodeInfo(featureClass, value);

    return {
      value,
      featureClass,
      label: info ? `${value} - ${info.name}` : value,
      description: info?.description,
      total: Number(bindingValue(row, 'total') ?? 0),
    };
  });
}

export async function runSparqlQuery(
  query: string,
): Promise<Record<string, string | number>[]> {
  const result = await executeSparqlQuery(query);

  return sparqlRowsToObjects(result);
}
