import { QueryEngine } from '@comunica/query-sparql-file';
import 'server-only';

type SparqlBinding = {
  type: string;
  value: string;
  datatype?: string;
  'xml:lang'?: string;
};

type SparqlJsonResult = {
  head: {
    vars: string[];
  };
  results: {
    bindings: Array<Record<string, SparqlBinding>>;
  };
};

const comunicaEngine = new QueryEngine();

function getBackend() {
  return process.env.SPARQL_BACKEND?.toLowerCase() === 'comunica'
    ? 'comunica'
    : 'fuseki';
}

function getEndpoint() {
  const endpoint = process.env.FUSEKI_SPARQL_ENDPOINT;

  if (!endpoint) {
    throw new Error('FUSEKI_SPARQL_ENDPOINT is not configured.');
  }

  return endpoint;
}

function getComunicaSources() {
  const configuredSources =
    process.env.COMUNICA_TTL_SOURCE ?? 'src/data/ontology/bandung_geonames.ttl';

  return configuredSources
    .split(',')
    .map((source) => source.trim())
    .filter(Boolean);
}

function termToBinding(term: {
  termType: string;
  value: string;
  datatype?: { value: string };
  language?: string;
}) {
  const binding: SparqlBinding = {
    type: term.termType === 'NamedNode' ? 'uri' : 'literal',
    value: term.value,
  };

  if (term.datatype?.value) {
    binding.datatype = term.datatype.value;
  }

  if (term.language) {
    binding['xml:lang'] = term.language;
  }

  return binding;
}

async function executeComunicaQuery(query: string): Promise<SparqlJsonResult> {
  const result = await comunicaEngine.query(query, {
    sources: getComunicaSources(),
  });

  if (result.resultType !== 'bindings') {
    throw new Error(
      'Only SPARQL SELECT queries are supported by this endpoint.',
    );
  }

  const metadata = await result.metadata();
  const variables = metadata.variables.map((variable) => variable.value);
  const stream = await result.execute();
  const rows: Array<Record<string, SparqlBinding>> = [];

  for await (const bindings of stream) {
    const row: Record<string, SparqlBinding> = {};

    for (const variable of variables) {
      const term = bindings.get(variable);

      if (term) {
        row[variable] = termToBinding(term);
      }
    }

    rows.push(row);
  }

  return {
    head: {
      vars: variables,
    },
    results: {
      bindings: rows,
    },
  };
}

async function executeFusekiQuery(query: string): Promise<SparqlJsonResult> {
  const response = await fetch(getEndpoint(), {
    method: 'POST',
    headers: {
      Accept: 'application/sparql-results+json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ query }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      `Fuseki query failed with ${response.status}: ${message.slice(0, 240)}`,
    );
  }

  return response.json() as Promise<SparqlJsonResult>;
}

export async function executeSparqlQuery(
  query: string,
): Promise<SparqlJsonResult> {
  return getBackend() === 'comunica'
    ? executeComunicaQuery(query)
    : executeFusekiQuery(query);
}

export function bindingValue(
  row: Record<string, Pick<SparqlBinding, 'value'>>,
  key: string,
) {
  return row[key]?.value;
}

export function sparqlRowsToObjects(
  result: SparqlJsonResult,
): Record<string, string | number>[] {
  return result.results.bindings.map((row) => {
    const nextRow: Record<string, string | number> = {};

    for (const key of result.head.vars) {
      const value = bindingValue(row, key);

      if (value !== undefined) {
        nextRow[key] = value;
      }
    }

    return nextRow;
  });
}
