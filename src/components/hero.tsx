import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { WhatsAppLink } from "./whatsapp-link";

export function Hero() {
  const { hero } = siteConfig;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <Image
        className="hero-image"
        src="/images/hero-concept.png"
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
      />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title">
            {hero.titleStart}
            <br />
            <span>{hero.titleEnd}</span>
          </h1>
          <p className="hero-description">{hero.description}</p>
          <div className="hero-actions">
            <WhatsAppLink source="hero" className="button">
              {hero.primaryCta} <span aria-hidden="true">↗</span>
            </WhatsAppLink>
            <Link className="text-link" href={hero.secondaryHref}>
              {hero.secondaryCta} <span aria-hidden="true">↓</span>
            </Link>
          </div>
          <p className="hero-note">{hero.note}</p>
        </div>
      </div>
    </section>
  );
}
