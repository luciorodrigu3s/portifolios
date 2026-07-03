interface Props {
  total: number;
}

export function Intro({ total }: Props) {
  return (
    <section className="v2-intro">
      <h1 className="title-l v2-intro__title">
        Curadoria de designers, estúdios e referências digitais.
      </h1>
      <p className="body v2-intro__lede">
        Um arquivo de repertório para consulta rápida — listado por nome, área
        de atuação e país.
      </p>
      <p className="caption">
        {total} referências · Atualizado 2025·05 · v2 sobre o moku · Minimal
        Design System
      </p>
    </section>
  );
}
