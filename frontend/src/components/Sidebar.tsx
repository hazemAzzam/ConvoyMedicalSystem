"use client";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
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

export default function Sidebar() {
  const isOpen = useSidebarState((state) => state.isOpen);
  const setOpen = useSidebarState((state) => state.setOpen);

  return (
    <div className="flex">
      <Collapsible className="" open={isOpen} onOpenChange={setOpen}>
        <CollapsibleContent forceMount>
          <div
            className={cn(
              "bg-background fixed top-0 left-0 h-dvh w-75 overflow-y-auto border p-4",
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
    </div>
  );
}

const RouteGroup = ({ group }: { group: RouteGroupType }) => {
  const { isGroupOpen, toggleGroup } = useSidebarGroupsState();
  return (
    <Collapsible
      key={group.group}
      open={isGroupOpen(group.group)}
      onOpenChange={() => toggleGroup(group.group)}
    >
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="h-auto w-full justify-between p-2">
          <span className="font-medium">{group.group}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isGroupOpen(group.group) && "rotate-180",
            )}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="ml-4">
        <div className="flex flex-col gap-1">
          {group.routes.map((route) => (
            <Link key={route.href} href={route.href}>
              <Button
                variant="ghost"
                className="h-auto w-full justify-start gap-2 p-2"
              >
                {route.icon}
                <span className="text-sm">{route.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
