---
description: Mantiene textos e información de negocio fieles al contexto oficial de TrackFlow.
globs: ["**/*"]
alwaysApply: true
---

# Dominio de TrackFlow

## Alcance

Aplica a textos, datos, ejemplos, nombres y decisiones de contenido de negocio en todo el monorepo.

## Justificación

`CONTEXT.md` es la fuente del dominio: describe las áreas, responsables, operaciones, clientes, transportistas y restricciones de TrackFlow. Fuente: [CONTEXT.md](../../CONTEXT.md).

## Reglas concretas

- Usa `CONTEXT.md` como fuente para nombres, cifras, áreas, responsables y transportistas.
- No inventes clientes, precios, testimonios, métricas ni otros datos de negocio. Si falta un dato necesario, detente y pregunta.
- No resuelvas la discrepancia entre Thomas Harry y Daniel Espinoza: las interfaces no deben nombrar al CEO.
- Usa español como idioma base de las interfaces. El contexto recomienda comenzar el soporte multiidioma con un idioma base. Fuente: [CONTEXT.md](../../CONTEXT.md).

## Cómo comprobarlo

- Contrasta cada nombre, cifra, área, cliente y transportista con `CONTEXT.md`.
- Busca en las interfaces referencias al CEO y confirma que no se le nombra.
- Verifica que los textos de interfaz estén redactados primero en español.
