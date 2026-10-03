# Contexto y documentación del proyecto

**Nombre:** Aclarar el contexto activo

**Alcance:** Cambios que dependan del dominio, los requisitos de negocio o la identidad del proyecto; documentación de entrada en español e inglés.

**Justificación:** Los documentos actuales no describen un único alcance: `README.md` presenta SnackCheck, `company-choice.md` y `CONTEXT.md` describen TrackFlow, y `README.es.md` se presenta como plantilla genérica. `CONTEXT.es.md` sigue siendo un placeholder.

## Guía específica del proyecto

- Antes de implementar lógica de dominio, consulta `CONTEXT.md` y la tarea concreta para confirmar el dominio aplicable; no deduzcas que SnackCheck es el contexto de negocio de TrackFlow.
- Si una tarea necesita determinar el alcance del repositorio y los documentos de entrada discrepan, deja explícita la discrepancia y solicita o documenta cuál es la fuente que debe prevalecer antes de añadir supuestos de dominio.
- Al actualizar una guía en un idioma, revisa su contraparte. Por ejemplo, `README.md` y `README.es.md` hoy describen propósitos distintos; `CONTEXT.md` contiene TrackFlow mientras `CONTEXT.es.md` aún instruye reemplazar el contexto.
- Distingue los documentos de plantilla de los entregables activos y etiqueta los ejemplos para evitar que se interpreten como requisitos del proyecto.

**Regla accionable:** No introduzcas datos o reglas de negocio nuevos basándote solo en un README contradictorio; identifica el contexto de la tarea y señala la discrepancia documental que pueda cambiar la implementación.