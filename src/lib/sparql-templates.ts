import type { SparqlTemplate } from '@/types/geographic';

const prefixes = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX gn: <http://www.geonames.org/ontology#>
PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>`;

export const searchByNameQuery = `${prefixes}

SELECT ?place ?name ?featureClassCode ?featureCodeCode ?lat ?long ?population
WHERE {
  ?place rdf:type gn:Feature ;
         gn:name ?name ;
         gn:featureClass ?featureClass ;
         gn:featureCode ?featureCode ;
         gn:countryCode "ID" ;
         geo:lat ?lat ;
         geo:long ?long .

  OPTIONAL { ?place gn:population ?population . }

  BIND(REPLACE(STR(?featureClass), "^.*#", "") AS ?featureClassCode)
  BIND(REPLACE(REPLACE(STR(?featureCode), "^.*#", ""), "^[^.]+\\\\.", "") AS ?featureCodeCode)

  FILTER(CONTAINS(LCASE(STR(?name)), LCASE("Jakarta")))
}
ORDER BY LCASE(STR(?name))
LIMIT 25`;

export const searchByAdminCodeQuery = `${prefixes}

SELECT ?place ?name ?adminCode1 ?adminCode2 ?featureClassCode ?featureCodeCode ?lat ?long
WHERE {
  ?place rdf:type gn:Feature ;
         gn:name ?name ;
         gn:adminCode1 ?adminCode1 ;
         gn:featureClass ?featureClass ;
         gn:featureCode ?featureCode ;
         gn:countryCode "ID" ;
         geo:lat ?lat ;
         geo:long ?long .

  OPTIONAL { ?place gn:adminCode2 ?adminCode2 . }

  BIND(REPLACE(STR(?featureClass), "^.*#", "") AS ?featureClassCode)
  BIND(REPLACE(REPLACE(STR(?featureCode), "^.*#", ""), "^[^.]+\\\\.", "") AS ?featureCodeCode)

  FILTER(?adminCode1 = "30")
}
ORDER BY LCASE(STR(?name))
LIMIT 50`;

export const findPopulatedPlacesQuery = `${prefixes}

SELECT ?place ?name ?featureCodeCode ?population ?lat ?long
WHERE {
  ?place rdf:type gn:Feature ;
         gn:name ?name ;
         gn:featureClass <https://www.geonames.org/ontology#P> ;
         gn:featureCode ?featureCode ;
         gn:countryCode "ID" ;
         geo:lat ?lat ;
         geo:long ?long .

  OPTIONAL { ?place gn:population ?population . }

  BIND(REPLACE(REPLACE(STR(?featureCode), "^.*#", ""), "^[^.]+\\\\.", "") AS ?featureCodeCode)
}
ORDER BY DESC(xsd:integer(COALESCE(?population, 0)))
LIMIT 50`;

export const findSpotFeaturesQuery = `${prefixes}

SELECT ?place ?name ?featureCodeCode ?timezone ?lat ?long
WHERE {
  ?place rdf:type gn:Feature ;
         gn:name ?name ;
         gn:featureClass <https://www.geonames.org/ontology#S> ;
         gn:featureCode ?featureCode ;
         gn:countryCode "ID" ;
         geo:lat ?lat ;
         geo:long ?long .

  OPTIONAL { ?place gn:timezone ?timezone . }

  BIND(REPLACE(REPLACE(STR(?featureCode), "^.*#", ""), "^[^.]+\\\\.", "") AS ?featureCodeCode)
}
ORDER BY LCASE(STR(?name))
LIMIT 50`;

export const coordinateSearchQuery = `${prefixes}

SELECT ?place ?name ?lat ?long ?featureClassCode ?featureCodeCode
WHERE {
  ?place rdf:type gn:Feature ;
         gn:name ?name ;
         gn:featureClass ?featureClass ;
         gn:featureCode ?featureCode ;
         gn:countryCode "ID" ;
         geo:lat ?lat ;
         geo:long ?long .

  BIND(REPLACE(STR(?featureClass), "^.*#", "") AS ?featureClassCode)
  BIND(REPLACE(REPLACE(STR(?featureCode), "^.*#", ""), "^[^.]+\\\\.", "") AS ?featureCodeCode)

  FILTER(xsd:decimal(?lat) >= -8.5 && xsd:decimal(?lat) <= -6.0)
  FILTER(xsd:decimal(?long) >= 106.0 && xsd:decimal(?long) <= 111.5)
}
ORDER BY LCASE(STR(?name))
LIMIT 50`;

export const sparqlTemplates: SparqlTemplate[] = [
  {
    id: 'search-by-name',
    name: 'Search by name',
    description: 'Find Indonesian geographic features by primary place name.',
    query: searchByNameQuery,
  },
  {
    id: 'search-by-admin-code',
    name: 'Search by admin code',
    description: 'List features using GeoNames administrative code fields.',
    query: searchByAdminCodeQuery,
  },
  {
    id: 'find-populated-places',
    name: 'Populated places',
    description:
      'Return city, town, and settlement features with optional population.',
    query: findPopulatedPlacesQuery,
  },
  {
    id: 'find-spot-features',
    name: 'Spot features',
    description: 'Return hotels, resorts, buildings, and other spot features.',
    query: findSpotFeaturesQuery,
  },
  {
    id: 'coordinate-search',
    name: 'Coordinate search',
    description: 'Filter entities using a latitude and longitude window.',
    query: coordinateSearchQuery,
  },
];
