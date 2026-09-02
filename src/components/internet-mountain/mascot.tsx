import type { Frame, Seg2 } from "./scene-data";

/**
 * Mascote oficial da Monvela, montado em SVG.
 *
 * Cabeça = círculo laranja liso (sem rosto). Tronco, braços e pernas = linhas
 * laranjas com pontas arredondadas (sem mãos, sem pés, sem círculos nas pontas).
 * Cada membro é um `<line data-im="...">` independente: `mountain-scene.tsx`
 * localiza pelo `data-im` e reescreve os pontos a cada quadro, animando a
 * escalada e a queda membro a membro.
 *
 * Ordem de pintura: pernas atrás, depois tronco, braços e a cabeça por cima.
 */
export function MonvelaMascot({ initial }: { initial: Frame }) {
  const m = initial.mascot;
  const seg = (s: Seg2) => ({ x1: s.x1, y1: s.y1, x2: s.x2, y2: s.y2 });

  return (
    <g
      className="im-mascot"
      aria-hidden="true"
      transform={`translate(${m.rootX} ${m.rootY}) rotate(${m.rootRot}) scale(${m.rootScale})`}
    >
      <line className="im-limb im-leg" data-im="legLU" {...seg(m.legLU)} />
      <line className="im-limb im-leg" data-im="legLF" {...seg(m.legLF)} />
      <line className="im-limb im-leg" data-im="legRU" {...seg(m.legRU)} />
      <line className="im-limb im-leg" data-im="legRF" {...seg(m.legRF)} />
      <line className="im-torso" data-im="torso" {...seg(m.torso)} />
      <line className="im-limb im-arm" data-im="armLU" {...seg(m.armLU)} />
      <line className="im-limb im-arm" data-im="armLF" {...seg(m.armLF)} />
      <line className="im-limb im-arm" data-im="armRU" {...seg(m.armRU)} />
      <line className="im-limb im-arm" data-im="armRF" {...seg(m.armRF)} />
      <circle
        className="im-head"
        data-im="head"
        cx={m.head.cx}
        cy={m.head.cy}
        r={m.head.r}
      />
    </g>
  );
}
