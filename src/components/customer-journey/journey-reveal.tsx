"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Roda a encenação uma única vez, quando a seção entra na tela.
 *
 * Escolhi autoplay em vez de rolagem "presa" (sticky scrub): não trava a
 * rolagem do visitante, não exige biblioteca de scroll e é mais leve no
 * celular — a alternativa que o próprio briefing autoriza.
 *
 * Só marca `data-journey="on"`; toda a animação é CSS. Nada roda enquanto a
 * seção está fora do campo de visão, e nada fica rodando depois que termina.
 */
export function JourneyReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.dataset.journey = "static";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          node.dataset.journey = "on";
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="cj-reveal" data-journey="off">
      {children}
    </div>
  );
}
