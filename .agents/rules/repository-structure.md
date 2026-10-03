# Estructura del repositorio

**Nombre:** Organización por responsabilidad

**Alcance:** Nuevos archivos, aplicaciones, servicios, agentes, pipelines y paquetes del repositorio.

**Justificación:** `README.es.md` define responsabilidades para las carpetas principales y describe el flujo de datos `data/raw/` → `data/pipelines/` → `data/process/`. Seguir esa organización ayuda a que los cambios sean localizables y coherentes con el proyecto.

## Guía específica del proyecto

- Coloca interfaces en `uis/`, APIs y workers en `services/`, transformaciones en `data/pipelines/`, agentes en `agents/` y automatizaciones en `workflows/`.
- Conserva el flujo documentado: los datos fuente van en `data/raw/`, los scripts de transformación en `data/pipelines/` y las salidas intermedias en `data/process/`.
- Añade documentación junto al componente. Por ejemplo, `services/README.es.md` pide documentar el objetivo, la tecnología y cómo ejecutar los servicios; `packages/README.es.md` recomienda documentar la API pública y su consumo.
- Para decidir entre `packages/` y `shared/`, sigue `README.es.md`: usa `packages/` para código reutilizable versionable y `shared/` para recursos compartidos que no constituyan un paquete completo.

**Regla accionable:** Antes de crear un componente, identifica su responsabilidad en `README.es.md`; ubícalo en la carpeta correspondiente y documenta su propósito y uso en un README cercano.