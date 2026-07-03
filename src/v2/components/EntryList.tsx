import type { PortfolioItem } from '../../lib/types';
import { EmptyState } from './EmptyState';

interface Props {
  items: PortfolioItem[];
}

export function EntryList({ items }: Props) {
  if (items.length === 0) return <EmptyState />;

  return (
    <ul className="v2-list" role="list">
      {items.map((item) => (
        <li key={item.url}>
          <a
            className="v2-entry"
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir ${item.name} em nova aba`}
          >
            <span className="v2-entry__main">
              <span className="label-l">{item.name}</span>
              <span className="caption">{item.description}</span>
            </span>
            <span className="caption v2-entry__meta">{item.area}</span>
            <span className="caption v2-entry__meta">{item.country}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
