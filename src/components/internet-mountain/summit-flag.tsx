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
        <line x1={358} y1={44} x2={904} y2={36} />
        <line x1={338} y1={78} x2={846} y2={84} />
        <line x1={420} y1={114} x2={760} y2={107} />
      </g>

      <g className="im-flag" aria-hidden="true">
        <rect
          className="im-pole"
          x={PEAK.x - 1.5}
          y={18}
          width={3}
          height={PEAK.y - 18 + 4}
          rx={1.5}
        />
        <g className="im-flag-cloth">
          <g className="im-flag-wave">
            <path d="M602 26 C 648 16 700 34 744 24 C 742 44 742 56 744 76 C 700 66 648 84 602 73 Z" />
            <text x={672} y={52} textAnchor="middle">
              SUA EMPRESA
            </text>
          </g>
        </g>
      </g>
    </>
  );
}
