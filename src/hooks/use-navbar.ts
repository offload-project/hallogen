import { createContext, use } from "react";

export interface NavbarContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
  toggleNavbar: () => void;
}

export const NavbarContext = createContext<NavbarContextProps | null>(null);

export const useNavbar = () => {
  const context = use(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider.");
  }

  return context;
};
