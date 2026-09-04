/**
 * Dados e matemática da cena "Montanha da internet".
 *
 * Tudo aqui é puro e determinístico (sem Math.random): roda igual no servidor e
 * no cliente, então as strings de path e o quadro-base (`REST_FRAME`) podem ir
 * direto no HTML. O scrub em si (ler a rolagem e escrever nos elementos) fica em
 * `mountain-scene.tsx` — este arquivo só responde "como está a cena em `p`".
 *
 * Coreografia: o mascote sobe a encosta esquerda com passada alternada, finca a
 * bandeira no cume e — sem tombo — endireita o corpo, respira aliviado e fica de
 * pé ao lado da bandeira. `REST_FRAME` é esse estado final (SSR / sem-JS /
 * `prefers-reduced-motion`).
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

// Cume alto e base baixa dentro do viewBox: a montanha preenche o quadro, sem
// faixa grande de céu vazio no topo nem o mascote raspando a borda de baixo.
export const PEAK = { x: 602, y: 120 } as const;
const BASE_Y = 780;
const HALF_L = 520; // meia-largura da montanha na base, lado da subida
const HALF_R = 560; // lado oposto (um pouco mais largo/suave)
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
/** Perfil da encosta direita — coincide com a ponta dir. dos estratos. */
export function ridgeRightY(x: number): number {
  return lerp(BASE_Y, PEAK.y, clamp01((PEAK.x + HALF_R - x) / (HALF_R - HALF_MIN)));
}

/** Silhueta externa da montanha (sempre visível, bem discreta) — evita que a
 *  cena comece como uma tela preta antes dos estratos se desenharem. */
export const SILHOUETTE_D = `M${PEAK.x - HALF_L} ${BASE_Y + 2} L${PEAK.x - 30} ${PEAK.y} L${
  PEAK.x + 30
} ${PEAK.y} L${PEAK.x + HALF_R} ${BASE_Y + 2} Z`;

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

  // O terço de baixo já entra desenhado (p=0) — a cena nunca começa como tela
  // preta. Os estratos de cima traçam de baixo para cima e completam ~p≈0.24,
  // com o mascote já subindo.
  const drawnFromStart = e < 0.3;
  return {
    d,
    start: drawnFromStart ? -1 : (e - 0.3) * 0.34,
    span: drawnFromStart ? 0.001 : 0.05,
    opacity: Number((0.5 - e * 0.13).toFixed(3)),
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
  /** rotação da figura inteira, em graus */ r: number;
};

/** Na encosta esquerda (subida), pélvis `dy` acima da borda. */
const onLeft = (p: number, x: number, dy: number, s: number, r: number): Place => ({
  p,
  x,
  y: ridgeLeftY(x) - dy,
  s,
  r,
});
/** Na encosta direita (o mascote de pé ao lado da bandeira). */
const onRight = (p: number, x: number, dy: number, s: number, r: number): Place => ({
  p,
  x,
  y: ridgeRightY(x) - dy,
  s,
  r,
});

const KEYS: readonly Place[] = [
  // Subida pela encosta esquerda. Começa já um pouco acima da base (não no canto)
  // e com escala comprimida (1.4 → 1.12): o mascote nunca fica gigante nem raspa
  // a borda de baixo.
  onLeft(0.0, 210, 22, 1.4, 0),
  onLeft(0.09, 236, 21, 1.37, 0),
  onLeft(0.16, 280, 21, 1.34, 3),
  onLeft(0.24, 330, 21, 1.32, 5),
  onLeft(0.32, 380, 21, 1.3, 6),
  onLeft(0.4, 434, 21, 1.27, 7),
  onLeft(0.48, 486, 21, 1.24, 7),
  onLeft(0.545, 532, 21, 1.22, 6),
  onLeft(0.58, 564, 19, 1.2, 3),
  onLeft(0.61, 588, 16, 1.19, 1),
  // Cume: finca a bandeira (pólo em x≈602).
  { p: 0.635, x: 600, y: PEAK.y - 8, s: 1.18, r: 0 },
  // Sai logo de baixo do tecido: desce-e-direita endireitando o corpo.
  onRight(0.7, 664, 14, 1.16, 0),
  // Comemora com os braços erguidos — já livre da bandeira, bem abaixo do tecido.
  onRight(0.78, 700, 13, 1.14, 0),
  // Respira e assenta num mirante à direita da bandeira, olhando a vista.
  onRight(0.88, 716, 12, 1.13, 0),
  onRight(1.0, 724, 12, 1.12, 0),
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
  // Endireita o corpo saindo de baixo da bandeira: quase ereto, braços baixando.
  RISE: [1, -6, -16, -26, 13, 19, -7, -5, 7, 5],
  // Cume, sem tombo: braços erguidos num "V" modesto. Só acontece já mais abaixo
  // e à direita, então o "V" passa bem longe do tecido da bandeira.
  CHEER: [-3, -12, -120, -140, 120, 140, -8, -5, 8, 5],
  // Alívio no mirante: inclina à frente, mão esquerda sobe até a testa.
  EXHALE: [10, 14, -30, -128, 8, 12, -6, -2, 10, 16],
  // Repouso: em pé, relaxado, mão esquerda de pala na testa, olhando a vista.
  SETTLE: [4, 7, -22, -96, 8, 12, -7, -4, 8, 5],
} satisfies Record<string, Pose>;

