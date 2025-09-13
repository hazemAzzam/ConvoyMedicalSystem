import { Bell, LogOut, Menu, Moon, Settings, Sun, SunMoon } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebarState } from "@/app/(dashboard)/_hooks/useSidebarState";
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const openSidebar = useSidebarState((state) => state.isOpen);
  const setOpenSidebar = useSidebarState((state) => state.setOpen);
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center justify-between gap-4">
      <Collapsible open={openSidebar} onOpenChange={setOpenSidebar}>
        <CollapsibleTrigger asChild>
          <Button size={"icon"} variant={"outline"}>
            <Menu />
          </Button>
        </CollapsibleTrigger>
      </Collapsible>

      <div className="flex items-center gap-4" suppressHydrationWarning>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex h-9 items-center gap-2 px-2"
            >
              {theme === "system" ? (
                <SunMoon className="size-4" />
              ) : theme === "light" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Change Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={cn(theme === "system" && "bg-accent")}
              onClick={() => setTheme("system")}
            >
              <SunMoon className="size-4" />
              <span>System</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(theme === "light" && "bg-accent")}
              onClick={() => setTheme("light")}
            >
              <Sun className="size-4" />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(theme === "dark" && "bg-accent")}
              onClick={() => setTheme("dark")}
            >
              <Moon className="size-4" />
              <span>Dark</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-9 items-center gap-2 px-2"
            >
              <Avatar className="size-8">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">Admin</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex items-center gap-2 p-2">
              <Avatar className="size-8">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Admin</p>
                <p className="text-muted-foreground text-xs">admin@gmail.com</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
