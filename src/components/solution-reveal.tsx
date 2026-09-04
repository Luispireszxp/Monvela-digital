"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Abertura do "Ecossistema Monvela": o texto sobe e a ilustração aparece com
 * fade, uma única vez, quando a seção entra na tela (mesmo padrão de
 * `journey-reveal.tsx` / `problem-story/problem-reveal.tsx`). Depois disso,
 * um paralaxe bem sutil desloca a ilustração conforme rola — só liga com
 * `prefers-reduced-motion: no-preference`, e o listener de scroll só existe
 * a partir do momento em que a seção já entrou na tela pelo menos uma vez.
 *
 * Base = tudo já visível, sem deslocamento: SSR, sem-JS e reduced-motion caem
 * nesse estado.
 */
export function SolutionReveal({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const media = root.querySelector<HTMLElement>(".sol-opening-media");
    let queued = false;
    let scrollAttached = false;

    const applyParallax = () => {
      queued = false;
      if (!media) return;
      const r = root.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // distância do centro da seção ao centro da tela, bem amortecida
      const delta = (r.top + r.height / 2 - vh / 2) * 0.025;
      const clamped = Math.max(-9, Math.min(9, delta));
      media.style.setProperty("--sol-parallax", `${clamped.toFixed(2)}px`);
    };

    const scheduleParallax = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(applyParallax);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          root.dataset.solAnimate = "on";
          if (!scrollAttached) {
            scrollAttached = true;
            applyParallax();
            window.addEventListener("scroll", scheduleParallax, { passive: true });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleParallax);
    };
  }, []);

  return (
    <div ref={rootRef} className="sol-reveal" data-sol-animate="off">
      {children}
    </div>
  );
}
