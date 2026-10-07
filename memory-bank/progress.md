# Progreso

## Estado actual

El trabajo se realiza en la rama `feature/agent-memory-bank`.

El repositorio parte de una plantilla con contexto y estructura de carpetas, sin aplicaciones ejecutables todavía. Fuente: [README.es.md](../README.es.md).

En el estado comprobado para este hito, `uis/`, `services/` y `docs/` contienen sus README, pero no hay apps ni servicios implementados en esas carpetas. `CONTEXT.md` ya contiene el briefing de TrackFlow. Fuentes: [CONTEXT.md](../CONTEXT.md), [uis/README.es.md](../uis/README.es.md), [services/README.es.md](../services/README.es.md) y [README.es.md](../README.es.md).

## Próximos pasos del hito

1. Crear `AGENTS.md` en la raíz.
2. Añadir las reglas del agente en `.agents/rules/`.
3. Crear una skill en `.agents/skills/`.
4. Crear `uis/website` como aplicación independiente con Vite, React, TypeScript y Tailwind; usar npm en el Codespace, según los acuerdos de este hito.
5. Crear `uis/backoffice` con el mismo stack, también como aplicación independiente.
6. Definir e implementar las experiencias pública e interna usando únicamente el dominio descrito en [CONTEXT.md](../CONTEXT.md); documentar cada aplicación y cómo ejecutarla, como recomienda [uis/README.es.md](../uis/README.es.md).
7. Verificar que ambas aplicaciones se instalan y ejecutan con npm en el entorno del Codespace.

El backend con FastAPI pertenece a una fase futura en `services/`, de acuerdo con [README.es.md](../README.es.md); no forma parte de las aplicaciones frontend descritas en este estado.
