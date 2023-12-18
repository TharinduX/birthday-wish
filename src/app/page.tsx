import BalloonComponent from '@/components/Balloons'
import InputForm from '@/components/InputForm'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='p-10'>
        <div className='text-center'>
          <p className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent '>Send a birthday wish!</p>
          <p className='text-muted-foreground text-lg md:text-xl  mt-3 '>Make someone's day special by sending them a birthday wish.</p>
        </div>
        <div className=''>
          <InputForm />
        </div>
      </div>
      <BalloonComponent />
    </div>
  )
}
