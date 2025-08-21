// src/app/components/home/achievements/index.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SingleAchievement from './SingleAchievement'

function UXUIMilestones() {
  const ref = useRef(null)
  const inView = useInView(ref)
  const [milestonesList, setMilestonesList] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setMilestonesList(data?.achievementsList || [])
      } catch (error) {
        console.error('Error fetching milestones:', error)
      }
    }

    fetchData()
  }, [])

  const bottomAnimation = (index: any) => ({
    initial: { y: '5%', opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: '10%', opacity: 0 },
    transition: { duration: 0.4, delay: 0.4 + index * 0.2 },
  })

  return (
    <section id='hitos'>
      <div ref={ref} className='2xl:py-20 py-11'>
        <div className='container'>
          <div className='flex flex-col gap-10 md:gap-20'>
            <div className='max-w-4xl text-center mx-auto'>
              <h2>
                Milestones that revolutionized
                <span className='instrument-font italic font-normal dark:text-white/70'>
                  {' '}digital design
                </span>
              </h2>
              <p className='text-dark_black/60 dark:text-white/60 mt-4'>
                Defining moments in history that transformed how we interact with technology 
                and established the foundations of modern UX/UI.
              </p>
            </div>
            <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
              {milestonesList?.map((milestone:any, index:any) => {
                return (
                  <motion.div {...bottomAnimation(index)} key={index}>
                    <SingleAchievement achievements={milestone} />
                  </motion.div>
                )
              })}
            </div>
            
            <div className='text-center'>
              <p className='text-dark_black/70 dark:text-white/70 max-w-2xl mx-auto'>
                Each of these moments not only changed technology, but also redefined 
                the relationship between humans and machines, laying the groundwork for the 
                user-centered design we practice today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UXUIMilestones