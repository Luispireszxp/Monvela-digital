/**
 * Monograma "M" da Monvela — recriação geométrica em SVG a partir do logo
 * oficial (public/brand/monvela-digital.png), para uso nítido e leve no
 * cabeçalho, rodapé e favicon. Herda a cor via `currentColor`.
 *
 * Substituir por um SVG oficial da marca quando disponível, mantendo a mesma
 * proporção de viewBox.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 128 118"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {/* perna esquerda, com pé recortado na base interna */}
      <path d="M16 34 L52 58 L52 92 L40 92 L40 104 L16 104 Z" />
      {/* perna direita (espelhada) */}
      <path d="M112 34 L76 58 L76 92 L88 92 L88 104 L112 104 Z" />
      {/* cunha central apontando para baixo */}
      <path d="M56 52 L72 52 L64 96 Z" />
      {/* acento "^" flutuante sobre o vale */}
      <path d="M64 12 L82 32 L73 32 L64 21 L55 32 L46 32 Z" />
    </svg>
  );
}
