import styles from "./problem-story.module.css";

type IllustrationProps = { className?: string };

type StoreGlyphProps = {
  x: number;
  y: number;
  scale?: number;
  missed?: boolean;
  kind?: "shop" | "office" | "clinic";
};

function StoreGlyph({
  x,
  y,
  scale = 1,
  missed = false,
  kind = "shop",
}: StoreGlyphProps) {
  return (
    <g
      className={`${styles.storeGlyph}${missed ? ` ${styles.missedStore}` : ""}`}
      transform={`translate(${x} ${y}) scale(${scale})`}
      aria-hidden="true"
    >
      {kind === "office" ? (
        <>
          <path d="M8 70V12h58v58M20 26h10m14 0h10M20 41h10m14 0h10M31 70V53h13v17" />
          <path d="M4 70h68" />
        </>
      ) : kind === "clinic" ? (
        <>
          <path d="M7 70V25l31-20 31 20v45M25 70V49h26v21M16 30h44" />
          <path d="M34 14v12m-6-6h12M3 70h70" />
        </>
      ) : (
        <>
          <path d="M8 70V31h60v39M4 31h68L65 14H11L4 31Z" />
          <path d="M12 31v8c0 6 10 6 10 0v-8m0 0v8c0 6 10 6 10 0v-8m0 0v8c0 6 10 6 10 0v-8m0 0v8c0 6 10 6 10 0v-8m0 0v8c0 6 10 6 10 0v-8M22 70V50h22v20m8-20h9v10h-9" />
          <path d="M3 70h70" />
        </>
      )}
    </g>
  );
}

function MapPin({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g
      className={styles.mapPin}
      style={{ "--problem-delay": `${delay}ms` } as React.CSSProperties}
      transform={`translate(${x} ${y})`}
      aria-hidden="true"
    >
      <path d="M0 0c0-9 7-16 16-16S32-9 32 0c0 13-16 28-16 28S0 13 0 0Z" />
      <circle cx="16" cy="0" r="5" />
    </g>
  );
}

type MascotProps = {
  x: number;
  y: number;
  scale?: number;
  /** Direção que o mascote encara: 1 = direita (padrão), -1 = esquerda. */
  facing?: 1 | -1;
  /** Segura uma peça à frente (ex.: a prancha que completa a ponte). */
  carrying?: boolean;
  /** Inclinação em graus a partir dos pés (negativo = inclina para a esquerda). */
  lean?: number;
  className?: string;
};

/**
 * Mascote em pé sobre os próprios pés (origem local no chão, entre os pés).
 * As pernas — e os braços, quando não está carregando nada — têm dois quadros
 * que se alternam via CSS (`walkLimbA` = passo aberto, `walkLimbB` = pose
 * parada). Sem JavaScript ou com movimento reduzido, fica na pose parada.
 */
function Mascot({
  x,
  y,
  scale = 1,
  facing = 1,
  carrying = false,
  lean = 0,
  className,
}: MascotProps) {
  return (
    <g
      className={`${styles.mascot}${className ? ` ${className}` : ""}`}
      transform={`translate(${x} ${y}) scale(${facing * scale} ${scale})${lean ? ` rotate(${lean})` : ""}`}
      aria-hidden="true"
    >
      <g className={styles.mascotBob}>
        <circle cx="0" cy="-98" r="14" />
        <path d="M0 -84L0 -36" />

        {carrying ? (
          <>
            <path d="M0 -69q13 -6 25 -4M0 -58q13 6 25 4" />
            <rect
              className={styles.mascotLoad}
              x="22"
              y="-74"
              width="46"
              height="12"
              rx="2.5"
            />
          </>
        ) : (
          <>
            <path className={styles.walkLimbA} d="M0 -68-17-50M0 -68 17-56" />
            <path className={styles.walkLimbB} d="M0 -68-12-48M0 -68 12-48" />
          </>
        )}

        <path className={styles.walkLimbA} d="M0 -36-15 13M0 -36 17 10" />
        <path className={styles.walkLimbB} d="M0 -36-7 14M0 -36 8 14" />
      </g>
    </g>
  );
}

