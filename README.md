# Portfolio Index

Curadoria visual de designers, estúdios e referências digitais para análise de repertório.

**Site:** <https://luciorodrigu3s.github.io/portifolios/>

## Como atualizar a lista (sem programar)

Os dados vêm de [`data/portfolios.csv`](./data/portfolios.csv). Edite o CSV pelo GitHub e o site republica sozinho.

👉 **Guia passo a passo: [`data/README.md`](./data/README.md)**

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:5173 (gera os dados do CSV automaticamente)
npm run build    # valida o CSV + build de produção em dist/
```

Stack: Vite + React + TypeScript, CSS puro com design tokens. Deploy automático via GitHub Actions → GitHub Pages a cada push.

### Pipeline de dados

```
data/portfolios.csv ──▶ scripts/build-data.mjs ──▶ src/data/portfolioItems.json ──▶ app
                        (valida, deriva domain           (gerado, fora do git)
                         e thumbnail da URL)
```

O build **falha com mensagem legível** (linha + campo) se o CSV estiver inválido — nada quebrado chega ao ar.
