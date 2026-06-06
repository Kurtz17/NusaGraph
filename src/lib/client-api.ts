import type { GeographicEntity, SearchFilters } from '@/types/geographic';

async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json() as Promise<T>;
}

export async function searchEntitiesFromApi(
  query: string,
  filters: SearchFilters = {},
): Promise<GeographicEntity[]> {
  const params = new URLSearchParams();

  if (query.trim()) {
    params.set('q', query.trim());
  }

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== '') {
      params.set(key, String(value));
    }
  }

  const response = await fetch(`/api/entities/search?${params.toString()}`);

  return readJson<GeographicEntity[]>(response);
}

export async function runSparqlQueryFromApi(
  query: string,
): Promise<Record<string, string | number>[]> {
  const response = await fetch('/api/sparql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  return readJson<Record<string, string | number>[]>(response);
}
