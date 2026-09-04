import Image from "next/image";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "../section-heading";
import { FeaturedProjectReveal } from "./featured-project-reveal";

/**
 * "Último lançamento" — vitrine de um projeto real (não um projeto-conceito),
 * com captura de tela atual do próprio site do cliente dentro de um notebook
 * ilustrado (contornos finos, sem foto de notebook). O notebook inteiro é um
 * link externo; a animação de abrir só roda uma vez, ao entrar na tela — ver
 * `featured-project-reveal.tsx`.
 */
export function FeaturedProject() {
  const { featuredProject: fp } = siteConfig;

  return (
    <section
      id="ultimo-lancamento"
      className="section dark-section featured-project"
      aria-labelledby="featured-project-title"
    >
      <div className="shell">
        <SectionHeading
          id="featured-project-title"
          eyebrow={fp.eyebrow}
          title={fp.title}
          description={fp.description}
        />
      </div>

      <FeaturedProjectReveal>
        <div className="shell fp-stage-wrap">
          <a
            className="fp-link"
            href={fp.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Conhecer o projeto da ${fp.projectName}`}
          >
            <span className="fp-stage">
              <span className="fp-laptop">
                <span className="fp-lid">
                  <span className="fp-bezel">
                    <span className="fp-screen">
                      <Image
                        className="fp-screenshot"
                        src="/images/featured-project/oficina-pires.webp"
                        alt={fp.screenshotAlt}
                        fill
                        sizes="(max-width: 900px) 100vw, 52rem"
                      />
                      <span className="fp-screen-sheen" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="fp-notch" aria-hidden="true" />
                </span>
                <span className="fp-hinge" aria-hidden="true" />
                <span className="fp-base" aria-hidden="true">
                  <span className="fp-trackpad" aria-hidden="true" />
                </span>
              </span>
            </span>
          </a>

          <p className="fp-hint" aria-hidden="true">
            <svg className="fp-cursor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 3 19 11.5 13 13.3 10.6 19.4 5 3Z" />
            </svg>
            {fp.hint}
          </p>
        </div>
      </FeaturedProjectReveal>
    </section>
  );
}