export function CityIllustration({ className }: IllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 760 440"
      role="img"
      aria-labelledby="problem-city-title"
    >
      <title id="problem-city-title">
        Uma cidade é analisada por um holofote digital; vários comércios são encontrados,
        enquanto o comércio central permanece apagado.
      </title>

      <path className={styles.cityHorizon} d="M24 330Q380 238 736 330" aria-hidden="true" />
      <path className={styles.cityGround} d="M18 334Q380 245 742 334" aria-hidden="true" />
      <path className={styles.spotlightBeam} d="M380 425L112 302Q380 228 648 302Z" aria-hidden="true" />

      <StoreGlyph x={62} y={252} scale={0.82} />
      <StoreGlyph x={176} y={210} scale={1.08} kind="office" />
      <StoreGlyph x={333} y={238} scale={1.03} missed />
      <StoreGlyph x={456} y={210} scale={1.05} kind="clinic" />
      <StoreGlyph x={580} y={250} scale={0.82} />
      <StoreGlyph x={669} y={277} scale={0.65} />

      <MapPin x={78} y={236} delay={120} />
      <MapPin x={198} y={188} delay={220} />
      <MapPin x={475} y={187} delay={340} />
      <MapPin x={596} y={234} delay={460} />
      <MapPin x={684} y={258} delay={580} />

      <g className={styles.spotlightMascot} transform="translate(348 350)" aria-hidden="true">
        <circle cx="32" cy="18" r="13" />
        <path d="M32 32v43m0-28-20 19m20-19 21 18M32 75 17 105m15-30 17 30" />
        <path className={styles.spotlightDevice} d="M19 0h26v16H19zM25 0V-7h14V0" />
        <path className={styles.signalStroke} d="M13 0Q5 8 13 16M7-7Q-6 8 7 23" />
      </g>
    </svg>
  );
}

export function RadarIllustration({ className }: IllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 760 520"
      role="img"
      aria-labelledby="problem-radar-title"
    >
      <title id="problem-radar-title">
        Um radar digital encontra vários comércios, mas não identifica o negócio central.
      </title>

      <g transform="translate(452 262)" aria-hidden="true">
        {[70, 124, 178, 232].map((radius, index) => (
          <circle
            className={styles.radarRing}
            style={{ "--ring-delay": `${index * 120}ms` } as React.CSSProperties}
            key={radius}
            r={radius}
          />
        ))}
        <g className={styles.radarSweepPivot}>
          <path className={styles.radarSweep} d="M0 0L232 0A232 232 0 0 0 150-177Z" />
          <path className={styles.radarSweepEdge} d="M0 0 232 0" />
        </g>
        <circle className={styles.radarCenter} r="7" />
      </g>

      <g className={styles.radarTargets} aria-hidden="true">
        <circle cx="452" cy="150" r="6" />
        <circle cx="604" cy="212" r="6" />
        <circle cx="624" cy="360" r="6" />
        <circle cx="470" cy="452" r="6" />
        <circle cx="300" cy="372" r="6" />
        <StoreGlyph x={584} y={224} scale={0.38} />
        <StoreGlyph x={604} y={372} scale={0.38} />
        <StoreGlyph x={280} y={384} scale={0.38} />
      </g>

      <g className={styles.radarMissed} transform="translate(418 228)" aria-hidden="true">
        <circle cx="34" cy="34" r="48" />
        <StoreGlyph x={18} y={17} scale={0.43} missed />
      </g>

      <Mascot x={132} y={326} scale={1.26} className={styles.radarMascot} />
      <g className={styles.radarMascotSignal} aria-hidden="true">
        <path className={styles.signalStroke} d="M156 246q18 16 0 36M170 234q28 28 0 60M184 222q42 40 0 84" />
      </g>
    </svg>
  );
}

