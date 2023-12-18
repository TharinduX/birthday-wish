"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  senderName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }
  ),
  recipientName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }
  ),
  wish: z.string().min(10, {
    message: "Wish must be at least 10 characters.",
  }
  ),
})


const InputForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      senderName: "",
      recipientName: "",
      wish: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      toast.promise(
        fetch('/api/wish', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        }).then(response => {
          if (!response.ok) {
            throw new Error('Could not save');
          }
          console.log(response);
          return response.json();
        })
          .then(wishData => {
            const wishId = wishData._id;
            router.push(`/success/${wishId}`);
          })
          .catch(error => {
            console.log(error);
          }),
        {
          loading: 'Generating wish & baking a cake...🎂',
          success: 'Wish created!',
          error: 'Could not send',
        }
      )
    } catch (error) {
      console.log(error);
      toast.error('Could not save');
    }
  }

  return (
    <Card className="w-lg my-10 shadow-lg ">
      <CardHeader>
        <CardTitle>Create a birthday wish</CardTitle>
        <CardDescription>Fill up the form below to send a birthday wish</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="senderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='sr-only' >Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              )}
            />
            <FormField
              control={form.control}
              name="recipientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='sr-only' >Recipient's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter recipient's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              )}
            />
            <FormField
              control={form.control}
              name="wish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='sr-only' >Birthday Wish</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your birthday wish" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              )}
            />
            <div className='flex justify-end'>
              <Button className='flex gap-2' type="submit">
                Continue
                <ArrowRight size={18} />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

    </Card>
  )
}

export default InputForm