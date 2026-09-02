/**
 * Monograma "M" da Monvela.
 *
 * Vetorizado a partir do logo oficial (`public/brand/monvela-digital.png`):
 * as coordenadas do viewBox são as do PNG (recorte 427..825 × 250..652),
 * medidas pixel a pixel — não é uma aproximação a olho. Todas as diagonais
 * usam a mesma inclinação da marca (dx/dy ≈ 1,29).
 *
 * Herda a cor por `currentColor`, então funciona em qualquer fundo.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 398 402"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {/*
        Corpo do M: pernas com pé recortado para dentro na base, unidas pelo
        vale superior, com a cunha central em "V" apontando para baixo.
      */}
      <path d="M0 75 L199 226 L398 75 L398 402 L315 402 L315 357 L341 344 L341 187 L199 297 L57 187 L57 344 L83 357 L83 402 L0 402 Z" />
      {/* Acento "^" flutuante sobre o vale */}
      <path d="M199 0 L101 76 L137 104 L199 55 L261 104 L297 76 Z" />
    </svg>
  );
}
