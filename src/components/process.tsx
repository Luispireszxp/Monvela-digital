import { siteConfig } from "@/content/site";
import { SectionHeading } from "./section-heading";

export function Process() {
  return (
    <section id="processo" className="section light-section process" aria-labelledby="process-title">
      <div className="shell split-section">
        <SectionHeading
          id="process-title"
          light
          eyebrow={siteConfig.processSection.eyebrow}
          title={siteConfig.processSection.title}
          description={siteConfig.processSection.description}
        />
        <ol className="process-steps">
          {siteConfig.process.map((item) => (
            <li key={item.step}>
              <span>{item.step}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
