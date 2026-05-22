import { SearchX } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function EmptyState() {
  return (
    <Card className="flex min-h-52 flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 rounded-2xl bg-slate-100 p-3 text-slate-500">
        <SearchX className="h-6 w-6" aria-hidden="true" />
      </div>
      <p className="max-w-md text-sm leading-6 text-slate-600">
        No geographic entities found. Try another keyword or adjust your
        filters.
      </p>
    </Card>
  );
}
