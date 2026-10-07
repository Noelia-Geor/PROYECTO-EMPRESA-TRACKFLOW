import { siteContent } from '../content/site'

export function Footer() {
  const { brand, footer, accessibility } = siteContent

  return (
    <footer className="bg-marino px-5 py-8 text-white sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <a
          href="#inicio"
          className="w-fit font-display text-xl leading-none font-extrabold"
          aria-label={accessibility.homeLink}
        >
          <span className="mr-2 inline-block h-2.5 w-2.5 bg-senal" aria-hidden="true" />
          <span className="text-white">{brand.first}{brand.second}</span>
        </a>
        <p className="font-mono text-xs text-white/70">{footer.locations}</p>
        <p className="font-mono text-xs text-white/70">{footer.copyright}</p>
      </div>
    </footer>
  )
}
