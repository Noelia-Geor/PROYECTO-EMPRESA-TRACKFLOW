export const siteContent = {
  brand: {
    first: 'Track',
    second: 'Flow',
  },
  // Anclas de navegación de la página corporativa.
  navigation: [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Cómo trabajamos', href: '#como-trabajamos' },
    { label: 'Dónde estamos', href: '#donde-estamos' },
  ],
  accessibility: {
    skipToContent: 'Saltar al contenido',
    primaryNavigation: 'Navegación principal',
    homeLink: 'TrackFlow, inicio',
    stats: 'TrackFlow en cifras',
  },
  hero: {
    // CONTEXT.md — introducción y «Cómo está organizada la empresa»: almacenes en Los Ángeles y Zaragoza.
    eyebrow: 'LOS ÁNGELES ⇄ ZARAGOZA',
    // CONTEXT.md — introducción: llevar los productos desde el almacén hasta la puerta del cliente.
    title: 'De la estantería a la puerta del cliente.',
    // CONTEXT.md — introducción: almacenamiento, preparación, envío y devoluciones para marcas de e-commerce.
    description:
      'Almacenamos inventario para marcas de e-commerce, preparamos y empaquetamos sus pedidos, los enviamos con una red de transportistas y gestionamos las devoluciones.',
    action: 'Descubre cómo trabajamos',
    // Texto alternativo descriptivo; la fotografía no representa una sede concreta de TrackFlow.
    imageAlt: 'Estanterías de un almacén logístico',
    // CONTEXT.md — «Operaciones de almacén».
    imageCaption: 'Operaciones de almacén',
    // CONTEXT.md — introducción, «Operaciones de almacén», «Última Milla y Gestión de Transportistas» y «Logística Inversa».
    journey: [
      { title: 'Pedido recibido', subtitle: 'Marca de e-commerce' },
      { title: 'Almacén', subtitle: 'Los Ángeles · Zaragoza' },
      { title: 'Picking y empaquetado', subtitle: 'Preparación del pedido' },
      { title: 'Transportista', subtitle: 'UPS · FedEx · MRW · SEUR' },
      { title: 'Entregado', subtitle: 'Puerta del cliente' },
      { title: 'Devolución', subtitle: 'Logística inversa' },
    ],
  },
  stats: [
    // CONTEXT.md — introducción: almacenes en Los Ángeles y Zaragoza.
    { value: '2', label: 'almacenes' },
    // CONTEXT.md — «Última Milla y Gestión de Transportistas».
    { value: '8', label: 'transportistas' },
    // CONTEXT.md — introducción: Estados Unidos y España.
    { value: '2', label: 'países' },
    // CONTEXT.md — introducción: fundada en 2009.
    { value: '2009', label: 'fundación' },
    // CONTEXT.md — introducción: unos 130 empleados.
    { value: '~130', label: 'personas' },
  ],
  promise: {
    eyebrow: 'Por qué TrackFlow',
    // CONTEXT.md — introducción: las marcas son buenas haciendo y vendiendo productos, no haciéndolos llegar a la puerta del cliente.
    title: 'Tú vendes. Nosotros lo llevamos hasta la puerta.',
    brand: {
      label: 'Tu marca',
      text: 'Hace y vende buenos productos.',
    },
    // CONTEXT.md — introducción: almacena, prepara y empaqueta, envía y gestiona devoluciones.
    trackflow: {
      label: 'TrackFlow',
      items: ['Almacena tu inventario', 'Prepara y empaqueta los pedidos', 'Los envía con su red de transportistas', 'Gestiona las devoluciones'],
    },
    // CONTEXT.md — introducción: toda la operación, del pedido a la entrega o devolución, es responsabilidad de TrackFlow.
    note: 'Del pedido a la entrega o la devolución, la operación es responsabilidad de TrackFlow.',
  },
  // CONTEXT.md — «Última milla y gestión de transportistas»: UPS, FedEx y DHL en EE. UU.; MRW, SEUR y DHL en España, más dos locales.
  carriers: {
    title: 'Red de 8 transportistas en dos países',
    groups: [
      { country: 'Estados Unidos', names: ['UPS', 'FedEx', 'DHL'] },
      { country: 'España', names: ['MRW', 'SEUR', 'DHL'] },
    ],
    extra: '+ 2 transportistas locales',
  },
  services: {
    eyebrow: 'Qué hacemos',
    title: 'La operación logística, de principio a fin.',
    // CONTEXT.md — introducción y «Cómo está organizada la empresa».
    description:
      'Desde que se hace un pedido hasta que se entrega o se devuelve, la operación logística queda en manos de TrackFlow.',
    items: [
      {
        // CONTEXT.md — «Operaciones de almacén» e introducción.
        title: 'Almacenamiento y preparación',
        description:
          'Almacenamos el inventario de las marcas, recogemos los productos y preparamos y empaquetamos cada pedido.',
        // CONTEXT.md — «Operaciones de almacén»: ~70 operarios + 2 responsables de almacén.
        fact: '~70 operarios · 2 almacenes',
      },
      {
        // CONTEXT.md — «Última Milla y Gestión de Transportistas».
        title: 'Envíos de última milla',
        description:
          'Coordinamos los envíos a través de una red de transportistas en Estados Unidos y España.',
        // CONTEXT.md — «Última milla y gestión de transportistas»: 6 coordinadores logísticos, 8 transportistas.
        fact: '6 coordinadores · 8 transportistas',
      },
      {
        // CONTEXT.md — «Logística Inversa».
        title: 'Logística inversa',
        description:
          'Gestionamos lo que ocurre cuando un producto regresa y cada decisión de su devolución.',
        // CONTEXT.md — «Logística inversa»: equipo de 5 personas; devoluciones 18–25 % del volumen.
        fact: 'Devoluciones: 18–25 % del volumen',
      },
      {
        // CONTEXT.md — «Atención al Cliente».
        title: 'Atención a marcas y destinatarios',
        description:
          'Atendemos consultas de las marcas que contratan el servicio y de las personas que reciben sus paquetes.',
        // CONTEXT.md — «Experiencia del cliente»: 15 agentes; email, WhatsApp y teléfono.
        fact: '15 agentes · email, WhatsApp y teléfono',
      },
    ],
  },
  process: {
    eyebrow: 'Cómo trabajamos',
    title: 'Un recorrido conectado.',
    // CONTEXT.md — introducción: TrackFlow responde por la operación de pedido a entrega o devolución.
    description:
      'Cada pedido pasa por almacenamiento, preparación, envío y entrega o devolución.',
    steps: [
      {
        // CONTEXT.md — introducción: la operación empieza cuando se hace un pedido.
        title: 'Pedido',
        description:
          'Cuando se hace un pedido a una marca, comienza la operación logística de TrackFlow.',
      },
      {
        // CONTEXT.md — «Operaciones de almacén» e introducción.
        title: 'Preparación en almacén',
        description:
          'El producto se recoge del inventario, se prepara y se empaqueta para su envío.',
      },
      {
        // CONTEXT.md — «Última Milla y Gestión de Transportistas».
        title: 'Envío con transportista',
        description:
          'El paquete sale del almacén a través de la red de transportistas de TrackFlow.',
      },
      {
        // CONTEXT.md — introducción y «Logística Inversa».
        title: 'Entrega o devolución',
        description:
          'TrackFlow gestiona la operación hasta la entrega o, si el producto regresa, su devolución.',
      },
    ],
  },
  locations: {
    eyebrow: 'Dónde estamos',
    title: 'Dos almacenes. Dos países.',
    // CONTEXT.md — introducción: almacenes en Los Ángeles y Zaragoza.
    description:
      'TrackFlow opera en Estados Unidos y España desde sus almacenes en Los Ángeles y Zaragoza.',
    items: [
      {
        // CONTEXT.md — introducción: almacén en Los Ángeles, Estados Unidos.
        city: 'Los Ángeles',
        country: 'Estados Unidos',
        // CONTEXT.md — introducción: TrackFlow se fundó en Los Ángeles en 2009.
        role: 'Almacén · origen de TrackFlow',
      },
      {
        // CONTEXT.md — introducción: almacén en Zaragoza, España.
        city: 'Zaragoza',
        country: 'España',
        // CONTEXT.md — «Cómo está organizada la empresa»: oficina de tecnología en Zaragoza.
        role: 'Almacén · oficina de tecnología',
      },
    ],
  },
  contact: {
    eyebrow: 'Para marcas de e-commerce',
    // CONTEXT.md — introducción: TrackFlow lleva inventario desde el pedido hasta la entrega o devolución.
    // CONTEXT.md — introducción: Estados Unidos y España; del pedido a la entrega.
    title: 'Del pedido a la puerta, en dos países.',
    // CONTEXT.md — introducción: almacenamiento, preparación, envío y devoluciones para marcas.
    description:
      'TrackFlow almacena tu inventario, prepara y envía tus pedidos y gestiona las devoluciones. Una operación logística completa para tu marca.',
    action: 'Descubre cómo trabajamos',
  },
  footer: {
    // CONTEXT.md — introducción: almacenes en Los Ángeles y Zaragoza.
    locations: 'Los Ángeles · Zaragoza',
    copyright: '© TrackFlow',
  },
} as const
