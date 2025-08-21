// src/app/api/recursos-data/route.ts
import { NextResponse } from 'next/server'

export interface ResourceItem {
  id: string
  title: string
  description: string
  url: string
  category: string
  type: 'tool' | 'article' | 'course' | 'book' | 'website' | 'template'
  isPaid: boolean
  rating?: number
  image: string
}

export interface ResourceCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

const categories: ResourceCategory[] = [
  {
    id: 'tools',
    name: 'Herramientas',
    description: 'Software y aplicaciones para diseño UX/UI',
    icon: '/images/home/innovation/webdevp.svg',
    color: 'bg-blue/20 text-blue'
  },
  {
    id: 'learning',
    name: 'Aprendizaje',
    description: 'Cursos, libros y recursos educativos',
    icon: '/images/home/innovation/brand.svg',
    color: 'bg-purple/20 text-purple'
  },
  {
    id: 'inspiration',
    name: 'Inspiración',
    description: 'Galerías, portfolios y showcases',
    icon: '/images/home/innovation/uiux.svg',
    color: 'bg-orange/20 text-orange'
  },
  {
    id: 'templates',
    name: 'Templates',
    description: 'Wireframes, kits UI y plantillas',
    icon: '/images/home/innovation/analitics.svg',
    color: 'bg-green/20 text-green'
  }
]

const resources: ResourceItem[] = [
  // Herramientas
  {
    id: '1',
    title: 'Figma',
    description: 'La herramienta de diseño colaborativo más popular para interfaces y prototipos.',
    url: 'https://figma.com',
    category: 'tools',
    type: 'tool',
    isPaid: false,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop&auto=format&q=80'
  },
  {
    id: '2',
    title: 'Adobe XD',
    description: 'Herramienta de Adobe para diseño y prototipado de experiencias de usuario.',
    url: 'https://adobe.com/products/xd',
    category: 'tools',
    type: 'tool',
    isPaid: true,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=200&fit=crop&auto=format&q=80'
  },
  {
    id: '3',
    title: 'Miro',
    description: 'Pizarra digital colaborativa perfecta para workshops y mapas de usuario.',
    url: 'https://miro.com',
    category: 'tools',
    type: 'tool',
    isPaid: false,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop&auto=format&q=80'
  },
  
  // Aprendizaje
  {
    id: '4',
    title: 'The Design of Everyday Things',
    description: 'Libro fundamental de Don Norman sobre principios de diseño centrado en el usuario.',
    url: 'https://www.amazon.com/Design-Everyday-Things-Revised-Expanded/dp/0465050654',
    category: 'learning',
    type: 'book',
    isPaid: true,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop&auto=format&q=80'
  },
  {
    id: '5',
    title: 'Nielsen Norman Group',
    description: 'Artículos y recursos de investigación UX de los expertos Jakob Nielsen y Don Norman.',
    url: 'https://nngroup.com',
    category: 'learning',
    type: 'website',
    isPaid: false,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop&auto=format&q=80'
  },
  {
    id: '6',
    title: 'Interaction Design Foundation',
    description: 'Cursos online accesibles sobre UX Design con certificaciones reconocidas.',
    url: 'https://interaction-design.org',
    category: 'learning',
    type: 'course',
    isPaid: true,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop&auto=format&q=80'
  },

  // Inspiración
  {
    id: '7',
    title: 'Dribbble',
    description: 'Comunidad global de diseñadores compartiendo trabajos creativos y conceptos.',
    url: 'https://dribbble.com',
    category: 'inspiration',
    type: 'website',
    isPaid: false,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=200&fit=crop&auto=format&q=80'
  },
  {
    id: '8',
    title: 'Behance',
    description: 'Portafolio y showcase de proyectos creativos de Adobe.',
    url: 'https://behance.net',
    category: 'inspiration',
    type: 'website',
    isPaid: false,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?w=400&h=200&fit=crop&auto=format&q=80'
  },
  {
    id: '9',
    title: 'UI Movement',
    description: 'Inspiración diaria de patrones de UI y microinteracciones.',
    url: 'https://uimovement.com',
    category: 'inspiration',
    type: 'website',
    isPaid: false,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop&auto=format&q=80'
  },

  // Templates
  {
    id: '10',
    title: 'Figma Community',
    description: 'Miles de templates, wireframes y componentes gratuitos de la comunidad.',
    url: 'https://figma.com/community',
    category: 'templates',
    type: 'template',
    isPaid: false,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&auto=format&q=80'
  },
  {
    id: '11',
    title: 'UI8',
    description: 'Marketplace de templates premium, iconos y recursos de diseño.',
    url: 'https://ui8.net',
    category: 'templates',
    type: 'template',
    isPaid: true,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=200&fit=crop&auto=format&q=80'
  },
  {
    id: '12',
    title: 'Sketch App Sources',
    description: 'Recursos gratuitos para Sketch: símbolos, plantillas y plugins.',
    url: 'https://sketchappsources.com',
    category: 'templates',
    type: 'template',
    isPaid: false,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=400&h=200&fit=crop&auto=format&q=80'
  }
]

export const GET = async () => {
  return NextResponse.json({
    categories,
    resources,
    totalResources: resources.length,
    freeResources: resources.filter(r => !r.isPaid).length,
    paidResources: resources.filter(r => r.isPaid).length
  })
}