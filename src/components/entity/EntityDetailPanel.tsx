"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy } from "lucide-react";
import { EntityMetadata } from "@/components/entity/EntityMetadata";
import { RdfPreview } from "@/components/entity/RdfPreview";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { GeographicEntity } from "@/types/geographic";

type EntityDetailPanelProps = {
  entity: GeographicEntity;
};

export function EntityDetailPanel({ entity }: EntityDetailPanelProps) {
  const [copied, setCopied] = useState(false);

  async function copyUri() {
    await navigator.clipboard.writeText(entity.uri);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition hover:text-teal-800"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to search
          </Link>
          <h1 className="mt-5 text-4xl font-semibold tracking-normal text-slate-950">
            {entity.name}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            {entity.description}
          </p>
        </div>
        <Button variant="outline" onClick={copyUri}>
          {copied ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
          {copied ? "Copied" : "Copy URI"}
        </Button>
      </div>

      <Card className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          URI
        </p>
        <p className="mt-2 break-all font-mono text-sm text-slate-800">
          {entity.uri}
        </p>
      </Card>

      <EntityMetadata entity={entity} />

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-slate-950">
          Alternate names
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {entity.alternateNames.map((name) => (
            <span
              key={name}
              className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
            >
              {name}
            </span>
          ))}
        </div>
      </Card>

      <RdfPreview entity={entity} />
    </div>
  );
}
