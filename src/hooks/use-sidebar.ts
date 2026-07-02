import { createContext, use } from "react";

// Kept in its own module (not sidebar.tsx) so the component file exports only
// components. Mixing a hook export with component exports disables React Fast
// Refresh for the whole file.
type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  isOpenOnMobile: boolean;
  setIsOpenOnMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextProps | null>(null);

const useSidebar = () => {
  const context = use(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
};

export type { SidebarContextProps };
export { SidebarContext, useSidebar };
