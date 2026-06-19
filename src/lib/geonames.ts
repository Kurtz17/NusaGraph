import { getFeatureClassInfo } from '@/data/feature-classes';
import { getFeatureCodeInfo } from '@/data/feature-codes';
import { bindingValue } from '@/lib/sparql-client';
import type { GeographicEntity } from '@/types/geographic';

type SparqlRow = Record<string, { value: string }>;

export const geonamesPrefixes = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX gn: <http://www.geonames.org/ontology#>
PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>`;

export function escapeSparqlString(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

export function getGeonameIdFromUri(uri: string) {
  return uri.match(/\/(\d+)\/?$/)?.[1] ?? uri;
}

function localName(value?: string) {
  if (!value) {
    return '';
  }

  return value.split('#').pop()?.split('/').filter(Boolean).pop() ?? value;
}

function normalizeFeatureCode(value?: string) {
  const code = localName(value);

  return code.includes('.') ? (code.split('.').pop() ?? code) : code;
}

function numberValue(value?: string) {
  if (value === undefined) {
    return undefined;
  }

  const nextValue = Number(value);

  return Number.isFinite(nextValue) ? nextValue : undefined;
}

export function mapGeonamesRow(row: SparqlRow): GeographicEntity {
  const uri = bindingValue(row, 'place') ?? '';
  const geonameId = bindingValue(row, 'geonameId') ?? getGeonameIdFromUri(uri);
  const featureClass = localName(
    bindingValue(row, 'featureClassCode') ?? bindingValue(row, 'featureClass'),
  );
  const featureCode = normalizeFeatureCode(
    bindingValue(row, 'featureCodeCode') ?? bindingValue(row, 'featureCode'),
  );
  const adminCode1 = bindingValue(row, 'adminCode1');
  const adminCode2 = bindingValue(row, 'adminCode2');
  const parentFeature = bindingValue(row, 'parentFeature');
  const featureClassInfo = getFeatureClassInfo(featureClass);
  const featureCodeInfo = getFeatureCodeInfo(featureClass, featureCode);
  const featureType = featureClassInfo?.name ?? 'GeoNames feature';

  return {
    id: geonameId,
    geonameId,
    uri,
    name: bindingValue(row, 'name') ?? 'Unnamed feature',
    alternateNames: bindingValue(row, 'alternateName')
      ? [bindingValue(row, 'alternateName') as string]
      : [],
    latitude: numberValue(bindingValue(row, 'lat')) ?? 0,
    longitude: numberValue(bindingValue(row, 'long')) ?? 0,
    countryCode: 'ID',
    timezone: bindingValue(row, 'timezone') ?? 'Unknown',
    featureClass,
    featureCode,
    featureType,
    featureCodeName: featureCodeInfo?.name,
    featureCodeDescription: featureCodeInfo?.description,
    province: adminCode1 ? `Admin ${adminCode1}` : undefined,
    population: numberValue(bindingValue(row, 'population')),
    parentFeature:
      parentFeature ?? (adminCode2 ? `Admin ${adminCode2}` : undefined),
    description: [
      bindingValue(row, 'name') ?? 'This feature',
      featureType
        ? `is a ${featureType.toLowerCase()}`
        : 'is a GeoNames feature',
      adminCode1 ? `in Indonesian admin area ${adminCode1}` : 'in Indonesia',
    ].join(' '),
  };
}

export const entitySelectClause = `SELECT ?place ?geonameId ?name ?alternateName ?countryCode ?timezone ?lat ?long
       ?featureClass ?featureCode ?featureClassCode ?featureCodeCode
       ?population ?adminCode1 ?adminCode2 ?parentFeature
WHERE {
  ?place rdf:type gn:Feature ;
         gn:name ?name ;
         gn:featureClass ?featureClass ;
         gn:featureCode ?featureCode ;
         geo:lat ?lat ;
         geo:long ?long .

  OPTIONAL { ?place gn:countryCode ?countryCode . }
  OPTIONAL { ?place gn:alternateName ?alternateName . }
  OPTIONAL { ?place gn:timezone ?timezone . }
  OPTIONAL { ?place gn:population ?population . }
  OPTIONAL { ?place gn:adminCode1 ?adminCode1 . }
  OPTIONAL { ?place gn:adminCode2 ?adminCode2 . }
  OPTIONAL { ?place gn:parentFeature ?parent . ?parent gn:name ?parentFeature . }

  FILTER(!BOUND(?countryCode) || ?countryCode = "ID")

  BIND(REPLACE(STR(?place), "^.*/([0-9]+)/?$", "$1") AS ?geonameId)
  BIND(REPLACE(STR(?featureClass), "^.*#", "") AS ?featureClassCode)
  BIND(REPLACE(REPLACE(STR(?featureCode), "^.*#", ""), "^[^.]+\\\\.", "") AS ?featureCodeCode)`;
