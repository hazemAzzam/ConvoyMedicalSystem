"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { SunMoon } from "lucide-react";
import { Sun, Moon } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function ThemeDropdown() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Run once on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid hydration mismatch
    return null;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex h-9 items-center gap-2 px-2">
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
  );
}
