import Link from "next/link";
import { Network } from "lucide-react";

const navItems = [
  { label: "Search", href: "/search" },
  { label: "Knowledge Graph", href: "/knowledge-graph" },
  { label: "Graph Stats", href: "/graph-stats" },
  { label: "SPARQL", href: "/sparql" },
  { label: "Methodology", href: "/methodology" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-slate-200 bg-slate-950 text-white">
            <Network className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-base font-bold tracking-normal text-slate-950">
              NusaGraph
            </span>
            <span className="hidden truncate text-xs font-medium text-slate-500 sm:block">
              Semantic Geography Explorer
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/search"
          className="hidden rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 sm:inline-flex"
        >
          Start Exploring
        </Link>
      </nav>
      <div className="border-t border-slate-100 px-4 pb-2 md:hidden">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto pt-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
