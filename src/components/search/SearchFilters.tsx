import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import type {
  FeatureCodeFacetOption,
  SearchFacetOption,
  SearchFilters as SearchFilterValues,
} from '@/types/geographic';

type SearchFiltersProps = {
  filters: SearchFilterValues;
  options: {
    provinces: SearchFacetOption[];
    featureClasses: SearchFacetOption[];
    featureCodes: FeatureCodeFacetOption[];
  };
  isLoadingFeatureCodes?: boolean;
  onChange: (filters: SearchFilterValues) => void;
};

export function SearchFilters({
  filters,
  options,
  isLoadingFeatureCodes = false,
  onChange,
}: SearchFiltersProps) {
  const updateFilter = (
    key: keyof SearchFilterValues,
    value: string | number | undefined,
  ) => {
    const nextFilters = {
      ...filters,
      [key]: value || undefined,
    };

    if (key === 'featureClass') {
      nextFilters.featureCode = undefined;
      nextFilters.featureType = undefined;
    }

    onChange(nextFilters);
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Select
        aria-label="Province"
        value={filters.province ?? ''}
        onChange={(event) => updateFilter('province', event.target.value)}
      >
        <option value="">All admin areas</option>
        {options.provinces.map((province) => (
          <option key={province.value} value={province.value}>
            {province.label}
            {province.total !== undefined ? ` (${province.total})` : ''}
          </option>
        ))}
      </Select>

      <Select
        aria-label="Feature class"
        value={filters.featureClass ?? ''}
        onChange={(event) => updateFilter('featureClass', event.target.value)}
      >
        <option value="">All feature classes</option>
        {options.featureClasses.map((featureClass) => (
          <option key={featureClass.value} value={featureClass.value}>
            {featureClass.label}
            {featureClass.total !== undefined ? ` (${featureClass.total})` : ''}
          </option>
        ))}
      </Select>

      <Select
        aria-label="Feature code"
        value={filters.featureCode ?? ''}
        onChange={(event) => updateFilter('featureCode', event.target.value)}
        disabled={!filters.featureClass || isLoadingFeatureCodes}
      >
        <option value="">
          {filters.featureClass
            ? isLoadingFeatureCodes
              ? 'Loading feature codes...'
              : 'All feature codes'
            : 'Select a feature class first'}
        </option>
        {options.featureCodes.map((featureCode) => (
          <option key={featureCode.value} value={featureCode.value}>
            {featureCode.label}
            {featureCode.total !== undefined ? ` (${featureCode.total})` : ''}
          </option>
        ))}
      </Select>

      <Input
        aria-label="Minimum population"
        type="number"
        min={0}
        placeholder="Minimum population"
        value={filters.minPopulation ?? ''}
        onChange={(event) =>
          updateFilter(
            'minPopulation',
            event.target.value ? Number(event.target.value) : undefined,
          )
        }
      />
    </div>
  );
}
