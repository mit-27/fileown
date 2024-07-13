"use client"
import { Button } from "@/components/ui/button";
import { trpc } from "@/server/client";
import Image from "next/image";


export default function Home() {

  const ls = trpc.getTodos.useQuery();


  return (
    <div className="flex items-center justify-center">

      {JSON.stringify(ls.data)}
    </div>
  );
}
