'use client'
import BalloonComponent from '@/components/Balloons'
import CopyLink from '@/components/CopyLink'
import React from 'react'
const page = () => {

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className=''>
        <div className='max-w-sm md:max-w-[800px] mx-auto'>
          <CopyLink />
        </div>
      </div>
      <BalloonComponent />
    </div>
  )
}

export default page