import { siteConfig } from "@/content/site";
import { getPillars } from "@/lib/content";
import { SectionHeading } from "./section-heading";

export async function Solution() {
  const pillars = await getPillars();

  return (
    <section id="solucoes" className="section light-section solution" aria-labelledby="solution-title">
      <div className="shell split-section">
        <SectionHeading
          id="solution-title"
          light
          eyebrow={siteConfig.solution.eyebrow}
          title={siteConfig.solution.title}
          description={siteConfig.solution.description}
        />
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
