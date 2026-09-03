import Link from "next/link";
import { company } from "@/config/company";
import { siteConfig } from "@/content/site";
import { BrandLockup } from "./brand-lockup";
import { WhatsAppLink } from "./whatsapp-link";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H17V3.6c-.3 0-1.3-.1-2.45-.1-2.43 0-4.05 1.48-4.05 4.2v2.2H7.8V13h2.7v8h3z" />
    </svg>
  );
}

export function Footer() {
  const { hasWhatsapp, hasEmail, hasFacebook } = company;
  const hasDirectContact = hasWhatsapp || hasEmail || hasFacebook;

  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand-link" href="/" aria-label={`${siteConfig.name} — início`}>
            <BrandLockup variant="stacked" />
          </Link>
          <p>{siteConfig.footer.positioning}</p>
        </div>

        <nav aria-label="Links do rodapé">
          {siteConfig.navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/politica-de-privacidade">Política de privacidade</Link>
        </nav>

        <div className="footer-contact">
          {hasWhatsapp ? (
            <>
              <a href={company.phoneUrl}>Telefone: {company.whatsappDisplay}</a>
              <WhatsAppLink
                source="footer"
                ariaLabel={`Conversar com a Monvela pelo WhatsApp no número ${company.whatsappDisplay}`}
              >
                WhatsApp: {company.whatsappDisplay}
              </WhatsAppLink>
            </>
          ) : null}
          {hasEmail ? (
            <a href={`mailto:${company.contactEmail}`}>{company.contactEmail}</a>
          ) : null}
          {hasFacebook ? (
            <a
              className="footer-facebook"
              href={company.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
              <span>Facebook</span>
            </a>
          ) : null}
          {!hasDirectContact ? (
            <span>
              Canais de contato em configuração.{" "}
              <Link href="/#contato">Fale com a Monvela</Link>
            </span>
          ) : null}
        </div>
      </div>

      <div className="shell footer-bottom">
        <span>
          © {new Date().getFullYear()} {siteConfig.name}. {siteConfig.footer.legal}
        </span>
        <span>{siteConfig.footer.signature}</span>
      </div>
    </footer>
  );
}
