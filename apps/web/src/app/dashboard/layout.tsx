import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {MobileNavBar} from "@/components/dashboard/mobile-navbar";
import Navbar from "@/components/dashboard/navbar";




export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
      <div className="h-[100dvh] relative flex flex-col overflow-hidden lg:flex-row">

        <MobileNavBar className="lg:hidden" />

        <div className="flex flex-1 overflow-hidden bg-gray-100 dark:bg-gray-950">

          <Navbar
          className="isolate hidden lg:flex min-w-[250px] max-w-[250px] bg-[inherit]"
          />

          <div className="isolate bg-background lg:rounded-tl-[0.625rem] lg:border-l border-t  border-border w-full overflow-x-auto flex flex-col items-center">

            <div className="w-full">
              {children}
            </div>

          </div>

        </div>
      </div>
    );
  }