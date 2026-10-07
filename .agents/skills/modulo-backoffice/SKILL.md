---
name: modulo-backoffice
description: "Úsala cuando se pida añadir un módulo, sección o panel de un área de TrackFlow al backoffice. No se usa para la web pública (uis/website) ni para crear servicios backend."
---

# Módulo de área en el backoffice

## Objetivo

Añadir a `uis/backoffice` el módulo de una sola área de TrackFlow, con datos de `CONTEXT.md` y visible en la navegación.

## Inputs

- **Obligatorio:** área: Operaciones de almacén, Última milla y transportistas, Logística inversa, Atención al cliente, Comercial, Dirección o Tecnología.
- **Opcional:** qué mostrar en el módulo.
- Si el área no aparece en `CONTEXT.md`, detente y pregunta antes de implementar.

## Pasos

1. Lee en `CONTEXT.md` la sección que corresponde al área elegida. Las secciones fuente son «Operaciones de almacén», «Última milla y gestión de transportistas», «Logística inversa», «Experiencia del cliente», «Comercial y relación con clientes», «Dirección Ejecutiva» y «Tecnología».
2. Crea los datos en `uis/backoffice/src/data/<area>.ts`. Junto a cada dato, añade un comentario que cite el nombre exacto de su sección en `CONTEXT.md`.
3. Crea la página del módulo en `uis/backoffice/src/pages/`.
4. Reutiliza componentes de `uis/backoffice/src/components/`; crea uno nuevo solo si no existe uno adecuado.
5. Añade una entrada para la ruta del módulo al menú del layout del backoffice.
6. Ejecuta `npm run lint` y `npm run build` dentro de `uis/backoffice`; ambos deben pasar sin errores.
7. Actualiza `memory-bank/progress.md` con el módulo y su estado.

## Output

- Lista de archivos creados o modificados.
- Tabla de trazabilidad `dato → sección de CONTEXT.md` para los datos incluidos.

## Criterios de aceptación

- [ ] La ruta del módulo aparece en el menú y renderiza sin errores al ejecutar `npm run dev` en `uis/backoffice`.
- [ ] Cada cifra o nombre mostrado aparece en `CONTEXT.md`; no se inventan datos y no se nombra al CEO.
- [ ] No se modificó `uis/website` ni ninguna ruta protegida por `AGENTS.md`.
- [ ] `npm run lint` y `npm run build` pasan en `uis/backoffice`.
- [ ] `memory-bank/progress.md` está actualizado.
