import { siteConfig } from "@/content/site";
import { AnimatedPhone } from "./animated-phone";
import { JourneyReveal } from "./journey-reveal";
import { JourneySteps } from "./journey-steps";

/**
 * "Pesquisa, compara e decide" — a jornada encenada de um cliente procurando
 * um hotel no celular.
 *
 * A encenação roda uma vez ao entrar na tela (ver `journey-reveal.tsx`) e
 * fecha com a mensagem da seção. Nenhum clique dentro do aparelho leva o
 * visitante para fora da página.
 */
export function CustomerJourney() {
  const { journey } = siteConfig;

  return (
    <section
      id="jornada"
      className="section dark-section customer-journey"
      aria-labelledby="journey-title"
    >
      <JourneyReveal>
        <div className="shell cj-inner">
          <div className="cj-intro">
            <p className="eyebrow">{journey.eyebrow}</p>
            <h2 id="journey-title" className="cj-title">
              {journey.title}
            </h2>
          </div>

          <div className="cj-grid">
            <JourneySteps />
            <AnimatedPhone />
          </div>

          <div className="cj-closing">
            <p className="cj-closing-line">{journey.closing}</p>
            <p className="cj-closing-note">{journey.closingNote}</p>
          </div>
        </div>
      </JourneyReveal>
    </section>
  );
}
