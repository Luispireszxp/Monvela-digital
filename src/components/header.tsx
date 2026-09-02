"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/content/site";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="Monvela Digital — início">
          <span className="wordmark-dot" aria-hidden="true" />
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {siteConfig.navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <a className="button button-small header-cta" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
          Vamos conversar
        </a>

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
          <a className="button" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
            Vamos conversar
          </a>
        </nav>
      </div>
    </header>
  );
}
