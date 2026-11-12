import type { CSSProperties } from 'react'
import { BIT_LINE } from '../content'
import { useScramble } from '../hooks/useScramble'

interface BitLinkBaseProps {
  href: string
  index: string
  external?: boolean
  className?: string
}

interface NavLinkProps extends BitLinkBaseProps {
  variant: 'nav'
  label: string
}

interface RowLinkProps extends BitLinkBaseProps {
  variant: 'row'
  /** Nombre de la red (columna izquierda). */
  label: string
  /** URL o usuario visible (columna central). */
  value: string
}

type BitLinkProps = NavLinkProps | RowLinkProps

const DECODE_MS = 320

/** Traducción real a binario: un byte UTF-8 (8 bits) por carácter, separados por espacio. */
function toBinary(text: string) {
  return Array.from(new TextEncoder().encode(text), (byte) => byte.toString(2).padStart(8, '0'))
}

/** Enlace del menú o fila de contacto: índice terracota, línea de bits y flecha en hover/foco.
 *  La etiqueta se decodifica desde bits en terracota. En las filas, la línea de bits
 *  es la palabra traducida a binario, revelada byte a byte. */
export function BitLink(props: BitLinkProps) {
  const { href, index, external = false, className } = props
  const { display, run } = useScramble(props.label, { duration: DECODE_MS })
  const classes = ['ta-link', `ta-link--${props.variant}`, className].filter(Boolean).join(' ')
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  const scrambleProps = { onPointerEnter: () => run(), onFocus: () => run() }

  if (props.variant === 'nav') {
    return (
      <a href={href} className={classes} aria-label={`${index} ${props.label}`} {...scrambleProps} {...externalProps}>
        {/* el espacio final hace que el texto visible ("01 nosotros") coincida con el aria-label */}
        <span className="ta-link__index" aria-hidden="true">
          {`${index} `}
        </span>
        <span className="ta-link__label" aria-hidden="true">
          {display}
        </span>
        <span className="ta-bits ta-link__bits" data-bits={BIT_LINE} aria-hidden="true" />
      </a>
    )
  }

  const bytes = toBinary(props.label)

  // Sin aria-label: el nombre accesible es el texto visible (WCAG 2.5.3); la etiqueta
  // animada es aria-hidden y la real va en un span solo para lectores de pantalla.
  return (
    <a href={href} className={classes} {...scrambleProps} {...externalProps}>
      <span className="ta-link__label">
        <span aria-hidden="true">{display}</span>
        <span className="ta-sr-only">{props.label}</span>
      </span>
      <span className="ta-link__value">{props.value}</span>
      <span className="ta-link__index">
        {index}
        <span className="ta-link__arrow" aria-hidden="true">
          →
        </span>
      </span>
      {external && <span className="ta-sr-only"> (se abre en una pestaña nueva)</span>}
      <span
        className="ta-bits ta-link__bits"
        data-bits={bytes.join(' ')}
        style={{ '--ta-bytes': bytes.length } as CSSProperties}
        aria-hidden="true"
      />
    </a>
  )
}
