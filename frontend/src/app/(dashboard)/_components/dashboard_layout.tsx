"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React from "react";
import { useSidebarState } from "../_hooks/useSidebarState";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const isOpen = useSidebarState((state) => state.isOpen);

  return (
    <div className="flex flex-row gap-4">
      <Sidebar />
      <div
        className={cn(
          "flex flex-1 flex-col p-4",
          "transition-margin duration-300",
          isOpen && "md:ml-75",
        )}
      >
        <Navbar />
        <Separator className="my-4" />
        <main>{children}</main>
      </div>
    </div>
  );
}
