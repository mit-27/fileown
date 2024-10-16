import Navbar from "@/components/landing-page/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-8 p-4">
      <Navbar/>
    </div>
  );
}
