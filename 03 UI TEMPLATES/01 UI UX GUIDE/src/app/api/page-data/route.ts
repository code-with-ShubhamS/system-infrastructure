// src/app/api/page-data/route.ts
import { NextResponse } from 'next/server'
import {
  avatar,
  brand,
  innovation,
  onlinePresence,
  creativeMind,
  WebResultTag,
  startupPlan,
  faq,
  achievements,
} from '@/app/types/menu'

const avatarList: avatar[] = [
  {
    image: '/images/home/avatar_1.jpg',
    title: 'Sarah Johnson',
  },
  {
    image: '/images/home/avatar_2.jpg',
    title: 'Olivia Miller',
  },
  {
    image: '/images/home/avatar_3.jpg',
    title: 'Sophia Roberts',
  },
  {
    image: '/images/home/avatar_4.jpg',
    title: 'Isabella Clark',
  },
]

const brandList: brand[] = [
  {
    image: '/images/home/brand/brand-icon-1.svg',
    darkImg: '/images/home/brand/brand-darkicon-1.svg',
    title: 'Adobe',
  },
  {
    image: '/images/home/brand/brand-icon-2.svg',
    darkImg: '/images/home/brand/brand-darkicon-2.svg',
    title: 'Figma',
  },
  {
    image: '/images/home/brand/brand-icon-3.svg',
    darkImg: '/images/home/brand/brand-darkicon-3.svg',
    title: 'Sketch',
  },
  {
    image: '/images/home/brand/brand-icon-4.svg',
    darkImg: '/images/home/brand/brand-darkicon-4.svg',
    title: 'Principle',
  },
  {
    image: '/images/home/brand/brand-icon-5.svg',
    darkImg: '/images/home/brand/brand-darkicon-5.svg',
    title: 'Framer',
  },
]

const innovationList: innovation[] = [
  {
    image: '/images/home/innovation/brand.svg',
    title: 'Investigación\nde Usuarios',
    bg_color: 'bg-purple/20',
    txt_color: 'text-purple',
  },
  {
    image: '/images/home/innovation/digitalmarketing.svg',
    title: 'Wireframes\ny Flujos',
    bg_color: 'bg-blue/20',
    txt_color: 'text-blue',
  },
  {
    image: '/images/home/innovation/uiux.svg',
    title: 'Prototipos\nInteractivos',
    bg_color: 'bg-orange/20',
    txt_color: 'text-orange',
  },
  {
    image: '/images/home/innovation/analitics.svg',
    title: 'Diseño\nVisual',
    bg_color: 'bg-green/20',
    txt_color: 'text-green',
  },
  {
    image: '/images/home/innovation/webdevp.svg',
    title: 'Pruebas de\nUsabilidad',
    bg_color: 'bg-pink/20',
    txt_color: 'text-pink',
  },
]

const onlinePresenceList: onlinePresence[] = [
  {
    image: '/images/home/onlinePresence/online_img_1.jpg',
    title: 'Rediseño de App Bancaria',
    tag: ['Investigación de Usuarios', 'Prototipado'],
    link: '/casos-estudio/app-bancaria',
  },
  {
    image: '/images/home/onlinePresence/online_img_2.jpg',
    title: 'Plataforma E-learning',
    tag: ['Arquitectura de Información', 'Diseño de Interfaz'],
    link: '/casos-estudio/e-learning',
  },
  {
    image: '/images/home/onlinePresence/online_img_3.jpg',
    title: 'Dashboard Analítico',
    tag: ['Investigación de Usuarios', 'Visualización de Datos'],
    link: '/casos-estudio/dashboard',
  },
  {
    image: '/images/home/onlinePresence/online_img_4.jpg',
    title: 'App de Delivery',
    tag: ['Mapeo de Experiencia', 'Testing de Usabilidad'],
    link: '/casos-estudio/delivery',
  },
]

