"use client";

import { useEffect, useRef, useState } from "react";

const TARGET = 87.5;

/**
 * Conta de 0 até 87,5 e dá um pequeno salto ao chegar.
 *
 * A contagem é feita em `requestAnimationFrame` (nenhuma biblioteca) e só
 * dispara quando a seção entra na tela, uma única vez. Com
 * `prefers-reduced-motion: reduce` o valor final aparece direto, sem contagem
 * nem salto.
 *
 * O número fica sempre no DOM como texto — leitores de tela e buscadores leem
 * "87,5%" mesmo se o JavaScript não rodar.
 */
export function AnimatedPercentage({ delayMs = 1500 }: { delayMs?: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [value, setValue] = useState(TARGET);
  const [popping, setPopping] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let timer = 0;
    let done = false;

    const run = () => {
      const start = performance.now();
      const duration = 1400;
      setValue(0);
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // desaceleração suave no fim
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Number((TARGET * eased).toFixed(1)));
        if (t < 1) {
          raf = requestAnimationFrame(step);
        } else {
          setValue(TARGET);
          setPopping(true);
        }
      };
      raf = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (done || !entries.some((e) => e.isIntersecting)) return;
        done = true;
        observer.disconnect();
        timer = window.setTimeout(run, delayMs);
      },
      { threshold: 0.35 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [delayMs]);

  return (
    <p
      ref={ref}
      className={`dc-percentage${popping ? " dc-percentage-pop" : ""}`}
      aria-label="87,5 por cento"
    >
      <span aria-hidden="true">{value.toFixed(1).replace(".", ",")}%</span>
    </p>
  );
}
