import { HOTEL_SITE } from "./data";

/**
 * Cena 3 — o site fictício do hotel dentro do celular.
 *
 * É o ponto da história: o negócio que tem um site bem apresentado entra na
 * decisão do cliente. A "fotografia" é uma ilustração em gradiente, não a foto
 * de um lugar real.
 *
 * O botão verde é um <span>, não um link: o clique é encenado e NÃO leva
 * ninguém para o WhatsApp. O botão real de WhatsApp do site segue no rodapé
 * e no cabeçalho, intacto.
 */
export function HotelWebsite() {
  return (
    <div className="cj-slide cj-slide-site">
      <div className="cj-site-head">
        <p className="cj-site-kicker">{HOTEL_SITE.kicker}</p>
        <p className="cj-site-name">{HOTEL_SITE.name}</p>
        <p className="cj-site-rating">
          <span className="cj-site-stars" aria-hidden="true">
            ★★★★★
          </span>
          <span>
            {HOTEL_SITE.rating} ({HOTEL_SITE.reviews})
          </span>
        </p>
      </div>

      <div className="cj-site-photo" aria-hidden="true">
        <svg viewBox="0 0 240 150" className="cj-site-art">
          <defs>
            <linearGradient id="cj-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1d3f5c" />
              <stop offset="100%" stopColor="#0d2135" />
            </linearGradient>
          </defs>
          <rect width="240" height="150" fill="url(#cj-sky)" />
          <path d="M0 96 Q40 58 78 90 Q110 116 150 82 Q192 46 240 88 L240 150 L0 150 Z" className="cj-site-hill" />
          <path d="M84 118 L84 96 Q84 88 92 86 L120 74 L148 86 Q156 88 156 96 L156 118 Z" className="cj-site-house" />
          <g className="cj-site-window">
            <rect x="94" y="96" width="14" height="12" rx="3" />
            <rect x="132" y="96" width="14" height="12" rx="3" />
            <rect x="113" y="98" width="14" height="20" rx="4" />
          </g>
          <path d="M0 128 Q60 120 120 128 Q180 136 240 128 L240 150 L0 150 Z" className="cj-site-water" />
        </svg>
      </div>

      <p className="cj-site-headline">{HOTEL_SITE.headline}</p>
      <p className="cj-site-text">{HOTEL_SITE.description}</p>

      <span className="cj-site-btn">{HOTEL_SITE.primaryAction}</span>
      <span className="cj-site-btn cj-site-btn-wa">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="cj-wa-glyph">
          <path d="M12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.69 1.45c6.55 0 11.89-5.33 11.89-11.89A11.82 11.82 0 0 0 12.05 0Zm0 21.79a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.89-9.89a9.83 9.83 0 0 1 9.88 9.9c0 5.44-4.43 9.88-9.89 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.96-.94 1.16c-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.53.15-.17.2-.3.3-.5.1-.19.05-.37-.02-.51-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.03 1.02-1.03 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.27-.2-.57-.34Z" />
        </svg>
        {HOTEL_SITE.whatsappAction}
      </span>
    </div>
  );
}
