import { BitButton } from '../components/BitButton'
import { LoopVideo } from '../components/LoopVideo'
import { projects } from '../content'
import { SectionHeading } from './SectionHeading'

export function Projects() {
  const { featured } = projects

  return (
    <section
      id={projects.id}
      className="ta-section ta-projects ta-block"
      aria-labelledby="proyectos-title"
    >
      <SectionHeading
        id="proyectos-title"
        index={projects.index}
        name={projects.id}
        title={projects.title}
      />

      <article className="ta-project" aria-labelledby="proyecto-01-title">
        <div className="ta-project__art">
          <LoopVideo className="ta-project__video" src={featured.video} label={featured.videoLabel} />
        </div>

        <div className="ta-project__info">
          <p className="ta-label ta-project__meta">{featured.meta}</p>
          <h3 id="proyecto-01-title" className="ta-project__name">
            {featured.name}
          </h3>
          <p className="ta-project__description">{featured.description}</p>
          <dl className="ta-project__facts">
            {featured.facts.map((fact) => (
              <div key={fact.key}>
                <dt>{fact.key}</dt>
                <dd>
                  <span aria-hidden="true">= </span>
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
          <BitButton variant="primary" href={featured.cta.href} label={featured.cta.label} arrow />
        </div>
      </article>
    </section>
  )
}
