// src/app/api/blog-data/route.ts
import { NextResponse } from 'next/server'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  author: string
  publishDate: string
  readTime: string
  category: string
  tags: string[]
  image: string
  featured: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The History of UX Design: From Ergonomics to Digital Design',
    slug: 'history-of-ux-design',
    excerpt: 'Explore how user-centered design evolved from industrial ergonomics studies into a foundational discipline of modern digital design.',
    author: 'UX/UI Hub Team',
    publishDate: '2025-01-15',
    readTime: '8 min',
    category: 'History',
    tags: ['UX Design', 'History', 'Ergonomics'],
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=400&fit=crop&crop=entropy&auto=format&q=80',
    featured: true
  },
  {
    id: '2',
    title: 'Jakob Nielsen’s 10 Heuristic Principles',
    slug: 'nielsen-heuristic-principles',
    excerpt: 'A detailed analysis of the 10 fundamental usability principles every UX/UI designer should know and apply in their projects.',
    author: 'UX/UI Hub Team',
    publishDate: '2025-01-12',
    readTime: '12 min',
    category: 'Methodology',
    tags: ['Jakob Nielsen', 'Heuristics', 'Usability'],
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop&crop=entropy&auto=format&q=80',
    featured: true
  },
  {
    id: '3',
    title: 'Design Thinking in Practice: Step-by-Step Methodology',
    slug: 'design-thinking-practice',
    excerpt: 'Learn how to apply Design Thinking in real projects—from empathy to prototyping—with practical examples.',
    author: 'UX/UI Hub Team',
    publishDate: '2025-01-10',
    readTime: '15 min',
    category: 'Methodology',
    tags: ['Design Thinking', 'Methodology', 'Innovation'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop&crop=entropy&auto=format&q=80',
    featured: false
  },
  {
    id: '4',
    title: 'Essential Tools for UX/UI Design in 2025',
    slug: 'essential-tools-ux-ui-2025',
    excerpt: 'Discover the most important tools every UX/UI designer should master, from research to prototyping and collaboration.',
    author: 'UX/UI Hub Team',
    publishDate: '2025-01-08',
    readTime: '10 min',
    category: 'Tools',
    tags: ['Figma', 'Tools', 'Productivity'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&crop=entropy&auto=format&q=80',
    featured: false
  }
]

export const GET = async () => {
  return NextResponse.json({
    posts: blogPosts,
    totalPosts: blogPosts.length,
    featuredPosts: blogPosts.filter(post => post.featured),
    categories: ['History', 'Methodology', 'Tools', 'Case Studies'],
    tags: ['UX Design', 'UI Design', 'Figma', 'Jakob Nielsen', 'Design Thinking']
  })
}