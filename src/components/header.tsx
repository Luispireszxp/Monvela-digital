"use client";

import Link from "next/link";
import { useState } from "react";
import { company } from "@/config/company";
import { siteConfig } from "@/content/site";
import { BrandMark } from "./brand-mark";
import { WhatsAppLink } from "./whatsapp-link";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H17V3.6c-.3 0-1.3-.1-2.45-.1-2.43 0-4.05 1.48-4.05 4.2v2.2H7.8V13h2.7v8h3z" />
    </svg>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label={`${siteConfig.name} — início`}>
          <BrandMark className="wordmark-mark" />
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          {company.hasFacebook ? (
            <a
              className="icon-link header-facebook"
              href={company.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={company.facebookLabel}
            >
              <FacebookIcon />
            </a>
          ) : null}
          <WhatsAppLink source="header" className="button button-small header-cta">
            Falar no WhatsApp
          </WhatsAppLink>
        </div>

        <button
          className="menu-button"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" data-open={isOpen}>
        <nav className="shell" aria-label="Navegação no celular">
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </Link>
          ))}
          {company.hasFacebook ? (
            <a href={company.facebookUrl} target="_blank" rel="noopener noreferrer">
              {company.facebookLabel}
            </a>
          ) : null}
          <WhatsAppLink source="header" className="button">
            Falar no WhatsApp
          </WhatsAppLink>
        </nav>
      </div>
    </header>
  );
}
