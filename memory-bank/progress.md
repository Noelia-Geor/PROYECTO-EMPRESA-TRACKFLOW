# Estado y progreso

## Estado actual

- **Dashboard TrackFlow:** hay una visión documentada en `CONTEXT.md` para un dashboard ejecutivo global, pero no hay app en `uis/`; esa carpeta contiene solo README. No se puede afirmar que el dashboard esté implementado.
- **SnackCheck:** existe el export n8n `Proyecto 4 GEEKS.json` y `README.md` documenta su comportamiento. El export indica `active: false`; `verificacion.md` dice que el repositorio no demuestra que se esté ejecutando.
- **Pruebas:** `TEST-LOG.md` registra ocho casos como PASS. `verificacion.md` indica que no hay comando o entorno reproducible para verificarlos independientemente.
- **Análisis de datos:** existe `skills/data-analysis/scripts/pandas_clean.py`, pero requiere `pandas` y `data.csv`; no hay manifiesto Python raíz ni archivo `data.csv` aportado.
- **Servicios, UI y datos persistentes:** no se encontraron implementaciones bajo `services/` o `uis/`, configuración de base de datos, `Dockerfile` ni `docker-compose.yml`.

## Deuda técnica respaldada por el repo

- **Contexto contradictorio:** `README.md` describe SnackCheck, `CONTEXT.md` describe TrackFlow y `README.es.md` se presenta como plantilla; `CONTEXT.es.md` sigue siendo placeholder.
- **Arranque no reproducible:** `.devcontainer/post-create.sh` ejecuta `uv sync`, pero falta `pyproject.toml` y `uv.lock` en la raíz.
- **Entrada de paquete desalineada:** `packages/shared/package.json` apunta `main` y `types` a `index.ts`, mientras el archivo está en `packages/shared/types/index.ts`.
- **Dashboard sin implementación verificable:** los KPIs, alertas, informe semanal y asistente de IA aparecen como necesidades en `CONTEXT.md`, sin UI, API o fuente de datos implementadas en el repo.
- **Ejecución no confirmada:** el workflow está inactivo en el export y el registro de pruebas no incluye un procedimiento que permita repetir los PASS desde el repo.

## Prioridades inmediatas

1. **Aclarar el alcance activo:** confirmar si el trabajo inmediato es el dashboard de TrackFlow o SnackCheck y señalar qué documentación es la fuente vigente; los README y contextos actuales describen proyectos distintos.
2. **Definir el límite funcional del dashboard antes de implementarlo:** convertir los KPIs y funciones de `CONTEXT.md` en una fuente de datos, API y UI verificables; hoy no hay implementación en `uis/` o `services/` ni una base de datos configurada.
3. **Hacer repetible la validación del artefacto elegido:** documentar un procedimiento ejecutable y requisitos externos. Para SnackCheck, el export está inactivo y `TEST-LOG.md` no basta para repetir los casos según `verificacion.md`.
4. **Alinear el entorno con los manifiestos existentes:** resolver el `uv sync` sin manifiesto raíz y corregir o validar las rutas públicas de `@repo/shared-types` antes de depender de esos flujos.