# DESIGN.md — Índice (arquivo curatorial)

> Linguagem visual deste projeto. **Antes de decidir qualquer coisa, leia os Não-Negociáveis abaixo.** Não existe exceção — "só aqui" não existe. Na dúvida entre duas opções, escolha a mais contida.

Adaptado do *moku · Minimal Design System* (Chzuru Kamisono). Original: https://minimal-design-system.vercel.app

---

## Filosofia

O índice é um **arquivo de repertório**: o conteúdo são os designers, estúdios e referências — não a interface. A UI existe para tornar a leitura silenciosa e deixar o trabalho referenciado ser o protagonista.

Branco, monocromático e tipografia. Animação que tenta **não ser percebida**. Nada compete com a referência.

---

## Não-Negociáveis

1. **Monochrome First** — só os 4 tokens semânticos de cor. Nada fora da paleta.
2. **Border-radius: 0** — arestas vivas em todos os elementos.
3. **Uma fonte: Inter (weight 400)** — sem negrito, sem itálico. Hierarquia se faz por **tamanho e espaçamento**, nunca por peso.
4. **Motion Comfort** — respeitar `prefers-reduced-motion`. Hover muda **só cor ou opacidade**; nunca posição, escala ou sombra.
5. **Content First** — a interface jamais compete com o trabalho referenciado.
6. **Cor não carrega significado** — categoria, tag e estado se expressam por **texto, posição ou borda**, nunca por cor.
7. **Todo valor vem de token** — proibido hardcode (`#15171A`, `16px`). Se um valor novo é preciso, primeiro tokenize.

---

## Tokens

Tudo vive em [`tokens.css`](./styles/tokens.css).

- **Primitivas** (`--gray-*`, `--space-*`, `--font-size-*`) só são referenciadas *dentro* de `tokens.css`.
- **Semânticos** (`--color-text`, `--text-body-*`, `--spacing-*`) são os únicos usados no código de UI.
- Dark mode é automático: os mesmos 4 nomes de token trocam via `prefers-color-scheme`.

---

## Estrutura

| Camada   | Lugar                  | Papel                          |
| -------- | ---------------------- | ------------------------------ |
| Critério | `DESIGN.md`            | Filosofia / Não-Negociáveis    |
| Base     | `tokens.css`           | Tokens + estilos-base          |
| Padrões  | `patterns/` *(futuro)* | `entry`, `list`, `tag`         |
| Skill    | `skills/`  *(futuro)*  | gerador de entradas no padrão  |

---

## Padrões do índice *(a evoluir)*

- **entry** — uma referência: nome, papel/estúdio, link, nota curta. Nome em `.title-s` ou `.label-l`; nota em `.caption` (`--color-stronggray`).
- **list / index** — lista vertical com `--spacing-ws-row` entre itens, ou `.grid-3` com `--spacing-gap-column`. Colapsa para 1 coluna no mobile.
- **tag** — rótulo de categoria. Fundo `--color-softgray`, texto `--color-text`, sem cor e sem raio (classe `.tag`).

---

## Para agentes de IA (Claude Code)

Antes de gerar ou editar qualquer coisa:

1. Ler os **Não-Negociáveis** acima. Não criar exceções.
2. Usar **apenas tokens semânticos** de `tokens.css`. Nunca escrever hex ou px diretamente.
3. Na dúvida entre duas opções, escolher a **mais contida**.
4. **Nunca usar cor** para diferenciar categorias ou estados.
5. Toda nova referência segue o padrão **entry**. Toda animação respeita `prefers-reduced-motion`.
6. Se um padrão ainda não existe em `patterns/`, propor um seguindo as regras — não improvisar fora do sistema.
