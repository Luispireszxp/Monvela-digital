import { BrandMark } from "./brand-mark";

/**
 * Lockup da marca: monograma + "MONVELA" + "DIGITAL" entre fios, na mesma
 * composição do logo oficial.
 *
 * - `inline` (padrão): monograma à esquerda do texto — cabeçalho.
 * - `stacked`: monograma acima do texto, centralizado — rodapé e usos de maior
 *   destaque.
 *
 * O texto é HTML de verdade (fonte Geist, caixa alta e entreletra largas), não
 * imagem: fica nítido em qualquer tela e continua legível para leitores de tela.
 */
export function BrandLockup({
  variant = "inline",
  className,
}: {
  variant?: "inline" | "stacked";
  className?: string;
}) {
  return (
    <span className={`brand-lockup brand-lockup-${variant}${className ? ` ${className}` : ""}`}>
      <BrandMark className="brand-lockup-mark" />
      <span className="brand-lockup-text">
        <span className="brand-lockup-name">Monvela</span>
        <span className="brand-lockup-sub">
          <span>Digital</span>
        </span>
      </span>
    </span>
  );
}
