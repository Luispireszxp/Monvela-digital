import { RESULTS } from "./data";

/**
 * Os três resultados fictícios. O primeiro é o único com site — na cena de
 * comparação ele ganha o contorno laranja e é o escolhido.
 *
 * Nada aqui é focável: é encenação, não interface real.
 */
export function SearchResults() {
  return (
    <ul className="cj-results">
      {RESULTS.map((r, i) => (
        <li
          className={`cj-result${r.hasSite ? " cj-result-chosen" : ""}`}
          key={r.id}
          style={{ "--cj-result-order": i + 1 } as React.CSSProperties}
        >
          <span className="cj-result-thumb" style={{ background: r.thumb }} aria-hidden="true">
            <svg viewBox="0 0 60 44" className="cj-thumb-art">
              <path d="M0 34 Q14 20 26 30 Q36 38 44 28 Q52 20 60 30 L60 44 L0 44 Z" />
              <circle cx="46" cy="12" r="5" />
            </svg>
          </span>
          <span className="cj-result-body">
            <span className="cj-result-name">{r.name}</span>
            <span className="cj-result-meta">
              <span className="cj-result-stars" aria-hidden="true">
                ★★★★★
              </span>
              <span className="cj-result-rating">{r.rating}</span>
            </span>
            <span className="cj-result-place">{r.place}</span>
          </span>
          <span className="cj-result-foot">
            <span className={`cj-result-tag${r.hasSite ? " cj-result-tag-site" : ""}`}>
              {r.tag}
            </span>
            {r.hasSite ? <span className="cj-result-cta">Acessar site</span> : null}
          </span>
        </li>
      ))}
    </ul>
  );
}
