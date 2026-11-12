import { BitButton } from '../components/BitButton'
import { GlitchTitle } from '../components/GlitchTitle'
import { LoopVideo } from '../components/LoopVideo'
import { hero, media } from '../content'

export function Hero() {
  return (
    <section id={hero.id} className="ta-hero ta-block" aria-labelledby="inicio-title">
      <div className="ta-hero__copy">
        <div className="ta-hero__intro">
          <p className="ta-kicker">{hero.kicker}</p>
          <GlitchTitle id="inicio-title" text={hero.title} label={hero.titleLabel} />
          <p className="ta-hero__slogan">
            {hero.slogan}
            <span className="ta-dot">.</span>
          </p>
          <p className="ta-hero__description">{hero.description}</p>
          <div className="ta-hero__actions">
            <BitButton variant="primary" href={hero.primary.href} label={hero.primary.label} arrow />
            <BitButton variant="secondary" href={hero.secondary.href} label={hero.secondary.label} />
          </div>
        </div>

        <ul className="ta-hero__services">
          {hero.services.map((service) => (
            <li key={service.index}>
              <span className="ta-hero__service-name">
                {service.index} / {service.name}
              </span>
              <span className="ta-hero__service-sep" aria-hidden="true">
                {' '}—{' '}
              </span>
              <span className="ta-hero__service-text">{service.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <figure className="ta-hero__figure">
        <LoopVideo
          className="ta-hero__video"
          src={media.hero}
          poster={media.heroPoster}
          label={hero.figure.videoLabel}
        />
        <figcaption className="ta-label ta-hero__caption">{hero.figure.caption}</figcaption>
        <p className="ta-label ta-hero__coords" aria-hidden="true">
          {hero.figure.coords}
        </p>
      </figure>
    </section>
  )
}
