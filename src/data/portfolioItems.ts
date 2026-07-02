// Gerado a partir de data/portfolios.csv pelo scripts/build-data.mjs
// (roda automaticamente em `npm run dev` e `npm run build`).
// Para editar a lista, altere o CSV — veja data/README.md.
import type { PortfolioItem } from '../lib/types';
import raw from './portfolioItems.json';

export const portfolioItems: PortfolioItem[] = raw;
