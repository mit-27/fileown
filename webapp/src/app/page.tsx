"use client"
import { Button } from "@/components/ui/button";
import { trpc } from "@/server/client";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'



export default function Home() {

  const ls = trpc.getTodos.useQuery();


  return (
    <div className="flex items-center justify-center">

      <SignedOut>
            <SignInButton signUpFallbackRedirectUrl={"/dashboard"} forceRedirectUrl={"/dashboard"}  />
      </SignedOut>
      <SignedIn>
            <UserButton />
      </SignedIn>

      {JSON.stringify(ls.data)}
    </div>
  );
}