const creativeMindList: creativeMind[] = [
  {
    image: '/images/home/creative/creative_img_1.png',
    name: 'Don Norman',
    position: 'Pionero del Diseño Centrado en el Usuario',
    company: 'Nielsen Norman Group',
    bio: 'Autor de "The Design of Everyday Things". Acuñó el término "User Experience" y estableció los principios fundamentales del diseño centrado en el usuario.',
    linkedinLink: 'https://www.linkedin.com/in/don-norman-1a001/',
    portfolioUrl: 'https://jnd.org/',
    twitterLink: 'https://jnd.org/',
    contributions: [
      'Acuñó el término "User Experience"',
      'Principios de diseño centrado en el usuario',
      'Teoría de las affordances en diseño'
    ],
    keyWork: 'The Design of Everyday Things'
  },
  {
    image: '/images/home/creative/creative_img_2.png',
    name: 'Jakob Nielsen',
    position: 'Experto en Usabilidad Web',
    company: 'Nielsen Norman Group',
    bio: 'Conocido como el "gurú de la usabilidad web". Desarrolló las 10 heurísticas de usabilidad y promovió la importancia del testing de usuarios.',
    linkedinLink: 'https://www.linkedin.com/in/jakobnielsen/',
    portfolioUrl: 'https://www.nngroup.com/people/jakob-nielsen/',
    twitterLink: 'https://www.nngroup.com/people/jakob-nielsen/',
    contributions: [
      '10 Heurísticas de Usabilidad',
      'Metodología de Testing de Usuarios',
      'Pionero en usabilidad web'
    ],
    keyWork: 'Designing Web Usability'
  },
  {
    image: '/images/home/creative/creative_img_3.png',
    name: 'Alan Cooper',
    position: 'Padre del Diseño de Interacción',
    company: 'Cooper',
    bio: 'Creador del concepto de "personas" en UX y fundador del diseño de interacción como disciplina. Pionero en el diseño de software centrado en objetivos.',
    linkedinLink: 'https://www.linkedin.com/in/alan-cooper-647b7/',
    portfolioUrl: 'https://www.cooper.com/',
    twitterLink: 'https://www.cooper.com/',
    contributions: [
      'Metodología de Personas',
      'Diseño orientado a objetivos',
      'Principios de diseño de interacción'
    ],
    keyWork: 'About Face: The Essentials of Interaction Design'
  },
  {
    image: '/images/home/creative/creative_img_4.png',
    name: 'Susan Kare',
    position: 'Pionera del Diseño de Iconos',
    company: 'Apple / Freelance',
    bio: 'Diseñadora de los iconos originales de Macintosh. Revolucionó la interfaz gráfica de usuario y estableció estándares visuales que perduran hasta hoy.',
    linkedinLink: 'https://www.linkedin.com/in/susan-kare-a950/',
    portfolioUrl: 'https://kare.com/',
    twitterLink: 'https://kare.com/',
    contributions: [
      'Iconos originales de Macintosh',
      'Pionera en tipografía digital',
      'Estándares de interfaz gráfica'
    ],
    keyWork: 'Iconos de Apple Macintosh (1984)'
  }
]

const WebResultTagList: WebResultTag[] = [
  {
    image: '/images/home/result/creativity.svg',
    name: 'Creatividad',
    bg_color: 'bg-purple/20',
    txt_color: 'text-purple',
  },
  {
    image: '/images/home/result/innovation.svg',
    name: 'Innovación',
    bg_color: 'bg-blue/20',
    txt_color: 'text-blue',
  },
  {
    image: '/images/home/result/strategy.svg',
    name: 'Estrategia',
    bg_color: 'bg-orange/20',
    txt_color: 'text-orange',
  },
]

const startupPlanList: startupPlan[] = [
  {
    plan_bg_color: 'bg-pale-yellow',
    text_color: 'text-dark_black',
    descp_color: 'dark_black/60',
    border_color: 'border-dark_black/10',
    plan_name: 'Básico',
    plan_descp: 'Para estudiantes que inician en UX/UI. Recursos fundamentales',
    plan_price: 'Gratis',
    icon_img: '/images/home/startupPlan/white_tick.svg',
    plan_feature: [
      'Acceso a casos de estudio básicos',
      'Recursos de aprendizaje',
      'Herramientas gratuitas',
      'Guías de metodología',
      'Comunidad de estudiantes',
      'Templates básicos',
    ],
  },
  {
    plan_bg_color: 'bg-purple_blue',
    text_color: 'text-white',
    descp_color: 'white/60',
    border_color: 'border-white/10',
    plan_name: 'Pro',
    plan_descp: 'Para profesionales. Casos avanzados y recursos premium',
    plan_price: 'Premium',
    icon_img: '/images/home/startupPlan/black_tick.svg',
    plan_feature: [
      'Todos los casos de estudio',
      'Recursos premium',
      'Herramientas profesionales',
      'Metodologías avanzadas',
      'Mentoría especializada',
      'Templates premium',
    ],
  },
]

