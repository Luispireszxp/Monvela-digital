/**
 * Dados e matemática da cena "Montanha da internet".
 *
 * Tudo aqui é puro e determinístico (sem Math.random): roda igual no servidor e
 * no cliente, então as strings de path e o quadro-base (`REST_FRAME`) podem ir
 * direto no HTML. O scrub em si (ler a rolagem e escrever nos elementos) fica em
 * `mountain-scene.tsx` — este arquivo só responde "como está a cena em `p`".
 *
 * Sistema de coordenadas: viewBox 0 0 1440 788, y para baixo.
 * Ângulos dos membros: 0 = aponta para baixo, positivo = gira para a direita da
 * tela. Ângulo do tronco: 0 = para cima, positivo = inclina para a direita.
 */

export const DEG = Math.PI / 180;

export const clamp01 = (x: number): number => (x < 0 ? 0 : x > 1 ? 1 : x);
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
export const smooth = (t: number): number => {
  const c = clamp01(t);
  return c * c * (3 - 2 * c);
};
export const smoother = (t: number): number => {
  const c = clamp01(t);
  return c * c * c * (c * (c * 6 - 15) + 10);
};
/** Progresso normalizado de `p` dentro da janela [a, b], preso a 0..1. */
const win = (p: number, a: number, b: number): number => clamp01((p - a) / (b - a));

// ---------------------------------------------------------------------------
// Geometria fixa
// ---------------------------------------------------------------------------

export const PEAK = { x: 602, y: 174 } as const;
const BASE_Y = 750;
const HALF_L = 520; // meia-largura da montanha na base, lado da subida
const HALF_R = 560; // lado da queda (um pouco mais largo/suave)
const HALF_MIN = 34; // meia-largura do estrato do topo (ponta da montanha)

const SEG = {
  torso: 25,
  upperArm: 11,
  foreArm: 11,
  thigh: 13,
  shin: 13,
  neck: 9,
  headR: 6.3,
} as const;

/** Perfil da encosta esquerda (subida) — coincide com a ponta esq. dos estratos. */
export function ridgeLeftY(x: number): number {
  return lerp(BASE_Y, PEAK.y, clamp01((x - (PEAK.x - HALF_L)) / (HALF_L - HALF_MIN)));
}
/** Perfil da encosta direita (queda) — coincide com a ponta dir. dos estratos. */
export function ridgeRightY(x: number): number {
  return lerp(BASE_Y, PEAK.y, clamp01((PEAK.x + HALF_R - x) / (HALF_R - HALF_MIN)));
}

// ---------------------------------------------------------------------------
// Montanha topográfica — estratos horizontais ondulados, empilhados da base
// ao pico. Cada linha vai da borda esquerda à direita na sua altura, com as
// pontas ancoradas na silhueta e ondulação maior embaixo. As bordas coincidem
// com ridgeLeftY / ridgeRightY, então o mascote sobe/desce coladinho nelas.
// ---------------------------------------------------------------------------

export type Contour = {
  readonly d: string;
  /** Início do traçado progressivo, em progresso de cena (0..1). */
  readonly start: number;
  readonly span: number;
  readonly opacity: number;
};

