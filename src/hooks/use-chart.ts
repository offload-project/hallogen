import { createContext, use } from "react";
import type { ChartConfig, ChartLayout } from "@/components/ui/chart.tsx";

export type ChartContextProps = {
  config: ChartConfig;
  data?: Record<string, any>[];
  layout: ChartLayout;
  dataKey?: string;
  selectedLegend: string | null;
  onLegendSelect: (legendItem: string | null) => void;
};

export const ChartContext = createContext<ChartContextProps | null>(null);

export function useChart() {
  const context = use(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <Chart />");
  }

  return context;
}
