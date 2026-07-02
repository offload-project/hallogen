import { Link } from "@inertiajs/react";
import { buttonStyles } from "@/components/shared/button-styles.ts";
import { hasActiveFilters } from "@/lib/filter.ts";

export function ResourceClearFilters({ filters, url }: { filters: object; url: string }) {
  return (
    hasActiveFilters(filters) && (
      <Link href={url} className={buttonStyles({ variant: "secondary", size: "sm", className: "text-nowrap" })}>
        Clear filters
      </Link>
    )
  );
}
