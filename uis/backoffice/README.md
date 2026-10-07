# TrackFlow · Backoffice

TrackFlow's internal administration app. It brings together the modules for each company area in a single panel. The Home page shows the seven areas, their leads and one key figure for each, taken from [CONTEXT.md](../../CONTEXT.md).

The interface is written in Spanish, the project's base language.

## Stack

- Vite
- React and TypeScript
- Tailwind CSS 4 with `@tailwindcss/vite`, using the same visual identity tokens as the public website
- Hash-based navigation (`#/`), no routing library
- npm

## Run

From `uis/backoffice`:

```bash
npm install
npm run dev
```

To validate or build for production:

```bash
npm run lint
npm run build
```

## Structure

- `src/components/Layout.tsx`: sidebar menu and main area.
- `src/navigation.ts`: menu entries and their page.
- `src/pages/`: one page per module.
- `src/data/`: business data, each item with a comment citing its `CONTEXT.md` section.

## Adding a module

Area modules are added with the [`.agents/skills/modulo-backoffice`](../../.agents/skills/modulo-backoffice/SKILL.md) skill. Each module contributes its data file, its page and one line in `src/navigation.ts`.

> _Esta documentación también está disponible en [español](./README.es.md)._
