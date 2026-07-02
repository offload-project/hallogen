import type { SubmitEvent } from "react";
import type { SortDescriptor } from "react-aria-components";

export function parseSortDescriptor(sort: string): SortDescriptor {
  if (sort.startsWith("-")) {
    return { column: sort.slice(1), direction: "descending" };
  }
  return { column: sort, direction: "ascending" };
}

export function handleSearch(applyFilters: (patch: Partial<Record<string, string | string[] | null>>) => void) {
  return (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    applyFilters({ search: search || null });
  };
}
export function hasActiveFilters(filters: object): boolean {
  return Object.values(filters).some((v) => {
    if (v == null) return false;
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === "string") return v.length > 0;
    return true;
  });
}

export function handleSortChange(applyFilters: (patch: Partial<Record<string, string | string[] | null>>) => void) {
  return (descriptor: SortDescriptor) => {
    const column = descriptor.column as string;
    const value = descriptor.direction === "descending" ? `-${column}` : column;
    applyFilters({ sort: value });
  };
}
