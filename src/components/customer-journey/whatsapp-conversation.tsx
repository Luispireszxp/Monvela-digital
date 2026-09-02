import { CHAT } from "./data";

/**
 * Cena 4 — a conversa encenada, depois do clique simulado.
 *
 * Continua sendo uma ilustração: nenhum link, nenhum envio de verdade.
 */
export function WhatsAppConversation() {
  return (
    <div className="cj-slide cj-slide-chat">
      <div className="cj-chat-bar">
        <span className="cj-chat-back" aria-hidden="true">
          ←
        </span>
        <span className="cj-chat-avatar" aria-hidden="true">
          S
        </span>
        <span className="cj-chat-who">
          <span className="cj-chat-name">{CHAT.contact}</span>
          <span className="cj-chat-status">{CHAT.status}</span>
        </span>
      </div>

      <div className="cj-chat-body">
        <p className="cj-chat-day">{CHAT.day}</p>
        <p className="cj-chat-bubble">
          {CHAT.message}
          <span className="cj-chat-meta" aria-hidden="true">
            {CHAT.time}
            <span className="cj-chat-ticks">✓✓</span>
          </span>
        </p>
      </div>
    </div>
  );
}
