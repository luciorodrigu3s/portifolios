import type { PortfolioItem, SortKey } from './types';

export function splitAreas(areaStr: string): string[] {
  return areaStr
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function splitCountries(countryStr: string): string[] {
  return countryStr
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function qualityToNumber(quality: string): number {
  return Array.from(quality).filter((c) => c === '⭐').length;
}

export function normalize(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

export function matchesQuery(item: PortfolioItem, query: string): boolean {
  if (!query.trim()) return true;
  const q = normalize(query);
  return (
    normalize(item.name).includes(q) ||
    normalize(item.description).includes(q) ||
    normalize(item.area).includes(q) ||
    normalize(item.country).includes(q) ||
    normalize(item.domain).includes(q)
  );
}

export function uniqueSortedAreas(items: PortfolioItem[]): string[] {
  const set = new Set<string>();
  items.forEach((it) => splitAreas(it.area).forEach((a) => set.add(a)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function uniqueSortedCountries(items: PortfolioItem[]): string[] {
  const set = new Set<string>();
  items.forEach((it) => splitCountries(it.country).forEach((c) => set.add(c)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function compareBy(sort: SortKey) {
  return (a: PortfolioItem, b: PortfolioItem): number => {
    switch (sort) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'area-asc':
        return (
          a.area.localeCompare(b.area) || a.name.localeCompare(b.name)
        );
      case 'area-desc':
        return (
          b.area.localeCompare(a.area) || a.name.localeCompare(b.name)
        );
      case 'country-asc':
        return (
          a.country.localeCompare(b.country) || a.name.localeCompare(b.name)
        );
      case 'country-desc':
        return (
          b.country.localeCompare(a.country) || a.name.localeCompare(b.name)
        );
      case 'quality-desc': {
        const diff = qualityToNumber(b.quality) - qualityToNumber(a.quality);
        return diff !== 0 ? diff : a.name.localeCompare(b.name);
      }
      case 'quality-asc': {
        const diff = qualityToNumber(a.quality) - qualityToNumber(b.quality);
        return diff !== 0 ? diff : a.name.localeCompare(b.name);
      }
    }
  };
}

export const SORT_LABELS: Record<SortKey, string> = {
  'name-asc': 'Sort: Name A→Z',
  'name-desc': 'Sort: Name Z→A',
  'area-asc': 'Sort: Área A→Z',
  'area-desc': 'Sort: Área Z→A',
  'country-asc': 'Sort: País A→Z',
  'country-desc': 'Sort: País Z→A',
  'quality-desc': 'Sort: Quality ↓',
  'quality-asc': 'Sort: Quality ↑',
};

// Quality sorts are hidden from the cycle while the quality column is hidden.
export const SORT_CYCLE: SortKey[] = [
  'name-asc',
  'name-desc',
  'area-asc',
  'area-desc',
  'country-asc',
  'country-desc',
];

export function nextSort(current: SortKey): SortKey {
  const idx = SORT_CYCLE.indexOf(current);
  return SORT_CYCLE[(idx + 1) % SORT_CYCLE.length];
}

export function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function openExternal(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}
