import React from 'react'
import { signIn } from "@/lib/auth";
import { Button } from '@/components/ui/button';


const page = () => {
  return (
    <div className='flex justify-center items-center min-h-full'>
        <form
          action={async () => {
            "use server";
            await signIn("google", {redirectTo:"/app" });
          }}
          className="w-full"
        >
          <Button type="submit" className="w-full" variant="outline">
            Signin with Google
          </Button>
        </form>
    </div>
  )
}

export default page