const POSES: readonly { p: number; pose: Pose }[] = [
  { p: 0.0, pose: P.STAND },
  { p: 0.09, pose: P.OBSERVE },
  { p: 0.185, pose: P.REACH },
  { p: 0.3, pose: P.CLIMB_A },
  { p: 0.42, pose: P.CLIMB_B },
  { p: 0.52, pose: P.CLIMB_C },
  { p: 0.575, pose: P.CREST },
  { p: 0.63, pose: P.PLANT },
  { p: 0.7, pose: P.RISE },
  { p: 0.78, pose: P.CHEER },
  { p: 0.87, pose: P.EXHALE },
  { p: 0.93, pose: P.SETTLE },
  { p: 1.0, pose: P.SETTLE },
];

function samplePlace(p: number): { x: number; y: number; s: number; r: number } {
  const first = KEYS[0];
  const last = KEYS[KEYS.length - 1];
  if (p <= first.p) return { x: first.x, y: first.y, s: first.s, r: first.r };
  if (p >= last.p) return { x: last.x, y: last.y, s: last.s, r: last.r };
  let a = first;
  let b = KEYS[1];
  let index = 0;
  for (let i = 0; i < KEYS.length - 1; i++) {
    if (p >= KEYS[i].p && p <= KEYS[i + 1].p) {
      a = KEYS[i];
      b = KEYS[i + 1];
      index = i;
      break;
    }
  }
  const lt = (p - a.p) / (b.p - a.p);

  // Hermite cúbica: atravessa os keyframes com velocidade contínua. A versão
  // anterior aplicava easing em cada trecho e fazia o mascote frear em todos
  // os pontos, deixando a subida com aspecto de stop-motion.
  const before = KEYS[Math.max(0, index - 1)];
  const after = KEYS[Math.min(KEYS.length - 1, index + 2)];
  const hermite = (av: number, bv: number, prev: number, next: number) => {
    const dt = b.p - a.p;
    const ma = ((bv - prev) / Math.max(0.0001, b.p - before.p)) * dt;
    const mb = ((next - av) / Math.max(0.0001, after.p - a.p)) * dt;
    const t2 = lt * lt;
    const t3 = t2 * lt;
    return (
      (2 * t3 - 3 * t2 + 1) * av +
      (t3 - 2 * t2 + lt) * ma +
      (-2 * t3 + 3 * t2) * bv +
      (t3 - t2) * mb
    );
  };

  return {
    x: hermite(a.x, b.x, before.x, after.x),
    y: hermite(a.y, b.y, before.y, after.y),
    s: hermite(a.s, b.s, before.s, after.s),
    r: lerp(a.r, b.r, lt),
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
// Rastro da subida — some desenhado ATRÁS do mascote conforme ele sobe (não é
// um trilho pré-desenhado à frente). Curva suave pelos keyframes da encosta.
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
  KEYS.filter((k) => k.p >= 0.06 && k.p <= 0.66).map(
    // leve zigue-zague lateral: lê como escalada, não como trilho reto
    (k, i): [number, number] => [k.x - 2 + (i % 2 === 0 ? -5 : 7), k.y + 18],
  ),
);

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
  /** Progresso do rastro desenhado atrás do mascote (0..1). */
  climb: number;
  flag: { pole: number; furl: number; windOpacity: number };
  clouds: readonly { x: number; y: number; rot: number }[];
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

  // Passada contínua durante a escalada. O balanço cruza os keyframes de pose,
  // alternando os lados como numa escalada real, com alcance amplo e cadência
  // um pouco mais lenta (menos passos, mais longos). Some suavemente perto do
  // cume para não atrapalhar a ação de fincar a bandeira.
  const climbIn = smooth(win(p, 0.11, 0.2));
  const climbOut = 1 - smooth(win(p, 0.5, 0.575));
  const climbMotion = climbIn * climbOut;
  let climbSwing = 0;
  if (climbMotion > 0) {
    const phase = win(p, 0.12, 0.57) * Math.PI * 7;
    const step = Math.sin(phase);
    const settle = Math.sin(phase * 2);
    climbSwing = step;
    pose[0] += step * 4.5 * climbMotion; // tronco contrabalança a passada
    pose[1] -= step * 3 * climbMotion;
    pose[2] += step * 30 * climbMotion; // braço esq.
    pose[3] += step * 34 * climbMotion;
    pose[4] -= step * 30 * climbMotion; // braço dir. em oposição
    pose[5] -= step * 34 * climbMotion;
    pose[6] -= step * 26 * climbMotion; // perna esq.
    pose[7] -= step * 30 * climbMotion;
    pose[8] += step * 26 * climbMotion; // perna dir. em oposição
    pose[9] += step * 30 * climbMotion;
    pose[1] += settle * 1.4 * climbMotion; // leve balanço vertical da cabeça
  }

  const geo = fk(pose);

  // Zigue-zague leve na encosta + sobe-desce da passada: tira a leitura de
  // "deslizando num trilho reto".
  const x = pl.x + climbSwing * 9 * climbMotion;
  let y = pl.y;
  if (climbMotion > 0) {
    y -= Math.abs(Math.sin(win(p, 0.12, 0.57) * Math.PI * 7)) * 3 * climbMotion;
  }

  // Assentamento suave no fim (não apaga a cena — a montanha só recua de leve).
  const fadeT = reduced ? 0 : smooth(win(p, 0.94, 1));
  // "INTERNET" já entra como um fantasma leve e ganha corpo cedo na subida.
  const rise = reduced ? 1 : lerp(0.18, 1, smooth(win(p, 0.02, 0.16)));

  return {
    mascot: {
      rootX: x,
      rootY: y,
      rootRot: pl.r,
      rootScale: pl.s * (compact ? 1.22 : 1),
      ...geo,
    },
    mountain: {
      draw: CONTOURS.map((c) => (reduced ? 1 : clamp01((p - c.start) / c.span))),
      opacity: lerp(1, 0.9, fadeT),
      ty: lerp(0, -4, fadeT),
    },
    word: {
      opacity: rise * lerp(1, 0.72, fadeT),
      blur: (1 - clamp01(rise)) * 7,
      ty: (1 - clamp01(rise)) * 12,
    },
    // rastro da subida: cresce com a escalada, assenta no cume
    climb: reduced ? 1 : clamp01((p - 0.08) / 0.5),
    flag: {
      pole: reduced ? 1 : smooth(win(p, 0.6, 0.635)),
      furl: reduced ? 1 : furlEase(win(p, 0.635, 0.69)),
      windOpacity: reduced ? 0 : win(p, 0.63, 0.66) * (1 - win(p, 0.78, 0.86)) * 0.5,
    },
    // Camadas com massas aparentes diferentes: a nuvem distante deriva menos;
    // a mais próxima percorre mais espaço e inclina levemente com o vento.
    clouds: [
      { x: -42 + p * 92, y: Math.sin(p * Math.PI * 2.2) * 5, rot: -1 + p * 2 },
      { x: 28 - p * 138, y: Math.sin(p * Math.PI * 2.8 + 1.4) * 8, rot: 1.5 - p * 3 },
      { x: -18 + p * 176, y: Math.sin(p * Math.PI * 3.2 + 2.1) * 10, rot: -2 + p * 4 },
    ],
  };
}

