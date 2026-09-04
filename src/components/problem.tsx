import { siteConfig } from "@/content/site";

export function Problem() {
  const { problem } = siteConfig;

  return (
    <section className="section light-section problem" aria-labelledby="problem-title">
      <div className="shell editorial-grid">
        <p className="eyebrow">{problem.eyebrow}</p>
        <div>
          <h2 id="problem-title">{problem.title}</h2>
          <p className="problem-intro">{problem.intro}</p>
          <ul className="consequences">
            {problem.consequences.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
