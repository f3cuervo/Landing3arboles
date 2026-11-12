import { useCallback, useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/** Duración de cada cuadro discreto de la decodificación (ms). */
const FRAME_MS = 30

/** Solo letras y dígitos se convierten en bits; espacios, saltos y signos quedan en su sitio. */
const SCRAMBLABLE = /[\p{L}\p{N}]/u

function scramble(text: string, revealed: number): string {
  let out = ''
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    out += i < revealed || !SCRAMBLABLE.test(ch) ? ch : Math.random() < 0.5 ? '0' : '1'
  }
  return out
}

interface ScrambleOptions {
  /** Duración total de la decodificación en ms. */
  duration: number
}

/**
 * Decodifica `text` de izquierda a derecha partiendo de bits aleatorios.
 * `run()` (re)inicia la animación. Con movimiento reducido devuelve siempre el texto real.
 */
export function useScramble(text: string, { duration }: ScrambleOptions) {
  const reduced = usePrefersReducedMotion()
  const [frame, setFrame] = useState<string | null>(null)
  const raf = useRef(0)

  const stop = useCallback(() => {
    cancelAnimationFrame(raf.current)
    raf.current = 0
  }, [])

  const run = useCallback(() => {
    if (reduced) return
    stop()
    const start = performance.now()
    let lastFrame = -1

    const tick = (now: number) => {
      const elapsed = now - start
      if (elapsed >= duration) {
        raf.current = 0
        setFrame(null)
        return
      }
      const index = Math.floor(elapsed / FRAME_MS)
      if (index !== lastFrame) {
        lastFrame = index
        setFrame(scramble(text, Math.floor((elapsed / duration) * text.length)))
      }
      raf.current = requestAnimationFrame(tick)
    }

    setFrame(scramble(text, 0))
    raf.current = requestAnimationFrame(tick)
  }, [duration, reduced, stop, text])

  useEffect(() => stop, [stop])

  // Si se activa "reducir movimiento" a mitad de animación, el texto real se muestra
  // en el acto; el bucle en curso termina solo (≤ duration) y deja `frame` en null.
  return { display: reduced || frame === null ? text : frame, run }
}
