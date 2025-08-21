// src/app/pioneros/page.tsx
'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Pioneer } from '../api/pioneros-data/route'
import { Icon } from '@iconify/react/dist/iconify.js'

function PionerosPage() {
  const [pioneersData, setPioneersData] = useState<{
    pioneers: Pioneer[]
    categories: Array<{id: string, name: string}>
  } | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    const fetchPioneersData = async () => {
      try {
        const res = await fetch('/api/pioneros-data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setPioneersData(data)
      } catch (error) {
        console.error('Error fetching pioneers data:', error)
      }
    }

    fetchPioneersData()
  }, [])

  const filteredPioneers = pioneersData?.pioneers.filter(pioneer => 
    selectedCategory === 'all' || pioneer.category === selectedCategory
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
                  Pioneers of{' '}
                  <span className='instrument-font italic font-normal dark:text-white/70'>
                    UX/UI Design
                  </span>
                </h1>
                <p className='max-w-2xl mx-auto text-dark_black/60 dark:text-white/60 mt-4'>
                  Discover the most influential figures who established the foundations 
                  of user-centered design and transformed the industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className='py-8'>
        <div className='container'>
          <div className='flex flex-wrap gap-3 justify-center'>
            {pioneersData?.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-purple_blue text-white'
                    : 'bg-dark_black/5 dark:bg-white/10 hover:bg-dark_black/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pioneers Grid */}
      <section className='pb-20'>
        <div className='container'>
          <div className='flex flex-col gap-8'>
            <h2 className='text-2xl font-medium text-center'>
              {selectedCategory === 'all' 
                ? `All Pioneers (${filteredPioneers.length})` 
                : `${pioneersData?.categories.find(c => c.id === selectedCategory)?.name} (${filteredPioneers.length})`
              }
            </h2>
            
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {filteredPioneers.map((pioneer) => (
                <article key={pioneer.id} className='group'>
                  <Link href={`/pioneros/${pioneer.id}`}>
                    <div className='flex flex-col gap-6'>
                      <div className='relative overflow-hidden rounded-2xl'>
                        <Image
                          src={pioneer.image}
                          alt={pioneer.name}
                          width={400}
                          height={400}
                          className='w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300 group-hover:grayscale'
                          unoptimized={true}
                        />
                        <div className='absolute top-4 left-4'>
                          <span className='bg-white/90 text-dark_black px-3 py-1 rounded-full text-sm font-medium capitalize'>
                            {pioneer.category === 'researchers' ? 'Researcher' : 
                             pioneer.category === 'designers' ? 'Designer' :
                             pioneer.category === 'founders' ? 'Founder' : 'Engineer'}
                          </span>
                        </div>
                        <div className='absolute top-4 right-4'>
                          <span className='bg-dark_black/80 text-white px-3 py-1 rounded-full text-sm'>
                            {pioneer.yearActive.split('-')[0]}
                          </span>
                        </div>
                      </div>
                      
                      <div className='flex flex-col gap-4 items-center text-center'>
                        <div className='flex flex-col gap-2'>
                          <h3 className='text-xl font-medium group-hover:text-purple_blue transition-colors'>
                            {pioneer.name}
                          </h3>
                          <p className='text-dark_black/60 dark:text-white/60'>
                            {pioneer.role}
                          </p>
                          <p className='text-sm text-dark_black/50 dark:text-white/50'>
                            {pioneer.company}
                          </p>
                        </div>

                        <p className='text-sm text-dark_black/70 dark:text-white/70 line-clamp-3'>
                          {pioneer.bio}
                        </p>

                        <div className='flex flex-wrap gap-2 justify-center'>
                          {pioneer.contributions.slice(0, 2).map((contribution, index) => (
                            <span 
                              key={index}
                              className='text-xs bg-purple_blue/10 text-purple_blue px-2 py-1 rounded-full'
                            >
                              {contribution}
                            </span>
                          ))}
                        </div>

                        <div className='flex gap-4'>
                          {pioneer.linkedinUrl && (
                            <div className='text-[#b1b1b1] hover:text-indigo-800'>
                              <svg
                                width='20'
                                height='20'
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <g clipPath='url(#clip0_1_675)'>
                                  <path
                                    d='M18.5195 0H1.47656C0.660156 0 0 0.644531 0 1.44141V18.5547C0 19.3516 0.660156 20 1.47656 20H18.5195C19.3359 20 20 19.3516 20 18.5586V1.44141C20 0.644531 19.3359 0 18.5195 0ZM5.93359 17.043H2.96484V7.49609H5.93359V17.043ZM4.44922 6.19531C3.49609 6.19531 2.72656 5.42578 2.72656 4.47656C2.72656 3.52734 3.49609 2.75781 4.44922 2.75781C5.39844 2.75781 6.16797 3.52734 6.16797 4.47656C6.16797 5.42188 5.39844 6.19531 4.44922 6.19531ZM17.043 17.043H14.0781V12.4023C14.0781 11.2969 14.0586 9.87109 12.5352 9.87109C10.9922 9.87109 10.7578 11.0781 10.7578 12.3242V17.043H7.79688V7.49609H10.6406V8.80078H10.6797C11.0742 8.05078 12.043 7.25781 13.4844 7.25781C16.4883 7.25781 17.043 9.23438 17.043 11.8047V17.043Z'
                                    fill='currentColor'
                                  />
                                </g>
                                <defs>
                                  <clipPath id='clip0_1_675'>
                                    <rect width='20' height='20' fill='white' />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          )}
                          {pioneer.portfolioUrl && (
                            <div className='text-[#b1b1b1] hover:text-indigo-800'>
                              <Icon icon='ph:globe' width='20' height='20' />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {filteredPioneers.length === 0 && (
              <div className='text-center py-12'>
                <h3 className='text-xl font-medium mb-2'>No pioneers found</h3>
                <p className='text-dark_black/60 dark:text-white/60'>
                  Try a different category.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default PionerosPage