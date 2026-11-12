import { BitButton } from '../components/BitButton'
import { BitLink } from '../components/BitLink'
import { brand, hero, nav } from '../content'

export function SiteHeader() {
  return (
    <header className="ta-header ta-block">
      <a href={`#${hero.id}`} className="ta-header__brand">
        <span className="ta-header__mark">{brand.mark}</span>
        <span className="ta-header__name">{brand.name}</span>
      </a>

      <nav className="ta-header__nav" aria-label={nav.label}>
        <ul>
          {nav.links.map((link) => (
            <li key={link.href}>
              <BitLink variant="nav" href={link.href} index={link.index} label={link.label} />
            </li>
          ))}
        </ul>
      </nav>

      <BitButton
        className="ta-header__cta"
        variant="outline"
        href={nav.cta.href}
        label={nav.cta.label}
      />
    </header>
  )
}
