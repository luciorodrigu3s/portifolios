# Como atualizar a lista de portfólios

A lista do site vem **inteira** do arquivo [`portfolios.csv`](./portfolios.csv) nesta pasta.
Você não precisa mexer em código: edite o CSV, salve, e o site republica sozinho em ~1 minuto.

## Jeito 1 — Editar direto no GitHub (mais rápido)

1. Abra o arquivo [`portfolios.csv`](./portfolios.csv) aqui no GitHub.
2. Clique no ícone de **lápis** (✏️ "Edit this file") no canto superior direito.
3. Faça a alteração (adicionar linha, corrigir texto, remover linha).
4. Clique em **Commit changes** (pode manter a mensagem sugerida).
5. Pronto. Em ~1 minuto o site atualiza: <https://luciorodrigu3s.github.io/portifolios/>

## Jeito 2 — Editar numa planilha e fazer upload

1. Baixe o `portfolios.csv` (botão **Download raw file**).
2. Abra no Excel, Google Sheets ou Numbers e edite à vontade.
3. Exporte/salve como **CSV** (no Excel: "CSV UTF-8"; separador `,` ou `;` — os dois funcionam).
4. Nesta pasta (`data/`), clique em **Add file → Upload files** e envie o arquivo com o mesmo nome `portfolios.csv`.
5. Clique em **Commit changes**.

## O que cada coluna significa

| Coluna | Obrigatória | Exemplo | Observação |
|---|---|---|---|
| `name` | ✅ | `Tobias van Schneider` | Nome do designer/estúdio |
| `url` | ✅ | `https://vanschneider.com` | Começando com `http://` ou `https://` |
| `description` | ✅ | `Portfolio multidisciplinar...` | Texto curto; vírgulas são permitidas |
| `area` | ✅ | `Brand Design, Art Direction` | Separe múltiplas áreas com vírgula |
| `roles` | — | `Creative Director` | Cargo/função |
| `country` | ✅ | `Brasil` ou `Brasil / EUA` | Múltiplos países separados por ` / ` |
| `quality` | ✅ | `4` | Número inteiro de **1 a 5** |
| `status` | — | `Ativo` | Se vazio, assume `Ativo` |
| `verifiedAt` | — | `2025-05` | Ano-mês da última verificação |

**Você não precisa preencher** domínio nem thumbnail — o site deduz os dois a partir da `url`.

## Se o site não atualizar

1. Vá na aba [**Actions**](https://github.com/luciorodrigu3s/portifolios/actions) do repositório.
2. Se a última execução estiver com ❌ vermelho, clique nela e abra o job `build`.
3. O erro aparece em português, apontando **a linha e o campo** com problema, por exemplo:
   `❌ Linha 12 (Fulano): campo "url" inválido: "htp://fulano.com". Use http:// ou https://.`
4. Corrija a linha indicada no CSV e salve de novo.

## Dicas

- Para **remover** um portfólio, apague a linha inteira.
- Para **adicionar**, copie uma linha existente e troque os valores.
- Se o texto tiver vírgula, o Excel/Sheets cuida das aspas automaticamente ao exportar.
- Toda alteração fica no histórico do GitHub — dá pra desfazer qualquer edição.
