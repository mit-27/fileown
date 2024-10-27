import Image from "next/image";

import Navbar from "@/components/landing-page/navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-8 p-4">
      <Navbar />
    </div>
  );
}