function makeContour(i: number, count: number): Contour {
  const e = Math.pow(i / (count - 1), 0.86); // 0 = estrato da base, 1 = do pico
  const y0 = lerp(BASE_Y, PEAK.y, e);
  const halfL = lerp(HALF_L, HALF_MIN, e);
  const halfR = lerp(HALF_R, HALF_MIN, e);
  const x0 = PEAK.x - halfL;
  const x1 = PEAK.x + halfR;
  const seed = i * 2.13 + 1.7;

  const N = 74;
  let d = "";
  for (let s = 0; s <= N; s++) {
    const u = s / N;
    const env = Math.sin(Math.PI * u); // 0 nas pontas → ancora na silhueta
    const amp = env * (4.5 + 9 * (1 - e));
    const n =
      Math.sin(u * 6.3 + seed) +
      Math.sin(u * 13.9 + seed * 1.6) * 0.5 +
      Math.sin(u * 29.7 + seed * 2.7) * 0.26;
    const wob = Math.sin(u * 3.1 + seed * 0.7) * 6 * (1 - e) * env;
    const x = lerp(x0, x1, u) + Math.sin(u * 9.2 + seed * 1.9) * 3 * env;
    const y = y0 + n * amp + wob;
    d += (s === 0 ? "M " : " L ") + x.toFixed(1) + " " + y.toFixed(1);
  }

  return {
    d,
    start: 0.004 + e * 0.092, // base primeiro, topo por último
    span: 0.05,
    opacity: Number((0.47 - e * 0.14).toFixed(3)),
  };
}

export const CONTOUR_COUNT = 30;
export const CONTOURS: readonly Contour[] = Array.from(
  { length: CONTOUR_COUNT },
  (_, i) => makeContour(i, CONTOUR_COUNT),
);

// ---------------------------------------------------------------------------
// Keyframes de posição (pélvis no espaço do viewBox) e de pose (ângulos)
// ---------------------------------------------------------------------------

type Place = {
  /** progresso da cena */ p: number;
  x: number;
  y: number;
  /** escala */ s: number;
  /** rotação da figura inteira, em graus (contínua no capotamento) */ r: number;
};

/** Na encosta esquerda (subida), pélvis `dy` acima da borda. */
const onLeft = (p: number, x: number, dy: number, s: number, r: number): Place => ({
  p,
  x,
  y: ridgeLeftY(x) - dy,
  s,
  r,
});
/** Na encosta direita (queda). */
const onRight = (p: number, x: number, dy: number, s: number, r: number): Place => ({
  p,
  x,
  y: ridgeRightY(x) - dy,
  s,
  r,
});

const KEYS: readonly Place[] = [
  onLeft(0.0, 158, 22, 2.0, 0),
  onLeft(0.09, 184, 22, 1.97, 0),
  onLeft(0.16, 242, 22, 1.93, 4),
  onLeft(0.24, 302, 22, 1.87, 6),
  onLeft(0.32, 362, 22, 1.82, 7),
  onLeft(0.4, 420, 22, 1.77, 8),
  onLeft(0.48, 476, 22, 1.71, 8),
  onLeft(0.545, 524, 22, 1.66, 7),
  onLeft(0.6, 566, 20, 1.62, 4),
  onLeft(0.63, 588, 18, 1.61, 2),
  { p: 0.655, x: 600, y: PEAK.y - 16, s: 1.6, r: 0 },
  { p: 0.7, x: 602, y: PEAK.y - 32, s: 1.59, r: 0 },
  { p: 0.725, x: 611, y: PEAK.y - 26, s: 1.58, r: 10 },
  { p: 0.745, x: 620, y: PEAK.y - 20, s: 1.575, r: 18 },
  { p: 0.76, x: 629, y: PEAK.y - 12, s: 1.575, r: 26 },
  onRight(0.8, 736, 16, 1.52, 214),
  onRight(0.84, 850, 7, 1.45, 486),
  onRight(0.878, 960, 3, 1.39, 762),
  onRight(0.91, 1058, 1, 1.35, 1010),
  onRight(0.93, 1114, 20, 1.34, 1080),
  onRight(0.955, 1158, -4, 1.36, 1080),
  onRight(1.0, 1166, -8, 1.36, 1080),
];

/** [tronco, cabeça, braçoEsq(ombro,cotovelo), braçoDir, pernaEsq(quadril,joelho), pernaDir] */
type Pose = readonly [
  number, number,
  number, number,
  number, number,
  number, number,
  number, number,
];

