# Registro y repetición de pruebas

**Nombre:** Hacer reproducibles los resultados

**Alcance:** Pruebas de workflows, scripts y componentes nuevos; actualización de `TEST-LOG.md`.

**Justificación:** `TEST-LOG.md` registra ocho casos PASS, pero `verificacion.md` indica que no encontró un procedimiento reproducible para repetirlos. Además, el export `Proyecto 4 GEEKS.json` tiene `active: false`.

## Guía específica del proyecto

- Para cada caso, especifica entrada, resultado esperado, resultado observado y si fue manual o automatizado. `TEST-LOG.md` ya usa ejemplos como TC-001, con un código de barras, el producto esperado y el veredicto.
- Si la prueba depende de n8n, documenta los pasos y la configuración necesarios para ejecutarla; no presentes el estado PASS del registro como una prueba repetible por sí sola.
- Registra las dependencias externas relevantes para el resultado. El workflow de SnackCheck consulta Open Food Facts y tiene nodos Groq, según `README.md` y `Proyecto 4 GEEKS.json`.
- No afirmes que un workflow está activo o en ejecución basándote solo en su exportación; indica lo que el repositorio demuestra y lo que queda por verificar en un entorno n8n.

**Regla accionable:** Cada resultado de prueba debe incluir suficiente información para que otro colaborador pueda repetirlo, o identificarse explícitamente como una comprobación manual no reproducible desde el repositorio.