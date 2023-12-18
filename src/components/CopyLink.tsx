'use client'
import React, { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import { Files, ExternalLink } from 'lucide-react'
import { CardTitle, CardDescription, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { usePathname } from 'next/navigation';

const CopyLink = () => {
  const pathname = usePathname();
  const id = pathname.split('/')[2]
  const [data, setData] = useState({})

  useEffect(() => {
    try {
      const url = `/api/wish/${id}`
      const res = fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      setData(res)
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <Card className="w-lg md:w-[700px] my-10 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-center">
        <div className='flex flex-col items-center mt-5 '>
          <div className='flex items-center justify-center relative'>
            <span className='absolute w-20 h-20 bg-green-300/20 rounded-full animate-pulse'></span>
            <div className='rounded-full bg-green-600 w-14 h-14 items-center flex'>
              <svg className='text-white w-6 h-6 mx-auto' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-center mt-5">
            <CardTitle className='text-3xl'>
              All set, {data.senderName} </CardTitle>
            <CardDescription className='md:w-2/3 mx-auto'>
              Here is the unique birthday wish link you've generated. Click the button to copy it.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="w-[90%] p-2 bg-accent rounded-md">
          <p className="text-center text-ellipsis overflow-hidden ...">http://www.birthdaywishes.com/{id}</p>
        </div>
      </CardContent>
      <CardFooter className='mb-5 flex gap-2 mx-auto justify-center'>
        <Button className='flex item-center gap-2' variant="outline">
          <Files size={15} />
          Copy Link
        </Button>
        <Button className='flex item-center gap-2 font-semibold animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 ' >
          Take a look
          <ExternalLink size={15} />
        </Button>
      </CardFooter>
    </Card>

  )
}

export default CopyLink