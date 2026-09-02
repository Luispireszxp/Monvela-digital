import { siteConfig } from "@/content/site";

export function GoogleStat() {
  const { googleStat } = siteConfig;

  return (
    <section className="section dark-section google-stat" aria-labelledby="google-stat-title">
      <div className="shell google-stat-inner">
        <p className="eyebrow">{googleStat.eyebrow}</p>
        <div className="google-stat-body">
          <p className="google-stat-value" id="google-stat-title">
            {googleStat.value}
          </p>
          <div className="google-stat-text">
            <p className="google-stat-label">{googleStat.label}</p>
            <p className="google-stat-complement">{googleStat.complement}</p>
            <p className="google-stat-source">
              <a href={googleStat.sourceUrl} target="_blank" rel="noopener noreferrer">
                {googleStat.sourceLabel}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
