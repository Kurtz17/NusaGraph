'use client';

import { SparqlResultTable } from '@/components/sparql/SparqlResultTable';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Select } from '@/components/ui/Select';
import { runSparqlQueryFromApi } from '@/lib/client-api';
import { sparqlTemplates } from '@/lib/sparql-templates';
import { Check, Copy, Play } from 'lucide-react';
import { useState } from 'react';

export function SparqlExplorer() {
  const [templateId, setTemplateId] = useState(sparqlTemplates[0].id);
  const [query, setQuery] = useState(sparqlTemplates[0].query);
  const [rows, setRows] = useState<Record<string, string | number>[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  function handleTemplateChange(id: string) {
    const template = sparqlTemplates.find((item) => item.id === id);
    if (!template) {
      return;
    }

    setTemplateId(id);
    setQuery(template.query);
    setRows([]);
    setError('');
  }

  async function copyQuery() {
    await navigator.clipboard.writeText(query);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  async function runQuery() {
    setIsRunning(true);
    setError('');

    try {
      const nextRows = await runSparqlQueryFromApi(query);
      setRows(nextRows);
    } catch {
      setRows([]);
      setError(
        'Query failed. Please check the query syntax or Fuseki endpoint.',
      );
    } finally {
      setIsRunning(false);
    }
  }

  const selectedTemplate = sparqlTemplates.find(
    (item) => item.id === templateId,
  );

  return (
    <section
      id="sparql"
      className="border-b border-slate-200 bg-slate-50 px-6 py-20"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="SPARQL explorer"
          title="Inspect query templates before backend integration"
          description="Use editable query templates that reflect the GeoNames ontology vocabulary and the RDF shape planned for the real endpoint."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1fr]">
          <Card className="p-5">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="sparql-template"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Template query
                </label>
                <Select
                  id="sparql-template"
                  value={templateId}
                  onChange={(event) => handleTemplateChange(event.target.value)}
                >
                  {sparqlTemplates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </Select>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {selectedTemplate?.description}
                </p>
              </div>

              <textarea
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-h-96 w-full resize-y rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm leading-6 text-slate-100 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              />

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={runQuery} disabled={isRunning}>
                  <Play className="h-4 w-4" aria-hidden="true" />
                  {isRunning ? 'Running...' : 'Run Query'}
                </Button>
                <Button variant="outline" onClick={copyQuery}>
                  {copied ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                  {copied ? 'Copied' : 'Copy Query'}
                </Button>
              </div>
            </div>
          </Card>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-950">
              Result table
            </h3>
            {error ? (
              <Card className="mb-4 border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </Card>
            ) : null}
            <SparqlResultTable rows={rows} />
          </div>
        </div>
      </div>
    </section>
  );
}
