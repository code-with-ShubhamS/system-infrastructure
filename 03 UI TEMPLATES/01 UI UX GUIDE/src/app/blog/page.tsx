// src/app/blog/page.tsx
'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BlogPost } from '../api/blog-data/route'
import { Metadata } from 'next'

function BlogPage() {
  const [blogData, setBlogData] = useState<{
    posts: BlogPost[]
    featuredPosts: BlogPost[]
    categories: string[]
  } | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await fetch('/api/blog-data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setBlogData(data)
      } catch (error) {
        console.error('Error fetching blog data:', error)
      }
    }

    fetchBlogData()
  }, [])

  const filteredPosts = blogData?.posts.filter(post => 
    selectedCategory === 'Todos' || post.category === selectedCategory
  ) || []

  return (
    <main>
      {/* Header Section */}
      <section>
        <div className='relative w-full pt-44 2xl:pb-20 pb-10 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-blue_gradient before:via-white before:to-yellow_gradient before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-dark_blue_gradient dark:before:via-black dark:before:to-dark_yellow_gradient dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10'>
          <div className='container relative z-10'>
            <div className='flex flex-col gap-8 text-center'>
              <div className='max-w-3xl mx-auto'>
                <h1 className='font-medium'>
                  Blog about{' '}
                  <span className='instrument-font italic font-normal dark:text-white/70'>
                    UX/UI Design
                  </span>
                </h1>
                <p className='max-w-2xl mx-auto text-dark_black/60 dark:text-white/60 mt-4'>
                  Articles, analysis, and resources on user experience and interface design. 
                  From fundamental principles to the latest industry trends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {blogData?.featuredPosts && blogData.featuredPosts.length > 0 && (
        <section className='py-11'>
          <div className='container'>
            <div className='flex flex-col gap-8'>
              <h2 className='text-2xl font-medium'>Featured Articles</h2>
              <div className='grid md:grid-cols-2 gap-8'>
                {blogData.featuredPosts.map((post) => (
                  <article key={post.id} className='group'>
                    <Link href={`/blog/${post.slug}`}>
                      <div className='flex flex-col gap-4'>
                        <div className='relative overflow-hidden rounded-2xl'>
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={600}
                            height={300}
                            className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300'
                            unoptimized={true}
                          />
                          <div className='absolute top-4 left-4'>
                            <span className='bg-purple_blue text-white px-3 py-1 rounded-full text-sm font-medium'>
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                          <div className='flex items-center gap-4 text-sm text-dark_black/60 dark:text-white/60'>
                            <span>{post.publishDate}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                            <span>•</span>
                            <span>{post.author}</span>
                          </div>
                          <h3 className='text-xl font-medium group-hover:text-purple_blue transition-colors'>
                            {post.title}
                          </h3>
                          <p className='text-dark_black/70 dark:text-white/70'>
                            {post.excerpt}
                          </p>
                          <div className='flex flex-wrap gap-2'>
                            {post.tags.slice(0, 3).map((tag) => (
                              <span 
                                key={tag}
                                className='text-xs bg-dark_black/5 dark:bg-white/10 px-2 py-1 rounded-full'
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className='py-8'>
        <div className='container'>
          <div className='flex flex-wrap gap-3 justify-center'>
            <button
              onClick={() => setSelectedCategory('Todos')}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === 'Todos'
                  ? 'bg-purple_blue text-white'
                  : 'bg-dark_black/5 dark:bg-white/10 hover:bg-dark_black/10'
              }`}
            >
              All
            </button>
            {blogData?.categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple_blue text-white'
                    : 'bg-dark_black/5 dark:bg-white/10 hover:bg-dark_black/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className='pb-20'>
        <div className='container'>
          <div className='flex flex-col gap-8'>
            <h2 className='text-2xl font-medium'>
              {selectedCategory === 'Todos' ? 'All Articles' : selectedCategory}
            </h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {filteredPosts.map((post) => (
                <article key={post.id} className='group'>
                  <Link href={`/blog/${post.slug}`}>
                    <div className='flex flex-col gap-4'>
                      <div className='relative overflow-hidden rounded-xl'>
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={400}
                          height={200}
                          className='w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300'
                          unoptimized={true}
                        />
                        <div className='absolute top-3 left-3'>
                          <span className='bg-white/90 text-dark_black px-2 py-1 rounded-full text-xs font-medium'>
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className='flex flex-col gap-3'>
                        <div className='flex items-center gap-3 text-xs text-dark_black/60 dark:text-white/60'>
                          <span>{post.publishDate}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className='text-base font-medium group-hover:text-purple_blue transition-colors leading-snug line-clamp-2'>
                          {post.title}
                        </h3>
                        <p className='text-sm text-dark_black/70 dark:text-white/70 line-clamp-2'>
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default BlogPage