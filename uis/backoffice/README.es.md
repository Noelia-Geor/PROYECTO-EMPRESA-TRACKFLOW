# TrackFlow · Backoffice

Aplicación interna de administración de TrackFlow. Reúne en un solo panel los módulos de cada área de la empresa. La página de Inicio muestra las siete áreas, sus responsables y una cifra clave de cada una, tomadas de [CONTEXT.md](../../CONTEXT.md).

## Stack

- Vite
- React y TypeScript
- Tailwind CSS 4 con `@tailwindcss/vite`, con los mismos tokens de identidad visual que la web pública
- Navegación por hash (`#/`), sin librerías de rutas
- npm

## Ejecutar

Desde `uis/backoffice`:

```bash
npm install
npm run dev
```

Para validar o generar la versión de producción:

```bash
npm run lint
npm run build
```

## Estructura

- `src/components/Layout.tsx`: menú lateral y zona principal.
- `src/navigation.ts`: entradas del menú y su página.
- `src/pages/`: una página por módulo.
- `src/data/`: datos de negocio, cada uno con un comentario que cita su sección de `CONTEXT.md`.

## Añadir un módulo

Los módulos de área se añaden con la skill [`.agents/skills/modulo-backoffice`](../../.agents/skills/modulo-backoffice/SKILL.md). Cada módulo aporta su archivo de datos, su página y una línea en `src/navigation.ts`.

> _This documentation is also available in [English](./README.md)._
