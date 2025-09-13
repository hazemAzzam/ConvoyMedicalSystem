import { Bell, LogOut, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebarState } from "@/app/(dashboard)/_hooks/useSidebarState";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ThemeDropdown } from "./ThemeDropdown";
import PathBreadcrumb from "./PathBreadcrumb";

export default function Navbar() {
  const { toggle } = useSidebarState();

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Button size={"icon"} variant={"outline"} onClick={toggle}>
          <Menu />
        </Button>
        <PathBreadcrumb />
      </div>

      <div className="flex items-center gap-4" suppressHydrationWarning>
        <ThemeDropdown />
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