export function BridgeIllustration({ className }: IllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 460"
      role="img"
      aria-labelledby="problem-bridge-title"
    >
      <title id="problem-bridge-title">
        O mascote leva a peça que faltava e completa uma ponte de informações entre um
        comércio e seus clientes.
      </title>

      <g className={styles.bridgeLeft} aria-hidden="true">
        <path className={styles.island} d="M0 300H246l-12 134H0Z" />
        <StoreGlyph x={68} y={230} scale={1.06} />
      </g>
      <g className={styles.bridgeRight} aria-hidden="true">
        <path className={styles.island} d="M800 300H554l12 134h234Z" />
        <g className={styles.people} transform="translate(632 230)">
          <g>
            <circle cx="0" cy="0" r="9" />
            <path d="M0 10v34m0-22-18 12m18-12 18 12M0 44l-15 28M0 44l15 28" />
          </g>
          <g transform="translate(46 -26)">
            <circle cx="0" cy="0" r="9" />
            <path d="M0 10v34m0-22-16-16m16 16 16-16M0 44l-15 28M0 44l15 28" />
          </g>
          <g transform="translate(94 4)">
            <circle cx="0" cy="0" r="9" />
            <path d="M0 10v34m0-22-18 10m18-10 18-10M0 44l-15 28M0 44l15 28" />
          </g>
        </g>
      </g>

      <g className={styles.bridgeDeck} aria-hidden="true">
        <path
          className={styles.bridgeSegment}
          style={{ "--segment": 0 } as React.CSSProperties}
          d="M236 300h58l-4 34h-58Z"
        />
        <path
          className={styles.bridgeSegment}
          style={{ "--segment": 1 } as React.CSSProperties}
          d="M298 300h58l-3 34h-58Z"
        />
        <path className={styles.bridgeGap} d="M360 300h72l-2 34h-72Z" />
        <path
          className={styles.bridgeSegment}
          style={{ "--segment": 3 } as React.CSSProperties}
          d="M444 300h58l-3 34h-58Z"
        />
        <path
          className={styles.bridgeSegment}
          style={{ "--segment": 4 } as React.CSSProperties}
          d="M506 300h58l-4 34h-58Z"
        />
        <path className={styles.bridgePiece} d="M360 300h72l-2 34h-72Z" />
      </g>

      <g className={styles.bridgeSymbols} aria-hidden="true">
        <path d="M251 314l7 7 12-14" />
        <path d="M327 309l9 9-9 9-9-9Z" />
        <path d="M535 309v18m-9-9h18" />
      </g>

      <Mascot
        x={334}
        y={290}
        scale={0.78}
        carrying
        className={styles.bridgeMascot}
      />
    </svg>
  );
}

const opportunityDots = [
  { cx: 300, cy: 300, dx: 150, dy: -150, delay: 0, main: true },
  { cx: 262, cy: 338, dx: 112, dy: -112, delay: 150, main: true },
  { cx: 470, cy: 322, dx: -128, dy: -150, delay: 40 },
  { cx: 512, cy: 352, dx: -170, dy: -182, delay: 150 },
  { cx: 548, cy: 388, dx: -206, dy: -218, delay: 260 },
  { cx: 596, cy: 414, dx: -252, dy: -244, delay: 370 },
  { cx: 486, cy: 404, dx: -142, dy: -234, delay: 480 },
];

export function FunnelIllustration({ className }: IllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 760 520"
      role="img"
      aria-labelledby="problem-funnel-title"
    >
      <title id="problem-funnel-title">
        Um funil envia a maior parte das oportunidades aos concorrentes enquanto o mascote
        puxa algumas de volta para o comércio principal.
      </title>

      <g className={styles.funnel} aria-hidden="true">
        <ellipse cx="360" cy="86" rx="188" ry="44" />
        <path d="M172 86c14 74 84 118 132 168v58M548 86c-14 74-84 118-132 168" />
        <path className={styles.funnelTangle} d="M270 96c120-26 150 40 70 52-64 10-30 58 30 40" />
      </g>

      <path
        className={styles.competitorPath}
        d="M404 320C452 350 520 372 612 420"
        aria-hidden="true"
      />
      <path
        className={styles.mainOpportunityPath}
        d="M320 320C280 348 236 356 150 380"
        aria-hidden="true"
      />

      {opportunityDots.map((dot) => (
        <circle
          key={`${dot.cx}-${dot.cy}`}
          className={`${styles.opportunityDot} ${dot.main ? styles.mainDot : styles.competitorDot}`}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.main ? 8 : 6}
          style={
            {
              "--dot-x": `${dot.dx}px`,
              "--dot-y": `${dot.dy}px`,
              "--dot-delay": `${dot.delay}ms`,
            } as React.CSSProperties
          }
          aria-hidden="true"
        />
      ))}

      <StoreGlyph x={92} y={368} scale={1.08} />
      <StoreGlyph x={560} y={392} scale={0.86} />
      <StoreGlyph x={664} y={412} scale={0.7} />

      <Mascot
        x={322}
        y={402}
        scale={1.12}
        lean={-8}
        className={styles.funnelMascot}
      />
      {/* gesto do mascote puxando oportunidades de volta para a loja principal,
         da mão dele até a entrada da loja, com ponta de seta */}
      <path
        className={styles.redirectLine}
        d="M300 350C252 372 208 374 156 372M156 372l16-8M156 372l16 9"
        aria-hidden="true"
      />
    </svg>
  );
}
