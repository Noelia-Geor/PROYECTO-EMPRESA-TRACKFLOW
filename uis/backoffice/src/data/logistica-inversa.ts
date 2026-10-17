// Todos los datos proceden de CONTEXT.md; cada uno cita su sección.

export const logisticaInversa = {
  // CONTEXT.md, «Cómo está organizada la empresa» → Logística Inversa; y «Los departamentos y sus problemas» → Logística inversa
  responsable: 'Sofía Ramos',
  // CONTEXT.md, «Cómo está organizada la empresa» → Logística Inversa; y «Los departamentos y sus problemas» → Logística inversa
  equipo: 5,
  // CONTEXT.md, «Cómo está organizada la empresa» → Logística Inversa; y «Los departamentos y sus problemas» → Logística inversa
  devoluciones: '18–25 %',
  devolucionesDetalle: 'del volumen total, según cliente y país',

  // CONTEXT.md, «Cómo está organizada la empresa» → Logística Inversa
  decisiones: [
    { pregunta: '¿Se aprueba?', opciones: 'Aprobar o rechazar' },
    { pregunta: '¿Se recoge?', opciones: 'Recoger o no' },
    { pregunta: '¿Qué se hace con el producto?', opciones: 'Reacondicionar o desechar' },
  ],
  // CONTEXT.md, «Cómo está organizada la empresa» → Logística Inversa
  decisionesNota: 'Hoy todas estas decisiones pasan por revisión humana.',

  // CONTEXT.md, «Dónde está la empresa hoy»
  situacion: 'Las devoluciones se aprueban o rechazan una por una.',

  // CONTEXT.md, «Los departamentos y sus problemas» → Logística inversa
  problemas: [
    'Cada devolución pasa por revisión manual: no existen criterios de aprobación automáticos.',
    'La inspección del producto devuelto es subjetiva e inconsistente entre operarios.',
    'No hay visibilidad sobre qué productos se devuelven más ni por qué.',
  ],

  // CONTEXT.md, «Los departamentos y sus problemas» → Logística inversa («Qué necesitan»)
  necesidades: [
    {
      titulo: 'Aprobación automática',
      descripcion: 'Un motor de aprobación automática de devoluciones con reglas configurables por cliente.',
    },
    {
      titulo: 'Recogida automatizada',
      descripcion: 'Un flujo automatizado de recogida, desde la aprobación hasta la programación con el transportista.',
    },
    {
      titulo: 'Inspección asistida por IA',
      descripcion: 'El operario fotografía el producto y la IA clasifica su estado.',
    },
    {
      titulo: 'Dashboard de devoluciones',
      descripcion: 'Un dashboard de devoluciones con análisis de patrones.',
    },
  ],

  // CONTEXT.md, «Los departamentos y sus problemas» → Logística inversa («Qué necesitan»)
  flujoRecogida: ['Aprobación', 'Etiqueta', 'Instrucciones al cliente', 'Programación con transportista'],
}
