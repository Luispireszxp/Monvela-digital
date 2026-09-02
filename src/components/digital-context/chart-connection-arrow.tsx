/**
 * Seta curva que sai de uma fatia do donut e aponta para a legenda.
 *
 * O traço usa `pathLength="100"`, então o desenho progressivo é sempre
 * `stroke-dashoffset: 100 → 0`, independente do comprimento real da curva.
 * A ponta são dois traços curtos com ponta arredondada — nada pontudo.
 */
export function ChartConnectionArrow({
  path,
  head,
  className,
  order,
}: {
  path: string;
  /** Os dois traços da ponta, já posicionados na cena. */
  head: string;
  className?: string;
  /** Escalona o atraso de entrada. */
  order: number;
}) {
  return (
    <g
      className={`dc-arrow ${className ?? ""}`}
      style={{ "--dc-arrow-order": order } as React.CSSProperties}
    >
      <path d={path} pathLength={100} className="dc-arrow-line" />
      <path d={head} className="dc-arrow-head" />
    </g>
  );
}
