import { company } from "@/config/company";
import { siteConfig } from "@/content/site";

export function About() {
  return (
    <section id="sobre" className="section about" aria-labelledby="about-title">
      <div className="shell about-grid">
        <div>
          <p className="eyebrow">{siteConfig.about.eyebrow}</p>
          <h2 id="about-title">{siteConfig.about.title}</h2>
        </div>
        <div className="about-copy">
          {siteConfig.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="about-values">
            {siteConfig.about.values.map((value) => (
              <span key={value}>{value}</span>
            ))}
          </div>
          {company.hasFacebook ? (
            <a
              className="text-link about-facebook"
              href={company.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {company.facebookLabel} <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
