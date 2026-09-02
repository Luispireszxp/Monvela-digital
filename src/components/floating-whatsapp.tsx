import { siteConfig } from "@/content/site";

export function FloatingWhatsApp() {
  return (
    <a className="floating-whatsapp" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" aria-label="Abrir conversa com a Monvela Digital no WhatsApp">
      <span aria-hidden="true">W</span><strong>Conversar</strong>
    </a>
  );
}
