// import Image from "next/image";
import * as React from "react";

import { MobileNavBar } from "@/components/dashboard/mobile-navbar";
import Navbar from "@/components/dashboard/navbar";

// import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden lg:flex-row">
      <MobileNavBar className="lg:hidden" />

      <div className="flex flex-1 overflow-hidden bg-gray-100 dark:bg-gray-950">
        <Navbar className="isolate hidden min-w-[250px] max-w-[250px] bg-[inherit] lg:flex" />

        <div className="isolate flex w-full flex-col items-center overflow-x-auto border-t border-border bg-background lg:rounded-tl-[0.625rem] lg:border-l">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
