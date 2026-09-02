import { siteConfig } from "@/content/site";

export function FinalCTA() {
  return (
    <section className="final-cta" aria-labelledby="cta-title">
      <div className="shell final-cta-inner">
        <p className="eyebrow">{siteConfig.finalCta.eyebrow}</p>
        <h2 id="cta-title">{siteConfig.finalCta.title}</h2>
        <p>{siteConfig.finalCta.description}</p>
        <a className="button" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">{siteConfig.finalCta.button} <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
