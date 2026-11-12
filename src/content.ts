/**
 * Todo el texto, URLs, placeholders y rutas de medios de la landing.
 * Los datos pendientes van entre corchetes y se muestran tal cual.
 * Los titulares se guardan sin el punto final: el componente lo añade en terracota.
 */

/** Rutas relativas a `public/media/`, sin extensión en los videos.
 *  Al reemplazar un video, publicarlo con sufijo de versión (`*.v2`) y cambiar aquí la ruta. */
export const media = {
  hero: 'hero/tres-arboles-loop',
  heroPoster: 'hero/tres-arboles-poster.webp',
  strip: 'strips/franja-bits-loop',
  // Temporal: reutiliza el video de "b / productos" hasta tener el definitivo.
  cardProcesos: 'cards/card-procesos-loop',
  cardProductos: 'cards/card-productos-loop',
  projectAutonomia: 'projects/autonomia-loop',
} as const

/** Destino de los enlaces cuya URL aún no se conoce. */
const PENDING_HREF = '#contacto'

export const brand = {
  mark: '101',
  name: 'Tres Árboles',
} as const

export const nav = {
  label: 'Secciones',
  links: [
    { index: '01', label: 'nosotros', href: '#nosotros' },
    { index: '10', label: 'proyectos', href: '#proyectos' },
    { index: '11', label: 'contacto', href: '#contacto' },
  ],
  cta: { label: 'hablemos_', href: '#contacto' },
} as const

export const hero = {
  id: 'inicio',
  kicker: '// automatización con inteligencia artificial',
  title: 'Tres\nÁrboles',
  titleLabel: 'Tres Árboles',
  slogan: 'Automatización que echa raíces',
  description:
    'Construimos automatización con inteligencia artificial para empresas: procesos que corren solos y productos con IA.',
  primary: { label: 'hablemos', href: '#contacto' },
  secondary: { label: 'ver proyectos', href: '#proyectos' },
  services: [
    { index: 'a', name: 'procesos', text: 'Flujos inteligentes que operan solos.' },
    { index: 'b', name: 'productos', text: 'Productos con IA en su núcleo.' },
  ],
  figure: {
    caption: 'FIG. 01 — TRES ÁRBOLES, UNA RAÍZ',
    coords: 'x 0101 · y 1101',
    videoLabel:
      'Animación: tres árboles hechos de ceros y unos que crecen de una misma raíz.',
  },
} as const

export const about = {
  id: 'nosotros',
  index: '01',
  title: 'Construimos automatización con IA para empresas',
  body: 'Tres Árboles es una empresa especializada en construir automatización con inteligencia artificial para empresas: automatizamos sus procesos y desarrollamos productos con IA.',
  cards: [
    {
      index: 'a',
      tag: 'procesos',
      title: 'Automatización de procesos',
      text: 'Convertimos tareas manuales y repetitivas en flujos inteligentes que operan solos.',
      video: media.cardProcesos,
    },
    {
      index: 'b',
      tag: 'productos',
      title: 'Productos con IA',
      text: 'Diseñamos y desarrollamos productos que tienen la inteligencia artificial en su núcleo.',
      video: media.cardProductos,
    },
  ],
} as const

export const projects = {
  id: 'proyectos',
  index: '10',
  title: 'Lo que hemos hecho crecer',
  featured: {
    meta: 'proyecto 01 · agente de ia',
    name: 'Autonom IA',
    description:
      'AutonomIA es un agente de inteligencia artificial que ejecuta tareas de forma autónoma dentro de los procesos de una empresa.',
    facts: [
      { key: 'tipo', value: 'agente de ia' },
      { key: 'estado', value: '[por definir]' },
    ],
    cta: { label: 'ver proyecto', href: PENDING_HREF },
    video: media.projectAutonomia,
    videoLabel:
      'Animación de Autonom IA: las letras IA, dibujadas con ceros y unos, se transforman en dos engranajes y vuelven.',
  },
} as const

export interface SocialLink {
  index: string
  network: string
  /** Texto visible: URL o usuario, o el placeholder entre corchetes. */
  value: string
  /** URL externa; `null` mientras esté pendiente (el enlace apunta a `pendingHref`). */
  url: string | null
}

const socialLinks: readonly SocialLink[] = [
  { index: '01', network: 'LinkedIn', value: '[url de linkedin]', url: null },
  { index: '10', network: 'Instagram', value: '[usuario de instagram]', url: null },
]

export const contact = {
  id: 'contacto',
  index: '11',
  title: 'Hablemos',
  lead: '¿Tienes un proceso que debería correr solo? Encuéntranos en nuestras redes.',
  links: socialLinks,
  pendingHref: PENDING_HREF,
} as const

export const footer = {
  bits: [
    {
      label: 'T1',
      bits: '101011001010111110111000011010010011001110010101110110110101100110111001100110111111111110101000000110111001011100000000111011011000011001110010110011011110100010001010011110101000011101001110101101110100111010101011000101000111011111101110',
    },
    {
      label: 'T0',
      bits: '011011001101011110100110001100001000110011011000001101001100010011010101100001000110101000001000010111100011000111010000001110100100100001010100011000001001011110000001101001100110110010000011010111101100101000110111001101100111000011010000',
    },
  ],
  name: 'Tres Árboles',
  note: 'automatización con ia · © mmxxvi',
} as const

/** Cadena fija para las líneas de bits de 8px bajo enlaces y filas. */
export const BIT_LINE =
  '100000010110100010110010101101110011100001001000111111010101101001100001100100101101010100100011'
