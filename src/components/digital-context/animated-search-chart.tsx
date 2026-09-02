import { AnimatedPercentage } from "./animated-percentage";
import { ChartConnectionArrow } from "./chart-connection-arrow";
import { GoogleIcon } from "./brand-icons";

/**
 * Donut de participação entre MECANISMOS DE BUSCA.
 *
 * A divisão é exatamente 87,5 / 12,5: com `pathLength="100"` cada arco recebe
 * `stroke-dasharray` em pontos percentuais, então o desenho é o número — não
 * uma aproximação visual. O arco cinza ocupa 0→12,5% e o laranja 12,5→100%,
 * partindo das 12h no sentido horário.
 *
 * Redes sociais NÃO entram aqui: elas não são mecanismos de busca e aparecem
 * separadas, na jornada.
 */
const CENTER = { x: 400, y: 260 };
const R = 118;

/** Seta da fatia laranja descendo até a identificação do Google. */
const GOOGLE_ARROW = "M342 396 C316 430 284 458 250 476";
const GOOGLE_ARROW_HEAD = "M264 478 L250 476 M258 463 L250 476";

/** Seta da fatia cinza subindo até "Outros buscadores". */
const OTHERS_ARROW = "M458 126 C492 100 520 84 552 76";
const OTHERS_ARROW_HEAD = "M540 86 L552 76 M539 71 L552 76";

export function AnimatedSearchChart() {
  return (
    <div className="dc-chart">
      <svg className="dc-chart-svg" viewBox="0 0 800 640" aria-hidden="true">
        {/* trilho de fundo */}
        <circle cx={CENTER.x} cy={CENTER.y} r={R} className="dc-ring-track" />

        {/* A rotação de -90° (começar às 12h) vive no CSS, junto com a animação
            de giro. Ela NÃO pode ser um atributo `transform` aqui: somada ao
            `transform-box: fill-box`, a origem seria aplicada duas vezes e os
            arcos sairiam do viewBox. */}
        <g className="dc-ring-group">
          {/* outros buscadores: 0 → 12,5% */}
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={R}
            pathLength={100}
            strokeDasharray="12.5 87.5"
            className="dc-ring-others"
          />
          {/* Google: 12,5% → 100% */}
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={R}
            pathLength={100}
            strokeDasharray="87.5 12.5"
            strokeDashoffset={-12.5}
            className="dc-ring-google"
          />
        </g>

        <ChartConnectionArrow
          path={GOOGLE_ARROW}
          head={GOOGLE_ARROW_HEAD}
          className="dc-arrow-google"
          order={1}
        />
        <ChartConnectionArrow
          path={OTHERS_ARROW}
          head={OTHERS_ARROW_HEAD}
          className="dc-arrow-others"
          order={2}
        />

        {/* o "G" oficial junto da legenda do Google */}
        <g className="dc-google-mark">
          <circle cx="186" cy="512" r="26" className="dc-google-disc" />
          <GoogleIcon x={170} y={496} size={32} />
        </g>
      </svg>

      <AnimatedPercentage />

      <p className="dc-legend dc-legend-google">
        <span className="dc-legend-name">Google</span>
        <span className="dc-legend-dash" aria-hidden="true">
          —
        </span>
        <span className="dc-legend-value">87,5%</span>
      </p>

      <p className="dc-legend dc-legend-others">
        <span className="dc-legend-swatch" aria-hidden="true" />
        <span className="dc-legend-name">Outros buscadores</span>
        <span className="dc-legend-dash" aria-hidden="true">
          —
        </span>
        <span className="dc-legend-value">12,5%</span>
      </p>
    </div>
  );
}
