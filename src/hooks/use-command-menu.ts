import { createContext, use } from "react";

export interface CommandMenuProviderProps {
  isPending?: boolean;
  escapeButton?: boolean;
}

export const CommandMenuContext = createContext<CommandMenuProviderProps | undefined>(undefined);

export const useCommandMenu = () => {
  const context = use(CommandMenuContext);

  if (!context) {
    throw new Error("useCommandMenu must be used within a <CommandMenuProvider />");
  }

  return context;
};
