import { LoopVideo } from '../components/LoopVideo'
import { about } from '../content'
import { SectionHeading } from './SectionHeading'

/** Desfases (s) de las copias del video de cabecera: 3 × 420px cubren hasta 1260px. */
const TILE_OFFSETS = [0, 2, 4] as const

export function About() {
  return (
    <section id={about.id} className="ta-section ta-about ta-block" aria-labelledby="nosotros-title">
      <div className="ta-about__intro">
        <SectionHeading id="nosotros-title" index={about.index} name={about.id} title={about.title} />
        <p className="ta-section__body">{about.body}</p>
      </div>

      <ul className="ta-about__cards">
        {about.cards.map((card) => (
          <li key={card.index} className="ta-card">
            {/* El video se encoge a la altura de la banda y se repite en horizontal,
                desfasado, para cubrir el ancho sin recortarlo ni deformarlo. */}
            <div className="ta-card__media" aria-hidden="true">
              {TILE_OFFSETS.map((startAt) => (
                <LoopVideo key={startAt} className="ta-card__video" src={card.video} startAt={startAt} />
              ))}
            </div>
            <div className="ta-card__body">
              <p className="ta-card__index">
                {card.index} / {card.tag}
              </p>
              <h3>{card.title}</h3>
              <p className="ta-card__text">{card.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
