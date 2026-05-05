interface Props {
  total: number;
}

export function Masthead({ total }: Props) {
  return (
    <header className="masthead">
      <div className="masthead__left">Portfolio Index</div>
      <div className="masthead__center">
        Curated archive of designers and studios
      </div>
      <div className="masthead__right">
        <span>[{String(total).padStart(2, '0')}]</span>
        <span>MMXXVI</span>
      </div>
    </header>
  );
}
