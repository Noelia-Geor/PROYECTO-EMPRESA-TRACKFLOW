export type Area = {
  nombre: string
  /** null cuando el cargo no debe nombrarse (discrepancia sobre el CEO en CONTEXT.md). */
  responsable: string | null
  cargo: string
  cifra: string
  cifraDetalle: string
  situacion?: string
}

export const areas: Area[] = [
  {
    // CONTEXT.md, «Cómo está organizada la empresa» → Operaciones de Almacén
    nombre: 'Operaciones de almacén',
    responsable: 'Ana Whitfield',
    cargo: 'Supervisa los almacenes de Los Ángeles y Zaragoza',
    cifra: '~70',
    cifraDetalle: 'operarios en los dos almacenes',
    // CONTEXT.md, «Dónde está la empresa hoy»
    situacion: 'Los dos almacenes no pueden ver el inventario del otro.',
  },
  {
    // CONTEXT.md, «Cómo está organizada la empresa» → Última Milla y Gestión de Transportistas
    nombre: 'Última milla y transportistas',
    responsable: 'Carlos Vega',
    cargo: 'Coordina transportistas, entregas e incidencias',
    cifra: '8',
    cifraDetalle: 'transportistas en los dos países',
    // CONTEXT.md, «Dónde está la empresa hoy»
    situacion: 'Los datos de rendimiento de los transportistas no existen en forma estructurada.',
  },
  {
    // CONTEXT.md, «Cómo está organizada la empresa» → Logística Inversa
    nombre: 'Logística inversa',
    responsable: 'Sofía Ramos',
    cargo: 'Lidera el equipo de devoluciones',
    cifra: '18–25 %',
    cifraDetalle: 'del volumen son devoluciones, según cliente y país; equipo de 5 personas',
    // CONTEXT.md, «Dónde está la empresa hoy»
    situacion: 'Las devoluciones se aprueban o rechazan una por una.',
  },
  {
    // CONTEXT.md, «Cómo está organizada la empresa» → Atención al Cliente
    nombre: 'Atención al cliente',
    responsable: 'Valentina Cruz',
    cargo: 'Gestiona a los agentes de Los Ángeles y Zaragoza',
    cifra: '15',
    cifraDetalle: 'agentes que atienden a marcas y consumidores finales',
    // CONTEXT.md, «Dónde está la empresa hoy»
    situacion: 'Los agentes responden consultando un documento de Word en Google Drive.',
  },
  {
    // CONTEXT.md, «Cómo está organizada la empresa» → Comercial y Relación con Clientes
    nombre: 'Comercial y relación con clientes',
    responsable: 'Miguel Torres',
    cargo: 'Lidera account managers y desarrollo de negocio',
    // CONTEXT.md, «Los departamentos y sus problemas» → Comercial y relación con clientes
    cifra: '8',
    cifraDetalle: 'personas: 4 account managers + 4 de desarrollo de negocio',
    // CONTEXT.md, «Los departamentos y sus problemas» → Comercial y relación con clientes
    situacion: 'No hay CRM: los account managers gestionan sus cuentas en hojas de cálculo personales.',
  },
  {
    // CONTEXT.md, «Cómo está organizada la empresa» → Tecnología
    nombre: 'Tecnología',
    responsable: 'Andrés Kim',
    cargo: 'CTO; lidera el equipo técnico desde Zaragoza',
    // CONTEXT.md, «Los departamentos y sus problemas» → Tecnología
    cifra: '7',
    cifraDetalle: 'personas en el equipo de Zaragoza',
    // CONTEXT.md, «Cómo está organizada la empresa» → Tecnología
    situacion: 'Cuando algo falla, el equipo se entera por un mensaje de WhatsApp.',
  },
  {
    // CONTEXT.md, «Cómo está organizada la empresa» → Dirección Ejecutiva
    nombre: 'Dirección ejecutiva',
    responsable: null,
    cargo: 'CEO, desde Los Ángeles',
    // CONTEXT.md, «Los departamentos y sus problemas» → Dirección Ejecutiva
    cifra: '3–4 h',
    cifraDetalle: 'por director cada semana para preparar el informe manual',
    // CONTEXT.md, «Dónde está la empresa hoy»
    situacion: 'Las decisiones se toman con un informe ensamblado a mano.',
  },
]
