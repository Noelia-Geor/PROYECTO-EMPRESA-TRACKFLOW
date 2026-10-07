---
description: Organiza cambios respetando la estructura del monorepo TrackFlow.
globs: ["**/*"]
alwaysApply: true
---

# Estructura del monorepo

## Alcance

Aplica al crear o mover archivos y carpetas en cualquier parte del repositorio.

## Justificación

Cada carpeta de primer nivel tiene una responsabilidad definida para mantener separados los proyectos y facilitar su evolución. Fuente: [README.es.md](../../README.es.md).

## Reglas concretas

- Antes de crear archivos en una carpeta, lee su `README.es.md` y sigue su propósito y convenciones.
- Coloca interfaces en `uis/`; API y workers en `services/`; datos y pipelines en `data/`; agentes de producto en `agents/`; capacidades reutilizables del producto en `skills/`; servidores MCP en `mcps/`; automatizaciones en `workflows/`; librerías reutilizables en `packages/`; recursos compartidos pequeños en `shared/`; documentación transversal en `docs/`; infraestructura en `infra/`; scripts auxiliares en `scripts/`; herramientas de desarrollo estructuradas en `internal/`.
- Cada aplicación o servicio nuevo debe tener su propia subcarpeta y un `README.md` que explique su propósito y cómo ejecutarlo.
- No dejes código, datos ni archivos de aplicación sueltos en la raíz. Mantén allí solo archivos globales y de configuración propios del repositorio.
- `.agents/` contiene configuración del agente de código; `agents/` y `skills/` son producto de TrackFlow.

## Cómo comprobarlo

- Comprueba que cada archivo nuevo está en la carpeta responsable indicada por el README correspondiente.
- Verifica que cada aplicación o servicio nuevo tiene subcarpeta propia y `README.md`.
- Revisa `git status` para detectar archivos de aplicación añadidos directamente en la raíz.
