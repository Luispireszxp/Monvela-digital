/**
 * O caminho curvo que sai do comércio em direção ao celular.
 *
 * `pathLength="100"` normaliza o comprimento do traço, então o desenho
 * progressivo é exatamente "de 100 até 50" no `stroke-dashoffset` — ou seja,
 * a linha para na metade do caminho, onde está o "X". A quebra é feita por um
 * segundo traço (mesma curva, mas tracejado) que surge e se dispersa.
 *
 * Coordenadas já são as da cena (viewBox 0 0 900 380).
 */
const CURVE = "M258 248 C296 248 306 228 334 222 C372 214 408 208 456 202";
/** Só o trecho efetivamente desenhado (até o "X"), usado para os fragmentos. */
const DRAWN = "M258 248 C296 248 306 228 334 222 C341 220.6 347 219.3 353 218";

export function ConnectionArrow({ className }: { className?: string }) {
  return (
    <g className={className}>
      {/* trilho apagado: sugere o caminho que existiria */}
      <path d={CURVE} pathLength={100} className="hero-arrow-track" />

      {/* traço que avança */}
      <path d={CURVE} pathLength={100} className="hero-arrow-line" />

      {/* ponta luminosa, para onde a linha chega */}
      <circle cx="353" cy="218" r="4" className="hero-arrow-tip" />

      {/* fragmentos: a linha rompida se desfazendo */}
      <path d={DRAWN} className="hero-arrow-shards" />

      {/* partículas que se dispersam depois da quebra */}
      <g className="hero-arrow-dust">
        <circle cx="330" cy="223" r="2.4" />
        <circle cx="306" cy="231" r="1.8" />
        <circle cx="344" cy="220" r="2" />
        <circle cx="282" cy="241" r="1.6" />
        <circle cx="318" cy="227" r="1.4" />
      </g>
    </g>
  );
}
