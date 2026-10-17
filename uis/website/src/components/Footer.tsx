import { siteContent } from '../content/site'

export function Footer() {
  const { brand, footer, accessibility } = siteContent

  return (
    <footer className="px-5 py-8 text-white sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <a
          href="#inicio"
          className="w-fit font-display text-xl leading-none font-extrabold"
          aria-label={accessibility.homeLink}
        >
          <span className="mr-2 inline-block h-2.5 w-2.5 rounded-[2px] bg-senal" aria-hidden="true" />
          <span className="text-crema">{brand.first}{brand.second}</span>
        </a>
        <p className="flex items-center gap-3 font-mono text-xs text-niebla">
          <span className="h-2 w-2 rounded-full bg-senal" aria-hidden="true" />
          {footer.locations}
          <span className="h-2 w-2 rounded-full border border-senal" aria-hidden="true" />
        </p>
        <p className="font-mono text-xs text-niebla">{footer.copyright}</p>
      </div>
    </footer>
  )
}
