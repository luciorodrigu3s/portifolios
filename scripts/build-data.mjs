// Converte data/portfolios.csv em src/data/portfolioItems.json.
// Roda automaticamente antes de `npm run dev` e `npm run build` (predev/prebuild).
// Valida cada linha e falha o build com mensagem legível se algo estiver errado.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'csv-parse/sync';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CSV_PATH = join(root, 'data/portfolios.csv');
const OUT_PATH = join(root, 'src/data/portfolioItems.json');

const THUMBNAIL_TEMPLATE = (url) =>
  `https://image.thum.io/get/width/1200/crop/800/noanimate/${url}`;

// ── Leitura ──────────────────────────────────────────────
let raw;
try {
  raw = readFileSync(CSV_PATH, 'utf8');
} catch {
  fail(`arquivo não encontrado: data/portfolios.csv`);
}

// Excel adiciona BOM no início do arquivo; removemos.
if (raw.charCodeAt(0) === 0xfeff) raw = raw.slice(1);

// Excel em português exporta com ";" — detectamos pelo cabeçalho.
const headerLine = raw.slice(0, raw.indexOf('\n'));
const delimiter =
  (headerLine.match(/;/g)?.length ?? 0) > (headerLine.match(/,/g)?.length ?? 0)
    ? ';'
    : ',';

let rows;
try {
  rows = parse(raw, {
    columns: true,
    delimiter,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  });
} catch (err) {
  fail(`CSV mal formado: ${err.message}`);
}

// ── Validação ────────────────────────────────────────────
const REQUIRED = ['name', 'url', 'description', 'area', 'country'];
const errors = [];

const items = rows.map((row, i) => {
  // +2: linha 1 é o cabeçalho e o índice começa em 0.
  const line = i + 2;
  const label = row.name || '(sem nome)';

  for (const field of REQUIRED) {
    if (!row[field]?.trim()) {
      errors.push(`Linha ${line} (${label}): campo obrigatório "${field}" está vazio.`);
    }
  }

  let url = row.url?.trim() ?? '';
  let domain = '';
  try {
    const parsed = new URL(url);
    if (!/^https?:$/.test(parsed.protocol)) throw new Error();
    domain = parsed.hostname.replace(/^www\./, '');
  } catch {
    if (url) errors.push(`Linha ${line} (${label}): campo "url" inválido: "${url}". Use http:// ou https://.`);
  }

  const quality = Number(row.quality);
  if (!Number.isInteger(quality) || quality < 1 || quality > 5) {
    errors.push(`Linha ${line} (${label}): campo "quality" deve ser um número inteiro de 1 a 5 (recebido: "${row.quality}").`);
  }

  return {
    name: row.name?.trim() ?? '',
    url,
    description: row.description?.trim() ?? '',
    area: row.area?.trim() ?? '',
    roles: row.roles?.trim() ?? '',
    country: row.country?.trim() ?? '',
    quality: '⭐'.repeat(Number.isInteger(quality) ? Math.min(Math.max(quality, 0), 5) : 0),
    status: row.status?.trim() || 'Ativo',
    verifiedAt: row.verifiedAt?.trim() ?? '',
    domain,
    thumbnail: THUMBNAIL_TEMPLATE(url),
  };
});

if (rows.length === 0) errors.push('O CSV não tem nenhuma linha de dados.');

if (errors.length > 0) {
  console.error('\n❌ Erros no data/portfolios.csv — corrija e tente de novo:\n');
  for (const e of errors) console.error(`   • ${e}`);
  console.error('');
  process.exit(1);
}

// ── Saída ────────────────────────────────────────────────
writeFileSync(OUT_PATH, JSON.stringify(items, null, 2) + '\n');
console.log(`✅ ${items.length} portfólios validados → src/data/portfolioItems.json (delimitador "${delimiter}")`);

function fail(msg) {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
}
