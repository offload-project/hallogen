import { router } from "@inertiajs/react";
import { useCallback, useMemo } from "react";
import { handleSearch, handleSortChange, parseSortDescriptor } from "@/lib/filter.ts";

type FilterValues = Record<string, string | string[] | null>;
type FilterPatch = Partial<FilterValues & { sort: string }>;

interface Options {
  /** The index route URL to push filter/sort state to. */
  url: string;
  /** Current filter state from the server (used to merge partial updates). */
  filters: FilterValues;
  /** Current sort string (e.g. `-created_at`). */
  sort: string;
}

/**
 * Shared filter/sort wiring for admin index pages. Merges a partial patch over
 * the current filters, serializes them to `filter[key]` query params (omitting
 * empties), and navigates while preserving state/scroll. Returns memoized
 * handlers so the table's collection caching isn't fighting new identities.
 */
export function useIndexFilters({ url, filters, sort }: Options) {
  const applyFilters = useCallback(
    (patch: FilterPatch) => {
      const params: Record<string, string | string[]> = {};

      for (const [key, value] of Object.entries({ ...filters, ...patch })) {
        if (key === "sort") {
          continue;
        }
        if (Array.isArray(value) ? value.length > 0 : value) {
          params[`filter[${key}]`] = value as string | string[];
        }
      }

      const sortValue = "sort" in patch ? patch.sort : sort;
      if (sortValue) {
        params.sort = sortValue;
      }

      router.get(url, params, { preserveState: true, preserveScroll: true });
    },
    [url, filters, sort],
  );

  return {
    applyFilters,
    sortDescriptor: parseSortDescriptor(sort),
    onSortChange: useMemo(() => handleSortChange(applyFilters), [applyFilters]),
    onSearchSubmit: useMemo(() => handleSearch(applyFilters), [applyFilters]),
  };
}
