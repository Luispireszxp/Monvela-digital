import type { ReactNode } from "react";

/**
 * Um canal da jornada: disco claro com anel laranja e o ícone oficial da marca.
 * Vive dentro do SVG da jornada; `cx`/`cy` são coordenadas da cena.
 */
export function PlatformNode({
  cx,
  cy,
  r = 34,
  name,
  order,
  children,
}: {
  cx: number;
  cy: number;
  r?: number;
  name: string;
  /** 1..4 — escalona o atraso de entrada na animação. */
  order: number;
  children: ReactNode;
}) {
  return (
    <g className="dc-node" style={{ "--dc-node-order": order } as React.CSSProperties}>
      <title>{name}</title>
      <circle cx={cx} cy={cy} r={r} className="dc-node-disc" />
      <circle cx={cx} cy={cy} r={r} className="dc-node-ring" />
      {children}
    </g>
  );
}
