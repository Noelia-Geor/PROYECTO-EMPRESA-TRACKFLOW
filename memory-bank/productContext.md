# Contexto de producto

## Visión del dashboard

`CONTEXT.md` describe para TrackFlow la necesidad de un dashboard ejecutivo global con KPIs de ambas operaciones: volumen de envíos, tasa de entregas a tiempo, coste operativo, devoluciones y satisfacción del cliente. También plantea un informe semanal automático los lunes a las 7:00, comparativas por país, alertas por umbrales y un asistente de IA consultable en lenguaje natural.

Esto es una necesidad de producto documentada, no funcionalidad entregada: `uis/` contiene únicamente sus archivos README, sin una aplicación de dashboard. No hay evidencia en el repositorio de que esos KPIs, alertas, informes o el asistente estén implementados o conectados a datos.

## Funcionalidad de producto presente

El producto funcional descrito en `README.md` es SnackCheck, una automatización n8n distinta del dashboard de TrackFlow. Acepta un código de barras por `POST /nutrition-check`, consulta Open Food Facts, evalúa azúcar, sal, grasa y Nutri-Score, y devuelve un veredicto saludable, moderado o no saludable junto con un consejo generado mediante Groq.

`Proyecto 4 GEEKS.json` contiene la definición de ese workflow, pero indica `active: false`. `verificacion.md` señala que el repositorio no confirma que el flujo esté en ejecución. Por tanto, su presencia como exportación no prueba disponibilidad operativa.

## Alcance que debe mantenerse explícito

Las fuentes describen alcances distintos: `CONTEXT.md` y `company-choice.md` corresponden a TrackFlow; `README.md` documenta SnackCheck; `README.es.md` se presenta como plantilla genérica; `CONTEXT.es.md` sigue siendo un placeholder. No hay evidencia suficiente para afirmar que SnackCheck sea parte del producto TrackFlow ni que el dashboard se haya construido.