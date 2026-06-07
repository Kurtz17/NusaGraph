import { Card } from '@/components/ui/Card';

type SparqlResultTableProps = {
  rows: Record<string, string | number>[];
};

export function SparqlResultTable({ rows }: SparqlResultTableProps) {
  if (rows.length === 0) {
    return (
      <Card className="p-6 text-sm text-slate-600">
        Run a query template to preview SPARQL results.
      </Card>
    );
  }

  const columns = Object.keys(rows[0]);

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-4 py-3 font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-white">
                {columns.map((column) => (
                  <td key={column} className="max-w-64 truncate px-4 py-3">
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
