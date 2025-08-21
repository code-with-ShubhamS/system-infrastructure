// src/app/components/home/solution/index.tsx
'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function EducationalCTA() {
  const ref = useRef(null)
  const inView = useInView(ref)

  const bottomAnimation = {
    initial: { y: '5%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1, delay: 0.8 },
  }

  return (
    <section>
      <div className='2xl:py-20 py-11'>
        <div className='container'>
          <div
            ref={ref}
            className='py-16 md:py-28 px-6 border border-dark_black/10 rounded-3xl bg-[linear-gradient(90deg,#CDEFFB_0%,#FFFFFF_33.23%,#FFFFFF_65.77%,#FDEECB_100%)] backdrop-blur-[200px] dark:opacity-80'>
            <motion.div
              {...bottomAnimation}
              className='flex flex-col gap-6 items-center md:max-w-4xl mx-auto'>
              <div className='flex flex-col gap-3 items-center text-center'>
                <h2 className='text-3xl md:text-5xl dark:text-dark_black'>
                  The world of{' '}
                  <span className='instrument-font italic font-normal dark:text-black/70'>
                    UX/UI Design
                  </span>{' '}
                  awaits you
                </h2>
                <p className='dark:text-dark_black max-w-2xl'>
                  Discover fascinating case studies, meet the pioneers who shaped the industry, 
                  and explore the tools defining the future of digital design.
                </p>
              </div>
              <div className='flex flex-col sm:flex-row gap-4 items-center'>
                <Link
                  href='/#casos-estudio'
                  className='group w-fit text-white font-medium bg-dark_black rounded-full flex items-center gap-4 py-3 pl-6 pr-3 hover:bg-transparent border border-dark_black hover:text-dark_black transition-all duration-200'>
                  <span className='group-hover:translate-x-2 transform transition-transform duration-200 ease-in-out'>
                    View Case Studies
                  </span>
                  <svg
                    width='32'
                    height='32'
                    viewBox='0 0 32 32'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='group-hover:-translate-x-36 transition-all duration-200 ease-in-out group-hover:rotate-45'>
                    <rect
                      width='32'
                      height='32'
                      rx='16'
                      fill='white'
                      className='fill-white transition-colors duration-200 ease-in-out group-hover:fill-dark_black'
                    />
                    <path
                      d='M11.832 11.3334H20.1654M20.1654 11.3334V19.6668M20.1654 11.3334L11.832 19.6668'
                      stroke='#1B1D1E'
                      strokeWidth='1.42857'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='stroke-[#1B1D1E] transition-colors duration-200 ease-in-out group-hover:stroke-white'
                    />
                  </svg>
                </Link>
                <Link
                  href='/#referentes'
                  className='group w-fit border border-dark_black text-dark_black font-medium bg-transparent rounded-full flex items-center gap-4 py-3 pl-6 pr-3 hover:bg-dark_black hover:text-white transition-all duration-200'>
                  <span className='group-hover:translate-x-2 transform transition-transform duration-200 ease-in-out'>
                    Meet the Pioneers
                  </span>
                  <svg
                    width='32'
                    height='32'
                    viewBox='0 0 32 32'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='group-hover:-translate-x-32 transition-all duration-200 ease-in-out group-hover:rotate-45'>
                    <rect
                      width='32'
                      height='32'
                      rx='16'
                      fill='transparent'
                      stroke='currentColor'
                      strokeWidth='1'
                      className='transition-colors duration-200 ease-in-out group-hover:fill-white'
                    />
                    <path
                      d='M11.832 11.3334H20.1654M20.1654 11.3334V19.6668M20.1654 11.3334L11.832 19.6668'
                      stroke='currentColor'
                      strokeWidth='1.42857'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='transition-colors duration-200 ease-in-out group-hover:stroke-black'
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationalCTA