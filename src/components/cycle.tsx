import { siteConfig } from "@/content/site";
import { SectionHeading } from "./section-heading";

export function Cycle() {
  const { cycle } = siteConfig;

  return (
    <section id="ciclo" className="section dark-section cycle" aria-labelledby="cycle-title">
      <div className="shell">
        <SectionHeading
          id="cycle-title"
          eyebrow={cycle.eyebrow}
          title={cycle.title}
        />
        <ol className="cycle-list" aria-label={cycle.accessibleLabel}>
          {cycle.steps.map((step, index) => (
            <li className="cycle-step" key={step.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step.label}</strong>
              <p>{step.text}</p>
              {index < cycle.steps.length - 1 ? (
                <i className="cycle-arrow" aria-hidden="true">
                  →
                </i>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
