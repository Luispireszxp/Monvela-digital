import { siteConfig } from "@/content/site";
import { WhatsAppLink } from "./whatsapp-link";

export function FinalCTA() {
  return (
    <section className="final-cta" aria-labelledby="cta-title">
      <div className="shell final-cta-inner">
        <p className="eyebrow">{siteConfig.finalCta.eyebrow}</p>
        <h2 id="cta-title">{siteConfig.finalCta.title}</h2>
        <p>{siteConfig.finalCta.description}</p>
        <WhatsAppLink source="final-cta" className="button">
          {siteConfig.finalCta.button} <span aria-hidden="true">↗</span>
        </WhatsAppLink>
      </div>
    </section>
  );
}
