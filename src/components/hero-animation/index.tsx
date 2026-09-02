import { ConnectionArrow } from "./connection-arrow";
import { ConnectionError } from "./connection-error";
import { DigitalDeviceIllustration } from "./digital-device-illustration";
import { StoreIllustration } from "./store-illustration";

/**
 * A cena do hero: o comércio existe, o digital existe, mas a ligação entre os
 * dois se rompe no meio do caminho.
 *
 * Tudo é SVG + keyframes de CSS (`globals.css`, bloco "Hero — cena animada").
 * Nenhuma biblioteca de animação: o ciclo roda sem JavaScript, então não pesa
 * no carregamento nem bloqueia a interação.
 *
 * Com `prefers-reduced-motion: reduce` nenhuma animação é declarada e o SVG
 * fica na cena final — comércio e celular visíveis, traço rompido, "X" no meio.
 *
 * Os `<g>` externos só posicionam (atributo `transform`); os internos é que
 * recebem as animações, para o `transform` do CSS não sobrescrever a posição.
 */
export function HeroAnimation({ label }: { label: string }) {
  return (
    <div className="hero-scene">
      <svg
        className="hero-scene-svg"
        viewBox="0 40 700 262"
        role="img"
        aria-label={label}
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(0 44)">
          <StoreIllustration className="hero-scene-store" />
        </g>

        <ConnectionArrow className="hero-scene-arrow" />
        <ConnectionError className="hero-scene-error" />

        <g transform="translate(460 44)">
          <DigitalDeviceIllustration className="hero-scene-device-group" />
        </g>
      </svg>
    </div>
  );
}
