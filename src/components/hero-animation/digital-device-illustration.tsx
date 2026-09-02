/**
 * O lado digital: um globo de meridianos curvos com um celular à frente.
 * Coordenadas locais 0..240 × 0..250 (linha do chão em y=246).
 */
export function DigitalDeviceIllustration({ className }: { className?: string }) {
  return (
    <g className={className}>
      <ellipse cx="120" cy="250" rx="104" ry="9" className="hero-scene-shadow" />

      {/* globo: círculo + meridianos e paralelos curvos */}
      <g className="hero-scene-globe">
        <circle cx="120" cy="116" r="98" className="hero-scene-globe-face" />
        <circle cx="120" cy="116" r="98" className="hero-scene-stroke-soft" />
        <path d="M120 18 Q66 116 120 214 Q174 116 120 18" className="hero-scene-stroke-soft" />
        <path d="M120 18 Q22 116 120 214" className="hero-scene-stroke-soft" />
        <path d="M120 18 Q218 116 120 214" className="hero-scene-stroke-soft" />
        <path d="M28 76 Q120 108 212 76" className="hero-scene-stroke-soft" />
        <path d="M22 116 L218 116" className="hero-scene-stroke-soft" />
        <path d="M28 156 Q120 124 212 156" className="hero-scene-stroke-soft" />
        <circle cx="64" cy="80" r="3.5" className="hero-scene-dot" />
        <circle cx="188" cy="104" r="3" className="hero-scene-dot" />
        <circle cx="150" cy="176" r="3" className="hero-scene-dot" />
        <circle cx="88" cy="160" r="2.5" className="hero-scene-dot" />
      </g>

      {/* celular */}
      <rect x="66" y="42" width="108" height="196" rx="26" className="hero-scene-device" />
      <rect x="66" y="42" width="108" height="196" rx="26" className="hero-scene-stroke" />
      <rect x="76" y="52" width="88" height="176" rx="19" className="hero-scene-screen" />
      <path d="M108 62 L132 62" className="hero-scene-stroke-soft" />

      {/* glifo de globo na tela */}
      <g className="hero-scene-screen-glyph">
        <circle cx="120" cy="140" r="27" className="hero-scene-stroke-cool" />
        <path d="M120 113 Q105 140 120 167 Q135 140 120 113" className="hero-scene-stroke-cool" />
        <path d="M93 140 L147 140" className="hero-scene-stroke-cool" />
        <path d="M99 126 Q120 136 141 126" className="hero-scene-stroke-cool" />
        <path d="M99 154 Q120 144 141 154" className="hero-scene-stroke-cool" />
      </g>
    </g>
  );
}
