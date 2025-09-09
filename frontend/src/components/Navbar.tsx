import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebarState } from "@/app/(dashboard)/_hooks/useSidebarState";

export default function Navbar() {
  const toggle = useSidebarState((state) => state.toggle);

  return (
    <div className="flex items-center gap-4">
      <Button size={"icon"} variant={"outline"} onClick={toggle}>
        <Menu />
      </Button>
      <div className="flex-1">
        <h1 className="text-2xl font-bold">Bedaya Medical System</h1>
      </div>
    </div>
  );
}
