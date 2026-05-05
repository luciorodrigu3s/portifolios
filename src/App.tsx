import { useMemo, useState } from 'react';
import { Masthead } from './components/Masthead';
import { Intro } from './components/Intro';
import { ArchiveTable } from './components/ArchiveTable';
import { ArchiveGrid } from './components/ArchiveGrid';
import { Dock } from './components/Dock';
import { FilterDrawer } from './components/FilterDrawer';
import { Footer } from './components/Footer';
import { portfolioItems } from './data/portfolioItems';
import type { SortKey, ViewMode } from './lib/types';
import {
  compareBy,
  matchesQuery,
  splitAreas,
  splitCountries,
  uniqueSortedAreas,
  uniqueSortedCountries,
} from './lib/utils';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<Set<string>>(new Set());
  const [selectedCountries, setSelectedCountries] = useState<Set<string>>(
    new Set(),
  );
  const [sort, setSort] = useState<SortKey>('quality-desc');
  const [view, setView] = useState<ViewMode>('list');
  const [filterOpen, setFilterOpen] = useState(false);

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

  const activeFilters =
    (query.trim() ? 1 : 0) + selectedAreas.size + selectedCountries.size;

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
      <main className="page">
        <Masthead total={portfolioItems.length} />
        <Intro total={portfolioItems.length} />

        <section className="archive-section" aria-label="Lista de portfólios">
          {view === 'list' ? (
            <ArchiveTable items={filtered} />
          ) : (
            <ArchiveGrid items={filtered} />
          )}
        </section>

        <Footer />
      </main>

      <Dock
        view={view}
        onViewChange={setView}
        sort={sort}
        onSortChange={setSort}
        activeFilters={activeFilters}
        onOpenFilters={() => setFilterOpen(true)}
      />

      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        query={query}
        onQueryChange={setQuery}
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
    </>
  );
}
