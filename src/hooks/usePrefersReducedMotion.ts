import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function getMediaQuery(): MediaQueryList | null {
  return typeof window !== 'undefined' && 'matchMedia' in window
    ? window.matchMedia(QUERY)
    : null
}

function subscribe(onChange: () => void) {
  const mql = getMediaQuery()
  mql?.addEventListener('change', onChange)
  return () => mql?.removeEventListener('change', onChange)
}

const getSnapshot = () => getMediaQuery()?.matches ?? false
const getServerSnapshot = () => false

/** `true` si el usuario pide reducir el movimiento. Reacciona a cambios en caliente. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
