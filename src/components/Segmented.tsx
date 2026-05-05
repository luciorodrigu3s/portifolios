import type { ViewMode } from '../lib/types';

interface Props {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function Segmented({ value, onChange }: Props) {
  return (
    <div className="segmented" role="tablist" aria-label="Modo de exibição">
      <button
        type="button"
        className="segmented__opt"
        role="tab"
        aria-selected={value === 'list'}
        onClick={() => onChange('list')}
      >
        Lista
      </button>
      <button
        type="button"
        className="segmented__opt"
        role="tab"
        aria-selected={value === 'grid'}
        onClick={() => onChange('grid')}
      >
        Grid
      </button>
    </div>
  );
}
