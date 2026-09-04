import Image from "next/image";
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

/**
 * Ponte e comparação de busca: imagens estáticas fornecidas pelo dono (fora do
 * sistema SVG+CSS das outras cenas — sem animação própria, só o fade/scale de
 * entrada genérico que toda `.chapterVisual` tem ao entrar na tela).
 */
export function BridgeIllustration({ className }: IllustrationProps) {
  return (
    <Image
      className={className}
      src="/images/problem/ponte.webp"
      alt="Um mascote carrega a peça que falta para completar uma ponte entre a loja e os clientes que esperam do outro lado."
      width={1672}
      height={941}
      sizes="(max-width: 900px) 100vw, 50vw"
    />
  );
}

export function FunnelIllustration({ className }: IllustrationProps) {
  return (
    <Image
      className={className}
      src="/images/problem/comparacao-busca.webp"
      alt="Numa busca, o resultado com site profissional se destaca, com mais avaliações e informações completas; o resultado sem site fica sem link e some da rota de clientes."
      width={1023}
      height={1537}
      sizes="(max-width: 900px) 100vw, 50vw"
    />
  );
}
