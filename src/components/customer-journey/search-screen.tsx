import { SEARCH_QUERY } from "./data";
import { SearchResults } from "./search-results";

/**
 * Cena 1 e 2 — um navegador genérico (não é o Chrome nem depende de API
 * nenhuma): barra de endereço, a busca sendo digitada, carregamento e a lista
 * de resultados.
 *
 * A digitação é CSS puro: `.cj-typed` tem `overflow: hidden` e a largura vai
 * de 0 até 20ch em `steps(20)`. Como o texto usa a fonte monoespaçada, 1ch = 1
 * caractere e a revelação cai exatamente em cima das letras. O cursor é irmão
 * flex do texto, então acompanha o crescimento sozinho.
 */
export function SearchScreen() {
  return (
    <div className="cj-slide cj-slide-search">
      <div className="cj-browser-bar">
        <span className="cj-browser-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="cj-browser-url">buscar</span>
      </div>

      <div className="cj-search-head">
        <p className="cj-search-title">Buscar</p>
        <p className="cj-search-sub">Encontre o que você precisa</p>
      </div>

      <div className="cj-search-field">
        <svg className="cj-search-glass" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16 L21 21" />
        </svg>
        <span className="cj-search-input">
          <span className="cj-typed">
            <span>{SEARCH_QUERY}</span>
          </span>
          <span className="cj-caret" aria-hidden="true" />
        </span>
        <span className="cj-search-go" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16 L21 21" />
          </svg>
        </span>
      </div>

      <div className="cj-loading" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="cj-results-wrap">
        <SearchResults />
      </div>
    </div>
  );
}
