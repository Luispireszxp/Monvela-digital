import { siteConfig } from "@/content/site";
import { AnimatedSearchChart } from "./animated-search-chart";
import { DigitalJourney } from "./digital-journey";
import { ScrollReveal } from "./scroll-reveal";

/**
 * "Contexto digital" — o dado de busca e, separadamente, os canais da jornada.
 *
 * A distinção importa: o donut compara o Google com OUTROS MECANISMOS DE BUSCA
 * (87,5% / 12,5%). Instagram, Facebook e WhatsApp não fazem parte desses 12,5%
 * — aparecem depois, como canais por onde o cliente descobre e conversa.
 */
export function DigitalContext() {
  const { digitalContext } = siteConfig;

  return (
    <section
      id="contexto"
      className="section dark-section digital-context"
      aria-labelledby="digital-context-title"
    >
      <ScrollReveal>
        <div className="shell dc-inner">
          <p className="eyebrow dc-eyebrow">{digitalContext.eyebrow}</p>
          <h2 id="digital-context-title" className="dc-title">
            {digitalContext.title}
          </h2>

          <AnimatedSearchChart />

          <DigitalJourney title={digitalContext.journeyTitle} />

          <p className="dc-closing">{digitalContext.closing}</p>

          <p className="dc-source">
            <a href={digitalContext.sourceUrl} target="_blank" rel="noopener noreferrer">
              {digitalContext.sourceLabel}
            </a>
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
