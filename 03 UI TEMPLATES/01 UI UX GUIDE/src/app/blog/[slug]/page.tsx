// src/app/blog/[slug]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { BlogPost } from '../../api/blog-data/route'

function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch('/api/blog-data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        
        const foundPost = data.posts.find((p: BlogPost) => p.slug === params.slug)
        setPost(foundPost || null)
        
        // Get related posts from same category
        if (foundPost) {
          const related = data.posts
            .filter((p: BlogPost) => p.category === foundPost.category && p.id !== foundPost.id)
            .slice(0, 3)
          setRelatedPosts(related)
        }
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.slug])

  if (loading) {
    return (
      <main className='pt-44 pb-20'>
        <div className='container'>
          <div className='max-w-4xl mx-auto'>
            <div className='animate-pulse'>
              <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4'></div>
              <div className='h-64 bg-gray-200 dark:bg-gray-700 rounded mb-8'></div>
              <div className='space-y-3'>
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded'></div>
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6'></div>
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6'></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!post) {
    return (
      <main className='pt-44 pb-20'>
        <div className='container'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl font-medium mb-4'>Article not found</h1>
            <p className='text-dark_black/60 dark:text-white/60 mb-8'>
              The article you're looking for doesn't exist or has been moved.
            </p>
            <Link 
              href='/blog'
              className='bg-purple_blue text-white px-6 py-3 rounded-full hover:bg-purple_blue/90 transition-colors'
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className='pt-44 pb-20'>
      <div className='container'>
        <article className='max-w-4xl mx-auto'>
          {/* Header */}
          <header className='mb-12'>
            <div className='flex items-center gap-4 mb-6'>
              <Link 
                href='/blog'
                className='text-purple_blue hover:text-purple_blue/80 text-sm font-medium'
              >
                ← Back to Blog
              </Link>
              <span className='bg-purple_blue text-white px-3 py-1 rounded-full text-sm font-medium'>
                {post.category}
              </span>
            </div>
            
            <h1 className='text-4xl md:text-5xl font-medium mb-6 leading-tight'>
              {post.title}
            </h1>
            
            <div className='flex flex-wrap items-center gap-6 text-dark_black/60 dark:text-white/60 mb-8'>
              <div className='flex items-center gap-2'>
                <span>By {post.author}</span>
              </div>
              <div className='flex items-center gap-2'>
                <span>{post.publishDate}</span>
              </div>
              <div className='flex items-center gap-2'>
                <span>{post.readTime} read</span>
              </div>
            </div>

            <div className='relative rounded-2xl overflow-hidden mb-8'>
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={400}
                className='w-full h-96 object-cover'
                unoptimized={true}
              />
            </div>

            <div className='flex flex-wrap gap-3'>
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className='bg-dark_black/5 dark:bg-white/10 px-3 py-1 rounded-full text-sm'
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          {/* Content */}
          <div className='prose prose-lg dark:prose-invert max-w-none mb-16'>
            <div className='text-dark_black/80 dark:text-white/80 leading-relaxed'>
              <p className='text-xl mb-8 text-dark_black/70 dark:text-white/70 font-light'>
                {post.excerpt}
              </p>
              
              {/* Simulated article content */}
              <div className='space-y-6'>
                <p>
                  This is the full content of the article about <strong>{post.title}</strong>. 
                  In a real project, this content would come from Directus CMS and be rendered 
                  as Markdown or structured HTML.
                </p>
                
                <h2 className='text-2xl font-medium mt-12 mb-6'>Introduction</h2>
                <p>
                  UX/UI design is a fascinating discipline that combines psychology, technology 
                  and creativity to create memorable digital experiences. In this article 
                  we explore the foundational concepts every designer should know.
                </p>

                <h2 className='text-2xl font-medium mt-12 mb-6'>Main Topic</h2>
                <p>
                  The principles of user-centered design have evolved significantly 
                  over the last decades. From early ergonomics studies to modern AI interfaces, 
                  the focus has remained the same: put people at the center.
                </p>

                <blockquote className='border-l-4 border-purple_blue pl-6 my-8 italic text-lg'>
                  "Good design is obvious. Great design is transparent." - Joe Sparano
                </blockquote>

                <h2 className='text-2xl font-medium mt-12 mb-6'>Conclusions</h2>
                <p>
                  In summary, {post.category.toLowerCase()} is a constantly evolving field 
                  that requires both technical knowledge and human sensitivity. The key is 
                  finding the perfect balance between functionality and experience.
                </p>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className='border-t border-dark_black/10 dark:border-white/10 pt-16'>
              <h2 className='text-2xl font-medium mb-8'>Related Articles</h2>
              <div className='grid md:grid-cols-3 gap-8'>
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className='group'>
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <div className='flex flex-col gap-4'>
                        <div className='relative overflow-hidden rounded-xl'>
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            width={300}
                            height={200}
                            className='w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300'
                            unoptimized={true}
                          />
                        </div>
                        <div className='flex flex-col gap-2'>
                          <span className='text-xs text-purple_blue font-medium'>
                            {relatedPost.category}
                          </span>
                          <h3 className='font-medium group-hover:text-purple_blue transition-colors line-clamp-2'>
                            {relatedPost.title}
                          </h3>
                          <div className='flex items-center gap-2 text-xs text-dark_black/60 dark:text-white/60'>
                            <span>{relatedPost.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </main>
  )
}

export default BlogPostPage