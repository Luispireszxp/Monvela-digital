import { siteConfig } from "@/content/site";
import { SectionHeading } from "./section-heading";

export function ConceptProjects() {
  return (
    <section id="trabalho" className="section concepts" aria-labelledby="concepts-title">
      <div className="shell">
        <SectionHeading
          id="concepts-title"
          eyebrow={siteConfig.conceptsSection.eyebrow}
          title={siteConfig.conceptsSection.title}
          description={siteConfig.conceptsSection.description}
        />
        <div className="concept-list">
          {siteConfig.concepts.map((concept) => (
            <article className="concept-row" key={concept.segment}>
              <span>{concept.number}</span>
              <h3>{concept.segment}</h3>
              <p>{concept.idea}</p>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
