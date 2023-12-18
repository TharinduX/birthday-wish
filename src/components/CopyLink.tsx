'use client'
import React, { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import { Files, ExternalLink } from 'lucide-react'
import { CardTitle, CardDescription, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast'

type data = {
  senderName: string,
  recipientName: string,
  wish: string,
}

const CopyLink = () => {
  const url = process.env.NEXT_PUBLIC_URL;
  const pathname = usePathname();
  const id = pathname.split('/')[2]
  const [data, setData] = useState<data>({} as data)
  const [isloading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const url = `/api/wish/${id}`
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const data = await res.json();
        setData(data);
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [id]);

  const handleExternal = () => {
    window.open(`${url}/wish/${id}`, '_blank')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`${url}/wish/${id}`)
    toast.success('Link copied to clipboard')
  }

  return (
    isloading ? (
      <div role="status">
        <svg aria-hidden="true" className="w-8 h-8 text-muted-foreground animate-spin fill-foreground" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    ) : (
      data?.senderName === undefined ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl">Oops! This link is invalid.</p>
          <p className="text-lg text-muted-foreground">Please check the link and try again.</p>
        </div>
      ) : (
        <Card className="w-lg md:w-[700px] my-10 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-center">
            <div className='flex flex-col items-center mt-5 '>
              <div className='flex items-center justify-center relative'>
                <span className='absolute w-20 h-20 bg-green-300/20 rounded-full animate-pulse'></span >
                <div className='rounded-full bg-green-600 w-14 h-14 items-center flex'>
                  <svg className='text-white w-6 h-6 mx-auto' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                  </svg>
                </div>
              </div >
              <div className="flex flex-col gap-2 text-center mt-5">
                <CardTitle className='text-3xl'>
                  All set, {data.senderName} </CardTitle>
                <CardDescription className='md:w-2/3 mx-auto'>
                  Here is the unique birthday wish link you've generated. Click the button to copy it.
                </CardDescription>
              </div>
            </div >
          </CardHeader >
          <CardContent className="flex items-center justify-center">
            <div className="w-[90%] p-2 bg-accent rounded-md">
              <p className="text-center text-ellipsis overflow-hidden ...">{url}/wish/{id}</p>
            </div>
          </CardContent>
          <CardFooter className='mb-5 flex gap-2 mx-auto justify-center'>
            <Button onClick={handleCopy} className='flex item-center gap-2' variant="outline">
              <Files size={15} />
              Copy Link
            </Button>
            <Button onClick={handleExternal} className='flex item-center gap-2 font-semibold animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 ' >
              Take a look
              <ExternalLink size={15} />
            </Button>
          </CardFooter>
        </Card >
      )
    )
  )
}

export default CopyLink