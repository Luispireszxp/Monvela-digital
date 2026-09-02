import { siteConfig } from "@/content/site";

export function Problem() {
  return (
    <section className="section light-section problem" aria-labelledby="problem-title">
      <div className="shell editorial-grid">
        <p className="eyebrow">{siteConfig.problem.eyebrow}</p>
        <div>
          <h2 id="problem-title">{siteConfig.problem.title}</h2>
          <div className="problem-copy">
            {siteConfig.problem.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
