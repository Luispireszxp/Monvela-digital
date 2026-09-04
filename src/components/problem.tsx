import { siteConfig } from "@/content/site";
import {
  BridgeIllustration,
  CityIllustration,
  FunnelIllustration,
  RadarIllustration,
} from "./problem-story/illustrations";
import { ProblemReveal } from "./problem-story/problem-reveal";
import styles from "./problem-story/problem-story.module.css";

export function Problem() {
  const { problem } = siteConfig;

  return (
    <section
      id="em-jogo"
      className={`${styles.section} light-section problem`}
      aria-labelledby="problem-title"
    >
      <ProblemReveal className={styles.motionRoot}>
        <div className={`shell ${styles.opening}`} data-problem-step>
          <div className={styles.openingCopy}>
            <p className={`eyebrow ${styles.eyebrow}`}>{problem.eyebrow}</p>
            <h2 id="problem-title" className={styles.title}>
              {problem.title}
            </h2>
            <p className={styles.intro}>{problem.intro}</p>
          </div>
          <div className={styles.openingVisual}>
            <CityIllustration className={styles.illustration} />
          </div>
        </div>

        <ol className={styles.story}>
          {problem.consequences.map((item, index) => {
            const Illustration = [
              RadarIllustration,
              BridgeIllustration,
              FunnelIllustration,
            ][index];

            return (
              <li
                id={`em-jogo-${String(index + 1).padStart(2, "0")}`}
                className={`${styles.chapter}${index === 1 ? ` ${styles.chapterReverse}` : ""}`}
                data-problem-step
                key={item.title}
              >
                <div className={`shell ${styles.chapterInner}`}>
                  <div className={styles.chapterCopy}>
                    <span className={styles.progress} aria-hidden="true">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </div>
                  <div className={styles.chapterVisual}>
                    <Illustration className={styles.illustration} />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div id="em-jogo-transicao" className={styles.transition} data-problem-step>
          <div className={styles.transitionCurve} aria-hidden="true" />
          <div className={styles.transitionOutCurve} aria-hidden="true" />
          <div className={styles.fallingDots} aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className={`shell ${styles.transitionInner}`}>
            <p>A solução Monvela</p>
          </div>
        </div>
      </ProblemReveal>
    </section>
  );
}
