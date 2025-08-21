// src/app/components/layout/footer/Footer.tsx
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../header/Logo'

const Footer = () => {
  const [footerData, setfooterData] = useState<any>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/footer-data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()        
        setfooterData(data?.footerData)
      } catch (error) {
        console.error('Error fetching footer data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <footer className='xl:pt-20 pb-6'>
      <div className='container'>
        <div className='flex flex-col xl:flex-row py-16 gap-10 justify-between border-b border-dark_black/10 dark:border-white/10'>
          {/* Brand Section */}
          <div className='flex flex-col gap-6 max-w-md xl:max-w-lg'>
            <Logo />
            <p className='opacity-60 text-sm leading-relaxed'>
              {footerData?.brand?.tagline}
            </p>
            <div className='flex gap-4'>
              {footerData?.brand?.socialLinks.map((item:any, index:any) => {
                return (
                  <Link
                    key={index}
                    href={item.link}
                    target='_blank'
                    className='hover:opacity-60 transition-opacity duration-200'>
                    <Image
                      src={item.icon}
                      className='dark:hidden'
                      alt='social-icon'
                      height={20}
                      width={20}
                    />
                    <Image
                      src={item.dark_icon}
                      className='dark:block hidden'
                      alt='social-icon'
                      height={20}
                      width={20}
                    />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Links Grid */}
          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12'>
            {/* Explorar */}
            <div className='flex flex-col gap-4'>
              <p className='font-medium text-lg'>{footerData?.explore?.name}</p>
              <ul className='flex flex-col gap-3'>
                {footerData?.explore?.links.map((item:any, index:any) => {
                  return (
                    <li key={index}>
                      <Link 
                        href={item.url}
                        className='text-dark_black/60 hover:text-dark_black dark:text-white/60 dark:hover:text-white transition-colors duration-200 text-sm'>
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Aprender */}
            <div className='flex flex-col gap-4'>
              <p className='font-medium text-lg'>{footerData?.learn?.name}</p>
              <ul className='flex flex-col gap-3'>
                {footerData?.learn?.links.map((item:any, index:any) => {
                  return (
                    <li key={index}>
                      <Link 
                        href={item.url}
                        className='text-dark_black/60 hover:text-dark_black dark:text-white/60 dark:hover:text-white transition-colors duration-200 text-sm'>
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Legal */}
            <div className='flex flex-col gap-4'>
              <p className='font-medium text-lg'>{footerData?.legal?.name}</p>
              <ul className='flex flex-col gap-3'>
                {footerData?.legal?.links.map((item:any, index:any) => {
                  return (
                    <li key={index}>
                      <Link 
                        href={item.url}
                        className='text-dark_black/60 hover:text-dark_black dark:text-white/60 dark:hover:text-white transition-colors duration-200 text-sm'>
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* About Project */}
            <div className='flex flex-col gap-4'>
              <p className='font-medium text-lg'>{footerData?.about?.name}</p>
              <p className='text-dark_black/60 dark:text-white/60 text-sm leading-relaxed'>
                {footerData?.about?.description}
              </p>
              <ul className='flex flex-col gap-1'>
                {footerData?.about?.details?.map((detail:any, index:any) => {
                  return (
                    <li key={index} className='text-dark_black/50 dark:text-white/50 text-xs'>
                      {detail}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className='flex flex-col md:flex-row justify-between items-center mt-8 gap-4'>
          <p className='text-dark_black/60 dark:text-white/60 text-sm text-center md:text-left'>
            {footerData?.copyright}
          </p>
          <div className='flex gap-6'>
            <Link 
              href="/terms-and-conditions" 
              className='text-dark_black/50 hover:text-dark_black dark:text-white/50 dark:hover:text-white text-xs transition-colors duration-200'>
              Terms
            </Link>
            <Link 
              href="/privacy-policy" 
              className='text-dark_black/50 hover:text-dark_black dark:text-white/50 dark:hover:text-white text-xs transition-colors duration-200'>
              Privacy
            </Link>
            <Link 
              href="/documentation" 
              className='text-dark_black/50 hover:text-dark_black dark:text-white/50 dark:hover:text-white text-xs transition-colors duration-200'>
              Documentation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer