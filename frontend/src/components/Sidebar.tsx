"use client";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import { useSidebarState } from "@/app/(dashboard)/_hooks/useSidebarState";
import { useSidebarGroupsState } from "@/app/(dashboard)/_hooks/useSidebarGroupsState";
import { ROUTE_GROUPS } from "@/app/(dashboard)/constants";
import Link from "next/link";
import { RouteGroupType } from "@/app/(dashboard)/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export default function Sidebar() {
  const { isOpen, setOpen } = useSidebarState(
    useShallow((state) => {
      return { isOpen: state.isOpen, setOpen: state.setOpen };
    }),
  );
  // close sidebar automatically on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpen(false);
      }
    };
    // Run once on mount
    handleResize();
    // Listen for resize events
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpen]);

  return (
    <Collapsible open={isOpen} onOpenChange={setOpen}>
      <CollapsibleContent forceMount>
        <div
          className={cn(
            "bg-background fixed top-0 left-0 z-20 h-dvh w-75 overflow-y-auto border p-4",
            "transition-transform duration-300",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Bedaya Medical</h1>
            <CollapsibleTrigger asChild>
              <Button size={"icon"} variant={"outline"}>
                <ChevronLeft />
              </Button>
            </CollapsibleTrigger>
          </div>
          <Separator className="my-4" />

          <div className="mt-4 flex flex-col gap-2">
            {ROUTE_GROUPS.map((group) => (
              <RouteGroup key={group.group} group={group} />
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

const RouteGroup = ({ group }: { group: RouteGroupType }) => {
  const { isGroupOpen, toggleGroup, closeAllGroups } = useSidebarGroupsState();
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);

  // Ensure hydration is complete before using pathname-dependent logic
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // During SSR and before hydration, only use the store state
  // After hydration, include pathname-based logic

  useEffect(() => {
    closeAllGroups();
  }, [pathname]);

  const groupOpen = isHydrated
    ? isGroupOpen(group.group) ||
      group.routes.some((route) => pathname.startsWith(route.href))
    : isGroupOpen(group.group);

  return (
    <Collapsible
      key={group.group}
      open={groupOpen}
      onOpenChange={() => toggleGroup(group.group)}
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={cn("h-auto w-full justify-between p-2")}
        >
          <span className="font-medium">{group.group}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              groupOpen && "rotate-180",
            )}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent
        className="mt-1 ml-4"
        forceMount
        suppressHydrationWarning
      >
        <motion.div
          className={cn(
            "flex flex-col gap-1",
            !groupOpen && "pointer-events-none",
          )}
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: groupOpen ? 1 : 0,
            height: groupOpen ? "auto" : 0,
          }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {group.routes.map((route) => (
            <Link key={route.href} href={route.href}>
              <Button
                variant="ghost"
                className={cn(
                  "h-auto w-full cursor-pointer justify-start gap-2 p-2",
                  isHydrated &&
                    pathname.includes(route.href) &&
                    "!text-primary bg-accent",
                )}
              >
                {route.icon}
                <span className="text-sm">{route.label}</span>
              </Button>
            </Link>
          ))}
        </motion.div>
      </CollapsibleContent>
    </Collapsible>
  );
};
