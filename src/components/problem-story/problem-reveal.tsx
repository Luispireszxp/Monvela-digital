"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ProblemRevealProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Ativa cada capítulo uma única vez quando ele entra no campo de visão.
 * A ilustração permanece completa sem JavaScript e com movimento reduzido.
 */
export function ProblemReveal({ children, className }: ProblemRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const steps = Array.from(
      root.querySelectorAll<HTMLElement>("[data-problem-step]"),
    );

    if (reducedMotion.matches) {
      root.dataset.motion = "reduced";
      steps.forEach((step) => {
        step.dataset.active = "true";
      });
      return;
    }

    root.dataset.motion = "ready";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.active = "true";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12%", threshold: 0.18 },
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={className} data-motion="static">
      {children}
    </div>
  );
}
