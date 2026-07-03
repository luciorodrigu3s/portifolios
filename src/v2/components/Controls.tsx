import { useId, useState } from 'react';
import type { SortKey, ViewMode } from '../../lib/types';
import { SORT_CYCLE, SORT_LABELS } from '../../lib/utils';

interface Props {
  query: string;
  onQueryChange: (q: string) => void;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  areas: string[];
  selectedAreas: Set<string>;
  onToggleArea: (a: string) => void;
  countries: string[];
  selectedCountries: Set<string>;
  onToggleCountry: (c: string) => void;
  onClearAll: () => void;
  resultCount: number;
  totalCount: number;
}

export function Controls({
  query,
  onQueryChange,
  sort,
  onSortChange,
  view,
  onViewChange,
  areas,
  selectedAreas,
  onToggleArea,
  countries,
  selectedCountries,
  onToggleCountry,
  onClearAll,
  resultCount,
  totalCount,
}: Props) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchId = useId();
  const sortId = useId();
  const filtersId = useId();

  const activeFilters =
    (query.trim() ? 1 : 0) + selectedAreas.size + selectedCountries.size;

  return (
    <div className="v2-controls">
      <div className="v2-controls__bar">
        <div className="v2-controls__field">
          <label className="caption" htmlFor={searchId}>
            Buscar
          </label>
          <input
            id={searchId}
            className="v2-input label-m"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="nome, área, país…"
          />
        </div>

        <div className="v2-controls__field">
          <label className="caption" htmlFor={sortId}>
            Ordenar
          </label>
          <select
            id={sortId}
            className="v2-select label-m"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
          >
            {SORT_CYCLE.map((key) => (
              <option key={key} value={key}>
                {SORT_LABELS[key].replace('Sort: ', '')}
              </option>
            ))}
          </select>
        </div>

        <div className="v2-controls__field">
          <span className="caption">Visualização</span>
          <div className="v2-toggle" role="group" aria-label="Visualização">
            <button
              type="button"
              className="v2-textbutton label-m"
              aria-pressed={view === 'list'}
              onClick={() => onViewChange('list')}
            >
              Lista
            </button>
            <span className="caption" aria-hidden="true">
              /
            </span>
            <button
              type="button"
              className="v2-textbutton label-m"
              aria-pressed={view === 'grid'}
              onClick={() => onViewChange('grid')}
            >
              Grade
            </button>
          </div>
        </div>

        <div className="v2-controls__field">
          <span className="caption">Filtros</span>
          <button
            type="button"
            className="v2-textbutton label-m"
            aria-expanded={filtersOpen}
            aria-controls={filtersId}
            onClick={() => setFiltersOpen((v) => !v)}
          >
            {filtersOpen ? 'Ocultar' : 'Mostrar'}
            {activeFilters > 0 ? ` (${activeFilters})` : ''}
          </button>
        </div>
      </div>

      {filtersOpen && (
        <div className="v2-filters" id={filtersId}>
          <div className="v2-filters__group">
            <span className="caption">Área</span>
            <ul className="v2-taglist" role="list">
              {areas.map((area) => (
                <li key={area}>
                  <button
                    type="button"
                    className="tag v2-tagbutton"
                    aria-pressed={selectedAreas.has(area)}
                    onClick={() => onToggleArea(area)}
                  >
                    {area}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="v2-filters__group">
            <span className="caption">País</span>
            <ul className="v2-taglist" role="list">
              {countries.map((country) => (
                <li key={country}>
                  <button
                    type="button"
                    className="tag v2-tagbutton"
                    aria-pressed={selectedCountries.has(country)}
                    onClick={() => onToggleCountry(country)}
                  >
                    {country}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {activeFilters > 0 && (
            <button
              type="button"
              className="v2-textbutton label-m"
              onClick={onClearAll}
            >
              Limpar filtros
            </button>
          )}
        </div>
      )}

      <p className="caption v2-controls__count" aria-live="polite">
        Mostrando {resultCount} de {totalCount} referências
      </p>
    </div>
  );
}
