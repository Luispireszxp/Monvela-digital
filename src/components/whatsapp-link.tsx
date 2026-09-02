"use client";

import type { ReactNode } from "react";
import { company } from "@/config/company";
import { trackWhatsAppClick, type WhatsAppSource } from "@/lib/analytics";

type WhatsAppLinkProps = {
  /** De onde partiu o clique — usado só pela medição (no-op sem IDs). */
  source: WhatsAppSource;
  children: ReactNode;
  className?: string;
  /** Texto acessível. Padrão: descreve a ação. */
  ariaLabel?: string;
};

/**
 * Único ponto de saída para o WhatsApp no site.
 *
 * - URL vem de `company.whatsappUrl` (sem número: mensagem compartilhável, sem
 *   destinatário; com número: `https://wa.me/55...?text=...`).
 * - Abre em nova aba com `rel="noopener noreferrer"`.
 * - Sem formulário, cadastro ou etapa intermediária.
 */
export function WhatsAppLink({
  source,
  children,
  className,
  ariaLabel = "Abrir conversa com a Monvela no WhatsApp",
}: WhatsAppLinkProps) {
  return (
    <a
      className={className}
      href={company.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={() => trackWhatsAppClick(source)}
    >
      {children}
    </a>
  );
}