const faqList: faq[] = [
  {
    faq_que: '¿Cuál es la diferencia entre UX y UI?',
    faq_ans: 'UX (User Experience) se enfoca en la experiencia completa del usuario, incluyendo investigación, arquitectura de información y flujos. UI (User Interface) se centra en el diseño visual de la interfaz: colores, tipografías, botones y elementos gráficos. Ambas disciplinas trabajan juntas para crear productos digitales efectivos.',
  },
  {
    faq_que: '¿Qué herramientas son esenciales para empezar en UX/UI?',
    faq_ans: 'Para comenzar necesitas: Figma o Sketch para diseño de interfaces, Miro o Mural para mapas mentales y flujos, Maze o UsabilityHub para testing, y herramientas de prototipado como InVision o Principle. Muchas de estas tienen versiones gratuitas perfectas para estudiantes.',
  },
  {
    faq_que: '¿Cómo se aplica Design Thinking en proyectos reales?',
    faq_ans: 'Design Thinking sigue 5 fases: Empatizar (investigar usuarios), Definir (identificar problemas), Idear (generar soluciones), Prototipar (crear versiones de prueba) e Iterar (mejorar basado en feedback). Se aplica desde apps móviles hasta servicios físicos, siempre poniendo al usuario en el centro.',
  },
  {
    faq_que: '¿Qué es la investigación de usuarios y por qué es importante?',
    faq_ans: 'La investigación de usuarios incluye entrevistas, encuestas, análisis de comportamiento y testing de usabilidad para entender necesidades, motivaciones y frustraciones. Es fundamental porque evita suposiciones incorrectas y asegura que el diseño resuelva problemas reales de usuarios reales.',
  },
  {
    faq_que: '¿Cómo se hace un prototipo efectivo?',
    faq_ans: 'Un prototipo efectivo debe tener el nivel de fidelidad apropiado para el objetivo: wireframes para estructura, mockups para diseño visual, y prototipos interactivos para flujos. Debe ser rápido de crear, fácil de modificar y permitir testing temprano con usuarios reales.',
  },
  {
    faq_que: '¿Qué son las heurísticas de usabilidad de Nielsen?',
    faq_ans: 'Son 10 principios fundamentales para evaluar interfaces: visibilidad del estado del sistema, correspondencia entre sistema y mundo real, control del usuario, consistencia, prevención de errores, reconocimiento vs recordación, flexibilidad, diseño minimalista, ayuda a recuperarse de errores, y documentación accesible.',
  },
]

const achievementsList: achievements[] = [
  {
    icon: '/images/home/achievement/framer_award.svg',
    dark_icon: '/images/home/achievement/dark_framer_award.svg',
    sub_title: 'Revolución del Mouse',
    title: 'Douglas Engelbart presenta el primer mouse y la interfaz gráfica, cambiando para siempre la interacción humano-computadora.',
    year: '1968',
    url: 'https://www.dougengelbart.org/',
  },
  {
    icon: '/images/home/achievement/dribble_award.svg',
    dark_icon: '/images/home/achievement/dribble_award.svg',
    sub_title: 'Nacimiento del GUI',
    title: 'Xerox Alto introduce la primera interfaz gráfica comercial con ventanas, iconos y menús.',
    year: '1973',
    url: 'https://computerhistory.org/',
  },
  {
    icon: '/images/home/achievement/awward_award.svg',
    dark_icon: '/images/home/achievement/dark_awward_award.svg',
    sub_title: 'Era del Diseño Centrado en el Usuario',
    title: 'Don Norman publica "The Design of Everyday Things", estableciendo los principios fundamentales del UX.',
    year: '1988',
    url: 'https://jnd.org/',
  },
  {
    icon: '/images/home/achievement/framer_award.svg',
    dark_icon: '/images/home/achievement/dark_framer_award.svg',
    sub_title: 'Web para Todos',
    title: 'Tim Berners-Lee crea la World Wide Web, democratizando el acceso a la información global.',
    year: '1990',
    url: 'https://www.w3.org/',
  },
  {
    icon: '/images/home/achievement/dribble_award.svg',
    dark_icon: '/images/home/achievement/dribble_award.svg',
    sub_title: 'Revolución Táctil',
    title: 'Apple iPhone redefine la interacción móvil con gestos táctiles intuitivos y diseño minimalista.',
    year: '2007',
    url: 'https://www.apple.com/',
  },
  {
    icon: '/images/home/achievement/awward_award.svg',
    dark_icon: '/images/home/achievement/dark_awward_award.svg',
    sub_title: 'Diseño Responsivo',
    title: 'Ethan Marcotte introduce el concepto de Responsive Web Design, adaptando interfaces a cualquier pantalla.',
    year: '2010',
    url: 'https://alistapart.com/article/responsive-web-design/',
  }
]

export const GET = async () => {
  return NextResponse.json({
    avatarList,
    brandList,
    innovationList,
    onlinePresenceList,
    creativeMindList,
    WebResultTagList,
    startupPlanList,
    faqList,
    achievementsList,
  })
}