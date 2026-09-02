import { CONTOURS } from "./scene-data";

/**
 * A "montanha da internet": estratos topográficos ondulados em cinza-escuro
 * sobre o fundo azul-marinho. Sem pedras, neve ou 3D — só o contorno.
 *
 * Base = tudo desenhado (`strokeDashoffset` 0). Com JS, `mountain-scene.tsx`
 * zera e refaz o traçado de baixo para cima conforme a seção entra.
 */
export function TopographicMountain() {
  return (
    <g className="im-mountain">
      {CONTOURS.map((c, i) => (
        <path
          key={i}
          className="im-contour"
          d={c.d}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={0}
          opacity={c.opacity}
        />
      ))}
    </g>
  );
}
