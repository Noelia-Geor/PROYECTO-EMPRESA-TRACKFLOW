# Contexto técnico

## Stack observado

- **Automatización:** `Proyecto 4 GEEKS.json` es una exportación de workflow n8n. Incluye nodos webhook, HTTP Request, condiciones, transformaciones, código y nodos LangChain para Groq. El export no especifica una versión de n8n.
- **Datos nutricionales externos:** el nodo `API - Consultar Open Food Facts` llama a `https://world.openfoodfacts.org/api/v2/product/{barcode}.json` con campos de producto, marca, Nutri-Score y nutrimentos. `README.md` indica que Open Food Facts no requiere API key.
- **IA generativa:** los nodos Groq declaran el modelo `groq/compound-mini`; `README.md` indica que se debe configurar la credencial de Groq en n8n. No hay credencial operativa demostrada por el repositorio.
- **Python:** `skills/data-analysis/scripts/pandas_clean.py` importa `pandas` y lee `data.csv`. El repositorio no aporta un manifiesto Python raíz ni ese archivo de entrada, así que las dependencias y la ejecución no quedan reproducidas desde el repo.
- **TypeScript:** `packages/shared/package.json` declara el paquete privado `@repo/shared-types`; `packages/shared/types/index.ts` contiene `Id` y `BaseEntity`. El paquete no declara scripts y sus campos `main`/`types` apuntan a `index.ts`, no a la ruta existente `types/index.ts`.

## Base de datos

No se identifica un motor de base de datos, esquema, migración, driver ni servicio configurado en los artefactos del repositorio. `README.es.md` menciona `docker-compose.yml` y bases de datos como orientación de la plantilla, pero no existe ese archivo; `verificacion.md` también registra que no se encontró una composición local ni un arranque del proyecto completo. No se puede afirmar que haya una base de datos conectada.

## Docker y entorno de desarrollo

`.devcontainer/devcontainer.json` usa la imagen `mcr.microsoft.com/devcontainers/universal:2`, monta `/var/run/docker.sock` y ejecuta `.devcontainer/post-create.sh`. El script habilita Corepack, prepara `pnpm@latest`, instala `pip` y `uv`, y luego ejecuta `uv sync`. No hay `pyproject.toml` ni `uv.lock` en la raíz que respalden ese último paso.

El `postStartCommand` aplica `chmod 666` al socket de Docker cuando existe. No hay `Dockerfile` ni `docker-compose.yml` en el repositorio; el montaje del socket documenta acceso desde el devcontainer, no una aplicación Dockerizada.

## Dependencias y versiones no especificadas

El repositorio no fija versiones para n8n, pandas ni los paquetes de una app frontend/backend. `pnpm@latest` se prepara en el script del devcontainer, pero no existe un `package.json` raíz ni un runner de workspace. No se infiere una dependencia instalada solo porque un ejemplo la importe.