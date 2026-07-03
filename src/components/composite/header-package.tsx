import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Heading } from "@/components/ui/heading.tsx";
import { Text } from "@/components/ui/text.tsx";
import type { HeaderProps } from "@/types";

interface HeaderPackageProps extends HeaderProps {
  action?: ReactNode;
}

export function HeaderPackage({
  title,
  description,
  level,
  action,
  className,
  children,
  ...props
}: HeaderPackageProps) {
  return (
    <div
      className={twMerge(
        "flex w-full flex-col gap-x-(--gutter) text-fg [--gutter:--spacing(6)] sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
      {...props}>
      {title || typeof children === "string" ? (
        <HeaderContent title={title} description={description} level={level} />
      ) : (
        children
      )}
      {action && <HeaderAction>{action}</HeaderAction>}
    </div>
  );
}

export function HeaderTitle({ title, level = 1, className, children, ...props }: HeaderProps) {
  return title || typeof children === "string" ? (
    <Heading level={level} className={className} {...props}>
      {title || children}
    </Heading>
  ) : (
    children
  );
}

export function HeaderDescription({ className, children, ...props }: { className?: string; children: ReactNode }) {
  return (
    <Text className={className} {...props}>
      {children}
    </Text>
  );
}

export function HeaderContent({ title, description, level, className, children, ...props }: HeaderProps) {
  return (
    <div className={twMerge("sm:w-2/3", className)} {...props}>
      {title && <HeaderTitle level={level}>{title}</HeaderTitle>}
      {description && <HeaderDescription>{description}</HeaderDescription>}
    </div>
  );
}

export function HeaderAction({ className, children, ...props }: HeaderProps) {
  return (
    <div className={twMerge("sm:shrink-0", className)} {...props}>
      {children}
    </div>
  );
}
