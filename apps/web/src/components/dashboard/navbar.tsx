"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useTransition } from "react";

import { Loader2 } from "lucide-react";

import { NavItem, dashboardNavitems } from "@/config/dashboard-navitems";
import { cn } from "@/lib/utils";

import { UserButton } from "./user-button";

const Navbar = ({ className }: { className: string }) => {
  return (
    <aside
      className={cn(
        "text-content/65 inset-y-0 z-10 flex h-full w-64 shrink-0 flex-col overflow-y-auto bg-background px-5 lg:gap-10",
        className
      )}
    >
      <Link
        href="/dashboard"
        className="-mx-2 mt-2 flex min-w-full items-center justify-center font-bold"
      >
        {"Fileown"}
      </Link>

      <nav className="mt-6 flex flex-1 flex-grow flex-col pb-10">
        <ul className="flex flex-1 flex-col gap-y-6">
          <li className="flex flex-col gap-2">
            <h2 className="text-xs uppercase leading-6">Options</h2>
            <ul className="-mx-2 space-y-1">
              {dashboardNavitems.map((item) => (
                <li key={item.label}>
                  <NavLink item={item} />
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>

      <div className="sticky bottom-0 -mx-2 min-w-full bg-[inherit] [flex:0_0_56px]">
        <UserButton />

        {/* Fading indicator that there are more items to scroll */}
        <div className="pointer-events-none absolute inset-x-0 bottom-full h-10 bg-[inherit] [mask-image:linear-gradient(to_top,white,transparent)]" />
      </div>
    </aside>
  );
};

const NavLink: React.FC<{ item: NavItem }> = ({ item }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathName = usePathname();
  const link = (
    <Link
      prefetch
      href={item.href}
      onClick={() => {
        if (!item.external) {
          startTransition(() => {
            router.push(item.href);
          });
        }
      }}
      target={item.external ? "_blank" : undefined}
      className={cn(
        //   "transition-all duration-300 group flex gap-x-2 rounded-md px-2 py-1 text-sm font-normal leading-6 items-center border border-transparent hover:bg-secondary hover:text-content justify-between",
        // "transform perspective-100 hover:scale-103",
        // "hover:shadow-md",
        "group flex items-center justify-between gap-x-2 rounded-md border border-transparent px-2 py-1 text-sm font-normal leading-6 transition-all duration-150",
        {
          // Active state style
          "text-content border-border bg-background [box-shadow:0px_1px_3px_0px_rgba(0,0,0,0.03)]":
            pathName.split("/").pop() === item.href.split("/").pop(),

          // Disabled state
          "text-content-subtle pointer-events-none": item.disabled,

          // Hover style that matches active link
          "hover:text-content hover:border-border hover:bg-background hover:[box-shadow:0px_1px_3px_0px_rgba(0,0,0,0.03)]":
            pathName.split("/").pop() !== item.href.split("/").pop(),
        }
      )}
    >
      <div className="group flex items-center gap-x-2">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[0.625rem]">
          {isPending ? (
            <Loader2 className="h-5 w-5 shrink-0 animate-spin" />
          ) : (
            <item.icon
              className="h-5 w-5 shrink-0 [stroke-width:1.25px]"
              aria-hidden="true"
            />
          )}
        </span>
        <p
          className={cn(
            "truncate whitespace-nowrap font-medium group-hover:font-semibold group-hover:text-primary",
            {
              "font-semibold text-primary":
                pathName.split("/").pop() === item.href.split("/").pop(),
            }
          )}
        >
          {item.label}
        </p>
      </div>
      {item.tag}
    </Link>
  );

  return link;
};

export default Navbar;
