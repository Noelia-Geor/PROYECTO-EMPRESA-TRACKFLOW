# Progreso

## Estado actual

El trabajo se realiza en la rama `feature/agent-memory-bank`.

`memory-bank/`, `AGENTS.md`, las cuatro reglas de `.agents/rules/` y la skill `.agents/skills/modulo-backoffice/` están hechos. La identidad visual «Etiqueta de envío» está decidida y documentada en [techContext.md](techContext.md).

`uis/website` ya contiene la web corporativa terminada: modo oscuro con panel crema, recurso visual punto → ruta → nodo, recorrido interactivo guiado por el scroll, red de transportistas, mapa Los Ángeles → Zaragoza, menú móvil, cifras reales de `CONTEXT.md` en cada servicio y documentación en español e inglés. Auditada en escritorio, tablet y móvil (390 px, sin scroll horizontal). `npm run lint` y `npm run build` pasan. Fuente del dominio: [CONTEXT.md](../CONTEXT.md).

`uis/backoffice` tiene su base: Tailwind 4 con los mismos tokens que la web, layout con menú lateral (hamburguesa en móvil), navegación por hash definida en `src/navigation.ts` y página de Inicio con las siete áreas, sus responsables, una cifra clave y una frase de situación por área (`src/data/empresa.ts`, con cita de sección de `CONTEXT.md` por dato; las cifras de Comercial, Tecnología y Dirección salen de «Los departamentos y sus problemas»; el CEO no se nombra). La tarjeta de Dirección ejecutiva ocupa toda la fila en pantallas grandes. README en español e inglés. `npm run lint` y `npm run build` pasan. Pendiente: añadir los módulos de área con la skill `modulo-backoffice`.

Módulos del backoffice:

| Módulo            | Ruta                  | Estado                                                                                                                                             |
| ----------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Logística inversa | `#/logistica-inversa` | Hecho: responsable, equipo, % de devoluciones, decisiones por devolución, problemas, necesidades y flujo de recogida, todo citado de `CONTEXT.md`. |

En el estado comprobado para este hito, `uis/`, `services/` y `docs/` contienen sus README, pero no hay apps ni servicios implementados en esas carpetas. `CONTEXT.md` ya contiene el briefing de TrackFlow. Fuentes: [CONTEXT.md](../CONTEXT.md), [uis/README.es.md](../uis/README.es.md), [services/README.es.md](../services/README.es.md) y [README.es.md](../README.es.md).

## Próximos pasos del hito

1. Crear `uis/backoffice` como aplicación independiente con Vite, React, TypeScript y Tailwind, usando npm.
2. Implementar su experiencia interna a partir del dominio descrito en [CONTEXT.md](../CONTEXT.md) y aplicar la identidad visual documentada en [techContext.md](techContext.md).
3. Documentar cómo ejecutar la aplicación y verificar que ambas apps se instalan y ejecutan con npm en el entorno del Codespace.

El backend con FastAPI pertenece a una fase futura en `services/`, de acuerdo con [README.es.md](../README.es.md); no forma parte de las aplicaciones frontend descritas en este estado.
