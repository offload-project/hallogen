import { type ComponentProps, createContext, type ReactElement, use } from "react";
import { twMerge } from "tailwind-merge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ChildMeterProps {
  "aria-label"?: string;
  label?: string;
  value?: number;
  maxValue?: number;
  valueLabel?: string;
  color?: string;
}

interface MeterGroupContextValue {
  total?: number;
  unit?: string;
}

interface MeterGroupProps extends MeterGroupContextValue, ComponentProps<"div"> {}
const MeterGroupContext = createContext<MeterGroupContextValue | null>(null);

export function MeterGroup({ total, unit, className, ...props }: MeterGroupProps) {
  return (
    <MeterGroupContext value={{ total, unit }}>
      <div className={twMerge("space-y-1", className)} {...props} />
    </MeterGroupContext>
  );
}

export function MeterGroupHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={twMerge("flex items-start justify-between gap-2 *:data-[slot=label]:font-medium", className)}
      {...props}
    />
  );
}

export interface MeterGroupContentProps extends ComponentProps<"div"> {
  children: ReactElement<ChildMeterProps> | ReactElement<ChildMeterProps>[];
  height?: number;
}

export function MeterGroupContent({ children, className, height = 16, ...props }: MeterGroupContentProps) {
  const ctx = use(MeterGroupContext);
  const meters = Array.isArray(children) ? children : [children];
  const sumValues = meters.reduce((s, c) => s + (c.props.value ?? 0), 0);
  const base = ctx?.total ?? Math.max(sumValues, 1);

  return (
    <div className={twMerge("w-full overflow-hidden rounded-full bg-secondary", className)} {...props}>
      <div className="flex w-full" style={{ height }}>
        {meters.map((child, i) => {
          const value = child.props.value ?? 0;
          const pct = base === 0 ? 0 : (value / base) * 100;
          const childLabel = child.props["aria-label"] ?? child.props.label;
          const tooltipText = childLabel ? `${childLabel}: ${value}` : `${value}`;

          return (
            <Tooltip key={i} delay={0}>
              <TooltipTrigger
                style={{
                  width: `${pct}%`,
                  backgroundColor: child.props.color ?? getGroupColor(i),
                }}
                className="h-full outline-hidden transition-all focus-visible:opacity-90"
                aria-label={childLabel}
              />
              <TooltipContent placement="top" className="rounded-full">
                {tooltipText} {ctx?.unit}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}

function getGroupColor(index: number): string {
  const palette = [
    "var(--color-primary)",
    "var(--color-success)",
    "var(--color-warning)",
    "var(--color-danger)",
    "var(--color-muted)",
  ];
  return palette[index % palette.length] ?? "";
}
