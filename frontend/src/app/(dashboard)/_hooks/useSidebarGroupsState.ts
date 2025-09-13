import { create } from "zustand";

interface SidebarGroupsState {
  openGroups: string[];
  toggleGroup: (groupName: string) => void;
  setOpenGroups: (groups: string[]) => void;
  isGroupOpen: (groupName: string) => boolean;
  openAllGroups: () => void;
  closeAllGroups: () => void;
}

export const useSidebarGroupsState = create<SidebarGroupsState>((set, get) => ({
  openGroups: [],
  toggleGroup: (groupName: string) => {
    set((state) => ({
      openGroups: state.openGroups.includes(groupName)
        ? state.openGroups.filter((name) => name !== groupName)
        : [...state.openGroups, groupName],
    }));
  },
  setOpenGroups: (groups: string[]) => {
    set({ openGroups: groups });
  },
  isGroupOpen: (groupName: string) => {
    return get().openGroups.includes(groupName);
  },
  openAllGroups: () => {
    set({
      openGroups: [
        "Patients Management",
        "Clinics Management",
        "Laboratory Management",
        "Administration",
      ],
    });
  },
  closeAllGroups: () => {
    set({ openGroups: [] });
  },
}));
