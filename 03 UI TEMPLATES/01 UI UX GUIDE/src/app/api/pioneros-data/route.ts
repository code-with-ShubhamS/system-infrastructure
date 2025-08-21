// src/app/api/pioneros-data/route.ts
import { NextResponse } from 'next/server'

export interface Pioneer {
  id: string
  name: string
  role: string
  company: string
  bio: string
  detailedBio: string
  image: string
  linkedinUrl?: string
  portfolioUrl?: string
  contributions: string[]
  keyWork: string
  yearActive: string
  nationality: string
  category: 'founders' | 'researchers' | 'designers' | 'engineers'
  awards: string[]
  quotes: string[]
}

const pioneers: Pioneer[] = [
  {
    id: '1',
    name: 'Don Norman',
    role: 'Pioneer of User-Centered Design',
    company: 'Nielsen Norman Group',
    bio: 'Author of "The Design of Everyday Things". Coined the term "User Experience" and established foundational principles of user-centered design.',
    detailedBio: `Don Norman is considered the father of the term "User Experience" and one of the most influential thinkers in the field of user-centered design. During his time at Apple in the 90s, Norman coined the term UX to describe all aspects of a person's experience with a system.

His book "The Design of Everyday Things" (originally "The Psychology of Everyday Things") revolutionized how we think about design, introducing concepts like affordances, feedback, and the importance of user mental models.

As cofounder of the Nielsen Norman Group alongside Jakob Nielsen, Norman has continued to be a leading voice in the industry, advocating for user research and evidence-based design. His focus on cognitive psychology applied to design has influenced generations of designers.`,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format&q=80',
    linkedinUrl: 'https://www.linkedin.com/in/don-norman-1a001/',
    portfolioUrl: 'https://jnd.org/',
    contributions: [
      'Coined the term "User Experience"',
      'Principles of user-centered design',
      'Affordances theory in design',
      'Concept of user mental models',
      'Usability evaluation methodology'
    ],
    keyWork: 'The Design of Everyday Things',
    yearActive: '1980–present',
    nationality: 'United States',
    category: 'researchers',
    awards: [
      'Benjamin Franklin Medal in Computer and Cognitive Science',
      'SIGCHI Lifetime Achievement Award',
      'Honorary Doctorate from University of San Diego'
    ],
    quotes: [
      'Good design is actually much harder to notice than poor design, in part because good designs fit our needs so well.',
      'User experience encompasses all aspects of the end-user’s interaction with the company, its services, and its products.'
    ]
  },
  {
    id: '2',
    name: 'Jakob Nielsen',
    role: 'Web Usability Expert',
    company: 'Nielsen Norman Group',
    bio: 'Known as the "guru of web usability". Developed the 10 usability heuristics and promoted the importance of user testing.',
    detailedBio: `Jakob Nielsen is one of the most recognized figures in the field of web usability. Known as the "usability guru", Nielsen has dedicated his career to making digital interfaces easier for people to use.

His "10 Usability Heuristics", published in 1994, remain the fundamental basis for evaluating user interfaces worldwide. These heuristics have been applied to millions of websites and applications.

As cofounder of the Nielsen Norman Group, Nielsen has conducted extensive research on user behavior on the web, coining terms like "banner blindness" and establishing reading patterns such as the "F-pattern" for web pages. His focus on simplicity and efficiency has influenced modern web design.`,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format&q=80',
    linkedinUrl: 'https://www.linkedin.com/in/jakobnielsen/',
    portfolioUrl: 'https://www.nngroup.com/people/jakob-nielsen/',
    contributions: [
      '10 Usability Heuristics',
      'User Testing Methodology',
      'Pioneer of web usability',
      'Concept of "banner blindness"',
      'F-pattern web reading behavior'
    ],
    keyWork: 'Designing Web Usability',
    yearActive: '1988–present',
    nationality: 'Denmark',
    category: 'researchers',
    awards: [
      'SIGCHI Lifetime Achievement Award',
      'World Technology Award',
      'Lifetime Achievement Award from the Human Factors Society'
    ],
    quotes: [
      'Usability is a quality attribute that assesses how easy user interfaces are to use.',
      'Users spend most of their time on other websites. This means they prefer your site to work the same way as all the other sites they already know.'
    ]
  },
  {
    id: '3',
    name: 'Alan Cooper',
    role: 'Father of Interaction Design',
    company: 'Cooper',
    bio: 'Creator of the concept of "personas" in UX and founder of interaction design as a discipline. Pioneer of goal-directed software design.',
    detailedBio: `Alan Cooper is known as the "Father of Interaction Design" for his pioneering work establishing this discipline as a formal field of study and practice. His goal-directed design approach revolutionized how development teams think about users.

Cooper introduced the "Personas" methodology in his book "About Face", providing a practical tool to keep real users in mind throughout the design process. This methodology has become an industry standard.

As founder of Cooper (now part of Wipro Digital), Alan has worked with some of the world's largest companies to improve their digital products. His philosophy of "design first, technology later" has influenced design culture in Silicon Valley and beyond.`,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&auto=format&q=80',
    linkedinUrl: 'https://www.linkedin.com/in/alan-cooper-647b7/',
    portfolioUrl: 'https://www.cooper.com/',
    contributions: [
      'Personas methodology',
      'Goal-directed design',
      'Interaction design principles',
      'Concept of elastic user interface',
      'Design research framework'
    ],
    keyWork: 'About Face: The Essentials of Interaction Design',
    yearActive: '1975–present',
    nationality: 'United States',
    category: 'designers',
    awards: [
      'Software Visionary Award',
      'Lifetime Achievement Award from CHI',
      'Windows Pioneer Award from Microsoft'
    ],
    quotes: [
      'No matter how cool your interface is, less of it would be better.',
      'If we don’t have a solid understanding of who our users are and what they’re trying to achieve, we can’t design a good experience.'
    ]
  },
  {
    id: '4',
    name: 'Susan Kare',
    role: 'Pioneer of Icon Design',
    company: 'Apple / Freelance',
    bio: 'Designer of the original Macintosh icons. Revolutionized the graphical user interface and established visual standards that endure to this day.',
    detailedBio: `Susan Kare is the artist behind many of the most recognizable icons in computing history. As part of the original Macintosh team at Apple, Kare created the icons, fonts, and graphic elements that defined the visual experience of early personal computers.

Her work on Macintosh icons established the visual language we use today in digital interfaces. Icons like the trash can, the Apple command symbol, and the original bitmap fonts were her creations that have influenced interface design for decades.

After Apple, Kare continued as a freelance designer, creating visual identities for companies such as Microsoft, IBM, and Facebook. Her focus on making technology more human and accessible through visual design has been fundamental to the mass adoption of personal computers.`,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&h=400&fit=crop&auto=format&q=80',
    linkedinUrl: 'https://www.linkedin.com/in/susan-kare-a950/',
    portfolioUrl: 'https://kare.com/',
    contributions: [
      'Original Macintosh icons',
      'Pioneer in digital typography',
      'Graphical interface standards',
      'Apple command symbol',
      'Pixel art methodology for interfaces'
    ],
    keyWork: 'Apple Macintosh Icons (1984)',
    yearActive: '1982–present',
    nationality: 'United States',
    category: 'designers',
    awards: [
      'AIGA Medal for Lifetime Achievement',
      'Chrysler Award for Innovation in Design',
      'Cooper Hewitt National Design Award'
    ],
    quotes: [
      'I think most software is so poorly designed that it’s hard to use.',
      'Icons should be immediately recognizable and universally understandable.'
    ]
  },
  {
    id: '5',
    name: 'Brenda Laurel',
    role: 'Pioneer in Interactive Experience Design',
    company: 'Independent Researcher',
    bio: 'Theorist of interaction design and pioneer in immersive digital experiences. Founder of Purple Moon and author of "Computers as Theatre".',
    detailedBio: `Brenda Laurel is a visionary who saw the potential of interactive experience design decades before it became mainstream. Her book "Computers as Theatre" (1991) laid the theoretical foundations for thinking of user interfaces as dramatic and narrative experiences.

As one of the few women in the early days of the tech industry, Laurel founded Purple Moon, a pioneering company creating software and games designed specifically for girls. Her research on gender differences in technology usage influenced the design of more inclusive products.

Her doctoral work at the Art Institute of San Francisco focused on the intersection of technology, art, and experience design. Laurel has been a professor at several prestigious universities and continues to be an influential voice on inclusive design and immersive experiences.`,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&auto=format&q=80',
    linkedinUrl: 'https://www.linkedin.com/in/brenda-laurel/',
    portfolioUrl: 'https://www.brendalaurel.com/',
    contributions: [
      'Theory of "Computers as Theatre"',
      'Pioneer in inclusive design',
      'Research in gender and technology',
      'Founder of Purple Moon',
      'Narrative design methodology'
    ],
    keyWork: 'Computers as Theatre',
    yearActive: '1976–present',
    nationality: 'United States',
    category: 'researchers',
    awards: [
      'Rockefeller Fellowship',
      'Honorary Doctorate from Art Institute of San Francisco',
      'Women in Games Lifetime Achievement Award'
    ],
    quotes: [
      'The user interface should disappear, allowing people to work directly with information and tasks.',
      'Design is not just about how something looks, but how it works and how it feels.'
    ]
  },
  {
    id: '6',
    name: 'Bill Moggridge',
    role: 'Father of Interaction Design',
    company: 'IDEO',
    bio: 'Coined the term "Interaction Design" and was cofounder of IDEO. Designer of the first commercial laptop and leader in design thinking methodology.',
    detailedBio: `Bill Moggridge was instrumental in establishing interaction design as a professional discipline. As cofounder of IDEO, he helped create one of the world’s most influential design consultancies, known for its focus on design thinking and user-centered innovation.

Moggridge designed the first commercial laptop, the GRiD Compass, in 1982, establishing many of the interaction patterns we use today on portable devices. His work combined industrial design with experience design, creating products that were both functionally superior and aesthetically pleasing.

As director of the Cooper-Hewitt National Design Museum, Moggridge promoted the importance of design in everyday life and helped elevate the public profile of design as a discipline. His book "Designing Interactions" documents the field’s evolution and the stories behind iconic products.`,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&auto=format&q=80',
    linkedinUrl: 'https://www.linkedin.com/in/bill-moggridge/',
    portfolioUrl: 'https://www.ideo.com/',
    contributions: [
      'Coined the term "Interaction Design"',
      'Cofounder of IDEO',
      'Designer of the first laptop (GRiD Compass)',
      'Design thinking methodology',
      'Pioneer in digital product design'
    ],
    keyWork: 'Designing Interactions',
    yearActive: '1969–2012',
    nationality: 'United Kingdom',
    category: 'designers',
    awards: [
      'Royal Designer for Industry',
      'Prince Philip Designers Prize',
      'Cooper-Hewitt National Design Award'
    ],
    quotes: [
      'Interaction design is about creating useful, usable, and desirable experiences.',
      'Technology is nothing. What’s important is that you have faith in people—that they are basically good and smart.'
    ]
  }
]

export const GET = async () => {
  return NextResponse.json({
    pioneers,
    totalPioneers: pioneers.length,
    categories: [
      { id: 'all', name: 'All Pioneers' },
      { id: 'founders', name: 'Founders' },
      { id: 'researchers', name: 'Researchers' },
      { id: 'designers', name: 'Designers' },
      { id: 'engineers', name: 'Engineers' }
    ]
  })
}