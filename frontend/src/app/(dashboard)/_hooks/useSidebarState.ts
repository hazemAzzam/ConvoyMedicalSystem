import { createStore } from "@/lib/createStore";

interface SidebarState {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

export const useSidebarState = createStore<SidebarState>(
  (set) => ({
    isOpen: false,
    setOpen: (open: boolean) => set({ isOpen: open }),
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  }),
  {
    name: "sidebar-state",
  },
);
