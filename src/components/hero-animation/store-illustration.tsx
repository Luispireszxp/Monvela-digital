/**
 * Comércio local — traço curvo, cantos arredondados, sem formas pontudas.
 * Coordenadas locais 0..260 × 0..250, com a linha do chão em y=246; quem usa
 * posiciona a cena pelo `transform` do grupo externo.
 */
export function StoreIllustration({ className }: { className?: string }) {
  return (
    <g className={className}>
      {/* sombra suave no chão */}
      <ellipse cx="130" cy="249" rx="120" ry="8" className="hero-scene-shadow" />

      {/* corpo da loja */}
      <path
        d="M34 246 L34 112 Q34 100 46 100 L214 100 Q226 100 226 112 L226 246 Z"
        className="hero-scene-fill"
      />

      {/* luz quente saindo de dentro */}
      <ellipse cx="130" cy="188" rx="86" ry="52" className="hero-scene-warmth" />

      <path
        d="M34 246 L34 112 Q34 100 46 100 L214 100 Q226 100 226 112 L226 246"
        className="hero-scene-stroke"
      />

      {/* toldo: faixa em crescente com listras curvas */}
      <path d="M16 104 Q130 64 244 104 L244 126 Q130 88 16 126 Z" className="hero-scene-awning" />
      <g className="hero-scene-awning-stripe">
        <path d="M62 94 L62 116" />
        <path d="M96 84 L96 108" />
        <path d="M130 79 L130 103" />
        <path d="M164 84 L164 108" />
        <path d="M198 94 L198 116" />
      </g>
      <path d="M16 104 Q130 64 244 104" className="hero-scene-stroke-accent" />

      {/* placa circular sobre o toldo */}
      <circle cx="130" cy="52" r="21" className="hero-scene-fill" />
      <circle cx="130" cy="52" r="21" className="hero-scene-stroke-accent" />
      <path
        d="M130 62 Q119 55 122 44 Q131 47 131 58 M130 62 Q141 55 138 44 Q129 47 130 58"
        className="hero-scene-stroke-accent"
      />

      {/* vitrines iluminadas */}
      <rect x="52" y="142" width="52" height="56" rx="14" className="hero-scene-glass" />
      <rect x="52" y="142" width="52" height="56" rx="14" className="hero-scene-stroke-warm" />
      <rect x="156" y="142" width="52" height="56" rx="14" className="hero-scene-glass" />
      <rect x="156" y="142" width="52" height="56" rx="14" className="hero-scene-stroke-warm" />

      {/* porta com topo arredondado */}
      <path
        d="M112 246 L112 184 Q112 162 130 162 Q148 162 148 184 L148 246"
        className="hero-scene-glass"
      />
      <path
        d="M112 246 L112 184 Q112 162 130 162 Q148 162 148 184 L148 246"
        className="hero-scene-stroke-warm"
      />
      <circle cx="141" cy="210" r="3" className="hero-scene-dot" />

      {/* vasinho com folhas curvas */}
      <path d="M8 246 Q6 228 16 224 L34 224 Q44 228 42 246 Z" className="hero-scene-fill" />
      <path d="M8 246 Q6 228 16 224 L34 224 Q44 228 42 246" className="hero-scene-stroke" />
      <path
        d="M25 224 Q25 202 13 192 M25 224 Q26 198 41 190 M25 224 Q22 210 9 208"
        className="hero-scene-stroke-accent"
      />

      {/* linha do chão */}
      <path d="M0 246 L260 246" className="hero-scene-ground" />
    </g>
  );
}
