"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Dispara a despedida do Vela uma única vez, quando ~50% da seção está
 * visível. Só marca `data-vela="on"` — a sequência inteira é CSS (mesmo padrão
 * de `scroll-reveal.tsx` / `journey-reveal.tsx`), então nada roda antes de
 * entrar na tela e nada fica rodando depois que termina.
 *
 * O observer é desconectado no primeiro disparo: subir e descer a página não
 * reinicia a animação. Com `prefers-reduced-motion: reduce` o efeito nem é
 * armado — o CSS de fora da media query já mostra o Vela sentado com o foguete
 * parado ao lado.
 */
export function VelaReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // 50% da cena visível — mas se a cena for mais alta que a janela
          // (celular deitado, telas curtas) esse ratio nunca chegaria a 0.5,
          // então basta estar visível.
          const tallerThanViewport =
            entry.boundingClientRect.height > window.innerHeight * 0.9;
          const started = tallerThanViewport
            ? entry.isIntersecting
            : entry.intersectionRatio >= 0.5;
          if (!started) continue;
          node.dataset.vela = "on";
          observer.disconnect();
          break;
        }
      },
      { threshold: [0, 0.5] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="vela-stage" data-vela="off">
      {children}
    </div>
  );
}
