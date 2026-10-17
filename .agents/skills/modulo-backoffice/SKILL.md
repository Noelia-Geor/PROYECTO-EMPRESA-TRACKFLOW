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

1. Lee en `CONTEXT.md` la sección del área elegida («Operaciones de almacén», «Última milla y gestión de transportistas», «Logística inversa», «Experiencia del cliente», «Comercial y relación con clientes», «Dirección Ejecutiva» o «Tecnología»). Así cada dato procede de la fuente del dominio.
2. Crea `uis/backoffice/src/data/<area>.ts` y comenta cada dato con el nombre exacto de su sección en `CONTEXT.md`. Así su origen es trazable y no se inventa información.
3. Crea la página del módulo en `uis/backoffice/src/pages/` y aplica los tokens de identidad visual de `memory-bank/techContext.md`: `noche`, `superficie`, `crema`, `niebla` y `senal`. Así la nueva interfaz mantiene la identidad del backoffice.
4. Reutiliza componentes de `uis/backoffice/src/components/`; crea uno nuevo solo si no existe uno adecuado. Así se mantiene la interfaz coherente y se evita duplicar componentes.
5. Añade la ruta del módulo al menú del layout del backoffice. Así se puede encontrar y abrir desde la navegación.
6. Ejecuta `npm run lint` y `npm run build` dentro de `uis/backoffice`; ambos deben pasar sin errores. Así se detectan problemas de calidad y compilación.
7. Actualiza `memory-bank/progress.md` con el módulo y su estado. Así el avance del proyecto queda documentado.

## Qué NO hacer

- No inventes cifras, nombres, clientes ni contactos; si falta un dato necesario, detente y pregunta.
- No nombres al CEO: `CONTEXT.md` contiene una discrepancia sobre quién ocupa ese cargo.
- No modifiques `uis/website` ni ninguna ruta protegida enumerada en `AGENTS.md`.
- No añadas dependencias nuevas sin preguntar.
- No crees servicios backend; esta skill solo añade módulos al backoffice.

## Output

- Lista de archivos creados o modificados.
- Tabla de trazabilidad `dato → sección de CONTEXT.md` para los datos incluidos.

## Criterios de aceptación

- [ ] La ruta del módulo aparece en el menú y renderiza sin errores al ejecutar `npm run dev` en `uis/backoffice`.
- [ ] Cada cifra o nombre mostrado aparece en `CONTEXT.md`; no se inventan datos y no se nombra al CEO.
- [ ] No se modificó `uis/website` ni ninguna ruta protegida por `AGENTS.md`.
- [ ] `npm run lint` y `npm run build` pasan en `uis/backoffice`.
- [ ] `memory-bank/progress.md` está actualizado.

## Ejemplo

**Entrada:** «Añade el módulo de Logística inversa».

**Salida esperada:**

- `uis/backoffice/src/data/logistica-inversa.ts`
- `uis/backoffice/src/pages/LogisticaInversa.tsx`
- Una entrada para el módulo en el menú del backoffice.

| Dato              | Valor                                       | Trazabilidad                              |
| ----------------- | ------------------------------------------- | ----------------------------------------- |
| Responsable       | Sofía Ramos                                 | `CONTEXT.md`, sección «Logística inversa» |
| Tamaño del equipo | 5 personas                                  | `CONTEXT.md`, sección «Logística inversa» |
| Devoluciones      | 18 %–25 % del volumen, según cliente y país | `CONTEXT.md`, sección «Logística inversa» |
