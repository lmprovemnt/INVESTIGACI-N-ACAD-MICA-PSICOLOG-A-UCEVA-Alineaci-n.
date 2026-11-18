// src/data/content.ts
// Investigación académica del Área de Psicología - UCEVA

export interface SlideItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  quote?: string;
  authorQuote?: string;
  imageUrl: string;
  routeTarget: string;
}

export interface SectionBlock {
  id: string;
  index: string;
  title: string;
  tagline: string;
  leadParagraph: string;
  contentParagraphs: string[];
  keyHighlight?: string;
  imageUrl?: string;
  imageCaption?: string;
  quote?: {
    text: string;
    author: string;
    work?: string;
  };
  metrics?: {
    label: string;
    value: string;
    description: string;
  }[];
}

export interface ComparisonItem {
  id: string;
  title: string;
  concept: string;
  physicalDimension: {
    label: string;
    title: string;
    description: string;
    sensoryTraits: string[];
    imageUrl: string;
  };
  digitalDimension: {
    label: string;
    title: string;
    description: string;
    sensoryTraits: string[];
    imageUrl: string;
  };
}

export interface AuthorProfile {
  id: string;
  name: string;
  code: string;
  role: string;
  email: string;
  bio: string;
  institution: string;
  program: string;
  avatarUrl: string;
  researchFocus: string[];
}

export interface ReferenceItem {
  id: string;
  author: string;
  year: string;
  title: string;
  source: string;
  type: string;
  link?: string;
}

export interface SiteConfig {
  title: string;
  subtitle: string;
  institution: string;
  program: string;
  epigraph: {
    text: string;
    author: string;
    context: string;
  };
  abstract: string;
}

export const siteConfig: SiteConfig = {
  title: "Alineación Tecnológica",
  subtitle: "Desconexión de la realidad material y del cuerpo humano",
  institution: "Unidad Central del Valle del Cauca (UCEVA)",
  program: "Facultad de Psicología",
  epigraph: {
    text: "Las relaciones humanas, mediadas por la tecnología, se vuelven más frágiles y superficiales. La tecnología puede llevarnos a una forma de conexión vacía que no satisface nuestras necesidades de afecto.",
    author: "Sherry Turkle",
    context: "Investigación sobre el impacto psicológico digital"
  },
  abstract: "Un análisis desde la psicología contemporánea sobre la hipersaturación informativa, la dependencia de plataformas virtuales, el aislamiento social y las secuelas somáticas de la desconexión del cuerpo biológico."
};

export const heroCarouselSlides: SlideItem[] = [
  {
    id: "slide-1",
    tag: "01 // LA JAULA DE ATENCIÓN",
    title: "El Embrutecimiento Tecnológico",
    subtitle: "Manipulación de la atención y limitación del pensamiento crítico",
    description: "Masas humanas bombardeadas intencionalmente con información sesgada y desvirtuada bajo dinámicas de posverdad que fomentan la polarización e impiden la reflexión crítica colectiva.",
    quote: "La rápida adopción de tecnologías y redes sociales ha transformado nuestra relación con el mundo, generando interrogantes sobre la intencionalidad detrás de la saturación informativa.",
    authorQuote: "Investigación UCEVA",
    imageUrl: "/images/alienacion-jaula.jpg",
    routeTarget: "/realidad-material"
  },
  {
    id: "slide-2",
    tag: "02 // LA CARNE FANTASMA",
    title: "El Cuerpo Desanclado",
    subtitle: "Consecuencias tangibles en la salud mental y física",
    description: "La soledad prolongada se asocia con trastornos de ansiedad, depresión, estrés crónico, riesgo cardiovascular, afecciones inmunológicas y deterioro cognitivo en un mundo hiperconectado.",
    quote: "La soledad no es solo un malestar emocional; tiene consecuencias tangibles en nuestra salud mental y física.",
    authorQuote: "Psicología y Salud",
    imageUrl: "/images/silueta-vidrio.jpg",
    routeTarget: "/cuerpo-humano"
  },
  {
    id: "slide-3",
    tag: "03 // LA FALSA PROXIMIDAD",
    title: "Circuito vs. Soledad Real",
    subtitle: "Epicentros urbanos donde el ser humano se siente invisible",
    description: "La vida acelerada y la sobrecarga de estímulos virtuales generan una soledad profunda a pesar de estar rodeados de multitudes, sustituyendo el contacto humano por redes de datos.",
    quote: "Las ciudades, en su afán de modernidad, se han convertido en epicentros de soledad, donde el individuo se siente invisible.",
    authorQuote: "Estudio Psicosocial",
    imageUrl: "/images/circuito-presencia.jpg",
    routeTarget: "/realidad-material"
  },
  {
    id: "slide-4",
    tag: "04 // LA DESHUMANIZACIÓN",
    title: "El Huésped Sintético",
    subtitle: "Pérdida de la empatía y la experiencia auténtica",
    description: "La expansión tecnológica reduce aspectos fundamentales de la condición humana como la empatía, los lazos afectivos profundos y la capacidad de habitar el entorno con autenticidad.",
    quote: "La búsqueda de validación mediante 'likes' genera un ciclo de gratificación instantánea que profundiza la soledad.",
    authorQuote: "Fundación ONCE & Sherry Turkle",
    imageUrl: "/images/humano-androide.jpg",
    routeTarget: "/cuerpo-humano"
  }
];

