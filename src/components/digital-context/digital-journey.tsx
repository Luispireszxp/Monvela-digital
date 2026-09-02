import { FacebookIcon, GoogleIcon, InstagramIcon, WhatsAppIcon } from "./brand-icons";
import { LocalBusinessIllustration } from "./local-business-illustration";
import { PlatformNode } from "./platform-node";

/**
 * A jornada digital — Google, Instagram, Facebook e WhatsApp como CANAIS
 * (não como concorrentes do gráfico de busca), ligados por uma linha curva e
 * convergindo no comércio.
 *
 * Uma cena SVG só, para as curvas encostarem exatamente nos ícones; os rótulos
 * das etapas ficam em HTML, posicionados em % sobre a mesma caixa.
 */
const NODES = [
  { cx: 96, name: "Google" },
  { cx: 272, name: "Instagram" },
  { cx: 448, name: "Facebook" },
  { cx: 624, name: "WhatsApp" },
] as const;

const CY = 64;
const ICON = 34;

/** Linha entre os canais: ondas alternadas, nada reto. */
const LINKS = [
  "M130 64 C158 40 210 40 238 64",
  "M306 64 C334 88 386 88 414 64",
  "M482 64 C510 40 562 40 590 64",
];

/** Descidas até o comércio — as das pontas contornam os rótulos por fora. */
const DESCENTS = [
  "M70 90 C24 130 20 192 80 216 C162 248 286 288 350 312",
  "M272 98 C272 162 298 252 352 310",
  "M448 98 C448 162 422 252 368 310",
  "M650 90 C696 130 700 192 640 216 C558 248 434 288 370 312",
];

export function DigitalJourney({ title }: { title: string }) {
  return (
    <div className="dc-journey">
      <p className="dc-journey-title">
        <span>{title}</span>
      </p>

      <div className="dc-journey-scene">
        <svg className="dc-journey-svg" viewBox="0 0 720 450" aria-hidden="true">
          {LINKS.map((d, i) => (
            <path
              key={d}
              d={d}
              pathLength={100}
              className="dc-link"
              style={{ "--dc-link-order": i + 1 } as React.CSSProperties}
            />
          ))}

          {DESCENTS.map((d, i) => (
            <path
              key={d}
              d={d}
              pathLength={100}
              className="dc-descent"
              style={{ "--dc-descent-order": i + 1 } as React.CSSProperties}
            />
          ))}

          <PlatformNode cx={NODES[0].cx} cy={CY} name="Google" order={1}>
            <GoogleIcon x={NODES[0].cx - ICON / 2} y={CY - ICON / 2} size={ICON} />
          </PlatformNode>
          <PlatformNode cx={NODES[1].cx} cy={CY} name="Instagram" order={2}>
            <InstagramIcon x={NODES[1].cx - ICON / 2} y={CY - ICON / 2} size={ICON} />
          </PlatformNode>
          <PlatformNode cx={NODES[2].cx} cy={CY} name="Facebook" order={3}>
            <FacebookIcon x={NODES[2].cx - ICON / 2} y={CY - ICON / 2} size={ICON} />
          </PlatformNode>
          <PlatformNode cx={NODES[3].cx} cy={CY} name="WhatsApp" order={4}>
            <WhatsAppIcon x={NODES[3].cx - ICON / 2} y={CY - ICON / 2} size={ICON} />
          </PlatformNode>

          <g transform="translate(260 300)">
            <LocalBusinessIllustration className="dc-store" />
          </g>
        </svg>

        <p className="dc-stage dc-stage-search">Busca</p>
        <p className="dc-stage dc-stage-discover">Descoberta</p>
        <p className="dc-stage dc-stage-talk">Conversa</p>
      </div>
    </div>
  );
}
