import { siteConfig } from "@/content/site";
import { VelaReveal } from "./vela-reveal";
import { VelaScene } from "./vela-scene";

/**
 * "Conheça o Vela" — despedida no fim da página.
 *
 * O mascote entra pela esquerda, acena, senta, acha um foguete de brinquedo,
 * chacoalha, lança e fica olhando. Toda a coreografia é CSS (ver o bloco
 * `.vela-*` em globals.css); o cliente só marca `data-vela="on"` quando metade
 * da cena entra na tela — uma vez só (`vela-reveal.tsx`).
 *
 * A cena é decorativa (`aria-hidden`): o conteúdo real é o texto.
 */
export function VelaFarewell() {
  const { velaFarewell: v } = siteConfig;

  return (
    <section className="vela-section" aria-labelledby="vela-title">
      <div className="shell vela-inner">
        <div className="vela-copy">
          <p className="eyebrow">{v.eyebrow}</p>
          <h2 id="vela-title" className="vela-title">
            {v.title}
            <span className="vela-title-mark">{v.titleMark}</span>
          </h2>
          <p className="vela-description">{v.description}</p>
        </div>

        <VelaReveal>
          <VelaScene />
        </VelaReveal>
      </div>
    </section>
  );
}
