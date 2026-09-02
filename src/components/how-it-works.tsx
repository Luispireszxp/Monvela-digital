import { siteConfig } from "@/content/site";
import { SectionHeading } from "./section-heading";

export function HowItWorks() {
  return (
    <section id="como-funciona" className="section dark-section" aria-labelledby="journey-title">
      <div className="shell">
        <SectionHeading
          id="journey-title"
          eyebrow={siteConfig.howItWorks.eyebrow}
          title={siteConfig.howItWorks.title}
          description={siteConfig.howItWorks.description}
        />
        <div className="journey" aria-label={siteConfig.howItWorks.accessibleLabel}>
          {siteConfig.journey.map((item, index) => (
            <div className="journey-step" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
              {index < siteConfig.journey.length - 1 ? <i aria-hidden="true">→</i> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
