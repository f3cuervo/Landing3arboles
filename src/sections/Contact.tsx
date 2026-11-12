import { BitLink } from '../components/BitLink'
import { GlitchHeading } from '../components/GlitchHeading'
import { contact } from '../content'

export function Contact() {
  return (
    <section id={contact.id} className="ta-section ta-contact ta-block" aria-labelledby="contacto-title">
      <div className="ta-contact__intro">
        <p className="ta-section__index">
          <span className="ta-section__number">{contact.index}</span> {contact.id}
        </p>
        <GlitchHeading id="contacto-title" className="ta-contact__title">
          {contact.title}
          <span className="ta-dot">.</span>
        </GlitchHeading>
        <p className="ta-section__body">{contact.lead}</p>
      </div>

      <ul className="ta-contact__links">
        {contact.links.map((link) => (
          <li key={link.network}>
            <BitLink
              variant="row"
              href={link.url ?? contact.pendingHref}
              external={link.url !== null}
              index={link.index}
              label={link.network}
              value={link.value}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
