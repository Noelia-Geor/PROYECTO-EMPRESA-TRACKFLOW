# Instrucciones para agentes de código

## Al empezar cada sesión

Lee, en este orden:

1. `CONTEXT.md`.
2. `memory-bank/projectbrief.md`.
3. `memory-bank/techContext.md`.
4. `memory-bank/progress.md`.
5. Las reglas de `.agents/rules/`.
6. El `README.es.md` de la carpeta donde trabajarás.

Las skills disponibles están en `.agents/skills/`.

`.agents/` contiene configuración para el agente de código; `agents/` y `skills/` contienen producto de TrackFlow para módulos futuros.

## Antes de cada commit

Sigue estos pasos en orden:

1. Revisa `git status` y `git diff`. Solo deben aparecer los archivos de la tarea actual.
2. Si cambió `uis/website` o `uis/backoffice`, ejecuta `npm run lint` y `npm run build` dentro de cada app modificada. Ambos comandos deben terminar sin errores.
3. Comprueba que los textos y datos del negocio salen de `CONTEXT.md`; no inventes cifras, nombres ni clientes.
4. Actualiza `memory-bank/progress.md` y, si cambió una decisión técnica, también `memory-bank/techContext.md`.
5. Crea el commit con el formato `tipo(ámbito): descripción`. Tipos permitidos: `feat`, `fix`, `docs`, `chore`, `refactor`, `style`, `test`.
6. No hagas push ni abras un PR sin confirmación del desarrollador.

## Archivos y carpetas protegidos

No modifiques sin confirmación explícita del desarrollador:

- `CONTEXT.md`, `CONTEXT.es.md` y `company-choice.md`.
- `.devcontainer/`.
- Los `README.md` y `README.es.md` de la plantilla.
- `agents/`, `skills/`, `mcps/` y `workflows/`. Son código de producto de módulos futuros, no configuración del agente.
- `.git/`.

## Cuándo parar y preguntar

Para y consulta al desarrollador si un dato necesario no aparece en `CONTEXT.md`, si la tarea requiere modificar una ruta protegida o si una instrucción contradice estas reglas.
