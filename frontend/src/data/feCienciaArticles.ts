export type FeCienciaTopic =
  | 'creacion-evolucion'
  | 'evidencias-diluvio'
  | 'biblia-dinosaurios'
  | 'historicidad-biblia';

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  quote?: { text: string; ref?: string };
}

export interface KeyVerse {
  text: string;
  ref: string;
}

export interface FeCienciaArticle {
  slug: string;
  topic: FeCienciaTopic;
  title: string;
  /** Título SEO (claro para buscadores); si falta, se usa title */
  seoTitle?: string;
  description: string;
  image: string;
  tag: string;
  date: string;
  /** Versículo clave del artículo (visible + meta) */
  keyVerse: KeyVerse;
  sections: ArticleSection[];
}

export const topicMeta: Record<
  FeCienciaTopic,
  { path: string; label: string }
> = {
  'creacion-evolucion': { path: '/creacion-evolucion', label: 'Creación o Evolución' },
  'evidencias-diluvio': { path: '/evidencias-diluvio', label: 'Evidencias del Diluvio' },
  'biblia-dinosaurios': { path: '/biblia-dinosaurios', label: 'La Biblia y los Dinosaurios' },
  'historicidad-biblia': { path: '/historicidad-biblia', label: 'La Historicidad de la Biblia' },
};

