import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { SearchFilters as SearchFilterValues } from "@/types/geographic";

type SearchFiltersProps = {
  filters: SearchFilterValues;
  options: {
    provinces: string[];
    featureTypes: string[];
    featureClasses: string[];
    featureCodes: string[];
  };
  onChange: (filters: SearchFilterValues) => void;
};

export function SearchFilters({
  filters,
  options,
  onChange,
}: SearchFiltersProps) {
  const updateFilter = (
    key: keyof SearchFilterValues,
    value: string | number | undefined,
  ) => {
    onChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <Select
        aria-label="Province"
        value={filters.province ?? ""}
        onChange={(event) => updateFilter("province", event.target.value)}
      >
        <option value="">All provinces</option>
        {options.provinces.map((province) => (
          <option key={province} value={province}>
            {province}
          </option>
        ))}
      </Select>

      <Select
        aria-label="Feature type"
        value={filters.featureType ?? ""}
        onChange={(event) => updateFilter("featureType", event.target.value)}
      >
        <option value="">All feature types</option>
        {options.featureTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </Select>

      <Select
        aria-label="Feature class"
        value={filters.featureClass ?? ""}
        onChange={(event) => updateFilter("featureClass", event.target.value)}
      >
        <option value="">All feature classes</option>
        {options.featureClasses.map((featureClass) => (
          <option key={featureClass} value={featureClass}>
            {featureClass}
          </option>
        ))}
      </Select>

      <Select
        aria-label="Feature code"
        value={filters.featureCode ?? ""}
        onChange={(event) => updateFilter("featureCode", event.target.value)}
      >
        <option value="">All feature codes</option>
        {options.featureCodes.map((featureCode) => (
          <option key={featureCode} value={featureCode}>
            {featureCode}
          </option>
        ))}
      </Select>

      <Input
        aria-label="Minimum population"
        type="number"
        min={0}
        placeholder="Minimum population"
        value={filters.minPopulation ?? ""}
        onChange={(event) =>
          updateFilter(
            "minPopulation",
            event.target.value ? Number(event.target.value) : undefined,
          )
        }
      />
    </div>
  );
}