const P = {
  STAND: [-2, 0, 12, 15, -12, -15, -5, -3, 6, 4],
  OBSERVE: [14, -15, -8, -16, 26, 40, -9, -4, 13, 9],
  REACH: [25, -8, -32, -55, 48, 68, 34, 72, -8, 4],
  CLIMB_A: [23, -5, 46, 64, -26, -46, 32, 70, 10, 6],
  CLIMB_B: [26, -9, -28, -50, 50, 68, -8, 4, 36, 76],
  CLIMB_C: [29, -4, 48, 66, -22, -42, 34, 72, 12, 8],
  CREST: [40, 12, -64, -92, -56, -84, -6, 46, 10, 50],
  PLANT: [17, 5, 16, 34, 26, 46, -10, 26, 12, 30],
  SUMMIT: [-6, -12, -30, -52, 12, 8, -6, -4, 7, 5],
  WOBBLE: [14, 16, -46, -88, 64, 104, -24, -52, 14, 34],
  TEETER: [22, 22, -58, -100, 78, 120, -34, -66, 10, 40],
  TEETER2: [25, 24, -62, -104, 82, 124, -38, -70, 9, 42],
  TUMBLE: [4, 0, -40, -74, 42, 78, -30, -58, 34, 62],
  IMPACT: [10, 12, -28, -66, 30, 68, 42, 80, 48, 84],
  SIT_LAND: [-25, -3, -22, -14, 16, 10, 80, 86, 100, 106],
  SIT_REST: [-15, -8, -16, -10, 12, 8, 87, 93, 96, 101],
} satisfies Record<string, Pose>;

const POSES: readonly { p: number; pose: Pose }[] = [
  { p: 0.0, pose: P.STAND },
  { p: 0.09, pose: P.OBSERVE },
  { p: 0.185, pose: P.REACH },
  { p: 0.3, pose: P.CLIMB_A },
  { p: 0.42, pose: P.CLIMB_B },
  { p: 0.52, pose: P.CLIMB_C },
  { p: 0.6, pose: P.CREST },
  { p: 0.645, pose: P.PLANT },
  { p: 0.7, pose: P.SUMMIT },
  { p: 0.725, pose: P.WOBBLE },
  { p: 0.745, pose: P.TEETER },
  { p: 0.756, pose: P.TEETER2 },
  { p: 0.8, pose: P.TUMBLE },
  { p: 0.9, pose: P.TUMBLE },
  { p: 0.928, pose: P.IMPACT },
  { p: 0.95, pose: P.SIT_LAND },
  { p: 1.0, pose: P.SIT_REST },
];

function samplePlace(p: number): { x: number; y: number; s: number; r: number } {
  const first = KEYS[0];
  const last = KEYS[KEYS.length - 1];
  if (p <= first.p) return { x: first.x, y: first.y, s: first.s, r: first.r };
  if (p >= last.p) return { x: last.x, y: last.y, s: last.s, r: last.r };
  let a = first;
  let b = KEYS[1];
  for (let i = 0; i < KEYS.length - 1; i++) {
    if (p >= KEYS[i].p && p <= KEYS[i + 1].p) {
      a = KEYS[i];
      b = KEYS[i + 1];
      break;
    }
  }
  const lt = (p - a.p) / (b.p - a.p);
  const e = smoother(lt);
  return {
    x: lerp(a.x, b.x, e),
    y: lerp(a.y, b.y, e),
    s: lerp(a.s, b.s, e),
    r: lerp(a.r, b.r, lt), // rotação: linear, o movimento já é monotônico
  };
}

function samplePose(p: number): number[] {
  const first = POSES[0];
  const last = POSES[POSES.length - 1];
  if (p <= first.p) return first.pose.slice();
  if (p >= last.p) return last.pose.slice();
  let a = first;
  let b = POSES[1];
  for (let i = 0; i < POSES.length - 1; i++) {
    if (p >= POSES[i].p && p <= POSES[i + 1].p) {
      a = POSES[i];
      b = POSES[i + 1];
      break;
    }
  }
  const e = smoother((p - a.p) / (b.p - a.p));
  return a.pose.map((v, i) => lerp(v, b.pose[i], e));
}

