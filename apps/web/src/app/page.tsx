import Navbar from "@/components/landing-page/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
    //     <p>Hello from Mit Suthar</p>
    //     <a
    //   className="bg-gradient-to-r from-blue-200 to-yellow-200 via-green-300 text-black border-b border-green-400 p-4 text-center group"
    //   href="https://deno.com/blog/fresh-1.6"
    // >
    //   <b>Fresh v1.6</b> has been released with <b>Tailwind CSS</b>,{" "}
    //   <b>better Plugin API</b> and more{" "}
    //   <span className="group-hover:underline">→</span>
    // </a>
    //     <Button>Hello from Shadcn</Button>
    //     <div className="mt-5">
    //       <a 
    //       href="https://github.com"
    //       className="group p-4 px-5 pb-3.5 bg-gradient-to-br from-[#4a89c4]/40 to-[#4a89c4] font-semibold text-white rounded leading-none flex items-center justify-center hover:bg-[#4a89c4] transition-colors duration-200 ease-in-out max-w-max text-balance"
    //       >
    //         Get Started
    //       </a>

    //     </div>
    //   </main>
     
    // </div>
    <div className="flex min-h-screen w-full flex-col items-center gap-8 p-4">
      <Navbar/>

    </div>
  );
}
