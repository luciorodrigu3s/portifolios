export interface PortfolioItem {
  name: string;
  url: string;
  description: string;
  area: string;
  roles: string;
  country: string;
  quality: string;
  status: string;
  verifiedAt: string;
  domain: string;
  thumbnail: string;
}

export type SortKey =
  | 'name-asc'
  | 'name-desc'
  | 'area-asc'
  | 'area-desc'
  | 'country-asc'
  | 'country-desc'
  | 'quality-desc'
  | 'quality-asc';

export type ViewMode = 'list' | 'grid';
