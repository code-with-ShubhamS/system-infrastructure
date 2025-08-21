// src/app/components/home/online-presence/index.tsx
'use client'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function CaseStudiesShowcase() {
  const [caseStudiesList, setCaseStudiesList] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setCaseStudiesList(data?.onlinePresenceList || [])
      } catch (error) {
        console.error('Error fetching case studies:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <section id='casos-estudio'>
      <div className='2xl:py-20 py-11'>
        <div className='container'>
          <div className='flex flex-col justify-center items-center gap-10 md:gap-20'>
            <div className='max-w-3xl text-center'>
              <h2>
                Case studies that demonstrate the practical application of
                <span className='instrument-font italic font-normal dark:text-white/70'>
                  {' '}UX/UI design
                </span>
              </h2>
              <p className='text-dark_black/60 dark:text-white/60 mt-4'>
                Explore real projects where user-centered design methodologies were applied 
                to solve complex problems and generate measurable outcomes.
              </p>
            </div>
            <div className='grid md:grid-cols-2 gap-x-6 gap-y-8'>
              {caseStudiesList?.map((caso:any, index:any) => {
                return (
                  <div
                    key={index}
                    className='group flex flex-col gap-6 cursor-pointer'>
                    <div className='relative'>
                      <Image
                        src={caso.image}
                        alt={caso.title}
                        width={625}
                        height={410}
                        className='rounded-2xl'
                        unoptimized={true}
                      />

                      <Link
                        href={caso.link}
                        className='absolute top-0 left-0 bg-black/50 w-full h-full rounded-2xl hidden group-hover:flex'>
                        <span className='flex justify-end p-5 w-full'>
                          <Icon
                            icon='icon-park-solid:circle-right-up'
                            width='50'
                            height='50'
                            style={{ color: '#fbfbfb' }}
                          />
                        </span>
                      </Link>
                    </div>

                    <div className='flex flex-col items-start gap-4'>
                      <h5 className='group-hover:text-purple_blue'>
                        {caso.title}
                      </h5>
                      <div className='flex gap-3'>
                        {caso.tag?.slice(0, 2).map((method:any, index:number) => (
                          <p
                            key={index}
                            className='text-sm border border-dark_black/10 dark:border-white/50 w-fit py-1.5 px-4 rounded-full hover:bg-dark_black hover:text-white'>
                            {method}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <Link
              href='/casos-estudio'
              className='group bg-transparent border border-purple_blue text-purple_blue font-medium flex items-center gap-3 py-3 px-6 rounded-full hover:bg-purple_blue hover:text-white transition-all duration-200'>
              <span className='group-hover:translate-x-2 transform transition-transform duration-200 ease-in-out'>
                View all case studies
              </span>
              <Icon icon='material-symbols:arrow-forward' width='20' height='20' />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CaseStudiesShowcase