// One-off utility: converts the legacy hardcoded TS array into data/portfolios.csv.
// Kept in the repo as reference; the CSV is the source of truth from now on.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// The TS data file is a plain object literal; strip the type syntax so Node can import it.
let src = readFileSync(join(root, 'src/data/portfolioItems.ts'), 'utf8');
src = src
  .replace(/import type .*;\n/, '')
  .replace(': PortfolioItem[]', '');
const tmpFile = join(tmpdir(), `portfolio-items-${Date.now()}.mjs`);
writeFileSync(tmpFile, src);
const { portfolioItems } = await import(tmpFile);

function csvEscape(value) {
  const str = String(value ?? '');
  if (/[",\n;]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const HEADER = [
  'name',
  'url',
  'description',
  'area',
  'roles',
  'country',
  'quality',
  'status',
  'verifiedAt',
];

const lines = [HEADER.join(',')];
for (const item of portfolioItems) {
  const stars = Array.from(item.quality).filter((c) => c === '⭐').length;
  lines.push(
    [
      item.name,
      item.url,
      item.description,
      item.area,
      item.roles,
      item.country,
      String(stars),
      item.status,
      item.verifiedAt,
    ]
      .map(csvEscape)
      .join(','),
  );
}

mkdirSync(join(root, 'data'), { recursive: true });
writeFileSync(join(root, 'data/portfolios.csv'), lines.join('\n') + '\n');
console.log(`✅ data/portfolios.csv gerado com ${portfolioItems.length} itens.`);
