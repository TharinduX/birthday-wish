import BalloonComponent from '@/components/Balloons'
import WishCard from '@/components/WishCard'
import Link from 'next/link'
import React from 'react'
import { Github } from 'lucide-react'

const page = () => {

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className=''>
        <div className='max-w-sm md:max-w-[800px] mx-auto'>
          <WishCard />
        </div>
      </div>
      <BalloonComponent />
      <Link href='https://github.com/TharinduX' className='absolute bottom-8 right-5 text-xs text-muted-foreground underline cursor-pointer'>
        <Github size={15} className='inline-block mr-1' />
        Find me on GitHub
      </Link>
    </div>
  )
}

export default page