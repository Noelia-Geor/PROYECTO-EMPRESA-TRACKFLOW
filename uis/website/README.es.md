# TrackFlow · Web corporativa

Sitio web público de TrackFlow, empresa de logística de última milla y gestión de almacenes. Presenta sus servicios, el recorrido de un pedido por la operación, sus ubicaciones en Los Ángeles y Zaragoza y un formulario de solicitud para marcas.

## Páginas y archivos del hito

| Archivo | Qué es |
| --- | --- |
| `index.html` | Landing en HTML5 semántico: cabecera con navegación, hero, cifras, propuesta, servicios, recorrido, ubicaciones, llamada a la acción y pie con contacto. Incluye Schema.org `Organization` en JSON-LD. |
| `application.html` | Formulario de solicitud con `fieldset`/`legend`, `label` asociados, tipos de campo adecuados, `required`, botones **Enviar** y **Limpiar**. |
| `validation.js` | Validación en tiempo real sin dependencias: errores específicos por campo, resumen de errores con foco, bloqueo del envío y mensaje de éxito **simulado** (no hay backend: no se envía ni se guarda ningún dato). |
| `validation.test.js` | Pruebas de las reglas de validación con `node --test`. |

## Arquitectura

- **Vite multipágina** (`vite.config.ts`): `index.html` y `application.html` son entradas del build.
- **HTML estático + islas React.** El contenido está en el HTML; React solo monta dos islas cuando se acercan a la pantalla (`src/main.ts`):
  - `src/islands/journey.tsx` → recorrido guiado por el scroll (`src/components/journey/`).
  - `src/islands/map.tsx` → mapa Los Ángeles → Zaragoza (`RouteMap`).
- **Recorrido**: mundo isométrico en SVG (`scenery.ts`, `World.tsx`), línea de tiempo pura `t ∈ [0, 12)` (`timeline.ts`) y un único bucle `requestAnimationFrame` que escribe atributos sin volver a renderizar React. 12 escenas con cámara continua e inclinación 3D sutil en escritorio; 6 capítulos con cortes en móvil y tablet vertical; guion gráfico estático con `prefers-reduced-motion`, en modo ligero (ahorro de datos o equipo modesto) o con el botón «Versión estática». Sin JavaScript se ve la lista de escenas del HTML.
- Los textos de las escenas salen del HTML (con su cita de `CONTEXT.md`). Las escenas representan la operación actual: picking con lista en papel y asignación del transportista por el equipo de coordinación; sin seguimiento en tiempo real.

## SEO y dominio

`CONTEXT.md` no da dominio. `vite-plugins/seo.ts` solo genera `canonical`, `og:url`, `og:image`, `sitemap.xml`, la línea `Sitemap:` de `robots.txt` y `url`/`logo` del JSON-LD si hay una URL pública **https**:

- `SITE_URL=https://… npm run build`, o
- dentro de un Codespace, se deduce de `CODESPACE_NAME` para el puerto 4173 de `vite preview`.

Sin URL válida esos campos se omiten y `robots.txt` se publica sin sitemap.

## Stack

- Vite, React y TypeScript
- Tailwind CSS 4 con `@tailwindcss/vite`
- Iconos de `lucide` copiados como SVG en línea (licencia ISC); `lucide-react` sigue instalado para los componentes antiguos
- npm

## Fotografía

Foto de almacén de [Unsplash](https://unsplash.com/license), descargada en `src/assets/almacen.jpg` bajo la licencia de Unsplash (uso libre, la atribución no es obligatoria). Autor no verificado; imagen original: `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d`. Las variantes responsive se generaron a partir del original de la misma foto a 3840 × 2560 px: `almacen-640/1024/1600/2400/3200` en AVIF y WebP, más `almacen-1600.jpg` como respaldo. Con `sizes="100vw"`, una pantalla de 1440 px elige 1600 px en densidad 1× y 3200 px en retina 2×, sin escalar hacia arriba.

## Ejecutar

Desde `uis/website`:

```bash
npm install
npm run dev
```

Validar, probar y generar la versión de producción:

```bash
npm run lint
npm test
npm run build
npm run preview   # sirve dist/ en el puerto 4173 (con --host, para el Codespace)
```

En el Codespace, pon el puerto 4173 como **público** en la pestaña *Ports* para obtener la URL pública.
