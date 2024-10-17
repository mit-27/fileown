"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { dashboardNavitems } from "@/config/dashboard-navitems";
import { cn } from "@/lib/utils";
import { LogOut, Menu } from "lucide-react";
import { SignOutButton, UserButton } from "@clerk/nextjs";
// import { signOut } from "next-auth/";
import Link from "next/link";
import { useRouter } from "next/navigation";


type Props = {
  className?: string;
};

export const MobileNavBar = ({ className }: Props) => {
  const router = useRouter();
  return (
    <div className={cn(className)}>
      <Sheet>
        <div className="flex items-center justify-between w-full p-2 gap-3">
          <SheetTrigger className="p-2 rounded-md hover:bg-muted">
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <p className="font-bold mx-2">{'Fileown'}</p>
          
          <UserButton />
          {/* <WorkspaceSwitcher /> */}
        </div>
        <SheetHeader>
          <SheetClose />
        </SheetHeader>
        <SheetContent side="bottom" className="bg-white shadow dark:bg-gray-950 rounded-xl">
          <div className="flex flex-col w-full p-4 ">
            <h2 className="px-2 mb-2 text-lg font-semibold tracking-tight">Options</h2>
            <div className="space-y-1">
              {dashboardNavitems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <SheetClose asChild>
                    <Button variant="ghost" className="justify-start w-full border-t">
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  </SheetClose>
                </Link>
              ))}
              <SignOutButton redirectUrl={"/"}>
                <SheetClose asChild>
                  <Button variant="ghost" className="justify-start w-full py-2 border-t">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </SheetClose>
              </SignOutButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
