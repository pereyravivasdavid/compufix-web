export type ProjectImage = {
  kind: "image";
  src: string;
  alt: string;
};

export type ProjectReel = {
  kind: "reel";
  src: string;
  poster: string;
  alt: string;
};

export type ProjectMedia = ProjectImage | ProjectReel;

export type ProjectFormat = "desktop" | "mobile";

export type Project = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  features: string[];
  status: string;
  format: ProjectFormat;
  media: ProjectMedia[];
};

function capturas(
  base: string,
  archivos: string[],
  etiqueta: string,
): ProjectImage[] {
  return archivos.map((archivo, i) => ({
    kind: "image",
    src: `${base}/${archivo}`,
    alt: `${etiqueta} - captura ${i + 1}`,
  }));
}

export const PROJECTS: Project[] = [
  {
    id: "centerfitness",
    index: "01",
    name: "Gestión de miembros GYM",
    tagline: "A medida para Centerfitness",
    description:
      "Sistema de gestión de miembros y de acceso para un gimnasio. Centraliza socios, cuotas, ingresos y accesos en una única herramienta local.",
    tech: ["Java", "MySQL"],
    features: [
      "Alta, baja y modificación de miembros",
      "Cuotas con vencimientos, promociones y descuentos",
      "Pantalla de acceso por DNI y control de ingresos",
      "Control de gastos y balance general",
      "Backup y restore de la base de datos",
    ],
    status: "Proyecto a medida",
    format: "desktop",
    media: [
      {
        kind: "reel",
        src: "https://www.instagram.com/reels/DZEQLQYsHNM/",
        poster: "/portfolio/centerfitness/reel-cover.jpg",
        alt: "Reel de Gestión de miembros GYM",
      },
      ...capturas(
        "/portfolio/centerfitness",
        [
          "1.png",
          "2.png",
          "3.png",
          "4.png",
          "5.png",
          "6.png",
          "7.png",
          "9.webp",
          "10.png",
          "gym_acceso.png",
          "gym_ok.png",
          "gym_rojo.webp",
        ],
        "Centerfitness",
      ),
    ],
  },
  {
    id: "froxi-pos",
    index: "02",
    name: "Froxi-POS",
    tagline: "Punto de venta para heladería",
    description:
      "POS local para heladería con cobros, control de stock y reportes. Pensado para operar rápido en mostrador y mantener el inventario al día.",
    tech: ["React", "Tauri", "SQLite"],
    features: [
      "Caja con lector de código de barras, cobros y vuelto",
      "Inventario con control de stock y gestión de productos y categorías",
      "Reportes de recaudación, stock bajo, faltantes y más vendidos",
      "Respaldo automático de la base de datos y respaldo manual",
    ],
    status: "Software a medida",
    format: "desktop",
    media: capturas(
      "/portfolio/froxi-pos",
      ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"],
      "Froxi-POS",
    ),
  },
  {
    id: "sistema-vales",
    index: "03",
    name: "Emisión y gestión de órdenes",
    tagline: "Vales para sindicato",
    description:
      "Plataforma web unificada para la emisión y gestión de vales de un sindicato, con comercios adheridos y varias sucursales en distintas ciudades.",
    tech: ["React", "Next.js", "Supabase"],
    features: [
      "Órdenes con QR y validación desde el portal de comercios",
      "Portal de comercios: escaneo, balance y exportación a Excel",
      "Usuarios admin y empleado, emisión y anulación de órdenes",
      "Límites por afiliado, historial y directorio de comercios",
      "Gestión de usuarios y restablecimiento de contraseñas",
    ],
    status: "Software a medida",
    format: "desktop",
    media: capturas(
      "/portfolio/sistema-vales",
      [
        "1.webp",
        "2.webp",
        "3.webp",
        "4.webp",
        "5.webp",
        "6.webp",
        "7.webp",
        "8.webp",
        "9.webp",
      ],
      "Sistema de vales",
    ),
  },
  {
    id: "stoxito",
    index: "04",
    name: "Stoxito",
    tagline: "Stock y presupuestos",
    description:
      "App web para control de stock y emisión de presupuestos y remitos, adaptable a cualquier rubro. Simple para el día a día, completa para crecer.",
    tech: ["React", "Next.js", "Supabase"],
    features: [
      "Control de stock y gestión de productos",
      "Emisión de presupuestos y remitos",
      "Gestión de clientes y productos",
      "Documentos listos para compartir",
    ],
    status: "A medida",
    format: "mobile",
    media: capturas(
      "/portfolio/stoxito",
      ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"],
      "Stoxito",
    ),
  },
];