export const materialRealityContent: {
  header: {
    badge: string;
    title: string;
    subtitle: string;
    abstract: string;
    featuredImage: string;
  };
  introSection: SectionBlock;
  deepDiveSection: SectionBlock;
  comparisons: ComparisonItem[];
} = {
  header: {
    badge: "01 // REALIDAD MATERIAL",
    title: "Desconexión de la Realidad Material",
    subtitle: "Saturación informativa, manipulación de masas y la pérdida del pensamiento crítico",
    abstract: "En el contexto de los cambios demográficos y avances tecnológicos, surge la preocupación sobre cómo vincular la tecnología, la desconexión humana y la ausencia de consenso sobre el futuro.",
    featuredImage: "/images/circuito-presencia.jpg"
  },
  introSection: {
    id: "mat-intro",
    index: "01",
    title: "El Fenómeno del Embrutecimiento y la Posverdad",
    tagline: "Hipersaturación informativa y polarización social",
    leadParagraph: "La rápida adopción de tecnologías y redes sociales ha transformado nuestra relación con el mundo, generando interrogantes sobre la posible intencionalidad detrás de fenómenos como la saturación informativa, polarización y limitaciones en el pensamiento crítico.",
    contentParagraphs: [
      "El fenómeno del 'embrutecimiento' tecnológico adquiere relevancia al observar masas humanas bombardeadas intencionalmente con información sesgada, desvirtuada y manipulada. Esta dinámica, asociada a la posverdad, parece orquestada para fomentar la polarización y restringir la capacidad de la sociedad para pensar de manera crítica.",
      "Los actores detrás de esta hipersaturación de información son las potencias globales y 'mentes influyentes' que generan y controlan los entornos digitales. Esto plantea importantes interrogantes: ¿por qué esta manipulación no es cuestionada? ¿Es una estrategia intencional para mantener a la sociedad distraída o dividida?",
      "La paradoja se relaciona con los avances para reemplazar a seres humanos con nuevas tecnologías; en sociedades saturadas de información y desinformación que van perdiendo capacidades para reflexionar críticamente. Se promueven los avances científicos y tecnológicos para 'mejorar la calidad de vida'; mientras otras tecnologías —como las redes sociales— limitan nuestras capacidades para comprender y participar en la construcción de ese futuro."
    ],
    keyHighlight: "El aturdimiento social y la manipulación tecnológica impiden una visión colectiva del futuro, proyectando una sociedad del aislamiento sin contacto humano ni desarrollo cultural.",
    imageUrl: "/images/alienacion-jaula.jpg",
    imageCaption: "La captura de la atención consciente: el individuo confinado en el estímulo luminoso del dispositivo.",
    metrics: [
      {
        label: "Impacto en pensamiento crítico",
        value: "Crítico",
        description: "Reducción significativa de la capacidad analítica frente a la sobrecarga de posverdad."
      },
      {
        label: "Aislamiento percibido",
        value: "Progresivo",
        description: "Pérdida paulatina de consensos sociales y debilitamiento de los lazos comunitarios directos."
      }
    ]
  },
  deepDiveSection: {
    id: "mat-deepdive",
    index: "02",
    title: "Ética, Futuro y Preservación de Derechos",
    tagline: "Desarrollo tecnológico vs. alienación de la población",
    leadParagraph: "Mientras la tecnología desarrolla capacidades para almacenar más información a mayor velocidad y con un procesamiento superior al humano, se relega la participación del individuo en las decisiones fundamentales.",
    contentParagraphs: [
      "No es casual que políticas para combatir una supuesta superpoblación —iniciada con la reunión del Cairo en 1994— llevara al mundo a decisiones erróneas con consecuencias como la disminución y envejecimiento de la población que resulta irreversible. Visionarios que hace menos de una década vaticinaban la desaparición del hambre, pestes y guerras, hoy ven sus proyecciones derrumbadas.",
      "Estas mismas organizaciones lanzan teorías para someter al mundo e intentan reemplazar valores como los Derechos Humanos por Objetivos de Desarrollo Sostenible (ODS) que parecen no sostenerse. Los Derechos Humanos, al igual que la Democracia, deben evolucionar; lo que no implica desecharlos por teorías como la 'civilización universal', impulsada por potencias que propician el autoritarismo sin restricciones y el abandono de las poblaciones sin instancias superiores a las que recurrir.",
      "La sociedad debe tomar conciencia y reconocer la necesidad de desarrollar una visión de futuro basada en información veraz y en un pensamiento crítico que permita discernir entre la realidad y la manipulación. La innovación y el progreso deben ser impulsados éticamente, respetando los derechos fundamentales para asegurar la construcción de un mañana sostenible."
    ],
    keyHighlight: "Es crucial mantener un equilibrio entre la adopción de nuevas tecnologías y la preservación de principios y valores que han demostrado su validez a lo largo del tiempo.",
    imageUrl: "/images/circuito-presencia.jpg",
    imageCaption: "La paradoja de la hiperconexión: redes globales que aíslan al ser humano en su entorno inmediato."
  },
  comparisons: [
    {
      id: "comp-1",
      title: "Pensamiento Crítico vs. Manipulación Algorítmica",
      concept: "Psicología Social y Cognitiva",
      physicalDimension: {
        label: "Presencia Consciente",
        title: "El Pensamiento Reflexivo",
        description: "Capacidad de discernir información veraz, contrastar fuentes, dialogar en persona y sostener un criterio ético independiente.",
        sensoryTraits: ["Criterio propio", "Contacto directo", "Consenso colectivo", "Verificación veraz"],
        imageUrl: "/images/circuito-presencia.jpg"
      },
      digitalDimension: {
        label: "Hipersaturación",
        title: "La Celda de la Posverdad",
        description: "Bombardeo incesante de datos sesgados, polarización orquestada y aturdimiento atencional que inhibe la reflexión.",
        sensoryTraits: ["Información sesgada", "Gratificación efímera", "Aislamiento psicosocial", "Distracción continua"],
        imageUrl: "/images/alienacion-jaula.jpg"
      }
    },
    {
      id: "comp-2",
      title: "Comunidad Real vs. Aislamiento Tecnológico",
      concept: "Ecología de las Relaciones",
      physicalDimension: {
        label: "Vínculo Humano",
        title: "El Espacio Comunitario",
        description: "Relaciones que involucran presencia física, empatía visceral y construcción de memoria cultural colectiva.",
        sensoryTraits: ["Empatía real", "Afecto tangible", "Respaldo comunitario", "Escucha activa"],
        imageUrl: "/images/silueta-vidrio.jpg"
      },
      digitalDimension: {
        label: "Simulación Digital",
        title: "La Convivencia Silenciosa",
        description: "Presencias mediadas por pantallas y autómatas que dan apariencia de compañía mientras profundizan el vacío.",
        sensoryTraits: ["Falsa proximidad", "Superficialidad", "Invisibilidad emocional", "Vínculo despersonalizado"],
        imageUrl: "/images/humano-androide.jpg"
      }
    }
  ]
};

