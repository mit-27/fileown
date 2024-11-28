"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { Home, Inbox, Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import { UserButton } from "./user-button";

const items: { title: string; url: string; icon: React.ElementType }[] = [
  {
    title: "Post",
    url: "/dashboard/posts",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/dashboard/inbox",
    icon: Inbox,
  },
];

function AppSidebar({ className }: { className: string }) {
  const pathName = usePathname();

  return (
    <div className={cn(className)}>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="items-center justify-center">
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center justify-center">
                <Link
                  href="/dashboard"
                  className="text-medium cursor-pointer font-bold text-primary"
                >
                  Fileown
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Options</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        className="hover:bg-gray-200 data-[active=true]:font-semibold data-[active=true]:text-primary"
                        asChild
                        isActive={
                          pathName.split("/").pop() ===
                          item.url.split("/").pop()
                        }
                      >
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            <SidebarGroup>
              <SidebarMenuButton>
                <Plus />
                <span>Add Provider</span>
              </SidebarMenuButton>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <UserButton />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}

export default AppSidebar;
