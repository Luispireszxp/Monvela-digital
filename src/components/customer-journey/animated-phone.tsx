import { CustomerReactionBubble } from "./customer-reaction-bubble";
import { HotelWebsite } from "./hotel-website";
import { SearchScreen } from "./search-screen";
import { STORY_DESCRIPTION } from "./data";
import { WhatsAppConversation } from "./whatsapp-conversation";

/**
 * O aparelho e as três telas da história.
 *
 * As telas ficam empilhadas e deslizam na horizontal no tempo certo
 * (busca → site → conversa). O ponto de toque é um círculo simples, sem mão.
 *
 * Tudo aqui é ilustração: `aria-hidden` no aparelho e uma descrição em texto
 * logo abaixo, para leitor de tela receber a história em vez de ler pedaços
 * soltos de uma interface falsa. Nenhum elemento é focável pelo teclado.
 */
export function AnimatedPhone() {
  return (
    <div className="cj-stage">
      <CustomerReactionBubble />

      <div className="cj-phone" aria-hidden="true">
        <span className="cj-phone-glow" />
        <div className="cj-phone-frame">
          <span className="cj-phone-notch" />
          <div className="cj-viewport">
            <SearchScreen />
            <HotelWebsite />
            <WhatsAppConversation />
            <span className="cj-dissolve" />
          </div>
          <span className="cj-cursor">
            <span className="cj-cursor-ring" />
          </span>
        </div>
      </div>

      <p className="cj-sr-only">{STORY_DESCRIPTION}</p>
    </div>
  );
}
