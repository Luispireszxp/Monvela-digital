const STEPS = [
  { n: "01", label: "Pesquisa", text: "Encontre opções que combinam com você." },
  { n: "02", label: "Compara", text: "Compare detalhes e escolha com confiança." },
  { n: "03", label: "Decide", text: "Fale direto com quem pode atender." },
] as const;

/**
 * As três etapas. O estado (inativa / ativa / concluída) é dado por CSS no
 * tempo certo da encenação — mas nunca só pela cor: a etapa ativa ganha a seta
 * e a concluída ganha um "✓", então o estado continua legível em tons de cinza
 * e para quem não distingue laranja.
 */
export function JourneySteps() {
  return (
    <ol className="cj-steps">
      {STEPS.map((step, i) => (
        <li
          className="cj-step"
          key={step.n}
          style={{ "--cj-step-order": i + 1 } as React.CSSProperties}
        >
          <span className="cj-step-n">{step.n}</span>
          <span className="cj-step-rule" aria-hidden="true" />
          <span className="cj-step-body">
            <span className="cj-step-head">
              <span className="cj-step-label">{step.label}</span>
              <span className="cj-step-mark" aria-hidden="true">
                <span className="cj-step-arrow">→</span>
                <span className="cj-step-check">✓</span>
              </span>
            </span>
            <span className="cj-step-text">{step.text}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
