/**
 * O "X" que interrompe a conexão.
 *
 * Traços com ponta arredondada e um halo suave atrás — a falha aparece com
 * uma pulsação curta, sem estilhaço nem ângulo agressivo.
 * Centro em (367, 215), nas coordenadas da cena.
 */
export function ConnectionError({ className }: { className?: string }) {
  return (
    <g className={className}>
      <circle cx="367" cy="215" r="26" className="hero-error-halo" />
      <path d="M356 204 L378 226" className="hero-error-stroke" />
      <path d="M378 204 L356 226" className="hero-error-stroke" />
    </g>
  );
}
