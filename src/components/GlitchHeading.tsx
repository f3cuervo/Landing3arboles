import { useEffect, useRef, useState, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const TICK_EVERY_MS = 20_000
const TICK_MS = 200

interface GlitchHeadingProps {
  id: string
  className?: string
  children: ReactNode
}

/** h2 con un glitch sutil cada 20 s, solo mientras está visible. El texto real no muta. */
export function GlitchHeading({ id, className, children }: GlitchHeadingProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLHeadingElement>(null)
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (reduced || !el) return

    let visible = false
    let off: number | undefined
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    observer.observe(el)

    const ticker = window.setInterval(() => {
      if (!visible) return
      setGlitching(true)
      off = window.setTimeout(() => setGlitching(false), TICK_MS)
    }, TICK_EVERY_MS)

    return () => {
      observer.disconnect()
      window.clearInterval(ticker)
      window.clearTimeout(off)
      setGlitching(false)
    }
  }, [reduced])

  const classes = ['ta-glitch', 'ta-glitch--subtle', glitching && 'is-glitching', className]
    .filter(Boolean)
    .join(' ')

  return (
    <h2 ref={ref} id={id} className={classes}>
      <span className="ta-glitch__text">{children}</span>
      {!reduced && (
        <>
          <span className="ta-glitch__layer ta-glitch__layer--a" aria-hidden="true">
            {children}
          </span>
          <span className="ta-glitch__layer ta-glitch__layer--b" aria-hidden="true">
            {children}
          </span>
        </>
      )}
    </h2>
  )
}
