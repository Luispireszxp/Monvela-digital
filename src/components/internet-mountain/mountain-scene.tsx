"use client";

import { useEffect, useRef } from "react";
import {
  CLIMB_PATH_D,
  REST_FRAME,
  SILHOUETTE_D,
  VIEWBOX_FULL,
  computeFrame,
  computeViewBox,
  type Frame,
  type Seg2,
} from "./scene-data";
import { MonvelaMascot } from "./mascot";
import { TopographicMountain } from "./topographic-mountain";
import { SummitFlag } from "./summit-flag";

/**
 * Palco fixo (sticky) dentro de uma trilha alta: a rolagem "arrasta" o
 * progresso 0→1 e a cena inteira responde a ele. Não trava a rolagem — se o
 * visitante volta, a animação volta junto.
 *
 * Sem biblioteca e sem loop ocioso: um listener de `scroll` agenda UM
 * `requestAnimationFrame` por quadro, que escreve atributos direto nos
 * elementos (localizados por classe/`data-im` dentro do efeito), sem re-render
 * do React. Base = estado final (mascote de pé ao lado da bandeira);
 * `prefers-reduced-motion` e sem-JS mostram só esse quadro.
 */
export function MountainScene({ a11y }: { a11y: string }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const root = track.closest(".internet-mountain") as HTMLElement | null;
    const stage = track.querySelector(".im-stage");
    if (!stage) return;

    const qs = <T extends Element>(sel: string) => stage.querySelector<T>(sel);
    const word = qs<SVGTextElement>(".im-word");
    const svg = qs<SVGSVGElement>(".im-svg");
    const mountainGroup = qs<SVGGElement>(".im-mountain");
    const contours = Array.from(stage.querySelectorAll<SVGPathElement>(".im-contour"));
    const climbPath = qs<SVGPathElement>(".im-climb-path");
    const pole = qs<SVGRectElement>(".im-pole");
    const cloth = qs<SVGGElement>(".im-flag-cloth");
    const wind = qs<SVGGElement>(".im-wind");
    const clouds = Array.from(stage.querySelectorAll<SVGGElement>(".im-cloud"));
    const mascotRoot = qs<SVGGElement>(".im-mascot");
    const mLine = (n: string) => qs<SVGLineElement>(`[data-im="${n}"]`);
    const torso = mLine("torso");
    const armLU = mLine("armLU");
    const armLF = mLine("armLF");
    const armRU = mLine("armRU");
    const armRF = mLine("armRF");
    const legLU = mLine("legLU");
    const legLF = mLine("legLF");
    const legRU = mLine("legRU");
    const legRF = mLine("legRF");
    const head = qs<SVGCircleElement>(".im-head");

    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Abaixo disto o viewBox largo não cabe em retrato: entra a câmera que segue
    // o mascote (computeViewBox) e o mascote ganha um empurrão de escala.
    const mqCompact = window.matchMedia("(max-width: 640px)");
    let compact = mqCompact.matches;
    let queued = false;
    let lastP = -1;
    let disposed = false;

    const setSeg = (el: SVGLineElement | null, s: Seg2) => {
      if (!el) return;
      el.setAttribute("x1", s.x1.toFixed(2));
      el.setAttribute("y1", s.y1.toFixed(2));
      el.setAttribute("x2", s.x2.toFixed(2));
      el.setAttribute("y2", s.y2.toFixed(2));
    };

    const applyFrame = (p: number, reduced: boolean) => {
      const f: Frame = computeFrame(p, { compact, reduced });

      for (let i = 0; i < contours.length; i++) {
        contours[i].setAttribute("stroke-dashoffset", (1 - f.mountain.draw[i]).toFixed(3));
      }
      if (mountainGroup) {
        mountainGroup.style.opacity = f.mountain.opacity.toFixed(3);
        mountainGroup.setAttribute("transform", `translate(0 ${f.mountain.ty.toFixed(2)})`);
      }
      if (word) {
        word.style.opacity = f.word.opacity.toFixed(3);
        word.style.filter = f.word.blur > 0.05 ? `blur(${f.word.blur.toFixed(2)}px)` : "none";
        word.setAttribute("transform", `translate(0 ${f.word.ty.toFixed(1)})`);
      }
      // rastro da subida: desenha atrás do mascote conforme ele sobe
      if (climbPath) climbPath.style.strokeDashoffset = (1 - f.climb).toFixed(3);

      if (pole) {
        pole.style.transform = `scaleY(${f.flag.pole.toFixed(3)})`;
        pole.style.opacity = f.flag.pole > 0.03 ? "1" : "0";
      }
      if (cloth) cloth.style.transform = `scaleX(${f.flag.furl.toFixed(3)})`;
      if (wind) wind.style.opacity = f.flag.windOpacity.toFixed(3);
      for (let i = 0; i < clouds.length; i++) {
        const cloud = f.clouds[i];
        if (!cloud) continue;
        clouds[i].setAttribute(
          "transform",
          `translate(${cloud.x.toFixed(2)} ${cloud.y.toFixed(2)}) rotate(${cloud.rot.toFixed(2)})`,
        );
      }

      const m = f.mascot;
      if (mascotRoot) {
        mascotRoot.setAttribute(
          "transform",
          `translate(${m.rootX.toFixed(2)} ${m.rootY.toFixed(2)}) rotate(${m.rootRot.toFixed(
            2,
          )}) scale(${m.rootScale.toFixed(3)})`,
        );
      }
      setSeg(torso, m.torso);
      setSeg(armLU, m.armLU);
      setSeg(armLF, m.armLF);
      setSeg(armRU, m.armRU);
      setSeg(armRF, m.armRF);
      setSeg(legLU, m.legLU);
      setSeg(legLF, m.legLF);
      setSeg(legRU, m.legRU);
      setSeg(legRF, m.legRF);
      if (head) {
        head.setAttribute("cx", m.head.cx.toFixed(2));
        head.setAttribute("cy", m.head.cy.toFixed(2));
      }
    };

    const readProgress = (): number => {
      const r = track.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = r.height - vh;
      if (total <= 0) return r.top <= 0 ? 1 : 0;
      return Math.min(1, Math.max(0, -r.top / total));
    };

    const applyViewBox = (p: number) => {
      svg?.setAttribute("viewBox", computeViewBox(p, compact));
    };

    const render = () => {
      queued = false;
      if (disposed) return;
      const p = readProgress();
      if (Math.abs(p - lastP) > 0.0004) {
        lastP = p;
        // Em telas estreitas a "câmera" acompanha o mascote quadro a quadro.
        if (compact) applyViewBox(p);
        applyFrame(p, false);
      }
    };

    const schedule = () => {
      if (queued || disposed) return;
      queued = true;
      requestAnimationFrame(render);
    };

    const setup = () => {
      lastP = -1;
      if (mqReduce.matches) {
        root?.setAttribute("data-reduced", "true");
        applyViewBox(1);
        applyFrame(1, true);
        return;
      }
      root?.setAttribute("data-reduced", "false");
      const p0 = readProgress();
      applyViewBox(p0);
      applyFrame(p0, false);
      window.addEventListener("scroll", schedule, { passive: true });
    };

    const onResize = () => {
      compact = mqCompact.matches;
      lastP = -1;
      if (mqReduce.matches) {
        applyViewBox(1);
        applyFrame(1, true);
      } else {
        applyViewBox(readProgress());
        schedule();
      }
    };
    const onReduceChange = () => {
      window.removeEventListener("scroll", schedule);
      setup();
    };

    window.addEventListener("resize", onResize, { passive: true });
    mqReduce.addEventListener("change", onReduceChange);
    setup();

    return () => {
      disposed = true;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      mqReduce.removeEventListener("change", onReduceChange);
    };
  }, []);

  const rest: Frame = REST_FRAME;

  return (
    <div className="im-track" ref={trackRef}>
      <div className="im-stage">
        <svg
          className="im-svg"
          viewBox={VIEWBOX_FULL}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={a11y}
        >
          <defs>
            <clipPath id="im-mountain-clip">
              <path d="M82 782 L572 120 L632 120 L1162 782 Z" />
            </clipPath>
          </defs>

          <g className="im-cloud im-cloud-back" aria-hidden="true">
            <path d="M176 200 C176 177 194 160 218 162 C229 133 270 127 290 152 C315 145 340 163 340 190 C340 195 339 200 337 205 L184 205 C179 205 176 203 176 200 Z" />
          </g>
          <g className="im-cloud im-cloud-mid" aria-hidden="true">
            <path d="M1050 248 C1050 226 1068 210 1090 211 C1103 180 1146 178 1163 208 C1191 200 1218 220 1218 248 L1216 257 L1056 257 C1052 255 1050 252 1050 248 Z" />
          </g>
          <g className="im-cloud im-cloud-front" aria-hidden="true">
            <path d="M816 96 C816 78 830 65 848 65 C858 42 890 40 903 63 C924 58 945 73 945 94 L943 102 L821 102 C818 101 816 99 816 96 Z" />
          </g>

          <text
            className="im-word"
            x={622}
            y={575}
            textAnchor="middle"
            clipPath="url(#im-mountain-clip)"
            aria-hidden="true"
          >
            INTERNET
          </text>

          <path className="im-silhouette" d={SILHOUETTE_D} aria-hidden="true" />

          <TopographicMountain />

          <path
            className="im-climb-path"
            d={CLIMB_PATH_D}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
            aria-hidden="true"
          />

          <SummitFlag />

          <MonvelaMascot initial={rest} />
        </svg>

        <p className="im-sr">{a11y}</p>
      </div>
    </div>
  );
}
