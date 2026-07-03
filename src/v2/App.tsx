import { useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Intro } from './components/Intro';
import { Controls } from './components/Controls';
import { EntryList } from './components/EntryList';
import { EntryGrid } from './components/EntryGrid';
import { Footer } from './components/Footer';
import { portfolioItems } from '../data/portfolioItems';
import type { SortKey, ViewMode } from '../lib/types';
import {
  compareBy,
  matchesQuery,
  splitAreas,
  splitCountries,
  uniqueSortedAreas,
  uniqueSortedCountries,
} from '../lib/utils';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<Set<string>>(new Set());
  const [selectedCountries, setSelectedCountries] = useState<Set<string>>(
    new Set(),
  );
  const [sort, setSort] = useState<SortKey>('name-asc');
  const [view, setView] = useState<ViewMode>('list');

  const allAreas = useMemo(() => uniqueSortedAreas(portfolioItems), []);
  const allCountries = useMemo(
    () => uniqueSortedCountries(portfolioItems),
    [],
  );

  const filtered = useMemo(() => {
    const list = portfolioItems
      .filter((it) => matchesQuery(it, query))
      .filter(
        (it) =>
          selectedAreas.size === 0 ||
          splitAreas(it.area).some((a) => selectedAreas.has(a)),
      )
      .filter(
        (it) =>
          selectedCountries.size === 0 ||
          splitCountries(it.country).some((c) => selectedCountries.has(c)),
      );
    return [...list].sort(compareBy(sort));
  }, [query, selectedAreas, selectedCountries, sort]);

  function toggleArea(area: string) {
    setSelectedAreas((prev) => {
      const next = new Set(prev);
      next.has(area) ? next.delete(area) : next.add(area);
      return next;
    });
  }

  function toggleCountry(country: string) {
    setSelectedCountries((prev) => {
      const next = new Set(prev);
      next.has(country) ? next.delete(country) : next.add(country);
      return next;
    });
  }

  function clearAll() {
    setQuery('');
    setSelectedAreas(new Set());
    setSelectedCountries(new Set());
  }

  return (
    <>
      <Header />
      <main className="container">
        <Intro total={portfolioItems.length} />

        <Controls
          query={query}
          onQueryChange={setQuery}
          sort={sort}
          onSortChange={setSort}
          view={view}
          onViewChange={setView}
          areas={allAreas}
          selectedAreas={selectedAreas}
          onToggleArea={toggleArea}
          countries={allCountries}
          selectedCountries={selectedCountries}
          onToggleCountry={toggleCountry}
          onClearAll={clearAll}
          resultCount={filtered.length}
          totalCount={portfolioItems.length}
        />

        <section aria-label="Lista de portfólios">
          {view === 'list' ? (
            <EntryList items={filtered} />
          ) : (
            <EntryGrid items={filtered} />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
