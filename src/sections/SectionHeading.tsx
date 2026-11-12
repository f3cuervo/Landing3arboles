import { GlitchHeading } from '../components/GlitchHeading'

interface SectionHeadingProps {
  id: string
  index: string
  /** Nombre de la sección junto al índice binario (p. ej. "nosotros"). */
  name: string
  title: string
}

/** Etiqueta binaria + h2 con punto final terracota y glitch sutil periódico. */
export function SectionHeading({ id, index, name, title }: SectionHeadingProps) {
  return (
    <div className="ta-section__heading">
      <p className="ta-section__index">
        <span className="ta-section__number">{index}</span> {name}
      </p>
      <GlitchHeading id={id}>
        {title}
        <span className="ta-dot">.</span>
      </GlitchHeading>
    </div>
  )
}
