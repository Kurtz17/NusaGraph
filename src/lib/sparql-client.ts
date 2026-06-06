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

function getEndpoint() {
  const endpoint = process.env.FUSEKI_SPARQL_ENDPOINT;

  if (!endpoint) {
    throw new Error('FUSEKI_SPARQL_ENDPOINT is not configured.');
  }

  return endpoint;
}

export async function executeSparqlQuery(
  query: string,
): Promise<SparqlJsonResult> {
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
