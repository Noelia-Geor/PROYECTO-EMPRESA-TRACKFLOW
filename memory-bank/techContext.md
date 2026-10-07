# Contexto técnico

## Estructura del monorepo

El repositorio es una plantilla para desarrollar una empresa a través de varios hitos. Las carpetas tienen responsabilidades separadas; esta descripción sigue [README.es.md](../README.es.md).

| Ruta                                         | Responsabilidad                                                                                                           |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `CONTEXT.md`                                 | Fuente de contexto del dominio de la empresa.                                                                             |
| `uis/`                                       | Aplicaciones frontend: web pública, backoffice, portales y dashboards con interfaz.                                       |
| `services/`                                  | Backend; el README raíz propone una API centralizada con FastAPI y workers solo cuando necesiten ejecutarse por separado. |
| `data/`                                      | Datos fuente, pipelines ETL/ELT, resultados procesados y evaluación.                                                      |
| `agents/`                                    | Agentes de IA, su configuración, prompts, herramientas y pruebas.                                                         |
| `skills/`                                    | Instrucciones y capacidades reutilizables para agentes.                                                                   |
| `mcps/`                                      | Servidores MCP para conectar modelos con sistemas y herramientas.                                                         |
| `workflows/`                                 | Automatizaciones y orquestación entre sistemas.                                                                           |
| `packages/`                                  | Librerías reutilizables, incluidos tipos TypeScript compartidos.                                                          |
| `shared/`                                    | Recursos compartidos pequeños, como esquemas, plantillas y assets.                                                        |
| `docs/`                                      | Arquitectura, decisiones y convenciones transversales.                                                                    |
| `infra/`                                     | Infraestructura y despliegue, como Docker, Terraform y CI/CD.                                                             |
| `scripts/`                                   | Scripts de ayuda puntuales y repetibles.                                                                                  |
| `internal/`                                  | Herramientas de desarrollo estructuradas, como CLIs.                                                                      |
| `docker-compose.yml` (raíz, cuando se añada) | Orquestación local del stack.                                                                                             |

Las descripciones de `uis/`, `services/`, `skills/` y `docs/` también están en sus [README de interfaces](../uis/README.es.md), [README de servicios](../services/README.es.md), [README de skills](../skills/README.es.md) y [README de documentación](../docs/README.es.md). `uis/` reserva `website` para la presencia pública y `backoffice` para la administración interna. Fuente: [uis/README.es.md](../uis/README.es.md).

## Decisiones de este hito

Estos acuerdos forman parte de la solicitud de este hito y todavía no aparecen documentados en los README del repositorio:

- `uis/website` y `uis/backoffice` serán dos aplicaciones separadas.
- Cada aplicación usará Vite, React, TypeScript y Tailwind CSS.
- Se usará npm como gestor de paquetes porque pnpm está roto en el Codespace.
- Las interfaces se construirán primero en español como idioma base; [CONTEXT.md](../CONTEXT.md) recomienda comenzar el soporte multiidioma con un idioma base.
- La identidad visual (colores y tipografía) no está definida en [CONTEXT.md](../CONTEXT.md): se definirá durante este hito y se documentará aquí.

El backend futuro se ubicará en `services/`; el README raíz recomienda una API centralizada con FastAPI. Fuente: [README.es.md](../README.es.md).

## Restricciones del dominio

- **Dos países y operaciones separadas:** TrackFlow opera en Estados Unidos y España, con almacenes en Los Ángeles y Zaragoza. Los almacenes usan sistemas distintos y no tienen visibilidad global compartida del inventario. Fuente: [CONTEXT.md](../CONTEXT.md).
- **Dos idiomas:** el briefing describe español e inglés como idiomas relevantes para el soporte al cliente y recomienda soporte multiidioma, empezando por un idioma base. Fuente: [CONTEXT.md](../CONTEXT.md).
- **Sistemas heredados e integración:** hay dos sistemas de gestión de almacén distintos, un ERP de principios de los años 2010, scripts de integración sin documentar y bases de datos en dos proveedores cloud. Fuente: [CONTEXT.md](../CONTEXT.md).