// ---------------------------------------------------------------------------
// Cinemática direta do mascote (coordenadas locais, pélvis na origem)
// ---------------------------------------------------------------------------

export type Seg2 = { x1: number; y1: number; x2: number; y2: number };

export type MascotGeo = {
  torso: Seg2;
  armLU: Seg2;
  armLF: Seg2;
  armRU: Seg2;
  armRF: Seg2;
  legLU: Seg2;
  legLF: Seg2;
  legRU: Seg2;
  legRF: Seg2;
  head: { cx: number; cy: number; r: number };
};

function chain(
  ox: number,
  oy: number,
  a1: number,
  a2: number,
  l1: number,
  l2: number,
): { mx: number; my: number; ex: number; ey: number } {
  const mx = ox + Math.sin(a1 * DEG) * l1;
  const my = oy + Math.cos(a1 * DEG) * l1;
  const ex = mx + Math.sin(a2 * DEG) * l2;
  const ey = my + Math.cos(a2 * DEG) * l2;
  return { mx, my, ex, ey };
}

function fk(pose: number[]): MascotGeo {
  const [torsoA, headA, aLU, aLF, aRU, aRF, lLU, lLF, lRU, lRF] = pose;

  const tdx = Math.sin(torsoA * DEG);
  const tdy = -Math.cos(torsoA * DEG);
  const sx = tdx * SEG.torso; // ombro
  const sy = tdy * SEG.torso;
  const nx = sx + tdx * SEG.neck; // base do pescoço
  const ny = sy + tdy * SEG.neck;
  // "inclinar a cabeça" = deslocar o círculo perpendicular ao tronco
  const hx = nx + -tdy * headA * 0.13;
  const hy = ny + tdx * headA * 0.13;

  const aL = chain(sx, sy, aLU, aLF, SEG.upperArm, SEG.foreArm);
  const aR = chain(sx, sy, aRU, aRF, SEG.upperArm, SEG.foreArm);
  const lL = chain(0, 0, lLU, lLF, SEG.thigh, SEG.shin);
  const lR = chain(0, 0, lRU, lRF, SEG.thigh, SEG.shin);

  return {
    torso: { x1: 0, y1: 0, x2: sx, y2: sy },
    armLU: { x1: sx, y1: sy, x2: aL.mx, y2: aL.my },
    armLF: { x1: aL.mx, y1: aL.my, x2: aL.ex, y2: aL.ey },
    armRU: { x1: sx, y1: sy, x2: aR.mx, y2: aR.my },
    armRF: { x1: aR.mx, y1: aR.my, x2: aR.ex, y2: aR.ey },
    legLU: { x1: 0, y1: 0, x2: lL.mx, y2: lL.my },
    legLF: { x1: lL.mx, y1: lL.my, x2: lL.ex, y2: lL.ey },
    legRU: { x1: 0, y1: 0, x2: lR.mx, y2: lR.my },
    legRF: { x1: lR.mx, y1: lR.my, x2: lR.ex, y2: lR.ey },
    head: { cx: hx, cy: hy, r: SEG.headR },
  };
}

// ---------------------------------------------------------------------------
// Caminho da escalada (rastro laranja discreto) — curva suave pelos keyframes
// ---------------------------------------------------------------------------

