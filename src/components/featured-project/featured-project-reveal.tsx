"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Abre o notebook uma única vez quando a seção entra na tela.
 *
 * Segue o mesmo padrão de `journey-reveal.tsx` / `problem-reveal.tsx`: o
 * atributo `data-fp="off"` já vem no HTML (SSR), então não há flash de estado
 * errado. As regras que escondem o notebook fechado ficam todas dentro de
 * `@media (prefers-reduced-motion: no-preference)` — com movimento reduzido
 * essa media query nunca casa, e o CSS de fora dela (o notebook já aberto,
 * com a captura visível) é o que aparece, sem precisar de nenhum caso especial
 * aqui.
 */
export function FeaturedProjectReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.dataset.fp = "on";
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="fp-reveal" data-fp="off">
      {children}
    </div>
  );
}
