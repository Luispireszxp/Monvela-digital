import { siteConfig } from "@/content/site";
import { SectionHeading } from "./section-heading";

export function Services() {
  return (
    <section className="section light-section" aria-labelledby="services-title">
      <div className="shell split-section">
        <SectionHeading
          id="services-title"
          light
          eyebrow={siteConfig.servicesSection.eyebrow}
          title={siteConfig.servicesSection.title}
          description={siteConfig.servicesSection.description}
        />
        <div className="service-list">
          {siteConfig.services.map((service, index) => (
            <article className="service-row" key={service.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
