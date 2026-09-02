import { PEAK } from "./scene-data";

/**
 * Bandeira do topo: haste branca fina + tecido branco que se desenrola para a
 * direita. Depois de aberta, o tecido balança sozinho, de leve e para sempre
 * (única coisa que continua em movimento quando a sequência termina).
 *
 * A haste cresce de baixo para cima (`scaleY`, origem na base). O tecido abre
 * com `scaleX` a partir da haste. As linhas de vento só aparecem (fade) no
 * momento em que a bandeira é fincada.
 */
export function SummitFlag() {
  return (
    <>
      <g className="im-wind" aria-hidden="true" opacity={0}>
        <line x1={358} y1={70} x2={904} y2={62} />
        <line x1={338} y1={104} x2={846} y2={110} />
        <line x1={420} y1={140} x2={760} y2={133} />
      </g>

      <g className="im-flag" aria-hidden="true">
        <rect
          className="im-pole"
          x={PEAK.x - 1.5}
          y={44}
          width={3}
          height={PEAK.y - 44 + 4}
          rx={1.5}
        />
        <g className="im-flag-cloth">
          <g className="im-flag-wave">
            <path d="M602 52 C 648 42 700 60 744 50 C 742 70 742 82 744 102 C 700 92 648 110 602 99 Z" />
          </g>
        </g>
      </g>
    </>
  );
}
