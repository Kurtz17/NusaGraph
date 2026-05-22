import type { SparqlTemplate } from "@/types/geographic";

const prefixes = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX gn: <http://www.geonames.org/ontology#>
PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>`;

export const searchByNameQuery = `${prefixes}

SELECT ?place ?name ?featureClass ?featureCode ?lat ?long
WHERE {
  ?place rdf:type gn:Feature ;
         gn:name ?name ;
         gn:featureClass ?featureClass ;
         gn:featureCode ?featureCode ;
         gn:countryCode "ID" ;
         gn:timezone ?timezone ;
         geo:lat ?lat ;
         geo:long ?long .
  FILTER(CONTAINS(LCASE(STR(?name)), LCASE("Jakarta")))
}
LIMIT 25`;

export const searchByAlternativeNameQuery = `${prefixes}

SELECT ?place ?name ?alternateName ?lat ?long
WHERE {
  ?place rdf:type gn:Feature ;
         gn:name ?name ;
         gn:alternateName ?alternateName ;
         gn:countryCode "ID" ;
         geo:lat ?lat ;
         geo:long ?long .
  FILTER(CONTAINS(LCASE(STR(?alternateName)), LCASE("Jogja")))
}
LIMIT 25`;

export const findByProvinceQuery = `${prefixes}

SELECT ?place ?name ?featureClass ?featureCode ?lat ?long
WHERE {
  ?place rdf:type gn:Feature ;
         gn:name ?name ;
         gn:parentFeature ?province ;
         gn:featureClass ?featureClass ;
         gn:featureCode ?featureCode ;
         gn:countryCode "ID" ;
         geo:lat ?lat ;
         geo:long ?long .
  ?province gn:name "West Java" .
}
LIMIT 50`;

export const findNaturalFeatureQuery = `${prefixes}

SELECT ?place ?name ?featureClass ?featureCode ?lat ?long
WHERE {
  ?place rdf:type gn:Feature ;
         gn:name ?name ;
         gn:featureClass ?featureClass ;
         gn:featureCode ?featureCode ;
         gn:countryCode "ID" ;
         geo:lat ?lat ;
         geo:long ?long .
  FILTER(?featureClass IN ("H", "T"))
}
LIMIT 50`;

export const coordinateSearchQuery = `${prefixes}

SELECT ?place ?name ?lat ?long ?featureClass ?featureCode
WHERE {
  ?place rdf:type gn:Feature ;
         gn:name ?name ;
         gn:featureClass ?featureClass ;
         gn:featureCode ?featureCode ;
         gn:countryCode "ID" ;
         gn:timezone ?timezone ;
         geo:lat ?lat ;
         geo:long ?long .
  FILTER(?lat >= -8.5 && ?lat <= -6.0)
  FILTER(?long >= 106.0 && ?long <= 111.5)
}
LIMIT 50`;

export const sparqlTemplates: SparqlTemplate[] = [
  {
    id: "search-by-name",
    name: "Search by name",
    description: "Find Indonesian geographic features by primary place name.",
    query: searchByNameQuery,
  },
  {
    id: "search-by-alternative-name",
    name: "Search by alternative name",
    description: "Find features using alternate names such as local spellings.",
    query: searchByAlternativeNameQuery,
  },
  {
    id: "find-by-province",
    name: "Find by province",
    description: "List entities connected to a selected administrative region.",
    query: findByProvinceQuery,
  },
  {
    id: "find-natural-feature",
    name: "Find natural feature",
    description: "Return natural features such as islands, lakes, rivers, and volcanoes.",
    query: findNaturalFeatureQuery,
  },
  {
    id: "coordinate-search",
    name: "Coordinate search",
    description: "Filter entities using a simple latitude and longitude window.",
    query: coordinateSearchQuery,
  },
];
