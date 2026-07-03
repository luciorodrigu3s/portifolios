import { useState } from 'react';
import type { PortfolioItem } from '../../lib/types';
import { EmptyState } from './EmptyState';

interface Props {
  items: PortfolioItem[];
}

function EntryCard({ item }: { item: PortfolioItem }) {
  const [errored, setErrored] = useState(false);
  const primaryArea = item.area.split(',')[0]?.trim() ?? '';

  return (
    <a
      className="v2-card"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir ${item.name} em nova aba`}
    >
      <span className="v2-card__media">
        {!errored ? (
          <img
            className="v2-card__img"
            src={item.thumbnail}
            alt={`Thumbnail de ${item.name}`}
            loading="lazy"
            onError={() => setErrored(true)}
          />
        ) : (
          <span className="v2-card__fallback caption" aria-hidden="true">
            {item.domain}
          </span>
        )}
      </span>
      <span className="label-m v2-card__name">{item.name}</span>
      <span className="caption">
        {primaryArea} · {item.country}
      </span>
    </a>
  );
}

export function EntryGrid({ items }: Props) {
  if (items.length === 0) return <EmptyState />;

  return (
    <div className="grid-3 v2-grid">
      {items.map((item) => (
        <EntryCard key={item.url} item={item} />
      ))}
    </div>
  );
}
