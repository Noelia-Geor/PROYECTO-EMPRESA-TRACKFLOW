# Hallazgos de la Fase 2

Este documento registra convenciones y riesgos observados en el repositorio. Las reglas propuestas son recomendaciones; no se implementan aquí.

## 1. Arquitectura y convenciones

**Categoría:** Arquitectura / convenciones

**Hallazgo:** El repositorio define una taxonomía de carpetas por responsabilidad y un flujo de datos recomendado.

**Evidencia:** `README.es.md` asigna responsabilidades a `uis/`, `services/`, `data/`, `agents/`, `workflows/` y otras carpetas. También describe el flujo `data/raw/` → `data/pipelines/` → `data/process/` y recomienda documentar cada componente nuevo.

**Por qué importa:** Facilita que colaboradores y agentes ubiquen los cambios y mantengan una estructura coherente.

**Regla propuesta:** Añadir cada componente en la carpeta correspondiente a su responsabilidad y acompañarlo de un README que describa su propósito y uso.

## 2. Documentación

**Categoría:** Documentación / contexto

**Hallazgo:** Los documentos principales describen alcances distintos sin explicar claramente su relación: plantilla genérica, TrackFlow y SnackCheck.

**Evidencia:** `README.md` documenta SnackCheck; `company-choice.md` y `CONTEXT.md` describen TrackFlow; `README.es.md` presenta el repositorio como plantilla genérica. Además, `CONTEXT.es.md` aún es un placeholder, mientras `CONTEXT.md` contiene el contexto de TrackFlow.

**Por qué importa:** Un contribuidor o agente puede asumir un alcance o dominio equivocado al implementar una tarea.

**Regla propuesta:** Indicar en los documentos de entrada cuál es el proyecto activo y qué archivos son ejemplos o plantilla; mantener alineadas las versiones en español e inglés.

## 3. Plantillas

**Categoría:** DX / convenciones

**Hallazgo:** Algunas plantillas se describen como puntos de partida, pero sus archivos principales están vacíos.

**Evidencia:** `agents/_template/README.es.md` dice que la plantilla incluye código y tests; `agents/_template/agent.py` está vacío y `agents/_template/tests/` contiene documentación. `skills/_template/SKILL.md` también está vacío.

**Por qué importa:** Quien copie una plantilla no recibe la estructura mínima anunciada ni una referencia clara de qué debe completar.

**Regla propuesta:** Proporcionar un esqueleto mínimo y válido en cada plantilla, o indicar explícitamente en su README que es un placeholder vacío y qué archivos debe crear quien la use.

## 4. Arranque del entorno

**Categoría:** Configuración / ejecución

**Hallazgo:** El bootstrap del devcontainer ejecuta `uv sync`, pero no hay manifiesto de proyecto Python en la raíz que describa las dependencias para ese comando.

**Evidencia:** `.devcontainer/devcontainer.json` invoca `.devcontainer/post-create.sh`; ese script ejecuta `uv sync`. En la raíz no hay `pyproject.toml` ni `uv.lock`.

**Por qué importa:** El paso de instalación no está respaldado por configuración Python versionada en la raíz y puede impedir que el bootstrap termine correctamente o que prepare un entorno reproducible.

**Regla propuesta:** Asegurar que cada comando de instalación tenga su manifiesto y lockfile correspondientes en la ubicación desde la que se ejecuta, o retirar/documentar el paso si no aplica.

## 5. Paquete compartido

**Categoría:** Configuración / paquetes

**Hallazgo:** La metadata del paquete compartido apunta a una entrada que no coincide con la ubicación del archivo existente.

**Evidencia:** `packages/shared/package.json` declara `main` y `types` como `index.ts`; el archivo presente es `packages/shared/types/index.ts`.

**Por qué importa:** Los consumidores pueden no resolver la entrada o los tipos del paquete como esperan.

**Regla propuesta:** Hacer que las entradas públicas de `package.json` correspondan a archivos existentes y comprobar la resolución del paquete antes de consumirlo desde otros proyectos.

## 6. Pruebas

**Categoría:** Testing

**Hallazgo:** El registro indica casos PASS, pero el repositorio no proporciona un procedimiento reproducible para repetirlos.

**Evidencia:** `TEST-LOG.md` registra ocho casos como PASS. `Proyecto 4 GEEKS.json` tiene `active: false`, y `verificacion.md` indica que no encontró comando ni entorno reproducible para verificar esos resultados independientemente.

**Por qué importa:** No se pueden repetir las pruebas con fiabilidad para detectar regresiones o confirmar cambios futuros.

**Regla propuesta:** Para cada resultado, indicar si la prueba fue manual o automatizada y documentar los pasos, el entorno y las dependencias necesarios para repetirla; añadir una comprobación automatizada cuando sea viable.

## 7. Acceso al socket de Docker

**Categoría:** Riesgos / seguridad

**Hallazgo:** El devcontainer monta el socket de Docker y cambia sus permisos a escritura global.

**Evidencia:** `.devcontainer/devcontainer.json` enlaza `/var/run/docker.sock` al contenedor. Su `postStartCommand` ejecuta `sudo chmod 666 /var/run/docker.sock` cuando el socket existe.

**Por qué importa:** Los procesos con acceso al socket pueden controlar el daemon de Docker; dar permisos globales dentro del contenedor amplía ese acceso y puede afectar al host.

**Regla propuesta:** Montar el socket solo si el flujo de trabajo lo requiere y limitar su acceso a los usuarios o procesos necesarios, evitando permisos globales de escritura.

## 8. Datos sensibles

**Categoría:** Riesgos / datos

**Hallazgo:** No hay reglas de exclusión en el `.gitignore` del repositorio, aunque la documentación contempla datos que pueden contener PII.

**Evidencia:** `.gitignore` está vacío. `data/raw/README.es.md` menciona consideraciones de privacidad/PII y recomienda evitar subir datos sensibles al repositorio.

**Por qué importa:** El repositorio no ofrece una protección mediante reglas de exclusión para evitar que archivos locales con datos sensibles se añadan accidentalmente.

**Regla propuesta:** Definir exclusiones para archivos locales y datos sensibles, y usar muestras sintéticas o aprobadas para los datos que sí se versionen.
