---
description: Carga esta regla cuando vayas a preparar un commit o una rama.
alwaysApply: false
---

# Commits y ramas

## Alcance

Aplica al preparar commits, trabajar con ramas y decidir qué incluir en el control de versiones.

## Justificación

El flujo del repositorio exige revisar los cambios antes del commit y usar un formato de commit consistente. Fuente: [AGENTS.md](../../AGENTS.md).

## Reglas concretas

- Usa Conventional Commits con uno de estos tipos: `feat`, `fix`, `docs`, `chore`, `refactor`, `style` o `test`; formato: `tipo(ámbito): descripción`.
- Incluye un solo cambio lógico por commit.
- No añadas `node_modules/`, `dist/` ni archivos `.env` al control de versiones.
- No reescribas historia publicada.
- No hagas push ni abras un PR sin confirmación del desarrollador.

## Cómo comprobarlo

- Antes del commit, revisa `git status` y `git diff`; confirma que el commit contiene solo los archivos de la tarea actual y un cambio lógico.
- Inspecciona los archivos preparados y confirma que no incluyen `node_modules/`, `dist/` ni `.env`.
- Antes de publicar una rama o abrir un PR, confirma que existe autorización explícita del desarrollador.
