import { LoopVideo } from '../components/LoopVideo'
import { media } from '../content'

/** Franja decorativa de bits a todo el ancho. */
export function BitStrip() {
  return (
    <div className="ta-strip ta-block" aria-hidden="true">
      <LoopVideo className="ta-strip__video" src={media.strip} />
    </div>
  )
}
