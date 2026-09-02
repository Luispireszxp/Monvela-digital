import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Image
        className="hero-image"
        src="/images/hero-concept.png"
        alt={siteConfig.hero.imageAlt}
        fill
        priority
        sizes="100vw"
      />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{siteConfig.hero.eyebrow}</p>
          <h1 id="hero-title">
            {siteConfig.hero.titleStart}
            <br />
            <span>{siteConfig.hero.titleEnd}</span>
          </h1>
          <p className="hero-description">{siteConfig.description}</p>
          <div className="hero-actions">
            <a className="button" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">
              {siteConfig.hero.primaryCta} <span aria-hidden="true">↗</span>
            </a>
            <Link className="text-link" href="#como-funciona">
              {siteConfig.hero.secondaryCta} <span aria-hidden="true">↓</span>
            </Link>
          </div>
          <p className="hero-note">{siteConfig.hero.note}</p>
        </div>
      </div>
      <p className="image-note">{siteConfig.hero.imageNote}</p>
    </section>
  );
}