export const feCienciaArticles: FeCienciaArticle[] = [
  {
    slug: 'creacion-seis-dias',
    topic: 'creacion-evolucion',
    title: 'La creación en seis días: ¿literal o simbólica?',
    seoTitle: 'Creación en seis días: ¿literal o simbólica? — Génesis 1',
    description:
      'Examina cómo las leyes de la naturaleza, la complejidad del universo y las características biológicas son evidencia de un Creador.',
    image: '/images/criacionismo.jpg',
    tag: 'Fe y Ciencia',
    date: '05 Marzo 2025',
    keyVerse: {
      text: 'En el principio creó Dios los cielos y la tierra.',
      ref: 'Génesis 1:1',
    },
    sections: [
      {
        paragraphs: [
          'El relato de Génesis presenta a Dios creando el cielo, la tierra, el mar y todo lo que en ellos hay en seis días, seguidos del séptimo día de reposo. Para muchos lectores modernos surge la pregunta: ¿debemos entender esos días como períodos literales de 24 horas o como marcos literarios que expresan verdades teológicas?',
          'La Biblia no presenta la creación como un mito poético sin anclaje histórico. El mismo relato introduce genealogías, fechas y un mundo real en el que actúan personajes concretos. Cuando el texto dice “y fue la tarde y la mañana, un día”, utiliza la misma unidad temporal que el autor espera que el lector comprenda en su vida cotidiana.',
        ],
      },
      {
        heading: 'Luz antes del sol',
        paragraphs: [
          'El orden de la creación —luz el primer día y luminares el cuarto— muestra que el Creador no depende de las fuentes naturales que después establece. Esa secuencia refuerza la idea de un Dios soberano que define el tiempo y las leyes, no de un relato improvisado.',
          'Leer los días de forma simbólica suele apoyarse en la necesidad de conciliar el texto con modelos evolutivos de larga duración. Sin embargo, cuando la Escritura es clara en su lenguaje ordinario, el principio hermenéutico prudente es no forzar un sentido figurado sin evidencia interna contundente.',
        ],
      },
      {
        heading: 'Implicaciones para la fe',
        paragraphs: [
          'Si Dios realmente habló y existió lo que no existía, el origen del hombre no es producto del azar sino del propósito divino. Eso fundamenta el valor de la vida, la responsabilidad moral y la esperanza de una restauración final de la creación.',
          'La fe y la ciencia observacional pueden dialogar: la complejidad del ADN, el ajuste fino del universo y el surgimiento abrupto de formas en el registro fósil invitan a considerar un diseño inteligente más que un proceso ciego.',
        ],
      },
    ],
  },
  {
    slug: 'complejidad-irreducible',
    topic: 'creacion-evolucion',
    title: 'Complejidad Irreducible: ¿Diseño o Azar?',
    seoTitle: 'Complejidad irreducible: ¿diseño o azar? — Romanos 1:20',
    description: 'Un análisis de cómo los sistemas biológicos complejos apuntan a una inteligencia superior.',
    image: '/images/the-creator-chris-brazelton.jpg',
    tag: 'Ciencia',
    date: '12 Feb 2025',
    keyVerse: {
      text: 'Porque las cosas invisibles de él, su eterno poder y deidad, se hacen claramente visibles desde la creación del mundo, siendo entendidas por medio de las cosas hechas.',
      ref: 'Romanos 1:20',
    },
    sections: [
      {
        paragraphs: [
          'Un sistema es irreduciblemente complejo cuando requiere varias partes coordinadas para funcionar; si falta una, el conjunto deja de cumplir su función. El flagelo bacteriano, la maquinaria molecular de copiado del ADN o la cascada de coagulación sanguínea son ejemplos frecuentemente citados.',
          'Los modelos darwinianos clásicos explican la variación gradual, pero enfrentan dificultades cuando el salto funcional exige múltiples componentes simultáneos. ¿Cómo se selecciona positivamente un sistema incompleto que aún no aporta ventaja?',
        ],
      },
      {
        heading: 'Información y propósito',
        paragraphs: [
          'La información codificada en el genoma se parece más a un lenguaje que a un patrón aleatorio. Donde hay código, gramática y mensaje, la experiencia humana asocia mente y propósito.',
          'Reconocer diseño no detiene la investigación: impulsa preguntas sobre la ingeniería biológica, la robustez de los sistemas vivos y los límites de los mecanismos puramente aleatorios.',
        ],
      },
    ],
  },
  {
    slug: 'registro-fosil-creacion',
    topic: 'creacion-evolucion',
    title: 'El Registro Fósil y la Creación',
    seoTitle: 'El registro fósil y la creación — perspectiva bíblica',
    description: '¿Qué dicen realmente los fósiles sobre nuestros orígenes? Una perspectiva bíblica y científica.',
    image: '/images/f.elconfidencial.com_original_a1c_0ef_a20_a1c0efa203e3c23e63e7374c091d593c.jpg',
    tag: 'Arqueología',
    date: '20 Ene 2025',
    keyVerse: {
      text: 'Por tanto, como el pecado entró en el mundo por un hombre, y por el pecado la muerte, así la muerte pasó a todos los hombres.',
      ref: 'Romanos 5:12',
    },
    sections: [
      {
        paragraphs: [
          'El registro fósil muestra formas de vida muy distintas apareciendo de manera relativamente abrupta en estratos, con estasis prolongada y escasos ejemplos inequívocos de transiciones graduales entre grandes grupos.',
          'Los modelos creacionistas catastrofistas interpretan muchas capas sedimentarias como resultado de eventos de rápida depositación —incluido un diluvio global— que enterraron organismos y generaron el patrón que observamos.',
        ],
      },
      {
        heading: 'Lectura responsable',
        paragraphs: [
          'No todo fósil es evidencia directa de creación o evolución; la interpretación depende del marco histórico asumido. Aun así, preguntar por el significado del registro es legítimo y necesario.',
          'La Biblia describe la muerte y la degradación como consecuencias posteriores al pecado, no como parte del diseño original. Eso ofrece un marco moral y teológico para entender un mundo con sufrimiento, extinciones y restos fosilizados.',
        ],
      },
    ],
  },
  {
    slug: 'culturas-diluvio',
    topic: 'evidencias-diluvio',
    title: 'Más de 300 Culturas Recuerdan un Gran Diluvio',
    seoTitle: 'Más de 300 culturas recuerdan un gran diluvio — Génesis 7',
    description:
      'Una exploración de cómo los relatos de inundaciones globales en diversas civilizaciones respaldan el registro bíblico.',
    image: '/images/antena-historia-podcast-diluvio-universal (1).jpg',
    tag: 'Historia',
    date: '02 Feb 2025',
    keyVerse: {
      text: 'Y las aguas prevalecieron en gran manera sobre la tierra, y cubrieron todos los montes altos que había debajo de todos los cielos.',
      ref: 'Génesis 7:19',
    },
    sections: [
      {
        paragraphs: [
          'Relatos de una gran inundación aparecen en tradiciones de pueblos de Mesopotamia, América, Asia y Oceanía. Aunque los detalles varían, la memoria común de un cataclismo acuático es notable.',
          'Si un diluvio global realmente ocurrió, esperaríamos ecos culturales transmitidos por los descendientes de los sobrevivientes. La diversidad de versiones no invalida un evento original; puede reflejar distorsión oral con el tiempo.',
        ],
      },
      {
        heading: 'El relato bíblico',
        paragraphs: [
          'Génesis presenta el diluvio como juicio y renovación: Dios preserva a Noé y su familia en el arca. La narrativa no es alegoría vacía, sino historia con geografía, genealogías y consecuencias posteriores.',
          'Comparar tradiciones con cuidado evita forzar paralelos, pero fortalece la confianza en que la Biblia habla de un acontecimiento que dejó huella en la humanidad.',
        ],
      },
    ],
  },
  {
    slug: 'fosiles-cumbres',
    topic: 'evidencias-diluvio',
    title: 'Fósiles en las Cumbres: Evidencias Geológicas',
    seoTitle: 'Fósiles marinos en las cumbres: evidencias del diluvio',
    description: '¿Por qué encontramos fósiles marinos en las montañas más altas del mundo? Un análisis del diluvio catastrófico.',
    image: '/images/f.elconfidencial.com_original_a1c_0ef_a20_a1c0efa203e3c23e63e7374c091d593c.jpg',
    tag: 'Geología',
    date: '15 Ene 2025',
    keyVerse: {
      text: 'Con el abismo, como con vestido, la cubriste; sobre los montes estaban las aguas.',
      ref: 'Salmos 104:6',
    },
    sections: [
      {
        paragraphs: [
          'En muchas cordilleras se hallan restos de organismos marinos a gran altitud. Eso sugiere que esas rocas se formaron bajo agua y fueron posteriormente elevadas.',
          'La geología uniformitaria explica estos hallazgos con procesos lentos durante millones de años. Los modelos catastrofistas proponen depositación rápida y movimientos tectónicos posteriores asociados a eventos de escala continental.',
        ],
      },
      {
        heading: 'Capas y estratificación',
        paragraphs: [
          'Estratos extensos, paralelos entre continentes y con fósiles enterrados rápidamente apuntan a procesos de alta energía, no solo a sedimentación gradual.',
          'La interpretación depende del marco temporal adoptado, pero los datos observables invitan a replantear narrativas exclusivamente lentistas.',
        ],
      },
    ],
  },
  {
    slug: 'arca-noe',
    topic: 'evidencias-diluvio',
    title: 'El Arca de Noé: ¿Mito o Realidad?',
    seoTitle: 'El arca de Noé: ¿mito o realidad histórica? — Génesis 6',
    description: 'Investigación sobre la factibilidad técnica y arqueológica de la embarcación descrita en el Génesis.',
    image: '/images/antena-historia-podcast-diluvio-universal.jpg',
    tag: 'Biblia',
    date: '10 Ene 2025',
    keyVerse: {
      text: 'Hazte un arca de madera de gofer; harás aposentos en el arca, y la calafatearás con brea por dentro y por fuera.',
      ref: 'Génesis 6:14',
    },
    sections: [
      {
        paragraphs: [
          'Las dimensiones del arca en Génesis describen una embarcación grande, con proporciones que estudios de ingeniería naval han considerado estables para flotar en aguas turbulentas.',
          'El texto enfatiza el propósito: preservar representantes de la vida terrestre y a la familia de Noé. No es un cuento simbólico sin medidas ni materiales concretos.',
        ],
      },
      {
        heading: 'Fe y evidencia',
        paragraphs: [
          'La arqueología no ha confirmado de manera definitiva el sitio del arca, pero tampoco ha demostrado su imposibilidad. La fe se apoya en la revelación; la investigación puede iluminar su plausibilidad histórica.',
          'Negar de plano el relato por prejuicio moderno no es ciencia: es otra forma de dogma. La apologética responsable examina textos y datos con honestidad.',
        ],
      },
    ],
  },
  {
    slug: 'dinosaurios-contemporaneos-hombre',
    topic: 'biblia-dinosaurios',
    title: '¿Fueron los dinosaurios contemporáneos del hombre?',
    seoTitle: '¿Dinosaurios y humanos coexistieron? — Génesis 1',
    description: 'Investigamos si existen evidencias de que seres humanos y dinosaurios coexistieron en el pasado.',
    image: '/images/13dinosaur-superJumbo.jpg',
    tag: 'Paleontología',
    date: '05 Marzo 2025',
    keyVerse: {
      text: 'Luego dijo Dios: Produzca la tierra seres vivientes según su género, bestias y serpientes y animales de la tierra según su especie. Y fue así.',
      ref: 'Génesis 1:24',
    },
    sections: [
      {
        paragraphs: [
          'La narrativa dominante sitúa a los dinosaurios millones de años antes del hombre. Sin embargo, representaciones antiguas de criaturas con forma de dragón, leyendas globales y algunos hallazgos controvertidos han reabierto el debate.',
          'Desde una lectura creacionista, los dinosaurios forman parte del mundo creado en la misma semana que el hombre, aunque muchas especies desaparecieron después —especialmente tras el diluvio—.',
        ],
      },
      {
        heading: 'Cronología bíblica',
        paragraphs: [
          'La Biblia no usa la palabra “dinosaurio”, pero describe animales terrestres creados el sexto día junto con Adán y Eva. El registro fósil, interpretado catastróficamente, puede reflejar entierro masivo durante el diluvio más que una secuencia de edades inmensas.',
          'La coexistencia no implica que todo el mundo fuera un zoológico jurásico; implica que ambos tipos de criaturas compartieron la misma historia temprana de la tierra.',
        ],
      },
    ],
  },
  {
    slug: 'behemot-leviatan',
    topic: 'biblia-dinosaurios',
    title: 'El misterio del Behemot y el Leviatán',
    seoTitle: 'Behemot y Leviatán en Job: ¿dinosaurios en la Biblia?',
    description: '¿Podrían las criaturas descritas en el libro de Job ser dinosaurios? Un análisis exegético y científico.',
    image: '/images/los-sauropodos-eran-los-dinosaurios-mas-longevos-se-estima-que-podian-vivir-de-50-a-100-anos_01191acc_230106131643_1280x800.jpg',
    tag: 'Estudio Bíblico',
    date: '22 Feb 2025',
    keyVerse: {
      text: 'Ahí está el behemot: yo lo creé, lo mismo que a ti. Come hierba, como el buey.',
      ref: 'Job 40:15',
    },
    sections: [
      {
        paragraphs: [
          'Los dinosaurios han sido utilizados a menudo para promover la evolución, pero desde una perspectiva bíblica pueden entenderse sin conciliarlos con ese marco. El término “dinosaurio” es moderno; la Biblia describe criaturas poderosas como Behemot y Leviatán.',
        ],
      },
      {
        heading: 'Behemot: un gigante misterioso',
        paragraphs: [
          'En Job 40, Behemot es presentado como obra de Dios, herbívoro, de enorme fuerza, con huesos como bronce y cola comparada con un cedro. Esa descripción no encaja del todo con hipopótamo o elefante.',
        ],
        quote: {
          text: 'Ahí está el behemot: yo lo creé, lo mismo que a ti. Come hierba, como el buey.',
          ref: 'Job 40:15',
        },
      },
      {
        heading: '¿Encajan los dinosaurios en la Biblia?',
        paragraphs: [
          'Según Génesis, Dios terminó la creación en seis días y todo era muy bueno. Con la entrada del pecado la naturaleza se alteró. Algunos creacionistas sugieren que ciertos animales eran más grandes en el pasado, lo que podría relacionarse con fósiles de gran tamaño.',
          'Identificar a Behemot con un dinosaurio específico es especulativo, pero la descripción invita a no reducir el pasado bíblico a un zoológico moderno limitado.',
        ],
      },
    ],
  },
  {
    slug: 'extincion-dinosaurios',
    topic: 'biblia-dinosaurios',
    title: '¿Por qué se extinguieron realmente los dinosaurios?',
    seoTitle: 'Extinción de los dinosaurios y el diluvio bíblico',
    description: 'Analizamos las teorías de extinción desde una perspectiva que armoniza la ciencia y el Diluvio bíblico.',
    image: '/images/asteroid-killing-dinosaur.jpg',
    tag: 'Ciencia',
    date: '10 Feb 2025',
    keyVerse: {
      text: 'Y murió toda carne que se mueve sobre la tierra, así aves como ganados, y bestias, y todo reptil que se arrastra sobre la tierra, y todo hombre.',
      ref: 'Génesis 7:21',
    },
    sections: [
      {
        paragraphs: [
          'La hipótesis del impacto de asteroide explica parte del registro, pero no todos los datos de extinción masiva. Cambios climáticos, enfermedades y catástrofes múltiples también se discuten.',
          'Un diluvio global con aguas caóticas, cambios de temperatura y destrucción de hábitats habría presionado severamente a las poblaciones animales, incluidas las grandes reptiles.',
        ],
      },
      {
        heading: 'Propósito en la historia',
        paragraphs: [
          'La extinción no niega el diseño; muestra un mundo bajo juicio y espera. La Biblia promete una nueva creación donde la muerte no tendrá la última palabra.',
          'Estudiar el pasado de la vida en la tierra puede aumentar la admiración por el Creador y la urgencia de confiar en su palabra.',
        ],
      },
    ],
  },
  {
    slug: 'arqueologia-piedras-claman',
    topic: 'historicidad-biblia',
    title: 'Arqueología: Piedras que claman',
    seoTitle: 'Arqueología bíblica: piedras que claman — evidencia histórica',
    description:
      'Descubrimientos arqueológicos que confirman la existencia de personajes y lugares mencionados en la Biblia.',
    image: '/images/cnne-1394633-oldest-bible-auction.jpeg',
    tag: 'Arqueología',
    date: '01 Marzo 2025',
    keyVerse: {
      text: 'Si estos callaran, las piedras clamarían.',
      ref: 'Lucas 19:40',
    },
    sections: [
      {
        paragraphs: [
          'Excavaciones en Israel y países vecinos han sacado a la luz ciudades, sellos, inscripciones y monumentos que coinciden con nombres y contextos bíblicos: David, Babilonia, Jericó, Hezrón y muchos más.',
          'La arqueología no “prueba” la fe, pero puede confirmar que la Biblia habla de lugares reales y de personas que dejaron huella histórica.',
        ],
      },
      {
        heading: 'Límites y honestidad',
        paragraphs: [
          'No todo relato bíblico tiene confirmación material directa, y algunos hallazgos se interpretan de formas distintas. La apologética seria distingue entre evidencia sólida y especulación.',
          'Aun así, el patrón general fortalece la confianza en que las Escrituras son un documento histórico confiable, no solo un libro de enseñanzas espirituales desconectadas del mundo real.',
        ],
      },
    ],
  },
  {
    slug: 'canon-biblico',
    topic: 'historicidad-biblia',
    title: 'El canon bíblico: ¿Cómo nos llegó la Biblia?',
    seoTitle: 'Cómo se formó el canon bíblico y se preservó la Biblia',
    description: 'La historia de la preservación de los manuscritos y la formación del canon de las Escrituras.',
    image: '/images/bibliaabertapequena.jpg',
    tag: 'Historia',
    date: '15 Feb 2025',
    keyVerse: {
      text: 'Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia.',
      ref: '2 Timoteo 3:16',
    },
    sections: [
      {
        paragraphs: [
          'El canon es el conjunto de libros reconocidos como inspirados. La iglesia primitiva no inventó libros al azar: discernió textos que coincidían con la enseñanza de los apóstoles y la experiencia de Jesús.',
          'Los manuscritos del Nuevo Testamento superan en cantidad y antigüedad a muchas obras clásicas de la antigüedad grecorromana, lo que permite reconstruir el texto con alto grado de certeza.',
        ],
      },
      {
        heading: 'Preservación milagrosa',
        paragraphs: [
          'A pesar de persecuciones, copias y traducciones, el mensaje central —Cristo crucificado y resucitado— permanece intacto en los testimonios más antiguos.',
          'Conocer cómo llegó la Biblia hasta nosotros aumenta la gratitud y la responsabilidad de estudiarla con reverencia y método.',
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string): FeCienciaArticle | undefined {
  return feCienciaArticles.find((a) => a.slug === slug);
}

export function getArticlesByTopic(topic: FeCienciaTopic): FeCienciaArticle[] {
  return feCienciaArticles.filter((a) => a.topic === topic);
}

const MONTHS: Record<string, number> = {
  ene: 0, enero: 0,
  feb: 1, febrero: 1,
  mar: 2, marzo: 2,
  abr: 3, abril: 3,
  may: 4, mayo: 4,
  jun: 5, junio: 5,
  jul: 6, julio: 6,
  ago: 7, agosto: 7,
  sep: 8, sept: 8, septiembre: 8,
  oct: 9, octubre: 9,
  nov: 10, noviembre: 10,
  dic: 11, diciembre: 11,
};

/** Parsea fechas tipo "05 Marzo 2025" / "12 Feb 2025" a timestamp (ms). */
export function parseArticleDate(date: string): number {
  const m = date.trim().match(/^(\d{1,2})\s+([A-Za-zÁÉÍÓÚáéíóúüÜñÑ.]+)\s+(\d{4})$/u);
  if (!m) return 0;
  const day = Number(m[1]);
  const monthKey = m[2].replace(/\./g, '').toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
  const year = Number(m[3]);
  const month = MONTHS[monthKey];
  if (month === undefined || !day || !year) return 0;
  return Date.UTC(year, month, day);
}

/** Artículos estáticos más recientes primero. */
export function getRecentArticles(limit = 4): FeCienciaArticle[] {
  return [...feCienciaArticles]
    .sort((a, b) => parseArticleDate(b.date) - parseArticleDate(a.date))
    .slice(0, limit);
}
