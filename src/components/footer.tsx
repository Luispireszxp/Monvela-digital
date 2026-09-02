import Link from "next/link";
import { siteConfig } from "@/content/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <Link className="wordmark" href="/"><span className="wordmark-dot" aria-hidden="true" />{siteConfig.name}</Link>
          <p>{siteConfig.footer.positioning}</p>
        </div>
        <nav aria-label="Links do rodapé">
          {siteConfig.navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          <Link href="/politica-de-privacidade">Política de privacidade</Link>
        </nav>
        <div className="footer-contact">
          <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          {siteConfig.contactEmail ? <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> : <span>{siteConfig.footer.emailFallback}</span>}
        </div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}. {siteConfig.footer.legal}</span><span>{siteConfig.footer.signature}</span></div>
    </footer>
  );
}
