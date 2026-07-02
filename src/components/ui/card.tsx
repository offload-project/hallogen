import type { ComponentProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import type { HeaderProps } from "@/types";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card"
      className={twMerge(
        "group/card flex flex-col gap-(--gutter) rounded-lg border bg-card py-(--gutter) text-card-fg shadow-xs [--gutter:--spacing(6)] has-[table]:overflow-hidden has-[table]:not-has-data-[slot=card-footer]:pb-0 **:data-[slot=table-header]:bg-muted/50 has-[table]:**:data-[slot=card-footer]:border-t **:[table]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, title, description, children, ...props }: HeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={twMerge(
        "grid auto-rows-min grid-rows-[auto_auto] items-start gap-1 px-(--gutter) has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className,
      )}
      {...props}>
      {title && <CardTitle>{title}</CardTitle>}
      {description && <CardDescription>{description}</CardDescription>}
      {!title && typeof children === "string" ? <CardTitle>{children}</CardTitle> : children}
    </div>
  );
}

export function CardTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={twMerge("text-balance font-display font-semibold text-base/6", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      data-slot="card-description"
      className={twMerge("row-start-2 text-pretty text-muted-fg text-sm/6", className)}
      {...props}
    />
  );
}

export function CardAction({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-action"
      className={twMerge("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div data-slot="card-content" className={twMerge("px-(--gutter) has-[table]:border-t", className)} {...props} />
  );
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-footer"
      className={twMerge(
        "flex items-center px-(--gutter) group-has-[table]/card:pt-(--gutter) [.border-t]:pt-6",
        className,
      )}
      {...props}
    />
  );
}
