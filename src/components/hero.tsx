import Link from "next/link";
import { siteConfig } from "@/content/site";
import { HeroAnimation } from "./hero-animation";
import { WhatsAppLink } from "./whatsapp-link";

export function Hero() {
  const { hero } = siteConfig;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="shell hero-inner">
        <h1 id="hero-title" className="hero-title">
          <span className="hero-title-line">{hero.titleStart}</span>
          <span className="hero-title-line">
            {hero.titleEnd}
            <span className="hero-title-mark">{hero.titleMark}</span>
          </span>
        </h1>

        <p className="hero-description">{hero.description}</p>

        <HeroAnimation label={hero.animationLabel} />

        <div className="hero-actions">
          <WhatsAppLink source="hero" className="button">
            {hero.primaryCta}
          </WhatsAppLink>
          <p className="hero-note">{hero.note}</p>
        </div>

        <Link className="hero-scroll" href={hero.scrollHref}>
          <span>{hero.scrollHint}</span>
          <span className="hero-scroll-line" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
