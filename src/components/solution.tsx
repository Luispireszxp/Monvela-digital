import Image from "next/image";
import { siteConfig } from "@/content/site";
import { getPillars } from "@/lib/content";
import { SectionHeading } from "./section-heading";
import { SolutionReveal } from "./solution-reveal";

/**
 * "O ecossistema Monvela": a ilustração da cidade (comércios, profissões e
 * atividades conectados pela Monvela) é PAPEL DE PAREDE da abertura — fica
 * atrás da mensagem, sangrando de ponta a ponta da seção, e se dissolve no
 * marfim antes dos serviços. É só decoração: nenhum texto vive dentro da
 * imagem (`alt=""` + `aria-hidden`), tudo continua HTML de verdade.
 *
 * No mobile a cidade sai de trás do texto e volta a ser um bloco comum no
 * fluxo (ver `.sol-wallpaper` em globals.css) — texto primeiro, ilustração
 * inteira logo abaixo, sem cortar os personagens da base.
 *
 * A lista de pilares continua abaixo, fora da ilustração.
 */
export async function Solution() {
  const pillars = await getPillars();

  return (
    <section id="solucoes" className="section light-section solution" aria-labelledby="solution-title">
      <SolutionReveal>
        <div className="sol-intro-wrap">
          <div className="sol-wallpaper" aria-hidden="true">
            <Image
              className="sol-wallpaper-img"
              src="/images/ecossistema-monvela-bg.webp"
              alt=""
              aria-hidden="true"
              width={1672}
              height={941}
              sizes="100vw"
            />
            <span className="sol-wallpaper-veil" />
          </div>
          <div className="shell sol-intro">
            <SectionHeading
              id="solution-title"
              light
              eyebrow={siteConfig.solution.eyebrow}
              title={siteConfig.solution.title}
              description={siteConfig.solution.description}
            />
          </div>
        </div>
      </SolutionReveal>

      <div className="shell">
        <div className="pillar-list">
          {pillars.map((pillar, index) => (
            <article className="pillar-row" key={pillar.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
                {pillar.points.length > 0 ? (
                  <ul className="pillar-points">
                    {pillar.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                ) : null}
                {pillar.note ? <p className="pillar-note">{pillar.note}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
