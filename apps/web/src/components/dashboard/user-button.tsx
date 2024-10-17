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
import { useUser,useClerk } from '@clerk/nextjs'
import type React from "react";



export const UserButton : React.FC = () => {

  const { isLoaded, isSignedIn, user } = useUser()
  const {signOut,openUserProfile} = useClerk();



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex items-center justify-between gap-2 p-2 w-full h-12 rounded-[0.625rem] hover:bg-gray-700/10 hover:cursor-pointer text-content">
        <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden">
          <Avatar className="w-5 h-5">
            {isLoaded && user ? <AvatarImage src={user?.imageUrl} alt="Profile picture" /> : null}
            <AvatarFallback className=" w-5 h-5 overflow-hidden text-gray-700 bg-gray-100 border border-gray-500 rounded-md">
              {(user?.fullName ?? "U").slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <p className="text-md">{user?.fullName}</p>
        <ChevronRight className="w-4 h-4" />

          
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-96">

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => openUserProfile()} className="cursor-pointer">
            <User className="w-4 h-4 mr-2" />
              <span>
                Profile
              </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {/* <Button  className="w-full"> */}
          
            <DropdownMenuItem onClick={() => signOut({redirectUrl: '/' })} className="cursor-pointer">
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
