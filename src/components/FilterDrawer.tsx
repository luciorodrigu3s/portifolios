import { useEffect, useRef } from 'react';
import { Pill } from './Pill';

interface Props {
  open: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (q: string) => void;
  areas: string[];
  selectedAreas: Set<string>;
  onToggleArea: (area: string) => void;
  countries: string[];
  selectedCountries: Set<string>;
  onToggleCountry: (country: string) => void;
  onClearAll: () => void;
  resultCount: number;
  totalCount: number;
}

export function FilterDrawer({
  open,
  onClose,
  query,
  onQueryChange,
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
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const t = window.setTimeout(() => searchRef.current?.focus(), 50);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        className="drawer-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Filtros"
      >
        <div className="drawer__head">
          <span>Filtros</span>
          <span>
            {resultCount} / {totalCount}
          </span>
        </div>

        <input
          ref={searchRef}
          className="drawer__search"
          type="search"
          placeholder="Buscar por nome, descrição, área, país ou domínio…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Buscar"
        />

        <div className="drawer__group">
          <h3>Área</h3>
          <div className="drawer__chips">
            {areas.map((area) => {
              const active = selectedAreas.has(area);
              return (
                <Pill
                  key={area}
                  variant={active ? 'dark' : 'light'}
                  onClick={() => onToggleArea(area)}
                  aria-pressed={active}
                >
                  {area}
                </Pill>
              );
            })}
          </div>
        </div>

        <div className="drawer__group">
          <h3>País</h3>
          <div className="drawer__chips">
            {countries.map((country) => {
              const active = selectedCountries.has(country);
              return (
                <Pill
                  key={country}
                  variant={active ? 'dark' : 'light'}
                  onClick={() => onToggleCountry(country)}
                  aria-pressed={active}
                >
                  {country}
                </Pill>
              );
            })}
          </div>
        </div>

        <div className="drawer__foot">
          <span className="drawer__count">
            Showing {resultCount} of {totalCount}
          </span>
          <div className="drawer__actions">
            <Pill variant="accent" onClick={onClearAll}>
              Limpar
            </Pill>
            <Pill variant="dark" onClick={onClose}>
              Fechar
            </Pill>
          </div>
        </div>
      </div>
    </>
  );
}
