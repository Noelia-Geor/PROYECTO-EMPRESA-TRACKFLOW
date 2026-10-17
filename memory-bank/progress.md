# Progreso

## Estado actual

El trabajo se realiza en la rama `feature/agent-memory-bank`.

`memory-bank/`, `AGENTS.md`, las cuatro reglas de `.agents/rules/` y la skill `.agents/skills/modulo-backoffice/` están hechos. La identidad visual «Etiqueta de envío» está decidida y documentada en [techContext.md](techContext.md).

`uis/website` ya contiene la web corporativa terminada: modo oscuro con panel crema, recurso visual punto → ruta → nodo, recorrido interactivo guiado por el scroll, red de transportistas, mapa Los Ángeles → Zaragoza, menú móvil, cifras reales de `CONTEXT.md` en cada servicio y documentación en español e inglés. Auditada en escritorio, tablet y móvil (390 px, sin scroll horizontal). `npm run lint` y `npm run build` pasan. Fuente del dominio: [CONTEXT.md](../CONTEXT.md).

**Hito landing + formulario (17/10, rama `feature/web-landing-experiencia`, sin commit):** `uis/website` pasa a Vite multipágina. `index.html` es la landing en HTML5 semántico con Schema.org `Organization`; `application.html` es el formulario de solicitud y `validation.js` su validación en tiempo real con envío **simulado** (10 pruebas en `validation.test.js`). React queda en dos islas: el recorrido de 12 escenas en SVG isométrico guiado por el scroll (6 capítulos en móvil y tablet vertical; guion gráfico estático con movimiento reducido o modo ligero) y el mapa. Acabado premium aplicado el mismo día (hero con foto de alta resolución, gemelo digital con luz y sombras, CTA final y formulario numerado). Comprobado: `npm run lint`, `npm test` y `npm run build` pasan; Lighthouse móvil 90–91/100/100/100 y escritorio 99/100/100/100 en las dos páginas; axe sin incidencias; sin scroll horizontal a 390, 768 y 1440 px. Los componentes `.tsx` portados a HTML (`App`, `Hero`, `Header`, `Footer`, `StatStrip`, `BrandPromise`, `Section`, `ServiceCard`, `Button`, `ProcessSteps`, `useReveal`, `main.tsx`) siguen en el repo sin usar hasta la aprobación visual del desarrollador. Pendiente: aprobación visual, URL pública del Codespace y decidir si se eliminan esos componentes.

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
