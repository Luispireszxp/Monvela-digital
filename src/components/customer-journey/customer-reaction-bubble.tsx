import { REACTION } from "./data";

/**
 * O balão "Gostei desse aqui!!!" que surge acima do celular na cena da decisão.
 * Fundo marfim, texto azul-marinho, cantos bem arredondados e uma pontinha
 * curva apontando para o aparelho.
 */
export function CustomerReactionBubble() {
  return (
    <p className="cj-bubble">
      {REACTION}
      <span className="cj-bubble-tail" aria-hidden="true" />
    </p>
  );
}
