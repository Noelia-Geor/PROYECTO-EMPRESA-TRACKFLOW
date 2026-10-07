# Resumen del proyecto

## Qué es TrackFlow

TrackFlow es una empresa de logística de última milla y gestión de almacenes. Almacena inventario para marcas de e-commerce, prepara y envía pedidos mediante transportistas y gestiona devoluciones. Opera en Estados Unidos y España, con almacenes en Los Ángeles y Zaragoza. Fuente: [CONTEXT.md](../CONTEXT.md).

## Cifras clave

| Dato                           | Cifra o detalle                                                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fundación                      | 2009, en Los Ángeles.                                                                                                                            |
| Empleados                      | Aproximadamente 130.                                                                                                                             |
| Facturación anual              | Alrededor de 9 millones de euros.                                                                                                                |
| Operarios de almacén           | Aproximadamente 70.                                                                                                                              |
| Transportistas                 | 8 en total: Estados Unidos (UPS, FedEx y DHL); España (MRW, SEUR y DHL, más dos transportistas locales cuyos nombres no especifica el briefing). |
| Agentes de atención al cliente | 15.                                                                                                                                              |
| Devoluciones                   | Entre el 18 % y el 25 % del volumen, según cliente y país.                                                                                       |
| Consultas automatizables       | El 80 % podría resolverse automáticamente.                                                                                                       |

Fuente de todas las cifras: [CONTEXT.md](../CONTEXT.md).

## Clientes

TrackFlow atiende a dos tipos de cliente: marcas de e-commerce que contratan sus servicios (B2B) y consumidores finales que reciben los paquetes (B2C). Fuente: [CONTEXT.md](../CONTEXT.md).

## Áreas y responsables

| Área                                          | Responsable                                                | Alcance descrito                                                                                                                                                                                                                                                          |
| --------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Operaciones de almacén                        | Ana Whitfield                                              | Supervisa los almacenes de Los Ángeles y Zaragoza.                                                                                                                                                                                                                        |
| Última milla y gestión de transportistas      | Carlos Vega                                                | Coordina la asignación, el seguimiento y las incidencias de los transportistas.                                                                                                                                                                                           |
| Logística inversa                             | Sofía Ramos                                                | Lidera el equipo que gestiona las devoluciones.                                                                                                                                                                                                                           |
| Atención al cliente / Experiencia del cliente | Valentina Cruz                                             | Gestiona agentes que atienden a marcas y consumidores finales.                                                                                                                                                                                                            |
| Comercial y relación con clientes             | Miguel Torres                                              | Lidera account managers y desarrollo de negocio.                                                                                                                                                                                                                          |
| Tecnología                                    | Andrés Kim                                                 | CTO; lidera desde Zaragoza el equipo técnico.                                                                                                                                                                                                                             |
| Dirección ejecutiva                           | Thomas Harry / Daniel Espinoza (discrepancia en la fuente) | El texto introductorio identifica a Thomas Harry como fundador y CEO y le atribuye la dirección ejecutiva; otra sección identifica a Daniel Espinoza como CEO y dice que creó TrackFlow Tech. Pendiente de confirmar con el instructor; las interfaces no nombran al CEO. |

Fuente de áreas, responsabilidades y discrepancia: [CONTEXT.md](../CONTEXT.md).

## Problemas actuales

- **Almacenes:** usan sistemas distintos y no comparten una visión global del inventario; los pedidos se transcriben desde emails y el picking usa listas en papel. Las discrepancias se detectan tarde. Fuente: [CONTEXT.md](../CONTEXT.md).
- **Transportistas:** la selección y el seguimiento se realizan manualmente en portales separados, y no hay métricas históricas estructuradas de rendimiento. Fuente: [CONTEXT.md](../CONTEXT.md).
- **Devoluciones:** cada caso requiere revisión humana; los criterios e inspecciones son inconsistentes y falta visibilidad sobre los motivos y patrones. La fuente estima que representan entre el 18 % y el 25 % del volumen, según cliente y país. Fuente: [CONTEXT.md](../CONTEXT.md).
- **Atención al cliente:** los agentes atienden por email, WhatsApp y teléfono sin un sistema unificado de tickets ni una base de conocimiento; la fuente indica que muchas consultas son repetitivas. Fuente: [CONTEXT.md](../CONTEXT.md).
- **Comercial:** las cuentas se gestionan en hojas de cálculo personales e hilos de email; los informes mensuales a clientes se preparan manualmente y no hay visibilidad del riesgo de renovación. Fuente: [CONTEXT.md](../CONTEXT.md).
- **Tecnología:** conviven dos sistemas de almacén, un ERP de principios de los años 2010, scripts punto a punto sin documentar y bases de datos en dos proveedores cloud; no hay telemetría centralizada. Fuente: [CONTEXT.md](../CONTEXT.md).
- **Dirección:** el informe ejecutivo se ensambla manualmente con datos parciales y puede llegar con uno o dos días de antigüedad. Fuente: [CONTEXT.md](../CONTEXT.md).

En conjunto, la empresa carece de infraestructura integrada para operar en dos países; el briefing describe como consecuencias una operación más lenta, propensa a errores y menos rentable de lo necesario. Fuente: [CONTEXT.md](../CONTEXT.md).

## TrackFlow Tech

TrackFlow Tech es la unidad interna creada con el mandato de construir los sistemas, las integraciones y las automatizaciones inteligentes que permitan a TrackFlow operar como una empresa logística moderna. Fuente: [CONTEXT.md](../CONTEXT.md).

## Objetivos de este hito

El alcance indicado para este hito es entregar dos aplicaciones frontend diferenciadas dentro de `uis/`:

- **Web pública** en `uis/website`, presencia pública de la compañía.
- **Backoffice interno** en `uis/backoffice`, aplicación de administración para uso interno.

También forma parte del hito preparar la infraestructura de agentes del repositorio:

- `memory-bank/` para el contexto persistente del proyecto.
- `AGENTS.md` en la raíz.
- Reglas en `.agents/rules/`.
- Una skill en `.agents/skills/`.

La ubicación y los propósitos de website y backoffice están descritos en [README.es.md](../README.es.md) y [uis/README.es.md](../uis/README.es.md). La separación en dos apps corresponde a la decisión de alcance de este hito; no se atribuye a una decisión ya documentada en esos README.
