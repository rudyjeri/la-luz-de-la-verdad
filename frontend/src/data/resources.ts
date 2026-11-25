export type ResourceFile = {
  id: string;
  title: string;
  description?: string;
  /** Ruta pública bajo /recursos/... o URL externa */
  href: string;
  format: 'PDF' | 'PPTX' | 'LINK';
  sizeLabel?: string;
  external?: boolean;
};

export type ResourceCategory = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  audience: string;
  files: ResourceFile[];
};

export const resourceCategories: ResourceCategory[] = [
  {
    id: 'guias',
    title: 'Guías de estudio',
    shortTitle: 'Guías',
    description: 'Lecciones paso a paso para estudio personal o en grupo.',
    audience: 'Para estudiar',
    files: [
      {
        id: 'daniel',
        title: 'Curso Daniel',
        description: '5 lecciones con lecturas y preguntas.',
        href: '/recursos/guias/curso-daniel.pdf',
        format: 'PDF',
      },
      {
        id: 'apocalipsis',
        title: 'Curso Apocalipsis',
        description: '6 lecciones centradas en Cristo y la esperanza.',
        href: '/recursos/guias/curso-apocalipsis.pdf',
        format: 'PDF',
      },
      {
        id: 'fe-jesus',
        title: 'La Fe de Jesús',
        description: 'Justificación por la fe y obediencia en amor.',
        href: '/recursos/guias/la-fe-de-jesus.pdf',
        format: 'PDF',
      },
    ],
  },
  {
    id: 'presentaciones',
    title: 'Presentaciones y bosquejos',
    shortTitle: 'Presentaciones',
    description: 'Material visual y esquemas para predicar o enseñar.',
    audience: 'Para predicar',
    files: [
      {
        id: 'idolatria',
        title: 'Idolatría y Santería',
        description: 'Presentación completa en PowerPoint.',
        href: '/recursos/presentaciones/idolatria-y-santeria.pptx',
        format: 'PPTX',
        sizeLabel: '≈ 19 MB',
      },
      {
        id: 'sabado',
        title: 'El Sábado Cristiano',
        description: 'Bosquejo PDF listo para armar tu presentación.',
        href: '/recursos/presentaciones/el-sabado-cristiano.pdf',
        format: 'PDF',
      },
      {
        id: 'segunda-venida',
        title: 'La Segunda Venida',
        description: 'Bosquejo PDF con textos clave y estructura.',
        href: '/recursos/presentaciones/la-segunda-venida.pdf',
        format: 'PDF',
      },
    ],
  },
  {
    id: 'libros',
    title: 'Libros y lecturas',
    shortTitle: 'Libros',
    description: 'Guías de lectura y acceso a obras clásicas gratuitas.',
    audience: 'Para leer',
    files: [
      {
        id: 'camino-guia',
        title: 'El Camino a Cristo',
        description: 'Guía de lectura · plan de 7 días.',
        href: '/recursos/libros/el-camino-a-cristo-guia.pdf',
        format: 'PDF',
      },
      {
        id: 'deseado-guia',
        title: 'El Deseado de Todas las Gentes',
        description: 'Guía de lectura · 5 semanas sobre la vida de Jesús.',
        href: '/recursos/libros/el-deseado-de-todas-las-gentes-guia.pdf',
        format: 'PDF',
      },
      {
        id: 'conflicto-guia',
        title: 'El Conflicto de los Siglos',
        description: 'Guía de lectura · plan temático.',
        href: '/recursos/libros/el-conflicto-de-los-siglos-guia.pdf',
        format: 'PDF',
      },
      {
        id: 'egw-writings',
        title: 'Biblioteca EGW Writings',
        description: 'Leer los libros completos en el sitio oficial.',
        href: 'https://egwwritings.org/?lang=es',
        format: 'LINK',
        external: true,
      },
    ],
  },
];

export function totalResourceCount(): number {
  return resourceCategories.reduce((n, c) => n + c.files.length, 0);
}
