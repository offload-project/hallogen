import type { ComponentProps } from "react";
import { badgeStyles } from "@/components/shared/badge-styles.ts";

export interface BadgeProps extends ComponentProps<"span"> {
  variant?: "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "outline";
  isCircle?: boolean;
}

export function Badge({ variant, isCircle, className, ...props }: BadgeProps) {
  return <span {...props} className={badgeStyles({ variant, isCircle, className })} />;
}
