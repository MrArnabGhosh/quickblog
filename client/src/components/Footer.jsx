import React from 'react'
import { assets, footer_data } from '../assets/assets';

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
        <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>
            <div>
                <img src={assets.logo}alt="footer-logo" className='w-32 sm:w-44' />
                <p className='mt-6 max-w-[410px]'>This is your space to think out loud, to share what matters and to write without filters. Wheather it is one word or thousand, your story start write here.</p>
            </div>
            <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
                {footer_data.map((section,index)=>(
                    <div key={index}>
                        <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>{section.title}</h3>
                        <ul className='text-sm space-y-1'>
                            {section.links.map((link,i)=>(
                                <li key={i}>
                                    <a href="#" className='hover:underline transition'>{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
        <p className='p-4 text-center text-sm md:text-base text-gray-500/80'>Copyright {currentYear} Quick Blog © - by Arnab Ghosh All Rights Reserved.</p>
    </div>
  )
}

export default Footer