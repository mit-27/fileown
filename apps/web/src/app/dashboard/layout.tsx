// import Image from "next/image";
import * as React from "react";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import AppSidebar from "@/components/dashboard/app-sidebar";
import { MobileNavBar } from "@/components/dashboard/mobile-navbar";
import { api } from "@/lib/api-server";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tsrclient = api.initQueryClient(new QueryClient());

  await tsrclient.posts.getPosts.prefetchQuery({ queryKey: ["posts"] });

  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden lg:flex-row">
      <MobileNavBar className="lg:hidden" />
      <AppSidebar className="hidden lg:flex" />
      <HydrationBoundary state={dehydrate(tsrclient)}>
        <main className="w-full">{children}</main>
      </HydrationBoundary>
    </div>
  );
}
