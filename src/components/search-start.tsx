import { siteConfig } from "@/content/site";
import { SectionHeading } from "./section-heading";

export function SearchStart() {
  const { searchStart } = siteConfig;

  return (
    <section id="buscas" className="section dark-section search-start" aria-labelledby="search-title">
      <div className="shell">
        <SectionHeading
          id="search-title"
          eyebrow={searchStart.eyebrow}
          title={searchStart.title}
          description={searchStart.description}
        />

        <ul className="segment-list" aria-label="Exemplos de segmentos">
          {searchStart.segments.map((segment) => (
            <li key={segment}>{segment}</li>
          ))}
        </ul>

        <ol className="search-flow" aria-label="Como o cliente decide">
          {searchStart.flow.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
              {index < searchStart.flow.length - 1 ? <i aria-hidden="true">→</i> : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
