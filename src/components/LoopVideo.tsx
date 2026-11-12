import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const mediaUrl = (path: string) => `${import.meta.env.BASE_URL}media/${path}`

interface LoopVideoProps {
  /** Ruta relativa a `public/media/` sin extensión, p. ej. `hero/tres-arboles-loop`. */
  src: string
  /** Ruta relativa a `public/media/` del póster, con extensión. */
  poster?: string
  /** Descripción para lectores de pantalla. Sin ella el video se trata como decorativo. */
  label?: string
  className?: string
  /** Segundo en el que arranca el bucle (para desfasar copias del mismo video). */
  startAt?: number
}

/**
 * Video en bucle, silenciado, que solo se reproduce mientras está en pantalla.
 * Con movimiento reducido se queda detenido en el póster o primer cuadro.
 */
export function LoopVideo({ src, poster, label, className, startAt = 0 }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const video = ref.current
    if (!video || startAt <= 0) return
    const seek = () => {
      video.currentTime = Number.isFinite(video.duration) ? startAt % video.duration : startAt
    }
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      seek()
      return
    }
    video.addEventListener('loadedmetadata', seek, { once: true })
    return () => video.removeEventListener('loadedmetadata', seek)
  }, [startAt])

  useEffect(() => {
    const video = ref.current
    if (!video) return
    // React no siempre refleja el atributo `muted`; el autoplay lo exige.
    video.muted = true

    if (reduced) {
      video.pause()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* autoplay bloqueado: se queda en el póster */
          })
        } else {
          video.pause()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(video)

    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [reduced])

  const base = mediaUrl(src)

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      disablePictureInPicture
      preload="metadata"
      poster={poster ? mediaUrl(poster) : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <source src={`${base}.webm`} type="video/webm" />
      <source src={`${base}.mp4`} type="video/mp4" />
    </video>
  )
}