function smoothPath(pts: readonly [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;
    d += ` Q ${x0.toFixed(1)} ${y0.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
  return d;
}

export const CLIMB_PATH_D = smoothPath(
  KEYS.filter((k) => k.p >= 0.09 && k.p <= 0.63).map(
    (k): [number, number] => [k.x - 2, k.y + 18],
  ),
);

/** Ponto de pouso — origem da "poeira" e da linha laranja de transição. */
export const LANDING = { x: 1166, y: 760 } as const;

// ---------------------------------------------------------------------------
// Quadro completo da cena em `p`
// ---------------------------------------------------------------------------

export type Frame = {
  mascot: {
    rootX: number;
    rootY: number;
    rootRot: number;
    rootScale: number;
  } & MascotGeo;
  mountain: { draw: number[]; opacity: number; ty: number };
  word: { opacity: number; blur: number; ty: number };
  climb: number;
  flag: { pole: number; furl: number; windOpacity: number };
  trailVis: number;
  dust: { scale: number; opacity: number };
  descent: number;
};

/** Abertura da bandeira com um leve exagero elástico antes de assentar em 1. */
function furlEase(u: number): number {
  const c = clamp01(u);
  if (c < 0.72) return (c / 0.72) * 1.08;
  return 1.08 + (1 - 1.08) * ((c - 0.72) / 0.28);
}

export function computeFrame(
  p: number,
  opts?: { compact?: boolean; reduced?: boolean },
): Frame {
  const compact = opts?.compact ?? false;
  const reduced = opts?.reduced ?? false;

  const pl = samplePlace(p);
  const pose = samplePose(p);

  // Capotamento: membros soltos (o giro é da figura inteira, na raiz).
  if (p > 0.758 && p < 0.918) {
    const ph = pl.r * DEG * 0.9;
    pose[2] += Math.sin(ph) * 9;
    pose[3] += Math.sin(ph + 1.1) * 11;
    pose[4] += Math.sin(ph + 3.1) * 9;
    pose[5] += Math.sin(ph + 4.2) * 11;
    pose[6] += Math.sin(ph + 2) * 8;
    pose[7] += Math.sin(ph + 0.5) * 9;
    pose[8] += Math.sin(ph + 5) * 8;
    pose[9] += Math.sin(ph + 3.6) * 9;
  }

  const geo = fk(pose);

  // Arcos da queda: um pequeno salto por volta, some ao chegar na base.
  let y = pl.y;
  if (p > 0.758 && p < 0.912) {
    const localT = win(p, 0.758, 0.912);
    y -= Math.abs(Math.sin(pl.r * DEG)) * 10 * (1 - localT * 0.4);
  }

  const fadeT = reduced ? 0 : smooth(win(p, 0.9, 1));
  const rise = reduced ? 1 : smooth(win(p, 0.05, 0.16));

  return {
    mascot: {
      rootX: pl.x,
      rootY: y,
      rootRot: pl.r,
      rootScale: pl.s * (compact ? 1.24 : 1),
      ...geo,
    },
    mountain: {
      draw: CONTOURS.map((c) => (reduced ? 1 : clamp01((p - c.start) / c.span))),
      opacity: lerp(1, 0.32, fadeT),
      ty: lerp(0, -16, fadeT),
    },
    word: {
      opacity: rise * lerp(1, 0.28, fadeT),
      blur: (1 - rise) * 8,
      ty: (1 - rise) * 14,
    },
    // opacidade do rastro da subida (não um "wipe": aparece de leve, some na saída)
    climb: reduced ? 0 : clamp01((p - 0.14) / 0.42) * 0.5 * (1 - fadeT * 0.8),
    flag: {
      pole: reduced ? 1 : smooth(win(p, 0.628, 0.662)),
      furl: reduced ? 1 : furlEase(win(p, 0.662, 0.715)),
      windOpacity: reduced ? 0 : win(p, 0.66, 0.686) * (1 - win(p, 0.77, 0.82)) * 0.5,
    },
    trailVis: reduced ? 0 : win(p, 0.76, 0.79) * (1 - win(p, 0.9, 0.94)),
    dust: (() => {
      const d = reduced ? 0 : win(p, 0.922, 0.935) * (1 - win(p, 0.945, 0.99));
      return { scale: 0.32 + d, opacity: d * 0.5 };
    })(),
    descent: reduced ? 0 : win(p, 0.95, 0.99),
  };
}

/** Estado final da cena — serve de base para SSR, sem-JS e reduced-motion. */
export const REST_FRAME: Frame = computeFrame(1, { reduced: true });
