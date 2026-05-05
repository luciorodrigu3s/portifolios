import { useState } from 'react';
import type { PortfolioItem } from '../lib/types';
import { hashString } from '../lib/utils';

interface Props {
  item: PortfolioItem;
}

export function PortfolioCard({ item }: Props) {
  const [errored, setErrored] = useState(false);
  const dark = hashString(item.name) % 2 === 0;
  const fallbackClass = `card__fallback ${
    dark ? 'card__fallback--dark' : 'card__fallback--light'
  }`;
  const primaryArea = item.area.split(',')[0]?.trim() ?? '';

  return (
    <a
      className="card"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="card__media">
        {!errored && (
          <img
            className="card__img"
            src={item.thumbnail}
            alt={`Thumbnail de ${item.name}`}
            loading="lazy"
            onError={() => setErrored(true)}
          />
        )}
        {errored && (
          <div className={fallbackClass} aria-hidden="true">
            <span className="card__fallback-domain">{item.domain}</span>
            <div>
              <div className="card__fallback-name">{item.name}</div>
              <div className="card__fallback-tag">{primaryArea}</div>
            </div>
          </div>
        )}
      </div>
      <div className="card__meta">
        {primaryArea} · {item.country}
      </div>
      <div className="card__name">{item.name}</div>
      <p className="card__desc">{item.description}</p>
      <div className="card__foot">
        {/* Quality stars hidden for now */}
        <span aria-hidden="true" />
        <span className="card__foot-cta">View site →</span>
      </div>
    </a>
  );
}
