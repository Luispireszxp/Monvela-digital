/**
 * Cena do Vela — boneco-palito articulado + foguete de brinquedo + fumaça.
 *
 * O Vela é o mesmo mascote do resto do site: laranja, cabeça sólida e
 * perfeitamente redonda, SEM rosto, SEM mãos, SEM pés — os membros são traços
 * grossos que terminam em ponta arredondada (`stroke-linecap: round`). A
 * personalidade vem só das poses.
 *
 * Cada parte é um grupo próprio, com pivô coerente definido no CSS
 * (`.vela-*` em globals.css) via `transform-origin` em coordenadas do viewBox:
 * braços giram no ombro, pernas no quadril, joelhos/cotovelos nas dobras e a
 * cabeça na base do pescoço. Uso `transform-box: view-box` (padrão) e NUNCA
 * misturo atributo `transform` com transform CSS no mesmo elemento — os grupos
 * animados só recebem transform por CSS; posicionamento estático fica em
 * grupos internos.
 *
 * Coordenadas de repouso (em pé), viewBox recortado em 80 60 300 440 (o
 * recorte tira o espaço morto e ainda deixa pista para o foguete subir e
 * sumir pelo topo — o `overflow: hidden` do `.vela-svg` corta ali), chão y≈470:
 *   quadril (150,370) · pescoço (150,280) · cabeça (150,238) r42
 *   ombro (150,298) · cotovelo (150,352) · joelho (150,420) · pé (150,470)
 */
export function VelaScene() {
  return (
    <svg
      className="vela-svg"
      viewBox="80 60 300 440"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      focusable="false"
    >
      {/* fundo: órbitas discretas e chão, como no resto do site */}
      <path className="vela-orbit" d="M474 74Q322 236 268 560" />
      <path className="vela-orbit vela-orbit-far" d="M486 208Q392 336 372 560" />
      <circle className="vela-orbit-dot" cx="372" cy="300" r="4" />
      <path className="vela-ground" d="M-12 486Q206 456 500 476" />

      {/* fumaça: 6 partículas em pontos fixos da trajetória; cada uma nasce
          pequena, cresce, desce um pouco, escapa para o lado e some */}
      <g className="vela-smoke">
        <g transform="translate(243 362)">
          <circle className="vela-smoke-dot" r="9" />
        </g>
        <g transform="translate(252 320)">
          <circle className="vela-smoke-dot" r="11" />
        </g>
        <g transform="translate(263 274)">
          <circle className="vela-smoke-dot" r="10" />
        </g>
        <g transform="translate(277 226)">
          <circle className="vela-smoke-dot" r="12" />
        </g>
        <g transform="translate(294 178)">
          <circle className="vela-smoke-dot" r="10" />
        </g>
        <g transform="translate(312 128)">
          <circle className="vela-smoke-dot" r="13" />
        </g>
      </g>

      {/* linhas de movimento do chacoalho */}
      <g className="vela-shake-lines">
        <path d="M276 356q12-8 20 2" />
        <path d="M280 380q13-6 21 5" />
        <path d="M274 402q11-9 20 0" />
      </g>

      {/* foguete de brinquedo: bem menor que o Vela, sem texto e sem rosto */}
      <g className="vela-rocket">
        <g className="vela-rocket-art">
          <path className="vela-flame" d="M0 25q8 11 0 24-8-13 0-24Z" />
          <path className="vela-flame vela-flame-core" d="M0 25q4.5 8 0 16-4.5-8 0-16Z" />
          <path className="vela-rocket-fin" d="M-11 8-24 25l13-4Z" />
          <path className="vela-rocket-fin" d="M11 8 24 25l-13-4Z" />
          <rect className="vela-rocket-body" x="-12" y="-16" width="24" height="40" rx="12" />
          <path className="vela-rocket-nose" d="M-12-12q12-30 24 0Z" />
          <circle className="vela-rocket-window" cy="-4" r="6" />
        </g>
      </g>

      {/* Vela */}
      <g className="vela">
        {/* perna de trás */}
        <g className="vela-leg vela-leg-l">
          <line className="vela-limb" x1="150" y1="370" x2="150" y2="420" />
          <g className="vela-shin vela-shin-l">
            <line className="vela-limb" x1="150" y1="420" x2="150" y2="470" />
          </g>
        </g>

        {/* perna da frente */}
        <g className="vela-leg vela-leg-r">
          <line className="vela-limb" x1="150" y1="370" x2="150" y2="420" />
          <g className="vela-shin vela-shin-r">
            <line className="vela-limb" x1="150" y1="420" x2="150" y2="470" />
          </g>
        </g>

        <g className="vela-torso">
          {/* braço de trás */}
          <g className="vela-arm vela-arm-l">
            <line className="vela-limb" x1="150" y1="298" x2="150" y2="352" />
            <g className="vela-fore vela-fore-l">
              <line className="vela-limb" x1="150" y1="352" x2="150" y2="402" />
            </g>
          </g>

          <line className="vela-body" x1="150" y1="370" x2="150" y2="280" />

          <g className="vela-head">
            <circle className="vela-head-shape" cx="150" cy="238" r="42" />
          </g>

          {/* braço da frente: acena, puxa e chacoalha o foguete */}
          <g className="vela-arm vela-arm-r">
            <line className="vela-limb" x1="150" y1="298" x2="150" y2="352" />
            <g className="vela-fore vela-fore-r">
              <line className="vela-limb" x1="150" y1="352" x2="150" y2="402" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
