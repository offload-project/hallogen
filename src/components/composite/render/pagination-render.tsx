import {
  Pagination,
  PaginationFirst,
  PaginationInfo,
  PaginationItem,
  PaginationLabel,
  PaginationLast,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
  PaginationSection,
  PaginationSpacer,
} from "@/components/ui/pagination.tsx";
import { cn } from "@/lib/cn";
import type { PaginatedData } from "@/types";

interface ListPaginationProps<T> {
  pagination: PaginatedData<T>;
  showInfo?: boolean;
  className?: string;
}

export default function PaginationRender<T>({ pagination, showInfo, className }: ListPaginationProps<T>) {
  return (
    <Pagination className={cn("flex-col md:flex-row", className)}>
      {showInfo && (
        <PaginationInfo>
          Showing{" "}
          {pagination.from && (
            <>
              <strong>{pagination.from}</strong> to <strong>{pagination.to}</strong> of{" "}
            </>
          )}
          <strong>{pagination.total}</strong> results
        </PaginationInfo>
      )}
      <PaginationSpacer />
      <PaginationList className="hidden md:flex">
        <PaginationFirst href={pagination.first_page_url} isDisabled={pagination.current_page === 1} />
        <PaginationSection className="**:data-[slot=pagination-item]:min-w-8">
          {pagination.links.map((item) => {
            if (item.label.includes("Previous")) {
              return (
                <PaginationPrevious
                  key={item.page + item.label}
                  href={item.url ?? undefined}
                  isDisabled={item.url === null || item.page === null || pagination.current_page === item?.page}
                />
              );
            } else if (item.label.includes("Next")) {
              return (
                <PaginationNext
                  key={item.page + item.label}
                  href={item.url ?? undefined}
                  isDisabled={item.url === null || item.page === null || pagination.current_page === item?.page}
                />
              );
            }
            return (
              <PaginationItem key={item.page + item.label} href={item.url ?? undefined} isCurrent={item.active}>
                {item.label}
              </PaginationItem>
            );
          })}
        </PaginationSection>
        <PaginationLast href={pagination.last_page_url} isDisabled={pagination.current_page === pagination.last_page} />
      </PaginationList>

      <PaginationList className="md:hidden">
        <PaginationFirst href={pagination.first_page_url} isDisabled={pagination.current_page === 1} />
        <PaginationPrevious
          href={pagination.prev_page_url ?? undefined}
          isDisabled={pagination.prev_page_url === null}
        />
        <PaginationSection className="rounded-(--section-radius) border px-3 *:min-w-4">
          <PaginationLabel>{pagination.current_page}</PaginationLabel>
          <PaginationLabel className="text-muted-fg">/</PaginationLabel>
          <PaginationLabel>{pagination.total}</PaginationLabel>
        </PaginationSection>
        <PaginationNext href={pagination.next_page_url ?? undefined} isDisabled={pagination.next_page_url === null} />
        <PaginationLast href={pagination.last_page_url} isDisabled={pagination.current_page === pagination.last_page} />
      </PaginationList>
    </Pagination>
  );
}
