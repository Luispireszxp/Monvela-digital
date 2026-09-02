/**
 * Comércio genérico — fachada arredondada, toldo, porta, vitrines e pontos de
 * luz laranja. Sem nome nem segmento na fachada: representa qualquer comércio.
 *
 * Coordenadas locais 0..200 × 0..130, base em y=126.
 */
export function LocalBusinessIllustration({ className }: { className?: string }) {
  return (
    <g className={className}>
      <ellipse cx="100" cy="128" rx="92" ry="6" className="dc-store-shadow" />

      {/* fachada */}
      <path
        d="M28 126 L28 54 Q28 42 40 42 L160 42 Q172 42 172 54 L172 126 Z"
        className="dc-store-body"
      />
      <path
        d="M28 126 L28 54 Q28 42 40 42 L160 42 Q172 42 172 54 L172 126"
        className="dc-store-stroke"
      />

      {/* toldo em crescente */}
      <path d="M16 46 Q100 20 184 46 L184 60 Q100 34 16 60 Z" className="dc-store-awning" />
      <path d="M16 46 Q100 20 184 46" className="dc-store-awning-line" />

      {/* vitrines */}
      <rect x="44" y="72" width="34" height="32" rx="9" className="dc-store-glass" />
      <rect x="122" y="72" width="34" height="32" rx="9" className="dc-store-glass" />

      {/* porta com topo arredondado */}
      <path d="M86 126 L86 90 Q86 76 100 76 Q114 76 114 90 L114 126" className="dc-store-glass" />
      <path
        d="M86 126 L86 90 Q86 76 100 76 Q114 76 114 90 L114 126"
        className="dc-store-stroke"
      />

      {/* pontos de luz */}
      <g className="dc-store-lights">
        <circle cx="61" cy="88" r="3.2" />
        <circle cx="139" cy="88" r="3.2" />
        <circle cx="100" cy="98" r="2.6" />
        <circle cx="100" cy="30" r="2.6" />
      </g>

      <path d="M8 126 L192 126" className="dc-store-ground" />
    </g>
  );
}
