import React from 'react'
import Footer from '../components/layout/Footer'
import Image from 'next/image'

export default function ChoosePlanPage() {
  return (
    <div className=' flex flex-col justify-between'>
        <div className='flex flex-col items-center px-6 pt-12 mb-6 bg-[#032b41] md:rounded-br-[50%] md:rounded-bl-[50%]'>
            <div className='max-w-250 mx-auto'>

            <h1 className='mb-8 text-white font-bold capitalize text-center text-2xl md:text-5xl'>get unlimited access to many amazing books to read</h1>
            <p className='mb-8 text-white text-center text-lg md:text-[20px]'>Turn ordinary moments into amazing learning opportunities</p>
            <figure className='flex justify-center max-auto'>
                <Image
                src={'/pricing-top.png'}
                height={340}
                width={340}
                alt='price image'
                className='rounded-tr-[180px] rounded-tl-[180px]'

                />
            </figure>
            </div>
        </div>
      <p>This is the choose plan page.</p>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <div className='h-20'></div>
      <Footer />
    </div>
  )
}
