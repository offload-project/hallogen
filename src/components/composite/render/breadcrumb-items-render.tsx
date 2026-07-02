import { Breadcrumbs, BreadcrumbsItem } from "@/components/ui/breadcrumbs.tsx";
import { cn } from "@/lib/cn";
import type { BreadcrumbItem } from "@/types";

export function BreadcrumbItemsRender({
  breadcrumbs,
  className,
}: {
  breadcrumbs: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <Breadcrumbs
      items={breadcrumbs}
      className={cn(
        "var(--container-padding)) var(--container-padding)) px-(--horizontal-container-padding, py-(--vertical-container-padding,",
        className,
      )}>
      {(crumb) => (
        <BreadcrumbsItem key={crumb.id} href={crumb.isActive ? undefined : crumb.href} isDisabled={!!crumb.isActive}>
          {crumb.label}
        </BreadcrumbsItem>
      )}
    </Breadcrumbs>
  );
}
