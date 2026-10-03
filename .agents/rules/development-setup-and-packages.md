# Configuración de desarrollo y paquetes

**Nombre:** Alinear comandos con los manifiestos

**Alcance:** Bootstrap del devcontainer y metadata de paquetes TypeScript compartidos.

**Justificación:** `.devcontainer/devcontainer.json` ejecuta `.devcontainer/post-create.sh`, que contiene `uv sync`, pero no hay `pyproject.toml` ni `uv.lock` en la raíz. Además, la metadata de `packages/shared/` apunta a una entrada distinta de la ubicación del archivo de tipos existente.

## Guía específica del proyecto

- El devcontainer invoca el script mediante `"postCreateCommand": "bash .devcontainer/post-create.sh"`; revisa los comandos de ese script desde la raíz, que es donde se ejecuta el `uv sync`.
- Antes de añadir o cambiar un paso de instalación, verifica que el manifiesto y, cuando corresponda, el archivo de lock existan en la ubicación de ejecución. No des por reproducible una instalación si falta esa configuración.
- En `packages/shared/package.json`, `main` y `types` declaran `index.ts`; el archivo existente está en `packages/shared/types/index.ts`. Comprueba que toda ruta de entrada declarada corresponda a un archivo real.
- No añadas scripts o requisitos de workspace a la raíz sin crear y documentar también la configuración que los respalda.

**Regla accionable:** Para cada comando de bootstrap y cada entrada pública de paquete, verifica la ruta y el manifiesto que lo hacen válido; documenta y prueba el flujo desde un checkout limpio antes de depender de él.