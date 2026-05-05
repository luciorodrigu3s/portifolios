import type { SortKey, ViewMode } from '../lib/types';
import { SORT_LABELS, nextSort } from '../lib/utils';
import { Pill } from './Pill';
import { Segmented } from './Segmented';

interface Props {
  view: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  sort: SortKey;
  onSortChange: (sort: SortKey) => void;
  activeFilters: number;
  onOpenFilters: () => void;
}

export function Dock({
  view,
  onViewChange,
  sort,
  onSortChange,
  activeFilters,
  onOpenFilters,
}: Props) {
  return (
    <nav className="dock" aria-label="Controles">
      <div className="dock__left">
        <Segmented value={view} onChange={onViewChange} />
      </div>
      <div className="dock__center">
        <Pill
          variant="accent"
          tabIndex={-1}
          aria-label="Portfolio Index — marca"
          onClick={(e) => e.preventDefault()}
        >
          Portfolio Index
        </Pill>
        <Pill
          variant="light"
          className="pill--menu"
          onClick={() => onSortChange(nextSort(sort))}
          aria-label={`Ordenação atual: ${SORT_LABELS[sort]}. Clique para mudar.`}
        >
          {SORT_LABELS[sort]}
        </Pill>
      </div>
      <div className="dock__right">
        <Pill variant="dark" onClick={onOpenFilters} aria-label="Abrir filtros">
          Filtro
          {activeFilters > 0 && (
            <span className="pill__count">[{activeFilters}]</span>
          )}
        </Pill>
      </div>
    </nav>
  );
}
