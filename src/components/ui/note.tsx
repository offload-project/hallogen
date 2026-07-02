import { CheckCircleIcon, CircleAlertIcon, InfoIcon } from "lucide-react";
import type { ElementType, HtmlHTMLAttributes } from "react";
import { twJoin, twMerge } from "tailwind-merge";

export interface NoteProps extends HtmlHTMLAttributes<HTMLDivElement> {
  variant?: "default" | "info" | "warning" | "danger" | "success";
  indicator?: boolean;
}

export function Note({ indicator = true, variant = "default", className, ...props }: NoteProps) {
  const iconMap: Record<string, ElementType | null> = {
    info: InfoIcon,
    warning: CircleAlertIcon,
    danger: CircleAlertIcon,
    success: CheckCircleIcon,
    default: null,
  };

  const IconComponent = iconMap[variant] || null;

  return (
    <div
      data-slot="note"
      className={twMerge([
        "grid w-full grid-cols-[auto_1fr] overflow-hidden rounded-lg border border-current/15 p-4 text-base/6 backdrop-blur-2xl sm:text-sm/6",
        "*:[a]:hover:underline **:[strong]:font-medium",
        variant === "default" && "bg-muted/50 text-secondary-fg",
        variant === "info" && "bg-info-subtle text-info-subtle-fg **:[.text-muted-fg]:text-info-subtle-fg/70",
        variant === "warning" &&
          "bg-warning-subtle text-warning-subtle-fg **:[.text-muted-fg]:text-warning-subtle-fg/80",
        variant === "danger" && "bg-danger-subtle text-danger-subtle-fg **:[.text-muted-fg]:text-danger-subtle-fg/80",
        variant === "success" &&
          "bg-success-subtle text-success-subtle-fg **:[.text-muted-fg]:text-success-subtle-fg/80",
        className,
      ])}
      {...props}>
      {IconComponent && indicator && (
        <div
          className={twJoin(
            "me-3 grid size-8 place-content-center rounded-full border-2",
            variant === "warning" && "border-warning-subtle-fg/40",
            variant === "success" && "border-success-subtle-fg/40",
            variant === "danger" && "border-danger-subtle-fg/40",
            variant === "info" && "border-info-subtle-fg/40",
          )}>
          <div
            className={twJoin(
              "grid size-6 place-content-center rounded-full border-2",
              variant === "warning" && "border-warning-subtle-fg/85",
              variant === "success" && "border-success-subtle-fg/85",
              variant === "danger" && "border-danger-subtle-fg/85",
              variant === "info" && "border-info-subtle-fg/85",
            )}>
            <IconComponent className="size-5 shrink-0" />
          </div>
        </div>
      )}
      <div className="text-pretty group-has-[svg]:col-start-2">{props.children}</div>
    </div>
  );
}
