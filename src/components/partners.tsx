import Image from "next/image";
import { company } from "@/config/company";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "./section-heading";

/**
 * Parceiros / clientes.
 *
 * Só é renderizada quando `company.partners` tiver ao menos um item — nada de
 * seção vazia ou logo fictício. Para adicionar parceiros, edite
 * `src/config/company.ts` (instruções no próprio arquivo).
 */
export function Partners() {
  if (!company.hasPartners) return null;

  return (
    <section id="parceiros" className="section light-section partners" aria-labelledby="partners-title">
      <div className="shell">
        <SectionHeading
          id="partners-title"
          light
          eyebrow={siteConfig.partnersSection.eyebrow}
          title={siteConfig.partnersSection.title}
          description={siteConfig.partnersSection.description}
        />
        <ul className="partner-list">
          {company.partners.map((partner) => (
            <li key={partner.name}>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir o site de ${partner.name}`}
                title={partner.description}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={64}
                  className="partner-logo"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
