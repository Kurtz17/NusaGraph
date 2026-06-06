import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { SearchForm } from '@/components/search/SearchForm';
import { searchEntities } from '@/lib/api';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search | NusaGraph',
  description: 'Search Indonesian geographic entities in NusaGraph.',
};

export default async function SearchPage() {
  const initialEntities = await searchEntities('', {}, 10);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main>
        <SearchForm initialEntities={initialEntities} />
      </main>
      <Footer />
    </div>
  );
}
