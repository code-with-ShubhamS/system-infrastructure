// src/app/recursos/page.tsx
'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ResourceItem, ResourceCategory } from '../api/recursos-data/route'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Metadata } from 'next'

function RecursosPage() {
  const [resourcesData, setResourcesData] = useState<{
    categories: ResourceCategory[]
    resources: ResourceItem[]
    totalResources: number
    freeResources: number
  } | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')

  useEffect(() => {
    const fetchResourcesData = async () => {
      try {
        const res = await fetch('/api/recursos-data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setResourcesData(data)
      } catch (error) {
        console.error('Error fetching resources data:', error)
      }
    }

    fetchResourcesData()
  }, [])

  const filteredResources = resourcesData?.resources.filter(resource => {
    const categoryMatch = selectedCategory === 'all' || resource.category === selectedCategory
    const typeMatch = selectedType === 'all' || resource.type === selectedType
    return categoryMatch && typeMatch
  }) || []

  return (
    <main>
      {/* Header Section */}
      <section>
        <div className='relative w-full pt-44 2xl:pb-20 pb-10 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-blue_gradient before:via-white before:to-yellow_gradient before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-dark_blue_gradient dark:before:via-black dark:before:to-dark_yellow_gradient dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10'>
          <div className='container relative z-10'>
            <div className='flex flex-col gap-8 text-center'>
              <div className='max-w-3xl mx-auto'>
                <h1 className='font-medium'>
                  Recursos para{' '}
                  <span className='instrument-font italic font-normal dark:text-white/70'>
                    UX/UI Design
                  </span>
                </h1>
                <p className='max-w-2xl mx-auto text-dark_black/60 dark:text-white/60 mt-4'>
                  Herramientas, cursos y recursos curados para diseñadores UX/UI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className='py-8'>
        <div className='container'>
          <div className='flex flex-col md:flex-row gap-4 justify-between items-center'>
            <div className='flex flex-wrap gap-3'>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-purple_blue text-white'
                    : 'bg-dark_black/5 dark:bg-white/10 hover:bg-dark_black/10'
                }`}
              >
                Todos
              </button>
              {resourcesData?.categories.map((category) => (
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
        </div>
      </section>

      {/* Resources Grid */}
      <section className='pb-20'>
        <div className='container'>
          <div className='flex flex-col gap-8'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-medium'>
                {selectedCategory === 'all' 
                  ? 'Todos los Recursos' 
                  : resourcesData?.categories.find(c => c.id === selectedCategory)?.name
                } ({filteredResources.length})
              </h2>
            </div>
            
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredResources.map((resource) => (
                <article key={resource.id} className='group'>
                  <Link href={resource.url} target='_blank'>
                    <div className='flex flex-col gap-4'>
                      <div className='relative overflow-hidden rounded-xl'>
                        <Image
                          src={resource.image}
                          alt={resource.title}
                          width={400}
                          height={200}
                          className='w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300'
                          unoptimized={true}
                        />
                        <div className='absolute top-3 left-3 flex gap-2'>
                          <span className='bg-white/90 text-dark_black px-2 py-1 rounded-full text-xs font-medium capitalize'>
                            {resource.type}
                          </span>
                          {!resource.isPaid && (
                            <span className='bg-green/90 text-white px-2 py-1 rounded-full text-xs font-medium'>
                              Gratis
                            </span>
                          )}
                        </div>
                        {resource.rating && (
                          <div className='absolute top-3 right-3 bg-dark_black/80 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1'>
                            <Icon icon='ph:star-fill' width='12' height='12' />
                            {resource.rating}
                          </div>
                        )}
                      </div>
                      
                      <div className='flex flex-col gap-3'>
                        <div className='flex justify-between items-start'>
                          <h3 className='text-base font-medium group-hover:text-purple_blue transition-colors leading-snug line-clamp-2'>
                            {resource.title}
                          </h3>
                          {resource.isPaid && (
                            <span className='text-orange text-xs font-medium'>Paid</span>
                          )}
                        </div>
                        
                        <p className='text-sm text-dark_black/70 dark:text-white/70 line-clamp-2'>
                          {resource.description}
                        </p>
                        
                        <div className='flex items-center gap-2 text-purple_blue text-sm font-medium'>
                          Visitar recurso
                          <Icon icon='ph:arrow-up-right' width='16' height='16' />
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className='text-center py-12'>
                <h3 className='text-xl font-medium mb-2'>No se encontraron recursos</h3>
                <p className='text-dark_black/60 dark:text-white/60'>
                  Intenta con otros filtros o categorías.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default RecursosPage