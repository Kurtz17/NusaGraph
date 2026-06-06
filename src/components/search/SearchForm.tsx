'use client';

import { InteractiveMap } from '@/components/map/InteractiveMap';
import { ResultsList } from '@/components/results/ResultsList';
import { SearchFilters } from '@/components/search/SearchFilters';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { searchEntitiesFromApi } from '@/lib/client-api';
import { uniqueValues } from '@/lib/utils';
import type {
  GeographicEntity,
  SearchFilters as SearchFilterValues,
} from '@/types/geographic';
import { AlertCircle, RotateCcw, Search } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';

type SearchFormProps = {
  initialEntities: GeographicEntity[];
};

export function SearchForm({ initialEntities }: SearchFormProps) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilterValues>({});
  const [results, setResults] = useState(initialEntities);
  const [selectedEntity, setSelectedEntity] = useState<GeographicEntity | null>(
    initialEntities[0] ?? null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const filterOptions = useMemo(
    () => ({
      provinces: uniqueValues(initialEntities.map((entity) => entity.province)),
      featureTypes: uniqueValues(
        initialEntities.map((entity) => entity.featureType),
      ),
      featureClasses: uniqueValues(
        initialEntities.map((entity) => entity.featureClass),
      ),
      featureCodes: uniqueValues(
        initialEntities.map((entity) => entity.featureCode),
      ),
    }),
    [initialEntities],
  );

  async function handleSearch(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const nextResults = await searchEntitiesFromApi(query, filters);
      setResults(nextResults);
      setSelectedEntity(nextResults[0] ?? null);
    } catch {
      setError(
        'Search service is temporarily unavailable. Please check the Fuseki endpoint and try again.',
      );
      setResults([]);
      setSelectedEntity(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setQuery('');
    setFilters({});
    setResults(initialEntities);
    setSelectedEntity(initialEntities[0] ?? null);
    setError('');
  }

  return (
    <section
      id="search"
      className="border-b border-slate-200 bg-white px-6 py-20"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Semantic search"
          title="Find geographic entities beyond keywords"
          description="Search by names, alternative names, feature classes, feature codes, and administrative relations."
        />

        <Card className="mt-10 p-5">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
              <Input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search places, provinces, islands, mountains, rivers..."
              />
              <Button type="submit" size="lg" disabled={isLoading}>
                <Search className="h-4 w-4" aria-hidden="true" />
                Search
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Reset
              </Button>
            </div>

            <SearchFilters
              filters={filters}
              options={filterOptions}
              onChange={setFilters}
            />
          </form>
        </Card>

        {error ? (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4" aria-hidden="true" />
            <p>{error}</p>
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1fr)]">
          <div>
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-700">
                {results.length} result{results.length === 1 ? '' : 's'}
              </p>
              <p className="text-xs text-slate-500">
                Click a card to focus the map.
              </p>
            </div>
            <ResultsList
              results={results}
              selectedId={selectedEntity?.id}
              isLoading={isLoading}
              onSelect={setSelectedEntity}
            />
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <InteractiveMap
              entities={results}
              selectedEntity={selectedEntity}
              height="560px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
