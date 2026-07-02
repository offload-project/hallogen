import { createContext, use } from "react";

export const ChoiceBoxContext = createContext<{ columns?: number; gap?: number; isReadOnly?: boolean }>({});

export const useChoiceBoxContext = () => use(ChoiceBoxContext);
