import Image from "next/image";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "./section-heading";

/**
 * Projetos-conceito — direção visual, não clientes reais.
 *
 * Enquanto `coverImage` / `desktopPreview` / `mobilePreview` estiverem vazios,
 * o cartão mostra um marcador discreto (sem imagem quebrada). O botão "Conhecer
 * o projeto" fica preparado: quando existir uma página de projeto, troque o
 * `<span>` por um `<Link href=...>`.
 */
export function ConceptProjects() {
  const { conceptsSection, concepts } = siteConfig;

  return (
    <section id="projetos" className="section concepts" aria-labelledby="concepts-title">
      <div className="shell">
        <SectionHeading
          id="concepts-title"
          eyebrow={conceptsSection.eyebrow}
          title={conceptsSection.title}
          description={conceptsSection.description}
        />

        <div className="concept-grid">
          {concepts.map((concept) => (
            <article className="concept-card" key={concept.name}>
              <div className="concept-cover">
                {concept.coverImage ? (
                  <Image
                    src={concept.coverImage}
                    alt={`Capa do projeto-conceito ${concept.name}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                  />
                ) : (
                  <span className="concept-cover-placeholder" aria-hidden="true">
                    {concept.segment}
                  </span>
                )}
                <p className="concept-badge">Projeto-conceito</p>
              </div>
              <div className="concept-body">
                <p className="concept-segment">{concept.segment}</p>
                <h3>{concept.name}</h3>
                <p className="concept-description">{concept.description}</p>
                <span className="concept-cta" aria-disabled="true">
                  {conceptsSection.ctaLabel} <em>· em breve</em>
                </span>
              </div>
            </article>
          ))}
        </div>

        <p className="concept-disclaimer">{conceptsSection.disclaimer}</p>
      </div>
    </section>
  );
}
