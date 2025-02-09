import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
  isActiveSidebar: boolean;
  toggleSidebar: () => void;
}

export const useAdminSidebarStore = create(
  persist<SidebarState>(
    (set) => ({
      isActiveSidebar: false,
      toggleSidebar: () =>
        set((state) => ({ isActiveSidebar: !state.isActiveSidebar })),
    }),
    {
      name: "sidebar-storage",
    }
  )
);
