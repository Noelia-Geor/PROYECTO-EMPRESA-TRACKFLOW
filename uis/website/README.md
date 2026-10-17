# TrackFlow · Corporate website

TrackFlow's public website introduces its last-mile logistics and warehouse services, how an order moves through the operation, its locations in Los Angeles and Zaragoza, and an application form for brands.

## Public URL (Codespaces)

- Landing: https://trackflow-69jqg6xww4grcrpr4-4173.app.github.dev/
- Form: https://trackflow-69jqg6xww4grcrpr4-4173.app.github.dev/application.html

It only responds while the Codespace is running with `npm run preview` on port 4173 set to public. GitHub shows a warning page the first time a public port is opened ("Continue"). The Codespaces tunnel adds `X-Robots-Tag: noindex`, so Lighthouse loses SEO points there; locally SEO scores 100.

## Milestone pages and files

| File | What it is |
| --- | --- |
| `index.html` | Semantic HTML5 landing page: header with navigation, hero, figures, value proposition, services, order journey, locations, call to action and footer with contact. Includes Schema.org `Organization` JSON-LD. |
| `application.html` | Application form with `fieldset`/`legend`, associated `label`s, suitable input types, `required`, **Send** and **Clear** buttons. |
| `validation.js` | Dependency-free real-time validation: field-specific errors, focused error summary, blocked submission and a **simulated** success message (there is no backend: no data is sent or stored). |
| `validation.test.js` | Tests for the validation rules with `node --test`. |

## Architecture

- **Multi-page Vite** (`vite.config.ts`): `index.html` and `application.html` are build entries.
- **Static HTML + React islands.** Content lives in the HTML; React only mounts two islands when they approach the viewport (`src/main.ts`):
  - `src/islands/journey.tsx` → scroll-driven order journey (`src/components/journey/`).
  - `src/islands/map.tsx` → Los Angeles → Zaragoza map (`RouteMap`).
- **Journey**: isometric SVG world (`scenery.ts`, `World.tsx`), a pure timeline `t ∈ [0, 12)` (`timeline.ts`) and a single `requestAnimationFrame` loop that writes attributes without re-rendering React. 12 scenes with a continuous camera and subtle 3D tilt on desktop; 6 chapters with cuts on phones and portrait tablets; a static storyboard with `prefers-reduced-motion`, in lite mode (data saver or low-end device) or via the "Versión estática" button. Without JavaScript, the HTML list of scenes is shown.
- Scene copy comes from the HTML (with its `CONTEXT.md` citation). Scenes depict the current operation: paper picking lists and carrier assignment by the coordination team; no real-time tracking.

## SEO and domain

`CONTEXT.md` gives no domain. `vite-plugins/seo.ts` only emits `canonical`, `og:url`, `og:image`, `sitemap.xml`, the `Sitemap:` line in `robots.txt` and the JSON-LD `url`/`logo` when a public **https** URL is available:

- `SITE_URL=https://… npm run build`, or
- inside a Codespace, it is derived from `CODESPACE_NAME` for `vite preview`'s port 4173.

Without a valid URL those fields are omitted and `robots.txt` ships without a sitemap.

## Stack

- Vite, React and TypeScript
- Tailwind CSS 4 with `@tailwindcss/vite`
- `lucide` icons copied as inline SVG (ISC license); `lucide-react` stays installed for the older components
- npm

## Photograph

Warehouse photo from [Unsplash](https://unsplash.com/license), downloaded to `src/assets/almacen.jpg` under the Unsplash License (free to use, attribution not required). Author not verified; original image: `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d`. The responsive variants were generated from the same photo's 3840 × 2560 px original: `almacen-640/1024/1600/2400/3200` in AVIF and WebP, plus `almacen-1600.jpg` as a fallback. With `sizes="100vw"`, a 1440 px screen picks 1600 px at 1× and 3200 px on 2× retina, never upscaling.

## Run

From `uis/website`:

```bash
npm install
npm run dev
```

Lint, test and create a production build with:

```bash
npm run lint
npm test
npm run build
npm run preview   # serves dist/ on port 4173 (with --host, for the Codespace)
```

In the Codespace, set port 4173 to **public** in the *Ports* tab to get the public URL.
