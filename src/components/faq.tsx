import { siteConfig } from "@/content/site";
import { SectionHeading } from "./section-heading";

export function FAQ() {
  return (
    <section id="duvidas" className="section light-section faq" aria-labelledby="faq-title">
      <div className="shell split-section">
        <SectionHeading
          id="faq-title"
          light
          eyebrow={siteConfig.faqSection.eyebrow}
          title={siteConfig.faqSection.title}
        />
        <div className="faq-list">
          {siteConfig.faqs.map((item) => (
            <details key={item.question}>
              <summary>{item.question}<span aria-hidden="true">+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
