# Seguridad y datos

**Nombre:** Limitar accesos y proteger datos locales

**Alcance:** Configuración del devcontainer, acceso al socket de Docker y archivos de datos en `data/raw/`.

**Justificación:** `.devcontainer/devcontainer.json` monta el socket de Docker y asigna permisos `666` en `postStartCommand`. Además, `.gitignore` está vacío y `data/raw/README.es.md` advierte sobre privacidad/PII y recomienda evitar subir datos sensibles.

## Guía específica del proyecto

- En `.devcontainer/devcontainer.json`, el montaje `source=/var/run/docker.sock,target=/var/run/docker.sock,type=bind` expone el socket al contenedor; el `postStartCommand` ejecuta `sudo chmod 666 /var/run/docker.sock` cuando existe.
- Antes de conservar o añadir acceso al socket, confirma que una tarea lo necesite y limita el acceso a los procesos o usuarios requeridos. No amplíes permisos globales sin una justificación documentada.
- Trata `data/raw/` como datos fuente: registra origen, formato y consideraciones de privacidad según `data/raw/README.es.md`.
- Como el `.gitignore` actual está vacío, no confíes en exclusiones locales para proteger datasets. Verifica cada archivo antes de versionarlo y no añadas datos sensibles al repositorio.

**Regla accionable:** Revisa los permisos de Docker y el contenido de datos antes de incorporar cambios; restringe el acceso al socket y versiona únicamente datos cuya inclusión esté permitida, usando muestras sintéticas o aprobadas cuando corresponda.