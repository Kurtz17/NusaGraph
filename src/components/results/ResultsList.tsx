import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";
import { ResultCard } from "@/components/results/ResultCard";
import type { GeographicEntity } from "@/types/geographic";

type ResultsListProps = {
  results: GeographicEntity[];
  selectedId?: string;
  isLoading?: boolean;
  onSelect?: (entity: GeographicEntity) => void;
};

export function ResultsList({
  results,
  selectedId,
  isLoading,
  onSelect,
}: ResultsListProps) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (results.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {results.map((entity) => (
        <ResultCard
          key={entity.id}
          entity={entity}
          selected={entity.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
