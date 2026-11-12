import { useScramble } from '../hooks/useScramble'

const DECODE_MS = 320

export type BitButtonVariant = 'primary' | 'secondary' | 'outline'

interface BitButtonProps {
  href: string
  label: string
  /** primary: terracota con relleno crema · secondary: línea con relleno terracota ·
   *  outline: como secondary pero con borde terracota en reposo. */
  variant?: BitButtonVariant
  arrow?: boolean
  className?: string
}

/** Enlace con aspecto de botón: el texto se decodifica desde bits en hover y foco. */
export function BitButton({
  href,
  label,
  variant = 'primary',
  arrow = false,
  className,
}: BitButtonProps) {
  const { display, run } = useScramble(label, { duration: DECODE_MS })
  const classes = ['ta-btn', `ta-btn--${variant}`, className].filter(Boolean).join(' ')

  return (
    <a
      href={href}
      className={classes}
      aria-label={label}
      onPointerEnter={() => run()}
      onFocus={() => run()}
    >
      <span className="ta-btn__fill" aria-hidden="true" />
      <span className="ta-btn__text" aria-hidden="true">
        {display}
      </span>
      {arrow && (
        <span className="ta-btn__arrow" aria-hidden="true">
          →
        </span>
      )}
    </a>
  )
}
