import type { KeyboardEvent } from 'react';
import type { PortfolioItem } from '../lib/types';
import { openExternal } from '../lib/utils';

interface Props {
  items: PortfolioItem[];
}

export function ArchiveTable({ items }: Props) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <strong>Nenhuma referência encontrada.</strong>
        Ajuste a busca ou os filtros.
      </div>
    );
  }

  function handleKey(e: KeyboardEvent<HTMLTableRowElement>, url: string) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openExternal(url);
    }
  }

  return (
    <table className="archive-table" aria-label="Portfolio archive">
      <thead>
        <tr>
          <th scope="col" className="col-name">
            Projeto
          </th>
          <th scope="col" className="col-area">
            Área
          </th>
          <th scope="col" className="col-country">
            País
          </th>
          <th scope="col" className="col-quality">
            Qualidade
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item.url}
            role="link"
            tabIndex={0}
            onClick={() => openExternal(item.url)}
            onKeyDown={(e) => handleKey(e, item.url)}
            aria-label={`Abrir ${item.name} em nova aba`}
          >
            <td className="col-name">
              {item.name}
              <div className="row-sub">{item.area}</div>
            </td>
            <td className="col-area">{item.area}</td>
            <td className="col-country">{item.country}</td>
            <td className="col-quality" aria-label={`Qualidade ${item.quality}`}>
              {item.quality}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
