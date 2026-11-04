export const WHATSAPP_NUMBER = "543644589416";
export const CONTACT_EMAIL = "compufix.sp@gmail.com";

export function waLink(texto: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
}

export const BUSINESS = {
  nombre: "Compufix.sp",
  ubicacion: "Presidencia Roque Sáenz Peña, Chaco.",
  horarios: "Lunes a viernes de 7:00 a 15:00 h.",
  email: CONTACT_EMAIL,
};

export type QuickAction = {
  label: string;
  intent?: string;
  href?: string;
};

export type ChatReply = {
  text: string;
  actions?: QuickAction[];
};

const HABLAR_CON_TECNICO: QuickAction = {
  label: "Hablar con un técnico",
  href: waLink("Hola Compufix! Vengo desde el chat de la web y quiero hablar con un técnico."),
};

export const MAIN_ACTIONS: QuickAction[] = [
  { label: "Ver servicios", intent: "servicios" },
  { label: "Presupuesto", intent: "presupuesto" },
  { label: "Horarios", intent: "horarios" },
  HABLAR_CON_TECNICO,
];

export const INTENTS: Record<string, ChatReply> = {
  servicios: {
    text: "Nos dividimos en cuatro frentes:\n\n• Desarrollo web a medida\n• Servicio técnico integral (reparación + upgrades)\n• Starlink y redes\n• Cámaras de seguridad CCTV\n\n¿Cuál te interesa?",
    actions: [
      { label: "Desarrollo web", intent: "desarrollo" },
      { label: "Servicio técnico", intent: "servicio-tecnico" },
      { label: "Starlink y Redes", intent: "starlink" },
      { label: "CCTV", intent: "cctv" },
    ],
  },
  desarrollo: {
    text: "Desarrollamos landing pages, sistemas a medida y tiendas con Next.js y WordPress, optimizadas para SEO local. Trabajamos 100% online para todo el país.\n\nSi querés, te paso un presupuesto inicial por WhatsApp.",
    actions: [
      {
        label: "Pedir presupuesto web",
        href: waLink("Hola Compufix! Quiero cotizar un proyecto de desarrollo web."),
      },
      { label: "Ver portfolio", href: "/portfolio" },
    ],
  },
  "servicio-tecnico": {
    text: "Hacemos diagnóstico, reparación y mantenimiento de PC, además de upgrades de SSD y RAM. Incluye limpieza física, cambio de pasta térmica, eliminación de virus y reinstalación de Windows o Linux con backup previo. Todos los trabajos tienen garantía.",
    actions: [
      {
        label: "Consultar por mi PC",
        href: waLink("Hola Compufix! Quiero consultar por el servicio técnico integral."),
      },
      { label: "Ver detalles", href: "/#detalle-servicio-tecnico" },
    ],
  },
  starlink: {
    text: "Instalamos antenas Starlink con montaje, orientación y cableado, y configuramos router, WiFi, redes cableadas y repetidores mesh para mejorar la cobertura y estabilidad de la conexión.",
    actions: [
      {
        label: "Cotizar Starlink",
        href: waLink("Hola Compufix! Quiero cotizar la instalación de Starlink y la configuración de mi red."),
      },
      { label: "Ver detalles", href: "/#detalle-starlink" },
    ],
  },
  cctv: {
    text: "Instalamos cámaras HD y DVRs con monitoreo remoto desde el celular, con cobertura pensada para tu casa o negocio.",
    actions: [
      {
        label: "Presupuestar CCTV",
        href: waLink("Hola Compufix! Quiero presupuestar una instalación de cámaras CCTV."),
      },
      { label: "Ver detalles", href: "/#detalle-cctv" },
    ],
  },
  presupuesto: {
    text: "El costo depende del equipo o del alcance del proyecto, así que preferimos verlo en detalle. Te paso con Leandro por WhatsApp y te arma un presupuesto sin cargo.",
    actions: [
      {
        label: "Pedir presupuesto",
        href: waLink("Hola Compufix! Quiero pedir un presupuesto."),
      },
      { label: "Ir al formulario", href: "/#contacto" },
    ],
  },
  horarios: {
    text: "Atendemos de lunes a viernes de 7:00 a 15:00 h. Para consultas de desarrollo web respondemos por WhatsApp.",
    actions: [HABLAR_CON_TECNICO],
  },
  ubicacion: {
    text: "Estamos en Presidencia Roque Sáenz Peña, Chaco. El servicio de desarrollo web es 100% online para todo el país.",
    actions: [HABLAR_CON_TECNICO],
  },
  garantia: {
    text: "Sí: los trabajos de hardware, limpieza y upgrades tienen garantía. Antes de tocar nada hacemos backup de tus archivos.",
    actions: [HABLAR_CON_TECNICO],
  },
  pagos: {
    text: "El servicio técnico se abona al finalizar. En desarrollo web trabajamos con un 50% de anticipo. Aceptamos efectivo, transferencias y billeteras virtuales.",
    actions: [HABLAR_CON_TECNICO],
  },
  datos: {
    text: "No perdés tus archivos: siempre hacemos una copia de seguridad antes de modificar o reinstalar el sistema.",
    actions: [HABLAR_CON_TECNICO],
  },
  humano: {
    text: "Te paso con Leandro, el técnico de Compufix, por WhatsApp. Contale qué necesitás y te responde a la brevedad.",
    actions: [
      {
        label: "Abrir WhatsApp",
        href: waLink("Hola Compufix! Vengo desde el chat de la web y quiero hacer una consulta."),
      },
      { label: "Ir al formulario", href: "/#contacto" },
    ],
  },
};

