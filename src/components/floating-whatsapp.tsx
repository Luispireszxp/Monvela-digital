import { WhatsAppLink } from "./whatsapp-link";

export function FloatingWhatsApp() {
  return (
    <WhatsAppLink source="floating" className="floating-whatsapp">
      <span aria-hidden="true">W</span>
      <strong>Conversar</strong>
    </WhatsAppLink>
  );
}
