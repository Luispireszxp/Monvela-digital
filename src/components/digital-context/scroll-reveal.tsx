"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Dispara a sequência da seção uma única vez, quando ela entra na tela.
 *
 * Só marca `data-animate="on"` no wrapper — toda a animação em si é CSS, então
 * nada roda enquanto a seção está fora do campo de visão e nada continua
 * rodando depois. Os filhos são Server Components: a marcação SVG não vai para
 * o bundle do cliente.
 */
export function ScrollReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.dataset.animate = "on";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          node.dataset.animate = "on";
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="dc-reveal" data-animate="off">
      {children}
    </div>
  );
}