export const FALLBACK: ChatReply = {
  text: "No estoy seguro de haber entendido. Puedo ayudarte con servicios, presupuestos, horarios, garantías o derivarte con un técnico.",
  actions: MAIN_ACTIONS,
};

export function getIntent(id: string): ChatReply | undefined {
  return INTENTS[id];
}

const KEYWORDS: Record<string, string[]> = {
  presupuesto: [
    "precio",
    "precios",
    "cuanto",
    "cuanto sale",
    "costo",
    "costos",
    "presupuesto",
    "cotizar",
    "cotizacion",
    "tarifa",
  ],
  "servicio-tecnico": [
    "mantenimiento",
    "reparacion",
    "reparar",
    "limpieza",
    "pc",
    "pcs",
    "notebook",
    "computadora",
    "virus",
    "formatear",
    "lenta",
    "lento",
    "calienta",
    "pasta termica",
    "servicio tecnico",
    "upgrade",
    "ssd",
    "ram",
    "memoria",
    "disco",
    "gamer",
    "ampliar",
    "optimizar",
    "optimizacion",
  ],
  starlink: [
    "starlink",
    "antena",
    "antenas",
    "satelital",
    "satelite",
    "internet",
    "wifi",
    "wi fi",
    "red",
    "redes",
    "router",
    "mesh",
    "repetidor",
    "repetidores",
    "cableado",
    "conexion",
    "velocidad",
    "cobertura",
  ],
  desarrollo: [
    "desarrollo",
    "programa",
    "web",
    "pagina",
    "landing",
    "sistema",
    "aplicacion",
    "app",
    "wordpress",
    "seo",
    "tienda",
    "ecommerce",
  ],
  cctv: [
    "cctv",
    "camara",
    "camaras",
    "seguridad",
    "vigilancia",
    "dvr",
    "monitoreo",
    "videovigilancia",
  ],
  garantia: ["garantia", "garantias", "falla", "devolucion"],
  pagos: [
    "pago",
    "pagos",
    "pagar",
    "efectivo",
    "transferencia",
    "tarjeta",
    "mercado pago",
    "billetera",
    "anticipo",
    "cuotas",
  ],
  datos: ["archivo", "archivos", "backup", "datos", "documentos", "informacion"],
  horarios: [
    "horario",
    "horarios",
    "abren",
    "abierto",
    "atienden",
    "atencion",
    "hora",
    "cuando",
  ],
  ubicacion: [
    "donde",
    "ubicacion",
    "direccion",
    "local",
    "taller",
    "chaco",
    "saenz pena",
  ],
  servicios: ["servicio", "servicios", "que hacen", "ofrecen", "trabajos"],
  humano: [
    "hablar",
    "humano",
    "persona",
    "tecnico",
    "leandro",
    "contacto",
    "whatsapp",
    "llamar",
    "telefono",
  ],
};

const PRIORIDAD = [
  "presupuesto",
  "servicio-tecnico",
  "starlink",
  "desarrollo",
  "cctv",
  "garantia",
  "pagos",
  "datos",
  "horarios",
  "ubicacion",
  "servicios",
  "humano",
];

export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function escaparRegex(valor: string): string {
  return valor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function contiene(texto: string, keyword: string): boolean {
  return new RegExp(
    `(^|[^a-z0-9])${escaparRegex(keyword)}([^a-z0-9]|$)`,
  ).test(texto);
}

export function resolveReply(entrada: string): ChatReply {
  const texto = normalizar(entrada).trim();
  if (!texto) return FALLBACK;

  let mejorId = "";
  let mejorPuntaje = 0;

  for (const id of PRIORIDAD) {
    const puntaje = (KEYWORDS[id] ?? []).reduce(
      (total, keyword) => total + (contiene(texto, keyword) ? 1 : 0),
      0,
    );
    if (puntaje > mejorPuntaje) {
      mejorPuntaje = puntaje;
      mejorId = id;
    }
  }

  if (mejorId) return INTENTS[mejorId] ?? FALLBACK;

  if (/\b(hola|buenas|buen dia|hey|que tal)\b/.test(texto)) {
    return {
      text: "¡Hola! Soy el asistente virtual de Compufix. Puedo contarte sobre servicios, horarios, garantías o pasarte con un técnico. ¿Qué necesitás?",
      actions: MAIN_ACTIONS,
    };
  }

  if (/\b(gracias|genial|perfecto|listo|dale)\b/.test(texto)) {
    return {
      text: "¡De nada! Si te surge otra duda, escribime por acá o seguimos por WhatsApp.",
      actions: [HABLAR_CON_TECNICO],
    };
  }

  return FALLBACK;
}
