import { siteConfig } from "@/content/site";
import { MountainScene } from "./mountain-scene";

/**
 * "Montanha da internet" — cena controlada pela rolagem entre a jornada do
 * cliente e a solução Monvela.
 *
 * O mascote escala uma montanha de linhas topográficas, finca a bandeira no
 * topo e fica de pé ao lado dela, aliviado. Mistura tecnologia e superação —
 * sem cara, mãos ou pés: a personalidade vem só das poses.
 *
 * O componente-cliente (`MountainScene`) faz o scrub; aqui fica só a casca da
 * seção, o título e a descrição acessível.
 */
export function InternetMountain() {
  const { internetMountain: c } = siteConfig;

  return (
    <section
      id="escalada"
      className="section dark-section internet-mountain"
      aria-labelledby="internet-mountain-title"
    >
      <div className="shell im-head-wrap">
        <p className="eyebrow">{c.eyebrow}</p>
        <h2 id="internet-mountain-title" className="im-heading">
          {c.title}
        </h2>
      </div>

      <MountainScene a11y={c.a11y} />

      <noscript>
        <style>{`.internet-mountain .im-track{height:auto}.internet-mountain .im-stage{position:static;height:auto;min-height:0;padding-block:clamp(3rem,8vw,6rem)}.internet-mountain .im-track::after{display:none}`}</style>
      </noscript>
    </section>
  );
}
