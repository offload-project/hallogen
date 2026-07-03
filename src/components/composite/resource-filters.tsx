import type { ReactNode, SubmitEvent } from "react";
import type { Key } from "react-aria-components";
import { SearchField } from "react-aria-components/SearchField";
import { ResourceClearFilters } from "@/components/composite/resource-clear-filters";
import { SearchInput } from "@/components/ui/search-field.tsx";
import { TableColumnMenu } from "@/components/ui/table.tsx";
import { Toolbar, ToolbarLeft, ToolbarRight } from "@/components/ui/toolbar.tsx";
import type { ColumnDef } from "@/types";

interface Props {
  searchLabel: string;
  searchPlaceholder: string;
  searchDefaultValue: string | null;
  onSearchSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  /** Toggleable columns for the column-visibility menu. */
  columns: ColumnDef[];
  visible: Set<Key>;
  onColumnsChange: (visible: Set<Key>) => void;
  /** Current filter state, used to decide whether to show "Clear filters". */
  filters: object;
  clearUrl: string;
  /** Optional filter dropdown(s) rendered between search and the column menu. */
  children?: ReactNode;
}

/**
 * The standard admin index filter bar: a search field, an optional filter
 * dropdown slot, the column-visibility menu, and a clear-filters link.
 */
export function ResourceFilters({
  searchLabel,
  searchPlaceholder,
  searchDefaultValue,
  onSearchSubmit,
  columns,
  visible,
  onColumnsChange,
  filters,
  clearUrl,
  children,
}: Props) {
  return (
    <Toolbar className="-mx-(--container-padding)">
      <ToolbarLeft />
      <ToolbarRight>
        <form onSubmit={onSearchSubmit}>
          <SearchField aria-label={searchLabel} defaultValue={searchDefaultValue ?? ""}>
            <SearchInput placeholder={searchPlaceholder} />
          </SearchField>
        </form>
        {children}
        <TableColumnMenu columns={columns} visible={visible} onChange={onColumnsChange} />
        <ResourceClearFilters filters={filters} url={clearUrl} />
      </ToolbarRight>
    </Toolbar>
  );
}
