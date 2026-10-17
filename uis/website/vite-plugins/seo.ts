import type { Plugin } from 'vite'

// SEO que depende del dominio público. CONTEXT.md no da dominio, así que la URL llega por entorno:
// 1. SITE_URL (por ejemplo, la URL pública del Codespace).
// 2. Si no existe y se construye dentro de un Codespace, se deduce de CODESPACE_NAME + el puerto de `vite preview`.
// Sin URL válida no se emite nada que exija una dirección absoluta: ni canonical, ni og:url, ni sitemap.

const PREVIEW_PORT = 4173

// Páginas públicas que van al sitemap, con su ruta relativa a la raíz.
const PAGES = ['', 'application.html']

export function resolveSiteUrl(env: NodeJS.ProcessEnv): string | null {
  const explicit = env.SITE_URL?.trim()
  const codespace = env.CODESPACE_NAME?.trim()
  const domain = env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN?.trim()
  const candidate = explicit || (codespace && domain ? `https://${codespace}-${PREVIEW_PORT}.${domain}` : '')
  if (!candidate) return null
  try {
    const url = new URL(candidate)
    if (url.protocol !== 'https:') return null
    return url.origin + url.pathname.replace(/\/+$/, '')
  } catch {
    return null
  }
}

function pageUrl(siteUrl: string, filename: string) {
  // index.html se publica en la raíz; el resto, con su nombre de archivo.
  const page = filename.endsWith('index.html') ? '' : filename.split('/').pop()
  return `${siteUrl}/${page ?? ''}`
}

export function seo(): Plugin {
  const siteUrl = resolveSiteUrl(process.env)

  return {
    name: 'trackflow-seo',
    transformIndexHtml: {
      order: 'post',
      handler(html, context) {
        if (!siteUrl) return html.replace('<!--seo:head-->', '')
        const url = pageUrl(siteUrl, context.filename)
        const head = [
          `<link rel="canonical" href="${url}" />`,
          `<meta property="og:url" content="${url}" />`,
          `<meta property="og:image" content="${siteUrl}/og-trackflow.png" />`,
          `<meta name="twitter:image" content="${siteUrl}/og-trackflow.png" />`,
        ].join('\n    ')
        // El JSON-LD de Organization solo gana url y logo cuando hay dominio público.
        const withSchema = html.replace(
          /(<script type="application\/ld\+json" id="schema-organization">)([\s\S]*?)(<\/script>)/,
          (_, open: string, json: string, close: string) => {
            const data = JSON.parse(json) as Record<string, unknown>
            data.url = `${siteUrl}/`
            data.logo = `${siteUrl}/trackflow.svg`
            return `${open}\n${JSON.stringify(data, null, 2)}\n    ${close}`
          },
        )
        return withSchema.replace('<!--seo:head-->', head)
      },
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /']
      if (siteUrl) {
        robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`)
        const urls = PAGES.map((page) => `  <url><loc>${siteUrl}/${page}</loc></url>`).join('\n')
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        })
      }
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots.join('\n')}\n` })
    },
  }
}
