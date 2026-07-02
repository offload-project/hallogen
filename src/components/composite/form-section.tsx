import type { ComponentProps } from "react";
import { Description, Fieldset, Legend } from "@/components/ui/field";
import { cn } from "@/lib/cn";

interface FormSectionProps extends ComponentProps<"fieldset"> {
  title?: string;
  description?: string;
  orientation?: "horizontal" | "vertical";
}

export function FormSection({
  title,
  description,
  children,
  className,
  orientation = "horizontal",
  ...props
}: FormSectionProps) {
  return (
    <Fieldset
      className={cn(
        "grid [--container-padding:--spacing(4)]",
        orientation === "horizontal" ? "sm:grid-cols-3 sm:gap-x-(--container-padding)" : "gap-y-(--container-padding)",
        className,
      )}
      {...props}>
      <div className={cn(orientation === "horizontal" ? "sm:col-span-1" : "pb-(--container-padding", className)}>
        {title && <Legend className="text-base/7">{title}</Legend>}
        {description && <Description>{description}</Description>}
      </div>
      <div
        className={cn(
          "flex flex-col gap-y-(--container-padding)",
          orientation === "horizontal" && "sm:col-span-2",
          className,
        )}>
        {children}
      </div>
    </Fieldset>
  );
}
