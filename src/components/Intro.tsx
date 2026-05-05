interface Props {
  total: number;
}

export function Intro({ total }: Props) {
  return (
    <section className="intro">
      <p className="intro__lede">
        Uma curadoria visual de designers, estúdios e referências digitais para
        análise de repertório.{' '}
        <em>
          Listados por nome, área de atuação e país, com leitura tabular para
          consulta rápida.
        </em>
      </p>
      <dl className="intro__meta">
        <div>
          <dt>References</dt>
          <dd>{total} entries</dd>
        </div>
        <div>
          <dt>Updated</dt>
          <dd>2025·05</dd>
        </div>
      </dl>
    </section>
  );
}
