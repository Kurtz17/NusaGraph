import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function LoadingState() {
  return (
    <Card className="flex min-h-52 flex-col items-center justify-center gap-3 p-8 text-center">
      <Loader2 className="h-6 w-6 animate-spin text-teal-600" aria-hidden="true" />
      <p className="text-sm font-medium text-slate-600">
        Searching semantic geographic entities...
      </p>
    </Card>
  );
}
