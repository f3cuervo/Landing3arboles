import { footer } from '../content'

export function SiteFooter() {
  return (
    <footer className="ta-footer">
      <div className="ta-footer__bits" aria-hidden="true">
        {footer.bits.map((line) => (
          <p key={line.label} className="ta-footer__bitline">
            <span className="ta-footer__bitlabel">{line.label}</span>
            <span className="ta-bits ta-footer__bitstream" data-bits={line.bits} />
          </p>
        ))}
      </div>
      <div className="ta-footer__meta">
        <p className="ta-footer__name">{footer.name}</p>
        <p className="ta-footer__note">{footer.note}</p>
      </div>
    </footer>
  )
}
