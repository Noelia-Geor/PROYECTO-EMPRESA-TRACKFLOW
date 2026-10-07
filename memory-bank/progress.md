# Progreso

## Estado actual

El trabajo se realiza en la rama `feature/agent-memory-bank`.

`memory-bank/`, `AGENTS.md`, las cuatro reglas de `.agents/rules/` y la skill `.agents/skills/modulo-backoffice/` están hechos. La identidad visual «Etiqueta de envío» está decidida y documentada en [techContext.md](techContext.md).

`uis/website` ya contiene la web corporativa rediseñada con la identidad nocturna, flujo logístico ilustrado, fotografía de Unsplash en local y documentación en español e inglés. `npm run lint` y `npm run build` pasan. `uis/backoffice` todavía está pendiente. Fuente del dominio: [CONTEXT.md](../CONTEXT.md).

En el estado comprobado para este hito, `uis/`, `services/` y `docs/` contienen sus README, pero no hay apps ni servicios implementados en esas carpetas. `CONTEXT.md` ya contiene el briefing de TrackFlow. Fuentes: [CONTEXT.md](../CONTEXT.md), [uis/README.es.md](../uis/README.es.md), [services/README.es.md](../services/README.es.md) y [README.es.md](../README.es.md).

## Próximos pasos del hito

1. Crear `uis/backoffice` como aplicación independiente con Vite, React, TypeScript y Tailwind, usando npm.
2. Implementar su experiencia interna a partir del dominio descrito en [CONTEXT.md](../CONTEXT.md) y aplicar la identidad visual documentada en [techContext.md](techContext.md).
3. Documentar cómo ejecutar la aplicación y verificar que ambas apps se instalan y ejecutan con npm en el entorno del Codespace.

El backend con FastAPI pertenece a una fase futura en `services/`, de acuerdo con [README.es.md](../README.es.md); no forma parte de las aplicaciones frontend descritas en este estado.
