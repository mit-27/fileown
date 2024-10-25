"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type React from "react";


type UserButtonProps = {
  navbarMode?: boolean
};


export const UserButton = ({navbarMode = false} : UserButtonProps) => {

  const {data : currentSession} = useSession();

  const router = useRouter();

  if(!currentSession) {
    return null;
  }



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex items-center justify-between gap-2 p-2 h-12 rounded-[0.625rem] hover:bg-gray-700/10 hover:cursor-pointer text-content">
        <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden">
          <Avatar className="w-5 h-5">
          {currentSession.user?.image ? <AvatarImage src={currentSession.user?.image} alt="Profile picture" /> : null}
          <AvatarFallback className=" w-5 h-5 overflow-hidden text-gray-700 bg-gray-100 border border-gray-500 rounded-md">
          {(currentSession.user?.name ?? "U").slice(0, 2).toUpperCase()}
          </AvatarFallback>
          </Avatar>

          {!navbarMode ? 
          (
            <>
            <p className="text-md">{currentSession.user?.name}</p>
            <ChevronRight className="w-4 h-4" />
            </>
          )
          : 
          null
        }

          
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={navbarMode ? "bottom" : "right"} className="w-96">

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/dashboard/profile')} className="cursor-pointer">
            <User className="w-4 h-4 mr-2" />
              <span>
                Profile
              </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {/* <Button  className="w-full"> */}
          
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })} className="cursor-pointer">
            <LogOut className="w-4 h-4 mr-2" />
              <span>
                Sign out
              </span>
            </DropdownMenuItem>
          {/* </Button> */}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
