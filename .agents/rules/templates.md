# Uso de plantillas

**Nombre:** Verificar el contenido real de las plantillas

**Alcance:** Creación de agentes o skills a partir de `agents/_template/` y `skills/_template/`.

**Justificación:** `agents/_template/README.es.md` afirma que la plantilla incluye código y tests, pero `agents/_template/agent.py` está vacío y `agents/_template/tests/` contiene documentación. `skills/_template/SKILL.md` también está vacío.

## Guía específica del proyecto

- Comprueba los archivos de la plantilla antes de tratarlos como implementación o ejemplo funcional.
- `agents/_template/README.es.md` recomienda documentar objetivo, herramientas, prompts, memoria, evaluaciones y tests al adaptar un agente; registra las partes que realmente hayas creado o cambiado.
- No asumas que `skills/_template/SKILL.md` proporciona contenido inicial: crea el contenido requerido por la tarea y documenta entradas, salidas y uso según la guía de `skills/README.es.md`.
- Si amplías una plantilla, mantén su README de acuerdo con los archivos presentes: no anuncies código, configuración o tests que no estén incluidos.

**Regla accionable:** Al copiar una plantilla, enumera los archivos vacíos o ausentes y completa o documenta los componentes necesarios para el nuevo agente o skill antes de presentarlo como listo para usar.