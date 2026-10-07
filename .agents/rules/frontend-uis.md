---
description: Define estructura, stack, diseño accesible y validaciones para las interfaces de TrackFlow.
globs: ["uis/**"]
alwaysApply: false
---

# Aplicaciones frontend de `uis/`

## Alcance

Aplica a `uis/website` y `uis/backoffice` y a cualquier cambio en sus archivos.

## Justificación

El README de `uis/` asigna `website` a la presencia pública y `backoffice` a la administración interna; el README raíz indica que las interfaces pertenecen a `uis/`. Fuente: [uis/README.es.md](../../uis/README.es.md) y [README.es.md](../../README.es.md). Las decisiones de stack e identidad visual de este hito se documentan en [memory-bank/techContext.md](../../memory-bank/techContext.md).

## Reglas concretas

- `uis/website` y `uis/backoffice` son aplicaciones independientes. Cada una tiene su propio `package.json`, layout y punto de entrada; no compartas entre ellas un layout de aplicación.
- Usa Vite, React, TypeScript y Tailwind CSS. Gestiona dependencias y scripts con npm.
- Coloca los componentes reutilizables de cada app en su `src/components/`.
- Define colores y tipografía como tokens de identidad visual y documenta sus decisiones en `memory-bank/techContext.md`.
- Mantén accesibilidad básica: HTML semántico, texto alternativo en imágenes, contraste suficiente y foco visible.
- Antes del commit, ejecuta `npm run lint` y `npm run build` dentro de cada aplicación modificada; ambos deben pasar sin errores.

## Cómo comprobarlo

- Comprueba que cada app tiene `package.json`, layout y punto de entrada propios, sin importar el layout de la otra.
- Revisa que los componentes reutilizables estén en `src/components/` y que colores y tipografía usen tokens documentados.
- Comprueba semántica, textos alternativos, contraste y foco visible en las vistas modificadas.
- Ejecuta `npm run lint` y `npm run build` en cada app modificada.