export const humanBodyContent: {
  header: {
    badge: string;
    title: string;
    subtitle: string;
    abstract: string;
    featuredImage: string;
  };
  deepDiveSection: SectionBlock;
  criticalAnalysisSection: SectionBlock;
  conclusionsSection: SectionBlock;
  references: ReferenceItem[];
} = {
  header: {
    badge: "02 // EL CUERPO HUMANO",
    title: "Desconexión del Cuerpo y Salud Mental",
    subtitle: "El impacto psicológico de la soledad, la deshumanización y el ciclo de la dependencia digital",
    abstract: "La soledad contemporánea no es solo un malestar subjetivo: constituye una crisis biopsicosocial que lesiona el cuerpo biológico y debilita la capacidad de empatía humana.",
    featuredImage: "/images/silueta-vidrio.jpg"
  },
  deepDiveSection: {
    id: "body-deepdive",
    index: "01",
    title: "Soledad y Salud Mental: El Impacto Psicológico",
    tagline: "Consecuencias tangibles en el organismo humano",
    leadParagraph: "La soledad no es solo un malestar emocional; tiene consecuencias tangibles en nuestra salud mental y física comprobadas por la investigación psicológica y médica.",
    contentParagraphs: [
      "Estudios han demostrado que la soledad prolongada está directamente asociada con trastornos de salud mental como la ansiedad, la depresión y el estrés crónico. De hecho, la soledad está vinculada a un aumento en el riesgo de enfermedades cardiovasculares, problemas inmunológicos e incluso deterioro cognitivo prematuro.",
      "Estos efectos son una manifestación directa del impacto negativo de la desconexión emocional y de la falta de apoyo social en un mundo que promete conexión instantánea pero entrega aislamiento real.",
      "Este fenómeno es particularmente evidente en las grandes urbes, donde la vida acelerada y la falta de tiempo para interactuar de manera profunda con los demás generan una soledad aguda a pesar de estar físicamente rodeados de personas. Las ciudades, en su afán de modernidad, se han convertido en epicentros de soledad, donde el ser humano, al igual que en un vasto océano, se siente invisible."
    ],
    keyHighlight: "La soledad sostenida desencadena una respuesta fisiológica de alarma que desgasta el sistema cardiovascular, debilita las defensas inmunológicas y fractura el bienestar psíquico.",
    imageUrl: "/images/silueta-vidrio.jpg",
    imageCaption: "La angustia del aislamiento: el ser humano como una silueta que anhela el contacto tangible tras el cristal de la tecnología."
  },
  criticalAnalysisSection: {
    id: "body-critical",
    index: "02",
    title: "Dependencia Tecnológica: Un Ciclo Vicioso",
    tagline: "La trampa de la gratificación instantánea",
    leadParagraph: "La dependencia tecnológica, particularmente en las plataformas sociales, se ha entrelazado con el fenómeno de la soledad, creando un ciclo vicioso que se retroalimenta sin cesar.",
    contentParagraphs: [
      "Las personas que experimentan soledad recurren a la tecnología buscando consuelo y conexión. Sin embargo, el uso constante y compulsivo de plataformas virtuales solo alimenta una falsa sensación de proximidad, aumentando en última instancia la desconexión emocional.",
      "El informe 'La tecnología como herramienta de conexión social' de la Fundación ONCE (España) sobre dependencia tecnológica revela que la sobrecarga de estímulos en redes sociales y aplicaciones fomenta una 'gratificación instantánea' que refuerza la adicción.",
      "La búsqueda permanente de validación mediante 'likes' o comentarios genera un bucle de recompensa dopaminérgica que nunca satisface las necesidades emocionales profundas de los individuos. Así, la tecnología, en lugar de ser un medio para sanar la soledad, termina por profundizarla al sustituir la calidad de las interacciones por la cantidad y la superficialidad."
    ],
    keyHighlight: "El 'like' no sustituye el abrazo ni la mirada cómplice: alimenta un espejismo que deja intacta la soledad del individuo.",
    imageUrl: "/images/humano-androide.jpg",
    imageCaption: "La deshumanización progresiva: la sustitución del intercambio afectivo genuino por la compañía inerte del dispositivo."
  },
  conclusionsSection: {
    id: "body-conclusions",
    index: "03",
    title: "La Deshumanización y la Reconexión con el Vínculo",
    tagline: "Reclamar la autenticidad y la pertenencia afectiva",
    leadParagraph: "La rápida expansión de las tecnologías emergentes está reduciendo aspectos fundamentales de la condición humana, como la empatía, las relaciones profundas y la capacidad de experimentar el mundo de forma auténtica.",
    contentParagraphs: [
      "Este proceso de deshumanización es un riesgo inherente de un entorno digital que promete ofrecerlo todo, pero que priva a los individuos de la profundidad emocional de la interacción humana cara a cara.",
      "Como ha advertido la psicóloga Sherry Turkle, las relaciones humanas mediadas por pantallas se vuelven más frágiles y superficiales. La tecnología, en lugar de ser una herramienta de enriquecimiento mutuo, nos empuja con frecuencia hacia una forma de 'conexión vacía' que desatiende nuestras necesidades psicológicas fundamentales de pertenencia, cuidado y afecto.",
      "Superar esta alienación requiere rehabilitar el tiempo de presencia, reconstruir la empatía comunitaria en el espacio real, proteger la salud mental de las nuevas generaciones y forjar un futuro donde la tecnología sirva a la dignidad humana y no a su silencioso aislamiento."
    ],
    keyHighlight: "Sanar la desconexión exige revalorizar el contacto humano directo, el silencio reflexivo y el afecto encarnado en el cuerpo vivo."
  },
  references: [
    {
      id: "ref-1",
      author: "El Montonero",
      year: "2024",
      title: "Tecnología y desconexión humana",
      source: "Columna de opinión y análisis social",
      type: "Artículo",
      link: "https://elmontonero.pe/columnas/tecnologia-y-desconexion-humana"
    },
    {
      id: "ref-2",
      author: "Anáhuac Landscape",
      year: "2024",
      title: "La soledad humana y la tecnología: un vínculo complejo en la era digital",
      source: "Publicación académica de reflexión social",
      type: "Ensayo",
      link: "https://anahuaclandscape.com/ideas/la-soledad-humana-y-la-tecnologia-un-vinculo-complejo-en-la-era-digital"
    },
    {
      id: "ref-3",
      author: "Fundación ONCE",
      year: "2023",
      title: "La tecnología como herramienta de conexión social: informe sobre dependencia tecnológica",
      source: "Estudio sobre sobrecarga de estímulos y salud psicosocial, España",
      type: "Informe"
    },
    {
      id: "ref-4",
      author: "Turkle, Sherry",
      year: "2011",
      title: "Alone Together: Why We Expect More from Technology and Less from Each Other",
      source: "Basic Books, Nueva York",
      type: "Libro"
    }
  ]
};

