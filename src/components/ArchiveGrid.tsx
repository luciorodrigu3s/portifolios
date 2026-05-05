import type { PortfolioItem } from '../lib/types';
import { PortfolioCard } from './PortfolioCard';

interface Props {
  items: PortfolioItem[];
}

export function ArchiveGrid({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <strong>Nenhuma referência encontrada.</strong>
        Ajuste a busca ou os filtros.
      </div>
    );
  }

  return (
    <div className="archive-grid">
      {items.map((item) => (
        <PortfolioCard key={item.url} item={item} />
      ))}
    </div>
  );
}
