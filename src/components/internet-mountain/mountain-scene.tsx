"use client";

import { useEffect, useRef } from "react";
import {
  CLIMB_PATH_D,
  LANDING,
  REST_FRAME,
  computeFrame,
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
 * do React. Base = estado final; `prefers-reduced-motion` e sem-JS mostram só
 * esse quadro.
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
    const trail = qs<SVGGElement>(".im-trail");
    const trailDots = trail
      ? (Array.from(trail.children) as SVGCircleElement[])
      : [];
    const dust = qs<SVGGElement>(".im-dust");
    const descent = qs<SVGPathElement>(".im-descent");

    const hist: { x: number; y: number }[] = [];
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqCompact = window.matchMedia("(max-width: 720px)");
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
      if (climbPath) climbPath.style.opacity = f.climb.toFixed(3);

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

      // Rastro da queda: 3 discos em posições anteriores do mascote (por
      // distância, não por quadro), baixa opacidade, some rápido.
      const prev = hist[hist.length - 1];
      if (!prev || Math.hypot(m.rootX - prev.x, m.rootY - prev.y) > 6) {
        hist.push({ x: m.rootX, y: m.rootY });
        if (hist.length > 48) hist.shift();
      }
      if (trail) {
        trail.style.opacity = f.trailVis.toFixed(3);
        const back = [4, 9, 15];
        for (let i = 0; i < trailDots.length; i++) {
          const h = hist[hist.length - 1 - back[i]] ?? { x: m.rootX, y: m.rootY };
          trailDots[i].setAttribute("cx", h.x.toFixed(1));
          trailDots[i].setAttribute("cy", h.y.toFixed(1));
          trailDots[i].setAttribute("opacity", (0.16 - i * 0.045).toFixed(3));
        }
      }

      if (dust) {
        dust.style.opacity = f.dust.opacity.toFixed(3);
        dust.setAttribute(
          "transform",
          `translate(${LANDING.x} ${LANDING.y}) scale(${f.dust.scale.toFixed(
            3,
          )}) translate(${-LANDING.x} ${-LANDING.y})`,
        );
      }
      if (descent) descent.style.opacity = f.descent.toFixed(3);
    };

    const readProgress = (): number => {
      const r = track.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = r.height - vh;
      if (total <= 0) return r.top <= 0 ? 1 : 0;
      return Math.min(1, Math.max(0, -r.top / total));
    };

    const render = () => {
      queued = false;
      if (disposed) return;
      const p = readProgress();
      if (Math.abs(p - lastP) > 0.0004) {
        lastP = p;
        applyFrame(p, false);
      }
    };

    const schedule = () => {
      if (queued || disposed) return;
      queued = true;
      requestAnimationFrame(render);
    };

    const applyViewBox = () => {
      svg?.setAttribute("viewBox", "0 0 1440 788");
    };

    const setup = () => {
      applyViewBox();
      lastP = -1;
      if (mqReduce.matches) {
        root?.setAttribute("data-reduced", "true");
        applyFrame(1, true);
        return;
      }
      root?.setAttribute("data-reduced", "false");
      applyFrame(readProgress(), false);
      window.addEventListener("scroll", schedule, { passive: true });
    };

    const onResize = () => {
      compact = mqCompact.matches;
      applyViewBox();
      lastP = -1;
      if (mqReduce.matches) applyFrame(1, true);
      else schedule();
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
          viewBox="0 0 1440 788"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={a11y}
        >
          <defs>
            <clipPath id="im-mountain-clip">
              <path d="M82 752 L568 174 L636 174 L1164 752 Z" />
            </clipPath>
          </defs>

          <g className="im-cloud im-cloud-back" aria-hidden="true">
            <path d="M176 224 C176 201 194 184 218 186 C229 157 270 151 290 176 C315 169 340 187 340 214 C340 219 339 224 337 229 L184 229 C179 229 176 227 176 224 Z" />
          </g>
          <g className="im-cloud im-cloud-mid" aria-hidden="true">
            <path d="M1050 284 C1050 262 1068 246 1090 247 C1103 216 1146 214 1163 244 C1191 236 1218 256 1218 284 L1216 293 L1056 293 C1052 291 1050 288 1050 284 Z" />
          </g>
          <g className="im-cloud im-cloud-front" aria-hidden="true">
            <path d="M816 132 C816 114 830 101 848 101 C858 78 890 76 903 99 C924 94 945 109 945 130 L943 138 L821 138 C818 137 816 135 816 132 Z" />
          </g>

          <text
            className="im-word"
            x={622}
            y={548}
            textAnchor="middle"
            clipPath="url(#im-mountain-clip)"
            aria-hidden="true"
          >
            INTERNET
          </text>

          <TopographicMountain />

          <path
            className="im-climb-path"
            d={CLIMB_PATH_D}
            opacity={0}
            aria-hidden="true"
          />

          <SummitFlag />

          <g className="im-trail" aria-hidden="true" opacity={0}>
            <circle r={7} />
            <circle r={6} />
            <circle r={5} />
          </g>

          <MonvelaMascot initial={rest} />

          <g className="im-dust" aria-hidden="true" opacity={0}>
            <g>
              <circle cx={LANDING.x - 20} cy={LANDING.y + 4} r={7} />
              <circle cx={LANDING.x - 28} cy={LANDING.y - 2} r={5} />
              <circle cx={LANDING.x - 12} cy={LANDING.y} r={5} />
              <circle cx={LANDING.x - 22} cy={LANDING.y + 10} r={4} />
            </g>
            <g>
              <circle cx={LANDING.x + 20} cy={LANDING.y + 6} r={7} />
              <circle cx={LANDING.x + 28} cy={LANDING.y} r={5} />
              <circle cx={LANDING.x + 12} cy={LANDING.y + 2} r={5} />
              <circle cx={LANDING.x + 22} cy={LANDING.y + 12} r={4} />
            </g>
          </g>

          <path
            className="im-descent"
            d={`M ${LANDING.x} ${LANDING.y - 4} C ${LANDING.x + 6} ${LANDING.y + 40} ${
              LANDING.x + 10
            } ${LANDING.y + 80} ${LANDING.x + 8} ${LANDING.y + 124}`}
            fill="none"
            aria-hidden="true"
            opacity={0}
          />
        </svg>

        <p className="im-sr">{a11y}</p>
      </div>
    </div>
  );
}