// Las 4 investigadoras del proyecto (Facultad de Psicología - UCEVA)
export const authorsList: AuthorProfile[] = [
  {
    id: "autora-1",
    name: "Sofia Chavez",
    code: "570262020",
    role: "Investigadora / Autora",
    email: "sofia.chavez01@uceva.edu.co",
    bio: "Estudiante e investigadora del Programa de Psicología en la Unidad Central del Valle del Cauca (UCEVA). Centrada en el análisis de los procesos cognitivos, la saturación informativa y el impacto de los entornos digitales en el pensamiento crítico.",
    institution: "Unidad Central del Valle del Cauca (UCEVA)",
    program: "Facultad de Psicología",
    avatarUrl: "/images/autora-sofia-chavez.jpg",
    researchFocus: [
      "Psicología Cognitiva",
      "Saturación Informativa",
      "Pensamiento Crítico",
      "Posverdad y Sociedad"
    ]
  },
  {
    id: "autora-2",
    name: "Oriana Lema Arenas",
    code: "570262007",
    role: "Investigadora / Autora",
    email: "oriana.lema01@uceva.edu.co",
    bio: "Estudiante e investigadora del Programa de Psicología de la UCEVA. Investiga los factores de aislamiento psicosocial, la deshumanización por medios tecnológicos y la preservación de los derechos humanos y la empatía comunitaria.",
    institution: "Unidad Central del Valle del Cauca (UCEVA)",
    program: "Facultad de Psicología",
    avatarUrl: "/images/autora-oriana-lema.jpg",
    researchFocus: [
      "Psicología Social",
      "Desconexión y Vínculo",
      "Derechos Humanos y Ética",
      "Salud Mental Digital"
    ]
  },
  {
    id: "autora-3",
    name: "Katherin Tamayo Alvarez",
    code: "570262024",
    role: "Investigadora / Autora",
    email: "Katherin.tamayo01@uceva.edu.co",
    bio: "Estudiante e investigadora del Programa de Psicología de la UCEVA. Enfocada en las repercusiones de la soledad prolongada sobre la salud psicofisiológica, el estrés crónico y los trastornos de ansiedad en la era hiperconectada.",
    institution: "Unidad Central del Valle del Cauca (UCEVA)",
    program: "Facultad de Psicología",
    avatarUrl: "/images/autora-katherin-tamayo.jpg",
    researchFocus: [
      "Psicosomática y Salud",
      "Soledad y Estrés Crónico",
      "Aislamiento Urbano",
      "Bienestar Emocional"
    ]
  },
  {
    id: "autora-4",
    name: "Keren Guerrero",
    code: "570262001",
    role: "Investigadora / Autora",
    email: "Keren.guerrero01@uceva.edu.co",
    bio: "Estudiante e investigadora del Programa de Psicología de la UCEVA. Trabaja sobre los patrones de dependencia tecnológica, los ciclos dopaminérgicos de gratificación instantánea en redes y el fenómeno de la conexión vacía.",
    institution: "Unidad Central del Valle del Cauca (UCEVA)",
    program: "Facultad de Psicología",
    avatarUrl: "/images/autora-keren-guerrero.jpg",
    researchFocus: [
      "Dependencia Tecnológica",
      "Gratificación Instantánea",
      "Fenómeno 'Conexión Vacía'",
      "Psicología Clínica"
    ]
  }
];
