import { createContext, use } from "react";
import type { TableProps } from "@/components/ui/table.tsx";

export const TableContext = createContext<TableProps>({
  allowResize: false,
});

export const useTableContext = () => use(TableContext);