/** Estado final da cena — serve de base para SSR, sem-JS e reduced-motion. */
export const REST_FRAME: Frame = computeFrame(1, { reduced: true });

// ---------------------------------------------------------------------------
// Enquadramento (viewBox)
//
// No desktop é fixo e mostra a montanha inteira. Em telas estreitas o viewBox
// largo (1440×788) não cabe em retrato: com `xMidYMid meet` a cena virava uma
// faixa minúscula no meio de muito preto. Então em `compact` a "câmera"
// acompanha o mascote encosta acima (janela alta e estreita) e assenta no cume.
// ---------------------------------------------------------------------------

export const VIEWBOX_FULL = "0 0 1440 788";

const CAM_W = 440;
const CAM_H = 780;
/** Canto x da janela por progresso — segue o mascote e para na bandeira. */
const CAM_X: readonly (readonly [number, number])[] = [
  [0.0, 40],
  [0.34, 170],
  [0.62, 365],
  [1.0, 430],
];

export function computeViewBox(p: number, compact: boolean): string {
  if (!compact) return VIEWBOX_FULL;
  const c = clamp01(p);
  let x = CAM_X[CAM_X.length - 1][1];
  for (let i = 0; i < CAM_X.length - 1; i++) {
    const [pa, xa] = CAM_X[i];
    const [pb, xb] = CAM_X[i + 1];
    if (c <= pb) {
      x = lerp(xa, xb, smooth((c - pa) / (pb - pa)));
      break;
    }
  }
  const y = lerp(6, 12, c);
  return `${x.toFixed(1)} ${y.toFixed(1)} ${CAM_W} ${CAM_H}`;
}
