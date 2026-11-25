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
  description: string;
  icon: string;
  files: ResourceFile[];
};

export const resourceCategories: ResourceCategory[] = [
  {
    id: 'presentaciones',
    title: 'Presentaciones PPTX',
    description: 'Material visual para estudios bíblicos y conferencias.',
    icon: '📊',
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
    title: 'Libros y PDF',
    description: 'Guías de lectura y acceso a libros clásicos gratuitos.',
    icon: '📚',
    files: [
      {
        id: 'conflicto-guia',
        title: 'El Conflicto de los Siglos — Guía de lectura',
        description: 'Plan temático para estudiar el libro.',
        href: '/recursos/libros/el-conflicto-de-los-siglos-guia.pdf',
        format: 'PDF',
      },
      {
        id: 'deseado-guia',
        title: 'El Deseado de Todas las Gentes — Guía de lectura',
        description: 'Ruta de 5 semanas sobre la vida de Jesús.',
        href: '/recursos/libros/el-deseado-de-todas-las-gentes-guia.pdf',
        format: 'PDF',
      },
      {
        id: 'camino-guia',
        title: 'El Camino a Cristo — Guía de lectura',
        description: 'Plan de 7 días con preguntas de aplicación.',
        href: '/recursos/libros/el-camino-a-cristo-guia.pdf',
        format: 'PDF',
      },
      {
        id: 'egw-writings',
        title: 'Leer libros completos (EGW Writings)',
        description: 'Biblioteca gratuita oficial de Elena G. de White.',
        href: 'https://egwwritings.org/?lang=es',
        format: 'LINK',
        external: true,
      },
    ],
  },
  {
    id: 'guias',
    title: 'Guías de Estudio',
    description: 'Cuestionarios y guías paso a paso para grupos de estudio.',
    icon: '📝',
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
];
