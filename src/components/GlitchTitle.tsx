import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useScramble } from '../hooks/useScramble'

const DECODE_MS = 1100
const ENTRY_TAIL_MS = 450
const TICK_EVERY_MS = 7000
const TICK_MS = 260

interface GlitchTitleProps {
  id?: string
  /** Texto visible; admite `\n` para saltos de línea. */
  text: string
  /** Texto real que anuncia el lector de pantalla. */
  label: string
}

/** h1 que se decodifica desde bits al montar y repite un glitch breve cada 7 s. */
export function GlitchTitle({ id, text, label }: GlitchTitleProps) {
  const reduced = usePrefersReducedMotion()
  const { display, run } = useScramble(text, { duration: DECODE_MS })
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    if (reduced) return

    const timeouts = new Set<number>()
    const glitch = (ms: number) => {
      setGlitching(true)
      const id = window.setTimeout(() => {
        timeouts.delete(id)
        setGlitching(false)
      }, ms)
      timeouts.add(id)
    }

    const entry = requestAnimationFrame(() => {
      run()
      glitch(DECODE_MS + ENTRY_TAIL_MS)
    })
    const ticker = window.setInterval(() => glitch(TICK_MS), TICK_EVERY_MS)

    return () => {
      cancelAnimationFrame(entry)
      window.clearInterval(ticker)
      timeouts.forEach((id) => window.clearTimeout(id))
      setGlitching(false)
    }
  }, [reduced, run])

  return (
    <h1 id={id} className={`ta-glitch${glitching ? ' is-glitching' : ''}`} aria-label={label}>
      <span className="ta-glitch__text" aria-hidden="true">
        {display}
      </span>
      {!reduced && (
        <>
          <span className="ta-glitch__layer ta-glitch__layer--a" aria-hidden="true">
            {display}
          </span>
          <span className="ta-glitch__layer ta-glitch__layer--b" aria-hidden="true">
            {display}
          </span>
        </>
      )}
    </h1>
  )
}
